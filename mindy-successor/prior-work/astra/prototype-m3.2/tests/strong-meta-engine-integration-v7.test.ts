import test from 'node:test';
import assert from 'node:assert/strict';

import {
  applyStrongMetaStartDay,
  dispatch,
  freshSave,
  palaceRunQualified,
  parseSave
} from '../src/core/engine.ts';
import {
  STRONG_META_IDS,
  emptyStrongMetaState,
  grantStrongMetaReward,
  setPreferredStrongMetaKeystone,
  setPreferredStrongMetaSpecialist
} from '../src/core/strongMeta.ts';
import type {Save} from '../src/core/schema.ts';
import {act,catalog} from './helpers.ts';

function allocateTen(s:Save){
  for(let i=0;i<10;i++)s=dispatch(s,{type:'allocate',stat:'strength',delta:1},catalog);
  return s;
}

function owned(...ids:(typeof STRONG_META_IDS)[keyof typeof STRONG_META_IDS][]){
  let state=emptyStrongMetaState();
  for(const id of ids)state=grantStrongMetaReward(state,id);
  return state;
}

test('creation resolves one Keystone + cap-200 snapshot before Hard Work and never multiplies values',()=>{
  let s=freshSave({
    hardWorkProgress:['lumber'],
    strongMeta:owned(STRONG_META_IDS.workRhythm,STRONG_META_IDS.palaceCap200)
  });

  s=dispatch(s,{type:'setStrongMetaKeystone',id:STRONG_META_IDS.workRhythm},catalog);
  s=dispatch(s,{type:'setStrongMetaSpecialist',id:STRONG_META_IDS.palaceCap200,active:true},catalog);
  s=dispatch(s,{type:'setHardWorkPackageActive',career:'lumber',active:true},catalog);
  s=allocateTen(s);
  s=dispatch(s,{type:'finishCreation'},catalog);

  assert.equal(s.schemaVersion,6);
  assert.equal(s.run.character.progressionStatCap,200);
  assert.equal(s.run.character.stats.strength,16);
  assert.equal(s.run.character.stats.endurance,1);
  assert.equal(s.run.creation.remaining,0);
  assert.equal(s.run.strongMetaSnapshot?.keystoneId,STRONG_META_IDS.workRhythm);
  assert.deepEqual(s.run.strongMetaSnapshot?.specialistIds,[STRONG_META_IDS.palaceCap200]);
  assert.equal(s.run.strongMetaSnapshot?.specialistCapacityAtStart,2);
  assert.equal(palaceRunQualified(s),false);

  assert.throws(
    ()=>dispatch(s,{type:'setStrongMetaKeystone',id:null},catalog),
    /Strong Meta.*закрыт/i
  );
});

test('save/reload preserves current-run snapshot and counters even if future preference changes',()=>{
  let state=owned(STRONG_META_IDS.networkRetainer,STRONG_META_IDS.palaceCap200);
  state=setPreferredStrongMetaKeystone(state,STRONG_META_IDS.networkRetainer);
  state=setPreferredStrongMetaSpecialist(state,STRONG_META_IDS.palaceCap200,true);

  let s=freshSave({strongMeta:state});
  s=allocateTen(s);
  s=dispatch(s,{type:'finishCreation'},catalog);

  assert.equal(s.run.resources.money,625);
  assert.equal(s.run.strongMetaRuntime.networkRetainerPaidDays,1);
  const snapshot=structuredClone(s.run.strongMetaSnapshot);
  const runtime=structuredClone(s.run.strongMetaRuntime);

  s.meta.strongMeta.preferredSelection={keystoneId:null,specialistIds:[]};
  const restored=parseSave(JSON.stringify(s),catalog);

  assert.deepEqual(restored.run.strongMetaSnapshot,snapshot);
  assert.deepEqual(restored.run.strongMetaRuntime,runtime);
  assert.deepEqual(restored.meta.strongMeta.preferredSelection,{keystoneId:null,specialistIds:[]});
  assert.equal(restored.run.resources.money,625);
});

