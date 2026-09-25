import { metrics, stats, seasons, saveSchema, type Save, type Meta, type Condition, type Effect, type Catalog, type StoryEvent, type Action, type Stat } from './schema.ts';

const TARGET_LIMIT_DAYS=160;
const TARGET_STAT_SET=new Set<string>(stats);
const LEGACY_SAFE_ALIAS:Record<string,Stat>={intelligence:'reason',persuasion:'charm'};
const DEFAULT_LEGACY_METRICS=['perception','empathy','composure','organization','health','stress','debt','work','lessons','alchemy','trust'];

function clamp(v:number,min:number,max:number){return Math.min(max,Math.max(min,v));}
function ensureLegacy(run:Save['run']){
  if(!run.legacyCompat)run.legacyCompat={source:'m3.2',metrics:{},flags:{}};
  return run.legacyCompat;
}
function getMetric(s:Save,key:string):number{
  if(TARGET_STAT_SET.has(key))return s.run.character.stats[key as Stat];
  const alias=LEGACY_SAFE_ALIAS[key];if(alias)return s.run.character.stats[alias];
  if(key==='lust')return s.run.character.lust;
  if(key==='money')return s.run.resources.money;
  if(key==='energy')return s.run.dayState.energyCurrent;
  return ensureLegacy(s.run).metrics[key]??0;
}
function setMetric(s:Save,key:string,value:number){
  if(TARGET_STAT_SET.has(key)){s.run.character.stats[key as Stat]=clamp(Math.trunc(value),0,100);return;}
  const alias=LEGACY_SAFE_ALIAS[key];if(alias){s.run.character.stats[alias]=clamp(Math.trunc(value),0,100);return;}
  if(key==='lust'){s.run.character.lust=clamp(Math.trunc(value),0,100);return;}
  if(key==='money'){s.run.resources.money=clamp(Math.trunc(value),0,1_000_000);return;}
  if(key==='energy'){s.run.dayState.energyCurrent=clamp(Math.trunc(value),0,100);return;}
  ensureLegacy(s.run).metrics[key]=clamp(Math.trunc(value),0,1_000_000);
}
function legacyMetricProxy(s:Save){
  return new Proxy({} as Record<string,number>,{
    get:(_t,p)=>typeof p==='string'?getMetric(s,p):undefined,
    set:(_t,p,v)=>{if(typeof p!=='string'||typeof v!=='number')return false;setMetric(s,p,v);return true;},
    ownKeys:()=>[...metrics],
    getOwnPropertyDescriptor:()=>({enumerable:true,configurable:true}),
    has:(_t,p)=>typeof p==='string'&&metrics.includes(p)
  });
}
function toLegacyHousing(v:Save['run']['housingState']['current']):'room'|'hostel'|'shelter'{return v==='normal'?'room':v==='cheap'?'hostel':'shelter';}
function fromLegacyHousing(v:'room'|'hostel'|'shelter'):Save['run']['housingState']['current']{return v==='room'?'normal':v==='hostel'?'cheap':'street';}

