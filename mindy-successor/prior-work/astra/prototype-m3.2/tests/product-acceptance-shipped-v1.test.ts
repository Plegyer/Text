import test from 'node:test';
import assert from 'node:assert/strict';

import {catalog,started} from './helpers.ts';
import {availableActivityActions,dispatch,parseSave} from '../src/core/engine.ts';
import {SCHOOL_COURSES} from '../src/core/school.ts';
import type {Save} from '../src/core/schema.ts';

function reload(state:Save){
  return parseSave(JSON.stringify(state),catalog);
}

function resolveForemanRoute(){
  let s=started();
  s=dispatch(s,{type:'action',id:'lumber.shift'},catalog);
  assert.equal(s.run.flow.pendingScene?.eventId,'lumber.career-first-shift');
  assert.equal(s.run.flow.pendingScene?.presentationId,'job/lumber/event/lumber-career-first-shift/default');
  s=reload(s);
  s=dispatch(s,{type:'choice',id:'continue'},catalog);
  assert.equal(s.run.flow.pendingScene?.eventId,'lumber.foreman-notice');
  assert.equal(s.run.flow.pendingScene?.presentationId,'relationship/lumber-foreman/lumber-foreman-notice/default');
  s=reload(s);
  s=dispatch(s,{type:'choice',id:'professional'},catalog);
  assert.equal(s.run.flow.pendingScene,null);
  assert.equal(s.run.progression.relationships['lumber.foreman']?.stage,'route-professional');
  return s;
}

test('PA shipped catalog contains target Lumber/School/Night/Activity surface without synthetic School action',()=>{
  assert.ok(catalog.definitions.actions.some(action=>action.id==='lumber.shift'));
  assert.equal(catalog.definitions.actions.some(action=>action.id==='school.lumber-management'),false);
  assert.ok(catalog.definitions.careers?.some(machine=>machine.id==='lumber'));
  assert.ok(catalog.definitions.relationships?.some(machine=>machine.id==='lumber.foreman'));
  assert.ok(catalog.definitions.activities.some(activity=>activity.id==='lumber.forest'));
  assert.ok(catalog.definitions.lodgings.some(lodging=>lodging.id==='lodging.normal'));
  assert.ok(catalog.definitions.nightChoices.some(choice=>choice.id==='lumber.foreman.night'));
  assert.equal(SCHOOL_COURSES.length,8);

  const hardWork=catalog.definitions.endings.find(ending=>ending.id==='ending.lumber.hard-work');
  assert.ok(hardWork);
  assert.deepEqual(hardWork.conditions,[{
    kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50
  }]);
  assert.deepEqual(hardWork.metaRewards,[{
    kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'
  }]);
});

test('PA02-PA06: target Lumber shift -> reactive milestone -> professional Foreman route costs one Energy total',()=>{
  const before=started();
  const energyBefore=before.run.dayState.energyCurrent;

  let s=dispatch(before,{type:'action',id:'lumber.shift'},catalog);
  assert.equal(s.run.dayState.energyCurrent,energyBefore-1);
  assert.equal(s.run.progression.careers.lumber?.counters.completed_shifts,1);
  assert.equal(s.run.flow.lastAction?.presentationId,'job/lumber/result/default');
  assert.equal(s.run.flow.pendingScene?.eventId,'lumber.career-first-shift');

  s=reload(s);
  assert.equal(s.run.flow.pendingScene?.eventId,'lumber.career-first-shift');
  s=dispatch(s,{type:'choice',id:'continue'},catalog);
  assert.equal(s.run.dayState.energyCurrent,energyBefore-1);
  assert.equal(s.run.progression.careers.lumber?.stage,'accepted-hand');
  assert.equal(s.run.flow.pendingScene?.eventId,'lumber.foreman-notice');

  s=reload(s);
  s=dispatch(s,{type:'choice',id:'professional'},catalog);
  assert.equal(s.run.dayState.energyCurrent,energyBefore-1);
  assert.equal(s.run.progression.relationships['lumber.foreman']?.stage,'route-professional');
  assert.equal(s.run.progression.relationships['lumber.foreman']?.choices.route,'professional');
});

test('PA04: shipped Lumber seasonal variants are deterministic repeatable Work presentations',()=>{
  const cases=[
    {day:0,media:'job.lumber.shift.spring.default'},
    {day:10,media:'job.lumber.shift.summer.default'},
    {day:20,media:'job.lumber.shift.autumn.default'},
    {day:30,media:'job.lumber.shift.winter.default'}
  ] as const;

  for(const c of cases){
    const before=started();
    before.run.calendar.elapsedDays=c.day;
    const energyBefore=before.run.dayState.energyCurrent;
    const out=dispatch(before,{type:'action',id:'lumber.shift'},catalog);
    assert.equal(out.run.dayState.energyCurrent,energyBefore-1);
    assert.deepEqual(out.run.flow.lastAction?.media,[c.media]);
    assert.equal(out.run.flow.lastAction?.presentationId,'job/lumber/result/default');
    assert.equal(out.run.progression.careers.lumber?.counters.completed_shifts,1);
  }
});

