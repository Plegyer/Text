import test from 'node:test';import assert from 'node:assert/strict';
import {loadCatalog} from '../src/core/content.ts';
import {dispatch,freshSave,parseSave} from '../src/core/engine.ts';
import type {Catalog,Effect,Save} from '../src/core/schema.ts';

function action(id:string){
  return {id,label:id,description:`Synthetic ${id}`,cost:{money:0,energy:id==='work'?1:0},conditions:[],effects:[],mode:'normal'};
}
function definitions(){
  return {
    version:'0.1.0',
    flags:['story.arrived'],
    actions:[action('work'),action('rest')],
    endings:[],
    careers:[],
    quests:[],
    relationships:[{
      id:'partner.rel',label:'Partner',initialStage:'known',stages:['known'],
      transitions:[]
    }],
    lodgings:[
      {id:'normal.room',label:'Normal room',housing:'normal',moneyCost:100,conditions:[],effects:[],nextDayEffects:[],nextDayEnergyDelta:0},
      {id:'cheap.room',label:'Cheap lodging',housing:'cheap',moneyCost:50,conditions:[],effects:[],nextDayEffects:[],nextDayEnergyDelta:0},
      {id:'street.sleep',label:'Street',housing:'street',moneyCost:0,conditions:[],effects:[],nextDayEffects:[{stat:'grooming',delta:-1}],nextDayEnergyDelta:-1}
    ],
    nightChoices:[
      {id:'night.sleep',label:'Sleep',conditions:[],effects:[],nextDayEffects:[],nextDayEnergyDelta:0},
      {id:'night.study',label:'Study',conditions:[],effects:[{kind:'modifyStat',stat:'reason',delta:2}],nextDayEffects:[],nextDayEnergyDelta:-1},
      {id:'partner.night',label:'Partner',conditions:[],effects:[{kind:'addRelationshipFact',relationship:'partner.rel',fact:'night.met'}],nextDayEffects:[],nextDayEnergyDelta:0}
    ]
  };
}
function choice(id='continue',effects:Effect[]=[]){
  return {id,label:id,text:`Synthetic night choice ${id} resolved.`,conditions:[],effects};
}
function nightEvent(id:string,point:'before_lodging'|'after_lodging'|'after_choice',overrides:any={}){
  const trigger=point==='after_choice'
    ? [{kind:'nightChoiceCompleted',choice:'partner.night'}]
    : [{kind:'nightPhase',point}];
  return {
    id:`night.${id}`,title:`Night ${id}`,
    trigger:[],reactionTriggers:trigger,
    priorityClass:'forced',priority:50,blocking:true,delivery:{policy:'live'},
    nightPolicy:{
      intercept:point,
      suppressLodgingPayment:false,
      suppressVoluntaryMenu:false,
      consumesNight:false
    },
    cooldownDays:0,variantCooldownDays:0,maxShows:100,conditions:[],
    variants:[{id:'default',text:`Synthetic night event ${id} fallback text.`,conditions:[],media:[]}],
    choices:[choice()],
    ...overrides
  };
}
function pack(events:any[]){
  return {
    schemaVersion:1,id:'night',reads:[],writes:[],
    capabilities:{reads:{housing:true},writes:{nextDay:true}},
    media:[
      {id:'stage.town',kind:'image',src:'assets/town.svg',alt:'Town'},
      {id:'stage.room',kind:'image',src:'assets/room.svg',alt:'Room'},
      {id:'stage.outside',kind:'image',src:'assets/outside.svg',alt:'Outside'}
    ],
    events
  };
}
function catalog(events:any[]=[]):Catalog{return loadCatalog(definitions(),[pack(events)]);}
function start():Save{
  const s=freshSave();
  s.run.creation={remaining:0,allocated:{},activeHardWorkPackages:[],hardWorkPackagesApplied:true,complete:true};
  s.run.flags['story.arrived']=true;
  return s;
}

test('before-lodging forced event can replace lodging and voluntary menu without charging rent',()=>{
  const forced=nightEvent('before','before_lodging',{
    nightPolicy:{intercept:'before_lodging',suppressLodgingPayment:true,suppressVoluntaryMenu:true,consumesNight:true},
    choices:[choice('continue',[{kind:'addNextDayModifier',energyDelta:-1,statEffects:[],tag:'forced.before'}])]
  });
  const cat=catalog([forced]);
  let s=dispatch(start(),{type:'endDay'},cat);
  assert.equal(s.run.pending?.eventId,'night.before');
  assert.equal(s.run.resources.money,600);
  assert.equal(s.run.flow.night?.phase,'NightEventResolution');
  assert.equal(s.run.flow.night?.lodgingPaymentCommitted,false);

  s=dispatch(s,{type:'choice',id:'continue'},cat);
  assert.equal(s.run.pending,null);
  assert.equal(s.run.flow.night,null);
  assert.equal(s.run.resources.money,600);
  assert.equal(s.run.day,1);
  assert.equal(s.run.dayState.energyCurrent,2);
});

