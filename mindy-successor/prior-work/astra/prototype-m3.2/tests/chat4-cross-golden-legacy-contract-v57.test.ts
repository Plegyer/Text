import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

function readJson(relative:string){
  return JSON.parse(readFileSync(new URL(relative,import.meta.url),'utf8'));
}
function sorted(values:string[]){
  return [...values].sort();
}

const matrix=readJson('../../../../docs/tasks/CHAT4_CROSS_GOLDEN_LEGACY_CONSISTENCY_MATRIX_v56.json');
const contract=readJson('../../../../docs/tasks/CHAT4_CROSS_GOLDEN_LEGACY_CONTRACT_v57.json');

const c4=contract.domainSnapshots.chat4Mechanics;
const c6=contract.domainSnapshots.chat6PlayerFacing;
const c3=contract.domainSnapshots.chat3SaveMigration;

test('v57 source provenance and matrix disposition are frozen and conflict-free',()=>{
  assert.equal(contract.sources.chat4.operationsBlob,'17282cf11436d54d49915f44ed84de56a0eebf7c');
  assert.equal(contract.sources.chat4.gateBlob,'dae0b2bf197f66c1b1fe834e643caf541c6ef4c7');
  assert.equal(contract.sources.chat6.fixtureBlob,'bc8617be68825543ed7617e9dd5c7d915f6b0e14');
  assert.equal(contract.sources.chat6.handoffBlob,'f249b0e8de6db53868433c19db37c53f3bd483ac');
  assert.equal(contract.sources.chat3.designBlob,'b77db9b3d8bf145b2994d8e439dddeddabf96c69');
  assert.equal(contract.sources.chat3.prepBlob,'d9d34fab865e8ed289d2e89d41c01b284fed74e0');
  assert.equal(contract.sources.chat3.historicalBlob,'0a62c22c14310b9459d09ffa8b3d162fb1523d68');
  assert.equal(matrix.disposition.semanticConflictsFound,0);
  assert.deepEqual(matrix.contradictions,[]);
  assert.equal(matrix.disposition.chronologyResolutionUsed,false);
  assert.equal(matrix.disposition.lastWriteWinsUsed,false);
});

test('live lumber-stay and vitality are retired consistently across all owning contracts',()=>{
  assert.equal(c4.liveLumberStayAbsent,true);
  assert.equal(c6.liveLumberStayAbsent,true);
  assert.equal(c3.liveLumberStayAbsent,true);
  assert.equal(c4.liveVitalityAcquisitionAbsent,true);
  assert.equal(c6.liveVitalityAcquisitionAbsent,true);
  assert.equal(c3.liveVitalityModernOwnershipAbsent,true);
  assert.equal(c4.historicalPerkId,'legacy.lumber-stay.vitality');
  assert.equal(c6.historicalPerkId,c4.historicalPerkId);
  assert.equal(c3.historicalPerkId,c4.historicalPerkId);
  assert.equal(c4.historicalOnly,true);
  assert.equal(c6.historicalOnly,true);
  assert.equal(c3.historicalOnly,true);
});

test('player-facing and mechanics contracts have exact identical lumber deletion/retention sets',()=>{
  assert.deepEqual(sorted(c4.liveLocalizationDeletionKeys),sorted(c6.liveLocalizationDeletionKeys));
  assert.deepEqual(sorted(c4.historicalLocalizationRetentionKeys),sorted(c6.historicalLocalizationRetentionKeys));
  assert.deepEqual(sorted(c4.presentationDeletionSlots),sorted(c6.presentationDeletionSlots));

  assert.deepEqual(c4.liveLocalizationDeletionKeys,[
    'ending.lumber-stay.title',
    'ending.lumber-stay.description',
    'unlock.vitality.label',
    'presentation.static.ending.lumber-stay.alt',
    'presentation.static.ending.lumber-stay.caption'
  ]);
  assert.deepEqual(c4.historicalLocalizationRetentionKeys,[
    'legacy.ending.lumber-stay.title',
    'legacy.ending.lumber-stay.description',
    'legacy.perk.lumber-stay-vitality.label',
    'ui.ending.state.historical',
    'ui.legacy.historicalTitle'
  ]);
  assert.deepEqual(c4.presentationDeletionSlots,['ending/lumber-stay']);
});

