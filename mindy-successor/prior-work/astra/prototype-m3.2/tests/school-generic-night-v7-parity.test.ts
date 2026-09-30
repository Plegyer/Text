import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {SCHOOL_COURSE_IDS} from '../src/core/school.ts';

function read(path:string){return JSON.parse(readFileSync(path,'utf8'));}

const genericInventory=read('content/school-generic-after-school-inventory-v1.fixture.json');
const genericDepth=read('content/school-generic-after-school-depth-v1.fixture.json');
const nightAtlas=read('content/school-exact-night-study-choice-atlas-v1.fixture.json');
const nightDepth=read('content/school-exact-night-study-reactive-depth-v1.fixture.json');
const teacherBoundary=read('content/school-night-study-teacher-boundary-audit-v1.fixture.json');
const starterTransfer=read('content/school-starter-career-transfer-reflection-v2.fixture.json');
const lateTransfer=read('content/school-late-career-transfer-reflection-v2.fixture.json');
const journalAudit=read('content/school-journal-localization-consistency-audit-v1.fixture.json');
const costWording=read('content/school-tuition-energy-wording-consistency-v1.fixture.json');
const teacherTone=read('content/school-teacher-tone-consistency-matrix-v3.fixture.json');

const definitions=read('content/definitions.json');
const localization=read('content/localization.json');
const lifePack=read('content/packs/school-life-content-v1.json');
const lessonPack=read('content/packs/school-lesson-content-v1.json');

const expectedNightIds=definitions.nightChoices
  .map((x:any)=>x.id)
  .filter((id:string)=>id.startsWith('school.night_study.'));

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

test('C5-71 generic after-School inventory matches the two current production consumers',()=>{
  const consumers=[lifePack,lessonPack]
    .flatMap((pack:any)=>pack.events)
    .filter((event:any)=>event.reactionTriggers?.some((t:any)=>t.kind==='actionCompleted'&&t.action==='school'))
    .map((event:any)=>event.id)
    .sort();

  assert.deepEqual(
    consumers,
    ['school-lesson-content-v1.after-school','school-life-content-v1.after-paid-lesson']
  );
  assert.deepEqual(
    genericInventory.currentProductionEvents.map((x:any)=>x.eventId).sort(),
    consumers
  );
  assert.deepEqual(genericInventory.safeReactionFact,{kind:'actionCompleted',action:'school'});
  assert.equal(genericInventory.selectedRuntimeConsumerId,null);
  assert.equal(genericInventory.constraints.changesRuntime,false);
  assert.equal(genericInventory.constraints.addsReactionTrigger,false);
});

test('C5-71 exact Night-study atlas covers every current semantic choice exactly once',()=>{
  assert.equal(expectedNightIds.length,24);
  assert.equal(nightAtlas.count,24);
  assert.deepEqual(
    nightAtlas.choices.map((x:any)=>x.choiceId).sort(),
    [...expectedNightIds].sort()
  );

  for(const choice of nightAtlas.choices){
    assert.equal(choice.exactChoiceIdentityAvailable,true,choice.choiceId);
    assert.deepEqual(choice.exactReactionFact,{kind:'nightChoiceCompleted',choice:choice.choiceId});
    assert.ok((SCHOOL_COURSE_IDS as readonly string[]).includes(choice.courseId),choice.courseId);
    assert.equal(choice.statGain,2,choice.choiceId);
    assert.equal(choice.counter,'night_study_sessions',choice.choiceId);
    assert.equal(choice.nextDayEnergyDelta,-1,choice.choiceId);
  }

  assert.deepEqual(nightAtlas.invariants,{
    tuitionDelta:0,
    currentDayEnergyDelta:0,
    statGain:2,
    nextDayEnergyDelta:-1,
    counter:'night_study_sessions'
  });
  assert.equal(nightAtlas.routing.teacherIdentityEmittedByRuntime,false);
});

test('C5-71 exact Night-study reactive depth is keyed only to current exact choices',()=>{
  assert.equal(nightDepth.entries.length,24);
  assert.deepEqual(
    nightDepth.entries.map((x:any)=>x.choiceId).sort(),
    [...expectedNightIds].sort()
  );
  for(const entry of nightDepth.entries){
    assert.deepEqual(entry.reactionFact,{kind:'nightChoiceCompleted',choice:entry.choiceId});
  }
  assert.equal(nightDepth.selectedRuntimeConsumerId,null);
  assert.deepEqual(nightDepth.mechanics.effects,[]);
  assert.deepEqual(nightDepth.mechanics.nightFlowChanges,[]);
  assert.deepEqual(nightDepth.mechanics.careerWrites,[]);
});

test('C5-71 Night-study teacher boundary keeps teacher presence and events unclaimed',()=>{
  assert.equal(teacherBoundary.runtimeFact.teacherIdentityEmitted,false);
  assert.equal(teacherBoundary.selectedTeacherRuntimeConsumerId,null);
  assert.equal(teacherBoundary.courseTeacherMap.length,8);
  assert.equal(teacherBoundary.constraints.addsTeacherEvent,false);
  assert.equal(teacherBoundary.constraints.changesNightFlow,false);
  assert.equal(teacherBoundary.constraints.writesRelationship,false);
});

