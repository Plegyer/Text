import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const load=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const definitions=load('content/definitions.json');
const localization=load('content/localization.json').strings as Record<string,{ru:string;en:string}>;
const forestResultPack=load('content/packs/forest-result-content-bilingual-v2.json');
const lumberCross=load('content/packs/lumber-cross-production.json');
const manifest=load('content/chat3-forest-poverty-parity-v5.fixture.json');

const coverageAudit=load(manifest.fixtures.coverageAudit);
const forestFixtures=manifest.fixtures.forest.map((path:string)=>load(path));
const povertyFixtures=manifest.fixtures.poverty.map((path:string)=>load(path));
const separation=load(manifest.fixtures.separation);
const povertyPacks=manifest.ordinaryPovertyPackIds.map((id:string)=>load('content/packs/'+id+'.json'));
const povertyEvents=povertyPacks.flatMap((pack:any)=>pack.events);

function assertBilingual(strings:Record<string,{ru:string;en:string}>){
  for(const [key,pair] of Object.entries(strings)){
    assert.ok(pair.ru?.trim(),key+' missing ru');
    assert.ok(pair.en?.trim(),key+' missing en');
  }
}

function collectStrings(fixtures:any[]){
  return fixtures.flatMap(fixture=>Object.entries(fixture.strings??{}));
}

test('C3-38 Forest coverage audit matches current production IDs and RU/EN surfaces',()=>{
  const activity=definitions.activities.find((entry:any)=>entry.id===manifest.expectedForest.activityId);
  assert.ok(activity);

  assert.deepEqual(
    activity.options.map((entry:any)=>entry.id),
    manifest.expectedForest.routeOptionIds
  );
  assert.deepEqual(
    activity.options.map((entry:any)=>entry.setRoute),
    manifest.expectedForest.routeIds
  );
  assert.deepEqual(
    activity.results.map((entry:any)=>entry.id),
    manifest.expectedForest.resultIds
  );

  for(const route of Object.values(coverageAudit.liveRouteCoverage) as any[]){
    for(const key of [
      route.optionLabelKey,
      route.optionHelpKey,
      route.presentationAltKey,
      route.presentationCaptionKey
    ]){
      assert.ok(localization[key]?.ru?.trim(),key+' ru');
      assert.ok(localization[key]?.en?.trim(),key+' en');
    }
  }

  for(const terminal of coverageAudit.terminalCoverage){
    for(const key of terminal.eventLocalizationKeys){
      assert.ok(localization[key]?.ru?.trim(),key+' ru');
      assert.ok(localization[key]?.en?.trim(),key+' en');
    }
  }
});

test('C3-39/C3-40 route depth preserves current route IDs and Old Boundary gate',()=>{
  const activity=definitions.activities.find((entry:any)=>entry.id===manifest.expectedForest.activityId);
  const optionById=new Map<string,any>(activity.options.map((entry:any)=>[entry.id,entry]));
  const logging=forestFixtures.find((fixture:any)=>fixture.id==='forest.logging-road-seasonal-depth.v1');
  const oldBoundary=forestFixtures.find((fixture:any)=>fixture.id==='forest.old-boundary-seasonal-depth.v1');

  assert.ok(logging);
  assert.ok(oldBoundary);
  assert.ok(optionById.has(logging.routeOptionId));
  assert.equal(optionById.get(logging.routeOptionId).setRoute,logging.routeId);
  assert.ok(optionById.has(oldBoundary.routeOptionId));
  assert.equal(optionById.get(oldBoundary.routeOptionId).setRoute,oldBoundary.routeId);
  assert.deepEqual(optionById.get(oldBoundary.routeOptionId).conditions,[oldBoundary.existingUnlockCondition]);
  assert.equal(oldBoundary.existingUnlockCondition.capability,manifest.expectedForest.oldBoundaryCapability);
});

