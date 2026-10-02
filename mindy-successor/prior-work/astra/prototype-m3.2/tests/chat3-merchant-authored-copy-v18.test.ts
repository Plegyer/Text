import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const bank=JSON.parse(readFileSync('content/merchant-authored-copy-v18.fixture.json','utf8'));
const plan=JSON.parse(readFileSync('content/merchant-authored-v18-binding-plan.fixture.json','utf8'));

const textOf=(row:any)=>row.ru+'\n'+row.en;
const enNegation=/\b(?:no|not|without|does not|do not|cannot|never)\b/i;
const ruNegation=/(?:^|[^\p{L}])(?:не|ни|без)(?:[^\p{L}]|$)/iu;

test('C3-194..203 Merchant source bank is bilingual, unique and mechanics-free',()=>{
  assert.equal(bank.status,'LIVE_BOUND_ON_FROZEN_MERCHANT_RUNTIME_WITH_AUTHORITY_GAP');
  assert.equal(bank.invariants.createsGameplayIds,false);
  assert.equal(bank.invariants.changesMechanics,false);
  assert.equal(bank.invariants.changesEconomy,false);
  assert.equal(bank.invariants.changesEndings,false);
  assert.equal(bank.invariants.changesSchoolMechanics,false);
  assert.equal(bank.invariants.createsPriceEngine,false);
  assert.equal(bank.invariants.createsInventoryCapacity,false);
  assert.equal(bank.invariants.createsCreditOrDebtSystem,false);
  assert.equal(bank.invariants.createsCrimeOrLawSystem,false);
  assert.equal(bank.invariants.createsFutureCareerSeams,false);
  assert.equal(bank.entries.length,73);

  const keys=bank.entries.map((row:any)=>row.contentKey);
  assert.equal(new Set(keys).size,keys.length,'duplicate Merchant authored contentKey');

  for(const row of bank.entries){
    assert.ok(row.ru.trim().length>=60,row.contentKey+' RU');
    assert.ok(row.en.trim().length>=60,row.contentKey+' EN');
    assert.ok(Array.isArray(row.tags),row.contentKey+' tags');
    assert.equal('conditions' in row,false,row.contentKey+' conditions');
    assert.equal('effects' in row,false,row.contentKey+' effects');
    assert.equal('eventId' in row,false,row.contentKey+' eventId');
    assert.equal('actionId' in row,false,row.contentKey+' actionId');
    assert.equal('threshold' in row,false,row.contentKey+' threshold');
    assert.equal('reward' in row,false,row.contentKey+' reward');
    assert.doesNotMatch(row.contentKey,/^(?:merchant|ending|school\.track|hunter\.expedition)\./,row.contentKey+' must stay prose-only');
  }
});

test('C3-194 ordinary Merchant source covers four seasons with distinct work concerns',()=>{
  const rows=bank.entries.filter((x:any)=>x.section==='seasonal');
  assert.equal(rows.length,12);
  for(const season of ['spring','summer','autumn','winter']){
    const seasonRows=rows.filter((x:any)=>x.contentKey.startsWith(season+'.'));
    assert.equal(seasonRows.length,3,season);
  }
  const tags=new Set(rows.flatMap((x:any)=>x.tags));
  for(const required of ['market','appraisal','delivery','records','negotiation']){
    assert.ok(tags.has(required),required);
  }
});

test('C3-195 trade-decision source covers timing, uncertainty, suppliers, manifests, delivery and buyer needs',()=>{
  const rows=bank.entries.filter((x:any)=>x.section==='trade-decision');
  assert.equal(rows.length,12);
  const raw=JSON.stringify(rows);
  for(const term of ['timing','uncertainty','supplier','manifest','delivery','buyer-needs']){
    assert.match(raw,new RegExp(term,'i'),term);
  }
  assert.doesNotMatch(raw,/dynamic[- ]pricing|global price engine/i);
});

test('C3-196 recurring supplier relationship remains professional and refusal-safe',()=>{
  const rows=bank.entries.filter((x:any)=>x.section==='relationship');
  assert.equal(rows.length,8);
  for(const key of [
    'supplier.introduction','supplier.trust','supplier.conflict','supplier.cooperate',
    'supplier.rivalry','supplier.refusal','supplier.utility','supplier.boundary',
  ]) assert.ok(rows.some((x:any)=>x.contentKey===key),key);

  const refusal=rows.find((x:any)=>x.contentKey==='supplier.refusal');
  assert.match(refusal.en,/ordinary Merchant shifts continue/i);
  assert.match(refusal.ru,/обычные смены Merchant продолжаются/i);

  const raw=JSON.stringify(rows);
  assert.doesNotMatch(raw,/romance|lover|marriage|affinity meter/i);
});

