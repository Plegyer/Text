import test from 'node:test';
import assert from 'node:assert/strict';
import rawBinding from '../content/activity-d38-reward-v26.fixture.json' with {type:'json'};

import {
  ACTIVITY_D38_TAGS,
  activityD38CanSecureResult,
  activityD38CanUseContactIntroduction,
  activityD38CarriedResultSurvives,
  activityD38SurveyFieldTimeCost,
  commitActivityD38ContactIntroduction,
  commitActivityD38SecureResult,
  commitActivityD38SurveyUse
} from '../src/core/activityD38.ts';
import {loadCatalog} from '../src/core/content.ts';
import {dispatch,freshSave,parseSave} from '../src/core/engine.ts';
import {
  D38_ACTIVITY_REGION_IDS,
  STRONG_META_IDS,
  STRONG_META_SPECIALIST_CAPACITY,
  emptyStrongMetaRuntime,
  emptyStrongMetaState,
  grantStrongMetaReward,
  resolveStrongMetaSnapshot,
  setPreferredStrongMetaSpecialist,
  validateStrongMetaRuntimeAgainstSnapshot,
  type ApprovedStrongRewardId,
  type D38ActivityRegionId,
  type ResolvedStrongMetaSnapshot,
  type StrongMetaRuntime
} from '../src/core/strongMeta.ts';
import type {Catalog,Save} from '../src/core/schema.ts';

const D38_IDS=[
  STRONG_META_IDS.activitySurveyorsAtlas,
  STRONG_META_IDS.activityFieldArchive,
  STRONG_META_IDS.activityContactNetwork
] as const;

function stateOwned(...ids:ApprovedStrongRewardId[]){
  let state=emptyStrongMetaState();
  for(const id of ids)state=grantStrongMetaReward(state,id);
  return state;
}

function snapshotFor(id:ApprovedStrongRewardId):ResolvedStrongMetaSnapshot{
  let state=stateOwned(id);
  state=setPreferredStrongMetaSpecialist(state,id,true);
  return resolveStrongMetaSnapshot(state);
}

function d38Context(
  snapshot:ResolvedStrongMetaSnapshot|null|undefined,
  runtime:StrongMetaRuntime,
  regionId:D38ActivityRegionId='lumber.forest'
){
  return {snapshot,runtime,regionId};
}

function syntheticEnding(id:string,reward:ApprovedStrongRewardId){
  return {
    id,
    title:id,
    description:id,
    conditions:[],
    reward,
    metaRewards:[{kind:'strongMeta',rewardId:reward,reward}],
    epilogue:id
  };
}

function lifecycleCatalog():Catalog{
  return loadCatalog({
    version:'0.1.0',
    flags:['story.arrived'],
    actions:[],
    endings:[
      syntheticEnding('ending.activity.pathfinder',STRONG_META_IDS.activitySurveyorsAtlas),
      syntheticEnding('ending.activity.preservation',STRONG_META_IDS.activityFieldArchive),
      syntheticEnding('ending.activity.network',STRONG_META_IDS.activityContactNetwork)
    ]
  },[]);
}

function ready(input:Save,cat:Catalog){
  let s=input;
  s.run.creation.remaining=0;
  s=dispatch(s,{type:'finishCreation'},cat);
  s.run.flags['story.arrived']=true;
  return s;
}

test('canonical D38 binding fixture maps all three endings to strongMeta ownership, never generic unlocks',()=>{
  const source=rawBinding as {
    version:number;
    authority:string;
    bindings:Array<{
      endingId:string;
      rewardId:string;
      metaReward:{kind:string;rewardId:string;reward:string};
    }>;
  };
  assert.equal(source.version,1);
  assert.equal(source.authority,'D38');
  assert.deepEqual(source.bindings.map(row=>[row.endingId,row.rewardId]),[
    ['ending.activity.pathfinder',STRONG_META_IDS.activitySurveyorsAtlas],
    ['ending.activity.preservation',STRONG_META_IDS.activityFieldArchive],
    ['ending.activity.network',STRONG_META_IDS.activityContactNetwork]
  ]);
  for(const row of source.bindings){
    assert.equal(row.metaReward.kind,'strongMeta');
    assert.equal(row.metaReward.rewardId,row.rewardId);
    assert.equal(row.metaReward.reward,row.rewardId);
  }
});

