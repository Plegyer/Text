import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const matrix=JSON.parse(readFileSync('content/lumber-pa-shipped-row-evidence.fixture.json','utf8'));
const definitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));
const crossPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-cross-system.pack.json','utf8'));

const expectedRows=[
  'PA02','PA03','PA04','PA05','PA06','PA12',
  'PA14','PA15','PA16','PA17','PA18','PA19','PA20',
  'PA21','PA22','PA23','PA24','PA25','PA26'
];

test('shipped-row evidence matrix covers exactly the requested Lumber PA rows',()=>{
  assert.deepEqual(matrix.rows.map((r:any)=>r.row),expectedRows);
  assert.equal(new Set(matrix.rows.map((r:any)=>r.row)).size,expectedRows.length);
  for(const row of matrix.rows)assert.ok(matrix.classifications.includes(row.classification),row.row);
});

test('PA17 is blocked by real item authoring and cannot pass by capability fact injection',()=>{
  const row=matrix.rows.find((r:any)=>r.row==='PA17');
  assert.ok(row);
  assert.equal(row.classification,'blocked by genuine OPEN authoring');
  assert.ok(row.blocker.includes('Injecting lumber.capability.enter-old-boundary'));
  assert.equal(matrix.invariants.capabilityFactInjectionPassesPA17,false);
});

test('Forest depth row PA16 remains blocked while shipped success/escape rows retain exact activityResult evidence',()=>{
  const pa16=matrix.rows.find((r:any)=>r.row==='PA16');
  assert.equal(pa16.classification,'blocked by genuine OPEN authoring');

  const returnEvent=crossPack.events.find((e:any)=>e.id==='lumber-cross.activity-forest-return');
  assert.ok(returnEvent);
  assert.deepEqual(returnEvent.reactionTriggers,[
    {kind:'activityResult',activity:'lumber.forest',outcome:'success',result:'lumber.forest.success'}
  ]);
  assert.equal(matrix.invariants.activityContinuationBoundary,'activityResult');

  assert.equal(matrix.rows.find((r:any)=>r.row==='PA18').classification,'shipped-executable');
  assert.equal(matrix.rows.find((r:any)=>r.row==='PA19').classification,'shipped-executable');
});

test('PA21 is accelerator-valid only for the long Hard Work threshold',()=>{
  const row=matrix.rows.find((r:any)=>r.row==='PA21');
  assert.ok(row);
  assert.equal(row.classification,'accelerator-valid for long threshold only');
  assert.ok(row.acceleratorRule.includes('50-shift threshold'));
});

test('Hard Work shipped-row evidence remains only completed_shifts >= 50 with exact reward',()=>{
  const hardWork=definitions.endings.find((e:any)=>e.id==='ending.lumber.hard-work');
  assert.ok(hardWork);
  assert.deepEqual(hardWork.conditions,matrix.invariants.hardWorkConditions);
  assert.equal(hardWork.conditions.length,1);
  assert.deepEqual(hardWork.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);
  assert.equal(matrix.invariants.hardWorkRewardId,'hardWork:lumber');
});
