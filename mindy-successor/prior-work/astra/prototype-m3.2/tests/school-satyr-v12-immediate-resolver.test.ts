import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch,eligible} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const hooks=[
  {
    course:'school.course.literacy_and_numbers',
    track:'school.track.literacy_and_numbers',
    event:'satyr-maid.school.management',
    fact:'school-management-ready'
  },
  {
    course:'school.course.rhetoric_and_social',
    track:'school.track.rhetoric_and_social',
    event:'satyr-maid.school.rhetoric',
    fact:'school-rhetoric-ready'
  },
  {
    course:'school.course.body_confidence',
    track:'school.track.body_confidence',
    event:'satyr-maid.school.boundaries',
    fact:'school-boundaries-ready'
  }
] as const;

function ready():Save{
  const s=started();
  s.run.resources.money=5_000;
  s.run.dayState.energyCurrent=3;
  s.run.progression.careers['satyr-maid']={
    stage:'floor-rhythm',
    shifts:0,
    counters:{completed_shifts:1},
    choices:{},
    facts:['first-shift-complete']
  };
  return s;
}

function settlePending(state:Save){
  let s=state,guard=0;
  while(s.run.pending){
    if(++guard>30)throw new Error('pending scene loop');
    const event=catalog.events.find(e=>e.id===s.run.pending!.eventId);
    assert.ok(event,s.run.pending.eventId);
    const choice=event.choices.find(c=>eligible(c.conditions,s,catalog));
    assert.ok(choice,event.id);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}

test('C5-126 each third paid lesson surfaces the exact Satyr reaction immediately at zero extra reaction Energy',()=>{
  for(const hook of hooks){
    let s=ready();

    for(let i=0;i<2;i++){
      s=dispatch(s,{type:'schoolLesson',id:hook.course},catalog);
      s=settlePending(s);
    }

    const shiftsBefore=s.run.progression.careers['satyr-maid'].counters.completed_shifts;
    const energyBefore=s.run.dayState.energyCurrent;
    assert.equal(energyBefore,1,hook.event);

    s=dispatch(s,{type:'schoolLesson',id:hook.course},catalog);

    assert.equal(s.run.progression.school.tracks[hook.track].counters.lessons_completed,3,hook.event);
    assert.equal(s.run.pending?.eventId,hook.event,hook.event);
    assert.equal(s.run.dayState.energyCurrent,0,hook.event);
    assert.equal(s.run.progression.careers['satyr-maid'].counters.completed_shifts,shiftsBefore,hook.event);

    const beforeApplyEnergy=s.run.dayState.energyCurrent;
    s=dispatch(s,{type:'choice',id:'apply'},catalog);

    assert.ok(s.run.progression.careers['satyr-maid'].facts.includes(hook.fact),hook.event);
    assert.equal(s.run.dayState.energyCurrent,beforeApplyEnergy,hook.event);
    assert.equal(s.run.progression.careers['satyr-maid'].counters.completed_shifts,shiftsBefore,hook.event);
  }
});
