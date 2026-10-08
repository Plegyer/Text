import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {
  reconstructLumberStayPreRunResult,
  reconstructLumberStayWithRunResult,
  reconstructPalaceAccessWithoutLedger
} from './final-historical-reconstruction-v55.ts';

const root='tests/fixtures/final-historical';

test('v55 F1 schema1 reconstruction preserves the historical pre-v2 boundary',()=>{
  const raw=JSON.parse(readFileSync(`${root}/f1-schema1-reconstructed.json`,'utf8'));
  assert.equal(raw.schemaVersion,1);
  assert.equal(raw.run.metrics.work,1);
  assert.equal(Object.prototype.hasOwnProperty.call(raw.run,'actionCounts'),false);
  assert.equal(raw.run.pending.eventId,'base.arrival');
  assert.equal(raw.run.pending.variantId,'welcome');
  assert.equal(Object.prototype.hasOwnProperty.call(raw.run,'creation'),false);
  assert.equal(Object.prototype.hasOwnProperty.call(raw.run.metrics,'lust'),false);
});

test('v55 F2 envelope is pre-Field-Time and matches the shipped Lumber Activity entry contract',()=>{
  const raw=JSON.parse(readFileSync(`${root}/f2-pre-field-time-activity-envelope-reconstructed.json`,'utf8'));
  assert.equal(raw.activityId,'lumber.forest');
  assert.equal(raw.definitionVersion,1);
  assert.equal(raw.adapter,'counter.v1');
  assert.equal(raw.entryEnergyCommitted,true);
  assert.equal(raw.internalState.endurance,5);
  assert.equal(raw.internalState.progress,0);
  assert.equal(raw.checkpoint,'entry');
  assert.equal(raw.rngState,1107666780);
  assert.equal(Object.prototype.hasOwnProperty.call(raw,'fieldTimeRemaining'),false);
  assert.equal(Object.prototype.hasOwnProperty.call(raw,'miniGames'),false);
  assert.equal(Object.prototype.hasOwnProperty.call(raw.internalState,'routeId'),false);
  assert.equal(Object.prototype.hasOwnProperty.call(raw.internalState,'resolvedOptionIds'),false);
});

test('v55 F3 recipe removes only typed Palace ledger/progression-complete and preserves access',()=>{
  const source:any={
    meta:{unlocks:[]},
    run:{
      progression:{
        worldFacts:['palace.d23-qualified','palace.access-granted','palace.progression-complete'],
        palace:{stage:'outcome-ready',counters:{duties:15}}
      }
    }
  };
  const raw:any=reconstructPalaceAccessWithoutLedger(source);
  assert.equal(raw.run.progression.worldFacts.includes('palace.access-granted'),true);
  assert.equal(raw.run.progression.worldFacts.includes('palace.progression-complete'),false);
  assert.equal(Object.prototype.hasOwnProperty.call(raw.run.progression,'palace'),false);
  assert.ok(source.run.progression.palace,'source object must remain unchanged');
});

test('v55 F4 recipe matches accepted lumber-stay RunResult evidence exactly',()=>{
  const raw:any=reconstructLumberStayWithRunResult({
    meta:{completedEndings:[],unlocks:[],appliedResultTransactions:[]},
    run:{status:'active',endings:{committed:null,result:null}}
  });
  assert.deepEqual(raw.meta.completedEndings,['lumber-stay']);
  assert.deepEqual(raw.meta.unlocks,['vitality']);
  assert.deepEqual(raw.meta.appliedResultTransactions,['tx.legacy.lumber-stay']);
  assert.equal(raw.run.status,'ended');
  assert.equal(raw.run.endings.committed,'lumber-stay');
  assert.deepEqual(raw.run.endings.result,{
    resultId:'rr.legacy.lumber-stay',
    endingId:'lumber-stay',
    transactionId:'tx.legacy.lumber-stay',
    completedAtDay:17,
    firstCompletion:true,
    appliedMetaRewardIds:['legacy.reward.vitality']
  });
});

test('v55 F5 recipe keeps pre-RunResult transaction proof absent for migration to create',()=>{
  const raw:any=reconstructLumberStayPreRunResult({
    meta:{completedEndings:[],unlocks:['x'],appliedResultTransactions:['old']},
    run:{status:'active',endings:{committed:null,result:{old:true}}}
  });
  assert.deepEqual(raw.meta.completedEndings,['lumber-stay']);
  assert.deepEqual(raw.meta.unlocks,[]);
  assert.deepEqual(raw.meta.appliedResultTransactions,[]);
  assert.equal(raw.run.status,'ended');
  assert.equal(raw.run.endings.committed,'lumber-stay');
  assert.equal(raw.run.endings.result,null);
});
