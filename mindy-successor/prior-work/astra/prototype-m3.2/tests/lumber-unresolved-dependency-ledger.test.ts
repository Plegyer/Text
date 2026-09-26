import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const activation=JSON.parse(readFileSync('content/lumber-production-activation.fixture.json','utf8'));
const definitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));
const crossPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-cross-system.pack.json','utf8'));
const itemAdapter=JSON.parse(readFileSync('content/lumber-item-capabilities.fixture.json','utf8'));
const ledger=readFileSync('../../../docs/lumber-prep/LUMBER_UNRESOLVED_DEPENDENCY_LEDGER_v1.md','utf8');

test('ledger contains only the four genuine OPEN dependency families named by the task',()=>{
  for(const heading of [
    'OPEN-01 — Old Boundary Token capability acquisition/use source',
    'OPEN-02 — School management/accounting public fact ID and threshold',
    'OPEN-03 — Arcana / Forest School public fact ID and threshold',
    'OPEN-04 — deeper Forest authoring beyond the locked Activity slice'
  ]){
    assert.ok(ledger.includes(heading),heading);
  }
  assert.ok(ledger.includes('Hard Work is **LOCKED**, not OPEN.'));
});

test('current activation fixture keeps token source, management fact and deeper Forest authoring unresolved',()=>{
  const byId=new Map(activation.unresolvedDependencies.map((entry:any)=>[entry.id,entry]));

  assert.equal(byId.get('lumber.forest.item_capability_source')?.status,'OPEN');
  assert.equal(byId.get('school.management_public_fact')?.status,'OPEN');
  assert.equal(byId.get('lumber.forest.deeper_authoring')?.status,'OPEN');

  assert.equal(itemAdapter.status,'TEST_ADAPTER_UNTIL_SHARED_ITEM_CAPABILITY_SCHEMA');
  assert.equal(itemAdapter.itemId,'old_boundary_token');
  assert.equal(itemAdapter.capabilities[0].id,'enter_old_boundary');
});

test('management boundary remains fixture-only and synthetic School action is excluded from production activation',()=>{
  const schoolReturn=crossPack.events.find((event:any)=>event.id==='lumber-cross.school-management-return');
  assert.ok(schoolReturn);
  assert.deepEqual(schoolReturn.reactionTriggers,[
    {kind:'worldFactAdded',fact:'lumber.school.management-ready'}
  ]);

  assert.ok(activation.exclusions.some((entry:any)=>
    entry.kind==='action'&&entry.id==='school.lumber-management'
  ));
});

test('no approved Lumber target definition or event invents an Arcana public fact or threshold',()=>{
  const encoded=JSON.stringify({
    targetDefinitions:definitions,
    crossEvents:crossPack.events
  }).toLowerCase();

  assert.equal(encoded.includes('arcana'),false);
  assert.ok(ledger.includes('no final Arcana-owned public fact ID is locked'));
  assert.ok(ledger.includes('no exact Arcana lesson/milestone/certificate threshold is locked'));
});

test('deeper Forest OPEN status does not change locked result IDs or exact activityResult continuation',()=>{
  const activity=definitions.activities.find((entry:any)=>entry.id==='lumber.forest');
  assert.ok(activity);
  assert.deepEqual(
    activity.results.map((result:any)=>result.id),
    ['lumber.forest.success','lumber.forest.escape','lumber.forest.failure']
  );

  const event=crossPack.events.find((entry:any)=>entry.id==='lumber-cross.activity-forest-return');
  assert.ok(event);
  assert.deepEqual(event.reactionTriggers,[
    {kind:'activityResult',activity:'lumber.forest',outcome:'success',result:'lumber.forest.success'}
  ]);
});

test('Hard Work is not an open dependency and remains only completed_shifts >= 50 with exact reward',()=>{
  const hardWork=definitions.endings.find((ending:any)=>ending.id==='ending.lumber.hard-work');
  assert.ok(hardWork);

  assert.deepEqual(hardWork.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.equal(hardWork.conditions.length,1);
  assert.deepEqual(hardWork.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);

  assert.equal(
    activation.unresolvedDependencies.some((entry:any)=>/hard.?work/i.test(entry.id)),
    false
  );
});