test('PA07 evidence: paid School lesson is shipped, typed, exactly once, and exposes the remaining public-fact blocker',()=>{
  let s=started();
  const moneyBefore=s.run.resources.money;
  const energyBefore=s.run.dayState.energyCurrent;
  const statsBefore={
    magic:s.run.character.stats.magic,
    reason:s.run.character.stats.reason,
    creativity:s.run.character.stats.creativity
  };

  s=dispatch(s,{type:'schoolLesson',id:'school.course.arcana'},catalog);
  assert.equal(s.run.resources.money,moneyBefore-500);
  assert.equal(s.run.dayState.energyCurrent,energyBefore-1);
  assert.equal(s.run.character.stats.magic,statsBefore.magic+4);
  assert.equal(s.run.character.stats.reason,statsBefore.reason+4);
  assert.equal(s.run.character.stats.creativity,statsBefore.creativity+2);
  assert.equal(
    s.run.progression.school.tracks['school.track.arcana']?.counters.lessons_completed,
    1
  );
  assert.equal(s.run.flow.lastAction?.presentationId,'school/arcana/lesson/default');
  assert.equal(s.run.progression.worldFacts.includes('lumber.school.management-ready'),false);

  const once=reload(s);
  const twice=reload(once);
  assert.equal(twice.run.resources.money,moneyBefore-500);
  assert.equal(twice.run.dayState.energyCurrent,energyBefore-1);
  assert.equal(
    twice.run.progression.school.tracks['school.track.arcana']?.counters.lessons_completed,
    1
  );
});

test('PA10-PA13: normal lodging and optional Foreman Night are shipped and exactly-once across reload',()=>{
  let s=resolveForemanRoute();
  const moneyBefore=s.run.resources.money;

  s=dispatch(s,{type:'endDay'},catalog);
  assert.equal(s.run.flow.night?.phase,'LodgingResolution');
  s=dispatch(s,{type:'chooseLodging',id:'lodging.normal'},catalog);
  assert.equal(s.run.resources.money,moneyBefore-100);
  assert.equal(s.run.flow.night?.lodgingPaymentCommitted,true);

  s=reload(s);
  assert.equal(s.run.resources.money,moneyBefore-100);
  s=dispatch(s,{type:'chooseNightChoice',id:'lumber.foreman.night'},catalog);
  assert.equal(s.run.flow.pendingScene?.eventId,'lumber-night.foreman-professional');
  assert.equal(s.run.dayState.energyCurrent,2);
  assert.equal(s.run.progression.relationships['lumber.foreman']?.counters.night_meetings,1);

  s=reload(s);
  assert.equal(s.run.resources.money,moneyBefore-100);
  assert.equal(s.run.progression.relationships['lumber.foreman']?.counters.night_meetings,1);
  s=dispatch(s,{type:'choice',id:'continue'},catalog);
  assert.equal(s.run.flow.night,null);
  assert.equal(s.run.calendar.elapsedDays,1);
  assert.equal(s.run.dayState.energyCurrent,3);
  assert.equal(s.run.resources.money,moneyBefore-100);
});

