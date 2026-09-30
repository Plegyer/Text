import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const load=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const definitions=load('content/definitions.json');
const localization=load('content/localization.json').strings as Record<string,{ru:string;en:string}>;
const presentation=load('content/presentation.json');
const forestResults=load('content/packs/forest-result-content-bilingual-v2.json');
const lumberCross=load('content/packs/lumber-cross-production.json');
const manifest=load('content/chat3-forest-poverty-consumption-parity-v7.fixture.json');
const reachability=load(manifest.reachabilityFixture);
const density=load(manifest.densityFixture);
const secretDebt=load(manifest.secretDebtFixture);
const povertyDepthSource=readFileSync('src/ui/povertyDepth.ts','utf8');

const forestPairs=manifest.forest.map((pair:any)=>({
  source:load(pair.source),
  handoff:load(pair.handoff)
}));
const povertyPairs=manifest.poverty.map((pair:any)=>({
  source:load(pair.source),
  handoff:load(pair.handoff)
}));
const povertyPacks=manifest.ordinaryPovertyPackIds.map((id:string)=>load('content/packs/'+id+'.json'));
const povertyEvents=povertyPacks.flatMap((pack:any)=>pack.events);

function assertBilingual(strings:Record<string,{ru:string;en:string}>){
  for(const [key,pair] of Object.entries(strings)){
    assert.ok(pair.ru?.trim(),key+' missing ru');
    assert.ok(pair.en?.trim(),key+' missing en');
  }
}

test('C3-61 reachability classification matches current consumer state',()=>{
  const liveDepth=reachability.ordinaryPoverty.playerFacing.find((entry:any)=>entry.surface==='poverty-depth-rotation');
  assert.ok(liveDepth);
  assert.equal(liveDepth.referencedLocalizationKeyCount,42);
  assert.equal(liveDepth.allReferencedKeysPresentInRootLocalization,true);
  assert.ok(povertyDepthSource.includes('povertyPendingLocalizationKey'));

  const forestEntry=reachability.forest.playerFacing.find((entry:any)=>entry.surface==='entry-body');
  assert.ok(forestEntry);
  for(const key of forestEntry.localizationKeys){
    assert.ok(localization[key]?.ru?.trim(),key+' ru');
    assert.ok(localization[key]?.en?.trim(),key+' en');
  }
});

test('C3-62/C3-63 Forest route consumption handoffs use exact current identities',()=>{
  const activity=definitions.activities.find((entry:any)=>entry.id===manifest.expectedForest.activityId);
  assert.ok(activity);
  const optionById=new Map<string,any>(activity.options.map((entry:any)=>[entry.id,entry]));

  const logging=forestPairs.find((pair:any)=>pair.handoff.id==='forest.logging-road-consumption-handoff.v2');
  const oldBoundary=forestPairs.find((pair:any)=>pair.handoff.id==='forest.old-boundary-consumption-handoff.v2');
  assert.ok(logging);
  assert.ok(oldBoundary);

  assert.equal(optionById.get(logging.handoff.routeOptionId)?.setRoute,logging.handoff.routeId);
  assert.equal(optionById.get(oldBoundary.handoff.routeOptionId)?.setRoute,oldBoundary.handoff.routeId);
  assert.deepEqual(optionById.get(oldBoundary.handoff.routeOptionId)?.conditions,[oldBoundary.handoff.existingUnlockCondition]);
  assert.equal(oldBoundary.handoff.existingUnlockCondition.capability,manifest.expectedForest.oldBoundaryCapability);

  for(const pair of [logging,oldBoundary]){
    assertBilingual(pair.source.strings);
    for(const entry of pair.handoff.entries){
      assert.ok(pair.source.strings[entry.localizationKey],entry.localizationKey);
      assert.equal(entry.localizationKey in localization,false,'Forest preparation key unexpectedly live: '+entry.localizationKey);
    }
  }
});

