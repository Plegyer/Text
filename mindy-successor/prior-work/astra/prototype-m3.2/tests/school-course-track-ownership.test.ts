import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {
  SCHOOL_COURSES,
  SCHOOL_COURSE_IDS
} from '../src/core/school.ts';

const fixture=JSON.parse(
  readFileSync('content/school-course-track-ownership.fixture.json','utf8')
);

type Counters={
  lessons_completed:number;
  night_study_sessions:number;
};

function blankTrackState(){
  return Object.fromEntries(
    SCHOOL_COURSES.map(course=>[
      course.trackId,
      {lessons_completed:0,night_study_sessions:0}
    ])
  ) as Record<string,Counters>;
}

function applyOwnTrackDelta(
  state:Record<string,Counters>,
  trackId:string,
  counter:keyof Counters
){
  const out=structuredClone(state);
  out[trackId]={
    ...out[trackId],
    [counter]:out[trackId][counter]+1
  };
  return out;
}

test('all eight gameplay course IDs have exactly one stable track mapping',()=>{
  assert.equal(fixture.courses.length,8);
  assert.deepEqual(
    fixture.courses.map((entry:any)=>entry.courseId),
    [...SCHOOL_COURSE_IDS]
  );
  assert.equal(
    new Set(fixture.courses.map((entry:any)=>entry.courseId)).size,
    8
  );
  assert.equal(
    new Set(fixture.courses.map((entry:any)=>entry.trackId)).size,
    8
  );

  for(const source of SCHOOL_COURSES){
    const matches=fixture.courses.filter(
      (entry:any)=>entry.courseId===source.id
    );
    assert.equal(matches.length,1,source.id);
    assert.equal(matches[0].trackId,source.trackId,source.id);
  }
});

test('paid lesson increments only its own track lessons_completed',()=>{
  for(const entry of fixture.courses){
    const before=blankTrackState();
    const after=applyOwnTrackDelta(
      before,
      entry.trackId,
      'lessons_completed'
    );

    for(const [trackId,counters] of Object.entries(after)){
      if(trackId===entry.trackId){
        assert.deepEqual(counters,{
          lessons_completed:1,
          night_study_sessions:0
        },entry.courseId);
      }else{
        assert.deepEqual(counters,{
          lessons_completed:0,
          night_study_sessions:0
        },`${entry.courseId} leaked into ${trackId}`);
      }
    }
  }
});

test('Night study increments only its own track night_study_sessions',()=>{
  for(const entry of fixture.courses){
    const before=blankTrackState();
    const after=applyOwnTrackDelta(
      before,
      entry.trackId,
      'night_study_sessions'
    );

    for(const [trackId,counters] of Object.entries(after)){
      if(trackId===entry.trackId){
        assert.deepEqual(counters,{
          lessons_completed:0,
          night_study_sessions:1
        },entry.courseId);
      }else{
        assert.deepEqual(counters,{
          lessons_completed:0,
          night_study_sessions:0
        },`${entry.courseId} leaked into ${trackId}`);
      }
    }
  }
});

test('gameplay IDs and semantic paid presentation IDs remain stable',()=>{
  for(const source of SCHOOL_COURSES){
    const entry=fixture.courses.find(
      (item:any)=>item.courseId===source.id
    );
    assert.ok(entry,source.id);
    assert.equal(entry.courseId,source.id);
    assert.equal(entry.trackId,source.trackId);
    assert.equal(entry.presentationId,source.presentationId);
    assert.match(entry.courseId,/^school\.course\.[a-z_]+$/);
    assert.match(
      entry.presentationId,
      /^school\/[a-z0-9]+(?:-[a-z0-9]+)*\/lesson\/default$/
    );
  }
});

test('supported Night stat ownership matches each course package without adding cross-track stats',()=>{
  for(const source of SCHOOL_COURSES){
    const entry=fixture.courses.find(
      (item:any)=>item.courseId===source.id
    );
    assert.ok(entry,source.id);
    assert.deepEqual(
      entry.supportedNightStats,
      source.statEffects.map(effect=>effect.stat),
      source.id
    );
    assert.deepEqual(entry.paidLessonDelta,{
      counter:'lessons_completed',
      delta:1
    });
    assert.deepEqual(entry.nightStudyDelta,{
      counter:'night_study_sessions',
      delta:1
    });
  }
});
