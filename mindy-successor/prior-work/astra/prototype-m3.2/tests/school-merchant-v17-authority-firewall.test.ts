import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const authority=JSON.parse(readFileSync('content/school-merchant-v17-runtime-authority.fixture.json','utf8'));
const inventory=JSON.parse(readFileSync('content/school-merchant-v17-live-inventory.fixture.json','utf8'));
const teachers=JSON.parse(readFileSync('content/packs/school-teachers-v1.json','utf8'));
const schoolSource=readFileSync('src/core/school.ts','utf8');
const packs=[
  JSON.parse(readFileSync('content/packs/merchant-routes.json','utf8')),
  JSON.parse(readFileSync('content/packs/merchant-relationship.json','utf8')),
  JSON.parse(readFileSync('content/packs/merchant-trade.json','utf8'))
];

function event(id:string){
  for(const pack of packs){
    const found=pack.events?.find((x:any)=>x.id===id);
    if(found)return found;
  }
  return undefined;
}

test('C5-186 binds exact frozen Merchant consumers and their real School-fact conditions without inventing producer authority',()=>{
  assert.equal(authority.runtimeContract.head,'88422257f618c7182dd6d1f3eca7596c9972eb0a');
  assert.equal(authority.runtimeContract.contractBlob,'31e353c0284700ff29d658fff9c1032193c0e563');
  assert.equal(authority.runtimeContract.schoolAuthorityBlob,'0d19348e952717b04f12eff9a95c2d82c750983c');
  assert.equal(authority.runtimeContract.status,'C1D_168_FROZEN_GREEN');
  assert.equal(authority.runtimeContract.workflow.runNumber,898);
  assert.equal(authority.runtimeContract.workflow.result,'SUCCESS');
  assert.equal(authority.bindingRule.producerThresholdAuthorized,false);
  assert.equal(authority.bindingRule.publicProducerFactAuthorized,false);
  assert.equal(authority.bindingRule.dummyMerchantShiftAllowed,false);
  assert.equal(authority.bindingRule.extraDaytimeEnergyAllowed,false);

  assert.deepEqual(authority.hooks.map((x:any)=>[
    x.trackId,x.merchantFactId,x.selectedPublicFactId,x.consumerEventId,x.producerThreshold,
    x.consumerSchoolFactTrigger,x.consumerSchoolFactCondition,x.schoolMethodChoiceId,x.immediateResolverStatus
  ]),[
    ['school.track.literacy_and_numbers','school-literacy-ready',null,'merchant.routes.house-ready',null,true,true,null,'BLOCKED_NO_PRODUCER_AUTHORITY'],
    ['school.track.rhetoric_and_social','school-rhetoric-ready',null,'merchant.relationship.trust',null,false,false,'apply-rhetoric-method','BLOCKED_NO_PRODUCER_AUTHORITY'],
    ['school.track.etiquette_and_presentation','school-etiquette-ready',null,null,null,false,false,null,'BLOCKED_NO_CONSUMER_OR_PRODUCER_AUTHORITY'],
    ['school.track.arcana','school-arcana-ready',null,'merchant.trade.appraisal',null,false,false,'apply-arcana-method','BLOCKED_NO_PRODUCER_AUTHORITY']
  ]);

  const literacy=event('merchant.routes.house-ready');
  assert.ok(literacy);
  assert.ok(literacy.reactionTriggers.some((x:any)=>x.kind==='careerFactAdded'&&x.career==='merchant'&&x.fact==='school-literacy-ready'));
  assert.ok(literacy.conditions.some((x:any)=>x.kind==='careerFact'&&x.career==='merchant'&&x.fact==='school-literacy-ready'&&x.present===true));

  const rhetoric=event('merchant.relationship.trust');
  assert.ok(rhetoric);
  assert.equal(rhetoric.reactionTriggers.some((x:any)=>x.kind==='careerFactAdded'&&x.fact==='school-rhetoric-ready'),false);
  assert.equal(rhetoric.conditions.some((x:any)=>x.kind==='careerFact'&&x.fact==='school-rhetoric-ready'),false);
  assert.ok(rhetoric.choices.some((x:any)=>x.id==='apply-rhetoric-method'));

  const arcana=event('merchant.trade.appraisal');
  assert.ok(arcana);
  assert.equal(arcana.reactionTriggers.some((x:any)=>x.kind==='careerFactAdded'&&x.fact==='school-arcana-ready'),false);
  assert.equal(arcana.conditions.some((x:any)=>x.kind==='careerFact'&&x.fact==='school-arcana-ready'),false);
  assert.ok(arcana.choices.some((x:any)=>x.id==='apply-arcana-method'));
});

test('C5-187 frozen runtime keeps explicit negative Night-study parity while producer threshold and public fact remain null',()=>{
  assert.deepEqual(authority.hooks.map((x:any)=>x.nightParityStatus),[
    'BLOCKED_NO_PRODUCER_AUTHORITY',
    'BLOCKED_NO_PRODUCER_AUTHORITY',
    'BLOCKED_NO_CONSUMER_OR_PRODUCER_AUTHORITY',
    'BLOCKED_NO_PRODUCER_AUTHORITY'
  ]);
  for(const hook of authority.hooks){
    assert.equal(hook.producerThreshold,null,hook.trackId);
    assert.equal(hook.selectedPublicFactId,null,hook.trackId);
  }
});

test('C5-188 reuses exactly Mara Cassian Eliane and Ilyra with existing media',()=>{
  assert.deepEqual(authority.hooks.map((x:any)=>x.teacherContentId),[
    'school.teacher.mara-fen',
    'school.teacher.cassian-reed',
    'school.teacher.eliane-marrow',
    'school.teacher.ilyra-venn'
  ]);
  for(const hook of authority.hooks){
    assert.ok(teachers.media.some((x:any)=>x.id===hook.teacherMediaId),hook.teacherMediaId);
  }
});

test('C5-190 Merchant School source keeps economy global policy curriculum and career transition ownership outside School',()=>{
  for(const value of Object.values(authority.firewall))assert.equal(value,false);
  assert.equal(inventory.localHookPolicy.globalCertificateRule,false);
  assert.equal(inventory.localHookPolicy.globalProjectRule,false);
  assert.equal(inventory.localHookPolicy.directCareerTransition,false);
  assert.equal(schoolSource.includes('merchant.routes.house-ready'),false);
  assert.equal(schoolSource.includes('merchant.relationship.trust'),false);
  assert.equal(schoolSource.includes('merchant.trade.appraisal'),false);
  assert.equal(schoolSource.includes('school-literacy-ready'),false);
  assert.equal(schoolSource.includes('school-rhetoric-ready'),false);
  assert.equal(schoolSource.includes('school-etiquette-ready'),false);
  assert.equal(schoolSource.includes('school-arcana-ready'),false);
});
