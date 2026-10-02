import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const authority=JSON.parse(readFileSync('content/school-prostitute-v20-authority.fixture.json','utf8'));
const inventory=JSON.parse(readFileSync('content/school-prostitute-v20-live-inventory.fixture.json','utf8'));
const prep=JSON.parse(readFileSync('content/school-prostitute-preparation-v1.fixture.json','utf8'));
const reactive=JSON.parse(readFileSync('content/school-prostitute-reactive-depth-v1.fixture.json','utf8'));
const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const teachers=JSON.parse(readFileSync('content/packs/school-teachers-v1.json','utf8'));
const schoolSource=readFileSync('src/core/school.ts','utf8');

test('C5-217/C5-224 re-audit keeps old fixtures prep-only and producer authority null',()=>{
  assert.equal(prep.status,'CONTENT_PREP_ONLY');
  assert.equal(prep.selectedThreshold,null);
  assert.equal(prep.selectedPublicFactId,null);
  assert.equal(reactive.status,'CONTENT_PREP_ONLY');
  assert.equal(reactive.selectedThreshold,null);
  assert.equal(reactive.selectedPublicFactId,null);
  assert.equal(authority.sourceAudit.preparationFixture.blob,'e649a2edbb8a0bdc7fc3b5fad9cbd4e2ecec79c3');
  assert.equal(authority.sourceAudit.reactiveFixture.blob,'82e8e1cd3963ae16b5927867d6c1ef380fac8791');
  assert.equal(authority.sourceAudit.careerDraft.canonicalRuntimeAuthority,false);
  assert.equal(authority.sourceAudit.careerDraft.canonicalSchoolConsumerContract,false);

  const action=definitions.actions.find((x:any)=>x.id==='prostitute.shift');
  assert.ok(action);
  assert.equal(action.cost.energy,1);
  assert.equal(authority.sourceAudit.runtimeObservation.voluntaryOrdinaryCareer,true);
  assert.equal(authority.sourceAudit.runtimeObservation.prostitutePackCount,0);
  assert.equal(authority.sourceAudit.runtimeObservation.schoolConsumerContract,null);

  assert.equal(authority.producerAuthority.numericThresholdAuthorized,false);
  assert.equal(authority.producerAuthority.publicFactAuthorized,false);
  assert.equal(authority.producerAuthority.consumerIdsAuthorized,false);
  assert.equal(authority.producerAuthority.threshold,null);
  assert.equal(authority.producerAuthority.publicFactId,null);
});

test('C5-217 exact teacher/media continuity is Cassian Mara Eliane Nessa Sera',()=>{
  assert.deepEqual(authority.mappings.map((x:any)=>x.teacherContentId),[
    'school.teacher.cassian-reed',
    'school.teacher.mara-fen',
    'school.teacher.eliane-marrow',
    'school.teacher.nessa-lark',
    'school.teacher.sera-vey'
  ]);
  for(const mapping of authority.mappings){
    assert.ok(teachers.media.some((x:any)=>x.id===mapping.teacherMediaId),mapping.teacherMediaId);
  }
});

test('C5-223 voluntary ordinary career never inherits Secret Debt ownership from School prep',()=>{
  for(const value of Object.values(authority.voluntarySecretDebtFirewall))assert.equal(value,false);
  for(const value of Object.values(authority.forbiddenOwnership))assert.equal(value,false);
  assert.equal(inventory.authority.canonicalSchoolConsumerContract,false);
  assert.equal(inventory.authority.selectedThreshold,null);
  assert.equal(inventory.authority.selectedPublicFactId,null);
  assert.equal(schoolSource.includes('prostitute.shift'),false);
});

test('C5-225 immediate Resolver and Night-study parity remain unbound without runtime consumer/producer authority',()=>{
  for(const mapping of authority.mappings){
    assert.equal(mapping.futureConsumerStatus,'PENDING_RUNTIME_ID',mapping.trackId);
    assert.equal(mapping.threshold,null,mapping.trackId);
    assert.equal(mapping.publicFactId,null,mapping.trackId);
    assert.equal(mapping.immediateResolverStatus,'UNBOUND_NO_AUTHORITY',mapping.trackId);
    assert.equal(mapping.nightParityStatus,'UNBOUND_NO_AUTHORITY',mapping.trackId);
  }
});

test('C5-226 School creates no client relationship consent romance patronage exploitation or pricing state',()=>{
  for(const value of Object.values(authority.relationshipClientBoundary))assert.equal(value,false);
});

test('C5-228 safe manifest leaves every future consumer pending and production freeze unauthorized',()=>{
  assert.equal(authority.status,'SAFE_PREP_ONLY_UNBOUND');
  assert.equal(authority.futureAcceptanceDesign.consumerReactionExpectation,'PENDING_RUNTIME_ID');
  assert.equal(authority.futureAcceptanceDesign.producerFactExpectation,'UNBOUND_NO_AUTHORITY');
  assert.equal(authority.futureAcceptanceDesign.saveReloadRequired,true);
  assert.equal(authority.mappings.every((x:any)=>x.futureConsumerStatus==='PENDING_RUNTIME_ID'),true);
  assert.equal(inventory.mappings.every((x:any)=>x.futureConsumer==='PENDING_RUNTIME_ID'),true);
});