export function attachCompatibility(input:Save):Save{
  const s=input;
  const metricView=legacyMetricProxy(s);
  Object.defineProperties(s.run,{
    day:{get:()=>s.run.calendar.elapsedDays,set:(v:number)=>{s.run.calendar.elapsedDays=clamp(Math.trunc(v),0,159);},enumerable:false,configurable:true},
    slot:{get:()=>s.run.historyState.dayActionCount,set:(v:number)=>{s.run.historyState.dayActionCount=clamp(Math.trunc(v),0,1000);},enumerable:false,configurable:true},
    limitDays:{get:()=>TARGET_LIMIT_DAYS,enumerable:false,configurable:true},
    housing:{get:()=>toLegacyHousing(s.run.housingState.current),set:(v:'room'|'hostel'|'shelter')=>{s.run.housingState.current=fromLegacyHousing(v);},enumerable:false,configurable:true},
    metrics:{get:()=>metricView,enumerable:false,configurable:true},
    flags:{get:()=>ensureLegacy(s.run).flags,enumerable:false,configurable:true},
    inventory:{get:()=>s.run.resources.inventory,enumerable:false,configurable:true},
    creation:{get:()=>s.run.character.creation,enumerable:false,configurable:true},
    rng:{get:()=>s.run.rngState.state,set:(v:number)=>{s.run.rngState.state=(Math.trunc(v)>>>0);},enumerable:false,configurable:true},
    lastAction:{get:()=>s.run.flow.lastAction,set:(v:Save['run']['flow']['lastAction'])=>{s.run.flow.lastAction=v;},enumerable:false,configurable:true},
    actionCounts:{get:()=>s.run.historyState.actionCounts,enumerable:false,configurable:true},
    history:{get:()=>s.run.historyState.eventHistory,enumerable:false,configurable:true},
    pending:{get:()=>s.run.flow.pendingScene,set:(v:Save['run']['flow']['pendingScene'])=>{s.run.flow.pendingScene=v;},enumerable:false,configurable:true},
    availableEndings:{get:()=>s.run.endings.eligible,enumerable:false,configurable:true},
    acceptedEnding:{get:()=>s.run.endings.committed,set:(v:string|null)=>{s.run.endings.committed=v;},enumerable:false,configurable:true},
    journal:{get:()=>s.run.historyState.journal,set:(v:string[])=>{s.run.historyState.journal=v;},enumerable:false,configurable:true}
  });
  Object.defineProperties(s.meta,{
    completed:{get:()=>s.meta.completedEndings,set:(v:string[])=>{s.meta.completedEndings=v;},enumerable:false,configurable:true},
    lives:{get:()=>s.meta.runsStarted,set:(v:number)=>{s.meta.runsStarted=Math.max(1,Math.trunc(v));},enumerable:false,configurable:true}
  });
  return s;
}

function cloneSave(input:Save):Save{return attachCompatibility(saveSchema.parse(JSON.parse(JSON.stringify(input))) as Save);}
function normalizeMeta(input?:Partial<Meta>|Record<string,unknown>):Save['meta']{
  const x=(input??{}) as any;
  return {
    profileVersion:Number.isInteger(x.profileVersion)?Math.max(1,x.profileVersion):1,
    completedEndings:[...new Set<string>((x.completedEndings??x.completed??[]).map(String))],
    unlocks:[...new Set<string>((x.unlocks??[]).map(String))],
    ruleModifiers:typeof x.ruleModifiers==='object'&&x.ruleModifiers?structuredClone(x.ruleModifiers):{},
    hardWorkProgress:[...new Set<string>((x.hardWorkProgress??[]).map(String))],
    persistentChoices:typeof x.persistentChoices==='object'&&x.persistentChoices?structuredClone(x.persistentChoices):{},
    activeLegacyPerks:[...new Set<string>((x.activeLegacyPerks??[]).map(String))],
    runsStarted:Number.isInteger(x.runsStarted??x.lives)?Math.max(1,x.runsStarted??x.lives):1,
    runsCompleted:Number.isInteger(x.runsCompleted)?Math.max(0,x.runsCompleted):0
  } as Save['meta'];
}
function blankTargetStats(){return Object.fromEntries(stats.map(k=>[k,1])) as Save['run']['character']['stats'];}
function blankLegacyMetrics(){return Object.fromEntries(DEFAULT_LEGACY_METRICS.map(k=>[k,k==='health'?100:0])) as Record<string,number>;}

export function calendar(day:number){
  const d=clamp(Math.trunc(day),0,159);
  return {year:Math.floor(d/40)+1,season:seasons[Math.floor((d%40)/10)],date:d%10+1};
}

