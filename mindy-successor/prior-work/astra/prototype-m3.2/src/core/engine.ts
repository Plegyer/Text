import { metrics, stats, seasons, priorityClasses, saveSchema, type Stat, type Save, type Meta, type Condition, type Effect, type Catalog, type StoryEvent, type Action, type MachineDefinition, type ReactionFact, type ReactionTrigger, type PriorityClass, type LodgingDefinition, type NightChoiceDefinition, type ActivityDefinition, type ActivityOutcome, type ActivityEnvelope, ordinaryHardWorkCareers, type MetaReward, type OrdinaryHardWorkCareer, type ProgressionStatCap, createDefaultPalaceProgressionState } from './schema.ts';
import {SCHOOL_ACTION_ID,SCHOOL_COURSES,executeSchoolLesson,type SchoolCourseId} from './school.ts';
import {presentationIdForActionResult,presentationIdForEvent} from './presentation.ts';
import {applyHardWorkPackagesAtCreation,ordinaryCareerAvailableWithHardWork,palaceNewStartQualified,validateHardWorkPackageSelection} from './hardWorkMeta.ts';
import {hardWorkPackageDefinitions} from './hardWorkPackageCatalog.ts';
import {
  STRONG_META_IDS,
  STRONG_META_REGISTRY_VERSION,
  applyEarnedReserveMatch,
  applyNetworkRetainerAtStartDay,
  applyWorkRhythmAtStartDay,
  armWorkRhythmForNextDay,
  canonicalStrongMetaState,
  emptyResolvedStrongMetaSnapshot,
  emptyStrongMetaState,
  emptyStrongMetaRuntime,
  grantStrongMetaReward,
  resolveStrongMetaSnapshot,
  setPreferredStrongMetaKeystone,
  setPreferredStrongMetaSpecialist,
  strongMetaProgressionStatCap,
  strongMetaCurrentEnergyBonus,
  validateResolvedStrongMetaSnapshot,
  validateStrongMetaRuntimeAgainstSnapshot,
  type ApprovedStrongRewardId
} from './strongMeta.ts';
import {
  PALACE_DUTY_COUNTER,
  PALACE_STRUCTURAL_DUTY_ENERGY_COST,
  PALACE_SUPPORT_ENERGY_COST,
  assertPalaceProgressionState,
  markPalaceCreationQualification,
  markPalaceRoutePrepared,
  palaceDutyDefinition,
  palaceStructuralDutyAvailable,
  palaceStructuralWage,
  palaceSupportActionAvailable,
  palaceSupportDefinition
} from './palace.ts';
import {canonicalD41EndingId,d41PendingSpecialistRewardIds,isRetiredD41TavernEnding,migrateD41MetaData} from './advancedEndingsD41.ts';import {
  SECRET_DEBT_LENDER_EVENT_ID,
  SECRET_DEBT_HIDDEN_WORK_ACTION_ID,
  SECRET_DEBT_REPAY_ACTION_ID,
  SECRET_DEBT_TAKEOVER_ACTION_ID,
  acceptSecretDebtMutable,
  activateSecretDebtIfDueMutable,
  applySecretDebtHiddenShiftMutable,
  markSecretDebtLenderAttemptMutable,
  refuseSecretDebtMutable,
  repaySecretDebtMutable,
  resolveSecretDebtTakeoverMutable,
  secretDebtBound,
  secretDebtLenderEligible,
  totalPaidSchoolLessons,
  validateSecretDebtState
} from './secretDebt.ts';


const statSet=new Set<string>(stats);
const cappedLegacy=new Set(['health','stress','trust']);
const safeAlias:Record<string,Stat|undefined>={
  strength:'strength',
  endurance:'endurance',
  dexterity:'dexterity',
  intelligence:'reason',
  magic:'magic',
  persuasion:'charm'
};

// Schema-3 migration is deliberately conservative: only legacy flags whose
// meaning is unambiguous at the target boundary become typed public facts.
// Domain-specific prototype flags stay in legacyCompat quarantine until an
// explicit career/quest/relationship mapping exists.
const legacyFlagWorldFactMigration=[
  ['story.arrived','story.arrived'],
  ['story.home','story.home'],
  ['story.status','story.status'],
  ['story.mystery','story.mystery']
] as const;
function migrateLegacyWorldFacts(flags:Record<string,boolean>|undefined){
  const targets=legacyFlagWorldFactMigration.map(([,target])=>target);
  if(new Set(targets).size!==targets.length)throw new Error('Legacy flag migration alias collision.');
  return legacyFlagWorldFactMigration.filter(([legacy])=>flags?.[legacy]===true).map(([,target])=>target);
}

function defaultLegacyMetrics(){
  return {
    perception:1,empathy:1,composure:1,organization:1,
    health:100,stress:0,debt:0,work:0,lessons:0,alchemy:0,trust:0
  } as Record<string,number>;
}

export function palaceAvailable(meta:Meta,activePackages:readonly string[]=[]):boolean{
  return palaceNewStartQualified({earnedHardWork:meta.hardWorkProgress,activePackages});
}
export function palaceRunQualified(s:Save):boolean{
  return palaceAvailable(s.meta,s.run.character.creation.activeHardWorkPackages);
}
function grantD41PendingStrongMeta(
  input:Meta['strongMeta']|undefined,
  completedEndings:readonly string[],
  rawLegacyUnlocks:readonly string[]
){
  let state=canonicalStrongMetaState(input);
  for(const id of d41PendingSpecialistRewardIds(completedEndings,rawLegacyUnlocks)){
    state=grantStrongMetaReward(state,id as ApprovedStrongRewardId);
  }
  return state;
}

function defaultMeta(input?:Partial<Meta>&{completed?:string[];lives?:number}):Meta {
  const rawLegacyUnlocks=[...new Set(input?.unlocks??[])];
  const migratedD41=migrateD41MetaData({
    completedEndings:input?.completedEndings??input?.completed??[],
    unlocks:rawLegacyUnlocks
  });
  const completed=migratedD41.completedEndings;
  const runsStarted=Math.max(1,input?.runsStarted??input?.lives??1);
  const core={
    profileVersion:input?.profileVersion??1,
    completedEndings:completed,
    unlocks:migratedD41.unlocks.filter(unlock=>unlock!=='palace'),
    ruleModifiers:structuredClone(input?.ruleModifiers??{}),
    hardWorkProgress:[...new Set(input?.hardWorkProgress??[])],
    strongMeta:grantD41PendingStrongMeta(input?.strongMeta,completed,rawLegacyUnlocks),
    persistentChoices:structuredClone(input?.persistentChoices??{}),
    activeLegacyPerks:[...new Set(input?.activeLegacyPerks??[])],
    appliedResultTransactions:[...new Set(input?.appliedResultTransactions??[])],
    runsStarted,
    runsCompleted:Math.max(0,input?.runsCompleted??Math.min(completed.length,runsStarted-1))
  } as Meta;
  return attachMetaFacade(core);
}

function legacyHousing(value:'normal'|'cheap'|'street'):'room'|'hostel'|'shelter'{
  return value==='normal'?'room':value==='cheap'?'hostel':'shelter';
}
function targetHousing(value:'room'|'hostel'|'shelter'):'normal'|'cheap'|'street'{
  return value==='room'?'normal':value==='hostel'?'cheap':'street';
}

function ensureLegacy(s:Save){
  if(!s.run.legacyCompat)s.run.legacyCompat={source:'m3.2',metrics:defaultLegacyMetrics(),flags:{}};
  return s.run.legacyCompat;
}

export function getMetric(s:Save,key:string):number {
  if(statSet.has(key))return s.run.character.stats[key as Stat];
  const alias=safeAlias[key];if(alias)return s.run.character.stats[alias];
  if(key==='lust')return s.run.character.lust;
  if(key==='money')return s.run.resources.money;
  if(key==='energy')return s.run.dayState.energyCurrent;
  return ensureLegacy(s).metrics[key]??0;
}
export function effectiveProgressionStatCap(s:Save):ProgressionStatCap{
  return s.run.character.progressionStatCap;
}
export function setMetric(s:Save,key:string,value:number){
  if(statSet.has(key)){s.run.character.stats[key as Stat]=Math.min(effectiveProgressionStatCap(s),Math.max(0,Math.trunc(value)));return;}
  const alias=safeAlias[key];if(alias){s.run.character.stats[alias]=Math.min(effectiveProgressionStatCap(s),Math.max(0,Math.trunc(value)));return;}
  if(key==='lust'){s.run.character.lust=Math.min(100,Math.max(0,Math.trunc(value)));return;}
  if(key==='money'){s.run.resources.money=Math.min(1_000_000,Math.max(0,Math.trunc(value)));return;}
  if(key==='energy'){s.run.dayState.energyCurrent=Math.min(100,Math.max(0,Math.trunc(value)));return;}
  const max=cappedLegacy.has(key)?100:1_000_000;
  ensureLegacy(s).metrics[key]=Math.min(max,Math.max(0,Math.trunc(value)));
}

function metricProxy(s:Save):Record<string,number>{
  return new Proxy({} as Record<string,number>,{
    get:(_t,p)=>typeof p==='string'?getMetric(s,p):undefined,
    set:(_t,p,v)=>{if(typeof p==='string'){setMetric(s,p,Number(v));return true;}return false;},
    ownKeys:()=>[...metrics],
    has:(_t,p)=>typeof p==='string'&&(metrics as readonly string[]).includes(p),
    getOwnPropertyDescriptor:(_t,p)=>typeof p==='string'&&(metrics as readonly string[]).includes(p)?{enumerable:true,configurable:true,value:getMetric(s,p),writable:true}:undefined
  });
}

function defineCompat<T extends object>(target:T,key:string,getter:()=>unknown,setter?:(value:any)=>void){
  Object.defineProperty(target,key,{enumerable:false,configurable:true,get:getter,set:setter});
}

function attachMetaFacade(meta:Meta):Meta{
  if(!Object.getOwnPropertyDescriptor(meta,'completed'))defineCompat(meta,'completed',()=>meta.completedEndings,(v:string[])=>{meta.completedEndings=v;});
  if(!Object.getOwnPropertyDescriptor(meta,'lives'))defineCompat(meta,'lives',()=>meta.runsStarted,(v:number)=>{meta.runsStarted=v;});
  return meta;
}

export function attachLegacyFacade(s:Save):Save{
  ensureLegacy(s);
  const r=s.run;
  if(!Object.getOwnPropertyDescriptor(r,'day'))defineCompat(r,'day',()=>r.calendar.elapsedDays,(v:number)=>{r.calendar.elapsedDays=Math.max(0,Math.min(159,Math.trunc(v)));});
  if(!Object.getOwnPropertyDescriptor(r,'slot'))defineCompat(r,'slot',()=>r.historyState.dayActionCount,(v:number)=>{r.historyState.dayActionCount=Math.max(0,Math.trunc(v));});
  if(!Object.getOwnPropertyDescriptor(r,'limitDays'))defineCompat(r,'limitDays',()=>160);
  if(!Object.getOwnPropertyDescriptor(r,'housing'))defineCompat(r,'housing',()=>legacyHousing(r.housingState.current),(v:'room'|'hostel'|'shelter')=>{r.housingState.current=targetHousing(v);});
  if(!Object.getOwnPropertyDescriptor(r,'metrics'))defineCompat(r,'metrics',()=>metricProxy(s));
  if(!Object.getOwnPropertyDescriptor(r,'flags'))defineCompat(r,'flags',()=>ensureLegacy(s).flags,(v:Record<string,boolean>)=>{ensureLegacy(s).flags=v;});
  if(!Object.getOwnPropertyDescriptor(r,'inventory'))defineCompat(r,'inventory',()=>r.resources.inventory,(v:Record<string,number>)=>{r.resources.inventory=v;});
  if(!Object.getOwnPropertyDescriptor(r,'creation'))defineCompat(r,'creation',()=>r.character.creation,(v:typeof r.character.creation)=>{r.character.creation=v;});
  if(!Object.getOwnPropertyDescriptor(r,'rng'))defineCompat(r,'rng',()=>r.rngState.state,(v:number)=>{r.rngState.state=v>>>0;});
  if(!Object.getOwnPropertyDescriptor(r,'lastAction'))defineCompat(r,'lastAction',()=>r.flow.lastAction,(v:typeof r.flow.lastAction)=>{r.flow.lastAction=v;});
  if(!Object.getOwnPropertyDescriptor(r,'actionCounts'))defineCompat(r,'actionCounts',()=>r.historyState.actionCounts,(v:Record<string,number>)=>{r.historyState.actionCounts=v;});
  if(!Object.getOwnPropertyDescriptor(r,'history'))defineCompat(r,'history',()=>r.historyState.eventHistory,(v:typeof r.historyState.eventHistory)=>{r.historyState.eventHistory=v;});
  if(!Object.getOwnPropertyDescriptor(r,'pending'))defineCompat(r,'pending',()=>r.flow.pendingScene,(v:typeof r.flow.pendingScene)=>{r.flow.pendingScene=v;});
  if(!Object.getOwnPropertyDescriptor(r,'availableEndings'))defineCompat(r,'availableEndings',()=>r.endings.eligible,(v:string[])=>{r.endings.eligible=v;});
  if(!Object.getOwnPropertyDescriptor(r,'acceptedEnding'))defineCompat(r,'acceptedEnding',()=>r.endings.committed,(v:string|null)=>{r.endings.committed=v;});
  if(!Object.getOwnPropertyDescriptor(r,'journal'))defineCompat(r,'journal',()=>r.historyState.journal,(v:string[])=>{
    r.historyState.journal=v;
    const refs=r.historyState.journalRefs??[];
    r.historyState.journalRefs=v.map((_,index)=>refs[index]??null);
  });
  attachMetaFacade(s.meta);
  return s;
}

function cloneSave(input:Save):Save{return attachLegacyFacade(structuredClone(input) as Save);}

export function calendar(day:number){
  const d=Math.max(0,Math.min(159,Math.trunc(day)));
  const within=d%40;
  return {
    year:Math.floor(d/40)+1,
    season:seasons[Math.floor(within/10)%4],
    date:within%10+1,
    dayInYear:within+1
  };
}

type DomainKind='career'|'quest'|'relationship';
type DomainState={stage:string;counters:Record<string,number>;choices:Record<string,string>;facts:string[];shifts?:number};

