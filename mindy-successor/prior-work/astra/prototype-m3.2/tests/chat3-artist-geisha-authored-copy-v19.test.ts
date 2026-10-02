import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const bank=JSON.parse(readFileSync('content/artist-geisha-authored-copy-v19.fixture.json','utf8'));

const textOf=(row:any)=>row.ru+'\n'+row.en;
const enNegation=/\b(?:no|not|without|does not|do not|cannot|never|neither)\b/i;
const ruNegation=/(?:^|[^\p{L}])(?:не|ни|без)(?:[^\p{L}]|$)/iu;

test('C3-206..214 Artist source bank is bilingual, unique and mechanics-free',()=>{
  assert.equal(bank.status,'LIVE_BOUND_ON_FROZEN_ARTIST_RUNTIME_WITH_AUTHORITY_GAPS');
  assert.equal(bank.invariants.createsGameplayIds,false);
  assert.equal(bank.invariants.changesMechanics,false);
  assert.equal(bank.invariants.changesSaveOrRng,false);
  assert.equal(bank.invariants.changesSchoolProducerAuthority,false);
  assert.equal(bank.invariants.changesEndingEligibilityRewardOrMeta,false);
  assert.equal(bank.invariants.changesNightFlow,false);
  assert.equal(bank.invariants.changesPalaceUnlock,false);
  assert.equal(bank.invariants.createsContestSubsystem,false);
  assert.equal(bank.invariants.createsUniversalReputation,false);
  assert.equal(bank.invariants.createsGenericPatronSystem,false);
  assert.equal(bank.invariants.inventsNpcIdentity,false);
  assert.equal(bank.invariants.inventsSpecializedCurriculum,false);
  assert.equal(bank.invariants.createsFutureCareerSeams,false);
  assert.equal(bank.entries.length,64);

  const keys=bank.entries.map((row:any)=>row.contentKey);
  assert.equal(new Set(keys).size,keys.length,'duplicate Artist authored contentKey');

  for(const row of bank.entries){
    assert.ok(row.ru.trim().length>=70,row.contentKey+' RU');
    assert.ok(row.en.trim().length>=70,row.contentKey+' EN');
    assert.ok(Array.isArray(row.tags),row.contentKey+' tags');
    assert.equal('conditions' in row,false,row.contentKey+' conditions');
    assert.equal('effects' in row,false,row.contentKey+' effects');
    assert.equal('eventId' in row,false,row.contentKey+' eventId');
    assert.equal('actionId' in row,false,row.contentKey+' actionId');
    assert.equal('threshold' in row,false,row.contentKey+' threshold');
    assert.equal('reward' in row,false,row.contentKey+' reward');
  }
});

test('C3-206 ordinary Artist work covers four seasons with three authored concerns each',()=>{
  const rows=bank.entries.filter((x:any)=>x.section==='seasonal');
  assert.equal(rows.length,12);
  for(const season of ['spring','summer','autumn','winter']){
    const seasonRows=rows.filter((x:any)=>x.contentKey.startsWith(season+'.'));
    assert.equal(seasonRows.length,3,season);
  }
  const raw=JSON.stringify(rows);
  for(const term of ['rehearsal','guest','program','performance','partner','festival','salon']){
    assert.match(raw,new RegExp(term,'i'),term);
  }
});

test('C3-207 performance and festival copy stays Artist-local and creates no contest or reputation system',()=>{
  const rows=bank.entries.filter((x:any)=>x.section==='performance');
  assert.equal(rows.length,8);
  for(const key of [
    'program.spring-window','program.summer-evening','program.autumn-festival','program.winter-salon',
    'rehearsal.shared-scene','festival.waiting-room','salon.conversation-transition','performance.no-global-score',
  ]) assert.ok(rows.some((x:any)=>x.contentKey===key),key);

  const boundary=rows.find((x:any)=>x.contentKey==='performance.no-global-score');
  assert.match(boundary.en,enNegation);
  assert.match(boundary.ru,ruNegation);
  assert.doesNotMatch(JSON.stringify(rows),/leaderboard|tournament bracket|ranking points/i);
});

test('C3-208 mentor relationship stays role-only, professional and refusal-safe',()=>{
  const rows=bank.entries.filter((x:any)=>x.section==='relationship');
  assert.equal(rows.length,8);
  for(const key of [
    'mentor.introduction','mentor.trust','mentor.competition','mentor.conflict',
    'mentor.collaboration','mentor.respectful-rivalry','mentor.refusal','mentor.utility',
  ]) assert.ok(rows.some((x:any)=>x.contentKey===key),key);
  const intro=rows.find((x:any)=>x.contentKey==='mentor.introduction');
  assert.match(intro.en,/professional role/i);
  assert.match(intro.en,/name or biography is not required/i);
  const refusal=rows.find((x:any)=>x.contentKey==='mentor.refusal');
  assert.match(refusal.en,/does not close the Artist House/i);
  assert.match(refusal.ru,/не закрывает Artist House/i);
  assert.doesNotMatch(JSON.stringify(rows),/mandatory romance|lover|marriage/i);
});

