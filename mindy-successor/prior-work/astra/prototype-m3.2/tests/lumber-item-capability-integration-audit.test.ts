import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {items,conditionSchema,effectSchema} from '../src/core/schema.ts';

const lumberDefinitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));
const adapter=JSON.parse(readFileSync('content/lumber-item-capabilities.fixture.json','utf8'));
const activeDefinitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const engineSource=readFileSync('src/core/engine.ts','utf8');

test('current production item boundary excludes old_boundary_token from typed inventory APIs',()=>{
  assert.deepEqual([...items],['herb','tonic','scales']);

  assert.equal(conditionSchema.safeParse({
    kind:'itemCount',
    id:'old_boundary_token',
    op:'gte',
    count:1
  }).success,false);

  assert.equal(effectSchema.safeParse({
    kind:'addItem',
    id:'old_boundary_token',
    count:1
  }).success,false);

  assert.equal(effectSchema.safeParse({
    kind:'removeItem',
    id:'old_boundary_token',
    count:1
  }).success,false);
});

test('generic acquisition and consumption exist only through current typed/legacy item effects, not a shared capability command API',()=>{
  const authored=activeDefinitions.actions.filter((a:any)=>JSON.stringify(a).match(/herb|tonic|scales/));
  assert.ok(authored.some((a:any)=>a.id==='forage'));
  assert.ok(authored.some((a:any)=>a.id==='sell'));
  assert.ok(authored.some((a:any)=>a.id==='scales'));

  for(const command of ['acquireItem','useItem','consumeItem','equipItem','grantItemCapability']){
    assert.equal(engineSource.includes(`type:'${command}'`),false);
  }
});

test('Lumber adapter remains explicitly test-only and exactly bridges enter_old_boundary to the Forest worldFact gate',()=>{
  assert.equal(adapter.status,'TEST_ADAPTER_UNTIL_SHARED_ITEM_CAPABILITY_SCHEMA');
  assert.equal(adapter.itemId,'old_boundary_token');

  const capability=adapter.capabilities.find((c:any)=>c.id==='enter_old_boundary');
  assert.ok(capability);
  assert.deepEqual(capability.runtimeAdapter,{
    kind:'worldFact',
    fact:'lumber.capability.enter-old-boundary'
  });

  const forest=lumberDefinitions.activities.find((a:any)=>a.id==='lumber.forest');
  assert.ok(forest);
  assert.deepEqual(forest.entryConditions,[
    {kind:'worldFact',fact:'lumber.capability.enter-old-boundary',present:true}
  ]);
  assert.equal(forest.entryEnergyCost,2);
});

test('no shipped action silently acquires old_boundary_token or publishes its adapter fact',()=>{
  const serialized=JSON.stringify(activeDefinitions);
  assert.equal(serialized.includes('old_boundary_token'),false);
  assert.equal(serialized.includes('lumber.capability.enter-old-boundary'),false);
});

test('item-capability audit boundary cannot become a hidden Hard Work prerequisite',()=>{
  const hardWork=lumberDefinitions.endings.find((e:any)=>e.id==='ending.lumber.hard-work');
  assert.ok(hardWork);
  assert.deepEqual(hardWork.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.deepEqual(hardWork.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);
});
