import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch,eligible} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const hooks=[
  {course:'school.course.literacy_and_numbers',track:'school.track.literacy_and_numbers',event:'tavern.school.records',fact:'school-records-ready'},
  {course:'school.course.rhetoric_and_social',track:'school.track.rhetoric_and_social',event:'tavern.school.broker',fact:'school-broker-ready'},
  {course:'school.course.etiquette_and_presentation',track:'school.track.etiquette_and_presentation',event:'tavern.school.etiquette',fact:'school-etiquette-ready'},
  {course:'school.course.arcana',track:'school.track.arcana',event:'tavern.school.arcana',fact:'school-arcana-ready'}
] as const;

function ready():Save{
  const s=started();
  s.run.resources.money=10_000;
  s.run.dayState.energyCurrent=3;
  s.run.progression.careers.tavern={stage:'trusted-worker',shifts:0,counters:{completed_shifts:1},choices:{},facts:['first-shift-complete']};
  return s;
}
function settlePending(state:Save){
  let s=state,guard=0;
  while(s.run.pending){
    if(++guard>60)throw new Error('pending loop: '+s.run.pending.eventId);
    const event=catalog.events.find(e=>e.id===s.run.pending!.eventId);
    assert.ok(event,s.run.pending.eventId);
    const choice=event.choices.find(c=>eligible(c.conditions,s,catalog));
    assert.ok(choice,event.id);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}

test('C5-150 each third Tavern School lesson resolves immediately with no dummy Tavern shift or extra Energy',()=>{
  for(const hook of hooks){
    let s=ready();
    for(let i=0;i<2;i++)s=settlePending(dispatch(s,{type:'schoolLesson',id:hook.course},catalog));
    const shifts=s.run.progression.careers.tavern.counters.completed_shifts;
    assert.equal(s.run.dayState.energyCurrent,1,hook.event);
    s=dispatch(s,{type:'schoolLesson',id:hook.course},catalog);
    assert.equal(s.run.progression.school.tracks[hook.track].counters.lessons_completed,3,hook.event);
    assert.equal(s.run.pending?.eventId,hook.event,hook.event);
    assert.equal(s.run.progression.careers.tavern.counters.completed_shifts,shifts,hook.event);
    assert.equal(s.run.dayState.energyCurrent,0,hook.event);
    const energy=s.run.dayState.energyCurrent;
    s=dispatch(s,{type:'choice',id:'apply'},catalog);
    assert.ok(s.run.progression.careers.tavern.facts.includes(hook.fact),hook.event);
    assert.equal(s.run.dayState.energyCurrent,energy,hook.event);
    assert.equal(s.run.progression.careers.tavern.counters.completed_shifts,shifts,hook.event);
  }
});
