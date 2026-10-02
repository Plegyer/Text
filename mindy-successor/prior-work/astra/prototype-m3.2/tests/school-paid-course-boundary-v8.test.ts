import test from 'node:test';
import assert from 'node:assert/strict';

import {applyEffects,resolveReactions} from '../src/core/engine.ts';
import {executeSchoolLesson,getSchoolCourse} from '../src/core/school.ts';
import {catalog,started} from './helpers.ts';

function lesson(courseId:'school.course.literacy_and_numbers'|'school.course.arcana'){
  const start=started();
  start.run.resources.money=2_000;
  return executeSchoolLesson(start,courseId,catalog,{applyEffects,resolveReactions});
}

test('C1D-77 exact paid-course presentation stays separate from generic School reaction routing',()=>{
  const literacy=lesson('school.course.literacy_and_numbers');
  const arcana=lesson('school.course.arcana');

  assert.equal(literacy.course.id,'school.course.literacy_and_numbers');
  assert.equal(arcana.course.id,'school.course.arcana');
  assert.notEqual(literacy.course.presentationId,arcana.course.presentationId);
  assert.equal(literacy.state.run.lastAction?.presentationId,getSchoolCourse(literacy.course.id).presentationId);
  assert.equal(arcana.state.run.lastAction?.presentationId,getSchoolCourse(arcana.course.id).presentationId);

  for(const result of [literacy,arcana]){
    assert.ok(result.reactionFacts.some(fact=>fact.kind==='actionCompleted'&&fact.action==='school'));
    const serialized=JSON.stringify(result.reactionFacts);
    assert.equal(serialized.includes(result.course.id),false);
    assert.equal(/teacherContentId|school\.teacher\./.test(serialized),false);
    assert.equal(result.state.run.progression.worldFacts.includes('lumber.school.management-ready'),false);
  }

  assert.ok(literacy.reactionFacts.some(fact=>fact.kind==='statChanged'&&fact.stat==='reason'));
  assert.ok(arcana.reactionFacts.some(fact=>fact.kind==='statChanged'&&fact.stat==='reason'));
  assert.notEqual(literacy.course.id,arcana.course.id);
});
