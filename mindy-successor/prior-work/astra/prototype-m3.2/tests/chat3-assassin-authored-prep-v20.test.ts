import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const defs=JSON.parse(readFileSync('content/definitions.json','utf8'));
const loc=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const inventory=JSON.parse(readFileSync('content/assassin-authored-v20-inventory.fixture.json','utf8'));
const bank=JSON.parse(readFileSync('content/assassin-authored-copy-v20.fixture.json','utf8'));
const manifest=JSON.parse(readFileSync('content/assassin-authored-v20-localization-prep.fixture.json','utf8'));
const plan=JSON.parse(readFileSync('content/assassin-authored-v20-binding-plan.fixture.json','utf8'));
const baseline=JSON.parse(readFileSync('content/assassin-authored-v20-activation-mechanics.fixture.json','utf8'));

test('C3-218..227 Assassin source bank is bilingual, unique by section+key, and mechanics-free',()=>{
  assert.equal(bank.status,'SAFE_PREP_ONLY_ALL_FUTURE_CONSUMERS_PENDING_RUNTIME_ID');
  assert.equal(bank.entries.length,85);
  const composite=bank.entries.map((x:any)=>x.section+'::'+x.contentKey);
  assert.equal(new Set(composite).size,85);

  assert.deepEqual(
    Object.fromEntries([...new Set(bank.entries.map((x:any)=>x.section))].map(section=>[
      section,bank.entries.filter((x:any)=>x.section===section).length
    ])),
    {
      'ordinary-work':9,
      'major-contract':7,
      method:6,
      refusal:7,
      seasonal:12,
      relationship:10,
      items:8,
      'cross-system':7,
      activity:7,
      routes:12,
    }
  );

  for(const row of bank.entries){
    assert.ok(row.ru.trim().length>=70,row.section+'::'+row.contentKey+' RU');
    assert.ok(row.en.trim().length>=70,row.section+'::'+row.contentKey+' EN');
    assert.ok(Array.isArray(row.tags),row.section+'::'+row.contentKey+' tags');
    for(const forbidden of ['conditions','effects','eventId','actionId','threshold','reward']){
      assert.equal(forbidden in row,false,row.section+'::'+row.contentKey+' '+forbidden);
    }
  }

  for(const key of [
    'createsGameplayIds','changesRuntimeMechanics','changesSaveOrRng','changesActivityEngine',
    'changesEndingEligibilityRewardOrMeta','changesPalaceUnlock','createsCombatSystem',
    'createsMoralityStat','createsBlackMarketShop','createsUniversalFalloutMeter',
    'createsGenericNetworkSystem','changesProductionLocalization',
  ]) assert.equal(bank.invariants[key],false,key);
});

test('C3-228 localization prep is deterministic, complete, and absent from root localization',()=>{
  assert.equal(manifest.status,'PREPARED_KEYS_ONLY_NOT_ROOT_LOCALIZATION');
  assert.equal(manifest.keyScheme,'content.assassin.v20.<section>.<contentKey>');
  assert.equal(manifest.count,85);
  assert.equal(manifest.rootCollisionCount,0);
  assert.equal(manifest.entries.length,85);
  assert.equal(Object.keys(manifest.strings).length,85);

  const sourceByComposite=Object.fromEntries(bank.entries.map((x:any)=>[
    x.section+'::'+x.contentKey,x
  ]));
  const keys=new Set<string>();
  for(const row of manifest.entries){
    const composite=row.section+'::'+row.contentKey;
    assert.ok(sourceByComposite[composite],composite);
    assert.ok(!keys.has(row.localizationKey),row.localizationKey);
    keys.add(row.localizationKey);
    assert.equal(loc[row.localizationKey],undefined,row.localizationKey+' must remain non-production');
    assert.deepEqual(manifest.strings[row.localizationKey],{
      ru:sourceByComposite[composite].ru,
      en:sourceByComposite[composite].en,
    },composite);
  }

  const projection=(rows:any[])=>Object.fromEntries(rows.map((row:any)=>[
    row.section+'::'+row.contentKey,row.localizationKey
  ]));
  assert.deepEqual(projection([...manifest.entries].reverse()),projection(manifest.entries));
});

