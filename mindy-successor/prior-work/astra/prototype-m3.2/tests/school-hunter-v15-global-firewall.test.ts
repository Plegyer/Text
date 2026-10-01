import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const inventory=JSON.parse(readFileSync('content/school-hunter-v15-live-inventory.fixture.json','utf8'));
const fixtures=[
  'school-hunter-v15-field-craft.fixture.json',
  'school-hunter-v15-arcana.fixture.json',
  'school-hunter-v15-literacy.fixture.json',
  'school-hunter-v15-physical.fixture.json'
].map(name=>JSON.parse(readFileSync('content/'+name,'utf8')));
const schoolSource=readFileSync('src/core/school.ts','utf8');

test('C5-167 Hunter identities and thresholds do not enter global School runtime',()=>{
  assert.equal(schoolSource.includes('hunter.school.'),false);
  assert.equal(schoolSource.includes('school-field-craft-ready'),false);
  assert.equal(inventory.localHookPolicy.threshold,null);
  assert.equal(inventory.localHookPolicy.nightParityThreshold,null);
  assert.equal(inventory.localHookPolicy.thresholdAuthority,'C1D_133_EXPLICITLY_NULL');
  assert.equal(inventory.localHookPolicy.nightParityAuthority,'BLOCKED_NO_AUTHORIZED_NIGHT_PATH');
  assert.equal(inventory.localHookPolicy.scope,'hunter-only');
  assert.equal(inventory.localHookPolicy.nightParityScope,'hunter-only');
  assert.equal(inventory.localHookPolicy.globalCertificateRule,false);
  assert.equal(inventory.localHookPolicy.globalProjectRule,false);
  assert.equal(inventory.localHookPolicy.nightStudyChangesGlobalCertificateRule,false);
  assert.equal(inventory.localHookPolicy.nightStudyChangesGlobalProjectRule,false);
});

test('C5-167 every producer keeps threshold null and forbids global policy writes',()=>{
  for(const fixture of fixtures){
    assert.equal(fixture.localThreshold.value,null,fixture.id);
    assert.equal(fixture.localThreshold.scope,'hunter-only',fixture.id);
    assert.equal(fixture.localThreshold.authority,'C1D_133_EXPLICITLY_NULL',fixture.id);
    assert.equal(fixture.constraints.publishesGlobalCertificate,false,fixture.id);
    assert.equal(fixture.constraints.publishesGlobalProject,false,fixture.id);
    assert.equal(fixture.constraints.advancesCareerDirectly,false,fixture.id);
  }
});

test('C5-167 C1D-139 authorizes only the existing-world-fact Field Craft consumer',()=>{
  assert.deepEqual(inventory.localHookPolicy.gameplayEventIds,{
    fieldCraft:'hunter.school.field-craft',arcana:null,literacy:null,physicalTraining:null
  });
  assert.equal(fixtures[0].reactionEvent,'hunter.school.field-craft');
  for(const fixture of fixtures.slice(1)){
    assert.equal(fixture.reactionEvent,'BLOCKED_NOT_PUBLISHED_BY_C1D_133',fixture.id);
  }
  assert.deepEqual(fixtures[0].authorizedCondition,{kind:'worldFact',fact:'forest.school-field-notes',present:true});
});

test('C5-167 optional practical medicine craft remains an explicit no-new-curriculum gap',()=>{
  assert.equal(inventory.missingCurriculumDecision.draftOptionalCourse,'practical medicine/craft');
  assert.equal(inventory.missingCurriculumDecision.currentCourseExists,false);
  assert.equal(inventory.missingCurriculumDecision.action,'DO_NOT_CREATE_NEW_CURRICULUM');
  assert.equal(schoolSource.includes('practical_medicine'),false);
  assert.equal(schoolSource.includes('medicine_and_craft'),false);
});
