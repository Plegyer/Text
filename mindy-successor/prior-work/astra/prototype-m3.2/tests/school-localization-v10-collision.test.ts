import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {SCHOOL_COURSE_IDS} from '../src/core/school.ts';

function read(path:string){return JSON.parse(readFileSync(path,'utf8'));}

const contract=read('content/school-localization-v10-fixture-collision-contract.fixture.json');
const parity=read('content/school-localization-parity-v10-audit.fixture.json');
const teacherAudit=read('content/school-teacher-milestone-text-audit-v10.fixture.json');
const night=read('content/school-night-study-text-preparation-v10.fixture.json');
const handoff=read('content/school-to-career-handoff-audit-v10.fixture.json');
const definitions=read('content/definitions.json');
const localization=read('content/localization.json');

test('C5-103 stable School course and teacher identities are unique',()=>{
  assert.deepEqual([...SCHOOL_COURSE_IDS],contract.expectedCourseIds);
  assert.equal(new Set(contract.expectedCourseIds).size,8);
  assert.equal(new Set(contract.expectedTeacherIds).size,8);
  assert.deepEqual(teacherAudit.teachers.map((x:any)=>x.teacherContentId),contract.expectedTeacherIds);
  assert.equal(parity.canonicalCourses.count,8);
  assert.equal(parity.teacherMedia.count,8);
});

test('C5-103 exact Night-study identities match definitions with no duplicates',()=>{
  const ids=definitions.nightChoices.map((x:any)=>x.id).filter((id:string)=>id.startsWith('school.night_study.'));
  assert.equal(ids.length,contract.expectedNightChoiceCount);
  assert.equal(new Set(ids).size,ids.length);
  assert.deepEqual(night.entries.map((x:any)=>x.choiceId).sort(),[...ids].sort());
  assert.equal(new Set(night.entries.map((x:any)=>x.choiceId)).size,24);
});

test('C5-103 prepared v10 localization keys are unique and do not collide with root localization',()=>{
  const keys=Object.keys(night.strings);
  assert.equal(keys.length,48);
  assert.equal(new Set(keys).size,48);
  for(const key of keys){
    assert.ok(contract.preparedLocalizationPrefixes.some((prefix:string)=>key.startsWith(prefix)),key);
    assert.equal(localization.strings?.[key],undefined,'root collision '+key);
    assert.ok(night.strings[key].ru.trim(),key+' RU');
    assert.ok(night.strings[key].en.trim(),key+' EN');
  }
});

test('C5-103 School-to-career audit covers each current ordinary career once',()=>{
  const current=new Set(definitions.careers.map((x:any)=>x.id));
  assert.deepEqual([...handoff.careers].sort(),[...contract.expectedCareerIds].sort());
  assert.equal(new Set(handoff.careers).size,handoff.careers.length);
  for(const careerId of handoff.careers)assert.ok(current.has(careerId),careerId);
});
