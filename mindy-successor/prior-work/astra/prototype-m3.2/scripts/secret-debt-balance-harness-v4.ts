export const RESEARCH_ONLY_BANNER='RESEARCH ONLY — Secret Debt balance harness; no preset is Product authority.' as const;

export type LodgingChoice='street'|'cheap'|'normal';
export type BuildId='low'|'mid'|'high';
export type ResearchPresetId='harsh'|'v3'|'forgiving';

export interface ShiftGains {
  strength:number;
  endurance:number;
  sexuality:number;
}

export interface WageModel {
  base:number;
  strengthFactor:number;
  enduranceFactor:number;
  lustFactor:number;
}

export interface TakeoverThresholds {
  strength:number;
  endurance:number;
  sexuality:number;
  lust:number;
}

export interface ResearchPreset {
  id:ResearchPresetId;
  label:string;
  researchOnly:true;
  shiftGains:ShiftGains;
  wage:WageModel;
  takeover:TakeoverThresholds;
}

export interface ActivationBuild {
  strength:number;
  endurance:number;
  sexuality:number;
  lust:number;
}

export interface SchoolLessonMix {
  physicalTraining:number;
  bodyConfidence:number;
}

export interface SimulationScenario {
  build:ActivationBuild;
  startingMoney:number;
  lodging:LodgingChoice;
  dailyEnergyBonus:boolean;
  schoolLessonMix:SchoolLessonMix;
  activityCadenceDays:number|null;
  maxDays?:number;
}

export interface DailyTrajectoryPoint {
  day:number;
  moneyStart:number;
  energyStart:number;
  schoolLesson:'physical-training'|'body-confidence'|null;
  schoolCost:number;
  activityAttempted:boolean;
  activityCompleted:boolean;
  activityEnergyCost:number;
  shiftsThisDay:number;
  wageEarned:number;
  lodgingCost:number;
  moneyEnd:number;
  energyEnd:number;
  totalShifts:number;
  totalSchoolLessons:number;
  strength:number;
  endurance:number;
  sexuality:number;
  lust:number;
}

export interface SimulationResult {
  researchOnly:true;
  banner:typeof RESEARCH_ONLY_BANNER;
  presetId:ResearchPresetId;
  dayTo50HiddenShifts:number|null;
  dayTo10SchoolLessons:number|null;
  dayToFull20000Repayment:number|null;
  dayTakeoverFirstEligible:number|null;
  activitiesCompleted:number;
  activitiesSkippedForEnergy:number;
  insolventDay:number|null;
  trajectory:DailyTrajectoryPoint[];
  impossibleBeforeDay160:{
    fiftyShifts:boolean;
    tenSchoolLessons:boolean;
    repayment:boolean;
    takeover:boolean;
    anyModeledExit:boolean;
  };
}

const BASE_DAILY_ENERGY=3;
const FORCED_NIGHT_ENERGY_DELTA=-1;
const DEBT_TARGET=20_000;
const HIDDEN_HARD_WORK_SHIFTS=50;
const REQUIRED_PAID_SCHOOL_LESSONS=10;
const SCHOOL_ENERGY_COST=1;
const SCHOOL_TUITION=400;
const ACTIVITY_ENERGY_COST=2;
const STAT_CAP=100;
const DEFAULT_MAX_DAYS=160;

const LODGING:Record<LodgingChoice,{cost:number;nextDayEnergyDelta:number}>={
  street:{cost:0,nextDayEnergyDelta:-1},
  cheap:{cost:50,nextDayEnergyDelta:0},
  normal:{cost:100,nextDayEnergyDelta:0}
};

export const RESEARCH_PRESETS:Record<ResearchPresetId,ResearchPreset>={
  harsh:{
    id:'harsh',
    label:'Conservative / harsh research preset',
    researchOnly:true,
    shiftGains:{strength:1,endurance:1,sexuality:1},
    wage:{base:20,strengthFactor:0.55,enduranceFactor:0.45,lustFactor:0.20},
    takeover:{strength:65,endurance:65,sexuality:65,lust:30}
  },
  v3:{
    id:'v3',
    label:'Current v3 proposal research preset',
    researchOnly:true,
    shiftGains:{strength:1,endurance:1,sexuality:1},
    wage:{base:25,strengthFactor:0.70,enduranceFactor:0.60,lustFactor:0.35},
    takeover:{strength:60,endurance:60,sexuality:60,lust:25}
  },
  forgiving:{
    id:'forgiving',
    label:'More forgiving research preset',
    researchOnly:true,
    shiftGains:{strength:2,endurance:2,sexuality:1},
    wage:{base:30,strengthFactor:0.80,enduranceFactor:0.70,lustFactor:0.45},
    takeover:{strength:55,endurance:55,sexuality:55,lust:20}
  }
};