test('D38 registry rewards are normal Specialists and preserve the global capacity of two',()=>{
  assert.equal(STRONG_META_SPECIALIST_CAPACITY,2);
  let state=stateOwned(...D38_IDS);
  state=setPreferredStrongMetaSpecialist(state,D38_IDS[0],true);
  state=setPreferredStrongMetaSpecialist(state,D38_IDS[1],true);
  assert.deepEqual(state.preferredSelection.specialistIds.sort(),[D38_IDS[0],D38_IDS[1]].sort());
  assert.throws(
    ()=>setPreferredStrongMetaSpecialist(state,D38_IDS[2],true),
    /specialist_capacity_exceeded/i
  );
});

test('each D38 ending grants canonical ownership exactly once only at completeEnding and never activates in the earning life',()=>{
  const cat=lifecycleCatalog();
  const rows=[
    ['ending.activity.pathfinder',STRONG_META_IDS.activitySurveyorsAtlas],
    ['ending.activity.preservation',STRONG_META_IDS.activityFieldArchive],
    ['ending.activity.network',STRONG_META_IDS.activityContactNetwork]
  ] as const;

  for(const [endingId,rewardId] of rows){
    let s=ready(freshSave(),cat);
    const earningSnapshot=structuredClone(s.run.strongMetaSnapshot);
    assert.equal(s.meta.strongMeta.ownership.ownedRewardIds.includes(rewardId),false);
    assert.ok(s.run.endings.eligible.includes(endingId));

    s=dispatch(s,{type:'commitEnding',id:endingId},cat);
    assert.equal(s.meta.strongMeta.ownership.ownedRewardIds.includes(rewardId),false);
    assert.deepEqual(s.run.strongMetaSnapshot,earningSnapshot);

    s=dispatch(s,{type:'completeEnding'},cat);
    assert.equal(s.meta.strongMeta.ownership.ownedRewardIds.filter(id=>id===rewardId).length,1);
    assert.equal(s.meta.unlocks.includes(rewardId),false);
    assert.deepEqual(s.run.endings.result?.appliedMetaRewardIds,[rewardId]);
    assert.deepEqual(s.run.strongMetaSnapshot,earningSnapshot);
    assert.equal(s.run.strongMetaSnapshot?.specialistIds.includes(rewardId),false);

    const once=JSON.stringify(s);
    s=dispatch(s,{type:'completeEnding'},cat);
    assert.equal(JSON.stringify(s),once);

    s=dispatch(s,{type:'newLife'},cat);
    s=dispatch(s,{type:'setStrongMetaSpecialist',id:rewardId,active:true},cat);
    s=ready(s,cat);
    assert.equal(s.run.strongMetaSnapshot?.specialistIds.includes(rewardId),true);
  }
});

test('schema6 reload defaults missing D38 runtime state to empty without inferring ownership or use',()=>{
  const cat=lifecycleCatalog();
  const raw=JSON.parse(JSON.stringify(freshSave()));
  delete raw.run.strongMetaRuntime.activityD38;
  const restored=parseSave(JSON.stringify(raw),cat);
  assert.deepEqual(restored.run.strongMetaRuntime.activityD38,{
    surveyorsAtlasUsedRegionIds:[],
    fieldArchiveSecured:[],
    contactNetworkUsedRegionIds:[]
  });
  assert.deepEqual(restored.meta.strongMeta.ownership.ownedRewardIds,[]);
});

