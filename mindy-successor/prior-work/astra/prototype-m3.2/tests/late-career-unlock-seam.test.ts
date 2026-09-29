import test from 'node:test';
import assert from 'node:assert/strict';

import {actionAvailable,dispatch} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';

test('later ordinary career unlock uses authored action conditions without a second unlock state machine',()=>{
  const conditionalCatalog=structuredClone(catalog);
  const action=conditionalCatalog.definitions.actions.find(a=>a.id==='guard.shift');
  assert.ok(action);

  action.conditions=[{
    kind:'worldFact',
    fact:'test.guard-approved',
    present:true
  }];

  const locked=started();
  assert.equal(actionAvailable(action,locked,conditionalCatalog),false);
  assert.throws(
    ()=>dispatch(locked,{type:'action',id:'guard.shift'},conditionalCatalog),
    /Условия действия не выполнены/
  );

  const unlocked=started();
  unlocked.run.progression.worldFacts.push('test.guard-approved');
  assert.equal(actionAvailable(action,unlocked,conditionalCatalog),true);

  const out=dispatch(unlocked,{type:'action',id:'guard.shift'},conditionalCatalog);
  assert.equal(out.run.progression.careers.guard.counters.completed_shifts,1);
  assert.equal(out.run.historyState.actionCounts['guard.shift'],1);
});