test('C5-71 transfer reflections stay on current ordinary careers and keep result decisions null',()=>{
  const careerIds=new Set(definitions.careers.map((x:any)=>x.id));
  const actionIds=new Set(definitions.actions.map((x:any)=>x.id));

  assert.deepEqual(
    [...new Set(starterTransfer.entries.map((x:any)=>x.careerId))].sort(),
    ['lumber','satyr-maid','undead-farm'].sort()
  );
  assert.deepEqual(
    [...new Set(lateTransfer.entries.map((x:any)=>x.careerId))].sort(),
    ['tavern','hunter','guard','merchant','artist-geisha','assassin','prostitute'].sort()
  );

  for(const fixture of [starterTransfer,lateTransfer]){
    for(const entry of fixture.entries){
      assert.ok(careerIds.has(entry.careerId),entry.careerId);
      assert.ok(actionIds.has(entry.actionId),entry.actionId);
      for(const courseId of entry.courseIds){
        assert.ok((SCHOOL_COURSE_IDS as readonly string[]).includes(courseId),courseId);
      }
    }
    for(const value of Object.values(fixture.selectedThresholds))assert.equal(value,null);
    for(const value of Object.values(fixture.selectedPublicResultIds))assert.equal(value,null);
    assert.deepEqual(fixture.mechanics.effects,[]);
    assert.deepEqual(fixture.mechanics.careerWrites,[]);
    assert.deepEqual(fixture.mechanics.publishesWorldFacts,[]);
  }
});

test('C5-71 journal audit records exact current terminology inconsistencies without modifying schema',()=>{
  const mismatches=journalAudit.canonicalCourseLabels.filter((x:any)=>!x.consistent);
  assert.deepEqual(
    mismatches.map((x:any)=>x.courseId).sort(),
    ['school.course.literacy_and_numbers','school.course.etiquette_and_presentation'].sort()
  );
  assert.equal(journalAudit.runtimeJournal.localizationRef,null);
  assert.equal(journalAudit.runtimeJournal.ruParityAvailableInJournal,false);
  assert.equal(journalAudit.lastAction.rawRuntimeStringLocalized,false);
  assert.equal(journalAudit.constraints.changesRuntime,false);
  assert.equal(journalAudit.constraints.changesRootLocalization,false);
  assert.equal(journalAudit.constraints.changesJournalSchema,false);

  const schoolSource=readFileSync('src/core/school.ts','utf8');
  assert.ok(schoolSource.includes('School: ${course.label}. Tuition ${course.tuition}; Energy -${course.energyCost}.'));
  assert.ok(schoolSource.includes('journalRefs.push(null)'));
});

test('C5-71 tuition and Energy wording fixture preserves exact current numeric contract',()=>{
  assert.equal(costWording.numericContract.paidLessonCurrentDayEnergyCost,1);
  assert.equal(costWording.numericContract.nightStudyTuition,0);
  assert.equal(costWording.numericContract.nightStudyCurrentDayEnergyCost,0);
  assert.equal(costWording.numericContract.nightStudyStatGain,2);
  assert.equal(costWording.numericContract.nightStudyNextDayEnergyDelta,-1);
  assert.deepEqual(costWording.constraints,{
    changesTuition:false,
    changesEnergyRules:false,
    changesNightFlow:false,
    changesRootLocalization:false
  });
});

test('C5-71 teacher tone matrix preserves exactly eight current educator identities',()=>{
  assert.deepEqual(
    teacherTone.teachers.map((x:any)=>[x.teacherContentId,x.courseId]),
    [
      ['school.teacher.mara-fen','school.course.literacy_and_numbers'],
      ['school.teacher.ilyra-venn','school.course.arcana'],
      ['school.teacher.cassian-reed','school.course.rhetoric_and_social'],
      ['school.teacher.eliane-marrow','school.course.etiquette_and_presentation'],
      ['school.teacher.rowan-pike','school.course.field_craft'],
      ['school.teacher.tovan-kest','school.course.physical_training'],
      ['school.teacher.nessa-lark','school.course.arts_and_performance'],
      ['school.teacher.sera-vey','school.course.body_confidence']
    ]
  );
  for(const teacher of teacherTone.teachers)assert.equal(teacher.educatorOnly,true,teacher.teacherContentId);
  assert.equal(teacherTone.selectedRuntimeConsumerId,null);
  assert.deepEqual(teacherTone.mechanics.relationshipWrites,[]);
  assert.deepEqual(teacherTone.mechanics.teacherStateWrites,[]);
  assert.deepEqual(teacherTone.mechanics.lustEffects,[]);
});

test('C5-71 all prepared queue-v7 strings have RU EN parity unique stable refs and no root collision',()=>{
  const fixtures=[genericDepth,nightDepth,starterTransfer,lateTransfer,costWording,teacherTone];
  const seen=new Set<string>();

  for(const fixture of fixtures){
    const expected=[...new Set(refs(fixture))].sort();
    const actual=Object.keys(fixture.strings).sort();
    assert.deepEqual(expected,actual,fixture.id);

    for(const [key,pair] of Object.entries(fixture.strings) as Array<[string,{ru:string;en:string}]>){
      assert.match(key,/^school\.(generic_after_school|night_exact|transfer_v2|cost_wording|teacher_tone_v3)\.[a-z0-9_.]+$/,key);
      assert.ok(pair.ru.trim().length>0,`${key}: RU`);
      assert.ok(pair.en.trim().length>0,`${key}: EN`);
      assert.equal(seen.has(key),false,`duplicate prepared key: ${key}`);
      assert.equal(localization.strings?.[key],undefined,`root localization collision: ${key}`);
      seen.add(key);
    }
  }

  assert.equal(seen.size,124);
});
