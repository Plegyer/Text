import {palaceNewStartQualified} from './hardWorkMeta.ts';
import {
  palaceStages,
  stats,
  type PalaceRoutePrepFact,
  type PalaceStage,
  type Save,
  type Stat
} from './schema.ts';

export const PALACE_D23_QUALIFIED_FACT='palace.d23-qualified';
export const PALACE_ACCESS_FACT='palace.access-granted';
export const PALACE_PROGRESSION_COMPLETE_FACT='palace.progression-complete';
export const PALACE_PRINCE_DEFEATED_FACT='palace.prince-defeated';
export const PALACE_TRUE_ENDING_STAT_THRESHOLD=91;
export const PALACE_DUTY_COUNTER='palace-duty-count';
export const PALACE_STRUCTURAL_DUTY_ENERGY_COST=1;
export const PALACE_SUPPORT_ENERGY_COST=1;
export const PALACE_MAX_STRUCTURAL_DUTIES=15;
export const PALACE_MAX_STRUCTURAL_DUTIES_PER_DAY=1;
export const PALACE_MAX_SUPPORT_ACTIONS_PER_DAY=1;

export const palaceCap200Copy={
  ru:'Максимум каждой из 12 характеристик развития становится 200 вместо 100; сами значения не умножаются.',
  en:'The maximum of each of the 12 progression stats becomes 200 instead of 100; the values themselves are not multiplied.'
} as const;

export const palaceDutyDefinitions=[
  {ordinal:1,id:'palace.duty.01-service-rotation',family:'service-rotation',stage:'entered-service',transition:null},
  {ordinal:2,id:'palace.duty.02-logistics-support',family:'logistics-support',stage:'entered-service',transition:'duty-02-working-rhythm'},
  {ordinal:3,id:'palace.duty.03-records-review',family:'records-review',stage:'working-rhythm',transition:null},
  {ordinal:4,id:'palace.duty.04-service-rotation',family:'service-rotation',stage:'working-rhythm',transition:null},
  {ordinal:5,id:'palace.duty.05-logistics-support',family:'logistics-support',stage:'working-rhythm',transition:'duty-05-trusted-service'},
  {ordinal:6,id:'palace.duty.06-coordination',family:'coordination',stage:'trusted-service',transition:null},
  {ordinal:7,id:'palace.duty.07-records-review',family:'records-review',stage:'trusted-service',transition:null},
  {ordinal:8,id:'palace.duty.08-service-rotation',family:'service-rotation',stage:'trusted-service',transition:'duty-08-palace-network'},
  {ordinal:9,id:'palace.duty.09-formal-interface',family:'formal-interface',stage:'palace-network',transition:null},
  {ordinal:10,id:'palace.duty.10-coordination',family:'coordination',stage:'palace-network',transition:null},
  {ordinal:11,id:'palace.duty.11-logistics-support',family:'logistics-support',stage:'palace-network',transition:null},
  {ordinal:12,id:'palace.duty.12-records-review',family:'records-review',stage:'palace-network',transition:'duty-12-crossroads'},
  {ordinal:13,id:'palace.duty.13-evidence-review',family:'evidence-review',stage:'crossroads',transition:null},
  {ordinal:14,id:'palace.duty.14-formal-interface',family:'formal-interface',stage:'crossroads',transition:null},
  {ordinal:15,id:'palace.duty.15-coordination',family:'coordination',stage:'crossroads',transition:'duty-15-outcome-ready'}
] as const satisfies readonly {
  ordinal:number;
  id:string;
  family:string;
  stage:PalaceStage;
  transition:string|null;
}[];

export type PalaceDutyId=typeof palaceDutyDefinitions[number]['id'];

export const palaceRoutePrepWorldFacts:Record<PalaceRoutePrepFact,string>={
  'service-life':'palace.prep.service-life',
  'court-power':'palace.prep.court-power',
  'inner-truth':'palace.prep.inner-truth'
};

export const palaceRouteReadyWorldFacts:Record<PalaceRoutePrepFact,string>={
  'service-life':'palace.outcome.service-life-ready',
  'court-power':'palace.outcome.court-power-ready',
  'inner-truth':'palace.outcome.inner-truth-ready'
};

