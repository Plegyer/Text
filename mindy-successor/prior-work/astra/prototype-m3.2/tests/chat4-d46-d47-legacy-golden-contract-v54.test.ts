import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

function readJson(relative:string){
  return JSON.parse(readFileSync(new URL(relative,import.meta.url),'utf8'));
}

const manifest=readJson('../../../../docs/tasks/CHAT4_D46_D47_LEGACY_GOLDEN_OPERATIONS_v53.json');
const gate=readJson('../../../../docs/tasks/CHAT4_D46_D47_LEGACY_GOLDEN_GATE_v54.json');

test('v53 golden operations carry exact frozen authorities and unique operation IDs',()=>{
  assert.equal(manifest.authorities.d46,'a0c5f855b63d3bb85556f5b2780aaaabb58fbced');
  assert.equal(manifest.authorities.d47,'252dc26c514e24f4ab0f0cc0da7694254282e4c4');
  assert.equal(manifest.authorities.lumberVerifiedTarget,'39912e7435c3707d98f96fe550d697c20ac0bedb');
  const ids=manifest.operations.map((op:any)=>op.id);
  assert.equal(new Set(ids).size,ids.length);
  assert.ok(manifest.assemblyPolicy.noWholeFileReplacement.includes('src/core/engine.ts'));
  assert.ok(manifest.assemblyPolicy.noWholeFileReplacement.includes('content/definitions.json'));
  assert.ok(manifest.assemblyPolicy.thirdValueRules.some((r:any)=>r.id==='THIRD_VALUE_STOP'));
});

test('v53 D46 golden values are exact and ordinary-only',()=>{
  assert.equal(manifest.goldenInvariants.freshLifeLust,5);
  assert.equal(manifest.goldenInvariants.existingSaveLustPreserved,true);
  assert.equal(manifest.goldenInvariants.ordinaryShiftWageCap,120);
  const wages=manifest.goldenInvariants.ordinaryWageBases;
  assert.deepEqual(Object.keys(wages).sort(),[
    'artist-geisha.shift','assassin.shift','guard.shift','hunter.shift','lumber.shift',
    'merchant.shift','prostitute.shift','satyr-maid.shift','tavern.shift','undead-farm.shift'
  ].sort());
  assert.equal(wages['lumber.shift'],35);
  for(const [id,value] of Object.entries(wages)){
    if(id!=='lumber.shift')assert.equal(value,37,id);
  }
  const op=manifest.operations.find((x:any)=>x.id==='D46_ORDINARY_SHIFT_WAGE_CAP');
  assert.equal(op.constants.ORDINARY_SHIFT_WAGE_CAP,120);
  assert.equal(op.appliesOnlyToActionIds.length,10);
  assert.ok(op.preserve.includes('Palace wages'));
  assert.ok(op.preserve.includes('Secret Debt hidden-work wage'));
});

test('v53 D47 package map and whole-package contract are exact',()=>{
  const op=manifest.operations.find((x:any)=>x.id==='D47_EXACT_PACKAGE_MAP');
  assert.equal(op.packages.length,10);
  assert.equal(op.aggregateProgressionStatPoints,75);
  assert.deepEqual(op.packages,[
    {career:'lumber',statBonuses:[{stat:'strength',amount:5}]},
    {career:'satyr-maid',statBonuses:[{stat:'charm',amount:5}]},
    {career:'undead-farm',statBonuses:[{stat:'magic',amount:5}]},
    {career:'tavern',statBonuses:[{stat:'wits',amount:5}]},
    {career:'hunter',statBonuses:[{stat:'dexterity',amount:5}]},
    {career:'guard',statBonuses:[{stat:'endurance',amount:5},{stat:'manners',amount:5}]},
    {career:'merchant',statBonuses:[{stat:'reason',amount:5},{stat:'sociability',amount:5}]},
    {career:'artist-geisha',statBonuses:[{stat:'creativity',amount:5},{stat:'grooming',amount:5}]},
    {career:'assassin',statBonuses:[{stat:'dexterity',amount:5},{stat:'wits',amount:5}]},
    {career:'prostitute',statBonuses:[{stat:'sexuality',amount:5},{stat:'charm',amount:5}],lustBonus:5}
  ]);
  const policy=manifest.operations.find((x:any)=>x.id==='D47_PACKAGE_SELECTION_POLICY').desired;
  assert.deepEqual(policy,{mode:'arbitrary-earned-subset',allowNone:true,allowAllEarned:true,wholePackageOnly:true});
});

