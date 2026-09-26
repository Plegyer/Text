import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {
  SCHOOL_COURSES,
  SCHOOL_COURSE_IDS,
  schoolNightStudyChoice,
  schoolNightStudyChoices
} from '../src/core/school.ts';
import type {Stat} from '../src/core/schema.ts';

const fixture=JSON.parse(
  readFileSync('content/school-night-presentation.fixture.json','utf8')
);

function slug(courseId:string){
  return courseId.slice('school.course.'.length).replaceAll('_','-');
}

test('Night presentation matrix covers every generated choice exactly once',()=>{
  const generated=schoolNightStudyChoices();
  assert.equal(fixture.entries.length,24);
  assert.equal(new Set(fixture.entries.map((entry:any)=>entry.choiceId)).size,24);
  assert.deepEqual(
    fixture.entries.map((entry:any)=>entry.choiceId),
    generated.map(choice=>choice.id)
  );
});

test('every Night choice maps deterministically to course, track, supported stat, and generated label',()=>{
  for(const entry of fixture.entries){
    const course=SCHOOL_COURSES.find(item=>item.id===entry.courseId);
    assert.ok(course,entry.choiceId);
    assert.equal(entry.trackId,course.trackId,entry.choiceId);
    assert.ok(
      course.statEffects.some(effect=>effect.stat===entry.stat),
      entry.choiceId
    );

    const choice=schoolNightStudyChoice(
      course.id,
      entry.stat as Stat
    );
    assert.equal(entry.choiceId,choice.id);
    assert.equal(entry.label,choice.label);
  }
});

test('Night presentation IDs are stable semantic kebab-case families',()=>{
  for(const entry of fixture.entries){
    assert.equal(
      entry.presentationId,
      `school/night-study/${slug(entry.courseId)}/default`,
      entry.choiceId
    );
    const segments=entry.presentationId.split('/');
    assert.deepEqual(
      [segments[0],segments[1],segments[3]],
      ['school','night-study','default'],
      entry.choiceId
    );
    assert.equal(segments.length,4,entry.choiceId);
    assert.match(segments[2],/^[a-z0-9]+(?:-[a-z0-9]+)*$/,entry.choiceId);
    assert.equal(
      segments.some((segment:string)=>segment.includes('_')),
      false,
      entry.choiceId
    );
  }
});

test('Night presentation mapping never changes gameplay course IDs',()=>{
  assert.deepEqual(
    [...new Set(fixture.entries.map((entry:any)=>entry.courseId))],
    [...SCHOOL_COURSE_IDS]
  );
  for(const entry of fixture.entries){
    assert.match(entry.courseId,/^school\.course\.[a-z_]+$/);
  }
});
