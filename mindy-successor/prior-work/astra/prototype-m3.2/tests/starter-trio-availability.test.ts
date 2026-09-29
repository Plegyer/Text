import test from 'node:test';
import assert from 'node:assert/strict';

import {actionAvailable,dispatch,starterOrdinaryCareerShiftIds} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';

const laterOrdinaryShiftIds=[
  'tavern.shift',
  'hunter.shift',
  'guard.shift',
  'merchant.shift',
  'artist-geisha.shift',
  'assassin.shift',
  'prostitute.shift'
] as const;

test('fresh Day 1 exposes exactly the locked starter trio to engine command execution',()=>{
  const s=started();
  assert.deepEqual([...starterOrdinaryCareerShiftIds],[
    'lumber.shift',
    'satyr-maid.shift',
    'undead-farm.shift'
  ]);

  for(const id of starterOrdinaryCareerShiftIds){
    const action=catalog.definitions.actions.find(a=>a.id===id);
    assert.ok(action,id);
    assert.equal(actionAvailable(action,s,catalog),true,id);
  }

  for(const id of laterOrdinaryShiftIds){
    const action=catalog.definitions.actions.find(a=>a.id===id);
    assert.ok(action,id);
    assert.deepEqual(action.conditions,[],id);
    assert.equal(actionAvailable(action,s,catalog),false,id);
    assert.throws(
      ()=>dispatch(s,{type:'action',id},catalog),
      /Условия действия не выполнены/,
      id
    );
  }
});

test('all three starter shifts remain executable and spend one Energy on Day 1',()=>{
  for(const id of starterOrdinaryCareerShiftIds){
    const s=started();
    const beforeEnergy=s.run.dayState.energyCurrent;
    const out=dispatch(s,{type:'action',id},catalog);
    assert.equal(out.run.dayState.energyCurrent,beforeEnergy-1,id);
    assert.equal(out.run.historyState.actionCounts[id],1,id);
  }
});