test('normal paid night charges exactly once and survives reload after payment',()=>{
  const cat=catalog();
  let s=dispatch(start(),{type:'endDay'},cat);
  assert.equal(s.run.flow.night?.phase,'LodgingResolution');

  s=dispatch(s,{type:'chooseLodging',id:'normal.room'},cat);
  assert.equal(s.run.resources.money,500);
  assert.equal(s.run.flow.night?.phase,'VoluntaryNightChoice');
  assert.equal(s.run.flow.night?.lodgingPaymentCommitted,true);
  assert.equal(s.run.housingState.paidForCurrentNight,true);

  s=parseSave(JSON.stringify(s),cat);
  assert.equal(s.run.resources.money,500);
  assert.throws(()=>dispatch(s,{type:'chooseLodging',id:'normal.room'},cat),/нельзя выбирать жильё|оплачен/);

  s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},cat);
  assert.equal(s.run.day,1);
  assert.equal(s.run.resources.money,500);
  assert.equal(s.run.dayState.energyCurrent,3);
  assert.equal(s.run.flow.night,null);
  assert.equal(s.run.housingState.paidForCurrentNight,false);
});

test('cheap lodging uses its own cost and housing tier',()=>{
  const cat=catalog();
  let s=dispatch(start(),{type:'endDay'},cat);
  s=dispatch(s,{type:'chooseLodging',id:'cheap.room'},cat);
  assert.equal(s.run.resources.money,550);
  assert.equal(s.run.housingState.current,'cheap');
  assert.equal(s.run.flow.night?.selectedLodgingId,'cheap.room');
  s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},cat);
  assert.equal(s.run.day,1);
});

test('street applies Grooming -1 and next-day Energy -1 exactly once',()=>{
  const cat=catalog();let s=start();s.run.character.stats.grooming=5;
  s=dispatch(s,{type:'endDay'},cat);
  s=dispatch(s,{type:'chooseLodging',id:'street.sleep'},cat);
  assert.equal(s.run.character.stats.grooming,5);
  assert.equal(s.run.dayState.nextDayModifiers.energyDelta,-1);
  s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},cat);
  assert.equal(s.run.day,1);
  assert.equal(s.run.character.stats.grooming,4);
  assert.equal(s.run.dayState.energyCurrent,2);
  assert.deepEqual(s.run.dayState.nextDayModifiers,{energyDelta:0,statEffects:[],tags:[]});

  s=dispatch(s,{type:'endDay'},cat);
  s=dispatch(s,{type:'chooseLodging',id:'normal.room'},cat);
  s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},cat);
  assert.equal(s.run.day,2);
  assert.equal(s.run.character.stats.grooming,4);
  assert.equal(s.run.dayState.energyCurrent,3);
});

test('night study gives immediate stat progress and only penalizes next-day Energy',()=>{
  const cat=catalog();let s=start();
  s.run.dayState.energyCurrent=1;
  s=dispatch(s,{type:'endDay'},cat);
  s=dispatch(s,{type:'chooseLodging',id:'normal.room'},cat);
  const beforeEnergy=s.run.dayState.energyCurrent;
  s=dispatch(s,{type:'chooseNightChoice',id:'night.study'},cat);
  assert.equal(s.run.character.stats.reason,3);
  assert.equal(beforeEnergy,1);
  assert.equal(s.run.dayState.energyCurrent,2);
  assert.equal(s.run.day,1);
});

test('voluntary relationship night consumes night slot but no daytime Energy',()=>{
  const partner=nightEvent('partner','after_choice',{
    priorityClass:'normal_progression',
    nightPolicy:{intercept:'after_choice',suppressLodgingPayment:false,suppressVoluntaryMenu:true,consumesNight:true}
  });
  const cat=catalog([partner]);let s=start();s.run.dayState.energyCurrent=1;
  s=dispatch(s,{type:'endDay'},cat);
  s=dispatch(s,{type:'chooseLodging',id:'normal.room'},cat);
  const energyBeforeChoice=s.run.dayState.energyCurrent;
  s=dispatch(s,{type:'chooseNightChoice',id:'partner.night'},cat);
  assert.equal(s.run.pending?.eventId,'night.partner');
  assert.equal(s.run.day,0);
  assert.equal(s.run.dayState.energyCurrent,energyBeforeChoice);
  assert.ok(s.run.progression.relationships['partner.rel'].facts.includes('night.met'));

  s=dispatch(s,{type:'choice',id:'continue'},cat);
  assert.equal(s.run.day,1);
  assert.equal(s.run.flow.night,null);
  assert.equal(s.run.dayState.energyCurrent,3);
});

