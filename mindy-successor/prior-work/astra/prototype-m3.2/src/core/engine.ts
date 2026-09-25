import { metrics, stats, seasons, saveSchema, type Save, type Meta, type Condition, type Effect, type Catalog, type StoryEvent, type Action } from './schema.ts';

export function calendar(day:number){return {year:Math.floor(day/112)+1,season:seasons[Math.floor(day/28)%4],date:day%28+1};}
export function meets(c:Condition,s:Save):boolean {
  switch(c.kind){
    case 'metric': {const v=s.run.metrics[c.key];return c.op==='gte'?v>=c.value:c.op==='lte'?v<=c.value:v===c.value;}
    case 'visits':return (s.run.actionCounts[c.action]??0)>=c.value;
    case 'flag': return (s.run.flags[c.key]??false)===c.value;
    case 'season': return calendar(s.run.day).season===c.value;
    case 'housing': return s.run.housing===c.value;
    case 'unlock': return s.meta.unlocks.includes(c.value);
    case 'item': return s.run.inventory[c.id]>=c.count;
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
export function freshSave(meta:Meta={unlocks:[],completed:[],lives:1}):Save {
  const m=Object.fromEntries(metrics.map(k=>[k,0])) as Save['run']['metrics'];
  for(const stat of stats)m[stat]=1;
  Object.assign(m,{money:100,energy:3,health:100});
  if(meta.unlocks.includes('guild'))m.organization+=5;
  if(meta.unlocks.includes('scholar'))m.intelligence+=5;
  if(meta.unlocks.includes('host'))m.persuasion+=5;
  if(meta.unlocks.includes('mediator'))m.empathy+=5;
  if(meta.unlocks.includes('court'))m.composure+=5;
  if(meta.unlocks.includes('vitality'))m.energy=4;
  return {schemaVersion:3,contentVersion:'0.1.0',meta:structuredClone(meta),run:{
    id:`life-${meta.lives}`,day:0,slot:0,limitDays:meta.unlocks.includes('calendar')?560:448,
    status:'active',housing:'room',metrics:m,flags:{},inventory:{herb:2,tonic:0,scales:0},creation:{remaining:10,allocated:{},complete:false},rng:(meta.lives*2654435761)>>>0,lastAction:null,actionCounts:{},history:{},pending:null,availableEndings:[],acceptedEnding:null,
    journal:['Белый суслик, открытый люк и совершенно незнакомое небо. Ваша новая жизнь начинается в Листограде.']
  }};
}
function delta(before:Save['run']['metrics'],after:Save['run']['metrics']){return Object.fromEntries(metrics.filter(k=>after[k]!==before[k]&&k!=='stress').map(k=>[k,after[k]-before[k]]));}
function log(s:Save,text:string){s.run.journal.push(text);s.run.journal=s.run.journal.slice(-80);}
function apply(s:Save,effects:Effect[]){
  for(const e of effects){
    if(e.kind==='housing'){s.run.housing=e.value;continue;}
    if(e.kind==='flag'){s.run.flags[e.key]=e.value;continue;}
    if(e.kind==='item'){
      if(s.run.inventory[e.id]+e.delta<0)throw new Error('Не хватает предметов.');
      s.run.inventory[e.id]+=e.delta;continue;
    }
    const value=s.run.metrics[e.key]+e.delta;
    if(e.key==='money' && value<0)throw new Error('Не хватает монет.');
    const capped=(stats as readonly string[]).includes(e.key)||['energy','health','stress','trust'].includes(e.key);
    s.run.metrics[e.key]=Math.min(capped?100:1_000_000,Math.max(0,value));
  }
}
export function availableVariants(e:StoryEvent,s:Save){
  const h=s.run.history[e.id];
  return e.variants.filter(v=>eligible(v.conditions,s) && (h?.variants[v.id]===undefined || s.run.day-h.variants[v.id]>=e.variantCooldownDays));
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
export function energyMax(s:Save){return s.meta.unlocks.includes('vitality')?4:3;}
export function rent(s:Save){const prices=[18,35,60,90,115];const base=prices[Math.min(calendar(s.run.day).year-1,4)];return s.meta.unlocks.includes('guild')?Math.ceil(base/2):base;}
export function favorStat(s:Save){return ({spring:'strength',summer:'magic',autumn:'persuasion',winter:'endurance'} as const)[calendar(s.run.day).season];}
export function eventChance(e:StoryEvent,s:Save){return e.chance?Math.min(e.chance.max,e.chance.base+s.run.metrics[e.chance.stat]*e.chance.perPoint):1;}
function random(s:Save){s.run.rng=(Math.imul(s.run.rng,1664525)+1013904223)>>>0;return s.run.rng/4294967296;}
function settle(s:Save,cat:Catalog){register(s,cat);}
export type Command={type:'action';id:string;recipe?:'gentle'|'bold'}|{type:'choice';id:string}|{type:'accept';id:string}|{type:'newLife'}|{type:'restart'}|{type:'allocate';stat:typeof stats[number];delta:1|-1}|{type:'finishCreation'}|{type:'sleep';payment:'money'|'favor'|'outside'};
export function dispatch(input:Save,command:Command,cat:Catalog):Save {
  const s=structuredClone(input);
  if(command.type==='restart')return freshSave({...s.meta,lives:s.meta.lives+1});
  if(command.type==='newLife'){
    if(s.run.status==='active')throw new Error('Сначала примите судьбу или дождитесь окончания срока.');
    return freshSave({...s.meta,lives:s.meta.lives+1});
  }
  if(command.type==='allocate'){
    if(s.run.creation.complete||s.run.status!=='active'||s.run.pending)throw new Error('Создание персонажа завершено.');
    if(!stats.includes(command.stat))throw new Error('Неизвестная характеристика.');
    const used=s.run.creation.allocated[command.stat]??0;
    if(command.delta===1&&s.run.creation.remaining<1||command.delta===-1&&used<1)throw new Error('Нет свободных очков.');
    if(command.delta!==1&&command.delta!==-1)throw new Error('Неверное распределение.');
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
    log(s,ending.epilogue);return s;
  }
  if(s.run.status!=='active')throw new Error('Эта жизнь завершена.');
  if(command.type==='sleep'){
    if(s.run.pending)throw new Error('Завершите событие перед сном.');
    if(!s.run.flags['story.arrived'])throw new Error('Сначала завершите вступление.');
    if(s.run.day+1>=s.run.limitDays){s.run.status='expired';log(s,'Четыре года истекли. Выберите открытую судьбу или начните следующую жизнь.');return s;}
    const before={...s.run.metrics};let text='';
    if(command.payment==='money'){
      if(s.run.metrics.money<rent(s))throw new Error('Не хватает монет на ночлег.');
      s.run.metrics.money-=rent(s);s.run.housing='room';text='Комната оплачена. Силан пожелал доброй ночи и пересчитал ключи.';
    }else if(command.payment==='favor'){
      const stat=favorStat(s);if(s.run.metrics[stat]<1)throw new Error('Не хватает сил для помощи хозяину.');
      s.run.metrics[stat]--;s.run.housing='room';text='Вы помогли Силану по хозяйству вместо платы за комнату.';
    }else if(command.payment==='outside'){
      s.run.housing='shelter';s.run.metrics.persuasion=Math.max(0,s.run.metrics.persuasion-1);s.run.metrics.composure=Math.max(0,s.run.metrics.composure-1);
      text='Ночь под навесом. Сон был коротким: завтра на одно дело меньше.';
    }else throw new Error('Неизвестный способ ночлега.');
    s.run.day++;s.run.slot=0;s.run.metrics.energy=energyMax(s)-(command.payment==='outside'?1:0);
    s.run.lastAction={id:'rest',title:'Новое утро',text,media:[command.payment==='outside'?'stage.outside':'stage.room'],deltas:delta(before,s.run.metrics)};
    log(s,text);register(s,cat);return s;
  }
  if(command.type==='choice'){
    const e=cat.events.find(e=>e.id===s.run.pending?.eventId);
    const c=e?.choices.find(c=>c.id===command.id);
    if(!c||!eligible(c.conditions,s))throw new Error('Выбор недоступен.');
    const before={...s.run.metrics};apply(s,c.effects);log(s,c.text);
    if(s.run.lastAction){s.run.lastAction.title=e!.title;s.run.lastAction.text=c.text;if(c.media)s.run.lastAction.media=c.media;for(const [k,v] of Object.entries(delta(before,s.run.metrics)))s.run.lastAction.deltas[k]=(s.run.lastAction.deltas[k]??0)+v;}
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
  if(a.mode==='brew' && !['gentle','bold'].includes(command.recipe??''))throw new Error('Выберите способ приготовления.');
  s.run.metrics.money-=cost;s.run.metrics.energy-=a.cost.energy;
  apply(s,a.effects);
  if(a.seasonal)apply(s,a.seasonal[calendar(s.run.day).season]);
  if(a.wage){const wage=Math.round(a.wage.base+a.wage.weights.reduce((sum,w)=>sum+s.run.metrics[w.stat]*w.factor,0));apply(s,[{kind:'metric',key:'money',delta:wage}]);log(s,`Заработано: ${wage} монет.`);}
  s.run.actionCounts[a.id]=Math.min(1_000_000,(s.run.actionCounts[a.id]??0)+1);
  if(freeLesson)s.run.flags[`system.scholar.${Math.floor(s.run.day/7)}`]=true;
  if(a.mode==='brew'){
    const success=command.recipe==='gentle'||s.run.metrics.alchemy>=3||s.run.inventory.scales>0;
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
export function parseSave(text:string,cat:Catalog,currentMeta?:Meta):Save {
  const raw=JSON.parse(text);
  // Explicit v1 -> v2 migration. Only old workshop shifts can be reconstructed reliably.
  if(raw.schemaVersion===1){raw.schemaVersion=2;raw.run.actionCounts={work:raw.run.metrics.work};}
  if(raw.schemaVersion===2){
    raw.schemaVersion=3;raw.run.metrics.lust=1;raw.run.metrics.energy=Math.max(0,3-raw.run.slot);
    raw.run.creation={remaining:0,allocated:{},complete:true};raw.run.rng=2654435761;raw.run.lastAction=null;
    raw.run.flags['story.arrived']=true;
  }
  const s=saveSchema.parse(raw);
  if(s.run.metrics.energy>energyMax(s))throw new Error('Некорректный запас энергии.');
  if(!s.run.creation.complete&&s.run.creation.remaining+Object.values(s.run.creation.allocated).reduce((a,b)=>a+b,0)!==10)throw new Error('Некорректные стартовые очки.');
  if(s.run.lastAction&&!cat.definitions.actions.some(a=>a.id===s.run.lastAction!.id))throw new Error('Неизвестное последнее занятие.');
  if(s.run.lastAction?.media.some(id=>!cat.media.some(m=>m.id===id)))throw new Error('Неизвестное медиа последнего занятия.');
  const actions=new Set(cat.definitions.actions.map(a=>a.id));
  for(const id of Object.keys(s.run.actionCounts))if(!actions.has(id))throw new Error(`Неизвестный счётчик ${id}`);
  if(s.run.day>=s.run.limitDays)throw new Error('Некорректная дата сохранения.');
  for(const k of [...stats,'energy','health','stress','trust'] as const)if(s.run.metrics[k]>100)throw new Error(`Значение ${k} вне диапазона.`);
  const knownFlags=new Set(cat.definitions.flags);
  for(const f of Object.keys(s.run.flags))if(!knownFlags.has(f)&&!/^system\.scholar\.\d+$/.test(f))throw new Error(`Неизвестный флаг ${f}`);
  const endingIds=new Set(cat.definitions.endings.map(e=>e.id));
  if([...s.run.availableEndings,...s.meta.completed,...(s.run.acceptedEnding?[s.run.acceptedEnding]:[])].some(id=>!endingIds.has(id)))throw new Error('Неизвестная судьба.');
  if(s.run.status==='ended'&&!s.run.acceptedEnding)throw new Error('Нет принятой судьбы.');
  if(s.run.pending){
    const e=cat.events.find(e=>e.id===s.run.pending!.eventId);
    if(!e?.variants.some(v=>v.id===s.run.pending!.variantId))throw new Error('Неизвестная сцена сохранения.');
    if(!e.choices.some(c=>eligible(c.conditions,s)))throw new Error('Сцена не имеет доступного выбора.');
  }
  for(const [id,h] of Object.entries(s.run.history)){
    const e=cat.events.find(e=>e.id===id);
    if(!e||h.lastDay>s.run.day||Object.entries(h.variants).some(([id,day])=>day>s.run.day||!e.variants.some(v=>v.id===id)))throw new Error('Некорректная история сцен.');
  }

  if(currentMeta){
    s.meta.unlocks=[...new Set([...currentMeta.unlocks,...s.meta.unlocks])];
    s.meta.completed=[...new Set([...currentMeta.completed,...s.meta.completed])];
    s.meta.lives=Math.max(currentMeta.lives,s.meta.lives);
  }
  return s;
}
