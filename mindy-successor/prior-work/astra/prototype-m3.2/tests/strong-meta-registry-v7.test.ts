import test from 'node:test';
import assert from 'node:assert/strict';

import {
  STRONG_META_IDS,
  STRONG_META_KEYSTONE_CAPACITY,
  STRONG_META_SPECIALIST_CAPACITY,
  canonicalStrongMetaState,
  emptyStrongMetaState,
  grantStrongMetaReward,
  migratePreferredStrongMetaSelectionForCatalog,
  resolveStrongMetaSnapshot,
  setPreferredStrongMetaKeystone,
  setPreferredStrongMetaSpecialist,
  strongMetaRegistry,
  validatePreferredStrongMetaSelection,
  validateStrongMetaRegistry
} from '../src/core/strongMeta.ts';

test('v7 registry contains exactly the four approved strong Meta rewards',()=>{
  validateStrongMetaRegistry();
  assert.equal(Object.keys(strongMetaRegistry).length,4);
  assert.equal(STRONG_META_KEYSTONE_CAPACITY,1);
  assert.equal(STRONG_META_SPECIALIST_CAPACITY,2);
  assert.equal(strongMetaRegistry[STRONG_META_IDS.palaceCap200].class,'specialist');
  assert.equal(strongMetaRegistry[STRONG_META_IDS.earnedReserveMatch].class,'keystone');
  assert.equal(strongMetaRegistry[STRONG_META_IDS.workRhythm].class,'keystone');
  assert.equal(strongMetaRegistry[STRONG_META_IDS.networkRetainer].class,'keystone');
});

test('ownership is separate from explicit Keystone/Specialist preference and deselection is exact',()=>{
  let state=emptyStrongMetaState();
  state=grantStrongMetaReward(state,STRONG_META_IDS.earnedReserveMatch);
  state=grantStrongMetaReward(state,STRONG_META_IDS.palaceCap200);
  const owned=[...state.ownership.ownedRewardIds];

  state=setPreferredStrongMetaKeystone(state,STRONG_META_IDS.earnedReserveMatch);
  state=setPreferredStrongMetaSpecialist(state,STRONG_META_IDS.palaceCap200,true);
  assert.deepEqual(state.preferredSelection,{
    keystoneId:STRONG_META_IDS.earnedReserveMatch,
    specialistIds:[STRONG_META_IDS.palaceCap200]
  });

  state=setPreferredStrongMetaSpecialist(state,STRONG_META_IDS.palaceCap200,false);
  assert.deepEqual(state.preferredSelection,{
    keystoneId:STRONG_META_IDS.earnedReserveMatch,
    specialistIds:[]
  });

  state=setPreferredStrongMetaKeystone(state,null);
  assert.deepEqual(state.preferredSelection,{keystoneId:null,specialistIds:[]});
  assert.deepEqual(state.ownership.ownedRewardIds,owned);
});

test('validation rejects unowned, unknown, wrong-class and over-capacity selection without silently pruning',()=>{
  let state=emptyStrongMetaState();
  state=grantStrongMetaReward(state,STRONG_META_IDS.palaceCap200);

  const wrongClass=canonicalStrongMetaState({
    ...state,
    preferredSelection:{keystoneId:STRONG_META_IDS.palaceCap200,specialistIds:[]}
  });
  assert.ok(validatePreferredStrongMetaSelection(wrongClass).some(issue=>issue.code==='wrong_reward_class'));

  const unknownId='future.route.unknown';
  const unknown=canonicalStrongMetaState({
    ownership:{ownedRewardIds:[...state.ownership.ownedRewardIds,unknownId]},
    knowledge:state.knowledge,
    preferredSelection:{keystoneId:null,specialistIds:[unknownId]}
  });
  assert.ok(validatePreferredStrongMetaSelection(unknown).some(issue=>issue.code==='unknown_reward'));

  const unowned=canonicalStrongMetaState({
    ...state,
    preferredSelection:{keystoneId:STRONG_META_IDS.workRhythm,specialistIds:[]}
  });
  assert.ok(validatePreferredStrongMetaSelection(unowned).some(issue=>issue.code==='reward_not_owned'));

  const three=canonicalStrongMetaState({
    ownership:{ownedRewardIds:[
      STRONG_META_IDS.palaceCap200,
      'future.route.one',
      'future.route.two'
    ]},
    knowledge:state.knowledge,
    preferredSelection:{
      keystoneId:null,
      specialistIds:[STRONG_META_IDS.palaceCap200,'future.route.one','future.route.two']
    }
  });
  assert.ok(validatePreferredStrongMetaSelection(three).some(issue=>issue.code==='specialist_capacity_exceeded'));
  assert.equal(three.preferredSelection.specialistIds.length,3);
});

