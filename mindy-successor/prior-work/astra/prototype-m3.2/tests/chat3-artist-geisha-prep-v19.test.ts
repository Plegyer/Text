import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const defs=JSON.parse(readFileSync('content/definitions.json','utf8'));
const loc=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const bank=JSON.parse(readFileSync('content/artist-geisha-authored-copy-v19.fixture.json','utf8'));
const localizationPrep=JSON.parse(readFileSync('content/artist-geisha-authored-v19-localization-prep.fixture.json','utf8'));
const plan=JSON.parse(readFileSync('content/artist-geisha-authored-v19-binding-plan.fixture.json','utf8'));
const baseline=JSON.parse(readFileSync('content/artist-geisha-authored-v19-activation-mechanics.fixture.json','utf8'));

test('C3-214 prepared localization is complete, collision-free and source-exact',()=>{
  assert.equal(localizationPrep.status,'PREPARED_KEYS_ONLY_NOT_ROOT_LOCALIZATION');
  assert.equal(localizationPrep.count,64);
  assert.equal(localizationPrep.rootCollisionCount,0);
  assert.equal(localizationPrep.entries.length,bank.entries.length);
  assert.equal(Object.keys(localizationPrep.strings).length,64);

  const sourceByKey=Object.fromEntries(bank.entries.map((x:any)=>[x.contentKey,x]));
  const locKeys=new Set<string>();
  for(const row of localizationPrep.entries){
    assert.ok(sourceByKey[row.contentKey],row.contentKey);
    assert.ok(!locKeys.has(row.localizationKey),row.localizationKey);
    locKeys.add(row.localizationKey);
    assert.equal(loc[row.localizationKey],undefined,'prepared key must not mutate root localization: '+row.localizationKey);
    assert.deepEqual(localizationPrep.strings[row.localizationKey],{
      ru:sourceByKey[row.contentKey].ru,
      en:sourceByKey[row.contentKey].en,
    },row.contentKey);
  }
});

test('C3-214 provisional binding plan covers every source identity without claiming freeze',()=>{
  assert.equal(plan.status,'PROVISIONAL_ONLY_PENDING_FROZEN_ARTIST_RUNTIME');
  assert.equal(plan.authority.frozen,false);
  assert.equal(plan.finalBindingRequiredAt,'C3-216');
  assert.equal(plan.bindings.length,64);

  const sourceKeys=bank.entries.map((x:any)=>x.contentKey).sort();
  const bindingKeys=plan.bindings.map((x:any)=>x.contentKey).sort();
  assert.deepEqual(bindingKeys,sourceKeys);

  const counts=Object.fromEntries([
    'PROVISIONAL_PUBLISHED_SURFACE',
    'CONTRACT_TARGET_PENDING_RUNTIME',
    'UNBOUND_PENDING_FROZEN_ARTIST_SURFACE',
  ].map(status=>[status,plan.bindings.filter((x:any)=>x.status===status).length]));
  assert.deepEqual(counts,{
    PROVISIONAL_PUBLISHED_SURFACE:57,
    CONTRACT_TARGET_PENDING_RUNTIME:0,
    UNBOUND_PENDING_FROZEN_ARTIST_SURFACE:7,
  });

  const published=new Set([
    ...plan.allowedActionScenes,
    ...plan.publishedRuntimeEventCatalog,
    ...plan.allowedPublicEndings,
  ]);
  const pending=new Set(plan.contractTargetsNotYetPublished);
  for(const binding of plan.bindings){
    for(const target of binding.provisionalTargetIds){
      assert.ok(published.has(target)||pending.has(target),binding.contentKey+' -> '+target);
    }
  }

  const unbound=plan.bindings.filter((x:any)=>x.status==='UNBOUND_PENDING_FROZEN_ARTIST_SURFACE');
  assert.ok(unbound.some((x:any)=>x.contentKey==='cross.lumber-forest-return'));
  assert.ok(unbound.some((x:any)=>x.contentKey==='cross.hunter-return'));

  const raw=JSON.stringify(plan.bindings);
  assert.doesNotMatch(raw,/assassin\.|prostitute\.|palace\./i);
});

test('C3-215 safe prep preserves activation Artist mechanics exactly',()=>{
  const current={
    action:defs.actions.find((x:any)=>x.id==='artist-geisha.shift'),
    career:defs.careers.find((x:any)=>x.id==='artist-geisha'),
    ending:defs.endings.find((x:any)=>x.id==='ending.artist-geisha.hard-work'),
    itemDefinitions:(defs.itemDefinitions||[]).filter((x:any)=>String(x.id).startsWith('artist_')),
  };
  assert.equal(baseline.status,'ACTIVATION_BASELINE_FOR_SAFE_PREP_ONLY');
  assert.equal(baseline.sourceHead,'8067539a606714fad8400ccbba30fd7ccf4a9158');
  assert.equal(baseline.finalFrozenRuntimeProjectionRequiredAt,'C3-216');
  assert.equal(baseline.naturalReachabilityRequiredAt,'C3-216');
  assert.deepEqual(current,baseline.artistGeisha);
});

test('C3-215 prep creates no final binding claim before one frozen runtime',()=>{
  assert.equal(bank.status,'CONTENT_PREP_ONLY_PENDING_FROZEN_ARTIST_RUNTIME');
  assert.equal(bank.observedRuntimeAuthority.frozen,false);
  assert.equal(plan.authority.frozen,false);
  assert.deepEqual(defs.endings.filter((x:any)=>x.id.includes('artist-geisha')).map((x:any)=>x.id),[
    'ending.artist-geisha.hard-work',
  ]);
});