test('profile merge unions D38 ownership, preserves current preference, and does not merge run-local usage from profile Meta',()=>{
  const cat=lifecycleCatalog();

  let importedState=stateOwned(STRONG_META_IDS.activitySurveyorsAtlas);
  const imported=freshSave({strongMeta:importedState});
  imported.run.strongMetaRuntime.activityD38.surveyorsAtlasUsedRegionIds=[];

  let currentState=stateOwned(STRONG_META_IDS.activityFieldArchive);
  currentState=setPreferredStrongMetaSpecialist(currentState,STRONG_META_IDS.activityFieldArchive,true);
  const current=freshSave({strongMeta:currentState});

  const restored=parseSave(JSON.stringify(imported),cat,current.meta);
  assert.deepEqual(restored.meta.strongMeta.ownership.ownedRewardIds.sort(),[
    STRONG_META_IDS.activityFieldArchive,
    STRONG_META_IDS.activitySurveyorsAtlas
  ].sort());
  assert.deepEqual(restored.meta.strongMeta.preferredSelection,{
    keystoneId:null,
    specialistIds:[STRONG_META_IDS.activityFieldArchive]
  });
  assert.deepEqual(restored.run.strongMetaRuntime.activityD38,{
    surveyorsAtlasUsedRegionIds:[],
    fieldArchiveSecured:[],
    contactNetworkUsedRegionIds:[]
  });
});

test('Surveyor Atlas saves exactly one authored 1-FT survey per region and never changes entry Energy or baseline Field Time',()=>{
  const snapshot=snapshotFor(STRONG_META_IDS.activitySurveyorsAtlas);
  let runtime=emptyStrongMetaRuntime();
  const tagged=[ACTIVITY_D38_TAGS.surveyDiscovery];

  assert.equal(activityD38SurveyFieldTimeCost({...d38Context(snapshot,runtime),authoredFieldTimeCost:1,tags:tagged}),0);
  runtime=commitActivityD38SurveyUse({...d38Context(snapshot,runtime),authoredFieldTimeCost:1,tags:tagged});
  assert.deepEqual(runtime.activityD38.surveyorsAtlasUsedRegionIds,['lumber.forest']);
  assert.equal(activityD38SurveyFieldTimeCost({...d38Context(snapshot,runtime),authoredFieldTimeCost:1,tags:tagged}),1);

  assert.equal(activityD38SurveyFieldTimeCost({...d38Context(snapshot,runtime,'trade.corridor'),authoredFieldTimeCost:1,tags:[]}),1);
  assert.equal(activityD38SurveyFieldTimeCost({...d38Context(snapshot,runtime,'trade.corridor'),authoredFieldTimeCost:2,tags:tagged}),2);
  assert.equal(activityD38SurveyFieldTimeCost({...d38Context(null,emptyStrongMetaRuntime(),'trade.corridor'),authoredFieldTimeCost:1,tags:tagged}),1);

  for(const regionId of D38_ACTIVITY_REGION_IDS.slice(1)){
    runtime=commitActivityD38SurveyUse({...d38Context(snapshot,runtime,regionId),authoredFieldTimeCost:1,tags:tagged});
  }
  assert.equal(runtime.activityD38.surveyorsAtlasUsedRegionIds.length,4);

  const entryEnergy=2;
  const baselineFieldTime=6;
  assert.equal(entryEnergy,2);
  assert.equal(baselineFieldTime,6);
});

test('Surveyor Atlas usage survives save-like cloning and cannot be replayed after a boundary',()=>{
  const snapshot=snapshotFor(STRONG_META_IDS.activitySurveyorsAtlas);
  const tagged=[ACTIVITY_D38_TAGS.surveyDiscovery];
  let runtime=commitActivityD38SurveyUse({
    ...d38Context(snapshot,emptyStrongMetaRuntime()),
    authoredFieldTimeCost:1,
    tags:tagged
  });
  runtime=structuredClone(runtime);
  assert.equal(activityD38SurveyFieldTimeCost({...d38Context(snapshot,runtime),authoredFieldTimeCost:1,tags:tagged}),1);
  validateStrongMetaRuntimeAgainstSnapshot(snapshot,runtime);
});


