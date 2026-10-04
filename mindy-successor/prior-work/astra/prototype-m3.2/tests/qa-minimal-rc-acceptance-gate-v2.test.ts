import test from 'node:test';
import assert from 'node:assert/strict';

import {catalog,started} from './helpers.ts';
import * as engine from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';

type RcRuntime={
  availableActivityActions?:(state:Save,catalog:any)=>Array<{id:string;label:string}>;
  itemCapabilities?:(state:Save,catalog?:any)=>string[];
  hasItemCapability?:(state:Save,capability:string,catalog?:any)=>boolean;
};

const runtime=engine as typeof engine & RcRuntime;
const currentRcRuntime=
  typeof runtime.availableActivityActions==='function' &&
  typeof runtime.itemCapabilities==='function' &&
  typeof runtime.hasItemCapability==='function';

function reload(state:Save){
  return runtime.parseSave(JSON.stringify(state),catalog);
}
function resolveV14PovertyNight(state:Save){
  let s=state;
  let guard=0;
  while(s.run.pending?.eventId.startsWith('poverty-closure-production-v14.')){
    if(++guard>4)throw new Error('v14 poverty Night cascade exceeded guard');
    const pending=s.run.pending;
    const event=catalog.events.find(entry=>entry.id===pending.eventId);
    assert.ok(event,pending.eventId);
    const choice=event.choices.find(entry=>(pending.allowedChoiceIds??event.choices.map(candidate=>candidate.id)).includes(entry.id));
    assert.ok(choice,pending.eventId);
    s=runtime.dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}

function resolveD41LumberMilestones(state:Save){
  let s=state,guard=0;
  while(s.run.pending&&['lumber.career-trusted-worker','lumber.career-veteran'].includes(s.run.pending.eventId)){
    if(++guard>4)throw new Error('D41 Lumber milestone cascade exceeded guard');
    const event=catalog.events.find(entry=>entry.id===s.run.pending!.eventId);
    assert.ok(event,s.run.pending.eventId);
    const choice=event.choices.find(entry=>(s.run.pending!.allowedChoiceIds??event.choices.map(candidate=>candidate.id)).includes(entry.id));
    assert.ok(choice,event.id);
    s=runtime.dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}


test('minimal RC locks exact Hard Work contract and inventory-derived capability semantics', {
  skip:!currentRcRuntime
}, ()=>{
  const hardWork=catalog.definitions.endings.find(
    ending=>ending.id==='ending.lumber.hard-work'
  );
  assert.ok(hardWork);

  assert.deepEqual(hardWork.conditions,[{
    kind:'careerCounter',
    career:'lumber',
    counter:'completed_shifts',
    op:'gte',
    value:50
  }]);

  assert.deepEqual(hardWork.metaRewards,[{
    kind:'hardWork',
    rewardId:'hardWork:lumber',
    career:'lumber'
  }]);

  const noItem=started();
  noItem.run.progression.worldFacts.push('lumber.capability.enter-old-boundary');
  assert.equal(
    runtime.hasItemCapability!(noItem,'enter_old_boundary',catalog),
    false
  );

  const withItem=started();
  withItem.run.resources.inventory.old_boundary_token=1;
  assert.equal(
    runtime.hasItemCapability!(withItem,'enter_old_boundary',catalog),
    true
  );
});

test('minimal RC schema4 pre-option Activity compatibility keeps legacy advance and escape', {
  skip:!currentRcRuntime
}, ()=>{
  let s=started();
  s=runtime.dispatch(s,{type:'enterActivity',id:'lumber.forest'},catalog);

  const raw=JSON.parse(JSON.stringify(s));
  delete raw.run.flow.activity.optionModelVersion;
  delete raw.run.flow.activity.internalState.routeId;
  delete raw.run.flow.activity.internalState.resolvedOptionIds;

  const restored=runtime.parseSave(JSON.stringify(raw),catalog);
  assert.equal(restored.run.flow.activity?.optionModelVersion,0);

  assert.deepEqual(
    runtime.availableActivityActions!(restored,catalog).map(action=>action.id),
    ['advance','escape']
  );

  const advanced=runtime.dispatch(
    restored,
    {type:'activityAction',id:'advance'},
    catalog
  );
  assert.equal(advanced.run.flow.activity?.internalState.progress,1);
});

test('minimal RC one-Save path proves School, Night, natural Forest and Hard Work exactly once', {
  skip:!currentRcRuntime
}, ()=>{
  let s=started();

  const startMoney=s.run.resources.money;
  const startDay=s.run.calendar.elapsedDays;

  s=runtime.dispatch(s,{type:'action',id:'lumber.shift'},catalog);
  const lumberMoney=startMoney+16;
  assert.equal(s.run.resources.money,lumberMoney);
  assert.equal(s.run.dayState.energyCurrent,2);
  assert.equal(s.run.progression.careers.lumber?.counters.completed_shifts,1);

  s=reload(s);
  s=runtime.dispatch(s,{type:'choice',id:'continue'},catalog);
  s=reload(s);
  s=runtime.dispatch(s,{type:'choice',id:'professional'},catalog);

  assert.equal(
    s.run.progression.relationships['lumber.foreman']?.stage,
    'route-professional'
  );

  s=runtime.dispatch(s,{type:'schoolLesson',id:'school.course.arcana'},catalog);
  assert.equal(s.run.resources.money,lumberMoney-500);
  assert.equal(s.run.dayState.energyCurrent,1);
  assert.equal(
    s.run.progression.school.tracks['school.track.arcana']?.counters.lessons_completed,
    1
  );
  assert.equal(
    s.run.progression.school.tracks['school.track.arcana']?.counters.night_study_sessions??0,
    0
  );
  assert.equal(
    s.run.progression.worldFacts.includes('lumber.school.management-ready'),
    false
  );

  if(s.run.flow.pendingScene){
    const pending=s.run.flow.pendingScene;
    assert.equal(pending.eventId,'base.school');
    assert.ok((pending.allowedChoiceIds??[]).includes('listen'));

    const money=s.run.resources.money;
    const energy=s.run.dayState.energyCurrent;
    const lessons=
      s.run.progression.school.tracks['school.track.arcana']?.counters.lessons_completed;

    s=reload(s);
    s=runtime.dispatch(s,{type:'choice',id:'listen'},catalog);

    assert.equal(s.run.resources.money,money);
    assert.equal(s.run.dayState.energyCurrent,energy);
    assert.equal(
      s.run.progression.school.tracks['school.track.arcana']?.counters.lessons_completed,
      lessons
    );
  }

  s=runtime.dispatch(s,{type:'action',id:'forest.collect-field-kit'},catalog);
  assert.equal(s.run.resources.inventory.field_preservation_kit,1);
  assert.ok(s.run.progression.worldFacts.includes('forest.school-field-notes'));

  s=reload(s);
  s=runtime.dispatch(s,{type:'endDay'},catalog);
  s=runtime.dispatch(s,{type:'chooseLodging',id:'lodging.normal'},catalog);
  assert.equal(s.run.resources.money,lumberMoney-600);

  s=reload(s);
  assert.equal(s.run.resources.money,lumberMoney-600);
  s=resolveV14PovertyNight(s);
  assert.equal(s.run.flow.night?.phase,'VoluntaryNightChoice');

  s=runtime.dispatch(s,{type:'chooseNightChoice',id:'lumber.foreman.night'},catalog);
  assert.equal(
    s.run.progression.relationships['lumber.foreman']?.counters.night_meetings,
    1
  );

  s=reload(s);
  s=runtime.dispatch(s,{type:'choice',id:'continue'},catalog);

  assert.equal(s.run.calendar.elapsedDays,startDay+1);
  assert.equal(s.run.flow.night,null);
  assert.equal(s.run.resources.money,lumberMoney-600);

  const forestEnergy=s.run.dayState.energyCurrent;
  s=runtime.dispatch(s,{type:'enterActivity',id:'lumber.forest'},catalog);
  assert.equal(s.run.dayState.energyCurrent,forestEnergy-2);

  let actions=runtime.availableActivityActions!(s,catalog).map(action=>action.id);
  assert.ok(actions.includes('forest.route.logging-road'));
  assert.equal(actions.includes('forest.route.old-boundary'),false);
  assert.equal(actions.includes('advance'),false);

  s=reload(s);
  s=runtime.dispatch(
    s,
    {type:'activityAction',id:'forest.route.logging-road'} as any,
    catalog
  );

  assert.equal(s.run.flow.activity?.internalState.routeId,'logging-road');

  s=reload(s);
  actions=runtime.availableActivityActions!(s,catalog).map(action=>action.id);
  assert.ok(actions.includes('advance'));
  assert.ok(actions.includes('escape'));

  s=runtime.dispatch(s,{type:'activityAction',id:'forest.challenge.logging-navigation'},catalog);
  s=reload(s);
  s=runtime.dispatch(s,{type:'activityAction',id:'forest.challenge.logging-spring-mud'},catalog);
  s=reload(s);
  s=runtime.dispatch(s,{type:'activityAction',id:'forest.challenge.logging-preserve-sample'},catalog);
  s=reload(s);
  s=runtime.dispatch(s,{type:'activityAction',id:'advance'},catalog);
  s=reload(s);
  s=runtime.dispatch(s,{type:'activityAction',id:'advance'},catalog);

  assert.equal(s.run.flow.activity,null);
  assert.ok(s.run.progression.worldFacts.includes('lumber.forest.truth-known'));
  assert.equal(s.run.flow.pendingScene?.eventId,'lumber-cross.activity-forest-return');

  s=reload(s);
  s=runtime.dispatch(s,{type:'choice',id:'continue'},catalog);

  assert.ok(s.run.progression.careers.lumber?.facts.includes('forest-truth-known'));
  assert.ok(s.run.progression.careers.lumber?.facts.includes('forest-problem-resolved'));

  s.run.progression.careers.lumber!.counters.completed_shifts=49;
  s=reload(s);

  assert.equal(
    s.run.endings.eligible.includes('ending.lumber.hard-work'),
    false
  );

  s=runtime.dispatch(s,{type:'action',id:'lumber.shift'},catalog);
  s=resolveD41LumberMilestones(s);
  assert.equal(s.run.pending,null);
  assert.equal(s.run.progression.careers.lumber?.stage,'veteran');

  assert.equal(s.run.progression.careers.lumber?.counters.completed_shifts,50);
  assert.ok(s.run.endings.eligible.includes('ending.lumber.hard-work'));
  assert.ok(s.run.endings.eligible.includes('ending.lumber.forest'));
  assert.deepEqual(s.meta.hardWorkProgress,[]);

  s=reload(s);
  s=runtime.dispatch(s,{type:'commitEnding',id:'ending.lumber.hard-work'},catalog);
  assert.equal(s.run.status,'ending_committed');
  assert.deepEqual(s.meta.hardWorkProgress,[]);

  s=reload(s);
  s=runtime.dispatch(s,{type:'completeEnding'},catalog);

  assert.equal(s.run.status,'ended');
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,['hardWork:lumber']);
  assert.deepEqual(s.meta.hardWorkProgress,['lumber']);

  const transactionId=s.run.endings.result!.transactionId;
  s=reload(s);
  s=reload(s);

  assert.equal(
    s.meta.appliedResultTransactions.filter(id=>id===transactionId).length,
    1
  );
  assert.deepEqual(s.meta.hardWorkProgress,['lumber']);

  s=runtime.dispatch(s,{type:'newLife'},catalog);
  assert.equal(s.run.character.stats.strength,1);
  assert.equal(s.run.character.stats.endurance,1);

  s=reload(s);
  assert.equal(s.run.character.stats.strength,1);
  assert.equal(s.run.character.stats.endurance,1);
  assert.deepEqual(s.meta.hardWorkProgress,['lumber']);
});
