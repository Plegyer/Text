import test from 'node:test';
import assert from 'node:assert/strict';

import {loadCatalog} from '../src/core/content.ts';
import {applyEffects,dispatch,freshSave,meets,parseSave} from '../src/core/engine.ts';
import {
  STRONG_META_IDS,
  STRONG_META_KNOWLEDGE_IDS,
  STRONG_META_SPECIALIST_CAPACITY,
  emptyStrongMetaState,
  grantStrongMetaKnowledge,
  grantStrongMetaReward,
  setPreferredStrongMetaSpecialist,
  strongMetaKnowledgeRegistry,
  strongMetaRegistry,
  validateStrongMetaRegistry
} from '../src/core/strongMeta.ts';
import type {Catalog,Save,Stat} from '../src/core/schema.ts';

const palaceEndingIds={
  service:'ending.palace.service-life',
  court:'ending.palace.court-power',
  inner:'ending.palace.inner-truth',
  home:'ending.palace.return-home'
} as const;

function career(id:string){
  return {id,label:id,initialStage:'entry',stages:['entry'],transitions:[]};
}
function relationship(id:string){
  return {
    id,label:id,initialStage:'unknown',stages:['unknown','professional'],
    transitions:[{id:'formal-intro',from:['unknown'],to:'professional',conditions:[],effects:[]}]
  };
}
function seasonalLoss(stat:Stat){
  const effect={kind:'modifyStat' as const,stat,delta:-1};
  return {spring:[effect],summer:[effect],autumn:[effect],winter:[effect]};
}
function shift(id:string,stat:Stat,conditions:any[]=[]){
  const careerId=id.replace(/\.shift$/,'');
  return {
    id,label:id,description:id,cost:{money:0,energy:0},conditions,
    effects:[{kind:'incrementCareerCounter',career:careerId,counter:'completed_shifts',amount:1}],
    mode:'normal',
    seasonal:seasonalLoss(stat)
  };
}
function ending(id:string,reward:string,metaRewards:any[]){
  return {id,title:id,description:id,conditions:[],reward,metaRewards,epilogue:`Completed ${id}.`};
}
function definitions(){
  return {
    version:'0.1.0',
    flags:['story.arrived'],
    actions:[
      shift('lumber.shift','dexterity'),
      shift('guard.shift','reason',[{kind:'worldFact',fact:'guard.open',present:true}]),
      shift('satyr-maid.shift','charm')
    ],
    endings:[
      ending(palaceEndingIds.service,STRONG_META_IDS.palaceSteadyPractice,[
        {kind:'strongMeta',rewardId:STRONG_META_IDS.palaceSteadyPractice,reward:STRONG_META_IDS.palaceSteadyPractice}
      ]),
      ending(palaceEndingIds.court,STRONG_META_IDS.palaceFormalIntroduction,[
        {kind:'strongMeta',rewardId:STRONG_META_IDS.palaceFormalIntroduction,reward:STRONG_META_IDS.palaceFormalIntroduction}
      ]),
      ending(palaceEndingIds.inner,STRONG_META_KNOWLEDGE_IDS.palaceSourceMethod,[
        {kind:'knowledge',rewardId:STRONG_META_KNOWLEDGE_IDS.palaceSourceMethod,knowledge:STRONG_META_KNOWLEDGE_IDS.palaceSourceMethod}
      ]),
      ending(palaceEndingIds.home,STRONG_META_IDS.palaceCap200,[
        {kind:'strongMeta',rewardId:STRONG_META_IDS.palaceCap200,reward:STRONG_META_IDS.palaceCap200}
      ])
    ],
    careers:[career('lumber'),career('guard'),career('satyr-maid')],
    relationships:[
      relationship('guard.captain'),
      relationship('guard.clerk'),
      relationship('guard.scout'),
      relationship('guard.fourth'),
      relationship('palace.courtier'),
      relationship('activity.contact'),
      relationship('secret-debt.owner')
    ]
  };
}
function catalog():Catalog{
  return loadCatalog(definitions(),[{
    schemaVersion:1,id:'d39-test-media',reads:[],writes:[],
    media:[{id:'stage.town',kind:'image',src:'assets/stage-town.svg',alt:'Town'}],
    events:[]
  }]);
}
function finishCreation(input:Save,cat:Catalog):Save{
  let s=input;
  for(let i=0;i<10;i++)s=dispatch(s,{type:'allocate',stat:'strength',delta:1},cat);
  s=dispatch(s,{type:'finishCreation'},cat);
  s.run.flags['story.arrived']=true;
  return s;
}
function selectedSpecialist(id:typeof STRONG_META_IDS.palaceSteadyPractice|typeof STRONG_META_IDS.palaceFormalIntroduction){
  let state=emptyStrongMetaState();
  state=grantStrongMetaReward(state,id);
  return setPreferredStrongMetaSpecialist(state,id,true);
}
function complete(input:Save,cat:Catalog,id:string):Save{
  let s=dispatch(input,{type:'commitEnding',id},cat);
  return dispatch(s,{type:'completeEnding'},cat);
}