function compare(value:number,op:'gte'|'lte'|'eq',expected:number){
  return op==='gte'?value>=expected:op==='lte'?value<=expected:value===expected;
}
function machineList(cat:Catalog|undefined,kind:DomainKind):MachineDefinition[]{
  if(!cat)return [];
  return (kind==='career'?cat.definitions.careers:kind==='quest'?cat.definitions.quests:cat.definitions.relationships)??[];
}
function machineDefinition(cat:Catalog|undefined,kind:DomainKind,id:string){
  return machineList(cat,kind).find(x=>x.id===id);
}
function domainMap(s:Save,kind:DomainKind):Record<string,DomainState>{
  return (kind==='career'?s.run.progression.careers:kind==='quest'?s.run.progression.quests:s.run.progression.relationships) as Record<string,DomainState>;
}
function readDomainState(s:Save,kind:DomainKind,id:string,cat?:Catalog):DomainState|undefined{
  if(kind==='career'&&id==='palace')return s.run.progression.palace;
  const existing=domainMap(s,kind)[id];if(existing)return existing;
  const def=machineDefinition(cat,kind,id);if(!def)return undefined;
  return {stage:def.initialStage,counters:{},choices:{},facts:[],...(kind==='career'?{shifts:0}:{})};
}
function ensureDomainState(s:Save,kind:DomainKind,id:string,cat:Catalog):DomainState{
  if(kind==='career'&&id==='palace'){
    if(!machineDefinition(cat,kind,id))throw new Error('Неизвестная career state machine: palace');
    return s.run.progression.palace;
  }
  const map=domainMap(s,kind),existing=map[id];if(existing)return existing;
  const def=machineDefinition(cat,kind,id);if(!def)throw new Error(`Неизвестная ${kind} state machine: ${id}`);
  const created={stage:def.initialStage,counters:{},choices:{},facts:[],...(kind==='career'?{shifts:0}:{})};
  map[id]=created;return created;
}

export function itemCapabilities(s:Save,cat?:Catalog):string[]{
  if(!cat)return [];
  const owned=new Set<string>();
  for(const item of cat.definitions.itemDefinitions){
    if((s.run.resources.inventory[item.id]??0)<=0)continue;
    for(const capability of item.capabilities)owned.add(capability);
  }
  return [...owned].sort();
}
export function hasItemCapability(s:Save,capability:string,cat?:Catalog):boolean{
  return itemCapabilities(s,cat).includes(capability);
}

export function meets(c:Condition,s:Save,cat?:Catalog):boolean {
  const cal=()=>calendar(s.run.day);
  switch(c.kind){
    case 'stat': return compare(s.run.character.stats[c.stat],c.op,c.value);
    case 'resource': return compare(s.run.resources[c.resource],c.op,c.value);
    case 'itemCount': return compare(s.run.resources.inventory[c.id]??0,c.op,c.count);
    case 'itemCapability': return hasItemCapability(s,c.capability,cat)===c.present;
    case 'calendarYear': return compare(cal().year,c.op,c.value);
    case 'calendarSeason': return cal().season===c.value;
    case 'calendarDayInYear': return compare(cal().dayInYear,c.op,c.value);
    case 'calendarElapsedDays': return compare(s.run.calendar.elapsedDays,c.op,c.value);
    case 'housingTier': return s.run.housingState.current===c.value;
    case 'schoolCounter': return compare(s.run.progression.school.tracks[c.track]?.counters[c.counter]??0,c.op,c.value);
    case 'schoolPaidLessons': return compare(totalPaidSchoolLessons(s),c.op,c.value);
    case 'lust': return compare(s.run.character.lust,c.op,c.value);
    case 'secretDebtStatus': return s.run.secretDebt.status===c.value;
    case 'secretDebtShifts': return compare(s.run.secretDebt.hiddenShifts,c.op,c.value);
    case 'secretDebtLenderEligible': return secretDebtLenderEligible(s);
    case 'careerStage': return readDomainState(s,'career',c.career,cat)?.stage===c.stage;
    case 'careerShifts': return compare(readDomainState(s,'career',c.career,cat)?.shifts??0,c.op,c.value);
    case 'careerCounter': return compare(readDomainState(s,'career',c.career,cat)?.counters[c.counter]??0,c.op,c.value);
    case 'careerFact': return (readDomainState(s,'career',c.career,cat)?.facts.includes(c.fact)??false)===c.present;
    case 'careerChoice': return readDomainState(s,'career',c.career,cat)?.choices[c.choice]===c.value;
    case 'questStage': return readDomainState(s,'quest',c.quest,cat)?.stage===c.stage;
    case 'questCounter': return compare(readDomainState(s,'quest',c.quest,cat)?.counters[c.counter]??0,c.op,c.value);
    case 'questFact': return (readDomainState(s,'quest',c.quest,cat)?.facts.includes(c.fact)??false)===c.present;
    case 'questChoice': return readDomainState(s,'quest',c.quest,cat)?.choices[c.choice]===c.value;
    case 'relationshipStage': return readDomainState(s,'relationship',c.relationship,cat)?.stage===c.stage;
    case 'relationshipCounter': return compare(readDomainState(s,'relationship',c.relationship,cat)?.counters[c.counter]??0,c.op,c.value);
    case 'relationshipFact': return (readDomainState(s,'relationship',c.relationship,cat)?.facts.includes(c.fact)??false)===c.present;
    case 'relationshipChoice': return readDomainState(s,'relationship',c.relationship,cat)?.choices[c.choice]===c.value;
    case 'worldFact': return s.run.progression.worldFacts.includes(c.fact)===c.present;
    case 'metaUnlock': return s.meta.unlocks.includes(c.unlock)===c.present;
    case 'metaEndingCompleted': return s.meta.completedEndings.includes(c.ending)===c.present;
    case 'metaHardWork': return s.meta.hardWorkProgress.includes(c.career)===c.present;

    // Legacy M3.2 leaves.
    case 'metric': return compare(getMetric(s,c.key),c.op,c.value);
    case 'visits': return (s.run.actionCounts[c.action]??0)>=c.value;
    case 'flag': return (s.run.flags[c.key]??false)===c.value;
    case 'season': return cal().season===c.value;
    case 'housing': return s.run.housing===c.value;
    case 'unlock': return s.meta.unlocks.includes(c.value);
    case 'item': return (s.run.inventory[c.id]??0)>=c.count;

    case 'all': return c.conditions.every(x=>meets(x,s,cat));
    case 'any': return c.conditions.some(x=>meets(x,s,cat));
    case 'not': return !meets(c.condition,s,cat);
  }
}
export const eligible=(conditions:Condition[],s:Save,cat?:Catalog)=>conditions.every(c=>meets(c,s,cat));

export const starterCareerIds=['lumber','satyr-maid','undead-farm'] as const satisfies readonly OrdinaryHardWorkCareer[];
const starterCareerSet=new Set<string>(starterCareerIds);
const ordinaryCareerSet=new Set<string>(ordinaryHardWorkCareers);

export function ordinaryCareerForShiftAction(action:Action):OrdinaryHardWorkCareer|null{
  if(!action.id.endsWith('.shift'))return null;
  const career=action.id.slice(0,-'.shift'.length);
  return ordinaryCareerSet.has(career)?career as OrdinaryHardWorkCareer:null;
}

export type ActionAvailabilityOptions=Readonly<{ordinaryCareersDomainLocked?:boolean}>;

function ordinaryCareerDomainForAction(action:Action):OrdinaryHardWorkCareer|null{
  const shiftCareer=ordinaryCareerForShiftAction(action);
  if(shiftCareer)return shiftCareer;
  return ordinaryCareerSet.has(action.id)?action.id as OrdinaryHardWorkCareer:null;
}

export function actionAvailable(action:Action,s:Save,cat?:Catalog,options:ActionAvailabilityOptions={}):boolean{
  const normalGateSatisfied=eligible(action.conditions,s,cat);
  if(palaceDutyDefinition(action.id))return normalGateSatisfied&&palaceStructuralDutyAvailable(s,action.id);
  if(palaceSupportDefinition(action.id))return normalGateSatisfied&&palaceSupportActionAvailable(s,action.id);
  const domainCareer=ordinaryCareerDomainForAction(action);
  const domainLocked=secretDebtBound(s)||(options.ordinaryCareersDomainLocked??false);
  if(domainCareer&&domainLocked)return false;

  const career=ordinaryCareerForShiftAction(action);
  if(!career)return normalGateSatisfied;
  return ordinaryCareerAvailableWithHardWork({
    career,
    normalGateSatisfied,
    ordinaryCareersDomainLocked:false,
    earnedHardWork:s.meta.hardWorkProgress
  });
}


function palaceActionVariant(a:Action,s:Save,cat:Catalog){
  return a.scenes?.filter(v=>eligible(v.conditions,s,cat)).sort((left,right)=>right.conditions.length-left.conditions.length)[0];
}

function executePalaceStructuralDutyMutable(s:Save,a:Action,cat:Catalog){
  const definition=palaceDutyDefinition(a.id);
  if(!definition||!palaceStructuralDutyAvailable(s,a.id))throw new Error('Эта Palace duty сейчас недоступна.');
  if(s.run.dayState.energyCurrent<PALACE_STRUCTURAL_DUTY_ENERGY_COST)throw new Error('Не хватает Energy для Palace duty.');

  const before=cloneSave(s);
  const beforeMetrics={...s.run.metrics};
  const palace=s.run.progression.palace;
  const wage=palaceStructuralWage(s);

  s.run.dayState.energyCurrent-=PALACE_STRUCTURAL_DUTY_ENERGY_COST;
  s.run.resources.money=Math.min(1_000_000,s.run.resources.money+wage);
  palace.counters[PALACE_DUTY_COUNTER]=definition.ordinal;
  palace.shifts=definition.ordinal;
  palace.lastStructuralDutyDay=s.run.calendar.elapsedDays;
  palace.committedDutyIds.push(definition.id);

  if(definition.transition)applyTransition(s,'career','palace',definition.transition,cat);

  s.run.actionCounts[a.id]=Math.min(1_000_000,(s.run.actionCounts[a.id]??0)+1);
  s.run.historyState.dayActionCount=Math.min(1000,s.run.historyState.dayActionCount+1);
  log(s,`Заработано: ${wage} монет.`);
  log(s,`${a.label}. Осталось энергии: ${s.run.dayState.energyCurrent}.`);

  const variant=palaceActionVariant(a,s,cat);
  s.run.flow.lastAction={
    id:a.id,
    title:a.label,
    text:variant?.text??a.description,
    media:variant?.media??['stage.town'],
    presentationId:presentationIdForActionResult(cat,a.id,variant?.media??['stage.town']),
    deltas:delta(beforeMetrics,s.run.metrics)
  };

  register(s,cat);
  runResolverBoundary(s,before,cat,[{kind:'actionCompleted',action:a.id}],true);
}

function executePalaceSupportMutable(s:Save,a:Action,cat:Catalog){
  const definition=palaceSupportDefinition(a.id);
  if(!definition||!palaceSupportActionAvailable(s,a.id))throw new Error('Это Palace support action сейчас недоступно.');
  if(s.run.dayState.energyCurrent<PALACE_SUPPORT_ENERGY_COST)throw new Error('Не хватает Energy для Palace support.');

  const before=cloneSave(s);
  const beforeMetrics={...s.run.metrics};
  const palace=s.run.progression.palace;

  s.run.dayState.energyCurrent-=PALACE_SUPPORT_ENERGY_COST;
  palace.lastSupportActionDay=s.run.calendar.elapsedDays;
  palace.completedSupportIds.push(definition.id);
  addUnique(palace.facts,definition.id);
  if(definition.writesPrep)markPalaceRoutePrepared(s,definition.route);

  s.run.actionCounts[a.id]=Math.min(1_000_000,(s.run.actionCounts[a.id]??0)+1);
  s.run.historyState.dayActionCount=Math.min(1000,s.run.historyState.dayActionCount+1);
  log(s,`${a.label}. Осталось энергии: ${s.run.dayState.energyCurrent}.`);

  const variant=palaceActionVariant(a,s,cat);
  s.run.flow.lastAction={
    id:a.id,
    title:a.label,
    text:variant?.text??a.description,
    media:variant?.media??['stage.town'],
    presentationId:presentationIdForActionResult(cat,a.id,variant?.media??['stage.town']),
    deltas:delta(beforeMetrics,s.run.metrics)
  };

  register(s,cat);
  runResolverBoundary(s,before,cat,[{kind:'actionCompleted',action:a.id}],true);
}


export function actionCost(a:Action,s:Save){
  if(a.id==='repay')return Math.min(a.cost.money,getMetric(s,'debt'));
  return a.id==='school'&&s.meta.unlocks.includes('scholar')&&!s.run.flags[`system.scholar.${Math.floor(s.run.day/7)}`]?0:a.cost.money;
}

export function freshSave(metaInput?:Partial<Meta>&{completed?:string[];lives?:number}):Save {
  const meta=defaultMeta(metaInput);
  const progressionStatCap:ProgressionStatCap=100;
  const statRecord=Object.fromEntries(stats.map(k=>[k,1])) as Record<Stat,number>;
  const startingMoney=600;
  const save={
    schemaVersion:6 as const,
    contentVersion:'0.1.0',
    meta,
    run:{
      id:`life-${meta.runsStarted}`,
      status:'active' as const,
      calendar:{elapsedDays:0},
      character:{
        stats:statRecord,
        lust:1,
        progressionStatCap,
        creation:{remaining:10,allocated:{},activeHardWorkPackages:[],hardWorkPackagesApplied:false,complete:false},
        conditions:{}
      },
      resources:{money:startingMoney,inventory:{herb:2,tonic:0,scales:0}},
      dayState:{energyCurrent:3,nextDayModifiers:{energyDelta:0,statEffects:[],tags:[]},optionalOfferIds:[],scheduledEventIds:[]},
      housingState:{current:'normal' as const,paidForCurrentNight:false},
      progression:{careers:{},palace:createDefaultPalaceProgressionState(),quests:{},relationships:{},school:{tracks:{}},worldFacts:[]},
      endings:{eligible:[],committed:null,result:null},
      flow:{pendingScene:null,reaction:{epochCounter:0,currentEpochId:null,attemptedEventIds:[],cascadeDepth:0,queued:[]},night:null,activity:null,lastAction:null},
      rngState:{state:(meta.runsStarted*2654435761)>>>0},
      historyState:{eventHistory:{},actionCounts:{},dayActionCount:0,journal:['Белый суслик, открытый люк и совершенно незнакомое небо. Ваша новая жизнь начинается в Листограде.'],journalRefs:[null]},
      strongMetaSnapshot:null,
      strongMetaRuntime:emptyStrongMetaRuntime(),
      secretDebt:{status:'unseen',acceptedDay:null,trapDay:null,boundDay:null,resolvedDay:null,debt:0,hiddenShifts:0,grantApplied:false,lastLenderAttemptDay:null},
      legacyCompat:{source:'m3.2' as const,metrics:defaultLegacyMetrics(),flags:{}}
    }
  } as unknown as Save;
  const s=attachLegacyFacade(save);
  // Old M3.2 unlock IDs are retained for demo compatibility, but obsolete
  // starting-stat rewards are intentionally not projected into target stats.
  s.run.dayState.energyCurrent=energyMax(s);
  return s;
}

function applyStrongMetaOrdinaryWorkMutable(s:Save,ordinaryWage:number,secretDebtBound:boolean):number{
  const match=applyEarnedReserveMatch({
    snapshot:s.run.strongMetaSnapshot,
    runtime:s.run.strongMetaRuntime,
    ordinaryWage,
    secretDebtBound
  });
  s.run.strongMetaRuntime=match.runtime;
  if(match.bonus>0)s.run.resources.money=Math.min(1_000_000,s.run.resources.money+match.bonus);
  if(!secretDebtBound){
    s.run.strongMetaRuntime=armWorkRhythmForNextDay({
      snapshot:s.run.strongMetaSnapshot,
      runtime:s.run.strongMetaRuntime,
      currentDay:s.run.day
    });
  }
  return match.bonus;
}

