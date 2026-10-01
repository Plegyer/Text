import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {SCHOOL_COURSES} from '../src/core/school.ts';

const map=JSON.parse(readFileSync('content/school-undead-v13-track-map.fixture.json','utf8'));

test('C5-133 binds only the published Undead Farm School identities',()=>{
  assert.equal(map.careerId,'undead-farm');
  assert.deepEqual(map.hooks,[
    {
      courseId:'school.course.arcana',
      trackId:'school.track.arcana',
      careerFact:'school-research-ready',
      reactionEvent:'undead-farm.school.arcana-research',
      role:'research'
    },
    {
      courseId:'school.course.literacy_and_numbers',
      trackId:'school.track.literacy_and_numbers',
      careerFact:'school-management-ready',
      reactionEvent:'undead-farm.school.management-records',
      role:'management_records'
    }
  ]);
  for(const hook of map.hooks){
    const live=SCHOOL_COURSES.find(course=>course.id===hook.courseId);
    assert.ok(live,hook.courseId);
    assert.equal(live.trackId,hook.trackId);
  }
});

test('C5-133 keeps both thresholds career-local at exactly three completed lessons',()=>{
  assert.equal(map.localHookPolicy.counter,'lessons_completed');
  assert.equal(map.localHookPolicy.threshold,3);
  assert.equal(map.localHookPolicy.scope,'undead-farm-only');
  assert.equal(map.localHookPolicy.globalCertificateRule,false);
  assert.equal(map.localHookPolicy.globalProjectRule,false);
  assert.equal(map.localHookPolicy.nightParityCounter,'night_study_sessions');
  assert.equal(map.localHookPolicy.nightParityThreshold,3);
  assert.equal(map.localHookPolicy.nightParityScope,'undead-farm-only');
  assert.equal(map.localHookPolicy.nightStudyChangesGlobalCertificateRule,false);
  assert.equal(map.localHookPolicy.nightStudyChangesGlobalProjectRule,false);
});