export const BUILD_PRESETS:Record<BuildId,ActivationBuild>={
  low:{strength:10,endurance:10,sexuality:10,lust:5},
  mid:{strength:30,endurance:30,sexuality:30,lust:15},
  high:{strength:50,endurance:50,sexuality:50,lust:25}
};

type Lesson='physical-training'|'body-confidence';

function integer(name:string,value:number){
  if(!Number.isInteger(value)||value<0)throw new Error(`${name} must be a non-negative integer.`);
}

function positiveInteger(name:string,value:number){
  if(!Number.isInteger(value)||value<=0)throw new Error(`${name} must be a positive integer.`);
}

function capped(value:number){
  return Math.max(0,Math.min(STAT_CAP,value));
}

function balancedLessonQueue(mix:SchoolLessonMix):Lesson[]{
  integer('physicalTraining',mix.physicalTraining);
  integer('bodyConfidence',mix.bodyConfidence);
  const queue:Lesson[]=[];
  let usedPhysical=0,usedBody=0;
  while(usedPhysical<mix.physicalTraining||usedBody<mix.bodyConfidence){
    if(usedPhysical>=mix.physicalTraining){
      queue.push('body-confidence');usedBody++;continue;
    }
    if(usedBody>=mix.bodyConfidence){
      queue.push('physical-training');usedPhysical++;continue;
    }
    const physicalRatio=usedPhysical/mix.physicalTraining;
    const bodyRatio=usedBody/mix.bodyConfidence;
    if(physicalRatio<=bodyRatio){
      queue.push('physical-training');usedPhysical++;
    }else{
      queue.push('body-confidence');usedBody++;
    }
  }
  return queue;
}

function validatePreset(preset:ResearchPreset){
  if(!preset.researchOnly)throw new Error('Balance presets must be labeled researchOnly.');
  for(const [name,value] of Object.entries(preset.shiftGains)){
    if(!Number.isFinite(value)||value<0)throw new Error(`shiftGains.${name} must be finite and non-negative.`);
  }
  for(const [name,value] of Object.entries(preset.wage)){
    if(!Number.isFinite(value)||value<0)throw new Error(`wage.${name} must be finite and non-negative.`);
  }
  for(const [name,value] of Object.entries(preset.takeover)){
    if(!Number.isFinite(value)||value<0)throw new Error(`takeover.${name} must be finite and non-negative.`);
  }
}

function wageFor(preset:ResearchPreset,build:ActivationBuild){
  return Math.max(0,Math.round(
    preset.wage.base
    +build.strength*preset.wage.strengthFactor
    +build.endurance*preset.wage.enduranceFactor
    +build.lust*preset.wage.lustFactor
  ));
}

function takeoverReady(
  preset:ResearchPreset,
  build:ActivationBuild,
  shifts:number,
  schoolLessons:number
){
  return shifts>=HIDDEN_HARD_WORK_SHIFTS
    &&schoolLessons>=REQUIRED_PAID_SCHOOL_LESSONS
    &&build.strength>=preset.takeover.strength
    &&build.endurance>=preset.takeover.endurance
    &&build.sexuality>=preset.takeover.sexuality
    &&build.lust>=preset.takeover.lust;
}

function applyLesson(build:ActivationBuild,lesson:Lesson){
  if(lesson==='physical-training'){
    build.strength=capped(build.strength+3);
    build.endurance=capped(build.endurance+3);
    return;
  }
  build.sexuality=capped(build.sexuality+3);
  build.endurance=capped(build.endurance+2);
  build.lust=capped(build.lust+2);
}

/**
 * Isolated research model.
 *
 * Fixed action policy:
 * 1) at most one paid School lesson is attempted first when money can cover
 *    both tuition and the selected lodging;
 * 2) the scheduled Large Activity is attempted next on cadence days;
 * 3) all remaining Energy is spent on hidden work;
 * 4) lodging is paid at day end.
 *
 * Repayment and Takeover are recorded as first eligibility milestones.  The
 * model intentionally keeps simulating after a milestone instead of exiting,
 * so competing route timings can be compared in one run.
 */
