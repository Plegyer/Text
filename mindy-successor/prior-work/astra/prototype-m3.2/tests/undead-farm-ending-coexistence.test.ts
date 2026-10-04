import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';

const endings=[
  'ending.undead-farm.hard-work',
  'ending.undead-farm.research-farmer',
  'ending.undead-farm.successor'
] as const;

function combinedAt49(){
  const s=started();
  s.run.progression.careers['undead-farm']={
    stage:'outcome-ready',
    shifts:0,
    counters:{completed_shifts:49},
    choices:{},
    facts:[
      'first-shift-complete',
      'basic-production-ready',
      'process-keeper-ready',
      'school-research-ready',
      'school-management-ready',
      'sample-preserved',
      'crisis-resolved',
      'crisis-research',
      'crisis-successor',
      'research-ready',
      'successor-ready',
      'outcome-ready'
    ]
  };
  s.run.progression.relationships['undead-farm.keeper']={
    stage:'partner-ready',
    counters:{'work-meetings':2,'night-meetings':1},
    choices:{'night-response':'accepted','request-response':'accepted'},
    facts:['introduced-at-work','professional-trust-earned','night-met','request-resolved','partner-ready']
  };
  return s;
}

test('Undead Farm Hard Work, Research Farmer and Successor can coexist without terminating the run',()=>{
  let s=combinedAt49();
  s=dispatch(s,{type:'action',id:'undead-farm.shift'},catalog);

  assert.equal(s.run.progression.careers['undead-farm'].counters.completed_shifts,50);
  for(const id of endings)assert.ok(s.run.endings.eligible.includes(id),id);
  assert.equal(s.run.status,'active');
  assert.equal(s.run.endings.committed,null);
});

test('complex Undead Farm ending uses explicit commit/completion and grants canonical Specialist ownership exactly once',()=>{
  let s=combinedAt49();
  s=dispatch(s,{type:'action',id:'undead-farm.shift'},catalog);
  const completedBefore=s.meta.runsCompleted;

  s=dispatch(s,{type:'commitEnding',id:'ending.undead-farm.research-farmer'},catalog);
  assert.equal(s.run.status,'ending_committed');
  assert.equal(s.run.endings.committed,'ending.undead-farm.research-farmer');

  s=dispatch(s,{type:'completeEnding'},catalog);
  assert.equal(s.run.status,'ended');
  assert.equal(s.meta.runsCompleted,completedBefore+1);
  assert.ok(s.meta.completedEndings.includes('ending.undead-farm.research-farmer'));
  assert.equal(s.meta.completedEndings.includes('ending.undead-farm.successor'),false);
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,['specialist.undead-farm.field-preservation']);
  assert.deepEqual(s.meta.strongMeta.ownership.ownedRewardIds,['specialist.undead-farm.field-preservation']);

  const again=dispatch(s,{type:'completeEnding'},catalog);
  assert.equal(again.meta.runsCompleted,completedBefore+1);
  assert.deepEqual(again.run.endings.result?.appliedMetaRewardIds,['specialist.undead-farm.field-preservation']);
  assert.deepEqual(again.meta.strongMeta.ownership.ownedRewardIds,['specialist.undead-farm.field-preservation']);
});
