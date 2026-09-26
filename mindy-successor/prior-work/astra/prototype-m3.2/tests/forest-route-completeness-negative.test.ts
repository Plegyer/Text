import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const sentinel=JSON.parse(readFileSync('content/forest-route-completeness-negative.fixture.json','utf8'));
const production=JSON.parse(readFileSync('content/definitions.json','utf8'));
const target=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));

function localForest(){
  return production.activities?.find((a:any)=>a.id==='lumber.forest');
}

test('negative fixture explicitly keeps full PA16 false on the merged PR24 baseline',()=>{
  assert.equal(sentinel.productionBaseline.pr24Merge,'9aa0eaf964735e82b9b964bbdcaf5362c292868a');
  assert.equal(sentinel.productionBaseline.expectedFullPA16,false);
  assert.equal(sentinel.verdict.fullPA16,false);
});

test('required Forest completeness dimensions are enumerated without inventing replacements',()=>{
  assert.deepEqual(sentinel.requiredRoutes.map((r:any)=>r.id),[
    'logging-road','hunter-trail','old-boundary'
  ]);
  assert.deepEqual(sentinel.requiredChallengeFamilies.map((r:any)=>r.id),[
    'navigation','physical-obstacle','interpretation-ritual-anomaly'
  ]);
  assert.equal(sentinel.seasonalTopology.required,true);
  assert.equal(sentinel.requiredRoutes.find((r:any)=>r.id==='hunter-trail').statusOnMergedMain,'MISSING');
  assert.ok(sentinel.requiredChallengeFamilies.every((r:any)=>r.statusOnMergedMain==='MISSING'));
  assert.equal(sentinel.seasonalTopology.statusOnMergedMain,'MISSING');
});

test('when PR22+ route options are present locally, production still fails full PA16 completeness exactly at authored depth gaps',()=>{
  const forest=localForest();
  if(!forest?.options?.some((o:any)=>o.id==='forest.route.logging-road')){
    assert.equal(sentinel.verdict.fullPA16,false);
    return;
  }

  const routeStates=new Set(
    forest.options
      .filter((o:any)=>o.category==='route')
      .map((o:any)=>o.setRoute)
      .filter(Boolean)
  );
  assert.equal(routeStates.has('logging-road'),true);
  assert.equal(routeStates.has('old-boundary'),true);
  assert.equal(routeStates.has('hunter-trail'),false);

  const encoded=JSON.stringify(forest);
  assert.equal(encoded.includes('forest.challenge.navigation'),false);
  assert.equal(encoded.includes('forest.challenge.physical-obstacle'),false);
  assert.equal(encoded.includes('forest.challenge.interpretation-ritual-anomaly'),false);
  assert.equal(encoded.includes('calendarSeason'),false);
});

test('negative sentinel preserves already shipped Forest route/result semantics',()=>{
  assert.equal(sentinel.lockedExistingContracts.activityId,'lumber.forest');
  assert.equal(sentinel.lockedExistingContracts.loggingRouteOptionId,'forest.route.logging-road');
  assert.equal(sentinel.lockedExistingContracts.oldBoundaryRouteOptionId,'forest.route.old-boundary');
  assert.equal(sentinel.lockedExistingContracts.oldBoundaryCapability,'enter_old_boundary');
  assert.deepEqual(sentinel.lockedExistingContracts.results,[
    'lumber.forest.success','lumber.forest.escape','lumber.forest.failure'
  ]);
  assert.equal(sentinel.lockedExistingContracts.a5,'activityResult');
});

test('Forest completeness gaps cannot leak into Hard Work eligibility',()=>{
  const hardWork=target.endings.find((e:any)=>e.id==='ending.lumber.hard-work');
  assert.deepEqual(hardWork.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.deepEqual(hardWork.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);
  assert.equal(sentinel.hardWorkIsolation.forestCompletenessPrerequisiteAllowed,false);
});
