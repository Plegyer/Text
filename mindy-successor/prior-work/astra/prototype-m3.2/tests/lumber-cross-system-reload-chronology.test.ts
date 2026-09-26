import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {applyEffects,dispatch,freshSave,parseSave} from '../src/core/engine.ts';
import type {Catalog,Save} from '../src/core/schema.ts';

const chronology=JSON.parse(readFileSync('content/lumber-cross-system-reload-chronology.fixture.json','utf8'));
const baseDefinitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));
const productionPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-production.pack.json','utf8'));
const crossPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-cross-system.pack.json','utf8'));
const nightPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-night-acceptance.pack.json','utf8'));
const itemCapability=JSON.parse(readFileSync('content/lumber-item-capabilities.fixture.json','utf8'));

function definitions(){
  const d=structuredClone(baseDefinitions);
  d.lodgings=[{
    id:'lumber.normal-room',
    label:'Normal room',
    housing:'normal',
    moneyCost:chronology.exactOnce.lodgingMoneyCost,
    conditions:[],
    effects:[],
    nextDayEffects:[],
    nextDayEnergyDelta:0
  }];
  d.nightChoices=[{
    id:'lumber.foreman.night',
    label:'Talk with the Foreman',
    conditions:[
      {kind:'relationshipStage',relationship:'lumber.foreman',stage:'route-professional'}
    ],
    effects:[
      {kind:'incrementRelationshipCounter',relationship:'lumber.foreman',counter:'night_meetings',amount:1}
    ],
    nextDayEffects:[],
    nextDayEnergyDelta:0
  }];
  return d;
}

function catalog():Catalog{
  return loadCatalog(definitions(),[
    structuredClone(productionPack),
    structuredClone(crossPack),
    structuredClone(nightPack)
  ]);
}

function ready():Save{
  const s=freshSave();
  s.run.creation={remaining:0,allocated:{},complete:true};
  s.run.flags['story.arrived']=true;
  s.run.dayState.energyCurrent=3;
  return s;
}

function reload(s:Save,cat:Catalog){return parseSave(JSON.stringify(s),cat);}

function forestCapabilityFact(){
  const capability=itemCapability.capabilities.find((entry:any)=>entry.id==='enter_old_boundary');
  assert.ok(capability);
  return capability.runtimeAdapter.fact as string;
}

test('professional route chronology survives shift, milestone and Foreman reload boundaries without duplicate progress or Energy',()=>{
  const cat=catalog();
  let s=ready();

  s=dispatch(s,{type:'action',id:'lumber.shift'},cat);
  assert.equal(s.run.dayState.energyCurrent,2);
  assert.equal(s.run.progression.careers.lumber.counters.completed_shifts,1);
  assert.equal(s.run.pending?.eventId,'lumber.career-first-shift');

  s=reload(s,cat);
  assert.equal(s.run.dayState.energyCurrent,2);
  assert.equal(s.run.progression.careers.lumber.counters.completed_shifts,1);
  assert.equal(s.run.pending?.eventId,'lumber.career-first-shift');

  s=dispatch(s,{type:'choice',id:'continue'},cat);
  assert.equal(s.run.pending?.eventId,'lumber.foreman-notice');
  s=reload(s,cat);
  assert.equal(s.run.pending?.eventId,'lumber.foreman-notice');
  assert.equal(s.run.progression.careers.lumber.counters.completed_shifts,1);
  assert.equal(s.run.dayState.energyCurrent,2);

  s=dispatch(s,{type:'choice',id:'professional'},cat);
  assert.equal(s.run.progression.relationships['lumber.foreman'].stage,'route-professional');
  assert.equal(s.run.progression.relationships['lumber.foreman'].choices.route,'professional');
  s=reload(s,cat);
  assert.equal(s.run.progression.relationships['lumber.foreman'].stage,'route-professional');
  assert.equal(s.run.progression.relationships['lumber.foreman'].choices.route,'professional');
  assert.equal(s.run.progression.careers.lumber.counters.completed_shifts,1);
  assert.equal(s.run.dayState.energyCurrent,2);
});

test('Night reload chronology cannot duplicate lodging payment or Foreman Night progress',()=>{
  const cat=catalog();
  let s=ready();
  s=dispatch(s,{type:'action',id:'lumber.shift'},cat);
  s=dispatch(s,{type:'choice',id:'continue'},cat);
  s=dispatch(s,{type:'choice',id:'professional'},cat);

  const moneyBefore=s.run.resources.money;
  const energyBefore=s.run.dayState.energyCurrent;
  s=dispatch(s,{type:'endDay'},cat);
  s=dispatch(s,{type:'chooseLodging',id:'lumber.normal-room'},cat);
  assert.equal(s.run.resources.money,moneyBefore-100);
  assert.equal(s.run.flow.night?.lodgingPaymentCommitted,true);
  assert.equal(s.run.dayState.energyCurrent,energyBefore);

  s=reload(s,cat);
  assert.equal(s.run.resources.money,moneyBefore-100);
  assert.equal(s.run.flow.night?.lodgingPaymentCommitted,true);
  assert.throws(()=>dispatch(s,{type:'chooseLodging',id:'lumber.normal-room'},cat));

  s=dispatch(s,{type:'chooseNightChoice',id:'lumber.foreman.night'},cat);
  assert.equal(s.run.pending?.eventId,'lumber-night.foreman-professional');
  assert.equal(s.run.progression.relationships['lumber.foreman'].counters.night_meetings,1);
  assert.equal(s.run.resources.money,moneyBefore-100);
  assert.equal(s.run.dayState.energyCurrent,energyBefore);

  s=reload(s,cat);
  assert.equal(s.run.pending?.eventId,'lumber-night.foreman-professional');
  assert.equal(s.run.progression.relationships['lumber.foreman'].counters.night_meetings,1);
  assert.equal(s.run.resources.money,moneyBefore-100);

  s=dispatch(s,{type:'choice',id:'continue'},cat);
  assert.equal(s.run.progression.relationships['lumber.foreman'].counters.night_meetings,1);
  assert.equal(s.run.progression.relationships['lumber.foreman'].facts.filter(x=>x==='night-followup-complete').length,1);
  assert.equal(s.run.resources.money,moneyBefore-100);
});

