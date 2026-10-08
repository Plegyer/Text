import {
  D38_ACTIVITY_REGION_IDS,
  STRONG_META_IDS,
  resolvedStrongMetaReward,
  validateStrongMetaRuntimeAgainstSnapshot,
  type D38ActivityRegionId,
  type ResolvedStrongMetaSnapshot,
  type StrongMetaRuntime
} from './strongMeta.ts';

export const ACTIVITY_D38_TAGS={
  surveyDiscovery:'activity-survey-discovery',
  secureEligible:'activity-secure-eligible',
  networkIntroduction:'activity-network-introduction'
} as const;

export type ActivityD38Tag=typeof ACTIVITY_D38_TAGS[keyof typeof ACTIVITY_D38_TAGS];
export type ActivityD38Outcome='success'|'escape'|'failure';

type D38Context=Readonly<{
  snapshot:ResolvedStrongMetaSnapshot|null|undefined;
  runtime:StrongMetaRuntime;
  regionId:D38ActivityRegionId;
}>;

function cloneRuntime(runtime:StrongMetaRuntime):StrongMetaRuntime{
  return structuredClone(runtime);
}

function assertKnownRegion(regionId:string):asserts regionId is D38ActivityRegionId{
  if(!(D38_ACTIVITY_REGION_IDS as readonly string[]).includes(regionId))throw new Error(`Unknown D38 Activity region: ${regionId}`);
}

function tagsInclude(tags:readonly string[],tag:string){
  return tags.includes(tag);
}

export function activityD38SurveyFieldTimeCost(input:D38Context&Readonly<{
  authoredFieldTimeCost:number;
  tags:readonly string[];
}>):number{
  assertKnownRegion(input.regionId);
  if(!Number.isInteger(input.authoredFieldTimeCost)||input.authoredFieldTimeCost<0)throw new Error('Activity Field Time cost must be a non-negative integer.');
  const reward=resolvedStrongMetaReward(input.snapshot,STRONG_META_IDS.activitySurveyorsAtlas);
  if(!reward||reward.effect.kind!=='activity-surveyors-atlas')return input.authoredFieldTimeCost;
  if(!tagsInclude(input.tags,ACTIVITY_D38_TAGS.surveyDiscovery))return input.authoredFieldTimeCost;
  if(input.authoredFieldTimeCost!==reward.effect.normalSurveyFieldTimeCost)return input.authoredFieldTimeCost;
  if(input.runtime.activityD38.surveyorsAtlasUsedRegionIds.includes(input.regionId))return input.authoredFieldTimeCost;
  if(input.runtime.activityD38.surveyorsAtlasUsedRegionIds.length>=reward.effect.maxRegionsPerRun)return input.authoredFieldTimeCost;
  return reward.effect.specialistSurveyFieldTimeCost;
}

export function commitActivityD38SurveyUse(input:D38Context&Readonly<{
  authoredFieldTimeCost:number;
  tags:readonly string[];
}>):StrongMetaRuntime{
  if(activityD38SurveyFieldTimeCost(input)!==0)throw new Error('Surveyor\'s Atlas is not available for this Activity action.');
  const runtime=cloneRuntime(input.runtime);
  runtime.activityD38.surveyorsAtlasUsedRegionIds.push(input.regionId);
  validateStrongMetaRuntimeAgainstSnapshot(input.snapshot??null,runtime);
  return runtime;
}

export function activityD38CanSecureResult(input:D38Context&Readonly<{
  resultId:string;
  tags:readonly string[];
}>):boolean{
  assertKnownRegion(input.regionId);
  if(!input.resultId.trim())throw new Error('Activity carried result ID is required.');
  const reward=resolvedStrongMetaReward(input.snapshot,STRONG_META_IDS.activityFieldArchive);
  if(!reward||reward.effect.kind!=='activity-field-archive')return false;
  if(!tagsInclude(input.tags,reward.effect.eligibilityTag))return false;
  if(input.runtime.activityD38.fieldArchiveSecured.some(record=>record.regionId===input.regionId))return false;
  if(input.runtime.activityD38.fieldArchiveSecured.some(record=>record.resultId===input.resultId))return false;
  if(input.runtime.activityD38.fieldArchiveSecured.length>=reward.effect.maxSecuredPerRun)return false;
  return true;
}

export function commitActivityD38SecureResult(input:D38Context&Readonly<{
  resultId:string;
  tags:readonly string[];
}>):StrongMetaRuntime{
  if(!activityD38CanSecureResult(input))throw new Error('Field Archive cannot secure this Activity result.');
  const runtime=cloneRuntime(input.runtime);
  runtime.activityD38.fieldArchiveSecured.push({regionId:input.regionId,resultId:input.resultId});
  validateStrongMetaRuntimeAgainstSnapshot(input.snapshot??null,runtime);
  return runtime;
}

export function activityD38CarriedResultSurvives(input:D38Context&Readonly<{
  resultId:string;
  tags:readonly string[];
  outcome:ActivityD38Outcome;
}>):boolean{
  assertKnownRegion(input.regionId);
  if(input.outcome==='success')return true;
  const reward=resolvedStrongMetaReward(input.snapshot,STRONG_META_IDS.activityFieldArchive);
  if(!reward||reward.effect.kind!=='activity-field-archive')return !tagsInclude(input.tags,ACTIVITY_D38_TAGS.secureEligible);
  if(!tagsInclude(input.tags,reward.effect.eligibilityTag))return true;
  return input.runtime.activityD38.fieldArchiveSecured.some(record=>record.regionId===input.regionId&&record.resultId===input.resultId);
}

export function activityD38CanUseContactIntroduction(input:D38Context&Readonly<{
  tags:readonly string[];
  regionNormallyUnlocked:boolean;
  normalConditionsMet:boolean;
}>):boolean{
  assertKnownRegion(input.regionId);
  const reward=resolvedStrongMetaReward(input.snapshot,STRONG_META_IDS.activityContactNetwork);
  if(!reward||reward.effect.kind!=='activity-contact-network')return false;
  if(!input.regionNormallyUnlocked||!input.normalConditionsMet)return false;
  if(!tagsInclude(input.tags,reward.effect.introductionTag))return false;
  if(input.runtime.activityD38.contactNetworkUsedRegionIds.includes(input.regionId))return false;
  if(input.runtime.activityD38.contactNetworkUsedRegionIds.length>=reward.effect.maxIntroductionsPerRun)return false;
  return true;
}

export function commitActivityD38ContactIntroduction(input:D38Context&Readonly<{
  tags:readonly string[];
  regionNormallyUnlocked:boolean;
  normalConditionsMet:boolean;
}>):StrongMetaRuntime{
  if(!activityD38CanUseContactIntroduction(input))throw new Error('Contact Network introduction is not available.');
  const runtime=cloneRuntime(input.runtime);
  runtime.activityD38.contactNetworkUsedRegionIds.push(input.regionId);
  validateStrongMetaRuntimeAgainstSnapshot(input.snapshot??null,runtime);
  return runtime;
}
