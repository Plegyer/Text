import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const audit=readFileSync('../../../docs/lumber-prep/LUMBER_PR22_CLOSURE_PARITY_AUDIT_v1.md','utf8');
const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const schema=readFileSync('../src/core/schema.ts','utf8');
const engine=readFileSync('../src/core/engine.ts','utf8');

const targetFixture=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));

test('audit records exact merged PR22 identity and remaining authoring/depth blockers',()=>{
  assert.ok(audit.includes('011572ef1335deda5ac33120c3a7ea7f9849dbbf'));
  for(const phrase of [
    'Forest entry is available without Old Boundary Token',
    'Logging road is the normal route',
    'Old-boundary route uses actual inventory-derived capability',
    'Legacy active Activity saves preserve advance/escape',
    'No acquisition source invented',
    'No consume policy invented',
    'Hard Work unchanged',
    'Hunter-trail authoring',
    'Three challenge families',
    'Seasonal topology/options'
  ])assert.ok(audit.includes(phrase),phrase);
});

test('when PR22 runtime is present, production Forest parity matches the accepted route/capability contract',()=>{
  const hasPr22=schema.includes("kind:z.literal('itemCapability')")&&engine.includes('availableActivityActions');
  if(!hasPr22){
    assert.ok(audit.includes('worker branch received the post-PR22 TASK update without the PR22 shared runtime merge itself'));
    return;
  }

  const forest=definitions.activities.find((a:any)=>a.id==='lumber.forest');
  assert.ok(forest);
  assert.deepEqual(forest.entryConditions,[]);
  assert.equal(forest.entryEnergyCost,2);

  const logging=forest.options.find((o:any)=>o.id==='forest.route.logging-road');
  assert.ok(logging);
  assert.deepEqual(logging.conditions,[]);
  assert.equal(logging.setRoute,'logging-road');

  const oldBoundary=forest.options.find((o:any)=>o.id==='forest.route.old-boundary');
  assert.ok(oldBoundary);
  assert.deepEqual(oldBoundary.conditions,[
    {kind:'itemCapability',capability:'enter_old_boundary',present:true}
  ]);
  assert.equal(oldBoundary.setRoute,'old-boundary');

  const token=definitions.itemDefinitions.find((i:any)=>i.id==='old_boundary_token');
  assert.ok(token);
  assert.deepEqual(token.capabilities,['enter_old_boundary']);
});

test('when PR22 runtime is present, legacy Activity compatibility remains advance/escape through option model version 0',()=>{
  const hasPr22=schema.includes('optionModelVersion')&&engine.includes('availableActivityActions');
  if(!hasPr22){
    assert.equal(schema.includes('optionModelVersion'),false);
    return;
  }
  assert.ok(schema.includes("optionModelVersion:z.number().int().min(0).max(1).default(0)"));
  assert.ok(engine.includes("if(envelope.optionModelVersion===0)return [{id:'advance',label:'Продолжить'},{id:'escape',label:'Отступить'}]"));
});

test('PR22 audit does not invent acquisition or consume policy',()=>{
  assert.ok(audit.includes('Still OPEN:'));
  assert.ok(audit.includes('retained vs consumed/turned-in policy'));
  assert.equal(/selected acquisition source:|must be purchased|consumed on route selection/i.test(audit),false);
});

test('Hard Work remains one completed_shifts threshold with exact reward',()=>{
  const hardWork=targetFixture.endings.find((e:any)=>e.id==='ending.lumber.hard-work');
  assert.ok(hardWork);
  assert.deepEqual(hardWork.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.deepEqual(hardWork.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);
});
