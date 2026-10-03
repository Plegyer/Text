import test from 'node:test';
import assert from 'node:assert/strict';

import {dispatch,freshSave,palaceRunQualified,parseSave} from '../src/core/engine.ts';
import {catalog} from './helpers.ts';

test('v4 migration preserves current-life values and defers selectable packages to the next life',()=>{
  const seed=freshSave({hardWorkProgress:['lumber','merchant']});
  seed.run.character.stats.strength=4;
  seed.run.character.stats.wits=4;
  seed.run.character.lust=7;
  seed.run.resources.money=1200;
  seed.run.creation.remaining=0;
  seed.run.creation.complete=true;

  const raw=JSON.parse(JSON.stringify(seed));
  raw.schemaVersion=4;
  raw.meta.unlocks.push('palace');
  delete raw.run.character.progressionStatCap;
  delete raw.run.character.creation.activeHardWorkPackages;
  delete raw.run.character.creation.hardWorkPackagesApplied;

  const migrated=parseSave(JSON.stringify(raw),catalog);
  assert.equal(migrated.schemaVersion,5);
  assert.equal(migrated.run.character.stats.strength,4);
  assert.equal(migrated.run.character.stats.wits,4);
  assert.equal(migrated.run.character.lust,7);
  assert.equal(migrated.run.resources.money,1200);
  assert.deepEqual(migrated.meta.hardWorkProgress,['lumber','merchant']);
  assert.equal(migrated.meta.unlocks.includes('palace'),false);
  assert.equal(migrated.run.character.progressionStatCap,100);
  assert.deepEqual(migrated.run.creation.activeHardWorkPackages,[]);
  assert.equal(migrated.run.creation.hardWorkPackagesApplied,true);
  assert.equal(palaceRunQualified(migrated),false);

  const next=dispatch(migrated,{type:'restart'},catalog);
  assert.equal(Object.values(next.run.character.stats).every(value=>value===1),true);
  assert.equal(next.run.character.lust,1);
  assert.equal(next.run.resources.money,600);
  assert.deepEqual(next.meta.hardWorkProgress,['lumber','merchant']);
  assert.deepEqual(next.run.creation.activeHardWorkPackages,[]);
  assert.equal(next.run.creation.hardWorkPackagesApplied,false);
});

test('selected package survives pre-finish reload, applies once, and then freezes',()=>{
  let s=freshSave({hardWorkProgress:['guard']});
  s=dispatch(s,{type:'setHardWorkPackageActive',career:'guard',active:true},catalog);
  s=parseSave(JSON.stringify(s),catalog);
  assert.deepEqual(s.run.creation.activeHardWorkPackages,['guard']);
  assert.equal(s.run.creation.hardWorkPackagesApplied,false);

  s.run.creation.remaining=0;
  s=dispatch(s,{type:'finishCreation'},catalog);
  assert.equal(s.run.character.stats.endurance,6);
  assert.equal(s.run.character.stats.manners,6);
  assert.equal(s.run.creation.hardWorkPackagesApplied,true);

  const snapshot=JSON.stringify(s.run.character);
  s=parseSave(JSON.stringify(s),catalog);
  assert.equal(JSON.stringify(s.run.character),snapshot);
  assert.throws(
    ()=>dispatch(s,{type:'setHardWorkPackageActive',career:'guard',active:false},catalog),
    /выбор наследия.*закрыт/i
  );
});