test('PA14-PA20: Forest entry/logging-road/reload/success/escape are shipped; Old Boundary item action-space remains acquisition-accelerated',()=>{
  let s=started();
  const energyBefore=s.run.dayState.energyCurrent;
  // Dedicated Activity fixture: acquisition is covered by the v12 producer tests.
  s.run.character.stats.reason=3;
  s.run.character.stats.strength=4;
  s.run.resources.inventory.field_preservation_kit=1;

  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},catalog);
  assert.equal(s.run.dayState.energyCurrent,energyBefore-2);
  assert.equal(s.run.flow.activity?.checkpoint,'entry');

  let actions=availableActivityActions(s,catalog).map(action=>action.id);
  assert.ok(actions.includes('forest.route.logging-road'));
  assert.equal(actions.includes('forest.route.old-boundary'),false);
  assert.equal(actions.includes('advance'),false);

  s=reload(s);
  assert.equal(s.run.dayState.energyCurrent,energyBefore-2);
  s=dispatch(s,{type:'activityAction',id:'forest.route.logging-road'},catalog);
  assert.equal(s.run.flow.activity?.internalState.routeId,'logging-road');

  s=reload(s);
  s=dispatch(s,{type:'activityAction',id:'forest.challenge.logging-navigation'},catalog);
  assert.equal(s.run.flow.activity?.internalState.progress,1);
  assert.equal(s.run.dayState.energyCurrent,energyBefore-2);

  s=reload(s);
  s=dispatch(s,{type:'activityAction',id:'forest.challenge.logging-spring-mud'},catalog);
  assert.equal(s.run.flow.activity?.internalState.progress,2);

  s=reload(s);
  s=dispatch(s,{type:'activityAction',id:'forest.challenge.logging-preserve-sample'},catalog);
  assert.equal(s.run.flow.activity?.internalState.progress,4);

  s=reload(s);
  s=dispatch(s,{type:'activityAction',id:'advance'},catalog);
  assert.equal(s.run.flow.activity?.internalState.progress,5);

  s=reload(s);
  s=dispatch(s,{type:'activityAction',id:'advance'},catalog);
  assert.equal(s.run.flow.activity,null);
  assert.equal(s.run.dayState.energyCurrent,energyBefore-2);
  assert.ok(s.run.progression.worldFacts.includes('lumber.forest.truth-known'));
  assert.equal(s.run.flow.pendingScene?.eventId,'lumber-cross.activity-forest-return');

  s=reload(s);
  s=dispatch(s,{type:'choice',id:'continue'},catalog);
  assert.equal(s.run.dayState.energyCurrent,energyBefore-2);
  assert.ok(s.run.progression.careers.lumber?.facts.includes('forest-truth-known'));
  assert.ok(s.run.progression.careers.lumber?.facts.includes('forest-problem-resolved'));

  let escape=started();
  escape=dispatch(escape,{type:'enterActivity',id:'lumber.forest'},catalog);
  escape=dispatch(escape,{type:'activityAction',id:'escape'},catalog);
  assert.equal(escape.run.flow.activity,null);
  assert.ok(escape.run.progression.worldFacts.includes('lumber.forest.escaped'));
  assert.equal(escape.run.progression.worldFacts.includes('lumber.forest.truth-known'),false);

  let capabilityEvidence=started();
  capabilityEvidence.run.resources.inventory.old_boundary_token=1;
  capabilityEvidence=dispatch(capabilityEvidence,{type:'enterActivity',id:'lumber.forest'},catalog);
  actions=availableActivityActions(capabilityEvidence,catalog).map(action=>action.id);
  assert.ok(actions.includes('forest.route.old-boundary'));
  assert.equal(capabilityEvidence.run.resources.inventory.old_boundary_token,1);
});

test('PA21-PA26 accelerator: two Lumber endings may be eligible; ordinary play remains available; Hard Work commits/completes once and changes New Run',()=>{
  let s=started();
  s.run.progression.careers.lumber={
    stage:'accepted-hand',
    shifts:0,
    counters:{completed_shifts:49},
    choices:{},
    facts:['forest-truth-known','forest-problem-resolved']
  };

  s=dispatch(s,{type:'action',id:'lumber.shift'},catalog);
  assert.equal(s.run.progression.careers.lumber.counters.completed_shifts,50);
  assert.ok(s.run.endings.eligible.includes('ending.lumber.hard-work'));
  assert.ok(s.run.endings.eligible.includes('ending.lumber.forest'));
  assert.equal(s.run.status,'active');
  assert.equal(s.meta.hardWorkProgress.includes('lumber'),false);

  s=reload(s);
  assert.equal(s.run.status,'active');
  const energyBeforeExtraShift=s.run.dayState.energyCurrent;
  s=dispatch(s,{type:'action',id:'lumber.shift'},catalog);
  assert.equal(s.run.status,'active');
  assert.equal(s.run.dayState.energyCurrent,energyBeforeExtraShift-1);
  assert.ok(s.run.endings.eligible.includes('ending.lumber.hard-work'));
  assert.ok(s.run.endings.eligible.includes('ending.lumber.forest'));
  assert.equal(s.meta.hardWorkProgress.includes('lumber'),false);

  s=reload(s);
  s=dispatch(s,{type:'commitEnding',id:'ending.lumber.hard-work'},catalog);
  assert.equal(s.run.status,'ending_committed');
  assert.equal(s.meta.hardWorkProgress.includes('lumber'),false);

  s=reload(s);
  s=dispatch(s,{type:'completeEnding'},catalog);
  assert.equal(s.run.status,'ended');
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,['hardWork:lumber']);
  assert.deepEqual(s.meta.hardWorkProgress,['lumber']);

  const completed=reload(s);
  const retried=dispatch(completed,{type:'completeEnding'},catalog);
  assert.deepEqual(retried.meta.hardWorkProgress,['lumber']);
  assert.deepEqual(retried.run.endings.result?.appliedMetaRewardIds,['hardWork:lumber']);

  s=dispatch(retried,{type:'newLife'},catalog);
  assert.equal(s.run.character.stats.strength,1);
  assert.equal(s.run.character.stats.endurance,1);
  assert.deepEqual(s.meta.hardWorkProgress,['lumber']);
});
