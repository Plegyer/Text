import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch,eligible} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const cases=[
  {career:'satyr-maid',action:'satyr-maid.shift',stage:'known-face'},
  {career:'undead-farm',action:'undead-farm.shift',stage:'reliable-helper'}
] as const;

function settlePending(s:Save){
  let guard=0;
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

function ensureEnergy(s:Save){
  if(s.run.dayState.energyCurrent>0)return s;
  s=dispatch(s,{type:'sleep',payment:'outside'},catalog);
  return settlePending(s);
}

test('Satyr Maid and Undead Farm first-shift transitions remain one-time while the second real shift repeats',()=>{
  for(const c of cases){
    let s=started();
    s=dispatch(s,{type:'action',id:c.action},catalog);
    s=settlePending(s);
    assert.equal(s.run.progression.careers[c.career]?.counters.completed_shifts,1,c.career);
    assert.equal(s.run.progression.careers[c.career]?.stage,c.stage,c.career);
    assert.ok(s.run.progression.careers[c.career]?.facts.includes('first-shift-complete'),c.career);

    s=dispatch(s,{type:'action',id:c.action},catalog);
    s=settlePending(s);
    assert.equal(s.run.progression.careers[c.career]?.counters.completed_shifts,2,c.career);
    assert.equal(s.run.progression.careers[c.career]?.stage,c.stage,c.career);
    assert.equal(s.run.progression.careers[c.career]?.facts.filter(f=>f==='first-shift-complete').length,1,c.career);
  }
});

test('Satyr Maid and Undead Farm naturally reach their 50-shift Hard Work thresholds without state priming',()=>{
  for(const c of cases){
    let s=started();
    for(let i=0;i<50;i++){
      s=ensureEnergy(s);
      s=dispatch(s,{type:'action',id:c.action},catalog);
      s=settlePending(s);
    }
    assert.equal(s.run.progression.careers[c.career]?.counters.completed_shifts,50,c.career);
    assert.equal(s.run.progression.careers[c.career]?.stage,c.stage,c.career);
    assert.ok(s.run.endings.eligible.includes(`ending.${c.career}.hard-work`),c.career);
  }
});
