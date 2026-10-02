import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const source=JSON.parse(readFileSync('content/palace-authored-copy-v22.fixture.json','utf8'));
const loc=JSON.parse(readFileSync('content/palace-authored-v22-localization-prep.fixture.json','utf8'));
const binding=JSON.parse(readFileSync('content/palace-authored-v22-binding-plan.fixture.json','utf8'));
const defs=JSON.parse(readFileSync('content/definitions.json','utf8'));
const rootLoc=JSON.parse(readFileSync('content/localization.json','utf8'));
const schoolSource=readFileSync('src/core/school.ts','utf8');
const engineSource=readFileSync('src/core/engine.ts','utf8');

const byTask=(id:string)=>source.entries.filter((x:any)=>x.task===id);
const byKey=(key:string)=>source.entries.find((x:any)=>x.contentKey===key);
const bind=(key:string)=>binding.entries.find((x:any)=>x.contentKey===key);

test('C3-242..251 Palace authored source is deterministic bilingual neutral prep',()=>{
  assert.equal(source.status,'SAFE_PREP_ONLY_ALL_PALACE_CONSUMERS_FUTURE');
  assert.ok(source.entries.length>=70);
  assert.equal(new Set(source.entries.map((x:any)=>x.contentKey)).size,source.entries.length);
  for(const e of source.entries){
    assert.match(e.task,/^C3-24[2-9]$|^C3-25[01]$/);
    assert.ok(e.ru.length>40,e.contentKey+' ru');
    assert.ok(e.en.length>40,e.contentKey+' en');
  }
  assert.equal(source.contentPolicy.palaceUnlockFixedAtTenOrdinaryHardWork,true);
  assert.equal(source.contentPolicy.preUnlockProgressCounterVisible,false);
  assert.equal(source.contentPolicy.neutralNonGraphicDescriptions,true);
});

test('C3-242 discovery hints never expose a progress-card counter or alternate unlock',()=>{
  assert.ok(byTask('C3-242').length>=7);
  assert.match(byKey('hint.no-progress-card').en,/must not turn the Palace into a locked card/i);
  assert.equal(bind('hint.no-progress-card').status,'NO_AUTHORITY_NOT_BINDABLE');
  assert.equal(bind('hint.after-unlock-clear-entry').status,'PENDING_RUNTIME_ID');
});

test('C3-243 repeatable work covers all requested semantic families',()=>{
  const keys=new Set(byTask('C3-243').map((x:any)=>x.contentKey));
  for(const key of ['work.protocol-reception','work.documents-logistics','work.escort','work.negotiation','work.ceremony-prep','work.errands','work.household'])assert.ok(keys.has(key),key);
  for(const e of byTask('C3-243'))assert.equal(bind(e.contentKey).status,'PENDING_RUNTIME_ID',e.contentKey);
});

test('C3-244 all ten ordinary careers use exact metaHardWork legacy inputs and no fabricated public facts',()=>{
  const ordinary=['lumber','satyr-maid','undead-farm','tavern','hunter','guard','merchant','artist-geisha','assassin','prostitute'];
  const legacy=byTask('C3-244').filter((x:any)=>x.metaCondition);
  assert.equal(legacy.length,10);
  assert.deepEqual(legacy.map((x:any)=>x.metaCondition.career),ordinary);
  for(const e of legacy){
    assert.deepEqual(e.metaCondition,{kind:'metaHardWork',career:e.metaCondition.career,present:true});
    assert.deepEqual(e.sourceInputs,[`metaHardWork:${e.metaCondition.career}`]);
    assert.equal(bind(e.contentKey).status,'PENDING_RUNTIME_ID');
  }
  assert.equal(bind('legacy.no-public-fact-invention').status,'NO_AUTHORITY_NOT_BINDABLE');
});

test('C3-245 provisional Palace stages remain authored-only',()=>{
  const keys=byTask('C3-245').map((x:any)=>x.contentKey);
  assert.deepEqual(keys,['stage.outsider-invited','stage.probation','stage.trusted','stage.chosen-sphere','stage.inner-court','stage.outcome-ready']);
  for(const key of keys)assert.equal(bind(key).runtimeConsumerId,'PENDING_RUNTIME_ID',key);
});