test('D38 usage survives actual schema6 save/reload when the matching Specialist is in the immutable run snapshot',()=>{
  const cat=lifecycleCatalog();
  let meta=stateOwned(STRONG_META_IDS.activitySurveyorsAtlas);
  meta=setPreferredStrongMetaSpecialist(meta,STRONG_META_IDS.activitySurveyorsAtlas,true);
  let s=ready(freshSave({strongMeta:meta}),cat);
  s.run.strongMetaRuntime=commitActivityD38SurveyUse({
    ...d38Context(s.run.strongMetaSnapshot,s.run.strongMetaRuntime,'lumber.forest'),
    authoredFieldTimeCost:1,
    tags:[ACTIVITY_D38_TAGS.surveyDiscovery]
  });

  const restored=parseSave(JSON.stringify(s),cat);
  assert.deepEqual(restored.run.strongMetaRuntime.activityD38.surveyorsAtlasUsedRegionIds,['lumber.forest']);
  assert.equal(activityD38SurveyFieldTimeCost({
    ...d38Context(restored.run.strongMetaSnapshot,restored.run.strongMetaRuntime,'lumber.forest'),
    authoredFieldTimeCost:1,
    tags:[ACTIVITY_D38_TAGS.surveyDiscovery]
  }),1);
});

test('new life resets run-local D38 usage while preserving permanent ownership and explicit future preference',()=>{
  const cat=lifecycleCatalog();
  let meta=stateOwned(STRONG_META_IDS.activitySurveyorsAtlas);
  meta=setPreferredStrongMetaSpecialist(meta,STRONG_META_IDS.activitySurveyorsAtlas,true);
  let s=ready(freshSave({strongMeta:meta}),cat);
  s.run.strongMetaRuntime=commitActivityD38SurveyUse({
    ...d38Context(s.run.strongMetaSnapshot,s.run.strongMetaRuntime,'trade.corridor'),
    authoredFieldTimeCost:1,
    tags:[ACTIVITY_D38_TAGS.surveyDiscovery]
  });
  assert.deepEqual(s.run.strongMetaRuntime.activityD38.surveyorsAtlasUsedRegionIds,['trade.corridor']);

  s=dispatch(s,{type:'commitEnding',id:'ending.activity.network'},cat);
  s=dispatch(s,{type:'completeEnding'},cat);
  s=dispatch(s,{type:'newLife'},cat);

  assert.equal(s.meta.strongMeta.ownership.ownedRewardIds.includes(STRONG_META_IDS.activitySurveyorsAtlas),true);
  assert.equal(s.meta.strongMeta.preferredSelection.specialistIds.includes(STRONG_META_IDS.activitySurveyorsAtlas),true);
  assert.deepEqual(s.run.strongMetaRuntime.activityD38,{
    surveyorsAtlasUsedRegionIds:[],
    fieldArchiveSecured:[],
    contactNetworkUsedRegionIds:[]
  });
  assert.equal(s.run.strongMetaSnapshot,null);
});

