import test from 'node:test';
import assert from 'node:assert/strict';

import {catalog,started} from './helpers.ts';
import {
  availableActivityActions,
  dispatch,
  parseSave
} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';

function reload(state:Save){
  return parseSave(JSON.stringify(state),catalog);
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
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}


function arcanaLessons(state:Save){
  return state.run.progression.school.tracks['school.track.arcana']?.counters.lessons_completed??0;
}

function arcanaNightStudies(state:Save){
  return state.run.progression.school.tracks['school.track.arcana']?.counters.night_study_sessions??0;
}

test('final one-Save drift sentinel v2 preserves PR24 state across School, Night, Forest, ending and New Run',()=>{
  let s=started();

  const startMoney=s.run.resources.money;
  const startDay=s.run.calendar.elapsedDays;
  const startEnergy=s.run.dayState.energyCurrent;

  // Lumber: one real shift, then both real reactive scenes.
  s=dispatch(s,{type:'action',id:'lumber.shift'},catalog);
  const lumberMoney=startMoney+37;
  assert.equal(s.run.resources.money,lumberMoney);
  assert.equal(s.run.dayState.energyCurrent,startEnergy-1);
  assert.equal(s.run.progression.careers.lumber?.counters.completed_shifts,1);
  assert.equal(s.run.flow.pendingScene?.eventId,'lumber.career-first-shift');

  s=reload(s);
  assert.equal(s.run.progression.careers.lumber?.counters.completed_shifts,1);
  assert.equal(s.run.dayState.energyCurrent,startEnergy-1);

  s=dispatch(s,{type:'choice',id:'continue'},catalog);
  assert.equal(s.run.flow.pendingScene?.eventId,'lumber.foreman-notice');

  s=reload(s);
  s=dispatch(s,{type:'choice',id:'professional'},catalog);

  assert.equal(
    s.run.progression.relationships['lumber.foreman']?.stage,
    'route-professional'
  );
  assert.equal(s.run.resources.money,lumberMoney);
  assert.equal(s.run.dayState.energyCurrent,startEnergy-1);
  assert.equal(s.run.progression.careers.lumber?.counters.completed_shifts,1);

  // Paid School: exact committed transaction and exact merged PR24 blocking scene.
  const schoolStatsBefore={
    magic:s.run.character.stats.magic,
    reason:s.run.character.stats.reason,
    creativity:s.run.character.stats.creativity
  };

  s=dispatch(s,{type:'schoolLesson',id:'school.course.arcana'},catalog);

  assert.equal(s.run.resources.money,lumberMoney-500);
  assert.equal(s.run.dayState.energyCurrent,startEnergy-2);
  assert.equal(s.run.character.stats.magic,schoolStatsBefore.magic+4);
  assert.equal(s.run.character.stats.reason,schoolStatsBefore.reason+4);
  assert.equal(s.run.character.stats.creativity,schoolStatsBefore.creativity+2);
  assert.equal(arcanaLessons(s),1);
  assert.equal(arcanaNightStudies(s),0);
  assert.equal(
    s.run.progression.relationships['lumber.foreman']?.stage,
    'route-professional'
  );
  assert.equal(s.run.progression.careers.lumber?.counters.completed_shifts,1);
  assert.equal(s.run.flow.pendingScene?.eventId,'base.school');
  assert.ok((s.run.flow.pendingScene?.allowedChoiceIds??[]).includes('listen'));

  const schoolCommitted={
    money:s.run.resources.money,
    energy:s.run.dayState.energyCurrent,
    lessons:arcanaLessons(s),
    nightStudies:arcanaNightStudies(s),
    lumberShifts:s.run.progression.careers.lumber?.counters.completed_shifts,
    foremanStage:s.run.progression.relationships['lumber.foreman']?.stage
  };

  s=reload(s);

  assert.equal(s.run.flow.pendingScene?.eventId,'base.school');
  assert.ok((s.run.flow.pendingScene?.allowedChoiceIds??[]).includes('listen'));

  s=dispatch(s,{type:'choice',id:'listen'},catalog);

  assert.equal(s.run.flow.pendingScene,null);
  assert.equal(s.run.flags['school.enrolled'],true);
  assert.equal(s.run.resources.money,schoolCommitted.money);
  assert.equal(s.run.dayState.energyCurrent,schoolCommitted.energy);
  assert.equal(arcanaLessons(s),schoolCommitted.lessons);
  assert.equal(arcanaNightStudies(s),schoolCommitted.nightStudies);
  assert.equal(
    s.run.progression.careers.lumber?.counters.completed_shifts,
    schoolCommitted.lumberShifts
  );
  assert.equal(
    s.run.progression.relationships['lumber.foreman']?.stage,
    schoolCommitted.foremanStage
  );

  s=dispatch(s,{type:'action',id:'forest.collect-field-kit'},catalog);
  assert.equal(s.run.resources.inventory.field_preservation_kit,1);
  assert.ok(s.run.progression.worldFacts.includes('forest.school-field-notes'));

  // Night: lodging once, Foreman Night once, day advances once.
  s=reload(s);
  s=dispatch(s,{type:'endDay'},catalog);
  assert.equal(s.run.flow.night?.phase,'LodgingResolution');

  s=dispatch(s,{type:'chooseLodging',id:'lodging.normal'},catalog);
  assert.equal(s.run.resources.money,lumberMoney-600);
  assert.equal(s.run.flow.night?.lodgingPaymentCommitted,true);

  s=reload(s);
  assert.equal(s.run.resources.money,lumberMoney-600);
  assert.equal(s.run.flow.night?.lodgingPaymentCommitted,true);
  s=resolveV14PovertyNight(s);
  assert.equal(s.run.flow.night?.phase,'VoluntaryNightChoice');

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
  assert.equal(s.run.resources.money,lumberMoney-600);

  s=dispatch(s,{type:'choice',id:'continue'},catalog);

  assert.equal(s.run.flow.night,null);
  assert.equal(s.run.calendar.elapsedDays,startDay+1);
  assert.equal(s.run.dayState.energyCurrent,3);
  assert.equal(s.run.resources.money,lumberMoney-600);
  assert.equal(arcanaLessons(s),1);
  assert.equal(arcanaNightStudies(s),0);
  assert.equal(s.run.progression.careers.lumber?.counters.completed_shifts,1);
  assert.equal(
    s.run.progression.relationships['lumber.foreman']?.stage,
    'route-professional'
  );

  // Forest: natural logging-road route, deterministic reload, real public result.
  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},catalog);

  assert.equal(s.run.dayState.energyCurrent,1);
  assert.equal(s.run.flow.activity?.optionModelVersion,1);
  assert.equal(s.run.flow.activity?.internalState.routeId,null);

  let actions=availableActivityActions(s,catalog).map(action=>action.id);
  assert.ok(actions.includes('forest.route.logging-road'));
  assert.equal(actions.includes('forest.route.old-boundary'),false);
  assert.equal(actions.includes('advance'),false);
  assert.ok(actions.includes('escape'));

  s=reload(s);

  assert.equal(s.run.dayState.energyCurrent,1);
  assert.equal(s.run.flow.activity?.internalState.routeId,null);

  s=dispatch(
    s,
    {type:'activityAction',id:'forest.route.logging-road'},
    catalog
  );

  assert.equal(s.run.flow.activity?.internalState.routeId,'logging-road');
  assert.ok(
    s.run.flow.activity?.internalState.resolvedOptionIds.includes(
      'forest.route.logging-road'
    )
  );

  s=reload(s);

  assert.equal(s.run.flow.activity?.internalState.routeId,'logging-road');
  actions=availableActivityActions(s,catalog).map(action=>action.id);
  assert.ok(actions.includes('advance'));
  assert.ok(actions.includes('escape'));

  s=dispatch(s,{type:'activityAction',id:'forest.challenge.logging-navigation'},catalog);
  assert.equal(s.run.flow.activity?.internalState.progress,1);

  s=reload(s);
  assert.equal(s.run.flow.activity?.internalState.progress,1);
  assert.equal(s.run.flow.activity?.internalState.routeId,'logging-road');

  s=dispatch(s,{type:'activityAction',id:'forest.challenge.logging-spring-mud'},catalog);
  s=reload(s);
  s=dispatch(s,{type:'activityAction',id:'forest.challenge.logging-preserve-sample'},catalog);
  assert.equal(s.run.flow.activity?.internalState.progress,4);

  s=reload(s);
  s=dispatch(s,{type:'activityAction',id:'advance'},catalog);
  s=reload(s);
  s=dispatch(s,{type:'activityAction',id:'advance'},catalog);

  assert.equal(s.run.flow.activity,null);
  assert.ok(s.run.progression.worldFacts.includes('lumber.forest.truth-known'));
  assert.equal(s.run.flow.pendingScene?.eventId,'lumber-cross.activity-forest-return');

  s=reload(s);
  assert.ok(s.run.progression.worldFacts.includes('lumber.forest.truth-known'));
  assert.equal(s.run.flow.pendingScene?.eventId,'lumber-cross.activity-forest-return');

  s=dispatch(s,{type:'choice',id:'continue'},catalog);

  assert.ok(s.run.progression.careers.lumber?.facts.includes('forest-truth-known'));
  assert.ok(s.run.progression.careers.lumber?.facts.includes('forest-problem-resolved'));
  assert.equal(s.run.resources.money,lumberMoney-600);
  assert.equal(s.run.dayState.energyCurrent,1);
  assert.equal(arcanaLessons(s),1);
  assert.equal(arcanaNightStudies(s),0);
  assert.equal(
    s.run.progression.relationships['lumber.foreman']?.stage,
    'route-professional'
  );

  // Threshold: only accepted repetition accelerator.
  assert.ok(s.run.progression.careers.lumber!.facts.includes('forest-specimen-catalogued'));
  s.run.progression.careers.lumber!.stage='veteran';
  s.run.progression.careers.lumber!.counters.completed_shifts=49;
  s=reload(s);

  assert.equal(s.run.progression.careers.lumber?.counters.completed_shifts,49);
  assert.equal(
    s.run.endings.eligible.includes('ending.lumber.hard-work'),
    false
  );
  assert.deepEqual(s.meta.hardWorkProgress,[]);

  const hardWorkShiftMoneyBefore=s.run.resources.money;
  s=dispatch(s,{type:'action',id:'lumber.shift'},catalog);
  const hardWorkShiftMoneyAfter=s.run.resources.money;

  assert.ok(hardWorkShiftMoneyAfter>hardWorkShiftMoneyBefore);
  assert.equal(s.run.progression.careers.lumber?.counters.completed_shifts,50);
  assert.equal(s.run.dayState.energyCurrent,0);
  assert.ok(s.run.endings.eligible.includes('ending.lumber.hard-work'));
  assert.ok(s.run.endings.eligible.includes('ending.lumber.forest'));
  assert.equal(s.run.status,'active');
  assert.deepEqual(s.meta.hardWorkProgress,[]);
  assert.equal(s.run.resources.money,hardWorkShiftMoneyAfter);
  assert.equal(arcanaLessons(s),1);
  assert.equal(
    s.run.progression.relationships['lumber.foreman']?.stage,
    'route-professional'
  );

  // Ending: commit is reward-free, completion transaction is exactly once.
  s=reload(s);
  s=dispatch(s,{type:'commitEnding',id:'ending.lumber.hard-work'},catalog);

  assert.equal(s.run.status,'ending_committed');
  assert.equal(s.run.endings.committed,'ending.lumber.hard-work');
  assert.equal(s.run.endings.result,null);
  assert.deepEqual(s.meta.hardWorkProgress,[]);

  s=reload(s);
  assert.equal(s.run.status,'ending_committed');
  assert.deepEqual(s.meta.hardWorkProgress,[]);

  s=dispatch(s,{type:'completeEnding'},catalog);

  assert.equal(s.run.status,'ended');
  assert.equal(s.run.endings.result?.endingId,'ending.lumber.hard-work');
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,['hardWork:lumber']);
  assert.deepEqual(s.meta.hardWorkProgress,['lumber']);

  const transactionId=s.run.endings.result!.transactionId;
  assert.equal(
    s.meta.appliedResultTransactions.filter(id=>id===transactionId).length,
    1
  );

  s=reload(s);
  s=reload(s);

  assert.equal(s.run.status,'ended');
  assert.equal(s.run.endings.result?.transactionId,transactionId);
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,['hardWork:lumber']);
  assert.deepEqual(s.meta.hardWorkProgress,['lumber']);
  assert.equal(
    s.meta.appliedResultTransactions.filter(id=>id===transactionId).length,
    1
  );

  // New Run: only run-local state resets; Meta reward persists and survives reload.
  s=dispatch(s,{type:'newLife'},catalog);

  assert.equal(s.run.status,'active');
  assert.equal(s.run.character.stats.strength,1);
  assert.equal(s.run.character.stats.endurance,1);
  assert.deepEqual(s.meta.hardWorkProgress,['lumber']);
  assert.equal(
    s.meta.appliedResultTransactions.filter(id=>id===transactionId).length,
    1
  );

  s=reload(s);

  assert.equal(s.run.status,'active');
  assert.equal(s.run.character.stats.strength,1);
  assert.equal(s.run.character.stats.endurance,1);
  assert.deepEqual(s.meta.hardWorkProgress,['lumber']);
  assert.equal(
    s.meta.appliedResultTransactions.filter(id=>id===transactionId).length,
    1
  );
});
