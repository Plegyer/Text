import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const contract=JSON.parse(readFileSync('../../../docs/tasks/MERCHANT_RUNTIME_CONTRACT_v1.json','utf8'));

test('Merchant v15 preserves shipped action, seasonal, and Hard Work identities',()=>{
  const action=definitions.actions.find((a:any)=>a.id==='merchant.shift');
  assert.ok(action);
  assert.deepEqual(action.cost,{money:0,energy:1});
  assert.deepEqual(action.conditions,[{
    kind:'any',
    conditions:[
      {kind:'all',conditions:[
        {kind:'stat',stat:'wits',op:'gte',value:20},
        {kind:'stat',stat:'reason',op:'gte',value:20},
        {kind:'stat',stat:'sociability',op:'gte',value:15}
      ]},
      {kind:'calendarYear',op:'gte',value:2}
    ]
  }]);
  assert.deepEqual(action.wage,{
    base:37,
    weights:[
      {stat:'wits',factor:0.35},
      {stat:'charm',factor:0.25},
      {stat:'manners',factor:0.2},
      {stat:'reason',factor:0.15}
    ]
  });
  assert.deepEqual(action.scenes.map((x:any)=>x.id),[
    'spring.default','summer.default','autumn.default','winter.default'
  ]);

  const expectedSeasonal:any={
    spring:[
      {kind:'modifyStat',stat:'wits',delta:1},
      {kind:'modifyStat',stat:'charm',delta:1}
    ],
    summer:[
      {kind:'modifyStat',stat:'charm',delta:1},
      {kind:'modifyStat',stat:'manners',delta:1}
    ],
    autumn:[
      {kind:'modifyStat',stat:'wits',delta:1},
      {kind:'modifyStat',stat:'reason',delta:1}
    ],
    winter:[
      {kind:'modifyStat',stat:'reason',delta:1},
      {kind:'modifyStat',stat:'wits',delta:1}
    ]
  };
  for(const season of ['spring','summer','autumn','winter']){
    assert.deepEqual(action.seasonal[season].slice(0,2),expectedSeasonal[season],season);
    assert.deepEqual(action.seasonal[season][2],{
      kind:'incrementCareerCounter',career:'merchant',counter:`${season}_trades`,amount:1
    });
  }

  const ending=definitions.endings.find((e:any)=>e.id==='ending.merchant.hard-work');
  assert.ok(ending);
  assert.deepEqual(ending.conditions,[{
    kind:'careerCounter',career:'merchant',counter:'completed_shifts',op:'gte',value:50
  }]);
  assert.equal(ending.reward,'merchant.hardwork.compat');
  assert.deepEqual(ending.metaRewards,[{kind:'hardWork',rewardId:'hardWork:merchant',career:'merchant'}]);
  assert.deepEqual(
    definitions.endings.filter((e:any)=>e.id.startsWith('ending.merchant.')).map((e:any)=>e.id),
    [
      'ending.merchant.hard-work',
      'ending.merchant.house',
      'ending.merchant.speculator-smuggler',
      'ending.merchant.patron-of-routes'
    ]
  );
});

test('Merchant runtime contract publishes typed routes without invented complex endings or economy numbers',()=>{
  const career=definitions.careers.find((c:any)=>c.id==='merchant');
  assert.ok(career);
  assert.deepEqual(career.stages,contract.career.stages);
  assert.equal(contract.endings.merchantHouse,null);
  assert.equal(contract.endings.speculatorSmuggler,null);
  assert.equal(contract.endings.patronOfRoutes,null);
  assert.deepEqual(contract.unresolvedEconomy,{
    globalPriceModel:null,
    inventoryCapacity:null,
    creditDebtSubsystem:null,
    illegalGoodsLaw:null,
    merchantHouseCapitalThreshold:null,
    routePermitPrice:null
  });

  const exactItems:any={
    merchant_appraisal_scales:['merchant_appraise_goods'],
    merchant_manifest_case:['merchant_verify_manifest'],
    merchant_sample_kit:['merchant_handle_samples']
  };
  for(const [id,capabilities] of Object.entries(exactItems)){
    const item=definitions.itemDefinitions.find((x:any)=>x.id===id);
    assert.ok(item,id);
    assert.deepEqual(item.capabilities,capabilities,id);
  }
});