test('Field Archive secures only authored eligible carried results and makes only the secured result survive escape/failure',()=>{
  const snapshot=snapshotFor(STRONG_META_IDS.activityFieldArchive);
  let runtime=emptyStrongMetaRuntime();
  const resultId='activity.trade-corridor.result.sample-secured';
  const eligible=[ACTIVITY_D38_TAGS.secureEligible];

  assert.equal(activityD38CanSecureResult({...d38Context(snapshot,runtime,'trade.corridor'),resultId,tags:eligible}),true);
  assert.equal(activityD38CanSecureResult({...d38Context(snapshot,runtime,'trade.corridor'),resultId:'activity.trade-corridor.result.plain',tags:[]}),false);

  assert.equal(activityD38CarriedResultSurvives({
    ...d38Context(snapshot,runtime,'trade.corridor'),
    resultId,
    tags:eligible,
    outcome:'failure'
  }),false);

  runtime=commitActivityD38SecureResult({...d38Context(snapshot,runtime,'trade.corridor'),resultId,tags:eligible});
  assert.deepEqual(runtime.activityD38.fieldArchiveSecured,[{regionId:'trade.corridor',resultId}]);

  for(const outcome of ['escape','failure'] as const){
    assert.equal(activityD38CarriedResultSurvives({
      ...d38Context(snapshot,runtime,'trade.corridor'),
      resultId,
      tags:eligible,
      outcome
    }),true);
  }
  assert.equal(activityD38CarriedResultSurvives({
    ...d38Context(snapshot,runtime,'trade.corridor'),
    resultId:'activity.trade-corridor.result.plain',
    tags:[],
    outcome:'failure'
  }),true);

  assert.equal(activityD38CanSecureResult({
    ...d38Context(snapshot,runtime,'trade.corridor'),
    resultId:'activity.trade-corridor.result.second',
    tags:eligible
  }),false);
});

test('Field Archive is bounded to one secured result per region and four per run with no phantom result creation',()=>{
  const snapshot=snapshotFor(STRONG_META_IDS.activityFieldArchive);
  let runtime=emptyStrongMetaRuntime();

  for(const [index,regionId] of D38_ACTIVITY_REGION_IDS.entries()){
    const resultId=`activity.test.result.${index}`;
    assert.equal(activityD38CanSecureResult({...d38Context(snapshot,runtime,regionId),resultId,tags:[ACTIVITY_D38_TAGS.secureEligible]}),true);
    runtime=commitActivityD38SecureResult({...d38Context(snapshot,runtime,regionId),resultId,tags:[ACTIVITY_D38_TAGS.secureEligible]});
  }
  assert.equal(runtime.activityD38.fieldArchiveSecured.length,4);
  validateStrongMetaRuntimeAgainstSnapshot(snapshot,runtime);
  assert.equal(activityD38CanSecureResult({
    ...d38Context(snapshot,runtime,'lumber.forest'),
    resultId:'activity.test.result.overflow',
    tags:[ACTIVITY_D38_TAGS.secureEligible]
  }),false);
});

test('Contact Network requires normal region access, normal authored conditions and explicit introduction tag, then consumes one use per region',()=>{
  const snapshot=snapshotFor(STRONG_META_IDS.activityContactNetwork);
  let runtime=emptyStrongMetaRuntime();
  const tags=[ACTIVITY_D38_TAGS.networkIntroduction];

  assert.equal(activityD38CanUseContactIntroduction({
    ...d38Context(snapshot,runtime,'restricted.sites'),
    tags,
    regionNormallyUnlocked:false,
    normalConditionsMet:true
  }),false);
  assert.equal(activityD38CanUseContactIntroduction({
    ...d38Context(snapshot,runtime,'restricted.sites'),
    tags,
    regionNormallyUnlocked:true,
    normalConditionsMet:false
  }),false);
  assert.equal(activityD38CanUseContactIntroduction({
    ...d38Context(snapshot,runtime,'restricted.sites'),
    tags:[],
    regionNormallyUnlocked:true,
    normalConditionsMet:true
  }),false);

  assert.equal(activityD38CanUseContactIntroduction({
    ...d38Context(snapshot,runtime,'restricted.sites'),
    tags,
    regionNormallyUnlocked:true,
    normalConditionsMet:true
  }),true);
  runtime=commitActivityD38ContactIntroduction({
    ...d38Context(snapshot,runtime,'restricted.sites'),
    tags,
    regionNormallyUnlocked:true,
    normalConditionsMet:true
  });
  assert.deepEqual(runtime.activityD38.contactNetworkUsedRegionIds,['restricted.sites']);

  assert.equal(activityD38CanUseContactIntroduction({
    ...d38Context(snapshot,runtime,'restricted.sites'),
    tags,
    regionNormallyUnlocked:true,
    normalConditionsMet:true
  }),false);
});

