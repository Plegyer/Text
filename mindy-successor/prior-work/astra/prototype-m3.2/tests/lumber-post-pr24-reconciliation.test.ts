import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

const reconciliation=readFileSync('../../../docs/lumber-prep/LUMBER_POST_PR24_RECONCILIATION_v1.md','utf8');
const definitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));
const crossPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-cross-system.pack.json','utf8'));

test('post-PR24 reconciliation locks the real base.school -> listen boundary',()=>{
  assert.ok(reconciliation.includes('base.school'));
  assert.ok(reconciliation.includes('choice `listen`'));
  assert.ok(reconciliation.includes('does not charge tuition/Energy again'));
  assert.ok(reconciliation.includes('School progress is not duplicated'));
  const mergedPath='tests/release-candidate-shipped-e2e.test.ts';
  if(existsSync(mergedPath)){
    const source=readFileSync(mergedPath,'utf8');
    assert.ok(source.includes("eventId,'base.school'"));
    assert.ok(source.includes("{type:'choice',id:'listen'}"));
    assert.ok(source.includes('schoolMoneyCommitted'));
    assert.ok(source.includes('schoolEnergyCommitted'));
    assert.ok(source.includes('schoolLessonsCommitted'));
  }
});

test('logging-road remains natural shipped Forest route and token authoring is not falsely closed',()=>{
  assert.ok(reconciliation.includes('forest.route.logging-road'));
  assert.ok(reconciliation.includes('does not expose:'));
  assert.ok(reconciliation.includes('forest.route.old-boundary'));
  assert.ok(reconciliation.includes('Old Boundary Token acquisition/use remains a Product decision'));
});

test('49 is accelerator only, 49 is not eligible, and the 50th shift is real',()=>{
  assert.ok(reconciliation.includes('completed_shifts = 49'));
  assert.ok(reconciliation.includes('Hard Work is **not** eligible'));
  assert.ok(reconciliation.includes('real 50th shift'));
  const mergedPath='tests/release-candidate-shipped-e2e.test.ts';
  if(existsSync(mergedPath)){
    const source=readFileSync(mergedPath,'utf8');
    assert.ok(source.includes('counters.completed_shifts=49'));
    assert.ok(source.includes("eligible.includes('ending.lumber.hard-work'),false"));
    assert.ok(source.includes("{type:'action',id:'lumber.shift'}"));
    assert.ok(source.includes('counters.completed_shifts,50'));
  }
});

test('Forest return remains exact activityResult continuation',()=>{
  const event=crossPack.events.find((e:any)=>e.id==='lumber-cross.activity-forest-return');
  assert.ok(event);
  assert.deepEqual(event.reactionTriggers,[
    {kind:'activityResult',activity:'lumber.forest',outcome:'success',result:'lumber.forest.success'}
  ]);
  assert.ok(reconciliation.includes('activityResult(lumber.forest, success, lumber.forest.success)'));
});

test('Hard Work condition and reward remain exact after PR24',()=>{
  const hardWork=definitions.endings.find((e:any)=>e.id==='ending.lumber.hard-work');
  assert.ok(hardWork);
  assert.deepEqual(hardWork.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.deepEqual(hardWork.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);
});

test('reconciliation leaves School/token/Forest-depth authoring OPEN',()=>{
  for(const phrase of [
    'Old Boundary Token acquisition source/timing/use/retain-consume decisions',
    'School management/accounting public-result provider/threshold',
    'Hunter-trail authored gate',
    'three challenge-family content depth',
    'season-driven Forest topology/options'
  ])assert.ok(reconciliation.includes(phrase),phrase);
});
