import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const load=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const manifest=load('content/chat3-starter-poverty-collision-v1.fixture.json');
const definitions=load('content/definitions.json');
const localization=load('content/localization.json').strings as Record<string,{ru:string;en:string}>;

const satyrIdentity=load(manifest.fixtures.satyrIdentity);
const satyrService=load(manifest.fixtures.satyrService);
const satyrBoundary=load(manifest.fixtures.satyrBoundary);
const undeadIdentity=load(manifest.fixtures.undeadIdentity);
const undeadResearch=load(manifest.fixtures.undeadResearch);
const undeadSuccessor=load(manifest.fixtures.undeadSuccessor);
const povertySeasonal=load(manifest.fixtures.povertySeasonal);
const povertyContacts=load(manifest.fixtures.povertyContacts);
const satyrRuntime=load('../../../docs/tasks/SATYR_MAID_RUNTIME_CONTRACT_v1.json');
const undeadRuntime=load('../../../docs/tasks/UNDEAD_FARM_RUNTIME_CONTRACT_v1.json');

const packs=manifest.expected.povertyPackIds.map((id:string)=>
  load('content/packs/'+id+'.json')
);
const events=packs.flatMap((pack:any)=>pack.events);

function assertBilingual(strings:Record<string,{ru:string;en:string}>){
  for(const [key,pair] of Object.entries(strings)){
    assert.ok(pair.ru?.trim(),key+' ru');
    assert.ok(pair.en?.trim(),key+' en');
  }
}

test('C3 starter-career identity maps stay exact to current production careers and scenes',()=>{
  const satyr=definitions.careers.find((career:any)=>career.id===manifest.expected.satyrCareerId);
  const undead=definitions.careers.find((career:any)=>career.id===manifest.expected.undeadCareerId);
  assert.ok(satyr);
  assert.ok(undead);
  assert.equal(satyr.initialStage,satyrRuntime.career.stages[0]);
  assert.deepEqual(satyr.stages,satyrRuntime.career.stages);
  assert.deepEqual(satyr.transitions.map((transition:any)=>transition.id),[
    'first-shift','known-face','house-regular','veteran-service',
    'branch-house-power','branch-personal-network','branch-boundaries','outcome-ready'
  ]);
  assert.equal(undead.initialStage,undeadRuntime.career.stages[0]);
  assert.deepEqual(undead.stages,undeadRuntime.career.stages);
  assert.deepEqual(undead.transitions.map((transition:any)=>transition.id),undeadRuntime.career.transitions);

  const satyrAction=definitions.actions.find((action:any)=>action.id===manifest.expected.satyrActionId);
  const undeadAction=definitions.actions.find((action:any)=>action.id===manifest.expected.undeadActionId);
  assert.ok(satyrAction);
  assert.ok(undeadAction);
  for(const id of manifest.expected.satyrSceneIds)assert.ok(satyrAction.scenes.some((scene:any)=>scene.id===id),id);
  for(const id of manifest.expected.undeadSceneIds)assert.ok(undeadAction.scenes.some((scene:any)=>scene.id===id),id);

  const satyrScenes=new Set(satyrAction.scenes.map((scene:any)=>scene.id));
  const undeadScenes=new Set(undeadAction.scenes.map((scene:any)=>scene.id));
  for(const entry of satyrService.entries)assert.ok(satyrScenes.has(entry.sceneId),entry.sceneId);
  for(const entry of satyrBoundary.attachments)assert.ok(satyrScenes.has(entry.sceneId),entry.sceneId);
  for(const entry of undeadResearch.entries)assert.ok(undeadScenes.has(entry.sceneId),entry.sceneId);
  for(const entry of undeadSuccessor.hooks)assert.ok(undeadScenes.has(entry.sceneId),entry.sceneId);
});

test('C3 starter-career collision guard accepts approved Satyr and Undead runtime contracts',()=>{
  const satyrRelationship=definitions.relationships.find((rel:any)=>rel.id===satyrRuntime.relationship.id);
  assert.ok(satyrRelationship);
  assert.deepEqual(satyrRelationship.stages,satyrRuntime.relationship.stages);

  const undeadRelationship=definitions.relationships.find((rel:any)=>rel.id===undeadRuntime.relationship.id);
  assert.ok(undeadRelationship);
  assert.deepEqual(undeadRelationship.stages,undeadRuntime.relationship.stages);

  assert.deepEqual(
    definitions.endings.filter((ending:any)=>/satyr-maid/.test(ending.id)).map((ending:any)=>ending.id).sort(),
    [...new Set([...satyrRuntime.endings,'ending.satyr-maid.personal-network'])].sort()
  );
  assert.deepEqual(
    definitions.endings.filter((ending:any)=>/undead-farm/.test(ending.id)).map((ending:any)=>ending.id).sort(),
    [...new Set([...undeadRuntime.endings,'ending.undead-farm.external-anomaly'])].sort()
  );

  // Preparation fixtures predate both approved complete-career runtimes and remain historical evidence only.
  assert.equal(satyrIdentity.identityFamilies.guest.productionIdentityPresent,false);
  assert.equal(satyrService.invariants.noNewGuestIdentity,true);
  assert.equal(satyrBoundary.boundaries.persistentBoundaryState,false);
  assert.equal(undeadIdentity.research.productionIdentityPresent,false);
  assert.equal(undeadIdentity.successor.productionIdentityPresent,false);
  assert.equal(undeadIdentity.external.productionIdentityPresent,false);
});

