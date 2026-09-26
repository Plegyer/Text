import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const skeleton=JSON.parse(readFileSync('content/forest-challenge-skeleton.fixture.json','utf8'));
const definitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));

test('challenge skeleton exposes exactly three stable family contract IDs',()=>{
  assert.deepEqual(skeleton.families.map((f:any)=>f.familyId),[
    'forest.challenge.navigation',
    'forest.challenge.physical-obstacle',
    'forest.challenge.interpretation-ritual-anomaly'
  ]);
  assert.equal(new Set(skeleton.families.map((f:any)=>f.familyId)).size,3);
});

test('every family has bounded condition/effect categories plus capability and season hooks',()=>{
  for(const family of skeleton.families){
    assert.ok(family.allowedConditionCategories.length>=4,family.familyId);
    assert.ok(family.allowedEffectCategories.length>=4,family.familyId);
    assert.equal(family.capabilityHookAllowed,true,family.familyId);
    assert.equal(family.seasonAvailabilityHookAllowed,true,family.familyId);
    assert.ok(family.allowedConditionCategories.includes('calendarSeason'),family.familyId);
    assert.equal(family.exactThreshold,null,family.familyId);
    assert.equal(family.finalText,null,family.familyId);
    assert.equal(family.finalLoot,null,family.familyId);
    assert.equal(family.finalNpc,null,family.familyId);
  }
});

test('save/checkpoint skeleton prevents reload reroll and requires persisted resolved identity',()=>{
  assert.equal(skeleton.shared.checkpointAfterAcceptedOption,true);
  assert.equal(skeleton.shared.resolvedChallengePersists,true);
  assert.equal(skeleton.shared.rerollOnReloadAllowed,false);
  for(const family of skeleton.families){
    assert.ok(family.checkpointState.includes('familyId'),family.familyId);
    assert.ok(family.checkpointState.includes('challengeInstanceId'),family.familyId);
    assert.ok(family.checkpointState.includes('selectedOptionId'),family.familyId);
    assert.ok(family.checkpointState.includes('resolved=true'),family.familyId);
  }
});

test('challenge terminal shape stays on existing Forest success escape failure identities and exact A5 boundary',()=>{
  assert.deepEqual(skeleton.shared.terminalResultShape,{
    success:'lumber.forest.success',
    escape:'lumber.forest.escape',
    failure:'lumber.forest.failure'
  });
  assert.equal(skeleton.shared.exactA5Boundary,'activityResult');

  const forest=definitions.activities.find((a:any)=>a.id==='lumber.forest');
  assert.ok(forest);
  assert.deepEqual(
    forest.results.map((r:any)=>r.id),
    ['lumber.forest.success','lumber.forest.escape','lumber.forest.failure']
  );
});

test('skeleton leaves lore loot NPC and thresholds OPEN and cannot affect Hard Work',()=>{
  for(const open of ['stat thresholds','prose','NPC identities','loot']){
    assert.ok(skeleton.openFields.includes(open),open);
  }
  const hardWork=definitions.endings.find((e:any)=>e.id==='ending.lumber.hard-work');
  assert.deepEqual(hardWork.conditions,[
    {kind:'careerCounter',career:'lumber',counter:'completed_shifts',op:'gte',value:50}
  ]);
  assert.deepEqual(hardWork.metaRewards,[
    {kind:'hardWork',rewardId:'hardWork:lumber',career:'lumber'}
  ]);
  assert.equal(skeleton.hardWorkIsolation.challengePrerequisiteAllowed,false);
});
