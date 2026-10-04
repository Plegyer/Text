import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch,eligible,parseSave} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const preferred:Record<string,string>={
  'satyr-maid.career.first-shift':'continue',
  'satyr-maid.career.known-face':'continue',
  'satyr-maid.career.house-regular':'continue',
  'satyr-maid.career.veteran-service':'continue',
  'satyr-maid.career.personal-network':'continue',
  'satyr-maid.career.house-power':'continue',
  'satyr-maid.career.boundaries':'continue',
  'satyr-maid.career.outcome-ready':'continue',
  'satyr-maid.recurring-guest.intro':'professional',
  'satyr-maid.recurring-guest.service':'accept-night',
  'satyr-maid.recurring-guest.night':'talk',
  'satyr-maid.recurring-guest.request':'accept-request',
  'satyr-maid.recurring-guest.return':'resolve-professionally',
  'satyr-maid.school.rhetoric':'apply',
  'satyr-maid.crisis.house-strain':'staff-protection'
};

function settlePending(state:Save){
  let s=state,guard=0;
  while(s.run.pending){
    if(++guard>100)throw new Error('pending scene loop: '+s.run.pending.eventId);
    const event=catalog.events.find(e=>e.id===s.run.pending!.eventId);
    assert.ok(event,s.run.pending.eventId);
    const wanted=preferred[event.id];
    const choice=(wanted?event.choices.find(c=>c.id===wanted&&eligible(c.conditions,s,catalog)):undefined)
      ??event.choices.find(c=>eligible(c.conditions,s,catalog));
    assert.ok(choice,event.id);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}

function finishNight(state:Save){
  let s=dispatch(state,{type:'endDay'},catalog),guard=0;
  while(s.run.flow.night||s.run.pending){
    if(++guard>100)throw new Error('night loop');
    if(s.run.pending){
      s=settlePending(s);
      continue;
    }
    const phase=s.run.flow.night?.phase;
    if(phase==='LodgingResolution'){
      s=dispatch(s,{type:'chooseLodging',id:'lodging.street'},catalog);
      continue;
    }
    if(phase==='VoluntaryNightChoice'){
      const guest=catalog.definitions.nightChoices.find(c=>c.id==='satyr-maid.night.recurring-guest');
      assert.ok(guest);
      const id=eligible(guest.conditions,s,catalog)?guest.id:'night.sleep';
      s=dispatch(s,{type:'chooseNightChoice',id},catalog);
      continue;
    }
    throw new Error('night stalled at '+phase);
  }
  return s;
}

function ensureEnergy(state:Save){
  return state.run.dayState.energyCurrent>0?state:finishNight(state);
}

function work(state:Save){
  let s=ensureEnergy(state);
  s=dispatch(s,{type:'action',id:'satyr-maid.shift'},catalog);
  return settlePending(s);
}

function school(state:Save){
  let s=ensureEnergy(state);
  s=dispatch(s,{type:'schoolLesson',id:'school.course.rhetoric_and_social'},catalog);
  return settlePending(s);
}

test('clean Satyr run reaches relationship/Night, School crisis, Hard Work, complex ending, commit and New Run reward naturally',()=>{
  let s=started();

  while((s.run.progression.careers['satyr-maid']?.counters.completed_shifts??0)<20){
    s=work(s);
    if(s.run.progression.careers['satyr-maid']?.counters.completed_shifts===10){
      s=parseSave(JSON.stringify(s),catalog);
    }
  }

  const guest=s.run.progression.relationships['satyr-maid.recurring-guest'];
  assert.ok(guest);
  assert.equal(guest.stage,'request-resolved');
  assert.ok(guest.facts.includes('night-met'));
  assert.ok(guest.facts.includes('request-resolved'));
  assert.ok(s.run.progression.careers['satyr-maid'].facts.includes('personal-network-ready'));
  assert.ok(s.run.resources.money>=900,'natural Satyr wages must fund the approved three-lesson hook');

  s=school(s);
  s=school(s);
  s=school(s);

  assert.equal(
    s.run.progression.school.tracks['school.track.rhetoric_and_social'].counters.lessons_completed,
    3
  );
  assert.ok(s.run.progression.careers['satyr-maid'].facts.includes('school-rhetoric-ready'));
  assert.ok(s.run.progression.careers['satyr-maid'].facts.includes('crisis-resolved'));
  assert.ok(s.run.progression.careers['satyr-maid'].facts.includes('crisis-house-power'));
  assert.ok(s.run.endings.eligible.includes('ending.satyr-maid.house-power'));
  assert.equal(s.run.status,'active');

  while(s.run.progression.careers['satyr-maid'].counters.completed_shifts<50)s=work(s);

  assert.ok(s.run.endings.eligible.includes('ending.satyr-maid.hard-work'));
  assert.ok(s.run.endings.eligible.includes('ending.satyr-maid.house-power'));
  assert.equal(s.run.status,'active');
  assert.equal(s.run.endings.committed,null);

  s=dispatch(s,{type:'commitEnding',id:'ending.satyr-maid.house-power'},catalog);
  s=dispatch(s,{type:'completeEnding'},catalog);
  assert.equal(s.run.status,'ended');
  assert.equal(s.meta.unlocks.includes('satyr-maid.house-credit'),false);
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,['specialist.satyr-maid.house-ledger']);
  assert.deepEqual(s.meta.strongMeta.ownership.ownedRewardIds,['specialist.satyr-maid.house-ledger']);

  s=dispatch(s,{type:'newLife'},catalog);
  assert.equal(s.run.resources.money,600);
  assert.equal(s.run.progression.careers['satyr-maid'],undefined);
  assert.deepEqual(s.meta.strongMeta.ownership.ownedRewardIds,['specialist.satyr-maid.house-ledger']);
  assert.equal(s.run.status,'active');
});
