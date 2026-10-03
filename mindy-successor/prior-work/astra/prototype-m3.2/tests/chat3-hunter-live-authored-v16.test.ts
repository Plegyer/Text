import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {calendar,dispatch,eligible,parseSave,resolveReactions} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const defs=JSON.parse(readFileSync('content/definitions.json','utf8'));
const loc=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const baseline=JSON.parse(readFileSync('content/hunter-authored-v16-mechanics-baseline.fixture.json','utf8')).projection;
baseline.action.seasonal.spring.push({kind:'modifyStat',stat:'grooming',delta:-1});
baseline.action.seasonal.winter.push({kind:'modifyStat',stat:'sociability',delta:-1});
const contract=JSON.parse(readFileSync('../../../docs/tasks/HUNTER_RUNTIME_CONTRACT_v1.json','utf8'));
const packFiles=['hunter-career.json','hunter-clues.json','hunter-items.json','hunter-relationship.json','hunter-routes.json','hunter-school.json'];
const packs=packFiles.map(name=>JSON.parse(readFileSync('content/packs/'+name,'utf8')));

function project(){
 const shift=defs.actions.find((x:any)=>x.id==='hunter.shift');
 const activity=defs.activities.find((x:any)=>x.id==='hunter.expedition');
 return {
  producerHead:'8af661de2ce6d73e4db0f61fe4206d3334822998',
  action:{
   id:shift.id,cost:shift.cost,conditions:shift.conditions,effects:shift.effects,mode:shift.mode,wage:shift.wage,seasonal:shift.seasonal,
   scenes:shift.scenes.map((s:any)=>({id:s.id,conditions:s.conditions,media:s.media}))
  },
  activity:{
   id:activity.id,entryConditions:activity.entryConditions,entryEnergyCost:activity.entryEnergyCost,resumePolicy:activity.resumePolicy,
   timePolicy:activity.timePolicy,failurePolicy:activity.failurePolicy,adapter:activity.adapter,adapterConfig:activity.adapterConfig,
   options:activity.options.map((o:any)=>({id:o.id,category:o.category,conditions:o.conditions,progressDelta:o.progressDelta,enduranceCost:o.enduranceCost,setRoute:o.setRoute})),
   results:activity.results.map((r:any)=>({id:r.id,outcome:r.outcome,effects:r.effects}))
  },
  career:defs.careers.find((x:any)=>x.id==='hunter'),
  relationship:defs.relationships.find((x:any)=>x.id==='hunter.senior-guide'),
  items:defs.itemDefinitions.filter((x:any)=>x.id==='rope_kit'||x.id==='field_preservation_kit'),
  ending:defs.endings.find((x:any)=>x.id==='ending.hunter.hard-work'),
  packs:packs.map((p:any)=>({
   id:p.id,capabilities:(()=>{
    const c=JSON.parse(JSON.stringify(p.capabilities));
    if(p.id==='hunter.career'&&c.reads?.housing===true)delete c.reads.housing;
    return c;
   })(),
   events:(p.events??[]).map((e:any)=>({
    id:e.id,sourceDomain:e.sourceDomain,trigger:e.trigger,reactionTriggers:e.reactionTriggers,
    priorityClass:e.priorityClass,priority:e.priority,blocking:e.blocking,delivery:e.delivery,nightPolicy:e.nightPolicy??null,
    chance:e.chance??null,cooldownDays:e.cooldownDays,variantCooldownDays:e.variantCooldownDays,maxShows:e.maxShows,conditions:e.conditions,
    choices:e.choices.map((c:any)=>({id:c.id,conditions:c.conditions,effects:c.effects}))
   }))
  }))
 };
}
function reload(s:Save){return parseSave(JSON.stringify(s),catalog);}
function event(id:string){
 for(const p of packs){const e=(p.events??[]).find((x:any)=>x.id===id);if(e)return e;}
 throw new Error('missing '+id);
}
function hunterState(stage:string,season:'spring'|'summer'|'autumn'|'winter'){
 const s=started();
 while(calendar(s.run.day).season!==season)s.run.day++;
 s.run.character.stats.dexterity=25;
 s.run.character.stats.endurance=20;
 s.run.character.stats.wits=15;
 s.run.dayState.energyCurrent=3;
 (s.run.progression.careers as any).hunter={
  stage,shifts:8,
  counters:{completed_shifts:8,spring_contracts:1,summer_contracts:1,autumn_contracts:1,winter_contracts:1,successful_expeditions:0,rare_contracts:0,protected_routes:0},
  choices:{},facts:['first-shift-complete','tracker-ready','recognized-ready','expedition-qualified']
 };
 return s;
}
function localizedEvent(id:string){
 const e=event(id);
 assert.ok(loc['event.'+id+'.title']?.ru?.trim()&&loc['event.'+id+'.title']?.en?.trim(),id+' title');
 for(const v of e.variants){
  const k='event.'+id+'.variant.'+v.id+'.text';
  assert.ok(loc[k]?.ru?.trim()&&loc[k]?.en?.trim(),k);
 }
 for(const c of e.choices)for(const suffix of ['label','text']){
  const k='event.'+id+'.choice.'+c.id+'.'+suffix;
  assert.ok(loc[k]?.ru?.trim()&&loc[k]?.en?.trim(),k);
 }
}

