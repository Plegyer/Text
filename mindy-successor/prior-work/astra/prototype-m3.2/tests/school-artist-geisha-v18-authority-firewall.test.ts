import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const authority=JSON.parse(readFileSync('content/school-artist-geisha-v18-runtime-authority.fixture.json','utf8'));
const inventory=JSON.parse(readFileSync('content/school-artist-geisha-v18-live-inventory.fixture.json','utf8'));
const teachers=JSON.parse(readFileSync('content/packs/school-teachers-v1.json','utf8'));
const schoolSource=readFileSync('src/core/school.ts','utf8');
const packs=[
  JSON.parse(readFileSync('content/packs/artist-geisha-routes.json','utf8')),
  JSON.parse(readFileSync('content/packs/artist-geisha-relationship.json','utf8')),
  JSON.parse(readFileSync('content/packs/artist-geisha-season.json','utf8'))
];

function event(id:string){
  for(const pack of packs){
    const found=pack.events?.find((x:any)=>x.id===id);
    if(found)return found;
  }
  return undefined;
}

test('C5-199/C5-204 binds exact frozen Artist consumer seams without inventing producer authority',()=>{
  assert.equal(authority.runtimeContract.head,'955f4accf7e25c42e0384ddb9f76e5612f41dd00');
  assert.equal(authority.runtimeContract.contractBlob,'1cda9f558b8a7c0e0f113904f99ce0acd4b1e791');
  assert.equal(authority.runtimeContract.schoolAuthorityBlob,'87f9d6dd039bcf9579dd4e832071ab1db1de8440');
  assert.equal(authority.runtimeContract.status,'C1D_180_FROZEN_GREEN');
  assert.equal(authority.runtimeContract.workflow.runNumber,978);
  assert.equal(authority.runtimeContract.workflow.result,'SUCCESS');
  assert.equal(authority.producerAuthority.thresholdAuthorized,false);
  assert.equal(authority.producerAuthority.publicProducerFactAuthorized,false);

  assert.deepEqual(authority.hooks.map((x:any)=>[
    x.courseId,x.artistFactId,x.selectedPublicFactId,x.consumerEventId,x.producerThreshold,
    x.liveEvent,x.consumerSchoolFactTrigger,x.consumerSchoolFactCondition,x.immediateResolverStatus
  ]),[
    ['school.course.arts_and_performance','school-arts-ready',null,'artist-geisha.routes.master-ready',null,true,true,true,'BLOCKED_PRODUCER_AUTHORITY_ONLY'],
    ['school.course.etiquette_and_presentation','school-etiquette-ready',null,'artist-geisha.routes.court-ready',null,true,true,true,'BLOCKED_PRODUCER_AUTHORITY_ONLY'],
    ['school.course.rhetoric_and_social','school-rhetoric-ready',null,'artist-geisha.relationship.trust',null,true,false,false,'BLOCKED_NO_SCHOOL_CONDITION_OR_PRODUCER_AUTHORITY'],
    ['school.course.body_confidence','school-body-confidence-ready',null,'artist-geisha.season.autumn-festival',null,true,false,false,'BLOCKED_NO_SCHOOL_CONDITION_OR_PRODUCER_AUTHORITY'],
    ['school.course.literacy_and_numbers','school-literacy-ready',null,'artist-geisha.routes.master-ready',null,true,true,true,'BLOCKED_PRODUCER_AUTHORITY_ONLY']
  ]);

  const master=event('artist-geisha.routes.master-ready');
  assert.ok(master);
  assert.ok(master.reactionTriggers.some((x:any)=>x.kind==='careerFactAdded'&&x.career==='artist-geisha'));
  assert.ok(master.conditions.some((x:any)=>x.kind==='careerFact'&&x.career==='artist-geisha'&&x.fact==='school-arts-ready'&&x.present===true));
  assert.ok(master.conditions.some((x:any)=>x.kind==='careerFact'&&x.career==='artist-geisha'&&x.fact==='school-literacy-ready'&&x.present===true));

  const court=event('artist-geisha.routes.court-ready');
  assert.ok(court);
  assert.ok(court.reactionTriggers.some((x:any)=>x.kind==='careerFactAdded'&&x.career==='artist-geisha'));
  assert.ok(court.conditions.some((x:any)=>x.kind==='careerFact'&&x.career==='artist-geisha'&&x.fact==='school-etiquette-ready'&&x.present===true));

  const rhetoric=event('artist-geisha.relationship.trust');
  assert.ok(rhetoric);
  assert.equal(rhetoric.conditions.some((x:any)=>x.kind==='careerFact'&&x.fact==='school-rhetoric-ready'),false);

  const body=event('artist-geisha.season.autumn-festival');
  assert.ok(body);
  assert.equal(body.conditions.some((x:any)=>x.kind==='careerFact'&&x.fact==='school-body-confidence-ready'),false);
});

test('C5-200 frozen immediate Resolver and Night-study parity remain negative until School producer authority exists',()=>{
  for(const hook of authority.hooks){
    assert.ok(hook.immediateResolverStatus.startsWith('BLOCKED_'),hook.trackId);
    assert.equal(hook.nightParityStatus,'BLOCKED_NO_PRODUCER_AUTHORITY',hook.trackId);
    assert.equal(hook.producerThreshold,null,hook.trackId);
    assert.equal(hook.selectedPublicFactId,null,hook.trackId);
  }
  assert.equal(authority.producerAuthority.dummyArtistShiftAllowed,false);
  assert.equal(authority.producerAuthority.extraDaytimeEnergyAllowed,false);
  assert.equal(authority.producerAuthority.nightFlowRewriteAllowed,false);
});

test('C5-201 reuses exactly Nessa Eliane Cassian Sera and Mara with current media',()=>{
  assert.deepEqual(authority.hooks.map((x:any)=>x.teacherContentId),[
    'school.teacher.nessa-lark','school.teacher.eliane-marrow','school.teacher.cassian-reed','school.teacher.sera-vey','school.teacher.mara-fen'
  ]);
  for(const hook of authority.hooks){
    assert.ok(teachers.media.some((x:any)=>x.id===hook.teacherMediaId),hook.teacherMediaId);
  }
});

test('C5-202 Court Palace and global-policy firewall remains closed on frozen runtime',()=>{
  for(const value of Object.values(authority.courtPalaceFirewall))assert.equal(value,false);
  for(const value of Object.values(authority.contentFirewall))assert.equal(value,false);
  assert.equal(inventory.localHookPolicy.palaceUnlock,false);
  assert.equal(inventory.localHookPolicy.globalCertificateRule,false);
  assert.equal(inventory.localHookPolicy.globalProjectRule,false);
  assert.equal(inventory.localHookPolicy.directCareerTransition,false);
  assert.equal(schoolSource.includes('artist-geisha.routes.court-ready'),false);
  assert.equal(schoolSource.includes('artist-geisha.routes.master-ready'),false);
  assert.equal(schoolSource.includes('school-arts-ready'),false);
  assert.equal(schoolSource.includes('school-etiquette-ready'),false);
  assert.equal(schoolSource.includes('school-rhetoric-ready'),false);
  assert.equal(schoolSource.includes('school-body-confidence-ready'),false);
  assert.equal(schoolSource.includes('school-literacy-ready'),false);
});
