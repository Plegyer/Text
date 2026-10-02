import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const inventory=JSON.parse(readFileSync('content/merchant-authored-v18-inventory.fixture.json','utf8'));
const baseline=JSON.parse(readFileSync('content/merchant-authored-v18-activation-mechanics.fixture.json','utf8'));
const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));

test('C3-193 Merchant authored inventory preserves activation truth and defers final binding',()=>{
  assert.equal(inventory.status,'FROZEN_MERCHANT_RUNTIME_AUTHORITY');
  assert.equal(inventory.activation.mainHead,'d7dad76d47d71144a5788f762cedd72d9fc95ae5');
  assert.equal(inventory.activation.branchStart,inventory.activation.mainHead);
  assert.equal(inventory.activation.shipped.action.id,'merchant.shift');
  assert.equal(inventory.activation.shipped.action.energyCost,1);
  assert.deepEqual(inventory.activation.shipped.action.sceneIds,[
    'spring.default','summer.default','autumn.default','winter.default',
  ]);
  assert.deepEqual(inventory.activation.shipped.career,{
    id:'merchant',
    stages:['stall-hand'],
    transitions:[],
  });
  assert.equal(inventory.activation.shipped.ending.id,'ending.merchant.hard-work');
  assert.equal(inventory.runtimeAuthority.frozen,true);
  assert.equal(inventory.runtimeAuthority.finalBindingRequiredAt,'C3-204');
  assert.equal(inventory.invariants.finalLiveBindingDeferred,true);
});

test('C3-193 provisional contract inventory uses published Merchant namespace without gameplay authorship',()=>{
  assert.equal(inventory.invariants.authoredPrepOnly,true);
  assert.equal(inventory.invariants.createsGameplayIds,false);
  assert.equal(inventory.invariants.changesMechanics,false);
  assert.equal(inventory.invariants.changesEconomy,false);
  assert.equal(inventory.invariants.changesEndings,false);
  assert.equal(inventory.invariants.changesSchoolMechanics,false);

  assert.equal(inventory.provisionalContract.relationship.id,'merchant.supplier');
  assert.deepEqual(inventory.provisionalContract.publicEndings,['ending.merchant.hard-work']);

  const itemIds=inventory.provisionalContract.items.map((x:any)=>x.id);
  assert.deepEqual(itemIds,[
    'merchant_appraisal_scales',
    'merchant_manifest_case',
    'merchant_sample_kit',
  ]);
  assert.equal(new Set(itemIds).size,itemIds.length);

  assert.deepEqual(inventory.provisionalContract.tradeEvents,[
    'merchant.trade.appraisal',
    'merchant.trade.records',
    'merchant.trade.delivery',
    'merchant.trade.shortage',
  ]);
  assert.equal(inventory.provisionalContract.crisis.event,'merchant.crisis.delivery-pressure');
  assert.equal(inventory.provisionalContract.poverty.event,'merchant.poverty.liquidity-response');
  assert.equal(inventory.provisionalContract.poverty.writesEconomy,false);
  assert.equal(inventory.provisionalContract.poverty.writesDebt,false);
});

test('C3-193 School and cross-system authority stays narrow',()=>{
  assert.equal(inventory.provisionalContract.school.length,4);
  for(const hook of inventory.provisionalContract.school){
    assert.equal(hook.threshold,null,hook.track+' threshold');
    assert.equal(hook.selectedPublicFactId,null,hook.track+' public fact');
  }
  const etiquette=inventory.provisionalContract.school.find((x:any)=>x.track==='school.track.etiquette_and_presentation');
  assert.equal(etiquette.consumer,null);

  const sources=inventory.provisionalContract.crossSystem.map((x:any)=>x.source);
  assert.deepEqual(sources,['lumber','farm','hunter','tavern','guard','activity']);
  const activity=inventory.provisionalContract.crossSystem.find((x:any)=>x.source==='activity');
  assert.equal(activity.event,null);
  assert.match(activity.input,/hunter\.expedition-returned/);

  assert.deepEqual(inventory.provisionalContract.forbiddenFutureSeams,[
    'palace','artist-geisha','assassin','prostitute',
  ]);
  assert.ok(inventory.provisionalContract.forbiddenUnresolved.includes('globalPriceModel'));
  assert.ok(inventory.provisionalContract.forbiddenUnresolved.includes('creditDebtSubsystem'));
});


test('C3-203 safe prep preserves shipped Merchant mechanics exactly',()=>{
  const current={
    action:definitions.actions.find((x:any)=>x.id==='merchant.shift'),
    career:definitions.careers.find((x:any)=>x.id==='merchant'),
    ending:definitions.endings.find((x:any)=>x.id==='ending.merchant.hard-work'),
    itemDefinitions:(definitions.itemDefinitions||[]).filter((x:any)=>String(x.id).startsWith('merchant_')),
  };
  assert.equal(baseline.status,'ACTIVATION_BASELINE_FOR_SAFE_PREP_ONLY');
  assert.equal(baseline.finalRuntimeBaselineRequiredAt,'C3-204');
  assert.deepEqual(current,baseline.merchant);
});
