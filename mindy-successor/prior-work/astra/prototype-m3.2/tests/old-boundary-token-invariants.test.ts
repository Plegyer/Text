import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const inv=JSON.parse(readFileSync('content/old-boundary-token-invariants.fixture.json','utf8'));
const target=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));
const production=JSON.parse(readFileSync('content/definitions.json','utf8'));

test('canonical Old Boundary identities are stable and policy choices remain unset',()=>{
  assert.deepEqual(inv.canonical,{
    itemId:'old_boundary_token',
    capabilityId:'enter_old_boundary',
    routeOptionId:'forest.route.old-boundary'
  });
  for(const value of Object.values(inv.policyNeutral))assert.equal(value,null);
});

test('all policy-independent invariants are required',()=>{
  assert.deepEqual(inv.invariants.map((x:any)=>x.id),[
    'canonical-identities-stable',
    'acquisition-exactly-once-per-accepted-transaction',
    'capability-derived-from-authoritative-state',
    'reload-cannot-duplicate-grant',
    'reload-cannot-duplicate-removal',
    'old-boundary-gating-deterministic',
    'hard-work-independent'
  ]);
  assert.ok(inv.invariants.every((x:any)=>x.required===true));
});

test('save/reload contract requires idempotent grant/removal boundaries without choosing a policy',()=>{
  assert.ok(inv.saveReload.afterAcquisition.includes('one committed grant'));
  assert.ok(inv.saveReload.afterRemovalIfSelected.includes('remains removed'));
  assert.equal(inv.saveReload.retryCommittedTransaction,'idempotent');
  assert.equal(inv.policyNeutral.consumePolicy,null);
  assert.equal(inv.policyNeutral.repeatabilityPolicy,null);
});

test('when canonical production item definitions are present, capability identity matches the invariant',()=>{
  const defs=production.itemDefinitions??[];
  const token=defs.find((x:any)=>x.id==='old_boundary_token');
  if(!token)return;
  assert.deepEqual(token.capabilities,['enter_old_boundary']);
  const forest=production.activities?.find((a:any)=>a.id==='lumber.forest');
  const old=forest?.options?.find((o:any)=>o.id==='forest.route.old-boundary');
  if(old){
    assert.deepEqual(old.conditions,[
      {kind:'itemCapability',capability:'enter_old_boundary',present:true}
    ]);
  }
});

test('no token decision can alter Hard Work or exact A5 identity',()=>{
  const hardWork=target.endings.find((e:any)=>e.id==='ending.lumber.hard-work');
  assert.deepEqual(hardWork.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.deepEqual(hardWork.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);
  assert.equal(inv.hardWork.tokenPrerequisiteAllowed,false);
  assert.equal(inv.hardWork.rewardId,'hardWork:lumber');
  assert.deepEqual(inv.a5,{
    continuationBoundary:'activityResult',
    activity:'lumber.forest',
    outcome:'success',
    result:'lumber.forest.success'
  });
});
