import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch,eligible,resolveReactions} from '../src/core/engine.ts';
import type {ReactionFact,Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

function veteran(fact:string){
  const s=started();
  s.run.progression.careers['satyr-maid']={
    stage:'veteran-service',
    shifts:0,
    counters:{completed_shifts:15},
    choices:{},
    facts:['first-shift-complete','floor-rhythm-complete','known-face-established','house-regular-established',fact]
  };
  return s;
}

function settle(state:Save){
  let s=state,guard=0;
  while(s.run.pending){
    if(++guard>20)throw new Error('pending loop');
    const e=catalog.events.find(e=>e.id===s.run.pending!.eventId);
    assert.ok(e,s.run.pending.eventId);
    const choice=e.choices.find(c=>eligible(c.conditions,s,catalog));
    assert.ok(choice,e.id);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}

function trigger(state:Save,fact:string){
  const reaction:ReactionFact={kind:'careerFactAdded',career:'satyr-maid',fact};
  return resolveReactions(state,[reaction],catalog).state;
}

test('Satyr house crisis can resolve through the management build into House Power',()=>{
  let s=trigger(veteran('school-management-ready'),'school-management-ready');
  assert.equal(s.run.pending?.eventId,'satyr-maid.crisis.house-strain');
  s=dispatch(s,{type:'choice',id:'supply-plan'},catalog);
  s=settle(s);

  const career=s.run.progression.careers['satyr-maid'];
  assert.ok(career.facts.includes('crisis-resolved'));
  assert.ok(career.facts.includes('crisis-house-power'));
  assert.ok(career.facts.includes('house-power-ready'));
  assert.equal(career.stage,'house-power');
});

test('Satyr house crisis can resolve through explicit customer terms into Boundaries',()=>{
  let s=trigger(veteran('school-boundaries-ready'),'school-boundaries-ready');
  assert.equal(s.run.pending?.eventId,'satyr-maid.crisis.house-strain');
  s=dispatch(s,{type:'choice',id:'customer-terms'},catalog);
  s=settle(s);

  const career=s.run.progression.careers['satyr-maid'];
  assert.ok(career.facts.includes('crisis-resolved'));
  assert.ok(career.facts.includes('crisis-boundaries'));
  assert.ok(career.facts.includes('boundaries-ready'));
  assert.equal(career.stage,'boundaries');
});
