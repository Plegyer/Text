import {readFileSync,readdirSync} from 'node:fs';
import {resolve} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {
  definitionsSchema,
  ordinaryHardWorkCareers,
  packSchema,
  seasons,
  stats,
  type Action,
  type Definitions,
  type OrdinaryHardWorkCareer,
  type Pack,
  type Stat,
  type StoryEvent
} from '../src/core/schema.ts';
import {freshSave} from '../src/core/engine.ts';
import {SCHOOL_COURSES,type SchoolCourseId} from '../src/core/school.ts';

export const PROGRESSION_BALANCE_RESEARCH_NOTICE =
  'RESEARCH ONLY: alternative policies and maps are analysis inputs, not production authority.';

export type ShiftPolicy = 'one'|'two'|'current-energy';
export type AnalysisCap = 100|200;
export type Season = typeof seasons[number];

export type StartingAllocationVariant =
  | {id:string;mode:'base'}
  | {id:string;mode:'focus-strongest'}
  | {id:string;mode:'explicit';points:Partial<Record<Stat,number>>};

export interface ResearchNegativeTargetOverride {
  label:string;
  targets:Partial<Record<OrdinaryHardWorkCareer,Partial<Record<Season,Stat>>>>;
}

export interface SchoolCadenceInput {
  everyDays:number|null;
  course:'best-overlap'|SchoolCourseId;
}

export interface ProgressionBalanceInput {
  shiftPolicy:ShiftPolicy;
  startingAllocations:StartingAllocationVariant[];
  alternateNegativeTargets?:ResearchNegativeTargetOverride;
  school:SchoolCadenceInput;
  cap:AnalysisCap;
  days?:number;
}

export interface ProgressionLiveSource {
  definitions:Definitions;
  packs:Pack[];
  events:StoryEvent[];
  baseDailyEnergy:number;
}

export interface MovementSummary {
  attemptedPositive:number;
  realizedPositive:number;
  blockedByCap:number;
  attemptedNegative:number;
  realizedNegative:number;
  blockedByFloor:number;
  netRealized:number;
}

export interface MilestoneDensity {
  early:{from:1;to:10;eventCount:number;thresholds:number[]};
  mid:{from:11;to:30;eventCount:number;thresholds:number[]};
  late:{from:31;to:49;eventCount:number;thresholds:number[]};
  shiftReactiveEvents:number;
  thresholdEventIds:string[];
}

export interface SimulationSummary {
  days:number;
  totalShifts:number;
  dayTo50:number|null;
  strongestStat:Stat;
  dayTo100:number|null;
  dayToCap:number|null;
  finalStrongestStat:number;
  finalStats:Record<Stat,number>;
  workMovement:MovementSummary;
  schoolMovement:MovementSummary;
  grossWorkMoney:number;
  grossWorkMoneyBy50:number|null;
  schoolLessons:number;
  schoolTuition:number;
  grossMoneyMinusTuition:number;
  schoolCourseId:SchoolCourseId|null;
  schoolOverlapGain:number;
}

export interface CareerVariantResult {
  career:OrdinaryHardWorkCareer;
  allocationId:string;
  allocation:Record<Stat,number>;
  milestoneDensity:MilestoneDensity;
  workOnly:SimulationSummary;
  withSchool:SimulationSummary;
}

export interface ProgressionBalanceResult {
  schemaVersion:1;
  researchNotice:typeof PROGRESSION_BALANCE_RESEARCH_NOTICE;
  liveSource:{
    ordinaryCareers:readonly OrdinaryHardWorkCareer[];
    baseDailyEnergy:number;
    liveNegativeTargetCount:number;
    livePackCount:number;
    liveEventCount:number;
  };
  policy:{
    shiftPolicy:ShiftPolicy;
    sameCareerShiftLimitPerDay:number;
    cap:AnalysisCap;
    days:number;
    negativeMap:'LIVE_CURRENT'|string;
    negativeMapAuthority:'LIVE'|'RESEARCH';
    school:SchoolCadenceInput;
    availabilityAssumption:'TARGET_CAREER_AVAILABLE_FROM_DAY_1_FOR_COMPARISON';
    economyScope:'GROSS_WORK_INCOME_MINUS_SCHOOL_TUITION_ONLY_NO_LODGING';
  };
  careers:CareerVariantResult[];
}