test('C3-246 relationship source has professional patron, rival, official/staff contacts and optional romance without ruler ownership',()=>{
  const keys=new Set(byTask('C3-246').map((x:any)=>x.contentKey));
  for(const key of ['relationship.professional-patron','relationship.rival','relationship.official-contact','relationship.staff-contact','relationship.optional-romance','relationship.adult-intimacy-optional'])assert.ok(keys.has(key),key);
  assert.equal(bind('relationship.no-single-ruler').status,'NO_AUTHORITY_NOT_BINDABLE');
  assert.match(byKey('relationship.optional-romance').en,/separate relationship branch/i);
});

test('C3-247 seasonal breadth covers ceremonies receptions supplies taxes delegations rituals and household pressure',()=>{
  const keys=new Set(byTask('C3-247').map((x:any)=>x.contentKey));
  for(const key of ['spring.delegations','spring.supplies','summer.receptions','summer.festival','autumn.taxes-supplies','autumn.ceremony','winter.household-pressure','winter.formal-ritual'])assert.ok(keys.has(key),key);
});

test('C3-248 exact School seams exist, accounting is not invented as a standalone course, and Palace items remain future',()=>{
  for(const id of binding.exactSchoolInputs)assert.ok(schoolSource.includes(`'${id}'`),id);
  assert.equal(schoolSource.includes("'school.course.accounting'"),false);
  assert.equal(bind('school.no-producer-facts').status,'NO_AUTHORITY_NOT_BINDABLE');
  for(const key of ['item.invitation-seal','item.formal-outfit','item.archive-key','item.ceremonial-component','item.proof-document'])assert.equal(bind(key).status,'PENDING_RUNTIME_ID',key);
  assert.equal(defs.itemDefinitions.some((x:any)=>JSON.stringify(x).toLowerCase().includes('palace')),false);
  assert.equal(bind('item.no-current-palace-items').status,'NO_AUTHORITY_NOT_BINDABLE');
});

test('C3-249 Service Life chooses no reward and creates no hardWork:palace authority',()=>{
  for(const e of byTask('C3-249')){
    if(e.contentKey==='service.no-hardwork-meta')assert.equal(bind(e.contentKey).status,'NO_AUTHORITY_NOT_BINDABLE');
    else assert.equal(bind(e.contentKey).status,'PENDING_RUNTIME_ID');
  }
  assert.match(byKey('service.no-hardwork-meta').en,/creates no `hardWork:palace`/i);
  assert.equal(source.invariants.changesHardWorkMeta,false);
  assert.equal(source.invariants.changesEndingEligibilityRewardOrMeta,false);
});

test('C3-250 Court Power invents no office ruler constitution or Meta reward',()=>{
  for(const e of byTask('C3-250')){
    if(e.contentKey==='power.no-office-ruler-reward')assert.equal(bind(e.contentKey).status,'NO_AUTHORITY_NOT_BINDABLE');
    else assert.equal(bind(e.contentKey).status,'PENDING_RUNTIME_ID');
  }
  assert.match(byKey('power.no-office-ruler-reward').en,/remain open/i);
});

test('C3-251 Inner Truth keeps current story.mystery separate and uses exact Activity inputs only as read-only context',()=>{
  assert.equal(engineSource.includes("['story.mystery','story.mystery']"),true);
  assert.equal(bind('truth.story-mystery-boundary').status,'NO_AUTHORITY_NOT_BINDABLE');
  assert.deepEqual(byKey('truth.lumber-forest-input').sourceInputs,['lumber.forest','lumber.forest.truth-known']);
  assert.deepEqual(byKey('truth.hunter-expedition-input').sourceInputs,['hunter.expedition','careerFact:hunter:expedition-returned']);
  assert.equal(bind('truth.no-auto-macro-ending').status,'NO_AUTHORITY_NOT_BINDABLE');
});

test('C3-252 localization prep is one-to-one and collision-free against root localization',()=>{
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
  assert.equal(rootLoc.strings['unlock.palace.label']?.en,'Palace');
});
