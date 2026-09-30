import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

import {SCHOOL_COURSE_IDS} from '../src/core/school.ts';

function read(path:string){return JSON.parse(readFileSync(path,'utf8'));}

const atlas=read('content/school-whole-career-transfer-atlas-v1.fixture.json');
const lumberAudit=read('content/school-lumber-text-reaudit-v1.fixture.json');
const reactive=[
  read('content/school-satyr-maid-reactive-depth-v1.fixture.json'),
  read('content/school-undead-farm-reactive-depth-v1.fixture.json'),
  read('content/school-tavern-hunter-reactive-depth-v1.fixture.json'),
  read('content/school-guard-merchant-reactive-depth-v1.fixture.json'),
  read('content/school-artist-geisha-reactive-depth-v1.fixture.json'),
  read('content/school-assassin-reactive-depth-v1.fixture.json'),
  read('content/school-prostitute-reactive-depth-v1.fixture.json'),
  read('content/school-teacher-transfer-coverage-v2.fixture.json')
];
const definitions=read('content/definitions.json');
const localization=read('content/localization.json');

const expectedCareerActions=[
  ['lumber','lumber.shift'],
  ['satyr-maid','satyr-maid.shift'],
  ['undead-farm','undead-farm.shift'],
  ['tavern','tavern.shift'],
  ['hunter','hunter.shift'],
  ['guard','guard.shift'],
  ['merchant','merchant.shift'],
  ['artist-geisha','artist-geisha.shift'],
  ['assassin','assassin.shift'],
  ['prostitute','prostitute.shift']
];

function collectRefs(value:any,out:string[]=[]):string[]{
  if(Array.isArray(value)){
    for(const item of value)collectRefs(item,out);
    return out;
  }
  if(!value||typeof value!=='object')return out;
  for(const [key,item] of Object.entries(value)){
    if(key==='keys'&&item&&typeof item==='object'&&!Array.isArray(item)){
      for(const ref of Object.values(item))if(typeof ref==='string')out.push(ref);
    }else if(key!=='strings'){
      collectRefs(item,out);
    }
  }
  return out;
}

test('C5-47 atlas locks exactly ten current ordinary careers and existing School courses',()=>{
  const careerIds=new Set(definitions.careers.map((x:any)=>x.id));
  const actionIds=new Set(definitions.actions.map((x:any)=>x.id));

  assert.deepEqual(
    atlas.careers.map((x:any)=>[x.careerId,x.actionId]),
    expectedCareerActions
  );

  for(const entry of atlas.careers){
    assert.ok(careerIds.has(entry.careerId),entry.careerId);
    assert.ok(actionIds.has(entry.actionId),entry.actionId);
    for(const mapping of entry.mappings){
      assert.ok((SCHOOL_COURSE_IDS as readonly string[]).includes(mapping.courseId),mapping.courseId);
      assert.equal(mapping.selectedThreshold,null,`${entry.careerId}/${mapping.courseId}`);
      assert.equal(mapping.selectedProducerPublicFactId,null,`${entry.careerId}/${mapping.courseId}`);
    }
  }

  assert.equal(atlas.constraints.createsCurriculum,false);
  assert.equal(atlas.constraints.createsThresholds,false);
  assert.equal(atlas.constraints.createsProducerFacts,false);
  assert.equal(atlas.constraints.createsCareerState,false);
  assert.equal(atlas.constraints.changesRuntime,false);
  assert.equal(atlas.constraints.changesNightFlow,false);
});

test('C5-47 Lumber re-audit keeps current consumer seam and unresolved School producer explicit',()=>{
  assert.equal(lumberAudit.currentSeams.management.sourceCourseId,'school.course.literacy_and_numbers');
  assert.equal(lumberAudit.currentSeams.management.existingConsumerFactId,'lumber.school.management-ready');
  assert.equal(lumberAudit.currentSeams.management.existingConsumerEventId,'lumber-cross.school-management-return');
  assert.equal(lumberAudit.currentSeams.management.selectedProviderType,null);
  assert.equal(lumberAudit.currentSeams.management.selectedThreshold,null);
  assert.equal(lumberAudit.currentSeams.management.selectedPublisherEventId,null);

  assert.equal(lumberAudit.currentSeams.forestKnowledge.sourceCourseId,'school.course.arcana');
  assert.equal(lumberAudit.currentSeams.forestKnowledge.selectedPublicResultId,null);
  assert.equal(lumberAudit.currentSeams.forestKnowledge.selectedDirectForestConsumerId,null);
  assert.equal(lumberAudit.currentSeams.forestKnowledge.existingLaterWorldFactId,'lumber.forest.truth-known');

  assert.ok(lumberAudit.contentOnlyGaps.some((x:any)=>x.id==='management-return-localization'));
  assert.equal(lumberAudit.constraints.changesRuntime,false);
  assert.equal(lumberAudit.constraints.createsThreshold,false);
  assert.equal(lumberAudit.constraints.createsProducerFact,false);
});

