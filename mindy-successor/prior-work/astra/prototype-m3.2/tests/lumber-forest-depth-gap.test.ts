import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const definitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));
const adapter=JSON.parse(readFileSync('content/lumber-item-capabilities.fixture.json','utf8'));
const doc=readFileSync('../../../docs/lumber-prep/FOREST_DEPTH_GAP_TO_SPEC_v1.md','utf8');
const pa=readFileSync('../../../docs/PRODUCT_ACCEPTANCE_SLICE_v0.md','utf8');

const forest=definitions.activities.find((a:any)=>a.id==='lumber.forest');

test('Product Acceptance spec really requires route/challenge/item/season/save/escape depth',()=>{
  for(const phrase of [
    '3 route contexts',
    '3 challenge families',
    'item capability',
    'season difference',
    'save/resume',
    'success/escape difference'
  ])assert.ok(pa.includes(phrase),phrase);
});

test('current counter.v1 Forest proves save/resume and separate internal resource only',()=>{
  assert.ok(forest);
  assert.equal(forest.adapter,'counter.v1');
  assert.equal(forest.resumePolicy,'allowed');
  assert.equal(forest.entryEnergyCost,2);
  assert.equal(typeof forest.adapterConfig.initialEndurance,'number');
  assert.equal(typeof forest.adapterConfig.successAtProgress,'number');
  assert.ok(doc.includes('| save/resume |'));
  assert.ok(doc.includes('**READY**'));
});

test('current Forest does not fabricate three route contexts, three challenge families or season difference',()=>{
  assert.ok(forest);
  assert.equal(Object.prototype.hasOwnProperty.call(forest,'routes'),false);
  assert.equal(Object.prototype.hasOwnProperty.call(forest,'challengeFamilies'),false);
  assert.equal(JSON.stringify(forest).includes('calendarSeason'),false);
  assert.ok(doc.includes('| 3 route contexts |'));
  assert.ok(doc.includes('| 3 challenge families |'));
  assert.ok(doc.includes('| season difference |'));
  assert.ok((doc.match(/\*\*GAP\*\*/g)??[]).length>=3);
});

test('item capability boundary is partial and test adapter remains non-production evidence',()=>{
  assert.deepEqual(forest.entryConditions,[
    {kind:'worldFact',fact:'lumber.capability.enter-old-boundary',present:true}
  ]);
  assert.equal(adapter.status,'TEST_ADAPTER_UNTIL_SHARED_ITEM_CAPABILITY_SCHEMA');
  assert.equal(adapter.itemId,'old_boundary_token');
  assert.equal(adapter.capabilities[0].id,'enter_old_boundary');
  assert.ok(doc.includes('**PARTIAL / BLOCKED**'));
  assert.ok(doc.includes('not PA17 completion'));
});

test('success, escape and failure remain distinct while exact A5 success trigger stays locked',()=>{
  assert.deepEqual(
    forest.results.map((r:any)=>({id:r.id,outcome:r.outcome})),
    [
      {id:'lumber.forest.success',outcome:'success'},
      {id:'lumber.forest.escape',outcome:'escape'},
      {id:'lumber.forest.failure',outcome:'failure'}
    ]
  );
  const success=forest.results.find((r:any)=>r.outcome==='success');
  const escape=forest.results.find((r:any)=>r.outcome==='escape');
  assert.ok(success.effects.some((e:any)=>e.kind==='addWorldFact'&&e.fact==='lumber.forest.truth-known'));
  assert.equal(escape.effects.some((e:any)=>e.kind==='addWorldFact'&&e.fact==='lumber.forest.truth-known'),false);
  assert.ok(doc.includes('activityResult(lumber.forest, success, lumber.forest.success)'));
});

test('Forest depth gaps never modify Hard Work contract',()=>{
  const hardWork=definitions.endings.find((e:any)=>e.id==='ending.lumber.hard-work');
  assert.deepEqual(hardWork.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.deepEqual(hardWork.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);
});
