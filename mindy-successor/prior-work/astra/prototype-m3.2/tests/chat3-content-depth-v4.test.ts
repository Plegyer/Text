import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const load=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const definitions=load('content/definitions.json');
const localization=load('content/localization.json').strings as Record<string,{ru:string;en:string}>;

const satyrService=load('content/satyr-maid-service-depth-v2.fixture.json');
const satyrBoundary=load('content/satyr-maid-boundary-reputation-depth-v2.fixture.json');
const undeadAgriculture=load('content/undead-farm-seasonal-agriculture-depth-v2.fixture.json');
const undeadResearch=load('content/undead-farm-research-magic-depth-v2.fixture.json');
const forestAudit=load('content/forest-encounter-identity-audit-v2.fixture.json');
const forestDepth=load('content/forest-seasonal-result-depth-v1.fixture.json');
const povertySeasonal=load('content/ordinary-poverty-seasonal-survival-depth-v1.fixture.json');
const povertyRecovery=load('content/ordinary-poverty-recovery-contact-depth-v1.fixture.json');
const secretDebtAudit=load('content/secret-debt-boundary-audit-v1.fixture.json');
const forestResultPack=load('content/packs/forest-result-content-bilingual-v2.json');

const povertyPackIds=[
  'poverty-street-production',
  'poverty-street-production-v2',
  'poverty-cheap-production',
  'poverty-cheap-production-v2',
  'poverty-recovery-production',
  'poverty-pressure-production'
];
const povertyPacks=povertyPackIds.map(id=>load('content/packs/'+id+'.json'));
const povertyEvents=povertyPacks.flatMap((pack:any)=>pack.events);

function assertBilingual(strings:Record<string,{ru:string;en:string}>){
  for(const [key,pair] of Object.entries(strings)){
    assert.ok(pair.ru?.trim(),key+' missing ru');
    assert.ok(pair.en?.trim(),key+' missing en');
  }
}

function actionSceneIds(actionId:string){
  const action=definitions.actions.find((entry:any)=>entry.id===actionId);
  assert.ok(action,actionId);
  return new Set(action.scenes.map((scene:any)=>scene.id));
}

test('C3-27/C3-28 Satyr Maid depth uses only current seasonal shift scenes',()=>{
  const ids=actionSceneIds('satyr-maid.shift');
  for(const entry of satyrService.variants)assert.ok(ids.has(entry.sceneId),entry.sceneId);
  for(const entry of satyrBoundary.attachments)assert.ok(ids.has(entry.sceneId),entry.sceneId);
  assertBilingual(satyrService.strings);
  assertBilingual(satyrBoundary.strings);
  assert.equal(satyrService.invariants.noPersistentGuestIdentity,true);
  assert.equal(satyrBoundary.boundaries.noReputationScore,true);
  assert.equal(satyrBoundary.boundaries.noPersistentFlirt,true);
  assert.equal(satyrBoundary.boundaries.noRelationshipWrite,true);
});

test('C3-29/C3-30 Undead Farm depth uses only current seasonal shift/result identities',()=>{
  const ids=actionSceneIds('undead-farm.shift');
  for(const entry of undeadAgriculture.variants)assert.ok(ids.has(entry.sceneId),entry.sceneId);
  for(const entry of undeadResearch.sceneVariants)assert.ok(ids.has(entry.sceneId),entry.sceneId);
  for(const entry of undeadResearch.resultVariants){
    assert.equal(entry.presentationId,'job/undead-farm/result/default');
  }
  assertBilingual(undeadAgriculture.strings);
  assertBilingual(undeadResearch.strings);
  assert.equal(undeadAgriculture.invariants.noResearchFact,true);
  assert.equal(undeadResearch.invariants.noResearchFact,true);
  assert.equal(undeadResearch.adjacentExistingCapability.currentUndeadFarmConsumer,false);
});

