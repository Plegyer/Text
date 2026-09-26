import test from 'node:test';
import assert from 'node:assert/strict';

import {catalog,started} from './helpers.ts';
import {availableActivityActions,dispatch,parseSave} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';

function reload(state:Save){
  return parseSave(JSON.stringify(state),catalog);
}

test('release-candidate shipped E2E keeps one Save coherent across Lumber, School, Night, Forest and Hard Work',()=>{
  let s=started();
  const startMoney=s.run.resources.money;
  const startDay=s.run.calendar.elapsedDays;

  // Lumber -> first reactive career milestone -> professional Foreman.
  s=dispatch(s,{type:'action',id:'lumber.shift'},catalog);
  assert.equal(s.run.dayState.energyCurrent,2);
  assert.equal(s.run.progression.careers.lumber?.counters.completed_shifts,1);
  assert.equal(s.run.flow.lastAction?.presentationId,'job/lumber/result/default');
  assert.equal(s.run.flow.pendingScene?.eventId,'lumber.career-first-shift');

  s=reload(s);
  s=dispatch(s,{type:'choice',id:'continue'},catalog);
  assert.equal(s.run.progression.careers.lumber?.stage,'accepted-hand');
  assert.equal(s.run.flow.pendingScene?.eventId,'lumber.foreman-notice');

  s=reload(s);
  s=dispatch(s,{type:'choice',id:'professional'},catalog);
  assert.equal(s.run.flow.pendingScene,null);
  assert.equal(s.run.progression.relationships['lumber.foreman']?.stage,'route-professional');
  assert.equal(s.run.dayState.energyCurrent,2);

  // Paid School lesson in the same day.
  const schoolStatsBefore={
    magic:s.run.character.stats.magic,
    reason:s.run.character.stats.reason,
    creativity:s.run.character.stats.creativity
  };
  s=dispatch(s,{type:'schoolLesson',id:'school.course.arcana'},catalog);
  assert.equal(s.run.resources.money,startMoney-500);
  assert.equal(s.run.dayState.energyCurrent,1);
  assert.equal(s.run.character.stats.magic,schoolStatsBefore.magic+4);
  assert.equal(s.run.character.stats.reason,schoolStatsBefore.reason+4);
  assert.equal(s.run.character.stats.creativity,schoolStatsBefore.creativity+2);
  assert.equal(
    s.run.progression.school.tracks['school.track.arcana']?.counters.lessons_completed,
    1
  );
  assert.equal(s.run.flow.lastAction?.presentationId,'school/arcana/lesson/default');
  assert.equal(s.run.progression.worldFacts.includes('lumber.school.management-ready'),false);
  assert.equal(s.run.flow.pendingScene?.eventId,'base.school');

  // Resolve the shipped first-School blocking scene before NightFlow.
  s=reload(s);
  s=dispatch(s,{type:'choice',id:'listen'},catalog);
  assert.equal(s.run.flow.pendingScene,null);
  assert.equal(s.run.flags['school.enrolled'],true);

  // Explicit NightFlow -> paid normal lodging -> optional professional Foreman Night.
  s=reload(s);
  s=dispatch(s,{type:'endDay'},catalog);
  assert.equal(s.run.flow.night?.phase,'LodgingResolution');

  s=dispatch(s,{type:'chooseLodging',id:'lodging.normal'},catalog);
  assert.equal(s.run.resources.money,startMoney-600);
  assert.equal(s.run.flow.night?.lodgingPaymentCommitted,true);

  s=reload(s);
  s=dispatch(s,{type:'chooseNightChoice',id:'lumber.foreman.night'},catalog);
  assert.equal(s.run.flow.pendingScene?.eventId,'lumber-night.foreman-professional');
  assert.equal(s.run.progression.relationships['lumber.foreman']?.counters.night_meetings,1);
  assert.equal(s.run.dayState.energyCurrent,1);

  s=reload(s);
  s=dispatch(s,{type:'choice',id:'continue'},catalog);
  assert.equal(s.run.flow.night,null);
  assert.equal(s.run.calendar.elapsedDays,startDay+1);
  assert.equal(s.run.dayState.energyCurrent,3);
  assert.equal(s.run.resources.money,startMoney-600);

  // Shipped Forest logging-road path, no item/capability accelerator.
  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},catalog);
  assert.equal(s.run.dayState.energyCurrent,1);
  assert.equal(s.run.flow.activity?.optionModelVersion,1);
  let actions=availableActivityActions(s,catalog).map(action=>action.id);
  assert.ok(actions.includes('forest.route.logging-road'));
  assert.equal(actions.includes('forest.route.old-boundary'),false);
  assert.equal(actions.includes('advance'),false);

  s=reload(s);
  s=dispatch(s,{type:'activityAction',id:'forest.route.logging-road'},catalog);
  assert.equal(s.run.flow.activity?.internalState.routeId,'logging-road');

  s=reload(s);
  s=dispatch(s,{type:'activityAction',id:'advance'},catalog);
  assert.equal(s.run.flow.activity?.internalState.progress,1);

  s=reload(s);
  s=dispatch(s,{type:'activityAction',id:'advance'},catalog);
  assert.equal(s.run.flow.activity,null);
  assert.equal(s.run.flow.pendingScene?.eventId,'lumber-cross.activity-forest-return');
  assert.ok(s.run.progression.worldFacts.includes('lumber.forest.truth-known'));

  s=reload(s);
  s=dispatch(s,{type:'choice',id:'continue'},catalog);
  assert.ok(s.run.progression.careers.lumber?.facts.includes('forest-truth-known'));
  assert.ok(s.run.progression.careers.lumber?.facts.includes('forest-problem-resolved'));
  assert.equal(s.run.dayState.energyCurrent,1);

  // Explicit long-threshold accelerator only: prepare 49 completed shifts.
  // This is not product-authoring evidence; it only avoids replaying dozens of ordinary days.
  s.run.progression.careers.lumber!.counters.completed_shifts=49;
  s=reload(s);

  s=dispatch(s,{type:'action',id:'lumber.shift'},catalog);
  assert.equal(s.run.progression.careers.lumber?.counters.completed_shifts,50);
  assert.equal(s.run.dayState.energyCurrent,0);
  assert.ok(s.run.endings.eligible.includes('ending.lumber.hard-work'));
  assert.ok(s.run.endings.eligible.includes('ending.lumber.forest'));
  assert.equal(s.run.status,'active');
  assert.deepEqual(s.meta.hardWorkProgress,[]);

  // Explicit central ending transaction and exactly-once Meta.
  s=reload(s);
  s=dispatch(s,{type:'commitEnding',id:'ending.lumber.hard-work'},catalog);
  assert.equal(s.run.status,'ending_committed');
  assert.deepEqual(s.meta.hardWorkProgress,[]);

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
  assert.equal(s.run.character.stats.strength,4);
  assert.equal(s.run.character.stats.endurance,4);
  assert.deepEqual(s.meta.hardWorkProgress,['lumber']);
  assert.equal(s.run.progression.worldFacts.includes('lumber.school.management-ready'),false);
});
