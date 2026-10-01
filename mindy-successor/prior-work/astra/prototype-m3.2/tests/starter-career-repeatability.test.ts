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

function finishNight(s:Save){
  s=dispatch(s,{type:'endDay'},catalog);
  let guard=0;
  while(s.run.flow.night||s.run.pending){
    if(++guard>60)throw new Error('night flow loop');
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
    throw new Error(`night flow stalled at ${phase}`);
  }
  return s;
}

function ensureEnergy(s:Save){
  return s.run.dayState.energyCurrent>0?s:finishNight(s);
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
