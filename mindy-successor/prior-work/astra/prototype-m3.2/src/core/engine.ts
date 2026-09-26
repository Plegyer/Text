import { metrics, stats, seasons, saveSchema, type Stat, type Save, type Meta, type Condition, type Effect, type Catalog, type StoryEvent, type Action, type MachineDefinition } from './schema.ts';

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

function defaultLegacyMetrics(){
  return {
    perception:1,empathy:1,composure:1,organization:1,
    health:100,stress:0,debt:0,work:0,lessons:0,alchemy:0,trust:0
  } as Record<string,number>;
}

function defaultMeta(input?:Partial<Meta>&{completed?:string[];lives?:number}):Meta {
  const completed=[...new Set(input?.completedEndings??input?.completed??[])];
  const runsStarted=Math.max(1,input?.runsStarted??input?.lives??1);
  const core={
    profileVersion:input?.profileVersion??1,
    completedEndings:completed,
    unlocks:[...new Set(input?.unlocks??[])],
    ruleModifiers:structuredClone(input?.ruleModifiers??{}),
    hardWorkProgress:[...new Set(input?.hardWorkProgress??[])],
    persistentChoices:structuredClone(input?.persistentChoices??{}),
    activeLegacyPerks:[...new Set(input?.activeLegacyPerks??[])],
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
export function setMetric(s:Save,key:string,value:number){
  if(statSet.has(key)){s.run.character.stats[key as Stat]=Math.min(100,Math.max(0,Math.trunc(value)));return;}
  const alias=safeAlias[key];if(alias){s.run.character.stats[alias]=Math.min(100,Math.max(0,Math.trunc(value)));return;}
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
  if(!Object.getOwnPropertyDescriptor(r,'journal'))defineCompat(r,'journal',()=>r.historyState.journal,(v:string[])=>{r.historyState.journal=v;});
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
  const existing=domainMap(s,kind)[id];if(existing)return existing;
  const def=machineDefinition(cat,kind,id);if(!def)return undefined;
  return {stage:def.initialStage,counters:{},choices:{},facts:[],...(kind==='career'?{shifts:0}:{})};
}
function ensureDomainState(s:Save,kind:DomainKind,id:string,cat:Catalog):DomainState{
  const map=domainMap(s,kind),existing=map[id];if(existing)return existing;
  const def=machineDefinition(cat,kind,id);if(!def)throw new Error(`Неизвестная ${kind} state machine: ${id}`);
  const created={stage:def.initialStage,counters:{},choices:{},facts:[],...(kind==='career'?{shifts:0}:{})};
  map[id]=created;return created;
}

export function meets(c:Condition,s:Save,cat?:Catalog):boolean {
  const cal=()=>calendar(s.run.day);
  switch(c.kind){
    case 'stat': return compare(s.run.character.stats[c.stat],c.op,c.value);
    case 'resource': return compare(s.run.resources[c.resource],c.op,c.value);
    case 'itemCount': return compare(s.run.resources.inventory[c.id]??0,c.op,c.count);
    case 'calendarYear': return compare(cal().year,c.op,c.value);
    case 'calendarSeason': return cal().season===c.value;
    case 'calendarDayInYear': return compare(cal().dayInYear,c.op,c.value);
    case 'calendarElapsedDays': return compare(s.run.calendar.elapsedDays,c.op,c.value);
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

export function actionCost(a:Action,s:Save){
  if(a.id==='repay')return Math.min(a.cost.money,getMetric(s,'debt'));
  return a.id==='school'&&s.meta.unlocks.includes('scholar')&&!s.run.flags[`system.scholar.${Math.floor(s.run.day/7)}`]?0:a.cost.money;
}

export function freshSave(metaInput?:Partial<Meta>&{completed?:string[];lives?:number}):Save {
  const meta=defaultMeta(metaInput);
  const statRecord=Object.fromEntries(stats.map(k=>[k,1])) as Record<Stat,number>;
  const save={
    schemaVersion:4 as const,
    contentVersion:'0.1.0',
    meta,
    run:{
      id:`life-${meta.runsStarted}`,
      status:'active' as const,
      calendar:{elapsedDays:0},
      character:{stats:statRecord,lust:1,creation:{remaining:10,allocated:{},complete:false},conditions:{}},
      resources:{money:600,inventory:{herb:2,tonic:0,scales:0}},
      dayState:{energyCurrent:3,nextDayModifiers:{energyDelta:0,statEffects:[],tags:[]},optionalOfferIds:[],scheduledEventIds:[]},
      housingState:{current:'normal' as const,paidForCurrentNight:false},
      progression:{careers:{},quests:{},relationships:{},worldFacts:[]},
      endings:{eligible:[],committed:null,result:null},
      flow:{pendingScene:null,night:null,activity:null,lastAction:null},
      rngState:{state:(meta.runsStarted*2654435761)>>>0},
      historyState:{eventHistory:{},actionCounts:{},dayActionCount:0,journal:['Белый суслик, открытый люк и совершенно незнакомое небо. Ваша новая жизнь начинается в Листограде.']},
      legacyCompat:{source:'m3.2' as const,metrics:defaultLegacyMetrics(),flags:{}}
    }
  } as unknown as Save;
  const s=attachLegacyFacade(save);
  // Old M3.2 unlock IDs are retained for demo compatibility, but obsolete
  // starting-stat rewards are intentionally not projected into target stats.
  s.run.dayState.energyCurrent=energyMax(s);
  return s;
}

function delta(before:Record<string,number>,after:Record<string,number>){
  return Object.fromEntries((metrics as readonly string[]).filter(k=>(after[k]??0)!==(before[k]??0)&&k!=='stress').map(k=>[k,(after[k]??0)-(before[k]??0)]));
}
function log(s:Save,text:string){s.run.journal.push(text);s.run.journal=s.run.journal.slice(-160);}

function addUnique(target:string[],value:string){if(!target.includes(value))target.push(value);}
function removeValue(target:string[],value:string){const i=target.indexOf(value);if(i>=0)target.splice(i,1);}
function effectPhase(e:Effect){
  if(['modifyStat','modifyResource','modifyEnergy','addItem','removeItem','setHousing','metric','item','housing','flag'].includes(e.kind))return 1;
  if(['incrementCareerCounter','addCareerFact','setCareerChoice','incrementQuestCounter','addQuestFact','setQuestChoice','incrementRelationshipCounter','addRelationshipFact','setRelationshipChoice','addWorldFact','removeWorldFact'].includes(e.kind))return 2;
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
export function applyEffects(input:Save,effects:Effect[],cat:Catalog):Save{
  const s=cloneSave(input);applyEffectsMutable(s,effects,cat,true);return s;
}

export function availableVariants(e:StoryEvent,s:Save,cat?:Catalog){
  const h=s.run.history[e.id];
  return e.variants.filter(v=>eligible(v.conditions,s,cat)&&(h?.variants[v.id]===undefined||s.run.day-h.variants[v.id]>=e.variantCooldownDays));
}

function schedule(s:Save,cat:Catalog,trigger:string){
  const candidates=cat.events.filter(e=>{
    const h=s.run.history[e.id];
    return e.trigger.includes(trigger)&&eligible(e.conditions,s,cat)&&(!h||(h.count<e.maxShows&&s.run.day-h.lastDay>=e.cooldownDays))&&availableVariants(e,s,cat).length>0&&e.choices.some(c=>eligible(c.conditions,s,cat));
  }).sort((a,b)=>b.priority-a.priority||(s.run.history[a.id]?.lastDay??-1)-(s.run.history[b.id]?.lastDay??-1)||a.id.localeCompare(b.id));
  const event=candidates.find(e=>!e.chance||random(s)<eventChance(e,s));if(!event)return;
  const variants=availableVariants(event,s,cat).sort((a,b)=>b.conditions.length-a.conditions.length||(s.run.history[event.id]?.variants[a.id]??-1)-(s.run.history[event.id]?.variants[b.id]??-1));
  const v=variants[0];
  const h=s.run.history[event.id]??{count:0,lastDay:0,variants:{}};
  h.count++;h.lastDay=s.run.day;h.variants[v.id]=s.run.day;s.run.history[event.id]=h;
  s.run.pending={eventId:event.id,variantId:v.id};log(s,`${event.title}: ${v.text}`);
}

function register(s:Save,cat:Catalog){
  for(const e of cat.definitions.endings)if(eligible(e.conditions,s,cat)&&!s.run.availableEndings.includes(e.id)){
    s.run.availableEndings.push(e.id);log(s,`Новая судьба: «${e.title}». Можно продолжать жизнь или принять её.`);
  }
}

export function energyMax(s:Save){
  const modifier=Number(s.meta.ruleModifiers['energy.daily']??0);
  return Math.max(1,3+modifier+(s.meta.unlocks.includes('vitality')?1:0));
}
export function rent(s:Save){
  const base=100;
  return s.meta.unlocks.includes('guild')?Math.ceil(base/2):base;
}
export function favorStat(s:Save):Stat{return ({spring:'strength',summer:'magic',autumn:'charm',winter:'endurance'} as const)[calendar(s.run.day).season];}
export function eventChance(e:StoryEvent,s:Save){return e.chance?Math.min(e.chance.max,e.chance.base+getMetric(s,e.chance.stat)*e.chance.perPoint):1;}
function random(s:Save){s.run.rng=(Math.imul(s.run.rng,1664525)+1013904223)>>>0;return s.run.rng/4294967296;}
function settle(s:Save,cat:Catalog){register(s,cat);}

export type Command=
  |{type:'action';id:string;recipe?:'gentle'|'bold'}
  |{type:'choice';id:string}
  |{type:'accept';id:string}
  |{type:'newLife'}
  |{type:'restart'}
  |{type:'allocate';stat:Stat;delta:1|-1}
  |{type:'finishCreation'}
  |{type:'sleep';payment:'money'|'favor'|'outside'};

export function dispatch(input:Save,command:Command,cat:Catalog):Save {
  const s=cloneSave(input);
  if(command.type==='restart'){
    const meta=defaultMeta(s.meta);meta.runsStarted++;return freshSave(meta);
  }
  if(command.type==='newLife'){
    if(s.run.status==='active')throw new Error('Сначала примите судьбу или дождитесь окончания срока.');
    const meta=defaultMeta(s.meta);meta.runsStarted++;return freshSave(meta);
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
    s.run.creation.complete=true;return s;
  }
  if(!s.run.creation.complete)throw new Error('Сначала создайте героиню.');
  if(command.type==='accept'){
    if(s.run.status==='ended'||s.run.pending)throw new Error('Завершите текущую сцену.');
    const ending=cat.definitions.endings.find(e=>e.id===command.id);
    if(!ending||!s.run.availableEndings.includes(ending.id)||!eligible(ending.conditions,s,cat))throw new Error('Эта судьба сейчас недоступна.');
    s.run.status='ended';s.run.acceptedEnding=ending.id;
    if(!s.meta.completed.includes(ending.id))s.meta.completed.push(ending.id);
    if(!s.meta.unlocks.includes(ending.reward))s.meta.unlocks.push(ending.reward);
    s.meta.runsCompleted=Math.min(1_000_000,s.meta.runsCompleted+1);
    log(s,ending.epilogue);return s;
  }
  if(s.run.status!=='active')throw new Error('Эта жизнь завершена.');
  if(command.type==='sleep'){
    if(s.run.pending)throw new Error('Завершите событие перед сном.');
    if(!s.run.flags['story.arrived'])throw new Error('Сначала завершите вступление.');
    if(s.run.day+1>=160){s.run.status='expired';log(s,'Четыре года истекли. Выберите открытую судьбу или начните следующую жизнь.');return s;}
    const before={...s.run.metrics};let text='';
    if(command.payment==='money'){
      if(s.run.metrics.money<rent(s))throw new Error('Не хватает монет на ночлег.');
      s.run.metrics.money-=rent(s);s.run.housing='room';text='Комната оплачена. Силан пожелал доброй ночи и пересчитал ключи.';
    }else if(command.payment==='favor'){
      const stat=favorStat(s);if(s.run.metrics[stat]<1)throw new Error('Не хватает сил для помощи хозяину.');
      s.run.metrics[stat]--;s.run.housing='room';text='Вы помогли Силану по хозяйству вместо платы за комнату.';
    }else if(command.payment==='outside'){
      s.run.housing='shelter';s.run.character.stats.grooming=Math.max(0,s.run.character.stats.grooming-1);
      text='Ночь под навесом. Сон был коротким: завтра на одно дело меньше.';
    }else throw new Error('Неизвестный способ ночлега.');
    s.run.day++;s.run.slot=0;
    const queued=s.run.dayState.nextDayModifiers;
    for(const effect of queued.statEffects)setMetric(s,effect.stat,getMetric(s,effect.stat)+effect.delta);
    s.run.metrics.energy=Math.max(1,energyMax(s)+queued.energyDelta-(command.payment==='outside'?1:0));
    s.run.dayState.nextDayModifiers={energyDelta:0,statEffects:[],tags:[]};
    s.run.lastAction={id:'rest',title:'Новое утро',text,media:[command.payment==='outside'?'stage.outside':'stage.room'],deltas:delta(before,s.run.metrics)};
    log(s,text);register(s,cat);return s;
  }
  if(command.type==='choice'){
    const e=cat.events.find(e=>e.id===s.run.pending?.eventId);
    const c=e?.choices.find(c=>c.id===command.id);
    if(!c||!eligible(c.conditions,s,cat))throw new Error('Выбор недоступен.');
    const before={...s.run.metrics};applyEffectsMutable(s,c.effects,cat,true);log(s,c.text);
    if(s.run.lastAction){
      s.run.lastAction.title=e!.title;s.run.lastAction.text=c.text;
      if(c.media)s.run.lastAction.media=c.media;
      for(const [k,v] of Object.entries(delta(before,s.run.metrics)))s.run.lastAction.deltas[k]=(s.run.lastAction.deltas[k]??0)+v;
    }
    s.run.pending=null;settle(s,cat);return s;
  }
  if(s.run.pending)throw new Error('Сначала выберите ответ в сцене.');
  if(command.id==='rest')throw new Error('Выберите способ ночлега.');
  const a=cat.definitions.actions.find(a=>a.id===command.id);
  if(!a||!eligible(a.conditions,s,cat))throw new Error('Условия действия не выполнены.');
  if(a.id!=='arrival'&&!s.run.flags['story.arrived'])throw new Error('Сначала завершите вступление.');
  const before={...s.run.metrics};
  const cost=actionCost(a,s);
  const freeLesson=a.id==='school'&&s.meta.unlocks.includes('scholar')&&!s.run.flags[`system.scholar.${Math.floor(s.run.day/7)}`];
  if(s.run.metrics.money<cost||s.run.metrics.energy<a.cost.energy)throw new Error('Не хватает денег или энергии.');
  if(a.mode==='brew'&&!['gentle','bold'].includes(command.recipe??''))throw new Error('Выберите способ приготовления.');
  s.run.metrics.money-=cost;s.run.metrics.energy-=a.cost.energy;
  applyEffectsMutable(s,a.effects,cat,true);
  if(a.seasonal)applyEffectsMutable(s,a.seasonal[calendar(s.run.day).season],cat,true);
  if(a.wage){
    const wage=Math.round(a.wage.base+a.wage.weights.reduce((sum,w)=>sum+getMetric(s,w.stat)*w.factor,0));
    applyEffectsMutable(s,[{kind:'metric',key:'money',delta:wage}],cat,true);log(s,`Заработано: ${wage} монет.`);
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
  s.run.lastAction={id:a.id,title:a.label,text:v?.text??a.description,media:v?.media??['stage.town'],deltas:delta(before,s.run.metrics)};
  schedule(s,cat,a.id);settle(s,cat);return s;
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
  return {
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
      progression:{careers:{},quests:{},relationships:{},worldFacts:[]},
      endings:{eligible:[...(raw.run.availableEndings??[])],committed:raw.run.acceptedEnding??null,result:null},
      flow:{pendingScene:raw.run.pending?{...raw.run.pending}:null,night:null,activity:null,lastAction:raw.run.lastAction??null},
      rngState:{state:(raw.run.rng??2654435761)>>>0},
      historyState:{
        eventHistory:{...(raw.run.history??{})},
        actionCounts:{...(raw.run.actionCounts??{})},
        dayActionCount:Math.max(0,raw.run.slot??0),
        journal:[...(raw.run.journal??[])]
      },
      legacyCompat:{source:'m3.2',metrics:legacyMetrics,flags:{...(raw.run.flags??{})},originalLimitDays:raw.run.limitDays}
    }
  };
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
  const parsed=saveSchema.parse(raw) as unknown as Save;
  const s=attachLegacyFacade(parsed);
  if(s.run.metrics.energy>energyMax(s))throw new Error('Некорректный запас энергии.');
  if(!s.run.creation.complete&&s.run.creation.remaining+Object.values(s.run.creation.allocated).reduce((a,b)=>a+b,0)!==10)throw new Error('Некорректные стартовые очки.');
  if(s.run.lastAction&&!cat.definitions.actions.some(a=>a.id===s.run.lastAction!.id))throw new Error('Неизвестное последнее занятие.');
  if(s.run.lastAction?.media.some(id=>!cat.media.some(m=>m.id===id)))throw new Error('Неизвестное медиа последнего занятия.');
  const actions=new Set(cat.definitions.actions.map(a=>a.id));
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
  const knownFlags=new Set(cat.definitions.flags);
  for(const flag of Object.keys(s.run.flags))if(!knownFlags.has(flag)&&!/^system\.scholar\.\d+$/.test(flag))throw new Error(`Неизвестный флаг ${flag}`);
  const endingIds=new Set(cat.definitions.endings.map(e=>e.id));
  if([...s.run.availableEndings,...s.meta.completed,...(s.run.acceptedEnding?[s.run.acceptedEnding]:[])].some(id=>!endingIds.has(id)))throw new Error('Неизвестная судьба.');
  if(s.run.status==='ended'&&!s.run.acceptedEnding)throw new Error('Нет принятой судьбы.');
  if(s.run.pending){
    const e=cat.events.find(e=>e.id===s.run.pending!.eventId);
    if(!e?.variants.some(v=>v.id===s.run.pending!.variantId))throw new Error('Неизвестная сцена сохранения.');
    if(!e.choices.some(c=>eligible(c.conditions,s,cat)))throw new Error('Сцена не имеет доступного выбора.');
  }
  for(const [eventId,h] of Object.entries(s.run.history)){
    const e=cat.events.find(e=>e.id===eventId);
    if(!e||h.lastDay>s.run.day||Object.entries(h.variants).some(([variantId,day])=>day>s.run.day||!e.variants.some(v=>v.id===variantId)))throw new Error('Некорректная история сцен.');
  }
  if(currentMeta){
    const current=defaultMeta(currentMeta);
    s.meta.completedEndings=[...new Set([...current.completedEndings,...s.meta.completedEndings])];
    s.meta.unlocks=[...new Set([...current.unlocks,...s.meta.unlocks])];
    s.meta.hardWorkProgress=[...new Set([...current.hardWorkProgress,...s.meta.hardWorkProgress])];
    s.meta.runsStarted=Math.max(current.runsStarted,s.meta.runsStarted);
    s.meta.runsCompleted=Math.max(current.runsCompleted,s.meta.runsCompleted);
    s.meta.ruleModifiers={...s.meta.ruleModifiers,...current.ruleModifiers};
    s.meta.persistentChoices={...s.meta.persistentChoices,...current.persistentChoices};
    s.meta.activeLegacyPerks=[...new Set([...s.meta.activeLegacyPerks,...current.activeLegacyPerks])];
    attachMetaFacade(s.meta);
  }
  return s;
}
