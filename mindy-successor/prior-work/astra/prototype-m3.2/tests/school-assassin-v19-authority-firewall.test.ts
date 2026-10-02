import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const authority=JSON.parse(readFileSync('content/school-assassin-v19-authority.fixture.json','utf8'));
const inventory=JSON.parse(readFileSync('content/school-assassin-v19-live-inventory.fixture.json','utf8'));
const prep=JSON.parse(readFileSync('content/school-assassin-preparation-v1.fixture.json','utf8'));
const reactive=JSON.parse(readFileSync('content/school-assassin-reactive-depth-v1.fixture.json','utf8'));
const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const teachers=JSON.parse(readFileSync('content/packs/school-teachers-v1.json','utf8'));
const schoolSource=readFileSync('src/core/school.ts','utf8');

test('C5-211 re-audit keeps historical Assassin fixtures as content prep and confirms only ordinary shipped action identity',()=>{
  assert.equal(prep.status,'CONTENT_PREP_ONLY');
  assert.equal(prep.mappingAuthority,'CAPABILITY_MATCH_ONLY');
  assert.equal(prep.selectedThreshold,null);
  assert.equal(prep.selectedPublicFactId,null);
  assert.equal(reactive.status,'CONTENT_PREP_ONLY');
  assert.equal(reactive.mappingAuthority,'CAPABILITY_MATCH_ONLY');
  assert.equal(reactive.selectedThreshold,null);
  assert.equal(reactive.selectedPublicFactId,null);

  assert.equal(authority.sourceAudit.preparationFixture.blob,'138a3867d2480b8fa274feb12d8d9fdd9a4c6840');
  assert.equal(authority.sourceAudit.reactiveFixture.blob,'b6e08c5ae5f47023dd0bd00b5e46108f43a69fe7');
  assert.equal(authority.sourceAudit.careerDraft.canonicalRuntimeAuthority,false);
  assert.equal(authority.sourceAudit.careerDraft.canonicalSchoolSection,false);

  const action=definitions.actions.find((x:any)=>x.id==='assassin.shift');
  assert.ok(action);
  assert.equal(action.cost.energy,1);
  assert.equal(authority.sourceAudit.runtimeObservation.assassinPackCount,0);
  assert.equal(authority.sourceAudit.runtimeObservation.schoolConsumerContract,null);
});

test('C5-212/C5-213 producer matrix stays null and immediate Resolver Night-study stay unbound',()=>{
  assert.equal(authority.producerAuthority.numericThresholdAuthorized,false);
  assert.equal(authority.producerAuthority.publicFactAuthorized,false);
  assert.equal(authority.producerAuthority.consumerIdsAuthorized,false);
  assert.equal(authority.producerAuthority.threshold,null);
  assert.equal(authority.producerAuthority.publicFactId,null);

  for(const mapping of authority.mappings){
    assert.equal(mapping.futureConsumerStatus,'PENDING_RUNTIME_ID',mapping.trackId);
    assert.equal(mapping.threshold,null,mapping.trackId);
    assert.equal(mapping.publicFactId,null,mapping.trackId);
    assert.equal(mapping.immediateResolverStatus,'UNBOUND_NO_AUTHORITY',mapping.trackId);
    assert.equal(mapping.nightParityStatus,'UNBOUND_NO_AUTHORITY',mapping.trackId);
  }
});

test('C5-205 teacher media continuity reuses Rowan Cassian Eliane Mara and Tovan exactly',()=>{
  assert.deepEqual(authority.mappings.map((x:any)=>x.teacherContentId),[
    'school.teacher.rowan-pike',
    'school.teacher.cassian-reed',
    'school.teacher.eliane-marrow',
    'school.teacher.mara-fen',
    'school.teacher.tovan-kest'
  ]);
  for(const mapping of authority.mappings){
    assert.ok(teachers.media.some((x:any)=>x.id===mapping.teacherMediaId),mapping.teacherMediaId);
  }
});

test('C5-214 Guard Activity Palace target and lethal-nonlethal ownership firewall remains closed',()=>{
  for(const value of Object.values(authority.forbiddenOwnership))assert.equal(value,false);
  assert.equal(schoolSource.includes('assassin.school.'),false);
  assert.equal(inventory.authority.selectedThreshold,null);
  assert.equal(inventory.authority.selectedPublicFactId,null);
  assert.equal(inventory.authority.canonicalSchoolSection,false);
});

test('C5-216 safe prep manifest keeps every future consumer pending and refuses production freeze semantics',()=>{
  assert.equal(authority.status,'SAFE_PREP_ONLY_UNBOUND');
  assert.equal(authority.futureAcceptanceDesign.consumerReactionExpectation,'PENDING_RUNTIME_ID');
  assert.equal(authority.futureAcceptanceDesign.producerFactExpectation,'UNBOUND_NO_AUTHORITY');
  assert.equal(authority.futureAcceptanceDesign.saveReloadRequired,true);
  assert.equal(authority.mappings.every((x:any)=>x.futureConsumerStatus==='PENDING_RUNTIME_ID'),true);
  assert.equal(inventory.mappings.every((x:any)=>x.futureConsumer==='PENDING_RUNTIME_ID'),true);
});
