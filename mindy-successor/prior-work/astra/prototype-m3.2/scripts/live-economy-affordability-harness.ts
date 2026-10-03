import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';

import {
  definitionsSchema,
  ordinaryHardWorkCareers,
  seasons,
  stats,
  type Action,
  type Condition,
  type OrdinaryHardWorkCareer,
  type Season,
  type Stat
} from '../src/core/schema.ts';
import {freshSave} from '../src/core/engine.ts';
import {SCHOOL_COURSES,type SchoolCourseId} from '../src/core/school.ts';
import {hardWorkPackageDefinitions} from '../src/core/hardWorkPackageCatalog.ts';

export const LIVE_ECONOMY_RESEARCH_NOTICE=
  'RESEARCH ONLY: D31/D32 are explicit authority overlays; no production definitions or runtime are mutated.';

export const D31_NEGATIVE_TARGETS:Readonly<
  Record<OrdinaryHardWorkCareer,Partial<Record<Season,Stat>>>
>={
  lumber:{spring:'dexterity',winter:'strength'},
  'satyr-maid':{summer:'sociability',autumn:'endurance'},
  'undead-farm':{spring:'reason',autumn:'strength'},
  tavern:{spring:'reason',summer:'wits'},
  hunter:{spring:'endurance',winter:'dexterity'},
  guard:{summer:'manners',winter:'reason'},
  merchant:{summer:'wits',winter:'manners'},
  'artist-geisha':{summer:'manners',autumn:'dexterity'},
  assassin:{spring:'reason',winter:'manners'},
  prostitute:{summer:'sexuality',winter:'endurance'}
};

export const D32_KEYSTONE_PARAMETERS={
  reserveMatchCap:1000,
  workRhythmRewardedDays:20,
  retainerDailyPayment:25,
  retainerWindowDays:40
} as const;

export type KeystoneOverlay='none'|'reserve-match'|'work-rhythm'|'retainer';
export type NegativeMapMode='d31'|'live-shipped';
export type LodgingPreference='cheap'|'normal'|'street';
type WorkMode='starter'|'fixed'|'income'|'hardwork';

export interface StrategySpec {
  id:string;
  label:string;
  allocation:Partial<Record<Stat,number>>;
  workMode:WorkMode;
  priority:readonly OrdinaryHardWorkCareer[];
  lodgingPreference:LodgingPreference;
  school?:{
    courseId:SchoolCourseId;
    everyDays:number;
  };
  earnedHardWork?:readonly OrdinaryHardWorkCareer[];
  activeHardWorkPackages?:readonly OrdinaryHardWorkCareer[];
}

export interface MoneyTrajectory {
  day10:number;
  day20:number;
  day40:number;
  day50:number;
  day80:number;
  day120:number;
  day160:number;
}

export interface ScenarioResult {
  id:string;
  label:string;
  overlay:KeystoneOverlay;
  negativeMap:NegativeMapMode;
  startingAllocation:Partial<Record<Stat,number>>;
  earnedHardWork:readonly OrdinaryHardWorkCareer[];
  activeHardWorkPackages:readonly OrdinaryHardWorkCareer[];
  moneyTrajectory:MoneyTrajectory;
  finalMoney:number;
  grossWorkIncome:number;
  lodgingSpend:number;
  lodgingNights:{normal:number;cheap:number;street:number};
  forcedStreetNights:number;
  maxForcedStreetStreak:number;
  energyLostToStreet:number;
  mechanicallyRationalNormalNights:number;
  normalPremiumSpentVsCheap:number;
  school:{
    opportunities:number;
    moneyAffordable:number;
    completed:number;
    tuitionPaid:number;
    courseId:SchoolCourseId|null;
  };
  hardWorkCompletionDays:Partial<Record<OrdinaryHardWorkCareer,number>>;
  careerUnlockDays:Partial<Record<OrdinaryHardWorkCareer,number>>;
  shifts:Record<OrdinaryHardWorkCareer,number>;
  literalDebtCreated:boolean;
  affordabilitySpiral:boolean;
  keystone:{
    reserveMatchPaid:number;
    workRhythmEnergyGranted:number;
    workRhythmEnergyUsed:number;
    retainerPaid:number;
  };
}

