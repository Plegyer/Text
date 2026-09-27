import test from 'node:test';
import assert from 'node:assert/strict';

import {catalog,started} from './helpers.ts';
import {availableActivityActions,dispatch,parseSave} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';

function reload(state:Save){
  return parseSave(JSON.stringify(state),catalog);
}
function arcanaLessons(state:Save){
  return state.run.progression.school.tracks['school.track.arcana']?.counters.lessons_completed??0;
}
function arcanaNightStudies(state:Save){
  return state.run.progression.school.tracks['school.track.arcana']?.counters.night_study_sessions??0;
}

test('merged-main one-Save sentinel v3 preserves exact RC transactions through New Run reload',()=>{
  const continuation=catalog.events.find(event=>event.id==='lumber-cross.activity-forest-return');
  assert.ok(continuation);
  assert.deepEqual(continuation.reactionTriggers,[{
    kind:'activityResult',
    activity:'lumber.forest',
    outcome:'success',
    result:'lumber.forest.success'
  }]);

  let s=started();
  const startMoney=s.run.resources.money;
  const startDay=s.run.calendar.elapsedDays;
  const startEnergy=s.run.dayState.energyCurrent;

  // Lumber + professional Foreman route.
  s=dispatch(s,{type:'action',id:'lumber.shift'},catalog);
  assert.equal(s.run.resources.money,startMoney);
  assert.equal(s.run.dayState.energyCurrent,startEnergy-1);
  assert.equal(s.run.progression.careers.lumber?.counters.completed_shifts,1);
  assert.equal(s.run.flow.pendingScene?.eventId,'lumber.career-first-shift');

  s=reload(s);
  s=dispatch(s,{type:'choice',id:'continue'},catalog);
  assert.equal(s.run.flow.pendingScene?.eventId,'lumber.foreman-notice');

  s=reload(s);
  s=dispatch(s,{type:'choice',id:'professional'},catalog);
  assert.equal(s.run.progression.relationships['lumber.foreman']?.stage,'route-professional');
  assert.equal(s.run.resources.money,startMoney);
  assert.equal(s.run.dayState.energyCurrent,startEnergy-1);

  // Paid Arcana: exact transaction plus the real base.school blocking scene.
  const schoolBefore={
    magic:s.run.character.stats.magic,
    reason:s.run.character.stats.reason,
    creativity:s.run.character.stats.creativity
  };
  s=dispatch(s,{type:'schoolLesson',id:'school.course.arcana'},catalog);

  assert.equal(s.run.resources.money,startMoney-500);
  assert.equal(s.run.dayState.energyCurrent,startEnergy-2);
  assert.equal(s.run.character.stats.magic,schoolBefore.magic+4);
  assert.equal(s.run.character.stats.reason,schoolBefore.reason+4);
  assert.equal(s.run.character.stats.creativity,schoolBefore.creativity+2);
  assert.equal(arcanaLessons(s),1);
  assert.equal(arcanaNightStudies(s),0);
  assert.equal(s.run.flow.pendingScene?.eventId,'base.school');
  assert.ok((s.run.flow.pendingScene?.allowedChoiceIds??[]).includes('listen'));
  assert.equal(
    s.run.progression.worldFacts.includes('lumber.school.management-ready'),
    false
  );

  const paidSnapshot={
    money:s.run.resources.money,
    energy:s.run.dayState.energyCurrent,
    lessons:arcanaLessons(s),
    shifts:s.run.progression.careers.lumber?.counters.completed_shifts,
    foreman:s.run.progression.relationships['lumber.foreman']?.stage
  };

  s=reload(s);
  assert.equal(s.run.flow.pendingScene?.eventId,'base.school');
  s=dispatch(s,{type:'choice',id:'listen'},catalog);

  assert.equal(s.run.flags['school.enrolled'],true);
  assert.equal(s.run.resources.money,paidSnapshot.money);
  assert.equal(s.run.dayState.energyCurrent,paidSnapshot.energy);
  assert.equal(arcanaLessons(s),paidSnapshot.lessons);
  assert.equal(s.run.progression.careers.lumber?.counters.completed_shifts,paidSnapshot.shifts);
  assert.equal(s.run.progression.relationships['lumber.foreman']?.stage,paidSnapshot.foreman);

  // Night exactly once.
  s=dispatch(reload(s),{type:'endDay'},catalog);
  assert.equal(s.run.flow.night?.phase,'LodgingResolution');

  s=dispatch(s,{type:'chooseLodging',id:'lodging.normal'},catalog);
  assert.equal(s.run.resources.money,startMoney-600);
  assert.equal(s.run.flow.night?.lodgingPaymentCommitted,true);

  s=reload(s);
  assert.equal(s.run.resources.money,startMoney-600);

  s=dispatch(s,{type:'chooseNightChoice',id:'lumber.foreman.night'},catalog);
  assert.equal(s.run.flow.pendingScene?.eventId,'lumber-night.foreman-professional');
  assert.equal(
    s.run.progression.relationships['lumber.foreman']?.counters.night_meetings,
    1
  );
  assert.equal(s.run.dayState.energyCurrent,startEnergy-2);

  s=reload(s);
  assert.equal(
    s.run.progression.relationships['lumber.foreman']?.counters.night_meetings,
    1
  );

  s=dispatch(s,{type:'choice',id:'continue'},catalog);
  assert.equal(s.run.flow.night,null);
  assert.equal(s.run.calendar.elapsedDays,startDay+1);
  assert.equal(s.run.dayState.energyCurrent,3);
  assert.equal(s.run.resources.money,startMoney-600);
  assert.equal(arcanaLessons(s),1);

  // Natural Forest logging-road path. No item/capability authoring is injected.
  assert.equal(s.run.resources.inventory.old_boundary_token??0,0);
  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},catalog);
  assert.equal(s.run.dayState.energyCurrent,1);
  assert.equal(s.run.flow.activity?.optionModelVersion,1);

  let actions=availableActivityActions(s,catalog).map(action=>action.id);
  assert.ok(actions.includes('forest.route.logging-road'));
  assert.equal(actions.includes('forest.route.old-boundary'),false);
  assert.equal(actions.includes('advance'),false);
  assert.ok(actions.includes('escape'));

  s=reload(s);
  s=dispatch(s,{type:'activityAction',id:'forest.route.logging-road'},catalog);
  assert.equal(s.run.flow.activity?.internalState.routeId,'logging-road');
  assert.ok(
    s.run.flow.activity?.internalState.resolvedOptionIds.includes(
      'forest.route.logging-road'
    )
  );

  s=reload(s);
  actions=availableActivityActions(s,catalog).map(action=>action.id);
  assert.ok(actions.includes('advance'));
  assert.ok(actions.includes('escape'));

  s=dispatch(s,{type:'activityAction',id:'advance'},catalog);
  assert.equal(s.run.flow.activity?.internalState.progress,1);

  s=reload(s);
  assert.equal(s.run.flow.activity?.internalState.progress,1);
  assert.equal(s.run.flow.activity?.internalState.routeId,'logging-road');

  s=dispatch(s,{type:'activityAction',id:'advance'},catalog);

  assert.equal(s.run.flow.activity,null);
  assert.ok(s.run.progression.worldFacts.includes('lumber.forest.truth-known'));
  assert.equal(s.run.flow.pendingScene?.eventId,'lumber-cross.activity-forest-return');

  s=reload(s);
  assert.equal(s.run.flow.pendingScene?.eventId,'lumber-cross.activity-forest-return');

  s=dispatch(s,{type:'choice',id:'continue'},catalog);
  assert.ok(s.run.progression.careers.lumber?.facts.includes('forest-truth-known'));
  assert.ok(s.run.progression.careers.lumber?.facts.includes('forest-problem-resolved'));
  assert.equal(s.run.resources.money,startMoney-600);
  assert.equal(s.run.dayState.energyCurrent,1);
  assert.equal(arcanaLessons(s),1);
  assert.equal(s.run.progression.relationships['lumber.foreman']?.stage,'route-professional');

  // The only direct accelerator: 49 completed shifts before one real 50th shift.
  s.run.progression.careers.lumber!.counters.completed_shifts=49;
  s=reload(s);

  assert.equal(s.run.progression.careers.lumber?.counters.completed_shifts,49);
  assert.equal(s.run.endings.eligible.includes('ending.lumber.hard-work'),false);
  assert.deepEqual(s.meta.hardWorkProgress,[]);

  s=dispatch(s,{type:'action',id:'lumber.shift'},catalog);

  assert.equal(s.run.progression.careers.lumber?.counters.completed_shifts,50);
  assert.equal(s.run.dayState.energyCurrent,0);
  assert.ok(s.run.endings.eligible.includes('ending.lumber.hard-work'));
  assert.ok(s.run.endings.eligible.includes('ending.lumber.forest'));
  assert.equal(s.run.status,'active');
  assert.deepEqual(s.meta.hardWorkProgress,[]);

  // Commit is reward-free. Completion applies the exact reward once.
  s=dispatch(reload(s),{type:'commitEnding',id:'ending.lumber.hard-work'},catalog);
  assert.equal(s.run.status,'ending_committed');
  assert.equal(s.run.endings.result,null);
  assert.deepEqual(s.meta.hardWorkProgress,[]);

  s=reload(s);
  assert.deepEqual(s.meta.hardWorkProgress,[]);

  s=dispatch(s,{type:'completeEnding'},catalog);
  assert.equal(s.run.status,'ended');
  assert.equal(s.run.endings.result?.endingId,'ending.lumber.hard-work');
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,['hardWork:lumber']);
  assert.deepEqual(s.meta.hardWorkProgress,['lumber']);

  const transactionId=s.run.endings.result!.transactionId;
  s=reload(s);
  s=reload(s);

  assert.equal(s.run.endings.result?.transactionId,transactionId);
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,['hardWork:lumber']);
  assert.deepEqual(s.meta.hardWorkProgress,['lumber']);
  assert.equal(
    s.meta.appliedResultTransactions.filter(id=>id===transactionId).length,
    1
  );

  // New Run preserves Meta exactly once across reload.
  s=dispatch(s,{type:'newLife'},catalog);
  assert.equal(s.run.status,'active');
  assert.equal(s.run.character.stats.strength,4);
  assert.equal(s.run.character.stats.endurance,4);
  assert.deepEqual(s.meta.hardWorkProgress,['lumber']);
  assert.equal(
    s.meta.appliedResultTransactions.filter(id=>id===transactionId).length,
    1
  );
  assert.equal(
    s.run.progression.worldFacts.includes('lumber.school.management-ready'),
    false
  );

  s=reload(s);
  assert.equal(s.run.character.stats.strength,4);
  assert.equal(s.run.character.stats.endurance,4);
  assert.deepEqual(s.meta.hardWorkProgress,['lumber']);
  assert.equal(
    s.meta.appliedResultTransactions.filter(id=>id===transactionId).length,
    1
  );
});
