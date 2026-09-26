import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const fixture=JSON.parse(readFileSync('content/lumber-forest-capability-options.fixture.json','utf8'));
const itemDoc=readFileSync('../../../docs/INITIAL_ITEM_CATALOG_v0.md','utf8');
const forestDoc=readFileSync('../../../docs/FOREST_ACTIVITY_SLICE_v0.md','utf8');
const engine=readFileSync('../src/core/engine.ts','utf8');
const definitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));

test('capability option contract covers the four authoritative Forest capabilities exactly once',()=>{
  assert.deepEqual(fixture.options.map((o:any)=>o.requiredCapability),[
    'enter_old_boundary','cross_rough_route','preserve_specimen','cut_heavy_wood'
  ]);
  assert.equal(new Set(fixture.options.map((o:any)=>o.requiredCapability)).size,4);
  for(const capability of fixture.options.map((o:any)=>o.requiredCapability)){
    assert.ok(itemDoc.includes(`\`${capability}\``),capability);
    assert.ok(forestDoc.includes(`\`${capability}\``),capability);
  }
});

test('only authoritative route/challenge bindings are fixed and unresolved route bindings stay OPEN',()=>{
  const oldBoundary=fixture.options.find((o:any)=>o.requiredCapability==='enter_old_boundary');
  assert.equal(oldBoundary.routeContext,'old boundary path');
  assert.equal(oldBoundary.challengeFamily,'route choice / navigation');
  assert.equal(oldBoundary.routeBindingStatus,'LOCKED');

  const rope=fixture.options.find((o:any)=>o.requiredCapability==='cross_rough_route');
  assert.equal(rope.routeContext,null);
  assert.equal(rope.challengeFamily,'physical obstacle');
  assert.equal(rope.routeBindingStatus,'OPEN');

  const preservation=fixture.options.find((o:any)=>o.requiredCapability==='preserve_specimen');
  assert.equal(preservation.routeContext,null);
  assert.equal(preservation.routeBindingStatus,'OPEN');

  const axe=fixture.options.find((o:any)=>o.requiredCapability==='cut_heavy_wood');
  assert.equal(axe.routeContext,'logging road');
  assert.equal(axe.challengeFamily,'physical obstacle');
});

test('consume/retain policy and production option IDs remain OPEN',()=>{
  for(const option of fixture.options){
    assert.equal(option.productionOptionId,null,option.fixtureOptionKey);
    assert.equal(option.consumePolicy,'OPEN',option.fixtureOptionKey);
  }
});

test('every capability changes available action-space rather than only a number',()=>{
  for(const option of fixture.options){
    assert.equal(option.actionSpaceEffect.numericOnlyAllowed,false,option.fixtureOptionKey);
    assert.notEqual(option.actionSpaceEffect.before,option.actionSpaceEffect.after,option.fixtureOptionKey);
    assert.equal(option.saveReloadIdentity.availabilitySource,'authoritative capability state');
    assert.equal(option.saveReloadIdentity.optionKeyStable,true);
  }
});

test('contract records current runtime limitation without patching shared Activity command surface',()=>{
  assert.deepEqual(fixture.runtimeBoundary.currentActivityCommands,['advance','escape']);
  assert.equal(fixture.runtimeBoundary.sharedRuntimePatchIncluded,false);
  assert.equal(fixture.runtimeBoundary.futureCapabilityAwareOptionSurfaceRequired,true);
  assert.ok(engine.includes("{type:'activityAction';id:'advance'|'escape'}"));
});

test('Forest capabilities never become Hard Work prerequisites',()=>{
  const hardWork=definitions.endings.find((e:any)=>e.id==='ending.lumber.hard-work');
  assert.deepEqual(hardWork.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.deepEqual(hardWork.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);
  assert.equal(fixture.hardWorkIsolation.anyCapabilityPrerequisiteAllowed,false);
});