test('C3-197 poverty and liquidity source acknowledges constraints without owning debt or free capital',()=>{
  const rows=bank.entries.filter((x:any)=>x.section==='poverty-liquidity');
  assert.equal(rows.length,5);
  for(const key of ['liquidity.street','liquidity.cheap-room','liquidity.commission-only','liquidity.barter-narrow','liquidity.no-debt-state']){
    assert.ok(rows.some((x:any)=>x.contentKey===key),key);
  }

  const debtRows=rows.filter((x:any)=>/\bdebt\b|credit meter|долг|кредитную шкалу/iu.test(textOf(x)));
  assert.deepEqual(debtRows.map((x:any)=>x.contentKey),['liquidity.no-debt-state']);
  assert.match(debtRows[0].en,enNegation);
  assert.match(debtRows[0].ru,ruNegation);

  const commission=rows.find((x:any)=>x.contentKey==='liquidity.commission-only');
  assert.match(commission.en,/rather than receiving free capital/i);
  assert.match(commission.ru,/а не бесплатный капитал/i);
});

test('C3-198 item meaning stays qualitative and preserves honest uncertainty',()=>{
  const rows=bank.entries.filter((x:any)=>x.section==='items');
  assert.equal(rows.length,6);
  for(const key of [
    'scales.meaning','scales.uncertainty','manifest.meaning',
    'manifest.plain-terms','sample-kit.meaning','items.no-capacity-system',
  ]) assert.ok(rows.some((x:any)=>x.contentKey===key),key);

  const raw=JSON.stringify(rows);
  assert.match(raw,/universal market price|true market price/i);
  assert.match(raw,/uncertainty|неопредел/iu);
  const scales=rows.find((x:any)=>x.contentKey==='scales.meaning');
  assert.match(scales.en,/do not .*guarantee profit/i);
  assert.match(scales.ru,/не .*гарантируют прибыль/iu);
  const boundary=rows.find((x:any)=>x.contentKey==='items.no-capacity-system');
  assert.match(boundary.en,enNegation);
  assert.match(boundary.ru,ruNegation);
});

test('C3-199 School source uses only four prepared domains and creates no authority',()=>{
  const rows=bank.entries.filter((x:any)=>x.section==='school-boundary');
  assert.deepEqual(rows.map((x:any)=>x.contentKey),[
    'school.records','school.negotiation','school.formal-terms','school.arcana',
  ]);
  const raw=JSON.stringify(rows);
  assert.doesNotMatch(raw,/school\.track\.|school\.course\.|merchant\.routes\.|merchant\.relationship\.|merchant\.trade\./i);
  assert.doesNotMatch(raw,/\bthreshold\s*[:=]?\s*\d|порог\s*[:=]?\s*\d/iu);
  assert.doesNotMatch(raw,/publicFactId|selectedPublicFactId|consumerId/i);
});

test('C3-200 cross-system source consumes only shipped Lumber, Farm, Hunter, Tavern, Guard and Hunter Activity return',()=>{
  const rows=bank.entries.filter((x:any)=>x.section==='cross-system');
  assert.equal(rows.length,6);
  assert.deepEqual(rows.map((x:any)=>x.contentKey),[
    'cross.lumber','cross.farm','cross.hunter','cross.tavern','cross.guard','cross.activity-boundary',
  ]);
  const raw=JSON.stringify(rows);
  for(const source of ['lumber','farm','hunter','tavern','guard','activity']) assert.match(raw,new RegExp(source,'i'),source);
  assert.doesNotMatch(raw,/palace|artist[- ]geisha|assassin|prostitute/i);
  const activity=rows.find((x:any)=>x.contentKey==='cross.activity-boundary');
  assert.match(activity.en,/no separate control over Activity/i);
});

test('C3-201 Merchant House source is stable-operations identity, not a universal simulator',()=>{
  const rows=bank.entries.filter((x:any)=>x.section==='merchant-house');
  assert.equal(rows.length,5);
  for(const key of ['house.stable-operations','house.network','house.logistics','house.records','house.readiness']){
    assert.ok(rows.some((x:any)=>x.contentKey===key),key);
  }
  const readiness=rows.find((x:any)=>x.contentKey==='house.readiness');
  assert.match(readiness.en,/not an automatic ending/i);
  assert.match(readiness.ru,/не автоматическая концовка/i);
});