test('C3-170..179 authored layer has zero Hunter producer-mechanics drift',()=>{
 assert.deepEqual(project(),baseline);
});

test('C3-170/171 keeps the exact 12 shift identities and all seasonal scene copy bilingual',()=>{
 const shift=defs.actions.find((x:any)=>x.id==='hunter.shift');
 assert.deepEqual(shift.scenes.map((x:any)=>x.id),[
  'spring.default','spring.melt-tracks','spring.trap-check','spring.edge-scout',
  'summer.default','summer.training','summer.edge-predator',
  'autumn.default','autumn.migration','autumn.trophy-handoff',
  'winter.default','winter.route-limits'
 ]);
 const joined=shift.scenes.map((x:any)=>x.text).join(' ');
 for(const term of ['track','trap-check','escort','sort','scouting','training','handoff'])assert.match(joined,new RegExp(term,'i'),term);
 for(const scene of shift.scenes){
  const k='action.hunter.shift.scene.'+scene.id+'.text';
  assert.ok(loc[k]?.ru?.trim(),k+' RU');
  assert.ok(loc[k]?.en?.trim(),k+' EN');
 }
});

test('ordinary scene selection remains deterministic and saved lastAction reloads exactly',()=>{
 const shift=defs.actions.find((x:any)=>x.id==='hunter.shift');
 const cases:[string,'spring'|'summer'|'autumn'|'winter',string][]=[
  ['recognized-hunter','spring','spring.edge-scout'],
  ['recognized-hunter','summer','summer.edge-predator'],
  ['recognized-hunter','autumn','autumn.trophy-handoff'],
  ['recognized-hunter','winter','winter.route-limits']
 ];
 for(const [stage,season,sceneId] of cases){
  let s=hunterState(stage,season);
  s=dispatch(s,{type:'action',id:'hunter.shift'},catalog);
  assert.equal(s.run.lastAction?.text,shift.scenes.find((x:any)=>x.id===sceneId)?.text,season);
  const last=JSON.parse(JSON.stringify(s.run.lastAction));
  s=reload(s);
  assert.deepEqual(s.run.lastAction,last,season+' reload');
 }
});

test('C3-172 expedition entry/options are localized and real success-return consumers are authored',()=>{
 const activity=defs.activities.find((x:any)=>x.id===contract.expedition.activity);
 assert.equal(activity.entryEnergyCost,2);
 assert.equal(activity.resumePolicy,'allowed');
 assert.ok(loc['activity.hunter.expedition.label']?.ru?.trim());
 assert.ok(loc['activity.hunter.expedition.label']?.en?.trim());
 for(const option of activity.options){
  for(const suffix of ['label','help']){
   const k='activityOption.'+option.id+'.'+suffix;
   assert.ok(loc[k]?.ru?.trim()&&loc[k]?.en?.trim(),k);
  }
 }
 assert.equal(catalog.events.some(e=>e.id===contract.expedition.returnEvent),false,'reserved generic return event is not a live producer');
 for(const id of ['hunter.items.preserve-return','hunter.items.rough-route-return','hunter.routes.legend-return']){
  const e=event(id);
  assert.ok(e.reactionTriggers.some((t:any)=>t.kind==='activityResult'&&t.activity==='hunter.expedition'&&t.result==='hunter.expedition.success'),id);
  localizedEvent(id);
 }
});

