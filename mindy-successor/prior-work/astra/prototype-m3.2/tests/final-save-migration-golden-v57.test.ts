import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const manifestPath='tests/fixtures/final-save-migration-golden-v57.json';
const manifest=JSON.parse(readFileSync(manifestPath,'utf8'));

const expectedNames=[
  'case 01: schema ladder reaches one final schema and parse twice is idempotent',
  'case 02: legacy ended run receives exactly one RunResult transaction',
  'case 03: Strong Meta migration and protected profile merge never rewrite the current run',
  'case 04: D40 selected-route repair is conservative and idempotent',
  'case 05: D41 completed legacy Tavern migration canonicalizes once and Specialist ownership dedupes',
  'case 06: retired lumber-stay vitality migration preserves history without creating a modern ending',
  'case 07: NightFlow atomic reload matrix is exactly once at every phase',
  'case 08: pre-Secret-Debt saves default unseen and typed Secret Debt states roundtrip exactly',
  'case 09: Secret Debt lender acceptance and ten-day trap cannot replay or backdate forced Night',
  'case 10: Secret Debt forced Night and D51 provenance queue are reload-safe',
  'case 11: D51 compatibility is provenance-gated and never a global Energy floor',
  'case 12: Secret Debt hidden-work repay Takeover and ending ledger never replay',
  'case 13: old Palace access without Rich6 ledger gets neutral progression while access is preserved',
  'case 14: ambiguous Palace progression-complete without duty proof is never fabricated into fifteen duties',
  'case 15: Prince confrontation resumes exact authored phase and Return Home remains explicit',
  'case 16: Activity entry route checkpoint and RNG reload do not recharge or reinterpret the envelope',
  'case 17: legacy Activity Field Time and mini-game state migrate conservatively',
  'case 18: old active Activity gets only the exact neutral Camp default and partial Camp state rejects',
  'case 19: Camp atomic boundary reload matrix preserves two-night cap and exactly-once calendar and Field Time',
  'case 20: Camp cannot suppress Secret Debt forced Night or lose the next-day Debt consequence',
  'case 21: D38 Activity ending eligibility stays non-terminal and canonical Specialist reward ownership applies once',
  'case 22: D46 existing Lust and D47 package snapshot preserve old lives and apply new packages once',
  'case 23: D23 package identity and content-presentation-only tranches are save-neutral'
] as const;

function byId(id:string){
  const found=manifest.cases.find((row:any)=>row.id===id);
  assert.ok(found,id);
  return found;
}

test('v57 golden manifest has exactly 23 contiguous unique cases and exact frozen names',()=>{
  assert.equal(manifest.manifestVersion,57);
  assert.equal(manifest.cases.length,23);
  assert.equal(new Set(manifest.cases.map((row:any)=>row.id)).size,23);
  assert.equal(new Set(manifest.cases.map((row:any)=>row.name)).size,23);

  for(let i=1;i<=23;i++){
    const id='case-'+String(i).padStart(2,'0');
    assert.equal(manifest.cases[i-1].id,id);
    assert.equal(manifest.cases[i-1].name,expectedNames[i-1]);
  }
});

test('every dependency is classified and every non-current case has explicit post-integration work',()=>{
  const allowed=new Set(manifest.dependencyClassifications);
  assert.deepEqual(
    [...allowed].sort(),
    ['content-only','current-main','final-assembly','frozen-producer','historical-reconstruction'].sort()
  );

  for(const row of manifest.cases){
    assert.ok(Array.isArray(row.dependencies)&&row.dependencies.length>0,row.id);
    for(const dependency of row.dependencies){
      assert.ok(dependency.name,row.id+' dependency name');
      assert.ok(allowed.has(dependency.classification),row.id+': '+dependency.classification);
    }
    if(row.runnable!=='current-main'){
      assert.ok(row.postIntegrationRequirement?.trim(),row.id+' postIntegrationRequirement');
    }
    assert.ok(row.stopConditions?.length>0,row.id+' stop conditions');
  }
});

test('F1-F5 stay authoritative reconstructions and are never labeled genuine user saves',()=>{
  const expectedCases:any={
    F1:['case-01'],
    F2:['case-17'],
    F3:['case-13'],
    F4:['case-06'],
    F5:['case-06']
  };

  for(const id of ['F1','F2','F3','F4','F5']){
    const fixture=manifest.historicalFixtures[id];
    assert.ok(fixture,id);
    assert.equal(fixture.classification,'authoritative_reconstruction',id);
    assert.equal(fixture.genuineUserSave,false,id);
    assert.deepEqual(fixture.unlocksCases,expectedCases[id],id);
    assert.match(fixture.sourceCommit,/^[0-9a-f]{40}$/);
    assert.ok(fixture.currentPath);
    assert.ok(fixture.authority.length>0);
  }

  const f1=JSON.parse(readFileSync('tests/fixtures/final-historical/f1-schema1-reconstructed.json','utf8'));
  const f2=JSON.parse(readFileSync('tests/fixtures/final-historical/f2-pre-field-time-activity-envelope-reconstructed.json','utf8'));
  assert.equal(f1.schemaVersion,1);
  assert.equal(Object.hasOwn(f1.run,'actionCounts'),false);
  assert.equal(Object.hasOwn(f2,'fieldTimeRemaining'),false);
  assert.equal(Object.hasOwn(f2,'miniGames'),false);
});