export interface D31Impact {
  grossWorkIncomeDelta:number;
  finalMoneyDelta:number;
  streetNightDelta:number;
}

export interface PrimaryScenarioResult extends ScenarioResult {
  d31VsLiveShipped:D31Impact;
}

export interface LiveEconomyAffordabilityResult {
  schemaVersion:1;
  researchNotice:string;
  source:{
    startingMoney:number;
    baseDailyEnergy:number;
    lodging:{
      normal:number;
      cheap:number;
      street:number;
      streetNextDayEnergyDelta:number;
      streetGroomingDelta:number;
      paidNightsPerFullRun:number;
      normalMechanicallyDominatedByCheap:boolean;
    };
    school:Array<{
      id:SchoolCourseId;
      tuition:number;
      energyCost:number;
      statPointTotal:number;
    }>;
    d26SameCareerShiftLimitPerDay:1;
    d31TargetCount:number;
    hardWorkThreshold:50;
  };
  assumptions:{
    humanDays:number;
    finalDayHasNoNewLodgingPayment:boolean;
    nonAutomaticItemMonetizationExcluded:boolean;
    secretDebtBoundStateExcludedFromOrdinaryBaseline:boolean;
    affordabilitySpiralDefinition:string;
    mixedNewStartProfile:string;
  };
  primary:PrimaryScenarioResult[];
  d32Comparisons:ScenarioResult[];
  assessment:{
    viableWithoutChronicStreetOrKeystone:boolean;
    normalLodgingMechanicallyRationalUnderCurrentSemantics:boolean;
    schoolInvestmentCanCompleteAllScheduledLessonsWithoutStreet:boolean;
    oneCareerFocusNeedsAnyForcedStreet:boolean;
  };
}

export interface LiveEconomySource {
  definitions:ReturnType<typeof definitionsSchema.parse>;
  startingMoney:number;
  baseDailyEnergy:number;
}

const snapshotDays=[10,20,40,50,80,120,160] as const;
const starterCareers=['lumber','satyr-maid','undead-farm'] as const satisfies readonly OrdinaryHardWorkCareer[];
const mixedEarned=[
  'lumber','undead-farm','hunter','merchant','assassin'
] as const satisfies readonly OrdinaryHardWorkCareer[];
const mixedPriority=[
  'hunter','merchant','assassin',
  'lumber','satyr-maid','undead-farm',
  'tavern','guard','artist-geisha','prostitute'
] as const satisfies readonly OrdinaryHardWorkCareer[];

export const LIVE_ECONOMY_STRATEGIES:readonly StrategySpec[]=[
  {
    id:'survival-first',
    label:'Survival-first cheap lodging + diversified starter work',
    allocation:{strength:4,charm:3,magic:3},
    workMode:'starter',
    priority:starterCareers,
    lodgingPreference:'cheap'
  },
  {
    id:'normal-preference',
    label:'Normal-lodging preference + diversified starter work',
    allocation:{strength:4,charm:3,magic:3},
    workMode:'starter',
    priority:starterCareers,
    lodgingPreference:'normal'
  },
  {
    id:'school-investment',
    label:'School investment: Rhetoric & Social every 10 days when affordable',
    allocation:{charm:5,sociability:5},
    workMode:'income',
    priority:ordinaryHardWorkCareers,
    lodgingPreference:'cheap',
    school:{courseId:'school.course.rhetoric_and_social',everyDays:10}
  },
  {
    id:'one-career-hard-work',
    label:'One-career Hard Work focus: Lumber',
    allocation:{strength:10},
    workMode:'fixed',
    priority:['lumber'],
    lodgingPreference:'cheap'
  },
  {
    id:'diversified-multi-hard-work',
    label:'Diversified multi-career Hard Work in sequential D26 batches',
    allocation:{strength:4,charm:3,magic:3},
    workMode:'hardwork',
    priority:ordinaryHardWorkCareers,
    lodgingPreference:'cheap'
  },
  {
    id:'poverty-street',
    label:'Poverty / street fallback with multi-career work',
    allocation:{strength:4,charm:3,magic:3},
    workMode:'hardwork',
    priority:ordinaryHardWorkCareers,
    lodgingPreference:'street'
  },
  {
    id:'mixed-newstart',
    label:'Mixed earned Hard Work New Start+ profile',
    allocation:{strength:4,charm:3,magic:3},
    workMode:'hardwork',
    priority:mixedPriority,
    lodgingPreference:'cheap',
    earnedHardWork:mixedEarned,
    activeHardWorkPackages:mixedEarned
  }
];