test('D39 registry adds exactly two normal Specialists and Source Method stays automatic knowledge',()=>{
  validateStrongMetaRegistry();
  assert.equal(Object.keys(strongMetaRegistry).length,22);
  assert.equal(STRONG_META_SPECIALIST_CAPACITY,2);

  const steady=strongMetaRegistry[STRONG_META_IDS.palaceSteadyPractice];
  assert.equal(steady.class,'specialist');
  assert.equal(steady.authority,'D39');
  assert.deepEqual(steady.effect,{kind:'steady-practice',bindAtCompletedShifts:8,maxBoundCareers:2,protectionsPerCareer:3});

  const formal=strongMetaRegistry[STRONG_META_IDS.palaceFormalIntroduction];
  assert.equal(formal.class,'specialist');
  assert.equal(formal.authority,'D39');
  assert.deepEqual(formal.effect,{kind:'formal-introduction',maxUsesPerRun:3,maxUsesPerRelationship:1});

  assert.equal(Object.hasOwn(strongMetaRegistry,STRONG_META_KNOWLEDGE_IDS.palaceSourceMethod),false);
  assert.equal(strongMetaKnowledgeRegistry[STRONG_META_KNOWLEDGE_IDS.palaceSourceMethod].authority,'D39');
});

test('Service Life grants Steady Practice exactly once and only a later selected life activates it',()=>{
  const cat=catalog();
  let s=finishCreation(freshSave(),cat);
  assert.equal(s.run.strongMetaSnapshot?.specialistIds.includes(STRONG_META_IDS.palaceSteadyPractice),false);

  s=complete(s,cat,palaceEndingIds.service);
  assert.deepEqual(s.meta.strongMeta.ownership.ownedRewardIds,[STRONG_META_IDS.palaceSteadyPractice]);
  assert.deepEqual(s.meta.strongMeta.preferredSelection,{keystoneId:null,specialistIds:[]});
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,[STRONG_META_IDS.palaceSteadyPractice]);
  assert.equal(s.run.strongMetaSnapshot?.specialistIds.includes(STRONG_META_IDS.palaceSteadyPractice),false);

  const frozen=JSON.stringify(s);
  assert.equal(JSON.stringify(dispatch(s,{type:'completeEnding'},cat)),frozen);

  s=dispatch(s,{type:'newLife'},cat);
  s=dispatch(s,{type:'setStrongMetaSpecialist',id:STRONG_META_IDS.palaceSteadyPractice,active:true},cat);
  s=finishCreation(s,cat);
  assert.deepEqual(s.run.strongMetaSnapshot?.specialistIds,[STRONG_META_IDS.palaceSteadyPractice]);
});

test('Source Method is granted at completeEnding, never enters preference, and auto-inherits next life only',()=>{
  const cat=catalog();
  let s=finishCreation(freshSave(),cat);
  s=complete(s,cat,palaceEndingIds.inner);

  assert.deepEqual(s.meta.strongMeta.knowledge.inheritedKnowledgeIds,[STRONG_META_KNOWLEDGE_IDS.palaceSourceMethod]);
  assert.deepEqual(s.meta.strongMeta.ownership.ownedRewardIds,[]);
  assert.deepEqual(s.meta.strongMeta.preferredSelection,{keystoneId:null,specialistIds:[]});
  assert.equal(s.run.strongMetaSnapshot?.automaticKnowledgeIds.includes(STRONG_META_KNOWLEDGE_IDS.palaceSourceMethod),false);
  assert.equal(meets({kind:'strongMetaKnowledge',knowledge:STRONG_META_KNOWLEDGE_IDS.palaceSourceMethod,present:true},s,cat),false);
  assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,[STRONG_META_KNOWLEDGE_IDS.palaceSourceMethod]);

  s=dispatch(s,{type:'newLife'},cat);
  assert.throws(
    ()=>dispatch(s,{type:'setStrongMetaSpecialist',id:STRONG_META_KNOWLEDGE_IDS.palaceSourceMethod,active:true},cat),
    /unknown_reward/
  );
  s=finishCreation(s,cat);
  assert.deepEqual(s.run.strongMetaSnapshot?.automaticKnowledgeIds,[STRONG_META_KNOWLEDGE_IDS.palaceSourceMethod]);
  assert.deepEqual(s.run.strongMetaSnapshot?.specialistIds,[]);
  assert.equal(meets({kind:'strongMetaKnowledge',knowledge:STRONG_META_KNOWLEDGE_IDS.palaceSourceMethod,present:true},s,cat),true);
});