test('C3-31 Forest audit matches current route and terminal result identities',()=>{
  const activity=definitions.activities.find((entry:any)=>entry.id==='lumber.forest');
  assert.ok(activity);

  const optionIds=new Set(activity.options.map((entry:any)=>entry.id));
  for(const route of forestAudit.activity.routeOptions){
    assert.ok(optionIds.has(route.id),route.id);
  }
  assert.deepEqual(
    activity.results.map((entry:any)=>({id:entry.id,outcome:entry.outcome})),
    forestAudit.activity.resultIds.map((entry:any)=>({id:entry.id,outcome:entry.outcome}))
  );
  // This v4 fixture remains a historical audit of the then-live slice.
  // v12 extends the same Activity with authored challenges without rewriting the fixture.
  assert.deepEqual(forestAudit.activity.nonTerminalEncounterIds,[]);
  assert.deepEqual(forestAudit.activity.challengeIds,[]);

  const byId=new Map(forestResultPack.events.map((event:any)=>[event.id,event]));
  for(const audited of forestAudit.currentResultEvents){
    const event:any=byId.get(audited.id);
    assert.ok(event,audited.id);
    for(const variantId of audited.variantIds)assert.ok(event.variants.some((variant:any)=>variant.id===variantId),audited.id+' / '+variantId);
    const historicalChoices=event.choices.filter((choice:any)=>choice.id!=='warden-conservation-route');
    assert.deepEqual(historicalChoices.map((choice:any)=>choice.id),audited.choiceIds);
    assert.deepEqual(historicalChoices.flatMap((choice:any)=>choice.effects),audited.effects);
  }
  const successEvent:any=byId.get('forest-result-content-v1.success');
  assert.ok(successEvent,'forest-result-content-v1.success');
  const warden=successEvent.choices.find((choice:any)=>choice.id==='warden-conservation-route');
  assert.ok(warden,'warden-conservation-route');
  assert.deepEqual(warden.conditions,[{kind:'metaUnlock',unlock:'knowledge.hunter.warden-signs',present:true},{kind:'worldFact',fact:'reward.hunter.warden-signs.used',present:false}]);
  assert.deepEqual(warden.effects,[{kind:'addWorldFact',fact:'reward.hunter.warden-signs.used'}]);
});

test('C3-32 Forest seasonal/result depth points only at current route/result IDs',()=>{
  const activity=definitions.activities.find((entry:any)=>entry.id==='lumber.forest');
  const optionIds=new Set(activity.options.map((entry:any)=>entry.id));
  const routeIds=new Set(activity.options.map((entry:any)=>entry.setRoute));
  const resultIds=new Set(activity.results.map((entry:any)=>entry.id));
  const eventIds=new Set(forestResultPack.events.map((entry:any)=>entry.id));

  for(const entry of forestDepth.routeVariants){
    assert.ok(optionIds.has(entry.routeOptionId),entry.routeOptionId);
    assert.ok(routeIds.has(entry.routeId),entry.routeId);
  }
  for(const entry of forestDepth.resultVariants){
    assert.ok(resultIds.has(entry.resultId),entry.resultId);
    assert.ok(eventIds.has(entry.eventId),entry.eventId);
  }
  assertBilingual(forestDepth.strings);
  assert.equal(forestDepth.invariants.noNewEncounterIds,true);
  assert.equal(forestDepth.invariants.noWorldFactChanges,true);
  assert.equal(forestDepth.invariants.noCareerFactChanges,true);
});

