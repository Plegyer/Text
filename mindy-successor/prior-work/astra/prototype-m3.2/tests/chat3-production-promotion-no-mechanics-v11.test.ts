import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const load=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const definitions=load('content/definitions.json');
const forest=load('content/packs/forest-result-content-bilingual-v2.json');
const lumberCross=load('content/packs/lumber-cross-production.json');
const povertyPacks=[
 load('content/packs/poverty-street-production.json'),
 load('content/packs/poverty-street-production-v2.json'),
 load('content/packs/poverty-cheap-production.json'),
 load('content/packs/poverty-cheap-production-v2.json'),
 load('content/packs/poverty-recovery-production.json'),
 load('content/packs/poverty-pressure-production.json')
];
const events=povertyPacks.flatMap((pack:any)=>pack.events);
const event=(id:string)=>events.find((entry:any)=>entry.id===id);
const effects=(eid:string,cid:string)=>event(eid).choices.find((choice:any)=>choice.id===cid).effects;

test('C3-117 frozen v11 Forest contracts remain present under the intentional v12 extension',()=>{
 const activity=definitions.activities.find((entry:any)=>entry.id==='lumber.forest');
 assert.ok(activity);
 assert.equal(activity.entryEnergyCost,2);
 assert.equal(activity.adapter,'counter.v1');
 const optionById=new Map(activity.options.map((entry:any)=>[entry.id,entry]));
 assert.deepEqual(optionById.get('forest.route.logging-road'),{id:'forest.route.logging-road',label:'Logging road',category:'route',conditions:[],progressDelta:0,enduranceCost:0,setRoute:'logging-road'});
 assert.deepEqual(optionById.get('forest.route.old-boundary'),{id:'forest.route.old-boundary',label:'Old boundary path',category:'route',conditions:[{kind:'itemCapability',capability:'enter_old_boundary',present:true}],progressDelta:0,enduranceCost:0,setRoute:'old-boundary'});
 assert.deepEqual(activity.results.map((entry:any)=>({id:entry.id,outcome:entry.outcome})),[
  {id:'lumber.forest.success',outcome:'success'},
  {id:'lumber.forest.escape',outcome:'escape'},
  {id:'lumber.forest.failure',outcome:'failure'}
 ]);
 assert.ok(activity.results.find((entry:any)=>entry.id==='lumber.forest.success').effects.some((effect:any)=>effect.kind==='addWorldFact'&&effect.fact==='lumber.forest.truth-known'));
 assert.ok(forest.events.every((entry:any)=>entry.variants.some((variant:any)=>variant.id==='default')));
 for(const entry of forest.events)for(const choice of entry.choices){
  if(choice.id==='warden-conservation-route'){
   assert.equal(entry.id,'forest-result-content-v1.success');
   assert.deepEqual(choice.effects,[{kind:'addWorldFact',fact:'reward.hunter.warden-signs.used'}]);
  }else assert.deepEqual(choice.effects,[],entry.id+' / '+choice.id);
 }
 const continuation=lumberCross.events.find((entry:any)=>entry.id==='lumber-cross.activity-forest-return');
 assert.ok(continuation.choices[0].effects.some((effect:any)=>effect.kind==='addCareerFact'&&effect.fact==='forest-specimen-catalogued'));
 assert.ok(continuation.choices[0].effects.some((effect:any)=>effect.kind==='addCareerFact'&&effect.fact==='forest-truth-known'));
 assert.ok(continuation.choices[0].effects.some((effect:any)=>effect.kind==='addCareerFact'&&effect.fact==='forest-problem-resolved'));
});

test('C3-117 lodging economics and next-day Energy stay exact',()=>{
 const byId=new Map(definitions.lodgings.map((entry:any)=>[entry.id,entry]));
 assert.deepEqual(byId.get('lodging.normal'),{id:'lodging.normal',label:'Normal room',housing:'normal',moneyCost:100,conditions:[],effects:[],nextDayEffects:[],nextDayEnergyDelta:0});
 assert.deepEqual(byId.get('lodging.cheap'),{id:'lodging.cheap',label:'Cheap lodging',housing:'cheap',moneyCost:50,conditions:[],effects:[],nextDayEffects:[],nextDayEnergyDelta:0});
 assert.deepEqual(byId.get('lodging.street'),{id:'lodging.street',label:'Street / no lodging',housing:'street',moneyCost:0,conditions:[],effects:[],nextDayEffects:[{stat:'grooming',delta:-1}],nextDayEnergyDelta:-1});
});

test('C3-117 poverty rewards and pressure effects stay exact',()=>{
 assert.deepEqual(effects('poverty-street-production.helpful-summer','take-errand'),[{kind:'modifyResource',resource:'money',delta:10}]);
 assert.deepEqual(effects('poverty-street-production-v2.helpful-summer-shade','take-small-task'),[{kind:'modifyResource',resource:'money',delta:6}]);
 assert.deepEqual(effects('poverty-recovery-production.short-cleanup','do-cleanup'),[{kind:'modifyResource',resource:'money',delta:5}]);
 assert.deepEqual(effects('poverty-recovery-production.small-coin-help','take-coins'),[{kind:'modifyResource',resource:'money',delta:4}]);
 assert.deepEqual(effects('poverty-recovery-production.herb-bundle','take-herb'),[{kind:'addItem',id:'herb',count:1}]);
 assert.deepEqual(effects('poverty-street-production-v2.pressure-winter-wind','keep-walking'),[{kind:'addNextDayModifier',energyDelta:-1,statEffects:[],tag:'poverty.street.v2.initial-wind-pressure'}]);
 assert.deepEqual(effects('poverty-pressure-production.cold-rain','wait-it-out'),[{kind:'addNextDayModifier',energyDelta:-1,statEffects:[{stat:'grooming',delta:-1}],tag:'poverty.pressure.initial-cold-rain'}]);
});

test('C3-117 ordinary poverty remains independent from Secret Debt',()=>{
 const serialized=JSON.stringify(povertyPacks);
 assert.doesNotMatch(serialized,/secret.?debt|lender|slave/i);
 const debtWrites=events.flatMap((entry:any)=>entry.choices).flatMap((choice:any)=>choice.effects).filter((effect:any)=>effect.kind==='metric'&&effect.key==='debt');
 assert.equal(debtWrites.length,0);
});
