import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const source=JSON.parse(readFileSync('content/prostitute-authored-copy-v21.fixture.json','utf8'));
const loc=JSON.parse(readFileSync('content/prostitute-authored-v21-localization-prep.fixture.json','utf8'));
const binding=JSON.parse(readFileSync('content/prostitute-authored-v21-binding-plan.fixture.json','utf8'));
const defs=JSON.parse(readFileSync('content/definitions.json','utf8'));
const rootLoc=JSON.parse(readFileSync('content/localization.json','utf8'));
const school=JSON.parse(readFileSync('content/school-prostitute-preparation-v1.fixture.json','utf8'));

const byTask=(id:string)=>source.entries.filter((x:any)=>x.task===id);
const byKey=(key:string)=>source.entries.find((x:any)=>x.contentKey===key);
const bind=(key:string)=>binding.entries.find((x:any)=>x.contentKey===key);

test('C3-230..239 source is deterministic bilingual neutral prep',()=>{
  assert.equal(source.status,'SAFE_PREP_ONLY_NEUTRAL_NON_GRAPHIC');
  assert.ok(source.entries.length>=75);
  assert.equal(new Set(source.entries.map((x:any)=>x.contentKey)).size,source.entries.length);
  for(const e of source.entries){
    assert.match(e.task,/^C3-23[0-9]$/);
    assert.ok(e.ru.length>40,e.contentKey+' ru');
    assert.ok(e.en.length>40,e.contentKey+' en');
  }
  assert.equal(source.contentPolicy.adultIntimacyIsCore,true);
  assert.equal(source.contentPolicy.graphicEroticProse,false);
  assert.equal(source.contentPolicy.exactLustThreshold,'PENDING_RUNTIME_ID');
  assert.equal(source.contentPolicy.exactPartnerIdentities,'PENDING_RUNTIME_ID');
  assert.equal(source.contentPolicy.exactConsentMechanics,'PENDING_RUNTIME_ID');
});

test('C3-230 ordinary work covers the full queue breadth without pricing mechanics',()=>{
  const keys=new Set(byTask('C3-230').map((x:any)=>x.contentKey));
  for(const key of ['client-intake.arrival','terms.clarity','boundaries.restate','recurring-client.continuity','difficult-request.pause','refusal.close','safety.check-in','competition.positioning','reputation.follow-through','high-status.booking','payment.admin'])assert.ok(keys.has(key),key);
  assert.equal(source.invariants.changesPricingOrEconomyEngine,false);
});

test('C3-231 seasonal breadth covers travelers, festivals, elite visitors, regular winter pressure and housing context',()=>{
  const keys=new Set(byTask('C3-231').map((x:any)=>x.contentKey));
  for(const key of ['spring.travelers','summer.festival','summer.high-demand','autumn.elite-visitors','winter.regular-pressure','winter.housing-context'])assert.ok(keys.has(key),key);
});

test('C3-232 adult/intimacy is core authored breadth but every new work consumer remains pending',()=>{
  assert.ok(byTask('C3-232').length>=8);
  for(const e of byTask('C3-232'))assert.equal(bind(e.contentKey).status,'PENDING_RUNTIME_ID',e.contentKey);
  assert.match(byKey('adult.boundary-preserved').en,/desire.*professional role.*Lust routing.*consent/i);
});

test('C3-233 voluntary Night remains separate from Secret Debt forced-night',()=>{
  for(const e of byTask('C3-233')){
    const b=bind(e.contentKey);
    if(e.contentKey==='night.secret-debt-firewall')assert.equal(b.status,'NO_AUTHORITY_NOT_BINDABLE');
    else assert.equal(b.status,'PENDING_RUNTIME_ID');
  }
  assert.match(byKey('night.no-auto-consumption').en,/does not imply automatic consumption/i);
  assert.equal(source.invariants.changesNightFlow,false);
});

test('C3-234 recurring client and relationship roles never imply automatic romance',()=>{
  const keys=new Set(byTask('C3-234').map((x:any)=>x.contentKey));
  for(const key of ['relationship.recurring-client-professional','relationship.colleague','relationship.manager-landlord','relationship.protector-contact','relationship.rival','relationship.no-auto-romance'])assert.ok(keys.has(key),key);
  assert.match(byKey('relationship.no-auto-romance').en,/No recurring client.*automatically/i);
});

test('C3-235 route families remain distinct and future-bound',()=>{
  const routeKeys=['route.veteran','route.independent-house','route.elite-clientele','route.network-protection','route.outcome-ready'];
  for(const key of routeKeys)assert.equal(bind(key).status,'PENDING_RUNTIME_ID',key);
  assert.match(byKey('route.hard-work-independent').en,/Hard Work remains an independent shipped outcome/i);
});

