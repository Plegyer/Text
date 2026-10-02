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