export function simulateSecretDebtBalance(
  preset:ResearchPreset,
  scenario:SimulationScenario
):SimulationResult{
  validatePreset(preset);
  if(!Number.isFinite(scenario.startingMoney)||scenario.startingMoney<0)throw new Error('startingMoney must be finite and non-negative.');
  const maxDays=scenario.maxDays??DEFAULT_MAX_DAYS;
  positiveInteger('maxDays',maxDays);
  if(maxDays<DEFAULT_MAX_DAYS)throw new Error('maxDays must be at least 160 so impossibleBeforeDay160 is meaningful.');
  if(scenario.activityCadenceDays!==null)positiveInteger('activityCadenceDays',scenario.activityCadenceDays);

  const lodging=LODGING[scenario.lodging];
  const lessonQueue=balancedLessonQueue(scenario.schoolLessonMix);
  const build:ActivationBuild={...scenario.build};
  let money=scenario.startingMoney;
  let shifts=0;
  let schoolLessons=0;
  let activitiesCompleted=0;
  let activitiesSkippedForEnergy=0;
  let dayTo50HiddenShifts:number|null=null;
  let dayTo10SchoolLessons:number|null=null;
  let dayToFull20000Repayment:number|null=money>=DEBT_TARGET?0:null;
  let dayTakeoverFirstEligible:number|null=null;
  let insolventDay:number|null=null;
  const trajectory:DailyTrajectoryPoint[]=[];

  for(let day=1;day<=maxDays;day++){
    let energy=Math.max(
      0,
      BASE_DAILY_ENERGY
      +(scenario.dailyEnergyBonus?1:0)
      +FORCED_NIGHT_ENERGY_DELTA
      +lodging.nextDayEnergyDelta
    );
    const moneyStart=money;
    const energyStart=energy;
    let schoolLesson:Lesson|null=null;
    let schoolCost=0;
    let activityAttempted=false;
    let activityCompleted=false;
    let shiftsThisDay=0;
    let wageEarned=0;

    if(lessonQueue.length&&energy>=SCHOOL_ENERGY_COST&&money>=SCHOOL_TUITION+lodging.cost){
      const lesson=lessonQueue.shift()!;
      schoolLesson=lesson;
      schoolCost=SCHOOL_TUITION;
      money-=SCHOOL_TUITION;
      energy-=SCHOOL_ENERGY_COST;
      schoolLessons++;
      applyLesson(build,lesson);
      if(schoolLessons>=REQUIRED_PAID_SCHOOL_LESSONS&&dayTo10SchoolLessons===null){
        dayTo10SchoolLessons=day;
      }
      if(dayTakeoverFirstEligible===null&&takeoverReady(preset,build,shifts,schoolLessons)){
        dayTakeoverFirstEligible=day;
      }
    }

    if(scenario.activityCadenceDays!==null&&day%scenario.activityCadenceDays===0){
      activityAttempted=true;
      if(energy>=ACTIVITY_ENERGY_COST){
        energy-=ACTIVITY_ENERGY_COST;
        activityCompleted=true;
        activitiesCompleted++;
      }else{
        activitiesSkippedForEnergy++;
      }
    }

    while(energy>=1){
      const wage=wageFor(preset,build);
      money+=wage;
      wageEarned+=wage;
      energy--;
      shifts++;
      shiftsThisDay++;
      build.strength=capped(build.strength+preset.shiftGains.strength);
      build.endurance=capped(build.endurance+preset.shiftGains.endurance);
      build.sexuality=capped(build.sexuality+preset.shiftGains.sexuality);

      if(shifts>=HIDDEN_HARD_WORK_SHIFTS&&dayTo50HiddenShifts===null){
        dayTo50HiddenShifts=day;
      }
      if(money>=DEBT_TARGET&&dayToFull20000Repayment===null){
        dayToFull20000Repayment=day;
      }
      if(dayTakeoverFirstEligible===null&&takeoverReady(preset,build,shifts,schoolLessons)){
        dayTakeoverFirstEligible=day;
      }
    }

    if(money>=DEBT_TARGET&&dayToFull20000Repayment===null){
      dayToFull20000Repayment=day;
    }
    if(dayTakeoverFirstEligible===null&&takeoverReady(preset,build,shifts,schoolLessons)){
      dayTakeoverFirstEligible=day;
    }

    if(money>=lodging.cost){
      money-=lodging.cost;
    }else{
      insolventDay=day;
    }

    trajectory.push({
      day,
      moneyStart,
      energyStart,
      schoolLesson,
      schoolCost,
      activityAttempted,
      activityCompleted,
      activityEnergyCost:activityCompleted?ACTIVITY_ENERGY_COST:0,
      shiftsThisDay,
      wageEarned,
      lodgingCost:lodging.cost,
      moneyEnd:money,
      energyEnd:energy,
      totalShifts:shifts,
      totalSchoolLessons:schoolLessons,
      strength:build.strength,
      endurance:build.endurance,
      sexuality:build.sexuality,
      lust:build.lust
    });

    if(insolventDay!==null)break;
  }

  const horizon=Math.min(maxDays,DEFAULT_MAX_DAYS);
  const impossible=(value:number|null)=>value===null||value>horizon;
  return {
    researchOnly:true,
    banner:RESEARCH_ONLY_BANNER,
    presetId:preset.id,
    dayTo50HiddenShifts,
    dayTo10SchoolLessons,
    dayToFull20000Repayment,
    dayTakeoverFirstEligible,
    activitiesCompleted,
    activitiesSkippedForEnergy,
    insolventDay,
    trajectory,
    impossibleBeforeDay160:{
      fiftyShifts:impossible(dayTo50HiddenShifts),
      tenSchoolLessons:impossible(dayTo10SchoolLessons),
      repayment:impossible(dayToFull20000Repayment),
      takeover:impossible(dayTakeoverFirstEligible),
      anyModeledExit:
        impossible(dayTo50HiddenShifts)
        &&impossible(dayToFull20000Repayment)
        &&impossible(dayTakeoverFirstEligible)
    }
  };
}

