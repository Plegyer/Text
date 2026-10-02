import test from 'node:test';
import assert from 'node:assert/strict';

import {
  dispatch,
  effectiveProgressionStatCap,
  freshSave,
  parseSave,
  setMetric
} from '../src/core/engine.ts';
import {stats} from '../src/core/schema.ts';
import {catalog} from './helpers.ts';

test('D24 effective cap is 100 or 200 and never multiplies start values or +5 packages',()=>{
  const normal=freshSave();
  assert.equal(effectiveProgressionStatCap(normal),100);
  setMetric(normal,'strength',150);
  assert.equal(normal.run.character.stats.strength,100);

  let raised=freshSave({hardWorkProgress:['lumber']},{progressionStatCap:200});
  assert.equal(effectiveProgressionStatCap(raised),200);
  assert.equal(Object.values(raised.run.character.stats).every(value=>value===1),true);
  assert.equal(raised.run.creation.remaining,10);

  setMetric(raised,'strength',198);
  setMetric(raised,'lust',150);
  assert.equal(raised.run.character.stats.strength,198);
  assert.equal(raised.run.character.lust,100);

  raised=dispatch(raised,{type:'setHardWorkPackageActive',career:'lumber',active:true},catalog);
  raised.run.creation.remaining=0;
  raised=dispatch(raised,{type:'finishCreation'},catalog);

  assert.equal(raised.run.character.stats.strength,200);
  assert.equal(raised.run.character.lust,100);
  for(const stat of stats.filter(stat=>stat!=='strength'))assert.equal(raised.run.character.stats[stat],1,stat);
});

test('v5 save rejects a progression value above its own effective cap',()=>{
  const raw=JSON.parse(JSON.stringify(freshSave()));
  raw.run.character.stats.strength=150;
  assert.throws(
    ()=>parseSave(JSON.stringify(raw),catalog),
    /превышает эффективный потолок/i
  );
});
