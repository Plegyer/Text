import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const vectors=JSON.parse(readFileSync('content/old-boundary-token-decision-vectors.fixture.json','utf8'));
const target=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));

test('decision-vector pack keeps every dimension option-neutral',()=>{
  assert.deepEqual(vectors.dimensions.map((d:any)=>d.id),[
    'acquisition-source-type',
    'retain-vs-consume',
    'repeatable-vs-one-shot-acquisition',
    'inventory-visibility'
  ]);
  for(const dimension of vectors.dimensions)assert.equal(dimension.selected,null,dimension.id);
  assert.equal(vectors.globalInvariants.noPreferredOptionSelected,true);
});

test('acquisition source vectors stay at authoritative family level and invent no provider ID',()=>{
  const dim=vectors.dimensions.find((d:any)=>d.id==='acquisition-source-type');
  assert.deepEqual(dim.vectors.map((v:any)=>v.sourceFamily),[
    'tavern-old-owner','relationship','hunter','hidden-city-event'
  ]);
  assert.ok(dim.vectors.every((v:any)=>v.concreteProviderId===null));
  assert.equal(vectors.globalInvariants.noVendorOrConcreteEventInvented,true);
});

test('retain consume and repeatability vectors preserve exactly-once/reload expectations without selecting policy',()=>{
  const use=vectors.dimensions.find((d:any)=>d.id==='retain-vs-consume');
  assert.deepEqual(use.vectors.map((v:any)=>v.policy),['retained','consume-on-use','turn-in-later']);
  const repeat=vectors.dimensions.find((d:any)=>d.id==='repeatable-vs-one-shot-acquisition');
  assert.deepEqual(repeat.vectors.map((v:any)=>v.sourcePolicy),['one-shot','repeatable']);
  assert.ok(JSON.stringify(use).includes('reload'));
  assert.ok(JSON.stringify(repeat).includes('reload'));
});

test('hidden capability only is an explicit PA09 negative vector rather than a production promotion',()=>{
  const visibility=vectors.dimensions.find((d:any)=>d.id==='inventory-visibility');
  const visible=visibility.vectors.find((v:any)=>v.id==='visible-inventory');
  const hidden=visibility.vectors.find((v:any)=>v.id==='hidden-capability-only-negative');
  assert.equal(visible.fullPA09Compatible,true);
  assert.equal(hidden.fullPA09Compatible,false);
  assert.ok(hidden.expectedInvariants.includes('must not be counted as full PA09'));
  assert.equal(vectors.globalInvariants.seededInventoryCountsAsNaturalPA09,false);
});

test('decision vectors cannot alter Hard Work',()=>{
  const hardWork=target.endings.find((e:any)=>e.id==='ending.lumber.hard-work');
  assert.deepEqual(hardWork.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.deepEqual(hardWork.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);
  assert.equal(vectors.globalInvariants.hardWorkMayDependOnToken,false);
});
