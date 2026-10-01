import test from 'node:test';
import assert from 'node:assert/strict';

import {actionAvailable,dispatch,starterCareerIds} from '../src/core/engine.ts';
import type {Catalog} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const starterActions=starterCareerIds.map(id=>id+'.shift');
const lateActions=[
  'tavern.shift',
  'hunter.shift',
  'guard.shift',
  'merchant.shift',
  'artist-geisha.shift',
  'assassin.shift',
  'prostitute.shift'
] as const;

test('Day 1 command gate exposes exactly the three locked starter career shifts',()=>{
  const s=started();

  for(const id of starterActions){
    const action=catalog.definitions.actions.find(a=>a.id===id);
    assert.ok(action,id);
    assert.equal(actionAvailable(action,s,catalog),true,id);
    assert.doesNotThrow(()=>dispatch(s,{type:'action',id},catalog),id);
  }

  for(const id of lateActions){
    const action=catalog.definitions.actions.find(a=>a.id===id);
    assert.ok(action,id);
    assert.ok(action.conditions.length>0,id+' has an approved derived unlock condition');
    assert.equal(actionAvailable(action,s,catalog),false,id);
    assert.throws(
      ()=>dispatch(s,{type:'action',id},catalog),
      /Условия действия не выполнены/,
      id
    );
  }
});

test('starter career shifts still spend one Energy and persist their existing typed progress',()=>{
  for(const id of starterActions){
    const before=started();
    const energy=before.run.metrics.energy;
    const out=dispatch(before,{type:'action',id},catalog);
    assert.equal(out.run.metrics.energy,energy-1,id);
    const career=id.slice(0,-'.shift'.length);
    assert.equal(out.run.progression.careers[career]?.counters.completed_shifts,1,id);
  }
});

test('late-career unlock seam delegates to authored action conditions without choosing a product threshold',()=>{
  const synthetic=structuredClone(catalog) as Catalog;
  const tavern=synthetic.definitions.actions.find(a=>a.id==='tavern.shift');
  assert.ok(tavern);

  tavern.conditions=[{
    kind:'worldFact',
    fact:'test.late-career-unlock',
    present:true
  }];

  const locked=started();
  assert.equal(actionAvailable(tavern,locked,synthetic),false);
  assert.throws(
    ()=>dispatch(locked,{type:'action',id:'tavern.shift'},synthetic),
    /Условия действия не выполнены/
  );

  const unlocked=started();
  unlocked.run.progression.worldFacts.push('test.late-career-unlock');
  assert.equal(actionAvailable(tavern,unlocked,synthetic),true);
  const out=dispatch(unlocked,{type:'action',id:'tavern.shift'},synthetic);
  assert.equal(out.run.progression.careers.tavern?.counters.completed_shifts,1);
});
