import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {SCHOOL_COURSES,SCHOOL_COURSE_IDS} from '../src/core/school.ts';

const ui=JSON.parse(
  readFileSync('content/school-production-ui.fixture.json','utf8')
);
const compat=JSON.parse(
  readFileSync('content/school-typed-state-compat.fixture.json','utf8')
);
const gapDoc=readFileSync(
  '../../../docs/school-prep/SCHOOL_PRESENTATION_DEPTH_GAP_v1.md',
  'utf8'
);
const schoolSource=readFileSync('src/core/school.ts','utf8');

test('current product surface has all eight tracks and stable semantic lesson presentation IDs',()=>{
  assert.equal(SCHOOL_COURSES.length,8);
  assert.deepEqual(
    SCHOOL_COURSES.map(course=>course.id),
    [...SCHOOL_COURSE_IDS]
  );
  assert.equal(ui.courses.length,8);

  for(const course of SCHOOL_COURSES){
    const row=ui.courses.find((item:any)=>item.courseId===course.id);
    assert.ok(row,course.id);
    assert.equal(row.presentationId,course.presentationId);
    assert.match(
      row.presentationId,
      /^school\/[a-z0-9]+(?:-[a-z0-9]+)*\/lesson\/default$/
    );
    assert.ok(compat.defaultSchoolProgression.tracks[course.trackId]);
  }
});

test('current School course/catalog contract does not fabricate teacher identity',()=>{
  const serialized=JSON.stringify(ui).toLowerCase();
  assert.equal(serialized.includes('teacher'),false);
  assert.equal(/teacher(Id|Name)?\s*[:?]/i.test(schoolSource),false);
  assert.match(gapDoc,/Teacher \| CONTENT-DEPTH GAP/);
});

test('progress contract is present without inventing milestone or certificate thresholds',()=>{
  for(const course of SCHOOL_COURSES){
    const track=compat.defaultSchoolProgression.tracks[course.trackId];
    assert.deepEqual(track.counters,{
      lessons_completed:0,
      night_study_sessions:0,
      projects_completed:0,
      exam_attempts:0
    });
    assert.deepEqual(track.milestones,[]);
    assert.deepEqual(track.certificates,[]);
  }

  assert.match(
    gapDoc,
    /paid lesson -> `lessons_completed \+1`/
  );
  assert.match(
    gapDoc,
    /Night study -> `night_study_sessions \+1`/
  );
  assert.match(gapDoc,/Still OPEN:/);
});

test('gap document distinguishes semantic presentation identity from authored presentation depth',()=>{
  assert.match(
    gapDoc,
    /Presentation identity \| SHIPPED CONTRACT/
  );
  assert.match(
    gapDoc,
    /Presentation depth \| CONTENT-DEPTH GAP/
  );
  assert.match(
    gapDoc,
    /No teacher identity, milestone threshold, certificate, or public fact ID is chosen/
  );
});
