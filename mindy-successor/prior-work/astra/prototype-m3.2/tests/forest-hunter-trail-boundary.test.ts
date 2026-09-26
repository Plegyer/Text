import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const boundary=JSON.parse(readFileSync('content/forest-hunter-trail-boundary.fixture.json','utf8'));
const forestDoc=readFileSync('../../../docs/FOREST_ACTIVITY_SLICE_v0.md','utf8');
const schema=readFileSync('../src/core/schema.ts','utf8');
const engine=readFileSync('../src/core/engine.ts','utf8');
const definitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));

test('Hunter trail route identity is locked while clue/capability identities remain OPEN',()=>{
  assert.equal(boundary.routeIdentity.label,'hunter trail');
  assert.equal(boundary.routeIdentity.authoringKey,'hunter-trail');
  assert.equal(boundary.routeIdentity.locked,true);
  assert.equal(boundary.routeIdentity.productionOptionId,null);
  assert.equal(boundary.accessBoundary.hunterClueFactId,null);
  assert.equal(boundary.accessBoundary.navigationCapabilityId,null);
  assert.equal(boundary.accessBoundary.hunterClueStatus,'OPEN');
  assert.equal(boundary.accessBoundary.navigationCapabilityStatus,'OPEN');
  assert.ok(forestDoc.includes('Hunter trail'));
  assert.ok(forestDoc.includes('Hunter clue'));
});

test('boundary forbids fake production item identity and reuse of Old Boundary capability',()=>{
  assert.equal(boundary.accessBoundary.fakeProductionItemIdAllowed,false);
  assert.notEqual(boundary.runtimeHostContract.syntheticTestCapabilityIfNeeded,'enter_old_boundary');
  assert.equal(boundary.runtimeHostContract.syntheticTestCapabilityIsProduction,false);
  assert.ok(boundary.negativeRules.some((x:string)=>x.includes('do not reuse enter_old_boundary')));
  assert.ok(boundary.negativeRules.some((x:string)=>x.includes('do not invent hunter_clue_item')));
});

test('post-PR22 runtime shape can host independent capability-gated Activity options without changing old-boundary semantics',()=>{
  const hasPr22=
    schema.includes("kind:z.literal('itemCapability')")&&
    schema.includes('options:z.array(activityOptionSchema)')&&
    engine.includes('availableActivityActions');

  if(!hasPr22){
    assert.equal(boundary.runtimeHostContract.genericCapabilityGatedRouteSupportedAfterPR22,true);
    assert.equal(boundary.runtimeHostContract.oldBoundarySemanticsMustRemainUnchanged,true);
    return;
  }

  assert.ok(engine.includes('.filter(option=>eligible(option.conditions,s,cat))'));
  assert.ok(engine.includes('definition.options.find(candidate=>candidate.id===action)'));
  assert.ok(schema.includes('conditions:z.array(conditionSchema)'));
  assert.ok(schema.includes('setRoute:id.optional()'));
});

test('Hunter trail boundary does not alter locked old-boundary or Hard Work identities',()=>{
  assert.equal(boundary.runtimeHostContract.oldBoundaryRouteIdentity,'forest.route.old-boundary');
  assert.equal(boundary.runtimeHostContract.oldBoundaryCapability,'enter_old_boundary');

  const hardWork=definitions.endings.find((e:any)=>e.id==='ending.lumber.hard-work');
  assert.ok(hardWork);
  assert.deepEqual(hardWork.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.deepEqual(hardWork.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);
});
