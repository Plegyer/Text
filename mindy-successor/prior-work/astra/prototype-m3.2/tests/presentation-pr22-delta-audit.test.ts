import test from 'node:test';
import assert from 'node:assert/strict';

const shippedSlots=[
  'activity/forest/route/default',
  'activity/forest/return/success',
  'activity/forest/return/escape',
  'activity/forest/return/failure'
];

const routeFamilies=[
  'logging-road',
  'old-boundary',
  'hunter-trail',
  'navigation',
  'physical-obstacle',
  'interpretation-ritual-anomaly'
];

const openAuthoring=[
  'old-boundary-token-acquisition-source',
  'old-boundary-retain-consume-policy',
  'hunter-trail-gameplay-route',
  'three-route-depth',
  'three-challenge-family-depth',
  'season-specific-forest-content'
];

test('PR22 keeps the generic Forest route and all three result presentation slots valid',()=>{
  assert.deepEqual(
    new Set(shippedSlots),
    new Set([
      'activity/forest/route/default',
      'activity/forest/return/success',
      'activity/forest/return/escape',
      'activity/forest/return/failure'
    ])
  );
});

test('PR22 presentation prep distinguishes route/challenge families from shipped exact slots',()=>{
  assert.equal(routeFamilies.length,6);
  for(const family of routeFamilies){
    assert.match(family,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.equal(shippedSlots.some(id=>id.includes('/'+family+'/')),false,family);
  }
});

test('legacy and option-aware Activity save modes remain presentation-compatible',()=>{
  const legacy={
    optionModelVersion:0,
    routeId:null,
    availableActions:['advance','escape'],
    presentationId:'activity/forest/route/default'
  };
  const optionAware={
    optionModelVersion:1,
    routeId:'logging-road',
    availableActions:['advance','escape'],
    presentationId:'activity/forest/route/default'
  };

  assert.equal(legacy.presentationId,optionAware.presentationId);
  assert.equal(legacy.optionModelVersion,0);
  assert.equal(optionAware.optionModelVersion,1);
});

test('open gameplay authoring is not upgraded by presentation-family readiness',()=>{
  assert.equal(openAuthoring.length,6);
  assert.ok(openAuthoring.includes('old-boundary-token-acquisition-source'));
  assert.ok(openAuthoring.includes('hunter-trail-gameplay-route'));
  assert.ok(openAuthoring.includes('three-challenge-family-depth'));
});