test('actual ordinary shift drives Reserve Match and Work Rhythm only through explicit ordinary-work seam',()=>{
  let reserveState=owned(STRONG_META_IDS.earnedReserveMatch);
  reserveState=setPreferredStrongMetaKeystone(reserveState,STRONG_META_IDS.earnedReserveMatch);
  let reserve=freshSave({strongMeta:reserveState});
  reserve=allocateTen(reserve);
  reserve=dispatch(reserve,{type:'finishCreation'},catalog);
  reserve=act(reserve,'arrival');
  reserve=act(reserve,'lumber.shift');
  assert.ok(reserve.run.strongMetaRuntime.reserveMatchPaid>0);
  assert.ok(reserve.run.strongMetaRuntime.reserveMatchPaid<=1000);

  let rhythmState=owned(STRONG_META_IDS.workRhythm);
  rhythmState=setPreferredStrongMetaKeystone(rhythmState,STRONG_META_IDS.workRhythm);
  let rhythm=freshSave({strongMeta:rhythmState});
  rhythm=allocateTen(rhythm);
  rhythm=dispatch(rhythm,{type:'finishCreation'},catalog);
  rhythm=act(rhythm,'arrival');
  rhythm=act(rhythm,'lumber.shift');
  assert.equal(rhythm.run.strongMetaRuntime.workRhythmArmedForDay,rhythm.run.day+1);
  assert.equal(rhythm.run.strongMetaRuntime.workRhythmBonusDaysTriggered,0);
});

test('Retainer bound-day seam pauses payment and consumes the missed calendar day',()=>{
  let state=owned(STRONG_META_IDS.networkRetainer);
  state=setPreferredStrongMetaKeystone(state,STRONG_META_IDS.networkRetainer);
  let s=freshSave({strongMeta:state});
  s=allocateTen(s);
  s=dispatch(s,{type:'finishCreation'},catalog);
  assert.equal(s.run.resources.money,625);

  s.run.day=1;
  const bound=applyStrongMetaStartDay(s,true);
  assert.equal(bound.retainerPayment,0);
  assert.equal(bound.state.run.resources.money,625);
  assert.equal(bound.state.run.strongMetaRuntime.networkRetainerLastProcessedDay,1);

  const retry=applyStrongMetaStartDay(bound.state,false);
  assert.equal(retry.retainerPayment,0);
  assert.equal(retry.state.run.resources.money,625);
});

test('schema-5 migration creates empty typed state and never infers ownership from generic legacy scaffolding',()=>{
  const raw=JSON.parse(JSON.stringify(freshSave()));
  raw.schemaVersion=5;
  raw.meta.ruleModifiers={'energy.daily':1};
  raw.meta.activeLegacyPerks=['vitality'];
  delete raw.meta.strongMeta;
  delete raw.run.strongMetaSnapshot;
  delete raw.run.strongMetaRuntime;

  const migrated=parseSave(JSON.stringify(raw),catalog);
  assert.equal(migrated.schemaVersion,6);
  assert.deepEqual(migrated.meta.strongMeta.ownership.ownedRewardIds,[]);
  assert.deepEqual(migrated.meta.strongMeta.knowledge.inheritedKnowledgeIds,[]);
  assert.deepEqual(migrated.meta.strongMeta.preferredSelection,{keystoneId:null,specialistIds:[]});
  assert.equal(migrated.run.strongMetaSnapshot,null);
  assert.equal(migrated.meta.ruleModifiers['energy.daily'],1);
  assert.deepEqual(migrated.meta.activeLegacyPerks,['vitality']);
});

