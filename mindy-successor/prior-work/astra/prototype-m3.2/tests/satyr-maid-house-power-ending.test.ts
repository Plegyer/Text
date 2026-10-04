import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch,eligible} from '../src/core/engine.ts';
import type {Save} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const endingId='ending.satyr-maid.house-power';

function qualified(){
  const s=started();
  s.run.progression.careers['satyr-maid']={
    stage:'house-power',
    shifts:0,
    counters:{completed_shifts:20},
    choices:{},
    facts:[
      'first-shift-complete',
      'floor-rhythm-complete',
      'known-face-established',
      'house-regular-established',
      'school-management-ready',
      'crisis-resolved',
      'crisis-house-power',
      'house-power-ready'
    ]
  };
  return s;
}

function makeRunActive(s:Save){
  s.run.character.creation.remaining=0;
  s.run.character.creation.complete=true;
  s.run.flags['story.arrived']=true;
  return s;
}

test('House Power eligibility is complex and remains non-terminal until explicit commit',()=>{
  const ending=catalog.definitions.endings.find(e=>e.id===endingId);
  assert.ok(ending);
  const s=qualified();
  assert.equal(eligible(ending.conditions,s,catalog),true);
  assert.equal(s.run.status,'active');
  assert.equal(s.run.endings.committed,null);
});

test('House Power grants its exact Strong Meta Specialist and retires broad +600 money',()=>{
  let s=qualified();
  s.run.endings.eligible=[endingId];
  s=dispatch(s,{type:'commitEnding',id:endingId},catalog);
  s=dispatch(s,{type:'completeEnding'},catalog);

  assert.equal(s.meta.unlocks.includes('satyr-maid.house-credit'),false);
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,['specialist.satyr-maid.house-ledger']);
  assert.deepEqual(s.meta.strongMeta.ownership.ownedRewardIds,['specialist.satyr-maid.house-ledger']);

  s=dispatch(s,{type:'newLife'},catalog);
  assert.equal(s.run.resources.money,600);

  s=makeRunActive(s);
  s.run.endings.eligible=[endingId];
  s=dispatch(s,{type:'commitEnding',id:endingId},catalog);
  s=dispatch(s,{type:'completeEnding'},catalog);
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,['specialist.satyr-maid.house-ledger']);
  assert.deepEqual(s.meta.strongMeta.ownership.ownedRewardIds,['specialist.satyr-maid.house-ledger']);

  s=dispatch(s,{type:'newLife'},catalog);
  assert.equal(s.run.resources.money,600,'D41 retires the old broad House Credit starting-money reward');
});
