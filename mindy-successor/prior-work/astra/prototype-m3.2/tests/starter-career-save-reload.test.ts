import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch,parseSave} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';

function shiftAndReload(actionId:'satyr-maid.shift'|'undead-farm.shift',careerId:'satyr-maid'|'undead-farm'){
  const before=started();
  const action=catalog.definitions.actions.find(item=>item.id===actionId);
  assert.ok(action,actionId);

  const shifted=dispatch(before,{type:'action',id:actionId},catalog);
  const career=shifted.run.progression.careers[careerId];
  assert.ok(career,careerId);
  assert.equal(career.counters.completed_shifts,1);
  assert.equal(career.shifts,0);
  assert.equal(shifted.run.actionCounts[actionId],1);
  assert.ok(career.facts.includes('first-shift-complete'));

  const lastAction=shifted.run.lastAction;
  assert.ok(lastAction,actionId+' lastAction');
  assert.equal(lastAction.id,actionId);
  assert.equal(lastAction.title,action.label);
  assert.ok(lastAction.presentationId,actionId+' presentationId');
  assert.equal(lastAction.text,action.scenes?.[0]?.text);

  const restored=parseSave(JSON.stringify(shifted),catalog);
  assert.deepEqual(restored.run.progression.careers[careerId],career);
  assert.equal(restored.run.actionCounts[actionId],1);
  assert.deepEqual(restored.run.lastAction,lastAction);

  const secondReload=parseSave(JSON.stringify(restored),catalog);
  assert.deepEqual(secondReload.run.progression.careers[careerId],career);
  assert.equal(secondReload.run.actionCounts[actionId],1);
  assert.deepEqual(secondReload.run.lastAction,lastAction);

  return {career,lastAction};
}

test('C1D-52 Satyr Maid stage counter fact and last action survive existing Save reload',()=>{
  const {career}=shiftAndReload('satyr-maid.shift','satyr-maid');
  assert.equal(career.stage,'known-face');
  assert.deepEqual(career.facts,['first-shift-complete']);
});

test('C1D-53 Undead Farm stage counter fact and last action survive existing Save reload',()=>{
  const {career}=shiftAndReload('undead-farm.shift','undead-farm');
  assert.equal(career.stage,'reliable-helper');
  assert.deepEqual(career.facts,['first-shift-complete']);
  assert.equal(career.facts.some(fact=>/research|specimen|successor|external/i.test(fact)),false);
});