test('current snapshot resolves deterministically with one Keystone plus cap-200 Specialist',()=>{
  let state=emptyStrongMetaState();
  for(const id of [STRONG_META_IDS.workRhythm,STRONG_META_IDS.palaceCap200])state=grantStrongMetaReward(state,id);
  state=setPreferredStrongMetaKeystone(state,STRONG_META_IDS.workRhythm);
  state=setPreferredStrongMetaSpecialist(state,STRONG_META_IDS.palaceCap200,true);

  const a=resolveStrongMetaSnapshot(state);
  const b=resolveStrongMetaSnapshot(state);
  assert.deepEqual(a,b);
  assert.equal(a.keystoneId,STRONG_META_IDS.workRhythm);
  assert.deepEqual(a.specialistIds,[STRONG_META_IDS.palaceCap200]);
  assert.equal(a.specialistCapacityAtStart,2);
  assert.equal(a.resolvedRewards.length,2);
  assert.equal(a.resolvedRewards.find(r=>r.id===STRONG_META_IDS.workRhythm)?.effect.kind,'work-rhythm');
  assert.deepEqual(
    a.resolvedRewards.find(r=>r.id===STRONG_META_IDS.palaceCap200)?.effect,
    {kind:'progression-stat-cap',cap:200}
  );
});

test('future same-ID reclassification relocates only when capacity permits and otherwise requires reselection',()=>{
  let state=emptyStrongMetaState();
  for(const id of [STRONG_META_IDS.workRhythm,STRONG_META_IDS.palaceCap200])state=grantStrongMetaReward(state,id);
  state=setPreferredStrongMetaKeystone(state,STRONG_META_IDS.workRhythm);
  state=setPreferredStrongMetaSpecialist(state,STRONG_META_IDS.palaceCap200,true);

  const relocated=migratePreferredStrongMetaSelectionForCatalog(state,{
    [STRONG_META_IDS.workRhythm]:{id:STRONG_META_IDS.workRhythm,class:'specialist',lifecycle:'active'},
    [STRONG_META_IDS.palaceCap200]:{id:STRONG_META_IDS.palaceCap200,class:'specialist',lifecycle:'active'}
  });
  assert.deepEqual(relocated.issues,[]);
  assert.equal(relocated.state.preferredSelection.keystoneId,null);
  assert.deepEqual(relocated.state.preferredSelection.specialistIds.sort(),[
    STRONG_META_IDS.palaceCap200,
    STRONG_META_IDS.workRhythm
  ].sort());

  const conflict=migratePreferredStrongMetaSelectionForCatalog(
    canonicalStrongMetaState({
      ownership:{ownedRewardIds:[
        STRONG_META_IDS.earnedReserveMatch,
        STRONG_META_IDS.workRhythm,
        STRONG_META_IDS.palaceCap200
      ]},
      knowledge:{inheritedKnowledgeIds:[]},
      preferredSelection:{
        keystoneId:STRONG_META_IDS.earnedReserveMatch,
        specialistIds:[STRONG_META_IDS.workRhythm,STRONG_META_IDS.palaceCap200]
      }
    }),
    {
      [STRONG_META_IDS.earnedReserveMatch]:{id:STRONG_META_IDS.earnedReserveMatch,class:'keystone',lifecycle:'active'},
      [STRONG_META_IDS.workRhythm]:{id:STRONG_META_IDS.workRhythm,class:'keystone',lifecycle:'active'},
      [STRONG_META_IDS.palaceCap200]:{id:STRONG_META_IDS.palaceCap200,class:'specialist',lifecycle:'active'}
    }
  );
  assert.equal(conflict.issues[0]?.code,'reclassification_conflict');
  assert.equal(conflict.state.preferredSelection.keystoneId,STRONG_META_IDS.earnedReserveMatch);
  assert.deepEqual(conflict.state.preferredSelection.specialistIds,[STRONG_META_IDS.workRhythm,STRONG_META_IDS.palaceCap200]);
});

test('unknown owned stable IDs survive canonicalization without becoming approved rewards',()=>{
  const state=canonicalStrongMetaState({
    ownership:{ownedRewardIds:['future.route.unknown']},
    knowledge:{inheritedKnowledgeIds:['future.knowledge.clue']},
    preferredSelection:{keystoneId:null,specialistIds:[]}
  });
  assert.deepEqual(state.ownership.ownedRewardIds,['future.route.unknown']);
  assert.deepEqual(state.knowledge.inheritedKnowledgeIds,['future.knowledge.clue']);
  assert.equal(Object.hasOwn(strongMetaRegistry,'future.route.unknown'),false);
});
