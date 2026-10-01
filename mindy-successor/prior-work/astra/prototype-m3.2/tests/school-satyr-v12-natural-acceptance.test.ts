import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch,eligible,parseSave} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

function settlePending(state:Save){
  let s=state,guard=0;
  while(s.run.pending){
    if(++guard>50)throw new Error('pending scene loop');
    const event=catalog.events.find(e=>e.id===s.run.pending!.eventId);
    assert.ok(event,s.run.pending.eventId);
    const choice=event.choices.find(c=>eligible(c.conditions,s,catalog));
    assert.ok(choice,event.id);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}

function sleepNormally(state:Save){
  let s=dispatch(state,{type:'endDay'},catalog);
  s=dispatch(s,{type:'chooseLodging',id:'lodging.normal'},catalog);
  s=dispatch(s,{type:'chooseNightChoice',id:'night.sleep'},catalog);
  return settlePending(s);
}

test('C5-131 natural Satyr shift plus normal School commands survives reload and publishes the free hook exactly once',()=>{
  let s=started();
  s.run.resources.money=10_000;

  s=dispatch(s,{type:'action',id:'satyr-maid.shift'},catalog);
  s=settlePending(s);

  const career=s.run.progression.careers['satyr-maid'];
  assert.equal(career.stage,'floor-rhythm');
  assert.equal(career.counters.completed_shifts,1);

  s=sleepNormally(s);
  assert.equal(s.run.dayState.energyCurrent,3);

  for(let i=0;i<2;i++){
    s=dispatch(s,{type:'schoolLesson',id:'school.course.literacy_and_numbers'},catalog);
    s=settlePending(s);
  }
  assert.equal(s.run.progression.school.tracks['school.track.literacy_and_numbers'].counters.lessons_completed,2);

  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.progression.careers['satyr-maid'].counters.completed_shifts,1);

  const energyBeforeThird=s.run.dayState.energyCurrent;
  assert.equal(energyBeforeThird,1);

  s=dispatch(s,{type:'schoolLesson',id:'school.course.literacy_and_numbers'},catalog);

  assert.equal(s.run.progression.school.tracks['school.track.literacy_and_numbers'].counters.lessons_completed,3);
  assert.equal(s.run.pending?.eventId,'satyr-maid.school.management');
  assert.equal(s.run.progression.careers['satyr-maid'].counters.completed_shifts,1);
  assert.equal(s.run.dayState.energyCurrent,0);

  const beforeReactionEnergy=s.run.dayState.energyCurrent;
  s=dispatch(s,{type:'choice',id:'apply'},catalog);
  assert.equal(s.run.dayState.energyCurrent,beforeReactionEnergy);
  assert.ok(s.run.progression.careers['satyr-maid'].facts.includes('school-management-ready'));
  s=settlePending(s);

  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(s.run.historyState.eventHistory['satyr-maid.school.management']?.count,1);
  assert.equal(s.run.progression.careers['satyr-maid'].counters.completed_shifts,1);

  s=sleepNormally(s);
  s=dispatch(s,{type:'schoolLesson',id:'school.course.literacy_and_numbers'},catalog);
  s=settlePending(s);

  assert.equal(s.run.progression.school.tracks['school.track.literacy_and_numbers'].counters.lessons_completed,4);
  assert.equal(s.run.historyState.eventHistory['satyr-maid.school.management']?.count,1);
  assert.equal(s.run.progression.careers['satyr-maid'].facts.filter(x=>x==='school-management-ready').length,1);
  assert.equal(s.run.progression.careers['satyr-maid'].counters.completed_shifts,1);
});
