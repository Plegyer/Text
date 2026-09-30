import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {SCHOOL_COURSE_IDS} from '../src/core/school.ts';

function read(path:string){return JSON.parse(readFileSync(path,'utf8'));}

const reach=read('content/school-current-main-text-reachability-audit-v1.fixture.json');
const generic=read('content/school-generic-after-school-repetition-depth-v2.fixture.json');
const night=read('content/school-exact-night-study-context-depth-v2.fixture.json');
const journal=read('content/school-course-journal-result-consistency-v2.fixture.json');
const teachers=read('content/school-teacher-identity-safety-audit-v2.fixture.json');
const starter=read('content/school-starter-career-transfer-wording-v3.fixture.json');
const late=read('content/school-late-career-transfer-wording-v3.fixture.json');
const boundary=read('content/school-body-confidence-boundary-audit-v2.fixture.json');
const fallback=read('content/school-localization-fallback-coverage-v1.fixture.json');
const definitions=read('content/definitions.json');
const localization=read('content/localization.json');

function collectKeyRefs(value:any,out:string[]=[]):string[]{
  if(Array.isArray(value)){for(const item of value)collectKeyRefs(item,out);return out;}
  if(!value||typeof value!=='object')return out;
  for(const [key,item] of Object.entries(value)){
    if(key==='keys'&&item&&typeof item==='object'){
      for(const ref of Object.values(item))if(typeof ref==='string')out.push(ref);
    }else if(key!=='strings')collectKeyRefs(item,out);
  }
  return out;
}

test('C5-82 current reachability classifications stay explicit and identity-safe',()=>{
  const playerFacing=reach.surfaces.filter((x:any)=>x.classification==='PLAYER_FACING_CONSUMER_READY');
  assert.equal(playerFacing.length,3);
  assert.equal(reach.surfaces.find((x:any)=>x.id==='school-life-content-v1.after-night-study').exactChoiceCount,24);
  assert.equal(reach.surfaces.find((x:any)=>x.id==='school-life-content-v1.after-paid-lesson').exactCourseIdentity,false);
  assert.equal(reach.constraints.changesRuntime,false);
  assert.equal(reach.constraints.changesProductionPacks,false);
});

test('C5-82 generic post-lesson v2 has complete RU EN parity and no identity leakage',()=>{
  assert.equal(generic.variants.length,8);
  assert.deepEqual(generic.safeTrigger,{kind:'actionCompleted',action:'school'});
  assert.equal(generic.selectedRuntimeConsumerId,null);
  const refs=[...new Set(collectKeyRefs(generic))].sort();
  assert.deepEqual(refs,Object.keys(generic.strings).sort());
  for(const [key,pair] of Object.entries(generic.strings) as Array<[string,{ru:string;en:string}]>){
    assert.match(key,/^school\.generic_after_v2\.[a-z0-9_]+\.(title|body)$/);
    assert.ok(pair.ru.trim());
    assert.ok(pair.en.trim());
    assert.equal(localization.strings?.[key],undefined,key);
  }
});

test('C5-82 exact Night-study v2 covers all 24 current exact choice identities',()=>{
  const ids=definitions.nightChoices.map((x:any)=>x.id).filter((id:string)=>id.startsWith('school.night_study.')).sort();
  assert.equal(ids.length,24);
  assert.deepEqual(night.entries.map((x:any)=>x.choiceId).sort(),ids);
  for(const entry of night.entries)assert.deepEqual(entry.reactionFact,{kind:'nightChoiceCompleted',choice:entry.choiceId});
  assert.deepEqual(night.invariants,{tuitionDelta:0,currentDayEnergyDelta:0,statGain:2,nextDayEnergyDelta:-1});
  assert.deepEqual(night.mechanics.effects,[]);
  assert.deepEqual(night.mechanics.nightFlowChanges,[]);
});

