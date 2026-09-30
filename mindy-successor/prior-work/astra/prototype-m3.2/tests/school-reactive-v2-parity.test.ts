import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {SCHOOL_COURSE_IDS} from '../src/core/school.ts';

function read(path:string){return JSON.parse(readFileSync(path,'utf8'));}

const audit=read('content/school-reactive-consumer-capability-audit-v1.fixture.json');
const courseFixtures=[
  read('content/school-literacy-and-numbers-reactive-v2.fixture.json'),
  read('content/school-arcana-reactive-v2.fixture.json'),
  read('content/school-rhetoric-and-social-reactive-v2.fixture.json'),
  read('content/school-etiquette-and-presentation-reactive-v2.fixture.json'),
  read('content/school-field-craft-reactive-v2.fixture.json'),
  read('content/school-physical-training-reactive-v2.fixture.json'),
  read('content/school-arts-and-performance-reactive-v2.fixture.json'),
  read('content/school-body-confidence-reactive-v2.fixture.json')
];
const teacherMatrix=read('content/school-teacher-response-matrix-v2.fixture.json');
const localization=read('content/localization.json');

const expected=[
  ['school.course.literacy_and_numbers','school.track.literacy_and_numbers','school.teacher.mara-fen'],
  ['school.course.arcana','school.track.arcana','school.teacher.ilyra-venn'],
  ['school.course.rhetoric_and_social','school.track.rhetoric_and_social','school.teacher.cassian-reed'],
  ['school.course.etiquette_and_presentation','school.track.etiquette_and_presentation','school.teacher.eliane-marrow'],
  ['school.course.field_craft','school.track.field_craft','school.teacher.rowan-pike'],
  ['school.course.physical_training','school.track.physical_training','school.teacher.tovan-kest'],
  ['school.course.arts_and_performance','school.track.arts_and_performance','school.teacher.nessa-lark'],
  ['school.course.body_confidence','school.track.body_confidence','school.teacher.sera-vey']
];

function refs(value:any,out:string[]=[]):string[]{
  if(Array.isArray(value)){
    for(const item of value)refs(item,out);
    return out;
  }
  if(!value||typeof value!=='object')return out;
  for(const [key,item] of Object.entries(value)){
    if(key==='keys'&&item&&typeof item==='object'&&!Array.isArray(item)){
      for(const ref of Object.values(item))if(typeof ref==='string')out.push(ref);
    }else if(key!=='strings'){
      refs(item,out);
    }
  }
  return out;
}

test('C5-59 audit locks the safe direct seams and missing exact reactive seams',()=>{
  assert.equal(audit.paidLesson.invocation.exactCourseId,true);
  assert.equal(audit.paidLesson.returnValue.exactCourseId,true);
  assert.equal(audit.paidLesson.lastAction.actionId,'school');
  assert.equal(audit.paidLesson.lastAction.exactCourseId,false);
  assert.equal(audit.paidLesson.lastAction.exactPresentationId,true);
  assert.equal(audit.paidLesson.lastAction.safeForDirectPresentationSelection,true);
  assert.equal(audit.paidLesson.lastAction.safeForReactiveEventSelection,false);

  assert.equal(audit.paidLesson.reactionFacts.actionCompleted,'school');
  assert.equal(audit.paidLesson.reactionFacts.exactCourseId,false);
  assert.equal(audit.paidLesson.reactionFacts.exactTeacherId,false);
  assert.equal(audit.paidLesson.reactionFacts.safeForGenericAfterSchool,true);
  assert.equal(audit.paidLesson.reactionFacts.safeForExactCourseRouting,false);

  assert.equal(audit.nightStudy.exactChoiceIdentityAvailable,true);
  assert.equal(audit.nightStudy.safeForExactChoiceRouting,true);
  assert.equal(audit.teacherSurface.productionTeacherEvents,0);
  assert.equal(audit.teacherSurface.safeForTeacherReactiveRouting,false);
  assert.equal(audit.selectedRuntimeConsumerId,null);

  assert.equal(audit.constraints.changesRuntime,false);
  assert.equal(audit.constraints.addsReactionFact,false);
  assert.equal(audit.constraints.addsReactionTrigger,false);
  assert.equal(audit.constraints.createsTeacherState,false);
});