test('C3-202 Speculator / Smuggler source is risk-based without morality or global-law ownership',()=>{
  const rows=bank.entries.filter((x:any)=>x.section==='speculator-smuggler');
  assert.equal(rows.length,5);
  const morality=rows.find((x:any)=>x.contentKey==='speculator.not-morality');
  assert.match(morality.en,enNegation);
  assert.match(morality.ru,ruNegation);
  const grey=rows.find((x:any)=>x.contentKey==='speculator.grey-route');
  assert.match(grey.en,/creates no global crime or faction system/i);
  assert.match(grey.ru,/не создаёт глобальную систему преступления или фракций/i);
  const ready=rows.find((x:any)=>x.contentKey==='speculator.readiness');
  assert.match(ready.en,/does not become an ending/i);
});

test('C3-203 Patron source keeps five real world inputs distinct and source identities deterministic',()=>{
  const rows=bank.entries.filter((x:any)=>x.section==='patron-routes');
  assert.equal(rows.length,6);
  for(const key of ['patron.lumber','patron.farm','patron.hunter','patron.tavern','patron.guard','patron.network']){
    assert.ok(rows.some((x:any)=>x.contentKey===key),key);
  }
  const network=rows.find((x:any)=>x.contentKey==='patron.network');
  assert.match(network.en,/not a universal business simulator/i);

  const projection=(xs:any[])=>Object.fromEntries(xs.map((row:any)=>[
    row.contentKey,{section:row.section,ru:row.ru,en:row.en,tags:row.tags},
  ]));
  const persisted=JSON.stringify(bank.entries);
  const reloaded=JSON.parse(persisted);
  assert.deepEqual(projection(reloaded),projection(bank.entries));
  assert.deepEqual(projection([...reloaded].reverse()),projection(bank.entries));
});

test('Merchant authored prep creates no future-career or unauthorized ending seam',()=>{
  const raw=JSON.stringify(bank.entries);
  assert.doesNotMatch(raw,/palace\.|artist-geisha\.|assassin\.|prostitute\./i);

  const careerRows=bank.entries.filter((x:any)=>x.section==='career-boundary');
  assert.deepEqual(careerRows.map((x:any)=>x.contentKey),[
    'veteran.identity','route.defer','readiness.not-ending','outcome.boundary',
  ]);
  const ending=careerRows.find((x:any)=>x.contentKey==='outcome.boundary');
  assert.match(ending.en,/public Merchant ending.*Hard Work/i);
  assert.match(ending.en,/without creating new public ending IDs/i);
});


test('C3-203 provisional binding plan covers every source key without claiming frozen authority',()=>{
  assert.equal(plan.status,'FINAL_BINDING_AUDITED_ON_FROZEN_MERCHANT_RUNTIME');
  assert.equal(plan.authority.frozen,true);
  assert.equal(plan.finalBindingRequiredAt,'C3-204');

  const sourceKeys=bank.entries.map((x:any)=>x.contentKey).sort();
  const bindingKeys=plan.bindings.map((x:any)=>x.contentKey).sort();
  assert.deepEqual(bindingKeys,sourceKeys);

  const unbound=plan.bindings.filter((x:any)=>x.status==='UNBOUND_NO_FROZEN_MERCHANT_CONSUMER');
  assert.deepEqual(unbound.map((x:any)=>x.contentKey),['school.formal-terms']);
  assert.deepEqual(unbound[0].provisionalTargetIds,[]);

  const allowed=new Set([
    ...plan.allowedActionScenes,
    ...plan.publishedRuntimeEventCatalog,
    ...plan.allowedPublicEndings,
  ]);
  for(const binding of plan.bindings){
    for(const target of binding.provisionalTargetIds){
      assert.ok(allowed.has(target),binding.contentKey+' -> '+target);
    }
  }

  const seasonal=plan.bindings.filter((x:any)=>x.section==='seasonal');
  assert.equal(seasonal.length,12);
  for(const binding of seasonal){
    assert.equal(binding.targetKind,'actionScene');
    assert.equal(binding.provisionalTargetIds.length,1);
  }

  const futureRaw=JSON.stringify(plan.bindings);
  assert.doesNotMatch(futureRaw,/palace\.|artist-geisha\.|assassin\.|prostitute\./i);
});
