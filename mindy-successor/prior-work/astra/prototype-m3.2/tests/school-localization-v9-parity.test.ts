import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {SCHOOL_COURSE_IDS} from '../src/core/school.ts';

function read(path:string){return JSON.parse(readFileSync(path,'utf8'));}

const reach=read('content/school-post-v8-reachability-audit-v1.fixture.json');
const generic=read('content/school-generic-after-school-depth-v3.fixture.json');
const night=read('content/school-exact-night-study-depth-v3.fixture.json');
const terminology=read('content/school-journal-result-terminology-consistency-v3.fixture.json');
const teacherSafety=read('content/school-teacher-identity-safety-audit-v3.fixture.json');
const starter=read('content/school-starter-career-transfer-wording-v4.fixture.json');
const late=read('content/school-late-career-transfer-wording-v4.fixture.json');
const bodyBoundary=read('content/school-body-confidence-boundary-audit-v3.fixture.json');
const fallback=read('content/school-fallback-localization-audit-v2.fixture.json');
const definitions=read('content/definitions.json');
const localization=read('content/localization.json');
const lifePack=read('content/packs/school-life-content-v1.json');
const lessonPack=read('content/packs/school-lesson-content-v1.json');
const teacherPack=read('content/packs/school-teachers-v1.json');

function stringLeaves(value:any,out:string[]){
  if(typeof value==='string'){out.push(value);return;}
  if(Array.isArray(value)){for(const item of value)stringLeaves(item,out);return;}
  if(value&&typeof value==='object')for(const item of Object.values(value))stringLeaves(item,out);
}
function refs(value:any,out:string[]=[]):string[]{
  if(Array.isArray(value)){for(const item of value)refs(item,out);return out;}
  if(!value||typeof value!=='object')return out;
  for(const [key,item] of Object.entries(value)){
    if(key==='keys'&&item&&typeof item==='object')stringLeaves(item,out);
    else if(key!=='strings')refs(item,out);
  }
  return out;
}

test('C5-94 current reachability classifications match production School consumers',()=>{
  const genericConsumers=[lifePack,lessonPack]
    .flatMap((p:any)=>p.events)
    .filter((event:any)=>event.reactionTriggers?.some((t:any)=>t.kind==='actionCompleted'&&t.action==='school'))
    .map((event:any)=>event.id)
    .sort();
  assert.deepEqual(genericConsumers,['school-lesson-content-v1.after-school','school-life-content-v1.after-paid-lesson']);
  const nightEvent=lifePack.events.find((event:any)=>event.id==='school-life-content-v1.after-night-study');
  assert.ok(nightEvent);
  assert.equal(nightEvent.reactionTriggers.filter((t:any)=>t.kind==='nightChoiceCompleted').length,24);

  assert.equal(reach.classifications.filter((x:any)=>x.classification==='PLAYER_FACING').length,4);
  assert.equal(reach.obsoleteSurfaces.length,0);
  assert.equal(reach.constraints.changesRuntime,false);
  assert.equal(reach.constraints.changesProductionPacks,false);
});

test('C5-94 generic after-School v3 stays identity-neutral and RU EN complete',()=>{
  assert.equal(generic.variants.length,8);
  assert.deepEqual(generic.safeTrigger,{kind:'actionCompleted',action:'school'});
  assert.equal(generic.selectedRuntimeConsumerId,null);
  const expected=[...new Set(refs(generic))].sort();
  assert.deepEqual(expected,Object.keys(generic.strings).sort());
  for(const [key,pair] of Object.entries(generic.strings) as Array<[string,{ru:string;en:string}]>){
    assert.match(key,/^school\.generic_after_v3\.[a-z0-9_]+\.(title|body)$/);
    assert.ok(pair.ru.trim(),key+' RU');
    assert.ok(pair.en.trim(),key+' EN');
    assert.equal(localization.strings?.[key],undefined,'root collision '+key);
  }
});

test('C5-94 exact Night-study v3 covers all 24 current exact choices',()=>{
  const ids=definitions.nightChoices
    .map((x:any)=>x.id)
    .filter((id:string)=>id.startsWith('school.night_study.'))
    .sort();
  assert.equal(ids.length,24);
  assert.deepEqual(night.entries.map((x:any)=>x.choiceId).sort(),ids);
  for(const entry of night.entries){
    assert.deepEqual(entry.reactionFact,{kind:'nightChoiceCompleted',choice:entry.choiceId});
  }
  assert.equal(night.selectedRuntimeConsumerId,null);
  assert.deepEqual(night.invariants,{tuitionDelta:0,currentDayEnergyDelta:0,statGain:2,nextDayEnergyDelta:-1});
  assert.deepEqual(night.mechanics.effects,[]);
  assert.deepEqual(night.mechanics.nightFlowChanges,[]);
});