test('Steady Practice binds first two careers at shift 8 and prevents exactly three D31 seasonal losses each',()=>{
  const cat=catalog();
  let s=finishCreation(freshSave({strongMeta:selectedSpecialist(STRONG_META_IDS.palaceSteadyPractice)}),cat);
  s.run.character.stats.dexterity=10;

  for(let i=0;i<7;i++)s=dispatch(s,{type:'action',id:'lumber.shift'},cat);
  assert.deepEqual(s.run.strongMetaRuntime.steadyPracticeBoundCareerIds,[]);
  assert.equal(s.run.character.stats.dexterity,3);

  s=dispatch(s,{type:'action',id:'lumber.shift'},cat);
  assert.deepEqual(s.run.strongMetaRuntime.steadyPracticeBoundCareerIds,['lumber']);
  assert.equal(s.run.strongMetaRuntime.steadyPracticeProtectionsUsedByCareer.lumber,1);
  assert.equal(s.run.character.stats.dexterity,3);

  s=applyEffects(s,[{kind:'modifyStat',stat:'dexterity',delta:-1}],cat);
  assert.equal(s.run.character.stats.dexterity,2);
  assert.equal(s.run.strongMetaRuntime.steadyPracticeProtectionsUsedByCareer.lumber,1);
  s.run.character.stats.dexterity=3;

  s=dispatch(s,{type:'action',id:'lumber.shift'},cat);
  s=dispatch(s,{type:'action',id:'lumber.shift'},cat);
  assert.equal(s.run.strongMetaRuntime.steadyPracticeProtectionsUsedByCareer.lumber,3);
  assert.equal(s.run.character.stats.dexterity,3);

  s=dispatch(s,{type:'action',id:'lumber.shift'},cat);
  assert.equal(s.run.character.stats.dexterity,2);

  s.run.progression.worldFacts.push('guard.open');
  s.run.character.stats.reason=10;
  s=applyEffects(s,[{kind:'incrementCareerCounter',career:'guard',counter:'completed_shifts',amount:7}],cat);
  s=dispatch(s,{type:'action',id:'guard.shift'},cat);
  assert.deepEqual(s.run.strongMetaRuntime.steadyPracticeBoundCareerIds,['lumber','guard']);
  assert.equal(s.run.strongMetaRuntime.steadyPracticeProtectionsUsedByCareer.guard,1);
  assert.equal(s.run.character.stats.reason,10);

  s.run.character.stats.charm=10;
  s=applyEffects(s,[{kind:'incrementCareerCounter',career:'satyr-maid',counter:'completed_shifts',amount:7}],cat);
  s=dispatch(s,{type:'action',id:'satyr-maid.shift'},cat);
  assert.deepEqual(s.run.strongMetaRuntime.steadyPracticeBoundCareerIds,['lumber','guard']);
  assert.equal(s.run.character.stats.charm,9);

  const reloaded=parseSave(JSON.stringify(s),cat);
  assert.deepEqual(reloaded.run.strongMetaRuntime.steadyPracticeBoundCareerIds,['lumber','guard']);
  assert.equal(reloaded.run.strongMetaRuntime.steadyPracticeProtectionsUsedByCareer.lumber,3);
  assert.equal(reloaded.run.strongMetaRuntime.steadyPracticeProtectionsUsedByCareer.guard,1);

  const withoutReward=JSON.parse(JSON.stringify(reloaded));
  withoutReward.run.strongMetaSnapshot.specialistIds=[];
  withoutReward.run.strongMetaSnapshot.resolvedRewards=[];
  assert.throws(()=>parseSave(JSON.stringify(withoutReward),cat),/Steady Practice runtime state exists without resolved reward/);
});

