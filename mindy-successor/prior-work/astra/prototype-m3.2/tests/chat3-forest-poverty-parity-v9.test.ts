import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const load=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const definitions=load('content/definitions.json');
const localization=load('content/localization.json').strings as Record<string,{ru:string;en:string}>;
const forestResults=load('content/packs/forest-result-content-bilingual-v2.json');
const lumberCross=load('content/packs/lumber-cross-production.json');
const manifest=load('content/chat3-forest-poverty-parity-v9.fixture.json');
const reachability=load(manifest.fixtures.reachability);
const logging=load(manifest.fixtures.logging);
const oldBoundary=load(manifest.fixtures.oldBoundary);
const aftermath=load(manifest.fixtures.aftermath);
const housing=load(manifest.fixtures.housing);
const recovery=load(manifest.fixtures.recovery);
const smallJob=load(manifest.fixtures.smallJob);
const secretDebt=load(manifest.fixtures.secretDebt);
const voiceDensity=load(manifest.fixtures.voiceDensity);
const appSource=readFileSync('src/ui/app.ts','utf8');

const povertyPacks=manifest.povertyPackIds.map((id:string)=>load('content/packs/'+id+'.json'));
const povertyEvents=povertyPacks.flatMap((pack:any)=>pack.events);

function assertBilingual(strings:Record<string,{ru:string;en:string}>){
  for(const [key,pair] of Object.entries(strings)){
    assert.ok(pair.ru?.trim(),key+' missing ru');
    assert.ok(pair.en?.trim(),key+' missing en');
  }
}

test('C3-86/C3-87 use exact current routes/results and Old Boundary gate',()=>{
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
      if(entry.resultId)assert.ok(activity.results.some((result:any)=>result.id===entry.resultId),entry.resultId);
      assert.equal(entry.localizationKey in localization,false,'queue-v9 Forest key already live: '+entry.localizationKey);
    }
  }
});

test('C3-88 aftermath uses current terminal identities and preserves success-only continuation',()=>{
  const activity=definitions.activities.find((entry:any)=>entry.id===manifest.expectedForest.activityId);
  const resultIds=new Set<string>(activity.results.map((entry:any)=>entry.id));
  const eventIds=new Set<string>(forestResults.events.map((entry:any)=>entry.id));
  const lumberIds=new Set<string>(lumberCross.events.map((entry:any)=>entry.id));
  assertBilingual(aftermath.strings);
  for(const outcome of aftermath.outcomes){
    assert.ok(resultIds.has(outcome.resultId),outcome.resultId);
    assert.ok(eventIds.has(outcome.eventId),outcome.eventId);
    if(outcome.outcome==='success')assert.ok(lumberIds.has(outcome.lumberContinuation));
    else assert.equal(outcome.lumberContinuation,null);
  }
});

test('C3-89/C3-90 poverty continuity maps to current event variants',()=>{
  for(const fixture of [housing,recovery]){
    assertBilingual(fixture.strings);
    for(const entry of fixture.entries){
      const event=povertyEvents.find((candidate:any)=>candidate.id===entry.eventId);
      assert.ok(event,entry.eventId);
      assert.ok(event.variants.some((variant:any)=>variant.id===entry.variantId),
        entry.eventId+' / '+entry.variantId);
      assert.equal(entry.localizationKey in localization,false,'queue-v9 poverty key already live: '+entry.localizationKey);
    }
  }
});

test('C3-91 keeps ambiguous helpful-summer-shade result mappings preparation-only',()=>{
  assert.ok(appSource.includes("eventChoiceText(last.outcomeRef.eventId,last.outcomeRef.choiceId,last.text)"));
  assert.equal(/outcomeRef\.variantId/.test(appSource),false);
  assert.equal(smallJob.resultConsumer.variantAware,false);
  assert.deepEqual(smallJob.preparationOnly.map((entry:any)=>entry.variantId).sort(),['late-shade','market-closing']);
  for(const entry of [...smallJob.safe,...smallJob.preparationOnly]){
    const event=povertyEvents.find((candidate:any)=>candidate.id===entry.eventId);
    assert.ok(event,entry.eventId);
    assert.ok(event.variants.some((variant:any)=>variant.id===entry.variantId),entry.variantId);
    assert.ok(event.choices.some((choice:any)=>choice.id===entry.choiceId),entry.choiceId);
  }
});

test('C3-92 ordinary poverty remains separate from Secret Debt',()=>{
  assert.equal(secretDebt.findings.ordinaryPovertyDebtMetricWrites,0);
  assert.equal(secretDebt.findings.ordinaryPovertyDebtConditions,0);
  assert.equal(secretDebt.findings.ordinaryPovertyIndependent,true);
  assert.equal(secretDebt.invariants.noProductValuesChosen,true);
  assert.equal(/secret.?debt|lender|slave/i.test(JSON.stringify(povertyPacks)),false);
});

test('C3-93/C3-94 queue-v9 strings are RU/EN complete, unique and voice-clean',()=>{
  const fixtures=[logging,oldBoundary,aftermath,housing,recovery];
  const rows:any[]=[];
  for(const fixture of fixtures){
    assertBilingual(fixture.strings);
    for(const [key,pair] of Object.entries(fixture.strings) as any)rows.push({key,ru:pair.ru,en:pair.en});
  }
  assert.equal(rows.length,voiceDensity.totals.v4Pairs);
  assert.equal(new Set(rows.map(row=>row.key)).size,rows.length);
  assert.equal(new Set(rows.map(row=>row.ru)).size,rows.length);
  assert.equal(new Set(rows.map(row=>row.en)).size,rows.length);
  const jargon=/\b(C3-\d+|runtime|world fact|career facts?|relationship state|recovery state|recovery milestone|persistent contact|capability gate|success result|failure result|Secret Debt|Lumber facts?)\b/i;
  assert.deepEqual(rows.filter(row=>jargon.test(row.en)).map(row=>row.key),[]);
  assert.equal(voiceDensity.queueV9.technicalJargonInPlayerFacingText,0);
});

test('C3-85 records v8 frozen-not-merged state on its baseline',()=>{
  assert.equal(reachability.priorFrozenCandidate.pr,134);
  assert.equal(reachability.priorFrozenCandidate.merged,false);
  assert.ok(reachability.currentClassification.frozenNotMerged.length>0);
});