interface MutableMovement {
  attemptedPositive:number;
  realizedPositive:number;
  blockedByCap:number;
  attemptedNegative:number;
  realizedNegative:number;
  blockedByFloor:number;
}

const defaultAllocations:StartingAllocationVariant[]=[
  {id:'base',mode:'base'},
  {id:'focus-strongest',mode:'focus-strongest'}
];

function blankMovement():MutableMovement {
  return {
    attemptedPositive:0,
    realizedPositive:0,
    blockedByCap:0,
    attemptedNegative:0,
    realizedNegative:0,
    blockedByFloor:0
  };
}

function freezeMovement(value:MutableMovement):MovementSummary {
  return {
    ...value,
    netRealized:value.realizedPositive-value.realizedNegative
  };
}

export function loadLiveProgressionSource():ProgressionLiveSource {
  const scriptDir=resolve(fileURLToPath(new URL('.',import.meta.url)));
  const root=resolve(scriptDir,'..');
  const definitionsPath=resolve(root,'content','definitions.json');
  const packsRoot=resolve(root,'content','packs');

  const definitions=definitionsSchema.parse(JSON.parse(readFileSync(definitionsPath,'utf8')));
  const packFiles=readdirSync(packsRoot).filter(name=>name.endsWith('.json')).sort();
  const packs=packFiles.map(name=>
    packSchema.parse(JSON.parse(readFileSync(resolve(packsRoot,name),'utf8')))
  );
  const events=packs.flatMap(pack=>pack.events);
  const baseDailyEnergy=freshSave().run.dayState.energyCurrent;

  return {definitions,packs,events,baseDailyEnergy};
}

function ordinaryAction(definitions:Definitions,career:OrdinaryHardWorkCareer):Action {
  const action=definitions.actions.find(candidate=>candidate.id===`${career}.shift`);
  if(!action)throw new Error(`Missing live ordinary action: ${career}.shift`);
  if(!action.seasonal)throw new Error(`Ordinary action has no seasonal package: ${career}.shift`);
  if(!action.wage)throw new Error(`Ordinary action has no live wage: ${career}.shift`);
  return action;
}

function seasonForDay(day:number):Season {
  const dayInYear=(day-1)%40;
  return seasons[Math.floor(dayInYear/10)]!;
}

function cloneStatRecord():Record<Stat,number> {
  return Object.fromEntries(stats.map(stat=>[stat,1])) as Record<Stat,number>;
}

function positiveCycleScore(action:Action):Record<Stat,number> {
  const score=Object.fromEntries(stats.map(stat=>[stat,0])) as Record<Stat,number>;
  for(const season of seasons){
    for(const effect of action.seasonal?.[season]??[]){
      if(effect.kind==='modifyStat'&&effect.delta>0)score[effect.stat]+=effect.delta;
    }
  }
  for(const effect of action.effects){
    if(effect.kind==='modifyStat'&&effect.delta>0)score[effect.stat]+=effect.delta*4;
  }
  return score;
}

export function strongestWorkStat(action:Action):Stat {
  const score=positiveCycleScore(action);
  return [...stats].sort((a,b)=>score[b]-score[a]||stats.indexOf(a)-stats.indexOf(b))[0]!;
}