test('historical vitality Energy is exactly +1 once and never a modern identity',()=>{
  assert.equal(c4.energyBonus,1);
  assert.equal(c4.energyMaxApplications,1);
  assert.equal(c3.energyBonus,1);
  assert.equal(c3.energyMaxApplications,1);
  assert.equal(c6.historicalLabelEnergyBonus,1);

  assert.equal(c4.noStrongMetaFabrication,true);
  assert.equal(c4.noHardWorkFabrication,true);
  assert.equal(c4.noPalaceFabrication,true);
  assert.equal(c3.noModernEndingFabrication,true);
  assert.equal(c3.noStrongMetaFabrication,true);
  assert.equal(c3.noHardWorkFabrication,true);
});

test('canonical ordinary ending count is exactly 40 with no cross-domain contradictory owner',()=>{
  assert.equal(c4.canonicalOrdinaryEndingCount,40);
  assert.equal(c6.canonicalOrdinaryEndingCount,null);
  assert.equal(c3.canonicalOrdinaryEndingCount,null);
});

test('historical lumber display is compatibility-only and cannot resolve as a live ending',()=>{
  assert.equal(c4.historicalDisplayInteractive,false);
  assert.equal(c6.historicalDisplayInteractive,false);
  assert.ok(c6.historicalUiRequiredTokens.includes('data-legacy-ending-id'));
  assert.ok(c6.historicalUiRequiredTokens.includes('legacy.ending.lumber-stay.title'));
  assert.ok(c6.historicalUiForbiddenTokens.includes('presentationIdForEnding(retiredLumberStayId)'));
});

test('RunResult transaction and profile migration semantics agree exactly enough for release gating',()=>{
  assert.equal(c4.preserveExistingRunResultAndTransactionExactly,true);
  assert.equal(c3.preserveExistingRunResultAndTransactionExactly,true);
  assert.equal(c4.preRunResultDeterministicProof,true);
  assert.equal(c3.preRunResultDeterministicProof,true);
  assert.equal(c4.noRewardReplay,true);
  assert.equal(c3.noRewardReplay,true);
  assert.equal(c4.profileMergeDedupesLegacyPerk,true);
  assert.equal(c3.profileMergeDedupesLegacyPerk,true);
  assert.equal(c3.parseTwiceIdempotent,true);
});

test('D46 fresh Lust 5 never authorizes rewriting stored historical Lust',()=>{
  assert.equal(c4.freshLust,5);
  assert.equal(c3.freshLust,5);
  assert.equal(c4.storedLustPreserved,true);
  assert.equal(c3.storedLustPreserved,true);
});

test('D47 package ownership remains separate from Strong Meta selection and current-run snapshots',()=>{
  assert.equal(c4.hardWorkPackagesOutsideStrongMetaSlots,true);
  assert.equal(c6.hardWorkPackagesOutsideStrongMetaSlots,true);
  assert.equal(c3.hardWorkPackagesOutsideStrongMetaSlots,true);
  assert.equal(c6.currentRunStrongMetaSnapshotEngineOwnedImmutable,true);
  assert.equal(c3.hardWorkPackageSnapshotPreserved,true);
});

test('cross-contract validator rules cover every required failure class without chronology or last-write-wins',()=>{
  const ids=new Set(contract.validationRules.map((x:any)=>x.id));
  for(const id of [
    'V01_EXACT_LIVE_DELETION_SET',
    'V02_EXACT_HISTORICAL_RETENTION_SET',
    'V03_EXACT_PRESENTATION_DELETE_SET',
    'V04_RETIRED_IDENTITY_CONTRADICTION',
    'V05_ENERGY_EXACTLY_ONE',
    'V06_NO_MODERN_IDENTITY_FABRICATION',
    'V07_ORDINARY_ENDING_COUNT',
    'V08_HISTORICAL_DISPLAY_NOT_LIVE',
    'V09_RUNRESULT_TRANSACTION_PRESERVATION',
    'V10_PROFILE_IDEMPOTENCE',
    'V11_D46_LUST_SEPARATION',
    'V12_D47_STRONG_META_SEPARATION',
    'V13_OWNER_BOUNDARY'
  ])assert.ok(ids.has(id),id);

  assert.ok(contract.forbiddenResolutionStrategies.includes('chronology-wins'));
  assert.ok(contract.forbiddenResolutionStrategies.includes('last-write-wins'));
  assert.ok(contract.forbiddenResolutionStrategies.includes('whole-file-snapshot-replacement'));
  assert.equal(contract.expectedResult.conflicts,0);
  assert.equal(contract.expectedResult.allValidationRulesPass,true);
  assert.equal(contract.expectedResult.selectiveAssemblySemanticallyAllowed,true);
});
