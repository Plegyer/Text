import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const expectations=JSON.parse(readFileSync('content/lumber-shipped-activation-expectations.fixture.json','utf8'));
const legacy=JSON.parse(readFileSync('content/definitions.json','utf8'));
const target=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));
const productionPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-production.pack.json','utf8'));
const crossPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-cross-system.pack.json','utf8'));
const nightPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-night-acceptance.pack.json','utf8'));

const packs=[productionPack,crossPack,nightPack];
const packById=new Map(packs.map((pack:any)=>[pack.id,pack]));
const ids=(entries:any[]|undefined)=>(entries??[]).map(entry=>entry.id);

test('activation expectations preserve legacy lumber and target lumber.shift as distinct IDs',()=>{
  assert.equal(expectations.coexistence.legacyActionId,'lumber');
  assert.equal(expectations.coexistence.targetActionId,'lumber.shift');
  assert.equal(expectations.coexistence.overwriteAllowed,false);

  assert.ok(ids(legacy.actions).includes('lumber'));
  assert.ok(!ids(legacy.actions).includes('lumber.shift'));
  assert.ok(ids(target.actions).includes('lumber.shift'));
  assert.notEqual(expectations.coexistence.legacyActionId,expectations.coexistence.targetActionId);
});

test('activation expectations exactly enumerate target Lumber definitions and exclude synthetic School action',()=>{
  assert.deepEqual(expectations.targetDefinitions,{
    actions:['lumber.shift'],
    careers:['lumber'],
    relationships:['lumber.foreman'],
    activities:['lumber.forest'],
    endings:[
      'ending.lumber.hard-work',
      'ending.lumber.forewoman',
      'ending.lumber.forest'
    ]
  });

  for(const id of expectations.targetDefinitions.actions)assert.ok(ids(target.actions).includes(id),id);
  for(const id of expectations.targetDefinitions.careers)assert.ok(ids(target.careers).includes(id),id);
  for(const id of expectations.targetDefinitions.relationships)assert.ok(ids(target.relationships).includes(id),id);
  for(const id of expectations.targetDefinitions.activities)assert.ok(ids(target.activities).includes(id),id);
  for(const id of expectations.targetDefinitions.endings)assert.ok(ids(target.endings).includes(id),id);

  assert.ok(ids(target.actions).includes('school.lumber-management'));
  assert.ok(expectations.productionExclusions.includes('school.lumber-management'));
  assert.ok(!expectations.targetDefinitions.actions.includes('school.lumber-management'));
});

test('activation expectations exactly enumerate the three approved Lumber event pack families',()=>{
  assert.deepEqual(
    expectations.eventPacks.map((entry:any)=>entry.packId),
    ['lumber','lumber-cross','lumber-night']
  );

  for(const expected of expectations.eventPacks){
    const pack=packById.get(expected.packId);
    assert.ok(pack,expected.packId);
    assert.deepEqual(pack.events.map((event:any)=>event.id),expected.eventIds,expected.family);
  }
});

test('Hard Work activation expectation remains only completed_shifts >= 50 with exact hardWork:lumber',()=>{
  const hardWork=target.endings.find((ending:any)=>ending.id==='ending.lumber.hard-work');
  assert.ok(hardWork);
  assert.deepEqual(expectations.lockedContracts.hardWork,{
    endingId:'ending.lumber.hard-work',
    conditions:[
      {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
    ],
    rewardId:'hardWork:lumber'
  });
  assert.deepEqual(hardWork.conditions,expectations.lockedContracts.hardWork.conditions);
  assert.equal(hardWork.conditions.length,1);
  assert.deepEqual(hardWork.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);
});

test('Forest activation expectation remains exact activityResult continuation',()=>{
  const event=crossPack.events.find((entry:any)=>entry.id==='lumber-cross.activity-forest-return');
  assert.ok(event);
  assert.deepEqual(expectations.lockedContracts.forestContinuation,{
    boundaryKind:'activityResult',
    activityId:'lumber.forest',
    outcome:'success',
    resultId:'lumber.forest.success',
    eventId:'lumber-cross.activity-forest-return'
  });
  assert.deepEqual(event.reactionTriggers,[
    {kind:'activityResult',activity:'lumber.forest',outcome:'success',result:'lumber.forest.success'}
  ]);
});