test('C3-173 exact item capabilities remain route/extraction choices rather than a weapon system',()=>{
 const rope=defs.itemDefinitions.find((x:any)=>x.id===contract.items.ropeKit.id);
 const preserve=defs.itemDefinitions.find((x:any)=>x.id===contract.items.preservationKit.id);
 assert.ok(rope?.capabilities.includes(contract.items.ropeKit.capability));
 assert.ok(preserve?.capabilities.includes(contract.items.preservationKit.capability));
 const activity=defs.activities.find((x:any)=>x.id==='hunter.expedition');
 assert.ok(activity.options.find((x:any)=>x.id==='hunter.expedition.rough-route').conditions.some((c:any)=>c.kind==='itemCapability'&&c.capability==='cross_rough_route'));
 assert.ok(activity.options.find((x:any)=>x.id==='hunter.expedition.preserve-evidence').conditions.some((c:any)=>c.kind==='itemCapability'&&c.capability==='preserve_specimen'));
 assert.doesNotMatch(JSON.stringify({activity,items:[rope,preserve]}),/damage|weapon|attack/i);
});

test('C3-174 uses only exact narrow Forest Tavern Farm Lumber clue producers',()=>{
 const expected:any={
  'hunter.clues.forest-trail':['worldFact','forest.hunter-trail-clue'],
  'hunter.clues.lumber-truth':['worldFact','lumber.forest.truth-known'],
  'hunter.clues.tavern-rumour':['careerFact','rumour-confirmed'],
  'hunter.clues.farm-sample':['careerFact','sample-preserved']
 };
 for(const [id,[kind,value]] of Object.entries(expected) as any){
  const e=event(id);
  assert.ok(e.conditions.some((c:any)=>c.kind===kind&&(c.fact===value)),id);
  localizedEvent(id);
 }
 const clueEvents=['hunter.clues.forest-trail','hunter.clues.lumber-truth','hunter.clues.tavern-rumour','hunter.clues.farm-sample'].map(event);
 assert.equal(clueEvents.flatMap((e:any)=>e.choices).flatMap((choice:any)=>choice.effects).some((effect:any)=>['modifyResource','addItem','removeItem'].includes(effect.kind)),false);
});

test('C3-175 relationship copy stays role-only and refusal/rivalry never block ordinary Hunter work',()=>{
 const intro=event('hunter.relationship.intro');
 assert.ok(intro.variants.some((v:any)=>v.id==='client-handoff'));
 assert.ok(intro.variants.some((v:any)=>v.id==='forest-local-context'));
 const resolve=event('hunter.relationship.conflict-resolve');
 const rivalry=resolve.choices.find((c:any)=>c.id==='rivalry');
 const decline=resolve.choices.find((c:any)=>c.id==='decline');
 assert.ok(rivalry&&decline);
 assert.equal([...rivalry.effects,...decline.effects].some((x:any)=>x.kind==='advanceCareer'),false);
 assert.match(decline.text,/career|progression|work/i);
 const companion=event('hunter.relationship.companion');
 assert.match(companion.variants[0].text,/guide, colleague, or friend/i);
 for(const id of ['hunter.relationship.intro','hunter.relationship.trust','hunter.relationship.conflict-open','hunter.relationship.conflict-resolve','hunter.relationship.companion'])localizedEvent(id);
 const raw=JSON.stringify([intro,resolve,companion]);
 for(const name of ['Marek','Elian','Bronn','Ren','Silan'])assert.equal(new RegExp('(^|[^\\p{L}])'+name+'([^\\p{L}]|$)','iu').test(raw),false,name);
});

