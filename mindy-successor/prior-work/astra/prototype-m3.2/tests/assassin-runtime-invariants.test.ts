import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const definitions=JSON.parse(readFileSync('content/definitions.json','utf8'));
const contract=JSON.parse(readFileSync('../../../docs/tasks/ASSASSIN_RUNTIME_PREP_CONTRACT_v1.json','utf8'));

test('Assassin prep preserves exact shipped ordinary-work and Hard Work authority',()=>{
  const action=definitions.actions.find((a:any)=>a.id==='assassin.shift');
  assert.ok(action);
  assert.deepEqual(action.cost,{money:0,energy:1});
  assert.deepEqual(action.conditions,[{
    kind:'any',
    conditions:[
      {kind:'all',conditions:[
        {kind:'stat',stat:'dexterity',op:'gte',value:30},
        {kind:'stat',stat:'wits',op:'gte',value:25},
        {kind:'stat',stat:'reason',op:'gte',value:20}
      ]},
      {kind:'calendarYear',op:'gte',value:3}
    ]
  }]);
  assert.deepEqual(action.wage,{
    base:15,
    weights:[
      {stat:'dexterity',factor:0.35},
      {stat:'wits',factor:0.3},
      {stat:'reason',factor:0.2},
      {stat:'manners',factor:0.1}
    ]
  });
  assert.deepEqual(action.scenes.map((x:any)=>x.id),[
    'spring.default','summer.default','autumn.default','winter.default'
  ]);
  assert.deepEqual(action.seasonal,{
    spring:[
      {kind:'modifyStat',stat:'dexterity',delta:1},
      {kind:'modifyStat',stat:'wits',delta:1}
    ],
    summer:[
      {kind:'modifyStat',stat:'dexterity',delta:1},
      {kind:'modifyStat',stat:'manners',delta:1}
    ],
    autumn:[
      {kind:'modifyStat',stat:'wits',delta:1},
      {kind:'modifyStat',stat:'reason',delta:1}
    ],
    winter:[
      {kind:'modifyStat',stat:'dexterity',delta:1},
      {kind:'modifyStat',stat:'reason',delta:1}
    ]
  });

  const ending=definitions.endings.find((e:any)=>e.id==='ending.assassin.hard-work');
  assert.ok(ending);
  assert.deepEqual(ending.conditions,[{
    kind:'careerCounter',career:'assassin',counter:'completed_shifts',op:'gte',value:50
  }]);
  assert.equal(ending.reward,'assassin.hardwork.compat');
  assert.deepEqual(ending.metaRewards,[{kind:'hardWork',rewardId:'hardWork:assassin',career:'assassin'}]);
  assert.deepEqual(
    definitions.endings.filter((e:any)=>e.id.startsWith('ending.assassin.')).map((e:any)=>e.id),
    ['ending.assassin.hard-work']
  );
});

test('Assassin prep contract keeps open design open and School producer authority null',()=>{
  assert.equal(contract.status,'SAFE_PREP_ONLY');
  assert.equal(contract.finalRebuildRequired,true);
  assert.equal(contract.provisionalRuntimePrep.career.publicComplexEndingIds,null);
  assert.equal(contract.provisionalRuntimePrep.career.exactContractCount,null);
  assert.equal(contract.unresolved.lethalNonlethalScope,null);
  assert.equal(contract.unresolved.combatPresence,null);
  assert.equal(contract.unresolved.targetContent,null);
  assert.equal(contract.unresolved.networkStructure,null);
  assert.equal(contract.unresolved.falloutModel,null);
  assert.equal(contract.unresolved.rewards,null);
  assert.equal(contract.unresolved.newPublicComplexEndingIds,null);
  assert.equal(contract.schoolHooks.length,5);
  assert.ok(contract.schoolHooks.every((x:any)=>x.producerThreshold===null));
  assert.ok(contract.schoolHooks.every((x:any)=>x.producerPublicFact===null));
  assert.ok(contract.schoolHooks.every((x:any)=>x.canonicalGate===false));
});


test('Assassin safe prep publishes typed local machines, narrow items, and advanced-only Activity without new endings',()=>{
  const career=definitions.careers.find((x:any)=>x.id==='assassin');
  assert.ok(career);
  assert.deepEqual(career.stages,contract.provisionalRuntimePrep.career.stages);

  const quest=definitions.quests.find((x:any)=>x.id==='assassin.contract');
  assert.ok(quest);
  assert.deepEqual(quest.stages,contract.provisionalRuntimePrep.contractQuest.lifecycle);

  const handler=definitions.relationships.find((x:any)=>x.id==='assassin.handler');
  assert.ok(handler);
  assert.deepEqual(handler.stages,['introduced','professional-trust','conflict-open','utility-ready','route-resolved']);

  const exactItems:any={
    assassin_concealed_toolset:['assassin_concealed_entry'],
    assassin_sealed_pass:['assassin_sealed_access'],
    assassin_disguise_kit:['assassin_context_disguise'],
    assassin_evidence_case:['assassin_handle_evidence']
  };
  for(const [id,capabilities] of Object.entries(exactItems)){
    const item=definitions.itemDefinitions.find((x:any)=>x.id===id);
    assert.ok(item,id);
    assert.deepEqual(item.capabilities,capabilities,id);
  }

  const activity=definitions.activities.find((x:any)=>x.id==='assassin.infiltration');
  assert.ok(activity);
  assert.equal(activity.adapter,'counter.v1');
  assert.equal(activity.timePolicy,'same_day');
  assert.equal(activity.failurePolicy,'exit_to_day');
  assert.ok(activity.entryConditions.some((c:any)=>c.kind==='careerFact'&&c.career==='assassin'&&c.fact==='infiltration-qualified'&&c.present===true));
  assert.deepEqual(activity.results.map((x:any)=>x.outcome).sort(),['escape','failure','success']);

  assert.deepEqual(
    definitions.endings.filter((e:any)=>e.id.startsWith('ending.assassin.')).map((e:any)=>e.id),
    ['ending.assassin.hard-work']
  );
});