function actionFor(source:LiveEconomySource,career:OrdinaryHardWorkCareer):Action{
  const action=source.definitions.actions.find(candidate=>candidate.id===career+'.shift');
  if(!action)throw new Error('Missing ordinary action: '+career+'.shift');
  if(!action.seasonal||!action.wage)throw new Error('Ordinary action lacks seasonal/wage data: '+career);
  return action;
}

function lodgingFor(source:LiveEconomySource,tier:'normal'|'cheap'|'street'){
  const lodging=source.definitions.lodgings.find(candidate=>candidate.housing===tier);
  if(!lodging)throw new Error('Missing lodging tier: '+tier);
  return lodging;
}

function stable(value:unknown):string{
  return JSON.stringify(value);
}

function normalDominatedByCheap(source:LiveEconomySource):boolean{
  const normal=lodgingFor(source,'normal');
  const cheap=lodgingFor(source,'cheap');
  return normal.moneyCost>cheap.moneyCost
    && stable(normal.conditions)===stable(cheap.conditions)
    && stable(normal.effects)===stable(cheap.effects)
    && stable(normal.nextDayEffects)===stable(cheap.nextDayEffects)
    && normal.nextDayEnergyDelta===cheap.nextDayEnergyDelta;
}

export function loadLiveEconomySource():LiveEconomySource{
  const definitions=definitionsSchema.parse(JSON.parse(
    readFileSync(resolve(process.cwd(),'content/definitions.json'),'utf8')
  ));
  const fresh=freshSave();
  return {
    definitions,
    startingMoney:fresh.run.resources.money,
    baseDailyEnergy:fresh.run.dayState.energyCurrent
  };
}

function allocationTotal(allocation:Partial<Record<Stat,number>>):number{
  return Object.values(allocation).reduce((sum,value)=>sum+(value??0),0);
}

function validateStrategy(spec:StrategySpec):void{
  if(allocationTotal(spec.allocation)!==10){
    throw new Error('Strategy allocation must use exactly 10 points: '+spec.id);
  }
  const earned=new Set(spec.earnedHardWork??[]);
  for(const active of spec.activeHardWorkPackages??[]){
    if(!earned.has(active))throw new Error('Active Hard Work package is not earned: '+spec.id+'/'+active);
  }
  if(spec.school&&(!Number.isInteger(spec.school.everyDays)||spec.school.everyDays<1||spec.school.everyDays>160)){
    throw new Error('Invalid School cadence: '+spec.id);
  }
}

function seasonForHumanDay(day:number):Season{
  return seasons[Math.floor(((day-1)%40)/10)]!;
}

function yearForHumanDay(day:number):number{
  return Math.floor((day-1)/40)+1;
}

function compareNumber(actual:number,op:string,expected:number):boolean{
  if(op==='gte')return actual>=expected;
  if(op==='gt')return actual>expected;
  if(op==='lte')return actual<=expected;
  if(op==='lt')return actual<expected;
  if(op==='eq')return actual===expected;
  throw new Error('Unsupported numeric operator in affordability harness: '+op);
}

function meetsUnlockCondition(
  condition:Condition,
  state:Record<Stat,number>,
  day:number
):boolean{
  if(condition.kind==='stat')return compareNumber(state[condition.stat],condition.op,condition.value);
  if(condition.kind==='calendarYear')return compareNumber(yearForHumanDay(day),condition.op,condition.value);
  if(condition.kind==='all')return condition.conditions.every(item=>meetsUnlockCondition(item,state,day));
  if(condition.kind==='any')return condition.conditions.some(item=>meetsUnlockCondition(item,state,day));
  if(condition.kind==='not')return !meetsUnlockCondition(condition.condition,state,day);
  throw new Error('Unsupported ordinary unlock condition in research harness: '+condition.kind);
}