test('C3-176 Master and Warden authored identities are distinct without morality scoring',()=>{
 const master=event('hunter.routes.master-ready');
 const warden=event('hunter.routes.warden-ready');
 assert.match(master.variants[0].text,/preparation|preserved|successful/i);
 assert.match(warden.variants[0].text,/protection|territory|route/i);
 assert.match(warden.variants[0].text,/not .*score/i);
 assert.notEqual(master.variants[0].text,warden.variants[0].text);
 localizedEvent(master.id);localizedEvent(warden.id);
});

test('C3-177 Legend investigation stays ambiguous and variant selection is deterministic across reload',()=>{
 const contractEvent=event('hunter.routes.legend-contract');
 assert.doesNotMatch(contractEvent.variants.map((v:any)=>v.text).join(' '),/dragon|werewolf|manticore|fixed species/i);
 let s=hunterState('recognized-hunter','autumn');
 const h=(s.run.progression.careers as any).hunter;
 h.facts.push('rare-contract-ready','forest-clue-known','tavern-clue-known','farm-clue-known');
 s.run.resources.inventory.field_preservation_kit=1;
 s=resolveReactions(s,[{kind:'careerFactAdded',career:'hunter',fact:'farm-clue-known'}],catalog).state;
 assert.equal(s.run.pending?.eventId,'hunter.routes.legend-contract');
 assert.equal(s.run.pending?.variantId,'farm-comparison');
 const pending=JSON.parse(JSON.stringify(s.run.pending));
 s=reload(s);
 assert.deepEqual(s.run.pending,pending);
 localizedEvent('hunter.routes.legend-contract');localizedEvent('hunter.routes.legend-return');
});

test('C3-178 cheap/street survival acknowledgement changes copy only and preserves ordinary economy',()=>{
 const e=event('hunter.career.first-shift');
 for(const [housing,variant] of [['street','street-survival'],['cheap','cheap-budget']] as const){
  let s=started();
  s.run.character.stats.dexterity=25;s.run.character.stats.endurance=20;s.run.character.stats.wits=15;
  s.run.housingState.current=housing;
  s=dispatch(s,{type:'action',id:'hunter.shift'},catalog);
  assert.equal(s.run.pending?.eventId,e.id);
  assert.equal(s.run.pending?.variantId,variant);
  const snapshot=JSON.parse(JSON.stringify(s.run.pending));
  s=reload(s);assert.deepEqual(s.run.pending,snapshot);
 }
 assert.equal(e.choices.flatMap((c:any)=>c.effects).some((x:any)=>x.kind==='modifyResource'||x.kind==='setHousing'),false);
 assert.doesNotMatch(JSON.stringify(e),/secret.?debt|lender|slave/i);
 localizedEvent(e.id);
});

test('C3-179 every touched live Hunter event has RU/EN parity and localization carries no gameplay payload',()=>{
 const touched=packs.filter((p:any)=>['hunter.career','hunter.clues','hunter.items','hunter.relationship','hunter.routes'].includes(p.id)).flatMap((p:any)=>p.events);
 for(const e of touched)localizedEvent(e.id);
 const hunterLoc=Object.entries(loc).filter(([k]:any)=>k.includes('hunter'));
 assert.ok(hunterLoc.length>80);
 assert.equal(hunterLoc.some(([,v]:any)=>'conditions' in v||'effects' in v),false);
});

test('C3-169..179 authored layer adds no Secret Debt state or new public Hunter ending',()=>{
 const serialized=JSON.stringify({packs,action:defs.actions.find((x:any)=>x.id==='hunter.shift'),activity:defs.activities.find((x:any)=>x.id==='hunter.expedition')});
 assert.doesNotMatch(serialized,/secret.?debt|lender|slave/i);
 assert.deepEqual(defs.endings.filter((x:any)=>x.id.includes('hunter')).map((x:any)=>x.id),['ending.hunter.hard-work']);
});
