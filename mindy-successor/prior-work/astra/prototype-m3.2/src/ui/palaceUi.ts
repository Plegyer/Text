import {
  PALACE_ACCESS_FACT,
  PALACE_MAX_STRUCTURAL_DUTIES,
  PALACE_PRINCE_DEFEATED_FACT,
  palacePrinceConfrontationReady,
  PALACE_PROGRESSION_COMPLETE_FACT,
  PALACE_STRUCTURAL_DUTY_ENERGY_COST,
  PALACE_SUPPORT_ENERGY_COST,
  palaceDutyCount,
  palaceDutyDefinitions,
  palaceHasAccess,
  palaceRoutePrepWorldFacts,
  palaceRouteReadyWorldFacts,
  palaceStageAtLeast,
  palaceStructuralDutyAvailable,
  palaceStructuralWage,
  palaceSupportActionAvailable,
  palaceSupportDefinitions,
  palaceTrueEndingStatsReady
} from '../core/palace.ts';
import type {PalaceRoutePrepFact,PalaceStage,Save} from '../core/schema.ts';

export const PALACE_ENDING_IDS=[
  'ending.palace.service-life',
  'ending.palace.court-power',
  'ending.palace.inner-truth',
  'ending.palace.return-home'
] as const;

export type PalaceEndingId=typeof PALACE_ENDING_IDS[number];

export const palaceRewardPreviewByEnding={
  'ending.palace.service-life':{
    rewardId:'palace.service-life.steady-practice',
    nameKey:'ui.palace.reward.steadyPractice.name',
    fallbackName:'Steady Practice',
    layerKey:'ui.palace.reward.layer.specialist',
    fallbackLayer:'Specialist'
  },
  'ending.palace.court-power':{
    rewardId:'palace.court-power.formal-introduction',
    nameKey:'ui.palace.reward.formalIntroduction.name',
    fallbackName:'Formal Introduction',
    layerKey:'ui.palace.reward.layer.specialist',
    fallbackLayer:'Specialist'
  },
  'ending.palace.inner-truth':{
    rewardId:'palace.inner-truth.source-method',
    nameKey:'ui.palace.reward.sourceMethod.name',
    fallbackName:'Source Method',
    layerKey:'ui.palace.reward.layer.automaticKnowledge',
    fallbackLayer:'Automatic knowledge/content'
  },
  'ending.palace.return-home':{
    rewardId:'palace.true.cap-200',
    nameKey:'ui.palace.reward.cap200.name',
    fallbackName:'Cap 200',
    layerKey:'ui.palace.reward.layer.specialist',
    fallbackLayer:'Specialist'
  }
} as const satisfies Record<PalaceEndingId,{
  rewardId:string;
  nameKey:string;
  fallbackName:string;
  layerKey:string;
  fallbackLayer:string;
}>;

const routeConfigs=[
  {
    route:'service-life',
    firstStage:'trusted-service',
    endingId:'ending.palace.service-life'
  },
  {
    route:'court-power',
    firstStage:'palace-network',
    endingId:'ending.palace.court-power'
  },
  {
    route:'inner-truth',
    firstStage:'crossroads',
    endingId:'ending.palace.inner-truth'
  }
] as const satisfies readonly {
  route:PalaceRoutePrepFact;
  firstStage:PalaceStage;
  endingId:PalaceEndingId;
}[];

export type PalaceRouteUiState='available'|'in-progress'|'prepared'|'ready';

export type PalaceRouteUiModel=Readonly<{
  route:PalaceRoutePrepFact;
  endingId:PalaceEndingId;
  state:PalaceRouteUiState;
  availableSupportIds:string[];
}>;

export type PalaceUiModel=Readonly<{
  accessGranted:true;
  stage:PalaceStage;
  dutyCount:number;
  dutyTotal:number;
  structuralDutyUsedToday:boolean;
  supportUsedToday:boolean;
  nextDutyId:string|null;
  nextDutyAvailable:boolean;
  structuralDutyEnergyCost:number;
  supportEnergyCost:number;
  wagePreview:number;
  routes:PalaceRouteUiModel[];
  availableSupportIds:string[];
  outcomeReady:boolean;
  eligibleEndingIds:PalaceEndingId[];
  trueEndingEligible:boolean;
  princeConfrontationAvailable:boolean;
  princeDefeated:boolean;
}>;