export function applyStrongMetaOrdinaryWork(input:Save,ordinaryWage:number,secretDebtBound:boolean):Save{
  const s=cloneSave(input);
  applyStrongMetaOrdinaryWorkMutable(s,ordinaryWage,secretDebtBound);
  return s;
}

function applyStrongMetaStartDayMutable(s:Save,secretDebtBound:boolean):Readonly<{energyBonus:number;retainerPayment:number}>{
  const rhythm=applyWorkRhythmAtStartDay({
    snapshot:s.run.strongMetaSnapshot,
    runtime:s.run.strongMetaRuntime,
    day:s.run.day
  });
  s.run.strongMetaRuntime=rhythm.runtime;
  const retainer=applyNetworkRetainerAtStartDay({
    snapshot:s.run.strongMetaSnapshot,
    runtime:s.run.strongMetaRuntime,
    day:s.run.day,
    secretDebtBound
  });
  s.run.strongMetaRuntime=retainer.runtime;
  if(retainer.payment>0)s.run.resources.money=Math.min(1_000_000,s.run.resources.money+retainer.payment);
  return {energyBonus:rhythm.energyBonus,retainerPayment:retainer.payment};
}

export function applyStrongMetaStartDay(input:Save,secretDebtBound:boolean):Readonly<{state:Save;energyBonus:number;retainerPayment:number}>{
  const s=cloneSave(input);
  const result=applyStrongMetaStartDayMutable(s,secretDebtBound);
  return {state:s,...result};
}

function delta(before:Record<string,number>,after:Record<string,number>){
  return Object.fromEntries((metrics as readonly string[]).filter(k=>(after[k]??0)!==(before[k]??0)&&k!=='stress').map(k=>[k,(after[k]??0)-(before[k]??0)]));
}
function log(s:Save,text:string,ref:Save['run']['historyState']['journalRefs'][number]=null){
  s.run.journal.push(text);s.run.historyState.journalRefs.push(ref);
  s.run.journal=s.run.journal.slice(-160);s.run.historyState.journalRefs=s.run.historyState.journalRefs.slice(-160);
}

function addUnique(target:string[],value:string){if(!target.includes(value))target.push(value);}
function removeValue(target:string[],value:string){const i=target.indexOf(value);if(i>=0)target.splice(i,1);}
function effectPhase(e:Effect){
  if(['modifyStat','modifyResource','modifyEnergy','addItem','removeItem','setHousing','metric','item','housing','flag'].includes(e.kind))return 1;
  if(['incrementSchoolCounter','incrementCareerCounter','addCareerFact','setCareerChoice','incrementQuestCounter','addQuestFact','setQuestChoice','incrementRelationshipCounter','addRelationshipFact','setRelationshipChoice','addWorldFact','removeWorldFact','secretDebtAccept','secretDebtRefuse'].includes(e.kind))return 2;
  if(['advanceCareer','advanceQuest','advanceRelationship'].includes(e.kind))return 3;
  return 4;
}
function transitionFor(cat:Catalog,kind:DomainKind,id:string,transitionId:string){
  const def=machineDefinition(cat,kind,id);if(!def)throw new Error(`Неизвестная ${kind} state machine: ${id}`);
  const t=def.transitions.find(x=>x.id===transitionId);if(!t)throw new Error(`Неизвестный transition ${kind}.${id}.${transitionId}`);
  return {def,t};
}
function applyTransition(s:Save,kind:DomainKind,id:string,transitionId:string,cat:Catalog){
  const {t}=transitionFor(cat,kind,id,transitionId);
  const state=ensureDomainState(s,kind,id,cat);
  if(!t.from.includes(state.stage))throw new Error(`Transition ${kind}.${id}.${transitionId} недоступен из stage ${state.stage}`);
  if(!eligible(t.conditions,s,cat))throw new Error(`Условия transition ${kind}.${id}.${transitionId} не выполнены`);
  state.stage=t.to;
  // Loader forbids nested Advance* effects in transitions, so this cannot recurse.
  applyEffectsMutable(s,t.effects,cat,false);
}
function applyOne(s:Save,e:Effect,cat:Catalog,allowTransitions:boolean){
  switch(e.kind){
    case 'modifyStat': setMetric(s,e.stat,getMetric(s,e.stat)+e.delta);return;
    case 'modifyResource': {
      const value=s.run.resources[e.resource]+e.delta;
      if(value<0)throw new Error('Не хватает ресурса.');
      s.run.resources[e.resource]=Math.min(1_000_000,value);return;
    }
    case 'modifyEnergy': s.run.dayState.energyCurrent=Math.max(0,Math.min(energyMax(s),s.run.dayState.energyCurrent+e.delta));return;
    case 'addItem': s.run.resources.inventory[e.id]=(s.run.resources.inventory[e.id]??0)+e.count;return;
    case 'removeItem': {
      const have=s.run.resources.inventory[e.id]??0;if(have<e.count)throw new Error('Не хватает предметов.');
      s.run.resources.inventory[e.id]=have-e.count;return;
    }
    case 'setHousing': s.run.housingState.current=e.value;return;

    case 'incrementSchoolCounter': {
      const track=s.run.progression.school.tracks[e.track]??={
        trackId:e.track,
        counters:{},
        facts:[],
        milestones:[],
        certificates:[],
        choices:{}
      };
      track.counters[e.counter]=Math.max(0,(track.counters[e.counter]??0)+e.amount);return;
    }

    case 'incrementCareerCounter': {const st=ensureDomainState(s,'career',e.career,cat);st.counters[e.counter]=Math.max(0,(st.counters[e.counter]??0)+e.amount);return;}
    case 'addCareerFact': addUnique(ensureDomainState(s,'career',e.career,cat).facts,e.fact);return;
    case 'setCareerChoice': ensureDomainState(s,'career',e.career,cat).choices[e.choice]=e.value;return;
    case 'incrementQuestCounter': {const st=ensureDomainState(s,'quest',e.quest,cat);st.counters[e.counter]=Math.max(0,(st.counters[e.counter]??0)+e.amount);return;}
    case 'addQuestFact': addUnique(ensureDomainState(s,'quest',e.quest,cat).facts,e.fact);return;
    case 'setQuestChoice': ensureDomainState(s,'quest',e.quest,cat).choices[e.choice]=e.value;return;
    case 'incrementRelationshipCounter': {const st=ensureDomainState(s,'relationship',e.relationship,cat);st.counters[e.counter]=Math.max(0,(st.counters[e.counter]??0)+e.amount);return;}
    case 'addRelationshipFact': addUnique(ensureDomainState(s,'relationship',e.relationship,cat).facts,e.fact);return;
    case 'setRelationshipChoice': ensureDomainState(s,'relationship',e.relationship,cat).choices[e.choice]=e.value;return;
    case 'addWorldFact': addUnique(s.run.progression.worldFacts,e.fact);return;
    case 'removeWorldFact': removeValue(s.run.progression.worldFacts,e.fact);return;
    case 'secretDebtAccept': acceptSecretDebtMutable(s);return;
    case 'secretDebtRefuse': refuseSecretDebtMutable(s);return;

    case 'advanceCareer': if(!allowTransitions)throw new Error('Nested career transition запрещён');applyTransition(s,'career',e.career,e.transition,cat);return;
    case 'advanceQuest': if(!allowTransitions)throw new Error('Nested quest transition запрещён');applyTransition(s,'quest',e.quest,e.transition,cat);return;
    case 'advanceRelationship': if(!allowTransitions)throw new Error('Nested relationship transition запрещён');applyTransition(s,'relationship',e.relationship,e.transition,cat);return;

    case 'addNextDayModifier':
      s.run.dayState.nextDayModifiers.energyDelta+=e.energyDelta;
      for(const se of e.statEffects)s.run.dayState.nextDayModifiers.statEffects.push(se);
      if(e.tag)addUnique(s.run.dayState.nextDayModifiers.tags,e.tag);
      return;

    // Legacy M3.2 effects.
    case 'housing': s.run.housing=e.value;return;
    case 'flag': s.run.flags[e.key]=e.value;return;
    case 'item': {
      const have=s.run.inventory[e.id]??0;if(have+e.delta<0)throw new Error('Не хватает предметов.');
      s.run.inventory[e.id]=have+e.delta;return;
    }
    case 'metric': {
      const value=getMetric(s,e.key)+e.delta;
      if(e.key==='money'&&value<0)throw new Error('Не хватает монет.');
      setMetric(s,e.key,value);return;
    }
  }
}
function applyEffectsMutable(s:Save,effects:Effect[],cat:Catalog,allowTransitions=true){
  const ordered=effects.map((effect,index)=>({effect,index,phase:effectPhase(effect)})).sort((a,b)=>a.phase-b.phase||a.index-b.index);
  for(const {effect} of ordered)applyOne(s,effect,cat,allowTransitions);
}
function applyActionEffectsMutable(s:Save,effects:Effect[],cat:Catalog){
  const applicable=effects.filter(effect=>{
    if(effect.kind!=='advanceCareer')return true;
    const {t}=transitionFor(cat,'career',effect.career,effect.transition);
    return readDomainState(s,'career',effect.career,cat)?.stage!==t.to;
  });
  applyEffectsMutable(s,applicable,cat,true);
}
export function applyEffects(input:Save,effects:Effect[],cat:Catalog):Save{
  const s=cloneSave(input);applyEffectsMutable(s,effects,cat,true);return s;
}

export function availableVariants(e:StoryEvent,s:Save,cat?:Catalog){
  const h=s.run.history[e.id];
  return e.variants.filter(v=>eligible(v.conditions,s,cat)&&(h?.variants[v.id]===undefined||s.run.day-h.variants[v.id]>=e.variantCooldownDays));
}

const resolverClassRank=new Map<PriorityClass,number>(priorityClasses.map((x,i)=>[x,i]));
const RESOLVER_CASCADE_LIMIT=16;

type ResolverTrace={epochId:string;facts:string[];steps:string[];selected:string|null;offers:string[]};
type QueuedInstance=Save['run']['flow']['reaction']['queued'][number];
type ResolverCandidate={
  event:StoryEvent;
  variantId:string;
  allowedChoiceIds:string[];
  eligibleSince:number;
  queuedInstanceId?:string;
  needsChance:boolean;
};

function factLabel(f:ReactionFact){
  switch(f.kind){
    case 'actionCompleted':return `actionCompleted:${f.action}`;
    case 'choiceResolved':return `choiceResolved:${f.event}.${f.choice}`;
    case 'statChanged':return `statChanged:${f.stat}:${f.from}->${f.to}`;
    case 'resourceChanged':return `resourceChanged:${f.resource}:${f.from}->${f.to}`;
    case 'energyChanged':return `energyChanged:${f.from}->${f.to}`;
    case 'calendarAdvanced':return `calendarAdvanced:${f.from}->${f.to}`;
    case 'dayStarted':return `dayStarted:${f.day}`;
    case 'nightPhase':return `nightPhase:${f.point}`;
    case 'nightChoiceCompleted':return `nightChoiceCompleted:${f.choice}`;
    case 'activityResult':return `activityResult:${f.activity}:${f.outcome}:${f.result}`;
    case 'careerCounterChanged':return `careerCounterChanged:${f.career}.${f.counter}:${f.from}->${f.to}`;
    case 'careerTransition':return `careerTransition:${f.career}:${f.from}->${f.to}`;
    case 'careerFactAdded':return `careerFactAdded:${f.career}.${f.fact}`;
    case 'questCounterChanged':return `questCounterChanged:${f.quest}.${f.counter}:${f.from}->${f.to}`;
    case 'questTransition':return `questTransition:${f.quest}:${f.from}->${f.to}`;
    case 'questFactAdded':return `questFactAdded:${f.quest}.${f.fact}`;
    case 'relationshipCounterChanged':return `relationshipCounterChanged:${f.relationship}.${f.counter}:${f.from}->${f.to}`;
    case 'relationshipTransition':return `relationshipTransition:${f.relationship}:${f.from}->${f.to}`;
    case 'relationshipFactAdded':return `relationshipFactAdded:${f.relationship}.${f.fact}`;
    case 'worldFactAdded':return `worldFactAdded:${f.fact}`;
    case 'endingEligible':return `endingEligible:${f.ending}`;
    case 'endingCommitted':return `endingCommitted:${f.ending}`;
    case 'creationCompleted':return 'creationCompleted';
  }
}

