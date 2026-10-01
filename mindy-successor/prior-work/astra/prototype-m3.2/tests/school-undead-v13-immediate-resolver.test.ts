import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch,eligible} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const hooks=[
  {course:'school.course.arcana',track:'school.track.arcana',event:'undead-farm.school.arcana-research',fact:'school-research-ready'},
  {course:'school.course.literacy_and_numbers',track:'school.track.literacy_and_numbers',event:'undead-farm.school.management-records',fact:'school-management-ready'}
] as const;

function ready():Save{
  const s=started();
  s.run.resources.money=5_000;
  s.run.dayState.energyCurrent=3;
  s.run.progression.careers['undead-farm']={stage:'reliable-helper',shifts:0,counters:{completed_shifts:1},choices:{},facts:['first-shift-complete']};
  return s;
}

function settlePending(state:Save){
  let s=state,guard=0;
  while(s.run.pending){
    if(++guard>40)throw new Error('pending scene loop');
    const event=catalog.events.find(e=>e.id===s.run.pending!.eventId);
    assert.ok(event,s.run.pending.eventId);
    const choice=event.choices.find(c=>eligible(c.conditions,s,catalog));
    assert.ok(choice,event.id);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}

test('C5-136 each third paid lesson surfaces the exact Undead Farm reaction immediately without another shift or reaction Energy',()=>{
  for(const hook of hooks){
    let s=ready();
    for(let i=0;i<2;i++){
      s=dispatch(s,{type:'schoolLesson',id:hook.course},catalog);
      s=settlePending(s);
    }
    const shiftsBefore=s.run.progression.careers['undead-farm'].counters.completed_shifts;
    assert.equal(s.run.dayState.energyCurrent,1,hook.event);
    s=dispatch(s,{type:'schoolLesson',id:hook.course},catalog);
    assert.equal(s.run.progression.school.tracks[hook.track].counters.lessons_completed,3,hook.event);
    assert.equal(s.run.pending?.eventId,hook.event,hook.event);
    assert.equal(s.run.dayState.energyCurrent,0,hook.event);
    assert.equal(s.run.progression.careers['undead-farm'].counters.completed_shifts,shiftsBefore,hook.event);
    const beforeApply=s.run.dayState.energyCurrent;
    s=dispatch(s,{type:'choice',id:'apply'},catalog);
    assert.ok(s.run.progression.careers['undead-farm'].facts.includes(hook.fact),hook.event);
    assert.equal(s.run.dayState.energyCurrent,beforeApply,hook.event);
    assert.equal(s.run.progression.careers['undead-farm'].counters.completed_shifts,shiftsBefore,hook.event);
  }
});