function allocationFor(
  variant:StartingAllocationVariant,
  strongest:Stat
):Record<Stat,number> {
  const record=cloneStatRecord();
  if(variant.mode==='base')return record;
  if(variant.mode==='focus-strongest'){
    record[strongest]+=10;
    return record;
  }

  let total=0;
  for(const [key,raw] of Object.entries(variant.points)){
    if(!stats.includes(key as Stat))throw new Error(`Unknown explicit allocation stat: ${key}`);
    const amount=raw??0;
    if(!Number.isInteger(amount)||amount<0)throw new Error(`Invalid allocation for ${key}`);
    total+=amount;
    record[key as Stat]+=amount;
  }
  if(total>10)throw new Error(`Starting allocation ${variant.id} exceeds 10 points: ${total}`);
  return record;
}

function currentNegativeTargetCount(source:ProgressionLiveSource):number {
  let count=0;
  for(const career of ordinaryHardWorkCareers){
    const action=ordinaryAction(source.definitions,career);
    for(const season of seasons){
      count+=(action.seasonal?.[season]??[]).filter(
        effect=>effect.kind==='modifyStat'&&effect.delta<0
      ).length;
    }
  }
  return count;
}

function validateResearchNegativeTargets(
  source:ProgressionLiveSource,
  override:ResearchNegativeTargetOverride|undefined
){
  if(!override)return;
  if(!override.label.trim())throw new Error('Research negative-target map requires a label.');
  for(const [careerKey,seasonMap] of Object.entries(override.targets)){
    if(!ordinaryHardWorkCareers.includes(careerKey as OrdinaryHardWorkCareer)){
      throw new Error(`Research negative map contains non-ordinary career: ${careerKey}`);
    }
    const career=careerKey as OrdinaryHardWorkCareer;
    const action=ordinaryAction(source.definitions,career);
    for(const [seasonKey,target] of Object.entries(seasonMap??{})){
      if(!seasons.includes(seasonKey as Season))throw new Error(`Unknown season: ${seasonKey}`);
      if(!target||!stats.includes(target as Stat))throw new Error(`Unknown negative target: ${target}`);
      const season=seasonKey as Season;
      const liveNegatives=(action.seasonal?.[season]??[]).filter(
        effect=>effect.kind==='modifyStat'&&effect.delta<0
      );
      if(liveNegatives.length!==1){
        throw new Error(
          `RESEARCH remap only supports a live season with exactly one negative effect: ${career}/${season} has ${liveNegatives.length}`
        );
      }
    }
  }
}

function effectiveStatEffects(
  action:Action,
  career:OrdinaryHardWorkCareer,
  season:Season,
  override:ResearchNegativeTargetOverride|undefined
):Array<{stat:Stat;delta:number}> {
  const out:Array<{stat:Stat;delta:number}>=[];
  for(const effect of action.effects){
    if(effect.kind==='modifyStat')out.push({stat:effect.stat,delta:effect.delta});
  }
  for(const effect of action.seasonal?.[season]??[]){
    if(effect.kind!=='modifyStat')continue;
    const researchTarget=effect.delta<0
      ? override?.targets[career]?.[season]
      : undefined;
    out.push({stat:researchTarget??effect.stat,delta:effect.delta});
  }
  return out;
}

function applyStatDelta(
  state:Record<Stat,number>,
  stat:Stat,
  delta:number,
  cap:AnalysisCap,
  movement:MutableMovement
){
  const before=state[stat];
  const after=Math.max(0,Math.min(cap,before+delta));
  state[stat]=after;
  if(delta>0){
    const realized=Math.max(0,after-before);
    movement.attemptedPositive+=delta;
    movement.realizedPositive+=realized;
    movement.blockedByCap+=delta-realized;
  }else if(delta<0){
    const magnitude=-delta;
    const realized=Math.max(0,before-after);
    movement.attemptedNegative+=magnitude;
    movement.realizedNegative+=realized;
    movement.blockedByFloor+=magnitude-realized;
  }
}

function wageFor(action:Action,state:Record<Stat,number>):number {
  if(!action.wage)return 0;
  const weighted=action.wage.weights.reduce((sum,weight)=>{
    if(!stats.includes(weight.stat as Stat)){
      throw new Error(`Progression harness cannot price non-progression wage input ${weight.stat} for ${action.id}`);
    }
    return sum+state[weight.stat as Stat]*weight.factor;
  },0);
  return Math.round(action.wage.base+weighted);
}

