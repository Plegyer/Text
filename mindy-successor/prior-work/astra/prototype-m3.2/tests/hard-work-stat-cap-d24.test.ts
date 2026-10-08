import test from 'node:test';
import assert from 'node:assert/strict';

import {
  dispatch,
  effectiveProgressionStatCap,
  freshSave,
  parseSave,
  setMetric
} from '../src/core/engine.ts';
import {
  STRONG_META_IDS,
  emptyStrongMetaState,
  grantStrongMetaReward
} from '../src/core/strongMeta.ts';
import {stats} from '../src/core/schema.ts';
import {catalog} from './helpers.ts';

function capOwned(){
  return grantStrongMetaReward(emptyStrongMetaState(),STRONG_META_IDS.palaceCap200);
}

test('D24 cap-200 is projected only through the typed Specialist and never multiplies start values or +5 packages',()=>{
  const normal=freshSave();
  assert.equal(effectiveProgressionStatCap(normal),100);
  setMetric(normal,'strength',150);
  assert.equal(normal.run.character.stats.strength,100);

  let raised=freshSave({hardWorkProgress:['lumber'],strongMeta:capOwned()});
  assert.equal(effectiveProgressionStatCap(raised),100);
  assert.equal(Object.values(raised.run.character.stats).every(value=>value===1),true);
  assert.equal(raised.run.creation.remaining,10);

  raised=dispatch(raised,{type:'setStrongMetaSpecialist',id:STRONG_META_IDS.palaceCap200,active:true},catalog);
  raised=dispatch(raised,{type:'setHardWorkPackageActive',career:'lumber',active:true},catalog);
  for(let i=0;i<10;i++)raised=dispatch(raised,{type:'allocate',stat:'strength',delta:1},catalog);
  raised=dispatch(raised,{type:'finishCreation'},catalog);

  assert.equal(effectiveProgressionStatCap(raised),200);
  assert.equal(raised.run.character.stats.strength,16);
  assert.equal(raised.run.character.lust,5);
  for(const stat of stats.filter(stat=>stat!=='strength'))assert.equal(raised.run.character.stats[stat],1,stat);

  setMetric(raised,'strength',250);
  setMetric(raised,'lust',150);
  assert.equal(raised.run.character.stats.strength,200);
  assert.equal(raised.run.character.lust,100);
});

test('v6 save rejects a progression value above its own effective cap',()=>{
  const raw=JSON.parse(JSON.stringify(freshSave()));
  raw.run.character.stats.strength=150;
  assert.throws(
    ()=>parseSave(JSON.stringify(raw),catalog),
    /превышает эффективный потолок/i
  );
});
