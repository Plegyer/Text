import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

function read(path:string){return JSON.parse(readFileSync(path,'utf8'));}

const coverage=read('content/school-localization-v10-regression-coverage.fixture.json');
const refresh=read('content/school-localization-v10-handoff-refresh.fixture.json');
const access=read('content/school-accessibility-text-parity-audit-v10.fixture.json');
const terminology=read('content/school-terminology-consistency-audit-v10.fixture.json');

test('C5-107 regression coverage has evidence for every assigned pre-freeze task',()=>{
  const expected=['C5-97','C5-98','C5-99','C5-100','C5-101','C5-102','C5-103','C5-104','C5-105','C5-106','C5-107'];
  assert.deepEqual(Object.keys(coverage.tasks),expected);
  for(const [task,paths] of Object.entries(coverage.tasks) as Array<[string,string[]]>){
    for(const path of paths)assert.ok(existsSync(path),task+' missing '+path);
  }
});

test('C5-107 handoff refresh preserves exact current identity counts and open decisions',()=>{
  assert.deepEqual(refresh.exactIdentityCounts,{courses:8,teachers:8,nightStudyChoices:24,ordinaryCareers:10});
  assert.equal(refresh.selectedRuntimeConsumerId,null);
  assert.equal(refresh.selectedThreshold,null);
  assert.equal(refresh.selectedProducerPublicFactId,null);
  assert.equal(refresh.constraints.changesRuntime,false);
  assert.equal(refresh.constraints.changesRootLocalization,false);
  assert.equal(refresh.constraints.changesCareerState,false);
  assert.equal(refresh.constraints.changesNightFlow,false);
});

test('C5-107 accessibility and terminology debt remains audit-only and internally consistent',()=>{
  assert.equal(access.coursePresentationAltPairs.count,8);
  assert.equal(access.coursePresentationSemanticDebt.length,4);
  assert.equal(access.teacherMedia.count,8);
  assert.equal(access.teacherMedia.altPairsComplete,8);
  assert.equal(access.teacherMedia.captionPairsComplete,8);
  assert.equal(terminology.courseNames.filter((x:any)=>!x.aligned).length,2);
  assert.equal(terminology.accessibilityGrammarDebt.length,3);
});

test('C5-107 prepared localization key count is locked',()=>{
  const night=read('content/school-night-study-text-preparation-v10.fixture.json');
  assert.equal(Object.keys(night.strings).length,coverage.expectedPreparedLocalizationKeys);
});