function careerAvailable(
  source:LiveEconomySource,
  career:OrdinaryHardWorkCareer,
  state:Record<Stat,number>,
  day:number,
  earned:ReadonlySet<OrdinaryHardWorkCareer>
):boolean{
  if(earned.has(career))return true;
  return actionFor(source,career).conditions.every(condition=>meetsUnlockCondition(condition,state,day));
}

function applyStatDelta(state:Record<Stat,number>,stat:Stat,delta:number):void{
  state[stat]=Math.max(0,Math.min(100,state[stat]+delta));
}

function effectiveSeasonalStatEffects(
  source:LiveEconomySource,
  career:OrdinaryHardWorkCareer,
  season:Season,
  mode:NegativeMapMode
):Array<{stat:Stat;delta:number}>{
  const effects:Array<{stat:Stat;delta:number}>=[];
  for(const effect of actionFor(source,career).seasonal?.[season]??[]){
    if(effect.kind!=='modifyStat')continue;
    const target=effect.delta<0&&mode==='d31'
      ? D31_NEGATIVE_TARGETS[career][season]??effect.stat
      : effect.stat;
    effects.push({stat:target,delta:effect.delta});
  }
  return effects;
}

function wageFor(source:LiveEconomySource,career:OrdinaryHardWorkCareer,state:Record<Stat,number>):number{
  const wage=actionFor(source,career).wage;
  if(!wage)throw new Error('Missing wage: '+career);
  return Math.round(wage.base+wage.weights.reduce(
    (sum,weight)=>sum+state[weight.stat as Stat]*weight.factor,
    0
  ));
}

function applyStartingState(spec:StrategySpec):Record<Stat,number>{
  const state=Object.fromEntries(stats.map(stat=>[stat,1])) as Record<Stat,number>;
  for(const [stat,value] of Object.entries(spec.allocation) as Array<[Stat,number]>){
    state[stat]=Math.min(100,state[stat]+value);
  }
  const active=new Set(spec.activeHardWorkPackages??[]);
  for(const definition of hardWorkPackageDefinitions){
    if(!active.has(definition.career))continue;
    for(const bonus of definition.statBonuses){
      state[bonus.stat]=Math.min(100,state[bonus.stat]+bonus.amount);
    }
  }
  return state;
}

function chooseWorkCandidate(input:{
  source:LiveEconomySource;
  spec:StrategySpec;
  state:Record<Stat,number>;
  day:number;
  earned:ReadonlySet<OrdinaryHardWorkCareer>;
  usedToday:ReadonlySet<OrdinaryHardWorkCareer>;
  shifts:Record<OrdinaryHardWorkCareer,number>;
}):OrdinaryHardWorkCareer|null{
  const available=ordinaryHardWorkCareers.filter(career=>
    !input.usedToday.has(career)&&
    careerAvailable(input.source,career,input.state,input.day,input.earned)
  );

  if(input.spec.workMode==='starter'||input.spec.workMode==='fixed'){
    return input.spec.priority.find(career=>available.includes(career))??null;
  }

  if(input.spec.workMode==='income'){
    return [...available].sort((a,b)=>
      wageFor(input.source,b,input.state)-wageFor(input.source,a,input.state)
      ||ordinaryHardWorkCareers.indexOf(a)-ordinaryHardWorkCareers.indexOf(b)
    )[0]??null;
  }

  const incomplete=input.spec.priority.find(career=>
    available.includes(career)&&input.shifts[career]<50
  );
  if(incomplete)return incomplete;

  return [...available].sort((a,b)=>
    wageFor(input.source,b,input.state)-wageFor(input.source,a,input.state)
    ||ordinaryHardWorkCareers.indexOf(a)-ordinaryHardWorkCareers.indexOf(b)
  )[0]??null;
}

function chooseLodgingTier(
  source:LiveEconomySource,
  preference:LodgingPreference,
  money:number
):'normal'|'cheap'|'street'{
  if(preference==='street')return 'street';
  if(preference==='normal'){
    if(money>=lodgingFor(source,'normal').moneyCost)return 'normal';
    if(money>=lodgingFor(source,'cheap').moneyCost)return 'cheap';
    return 'street';
  }
  return money>=lodgingFor(source,'cheap').moneyCost?'cheap':'street';
}

function emptyShifts():Record<OrdinaryHardWorkCareer,number>{
  return Object.fromEntries(
    ordinaryHardWorkCareers.map(career=>[career,0])
  ) as Record<OrdinaryHardWorkCareer,number>;
}