test('post-lodging forced event happens after one payment and reload does not charge again',()=>{
  const forced=nightEvent('after','after_lodging',{
    nightPolicy:{intercept:'after_lodging',suppressLodgingPayment:false,suppressVoluntaryMenu:true,consumesNight:true}
  });
  const cat=catalog([forced]);let s=start();
  s=dispatch(s,{type:'endDay'},cat);
  s=dispatch(s,{type:'chooseLodging',id:'normal.room'},cat);
  assert.equal(s.run.resources.money,500);
  assert.equal(s.run.pending?.eventId,'night.after');

  s=parseSave(JSON.stringify(s),cat);
  const rng=s.run.rng;
  s=dispatch(s,{type:'choice',id:'continue'},cat);
  assert.equal(s.run.resources.money,500);
  assert.equal(s.run.day,1);
  assert.equal(s.run.flow.night,null);
  assert.equal(s.run.rng,rng);
});

test('probabilistic pending forced night survives reload without reroll',()=>{
  const forced=nightEvent('chance','before_lodging',{
    chance:{base:1,stat:'strength',perPoint:0,max:1},
    nightPolicy:{intercept:'before_lodging',suppressLodgingPayment:true,suppressVoluntaryMenu:true,consumesNight:true}
  });
  const cat=catalog([forced]);let s=start();s.run.rng=1;
  s=dispatch(s,{type:'endDay'},cat);
  assert.equal(s.run.pending?.eventId,'night.chance');
  const rngAfterRoll=s.run.rng;
  const variant=s.run.pending?.variantId;

  s=parseSave(JSON.stringify(s),cat);
  assert.equal(s.run.pending?.variantId,variant);
  assert.equal(s.run.rng,rngAfterRoll);
  s=dispatch(s,{type:'choice',id:'continue'},cat);
  assert.equal(s.run.rng,rngAfterRoll);
  assert.equal(s.run.day,1);
});

test('NightFlow advances calendar exactly once and blocks daytime actions while active',()=>{
  const cat=catalog();let s=start();
  s=dispatch(s,{type:'endDay'},cat);
  assert.throws(()=>dispatch(s,{type:'action',id:'work'},cat),/завершите ночь/);
  s=dispatch(s,{type:'chooseLodging',id:'normal.room'},cat);
  assert.throws(()=>dispatch(s,{type:'action',id:'work'},cat),/завершите ночь/);
  s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},cat);
  assert.equal(s.run.day,1);
  assert.throws(()=>dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},cat),/Ночная последовательность не начата|нельзя выбирать ночное занятие/);
  assert.equal(s.run.day,1);
});

test('legacy sleep compatibility uses the same NightFlow outcome',()=>{
  const cat=catalog();let s=start();
  s=dispatch(s,{type:'sleep',payment:'money'},cat);
  assert.equal(s.run.day,1);
  assert.equal(s.run.resources.money,500);
  assert.equal(s.run.dayState.energyCurrent,3);
  assert.equal(s.run.flow.night,null);

  s=dispatch(s,{type:'sleep',payment:'outside'},cat);
  assert.equal(s.run.day,2);
  assert.equal(s.run.dayState.energyCurrent,2);
  assert.equal(s.run.housingState.current,'street');
});

test('invalid persisted night references and impossible phase state are rejected',()=>{
  const cat=catalog();let s=start();
  s=dispatch(s,{type:'endDay'},cat);
  s=dispatch(s,{type:'chooseLodging',id:'normal.room'},cat);
  const raw=JSON.parse(JSON.stringify(s));
  raw.run.flow.night.selectedLodgingId='ghost.room';
  assert.throws(()=>parseSave(JSON.stringify(raw),cat),/lodging/);

  const raw2=JSON.parse(JSON.stringify(s));
  raw2.run.flow.night.selectedLodgingId=null;
  assert.throws(()=>parseSave(JSON.stringify(raw2),cat),/оплатил неизвестный ночлег/);
});

test('night policy validation rejects impossible payment suppression and unknown choice trigger',()=>{
  const bad=nightEvent('bad','after_lodging',{
    nightPolicy:{intercept:'after_lodging',suppressLodgingPayment:true,suppressVoluntaryMenu:true,consumesNight:true}
  });
  assert.throws(()=>catalog([bad]),/suppressLodgingPayment/);

  const unknown=nightEvent('unknown','after_choice',{
    reactionTriggers:[{kind:'nightChoiceCompleted',choice:'ghost.choice'}]
  });
  assert.throws(()=>catalog([unknown]),/Неизвестный night choice/);
});
