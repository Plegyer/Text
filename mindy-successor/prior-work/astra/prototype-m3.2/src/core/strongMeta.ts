import {z} from 'zod';

export const STRONG_META_REGISTRY_VERSION='strong-meta-v2' as const;
export const STRONG_META_CONTRACT_VERSION=1 as const;
export const STRONG_META_KEYSTONE_CAPACITY=1 as const;
export const STRONG_META_SPECIALIST_CAPACITY=2 as const;

export const STRONG_META_IDS={
  palaceCap200:'palace.true.cap-200',
  earnedReserveMatch:'secret-debt.paid-freedom.earned-reserve-match',
  workRhythm:'secret-debt.bound-life.work-rhythm',
  networkRetainer:'secret-debt.takeover.network-retainer',
  guardInstitutionalFavors:'specialist.guard.institutional-favors',
  merchantRiskLedger:'specialist.merchant.risk-ledger',
  artistSalonIntroductions:'specialist.artist.salon-introductions',
  assassinGhostRoutes:'specialist.assassin.ghost-routes',
  assassinContractLedger:'specialist.assassin.contract-ledger',
  prostituteHousebook:'specialist.prostitute.housebook',
  prostituteMutualAidRoster:'specialist.prostitute.mutual-aid-roster'
} as const;

export type ApprovedStrongRewardId=typeof STRONG_META_IDS[keyof typeof STRONG_META_IDS];
export const approvedStrongRewardIdSchema=z.enum([
  STRONG_META_IDS.palaceCap200,STRONG_META_IDS.earnedReserveMatch,STRONG_META_IDS.workRhythm,STRONG_META_IDS.networkRetainer,
  STRONG_META_IDS.guardInstitutionalFavors,STRONG_META_IDS.merchantRiskLedger,STRONG_META_IDS.artistSalonIntroductions,
  STRONG_META_IDS.assassinGhostRoutes,STRONG_META_IDS.assassinContractLedger,STRONG_META_IDS.prostituteHousebook,
  STRONG_META_IDS.prostituteMutualAidRoster
]);
export type StrongRewardClass='keystone'|'specialist';
export type StrongRewardLifecycle='active'|'retired';

