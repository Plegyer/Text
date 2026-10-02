import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const fixtures=[
  'school-prostitute-v20-rhetoric.fixture.json',
  'school-prostitute-v20-literacy.fixture.json',
  'school-prostitute-v20-etiquette.fixture.json',
  'school-prostitute-v20-arts.fixture.json',
  'school-prostitute-v20-body-confidence.fixture.json'
].map(name=>JSON.parse(readFileSync('content/'+name,'utf8')));

test('C5-218..222 voluntary Prostitute source is complete non-explicit RU EN on exactly five existing courses',()=>{
  assert.deepEqual(fixtures.map(x=>x.task),['C5-218','C5-219','C5-220','C5-221','C5-222']);
  assert.deepEqual(fixtures.map(x=>x.courseId),[
    'school.course.rhetoric_and_social',
    'school.course.literacy_and_numbers',
    'school.course.etiquette_and_presentation',
    'school.course.arts_and_performance',
    'school.course.body_confidence'
  ]);
  for(const fixture of fixtures){
    assert.equal(fixture.contentSafety,'NON_EXPLICIT_VOLUNTARY_ORDINARY_CAREER',fixture.id);
    assert.equal(fixture.mappingAuthority,'CAPABILITY_MATCH_ONLY',fixture.id);
    assert.equal(fixture.futureConsumerStatus,'PENDING_RUNTIME_ID',fixture.id);
    assert.equal(fixture.threshold,null,fixture.id);
    assert.equal(fixture.publicFactId,null,fixture.id);
    for(const field of ['title','body','result','journal','accessibility']){
      const pair=fixture.copy[field];
      assert.ok(pair?.ru?.trim(),fixture.id+' '+field+' ru');
      assert.ok(pair?.en?.trim(),fixture.id+' '+field+' en');
      assert.notEqual(pair.ru,pair.en,fixture.id+' '+field);
    }
    assert.equal(fixture.constraints.createsSecretDebtState,false,fixture.id);
    assert.equal(fixture.constraints.createsForcedNight,false,fixture.id);
    assert.equal(fixture.constraints.createsOwnerState,false,fixture.id);
    assert.equal(fixture.constraints.createsDirectCareerTransition,false,fixture.id);
    assert.equal(fixture.constraints.publishesGlobalCertificate,false,fixture.id);
    assert.equal(fixture.constraints.publishesGlobalProject,false,fixture.id);
  }
});

test('C5-218..222 source-specific boundaries reject client consent pricing Palace Lust and explicit-scene authority',()=>{
  const [rhetoric,literacy,etiquette,arts,body]=fixtures;
  assert.equal(rhetoric.constraints.createsClientState,false);
  assert.equal(rhetoric.constraints.createsConsentMechanic,false);
  assert.equal(rhetoric.constraints.createsPricingRule,false);
  assert.equal(rhetoric.constraints.createsRomanceState,false);
  assert.equal(literacy.constraints.createsAccountingSubsystem,false);
  assert.equal(literacy.constraints.createsPricingFormula,false);
  assert.equal(literacy.constraints.createsClientDossier,false);
  assert.equal(literacy.constraints.createsCareerGate,false);
  assert.equal(etiquette.constraints.createsPalacePrivilege,false);
  assert.equal(etiquette.constraints.createsEliteClienteleGate,false);
  assert.equal(etiquette.constraints.createsUniversalStatus,false);
  assert.equal(etiquette.constraints.createsAccessToken,false);
  assert.equal(arts.constraints.createsSexualSceneMechanic,false);
  assert.equal(arts.constraints.createsLustRule,false);
  assert.equal(arts.constraints.createsAutomaticClientOutcome,false);
  assert.equal(arts.constraints.createsCareerTransition,false);
  assert.equal(body.constraints.createsConsentState,false);
  assert.equal(body.constraints.createsLustState,false);
  assert.equal(body.constraints.createsClientState,false);
  assert.equal(body.constraints.createsForcedNightRule,false);
});

test('C5-227 RU EN result journal accessibility preserve locale-neutral prep identity',()=>{
  for(const fixture of fixtures){
    const identity=JSON.stringify({
      courseId:fixture.courseId,
      trackId:fixture.trackId,
      teacherContentId:fixture.teacherContentId,
      futureConsumerStatus:fixture.futureConsumerStatus,
      threshold:fixture.threshold,
      publicFactId:fixture.publicFactId
    });
    for(const locale of ['ru','en']){
      assert.ok(fixture.copy.result[locale].trim());
      assert.ok(fixture.copy.journal[locale].trim());
      assert.ok(fixture.copy.accessibility[locale].trim());
      assert.equal(JSON.stringify({
        courseId:fixture.courseId,
        trackId:fixture.trackId,
        teacherContentId:fixture.teacherContentId,
        futureConsumerStatus:fixture.futureConsumerStatus,
        threshold:fixture.threshold,
        publicFactId:fixture.publicFactId
      }),identity,fixture.id+' '+locale);
    }
  }
});