function sameCareerShiftLimit(policy:ShiftPolicy,baseDailyEnergy:number):number {
  if(policy==='one')return 1;
  if(policy==='two')return Math.min(2,baseDailyEnergy);
  return baseDailyEnergy;
}

function courseForStrongest(
  strongest:Stat,
  requested:'best-overlap'|SchoolCourseId
){
  if(requested!=='best-overlap'){
    const course=SCHOOL_COURSES.find(candidate=>candidate.id===requested);
    if(!course)throw new Error(`Unknown School course: ${requested}`);
    return course;
  }
  const ranked=SCHOOL_COURSES.map(course=>({
    course,
    overlap:course.statEffects.find(effect=>effect.stat===strongest)?.amount??0
  })).sort((a,b)=>
    b.overlap-a.overlap||
    a.course.tuition-b.course.tuition||
    a.course.id.localeCompare(b.course.id)
  );
  return ranked[0]!.course;
}

function recordThresholds(condition:unknown,career:OrdinaryHardWorkCareer,out:number[]){
  if(!condition||typeof condition!=='object')return;
  const value=condition as Record<string,unknown>;
  if(
    value.kind==='careerCounter'&&
    value.career===career&&
    value.counter==='completed_shifts'&&
    value.op==='gte'&&
    typeof value.value==='number'&&
    value.value>0&&value.value<50
  )out.push(value.value);
  if(
    value.kind==='careerShifts'&&
    value.career===career&&
    value.op==='gte'&&
    typeof value.value==='number'&&
    value.value>0&&value.value<50
  )out.push(value.value);
  for(const nested of Object.values(value)){
    if(Array.isArray(nested))nested.forEach(item=>recordThresholds(item,career,out));
    else if(nested&&typeof nested==='object')recordThresholds(nested,career,out);
  }
}

export function milestoneDensityFor(
  events:StoryEvent[],
  career:OrdinaryHardWorkCareer
):MilestoneDensity {
  const thresholdEvents=new Map<string,number[]>();
  let shiftReactiveEvents=0;

  for(const event of events){
    const thresholds:number[]=[];
    event.conditions.forEach(condition=>recordThresholds(condition,career,thresholds));
    if(thresholds.length)thresholdEvents.set(event.id,[...new Set(thresholds)].sort((a,b)=>a-b));
    if(event.reactionTriggers.some(
      trigger=>trigger.kind==='actionCompleted'&&trigger.action===`${career}.shift`
    ))shiftReactiveEvents++;
  }

  const band=(from:number,to:number)=>{
    const ids=[...thresholdEvents.entries()]
      .filter(([,values])=>values.some(value=>value>=from&&value<=to))
      .map(([id])=>id);
    const thresholds=[...new Set(
      [...thresholdEvents.values()].flat().filter(value=>value>=from&&value<=to)
    )].sort((a,b)=>a-b);
    return {eventCount:ids.length,thresholds};
  };

  const early=band(1,10);
  const mid=band(11,30);
  const late=band(31,49);
  return {
    early:{from:1,to:10,...early},
    mid:{from:11,to:30,...mid},
    late:{from:31,to:49,...late},
    shiftReactiveEvents,
    thresholdEventIds:[...thresholdEvents.keys()].sort()
  };
}