function startReactionEpochMutable(s:Save){
  const r=s.run.flow.reaction;
  r.epochCounter=Math.min(1_000_000,r.epochCounter+1);
  r.currentEpochId=`epoch.${s.meta.runsStarted}.${r.epochCounter}`;
  r.attemptedEventIds=[];
  r.cascadeDepth=0;
  return r.currentEpochId;
}
function ensureReactionEpoch(s:Save){
  return s.run.flow.reaction.currentEpochId??startReactionEpochMutable(s);
}
function matchTrigger(t:ReactionTrigger,f:ReactionFact):boolean{
  if(t.kind!==f.kind)return false;
  switch(t.kind){
    case 'creationCompleted':case 'energyChanged':case 'calendarAdvanced':case 'dayStarted':return true;
    case 'nightPhase':return f.kind==='nightPhase'&&f.point===t.point;
    case 'nightChoiceCompleted':return f.kind==='nightChoiceCompleted'&&f.choice===t.choice;
    case 'activityResult':return f.kind==='activityResult'&&f.activity===t.activity&&(!t.outcome||f.outcome===t.outcome)&&(!t.result||f.result===t.result);
    case 'actionCompleted':return !t.action||(f.kind==='actionCompleted'&&f.action===t.action);
    case 'choiceResolved':return !t.event||(f.kind==='choiceResolved'&&f.event===t.event);
    case 'statChanged':return !t.stat||(f.kind==='statChanged'&&f.stat===t.stat);
    case 'resourceChanged':return !t.resource||(f.kind==='resourceChanged'&&f.resource===t.resource);
    case 'careerCounterChanged':return f.kind==='careerCounterChanged'&&f.career===t.career&&(!t.counter||f.counter===t.counter);
    case 'careerTransition':return f.kind==='careerTransition'&&f.career===t.career;
    case 'careerFactAdded':return f.kind==='careerFactAdded'&&f.career===t.career&&(!t.fact||f.fact===t.fact);
    case 'questCounterChanged':return f.kind==='questCounterChanged'&&f.quest===t.quest&&(!t.counter||f.counter===t.counter);
    case 'questTransition':return f.kind==='questTransition'&&f.quest===t.quest;
    case 'questFactAdded':return f.kind==='questFactAdded'&&f.quest===t.quest&&(!t.fact||f.fact===t.fact);
    case 'relationshipCounterChanged':return f.kind==='relationshipCounterChanged'&&f.relationship===t.relationship&&(!t.counter||f.counter===t.counter);
    case 'relationshipTransition':return f.kind==='relationshipTransition'&&f.relationship===t.relationship;
    case 'relationshipFactAdded':return f.kind==='relationshipFactAdded'&&f.relationship===t.relationship&&(!t.fact||f.fact===t.fact);
    case 'worldFactAdded':return f.kind==='worldFactAdded'&&(!t.fact||f.fact===t.fact);
    case 'endingEligible':return f.kind==='endingEligible'&&(!t.ending||f.ending===t.ending);
    case 'endingCommitted':return f.kind==='endingCommitted'&&f.ending===t.ending;
  }
}
function eventTriggered(e:StoryEvent,facts:ReactionFact[]){
  if(e.trigger.some(action=>facts.some(f=>f.kind==='actionCompleted'&&f.action===action)))return true;
  return e.reactionTriggers.some(t=>facts.some(f=>matchTrigger(t,f)));
}
function historyAllows(e:StoryEvent,s:Save){
  const h=s.run.history[e.id];
  return !h||(h.count<e.maxShows&&s.run.day-h.lastDay>=e.cooldownDays);
}
function candidateSnapshot(e:StoryEvent,s:Save,cat:Catalog){
  const variants=availableVariants(e,s,cat).sort((a,b)=>b.conditions.length-a.conditions.length||(s.run.history[e.id]?.variants[a.id]??-1)-(s.run.history[e.id]?.variants[b.id]??-1)||a.id.localeCompare(b.id));
  const variant=variants[0];if(!variant)return null;
  const choices=e.choices.filter(c=>eligible(c.conditions,s,cat));if(!choices.length)return null;
  return {variantId:variant.id,allowedChoiceIds:choices.map(c=>c.id)};
}
function eventSort(a:StoryEvent,b:StoryEvent,s:Save){
  const classDelta=(resolverClassRank.get(a.priorityClass)??999)-(resolverClassRank.get(b.priorityClass)??999);
  if(classDelta)return classDelta;
  if(a.priority!==b.priority)return b.priority-a.priority;
  const ah=s.run.history[a.id]?.lastDay??-1,bh=s.run.history[b.id]?.lastDay??-1;
  if(ah!==bh)return ah-bh;
  return a.id.localeCompare(b.id);
}
function candidateSort(a:ResolverCandidate,b:ResolverCandidate,s:Save){
  const classDelta=(resolverClassRank.get(a.event.priorityClass)??999)-(resolverClassRank.get(b.event.priorityClass)??999);
  if(classDelta)return classDelta;
  if(a.event.priority!==b.event.priority)return b.event.priority-a.event.priority;
  if(a.eligibleSince!==b.eligibleSince)return a.eligibleSince-b.eligibleSince;
  const ah=s.run.history[a.event.id]?.lastDay??-1,bh=s.run.history[b.event.id]?.lastDay??-1;
  if(ah!==bh)return ah-bh;
  return a.event.id.localeCompare(b.event.id);
}
function committedSuppresses(s:Save,e:StoryEvent){
  if(!s.run.endings.committed&&s.run.status!=='ending_committed')return false;
  return e.priorityClass!=='terminal'&&e.priorityClass!=='ending_committed';
}
function queuedForEvent(s:Save,eventId:string){return s.run.flow.reaction.queued.some(q=>q.eventId===eventId);}
function nextInstanceId(s:Save,kind:QueuedInstance['kind']){
  const r=s.run.flow.reaction;
  const prefix=kind==='optional'?'offer':kind==='scheduled'?'scheduled':'latched';
  return `${prefix}.${r.epochCounter}.${r.attemptedEventIds.length}.${r.queued.length}`;
}
function recordEventHistory(s:Save,e:StoryEvent,variantId:string){
  const h=s.run.history[e.id]??{count:0,lastDay:0,variants:{}};
  h.count++;h.lastDay=s.run.day;h.variants[variantId]=s.run.day;s.run.history[e.id]=h;
}
function eventVariant(e:StoryEvent,variantId:string){return e.variants.find(v=>v.id===variantId)!;}
function logEventScene(s:Save,e:StoryEvent,variantId:string){log(s,`${e.title}: ${eventVariant(e,variantId).text}`);}
function removeQueuedInstance(s:Save,instanceId:string){
  const q=s.run.flow.reaction.queued.find(x=>x.instanceId===instanceId);
  s.run.flow.reaction.queued=s.run.flow.reaction.queued.filter(x=>x.instanceId!==instanceId);
  s.run.dayState.optionalOfferIds=s.run.dayState.optionalOfferIds.filter(x=>x!==instanceId);
  s.run.dayState.scheduledEventIds=s.run.dayState.scheduledEventIds.filter(x=>x!==instanceId);
  return q;
}
function pruneExpired(s:Save,trace:ResolverTrace){
  const expired=s.run.flow.reaction.queued.filter(q=>q.kind==='scheduled'&&q.expiresDay!==undefined&&s.run.day>=q.expiresDay);
  for(const q of expired){trace.steps.push(`expired:${q.eventId}:${q.instanceId}`);removeQueuedInstance(s,q.instanceId);}
}
function queueResolved(s:Save,e:StoryEvent,snapshot:{variantId:string;allowedChoiceIds:string[]},kind:QueuedInstance['kind']){
  const epochId=ensureReactionEpoch(s);
  const q:QueuedInstance={
    instanceId:nextInstanceId(s,kind),
    eventId:e.id,
    variantId:snapshot.variantId,
    allowedChoiceIds:[...snapshot.allowedChoiceIds],
    kind,
    createdDay:s.run.day,
    reactionEpochId:epochId,
    ...(kind==='scheduled'?{expiresDay:Math.min(159,s.run.day+(e.delivery.expiresAfterDays??1))}:{})
  };
  s.run.flow.reaction.queued.push(q);
  if(kind==='optional')addUnique(s.run.dayState.optionalOfferIds,q.instanceId);
  if(kind==='scheduled')addUnique(s.run.dayState.scheduledEventIds,q.instanceId);
  return q;
}
function attemptChance(s:Save,e:StoryEvent,trace:ResolverTrace){
  if(!e.chance){trace.steps.push(`chance:${e.id}:deterministic`);return true;}
  const r=s.run.flow.reaction;
  if(r.attemptedEventIds.includes(e.id)){trace.steps.push(`reject:${e.id}:already-attempted`);return false;}
  r.attemptedEventIds.push(e.id);
  if(e.id===SECRET_DEBT_LENDER_EVENT_ID)markSecretDebtLenderAttemptMutable(s);
  const roll=random(s),chance=eventChance(e,s),pass=roll<chance;
  trace.steps.push(`chance:${e.id}:${roll.toFixed(8)}<${chance.toFixed(8)}:${pass?'pass':'fail'}`);
  return pass;
}
function selectBlocking(s:Save,c:ResolverCandidate,trace:ResolverTrace,cat:Catalog){
  const r=s.run.flow.reaction;
  if(r.cascadeDepth>=RESOLVER_CASCADE_LIMIT){
    throw new Error(`Event Resolver cascade limit ${RESOLVER_CASCADE_LIMIT} exceeded in ${r.currentEpochId}; candidate=${c.event.id}; trace=${trace.steps.join('|')}`);
  }
  r.cascadeDepth++;
  if(c.queuedInstanceId)removeQueuedInstance(s,c.queuedInstanceId);
  recordEventHistory(s,c.event,c.variantId);
  logEventScene(s,c.event,c.variantId);
  s.run.pending={
    eventId:c.event.id,
    variantId:c.variantId,
    presentationId:presentationIdForEvent(cat,c.event.id,c.variantId),
    reactionEpochId:ensureReactionEpoch(s),
    allowedChoiceIds:[...c.allowedChoiceIds]
  };
  trace.selected=c.event.id;
  trace.steps.push(`selected:${c.event.id}:${c.variantId}:depth=${r.cascadeDepth}`);
}

function resolveReactionsMutable(s:Save,facts:ReactionFact[],cat:Catalog,trace:ResolverTrace){
  if(s.run.pending){trace.steps.push(`blocked:existing-pending:${s.run.pending.eventId}`);return;}
  pruneExpired(s,trace);
  const sortedEvents=[...cat.events].sort((a,b)=>eventSort(a,b,s));
  const live:ResolverCandidate[]=[];

  for(const e of sortedEvents){
    if(s.run.flow.night?.handledEventIds.includes(e.id)){trace.steps.push(`reject:${e.id}:night-handled`);continue;}
    if(committedSuppresses(s,e)){trace.steps.push(`reject:${e.id}:ending-committed`);continue;}
    if(queuedForEvent(s,e.id)){trace.steps.push(`defer:${e.id}:already-queued`);continue;}
    if(!eventTriggered(e,facts)){trace.steps.push(`reject:${e.id}:trigger`);continue;}
    if(!historyAllows(e,s)){trace.steps.push(`reject:${e.id}:repeat-cooldown`);continue;}
    if(!eligible(e.conditions,s,cat)){trace.steps.push(`reject:${e.id}:conditions`);continue;}
    const snapshot=candidateSnapshot(e,s,cat);
    if(!snapshot){trace.steps.push(`reject:${e.id}:variant-choice`);continue;}

    if(!e.blocking){
      if(!attemptChance(s,e,trace))continue;
      const q=queueResolved(s,e,snapshot,'optional');
      recordEventHistory(s,e,snapshot.variantId);
      trace.offers.push(q.instanceId);trace.steps.push(`offer:${e.id}:${q.instanceId}`);
      continue;
    }
    if(e.delivery.policy==='latched'||e.delivery.policy==='scheduled'){
      if(!attemptChance(s,e,trace))continue;
      const q=queueResolved(s,e,snapshot,e.delivery.policy);
      trace.steps.push(`queued:${e.id}:${q.kind}:${q.instanceId}`);
      continue;
    }
    live.push({event:e,...snapshot,eligibleSince:s.run.day,needsChance:true});
  }

  const queuedCandidates:ResolverCandidate[]=[];
  for(const q of s.run.flow.reaction.queued){
    if(q.kind==='optional')continue;
    const e=cat.events.find(x=>x.id===q.eventId);
    if(!e){trace.steps.push(`reject:${q.eventId}:queued-missing-definition`);continue;}
    if(committedSuppresses(s,e)){trace.steps.push(`reject:${e.id}:queued-ending-committed`);continue;}
    queuedCandidates.push({event:e,variantId:q.variantId,allowedChoiceIds:[...q.allowedChoiceIds],eligibleSince:q.createdDay,queuedInstanceId:q.instanceId,needsChance:false});
  }

  const candidates=[...live,...queuedCandidates].sort((a,b)=>candidateSort(a,b,s));
  trace.steps.push(`candidates:${candidates.map(x=>x.event.id).join(',')||'-'}`);
  for(const candidate of candidates){
    if(candidate.needsChance&&!attemptChance(s,candidate.event,trace))continue;
    selectBlocking(s,candidate,trace,cat);return;
  }
}

export function resolveReactions(input:Save,facts:ReactionFact[],cat:Catalog,{newEpoch=true}:{newEpoch?:boolean}={}){
  const s=cloneSave(input);
  if(newEpoch)startReactionEpochMutable(s);else ensureReactionEpoch(s);
  const trace:ResolverTrace={epochId:s.run.flow.reaction.currentEpochId!,facts:facts.map(factLabel),steps:[],selected:null,offers:[]};
  resolveReactionsMutable(s,facts,cat,trace);
  return {state:s,trace};
}

function collectDomainFacts(before:Save,after:Save,cat:Catalog,kind:DomainKind,facts:ReactionFact[]){
  const beforeMap=domainMap(before,kind),afterMap=domainMap(after,kind);
  const ids=new Set([...Object.keys(beforeMap),...Object.keys(afterMap)]);
  for(const id of ids){
    const a=readDomainState(before,kind,id,cat),b=readDomainState(after,kind,id,cat);if(!a||!b)continue;
    if(a.stage!==b.stage){
      if(kind==='career')facts.push({kind:'careerTransition',career:id,from:a.stage,to:b.stage});
      if(kind==='quest')facts.push({kind:'questTransition',quest:id,from:a.stage,to:b.stage});
      if(kind==='relationship')facts.push({kind:'relationshipTransition',relationship:id,from:a.stage,to:b.stage});
    }
    if(kind==='career'&&(a.shifts??0)!==(b.shifts??0))facts.push({kind:'careerCounterChanged',career:id,counter:'shifts',from:a.shifts??0,to:b.shifts??0});
    const counters=new Set([...Object.keys(a.counters),...Object.keys(b.counters)]);
    for(const counter of counters){
      const av=a.counters[counter]??0,bv=b.counters[counter]??0;if(av===bv)continue;
      if(kind==='career')facts.push({kind:'careerCounterChanged',career:id,counter,from:av,to:bv});
      if(kind==='quest')facts.push({kind:'questCounterChanged',quest:id,counter,from:av,to:bv});
      if(kind==='relationship')facts.push({kind:'relationshipCounterChanged',relationship:id,counter,from:av,to:bv});
    }
    for(const fact of b.facts.filter(x=>!a.facts.includes(x))){
      if(kind==='career')facts.push({kind:'careerFactAdded',career:id,fact});
      if(kind==='quest')facts.push({kind:'questFactAdded',quest:id,fact});
      if(kind==='relationship')facts.push({kind:'relationshipFactAdded',relationship:id,fact});
    }
  }
}
function collectReactionFacts(before:Save,after:Save,cat:Catalog,extras:ReactionFact[]=[]){
  const facts:ReactionFact[]=[...extras];
  for(const stat of stats){
    const a=before.run.character.stats[stat],b=after.run.character.stats[stat];
    if(a!==b)facts.push({kind:'statChanged',stat,from:a,to:b});
  }
  if(before.run.resources.money!==after.run.resources.money)facts.push({kind:'resourceChanged',resource:'money',from:before.run.resources.money,to:after.run.resources.money});
  if(before.run.dayState.energyCurrent!==after.run.dayState.energyCurrent)facts.push({kind:'energyChanged',from:before.run.dayState.energyCurrent,to:after.run.dayState.energyCurrent});
  if(before.run.calendar.elapsedDays!==after.run.calendar.elapsedDays){
    facts.push({kind:'calendarAdvanced',from:before.run.calendar.elapsedDays,to:after.run.calendar.elapsedDays});
    facts.push({kind:'dayStarted',day:after.run.calendar.elapsedDays});
  }
  collectDomainFacts(before,after,cat,'career',facts);
  collectDomainFacts(before,after,cat,'quest',facts);
  collectDomainFacts(before,after,cat,'relationship',facts);
  for(const fact of after.run.progression.worldFacts.filter(x=>!before.run.progression.worldFacts.includes(x)))facts.push({kind:'worldFactAdded',fact});
  for(const ending of after.run.endings.eligible.filter(x=>!before.run.endings.eligible.includes(x)))facts.push({kind:'endingEligible',ending});
  return facts;
}

function register(s:Save,cat:Catalog){
  for(const e of cat.definitions.endings)if(eligible(e.conditions,s,cat)&&!s.run.availableEndings.includes(e.id)){
    s.run.availableEndings.push(e.id);log(s,`Новая судьба: «${e.title}». Можно продолжать жизнь или принять её.`);
  }
}