export function meets(c:Condition,s:Save):boolean {
  switch(c.kind){
    case 'metric': {const v=getMetric(s,c.key);return c.op==='gte'?v>=c.value:c.op==='lte'?v<=c.value:v===c.value;}
    case 'visits':return (s.run.actionCounts[c.action]??0)>=c.value;
    case 'flag': return (s.run.flags[c.key]??false)===c.value;
    case 'season': return calendar(s.run.day).season===c.value;
    case 'housing': return s.run.housing===c.value;
    case 'unlock': return s.meta.unlocks.includes(c.value);
    case 'item': return (s.run.inventory[c.id]??0)>=c.count;
    case 'all': return c.conditions.every(x=>meets(x,s));
    case 'any': return c.conditions.some(x=>meets(x,s));
    case 'not': return !meets(c.condition,s);
  }
}
export const eligible=(conditions:Condition[],s:Save)=>conditions.every(c=>meets(c,s));
export function actionCost(a:Action,s:Save){
  if(a.id==='repay')return Math.min(a.cost.money,s.run.metrics.debt);
  return a.id==='school'&&s.meta.unlocks.includes('scholar')&&!s.run.flags[`system.scholar.${Math.floor(s.run.day/7)}`]?0:a.cost.money;
}

export function freshSave(metaInput?:Partial<Meta>|Record<string,unknown>):Save {
  const meta=normalizeMeta(metaInput);
  const core={schemaVersion:4 as const,contentVersion:'0.1.0',meta,run:{
    id:`life-${meta.runsStarted}`,status:'active' as const,
    calendar:{elapsedDays:0},
    character:{stats:blankTargetStats(),lust:1,creation:{remaining:10,allocated:{},complete:false},conditions:{}},
    resources:{money:600,inventory:{herb:2,tonic:0,scales:0}},
    dayState:{energyCurrent:energyMaxFromMeta(meta),nextDayModifiers:{energyDelta:0,statEffects:[],tags:[]},optionalOfferIds:[],scheduledEventIds:[]},
    housingState:{current:'normal' as const,paidForCurrentNight:false},
    progression:{careers:{},quests:{},relationships:{},worldFacts:[]},
    endings:{eligible:[],committed:null,result:null},
    flow:{pendingScene:null,night:null,activity:null,lastAction:null},
    rngState:{state:(meta.runsStarted*2654435761)>>>0},
    historyState:{eventHistory:{},actionCounts:{},dayActionCount:0,journal:['Белый суслик, открытый люк и совершенно незнакомое небо. Ваша новая жизнь начинается в Листограде.']},
    legacyCompat:{source:'m3.2' as const,metrics:blankLegacyMetrics(),flags:{}}
  }};
  return attachCompatibility(saveSchema.parse(core) as Save);
}