test('Forest reload chronology preserves entry/checkpoint/result and complex ending exactly once',()=>{
  const cat=catalog();
  let s=ready();
  s=applyEffects(s,[{kind:'addWorldFact',fact:forestCapabilityFact()}],cat);

  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},cat);
  assert.equal(s.run.dayState.energyCurrent,1);
  assert.equal(s.run.flow.activity?.checkpoint,'entry');
  s=reload(s,cat);
  assert.equal(s.run.dayState.energyCurrent,1);
  assert.equal(s.run.flow.activity?.checkpoint,'entry');

  s=dispatch(s,{type:'activityAction',id:'advance'},cat);
  assert.equal(s.run.flow.activity?.checkpoint,'counter.step.1');
  const envelope=structuredClone(s.run.flow.activity);
  s=reload(s,cat);
  assert.deepEqual(s.run.flow.activity,envelope);
  assert.equal(s.run.dayState.energyCurrent,1);

  s=dispatch(s,{type:'activityAction',id:'advance'},cat);
  assert.equal(s.run.pending?.eventId,'lumber-cross.activity-forest-return');
  assert.equal(s.run.progression.worldFacts.filter(x=>x==='lumber.forest.truth-known').length,1);
  assert.equal(s.run.dayState.energyCurrent,1);

  s=reload(s,cat);
  assert.equal(s.run.pending?.eventId,'lumber-cross.activity-forest-return');
  assert.equal(s.run.progression.worldFacts.filter(x=>x==='lumber.forest.truth-known').length,1);
  assert.equal(s.run.dayState.energyCurrent,1);

  s=dispatch(s,{type:'choice',id:'continue'},cat);
  assert.equal(s.run.progression.careers.lumber.facts.filter(x=>x==='forest-truth-known').length,1);
  assert.equal(s.run.progression.careers.lumber.facts.filter(x=>x==='forest-problem-resolved').length,1);
  assert.ok(s.run.endings.eligible.includes('ending.lumber.forest'));

  s=dispatch(s,{type:'commitEnding',id:'ending.lumber.forest'},cat);
  s=reload(s,cat);
  s=dispatch(s,{type:'completeEnding'},cat);
  assert.equal(s.run.endings.result?.endingId,'ending.lumber.forest');
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,[]);
  assert.deepEqual(s.meta.hardWorkProgress,[]);
  const tx=s.run.endings.result!.transactionId;

  s=reload(s,cat);
  const again=dispatch(s,{type:'completeEnding'},cat);
  assert.deepEqual(again.meta.appliedResultTransactions,[tx]);
  assert.deepEqual(again.meta.hardWorkProgress,[]);
});

test('Hard Work reload chronology grants exact hardWork:lumber once and never on commit',()=>{
  const cat=catalog();
  let s=ready();
  s.run.progression.careers.lumber={
    stage:'accepted-hand',
    shifts:0,
    counters:{completed_shifts:49},
    choices:{},
    facts:[]
  };

  s=dispatch(s,{type:'action',id:'lumber.shift'},cat);
  assert.equal(s.run.progression.careers.lumber.counters.completed_shifts,50);
  assert.equal(s.run.dayState.energyCurrent,2);
  assert.ok(s.run.endings.eligible.includes('ending.lumber.hard-work'));
  s=reload(s,cat);
  assert.equal(s.run.progression.careers.lumber.counters.completed_shifts,50);
  assert.equal(s.run.dayState.energyCurrent,2);

  s=dispatch(s,{type:'commitEnding',id:'ending.lumber.hard-work'},cat);
  assert.deepEqual(s.meta.hardWorkProgress,[]);
  assert.equal(s.run.endings.result,null);
  s=reload(s,cat);
  assert.deepEqual(s.meta.hardWorkProgress,[]);
  assert.equal(s.run.endings.committed,'ending.lumber.hard-work');

  s=dispatch(s,{type:'completeEnding'},cat);
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,['hardWork:lumber']);
  assert.deepEqual(s.meta.hardWorkProgress,['lumber']);
  const tx=s.run.endings.result!.transactionId;
  s=reload(s,cat);

  const again=dispatch(s,{type:'completeEnding'},cat);
  assert.deepEqual(again.run.endings.result?.appliedMetaRewardIds,['hardWork:lumber']);
  assert.deepEqual(again.meta.hardWorkProgress,['lumber']);
  assert.equal(again.meta.hardWorkProgress.filter(x=>x==='lumber').length,1);
  assert.deepEqual(again.meta.appliedResultTransactions,[tx]);
});

test('chronology fixture locks exact-once invariants and does not add Hard Work prerequisites',()=>{
  assert.equal(chronology.exactOnce.lodgingMoneyCost,100);
  assert.equal(chronology.exactOnce.nightMeetingCounter,'night_meetings');
  assert.equal(chronology.exactOnce.hardWorkRewardId,'hardWork:lumber');
  assert.deepEqual(chronology.lockedContracts.hardWorkConditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.equal(chronology.lockedContracts.activityContinuation,'activityResult');
});