test('C3-236 item meanings create no universal state',()=>{
  for(const key of ['item.formal-attire','item.private-room-key','item.contract-token','item.evidence-document'])assert.equal(bind(key).status,'PENDING_RUNTIME_ID',key);
  assert.match(byKey('item.no-universal-status').en,/global reputation.*consent.*Lust threshold.*Palace access.*ending eligibility/i);
});

test('C3-237 uses only exact existing School courses and preserves null producer authority',()=>{
  assert.deepEqual(school.mappings.map((x:any)=>x.courseId),[
    'school.course.rhetoric_and_social',
    'school.course.literacy_and_numbers',
    'school.course.etiquette_and_presentation',
    'school.course.arts_and_performance',
    'school.course.body_confidence',
  ]);
  assert.equal(school.selectedThreshold,null);
  assert.equal(school.selectedPublicFactId,null);
  assert.equal(bind('school.no-producer-authority').status,'NO_AUTHORITY_NOT_BINDABLE');
  assert.match(byKey('school.body-confidence').en,/not consent/i);
});

test('C3-238 cross-system inputs are exact shipped identities and Palace remains unbound',()=>{
  const actionIds=new Set(defs.actions.map((x:any)=>x.id));
  const relIds=new Set(defs.relationships.map((x:any)=>x.id));
  const nightIds=new Set(defs.nightChoices.map((x:any)=>x.id));
  const itemById=new Map<string,any>(defs.itemDefinitions.map((x:any)=>[x.id,x]));
  for(const id of ['satyr-maid.shift','artist-geisha.shift','tavern.shift','guard.shift','merchant.shift'])assert.ok(actionIds.has(id),id);
  for(const id of ['satyr-maid.recurring-guest','tavern.recurring-traveler','guard.partner','merchant.supplier'])assert.ok(relIds.has(id),id);
  for(const id of ['satyr-maid.night.recurring-guest','satyr-maid.night.staff-debrief','tavern.night.traveler-request','tavern.night.house-notes'])assert.ok(nightIds.has(id),id);
  assert.deepEqual(itemById.get('tavern_staff_key')?.capabilities,['access_guest_rooms_staff']);
  assert.deepEqual(itemById.get('guard_badge')?.capabilities,['official_guard_access']);
  assert.deepEqual(itemById.get('guard_sealed_pass')?.capabilities,['guard_sealed_pass']);
  assert.deepEqual(itemById.get('merchant_appraisal_scales')?.capabilities,['merchant_appraise_goods']);
  assert.equal(defs.actions.some((x:any)=>x.id.includes('palace')),false);
  assert.equal(defs.careers.some((x:any)=>x.id.includes('palace')),false);
  assert.equal(defs.itemDefinitions.some((x:any)=>x.id.includes('palace')),false);
  assert.equal(bind('cross.palace-no-authority').status,'NO_AUTHORITY_NOT_BINDABLE');
});

test('C3-239 keeps only shipped Hard Work live while all new payoff consumers remain pending or forbidden',()=>{
  assert.equal(bind('ending.hard-work-live').status,'LIVE_BOUND');
  assert.equal(bind('ending.hard-work-live').runtimeConsumerId,'ending.prostitute.hard-work');
  for(const key of ['ending.hard-work-adult-payoff','ending.house-payoff','ending.elite-payoff','ending.network-payoff','ending.non-killing-adult-planning'])assert.equal(bind(key).status,'PENDING_RUNTIME_ID',key);
  assert.equal(bind('ending.no-public-id').status,'NO_AUTHORITY_NOT_BINDABLE');
  assert.equal(bind('ending.no-meta-authority').status,'NO_AUTHORITY_NOT_BINDABLE');
  assert.equal(source.invariants.changesEndingEligibilityRewardOrMeta,false);
});

test('C3-240 localization prep is one-to-one, collision-free and does not touch root localization',()=>{
  assert.equal(loc.status,'PREPARED_KEYS_ONLY_NOT_ROOT_LOCALIZATION');
  assert.equal(loc.count,source.entries.length);
  assert.equal(loc.entries.length,source.entries.length);
  assert.equal(new Set(loc.entries.map((x:any)=>x.localizationKey)).size,loc.entries.length);
  for(const e of loc.entries){
    const src=byKey(e.contentKey);
    assert.equal(e.ru,src.ru,e.contentKey+' ru');
    assert.equal(e.en,src.en,e.contentKey+' en');
    assert.equal(rootLoc.strings[e.localizationKey],undefined,e.localizationKey+' root collision');
  }
  assert.equal(loc.rootCollisionCount,0);
  assert.equal(source.invariants.changesProductionLocalization,false);
});