function energyMaxFromMeta(meta:Save['meta']){
  const raw=(meta.ruleModifiers as Record<string,unknown>)['energyBonus'];
  const bonus=typeof raw==='number'&&Number.isFinite(raw)?Math.trunc(raw):0;
  return clamp(3+bonus+(meta.unlocks.includes('vitality')?1:0),1,100);
}
export function energyMax(s:Save){return energyMaxFromMeta(s.meta);}
function snapshotMetrics(s:Save){return Object.fromEntries(metrics.map(k=>[k,getMetric(s,k)]));}
function delta(before:Record<string,number>,s:Save){
  const after=snapshotMetrics(s);
  return Object.fromEntries(metrics.filter(k=>after[k]!==before[k]&&k!=='stress').map(k=>[k,after[k]-before[k]]));
}
function log(s:Save,text:string){s.run.journal.push(text);s.run.journal=s.run.journal.slice(-160);}
function apply(s:Save,effects:Effect[]){
  for(const e of effects){
    if(e.kind==='housing'){s.run.housing=e.value;continue;}
    if(e.kind==='flag'){s.run.flags[e.key]=e.value;continue;}
    if(e.kind==='item'){
      const current=s.run.inventory[e.id]??0;
      if(current+e.delta<0)throw new Error('Не хватает предметов.');
      s.run.inventory[e.id]=current+e.delta;continue;
    }
    const value=getMetric(s,e.key)+e.delta;
    if(e.key==='money'&&value<0)throw new Error('Не хватает монет.');
    setMetric(s,e.key,value);
  }
}
export function availableVariants(e:StoryEvent,s:Save){
  const h=s.run.history[e.id];
  return e.variants.filter(v=>eligible(v.conditions,s)&&(h?.variants[v.id]===undefined||s.run.day-h.variants[v.id]>=e.variantCooldownDays));
}
function schedule(s:Save,cat:Catalog,trigger:string){
  const candidates=cat.events.filter(e=>{
    const h=s.run.history[e.id];
    return e.trigger.includes(trigger)&&eligible(e.conditions,s)&&(!h||(h.count<e.maxShows&&s.run.day-h.lastDay>=e.cooldownDays))&&availableVariants(e,s).length>0&&e.choices.some(c=>eligible(c.conditions,s));
  }).sort((a,b)=>b.priority-a.priority||(s.run.history[a.id]?.lastDay??-1)-(s.run.history[b.id]?.lastDay??-1)||a.id.localeCompare(b.id));
  const event=candidates.find(e=>!e.chance||random(s)<eventChance(e,s));if(!event)return;
  const variants=availableVariants(event,s).sort((a,b)=>b.conditions.length-a.conditions.length||(s.run.history[event.id]?.variants[a.id]??-1)-(s.run.history[event.id]?.variants[b.id]??-1));
  const v=variants[0];
  const h=s.run.history[event.id]??{count:0,lastDay:0,variants:{}};
  h.count++;h.lastDay=s.run.day;h.variants[v.id]=s.run.day;s.run.history[event.id]=h;
  s.run.pending={eventId:event.id,variantId:v.id};log(s,`${event.title}: ${v.text}`);
}
function register(s:Save,cat:Catalog){
  for(const e of cat.definitions.endings)if(eligible(e.conditions,s)&&!s.run.availableEndings.includes(e.id)){
    s.run.availableEndings.push(e.id);log(s,`Новая судьба: «${e.title}». Можно продолжать жизнь или принять её.`);
  }
}
export function rent(_s:Save){return 100;}
export function favorStat(s:Save){return ({spring:'strength',summer:'magic',autumn:'charm',winter:'endurance'} as const)[calendar(s.run.day).season];}
export function eventChance(e:StoryEvent,s:Save){return e.chance?Math.min(e.chance.max,e.chance.base+getMetric(s,e.chance.stat)*e.chance.perPoint):1;}
function random(s:Save){s.run.rng=(Math.imul(s.run.rng,1664525)+1013904223)>>>0;return s.run.rng/4294967296;}
function settle(s:Save,cat:Catalog){register(s,cat);}

export type Command={type:'action';id:string;recipe?:'gentle'|'bold'}|{type:'choice';id:string}|{type:'accept';id:string}|{type:'newLife'}|{type:'restart'}|{type:'allocate';stat:Stat;delta:1|-1}|{type:'finishCreation'}|{type:'sleep';payment:'money'|'favor'|'outside'};