export function energyMax(s:Save){
  const modifier=Number(s.meta.ruleModifiers['energy.daily']??0);
  const strongBonus=strongMetaCurrentEnergyBonus(s.run.strongMetaSnapshot,s.run.strongMetaRuntime,s.run.day);
  return Math.max(1,3+modifier+(s.meta.unlocks.includes('vitality')?1:0)+strongBonus);
}
export function rent(s:Save){
  const base=100;
  return s.meta.unlocks.includes('guild')?Math.ceil(base/2):base;
}
export function favorStat(s:Save):Stat{return ({spring:'strength',summer:'magic',autumn:'charm',winter:'endurance'} as const)[calendar(s.run.day).season];}
export function eventChance(e:StoryEvent,s:Save){return e.chance?Math.min(e.chance.max,e.chance.base+getMetric(s,e.chance.stat)*e.chance.perPoint):1;}
function random(s:Save){s.run.rng=(Math.imul(s.run.rng,1664525)+1013904223)>>>0;return s.run.rng/4294967296;}
function runResolverBoundary(s:Save,before:Save,cat:Catalog,extras:ReactionFact[]=[],newEpoch=true){
  if(newEpoch)startReactionEpochMutable(s);else ensureReactionEpoch(s);
  const facts=collectReactionFacts(before,s,cat,extras);
  const trace:ResolverTrace={epochId:s.run.flow.reaction.currentEpochId!,facts:facts.map(factLabel),steps:[],selected:null,offers:[]};
  resolveReactionsMutable(s,facts,cat,trace);
}

function stableIdHash(value:string){
  let h=2166136261;
  for(let i=0;i<value.length;i++){h^=value.charCodeAt(i);h=Math.imul(h,16777619);}
  return (h>>>0).toString(16).padStart(8,'0');
}
function resultIdentityFor(runId:string,runsStarted:number,endingId:string){
  const basis=`${runId}|${endingId}`;
  return {
    transactionId:`tx.${runsStarted}.${stableIdHash(basis)}`,
    resultId:`rr.${runsStarted}.${stableIdHash('result|'+basis)}`
  };
}
function runResultIdentity(s:Save,endingId:string){
  return resultIdentityFor(s.run.id,s.meta.runsStarted,endingId);
}
function endingRewards(ending:Catalog['definitions']['endings'][number]):MetaReward[]{
  if(ending.metaRewards!==undefined)return ending.metaRewards;
  return [{kind:'unlock',rewardId:`legacy.reward.${stableIdHash(ending.id+'|'+ending.reward)}`,unlock:ending.reward}];
}
function applyMetaRewardMutable(meta:Meta,reward:MetaReward){
  if(reward.kind==='unlock')addUnique(meta.unlocks,reward.unlock);
  else if(reward.kind==='hardWork')addUnique(meta.hardWorkProgress,reward.career);
  else if(reward.kind==='strongMeta')meta.strongMeta=grantStrongMetaReward(meta.strongMeta,reward.reward as ApprovedStrongRewardId);
}
function commitEndingMutable(s:Save,endingId:string,cat:Catalog){
  if(s.run.status==='ended'){
    if(s.run.endings.committed===endingId)return;
    throw new Error('Эта жизнь уже завершена другой судьбой.');
  }
  if(s.run.status==='ending_committed'){
    if(s.run.endings.committed===endingId)return;
    throw new Error('Уже выбрана другая судьба.');
  }
  if(s.run.status!=='active'&&s.run.status!=='expired')throw new Error('Сейчас нельзя выбрать судьбу.');
  if(s.run.pending||s.run.flow.night||s.run.flow.activity)throw new Error('Завершите текущую сцену, ночь или Activity.');
  const ending=cat.definitions.endings.find(e=>e.id===endingId);
  if(!ending||!s.run.endings.eligible.includes(endingId))throw new Error('Эта судьба сейчас недоступна.');
  if(endingId.startsWith('ending.secret-debt.')&&!eligible(ending.conditions,s,cat)){
    throw new Error('Эта Secret Debt судьба больше не соответствует текущему исходу маршрута.');
  }
  const before=cloneSave(s);
  s.run.endings.committed=endingId;
  s.run.status='ending_committed';
  log(s,`Вы выбрали судьбу «${ending.title}».`);
  runResolverBoundary(s,before,cat,[{kind:'endingCommitted',ending:endingId}],true);
}
function completeEndingMutable(s:Save,cat:Catalog){
  if(s.run.status==='ended'&&s.run.endings.result)return;
  if(s.run.status!=='ending_committed'||!s.run.endings.committed)throw new Error('Сначала выберите судьбу.');
  if(s.run.pending||s.run.flow.night||s.run.flow.activity)throw new Error('Сначала завершите финальную сцену.');
  const ending=cat.definitions.endings.find(e=>e.id===s.run.endings.committed);
  if(!ending)throw new Error('Выбранная судьба отсутствует в catalog.');
  const {transactionId,resultId}=runResultIdentity(s,ending.id);
  if(s.run.endings.result){
    if(s.run.endings.result.transactionId!==transactionId)throw new Error('RunResult transaction mismatch.');
    s.run.status='ended';return;
  }
  const alreadyApplied=s.meta.appliedResultTransactions.includes(transactionId);
  const firstCompletion=!s.meta.completedEndings.includes(ending.id);
  const rewards=firstCompletion?endingRewards(ending):[];
  if(!alreadyApplied){
    for(const reward of rewards)applyMetaRewardMutable(s.meta,reward);
    s.meta.runsCompleted=Math.min(1_000_000,s.meta.runsCompleted+1);
  }
  addUnique(s.meta.completedEndings,ending.id);
  addUnique(s.meta.appliedResultTransactions,transactionId);
  s.run.endings.result={
    resultId,
    endingId:ending.id,
    transactionId,
    completedAtDay:s.run.day,
    firstCompletion:firstCompletion&&!alreadyApplied,
    appliedMetaRewardIds:alreadyApplied?[]:rewards.map(r=>r.rewardId)
  };
  s.run.status='ended';
  log(s,ending.epilogue);
}

function activityDefinition(cat:Catalog,id:string):ActivityDefinition{
  const definition=cat.definitions.activities.find(x=>x.id===id);
  if(!definition)throw new Error(`Неизвестная Activity: ${id}`);
  return definition;
}
function activityRandom(envelope:ActivityEnvelope){
  envelope.rngState=(Math.imul(envelope.rngState,1664525)+1013904223)>>>0;
  return envelope.rngState/4294967296;
}
function activityResult(definition:ActivityDefinition,outcome:ActivityOutcome){
  const result=definition.results.find(x=>x.outcome===outcome);
  if(!result)throw new Error(`Activity ${definition.id} не имеет result ${outcome}`);
  return result;
}
function finalizeActivityMutable(s:Save,cat:Catalog,outcome:ActivityOutcome){
  const envelope=s.run.flow.activity;if(!envelope)throw new Error('Нет активной Activity.');
  const definition=activityDefinition(cat,envelope.activityId);
  if(definition.version!==envelope.definitionVersion||definition.adapter!==envelope.adapter)throw new Error('Activity definition несовместима с сохранённым envelope.');
  const result=activityResult(definition,outcome);
  const before=cloneSave(s);
  envelope.status='resolving';
  envelope.accumulatedRewards.push(...structuredClone(result.effects));
  addUnique(envelope.emittedFacts,result.id);
  applyEffectsMutable(s,result.effects,cat,true);
  s.run.flow.activity=null;
  register(s,cat);
  runResolverBoundary(s,before,cat,[{kind:'activityResult',activity:definition.id,outcome,result:result.id}],true);
}
function enterActivityMutable(s:Save,cat:Catalog,id:string){
  if(s.run.pending)throw new Error('Сначала завершите текущую сцену.');
  if(s.run.flow.night)throw new Error('Нельзя войти в Activity во время NightFlow.');
  if(s.run.flow.activity)throw new Error('Activity уже активна.');
  if(!s.run.flags['story.arrived'])throw new Error('Сначала завершите вступление.');
  const definition=activityDefinition(cat,id);
  if(!eligible(definition.entryConditions,s,cat))throw new Error('Условия входа в Activity не выполнены.');
  if(s.run.dayState.energyCurrent<definition.entryEnergyCost)throw new Error('Не хватает Energy для входа в Activity.');
  s.run.dayState.energyCurrent-=definition.entryEnergyCost;
  random(s);
  s.run.flow.activity={
    activityId:definition.id,
    definitionVersion:definition.version,
    adapter:definition.adapter,
    status:'active',
    startedDay:s.run.day,
    entryEnergyCommitted:true,
    optionModelVersion:definition.options.length?1:0,
    internalState:{
      progress:0,
      endurance:definition.adapterConfig.initialEndurance,
      steps:0,
      lastRoll:null,
      routeId:null,
      resolvedOptionIds:[]
    },
    rngState:s.run.rngState.state,
    checkpoint:'entry',
    accumulatedRewards:[],
    emittedFacts:[]
  };
}
function activityActionMutable(s:Save,cat:Catalog,action:string){
  const envelope=s.run.flow.activity;if(!envelope)throw new Error('Нет активной Activity.');
  if(s.run.pending||s.run.flow.night)throw new Error('Некорректное внешнее состояние Activity.');
  const definition=activityDefinition(cat,envelope.activityId);
  if(definition.version!==envelope.definitionVersion||definition.adapter!==envelope.adapter)throw new Error('Activity definition несовместима с сохранённым envelope.');
  if(envelope.status!=='active')throw new Error('Activity сейчас не принимает действия.');
  if(action==='escape'){finalizeActivityMutable(s,cat,'escape');return;}
  if(envelope.optionModelVersion===0&&action!=='advance')throw new Error(`Неизвестное Activity action: ${action}`);
  const state=envelope.internalState;
  const requiresRouteSelection=envelope.optionModelVersion>=1&&definition.options.some(option=>option.category==='route');
  if(action==='advance'&&requiresRouteSelection&&!state.routeId)throw new Error('Сначала выберите маршрут Activity.');
  if(action!=='advance'){
    const option=definition.options.find(candidate=>candidate.id===action);
    if(!option)throw new Error(`Неизвестное Activity action: ${action}`);
    if(state.resolvedOptionIds.includes(option.id))throw new Error('Activity option уже использована.');
    if(!eligible(option.conditions,s,cat))throw new Error('Activity option недоступна.');
    if(option.setRoute&&state.routeId&&state.routeId!==option.setRoute)throw new Error('Activity route уже выбрана.');
    state.steps++;
    if(option.setRoute)state.routeId=option.setRoute;
    state.progress=Math.min(1_000_000,state.progress+option.progressDelta);
    state.endurance=Math.max(0,state.endurance-option.enduranceCost);
    state.lastRoll=activityRandom(envelope);
    addUnique(state.resolvedOptionIds,option.id);
    envelope.checkpoint=option.id;
  }else{
    state.steps++;
    state.progress++;
    state.endurance=Math.max(0,state.endurance-definition.adapterConfig.advanceEnduranceCost);
    state.lastRoll=activityRandom(envelope);
    envelope.checkpoint=`counter.step.${state.steps}`;
  }
  if(state.progress>=definition.adapterConfig.successAtProgress){finalizeActivityMutable(s,cat,'success');return;}
  if(state.endurance<=definition.adapterConfig.failAtEndurance){finalizeActivityMutable(s,cat,'failure');return;}
}

export function availableActivityActions(s:Save,cat:Catalog):Array<{id:string;label:string}>{
  const envelope=s.run.flow.activity;if(!envelope||envelope.status!=='active')return [];
  const definition=activityDefinition(cat,envelope.activityId);
  const state=envelope.internalState;
  if(envelope.optionModelVersion===0)return [{id:'advance',label:'Продолжить'},{id:'escape',label:'Отступить'}];
  const custom=definition.options
    .filter(option=>!state.resolvedOptionIds.includes(option.id))
    .filter(option=>eligible(option.conditions,s,cat))
    .filter(option=>!option.setRoute||!state.routeId||state.routeId===option.setRoute)
    .map(option=>({id:option.id,label:option.label}));
  const requiresRouteSelection=definition.options.some(option=>option.category==='route');
  const ordinary=requiresRouteSelection&&!state.routeId?[]:[{id:'advance',label:'Продолжить'}];
  return [...custom,...ordinary,{id:'escape',label:'Отступить'}];
}

type NightPoint='before_lodging'|'after_lodging'|'after_choice';
type NightState=NonNullable<Save['run']['flow']['night']>;

function nightState(s:Save):NightState{
  const n=s.run.flow.night;if(!n)throw new Error('Ночная последовательность не начата.');return n;
}
function queueNextDay(s:Save,energyDelta:number,statEffects:{stat:Stat;delta:number}[],tag?:string){
  const q=s.run.dayState.nextDayModifiers;
  q.energyDelta+=energyDelta;
  if(q.statEffects.length+statEffects.length>24)throw new Error('Слишком много отложенных эффектов следующего дня.');
  q.statEffects.push(...statEffects);
  if(tag)addUnique(q.tags,tag);
}
function applyPendingNightPolicy(s:Save,cat:Catalog,point:NightPoint){
  const pending=s.run.pending;if(!pending)return;
  const event=cat.events.find(e=>e.id===pending.eventId);
  const policy=event?.nightPolicy;
  if(!policy||policy.intercept!==point)return;
  const n=nightState(s);
  n.suppressLodgingPayment ||= policy.suppressLodgingPayment;
  n.suppressVoluntaryMenu ||= policy.suppressVoluntaryMenu;
  n.consumesNight ||= policy.consumesNight;
}
const D51_STREET_ENERGY_PROVENANCE_TAG='lodging.street.energy-penalty' as const;
const D51_BOUND_NIGHT_ENERGY_PROVENANCE_TAG='secret-debt.bound-night' as const;
const D51_BOUND_STREET_COMPATIBILITY_FLOOR=2 as const;
const D51_BOUND_STREET_LOCKED_DELTA=-2 as const;

function nextDayEnergyAfterD51Compatibility(s:Save,queued:Save['run']['dayState']['nextDayModifiers']){
  const base=energyMax(s);
  const hasBoundStreetPair=
    queued.tags.includes(D51_STREET_ENERGY_PROVENANCE_TAG)
    && queued.tags.includes(D51_BOUND_NIGHT_ENERGY_PROVENANCE_TAG);
  if(!hasBoundStreetPair)return Math.max(1,base+queued.energyDelta);

  // D51 processes the two locked -1 penalties first, floors only that pair at 2,
  // then applies every unrelated queued Energy modifier independently.
  const unrelatedDelta=queued.energyDelta-D51_BOUND_STREET_LOCKED_DELTA;
  const afterLockedPair=Math.max(
    D51_BOUND_STREET_COMPATIBILITY_FLOOR,
    base+D51_BOUND_STREET_LOCKED_DELTA
  );
  return Math.max(1,afterLockedPair+unrelatedDelta);
}