test('v21 forbidden-inference policy is explicit in global rules and affected cases',()=>{
  const global=manifest.forbiddenInferencePolicy.join('\n');

  for(const fragment of [
    'generic debt is not Secret Debt',
    'Street housing is not D51 provenance',
    'Palace access is not Palace duty progress',
    'palace.progression-complete alone is not fifteen committed duties',
    'Prince readiness is not Prince defeat',
    'Camp progress is not inferred',
    'earned Hard Work is not active D47 package selection',
    'historical lumber-stay/vitality is not modern ending'
  ]) assert.ok(global.includes(fragment),fragment);

  assert.match(byId('case-04').forbiddenInferences.join(' '),/generic readiness/);
  assert.match(byId('case-08').forbiddenInferences.join(' '),/generic debt/);
  assert.match(byId('case-11').forbiddenInferences.join(' '),/housing/);
  assert.match(byId('case-13').forbiddenInferences.join(' '),/duty count/);
  assert.match(byId('case-14').forbiddenInferences.join(' '),/15 duties/);
  assert.match(byId('case-15').forbiddenInferences.join(' '),/Prince defeat/);
  assert.match(byId('case-18').forbiddenInferences.join(' '),/Camp/);
  assert.match(byId('case-22').forbiddenInferences.join(' '),/earned Hard Work/);
});

test('all mandatory exactly-once domains are represented by the 23-case contract',()=>{
  const observed=new Set(manifest.cases.flatMap((row:any)=>row.exactlyOnceDomains));
  assert.deepEqual(
    [...manifest.exactlyOnceDomainsRequired].sort(),
    ['money','energy','calendar','reward','transaction','creation','rng_pending'].sort()
  );
  for(const domain of manifest.exactlyOnceDomainsRequired){
    assert.ok(observed.has(domain),domain);
  }

  assert.ok(byId('case-07').exactlyOnceDomains.includes('calendar'));
  assert.ok(byId('case-12').exactlyOnceDomains.includes('money'));
  assert.ok(byId('case-21').exactlyOnceDomains.includes('transaction'));
  assert.ok(byId('case-22').exactlyOnceDomains.includes('creation'));
});

test('Strong Meta permanent ownership, frozen current-run snapshot/runtime and packages stay separate',()=>{
  const separation=manifest.strongMetaSeparationRequired.join('\n');
  for(const fragment of [
    'meta.strongMeta',
    'run.strongMetaSnapshot',
    'run.strongMetaRuntime',
    'activeHardWorkPackages',
    'legacy.lumber-stay.vitality'
  ]) assert.ok(separation.includes(fragment),fragment);

  const c3=byId('case-03');
  assert.ok(c3.stableIds.includes('meta.strongMeta'));
  assert.ok(c3.stableIds.includes('run.strongMetaSnapshot'));
  assert.ok(c3.stableIds.includes('run.strongMetaRuntime'));

  assert.match(byId('case-21').rewardOwnershipChecks.join(' '),/meta\.strongMeta/);
  assert.match(byId('case-22').rewardOwnershipChecks.join(' '),/outside Strong Meta slots/);
  assert.match(byId('case-23').rewardOwnershipChecks.join(' '),/Strong Meta slots remain separate/);
});

test('Activity Camp Secret Debt Palace D46 D47 lumber retirement and adjacency domains are all covered',()=>{
  const observed=new Set(manifest.cases.flatMap((row:any)=>row.domains));
  for(const domain of manifest.requiredCoverageDomains){
    assert.ok(observed.has(domain),domain);
  }

  assert.ok(observed.has('Activity'));
  assert.ok(observed.has('Camp'));
  assert.ok(observed.has('Secret Debt'));
  assert.ok(observed.has('Palace'));
  assert.ok(observed.has('D46'));
  assert.ok(observed.has('D47'));
  assert.ok(observed.has('lumber retirement'));
});

test('content/presentation-only tranches are mechanically save-neutral',()=>{
  assert.equal(manifest.contentPresentationSaveNeutrality.mechanicalMutationAllowed,false);
  const c23=byId('case-23');
  assert.ok(c23.domains.includes('content-only'));
  assert.ok(c23.domains.includes('presentation-only'));
  assert.match(c23.forbiddenInferences.join(' '),/localization\/presentation mutate Save fields/);
  assert.match(c23.stopConditions.join(' '),/mutates mechanical save state/);
});

test('every case records checkpoints stable-id reward rules and explicit rejection or default policy',()=>{
  for(const row of manifest.cases){
    assert.ok(row.checkpoints?.before?.length>0,row.id+' before checkpoint');
    assert.ok(row.checkpoints?.afterReload?.length>0,row.id+' reload checkpoint');
    assert.ok(Array.isArray(row.stableIds),row.id+' stableIds');
    assert.ok(Array.isArray(row.rewardOwnershipChecks),row.id+' rewardOwnershipChecks');
    assert.ok(row.rejectionDefaultRules?.length>0,row.id+' rejection/default rules');
    assert.ok(Array.isArray(row.forbiddenInferences),row.id+' forbiddenInferences');
    assert.ok(Array.isArray(row.historicalFixtures),row.id+' historicalFixtures');
  }
});

test('manifest does not claim the final migration execution is already green',()=>{
  assert.equal(manifest.status,'PREPARED_FOR_FINAL_ASSEMBLED_TARGET');
  const finalOnly=manifest.cases.filter((row:any)=>row.runnable==='fully-assembled-release-target');
  assert.ok(finalOnly.length>0);
  assert.equal(finalOnly.every((row:any)=>row.postIntegrationRequirement.length>0),true);
});