function parseArg(name:string){
  const index=process.argv.indexOf(name);
  return index>=0?process.argv[index+1]:undefined;
}

function parsePreset(value:string|undefined):ResearchPreset{
  const id=(value??'v3') as ResearchPresetId;
  const preset=RESEARCH_PRESETS[id];
  if(!preset)throw new Error(`Unknown preset: ${value}`);
  return preset;
}

function parseBuild(value:string|undefined):ActivationBuild{
  const id=(value??'mid') as BuildId;
  const build=BUILD_PRESETS[id];
  if(!build)throw new Error(`Unknown build: ${value}`);
  return build;
}

function parseLodging(value:string|undefined):LodgingChoice{
  const lodging=(value??'cheap') as LodgingChoice;
  if(!(lodging in LODGING))throw new Error(`Unknown lodging: ${value}`);
  return lodging;
}

function numberArg(name:string,fallback:number){
  const raw=parseArg(name);
  if(raw===undefined)return fallback;
  const parsed=Number(raw);
  if(!Number.isFinite(parsed))throw new Error(`${name} must be numeric.`);
  return parsed;
}

function activityArg(){
  const raw=parseArg('--activity-every');
  if(raw===undefined)return 10;
  if(raw==='off'||raw==='none')return null;
  const value=Number(raw);
  positiveInteger('--activity-every',value);
  return value;
}

if(process.argv[1]?.endsWith('secret-debt-balance-harness-v4.ts')){
  const preset=parsePreset(parseArg('--preset'));
  const scenario:SimulationScenario={
    build:parseBuild(parseArg('--build')),
    startingMoney:numberArg('--starting-money',2000),
    lodging:parseLodging(parseArg('--lodging')),
    dailyEnergyBonus:numberArg('--energy-bonus',0)===1,
    schoolLessonMix:{
      physicalTraining:numberArg('--physical-lessons',5),
      bodyConfidence:numberArg('--body-lessons',5)
    },
    activityCadenceDays:activityArg(),
    maxDays:numberArg('--max-days',160)
  };
  const result=simulateSecretDebtBalance(preset,scenario);
  console.log(JSON.stringify({
    researchOnly:true,
    banner:RESEARCH_ONLY_BANNER,
    preset,
    scenario,
    outputs:{
      dayTo50HiddenShifts:result.dayTo50HiddenShifts,
      dayTo10SchoolLessons:result.dayTo10SchoolLessons,
      dayToFull20000Repayment:result.dayToFull20000Repayment,
      dayTakeoverFirstEligible:result.dayTakeoverFirstEligible,
      impossibleBeforeDay160:result.impossibleBeforeDay160,
      activitiesCompleted:result.activitiesCompleted,
      activitiesSkippedForEnergy:result.activitiesSkippedForEnergy,
      insolventDay:result.insolventDay
    },
    trajectory:result.trajectory
  },null,2));
}
