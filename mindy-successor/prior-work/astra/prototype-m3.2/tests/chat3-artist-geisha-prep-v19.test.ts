import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const defs=JSON.parse(readFileSync('content/definitions.json','utf8'));
const loc=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const bank=JSON.parse(readFileSync('content/artist-geisha-authored-copy-v19.fixture.json','utf8'));
const localizationPrep=JSON.parse(readFileSync('content/artist-geisha-authored-v19-localization-prep.fixture.json','utf8'));
const plan=JSON.parse(readFileSync('content/artist-geisha-authored-v19-binding-plan.fixture.json','utf8'));
const baseline=JSON.parse(readFileSync('content/artist-geisha-authored-v19-activation-mechanics.fixture.json','utf8'));
const audit=JSON.parse(readFileSync('content/artist-geisha-authored-v19-binding-audit.fixture.json','utf8'));

test('C3-214 source localization manifest remains complete and non-production after live promotion',()=>{
  assert.equal(localizationPrep.status,'SOURCE_MANIFEST_SUPERSEDED_BY_LIVE_SURFACE_LOCALIZATION');
  assert.equal(localizationPrep.count,64);
  assert.equal(localizationPrep.rootCollisionCount,0);
  assert.equal(localizationPrep.entries.length,bank.entries.length);
  assert.equal(Object.keys(localizationPrep.strings).length,64);
  assert.equal(localizationPrep.preparedKeysRemainNonProduction,true);
  assert.equal(localizationPrep.liveSurfaceBindingComplete,true);
  assert.equal(localizationPrep.producerHead,'955f4accf7e25c42e0384ddb9f76e5612f41dd00');

  const sourceByKey=Object.fromEntries(bank.entries.map((x:any)=>[x.contentKey,x]));
  const locKeys=new Set<string>();
  for(const row of localizationPrep.entries){
    assert.ok(sourceByKey[row.contentKey],row.contentKey);
    assert.ok(!locKeys.has(row.localizationKey),row.localizationKey);
    locKeys.add(row.localizationKey);
    assert.equal(loc[row.localizationKey],undefined,'source-manifest key must not become a root runtime key: '+row.localizationKey);
    assert.deepEqual(localizationPrep.strings[row.localizationKey],{
      ru:sourceByKey[row.contentKey].ru,
      en:sourceByKey[row.contentKey].en,
    },row.contentKey);
  }
});

test('C3-216 final binding plan covers every source identity on frozen authority',()=>{
  assert.equal(plan.status,'FINAL_BINDING_AUDITED_ON_FROZEN_ARTIST_RUNTIME');
  assert.equal(plan.authority.frozen,true);
  assert.equal(plan.authority.observedHead,'955f4accf7e25c42e0384ddb9f76e5612f41dd00');
  assert.equal(plan.authority.contractBlob,'1cda9f558b8a7c0e0f113904f99ce0acd4b1e791');
  assert.equal(plan.finalBindingRequiredAt,'C3-216');
  assert.equal(plan.bindings.length,64);

  const sourceKeys=bank.entries.map((x:any)=>x.contentKey).sort();
  const bindingKeys=plan.bindings.map((x:any)=>x.contentKey).sort();
  assert.deepEqual(bindingKeys,sourceKeys);

  assert.equal(plan.bindings.filter((x:any)=>x.status==='LIVE_BOUND').length,57);
  const unbound=plan.bindings.filter((x:any)=>x.status==='UNBOUND_NO_FROZEN_ARTIST_CONSUMER');
  assert.deepEqual(unbound.map((x:any)=>x.contentKey).sort(),[
    'cross.hunter-return','cross.lumber-forest-return','cross.undead-sample',
    'night.coworker-debrief','night.patron-context','performance.no-global-score','rehearsal.shared-scene',
  ]);

  const published=new Set([
    ...plan.allowedActionScenes,
    ...plan.publishedRuntimeEventCatalog,
    ...plan.allowedPublicEndings,
  ]);
  for(const binding of plan.bindings){
    assert.deepEqual(binding.finalTargetIds,binding.provisionalTargetIds,binding.contentKey);
    for(const target of binding.finalTargetIds)assert.ok(published.has(target),binding.contentKey+' -> '+target);
  }

  assert.equal(audit.sourceCount,64);
  assert.equal(audit.liveBoundCount,57);
  assert.equal(audit.authorityUnboundCount,7);
});

test('C3-215 activation baseline remains historical after frozen-runtime rebuild',()=>{
  assert.equal(baseline.status,'ACTIVATION_BASELINE_FOR_SAFE_PREP_ONLY');
  assert.equal(baseline.sourceHead,'8067539a606714fad8400ccbba30fd7ccf4a9158');
  assert.equal(baseline.finalFrozenRuntimeProjectionRequiredAt,'C3-216');
  assert.equal(baseline.naturalReachabilityRequiredAt,'C3-216');
  assert.equal(baseline.artistGeisha.action.id,'artist-geisha.shift');
  assert.deepEqual(baseline.artistGeisha.career.stages,['novice']);
  assert.equal(baseline.artistGeisha.itemDefinitions.length,0);
});

test('C3-216 final authored layer records freeze without adding public complex endings',()=>{
  assert.equal(bank.status,'LIVE_BOUND_ON_FROZEN_ARTIST_RUNTIME_WITH_AUTHORITY_GAPS');
  assert.equal(bank.observedRuntimeAuthority.frozen,true);
  assert.equal(bank.observedRuntimeAuthority.observedHead,'955f4accf7e25c42e0384ddb9f76e5612f41dd00');
  assert.equal(plan.authority.frozen,true);
  assert.deepEqual(defs.endings.filter((x:any)=>x.id.includes('artist-geisha')).map((x:any)=>x.id),[
    'ending.artist-geisha.hard-work',
  ]);
});
