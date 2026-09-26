import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const audit=readFileSync('../../../docs/lumber-prep/LUMBER_PA_CLOSURE_DEPENDENCY_AUDIT_v1.md','utf8');
const schema=readFileSync('../src/core/schema.ts','utf8');
const engine=readFileSync('../src/core/engine.ts','utf8');
const itemAdapter=JSON.parse(readFileSync('content/lumber-item-capabilities.fixture.json','utf8'));
const definitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));
const crossPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-cross-system.pack.json','utf8'));

test('closure audit covers PA09, PA14-PA20 and PA21-PA26',()=>{
  const ids=['PA09',...Array.from({length:13},(_,i)=>`PA${String(i+14).padStart(2,'0')}`)];
  for(const id of ids)assert.ok(audit.includes(`| ${id} `),id);
});

test('current shared schema still lacks typed old_boundary_token item support',()=>{
  assert.ok(schema.includes('z.enum(items)'));
  assert.equal(schema.includes("'old_boundary_token'"),false);
  assert.equal(itemAdapter.status,'TEST_ADAPTER_UNTIL_SHARED_ITEM_CAPABILITY_SCHEMA');
  assert.equal(itemAdapter.itemId,'old_boundary_token');
  assert.equal(itemAdapter.capabilities[0].id,'enter_old_boundary');
  assert.ok(audit.includes('**runtime infrastructure missing**'));
});

test('current Activity command surface is still advance or escape only',()=>{
  assert.ok(engine.includes("{type:'activityAction';id:'advance'|'escape'}"));
  assert.ok(audit.includes('Current shipped Activity command surface exposes only'));
  assert.ok(audit.includes('capability-gated options'));
});

test('Forest success and escape closure rows are already shipped through exact A5 result contracts',()=>{
  const event=crossPack.events.find((e:any)=>e.id==='lumber-cross.activity-forest-return');
  assert.ok(event);
  assert.deepEqual(event.reactionTriggers,[
    {kind:'activityResult',activity:'lumber.forest',outcome:'success',result:'lumber.forest.success'}
  ]);
  for(const row of ['PA18','PA19','PA20'])assert.ok(audit.includes(`| ${row} `));
  assert.ok(audit.includes('**already shipped**'));
});

test('Hard Work rows remain closed and independent of all closure dependencies',()=>{
  const hardWork=definitions.endings.find((e:any)=>e.id==='ending.lumber.hard-work');
  assert.ok(hardWork);
  assert.deepEqual(hardWork.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.deepEqual(hardWork.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);
  for(const row of ['PA21','PA22','PA23','PA24','PA25','PA26'])assert.ok(audit.includes(`| ${row} `));
});