export const strongRewardIdPattern=/^[a-z0-9]+(?:-[a-z0-9]+)*\.[a-z0-9]+(?:-[a-z0-9]+)*\.[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const strongRewardIdSchema=z.string().regex(strongRewardIdPattern);
export const knowledgeUnlockIdSchema=z.string().regex(strongRewardIdPattern);

const nonNegativeInt=z.number().int().min(0).max(1_000_000);
const calendarDay=z.number().int().min(0).max(159);

const cap200EffectSchema=z.object({
  kind:z.literal('progression-stat-cap'),
  cap:z.literal(200)
}).strict();
const reserveMatchEffectSchema=z.object({
  kind:z.literal('earned-reserve-match'),
  matchRatio:z.number().int().min(1).max(100),
  perRunCap:nonNegativeInt
}).strict();
const workRhythmEffectSchema=z.object({
  kind:z.literal('work-rhythm'),
  energyDelta:z.number().int().min(0).max(100),
  maxBonusDays:z.number().int().min(0).max(160)
}).strict();
const networkRetainerEffectSchema=z.object({
  kind:z.literal('network-retainer'),
  paymentAmount:nonNegativeInt,
  eligibleDayCount:z.number().int().min(0).max(160),
  perRunTotalCap:nonNegativeInt
}).strict();

const guardInstitutionalFavorsEffectSchema=z.object({kind:z.literal('guard-institutional-favors'),maxUsesPerRun:z.literal(2)}).strict();
const merchantRiskLedgerEffectSchema=z.object({kind:z.literal('merchant-risk-ledger'),maxDealsPerRun:z.literal(2),reveal:z.tuple([z.literal('reward-band'),z.literal('downside-tag')]),allowAbortBeforeCommit:z.literal(true)}).strict();
const artistSalonIntroductionsEffectSchema=z.object({kind:z.literal('artist-salon-introductions'),maxUsesPerRun:z.literal(4),maxUsesPerSeason:z.literal(1)}).strict();
const assassinGhostRoutesEffectSchema=z.object({kind:z.literal('assassin-ghost-routes'),maxContractsPerRun:z.literal(2)}).strict();
const assassinContractLedgerEffectSchema=z.object({kind:z.literal('assassin-contract-ledger'),maxContractsPerRun:z.literal(2),reveal:z.tuple([z.literal('sponsor-tag'),z.literal('fallout-tag')]),allowAuthoredReroute:z.literal(true)}).strict();
const prostituteHousebookEffectSchema=z.object({kind:z.literal('prostitute-housebook'),maxBookingsPerRun:z.literal(2),reveal:z.tuple([z.literal('terms'),z.literal('risk')]),allow:z.tuple([z.literal('decline'),z.literal('renegotiate')])}).strict();
const prostituteMutualAidRosterEffectSchema=z.object({kind:z.literal('prostitute-mutual-aid-roster'),maxRiskScenesPerRun:z.literal(2),allow:z.tuple([z.literal('safe-exit'),z.literal('request-help'),z.literal('contact-support')])}).strict();

export const resolvedStrongRewardSchema=z.discriminatedUnion('class',[
  z.object({
    id:strongRewardIdSchema,
    class:z.literal('specialist'),
    definitionVersion:z.number().int().min(1),
    effect:z.union([cap200EffectSchema,guardInstitutionalFavorsEffectSchema,merchantRiskLedgerEffectSchema,artistSalonIntroductionsEffectSchema,assassinGhostRoutesEffectSchema,assassinContractLedgerEffectSchema,prostituteHousebookEffectSchema,prostituteMutualAidRosterEffectSchema])
  }).strict(),
  z.object({
    id:strongRewardIdSchema,
    class:z.literal('keystone'),
    definitionVersion:z.number().int().min(1),
    effect:z.union([reserveMatchEffectSchema,workRhythmEffectSchema,networkRetainerEffectSchema])
  }).strict()
]);
export type ResolvedStrongReward=z.infer<typeof resolvedStrongRewardSchema>;

export const strongMetaOwnershipSchema=z.object({
  ownedRewardIds:z.array(strongRewardIdSchema).max(128)
}).strict();

export const strongMetaKnowledgeSchema=z.object({
  inheritedKnowledgeIds:z.array(knowledgeUnlockIdSchema).max(128)
}).strict();

export const strongMetaPreferredSelectionSchema=z.object({
  keystoneId:strongRewardIdSchema.nullable(),
  specialistIds:z.array(strongRewardIdSchema).max(16)
}).strict();

export const strongMetaStateSchema=z.object({
  ownership:strongMetaOwnershipSchema,
  knowledge:strongMetaKnowledgeSchema,
  preferredSelection:strongMetaPreferredSelectionSchema
}).strict();
export type StrongMetaState=z.infer<typeof strongMetaStateSchema>;

export const strongMetaSnapshotSchema=z.object({
  contractVersion:z.literal(STRONG_META_CONTRACT_VERSION),
  registryVersion:z.string().min(1).max(80),
  keystoneId:strongRewardIdSchema.nullable(),
  specialistIds:z.array(strongRewardIdSchema).max(STRONG_META_SPECIALIST_CAPACITY),
  automaticKnowledgeIds:z.array(knowledgeUnlockIdSchema).max(128),
  specialistCapacityAtStart:z.literal(STRONG_META_SPECIALIST_CAPACITY),
  resolvedRewards:z.array(resolvedStrongRewardSchema).max(1+STRONG_META_SPECIALIST_CAPACITY)
}).strict();
export type ResolvedStrongMetaSnapshot=z.infer<typeof strongMetaSnapshotSchema>;

export const strongMetaRuntimeSchema=z.object({
  reserveMatchPaid:nonNegativeInt,
  workRhythmBonusDaysTriggered:z.number().int().min(0).max(160),
  workRhythmArmedForDay:calendarDay.nullable(),
  workRhythmAppliedDay:calendarDay.nullable(),
  networkRetainerLastProcessedDay:calendarDay.nullable(),
  networkRetainerPaidDays:z.number().int().min(0).max(160),
  networkRetainerTotalPaid:nonNegativeInt
}).strict();
export type StrongMetaRuntime=z.infer<typeof strongMetaRuntimeSchema>;

export type StrongRewardDefinition=Readonly<{
  id:ApprovedStrongRewardId;
  class:StrongRewardClass;
  lifecycle:StrongRewardLifecycle;
  definitionVersion:1;
  authority:'D24'|'D30'|'D32'|'D40';
  effect:ResolvedStrongReward['effect'];
}>;

export const strongMetaRegistry:Readonly<Record<ApprovedStrongRewardId,StrongRewardDefinition>>={
  [STRONG_META_IDS.palaceCap200]:{id:STRONG_META_IDS.palaceCap200,class:'specialist',lifecycle:'active',definitionVersion:1,authority:'D24',effect:{kind:'progression-stat-cap',cap:200}},
  [STRONG_META_IDS.earnedReserveMatch]:{id:STRONG_META_IDS.earnedReserveMatch,class:'keystone',lifecycle:'active',definitionVersion:1,authority:'D32',effect:{kind:'earned-reserve-match',matchRatio:1,perRunCap:1000}},
  [STRONG_META_IDS.workRhythm]:{id:STRONG_META_IDS.workRhythm,class:'keystone',lifecycle:'active',definitionVersion:1,authority:'D32',effect:{kind:'work-rhythm',energyDelta:1,maxBonusDays:20}},
  [STRONG_META_IDS.networkRetainer]:{id:STRONG_META_IDS.networkRetainer,class:'keystone',lifecycle:'active',definitionVersion:1,authority:'D32',effect:{kind:'network-retainer',paymentAmount:25,eligibleDayCount:40,perRunTotalCap:1000}},
  [STRONG_META_IDS.guardInstitutionalFavors]:{id:STRONG_META_IDS.guardInstitutionalFavors,class:'specialist',lifecycle:'active',definitionVersion:1,authority:'D40',effect:{kind:'guard-institutional-favors',maxUsesPerRun:2}},
  [STRONG_META_IDS.merchantRiskLedger]:{id:STRONG_META_IDS.merchantRiskLedger,class:'specialist',lifecycle:'active',definitionVersion:1,authority:'D40',effect:{kind:'merchant-risk-ledger',maxDealsPerRun:2,reveal:['reward-band','downside-tag'],allowAbortBeforeCommit:true}},
  [STRONG_META_IDS.artistSalonIntroductions]:{id:STRONG_META_IDS.artistSalonIntroductions,class:'specialist',lifecycle:'active',definitionVersion:1,authority:'D40',effect:{kind:'artist-salon-introductions',maxUsesPerRun:4,maxUsesPerSeason:1}},
  [STRONG_META_IDS.assassinGhostRoutes]:{id:STRONG_META_IDS.assassinGhostRoutes,class:'specialist',lifecycle:'active',definitionVersion:1,authority:'D40',effect:{kind:'assassin-ghost-routes',maxContractsPerRun:2}},
  [STRONG_META_IDS.assassinContractLedger]:{id:STRONG_META_IDS.assassinContractLedger,class:'specialist',lifecycle:'active',definitionVersion:1,authority:'D40',effect:{kind:'assassin-contract-ledger',maxContractsPerRun:2,reveal:['sponsor-tag','fallout-tag'],allowAuthoredReroute:true}},
  [STRONG_META_IDS.prostituteHousebook]:{id:STRONG_META_IDS.prostituteHousebook,class:'specialist',lifecycle:'active',definitionVersion:1,authority:'D40',effect:{kind:'prostitute-housebook',maxBookingsPerRun:2,reveal:['terms','risk'],allow:['decline','renegotiate']}},
  [STRONG_META_IDS.prostituteMutualAidRoster]:{id:STRONG_META_IDS.prostituteMutualAidRoster,class:'specialist',lifecycle:'active',definitionVersion:1,authority:'D40',effect:{kind:'prostitute-mutual-aid-roster',maxRiskScenesPerRun:2,allow:['safe-exit','request-help','contact-support']}}
};

const approvedIdSet=new Set<string>(Object.keys(strongMetaRegistry));

export type StrongMetaSelectionIssueCode=
  |'invalid_id_format'
  |'duplicate_selection'
  |'unknown_reward'
  |'retired_reward'
  |'reward_not_owned'
  |'wrong_reward_class'
  |'keystone_capacity_exceeded'
  |'specialist_capacity_exceeded'
  |'reclassification_conflict';

export type StrongMetaSelectionIssue=Readonly<{
  code:StrongMetaSelectionIssueCode;
  rewardId?:string;
}>;

export function emptyStrongMetaState():StrongMetaState{
  return {
    ownership:{ownedRewardIds:[]},
    knowledge:{inheritedKnowledgeIds:[]},
    preferredSelection:{keystoneId:null,specialistIds:[]}
  };
}

export function emptyStrongMetaRuntime():StrongMetaRuntime{
  return {
    reserveMatchPaid:0,
    workRhythmBonusDaysTriggered:0,
    workRhythmArmedForDay:null,
    workRhythmAppliedDay:null,
    networkRetainerLastProcessedDay:null,
    networkRetainerPaidDays:0,
    networkRetainerTotalPaid:0
  };
}

export function canonicalStrongMetaState(input?:Partial<StrongMetaState>):StrongMetaState{
  const empty=emptyStrongMetaState();
  const ownership=[...new Set(input?.ownership?.ownedRewardIds??empty.ownership.ownedRewardIds)].sort();
  const knowledge=[...new Set(input?.knowledge?.inheritedKnowledgeIds??empty.knowledge.inheritedKnowledgeIds)].sort();
  const preferred=input?.preferredSelection??empty.preferredSelection;
  return strongMetaStateSchema.parse({
    ownership:{ownedRewardIds:ownership},
    knowledge:{inheritedKnowledgeIds:knowledge},
    preferredSelection:{
      keystoneId:preferred.keystoneId??null,
      specialistIds:[...(preferred.specialistIds??[])]
    }
  });
}

export function grantStrongMetaReward(state:StrongMetaState,id:ApprovedStrongRewardId):StrongMetaState{
  if(!strongMetaRegistry[id])throw new Error(`Unknown approved strong Meta reward: ${id}`);
  return canonicalStrongMetaState({
    ...state,
    ownership:{ownedRewardIds:[...state.ownership.ownedRewardIds,id]}
  });
}

function definitionFor(id:string):StrongRewardDefinition|undefined{
  return strongMetaRegistry[id as ApprovedStrongRewardId];
}

export function validatePreferredStrongMetaSelection(state:StrongMetaState):StrongMetaSelectionIssue[]{
  const selection=state.preferredSelection;
  const ids=[...(selection.keystoneId?[selection.keystoneId]:[]),...selection.specialistIds];
  const issues:StrongMetaSelectionIssue[]=[];
  for(const id of ids)if(!strongRewardIdPattern.test(id))issues.push({code:'invalid_id_format',rewardId:id});
  const seen=new Set<string>();
  for(const id of ids){
    if(seen.has(id))issues.push({code:'duplicate_selection',rewardId:id});
    seen.add(id);
  }
  if(selection.keystoneId&&1>STRONG_META_KEYSTONE_CAPACITY)issues.push({code:'keystone_capacity_exceeded'});
  if(selection.specialistIds.length>STRONG_META_SPECIALIST_CAPACITY)issues.push({code:'specialist_capacity_exceeded'});
  const owned=new Set(state.ownership.ownedRewardIds);
  for(const id of ids){
    if(!strongRewardIdPattern.test(id))continue;
    const definition=definitionFor(id);
    if(!definition){issues.push({code:'unknown_reward',rewardId:id});continue;}
    if(definition.lifecycle==='retired'){issues.push({code:'retired_reward',rewardId:id});continue;}
    if(!owned.has(id))issues.push({code:'reward_not_owned',rewardId:id});
    const selectedClass=selection.keystoneId===id?'keystone':'specialist';
    if(definition.class!==selectedClass)issues.push({code:'wrong_reward_class',rewardId:id});
  }
  return issues;
}

function throwSelectionIssue(issue:StrongMetaSelectionIssue):never{
  throw new Error(`Strong Meta selection invalid: ${issue.code}${issue.rewardId?`:${issue.rewardId}`:''}`);
}

export type StrongRewardClassification=Readonly<{
  id:string;
  class:StrongRewardClass;
  lifecycle:StrongRewardLifecycle;
}>;

export function migratePreferredStrongMetaSelectionForCatalog(
  state:StrongMetaState,
  classifications:Readonly<Record<string,StrongRewardClassification>>
):Readonly<{state:StrongMetaState;issues:readonly StrongMetaSelectionIssue[]}>{
  const ids=[
    ...(state.preferredSelection.keystoneId?[state.preferredSelection.keystoneId]:[]),
    ...state.preferredSelection.specialistIds
  ];
  const keystones:string[]=[];
  const specialists:string[]=[];
  const issues:StrongMetaSelectionIssue[]=[];
  for(const id of ids){
    const definition=classifications[id];
    if(!definition){issues.push({code:'unknown_reward',rewardId:id});continue;}
    if(definition.lifecycle==='retired'){issues.push({code:'retired_reward',rewardId:id});continue;}
    if(definition.class==='keystone')keystones.push(id);else specialists.push(id);
  }
  if(issues.length)return {state:canonicalStrongMetaState(state),issues};
  if(keystones.length>STRONG_META_KEYSTONE_CAPACITY||specialists.length>STRONG_META_SPECIALIST_CAPACITY){
    return {state:canonicalStrongMetaState(state),issues:[{code:'reclassification_conflict'}]};
  }
  const next=canonicalStrongMetaState({
    ...state,
    preferredSelection:{
      keystoneId:keystones[0]??null,
      specialistIds:[...specialists].sort()
    }
  });
  return {state:next,issues:[]};
}

export function setPreferredStrongMetaKeystone(state:StrongMetaState,id:string|null):StrongMetaState{
  const next=canonicalStrongMetaState({
    ...state,
    preferredSelection:{...state.preferredSelection,keystoneId:id}
  });
  const issue=validatePreferredStrongMetaSelection(next)[0];
  if(issue)throwSelectionIssue(issue);
  return next;
}

export function setPreferredStrongMetaSpecialist(state:StrongMetaState,id:string,active:boolean):StrongMetaState{
  const current=state.preferredSelection.specialistIds;
  const nextIds=active?[...current,id]:current.filter(item=>item!==id);
  const next=canonicalStrongMetaState({
    ...state,
    preferredSelection:{...state.preferredSelection,specialistIds:nextIds}
  });
  const issue=validatePreferredStrongMetaSelection(next)[0];
  if(issue)throwSelectionIssue(issue);
  return next;
}

function resolveReward(id:string):ResolvedStrongReward{
  const definition=definitionFor(id);
  if(!definition)throw new Error(`Cannot resolve unknown strong Meta reward: ${id}`);
  return {
    id,
    class:definition.class,
    definitionVersion:definition.definitionVersion,
    effect:structuredClone(definition.effect)
  } as ResolvedStrongReward;
}

export function resolveStrongMetaSnapshot(state:StrongMetaState):ResolvedStrongMetaSnapshot{
  const issue=validatePreferredStrongMetaSelection(state)[0];
  if(issue)throwSelectionIssue(issue);
  const specialists=[...state.preferredSelection.specialistIds].sort();
  const rewardIds=[...(state.preferredSelection.keystoneId?[state.preferredSelection.keystoneId]:[]),...specialists];
  const snapshot=strongMetaSnapshotSchema.parse({
    contractVersion:STRONG_META_CONTRACT_VERSION,
    registryVersion:STRONG_META_REGISTRY_VERSION,
    keystoneId:state.preferredSelection.keystoneId,
    specialistIds:specialists,
    automaticKnowledgeIds:[...state.knowledge.inheritedKnowledgeIds].sort(),
    specialistCapacityAtStart:STRONG_META_SPECIALIST_CAPACITY,
    resolvedRewards:rewardIds.map(resolveReward)
  });
  validateResolvedStrongMetaSnapshot(snapshot);
  return snapshot;
}

export function emptyResolvedStrongMetaSnapshot():ResolvedStrongMetaSnapshot{
  return resolveStrongMetaSnapshot(emptyStrongMetaState());
}

export function validateResolvedStrongMetaSnapshot(snapshot:ResolvedStrongMetaSnapshot):void{
  const selected=[
    ...(snapshot.keystoneId?[snapshot.keystoneId]:[]),
    ...snapshot.specialistIds
  ];
  if(new Set(selected).size!==selected.length)throw new Error('Strong Meta snapshot contains duplicate selected IDs.');
  const rewards=snapshot.resolvedRewards.map(reward=>reward.id);
  if(new Set(rewards).size!==rewards.length)throw new Error('Strong Meta snapshot contains duplicate resolved rewards.');
  if(selected.length!==rewards.length||[...selected].sort().some((id,index)=>id!==[...rewards].sort()[index])){
    throw new Error('Strong Meta snapshot selection/reward mismatch.');
  }
  for(const reward of snapshot.resolvedRewards){
    if(reward.id===snapshot.keystoneId&&reward.class!=='keystone')throw new Error('Strong Meta snapshot Keystone class mismatch.');
    if(snapshot.specialistIds.includes(reward.id)&&reward.class!=='specialist')throw new Error('Strong Meta snapshot Specialist class mismatch.');
  }
}

export function validateStrongMetaRuntimeAgainstSnapshot(snapshot:ResolvedStrongMetaSnapshot|null,runtime:StrongMetaRuntime):void{
  const effects=new Map((snapshot?.resolvedRewards??[]).map(reward=>[reward.effect.kind,reward.effect] as const));
  const reserve=effects.get('earned-reserve-match');
  if(!reserve&&runtime.reserveMatchPaid!==0)throw new Error('Reserve Match runtime state exists without resolved reward.');
  if(reserve&&reserve.kind==='earned-reserve-match'&&runtime.reserveMatchPaid>reserve.perRunCap)throw new Error('Reserve Match runtime exceeds resolved cap.');

  const rhythm=effects.get('work-rhythm');
  if(!rhythm&&(runtime.workRhythmBonusDaysTriggered!==0||runtime.workRhythmArmedForDay!==null||runtime.workRhythmAppliedDay!==null))throw new Error('Work Rhythm runtime state exists without resolved reward.');
  if(rhythm&&rhythm.kind==='work-rhythm'&&runtime.workRhythmBonusDaysTriggered>rhythm.maxBonusDays)throw new Error('Work Rhythm runtime exceeds resolved day cap.');

  const retainer=effects.get('network-retainer');
  if(!retainer&&(runtime.networkRetainerLastProcessedDay!==null||runtime.networkRetainerPaidDays!==0||runtime.networkRetainerTotalPaid!==0)){
    throw new Error('Network Retainer runtime state exists without resolved reward.');
  }
  if(retainer&&retainer.kind==='network-retainer'){
    if(runtime.networkRetainerPaidDays>retainer.eligibleDayCount)throw new Error('Network Retainer runtime exceeds resolved day window.');
    if(runtime.networkRetainerTotalPaid>retainer.perRunTotalCap)throw new Error('Network Retainer runtime exceeds resolved total cap.');
  }
}

export function strongMetaCurrentEnergyBonus(
  snapshot:ResolvedStrongMetaSnapshot|null|undefined,
  runtime:StrongMetaRuntime,
  day:number
):number{
  const reward=resolvedReward(snapshot,STRONG_META_IDS.workRhythm);
  if(!reward||reward.effect.kind!=='work-rhythm'||runtime.workRhythmAppliedDay!==day)return 0;
  return reward.effect.energyDelta;
}

export function hasResolvedStrongMetaReward(snapshot:ResolvedStrongMetaSnapshot|null|undefined,id:ApprovedStrongRewardId):boolean{
  return !!snapshot?.resolvedRewards.some(reward=>reward.id===id);
}

function resolvedReward(snapshot:ResolvedStrongMetaSnapshot|null|undefined,id:ApprovedStrongRewardId):ResolvedStrongReward|undefined{
  return snapshot?.resolvedRewards.find(reward=>reward.id===id);
}

export function strongMetaProgressionStatCap(snapshot:ResolvedStrongMetaSnapshot|null|undefined,current:100|200=100):100|200{
  return snapshot?.resolvedRewards.some(reward=>reward.effect.kind==='progression-stat-cap'&&reward.effect.cap===200)?200:current;
}

export function applyEarnedReserveMatch(input:Readonly<{
  snapshot:ResolvedStrongMetaSnapshot|null|undefined;
  runtime:StrongMetaRuntime;
  ordinaryWage:number;
  secretDebtBound:boolean;
}>):Readonly<{runtime:StrongMetaRuntime;bonus:number}>{
  if(!Number.isInteger(input.ordinaryWage)||input.ordinaryWage<0)throw new Error('ordinaryWage must be a non-negative integer.');
  const reward=resolvedReward(input.snapshot,STRONG_META_IDS.earnedReserveMatch);
  if(!reward||reward.effect.kind!=='earned-reserve-match'||input.secretDebtBound||input.ordinaryWage===0){
    return {runtime:structuredClone(input.runtime),bonus:0};
  }
  const remaining=Math.max(0,reward.effect.perRunCap-input.runtime.reserveMatchPaid);
  const bonus=Math.min(input.ordinaryWage*reward.effect.matchRatio,remaining);
  return {
    runtime:{...structuredClone(input.runtime),reserveMatchPaid:input.runtime.reserveMatchPaid+bonus},
    bonus
  };
}

export function armWorkRhythmForNextDay(input:Readonly<{
  snapshot:ResolvedStrongMetaSnapshot|null|undefined;
  runtime:StrongMetaRuntime;
  currentDay:number;
}>):StrongMetaRuntime{
  const runtime=structuredClone(input.runtime);
  const reward=resolvedReward(input.snapshot,STRONG_META_IDS.workRhythm);
  if(!reward||reward.effect.kind!=='work-rhythm')return runtime;
  if(runtime.workRhythmBonusDaysTriggered>=reward.effect.maxBonusDays)return runtime;
  const target=input.currentDay+1;
  if(target<0||target>159)return runtime;
  if(runtime.workRhythmArmedForDay===target)return runtime;
  runtime.workRhythmArmedForDay=target;
  return runtime;
}

export function applyWorkRhythmAtStartDay(input:Readonly<{
  snapshot:ResolvedStrongMetaSnapshot|null|undefined;
  runtime:StrongMetaRuntime;
  day:number;
}>):Readonly<{runtime:StrongMetaRuntime;energyBonus:number}>{
  const runtime=structuredClone(input.runtime);
  const reward=resolvedReward(input.snapshot,STRONG_META_IDS.workRhythm);
  if(!reward||reward.effect.kind!=='work-rhythm'){
    runtime.workRhythmAppliedDay=null;
    return {runtime,energyBonus:0};
  }
  if(runtime.workRhythmAppliedDay===input.day)return {runtime,energyBonus:reward.effect.energyDelta};
  runtime.workRhythmAppliedDay=null;
  if(runtime.workRhythmArmedForDay!==input.day)return {runtime,energyBonus:0};
  runtime.workRhythmArmedForDay=null;
  if(runtime.workRhythmBonusDaysTriggered>=reward.effect.maxBonusDays)return {runtime,energyBonus:0};
  runtime.workRhythmBonusDaysTriggered++;
  runtime.workRhythmAppliedDay=input.day;
  return {runtime,energyBonus:reward.effect.energyDelta};
}

export function applyNetworkRetainerAtStartDay(input:Readonly<{
  snapshot:ResolvedStrongMetaSnapshot|null|undefined;
  runtime:StrongMetaRuntime;
  day:number;
  secretDebtBound:boolean;
}>):Readonly<{runtime:StrongMetaRuntime;payment:number}>{
  const runtime=structuredClone(input.runtime);
  const reward=resolvedReward(input.snapshot,STRONG_META_IDS.networkRetainer);
  if(!reward||reward.effect.kind!=='network-retainer')return {runtime,payment:0};
  if(!Number.isInteger(input.day)||input.day<0||input.day>159)throw new Error('day out of range.');
  if(input.day>=reward.effect.eligibleDayCount)return {runtime,payment:0};
  if(runtime.networkRetainerLastProcessedDay!==null&&input.day<=runtime.networkRetainerLastProcessedDay)return {runtime,payment:0};
  runtime.networkRetainerLastProcessedDay=input.day;
  if(input.secretDebtBound)return {runtime,payment:0};
  const remaining=Math.max(0,reward.effect.perRunTotalCap-runtime.networkRetainerTotalPaid);
  const payment=Math.min(reward.effect.paymentAmount,remaining);
  if(payment===0)return {runtime,payment:0};
  runtime.networkRetainerPaidDays=Math.min(reward.effect.eligibleDayCount,runtime.networkRetainerPaidDays+1);
  runtime.networkRetainerTotalPaid+=payment;
  return {runtime,payment};
}

export function validateStrongMetaRegistry():void{
  const ids=Object.keys(strongMetaRegistry);
  if(ids.length!==11)throw new Error('Strong Meta registry must contain four v7 rewards plus seven D40 Specialists.');
  for(const [key,definition] of Object.entries(strongMetaRegistry)){
    if(key!==definition.id)throw new Error(`Strong Meta registry key mismatch: ${key}`);
    if(!strongRewardIdPattern.test(key))throw new Error(`Invalid Strong Meta reward ID: ${key}`);
  }
  if(new Set(ids).size!==ids.length)throw new Error('Duplicate Strong Meta reward ID.');
  const specialists=Object.values(strongMetaRegistry).filter(x=>x.class==='specialist');
  const keystones=Object.values(strongMetaRegistry).filter(x=>x.class==='keystone');
  if(specialists.length!==8)throw new Error('Strong Meta Specialist registry drift.');
  if(keystones.length!==3)throw new Error('Strong Meta Keystone registry drift.');
  for(const id of [STRONG_META_IDS.guardInstitutionalFavors,STRONG_META_IDS.merchantRiskLedger,STRONG_META_IDS.artistSalonIntroductions,STRONG_META_IDS.assassinGhostRoutes,STRONG_META_IDS.assassinContractLedger,STRONG_META_IDS.prostituteHousebook,STRONG_META_IDS.prostituteMutualAidRoster]){
    const definition=strongMetaRegistry[id];
    if(definition.class!=='specialist'||definition.authority!=='D40')throw new Error(`D40 Specialist registry drift: ${id}`);
  }
  const reserve=strongMetaRegistry[STRONG_META_IDS.earnedReserveMatch].effect;
  const rhythm=strongMetaRegistry[STRONG_META_IDS.workRhythm].effect;
  const retainer=strongMetaRegistry[STRONG_META_IDS.networkRetainer].effect;
  if(reserve.kind!=='earned-reserve-match'||reserve.matchRatio!==1||reserve.perRunCap!==1000)throw new Error('D32 Reserve Match parameter drift.');
  if(rhythm.kind!=='work-rhythm'||rhythm.energyDelta!==1||rhythm.maxBonusDays!==20)throw new Error('D32 Work Rhythm parameter drift.');
  if(retainer.kind!=='network-retainer'||retainer.paymentAmount!==25||retainer.eligibleDayCount!==40||retainer.perRunTotalCap!==1000)throw new Error('D32 Network Retainer parameter drift.');
}

validateStrongMetaRegistry();