function trajectoryValue(trajectory:Partial<Record<number,number>>,day:number):number{
  const value=trajectory[day];
  if(value===undefined)throw new Error('Missing trajectory snapshot: Day '+day);
  return value;
}

export function simulateEconomyStrategy(
  source:LiveEconomySource,
  spec:StrategySpec,
  options?:{
    overlay?:KeystoneOverlay;
    negativeMap?:NegativeMapMode;
  }
):ScenarioResult{
  validateStrategy(spec);
  const overlay=options?.overlay??'none';
  const negativeMap=options?.negativeMap??'d31';
  const state=applyStartingState(spec);
  const earned=new Set(spec.earnedHardWork??[]);
  const activePackages=[...(spec.activeHardWorkPackages??[])];
  const shifts=emptyShifts();
  const hardWorkCompletionDays:Partial<Record<OrdinaryHardWorkCareer,number>>={};
  const careerUnlockDays:Partial<Record<OrdinaryHardWorkCareer,number>>={};
  const lodgingNights={normal:0,cheap:0,street:0};
  const trajectory:Partial<Record<number,number>>={};

  let money=source.startingMoney;
  let grossWorkIncome=0;
  let lodgingSpend=0;
  let schoolOpportunities=0;
  let schoolAffordable=0;
  let schoolCompleted=0;
  let schoolTuition=0;
  let forcedStreetNights=0;
  let forcedStreetStreak=0;
  let maxForcedStreetStreak=0;
  let energyLostToStreet=0;
  let nextStreetEnergyDelta=0;
  let nextWorkRhythmEnergy=0;
  let workRhythmArmed=0;
  let workRhythmEnergyGranted=0;
  let workRhythmEnergyUsed=0;
  let reserveMatchPaid=0;
  let retainerPaid=0;

  const recordUnlocks=(day:number)=>{
    for(const career of ordinaryHardWorkCareers){
      if(careerUnlockDays[career]!==undefined)continue;
      if(careerAvailable(source,career,state,day,earned))careerUnlockDays[career]=day;
    }
  };
  recordUnlocks(1);

  for(let day=1;day<=160;day++){
    if(overlay==='retainer'&&day<=D32_KEYSTONE_PARAMETERS.retainerWindowDays){
      money+=D32_KEYSTONE_PARAMETERS.retainerDailyPayment;
      retainerPaid+=D32_KEYSTONE_PARAMETERS.retainerDailyPayment;
    }

    const energyWithoutKeystone=Math.max(1,source.baseDailyEnergy+nextStreetEnergyDelta);
    let energy=Math.max(1,source.baseDailyEnergy+nextStreetEnergyDelta+nextWorkRhythmEnergy);
    if(nextStreetEnergyDelta<0)energyLostToStreet+=-nextStreetEnergyDelta;
    if(nextWorkRhythmEnergy>0)workRhythmEnergyGranted+=nextWorkRhythmEnergy;
    nextStreetEnergyDelta=0;
    nextWorkRhythmEnergy=0;

    let dayHadOrdinaryWork=false;
    let actionsUsed=0;
    const usedCareers=new Set<OrdinaryHardWorkCareer>();

    const doWork=(career:OrdinaryHardWorkCareer):boolean=>{
      if(energy<1||usedCareers.has(career))return false;
      if(!careerAvailable(source,career,state,day,earned))return false;

      const season=seasonForHumanDay(day);
      for(const effect of effectiveSeasonalStatEffects(source,career,season,negativeMap)){
        applyStatDelta(state,effect.stat,effect.delta);
      }

      const wage=wageFor(source,career,state);
      money+=wage;
      grossWorkIncome+=wage;

      if(overlay==='reserve-match'&&reserveMatchPaid<D32_KEYSTONE_PARAMETERS.reserveMatchCap){
        const match=Math.min(wage,D32_KEYSTONE_PARAMETERS.reserveMatchCap-reserveMatchPaid);
        money+=match;
        reserveMatchPaid+=match;
      }

      shifts[career]++;
      if(shifts[career]===50)hardWorkCompletionDays[career]=day;
      energy--;
      actionsUsed++;
      usedCareers.add(career);
      dayHadOrdinaryWork=true;
      recordUnlocks(day);
      return true;
    };

    if(spec.school&&day%spec.school.everyDays===0){
      schoolOpportunities++;
      const course=SCHOOL_COURSES.find(candidate=>candidate.id===spec.school!.courseId);
      if(!course)throw new Error('Unknown School course in strategy: '+spec.school.courseId);
      if(money>=course.tuition)schoolAffordable++;
      if(money>=course.tuition&&energy>=course.energyCost){
        money-=course.tuition;
        schoolTuition+=course.tuition;
        energy-=course.energyCost;
        actionsUsed++;
        for(const effect of course.statEffects)applyStatDelta(state,effect.stat,effect.amount);
        schoolCompleted++;
        recordUnlocks(day);
      }
    }

    while(energy>0){
      const career=chooseWorkCandidate({
        source,spec,state,day,earned,usedToday:usedCareers,shifts
      });
      if(!career||!doWork(career))break;
    }

    if(
      overlay==='work-rhythm'&&
      dayHadOrdinaryWork&&
      workRhythmArmed<D32_KEYSTONE_PARAMETERS.workRhythmRewardedDays&&
      day<160
    ){
      nextWorkRhythmEnergy=1;
      workRhythmArmed++;
    }
    if(overlay==='work-rhythm'){
      workRhythmEnergyUsed+=Math.max(0,Math.min(
        workRhythmEnergyGranted,
        actionsUsed-energyWithoutKeystone
      ));
    }

    if(day<160){
      const tier=chooseLodgingTier(source,spec.lodgingPreference,money);
      const lodging=lodgingFor(source,tier);
      money-=lodging.moneyCost;
      lodgingSpend+=lodging.moneyCost;
      lodgingNights[tier]++;

      if(tier==='street'){
        nextStreetEnergyDelta=lodging.nextDayEnergyDelta;
        for(const effect of lodging.nextDayEffects)applyStatDelta(state,effect.stat,effect.delta);
        if(spec.lodgingPreference!=='street'){
          forcedStreetNights++;
          forcedStreetStreak++;
          maxForcedStreetStreak=Math.max(maxForcedStreetStreak,forcedStreetStreak);
        }else{
          forcedStreetStreak=0;
        }
      }else{
        forcedStreetStreak=0;
      }
    }

    if((snapshotDays as readonly number[]).includes(day))trajectory[day]=money;
  }

  const dominated=normalDominatedByCheap(source);
  const normal=lodgingFor(source,'normal');
  const cheap=lodgingFor(source,'cheap');

  return {
    id:spec.id,
    label:spec.label,
    overlay,
    negativeMap,
    startingAllocation:{...spec.allocation},
    earnedHardWork:[...(spec.earnedHardWork??[])],
    activeHardWorkPackages:activePackages,
    moneyTrajectory:{
      day10:trajectoryValue(trajectory,10),
      day20:trajectoryValue(trajectory,20),
      day40:trajectoryValue(trajectory,40),
      day50:trajectoryValue(trajectory,50),
      day80:trajectoryValue(trajectory,80),
      day120:trajectoryValue(trajectory,120),
      day160:trajectoryValue(trajectory,160)
    },
    finalMoney:money,
    grossWorkIncome,
    lodgingSpend,
    lodgingNights,
    forcedStreetNights,
    maxForcedStreetStreak,
    energyLostToStreet,
    mechanicallyRationalNormalNights:dominated?0:lodgingNights.normal,
    normalPremiumSpentVsCheap:lodgingNights.normal*Math.max(0,normal.moneyCost-cheap.moneyCost),
    school:{
      opportunities:schoolOpportunities,
      moneyAffordable:schoolAffordable,
      completed:schoolCompleted,
      tuitionPaid:schoolTuition,
      courseId:spec.school?.courseId??null
    },
    hardWorkCompletionDays,
    careerUnlockDays,
    shifts,
    literalDebtCreated:false,
    affordabilitySpiral:maxForcedStreetStreak>=7,
    keystone:{
      reserveMatchPaid,
      workRhythmEnergyGranted,
      workRhythmEnergyUsed,
      retainerPaid
    }
  };
}

