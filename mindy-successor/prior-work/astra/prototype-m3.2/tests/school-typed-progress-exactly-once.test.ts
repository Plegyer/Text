import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {
  SCHOOL_COURSES,
  SCHOOL_COURSE_IDS,
  schoolNightStudyChoices
} from '../src/core/school.ts';

const fixture=JSON.parse(
  readFileSync('content/school-typed-progress-exactly-once.fixture.json','utf8')
);

function reload<T>(value:T):T{
  return JSON.parse(JSON.stringify(value)) as T;
}

test('exactly-once matrix covers all eight courses and stable tracks exactly once',()=>{
  assert.equal(fixture.entries.length,8);
  assert.deepEqual(
    fixture.entries.map((entry:any)=>entry.courseId),
    [...SCHOOL_COURSE_IDS]
  );
  assert.equal(
    new Set(fixture.entries.map((entry:any)=>entry.courseId)).size,
    8
  );
  assert.deepEqual(
    fixture.entries.map((entry:any)=>({
      courseId:entry.courseId,
      trackId:entry.trackId
    })),
    SCHOOL_COURSES.map(course=>({
      courseId:course.id,
      trackId:course.trackId
    }))
  );
});

test('paid lesson increments only lessons_completed and reload never duplicates it',()=>{
  for(const entry of fixture.entries){
    let progress={lessons_completed:0,night_study_sessions:0};
    progress={
      lessons_completed:
        progress.lessons_completed+entry.paidLessonDelta.lessons_completed,
      night_study_sessions:
        progress.night_study_sessions+entry.paidLessonDelta.night_study_sessions
    };

    assert.deepEqual(progress,{
      lessons_completed:1,
      night_study_sessions:0
    },entry.courseId);

    const reload1=reload(progress);
    const reload2=reload(reload1);

    assert.deepEqual(reload1,progress,entry.courseId);
    assert.deepEqual(reload2,progress,entry.courseId);
    assert.equal(entry.reloadExpectation.duplicatePaidLessonDelta,false);
  }
});

test('representative Night study increments only night_study_sessions and reload never duplicates it',()=>{
  const generatedIds=new Set(
    schoolNightStudyChoices().map(choice=>choice.id)
  );

  for(const entry of fixture.entries){
    assert.ok(
      generatedIds.has(entry.representativeNightChoiceId),
      entry.representativeNightChoiceId
    );

    let progress={lessons_completed:0,night_study_sessions:0};
    progress={
      lessons_completed:
        progress.lessons_completed+entry.nightStudyDelta.lessons_completed,
      night_study_sessions:
        progress.night_study_sessions+entry.nightStudyDelta.night_study_sessions
    };

    assert.deepEqual(progress,{
      lessons_completed:0,
      night_study_sessions:1
    },entry.courseId);

    const reload1=reload(progress);
    const reload2=reload(reload1);

    assert.deepEqual(reload1,progress,entry.courseId);
    assert.deepEqual(reload2,progress,entry.courseId);
    assert.equal(entry.reloadExpectation.duplicateNightStudyDelta,false);
  }
});

test('paid and Night typed counter deltas are mutually exclusive for every course',()=>{
  for(const entry of fixture.entries){
    assert.deepEqual(entry.paidLessonDelta,{
      lessons_completed:1,
      night_study_sessions:0
    },entry.courseId);
    assert.deepEqual(entry.nightStudyDelta,{
      lessons_completed:0,
      night_study_sessions:1
    },entry.courseId);
  }
});