function finishNightMutable(s:Save,cat:Catalog){
  const n=nightState(s);
  if(s.run.pending)throw new Error('Нельзя завершить ночь с активной сценой.');
  const before=cloneSave(s);
  n.phase='NextDayModifiersFinalized';
  n.phase='CalendarAdvance';
  if(!n.calendarAdvanceCommitted){
    if(s.run.day+1>=160){
      n.calendarAdvanceCommitted=true;
      s.run.status='expired';
      log(s,'Четыре года истекли. Выберите открытую судьбу или начните следующую жизнь.');
      s.run.flow.night=null;
      return;
    }
    s.run.day++;
    s.run.slot=0;
    n.calendarAdvanceCommitted=true;
  }
  n.phase='StartDay';
  activateSecretDebtIfDueMutable(s);
  const liveSecretDebtBound=secretDebtBound(s);
  const queued=s.run.dayState.nextDayModifiers;
  for(const effect of queued.statEffects)setMetric(s,effect.stat,getMetric(s,effect.stat)+effect.delta);
  applyStrongMetaStartDayMutable(s,liveSecretDebtBound);
  s.run.metrics.energy=nextDayEnergyAfterD51Compatibility(s,queued);
  s.run.dayState.nextDayModifiers={energyDelta:0,statEffects:[],tags:[]};
  s.run.housingState.paidForCurrentNight=false;
  for(const q of [...s.run.flow.reaction.queued])if(q.kind==='optional')removeQueuedInstance(s,q.instanceId);
  s.run.lastAction={
    id:'rest',
    title:'Новое утро',
    text:'Ночь завершена. Начался новый день.',
    media:[s.run.housingState.current==='street'?'stage.outside':'stage.room'],
    deltas:delta(before.run.metrics,s.run.metrics)
  };
  register(s,cat);
  s.run.flow.night=null;
  runResolverBoundary(s,before,cat,[],true);
}
function resumeNightFromPointMutable(s:Save,cat:Catalog,point:NightPoint){
  const n=nightState(s);
  n.currentIntercept=null;
  if(point==='before_lodging'){
    if(n.suppressLodgingPayment){
      if(n.suppressVoluntaryMenu||n.consumesNight){finishNightMutable(s,cat);return;}
      n.phase='VoluntaryNightChoice';return;
    }
    n.phase='LodgingResolution';return;
  }
  if(point==='after_lodging'){
    if(n.suppressVoluntaryMenu||n.consumesNight){finishNightMutable(s,cat);return;}
    n.phase='VoluntaryNightChoice';return;
  }
  finishNightMutable(s,cat);
}
function runNightPointMutable(s:Save,cat:Catalog,point:NightPoint,before:Save=cloneSave(s),extras:ReactionFact[]=[]){
  const n=nightState(s);
  n.currentIntercept=point;
  runResolverBoundary(s,before,cat,[{kind:'nightPhase',point},...extras],true);
  if(s.run.pending){
    n.phase='NightEventResolution';
    applyPendingNightPolicy(s,cat,point);
    return;
  }
  resumeNightFromPointMutable(s,cat,point);
}
function beginNightMutable(s:Save,cat:Catalog){
  if(s.run.flow.night)throw new Error('Ночь уже начата.');
  if(s.run.pending)throw new Error('Сначала завершите текущую сцену.');
  if(s.run.flow.activity)throw new Error('Нельзя начать ночь внутри Activity.');
  if(!s.run.flags['story.arrived'])throw new Error('Сначала завершите вступление.');
  if(s.run.day+1>=160){
    s.run.status='expired';
    log(s,'Четыре года истекли. Выберите открытую судьбу или начните следующую жизнь.');
    return;
  }
  s.run.flow.night={
    phase:'PreLodgingForcedCheck',
    startedDay:s.run.day,
    selectedLodgingId:null,
    lodgingPaymentCommitted:false,
    selectedNightChoiceId:null,
    suppressLodgingPayment:false,
    suppressVoluntaryMenu:false,
    consumesNight:false,
    calendarAdvanceCommitted:false,
    currentIntercept:null,
    handledEventIds:[]
  };
  runNightPointMutable(s,cat,'before_lodging');
}
function chooseLodgingMutable(s:Save,cat:Catalog,lodging:LodgingDefinition){
  const n=nightState(s);
  if(s.run.pending)throw new Error('Сначала завершите ночную сцену.');
  if(n.phase!=='LodgingResolution')throw new Error('Сейчас нельзя выбирать жильё.');
  if(n.lodgingPaymentCommitted)throw new Error('Ночлег уже оплачен.');
  if(!eligible(lodging.conditions,s,cat))throw new Error('Этот ночлег недоступен.');
  if(s.run.resources.money<lodging.moneyCost)throw new Error('Не хватает монет на ночлег.');
  const before=cloneSave(s);
  s.run.resources.money-=lodging.moneyCost;
  s.run.housingState.current=lodging.housing;
  s.run.housingState.paidForCurrentNight=lodging.moneyCost>0;
  n.selectedLodgingId=lodging.id;
  n.lodgingPaymentCommitted=true;
  applyEffectsMutable(s,lodging.effects,cat,true);
  queueNextDay(s,lodging.nextDayEnergyDelta,lodging.nextDayEffects,`lodging.${lodging.id}`);
  if(lodging.id==='lodging.street'&&lodging.nextDayEnergyDelta===-1){
    addUnique(s.run.dayState.nextDayModifiers.tags,D51_STREET_ENERGY_PROVENANCE_TAG);
  }
  n.phase='PostLodgingForcedCheck';
  runNightPointMutable(s,cat,'after_lodging',before);
}
function chooseNightChoiceMutable(s:Save,cat:Catalog,choice:NightChoiceDefinition){
  const n=nightState(s);
  if(s.run.pending)throw new Error('Сначала завершите ночную сцену.');
  if(n.phase!=='VoluntaryNightChoice')throw new Error('Сейчас нельзя выбирать ночное занятие.');
  if(n.selectedNightChoiceId)throw new Error('Ночное занятие уже выбрано.');
  if(!eligible(choice.conditions,s,cat))throw new Error('Это ночное занятие недоступно.');
  const before=cloneSave(s);
  applyEffectsMutable(s,choice.effects,cat,true);
  queueNextDay(s,choice.nextDayEnergyDelta,choice.nextDayEffects,`night.choice.${choice.id}`);
  n.selectedNightChoiceId=choice.id;
  n.phase='NightEventResolution';
  runNightPointMutable(s,cat,'after_choice',before,[{kind:'nightChoiceCompleted',choice:choice.id}]);
}
function resumeNightAfterSceneMutable(s:Save,cat:Catalog){
  const n=s.run.flow.night;if(!n||s.run.pending||!n.currentIntercept)return;
  const point=n.currentIntercept;
  runNightPointMutable(s,cat,point,cloneSave(s),[]);
}
function compatibilityLodging(s:Save,payment:'money'|'favor'|'outside'):LodgingDefinition{
  if(payment==='money')return {id:'legacy.money',label:'Комната',housing:'normal',moneyCost:rent(s),conditions:[],effects:[],nextDayEffects:[],nextDayEnergyDelta:0};
  if(payment==='favor'){
    const stat=favorStat(s);
    if(s.run.character.stats[stat]<1)throw new Error('Не хватает сил для помощи хозяину.');
    return {id:'legacy.favor',label:'Помощь хозяину',housing:'normal',moneyCost:0,conditions:[],effects:[{kind:'modifyStat',stat,delta:-1}],nextDayEffects:[],nextDayEnergyDelta:0};
  }
  return {id:'legacy.outside',label:'Улица',housing:'street',moneyCost:0,conditions:[],effects:[],nextDayEffects:[{stat:'grooming',delta:-1}],nextDayEnergyDelta:-1};
}
const compatibilitySleepChoice:NightChoiceDefinition={id:'legacy.sleep',label:'Спать',conditions:[],effects:[],nextDayEffects:[],nextDayEnergyDelta:0};

export type Command=
  |{type:'action';id:string;recipe?:'gentle'|'bold'}
  |{type:'schoolLesson';id:SchoolCourseId}
  |{type:'choice';id:string}
  |{type:'commitEnding';id:string}
  |{type:'completeEnding'}
  |{type:'accept';id:string}
  |{type:'newLife'}
  |{type:'restart'}
  |{type:'setStrongMetaKeystone';id:string|null}
  |{type:'setStrongMetaSpecialist';id:string;active:boolean}
  |{type:'setHardWorkPackageActive';career:OrdinaryHardWorkCareer;active:boolean}
  |{type:'allocate';stat:Stat;delta:1|-1}
  |{type:'finishCreation'}
  |{type:'openOffer';id:string}
  |{type:'enterActivity';id:string}
  |{type:'activityAction';id:string}
  |{type:'endDay'}
  |{type:'chooseLodging';id:string}
  |{type:'chooseNightChoice';id:string}
  |{type:'sleep';payment:'money'|'favor'|'outside'};