test('C5-82 course journal/result audit preserves eight stable course identities',()=>{
  assert.equal(journal.courses.length,8);
  assert.deepEqual(journal.courses.map((x:any)=>x.courseId),[...SCHOOL_COURSE_IDS]);
  assert.equal(journal.courses.filter((x:any)=>!x.terminologyAligned).length,2);
  assert.equal(journal.runtimeJournal.localized,false);
  assert.equal(journal.runtimeJournal.journalRef,null);
  assert.deepEqual(journal.localizedResult,{key:'ui.school.lessonResult',ru:'Урок завершён: {course}.',en:'School lesson completed: {course}.'});
});

test('C5-82 teacher safety audit preserves exactly eight educator identities',()=>{
  assert.equal(teachers.teachers.length,8);
  for(const teacher of teachers.teachers){
    assert.equal(teacher.educatorOnly,true);
    assert.ok((SCHOOL_COURSE_IDS as readonly string[]).includes(teacher.courseId),teacher.courseId);
  }
  const genericSurface=teachers.surfaces.find((x:any)=>x.surface==='generic paid-lesson reaction');
  assert.equal(genericSurface.teacherSpecificCopySafe,false);
  assert.equal(teachers.constraints.addsTeacherEvent,false);
  assert.equal(teachers.constraints.writesRelationship,false);
});

test('C5-82 transfer v3 fixtures use only current careers actions courses and null decisions',()=>{
  const careerIds=new Set(definitions.careers.map((x:any)=>x.id));
  const actionIds=new Set(definitions.actions.map((x:any)=>x.id));
  assert.deepEqual([...new Set(starter.entries.map((x:any)=>x.careerId))].sort(),['lumber','satyr-maid','undead-farm'].sort());
  assert.deepEqual([...new Set(late.entries.map((x:any)=>x.careerId))].sort(),['tavern','hunter','guard','merchant','artist-geisha','assassin','prostitute'].sort());
  for(const fixture of [starter,late]){
    for(const entry of fixture.entries){
      assert.ok(careerIds.has(entry.careerId),entry.careerId);
      assert.ok(actionIds.has(entry.actionId),entry.actionId);
      for(const courseId of entry.courseIds)assert.ok((SCHOOL_COURSE_IDS as readonly string[]).includes(courseId),courseId);
    }
    for(const value of Object.values(fixture.selectedThresholds))assert.equal(value,null);
    for(const value of Object.values(fixture.selectedPublicResultIds))assert.equal(value,null);
  }
});

test('C5-82 Body Confidence and fallback audits retain recorded boundaries',()=>{
  assert.equal(boundary.violationsFound.length,0);
  assert.equal(boundary.constraints.changesLustRules,false);
  assert.equal(boundary.constraints.changesConsentRules,false);
  assert.equal(boundary.constraints.changesAdultCareerMechanics,false);
  assert.equal(fallback.summary.courseLabelPairsComplete,8);
  assert.equal(fallback.summary.courseDescriptionPairsComplete,8);
  assert.equal(fallback.summary.teacherMediaRawEnglishFallbacks,8);
  assert.equal(fallback.summary.teacherMediaRootLocalizedPairs,0);
  assert.equal(fallback.summary.exactNightStudyDefinitionRawEnglishLabels,24);
  assert.equal(fallback.summary.exactNightStudyUiTemplateLocalized,true);
});

test('C5-82 all queue-v8 prepared localization keys are unique complete and collision-free',()=>{
  const fixtures=[generic,night,starter,late];
  const seen=new Set<string>();
  for(const fixture of fixtures){
    const refs=[...new Set(collectKeyRefs(fixture))].sort();
    assert.deepEqual(refs,Object.keys(fixture.strings).sort(),fixture.id);
    for(const [key,pair] of Object.entries(fixture.strings) as Array<[string,{ru:string;en:string}]>){
      assert.ok(pair.ru.trim(),key+' RU');
      assert.ok(pair.en.trim(),key+' EN');
      assert.equal(seen.has(key),false,'duplicate '+key);
      assert.equal(localization.strings?.[key],undefined,'root collision '+key);
      seen.add(key);
    }
  }
  assert.equal(seen.size,90);
});