test('C3-64/C3-65 aftermath handoffs use exact current result/event identities',()=>{
  const activity=definitions.activities.find((entry:any)=>entry.id===manifest.expectedForest.activityId);
  assert.ok(activity);
  const resultIds=new Set<string>(activity.results.map((entry:any)=>entry.id));
  const eventIds=new Set<string>(forestResults.events.map((entry:any)=>entry.id));
  const continuationIds=new Set<string>(lumberCross.events.map((entry:any)=>entry.id));

  const success=forestPairs.find((pair:any)=>pair.handoff.id==='forest.success-aftermath-consumption-handoff.v2');
  const nonSuccess=forestPairs.find((pair:any)=>pair.handoff.id==='forest.escape-failure-consumption-handoff.v2');
  assert.ok(success);
  assert.ok(nonSuccess);

  assert.ok(resultIds.has(success.handoff.identities.resultId));
  assert.ok(eventIds.has(success.handoff.identities.resultEventId));
  assert.ok(continuationIds.has(success.handoff.identities.lumberContinuationEventId));

  for(const outcome of nonSuccess.handoff.outcomes){
    assert.ok(resultIds.has(outcome.resultId),outcome.resultId);
    assert.ok(eventIds.has(outcome.resultEventId),outcome.resultEventId);
    assert.equal(outcome.lumberContinuation,null);
  }

  for(const pair of [success,nonSuccess]){
    assertBilingual(pair.source.strings);
    for(const entry of pair.handoff.entries){
      assert.ok(pair.source.strings[entry.localizationKey],entry.localizationKey);
      assert.equal(entry.localizationKey in localization,false,'Forest aftermath key unexpectedly live: '+entry.localizationKey);
    }
  }
});

test('C3-66/C3-67/C3-68 poverty handoffs use current event/variant/choice identities and effects',()=>{
  for(const pair of povertyPairs){
    assertBilingual(pair.source.strings);
    for(const entry of pair.handoff.entries){
      assert.ok(pair.source.strings[entry.localizationKey],entry.localizationKey);
      assert.equal(entry.localizationKey in localization,false,'consumer-ready key already live: '+entry.localizationKey);

      const event=povertyEvents.find((candidate:any)=>candidate.id===entry.eventId);
      assert.ok(event,entry.eventId);
      assert.ok(event.variants.some((variant:any)=>variant.id===entry.variantId),
        entry.eventId+' / '+entry.variantId);

      if(entry.choiceId){
        const choice=event.choices.find((candidate:any)=>candidate.id===entry.choiceId);
        assert.ok(choice,entry.eventId+' / '+entry.choiceId);
        assert.deepEqual(choice.effects,entry.currentEffectSnapshot,entry.eventId);
      }
    }
    assert.equal(pair.handoff.consumerSeam.requiresNewRuntimeCapability,false);
  }
});

test('C3-69 Secret Debt remains separate from ordinary poverty',()=>{
  assert.equal(secretDebt.currentMainFindings.ordinaryDebtMetricWrites,0);
  assert.equal(secretDebt.currentMainFindings.ordinaryDebtConditions,0);
  assert.equal(secretDebt.currentMainFindings.ordinarySecretDebtTerms,0);
  assert.equal(secretDebt.currentMainFindings.ordinaryPovertyIndependent,true);

  const serialized=JSON.stringify(povertyPacks);
  assert.equal(/secret.?debt|lender|slave/i.test(serialized),false);

  const debtWrites=povertyEvents
    .flatMap((event:any)=>event.choices)
    .flatMap((choice:any)=>choice.effects)
    .filter((effect:any)=>effect.kind==='metric'&&effect.key==='debt');
  assert.equal(debtWrites.length,0);

  assert.equal(secretDebt.invariants.noProductValuesChosen,true);
  assert.ok(secretDebt.productOpen.includes('trigger chance'));
  assert.ok(secretDebt.productOpen.includes('offer amount'));
});

test('C3-70 density audit matches source content and has no exact duplicates',()=>{
  const allSources=[...forestPairs,...povertyPairs].map((pair:any)=>pair.source);
  const rows=allSources.flatMap((source:any)=>Object.entries(source.strings??{}).map(([key,pair]:any)=>({key,ru:pair.ru,en:pair.en})));
  assert.equal(rows.length,density.totals.authoredLocalizationPairs);
  assert.equal(new Set(rows.map((row:any)=>row.key)).size,rows.length);
  assert.equal(new Set(rows.map((row:any)=>row.ru)).size,rows.length);
  assert.equal(new Set(rows.map((row:any)=>row.en)).size,rows.length);
  assert.equal(density.disposition,'NO_TRIM_REQUIRED_BEFORE_CANDIDATE_FREEZE');
});

test('C3-71 presentation references exist and ownership remains outside shared systems',()=>{
  const slots=presentation.slots??{};
  const ids=new Set<string>();
  for(const pair of forestPairs){
    const source=pair.source;
    for(const key of ['presentationId','activityReturnPresentationId','resultPresentationId','lumberContinuationPresentationId']){
      if(typeof source[key]==='string')ids.add(source[key]);
    }
    for(const outcome of source.outcomes??[]){
      if(outcome.activityReturnPresentationId)ids.add(outcome.activityReturnPresentationId);
      if(outcome.resultPresentationId)ids.add(outcome.resultPresentationId);
    }
  }
  for(const id of ids)assert.ok(slots[id],id);

  for(const [name,value] of Object.entries(manifest.ownership)){
    assert.equal(value,true,name);
  }
});