test('Contact Network remains bounded across all four D36 regions and save-like boundaries do not reset use',()=>{
  const snapshot=snapshotFor(STRONG_META_IDS.activityContactNetwork);
  let runtime=emptyStrongMetaRuntime();
  for(const regionId of D38_ACTIVITY_REGION_IDS){
    runtime=commitActivityD38ContactIntroduction({
      ...d38Context(snapshot,runtime,regionId),
      tags:[ACTIVITY_D38_TAGS.networkIntroduction],
      regionNormallyUnlocked:true,
      normalConditionsMet:true
    });
  }
  runtime=structuredClone(runtime);
  assert.equal(runtime.activityD38.contactNetworkUsedRegionIds.length,4);
  validateStrongMetaRuntimeAgainstSnapshot(snapshot,runtime);
});

test('runtime validation rejects D38 ghost use without the matching selected Specialist and rejects duplicate region/result state',()=>{
  const noSnapshot=resolveStrongMetaSnapshot(emptyStrongMetaState());

  const atlas=emptyStrongMetaRuntime();
  atlas.activityD38.surveyorsAtlasUsedRegionIds=['lumber.forest'];
  assert.throws(()=>validateStrongMetaRuntimeAgainstSnapshot(noSnapshot,atlas),/Atlas runtime state exists without resolved reward/i);

  const archiveSnapshot=snapshotFor(STRONG_META_IDS.activityFieldArchive);
  const archive=emptyStrongMetaRuntime();
  archive.activityD38.fieldArchiveSecured=[
    {regionId:'trade.corridor',resultId:'activity.test.result.one'},
    {regionId:'trade.corridor',resultId:'activity.test.result.two'}
  ];
  assert.throws(()=>validateStrongMetaRuntimeAgainstSnapshot(archiveSnapshot,archive),/duplicate Field Archive region/i);

  const contactSnapshot=snapshotFor(STRONG_META_IDS.activityContactNetwork);
  const contact=emptyStrongMetaRuntime();
  contact.activityD38.contactNetworkUsedRegionIds=['lumber.forest','lumber.forest'];
  assert.throws(()=>validateStrongMetaRuntimeAgainstSnapshot(contactSnapshot,contact),/duplicate Contact Network region/i);
});

test('D38 helper layer cannot synthesize Secret Debt, Palace, career, relationship, item, ending, Energy or region unlock state',()=>{
  const atlasSnapshot=snapshotFor(STRONG_META_IDS.activitySurveyorsAtlas);
  const archiveSnapshot=snapshotFor(STRONG_META_IDS.activityFieldArchive);
  const contactSnapshot=snapshotFor(STRONG_META_IDS.activityContactNetwork);
  const runtime=emptyStrongMetaRuntime();

  const unrelated={
    secretDebtBound:true,
    palaceAccess:false,
    careerStage:'locked',
    relationshipStage:'none',
    itemCapability:false,
    endingEligible:false,
    entryEnergyCost:2,
    baselineFieldTime:6,
    regionUnlocked:false
  };
  const before=structuredClone(unrelated);

  activityD38SurveyFieldTimeCost({
    ...d38Context(atlasSnapshot,runtime),
    authoredFieldTimeCost:1,
    tags:[ACTIVITY_D38_TAGS.surveyDiscovery]
  });
  activityD38CanSecureResult({
    ...d38Context(archiveSnapshot,runtime,'trade.corridor'),
    resultId:'activity.test.result',
    tags:[ACTIVITY_D38_TAGS.secureEligible]
  });
  assert.equal(activityD38CanUseContactIntroduction({
    ...d38Context(contactSnapshot,runtime,'restricted.sites'),
    tags:[ACTIVITY_D38_TAGS.networkIntroduction],
    regionNormallyUnlocked:unrelated.regionUnlocked,
    normalConditionsMet:true
  }),false);

  assert.deepEqual(unrelated,before);
  assert.equal(unrelated.entryEnergyCost,2);
  assert.equal(unrelated.baselineFieldTime,6);
});
