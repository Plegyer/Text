import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const load=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const definitions=load('content/definitions.json');
const localization=load('content/localization.json').strings as Record<string,{ru:string;en:string}>;
const forestResults=load('content/packs/forest-result-content-bilingual-v2.json');
const lumberCross=load('content/packs/lumber-cross-production.json');
const manifest=load('content/chat3-forest-poverty-parity-v10.fixture.json');

const forestContinuity=load(manifest.fixtures.forestContinuity);
const forestAftermath=load(manifest.fixtures.forestAftermath);
const povertyContinuity=load(manifest.fixtures.povertyContinuity);
const smallJobBoundary=load(manifest.fixtures.smallJobBoundary);
const secretDebt=load(manifest.fixtures.secretDebt);
const voiceDensity=load(manifest.fixtures.voiceDensity);
const appSource=readFileSync('src/ui/app.ts','utf8');

const povertyPacks=manifest.ordinaryPovertyPackIds.map((id:string)=>load('content/packs/'+id+'.json'));
const povertyEvents=povertyPacks.flatMap((pack:any)=>pack.events);

function assertBilingual(strings:Record<string,{ru:string;en:string}>){
  for(const [key,pair] of Object.entries(strings)){
    assert.ok(pair.ru?.trim(),key+' missing ru');
    assert.ok(pair.en?.trim(),key+' missing en');
  }
}

test('C3-104 Forest route identities and Old Boundary gate remain exact',()=>{
  const activity=definitions.activities.find((entry:any)=>entry.id===manifest.expectedForest.activityId);
  assert.ok(activity);
  const optionById=new Map<string,any>(activity.options.map((entry:any)=>[entry.id,entry]));

  for(const expected of manifest.expectedForest.routeOptions){
    assert.equal(optionById.get(expected.id)?.setRoute,expected.setRoute);
  }
  assert.deepEqual(
    optionById.get('forest.route.old-boundary')?.conditions,
    [manifest.expectedForest.oldBoundaryCondition]
  );

  assertBilingual(forestContinuity.strings);
  for(const route of forestContinuity.routes){
    assert.equal(optionById.get(route.routeOptionId)?.setRoute,route.routeId);
    if(route.unlockCondition){
      assert.deepEqual(optionById.get(route.routeOptionId)?.conditions,[route.unlockCondition]);
    }
    for(const entry of route.variants){
      assert.ok(forestContinuity.strings[entry.localizationKey],entry.localizationKey);
      assert.equal(entry.localizationKey in localization,false,'candidate key already live: '+entry.localizationKey);
    }
  }
});

test('C3-104 Forest aftermath uses only current terminal identities',()=>{
  const activity=definitions.activities.find((entry:any)=>entry.id===manifest.expectedForest.activityId);
  assert.ok(activity);
  const resultIds=new Set<string>(activity.results.map((entry:any)=>entry.id));
  const eventIds=new Set<string>(forestResults.events.map((entry:any)=>entry.id));
  const lumberIds=new Set<string>(lumberCross.events.map((entry:any)=>entry.id));

  assertBilingual(forestAftermath.strings);
  for(const outcome of forestAftermath.outcomes){
    assert.ok(resultIds.has(outcome.resultId),outcome.resultId);
    assert.ok(eventIds.has(outcome.eventId),outcome.eventId);
    if(outcome.outcome==='success'){
      assert.ok(lumberIds.has(outcome.lumberContinuation),outcome.lumberContinuation);
    }else{
      assert.equal(outcome.lumberContinuation,null);
    }
  }

  for(const entry of forestAftermath.variants){
    assert.ok(forestAftermath.strings[entry.localizationKey],entry.localizationKey);
    assert.equal(entry.localizationKey in localization,false,'candidate key already live: '+entry.localizationKey);
  }
});

test('C3-104 poverty continuity maps only to current event/variant identities',()=>{
  assertBilingual(povertyContinuity.strings);
  for(const entry of povertyContinuity.entries){
    const event=povertyEvents.find((candidate:any)=>candidate.id===entry.eventId);
    assert.ok(event,entry.eventId);
    assert.ok(event.variants.some((variant:any)=>variant.id===entry.variantId),
      entry.eventId+' / '+entry.variantId);
    assert.ok(povertyContinuity.strings[entry.localizationKey],entry.localizationKey);
    assert.equal(entry.localizationKey in localization,false,'candidate key already live: '+entry.localizationKey);
  }
});

test('C3-104 small-job result boundary matches current result consumer identity',()=>{
  assert.ok(appSource.includes('eventChoiceText(last.outcomeRef.eventId,last.outcomeRef.choiceId,last.text)'));

  const blocked=smallJobBoundary.entries.filter((entry:any)=>entry.classification==='PREPARATION_ONLY_AMBIGUOUS_RESULT');
  assert.deepEqual(blocked.map((entry:any)=>entry.variantId).sort(),['late-shade','market-closing']);

  for(const entry of smallJobBoundary.entries){
    const event=povertyEvents.find((candidate:any)=>candidate.id===entry.eventId);
    assert.ok(event,entry.eventId);
    assert.ok(event.choices.some((choice:any)=>choice.id===entry.choiceId),entry.choiceId);
    assert.equal(event.variants.length,entry.eventVariantCount);
  }
});

test('C3-104 ordinary poverty remains separate from Secret Debt',()=>{
  assert.equal(secretDebt.findings.ordinaryDebtMetricWrites,0);
  assert.equal(secretDebt.findings.ordinaryDebtConditions,0);
  assert.equal(secretDebt.findings.ordinarySecretDebtTerms,0);
  assert.equal(secretDebt.findings.ordinaryPovertyIndependent,true);
  assert.equal(secretDebt.invariants.noProductValuesChosen,true);

  const serialized=JSON.stringify(povertyPacks);
  assert.equal(/secret.?debt|lender|slave/i.test(serialized),false);
});

test('C3-104 queue-v10 strings are bilingual, unique and additive',()=>{
  const fixtures=[forestContinuity,forestAftermath,povertyContinuity];
  const rows:any[]=[];
  for(const fixture of fixtures){
    assertBilingual(fixture.strings);
    for(const [key,pair] of Object.entries(fixture.strings) as any){
      rows.push({key,ru:pair.ru,en:pair.en});
    }
  }

  assert.equal(rows.length,voiceDensity.totals.authoredLocalizationPairs);
  assert.equal(new Set(rows.map(row=>row.key)).size,rows.length);
  assert.equal(new Set(rows.map(row=>row.ru)).size,rows.length);
  assert.equal(new Set(rows.map(row=>row.en)).size,rows.length);
  for(const row of rows){
    assert.equal(row.key in localization,false,'production localization collision: '+row.key);
  }
});
