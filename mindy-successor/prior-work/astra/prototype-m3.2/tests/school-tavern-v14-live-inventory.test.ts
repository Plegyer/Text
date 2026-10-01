import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {SCHOOL_COURSES} from '../src/core/school.ts';

const inventory=JSON.parse(readFileSync('content/school-tavern-v14-live-inventory.fixture.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const teachers=JSON.parse(readFileSync('content/packs/school-teachers-v1.json','utf8'));

test('C5-145 pre-contract inventory binds the four Lead-approved Tavern hooks to current live School tracks',()=>{
  assert.equal(inventory.careerId,'tavern');
  assert.equal(inventory.actionId,'tavern.shift');
  assert.deepEqual(inventory.hooks.map((x:any)=>[x.role,x.courseId,x.trackId,x.reactionEvent,x.careerFact]),[
    ['innkeeper_records','school.course.literacy_and_numbers','school.track.literacy_and_numbers','tavern.school.records','school-records-ready'],
    ['broker_conflict','school.course.rhetoric_and_social','school.track.rhetoric_and_social','tavern.school.broker','school-broker-ready'],
    ['high_status_guest','school.course.etiquette_and_presentation','school.track.etiquette_and_presentation','tavern.school.etiquette','school-etiquette-ready'],
    ['strange_rumour_guest_interpretation','school.course.arcana','school.track.arcana','tavern.school.arcana','school-arcana-ready']
  ]);
  for(const hook of inventory.hooks){
    const course=SCHOOL_COURSES.find(x=>x.id===hook.courseId);
    assert.ok(course,hook.courseId);
    assert.equal(course.trackId,hook.trackId);
  }
});

test('C5-152 inventory reuses the existing four School teachers and media identities',()=>{
  for(const hook of inventory.hooks){
    assert.ok(teachers.media.some((x:any)=>x.id===hook.teacherMediaId),hook.teacherMediaId);
  }
  assert.ok(localization['school.course.literacy_and_numbers.description'].en.includes('Mara Fen'));
  assert.ok(localization['school.course.rhetoric_and_social.description'].en.includes('Cassian Reed'));
  assert.ok(localization['school.course.etiquette_and_presentation.description'].en.includes('Eliane Marrow'));
  assert.ok(localization['school.course.arcana.description'].en.includes('Ilyra Venn'));
});

test('C5-145/C5-155 C1D-121 binding keeps the approved three-lesson thresholds Tavern-local',()=>{
  assert.equal(inventory.localHookPolicy.counter,'lessons_completed');
  assert.equal(inventory.localHookPolicy.threshold,3);
  assert.equal(inventory.localHookPolicy.scope,'tavern-only');
  assert.equal(inventory.localHookPolicy.globalCertificateRule,false);
  assert.equal(inventory.localHookPolicy.globalProjectRule,false);
  assert.equal(inventory.status,'CONTRACT_BOUND_PRE_RUNTIME');
  assert.equal(inventory.runtimeContract.head,'7bf2531f208c8b3faf5f83c16064885b6295167b');
  assert.equal(inventory.runtimeContract.blob,'48120605195463dddbc34205b2246fa4b7276907');
});