function simulate(
  source:ProgressionLiveSource,
  career:OrdinaryHardWorkCareer,
  variant:StartingAllocationVariant,
  input:ProgressionBalanceInput,
  withSchool:boolean
):{allocation:Record<Stat,number>;summary:SimulationSummary} {
  const action=ordinaryAction(source.definitions,career);
  const strongest=strongestWorkStat(action);
  const state=allocationFor(variant,strongest);
  const allocation={...state};
  const workMovement=blankMovement();
  const schoolMovement=blankMovement();
  const days=input.days??160;
  const perDayLimit=sameCareerShiftLimit(input.shiftPolicy,source.baseDailyEnergy);
  const course=withSchool&&input.school.everyDays
    ? courseForStrongest(strongest,input.school.course)
    : null;
  const overlap=course?.statEffects.find(effect=>effect.stat===strongest)?.amount??0;

  let shifts=0;
  let dayTo50:number|null=null;
  let dayTo100:number|null=state[strongest]>=100?0:null;
  let dayToCap:number|null=state[strongest]>=input.cap?0:null;
  let grossWorkMoney=0;
  let grossWorkMoneyBy50:number|null=null;
  let schoolLessons=0;
  let schoolTuition=0;

  const checkThresholds=(day:number)=>{
    if(dayTo100===null&&state[strongest]>=100)dayTo100=day;
    if(dayToCap===null&&state[strongest]>=input.cap)dayToCap=day;
  };

  for(let day=1;day<=days;day++){
    let energy=source.baseDailyEnergy;
    const schoolToday=Boolean(
      course&&
      input.school.everyDays&&
      input.school.everyDays>0&&
      day%input.school.everyDays===0&&
      energy>=course.energyCost
    );

    if(schoolToday&&course){
      energy-=course.energyCost;
      schoolLessons++;
      schoolTuition+=course.tuition;
      for(const effect of course.statEffects){
        applyStatDelta(state,effect.stat,effect.amount,input.cap,schoolMovement);
      }
      checkThresholds(day);
    }

    const shiftsToday=Math.min(perDayLimit,energy);
    const season=seasonForDay(day);
    for(let i=0;i<shiftsToday;i++){
      for(const effect of effectiveStatEffects(
        action,career,season,input.alternateNegativeTargets
      )){
        applyStatDelta(state,effect.stat,effect.delta,input.cap,workMovement);
      }

      const wage=wageFor(action,state);
      grossWorkMoney+=wage;
      shifts++;
      checkThresholds(day);

      if(shifts===50){
        dayTo50=day;
        grossWorkMoneyBy50=grossWorkMoney;
      }
    }
  }

  return {
    allocation,
    summary:{
      days,
      totalShifts:shifts,
      dayTo50,
      strongestStat:strongest,
      dayTo100,
      dayToCap,
      finalStrongestStat:state[strongest],
      finalStats:{...state},
      workMovement:freezeMovement(workMovement),
      schoolMovement:freezeMovement(schoolMovement),
      grossWorkMoney,
      grossWorkMoneyBy50,
      schoolLessons,
      schoolTuition,
      grossMoneyMinusTuition:grossWorkMoney-schoolTuition,
      schoolCourseId:course?.id??null,
      schoolOverlapGain:overlap
    }
  };
}

