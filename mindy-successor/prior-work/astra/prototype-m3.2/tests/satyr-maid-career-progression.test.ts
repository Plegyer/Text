import test from 'node:test';
import assert from 'node:assert/strict';

import {applyEffects,dispatch,eligible,resolveReactions} from '../src/core/engine.ts';
import type {ReactionFact,Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

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

function shift(state:Save){
  state.run.dayState.energyCurrent=Math.max(state.run.dayState.energyCurrent,1);
  return settlePending(dispatch(state,{type:'action',id:'satyr-maid.shift'},catalog));
}

test('Satyr Maid career advances through the production milestone spine',()=>{
  let s=started();
  assert.equal(s.run.progression.careers['satyr-maid'],undefined);

  s=shift(s);
  assert.equal(s.run.progression.careers['satyr-maid'].stage,'floor-rhythm');
  assert.ok(s.run.progression.careers['satyr-maid'].facts.includes('first-shift-complete'));

  s=shift(s);
  assert.equal(s.run.progression.careers['satyr-maid'].stage,'floor-rhythm');

  s=shift(s);
  assert.equal(s.run.progression.careers['satyr-maid'].stage,'known-face');
  assert.ok(s.run.progression.careers['satyr-maid'].facts.includes('floor-rhythm-complete'));
  assert.ok(s.run.progression.careers['satyr-maid'].facts.includes('known-face-established'));

  while(s.run.progression.careers['satyr-maid'].counters.completed_shifts<8)s=shift(s);
  assert.equal(s.run.progression.careers['satyr-maid'].stage,'house-regular');
  assert.ok(s.run.progression.careers['satyr-maid'].facts.includes('house-regular-established'));

  while(s.run.progression.careers['satyr-maid'].counters.completed_shifts<15)s=shift(s);
  assert.equal(s.run.progression.careers['satyr-maid'].stage,'veteran-service');
});

test('an externally satisfied Satyr branch gate is noticed by Resolver without another dummy shift',()=>{
  let s=started();
  for(let i=0;i<15;i++)s=shift(s);
  assert.equal(s.run.progression.careers['satyr-maid'].stage,'veteran-service');
  const shiftsBefore=s.run.progression.careers['satyr-maid'].counters.completed_shifts;

  s=applyEffects(s,[{kind:'addCareerFact',career:'satyr-maid',fact:'house-power-ready'}],catalog);
  const fact:ReactionFact={kind:'careerFactAdded',career:'satyr-maid',fact:'house-power-ready'};
  s=resolveReactions(s,[fact],catalog).state;
  assert.equal(s.run.pending?.eventId,'satyr-maid.career.house-power');

  s=settlePending(s);
  assert.equal(s.run.progression.careers['satyr-maid'].stage,'house-power');
  assert.equal(s.run.progression.careers['satyr-maid'].counters.completed_shifts,shiftsBefore);
});