export function dispatch(input:Save,command:Command,cat:Catalog):Save {
  const s=cloneSave(input);
  if(command.type==='restart'||command.type==='newLife'){
    if(command.type==='newLife'&&s.run.status==='active')throw new Error('Сначала примите судьбу или дождитесь окончания срока.');
    return freshSave({...s.meta,runsStarted:s.meta.runsStarted+1});
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
    if(!ending||!s.run.availableEndings.includes(ending.id)||!eligible(ending.conditions,s))throw new Error('Эта судьба сейчас недоступна.');
    s.run.status='ended';s.run.acceptedEnding=ending.id;s.meta.runsCompleted++;
    if(!s.meta.completedEndings.includes(ending.id))s.meta.completedEndings.push(ending.id);
    if(!s.meta.unlocks.includes(ending.reward))s.meta.unlocks.push(ending.reward);
    log(s,ending.epilogue);return s;
  }
  if(s.run.status!=='active')throw new Error('Эта жизнь завершена.');
  if(command.type==='sleep'){
    if(s.run.pending)throw new Error('Завершите событие перед сном.');
    if(!s.run.flags['story.arrived'])throw new Error('Сначала завершите вступление.');
    if(s.run.day+1>=TARGET_LIMIT_DAYS){s.run.status='expired';log(s,'Четыре года истекли. Выберите открытую судьбу или начните следующую жизнь.');return s;}
    const before=snapshotMetrics(s);let text='';let sleepEnergyDelta=0;
    if(command.payment==='money'){
      if(s.run.metrics.money<rent(s))throw new Error('Не хватает монет на ночлег.');
      s.run.metrics.money-=rent(s);s.run.housing='room';text='Комната оплачена. Ночь проходит спокойно.';
    }else if(command.payment==='favor'){
      const stat=favorStat(s);if(s.run.metrics[stat]<1)throw new Error('Не хватает сил для помощи хозяину.');
      s.run.metrics[stat]--;s.run.housing='room';text='Вы помогли по хозяйству вместо платы за комнату.';
    }else if(command.payment==='outside'){
      s.run.housing='shelter';s.run.character.stats.grooming=Math.max(0,s.run.character.stats.grooming-1);sleepEnergyDelta=-1;
      text='Ночь на улице. Сон короткий, одежда и внешний вид страдают.';
    }else throw new Error('Неизвестный способ ночлега.');
    for(const e of s.run.dayState.nextDayModifiers.statEffects)s.run.character.stats[e.stat]=clamp(s.run.character.stats[e.stat]+e.delta,0,100);
    const nextDelta=s.run.dayState.nextDayModifiers.energyDelta+sleepEnergyDelta;
    s.run.day++;s.run.slot=0;s.run.dayState.energyCurrent=clamp(energyMax(s)+nextDelta,1,100);
    s.run.dayState.nextDayModifiers={energyDelta:0,statEffects:[],tags:[]};
    s.run.housingState.paidForCurrentNight=false;
    s.run.lastAction={id:'rest',title:'Новое утро',text,media:[command.payment==='outside'?'stage.outside':'stage.room'],deltas:delta(before,s)};
    log(s,text);register(s,cat);return s;
  }
  if(command.type==='choice'){
    const e=cat.events.find(e=>e.id===s.run.pending?.eventId);
    const c=e?.choices.find(c=>c.id===command.id);
    if(!c||!eligible(c.conditions,s))throw new Error('Выбор недоступен.');
    const before=snapshotMetrics(s);apply(s,c.effects);log(s,c.text);
    if(s.run.lastAction){s.run.lastAction.title=e!.title;s.run.lastAction.text=c.text;if(c.media)s.run.lastAction.media=c.media;for(const [k,v] of Object.entries(delta(before,s)))s.run.lastAction.deltas[k]=(s.run.lastAction.deltas[k]??0)+v;}
    s.run.pending=null;settle(s,cat);return s;
  }
  if(s.run.pending)throw new Error('Сначала выберите ответ в сцене.');
  if(command.id==='rest')throw new Error('Выберите способ ночлега.');
  const a=cat.definitions.actions.find(a=>a.id===command.id);
  if(!a||!eligible(a.conditions,s))throw new Error('Условия действия не выполнены.');
  if(a.id!=='arrival'&&!s.run.flags['story.arrived'])throw new Error('Сначала завершите вступление.');
  const before=snapshotMetrics(s);
  const cost=actionCost(a,s);
  const freeLesson=a.id==='school'&&s.meta.unlocks.includes('scholar')&&!s.run.flags[`system.scholar.${Math.floor(s.run.day/7)}`];
  if(s.run.metrics.money<cost||s.run.metrics.energy<a.cost.energy)throw new Error('Не хватает денег или энергии.');
  if(a.mode==='brew'&&!['gentle','bold'].includes(command.recipe??''))throw new Error('Выберите способ приготовления.');
  s.run.metrics.money-=cost;s.run.metrics.energy-=a.cost.energy;
  apply(s,a.effects);
  if(a.seasonal)apply(s,a.seasonal[calendar(s.run.day).season]);
  if(a.wage){const wage=Math.round(a.wage.base+a.wage.weights.reduce((sum,w)=>sum+getMetric(s,w.stat)*w.factor,0));apply(s,[{kind:'metric',key:'money',delta:wage}]);log(s,`Заработано: ${wage} монет.`);}
  s.run.actionCounts[a.id]=Math.min(1_000_000,(s.run.actionCounts[a.id]??0)+1);
  if(freeLesson)s.run.flags[`system.scholar.${Math.floor(s.run.day/7)}`]=true;
  if(a.mode==='brew'){
    const success=command.recipe==='gentle'||s.run.metrics.alchemy>=3||(s.run.inventory.scales??0)>0;
    apply(s,[{kind:'item',id:'herb',delta:-1},{kind:'metric',key:'alchemy',delta:1}]);
    if(success){apply(s,[{kind:'item',id:'tonic',delta:command.recipe==='bold'?2:1}]);log(s,'Микстура готова.');}
    else log(s,'Смесь превратилась в пену. Опыт сохранён.');
  }
  if(a.mode!=='story')s.run.slot++;log(s,`${a.label}. Осталось энергии: ${s.run.metrics.energy}.`);
  const variants=a.scenes?.filter(v=>eligible(v.conditions,s)).sort((a,b)=>b.conditions.length-a.conditions.length);
  const v=variants?.[0];
  s.run.lastAction={id:a.id,title:a.label,text:v?.text??a.description,media:v?.media??['stage.town'],deltas:delta(before,s)};
  schedule(s,cat,a.id);settle(s,cat);return s;
}

