import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const contract=JSON.parse(readFileSync('../../../docs/tasks/PROSTITUTE_RUNTIME_PREP_CONTRACT_v1.json','utf8'));

test('Prostitute prep preserves exact shipped ordinary-work and Hard Work authority',()=>{
  const action=definitions.actions.find((a:any)=>a.id==='prostitute.shift');
  assert.ok(action);
  assert.deepEqual(action.cost,{money:0,energy:1});
  assert.deepEqual(action.conditions,[{
    kind:'any',
    conditions:[
      {kind:'all',conditions:[
        {kind:'stat',stat:'sexuality',op:'gte',value:55},
        {kind:'stat',stat:'charm',op:'gte',value:40},
        {kind:'stat',stat:'sociability',op:'gte',value:35}
      ]},
      {kind:'calendarYear',op:'gte',value:3}
    ]
  }]);
  assert.deepEqual(action.wage,{
    base:15,
    weights:[
      {stat:'sexuality',factor:0.35},
      {stat:'charm',factor:0.3},
      {stat:'manners',factor:0.2},
      {stat:'endurance',factor:0.15}
    ]
  });
  assert.deepEqual(action.scenes.map((x:any)=>x.id),[
    'spring.default','summer.default','autumn.default','winter.default'
  ]);
  assert.deepEqual(action.seasonal,{
    spring:[
      {kind:'modifyStat',stat:'sexuality',delta:1},
      {kind:'modifyStat',stat:'charm',delta:1}
    ],
    summer:[
      {kind:'modifyStat',stat:'charm',delta:1},
      {kind:'modifyStat',stat:'endurance',delta:1}
    ],
    autumn:[
      {kind:'modifyStat',stat:'manners',delta:1},
      {kind:'modifyStat',stat:'sexuality',delta:1}
    ],
    winter:[
      {kind:'modifyStat',stat:'charm',delta:1},
      {kind:'modifyStat',stat:'manners',delta:1}
    ]
  });

  const ending=definitions.endings.find((e:any)=>e.id==='ending.prostitute.hard-work');
  assert.ok(ending);
  assert.deepEqual(ending.conditions,[{
    kind:'careerCounter',career:'prostitute',counter:'completed_shifts',op:'gte',value:50
  }]);
  assert.equal(ending.reward,'prostitute.hardwork.compat');
  assert.deepEqual(ending.metaRewards,[{kind:'hardWork',rewardId:'hardWork:prostitute',career:'prostitute'}]);
  assert.deepEqual(
    definitions.endings.filter((e:any)=>e.id.startsWith('ending.prostitute.')).map((e:any)=>e.id),
    ['ending.prostitute.hard-work']
  );
});

test('Prostitute prep contract keeps adult routing, School producer authority, and complex endings null',()=>{
  assert.equal(contract.status,'SAFE_PREP_ONLY');
  assert.equal(contract.finalRebuildRequired,true);
  assert.equal(contract.adultContentRouter.status,'AUTHORITY_NULL');
  assert.equal(contract.adultContentRouter.lustThreshold,null);
  assert.equal(contract.adultContentRouter.consentStateMechanic,null);
  assert.equal(contract.adultContentRouter.explicitPresentationGate,null);
  assert.equal(contract.adultContentRouter.productionEventIds,null);
  assert.equal(contract.adultContentRouter.productionNightIds,null);
  assert.equal(contract.provisionalRuntimePrep.career.publicComplexEndingIds,null);
  assert.equal(contract.schoolHooks.length,5);
  assert.ok(contract.schoolHooks.every((x:any)=>x.producerThreshold===null));
  assert.ok(contract.schoolHooks.every((x:any)=>x.producerPublicFact===null));
  assert.ok(contract.schoolHooks.every((x:any)=>x.consumerEventId===null));
  assert.equal(contract.crossSystemReadOnlyInputs.artistGeisha,null);
});


test('Prostitute safe prep publishes typed local machines, narrow items, and voluntary Night only',()=>{
  const career=definitions.careers.find((x:any)=>x.id==='prostitute');
  assert.ok(career);
  assert.deepEqual(career.stages,contract.provisionalRuntimePrep.career.stages);

  const flow=definitions.quests.find((x:any)=>x.id==='prostitute.client-flow');
  assert.ok(flow);
  assert.deepEqual(flow.stages,contract.provisionalRuntimePrep.clientFlow.lifecycle);

  const relationship=definitions.relationships.find((x:any)=>x.id==='prostitute.recurring-client');
  assert.ok(relationship);
  assert.deepEqual(relationship.stages,['introduced','professional-trust','mode-open','mode-defined','conflict-open','route-resolved']);

  const exactItems:any={
    prostitute_formal_attire:['prostitute_formal_presence'],
    prostitute_private_room_key:['prostitute_private_room_access'],
    prostitute_client_token:['prostitute_client_token'],
    prostitute_evidence_case:['prostitute_handle_evidence']
  };
  for(const [id,capabilities] of Object.entries(exactItems)){
    const item=definitions.itemDefinitions.find((x:any)=>x.id===id);
    assert.ok(item,id);
    assert.deepEqual(item.capabilities,capabilities,id);
  }

  const night=definitions.nightChoices.find((x:any)=>x.id==='prostitute.night.client-followup');
  assert.ok(night);
  assert.equal(night.nextDayEnergyDelta,0);
  assert.deepEqual(night.nextDayEffects,[]);

  assert.deepEqual(
    definitions.endings.filter((e:any)=>e.id.startsWith('ending.prostitute.')).map((e:any)=>e.id),
    ['ending.prostitute.hard-work']
  );
});
