import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const root=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const fixture=JSON.parse(
  readFileSync('content/forest-route-presentation-final-v5.fixture.json','utf8')
);

function collectKeys(value:any,out:string[]=[]):string[]{
  if(Array.isArray(value)){
    for(const item of value)collectKeys(item,out);
    return out;
  }
  if(value&&typeof value==='object'){
    for(const [key,item] of Object.entries(value)){
      out.push(key);
      collectKeys(item,out);
    }
  }
  return out;
}

test('post-PR49 route fixture references only current shipped Forest routes',()=>{
  const activity=definitions.activities.find((entry:any)=>entry.id==='lumber.forest');
  assert.ok(activity);

  const shipped=activity.options
    .filter((entry:any)=>entry.category==='route')
    .map((entry:any)=>entry.id);

  assert.deepEqual(shipped,[
    'forest.route.logging-road',
    'forest.route.old-boundary'
  ]);

  assert.deepEqual(
    fixture.routes.map((entry:any)=>entry.routeId),
    shipped
  );

  assert.deepEqual(
    fixture.routes.map((entry:any)=>entry.routeState),
    ['logging-road','old-boundary']
  );
});

test('all proposed localization keys are additive on exact current main',()=>{
  assert.equal(Object.keys(fixture.strings).length,16);

  for(const key of Object.keys(fixture.strings)){
    assert.equal(root[key],undefined,'unexpected root collision: '+key);
  }

  assert.deepEqual(
    fixture.collisionStatus.currentRootExactKeyCollisions,
    []
  );
});

test('route alt and caption keys follow normalized localization-key schema',()=>{
  const allowed=/^[a-z0-9._-]+$/;

  for(const route of fixture.routes){
    assert.match(route.altKey,allowed,route.altKey);
    assert.match(route.captionKey,allowed,route.captionKey);
    assert.equal(route.altKey.includes('/'),false,route.altKey);
    assert.equal(route.captionKey.includes('/'),false,route.captionKey);
    assert.match(
      route.presentationId,
      /^activity\/forest\/route\/(logging-road|old-boundary)$/
    );
  }
});

test('fixture keeps current route labels as references rather than replacements',()=>{
  for(const route of fixture.routes){
    const key=route.currentChoiceLabel.key;
    assert.deepEqual(route.currentChoiceLabel.value,root[key],key);
    assert.equal(fixture.strings[key],undefined,key);
  }
});

test('fixture contains presentation only and no gameplay fields',()=>{
  const seen=new Set(collectKeys(fixture));
  for(const forbidden of [
    'conditions','effects','reward','rewards','chance',
    'progressDelta','enduranceCost','setRoute',
    'reactionTriggers','moneyCost','nextDayEnergyDelta',
    'modifyResource','addItem','addWorldFact',
    'careerCounter','metaRewards'
  ]){
    assert.equal(seen.has(forbidden),false,forbidden);
  }
});

test('fixture introduces no Hunter token or challenge semantics',()=>{
  const raw=JSON.stringify(fixture).toLowerCase();

  for(const forbidden of [
    'forest.route.hunter',
    'hunter-trail',
    'token acquisition',
    'token price',
    'consume token',
    'turn-in',
    'challenge threshold',
    'challenge reward'
  ]){
    assert.equal(raw.includes(forbidden),false,forbidden);
  }

  assert.equal(fixture.invariants.changesOldBoundaryTokenSemantics,false);
  assert.equal(fixture.invariants.createsHunterRoute,false);
});

test('current old-boundary gameplay gate remains external and exact',()=>{
  const activity=definitions.activities.find((entry:any)=>entry.id==='lumber.forest');
  const oldBoundary=activity.options.find(
    (entry:any)=>entry.id==='forest.route.old-boundary'
  );

  assert.deepEqual(oldBoundary.conditions,[{
    kind:'itemCapability',
    capability:'enter_old_boundary',
    present:true
  }]);
});
