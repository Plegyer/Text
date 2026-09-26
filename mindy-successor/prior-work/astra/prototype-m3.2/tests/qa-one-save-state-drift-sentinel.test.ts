import test from 'node:test';
import assert from 'node:assert/strict';

import {catalog,started} from './helpers.ts';
import * as engine from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';

type RouteRuntime={
  availableActivityActions?:(state:Save,catalog:any)=>Array<{id:string;label:string}>;
};

const runtime=engine as typeof engine & RouteRuntime;
const routeRuntimePresent=typeof runtime.availableActivityActions==='function';

function reload(state:Save){
  return runtime.parseSave(JSON.stringify(state),catalog);
}

function assertStableCore(
  state:Save,
  expected:{
    money:number;
    shifts:number;
    foremanStage?:string;
    lessons:number;
  }
){
  assert.equal(state.run.resources.money,expected.money,'money drifted unexpectedly');
  assert.equal(
    state.run.progression.careers.lumber?.counters.completed_shifts,
    expected.shifts,
    'Lumber shift counter drifted unexpectedly'
  );
  if(expected.foremanStage!==undefined){
    assert.equal(
      state.run.progression.relationships['lumber.foreman']?.stage,
      expected.foremanStage,
      'Foreman stage drifted unexpectedly'
    );
  }
  assert.equal(
    state.run.progression.school.tracks['school.track.arcana']?.counters.lessons_completed??0,
    expected.lessons,
    'School paid-lesson progress drifted unexpectedly'
  );
}

function resolveOptionalSchoolPending(state:Save){
  const pending=state.run.flow.pendingScene;
  if(!pending)return state;

  assert.ok(
    pending.allowedChoiceIds.includes('continue'),
    `unexpected School-boundary pending scene without continue choice: ${pending.eventId}`
  );

  const beforeMoney=state.run.resources.money;
  const beforeEnergy=state.run.dayState.energyCurrent;
  const beforeLessons=
    state.run.progression.school.tracks['school.track.arcana']?.counters.lessons_completed??0;

  const resolved=runtime.dispatch(state,{type:'choice',id:'continue'},catalog);

  assert.equal(resolved.run.resources.money,beforeMoney);
  assert.equal(resolved.run.dayState.energyCurrent,beforeEnergy);
  assert.equal(
    resolved.run.progression.school.tracks['school.track.arcana']?.counters.lessons_completed??0,
    beforeLessons
  );
  return resolved;
}