export const palaceSupportDefinitions=[
  {
    id:'palace.outcome-prep.service-life.01-continuity',
    route:'service-life',
    firstStage:'trusted-service',
    priorId:null,
    writesPrep:false
  },
  {
    id:'palace.outcome-prep.service-life.02-boundaries',
    route:'service-life',
    firstStage:'trusted-service',
    priorId:'palace.outcome-prep.service-life.01-continuity',
    writesPrep:true
  },
  {
    id:'palace.outcome-prep.court-power.01-responsibility',
    route:'court-power',
    firstStage:'palace-network',
    priorId:null,
    writesPrep:false
  },
  {
    id:'palace.outcome-prep.court-power.02-network',
    route:'court-power',
    firstStage:'palace-network',
    priorId:'palace.outcome-prep.court-power.01-responsibility',
    writesPrep:true
  },
  {
    id:'palace.outcome-prep.inner-truth.01-evidence',
    route:'inner-truth',
    firstStage:'crossroads',
    priorId:null,
    writesPrep:false
  },
  {
    id:'palace.outcome-prep.inner-truth.02-contradiction',
    route:'inner-truth',
    firstStage:'crossroads',
    priorId:'palace.outcome-prep.inner-truth.01-evidence',
    writesPrep:true
  }
] as const satisfies readonly {
  id:string;
  route:PalaceRoutePrepFact;
  firstStage:PalaceStage;
  priorId:string|null;
  writesPrep:boolean;
}[];

export type PalaceSupportId=typeof palaceSupportDefinitions[number]['id'];

export const palaceRewardIntegrationSeams={
  'ending.palace.service-life':{
    rewardId:'palace.service-life.steady-practice',
    layer:'specialist',
    dependency:'chat4/strong-meta-runtime-producer-v7@6c3865aec1283055ab0713ca4b2873d379f3ddc6'
  },
  'ending.palace.court-power':{
    rewardId:'palace.court-power.formal-introduction',
    layer:'specialist',
    dependency:'chat4/strong-meta-runtime-producer-v7@6c3865aec1283055ab0713ca4b2873d379f3ddc6'
  },
  'ending.palace.inner-truth':{
    rewardId:'palace.inner-truth.source-method',
    layer:'automatic-knowledge',
    dependency:'automatic-knowledge registry not present on current main'
  },
  'ending.palace.return-home':{
    rewardId:'palace.true.cap-200',
    layer:'specialist',
    dependency:'chat4/strong-meta-runtime-producer-v7@6c3865aec1283055ab0713ca4b2873d379f3ddc6'
  }
} as const;

export function palaceD23Qualified(s:Save):boolean{
  return palaceNewStartQualified({
    earnedHardWork:s.meta.hardWorkProgress,
    activePackages:s.run.character.creation.activeHardWorkPackages
  });
}

export function markPalaceCreationQualification(s:Save):boolean{
  const qualified=palaceD23Qualified(s);
  const facts=s.run.progression.worldFacts;
  const index=facts.indexOf(PALACE_D23_QUALIFIED_FACT);
  if(qualified&&index<0)facts.push(PALACE_D23_QUALIFIED_FACT);
  if(!qualified&&index>=0)facts.splice(index,1);
  return qualified;
}

export function palaceHasAccess(s:Save):boolean{
  return s.run.progression.worldFacts.includes(PALACE_ACCESS_FACT);
}

export function palaceTrueEndingStatsReady(values:Readonly<Record<Stat,number>>):boolean{
  return stats.every(stat=>values[stat]>=PALACE_TRUE_ENDING_STAT_THRESHOLD);
}

export function palaceDutyCount(s:Save):number{
  return s.run.progression.palace.counters[PALACE_DUTY_COUNTER]??0;
}

export function palaceStructuralWage(s:Save):number{
  const {reason,wits,manners,sociability}=s.run.character.stats;
  return 35+Math.min(20,Math.floor((reason+wits+manners+sociability)/20));
}

export function palaceStageAtLeast(current:PalaceStage,required:PalaceStage):boolean{
  return palaceStages.indexOf(current)>=palaceStages.indexOf(required);
}

export function palaceExpectedStageForDutyCount(count:number):PalaceStage{
  if(count>=15)return 'outcome-ready';
  if(count>=12)return 'crossroads';
  if(count>=8)return 'palace-network';
  if(count>=5)return 'trusted-service';
  if(count>=2)return 'working-rhythm';
  return 'entered-service';
}

