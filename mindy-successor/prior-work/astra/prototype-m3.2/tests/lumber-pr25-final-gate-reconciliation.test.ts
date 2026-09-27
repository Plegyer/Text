import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

const reconciliation=readFileSync('../../../docs/lumber-prep/LUMBER_PR25_FINAL_GATE_RECONCILIATION_v1.md','utf8');
const definitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));

test('PR25 reconciliation records QA-only scope and exact merge identity',()=>{
  assert.ok(reconciliation.includes('961208ea995ca034e8dfe896337a38828db52415'));
  assert.ok(reconciliation.includes('production runtime/content/UI changes: none'));
  assert.ok(reconciliation.includes('218/218 tests PASS'));
});

test('Hard Work remains exact after PR25',()=>{
  const hardWork=definitions.endings.find((e:any)=>e.id==='ending.lumber.hard-work');
  assert.deepEqual(hardWork.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.deepEqual(hardWork.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);
});

test('PR25 reconciliation keeps inventory-derived capability semantics and natural logging road',()=>{
  assert.ok(reconciliation.includes('authoritative capability remains inventory-derived'));
  assert.ok(reconciliation.includes('forest.route.logging-road'));
  assert.ok(reconciliation.includes('old-boundary route is unavailable'));
  assert.ok(reconciliation.includes('no item/capability accelerator is required'));
});

test('if merged PR25 gate exists locally it contains the same Lumber locks',()=>{
  const path='tests/qa-minimal-rc-acceptance-gate-v2.test.ts';
  if(!existsSync(path))return;
  const source=readFileSync(path,'utf8');
  assert.ok(source.includes("rewardId:'hardWork:lumber'"));
  assert.ok(source.includes("hasItemCapability!(noItem,'enter_old_boundary'"));
  assert.ok(source.includes("inventory.old_boundary_token=1"));
  assert.ok(source.includes("forest.route.logging-road"));
  assert.ok(source.includes("counters.completed_shifts=49"));
  assert.ok(source.includes("counters.completed_shifts,50"));
});

test('Old Boundary and School authoring remain OPEN',()=>{
  assert.ok(reconciliation.includes('School management/accounting public-result authoring remains OPEN'));
  assert.ok(reconciliation.includes('Old Boundary authoring remains OPEN'));
  assert.ok(reconciliation.includes('Seeded `old_boundary_token` inventory is still not a natural PA09 pass'));
});
