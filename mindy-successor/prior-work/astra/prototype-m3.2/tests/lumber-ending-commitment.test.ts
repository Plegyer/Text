import test from 'node:test';
import assert from 'node:assert/strict';
import {dispatch} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';

test('Lumber ending eligibility stays playable until explicit commit and completes through RunResult flow',()=>{
  let s=started();
  s.run.progression.careers.lumber={
    stage:'veteran',
    shifts:0,
    counters:{completed_shifts:49},
    choices:{},
    facts:[]
  };

  s=dispatch(s,{type:'action',id:'lumber.shift'},catalog);

  assert.equal(s.run.progression.careers.lumber.counters.completed_shifts,50);
  assert.ok(s.run.endings.eligible.includes('ending.lumber.hard-work'));
  assert.equal(s.run.status,'active');
  assert.equal(s.run.endings.committed,null);
  assert.equal(s.run.endings.result,null);
  assert.ok(!s.meta.hardWorkProgress.includes('lumber'));

  s=dispatch(s,{type:'commitEnding',id:'ending.lumber.hard-work'},catalog);

  assert.equal(s.run.status,'ending_committed');
  assert.equal(s.run.endings.committed,'ending.lumber.hard-work');
  assert.equal(s.run.endings.result,null);
  assert.ok(!s.meta.hardWorkProgress.includes('lumber'));

  s=dispatch(s,{type:'completeEnding'},catalog);

  assert.equal(s.run.status,'ended');
  assert.equal(s.run.endings.result?.endingId,'ending.lumber.hard-work');
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,['hardWork:lumber']);
  assert.ok(s.meta.hardWorkProgress.includes('lumber'));
  assert.ok(s.meta.completedEndings.includes('ending.lumber.hard-work'));
});
