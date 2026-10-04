import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch,eligible} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const allSatyr=[
  'ending.satyr-maid.hard-work',
  'ending.satyr-maid.house-power',
  'ending.satyr-maid.boundary-mastery'
] as const;

function combinedAt49(){
  const s=started();
  s.run.progression.careers['satyr-maid']={
    stage:'boundaries',
    shifts:0,
    counters:{completed_shifts:49},
    choices:{},
    facts:[
      'first-shift-complete',
      'floor-rhythm-complete',
      'known-face-established',
      'house-regular-established',
      'school-management-ready',
      'school-boundaries-ready',
      'crisis-resolved',
      'crisis-house-power',
      'crisis-boundaries',
      'house-power-ready',
      'boundaries-ready'
    ]
  };
  s.run.progression.relationships['satyr-maid.recurring-guest']={
    stage:'professional-trust',
    counters:{['service-meetings']:2},
    choices:{['night-response']:'declined'},
    facts:['introduced-at-work','professional-trust-earned','night-declined']
  };
  return s;
}

function settlePending(state:Save){
  let s=state,guard=0;
  while(s.run.pending){
    if(++guard>20)throw new Error('pending loop');
    const event=catalog.events.find(e=>e.id===s.run.pending!.eventId);
    assert.ok(event,s.run.pending.eventId);
    const choice=event.choices.find(c=>eligible(c.conditions,s,catalog));
    assert.ok(choice,event.id);
    s=dispatch(s,{type:'choice',id:choice.id},catalog);
  }
  return s;
}

test('Hard Work, House Power and Boundary Mastery can coexist without ending the run',()=>{
  let s=combinedAt49();
  s.run.dayState.energyCurrent=3;
  s=dispatch(s,{type:'action',id:'satyr-maid.shift'},catalog);

  assert.equal(s.run.progression.careers['satyr-maid'].counters.completed_shifts,50);
  for(const id of allSatyr)assert.ok(s.run.endings.eligible.includes(id),id);
  assert.equal(s.run.status,'active');
  assert.equal(s.run.endings.committed,null);

  s=settlePending(s);
  assert.equal(s.run.progression.careers['satyr-maid'].stage,'outcome-ready');
  assert.equal(s.run.status,'active');
});

test('explicit Satyr commit produces one RunResult and grants canonical Specialist ownership exactly once',()=>{
  let s=combinedAt49();
  s.run.dayState.energyCurrent=3;
  s=settlePending(dispatch(s,{type:'action',id:'satyr-maid.shift'},catalog));
  const completedBefore=s.meta.runsCompleted;

  s=dispatch(s,{type:'commitEnding',id:'ending.satyr-maid.house-power'},catalog);
  assert.equal(s.run.status,'ending_committed');
  assert.equal(s.run.endings.committed,'ending.satyr-maid.house-power');

  s=dispatch(s,{type:'completeEnding'},catalog);
  assert.equal(s.run.status,'ended');
  assert.equal(s.meta.runsCompleted,completedBefore+1);
  assert.ok(s.meta.completedEndings.includes('ending.satyr-maid.house-power'));
  assert.equal(s.meta.completedEndings.includes('ending.satyr-maid.boundary-mastery'),false);
  assert.equal(s.meta.completedEndings.includes('ending.satyr-maid.hard-work'),false);
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,['specialist.satyr-maid.house-ledger']);
  assert.deepEqual(s.meta.strongMeta.ownership.ownedRewardIds,['specialist.satyr-maid.house-ledger']);

  const again=dispatch(s,{type:'completeEnding'},catalog);
  assert.equal(again.meta.runsCompleted,completedBefore+1);
  assert.deepEqual(again.run.endings.result?.appliedMetaRewardIds,['specialist.satyr-maid.house-ledger']);
  assert.deepEqual(again.meta.strongMeta.ownership.ownedRewardIds,['specialist.satyr-maid.house-ledger']);
});