test('C5-59 eight v2 course fixtures bind exactly to current course track teacher identities',()=>{
  assert.deepEqual(
    courseFixtures.map((x:any)=>[x.sourceCourseId,x.sourceTrackId,x.teacherContentId]),
    expected
  );

  for(const fixture of courseFixtures){
    assert.equal(fixture.formatVersion,1,fixture.id);
    assert.equal(fixture.status,'CONTENT_PREP_ONLY',fixture.id);
    assert.ok((SCHOOL_COURSE_IDS as readonly string[]).includes(fixture.sourceCourseId),fixture.sourceCourseId);
    assert.equal(fixture.selectedRuntimeConsumerId,null,fixture.id);
    assert.equal(fixture.selectedThreshold,null,fixture.id);
    assert.equal(fixture.selectedPublicFactId,null,fixture.id);
    assert.deepEqual(
      fixture.variants.map((x:any)=>x.role),
      ['lesson_success','ordinary_repetition','teacher_feedback','transfer_context'],
      fixture.id
    );
    assert.deepEqual(fixture.mechanics.effects,[],fixture.id);
    assert.deepEqual(fixture.mechanics.careerWrites,[],fixture.id);
    assert.deepEqual(fixture.mechanics.publishesWorldFacts,[],fixture.id);
  }
});

test('C5-59 prepared v2 localization is complete stable unique and collision-free',()=>{
  const all=[...courseFixtures,teacherMatrix];
  const seen=new Set<string>();

  for(const fixture of all){
    const expectedRefs=[...new Set(refs(fixture))].sort();
    const actualKeys=Object.keys(fixture.strings).sort();
    assert.deepEqual(expectedRefs,actualKeys,fixture.id);

    for(const [key,pair] of Object.entries(fixture.strings) as Array<[string,{ru:string;en:string}]>){
      assert.match(key,/^school\.(reactive_v2|teacher_response_v2)\.[a-z0-9_.]+$/,key);
      assert.ok(pair.ru.trim().length>0,`${key}: RU`);
      assert.ok(pair.en.trim().length>0,`${key}: EN`);
      assert.equal(seen.has(key),false,`duplicate prepared key: ${key}`);
      assert.equal(localization.strings?.[key],undefined,`root localization collision: ${key}`);
      seen.add(key);
    }
  }

  assert.equal(seen.size,112);
});

test('C5-59 teacher response matrix covers all current teachers and exactly three contexts',()=>{
  assert.equal(teacherMatrix.formatVersion,1);
  assert.equal(teacherMatrix.status,'CONTENT_PREP_ONLY');
  assert.equal(teacherMatrix.selectedRuntimeConsumerId,null);
  assert.deepEqual(teacherMatrix.contexts,['lesson_success','ordinary_repetition','transfer_context']);
  assert.deepEqual(
    teacherMatrix.teachers.map((x:any)=>[x.sourceCourseId,x.sourceTrackId,x.teacherContentId]),
    expected
  );

  for(const teacher of teacherMatrix.teachers){
    assert.equal(teacher.selectedThreshold,null);
    assert.equal(teacher.selectedPublicFactId,null);
    assert.deepEqual(teacher.variants.map((x:any)=>x.role),teacherMatrix.contexts);
  }

  assert.deepEqual(teacherMatrix.mechanics.effects,[]);
  assert.deepEqual(teacherMatrix.mechanics.careerWrites,[]);
  assert.deepEqual(teacherMatrix.mechanics.relationshipWrites,[]);
  assert.deepEqual(teacherMatrix.mechanics.lustEffects,[]);
  assert.deepEqual(teacherMatrix.mechanics.publishesWorldFacts,[]);
});

test('C5-59 course-specific safety boundaries remain mechanics-neutral',()=>{
  const field=courseFixtures.find((x:any)=>x.sourceCourseId==='school.course.field_craft');
  const physical=courseFixtures.find((x:any)=>x.sourceCourseId==='school.course.physical_training');
  const arts=courseFixtures.find((x:any)=>x.sourceCourseId==='school.course.arts_and_performance');
  const body=courseFixtures.find((x:any)=>x.sourceCourseId==='school.course.body_confidence');

  assert.deepEqual(field.mechanics.activityWrites,[]);
  assert.deepEqual(field.mechanics.routeUnlocks,[]);

  assert.deepEqual(physical.mechanics.energyRuleChanges,[]);
  assert.deepEqual(physical.mechanics.statPackageChanges,[]);

  assert.deepEqual(arts.mechanics.festivalMechanicChanges,[]);
  assert.deepEqual(arts.mechanics.relationshipWrites,[]);

  assert.deepEqual(body.mechanics.lustEffects,[]);
  assert.deepEqual(body.mechanics.consentRuleChanges,[]);
  assert.deepEqual(body.mechanics.relationshipWrites,[]);
});
