import {definitionsSchema,packSchema, type Catalog,type Condition, type Effect} from './schema.ts';

function unique(ids:string[],label:string){if(new Set(ids).size!==ids.length)throw new Error(`Повтор ID: ${label}`);}
function visit(c:Condition,fn:(c:Condition)=>void,depth=0){
  if(depth>8)throw new Error('Слишком глубокое условие.');fn(c);
  if(c.kind==='all'||c.kind==='any')c.conditions.forEach(x=>visit(x,fn,depth+1));
  if(c.kind==='not')visit(c.condition,fn,depth+1);
}
function contradictions(conditions:Condition[]){
  const flat:Condition[]=[];
  function expand(c:Condition){if(c.kind==='all')c.conditions.forEach(expand);else flat.push(c);}
  conditions.forEach(expand);
  const ranges=new Map<string,[number,number]>();const flags=new Map<string,boolean>();
  for(const c of flat){
    if(c.kind==='metric'){
      const [lo,hi]=ranges.get(c.key)??[0,1_000_000];
      const a=c.op==='lte'?lo:Math.max(lo,c.value),b=c.op==='gte'?hi:Math.min(hi,c.value);
      if(a>b)throw new Error(`Противоречивые пороги: ${c.key}`);ranges.set(c.key,[a,b]);
    }
    if(c.kind==='flag'){
      if(flags.has(c.key)&&flags.get(c.key)!==c.value)throw new Error(`Противоречивый флаг ${c.key}`);flags.set(c.key,c.value);
    }
  }
}
export function loadCatalog(definitions:unknown,packs:unknown[]):Catalog {
  const d=definitionsSchema.parse(definitions),ps=packs.map(p=>packSchema.parse(p));
  const events=ps.flatMap(p=>p.events),media=ps.flatMap(p=>p.media);
  unique(d.flags,'флаги');unique(d.actions.map(a=>a.id),'действия');unique(d.endings.map(e=>e.id),'судьбы');
  unique(ps.map(p=>p.id),'пакеты');unique(events.map(e=>e.id),'события');unique(media.map(m=>m.id),'медиа');
  const known=new Set(d.flags),actionIds=new Set(d.actions.map(a=>a.id)),mediaIds=new Set(media.map(m=>m.id));
  const checkConditions=(cs:Condition[],reads:Set<string>)=>{
    contradictions(cs);cs.forEach(c=>visit(c,x=>{if(x.kind==='visits'&&!actionIds.has(x.action))throw new Error(`Неизвестное действие счётчика ${x.action}`);}));cs.forEach(c=>visit(c,x=>{if(x.kind==='flag'&&(!known.has(x.key)||!reads.has(x.key)))throw new Error(`Недопустимое чтение ${x.key}`);}));
  };
  const checkEffects=(es:Effect[],writes:Set<string>)=>es.forEach(e=>{
    if(e.kind==='flag'&&(!known.has(e.key)||!writes.has(e.key)))throw new Error(`Недопустимая запись ${e.key}`);
  });
  for(const a of d.actions){checkConditions(a.conditions,known);checkEffects(a.effects,known);if(a.seasonal)Object.values(a.seasonal).forEach(es=>checkEffects(es,known));if(a.scenes){unique(a.scenes.map(v=>v.id),a.id);if(!a.scenes.some(v=>!v.conditions.length))throw new Error('Нет базовой сцены занятия');for(const v of a.scenes){checkConditions(v.conditions,known);if(v.media.some(id=>!mediaIds.has(id)))throw new Error('Неизвестное медиа занятия');}}}
  for(const e of d.endings)checkConditions(e.conditions,known);
  for(const p of ps){
    for(const flag of [...p.reads,...p.writes])if(!known.has(flag))throw new Error(`Неизвестный флаг ${flag}`);
    for(const e of p.events){
      if(!e.id.startsWith(p.id+'.'))throw new Error(`Событие вне namespace пакета: ${e.id}`);
      if(e.trigger.some(t=>!actionIds.has(t)))throw new Error(`Неизвестный триггер ${e.id}`);
      checkConditions(e.conditions,new Set(p.reads));unique(e.variants.map(v=>v.id),e.id+' варианты');unique(e.choices.map(c=>c.id),e.id+' выборы');
      if(!e.variants.some(v=>v.conditions.length===0))throw new Error(`Нет запасной постановки ${e.id}`);
      if(!e.choices.some(c=>c.conditions.length===0&&c.effects.every(x=>x.kind==='flag'||(x.kind!=='housing'&&x.delta>=0))))throw new Error(`Нет бесплатного выхода ${e.id}`);
      for(const v of e.variants){checkConditions([...e.conditions,...v.conditions],new Set(p.reads));if(v.media.some(id=>!mediaIds.has(id)))throw new Error(`Неизвестное медиа ${e.id}`);}
      for(const c of e.choices){if(c.media?.some(id=>!mediaIds.has(id)))throw new Error('Неизвестное медиа выбора');checkConditions([...e.conditions,...c.conditions],new Set(p.reads));checkEffects(c.effects,new Set(p.writes));}
    }
  }
  return {definitions:d,packs:ps,events,media};
}