test('C3-33/C3-34 poverty depth maps to exact production event/variant IDs',()=>{
  const entries=[...povertySeasonal.entries,...povertyRecovery.entries];
  const keys=entries.map((entry:any)=>entry.localizationKey);
  assert.equal(new Set(keys).size,keys.length);

  for(const entry of entries){
    const event=povertyEvents.find((candidate:any)=>candidate.id===entry.eventId);
    assert.ok(event,entry.eventId);
    assert.ok(event.variants.some((variant:any)=>variant.id===entry.variantId),
      entry.eventId+' / '+entry.variantId);
    const source=povertySeasonal.strings[entry.localizationKey]??povertyRecovery.strings[entry.localizationKey];
    assert.deepEqual(localization[entry.localizationKey],source,
      'QA-accepted poverty depth key should be selectively integrated: '+entry.localizationKey);
  }

  assertBilingual(povertySeasonal.strings);
  assertBilingual(povertyRecovery.strings);
  assert.equal(povertySeasonal.boundaries.independentFromSecretDebt,true);
  assert.equal(povertyRecovery.boundaries.noSecretDebt,true);
});

test('C3-33/C3-34 recorded positive-choice effects stay exact',()=>{
  for(const fixture of [povertySeasonal,povertyRecovery]){
    for(const entry of fixture.entries){
      if(!entry.positiveChoiceId)continue;
      const event=povertyEvents.find((candidate:any)=>candidate.id===entry.eventId);
      const choice=event.choices.find((candidate:any)=>candidate.id===entry.positiveChoiceId);
      assert.ok(choice,entry.eventId+' / '+entry.positiveChoiceId);
      assert.deepEqual(choice.effects,entry.currentEffectSnapshot,entry.eventId);
    }
  }
  assert.equal(povertyRecovery.boundaries.noRelationshipWrites,true);
  assert.equal(povertyRecovery.boundaries.noContactCounter,true);
  assert.equal(povertyRecovery.boundaries.noRecoveryMilestone,true);
});

test('C3-35 Secret Debt audit preserves ordinary poverty and generic-debt separation',()=>{
  assert.deepEqual(secretDebtAudit.ordinaryPoverty.productionPackIds,povertyPackIds);

  const debtWrites=povertyEvents
    .flatMap((event:any)=>event.choices)
    .flatMap((choice:any)=>choice.effects)
    .filter((effect:any)=>effect.kind==='metric'&&effect.key==='debt');
  assert.equal(debtWrites.length,0);

  const serialized=JSON.stringify(povertyPacks);
  assert.equal(/secret.?debt|lender|slave/i.test(serialized),false);

  for(const id of secretDebtAudit.legacyGenericDebt.actionIds){
    assert.ok(definitions.actions.some((action:any)=>action.id===id),id);
  }

  assert.equal(
    definitions.careers.some((career:any)=>/secret.?debt|slave|lender/i.test(JSON.stringify(career))),
    false
  );
  assert.equal(
    (definitions.relationships??[]).some((relationship:any)=>/secret.?debt|slave|lender/i.test(JSON.stringify(relationship))),
    false
  );
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

  assert.equal(secretDebtAudit.currentDisposition.activeSecretDebtProductionCollision,false);
  assert.equal(secretDebtAudit.currentDisposition.ordinaryPovertyCanRecoverWithoutSecretDebt,true);
  assert.equal(secretDebtAudit.invariants.noNewDebtValues,true);
  assert.equal(secretDebtAudit.invariants.noGenericDebtRepurpose,true);
});

test('v4 fixture keys stay unique while only approved poverty-consumer keys are integrated',()=>{
  const unselected=[satyrService,satyrBoundary,undeadAgriculture,undeadResearch,forestDepth];
  const integrated=[povertySeasonal,povertyRecovery];
  const seen=new Set<string>();

  for(const fixture of [...unselected,...integrated]){
    assertBilingual(fixture.strings);
    for(const key of Object.keys(fixture.strings)){
      assert.equal(seen.has(key),false,'duplicate candidate key: '+key);
      seen.add(key);
    }
  }

  for(const fixture of unselected){
    for(const key of Object.keys(fixture.strings)){
      assert.equal(key in localization,false,'unselected selector-less key entered production: '+key);
    }
  }

  for(const fixture of integrated){
    for(const [key,value] of Object.entries(fixture.strings)){
      assert.deepEqual(localization[key],value,'integrated poverty key: '+key);
    }
  }
});
