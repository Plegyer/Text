import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {getSchoolCourse} from '../src/core/school.ts';

const review=readFileSync(
  '../../../docs/school-prep/SCHOOL_PR25_FINAL_GATE_REVIEW_v1.md',
  'utf8'
);
const compat=JSON.parse(
  readFileSync('content/school-blocking-scene-compat.fixture.json','utf8')
);
const authoring=JSON.parse(
  readFileSync('content/school-authoring-decision-ready.fixture.json','utf8')
);

test('PR25 keeps atomic Arcana mechanics',()=>{
  const arcana=getSchoolCourse('school.course.arcana');
  assert.equal(arcana.tuition,500);
  assert.equal(arcana.energyCost,1);
  assert.deepEqual(arcana.statEffects,[
    {stat:'magic',amount:4},
    {stat:'reason',amount:4},
    {stat:'creativity',amount:2}
  ]);
  assert.equal(review.includes('tuition 500 exactly once'),true);
  assert.equal(review.includes('current-day Energy minus 1 exactly once'),true);
});

test('PR25 keeps blocking scene and Night ordering',()=>{
  assert.deepEqual(compat.paidLesson.typedCounterDelta,{
    lessons_completed:1,
    night_study_sessions:0
  });
  assert.ok(compat.invariants.includes('nightflow-blocked-until-scene-resolved'));
  assert.equal(review.includes('base.school'),true);
  assert.equal(review.includes('NightFlow begins only after the scene is resolved'),true);
});

test('PR25 leaves public-result decisions open',()=>{
  assert.equal(authoring.constraints.finalManagementPublicFactId,null);
  assert.equal(authoring.constraints.finalArcanaForestPublicFactId,null);
  assert.equal(authoring.constraints.managementThreshold,null);
  assert.equal(authoring.constraints.arcanaForestThreshold,null);
});

test('PR25 review records QA-only scope',()=>{
  assert.equal(review.includes('does not modify production School runtime'),true);
  assert.equal(review.includes('or UI'),true);
});