export function dispatch(input:Save,command:Command,cat:Catalog):Save {
  const s=cloneSave(input);
  if(command.type==='restart'){
    const meta=defaultMeta(s.meta);meta.runsStarted++;return freshSave(meta);
  }
  if(command.type==='newLife'){
    if(s.run.status==='active')throw new Error('Сначала примите судьбу или дождитесь окончания срока.');
    if(s.run.status==='ending_committed')throw new Error('Сначала завершите выбранную судьбу.');
    const meta=defaultMeta(s.meta);meta.runsStarted++;return freshSave(meta);
  }
  if(command.type==='setStrongMetaKeystone'){
    const creation=s.run.creation;
    if(creation.complete||s.run.status!=='active'||s.run.pending)throw new Error('Выбор Strong Meta для этой жизни уже закрыт.');
    s.meta.strongMeta=setPreferredStrongMetaKeystone(s.meta.strongMeta,command.id);
    return s;
  }
  if(command.type==='setStrongMetaSpecialist'){
    const creation=s.run.creation;
    if(creation.complete||s.run.status!=='active'||s.run.pending)throw new Error('Выбор Strong Meta для этой жизни уже закрыт.');
    s.meta.strongMeta=setPreferredStrongMetaSpecialist(s.meta.strongMeta,command.id,command.active);
    return s;
  }
  if(command.type==='setHardWorkPackageActive'){
    const creation=s.run.creation;
    if(creation.complete||creation.hardWorkPackagesApplied||s.run.status!=='active'||s.run.pending)throw new Error('Выбор наследия для этой жизни уже закрыт.');
    if(!s.meta.hardWorkProgress.includes(command.career))throw new Error('Этот Hard Work пакет ещё не заработан.');
    const next=command.active
      ?[...creation.activeHardWorkPackages,command.career]
      :creation.activeHardWorkPackages.filter(career=>career!==command.career);
    creation.activeHardWorkPackages=validateHardWorkPackageSelection(next,s.meta.hardWorkProgress);
    return s;
  }
  if(command.type==='allocate'){
    if(s.run.creation.complete||s.run.status!=='active'||s.run.pending)throw new Error('Создание персонажа завершено.');
    if(!stats.includes(command.stat))throw new Error('Неизвестная характеристика.');
    const used=s.run.creation.allocated[command.stat]??0;
    if((command.delta===1&&s.run.creation.remaining<1)||(command.delta===-1&&used<1))throw new Error('Нет свободных очков.');
    s.run.metrics[command.stat]+=command.delta;s.run.creation.remaining-=command.delta;s.run.creation.allocated[command.stat]=used+command.delta;return s;
  }
  if(command.type==='finishCreation'){
    if(s.run.creation.complete||s.run.creation.remaining!==0)throw new Error('Распределите все 10 очков.');
    const strongSnapshot=resolveStrongMetaSnapshot(s.meta.strongMeta);
    s.run.strongMetaSnapshot=strongSnapshot;
    s.run.character.progressionStatCap=strongMetaProgressionStatCap(strongSnapshot,s.run.character.progressionStatCap);
    applyStrongMetaStartDayMutable(s,false);
    const application=applyHardWorkPackagesAtCreation({
      definitions:hardWorkPackageDefinitions,
      earnedHardWork:s.meta.hardWorkProgress,
      activePackages:s.run.creation.activeHardWorkPackages,
      snapshot:{
        stats:s.run.character.stats,
        lust:s.run.character.lust,
        packagesApplied:s.run.creation.hardWorkPackagesApplied
      },
      progressionStatCap:effectiveProgressionStatCap(s)
    });
    s.run.character.stats=application.stats;
    s.run.character.lust=application.lust;
    s.run.creation.activeHardWorkPackages=[...application.appliedPackages];
    s.run.creation.hardWorkPackagesApplied=application.packagesApplied;
    s.run.creation.complete=true;
    markPalaceCreationQualification(s);
    register(s,cat);
    runResolverBoundary(s,input,cat,[{kind:'creationCompleted'}],true);
    return s;
  }
  if(!s.run.creation.complete)throw new Error('Сначала создайте героиню.');
  if(command.type==='commitEnding'){
    commitEndingMutable(s,command.id,cat);
    return s;
  }
  if(command.type==='completeEnding'){
    completeEndingMutable(s,cat);
    return s;
  }
  if(command.type==='accept'){
    if(s.run.status==='ended')throw new Error('Эта жизнь уже завершена.');
    commitEndingMutable(s,command.id,cat);
    if(!s.run.pending)completeEndingMutable(s,cat);
    return s;
  }
  if(s.run.status!=='active'&&!(s.run.status==='ending_committed'&&command.type==='choice'))throw new Error('Эта жизнь завершена.');
  if(command.type==='schoolLesson'){
    const result=executeSchoolLesson(s,command.id,cat,{applyEffects,register,resolveReactions});
    return result.state;
  }
  if(command.type==='enterActivity'){
    enterActivityMutable(s,cat,command.id);
    return s;
  }
  if(command.type==='activityAction'){
    activityActionMutable(s,cat,command.id);
    return s;
  }
  if(command.type==='openOffer'){
    if(s.run.pending||s.run.flow.night||s.run.flow.activity)throw new Error('Сначала завершите текущую сцену, ночь или Activity.');
    const q=s.run.flow.reaction.queued.find(x=>x.instanceId===command.id&&x.kind==='optional');
    if(!q||!s.run.dayState.optionalOfferIds.includes(command.id))throw new Error('Предложение недоступно.');
    const e=cat.events.find(x=>x.id===q.eventId);if(!e)throw new Error('Событие предложения отсутствует.');
    s.run.flow.reaction.currentEpochId=q.reactionEpochId;
    removeQueuedInstance(s,q.instanceId);
    s.run.pending={eventId:q.eventId,variantId:q.variantId,presentationId:presentationIdForEvent(cat,q.eventId,q.variantId),reactionEpochId:q.reactionEpochId,allowedChoiceIds:[...q.allowedChoiceIds]};
    logEventScene(s,e,q.variantId);
    return s;
  }
  if(command.type==='endDay'){
    beginNightMutable(s,cat);
    return s;
  }
  if(command.type==='chooseLodging'){
    const lodging=cat.definitions.lodgings.find(x=>x.id===command.id);
    if(!lodging)throw new Error('Неизвестный вариант ночлега.');
    chooseLodgingMutable(s,cat,lodging);
    return s;
  }
  if(command.type==='chooseNightChoice'){
    const nightChoice=cat.definitions.nightChoices.find(x=>x.id===command.id);
    if(!nightChoice)throw new Error('Неизвестное ночное занятие.');
    chooseNightChoiceMutable(s,cat,nightChoice);
    return s;
  }
  if(command.type==='sleep'){
    if(s.run.flow.night)throw new Error('Ночь уже начата: завершите текущий NightFlow.');
    beginNightMutable(s,cat);
    let activeNight=s.run.flow.night as NightState|null;
    if(s.run.status!=='active'||s.run.pending||!activeNight)return s;
    chooseLodgingMutable(s,cat,compatibilityLodging(s,command.payment));
    activeNight=s.run.flow.night as NightState|null;
    if(s.run.pending||!activeNight)return s;
    if(activeNight.phase==='VoluntaryNightChoice')chooseNightChoiceMutable(s,cat,compatibilitySleepChoice);
    return s;
  }
  if(command.type==='choice'){
    const pending=s.run.pending;if(!pending)throw new Error('Нет активной сцены.');
    const e=cat.events.find(e=>e.id===pending.eventId);
    const sceneChoice=e?.choices.find(c=>c.id===command.id);
    if(pending.allowedChoiceIds&&!pending.allowedChoiceIds.includes(command.id))throw new Error('Выбор не входит в сохранённый snapshot сцены.');
    if(!sceneChoice||!eligible(sceneChoice.conditions,s,cat))throw new Error('Выбор недоступен.');
    const nightPoint=s.run.flow.night?.currentIntercept??null;
    if(nightPoint&&s.run.flow.night)addUnique(s.run.flow.night.handledEventIds,pending.eventId);
    const outcomeRef={kind:'eventChoice' as const,eventId:pending.eventId,choiceId:command.id};
    const beforeMetrics={...s.run.metrics};applyEffectsMutable(s,sceneChoice.effects,cat,true);log(s,sceneChoice.text,outcomeRef);
    if(s.run.lastAction){
      s.run.lastAction.title=e!.title;s.run.lastAction.text=sceneChoice.text;s.run.lastAction.outcomeRef=outcomeRef;
      if(sceneChoice.media)s.run.lastAction.media=sceneChoice.media;
      for(const [k,v] of Object.entries(delta(beforeMetrics,s.run.metrics)))s.run.lastAction.deltas[k]=(s.run.lastAction.deltas[k]??0)+v;
    }
    s.run.pending=null;register(s,cat);
    if(pending.reactionEpochId)s.run.flow.reaction.currentEpochId=pending.reactionEpochId;
    else startReactionEpochMutable(s);
    runResolverBoundary(s,input,cat,[{kind:'choiceResolved',event:pending.eventId,choice:command.id}],false);
    if(nightPoint&&s.run.flow.night&&s.run.pending)applyPendingNightPolicy(s,cat,nightPoint);
    if(s.run.flow.night&&!s.run.pending)resumeNightAfterSceneMutable(s,cat);
    return s;
  }
  if(s.run.pending)throw new Error('Сначала выберите ответ в сцене.');
  if(s.run.flow.night)throw new Error('Сначала завершите ночь.');
  if(s.run.flow.activity)throw new Error('Сначала завершите Activity.');
  if(command.id==='rest')throw new Error('Выберите способ ночлега.');
  const a=cat.definitions.actions.find(a=>a.id===command.id);
  if(!a||!actionAvailable(a,s,cat))throw new Error('Условия действия не выполнены.');
  if(a.id!=='arrival'&&!s.run.flags['story.arrived'])throw new Error('Сначала завершите вступление.');
  const before={...s.run.metrics};
  const cost=actionCost(a,s);
  const freeLesson=a.id==='school'&&s.meta.unlocks.includes('scholar')&&!s.run.flags[`system.scholar.${Math.floor(s.run.day/7)}`];
  if(s.run.metrics.money<cost||s.run.metrics.energy<a.cost.energy)throw new Error('Не хватает денег или энергии.');
  if(a.mode==='brew'&&!['gentle','bold'].includes(command.recipe??''))throw new Error('Выберите способ приготовления.');
  s.run.metrics.money-=cost;s.run.metrics.energy-=a.cost.energy;
  if(a.id===SECRET_DEBT_HIDDEN_WORK_ACTION_ID){
    const result=applySecretDebtHiddenShiftMutable(s);
    log(s,`Заработано: ${result.wage} монет.`);
  }else if(a.id===SECRET_DEBT_REPAY_ACTION_ID){
    repaySecretDebtMutable(s);
    log(s,'Долг погашен полностью: 20000 монет.');
  }else if(a.id===SECRET_DEBT_TAKEOVER_ACTION_ID){
    resolveSecretDebtTakeoverMutable(s);
    log(s,'Вы перехватили контроль над долговым маршрутом.');
  }else{
    applyActionEffectsMutable(s,a.effects,cat);
  }
  if(a.seasonal)applyEffectsMutable(s,a.seasonal[calendar(s.run.day).season],cat,true);
  let ordinaryWage=0;
  if(a.wage){
    const wage=Math.round(a.wage.base+a.wage.weights.reduce((sum,w)=>sum+getMetric(s,w.stat)*w.factor,0));
    applyEffectsMutable(s,[{kind:'metric',key:'money',delta:wage}],cat,true);log(s,`Заработано: ${wage} монет.`);
    ordinaryWage=wage;
  }
  if(ordinaryCareerForShiftAction(a)){
    const matchBonus=applyStrongMetaOrdinaryWorkMutable(s,ordinaryWage,false);
    if(matchBonus>0)log(s,`Strong Meta: заработанный резерв добавил ${matchBonus} монет.`);
  }
  s.run.actionCounts[a.id]=Math.min(1_000_000,(s.run.actionCounts[a.id]??0)+1);
  if(freeLesson)s.run.flags[`system.scholar.${Math.floor(s.run.day/7)}`]=true;
  if(a.mode==='brew'){
    const success=command.recipe==='gentle'||getMetric(s,'alchemy')>=3||(s.run.inventory.scales??0)>0;
    applyEffectsMutable(s,[{kind:'item',id:'herb',delta:-1},{kind:'metric',key:'alchemy',delta:1}],cat,true);
    if(success){applyEffectsMutable(s,[{kind:'item',id:'tonic',delta:command.recipe==='bold'?2:1}],cat,true);log(s,'Микстура готова. Этикетка обещает бодрость, а не бессмертие — хороший знак.');}
    else log(s,'Смесь превратилась в пену. Для быстрого способа нужны весы или мастерство 3. Опыт сохранён.');
  }
  if(a.mode!=='story')s.run.slot++;log(s,`${a.label}. Осталось энергии: ${s.run.metrics.energy}.`);
  const variants=a.scenes?.filter(v=>eligible(v.conditions,s,cat)).sort((a,b)=>b.conditions.length-a.conditions.length);
  const v=variants?.[0];
  s.run.lastAction={id:a.id,title:a.label,text:v?.text??a.description,media:v?.media??['stage.town'],presentationId:presentationIdForActionResult(cat,a.id,v?.media??['stage.town']),deltas:delta(before,s.run.metrics)};
  register(s,cat);
  runResolverBoundary(s,input,cat,[{kind:'actionCompleted',action:a.id}],true);
  return s;
}

function migrateV3(raw:any){
  if(raw.run.day>159)throw new Error('Сохранение M3.2 находится за пределами нового 160-дневного календаря и не мигрируется автоматически.');
  const oldMetrics=raw.run.metrics??{};
  const newStats=Object.fromEntries(stats.map(k=>[k,1])) as Record<Stat,number>;
  newStats.strength=Math.min(100,oldMetrics.strength??1);
  newStats.endurance=Math.min(100,oldMetrics.endurance??1);
  newStats.dexterity=Math.min(100,oldMetrics.dexterity??1);
  newStats.reason=Math.min(100,oldMetrics.intelligence??1);
  newStats.magic=Math.min(100,oldMetrics.magic??1);
  newStats.charm=Math.min(100,oldMetrics.persuasion??1);
  const legacyMetrics={...oldMetrics};
  delete legacyMetrics.money;delete legacyMetrics.energy;
  const oldMeta=raw.meta??{unlocks:[],completed:[],lives:1};
  const migrated:any={
    schemaVersion:4,
    contentVersion:raw.contentVersion??'0.1.0',
    meta:{
      profileVersion:1,
      completedEndings:[...new Set(oldMeta.completed??[])],
      unlocks:[...new Set(oldMeta.unlocks??[])],
      ruleModifiers:{},
      hardWorkProgress:[],
      persistentChoices:{},
      activeLegacyPerks:[],
      appliedResultTransactions:[],
      runsStarted:Math.max(1,oldMeta.lives??1),
      runsCompleted:Math.max(0,Math.min((oldMeta.completed??[]).length,(oldMeta.lives??1)-1))
    },
    run:{
      id:raw.run.id,
      status:raw.run.status==='ended'?'ended':raw.run.status==='expired'?'expired':'active',
      calendar:{elapsedDays:raw.run.day},
      character:{stats:newStats,lust:Math.min(100,oldMetrics.lust??1),creation:{remaining:0,allocated:{},complete:true},conditions:{}},
      resources:{money:Math.max(0,oldMetrics.money??0),inventory:{...(raw.run.inventory??{})}},
      dayState:{energyCurrent:Math.max(0,oldMetrics.energy??3),nextDayModifiers:{energyDelta:0,statEffects:[],tags:[]},optionalOfferIds:[],scheduledEventIds:[]},
      housingState:{current:targetHousing(raw.run.housing??'room'),paidForCurrentNight:false},
      progression:{careers:{},quests:{},relationships:{},school:{tracks:{}},worldFacts:migrateLegacyWorldFacts(raw.run.flags)},
      endings:{
        eligible:[...(raw.run.availableEndings??[])],
        committed:raw.run.acceptedEnding??null,
        result:raw.run.status==='ended'&&raw.run.acceptedEnding?(()=>{
          const ids=resultIdentityFor(raw.run.id,Math.max(1,oldMeta.lives??1),raw.run.acceptedEnding);
          return {resultId:ids.resultId,endingId:raw.run.acceptedEnding,transactionId:ids.transactionId,completedAtDay:raw.run.day,firstCompletion:false,appliedMetaRewardIds:[]};
        })():null
      },
      flow:{pendingScene:raw.run.pending?{...raw.run.pending}:null,reaction:{epochCounter:0,currentEpochId:null,attemptedEventIds:[],cascadeDepth:0,queued:[]},night:null,activity:null,lastAction:raw.run.lastAction??null},
      rngState:{state:(raw.run.rng??2654435761)>>>0},
      historyState:{
        eventHistory:{...(raw.run.history??{})},
        actionCounts:{...(raw.run.actionCounts??{})},
        dayActionCount:Math.max(0,raw.run.slot??0),
        journal:[...(raw.run.journal??[])],
        journalRefs:Array((raw.run.journal??[]).length).fill(null)
      },
      legacyCompat:{source:'m3.2',metrics:legacyMetrics,flags:{...(raw.run.flags??{})},originalLimitDays:raw.run.limitDays}
    }
  };
  if(migrated.run.endings.result){
    const tx=migrated.run.endings.result.transactionId;
    if(!migrated.meta.appliedResultTransactions.includes(tx))migrated.meta.appliedResultTransactions.push(tx);
  }
  return migrated;
}
const D40_SELECTED_ROUTE_FACT_BY_STAGE:Record<string,Record<string,string>>={
  guard:{officer:'ending-route-officer-selected','reform-order':'ending-route-reform-selected',network:'ending-route-network-selected','major-case':'ending-route-major-case-selected'},
  merchant:{'merchant-house':'ending-route-merchant-house-selected','speculator-smuggler':'ending-route-speculator-smuggler-selected','patron-of-routes':'ending-route-patron-routes-selected'},
  'artist-geisha':{'master-artist':'ending-route-master-artist-selected','patron-network':'ending-route-patron-network-selected','court-invitation':'ending-route-court-invitation-selected'},
  assassin:{ghost:'ending-route-ghost-selected','handler-takeover':'ending-route-handler-takeover-selected',turncoat:'ending-route-refusal-turncoat-selected','refusal-chain':'ending-route-refusal-turncoat-selected'},
  prostitute:{'independent-house':'ending-route-independent-house-selected','elite-clientele':'ending-route-elite-clientele-selected','network-protection':'ending-route-network-protection-selected'}
};
function repairD40SelectedRouteFactsMutable(s:Save){
  for(const [career,byStage] of Object.entries(D40_SELECTED_ROUTE_FACT_BY_STAGE)){
    const state=s.run.progression.careers[career];if(!state)continue;
    const fact=byStage[state.stage];if(fact)addUnique(state.facts,fact);
  }
}