test('approved Undead runtime reuses the existing preservation capability without changing the historical fixtures',()=>{
  const item=definitions.itemDefinitions.find((entry:any)=>entry.id===manifest.expected.preservationItemId);
  assert.ok(item);
  assert.ok(item.capabilities.includes(manifest.expected.preservationCapability));
  assert.equal(undeadRuntime.items.preservationKit.id,manifest.expected.preservationItemId);
  assert.equal(undeadRuntime.items.preservationKit.capability,manifest.expected.preservationCapability);
  assert.equal(undeadIdentity.research.existingCrossSystemCapability.currentUndeadFarmConsumer,false);
  assert.equal(undeadResearch.existingResearchAdjacentIdentity.currentUndeadFarmConsumer,false);
  assert.equal(undeadSuccessor.adjacentExistingCapability.currentUndeadFarmConsumer,false);
});

test('new starter-career RU EN strings are complete and use content-only namespaces',()=>{
  for(const fixture of [satyrService,satyrBoundary,undeadResearch,undeadSuccessor]){
    assertBilingual(fixture.strings);
    for(const key of Object.keys(fixture.strings)){
      assert.doesNotMatch(key,/secret.?debt|lender|ending\.|relationship\.|school\./i,key);
    }
  }
});

test('new poverty seasonal and contacts depth maps only to current event variants',()=>{
  const allEntries=[...povertySeasonal.entries,...povertyContacts.entries];
  const keys=allEntries.map((entry:any)=>entry.localizationKey);
  assert.equal(new Set(keys).size,keys.length);

  for(const entry of allEntries){
    const event=events.find((candidate:any)=>candidate.id===entry.eventId);
    assert.ok(event,entry.eventId);
    assert.ok(event.variants.some((variant:any)=>variant.id===entry.variantId),
      entry.eventId+' / '+entry.variantId);
    assert.ok(entry.localizationKey.startsWith('presentation.poverty.depth.'),entry.localizationKey);
    assert.equal(entry.localizationKey in localization,false,
      'candidate key already exists in current production localization: '+entry.localizationKey);
    assert.doesNotMatch(entry.localizationKey,/secret.?debt|lender/i,entry.localizationKey);
  }

  assertBilingual(povertySeasonal.strings);
  assertBilingual(povertyContacts.strings);
});

test('poverty contact effect snapshots still match existing choices and add no persistent system',()=>{
  for(const entry of povertyContacts.entries){
    const event=events.find((candidate:any)=>candidate.id===entry.eventId);
    assert.ok(event,entry.eventId);
    const choice=event.choices.find((candidate:any)=>candidate.id===entry.positiveChoiceId);
    assert.ok(choice,entry.positiveChoiceId);
    assert.deepEqual(choice.effects,entry.currentEffectSnapshot,entry.eventId);
    assert.equal(entry.persistentContact,false,entry.eventId);
  }

  assert.equal(povertyContacts.invariants.noEffectChanges,true);
  assert.equal(povertyContacts.invariants.noRelationshipWrites,true);
  assert.equal(povertyContacts.invariants.noCareerWrites,true);
  assert.equal(povertyContacts.invariants.noContactCounter,true);
  assert.equal(povertyContacts.invariants.noRecoveryMilestone,true);
  assert.equal(povertyContacts.invariants.noDebtOrSecretDebt,true);
});

test('C3 ownership flags preserve School runtime media Save RNG and Secret Debt ownership',()=>{
  for(const [key,value] of Object.entries(manifest.ownership)){
    assert.equal(value,true,key);
  }
  assert.equal(povertySeasonal.invariants.noSaveOrRngChanges,true);
  assert.equal(povertySeasonal.invariants.noMediaChanges,true);
  assert.equal(povertySeasonal.invariants.noSecretDebt,true);
  assert.equal(povertyContacts.invariants.noSaveOrRngChanges,true);
  assert.equal(povertyContacts.invariants.noMediaChanges,true);
});
