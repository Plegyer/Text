import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {SCHOOL_COURSES,schoolNightStudyChoices} from '../src/core/school.ts';

const inventory=JSON.parse(readFileSync('content/school-hunter-v15-live-inventory.fixture.json','utf8'));
const prep=JSON.parse(readFileSync('content/school-hunter-preparation-v1.fixture.json','utf8'));
const reactive=JSON.parse(readFileSync('content/school-tavern-hunter-reactive-depth-v1.fixture.json','utf8'));
const teachers=JSON.parse(readFileSync('content/packs/school-teachers-v1.json','utf8'));

test('C5-157 Hunter preparation is fixture-only while curriculum and teacher identities are live',()=>{
  assert.equal(inventory.productionAudit.currentHunterSchoolPack,'content/packs/hunter-school.json');
  assert.equal(prep.status,'CONTENT_PREP_ONLY');
  assert.equal(reactive.status,'CONTENT_PREP_ONLY');
  assert.equal(inventory.productionAudit.preparationStatus,'CONTENT_PREP_ONLY');
  assert.equal(inventory.productionAudit.reactiveStatus,'CONTENT_PREP_ONLY');
});

test('C5-157 exact four Hunter-facing live School tracks and courses are current',()=>{
  assert.deepEqual(inventory.hooks.map((x:any)=>[x.role,x.courseId,x.trackId]),[
    ['navigation_preparation','school.course.field_craft','school.track.field_craft'],
    ['magical_target_analysis','school.course.arcana','school.track.arcana'],
    ['contracts_maps_records','school.course.literacy_and_numbers','school.track.literacy_and_numbers'],
    ['safe_movement_endurance','school.course.physical_training','school.track.physical_training']
  ]);
  for(const hook of inventory.hooks){
    const course=SCHOOL_COURSES.find(x=>x.id===hook.courseId);
    assert.ok(course,hook.courseId);
    assert.equal(course.trackId,hook.trackId);
  }
});

test('C5-157/C5-164 existing Hunter-facing teachers and media are reused',()=>{
  for(const hook of inventory.hooks)assert.ok(teachers.media.some((x:any)=>x.id===hook.teacherMediaId),hook.teacherMediaId);
  assert.deepEqual(inventory.hooks.map((x:any)=>x.teacherContentId),[
    'school.teacher.rowan-pike','school.teacher.ilyra-venn','school.teacher.mara-fen','school.teacher.tovan-kest'
  ]);
});

test('C5-157/C5-163 every recorded Hunter Night-study choice is an existing typed School choice',()=>{
  const live=new Set(schoolNightStudyChoices().map(x=>x.id));
  for(const hook of inventory.hooks){
    assert.ok(hook.nightChoiceIds.length>=2,hook.role);
    for(const id of hook.nightChoiceIds)assert.ok(live.has(id),id);
  }
});

test('C5-157/C5-167 C1D-133 keeps all numeric thresholds null while C1D-139 authorizes only Field Craft event identity',()=>{
  assert.equal(inventory.status,'FROZEN_HUNTER_RUNTIME_FIELD_CRAFT_LIVE_OTHER_HOOKS_BLOCKED');
  assert.equal(inventory.runtimeContract.head,'8af661de2ce6d73e4db0f61fe4206d3334822998');
  assert.equal(inventory.runtimeContract.blob,'160a7000cf49e86c638e9cfdf3c80f268e7c0c12');
  assert.equal(inventory.liveConsumerAuthority.task,'C1D-139/C1D-144');
  assert.equal(inventory.liveConsumerAuthority.packBlob,'4e5ed1f9fcf6705845f8326a0d6ac331047ae763');
  assert.equal(inventory.localHookPolicy.threshold,null);
  assert.equal(inventory.localHookPolicy.thresholdAuthority,'FROZEN_CONTRACT_EXPLICITLY_NULL');
  assert.equal(inventory.localHookPolicy.nightParityThreshold,null);
  assert.equal(inventory.localHookPolicy.nightParityAuthority,'BLOCKED_NO_AUTHORIZED_NIGHT_PATH');
  assert.equal(inventory.localHookPolicy.careerFactIds,'C1D_133_BOUND');
  assert.deepEqual(inventory.localHookPolicy.gameplayEventIds,{
    fieldCraft:'hunter.school.field-craft',arcana:null,literacy:null,physicalTraining:null
  });
  assert.deepEqual(inventory.hooks.map((x:any)=>[x.role,x.careerFact,x.reactionEvent,x.threshold,x.nightParityStatus]),[
    ['navigation_preparation','school-field-craft-ready','hunter.school.field-craft',null,'BLOCKED_NIGHT_STUDY_DOES_NOT_PRODUCE_FIELD_NOTES'],
    ['magical_target_analysis','school-arcana-ready','BLOCKED_NOT_PUBLISHED_BY_FROZEN_HUNTER_RUNTIME',null,'BLOCKED_NO_AUTHORIZED_CONSUMER'],
    ['contracts_maps_records','school-literacy-ready','BLOCKED_NOT_PUBLISHED_BY_FROZEN_HUNTER_RUNTIME',null,'BLOCKED_NO_AUTHORIZED_CONSUMER'],
    ['safe_movement_endurance','school-physical-ready','BLOCKED_NOT_PUBLISHED_BY_FROZEN_HUNTER_RUNTIME',null,'BLOCKED_NO_AUTHORIZED_CONSUMER']
  ]);
  const field=inventory.hooks[0];
  assert.deepEqual(field.authorizedCondition,{kind:'worldFact',fact:'forest.school-field-notes',present:true});
  assert.equal(field.authorizedProducer.action,'forest.collect-field-kit');
  assert.equal(field.authorizedProducer.energyCost,0);
  assert.equal(inventory.missingCurriculumDecision.action,'DO_NOT_CREATE_NEW_CURRICULUM');
});