function d31Impact(current:ScenarioResult,shipped:ScenarioResult):D31Impact{
  return {
    grossWorkIncomeDelta:current.grossWorkIncome-shipped.grossWorkIncome,
    finalMoneyDelta:current.finalMoney-shipped.finalMoney,
    streetNightDelta:current.lodgingNights.street-shipped.lodgingNights.street
  };
}

function d31TargetCount(source:LiveEconomySource):number{
  let count=0;
  for(const career of ordinaryHardWorkCareers){
    const action=actionFor(source,career);
    for(const season of seasons){
      const negatives=(action.seasonal?.[season]??[]).filter(
        effect=>effect.kind==='modifyStat'&&effect.delta<0
      );
      if(negatives.length>1)throw new Error('Multiple live negatives in one ordinary season: '+career+'/'+season);
      if(negatives.length){
        if(!D31_NEGATIVE_TARGETS[career][season]){
          throw new Error('D31 lacks a target for live negative season: '+career+'/'+season);
        }
        count++;
      }
    }
  }
  return count;
}

export function runLiveEconomyAffordabilityHarness(
  source=loadLiveEconomySource()
):LiveEconomyAffordabilityResult{
  const normal=lodgingFor(source,'normal');
  const cheap=lodgingFor(source,'cheap');
  const street=lodgingFor(source,'street');
  const streetGrooming=street.nextDayEffects.find(effect=>effect.stat==='grooming')?.delta??0;

  const primary:PrimaryScenarioResult[]=LIVE_ECONOMY_STRATEGIES.map(spec=>{
    const d31=simulateEconomyStrategy(source,spec,{negativeMap:'d31'});
    const shipped=simulateEconomyStrategy(source,spec,{negativeMap:'live-shipped'});
    return {...d31,d31VsLiveShipped:d31Impact(d31,shipped)};
  });

  const mixed=LIVE_ECONOMY_STRATEGIES.find(spec=>spec.id==='mixed-newstart');
  if(!mixed)throw new Error('Mixed New Start+ strategy missing.');

  const d32Comparisons:ScenarioResult[]=[
    simulateEconomyStrategy(source,mixed,{overlay:'reserve-match',negativeMap:'d31'}),
    simulateEconomyStrategy(source,mixed,{overlay:'work-rhythm',negativeMap:'d31'}),
    simulateEconomyStrategy(source,mixed,{overlay:'retainer',negativeMap:'d31'})
  ];

  const survival=primary.find(row=>row.id==='survival-first')!;
  const school=primary.find(row=>row.id==='school-investment')!;
  const oneCareer=primary.find(row=>row.id==='one-career-hard-work')!;
  const dominated=normalDominatedByCheap(source);

  return {
    schemaVersion:1,
    researchNotice:LIVE_ECONOMY_RESEARCH_NOTICE,
    source:{
      startingMoney:source.startingMoney,
      baseDailyEnergy:source.baseDailyEnergy,
      lodging:{
        normal:normal.moneyCost,
        cheap:cheap.moneyCost,
        street:street.moneyCost,
        streetNextDayEnergyDelta:street.nextDayEnergyDelta,
        streetGroomingDelta:streetGrooming,
        paidNightsPerFullRun:159,
        normalMechanicallyDominatedByCheap:dominated
      },
      school:SCHOOL_COURSES.map(course=>({
        id:course.id,
        tuition:course.tuition,
        energyCost:course.energyCost,
        statPointTotal:course.statEffects.reduce((sum,effect)=>sum+effect.amount,0)
      })),
      d26SameCareerShiftLimitPerDay:1,
      d31TargetCount:d31TargetCount(source),
      hardWorkThreshold:50
    },
    assumptions:{
      humanDays:160,
      finalDayHasNoNewLodgingPayment:true,
      nonAutomaticItemMonetizationExcluded:true,
      secretDebtBoundStateExcludedFromOrdinaryBaseline:true,
      affordabilitySpiralDefinition:'seven or more consecutive forced street nights caused by inability to afford the strategy paid-lodging preference',
      mixedNewStartProfile:'earned+active packages: lumber, undead-farm, hunter, merchant, assassin; inherited career access follows earned Hard Work'
    },
    primary,
    d32Comparisons,
    assessment:{
      viableWithoutChronicStreetOrKeystone:
        survival.lodgingNights.street===0&&
        survival.finalMoney>=0&&
        !survival.affordabilitySpiral,
      normalLodgingMechanicallyRationalUnderCurrentSemantics:!dominated,
      schoolInvestmentCanCompleteAllScheduledLessonsWithoutStreet:
        school.school.completed===school.school.opportunities&&school.lodgingNights.street===0,
      oneCareerFocusNeedsAnyForcedStreet:oneCareer.forcedStreetNights>0
    }
  };
}

