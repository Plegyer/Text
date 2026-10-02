import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const fixtures=[
  'school-artist-geisha-v18-arts.fixture.json',
  'school-artist-geisha-v18-etiquette.fixture.json',
  'school-artist-geisha-v18-rhetoric.fixture.json',
  'school-artist-geisha-v18-body-confidence.fixture.json',
  'school-artist-geisha-v18-literacy.fixture.json'
].map(name=>JSON.parse(readFileSync('content/'+name,'utf8')));

test('C5-194..198 Artist School source is complete RU EN on exact frozen runtime authority',()=>{
  assert.deepEqual(fixtures.map(x=>x.task),['C5-194','C5-195','C5-196','C5-197','C5-198']);
  assert.deepEqual(fixtures.map(x=>x.courseId),[
    'school.course.arts_and_performance',
    'school.course.etiquette_and_presentation',
    'school.course.rhetoric_and_social',
    'school.course.body_confidence',
    'school.course.literacy_and_numbers'
  ]);
  assert.deepEqual(fixtures.map(x=>x.consumerEventId),[
    'artist-geisha.routes.master-ready',
    'artist-geisha.routes.court-ready',
    'artist-geisha.relationship.trust',
    'artist-geisha.season.autumn-festival',
    'artist-geisha.routes.master-ready'
  ]);

  for(const fixture of fixtures){
    assert.equal(fixture.runtimeContract.head,'955f4accf7e25c42e0384ddb9f76e5612f41dd00',fixture.id);
    assert.equal(fixture.runtimeContract.contractBlob,'1cda9f558b8a7c0e0f113904f99ce0acd4b1e791',fixture.id);
    assert.equal(fixture.runtimeContract.schoolAuthorityBlob,'87f9d6dd039bcf9579dd4e832071ab1db1de8440',fixture.id);
    assert.equal(fixture.runtimeContract.status,'C1D_180_FROZEN_GREEN',fixture.id);
    assert.equal(fixture.bindingStatus,'C1D_180_FROZEN_CONSUMER_AUTHORITY_PRODUCER_BLOCKED',fixture.id);
    assert.equal(fixture.selectedPublicFactId,null,fixture.id);
    assert.equal(fixture.localThreshold.value,null,fixture.id);
    assert.equal(fixture.localThreshold.scope,'artist-geisha-only',fixture.id);
    for(const field of ['title','body','result','journal','accessibility']){
      const pair=fixture.copy[field];
      assert.ok(pair?.ru?.trim(),fixture.id+' '+field+' ru');
      assert.ok(pair?.en?.trim(),fixture.id+' '+field+' en');
      assert.notEqual(pair.ru,pair.en,fixture.id+' '+field);
    }
    assert.equal(fixture.constraints.createsDirectCareerTransition,false,fixture.id);
    assert.equal(fixture.constraints.publishesGlobalCertificate,false,fixture.id);
    assert.equal(fixture.constraints.publishesGlobalProject,false,fixture.id);
  }
});

test('C5-194..198 scope-specific source constraints preserve unresolved design boundaries',()=>{
  const [arts,etiquette,rhetoric,body,literacy]=fixtures;
  assert.equal(arts.constraints.createsSpecializedArtCurriculum,false);
  assert.equal(arts.constraints.createsContestSubsystem,false);
  assert.equal(etiquette.constraints.createsPalaceAccess,false);
  assert.equal(etiquette.constraints.createsCourtInvitationEligibility,false);
  assert.equal(etiquette.constraints.bypassesPalaceHardWorkRequirement,false);
  assert.equal(etiquette.constraints.createsUniversalStatus,false);
  assert.equal(etiquette.constraints.createsReputationSystem,false);
  assert.equal(rhetoric.constraints.createsPatronSystem,false);
  assert.equal(rhetoric.constraints.createsRelationshipMechanics,false);
  assert.equal(rhetoric.constraints.guaranteesInfluence,false);
  assert.equal(body.constraints.createsConsentMechanic,false);
  assert.equal(body.constraints.createsLustState,false);
  assert.equal(body.constraints.createsProstituteCareerState,false);
  assert.equal(body.constraints.createsNewSexualityMechanic,false);
  assert.equal(literacy.constraints.createsHistoryCurriculum,false);
  assert.equal(literacy.constraints.createsMusicCurriculum,false);
  assert.equal(literacy.constraints.createsDanceCurriculum,false);
  assert.equal(literacy.constraints.createsCraftCurriculum,false);
});

test('C5-203/C5-204 RU EN result journal accessibility stay presentation-only on frozen identities',()=>{
  for(const fixture of fixtures){
    const identity=JSON.stringify({
      id:fixture.id,courseId:fixture.courseId,trackId:fixture.trackId,
      artistFactId:fixture.artistFactId,selectedPublicFactId:fixture.selectedPublicFactId,
      consumerEventId:fixture.consumerEventId,threshold:fixture.localThreshold.value
    });
    for(const locale of ['ru','en']){
      assert.ok(fixture.copy.result[locale].trim());
      assert.ok(fixture.copy.journal[locale].trim());
      assert.ok(fixture.copy.accessibility[locale].trim());
      assert.equal(JSON.stringify({
        id:fixture.id,courseId:fixture.courseId,trackId:fixture.trackId,
        artistFactId:fixture.artistFactId,selectedPublicFactId:fixture.selectedPublicFactId,
        consumerEventId:fixture.consumerEventId,threshold:fixture.localThreshold.value
      }),identity,fixture.id+' '+locale);
    }
  }
});
