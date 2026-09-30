import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const load=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const definitions=load('content/definitions.json');
const localization=load('content/localization.json').strings as Record<string,{ru:string;en:string}>;
const forestResults=load('content/packs/forest-result-content-bilingual-v2.json');
const lumberCross=load('content/packs/lumber-cross-production.json');
const manifest=load('content/chat3-forest-poverty-parity-v8.fixture.json');

const reachability=load(manifest.fixtures.reachability);
const logging=load(manifest.fixtures.logging);
const oldBoundary=load(manifest.fixtures.oldBoundary);
const returnAftermath=load(manifest.fixtures.returnAftermath);
const housing=load(manifest.fixtures.housing);
const recovery=load(manifest.fixtures.recovery);
const smallJobAudit=load(manifest.fixtures.smallJobAudit);
const secretDebt=load(manifest.fixtures.secretDebt);
const densityVoice=load(manifest.fixtures.densityVoice);
const appSource=readFileSync('src/ui/app.ts','utf8');

const povertyPacks=manifest.ordinaryPovertyPackIds.map((id:string)=>load('content/packs/'+id+'.json'));
const povertyEvents=povertyPacks.flatMap((pack:any)=>pack.events);

function assertBilingual(strings:Record<string,{ru:string;en:string}>){
  for(const [key,pair] of Object.entries(strings)){
    assert.ok(pair.ru?.trim(),key+' missing ru');
    assert.ok(pair.en?.trim(),key+' missing en');
  }
}

test('C3-74/C3-75 use exact Forest route IDs and Old Boundary gate',()=>{
  const activity=definitions.activities.find((entry:any)=>entry.id===manifest.expectedForest.activityId);
  assert.ok(activity);
  const optionById=new Map<string,any>(activity.options.map((entry:any)=>[entry.id,entry]));

  assert.equal(optionById.get(logging.routeOptionId)?.setRoute,logging.routeId);
  assert.equal(optionById.get(oldBoundary.routeOptionId)?.setRoute,oldBoundary.routeId);
  assert.deepEqual(optionById.get(oldBoundary.routeOptionId)?.conditions,[oldBoundary.existingUnlockCondition]);
  assert.deepEqual(oldBoundary.existingUnlockCondition,manifest.expectedForest.oldBoundaryCondition);

  for(const fixture of [logging,oldBoundary]){
    assertBilingual(fixture.strings);
    for(const entry of fixture.variants){
      if(entry.resultId){
        assert.ok(activity.results.some((result:any)=>result.id===entry.resultId),entry.resultId);
      }
      assert.equal(entry.localizationKey in localization,false,'queue-v8 Forest key unexpectedly live: '+entry.localizationKey);
    }
  }
});

test('C3-76 return aftermath uses only current terminal result/event identities',()=>{
  const activity=definitions.activities.find((entry:any)=>entry.id===manifest.expectedForest.activityId);
  assert.ok(activity);
  const resultIds=new Set<string>(activity.results.map((entry:any)=>entry.id));
  const eventIds=new Set<string>(forestResults.events.map((entry:any)=>entry.id));
  const lumberIds=new Set<string>(lumberCross.events.map((entry:any)=>entry.id));

  assertBilingual(returnAftermath.strings);
  for(const outcome of returnAftermath.outcomes){
    assert.ok(resultIds.has(outcome.resultId),outcome.resultId);
    assert.ok(eventIds.has(outcome.eventId),outcome.eventId);
    if(outcome.outcome==='success')assert.ok(lumberIds.has(outcome.lumberContinuation));
    else assert.equal(outcome.lumberContinuation,null);
  }
});

test('C3-77/C3-78 poverty continuity maps only to current event variants',()=>{
  for(const fixture of [housing,recovery]){
    assertBilingual(fixture.strings);
    for(const entry of fixture.entries){
      const event=povertyEvents.find((candidate:any)=>candidate.id===entry.eventId);
      assert.ok(event,entry.eventId);
      assert.ok(event.variants.some((variant:any)=>variant.id===entry.variantId),
        entry.eventId+' / '+entry.variantId);
      assert.equal(entry.localizationKey in localization,false,'queue-v8 poverty key unexpectedly live: '+entry.localizationKey);
    }
  }
});

test('C3-79 blocks only variant-specific small-job results the current result consumer cannot identify',()=>{
  assert.ok(appSource.includes("eventChoiceText(last.outcomeRef.eventId,last.outcomeRef.choiceId,last.text)"));
  const blocked=smallJobAudit.entries.filter((entry:any)=>entry.classification==='BLOCKED_VARIANT_SPECIFIC_RESULT');
  assert.deepEqual(blocked.map((entry:any)=>entry.variantId).sort(),['late-shade','market-closing']);

  for(const entry of smallJobAudit.entries){
    const event=povertyEvents.find((candidate:any)=>candidate.id===entry.eventId);
    assert.ok(event,entry.eventId);
    assert.ok(event.choices.some((choice:any)=>choice.id===entry.choiceId),entry.choiceId);
    assert.equal(event.variants.length,entry.eventVariantCount);
    if(entry.eventVariantCount===1){
      assert.equal(entry.classification,'SAFE_SINGLE_VARIANT_CHOICE_RESULT');
    }else{
      assert.equal(entry.classification,'BLOCKED_VARIANT_SPECIFIC_RESULT');
    }
  }
});

test('C3-80 ordinary poverty remains independent from Secret Debt',()=>{
  assert.equal(secretDebt.findings.debtMetricWrites,0);
  assert.equal(secretDebt.findings.debtConditions,0);
  assert.equal(secretDebt.findings.secretDebtTermsInOrdinaryPoverty,false);
  assert.equal(secretDebt.findings.ordinaryPovertyIndependent,true);
  assert.equal(secretDebt.invariants.noProductValuesChosen,true);

  const serialized=JSON.stringify(povertyPacks);
  assert.equal(/secret.?debt|lender|slave/i.test(serialized),false);
});

test('C3-81/C3-82 queue-v8 strings are bilingual, unique and voice-clean',()=>{
  const fixtures=[logging,oldBoundary,returnAftermath,housing,recovery];
  const rows:any[]=[];
  for(const fixture of fixtures){
    assertBilingual(fixture.strings);
    for(const [key,pair] of Object.entries(fixture.strings) as any){
      rows.push({key,ru:pair.ru,en:pair.en});
    }
  }
  assert.equal(new Set(rows.map(row=>row.key)).size,rows.length);
  assert.equal(new Set(rows.map(row=>row.ru)).size,rows.length);
  assert.equal(new Set(rows.map(row=>row.en)).size,rows.length);

  const technical=/\b(C3-\d+|runtime|world fact|career facts?|relationship state|recovery state|recovery milestone|persistent contact|capability gate|success result|failure result|Secret Debt|Lumber facts?)\b/i;
  assert.deepEqual(rows.filter(row=>technical.test(row.en)).map(row=>row.key),[]);
  assert.equal(densityVoice.queueV8V3.technicalJargonInPlayerFacingText,0);
});

test('C3-73 correctly records no post-consumer production advance',()=>{
  assert.equal(reachability.integrationAdvanceSinceC3_61.productionFilesChanged,false);
  assert.equal(reachability.integrationAdvanceSinceC3_61.sourceKeysNowInRootLocalization,0);
  assert.equal(reachability.blocker.classification,'BLOCKED_BY_INTEGRATION_ADVANCE');
});