export function assertPalaceProgressionState(s:Save):void{
  if(Object.prototype.hasOwnProperty.call(s.run.progression.careers,'palace')){
    throw new Error('Palace progression must not be duplicated in progression.careers.');
  }

  const state=s.run.progression.palace;
  const count=palaceDutyCount(s);
  if(!Number.isInteger(count)||count<0||count>PALACE_MAX_STRUCTURAL_DUTIES)throw new Error('Некорректный Palace duty count.');
  if(state.shifts!==count)throw new Error('Palace shifts/duty-count mismatch.');
  const expectedStage=palaceExpectedStageForDutyCount(count);
  if(state.stage!==expectedStage)throw new Error(`Palace stage/count mismatch: ${state.stage} / ${count}.`);

  const expectedDutyIds=palaceDutyDefinitions.slice(0,count).map(definition=>definition.id);
  if(state.committedDutyIds.length!==expectedDutyIds.length||state.committedDutyIds.some((id,index)=>id!==expectedDutyIds[index])){
    throw new Error('Некорректная последовательность committed Palace duties.');
  }
  if(new Set(state.completedSupportIds).size!==state.completedSupportIds.length)throw new Error('Дублированный Palace support action.');
  if(state.completedSupportIds.some(id=>!palaceSupportDefinition(id)))throw new Error('Неизвестный Palace support action в сохранении.');
  for(const definition of palaceSupportDefinitions){
    if(definition.priorId&&state.completedSupportIds.includes(definition.id)&&!state.completedSupportIds.includes(definition.priorId)){
      throw new Error('Palace support sequence mismatch.');
    }
  }
  if(new Set(state.routePrepFacts).size!==state.routePrepFacts.length)throw new Error('Дублированный Palace route-prep fact.');

  for(const route of state.routePrepFacts){
    if(!s.run.progression.worldFacts.includes(palaceRoutePrepWorldFacts[route]))throw new Error('Palace route-prep projection mismatch.');
    const completing=palaceSupportDefinitions.find(definition=>definition.route===route&&definition.writesPrep);
    if(!completing||!state.completedSupportIds.includes(completing.id))throw new Error('Palace route-prep support mismatch.');
  }
  for(const route of Object.keys(palaceRoutePrepWorldFacts) as PalaceRoutePrepFact[]){
    const projected=s.run.progression.worldFacts.includes(palaceRoutePrepWorldFacts[route]);
    if(projected!==state.routePrepFacts.includes(route))throw new Error('Palace route-prep worldFact mismatch.');
  }

  const completionFactCount=s.run.progression.worldFacts.filter(fact=>fact===PALACE_PROGRESSION_COMPLETE_FACT).length;
  const complete=completionFactCount===1;
  if(completionFactCount>1)throw new Error('Дублированный Palace progression-complete fact.');
  if(complete!==(count===PALACE_MAX_STRUCTURAL_DUTIES&&state.stage==='outcome-ready')){
    throw new Error('Palace progression-complete mismatch.');
  }
  if(state.lastStructuralDutyDay>s.run.calendar.elapsedDays||state.lastSupportActionDay>s.run.calendar.elapsedDays){
    throw new Error('Palace daily-lock day находится в будущем.');
  }
}

export function palaceDutyDefinition(id:string){
  return palaceDutyDefinitions.find(definition=>definition.id===id);
}

export function palaceSupportDefinition(id:string){
  return palaceSupportDefinitions.find(definition=>definition.id===id);
}

export function palaceStructuralDutyAvailable(s:Save,id:string):boolean{
  const definition=palaceDutyDefinition(id);
  if(!definition||!palaceHasAccess(s))return false;
  const state=s.run.progression.palace;
  if(palaceDutyCount(s)>=PALACE_MAX_STRUCTURAL_DUTIES)return false;
  if(state.lastStructuralDutyDay===s.run.calendar.elapsedDays)return false;
  if(state.committedDutyIds.includes(definition.id))return false;
  if(definition.ordinal!==palaceDutyCount(s)+1)return false;
  return state.stage===definition.stage;
}

export function palaceSupportActionAvailable(s:Save,id:string):boolean{
  const definition=palaceSupportDefinition(id);
  if(!definition||!palaceHasAccess(s))return false;
  const state=s.run.progression.palace;
  if(state.lastSupportActionDay===s.run.calendar.elapsedDays)return false;
  if(state.completedSupportIds.includes(definition.id))return false;
  if(!palaceStageAtLeast(state.stage,definition.firstStage))return false;
  if(state.routePrepFacts.includes(definition.route))return false;
  if(definition.priorId&&!state.completedSupportIds.includes(definition.priorId))return false;
  return true;
}

export function markPalaceRoutePrepared(s:Save,route:PalaceRoutePrepFact):void{
  const state=s.run.progression.palace;
  if(!state.routePrepFacts.includes(route))state.routePrepFacts.push(route);
  const fact=palaceRoutePrepWorldFacts[route];
  if(!s.run.progression.worldFacts.includes(fact))s.run.progression.worldFacts.push(fact);
}
