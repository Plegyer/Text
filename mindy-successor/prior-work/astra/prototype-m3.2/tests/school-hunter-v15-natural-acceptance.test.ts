import test from 'node:test';
import assert from 'node:assert/strict';

import {actionAvailable,calendar,dispatch,eligible,parseSave} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const preferred:Record<string,string>={
  'hunter.career.first-shift':'continue',
  'hunter.career.recognized-hunter':'continue',
  'hunter.career.expedition-qualified':'record',
  'hunter.relationship.intro':'professional',
  'hunter.relationship.trust':'continue',
  'hunter.school.field-craft':'apply',
  'base.school':'listen'
};

function settlePending(state:Save){
  let s=state,guard=0;
  while(s.run.pending){
    if(++guard>200)throw new Error('pending loop: '+s.run.pending.eventId);
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
    if(++guard>300)throw new Error('night loop');
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
      s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},catalog);
      continue;
    }
    throw new Error('night stalled at '+phase);
  }
  return s;
}

function hunterWorkDay(state:Save){
  let s=dispatch(state,{type:'action',id:'hunter.shift'},catalog);
  s=settlePending(s);
  return finishNight(s);
}

test('C5-166 clean run reaches the live Hunter Field Craft hook through real School enrollment and preserves pending hook across reload',()=>{
  let s=started();
  const hunter=catalog.definitions.actions.find(a=>a.id==='hunter.shift');
  assert.ok(hunter);
  assert.equal(actionAvailable(hunter,s,catalog),false);

  while(calendar(s.run.day).year<2)s=finishNight(s);
  assert.equal(actionAvailable(hunter,s,catalog),true);

  while(
    (s.run.progression.careers.hunter?.counters.completed_shifts??0)<8
    || s.run.resources.money<400
  ) s=hunterWorkDay(s);

  assert.equal(s.run.progression.careers.hunter.stage,'recognized-hunter');
  const shiftsBefore=s.run.progression.careers.hunter.counters.completed_shifts;

  s=dispatch(s,{type:'schoolLesson',id:'school.course.field_craft'},catalog);
  s=settlePending(s);
  assert.equal(s.run.flags['school.enrolled'],true);
  assert.equal(
    s.run.progression.school.tracks['school.track.field_craft']?.counters.lessons_completed,
    1
  );
  assert.equal(s.run.progression.careers.hunter.counters.completed_shifts,shiftsBefore);

  const energyBeforeKit=s.run.dayState.energyCurrent;
  s=dispatch(s,{type:'action',id:'forest.collect-field-kit'},catalog);
  assert.equal(s.run.pending?.eventId,'hunter.school.field-craft');
  assert.equal(s.run.dayState.energyCurrent,energyBeforeKit);
  assert.equal(s.run.progression.careers.hunter.counters.completed_shifts,shiftsBefore);

  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.pending?.eventId,'hunter.school.field-craft');

  s=dispatch(s,{type:'choice',id:'apply'},catalog);
  assert.ok(s.run.progression.careers.hunter.facts.includes('school-field-craft-ready'));
  assert.ok(s.run.progression.worldFacts.includes('forest.school-field-notes'));
  assert.equal(s.run.progression.careers.hunter.counters.completed_shifts,shiftsBefore);
  assert.equal(s.run.history['hunter.school.field-craft']?.shows,1);
});