test('C5-94 terminology audit preserves eight stable course identities and current localized result',()=>{
  assert.equal(terminology.courses.length,8);
  assert.deepEqual(terminology.courses.map((x:any)=>x.courseId),[...SCHOOL_COURSE_IDS]);
  assert.equal(terminology.courses.filter((x:any)=>!x.aligned).length,2);
  assert.equal(terminology.runtimeJournal.localized,false);
  assert.equal(terminology.runtimeJournal.journalRef,null);
  assert.equal(terminology.lastAction.localizedUiResultKey,'ui.school.lessonResult');
  assert.deepEqual(localization.strings['ui.school.lessonResult'],terminology.lastAction.localizedUiResultPair);
});

test('C5-94 teacher identity audit matches all current teacher media and localized alt/caption pairs',()=>{
  assert.equal(teacherSafety.teachers.length,8);
  assert.equal(teacherPack.media.length,8);
  const mediaIds=new Set(teacherPack.media.map((m:any)=>m.id));
  for(const teacher of teacherSafety.teachers){
    assert.equal(teacher.educatorOnly,true);
    assert.ok((SCHOOL_COURSE_IDS as readonly string[]).includes(teacher.courseId),teacher.courseId);
    assert.ok(mediaIds.has(teacher.mediaId),teacher.mediaId);
    const alt=localization.strings['media.'+teacher.mediaId+'.alt'];
    const caption=localization.strings['media.'+teacher.mediaId+'.caption'];
    assert.ok(alt?.ru?.trim()&&alt?.en?.trim(),teacher.mediaId+' alt');
    assert.ok(caption?.ru?.trim()&&caption?.en?.trim(),teacher.mediaId+' caption');
  }
  assert.equal(teacherSafety.runtimeTeacherEventCount,0);
  assert.equal(teacherSafety.constraints.addsTeacherEvent,false);
  assert.equal(teacherSafety.constraints.writesRelationship,false);
});

test('C5-94 transfer wording v4 uses only current career action course identities and null decisions',()=>{
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

test('C5-94 Body Confidence v3 stays separate from Lust consent adult-career and NightFlow mechanics',()=>{
  assert.equal(bodyBoundary.violationsFound.length,0);
  assert.equal(bodyBoundary.constraints.changesLustRules,false);
  assert.equal(bodyBoundary.constraints.changesConsentRules,false);
  assert.equal(bodyBoundary.constraints.changesAdultCareerMechanics,false);
  assert.equal(bodyBoundary.constraints.changesRuntime,false);
  assert.equal(bodyBoundary.constraints.changesNightFlow,false);
  assert.equal(bodyBoundary.auditedSurfaces.find((x:any)=>x.surface==='exact Night-study Body Confidence choices').choiceCount,3);
});

test('C5-94 fallback audit reflects current complete teacher localization and remaining raw fallbacks',()=>{
  assert.equal(fallback.summary.canonicalCourseLabelPairs,8);
  assert.equal(fallback.summary.canonicalCourseDescriptionPairs,8);
  assert.equal(fallback.summary.coursePresentationAltPairs,8);
  assert.equal(fallback.summary.coursePresentationCaptionPairs,8);
  assert.equal(fallback.summary.teacherMediaAltPairs,8);
  assert.equal(fallback.summary.teacherMediaCaptionPairs,8);
  assert.equal(fallback.summary.exactNightStudyDefinitionLabels,24);
  assert.equal(fallback.summary.exactNightStudyLocalizedUiTemplate,true);
  assert.equal(fallback.summary.paidLessonJournalLocalizationRef,false);
  assert.equal(fallback.missingOrEmptyPairs.length,0);
});

test('C5-94 all queue-v9 prepared localization keys are unique complete and collision-free',()=>{
  const fixtures=[generic,night,starter,late];
  const seen=new Set<string>();
  for(const fixture of fixtures){
    const expected=[...new Set(refs(fixture))].sort();
    assert.deepEqual(expected,Object.keys(fixture.strings).sort(),fixture.id);
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

test('C5-94 paid-lesson journal remains an explicit localization routing gap',()=>{
  const source=readFileSync('src/core/school.ts','utf8');
  assert.ok(source.includes('School: ${course.label}. Tuition ${course.tuition}; Energy -${course.energyCost}.'));
  assert.ok(source.includes('journalRefs.push(null)'));
  assert.ok(source.includes('School lesson completed: ${course.label}.'));
});