test('Court Power grants Formal Introduction for a later selected life with three unique authored uses',()=>{
  const cat=catalog();
  let earned=finishCreation(freshSave(),cat);
  earned=complete(earned,cat,palaceEndingIds.court);
  assert.deepEqual(earned.meta.strongMeta.ownership.ownedRewardIds,[STRONG_META_IDS.palaceFormalIntroduction]);
  assert.deepEqual(earned.run.endings.result?.appliedMetaRewardIds,[STRONG_META_IDS.palaceFormalIntroduction]);
  assert.equal(earned.run.strongMetaSnapshot?.specialistIds.includes(STRONG_META_IDS.palaceFormalIntroduction),false);

  let s=dispatch(earned,{type:'newLife'},cat);
  s=dispatch(s,{type:'setStrongMetaSpecialist',id:STRONG_META_IDS.palaceFormalIntroduction,active:true},cat);
  s=finishCreation(s,cat);
  assert.deepEqual(s.run.strongMetaSnapshot?.specialistIds,[STRONG_META_IDS.palaceFormalIntroduction]);
  const condition=(relationshipId:string)=>({
    kind:'strongMetaFormalIntroductionAvailable' as const,
    career:'guard',
    relationship:relationshipId,
    transition:'formal-intro'
  });
  const effect=(relationshipId:string)=>({
    kind:'useStrongMetaFormalIntroduction' as const,
    career:'guard',
    relationship:relationshipId,
    transition:'formal-intro'
  });

  assert.equal(meets(condition('guard.captain'),s,cat),false);
  s.run.progression.worldFacts.push('guard.open');
  assert.equal(meets(condition('guard.captain'),s,cat),false);

  s=applyEffects(s,[{kind:'incrementCareerCounter',career:'guard',counter:'completed_shifts',amount:1}],cat);
  assert.equal(meets(condition('guard.captain'),s,cat),true);
  s=applyEffects(s,[effect('guard.captain')],cat);
  assert.equal(s.run.progression.relationships['guard.captain'].stage,'professional');
  assert.deepEqual(s.run.strongMetaRuntime.formalIntroductionUsedRelationshipIds,['guard.captain']);
  assert.equal(meets(condition('guard.captain'),s,cat),false);

  s=applyEffects(s,[effect('guard.clerk')],cat);
  s=applyEffects(s,[effect('guard.scout')],cat);
  assert.deepEqual(s.run.strongMetaRuntime.formalIntroductionUsedRelationshipIds,['guard.captain','guard.clerk','guard.scout']);
  assert.equal(meets(condition('guard.fourth'),s,cat),false);

  assert.equal(meets(condition('palace.courtier'),s,cat),false);
  assert.equal(meets(condition('activity.contact'),s,cat),false);
  assert.equal(meets(condition('secret-debt.owner'),s,cat),false);

  const before=JSON.stringify(s);
  assert.throws(()=>applyEffects(s,[effect('guard.captain')],cat),/Formal Introduction/);
  assert.equal(JSON.stringify(s),before);

  const reloaded=parseSave(JSON.stringify(s),cat);
  assert.deepEqual(reloaded.run.strongMetaRuntime.formalIntroductionUsedRelationshipIds,['guard.captain','guard.clerk','guard.scout']);
});

test('existing schema-6 saves receive empty D39 runtime defaults without inventing activation',()=>{
  const cat=catalog();
  const s=finishCreation(freshSave(),cat);
  const raw=JSON.parse(JSON.stringify(s));
  delete raw.run.strongMetaRuntime.steadyPracticeBoundCareerIds;
  delete raw.run.strongMetaRuntime.steadyPracticeProtectionsUsedByCareer;
  delete raw.run.strongMetaRuntime.formalIntroductionUsedRelationshipIds;

  const restored=parseSave(JSON.stringify(raw),cat);
  assert.deepEqual(restored.run.strongMetaRuntime.steadyPracticeBoundCareerIds,[]);
  assert.deepEqual(restored.run.strongMetaRuntime.steadyPracticeProtectionsUsedByCareer,{});
  assert.deepEqual(restored.run.strongMetaRuntime.formalIntroductionUsedRelationshipIds,[]);
});

test('protected profile merge unions D39 ownership and Source Method but preserves current preference',()=>{
  const cat=catalog();
  let importedStrong=emptyStrongMetaState();
  importedStrong=grantStrongMetaReward(importedStrong,STRONG_META_IDS.palaceSteadyPractice);
  importedStrong=grantStrongMetaKnowledge(importedStrong,STRONG_META_KNOWLEDGE_IDS.palaceSourceMethod);
  const imported=freshSave({strongMeta:importedStrong});

  let currentStrong=emptyStrongMetaState();
  currentStrong=grantStrongMetaReward(currentStrong,STRONG_META_IDS.palaceFormalIntroduction);
  currentStrong=setPreferredStrongMetaSpecialist(currentStrong,STRONG_META_IDS.palaceFormalIntroduction,true);
  const current=freshSave({strongMeta:currentStrong});

  const merged=parseSave(JSON.stringify(imported),cat,current.meta);
  assert.deepEqual(merged.meta.strongMeta.ownership.ownedRewardIds.sort(),[
    STRONG_META_IDS.palaceFormalIntroduction,
    STRONG_META_IDS.palaceSteadyPractice
  ].sort());
  assert.deepEqual(merged.meta.strongMeta.knowledge.inheritedKnowledgeIds,[STRONG_META_KNOWLEDGE_IDS.palaceSourceMethod]);
  assert.deepEqual(merged.meta.strongMeta.preferredSelection,{
    keystoneId:null,
    specialistIds:[STRONG_META_IDS.palaceFormalIntroduction]
  });
});