test('one-Save state-drift sentinels preserve unrelated domains exactly once across the RC path', {
  skip:!routeRuntimePresent
}, ()=>{
  let s=started();

  const startMoney=s.run.resources.money;
  const startDay=s.run.calendar.elapsedDays;
  const startEnergy=s.run.dayState.energyCurrent;

  // Lumber sentinel: one Work cost/counter, no money drift.
  s=runtime.dispatch(s,{type:'action',id:'lumber.shift'},catalog);
  assert.equal(s.run.dayState.energyCurrent,startEnergy-1);
  assert.equal(s.run.resources.money,startMoney);
  assert.equal(s.run.progression.careers.lumber?.counters.completed_shifts,1);

  s=reload(s);
  assert.equal(s.run.dayState.energyCurrent,startEnergy-1);
  assert.equal(s.run.progression.careers.lumber?.counters.completed_shifts,1);

  // Foreman sentinel: reactive route changes relationship only, not the Work charge.
  s=runtime.dispatch(s,{type:'choice',id:'continue'},catalog);
  s=reload(s);
  s=runtime.dispatch(s,{type:'choice',id:'professional'},catalog);

  assert.equal(s.run.progression.relationships['lumber.foreman']?.stage,'route-professional');
  assert.equal(s.run.dayState.energyCurrent,startEnergy-1);
  assertStableCore(s,{
    money:startMoney,
    shifts:1,
    foremanStage:'route-professional',
    lessons:0
  });

  // School sentinel: exact money/Energy/progress once, prior Lumber/Foreman state untouched.
  const schoolEnergy=s.run.dayState.energyCurrent;
  s=runtime.dispatch(s,{type:'schoolLesson',id:'school.course.arcana'},catalog);

  assert.equal(s.run.resources.money,startMoney-500);
  assert.equal(s.run.dayState.energyCurrent,schoolEnergy-1);
  assert.equal(
    s.run.progression.school.tracks['school.track.arcana']?.counters.lessons_completed,
    1
  );
  assert.equal(
    s.run.progression.school.tracks['school.track.arcana']?.counters.night_study_sessions??0,
    0
  );
  assertStableCore(s,{
    money:startMoney-500,
    shifts:1,
    foremanStage:'route-professional',
    lessons:1
  });

  s=reload(s);
  s=resolveOptionalSchoolPending(s);
  assertStableCore(s,{
    money:startMoney-500,
    shifts:1,
    foremanStage:'route-professional',
    lessons:1
  });

  // Night sentinel: lodging and relationship Night progress exactly once; one day advance.
  s=runtime.dispatch(s,{type:'endDay'},catalog);
  s=runtime.dispatch(s,{type:'chooseLodging',id:'lodging.normal'},catalog);
  assert.equal(s.run.resources.money,startMoney-600);

  s=reload(s);
  assert.equal(s.run.resources.money,startMoney-600);

  s=runtime.dispatch(s,{type:'chooseNightChoice',id:'lumber.foreman.night'},catalog);
  assert.equal(
    s.run.progression.relationships['lumber.foreman']?.counters.night_meetings,
    1
  );

  s=reload(s);
  assert.equal(
    s.run.progression.relationships['lumber.foreman']?.counters.night_meetings,
    1
  );

  s=runtime.dispatch(s,{type:'choice',id:'continue'},catalog);
  assert.equal(s.run.calendar.elapsedDays,startDay+1);
  assert.equal(s.run.flow.night,null);
  assertStableCore(s,{
    money:startMoney-600,
    shifts:1,
    foremanStage:'route-professional',
    lessons:1
  });

  // Forest sentinel: natural logging-road route, typed/public result, no reset of prior domains.
  const forestEntryEnergy=s.run.dayState.energyCurrent;
  s=runtime.dispatch(s,{type:'enterActivity',id:'lumber.forest'},catalog);
  assert.equal(s.run.dayState.energyCurrent,forestEntryEnergy-2);

  let actions=runtime.availableActivityActions!(s,catalog).map(action=>action.id);
  assert.ok(actions.includes('forest.route.logging-road'));
  assert.equal(actions.includes('forest.route.old-boundary'),false);
  assert.equal(actions.includes('advance'),false);

  s=reload(s);
  assert.equal(s.run.dayState.energyCurrent,forestEntryEnergy-2);

  s=runtime.dispatch(s,{type:'activityAction',id:'forest.route.logging-road'} as any,catalog);
  assert.equal(s.run.flow.activity?.internalState.routeId,'logging-road');

  s=reload(s);
  actions=runtime.availableActivityActions!(s,catalog).map(action=>action.id);
  assert.ok(actions.includes('advance'));
  assert.ok(actions.includes('escape'));

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
  assertStableCore(s,{
    money:startMoney-600,
    shifts:1,
    foremanStage:'route-professional',
    lessons:1
  });

  // Threshold sentinel: only repetition is accelerated; 49 must not be eligible.
  s.run.progression.careers.lumber!.counters.completed_shifts=49;
  s=reload(s);

  assert.equal(
    s.run.endings.eligible.includes('ending.lumber.hard-work'),
    false,
    'Hard Work must not be eligible at 49'
  );
  assert.deepEqual(s.meta.hardWorkProgress,[]);

  s=runtime.dispatch(s,{type:'action',id:'lumber.shift'},catalog);
  assert.equal(s.run.progression.careers.lumber?.counters.completed_shifts,50);
  assert.ok(s.run.endings.eligible.includes('ending.lumber.hard-work'));
  assert.ok(s.run.endings.eligible.includes('ending.lumber.forest'));
  assert.deepEqual(s.meta.hardWorkProgress,[]);
  assertStableCore(s,{
    money:startMoney-600,
    shifts:50,
    foremanStage:'route-professional',
    lessons:1
  });

  // Ending sentinel: commit has no reward; completion applies exact reward once.
  s=reload(s);
  s=runtime.dispatch(s,{type:'commitEnding',id:'ending.lumber.hard-work'},catalog);
  assert.equal(s.run.status,'ending_committed');
  assert.deepEqual(s.meta.hardWorkProgress,[]);

  s=reload(s);
  assert.deepEqual(s.meta.hardWorkProgress,[]);

  s=runtime.dispatch(s,{type:'completeEnding'},catalog);
  assert.equal(s.run.status,'ended');
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,['hardWork:lumber']);
  assert.deepEqual(s.meta.hardWorkProgress,['lumber']);

  const transactionId=s.run.endings.result!.transactionId;
  const once=reload(s);
  const twice=reload(once);

  assert.deepEqual(twice.meta.hardWorkProgress,['lumber']);
  assert.deepEqual(twice.run.endings.result?.appliedMetaRewardIds,['hardWork:lumber']);
  assert.equal(
    twice.meta.appliedResultTransactions.filter(id=>id===transactionId).length,
    1,
    'ending transaction duplicated across reload'
  );

  // Before New Run, unrelated completed-run domains are still present exactly once.
  assertStableCore(twice,{
    money:startMoney-600,
    shifts:50,
    foremanStage:'route-professional',
    lessons:1
  });
});