export function runProgressionBalanceHarness(
  partial?:Partial<ProgressionBalanceInput>,
  source=loadLiveProgressionSource()
):ProgressionBalanceResult {
  const input:ProgressionBalanceInput={
    shiftPolicy:partial?.shiftPolicy??'current-energy',
    startingAllocations:partial?.startingAllocations??defaultAllocations,
    alternateNegativeTargets:partial?.alternateNegativeTargets,
    school:partial?.school??{everyDays:10,course:'best-overlap'},
    cap:partial?.cap??100,
    days:partial?.days??160
  };

  if(!['one','two','current-energy'].includes(input.shiftPolicy)){
    throw new Error(`Unknown shift policy: ${input.shiftPolicy}`);
  }
  if(input.cap!==100&&input.cap!==200)throw new Error('Analysis cap must be 100 or 200.');
  if(!Number.isInteger(input.days)||input.days<1||input.days>160){
    throw new Error('Analysis days must be an integer from 1 to 160.');
  }
  if(
    input.school.everyDays!==null&&
    (!Number.isInteger(input.school.everyDays)||input.school.everyDays<1||input.school.everyDays>160)
  )throw new Error('School cadence must be null or an integer from 1 to 160.');
  if(!input.startingAllocations.length)throw new Error('At least one starting allocation variant is required.');

  validateResearchNegativeTargets(source,input.alternateNegativeTargets);

  for(const career of ordinaryHardWorkCareers)ordinaryAction(source.definitions,career);

  const careers:CareerVariantResult[]=[];
  for(const career of ordinaryHardWorkCareers){
    const density=milestoneDensityFor(source.events,career);
    for(const variant of input.startingAllocations){
      const workOnly=simulate(source,career,variant,input,false);
      const withSchool=simulate(source,career,variant,input,true);
      careers.push({
        career,
        allocationId:variant.id,
        allocation:workOnly.allocation,
        milestoneDensity:density,
        workOnly:workOnly.summary,
        withSchool:withSchool.summary
      });
    }
  }

  const mapLabel=input.alternateNegativeTargets
    ? `RESEARCH:${input.alternateNegativeTargets.label}`
    : 'LIVE_CURRENT';

  return {
    schemaVersion:1,
    researchNotice:PROGRESSION_BALANCE_RESEARCH_NOTICE,
    liveSource:{
      ordinaryCareers:ordinaryHardWorkCareers,
      baseDailyEnergy:source.baseDailyEnergy,
      liveNegativeTargetCount:currentNegativeTargetCount(source),
      livePackCount:source.packs.length,
      liveEventCount:source.events.length
    },
    policy:{
      shiftPolicy:input.shiftPolicy,
      sameCareerShiftLimitPerDay:sameCareerShiftLimit(input.shiftPolicy,source.baseDailyEnergy),
      cap:input.cap,
      days:input.days,
      negativeMap:mapLabel,
      negativeMapAuthority:input.alternateNegativeTargets?'RESEARCH':'LIVE',
      school:input.school,
      availabilityAssumption:'TARGET_CAREER_AVAILABLE_FROM_DAY_1_FOR_COMPARISON',
      economyScope:'GROSS_WORK_INCOME_MINUS_SCHOOL_TUITION_ONLY_NO_LODGING'
    },
    careers
  };
}

function cell(value:number|null):string {
  return value===null?'—':String(value);
}

export function formatProgressionBalanceSummary(result:ProgressionBalanceResult):string {
  const lines=[
    'Progression Balance Harness v3',
    result.researchNotice,
    `policy=${result.policy.shiftPolicy}; same-career/day=${result.policy.sameCareerShiftLimitPerDay}; cap=${result.policy.cap}; negatives=${result.policy.negativeMap}`,
    `live: careers=${result.liveSource.ordinaryCareers.length}; negative effects=${result.liveSource.liveNegativeTargetCount}; packs=${result.liveSource.livePackCount}; events=${result.liveSource.liveEventCount}; base Energy=${result.liveSource.baseDailyEnergy}`,
    '',
    'career | allocation | day50 | strongest | day100 | +work/-work | money@50 | milestones E/M/L | school day100',
    '---|---|---:|---|---:|---:|---:|---:|---:'
  ];

  for(const row of result.careers){
    const movement=row.workOnly.workMovement;
    const density=row.milestoneDensity;
    lines.push([
      row.career,
      row.allocationId,
      cell(row.workOnly.dayTo50),
      row.workOnly.strongestStat,
      cell(row.workOnly.dayTo100),
      `+${movement.realizedPositive}/-${movement.realizedNegative}`,
      cell(row.workOnly.grossWorkMoneyBy50),
      `${density.early.eventCount}/${density.mid.eventCount}/${density.late.eventCount}`,
      cell(row.withSchool.dayTo100)
    ].join(' | '));
  }

  lines.push(
    '',
    'Notes:',
    '- day50/day100 are calendar-day outputs for an availability-normalized comparison (target career available from Day 1).',
    '- movement is realized after cap/floor clipping, not raw package arithmetic.',
    '- money is gross work income; School comparison subtracts tuition only and does not model lodging.',
    '- milestone E/M/L counts direct <50 shift-threshold event mentions in live packs; shift-reactive route events are also reported in JSON.',
    '- alternate negative maps are explicitly RESEARCH and never mutate live definitions.'
  );
  return lines.join('\n');
}