function migrateV3(raw:any){
  if(raw.run.day>159)throw new Error('M3.2 development save is outside the 160-day target calendar.');
  const old=raw.run.metrics??{};
  const target=blankTargetStats();
  const direct:Partial<Record<Stat,string>>={strength:'strength',endurance:'endurance',dexterity:'dexterity',reason:'intelligence',magic:'magic',charm:'persuasion'};
  for(const [to,from] of Object.entries(direct) as [Stat,string][]){if(Number.isFinite(old[from]))target[to]=clamp(Math.trunc(old[from]),0,100);}
  const oldHousing=raw.run.housing==='hostel'?'cheap':raw.run.housing==='shelter'?'street':'normal';
  const meta=normalizeMeta(raw.meta);
  const out={schemaVersion:4 as const,contentVersion:String(raw.contentVersion??'0.1.0'),meta,run:{
    id:String(raw.run.id??`life-${meta.runsStarted}`),status:raw.run.status==='ended'?'ended':raw.run.status==='expired'?'expired':'active',
    calendar:{elapsedDays:Math.max(0,Math.trunc(raw.run.day??0))},
    character:{stats:target,lust:clamp(Math.trunc(old.lust??1),0,100),creation:{remaining:0,allocated:{},complete:true},conditions:{}},
    resources:{money:Math.max(0,Math.trunc(old.money??0)),inventory:{...(raw.run.inventory??{})}},
    dayState:{energyCurrent:clamp(Math.trunc(old.energy??3),0,100),nextDayModifiers:{energyDelta:0,statEffects:[],tags:[]},optionalOfferIds:[],scheduledEventIds:[]},
    housingState:{current:oldHousing,paidForCurrentNight:false},
    progression:{careers:{},quests:{},relationships:{},worldFacts:[]},
    endings:{eligible:[...(raw.run.availableEndings??[])],committed:raw.run.acceptedEnding??null,result:null},
    flow:{pendingScene:raw.run.pending?{...raw.run.pending}:null,night:null,activity:null,lastAction:raw.run.lastAction??null},
    rngState:{state:(raw.run.rng??2654435761)>>>0},
    historyState:{eventHistory:{...(raw.run.history??{})},actionCounts:{...(raw.run.actionCounts??{})},dayActionCount:Math.max(0,Math.trunc(raw.run.slot??0)),journal:[...(raw.run.journal??[])]},
    legacyCompat:{source:'m3.2' as const,metrics:Object.fromEntries(Object.entries(old).filter(([k])=>!['money','energy','lust'].includes(k)).map(([k,v])=>[k,Math.max(0,Math.trunc(Number(v)||0))])),flags:{...(raw.run.flags??{})},originalLimitDays:raw.run.limitDays}
  }};
  return out;
}
function migrateLegacy(raw:any){
  if(raw.schemaVersion===1){raw.schemaVersion=2;raw.run.actionCounts={work:raw.run.metrics.work};}
  if(raw.schemaVersion===2){
    raw.schemaVersion=3;raw.run.metrics.lust=1;raw.run.metrics.energy=Math.max(0,3-raw.run.slot);
    raw.run.creation={remaining:0,allocated:{},complete:true};raw.run.rng=2654435761;raw.run.lastAction=null;
    raw.run.flags=raw.run.flags??{};raw.run.flags['story.arrived']=true;
  }
  return raw.schemaVersion===3?migrateV3(raw):raw;
}
function mergeMeta(saved:Save['meta'],current?:Partial<Meta>|Record<string,unknown>){
  if(!current)return saved;
  const c=normalizeMeta(current);
  saved.unlocks=[...new Set([...saved.unlocks,...c.unlocks])];
  saved.completedEndings=[...new Set([...saved.completedEndings,...c.completedEndings])];
  saved.hardWorkProgress=[...new Set([...saved.hardWorkProgress,...c.hardWorkProgress])];
  saved.runsStarted=Math.max(saved.runsStarted,c.runsStarted);
  saved.runsCompleted=Math.max(saved.runsCompleted,c.runsCompleted);
  saved.ruleModifiers={...saved.ruleModifiers,...c.ruleModifiers};
  saved.persistentChoices={...saved.persistentChoices,...c.persistentChoices};
  saved.activeLegacyPerks=[...c.activeLegacyPerks];
  return saved;
}