export function parseSave(text:string,cat:Catalog,currentMeta?:Meta):Save {
  let raw=JSON.parse(text);
  if(raw.schemaVersion===1){raw.schemaVersion=2;raw.run.actionCounts={work:raw.run.metrics.work};}
  if(raw.schemaVersion===2){
    raw.schemaVersion=3;raw.run.metrics.lust=1;raw.run.metrics.energy=Math.max(0,3-raw.run.slot);
    raw.run.creation={remaining:0,allocated:{},complete:true};raw.run.rng=2654435761;raw.run.lastAction=null;
    raw.run.flags['story.arrived']=true;
  }
  if(raw.schemaVersion===3)raw=migrateV3(raw);
  if(raw.schemaVersion===4){
    raw.meta=raw.meta??{};
    raw.meta.appliedResultTransactions=raw.meta.appliedResultTransactions??[];
    const journal=raw.run?.historyState?.journal;
    if(Array.isArray(journal)){
      const refs=raw.run.historyState.journalRefs;
      if(refs===undefined)raw.run.historyState.journalRefs=Array(journal.length).fill(null);
      else if(!Array.isArray(refs)||refs.length!==journal.length)throw new Error('Некорректные ссылки дневника.');
    }
    const committed=raw.run?.endings?.committed;
    if(raw.run?.status==='ended'&&committed&&!raw.run.endings.result){
      const ids=resultIdentityFor(raw.run.id,Math.max(1,raw.meta.runsStarted??raw.meta.lives??1),committed);
      raw.run.endings.result={resultId:ids.resultId,endingId:committed,transactionId:ids.transactionId,completedAtDay:raw.run.calendar?.elapsedDays??raw.run.day??0,firstCompletion:false,appliedMetaRewardIds:[]};
      if(!raw.meta.appliedResultTransactions.includes(ids.transactionId))raw.meta.appliedResultTransactions.push(ids.transactionId);
    }
    raw.schemaVersion=5;
    raw.meta.unlocks=(raw.meta.unlocks??[]).filter((unlock:string)=>unlock!=='palace');
    raw.run.character.progressionStatCap=100;
    raw.run.character.creation.activeHardWorkPackages=[];
    raw.run.character.creation.hardWorkPackagesApplied=true;
  }
  if(raw.schemaVersion===5){
    raw.meta=raw.meta??{};
    raw.meta.strongMeta=emptyStrongMetaState();
    const legacySnapshot=emptyResolvedStrongMetaSnapshot();
    legacySnapshot.registryVersion='legacy-v5';
    raw.run.strongMetaSnapshot=raw.run?.character?.creation?.complete?legacySnapshot:null;
    raw.run.strongMetaRuntime=emptyStrongMetaRuntime();
    raw.schemaVersion=6;
  }

  // D41 migration runs before reference validation. Only completed legacy Tavern
  // outcomes migrate; uncompleted legacy eligibility/commit state is retired.
  raw.meta=raw.meta??{};
  const rawLegacyD41Unlocks=[...(raw.meta.unlocks??[])];
  let d41Meta=migrateD41MetaData({
    completedEndings:raw.meta.completedEndings??raw.meta.completed??[],
    unlocks:rawLegacyD41Unlocks
  });
  raw.meta.completedEndings=d41Meta.completedEndings;
  raw.meta.unlocks=d41Meta.unlocks;
  let migratedStrongMeta=canonicalStrongMetaState(raw.meta.strongMeta);
  for(const id of d41PendingSpecialistRewardIds(raw.meta.completedEndings,rawLegacyD41Unlocks)){
    migratedStrongMeta=grantStrongMetaReward(migratedStrongMeta,id as ApprovedStrongRewardId);
  }
  raw.meta.strongMeta=migratedStrongMeta;

  const rawEndings=raw.run?.endings;
  if(rawEndings){
    rawEndings.eligible=(rawEndings.eligible??[]).filter((id:string)=>!isRetiredD41TavernEnding(id));
    const committed=rawEndings.committed as string|null|undefined;
    const resultEnding=rawEndings.result?.endingId as string|undefined;
    const historicalLegacy=resultEnding&&isRetiredD41TavernEnding(resultEnding);
    if(raw.run?.status==='ended'&&historicalLegacy){
      const canonical=canonicalD41EndingId(resultEnding!);
      rawEndings.committed=canonical;
      rawEndings.result.endingId=canonical;
      if(!raw.meta.completedEndings.includes(canonical))raw.meta.completedEndings.push(canonical);
      d41Meta=migrateD41MetaData({completedEndings:raw.meta.completedEndings,unlocks:raw.meta.unlocks});
      raw.meta.completedEndings=d41Meta.completedEndings;
      raw.meta.unlocks=d41Meta.unlocks;
      for(const id of d41PendingSpecialistRewardIds(raw.meta.completedEndings,rawLegacyD41Unlocks)){
        raw.meta.strongMeta=grantStrongMetaReward(raw.meta.strongMeta,id as ApprovedStrongRewardId);
      }
    }else if(committed&&isRetiredD41TavernEnding(committed)){
      rawEndings.committed=null;
      rawEndings.result=null;
      if(raw.run?.status==='ending_committed')raw.run.status='active';
    }
  }

  const parsed=saveSchema.parse(raw) as unknown as Save;
  const s=attachLegacyFacade(parsed);
  repairD40SelectedRouteFactsMutable(s);
  s.meta.unlocks=s.meta.unlocks.filter(unlock=>unlock!=='palace');
  if(s.run.strongMetaSnapshot)validateResolvedStrongMetaSnapshot(s.run.strongMetaSnapshot);
  validateStrongMetaRuntimeAgainstSnapshot(s.run.strongMetaSnapshot,s.run.strongMetaRuntime);
  validateSecretDebtState(s.run.secretDebt);
  if(s.run.strongMetaRuntime.workRhythmAppliedDay!==null&&s.run.strongMetaRuntime.workRhythmAppliedDay>s.run.day)throw new Error('Work Rhythm applied day cannot be in the future.');
  for(const stat of stats)if(s.run.character.stats[stat]>effectiveProgressionStatCap(s))throw new Error(`Характеристика ${stat} превышает эффективный потолок.`);
  if(s.run.metrics.energy>energyMax(s))throw new Error('Некорректный запас энергии.');
  if(!s.run.creation.complete&&s.run.creation.remaining+Object.values(s.run.creation.allocated).reduce((a,b)=>a+b,0)!==10)throw new Error('Некорректные стартовые очки.');
  if(s.run.lastAction&&s.run.lastAction.id!==SCHOOL_ACTION_ID&&!cat.definitions.actions.some(a=>a.id===s.run.lastAction!.id))throw new Error('Неизвестное последнее занятие.');
  if(s.run.lastAction?.media.some(id=>!cat.media.some(m=>m.id===id)))throw new Error('Неизвестное медиа последнего занятия.');
  const actions=new Set([...cat.definitions.actions.map(a=>a.id),SCHOOL_ACTION_ID]);
  for(const id of Object.keys(s.run.actionCounts))if(!actions.has(id))throw new Error(`Неизвестный счётчик ${id}`);
  for(const [kind,map,defs] of [
    ['career',s.run.progression.careers,cat.definitions.careers??[]],
    ['quest',s.run.progression.quests,cat.definitions.quests??[]],
    ['relationship',s.run.progression.relationships,cat.definitions.relationships??[]]
  ] as const){
    for(const [machineId,state] of Object.entries(map)){
      const def=defs.find(x=>x.id===machineId);
      if(!def)throw new Error(`Неизвестная ${kind} state machine в сохранении: ${machineId}`);
      if(!def.stages.includes(state.stage))throw new Error(`Неизвестный stage в сохранении: ${kind}.${machineId}.${state.stage}`);
    }
  }
  const knownSchoolTracks=new Set(SCHOOL_COURSES.map(course=>course.trackId));
  for(const [trackId,track] of Object.entries(s.run.progression.school.tracks)){
    if(track.trackId!==trackId)throw new Error(`School track key mismatch: ${trackId}`);
    if(!knownSchoolTracks.has(trackId))throw new Error(`Неизвестный School track в сохранении: ${trackId}`);
  }
  const knownFlags=new Set(cat.definitions.flags);
  for(const flag of Object.keys(s.run.flags))if(!knownFlags.has(flag)&&!/^system\.scholar\.\d+$/.test(flag))throw new Error(`Неизвестный флаг ${flag}`);
  const endingIds=new Set(cat.definitions.endings.map(e=>e.id));
  const referencedEndings=[
    ...s.run.availableEndings,
    ...s.meta.completed,
    ...(s.run.acceptedEnding?[s.run.acceptedEnding]:[]),
    ...(s.run.endings.result?[s.run.endings.result.endingId]:[])
  ];
  if(referencedEndings.some(id=>!endingIds.has(id)))throw new Error('Неизвестная судьба.');
  if(new Set(s.meta.appliedResultTransactions).size!==s.meta.appliedResultTransactions.length)throw new Error('Дублированный Meta transaction proof.');
  if(s.run.status==='active'&&(s.run.endings.committed||s.run.endings.result))throw new Error('Active run не может иметь committed/result ending.');
  if(s.run.status==='ending_committed'&&(!s.run.endings.committed||s.run.endings.result))throw new Error('Некорректный ending_committed state.');
  if(s.run.status==='ended'&&(!s.run.endings.committed||!s.run.endings.result))throw new Error('Ended run обязан иметь committed ending и RunResult.');
  if(s.run.status==='expired'&&(s.run.endings.committed||s.run.endings.result))throw new Error('Expired run не может содержать committed/result ending.');
  if(s.run.endings.result){
    const result=s.run.endings.result;
    if(result.endingId!==s.run.endings.committed)throw new Error('RunResult ending не совпадает с committed ending.');
    if(!s.meta.appliedResultTransactions.includes(result.transactionId))throw new Error('RunResult не имеет Meta transaction proof.');
    if(!s.meta.completedEndings.includes(result.endingId))throw new Error('RunResult ending отсутствует в completed Meta.');
    if(new Set(result.appliedMetaRewardIds).size!==result.appliedMetaRewardIds.length)throw new Error('RunResult содержит повтор reward ID.');
  }
  if(s.run.pending){
    const e=cat.events.find(e=>e.id===s.run.pending!.eventId);
    if(!e?.variants.some(v=>v.id===s.run.pending!.variantId))throw new Error('Неизвестная сцена сохранения.');
    if(s.run.pending.allowedChoiceIds){
      if(!s.run.pending.allowedChoiceIds.length||s.run.pending.allowedChoiceIds.some(id=>!e.choices.some(c=>c.id===id)))throw new Error('Некорректный snapshot выборов pending scene.');
    }else if(!e.choices.some(c=>eligible(c.conditions,s,cat)))throw new Error('Сцена не имеет доступного выбора.');
  }
  for(const q of s.run.flow.reaction.queued){
    const e=cat.events.find(e=>e.id===q.eventId);
    if(!e||!e.variants.some(v=>v.id===q.variantId)||!q.allowedChoiceIds.length||q.allowedChoiceIds.some(id=>!e.choices.some(c=>c.id===id)))throw new Error('Некорректная queued reaction instance.');
    if(q.kind==='scheduled'&&q.expiresDay===undefined)throw new Error('Scheduled instance без срока.');
  }
  const queuedById=new Map(s.run.flow.reaction.queued.map(q=>[q.instanceId,q]));
  if(s.run.dayState.optionalOfferIds.some(id=>queuedById.get(id)?.kind!=='optional'))throw new Error('Некорректная optional offer ссылка.');
  if(s.run.dayState.scheduledEventIds.some(id=>queuedById.get(id)?.kind!=='scheduled'))throw new Error('Некорректная scheduled event ссылка.');
  if(s.run.flow.activity){
    const a=s.run.flow.activity;
    if(s.run.flow.night||s.run.pending)throw new Error('ActivityEnvelope не может сосуществовать с NightFlow или global pending scene.');
    const definition=cat.definitions.activities.find(x=>x.id===a.activityId);
    if(!definition)throw new Error(`Неизвестная Activity в сохранении: ${a.activityId}`);
    if(definition.version!==a.definitionVersion)throw new Error(`Несовместимая версия Activity: ${a.activityId}`);
    if(definition.adapter!==a.adapter)throw new Error(`Несовместимый Activity adapter: ${a.activityId}`);
    if(a.status!=='active')throw new Error('Нестабильное resolving Activity состояние не может быть загружено.');
    if(a.startedDay>s.run.day)throw new Error('Activity начата в будущем календаря.');
    if(definition.timePolicy==='same_day'&&a.startedDay!==s.run.day)throw new Error('same_day Activity не может пережить CalendarAdvance.');
    if(a.internalState.endurance>definition.adapterConfig.initialEndurance)throw new Error('Некорректный internal Endurance Activity.');
    if(a.internalState.progress>=definition.adapterConfig.successAtProgress)throw new Error('Activity должна была завершиться success до сохранения.');
    if(a.internalState.endurance<=definition.adapterConfig.failAtEndurance)throw new Error('Activity должна была завершиться failure до сохранения.');
    if(a.accumulatedRewards.length||a.emittedFacts.length)throw new Error('Активная synthetic Activity не должна содержать уже committed result.');
  }
  if(s.run.flow.night){
    const n=s.run.flow.night;
    if(!n.calendarAdvanceCommitted&&n.startedDay!==s.run.day)throw new Error('NightFlow привязан к другому календарному дню.');
    if(n.calendarAdvanceCommitted&&s.run.day!==Math.min(159,n.startedDay+1))throw new Error('NightFlow имеет некорректный calendar advance.');
    if(n.selectedLodgingId&&!n.selectedLodgingId.startsWith('legacy.')&&!cat.definitions.lodgings.some(x=>x.id===n.selectedLodgingId))throw new Error('Неизвестный lodging NightFlow.');
    if(n.selectedNightChoiceId&&!n.selectedNightChoiceId.startsWith('legacy.')&&!cat.definitions.nightChoices.some(x=>x.id===n.selectedNightChoiceId))throw new Error('Неизвестный night choice NightFlow.');
    if(n.lodgingPaymentCommitted&&!n.selectedLodgingId)throw new Error('NightFlow оплатил неизвестный ночлег.');
    if(['PostLodgingForcedCheck','VoluntaryNightChoice'].includes(n.phase)&&!n.suppressLodgingPayment&&!n.lodgingPaymentCommitted)throw new Error('NightFlow прошёл lodging без commit оплаты.');
    if(n.currentIntercept&&!['NightEventResolution'].includes(n.phase))throw new Error('NightFlow intercept вне event resolution.');
    if(s.run.pending&&n.currentIntercept){
      const e=cat.events.find(x=>x.id===s.run.pending!.eventId);
      if(e?.nightPolicy&&e.nightPolicy.intercept!==n.currentIntercept)throw new Error('Pending night event не соответствует intercept.');
    }
  }
  for(const [eventId,h] of Object.entries(s.run.history)){
    const e=cat.events.find(e=>e.id===eventId);
    if(!e||h.lastDay>s.run.day||Object.entries(h.variants).some(([variantId,day])=>day>s.run.day||!e.variants.some(v=>v.id===variantId)))throw new Error('Некорректная история сцен.');
  }
  if(currentMeta){
    const current=defaultMeta(currentMeta);
    s.meta.completedEndings=[...new Set([...current.completedEndings,...s.meta.completedEndings])];
    s.meta.unlocks=[...new Set([...current.unlocks,...s.meta.unlocks])].filter(unlock=>unlock!=='palace');
    s.meta.hardWorkProgress=[...new Set([...current.hardWorkProgress,...s.meta.hardWorkProgress])];
    s.meta.strongMeta=canonicalStrongMetaState({
      ownership:{ownedRewardIds:[...new Set([...current.strongMeta.ownership.ownedRewardIds,...s.meta.strongMeta.ownership.ownedRewardIds])]},
      knowledge:{inheritedKnowledgeIds:[...new Set([...current.strongMeta.knowledge.inheritedKnowledgeIds,...s.meta.strongMeta.knowledge.inheritedKnowledgeIds])]},
      preferredSelection:structuredClone(current.strongMeta.preferredSelection)
    });
    s.meta.appliedResultTransactions=[...new Set([...current.appliedResultTransactions,...s.meta.appliedResultTransactions])];
    s.meta.runsStarted=Math.max(current.runsStarted,s.meta.runsStarted);
    s.meta.runsCompleted=Math.max(current.runsCompleted,s.meta.runsCompleted);
    s.meta.ruleModifiers={...s.meta.ruleModifiers,...current.ruleModifiers};
    s.meta.persistentChoices={...s.meta.persistentChoices,...current.persistentChoices};
    s.meta.activeLegacyPerks=[...new Set([...s.meta.activeLegacyPerks,...current.activeLegacyPerks])];
    attachMetaFacade(s.meta);
  }
  s.run.creation.activeHardWorkPackages=validateHardWorkPackageSelection(
    s.run.creation.activeHardWorkPackages,
    s.meta.hardWorkProgress
  );
  if(s.run.creation.complete&&!s.run.creation.hardWorkPackagesApplied)throw new Error('Завершённое создание должно иметь зафиксированный Hard Work package state.');
  if(!s.run.creation.complete&&s.run.creation.hardWorkPackagesApplied&&s.run.creation.activeHardWorkPackages.length)throw new Error('Legacy-settled создание не может содержать активные Hard Work пакеты.');
  if(s.run.creation.complete&&!s.run.strongMetaSnapshot)throw new Error('Завершённое создание должно иметь Strong Meta snapshot.');
  if(!s.run.creation.complete&&s.run.strongMetaSnapshot)throw new Error('Незавершённое создание не может иметь Strong Meta snapshot.');
  return s;
}
