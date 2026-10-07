import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const load=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const definitions=load('content/definitions.json');
const localization=load('content/localization.json').strings as Record<string,{ru:string;en:string}>;
const forestResultPack=load('content/packs/forest-result-content-bilingual-v2.json');
const lumberCross=load('content/packs/lumber-cross-production.json');
const manifest=load('content/chat3-forest-poverty-parity-v6.fixture.json');

const audit=load(manifest.fixtures.audit);
const forestFixtures=manifest.fixtures.forest.map((path:string)=>load(path));
const povertyFixtures=manifest.fixtures.poverty.map((path:string)=>load(path));
const secretDebt=load(manifest.fixtures.secretDebt);
const povertyPacks=manifest.ordinaryPovertyPackIds.map((id:string)=>load('content/packs/'+id+'.json'));
const povertyEvents=povertyPacks.flatMap((pack:any)=>pack.events);

function assertBilingual(strings:Record<string,{ru:string;en:string}>){
  for(const [key,pair] of Object.entries(strings)){
    assert.ok(pair.ru?.trim(),key+' missing ru');
    assert.ok(pair.en?.trim(),key+' missing en');
  }
}

test('C3-49 consumption audit distinguishes live entry content from preparation-only depth',()=>{
  const liveEntry=audit.livePlayerFacing.find((entry:any)=>entry.surface==='activity_entry_body');
  assert.ok(liveEntry);
  for(const key of liveEntry.localizationKeys){
    assert.ok(localization[key]?.ru?.trim(),key+' ru');
    assert.ok(localization[key]?.en?.trim(),key+' en');
  }
  const prep=audit.preparationOnly.find((entry:any)=>entry.fixtureId==='forest.seasonal-result-depth.v1');
  assert.ok(prep);
  for(const key of prep.localizationKeys){
    assert.equal(key in localization,false,'preparation-only key leaked into production: '+key);
  }
});

test('C3-50/C3-51 route depth uses exact current route identities and gate',()=>{
  const activity=definitions.activities.find((entry:any)=>entry.id===manifest.expectedForest.activityId);
  assert.ok(activity);
  const optionById=new Map<string,any>(activity.options.map((entry:any)=>[entry.id,entry]));

  const logging=forestFixtures.find((fixture:any)=>fixture.id==='forest.logging-road-depth.v2');
  const oldBoundary=forestFixtures.find((fixture:any)=>fixture.id==='forest.old-boundary-depth.v2');
  assert.ok(logging);
  assert.ok(oldBoundary);

  assert.equal(optionById.get(logging.routeOptionId)?.setRoute,logging.routeId);
  assert.equal(optionById.get(oldBoundary.routeOptionId)?.setRoute,oldBoundary.routeId);
  assert.deepEqual(optionById.get(oldBoundary.routeOptionId)?.conditions,[oldBoundary.unlockCondition]);
  assert.equal(oldBoundary.unlockCondition.capability,manifest.expectedForest.oldBoundaryCapability);
});

test('C3-52/C3-53 aftermath depth preserves current terminal identities',()=>{
  const activity=definitions.activities.find((entry:any)=>entry.id===manifest.expectedForest.activityId);
  assert.ok(activity);
  const resultIds=new Set<string>(activity.results.map((entry:any)=>entry.id));
  const eventIds=new Set<string>(forestResultPack.events.map((entry:any)=>entry.id));
  const continuationIds=new Set<string>(lumberCross.events.map((entry:any)=>entry.id));

  const success=forestFixtures.find((fixture:any)=>fixture.id==='forest.success-aftermath-depth.v2');
  const nonSuccess=forestFixtures.find((fixture:any)=>fixture.id==='forest.escape-failure-aftermath-depth.v2');
  assert.ok(success);
  assert.ok(nonSuccess);

  assert.ok(resultIds.has(success.resultId),success.resultId);
  assert.ok(eventIds.has(success.resultEventId),success.resultEventId);
  assert.ok(continuationIds.has(success.lumberContinuationEventId),success.lumberContinuationEventId);

  for(const outcome of nonSuccess.outcomes){
    assert.ok(resultIds.has(outcome.resultId),outcome.resultId);
    assert.ok(eventIds.has(outcome.resultEventId),outcome.resultEventId);
    assert.equal(outcome.lumberContinuation,null);
  }
  assert.equal(nonSuccess.invariants.noLumberFacts,true);
  assert.equal(nonSuccess.invariants.noPenaltiesAdded,true);
  assert.equal(nonSuccess.invariants.noInjuriesAdded,true);
  assert.equal(nonSuccess.invariants.noPersistentState,true);
});

test('C3-54/C3-55/C3-56 poverty depth maps only to current production event variants',()=>{
  for(const fixture of povertyFixtures){
    for(const entry of fixture.entries){
      const event=povertyEvents.find((candidate:any)=>candidate.id===entry.eventId);
      assert.ok(event,entry.eventId);
      assert.ok(event.variants.some((variant:any)=>variant.id===entry.variantId),
        entry.eventId+' / '+entry.variantId);
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

test('all queue-v6 authored player-facing strings are RU/EN complete, unique and additive',()=>{
  const fixtures=[...forestFixtures,...povertyFixtures];
  const seen=new Set<string>();
  for(const fixture of fixtures){
    assertBilingual(fixture.strings??{});
    for(const key of Object.keys(fixture.strings??{})){
      assert.equal(seen.has(key),false,'duplicate candidate key: '+key);
      seen.add(key);
      assert.equal(key in localization,false,'production localization collision: '+key);
    }
  }
  assert.ok(seen.size>0);
});

test('C3-57 ordinary poverty remains separate from Secret Debt',()=>{
  assert.deepEqual(secretDebt.ordinaryPovertyPackIds,manifest.ordinaryPovertyPackIds);
  const serialized=JSON.stringify(povertyPacks);
  assert.equal(/secret.?debt|lender|slave/i.test(serialized),false);

  const debtWrites=povertyEvents
    .flatMap((event:any)=>event.choices)
    .flatMap((choice:any)=>choice.effects)
    .filter((effect:any)=>effect.kind==='metric'&&effect.key==='debt');
  assert.equal(debtWrites.length,0);

  const debtConditions=povertyEvents
    .flatMap((event:any)=>event.conditions??[])
    .filter((condition:any)=>JSON.stringify(condition).includes('"key":"debt"'));
  assert.equal(debtConditions.length,0);

  for(const actionId of secretDebt.genericDebtBoundary.actionIds){
    assert.ok(definitions.actions.some((action:any)=>action.id===actionId),actionId);
  }

  assert.equal(definitions.careers.some((career:any)=>/secret.?debt|slave|lender/i.test(JSON.stringify(career))),false);
  assert.equal((definitions.relationships??[]).some((relationship:any)=>/secret.?debt|slave|lender/i.test(JSON.stringify(relationship))),false);
  assert.deepEqual(
    definitions.endings
      .filter((ending:any)=>String(ending.id).startsWith('ending.secret-debt.'))
      .map((ending:any)=>ending.id)
      .sort(),
    [
      'ending.secret-debt.bound-life',
      'ending.secret-debt.paid-freedom',
      'ending.secret-debt.takeover'
    ]
  );
  assert.equal(secretDebt.findings.ordinaryPovertyIndependent,true);
  assert.equal(secretDebt.invariants.noNewDebtValues,true);
});
