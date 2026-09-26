import { metrics, stats, seasons, saveSchema, type Stat, type Save, type Meta, type Condition, type Effect, type Catalog, type StoryEvent, type Action } from './schema.ts';

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
  // Temporary M3.2 compatibility only. These do not define target meta rewards.
  if(meta.unlocks.includes('guild'))setMetric(s,'organization',getMetric(s,'organization')+5);
  if(meta.unlocks.includes('scholar'))setMetric(s,'reason',getMetric(s,'reason')+5);
  if(meta.unlocks.includes('host'))setMetric(s,'charm',getMetric(s,'charm')+5);
  if(meta.unlocks.includes('mediator'))setMetric(s,'empathy',getMetric(s,'empathy')+5);
  if(meta.unlocks.includes('court'))setMetric(s,'composure',getMetric(s,'composure')+5);
  s.dayState.energyCurrent=energyMax(s);
  return s;
}

function delta(before:Record<string,number>,after:Record<string,number>){
  return Object.fromEntries((metrics as readonly string[]).filter(k=>(after[k]??0)!==(before[k]??0)&&k!=='stress').map(k=>[k,(after[k]??0)-(before[k]??0)]));
}
function log(s:Save,text:string){s.run.journal.push(text);s.run.journal=s.run.journal.slice(-160);}

function apply(s:Save,effects:Effect[]){
  for(const e of effects){
    if(e.kind==='housing'){s.run.housing=e.value;continue;}
    if(e.kind==='flag'){s.run.flags[e.key]=e.value;continue;}
    if(e.kind==='item'){
      const have=s.run.inventory[e.id]??0;
      if(have+e.delta<0)throw new Error('Не хватает предметов.');
      s.run.inventory[e.id]=have+e.delta;continue;
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
    if(!ending||!s.run.availableEndings.includes(ending.id)||!eligible(ending.conditions,s))throw new Error('Эта судьба сейчас недоступна.');
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
    const nextDelta=s.run.dayState.nextDayModifiers.energyDelta;
    s.run.metrics.energy=Math.max(1,energyMax(s)+nextDelta-(command.payment==='outside'?1:0));
    s.run.dayState.nextDayModifiers={energyDelta:0,statEffects:[],tags:[]};
    s.run.lastAction={id:'rest',title:'Новое утро',text,media:[command.payment==='outside'?'stage.outside':'stage.room'],deltas:delta(before,s.run.metrics)};
    log(s,text);register(s,cat);return s;
  }
  if(command.type==='choice'){
    const e=cat.events.find(e=>e.id===s.run.pending?.eventId);
    const c=e?.choices.find(c=>c.id===command.id);
    if(!c||!eligible(c.conditions,s))throw new Error('Выбор недоступен.');
    const before={...s.run.metrics};apply(s,c.effects);log(s,c.text);
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
  if(!a||!eligible(a.conditions,s))throw new Error('Условия действия не выполнены.');
  if(a.id!=='arrival'&&!s.run.flags['story.arrived'])throw new Error('Сначала завершите вступление.');
  const before={...s.run.metrics};
  const cost=actionCost(a,s);
  const freeLesson=a.id==='school'&&s.meta.unlocks.includes('scholar')&&!s.run.flags[`system.scholar.${Math.floor(s.run.day/7)}`];
  if(s.run.metrics.money<cost||s.run.metrics.energy<a.cost.energy)throw new Error('Не хватает денег или энергии.');
  if(a.mode==='brew'&&!['gentle','bold'].includes(command.recipe??''))throw new Error('Выберите способ приготовления.');
  s.run.metrics.money-=cost;s.run.metrics.energy-=a.cost.energy;
  apply(s,a.effects);
  if(a.seasonal)apply(s,a.seasonal[calendar(s.run.day).season]);
  if(a.wage){
    const wage=Math.round(a.wage.base+a.wage.weights.reduce((sum,w)=>sum+getMetric(s,w.stat)*w.factor,0));
    apply(s,[{kind:'metric',key:'money',delta:wage}]);log(s,`Заработано: ${wage} монет.`);
  }
  s.run.actionCounts[a.id]=Math.min(1_000_000,(s.run.actionCounts[a.id]??0)+1);
  if(freeLesson)s.run.flags[`system.scholar.${Math.floor(s.run.day/7)}`]=true;
  if(a.mode==='brew'){
    const success=command.recipe==='gentle'||getMetric(s,'alchemy')>=3||(s.run.inventory.scales??0)>0;
    apply(s,[{kind:'item',id:'herb',delta:-1},{kind:'metric',key:'alchemy',delta:1}]);
    if(success){apply(s,[{kind:'item',id:'tonic',delta:command.recipe==='bold'?2:1}]);log(s,'Микстура готова. Этикетка обещает бодрость, а не бессмертие — хороший знак.');}
    else log(s,'Смесь превратилась в пену. Для быстрого способа нужны весы или мастерство 3. Опыт сохранён.');
  }
  if(a.mode!=='story')s.run.slot++;log(s,`${a.label}. Осталось энергии: ${s.run.metrics.energy}.`);
  const variants=a.scenes?.filter(v=>eligible(v.conditions,s)).sort((a,b)=>b.conditions.length-a.conditions.length);
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
  const knownFlags=new Set(cat.definitions.flags);
  for(const flag of Object.keys(s.run.flags))if(!knownFlags.has(flag)&&!/^system\.scholar\.\d+$/.test(flag))throw new Error(`Неизвестный флаг ${flag}`);
  const endingIds=new Set(cat.definitions.endings.map(e=>e.id));
  if([...s.run.availableEndings,...s.meta.completed,...(s.run.acceptedEnding?[s.run.acceptedEnding]:[])].some(id=>!endingIds.has(id)))throw new Error('Неизвестная судьба.');
  if(s.run.status==='ended'&&!s.run.acceptedEnding)throw new Error('Нет принятой судьбы.');
  if(s.run.pending){
    const e=cat.events.find(e=>e.id===s.run.pending!.eventId);
    if(!e?.variants.some(v=>v.id===s.run.pending!.variantId))throw new Error('Неизвестная сцена сохранения.');
    if(!e.choices.some(c=>eligible(c.conditions,s)))throw new Error('Сцена не имеет доступного выбора.');
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