export function parseSave(text:string,cat:Catalog,currentMeta?:Partial<Meta>|Record<string,unknown>):Save {
  const raw=migrateLegacy(JSON.parse(text));
  const s=attachCompatibility(saveSchema.parse(raw) as Save);
  mergeMeta(s.meta,currentMeta);
  if(s.run.metrics.energy>energyMax(s))throw new Error('Некорректный запас энергии.');
  if(!s.run.creation.complete&&s.run.creation.remaining+(Object.values(s.run.creation.allocated) as number[]).reduce((a,b)=>a+b,0)!==10)throw new Error('Некорректные стартовые очки.');
  if(s.run.lastAction&&s.run.lastAction.id!=='rest'&&!cat.definitions.actions.some(a=>a.id===s.run.lastAction!.id))throw new Error('Неизвестное последнее занятие.');
  if(s.run.lastAction?.media.some(id=>!cat.media.some(m=>m.id===id)))throw new Error('Неизвестное медиа последнего занятия.');
  const actions=new Set(cat.definitions.actions.map(a=>a.id));
  for(const id of Object.keys(s.run.actionCounts))if(!actions.has(id))throw new Error(`Неизвестный счётчик ${id}`);
  const knownFlags=new Set(cat.definitions.flags);
  for(const f of Object.keys(s.run.flags))if(!knownFlags.has(f)&&!/^system\.scholar\.\d+$/.test(f))throw new Error(`Неизвестный флаг ${f}`);
  const endingIds=new Set(cat.definitions.endings.map(e=>e.id));
  if([...s.run.availableEndings,...s.meta.completedEndings,...(s.run.acceptedEnding?[s.run.acceptedEnding]:[])].some(id=>!endingIds.has(id)))throw new Error('Неизвестная судьба.');
  if(s.run.status==='ended'&&!s.run.acceptedEnding)throw new Error('Нет принятой судьбы.');
  if(s.run.pending){
    const e=cat.events.find(e=>e.id===s.run.pending!.eventId);
    if(!e?.variants.some(v=>v.id===s.run.pending!.variantId))throw new Error('Неизвестная сцена сохранения.');
    if(!e.choices.some(c=>eligible(c.conditions,s)))throw new Error('Сцена не имеет доступного выбора.');
  }
  for(const [eventId,h] of Object.entries(s.run.history) as [string,{count:number;lastDay:number;variants:Record<string,number>}][]){
    const e=cat.events.find(e=>e.id===eventId);
    if(!e||h.lastDay>s.run.day||Object.entries(h.variants).some(([variantId,day])=>Number(day)>s.run.day||!e.variants.some(v=>v.id===variantId)))throw new Error('Некорректная история сцен.');
  }
  return s;
}
