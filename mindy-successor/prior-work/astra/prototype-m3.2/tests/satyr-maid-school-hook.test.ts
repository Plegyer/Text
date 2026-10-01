import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch,eligible} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

function settlePending(state:Save){
  let s=state,guard=0;
  while(s.run.pending){
    if(++guard>30)throw new Error('pending scene loop');
    const event=catalog.events.find(e=>e.id===s.run.pending!.eventId);
    assert.ok(event,s.run.pending.eventId);
    const choice=event.choices.find(choice=>eligible(choice.conditions,s,catalog));
    assert.ok(choice,event.id);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}

test('three live Rhetoric lessons immediately publish the Satyr career hook at zero extra daytime Energy',()=>{
  let s=started();
  s.run.resources.money=5000;
  s.run.progression.careers['satyr-maid']={
    stage:'floor-rhythm',shifts:0,counters:{completed_shifts:1},choices:{},facts:['first-shift-complete']
  };

  for(let i=0;i<2;i++){
    s=dispatch(s,{type:'schoolLesson',id:'school.course.rhetoric_and_social'},catalog);
    s=settlePending(s);
  }

  const beforeThird=s.run.dayState.energyCurrent;
  assert.equal(beforeThird,1);
  s=dispatch(s,{type:'schoolLesson',id:'school.course.rhetoric_and_social'},catalog);

  assert.equal(s.run.progression.school.tracks['school.track.rhetoric_and_social'].counters.lessons_completed,3);
  assert.equal(s.run.dayState.energyCurrent,0);
  assert.equal(s.run.pending?.eventId,'satyr-maid.school.rhetoric');

  s=dispatch(s,{type:'choice',id:'apply'},catalog);
  assert.ok(s.run.progression.careers['satyr-maid'].facts.includes('school-rhetoric-ready'));
  assert.equal(s.run.dayState.energyCurrent,0,'career reaction itself must not spend daytime Energy');
});