function readResearchNegativeMap(path:string):ResearchNegativeTargetOverride {
  const parsed=JSON.parse(readFileSync(resolve(process.cwd(),path),'utf8')) as ResearchNegativeTargetOverride;
  if(!parsed||typeof parsed!=='object')throw new Error('Invalid research negative-target JSON.');
  return parsed;
}

function parseCli(argv:string[]):{
  input:Partial<ProgressionBalanceInput>;
  format:'summary'|'json'|'both';
}{
  const input:Partial<ProgressionBalanceInput>={};
  let format:'summary'|'json'|'both'='summary';
  for(const arg of argv){
    if(arg.startsWith('--policy=')){
      const raw=arg.slice('--policy='.length);
      input.shiftPolicy=raw==='1'?'one':raw==='2'?'two':raw==='current'?'current-energy':raw as ShiftPolicy;
    }else if(arg.startsWith('--cap=')){
      input.cap=Number(arg.slice('--cap='.length)) as AnalysisCap;
    }else if(arg.startsWith('--school-every=')){
      const raw=Number(arg.slice('--school-every='.length));
      input.school={everyDays:raw===0?null:raw,course:input.school?.course??'best-overlap'};
    }else if(arg.startsWith('--course=')){
      const raw=arg.slice('--course='.length);
      input.school={
        everyDays:input.school?.everyDays??10,
        course:raw==='best'?'best-overlap':raw as SchoolCourseId
      };
    }else if(arg.startsWith('--alternate-negatives=')){
      input.alternateNegativeTargets=readResearchNegativeMap(arg.slice('--alternate-negatives='.length));
    }else if(arg.startsWith('--allocations=')){
      const requested=arg.slice('--allocations='.length).split(',').filter(Boolean);
      input.startingAllocations=requested.map(name=>{
        if(name==='base')return {id:'base',mode:'base'} as const;
        if(name==='focus')return {id:'focus-strongest',mode:'focus-strongest'} as const;
        throw new Error(`CLI allocation supports only base/focus; use the API for explicit maps: ${name}`);
      });
    }else if(arg.startsWith('--format=')){
      const raw=arg.slice('--format='.length);
      if(raw!=='summary'&&raw!=='json'&&raw!=='both')throw new Error(`Unknown format: ${raw}`);
      format=raw;
    }else if(arg==='--help'){
      process.stdout.write([
        'Progression Balance Harness v3',
        PROGRESSION_BALANCE_RESEARCH_NOTICE,
        '',
        'node --experimental-strip-types scripts/progression-balance-harness.ts [options]',
        '--policy=1|2|current',
        '--cap=100|200',
        '--school-every=N (0 disables School)',
        '--course=best|<live School course id>',
        '--alternate-negatives=<research JSON path>',
        '--allocations=base,focus',
        '--format=summary|json|both'
      ].join('\n')+'\n');
      process.exit(0);
    }
  }
  return {input,format};
}

const invokedPath=process.argv[1]?pathToFileURL(resolve(process.argv[1])).href:null;
if(invokedPath===import.meta.url){
  const cli=parseCli(process.argv.slice(2));
  const result=runProgressionBalanceHarness(cli.input);
  if(cli.format==='summary'||cli.format==='both'){
    process.stdout.write(formatProgressionBalanceSummary(result)+'\n');
  }
  if(cli.format==='both')process.stdout.write('\n--- JSON ---\n');
  if(cli.format==='json'||cli.format==='both'){
    process.stdout.write(JSON.stringify(result,null,2)+'\n');
  }
}