test('C3-209 School source uses exactly five prepared domains and creates no producer authority',()=>{
  const rows=bank.entries.filter((x:any)=>x.section==='school-boundary');
  assert.deepEqual(rows.map((x:any)=>x.contentKey),[
    'school.arts-performance','school.etiquette','school.rhetoric','school.body-confidence','school.literacy',
  ]);
  const raw=JSON.stringify(rows);
  for(const term of ['Arts & Performance','Etiquette & Presentation','Rhetoric & Social','Body Confidence','Literacy & Numbers']){
    assert.match(raw,new RegExp(term.replace(/[&]/g,'&'),'i'),term);
  }
  assert.doesNotMatch(raw,/school\.course\.|school\.track\.|publicFactId|producerPublicFact/i);
  assert.doesNotMatch(raw,/\bthreshold\s*[:=]?\s*\d|порог\s*[:=]?\s*\d/iu);
  assert.doesNotMatch(raw,/new (?:history|music|dance|craft) course/i);
});

test('C3-210 Artist item meaning stays narrow and never claims status, contest or Palace access',()=>{
  const rows=bank.entries.filter((x:any)=>x.section==='items');
  assert.equal(rows.length,6);
  for(const key of [
    'formal-attire.meaning','formal-attire.choice','performance-kit.meaning',
    'performance-kit.readiness','invitation-token.meaning','items.no-status-system',
  ]) assert.ok(rows.some((x:any)=>x.contentKey===key),key);
  const attire=rows.find((x:any)=>x.contentKey==='formal-attire.meaning');
  assert.match(attire.en,/does not .*open the Palace/i);
  const token=rows.find((x:any)=>x.contentKey==='invitation-token.meaning');
  assert.match(token.en,/does not satisfy the Palace unlock/i);
  const boundary=rows.find((x:any)=>x.contentKey==='items.no-status-system');
  assert.match(boundary.en,enNegation);
  assert.match(boundary.ru,ruNegation);
});

test('C3-211 Night authored opportunities are time competition, not a NightFlow rewrite',()=>{
  const rows=bank.entries.filter((x:any)=>x.section==='night');
  assert.equal(rows.length,6);
  const rehearsal=rows.find((x:any)=>x.contentKey==='night.rehearsal');
  assert.match(rehearsal.en,/existing night choice/i);
  assert.match(rehearsal.en,/adds no new NightFlow/i);
  const free=rows.find((x:any)=>x.contentKey==='night.no-free-action');
  assert.match(free.en,/not a free extra action/i);
  assert.match(free.ru,/не является бесплатным дополнительным действием/i);
});

test('C3-212 cross-system source uses shipped external identities only and leaves Merchant pending',()=>{
  const rows=bank.entries.filter((x:any)=>x.section==='cross-system');
  assert.equal(rows.length,7);
  const expected={
    'cross.lumber-forest-return':['lumber-cross.activity-forest-return','lumber.forest.truth-known'],
    'cross.satyr-network':['careerFact:satyr-maid:personal-network-ready'],
    'cross.undead-sample':['undead-farm.sample.kit-issued'],
    'cross.tavern-rumour':['careerFact:tavern:rumour-confirmed'],
    'cross.hunter-return':['expedition-returned','hunter.career.expedition-qualified'],
    'cross.guard-evidence':['careerFact:guard:cargo-pass-evidence'],
  };
  for(const [key,refs] of Object.entries(expected)){
    const row=rows.find((x:any)=>x.contentKey===key);
    assert.ok(row,key);
    assert.deepEqual(row.sourceRefs,refs,key);
  }
  const merchant=rows.find((x:any)=>x.contentKey==='cross.merchant-delivery');
  assert.deepEqual(merchant.sourceRefs,['careerFact:merchant:delivery-recorded']);
  assert.ok(merchant.tags.includes('shipped-source'));
  assert.match(merchant.en,/narrow material\/delivery seam/i);
  assert.doesNotMatch(JSON.stringify(rows),/assassin\.|prostitute\.|palace\./i);
});

test('C3-213 advanced routes stay distinct and Court Invitation never claims Palace unlock',()=>{
  const rows=bank.entries.filter((x:any)=>x.section==='advanced-route');
  assert.equal(rows.length,12);
  for(const key of [
    'veteran.identity','veteran.readiness','master-artist.identity','master-artist.discipline-boundary',
    'patron-network.identity','patron-network.boundary','court-invitation.identity','court-invitation.token',
    'court-invitation.no-palace-unlock','route.defer','readiness.not-ending','hard-work.boundary',
  ]) assert.ok(rows.some((x:any)=>x.contentKey===key),key);

  const court=rows.find((x:any)=>x.contentKey==='court-invitation.no-palace-unlock');
  assert.match(court.en,/Neither formal attire, invitation, nor court contact replaces the existing Palace 10\/10 Hard Work unlock/i);
  assert.match(court.ru,/не заменяют существующий Palace 10\/10 Hard Work unlock/i);
  const ending=rows.find((x:any)=>x.contentKey==='hard-work.boundary');
  assert.match(ending.en,/ending\.artist-geisha\.hard-work/);
  assert.match(ending.en,/without new ending IDs/i);
});

test('C3-214 authored identity is deterministic across serialization and ordering',()=>{
  const projection=(xs:any[])=>Object.fromEntries(xs.map((row:any)=>[
    row.contentKey,{section:row.section,ru:row.ru,en:row.en,tags:row.tags,sourceRefs:row.sourceRefs??[]},
  ]));
  const serialized=JSON.stringify(bank.entries);
  const reloaded=JSON.parse(serialized);
  assert.deepEqual(projection(reloaded),projection(bank.entries));
  assert.deepEqual(projection([...reloaded].reverse()),projection(bank.entries));
});