test('completed schema-5 life gets baseline compatibility snapshot without inventing cap-200 ownership',()=>{
  let s=freshSave();
  s=allocateTen(s);
  s=dispatch(s,{type:'finishCreation'},catalog);
  const raw=JSON.parse(JSON.stringify(s));
  raw.schemaVersion=5;
  raw.run.character.progressionStatCap=200;
  raw.run.character.stats.strength=150;
  delete raw.meta.strongMeta;
  delete raw.run.strongMetaSnapshot;
  delete raw.run.strongMetaRuntime;

  const migrated=parseSave(JSON.stringify(raw),catalog);
  assert.equal(migrated.schemaVersion,6);
  assert.equal(migrated.run.character.progressionStatCap,200);
  assert.equal(migrated.run.character.stats.strength,150);
  assert.equal(migrated.run.strongMetaSnapshot?.registryVersion,'legacy-v5');
  assert.deepEqual(migrated.run.strongMetaSnapshot?.resolvedRewards,[]);
  assert.deepEqual(migrated.meta.strongMeta.ownership.ownedRewardIds,[]);
});

test('protected Meta import unions only permanent strong ownership/knowledge and preserves current preference',()=>{
  let importedState=owned(STRONG_META_IDS.palaceCap200);
  importedState=setPreferredStrongMetaSpecialist(importedState,STRONG_META_IDS.palaceCap200,true);
  const imported=freshSave({strongMeta:importedState});

  let currentState=owned(STRONG_META_IDS.workRhythm);
  currentState={
    ...currentState,
    knowledge:{inheritedKnowledgeIds:['future.knowledge.clue']}
  };
  currentState=setPreferredStrongMetaKeystone(currentState,STRONG_META_IDS.workRhythm);
  const current=freshSave({strongMeta:currentState});

  const restored=parseSave(JSON.stringify(imported),catalog,current.meta);
  assert.deepEqual(restored.meta.strongMeta.ownership.ownedRewardIds.sort(),[
    STRONG_META_IDS.palaceCap200,
    STRONG_META_IDS.workRhythm
  ].sort());
  assert.deepEqual(restored.meta.strongMeta.knowledge.inheritedKnowledgeIds,['future.knowledge.clue']);
  assert.deepEqual(restored.meta.strongMeta.preferredSelection,{
    keystoneId:STRONG_META_IDS.workRhythm,
    specialistIds:[]
  });
  assert.equal(restored.run.strongMetaSnapshot,null);
});

test('D23 Palace qualification is unaffected by selected strong Meta rewards',()=>{
  let state=owned(STRONG_META_IDS.earnedReserveMatch,STRONG_META_IDS.palaceCap200);
  state=setPreferredStrongMetaKeystone(state,STRONG_META_IDS.earnedReserveMatch);
  state=setPreferredStrongMetaSpecialist(state,STRONG_META_IDS.palaceCap200,true);

  let s=freshSave({strongMeta:state});
  s=allocateTen(s);
  s=dispatch(s,{type:'finishCreation'},catalog);

  assert.equal(palaceRunQualified(s),false);
  assert.equal(s.meta.unlocks.includes('palace'),false);
});

test('parse rejects a mismatched resolved selection/reward snapshot',()=>{
  let state=owned(STRONG_META_IDS.palaceCap200);
  state=setPreferredStrongMetaSpecialist(state,STRONG_META_IDS.palaceCap200,true);
  let s=freshSave({strongMeta:state});
  s=allocateTen(s);
  s=dispatch(s,{type:'finishCreation'},catalog);

  const raw=JSON.parse(JSON.stringify(s));
  raw.run.strongMetaSnapshot.specialistIds=[];
  assert.throws(
    ()=>parseSave(JSON.stringify(raw),catalog),
    /selection\/reward mismatch/i
  );
});

test('parse rejects run-local Strong Meta counters without their resolved reward',()=>{
  let s=freshSave();
  s=allocateTen(s);
  s=dispatch(s,{type:'finishCreation'},catalog);

  const raw=JSON.parse(JSON.stringify(s));
  raw.run.strongMetaRuntime.reserveMatchPaid=1;
  assert.throws(
    ()=>parseSave(JSON.stringify(raw),catalog),
    /Reserve Match runtime state exists without resolved reward/i
  );
});