test('v53 Hard Work threshold remains exactly 50 for ten ordinary ending IDs',()=>{
  const op=manifest.operations.find((x:any)=>x.id==='HARD_WORK_THRESHOLD_50');
  assert.equal(op.value,50);
  assert.equal(op.operator,'gte');
  assert.equal(op.endingIds.length,10);
  assert.equal(new Set(op.endingIds).size,10);
  assert.ok(op.endingIds.includes('ending.lumber.hard-work'));
  assert.ok(op.endingIds.includes('ending.prostitute.hard-work'));
});

test('v53 lumber retirement deletes only live identifiers and retains historical compatibility',()=>{
  assert.equal(manifest.goldenInvariants.canonicalOrdinaryEndingCountAfterRetirement,40);
  assert.equal(manifest.goldenInvariants.retiredLiveEndingId,'lumber-stay');
  assert.equal(manifest.goldenInvariants.retiredGenericUnlockId,'vitality');
  assert.equal(manifest.goldenInvariants.historicalLegacyPerkId,'legacy.lumber-stay.vitality');
  assert.equal(manifest.goldenInvariants.historicalLegacyEnergyBonus,1);

  const deleted=manifest.operations.find((x:any)=>x.id==='LUMBER_RETIRE_LIVE_LOCALIZATION').keys;
  assert.deepEqual(deleted,[
    'ending.lumber-stay.title',
    'ending.lumber-stay.description',
    'unlock.vitality.label',
    'presentation.static.ending.lumber-stay.alt',
    'presentation.static.ending.lumber-stay.caption'
  ]);

  const kept=manifest.operations.find((x:any)=>x.id==='LUMBER_KEEP_HISTORICAL_LOCALIZATION').keys;
  assert.deepEqual(kept,[
    'legacy.ending.lumber-stay.title',
    'legacy.ending.lumber-stay.description',
    'legacy.perk.lumber-stay-vitality.label',
    'ui.legacy.historicalTitle',
    'ui.ending.state.historical'
  ]);

  const slot=manifest.operations.find((x:any)=>x.id==='LUMBER_RETIRE_LIVE_PRESENTATION_SLOT');
  assert.equal(slot.slotId,'ending/lumber-stay');
  const helper=manifest.operations.find((x:any)=>x.id==='LUMBER_ADD_EXACT_LEGACY_HELPER');
  assert.equal(helper.authorityBlob,'e9484f9b6eaf834b656b3db9abfbc94c4a19fd58');
});

test('v54 gate has unique assertions and covers all mandatory cross-system owners',()=>{
  const assertionIds=gate.mandatoryAssertions.map((x:any)=>x.id);
  assert.equal(new Set(assertionIds).size,assertionIds.length);
  assert.equal(assertionIds.length,32);

  const phaseIds=gate.phases.map((x:any)=>x.id);
  assert.deepEqual(phaseIds,[
    'phase-d46-d47',
    'phase-migration-ending',
    'phase-lumber-retirement',
    'phase-strong-meta-palace',
    'phase-secret-debt-activity-night',
    'phase-localization-presentation'
  ]);

  const tests=new Set(gate.phases.flatMap((p:any)=>p.requiredTests));
  for(const required of [
    'tests/economy-start-balance-v14.test.ts',
    'tests/hard-work-bonus-mapping-v13.test.ts',
    'tests/lumber-stay-retirement-v17.test.ts',
    'tests/migration.test.ts',
    'tests/ending-meta.test.ts',
    'tests/strong-meta-registry-v7.test.ts',
    'tests/palace-d23-consumer-integration-v8.test.ts',
    'tests/secret-debt-full-route-v12.test.ts',
    'tests/secret-debt-activity-energy-compat-v20.test.ts',
    'tests/activity.test.ts',
    'tests/night-flow.test.ts',
    'tests/presentation-ending-parity-v9.test.ts',
    'tests/localization.test.ts'
  ]){
    assert.ok(tests.has(required),required);
  }
  assert.equal(gate.postIntegrationRecheck.freezeExactIntegratedHead,true);
  assert.equal(gate.postIntegrationRecheck.rerunAllPhasesOnExactHead,true);
  assert.ok(gate.stopConditions.length>=15);
  assert.equal(gate.thirdValueRules.length,4);
});