test('C3-228 binding plan uses only shipped Assassin surfaces or PENDING_RUNTIME_ID',()=>{
  assert.equal(plan.status,'SAFE_PREP_BINDING_PLAN_NO_RUNTIME_AUTHORITY');
  assert.equal(plan.activationHead,'d3b7fe038b35cdc53d786189ef7ba44853a7610d');
  assert.equal(plan.policy.futureConsumerMarker,'PENDING_RUNTIME_ID');
  assert.equal(plan.policy.modifiesProduction,false);
  assert.equal(plan.policy.createsGameplayIds,false);
  assert.equal(plan.policy.bindsOnlyAfterFrozenAssassinRuntime,true);
  assert.equal(plan.bindings.length,85);

  const concrete=plan.bindings.filter((x:any)=>x.status==='SHIPPED_SURFACE_AVAILABLE_NOT_BOUND');
  const pending=plan.bindings.filter((x:any)=>x.status==='PENDING_RUNTIME_ID');
  assert.equal(concrete.length,14);
  assert.equal(pending.length,71);
  assert.ok(pending.every((x:any)=>x.runtimeConsumerId==='PENDING_RUNTIME_ID'));
  assert.ok(pending.every((x:any)=>x.targetIds.length===0));

  const allowed=new Set([
    'assassin.shift#spring.default','assassin.shift#summer.default',
    'assassin.shift#autumn.default','assassin.shift#winter.default',
    'ending.assassin.hard-work',
  ]);
  for(const row of concrete){
    assert.equal(row.runtimeConsumerId,null,row.section+'::'+row.contentKey);
    assert.ok(row.targetIds.length>0,row.section+'::'+row.contentKey);
    for(const id of row.targetIds)assert.ok(allowed.has(id),id);
  }

  assert.deepEqual(plan.shippedAuthority.scenes,[
    'assassin.shift#spring.default','assassin.shift#summer.default',
    'assassin.shift#autumn.default','assassin.shift#winter.default',
  ]);
  assert.deepEqual(plan.shippedAuthority.activities,['lumber.forest','hunter.expedition']);
});

test('C3-225/226 external facts remain source authority, never invented Assassin consumers',()=>{
  const cross=plan.bindings.filter((x:any)=>x.section==='cross-system');
  const activity=plan.bindings.filter((x:any)=>x.section==='activity');
  assert.ok([...cross,...activity].every((x:any)=>x.status==='PENDING_RUNTIME_ID'));

  const known=[
    'careerFact:guard:cargo-pass-evidence',
    'careerFact:guard:tavern-evidence-known',
    'careerFact:guard:sealed-pass-issued',
    'item:guard_sealed_pass',
    'careerFact:tavern:rumour-confirmed',
    'careerFact:tavern:guest-ledger-evidence-ready',
    'careerFact:merchant:delivery-recorded',
    'careerFact:hunter:expedition-returned',
    'careerFact:hunter:expedition-rough-route',
    'careerFact:hunter:expedition-preserved-sample',
    'careerFact:tavern:activity-returned',
  ];
  const seen=new Set([...cross,...activity].flatMap((x:any)=>x.shippedContextIds));
  for(const id of seen)assert.ok(known.includes(id),id);

  assert.ok(inventory.shippedExternalAuthority.guard.facts.includes('cargo-pass-evidence'));
  assert.ok(inventory.shippedExternalAuthority.tavern.facts.includes('rumour-confirmed'));
  assert.ok(inventory.shippedExternalAuthority.merchant.facts.includes('delivery-recorded'));
  assert.deepEqual(inventory.shippedExternalAuthority.activity.ids,['lumber.forest','hunter.expedition']);
});

test('C3-228 safe prep preserves shipped Assassin production exactly',()=>{
  assert.equal(baseline.status,'ACTIVATION_BASELINE_FOR_SAFE_PREP_ONLY');
  assert.equal(baseline.sourceHead,'d3b7fe038b35cdc53d786189ef7ba44853a7610d');
  assert.equal(baseline.finalRuntimeBindingDeferred,true);

  const current={
    action:defs.actions.find((x:any)=>x.id==='assassin.shift'),
    career:defs.careers.find((x:any)=>x.id==='assassin'),
    ending:defs.endings.find((x:any)=>x.id==='ending.assassin.hard-work'),
    itemDefinitions:(defs.itemDefinitions||[]).filter((x:any)=>String(x.id).startsWith('assassin_')),
  };
  assert.deepEqual(current,baseline.assassin);
  assert.deepEqual(current.career.stages,['runner']);
  assert.deepEqual(defs.endings.filter((x:any)=>x.id.includes('assassin')).map((x:any)=>x.id),[
    'ending.assassin.hard-work',
  ]);
  assert.equal(current.itemDefinitions.length,0);
});
