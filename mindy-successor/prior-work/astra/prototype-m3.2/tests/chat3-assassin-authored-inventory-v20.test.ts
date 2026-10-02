import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const inventory=JSON.parse(readFileSync('content/assassin-authored-v20-inventory.fixture.json','utf8'));

test('C3-217 shipped Assassin identity is exact and narrow',()=>{
  assert.equal(inventory.status,'SAFE_PREP_ONLY_NO_ASSASSIN_RUNTIME_AUTHORITY');
  assert.equal(inventory.activation.branchStart,'d3b7fe038b35cdc53d786189ef7ba44853a7610d');
  assert.equal(inventory.activation.shipped.action.id,'assassin.shift');
  assert.equal(inventory.activation.shipped.action.energyCost,1);
  assert.deepEqual(inventory.activation.shipped.action.unlock,{
    allStats:{dexterity:30,wits:25,reason:20},
    orCalendarYear:3,
  });
  assert.deepEqual(inventory.activation.shipped.action.sceneIds,[
    'spring.default','summer.default','autumn.default','winter.default',
  ]);
  assert.deepEqual(inventory.activation.shipped.career,{
    id:'assassin',initialStage:'runner',stages:['runner'],transitions:[],
  });
  assert.deepEqual(inventory.activation.shipped.ending,{
    id:'ending.assassin.hard-work',
    reward:'assassin.hardwork.compat',
    metaRewardId:'hardWork:assassin',
  });
  assert.deepEqual(inventory.activation.shipped.activities,['lumber.forest','hunter.expedition']);
});

test('C3-217 draft career and contract concepts remain PENDING_RUNTIME_ID',()=>{
  assert.equal(inventory.draftCandidates.authority,'DESIGN_DRAFT_ONLY');
  const advanced=inventory.draftCandidates.careerStages.filter((x:any)=>x.runtimeId);
  assert.equal(advanced.length,8);
  for(const stage of advanced)assert.equal(stage.runtimeId,'PENDING_RUNTIME_ID',stage.draft);
  for(const value of Object.values(inventory.draftCandidates.futureConsumers)){
    assert.equal(value,'PENDING_RUNTIME_ID');
  }
  assert.deepEqual(inventory.draftCandidates.majorContractPhases,[
    'offer','intel','prep','method-choice','execute-or-abort-or-redirect','fallout',
  ]);
  assert.deepEqual(inventory.draftCandidates.methods,[
    'stealth','social-access','staged-accident','indirect-manipulation',
    'nonlethal-substitution','expose-target',
  ]);
});

test('C3-217 shipped external authority is fact-only and owned by source systems',()=>{
  assert.ok(inventory.shippedExternalAuthority.guard.facts.includes('cargo-pass-evidence'));
  assert.ok(inventory.shippedExternalAuthority.guard.facts.includes('tavern-evidence-known'));
  assert.ok(inventory.shippedExternalAuthority.tavern.facts.includes('rumour-confirmed'));
  assert.ok(inventory.shippedExternalAuthority.tavern.facts.includes('guest-ledger-evidence-ready'));
  assert.ok(inventory.shippedExternalAuthority.merchant.facts.includes('delivery-recorded'));
  assert.ok(inventory.shippedExternalAuthority.activity.shippedFacts.includes('careerFact:hunter:expedition-returned'));
  assert.ok(inventory.shippedExternalAuthority.activity.shippedFacts.includes('careerFact:hunter:expedition-rough-route'));
  assert.deepEqual(inventory.shippedExternalAuthority.activity.ids,['lumber.forest','hunter.expedition']);
});

test('C3-217 safe prep owns no mechanics, Activity engine, Palace or ending rules',()=>{
  for(const [key,value] of Object.entries(inventory.invariants)){
    if(key==='finalRuntimeBindingDeferred')assert.equal(value,true,key);
    else assert.equal(value,false,key);
  }
  assert.ok(inventory.forbiddenAssumptions.includes('globalMoralityStat'));
  assert.ok(inventory.forbiddenAssumptions.includes('universalBlackMarketShop'));
  assert.ok(inventory.forbiddenAssumptions.includes('PalaceUnlockFromAssassin'));
  assert.ok(inventory.forbiddenAssumptions.includes('everyContractSupportsEveryMethod'));
  assert.ok(inventory.forbiddenAssumptions.includes('ordinaryShiftEqualsCombat'));
  assert.ok(inventory.forbiddenAssumptions.includes('newPublicEndingIds'));
});