export function isPalaceEndingId(value:string):value is PalaceEndingId{
  return (PALACE_ENDING_IDS as readonly string[]).includes(value);
}

export function palaceFullTrueEndingPredicate(s:Save):boolean{
  return palaceHasAccess(s)
    && s.run.progression.palace.stage==='outcome-ready'
    && s.run.progression.worldFacts.includes(PALACE_PROGRESSION_COMPLETE_FACT)
    && palaceTrueEndingStatsReady(s.run.character.stats)
    && s.run.progression.worldFacts.includes(PALACE_PRINCE_DEFEATED_FACT);
}

export function palacePlayerUiModel(s:Save):PalaceUiModel|null{
  if(!s.run.progression.worldFacts.includes(PALACE_ACCESS_FACT))return null;

  const state=s.run.progression.palace;
  const dutyCount=palaceDutyCount(s);
  const nextDuty=palaceDutyDefinitions[dutyCount]??null;
  const availableSupportIds=palaceSupportDefinitions
    .filter(definition=>palaceSupportActionAvailable(s,definition.id))
    .map(definition=>definition.id);

  const routes=routeConfigs
    .filter(config=>
      palaceStageAtLeast(state.stage,config.firstStage)
      || state.routePrepFacts.includes(config.route)
      || s.run.progression.worldFacts.includes(palaceRouteReadyWorldFacts[config.route])
    )
    .map(config=>{
      const routeSupportIds=palaceSupportDefinitions
        .filter(definition=>definition.route===config.route)
        .map(definition=>definition.id as string);
      const routeSupportIdSet=new Set(routeSupportIds);
      const routeAvailableSupportIds=availableSupportIds.filter(id=>routeSupportIdSet.has(id));
      const ready=s.run.progression.worldFacts.includes(palaceRouteReadyWorldFacts[config.route]);
      const prepared=state.routePrepFacts.includes(config.route)
        || s.run.progression.worldFacts.includes(palaceRoutePrepWorldFacts[config.route]);
      const inProgress=routeSupportIds.some(id=>state.completedSupportIds.includes(id));
      const routeState:PalaceRouteUiState=ready?'ready':prepared?'prepared':inProgress?'in-progress':'available';
      return {
        route:config.route,
        endingId:config.endingId,
        state:routeState,
        availableSupportIds:routeAvailableSupportIds
      };
    });

  const princeDefeated=s.run.progression.worldFacts.includes(PALACE_PRINCE_DEFEATED_FACT);
  const princeConfrontationAvailable=palacePrinceConfrontationReady(s);
  const trueEndingEligible=palaceFullTrueEndingPredicate(s)
    && s.run.endings.eligible.includes('ending.palace.return-home');

  const eligibleEndingIds=s.run.endings.eligible
    .filter(isPalaceEndingId)
    .filter(id=>id!=='ending.palace.return-home'||trueEndingEligible);

  return {
    accessGranted:true,
    stage:state.stage,
    dutyCount,
    dutyTotal:PALACE_MAX_STRUCTURAL_DUTIES,
    structuralDutyUsedToday:state.lastStructuralDutyDay===s.run.calendar.elapsedDays,
    supportUsedToday:state.lastSupportActionDay===s.run.calendar.elapsedDays,
    nextDutyId:nextDuty?.id??null,
    nextDutyAvailable:!!nextDuty&&palaceStructuralDutyAvailable(s,nextDuty.id),
    structuralDutyEnergyCost:PALACE_STRUCTURAL_DUTY_ENERGY_COST,
    supportEnergyCost:PALACE_SUPPORT_ENERGY_COST,
    wagePreview:palaceStructuralWage(s),
    routes,
    availableSupportIds,
    outcomeReady:state.stage==='outcome-ready'
      && s.run.progression.worldFacts.includes(PALACE_PROGRESSION_COMPLETE_FACT),
    eligibleEndingIds,
    trueEndingEligible,
    princeConfrontationAvailable,
    princeDefeated
  };
}