function moneyPath(row:ScenarioResult):string{
  const m=row.moneyTrajectory;
  return [m.day10,m.day20,m.day40,m.day50,m.day80,m.day120,m.day160].join('/');
}

function hardWorkCell(row:ScenarioResult):string{
  const entries=Object.entries(row.hardWorkCompletionDays);
  if(!entries.length)return 'none';
  return entries.map(([career,day])=>career+'@'+day).join(',');
}

export function formatLiveEconomyAffordabilitySummary(
  result:LiveEconomyAffordabilityResult
):string{
  const lines=[
    'Live Economy Affordability Harness v7',
    result.researchNotice,
    'source: money='+result.source.startingMoney+
      '; Energy='+result.source.baseDailyEnergy+
      '; lodging='+result.source.lodging.normal+'/'+result.source.lodging.cheap+'/'+result.source.lodging.street+
      '; paid nights='+result.source.lodging.paidNightsPerFullRun+
      '; D26 same-career/day=1; D31 cells='+result.source.d31TargetCount,
    '',
    'money path columns = Day10/20/40/50/80/120/160',
    'strategy | money path | nights N/C/S | school done | street Energy lost | Hard Work | forced street | D31 wage delta',
    '---|---|---|---:|---:|---|---:|---:'
  ];

  for(const row of result.primary){
    lines.push([
      row.id,
      moneyPath(row),
      row.lodgingNights.normal+'/'+row.lodgingNights.cheap+'/'+row.lodgingNights.street,
      row.school.completed,
      row.energyLostToStreet,
      hardWorkCell(row),
      row.forcedStreetNights,
      row.d31VsLiveShipped.grossWorkIncomeDelta
    ].join(' | '));
  }

  lines.push(
    '',
    'D32 research overlays on mixed-newstart:',
    'overlay | final money | reserve | rhythm granted/used | retainer | Hard Work',
    '---|---:|---:|---:|---:|---'
  );
  for(const row of result.d32Comparisons){
    lines.push([
      row.overlay,
      row.finalMoney,
      row.keystone.reserveMatchPaid,
      row.keystone.workRhythmEnergyGranted+'/'+row.keystone.workRhythmEnergyUsed,
      row.keystone.retainerPaid,
      hardWorkCell(row)
    ].join(' | '));
  }

  lines.push(
    '',
    'Assessment:',
    '- viable without chronic street/Keystone: '+result.assessment.viableWithoutChronicStreetOrKeystone,
    '- normal mechanically rational under current semantics: '+result.assessment.normalLodgingMechanicallyRationalUnderCurrentSemantics,
    '- scheduled School investment completed without street: '+result.assessment.schoolInvestmentCanCompleteAllScheduledLessonsWithoutStreet,
    '- one-career focus needs any forced street: '+result.assessment.oneCareerFocusNeedsAnyForcedStreet
  );
  return lines.join('\n');
}

function parseFormat(argv:string[]):'summary'|'json'|'both'{
  const raw=argv.find(arg=>arg.startsWith('--format='))?.slice('--format='.length)??'summary';
  if(raw!=='summary'&&raw!=='json'&&raw!=='both')throw new Error('Unknown format: '+raw);
  return raw;
}

if(process.argv[1]?.endsWith('live-economy-affordability-harness.ts')){
  const format=parseFormat(process.argv.slice(2));
  const result=runLiveEconomyAffordabilityHarness();
  if(format==='summary'||format==='both'){
    process.stdout.write(formatLiveEconomyAffordabilitySummary(result)+'\n');
  }
  if(format==='both')process.stdout.write('\n--- JSON ---\n');
  if(format==='json'||format==='both'){
    process.stdout.write(JSON.stringify(result,null,2)+'\n');
  }
}
