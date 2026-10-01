import test from 'node:test';
import assert from 'node:assert/strict';

import {actionAvailable,parseSave,starterCareerIds} from '../src/core/engine.ts';
import {ordinaryHardWorkCareers} from '../src/core/schema.ts';
import {catalog,started} from './helpers.ts';

const actionIds=ordinaryHardWorkCareers.map(career=>`${career}.shift`);

function availableIds(state=started()){
  return actionIds.filter(id=>{
    const action=catalog.definitions.actions.find(item=>item.id===id);
    assert.ok(action,id);
    return actionAvailable(action,state,catalog);
  });
}

function reload<T>(state:T){
  return parseSave(JSON.stringify(state),catalog);
}

test('all-ten availability smoke: starters, stat unlocks, calendar unlocks, and reload agree',()=>{
  let s=started();
  assert.deepEqual(new Set(availableIds(s)),new Set(starterCareerIds.map(id=>`${id}.shift`)));
  s=reload(s);
  assert.deepEqual(new Set(availableIds(s)),new Set(starterCareerIds.map(id=>`${id}.shift`)));

  for(const stat of Object.keys(s.run.character.stats))s.run.character.stats[stat as keyof typeof s.run.character.stats]=100;
  assert.deepEqual(new Set(availableIds(s)),new Set(actionIds));
  s=reload(s);
  assert.deepEqual(new Set(availableIds(s)),new Set(actionIds));

  s=started();
  s.run.calendar.elapsedDays=80;
  assert.deepEqual(new Set(availableIds(s)),new Set(actionIds));
  s=reload(s);
  assert.deepEqual(new Set(availableIds(s)),new Set(actionIds));
});