test('C5-47 all prepared reactive localization has RU EN parity, stable refs and no root collision',()=>{
  const seen=new Set<string>();

  for(const fixture of reactive){
    assert.equal(fixture.formatVersion,1,fixture.id);
    assert.equal(fixture.status,'CONTENT_PREP_ONLY',fixture.id);

    const refs=[...new Set(collectRefs(fixture))].sort();
    const keys=Object.keys(fixture.strings).sort();
    assert.deepEqual(refs,keys,fixture.id);

    for(const [key,pair] of Object.entries(fixture.strings) as Array<[string,{ru:string;en:string}]>){
      assert.match(key,/^school\.(reactive|transfer)\.[a-z0-9_.]+$/,key);
      assert.ok(pair.ru.trim().length>0,`${key}: RU`);
      assert.ok(pair.en.trim().length>0,`${key}: EN`);
      assert.equal(seen.has(key),false,`duplicate prepared key: ${key}`);
      assert.equal(localization.strings?.[key],undefined,`root localization collision: ${key}`);
      seen.add(key);
    }
  }

  assert.equal(seen.size,120);
});

test('C5-47 reactive fixtures target only atlas careers and preserve null result decisions',()=>{
  const atlasPairs=new Set(expectedCareerActions.map(([career,action])=>`${career}|${action}`));
  const courseIds=new Set(SCHOOL_COURSE_IDS as readonly string[]);

  for(const fixture of reactive.slice(0,7)){
    if(fixture.careers){
      for(const entry of fixture.careers){
        assert.ok(atlasPairs.has(`${entry.careerId}|${entry.actionId}`));
        assert.equal(entry.selectedThreshold,null);
        assert.equal(entry.selectedPublicFactId,null);
      }
    }else{
      assert.ok(atlasPairs.has(`${fixture.targetCareerId}|${fixture.targetActionId}`));
      assert.equal(fixture.selectedThreshold,null);
      assert.equal(fixture.selectedPublicFactId,null);
    }

    for(const variant of fixture.variants){
      assert.ok(courseIds.has(variant.courseId),`${fixture.id}: ${variant.courseId}`);
    }

    assert.deepEqual(fixture.mechanics.effects,[],fixture.id);
    assert.deepEqual(fixture.mechanics.careerWrites,[],fixture.id);
    assert.deepEqual(fixture.mechanics.publishesWorldFacts,[],fixture.id);
  }
});

test('C5-47 teacher transfer coverage preserves all eight current teacher identities',()=>{
  const transfer=reactive[7];
  assert.deepEqual(
    transfer.teachers.map((x:any)=>[x.teacherContentId,x.courseId]),
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

  const atlasCareerIds=new Set(atlas.careers.map((x:any)=>x.careerId));
  for(const teacher of transfer.teachers){
    assert.ok((SCHOOL_COURSE_IDS as readonly string[]).includes(teacher.courseId));
    for(const careerId of teacher.careerIds)assert.ok(atlasCareerIds.has(careerId),careerId);
  }

  assert.deepEqual(transfer.mechanics.effects,[]);
  assert.deepEqual(transfer.mechanics.careerWrites,[]);
  assert.deepEqual(transfer.mechanics.relationshipWrites,[]);
  assert.deepEqual(transfer.mechanics.lustEffects,[]);
  assert.deepEqual(transfer.mechanics.publishesWorldFacts,[]);
});

test('C5-47 Assassin and voluntary Prostitute safety boundaries remain explicit',()=>{
  const assassin=reactive.find((x:any)=>x.id==='school.assassin-reactive-depth.v1');
  const prostitute=reactive.find((x:any)=>x.id==='school.prostitute-reactive-depth.v1');

  assert.ok(assassin);
  assert.equal(assassin.mappingAuthority,'CAPABILITY_MATCH_ONLY');
  assert.equal(assassin.contentSafety,'NON_COMBAT_CURRICULUM');
  assert.deepEqual(assassin.mechanics.combatCurriculumChanges,[]);

  assert.ok(prostitute);
  assert.equal(prostitute.contentSafety,'NON_EXPLICIT_VOLUNTARY_ORDINARY_CAREER');
  assert.deepEqual(prostitute.mechanics.lustEffects,[]);
  assert.deepEqual(prostitute.mechanics.consentRuleChanges,[]);
  assert.deepEqual(prostitute.mechanics.nightFlowChanges,[]);
  assert.deepEqual(prostitute.mechanics.secretDebtWrites,[]);
});