test('C3-41/C3-42 outcome depth preserves exact result/event/continuation boundaries',()=>{
  const activity=definitions.activities.find((entry:any)=>entry.id===manifest.expectedForest.activityId);
  const resultIds=new Set(activity.results.map((entry:any)=>entry.id));
  const eventIds=new Set(forestResultPack.events.map((entry:any)=>entry.id));
  const success=forestFixtures.find((fixture:any)=>fixture.id==='forest.success-aftermath-depth.v1');
  const nonSuccess=forestFixtures.find((fixture:any)=>fixture.id==='forest.escape-failure-depth.v1');

  assert.ok(resultIds.has(success.resultId));
  assert.ok(eventIds.has(success.resultEventId));
  assert.ok(
    lumberCross.events.some((event:any)=>event.id===manifest.expectedForest.successContinuationEventId)
  );
  assert.equal(success.lumberContinuation.eventId,manifest.expectedForest.successContinuationEventId);

  for(const outcome of nonSuccess.outcomes){
    assert.ok(resultIds.has(outcome.resultId),outcome.resultId);
    assert.ok(eventIds.has(outcome.eventId),outcome.eventId);
    assert.equal(outcome.lumberContinuation,null);
  }

  assert.equal(nonSuccess.invariants.noLumberContinuation,true);
  assert.equal(nonSuccess.invariants.noCareerFactWrites,true);
  assert.equal(nonSuccess.invariants.noEndingEligibility,true);
});

test('C3-43/C3-44/C3-45 poverty depth points only at current event/variant identities',()=>{
  for(const fixture of povertyFixtures){
    for(const entry of fixture.entries){
      const event=povertyEvents.find((candidate:any)=>candidate.id===entry.eventId);
      assert.ok(event,entry.eventId);
      assert.ok(
        event.variants.some((variant:any)=>variant.id===entry.variantId),
        entry.eventId+' / '+entry.variantId
      );

      if(entry.choiceId){
        const choice=event.choices.find((candidate:any)=>candidate.id===entry.choiceId);
        assert.ok(choice,entry.eventId+' / '+entry.choiceId);
        if(entry.currentEffectSnapshot){
          assert.deepEqual(choice.effects,entry.currentEffectSnapshot,entry.eventId);
        }
      }
    }
  }
});

test('v5 authored strings stay unique while only current safe consumers are integrated',()=>{
  const all=[...forestFixtures,...povertyFixtures];
  const seen=new Set<string>();

  const selected=new Set<string>();
  for(const fixture of forestFixtures){
    if(['forest.logging-road-seasonal-depth.v1','forest.old-boundary-seasonal-depth.v1'].includes(fixture.id)){
      for(const key of Object.keys(fixture.strings??{}))selected.add(key);
    }
    if(['forest.success-aftermath-depth.v1','forest.escape-failure-depth.v1'].includes(fixture.id)){
      for(const variant of fixture.variants??[])if(variant.surface==='result_event')selected.add(variant.localizationKey);
    }
  }
  for(const fixture of povertyFixtures){
    if(['ordinary-poverty.housing-seasonal-depth.v1','ordinary-poverty.recovery-depth.v1'].includes(fixture.id)){
      for(const key of Object.keys(fixture.strings??{}))selected.add(key);
    }
  }

  for(const fixture of all){
    assertBilingual(fixture.strings??{});
    for(const [key,value] of Object.entries(fixture.strings??{})){
      assert.equal(seen.has(key),false,'duplicate key '+key);
      seen.add(key);
      if(selected.has(key))assert.deepEqual(localization[key],value,'integrated current-safe key '+key);
      else assert.equal(key in localization,false,'selector-less key entered production '+key);
    }
  }

  assert.equal(selected.size,28);
});

test('C3-46 separation fixture keeps ordinary poverty independent from Secret Debt',()=>{
  assert.deepEqual(separation.ordinaryPovertyPackIds,manifest.ordinaryPovertyPackIds);
  const serialized=JSON.stringify(povertyPacks);
  assert.equal(/secret.?debt|lender|slave/i.test(serialized),false);

  const debtWrites=povertyEvents
    .flatMap((event:any)=>event.choices)
    .flatMap((choice:any)=>choice.effects)
    .filter((effect:any)=>effect.kind==='metric'&&effect.key==='debt');
  assert.equal(debtWrites.length,0);

  assert.equal(separation.assertions.ordinaryPovertyUsableWithoutSecretDebt,true);
  assert.equal(separation.assertions.noAutomaticDebtFromStreetHousing,true);
  assert.equal(separation.assertions.noAutomaticDebtFromLowMoney,true);
  assert.equal(separation.assertions.noProductValuesChosen,true);
});

test('C3-47 ownership flags keep shared systems outside Chat 3 changes',()=>{
  for(const [key,value] of Object.entries(manifest.ownership)){
    assert.equal(value,true,key);
  }
});
