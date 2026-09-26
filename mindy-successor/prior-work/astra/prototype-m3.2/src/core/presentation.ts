import {z} from 'zod';
import {loadCatalog} from './content.ts';
import type {Catalog} from './schema.ts';

const source=z.string().max(3_000_000).refine(
  s=>/^assets\/[a-zA-Z0-9/_-]+\.(svg|png|jpg|jpeg|webp|gif|mp4|webm)$/.test(s)||/^data:image\/(png|jpeg|webp|gif);base64,[A-Za-z0-9+/]+={0,2}$/.test(s),
  'Только локальный assets/ путь или загруженное изображение PNG/JPEG/WebP/GIF.'
);
const presentationIdSchema=z.string().min(1).max(240).regex(/^[a-z0-9][a-z0-9/._-]*$/,'Некорректный presentationId.');
const legacyMediaOverrideSchema=z.object({
  kind:z.enum(['image','gif','video']),
  src:source,
  alt:z.string().min(1).max(300)
}).strict();
const gifOverrideSchema=z.object({
  kind:z.literal('gif'),
  src:source,
  alt:z.string().min(1).max(300)
}).strict();
const staticOverrideSchema=z.object({
  kind:z.literal('image'),
  src:source,
  alt:z.string().min(1).max(300)
}).strict();
const slotOverrideSchema=z.object({
  primary:gifOverrideSchema.optional(),
  static:staticOverrideSchema.optional(),
  fallbackId:presentationIdSchema.optional()
}).strict();

export const presentationSchema=z.object({
  version:z.literal(1),
  texts:z.record(z.string(),z.string().min(1).max(5000)),
  media:z.record(z.string(),legacyMediaOverrideSchema),
  slots:z.record(presentationIdSchema,slotOverrideSchema).optional()
}).strict();

export type Presentation=z.infer<typeof presentationSchema>;
export type PresentationSlotOverride=z.infer<typeof slotOverrideSchema>;
export type PresentationMediaKind='image'|'gif'|'video';

export interface PresentationSlot {
  id:string;
  label:string;
  baseMediaIds:string[];
  fallbackId?:string;
}

export interface ResolvedPresentationMedia {
  kind:PresentationMediaKind;
  src:string;
  alt:string;
  slotId:string;
  source:'override-primary'|'override-static'|'catalog';
  mediaId?:string;
}

export interface ResolvedPresentation {
  requestedId:string;
  candidates:ResolvedPresentationMedia[];
  textOnly:boolean;
  diagnostics:string[];
}

export const emptyPresentation=():Presentation=>({version:1,texts:{},media:{}});

const jobIds=new Set(['tavern','lumber','hunt','guard']);
const clean=(value:string)=>value.toLowerCase().replace(/[^a-z0-9._-]+/g,'-').replace(/^-+|-+$/g,'')||'default';
const sameIds=(a:string[],b:string[])=>a.length===b.length&&a.every((id,i)=>id===b[i]);

function actionPresentationId(actionId:string,sceneId:string){
  const action=clean(actionId),scene=clean(sceneId);
  if(jobIds.has(action))return `job/${action}/shift/${scene}/default`;
  if(action==='forest-search')return `activity/forest/route/${scene}`;
  if(action==='school'||action.endsWith('-class'))return `school/${action}/lesson/${scene}`;
  if(action==='rest'||action==='rent-room')return `night/${action}/${scene}`;
  return `location/town/${action}/${scene}`;
}

export function presentationIdForAction(cat:Catalog,actionId:string,mediaIds:string[]=[]){
  const action=cat.definitions.actions.find(a=>a.id===actionId);
  const scenes=action?.scenes??[];
  const scene=scenes.find(s=>sameIds(s.media,mediaIds))
    ??scenes.find(s=>s.media.some(id=>mediaIds.includes(id)))
    ??scenes.find(s=>s.id==='default')
    ??scenes[0];
  return actionPresentationId(actionId,scene?.id??'default');
}

export function presentationIdForEvent(cat:Catalog,eventId:string,variantId:string){
  const event=cat.events.find(e=>e.id===eventId);
  const sourceDomain=event?.sourceDomain;
  const domain=sourceDomain?clean(sourceDomain):'';
  if(domain&&(cat.definitions.careers??[]).some(c=>c.id===sourceDomain)){
    return `job/${domain}/event/${clean(eventId)}/${clean(variantId)}`;
  }
  if(domain&&(cat.definitions.relationships??[]).some(r=>r.id===sourceDomain)){
    return `relationship/${domain}/${clean(eventId)}/${clean(variantId)}`;
  }
  if(domain.includes('forest')){
    return `activity/forest/${clean(eventId)}/${clean(variantId)}`;
  }
  return `location/town/event/${clean(eventId)}/${clean(variantId)}`;
}

export function presentationIdForEnding(endingId:string){
  return `ending/${clean(endingId)}`;
}

export function textFields(cat:Catalog){
  const fields:{key:string;label:string;value:string;set:(s:string)=>void}[]=[];
  const add=(key:string,label:string,obj:Record<string,unknown>,field:string)=>fields.push({key,label,value:String(obj[field]),set:s=>{obj[field]=s;}});
  for(const a of cat.definitions.actions)for(const k of ['label','description'])add(`action/${a.id}/${k}`,`${a.label} · ${k}`,a,k);
  for(const a of cat.definitions.actions)for(const v of a.scenes??[])add(`action/${a.id}/scene/${v.id}`,`${a.label} · постановка ${v.id}`,v,'text');
  for(const e of cat.definitions.endings)for(const k of ['title','description','epilogue'])add(`ending/${e.id}/${k}`,`${e.title} · ${k}`,e,k);
  for(const e of cat.events){
    add(`event/${e.id}/title`,`${e.title} · заголовок`,e,'title');
    for(const v of e.variants)add(`event/${e.id}/variant/${v.id}`,`${e.title} · ${v.id}`,v,'text');
    for(const c of e.choices)for(const k of ['label','text'])add(`event/${e.id}/choice/${c.id}/${k}`,`${e.title} · ${c.id} · ${k}`,c,k);
  }
  return fields;
}

export function presentationSlots(cat:Catalog):PresentationSlot[]{
  const slots=new Map<string,PresentationSlot>();
  const add=(slot:PresentationSlot)=>{
    const previous=slots.get(slot.id);
    if(previous){
      previous.baseMediaIds=[...new Set([...previous.baseMediaIds,...slot.baseMediaIds])];
      return;
    }
    slots.set(slot.id,{...slot,baseMediaIds:[...new Set(slot.baseMediaIds)]});
  };

  add({
    id:'location/town/default',
    label:'Город · центральная сцена',
    baseMediaIds:cat.media.some(m=>m.id==='stage.town')?['stage.town']:[]
  });

  for(const action of cat.definitions.actions){
    for(const scene of action.scenes??[]){
      add({
        id:actionPresentationId(action.id,scene.id),
        label:`${action.label} · ${scene.id}`,
        baseMediaIds:scene.media,
        fallbackId:'location/town/default'
      });
    }
  }

  for(const event of cat.events){
    for(const variant of event.variants){
      add({
        id:presentationIdForEvent(cat,event.id,variant.id),
        label:`${event.title} · ${variant.id}`,
        baseMediaIds:variant.media,
        fallbackId:'location/town/default'
      });
    }
  }

  for(const ending of cat.definitions.endings){
    add({
      id:presentationIdForEnding(ending.id),
      label:`${ending.title} · финал`,
      baseMediaIds:[],
      fallbackId:'location/town/default'
    });
  }

  return [...slots.values()].sort((a,b)=>a.id.localeCompare(b.id));
}

function validateSlotOverrides(cat:Catalog,patch:Presentation){
  const slots=presentationSlots(cat);
  const known=new Map(slots.map(slot=>[slot.id,slot]));
  for(const [id,override] of Object.entries(patch.slots??{})){
    if(!known.has(id))throw new Error(`Неизвестный presentationId ${id}`);
    if(override.fallbackId&&!known.has(override.fallbackId))throw new Error(`Неизвестный fallback presentationId ${override.fallbackId}`);
  }

  const state=new Map<string,0|1|2>();
  const visit=(id:string,trail:string[])=>{
    const mark=state.get(id)??0;
    if(mark===2)return;
    if(mark===1)throw new Error(`Цикл presentation fallback: ${[...trail,id].join(' -> ')}`);
    state.set(id,1);
    const slot=known.get(id)!;
    const next=patch.slots?.[id]?.fallbackId??slot.fallbackId;
    if(next)visit(next,[...trail,id]);
    state.set(id,2);
  };
  for(const id of known.keys())visit(id,[]);
}

export function applyPresentation(base:Catalog,input:unknown):Catalog{
  const patch=presentationSchema.parse(input);
  // Rebuild shared references: events must be the same objects as pack.events.
  const cat=loadCatalog(structuredClone(base.definitions),structuredClone(base.packs));
  const fields=new Map(textFields(cat).map(f=>[f.key,f]));
  for(const [key,value] of Object.entries(patch.texts)){
    const field=fields.get(key);if(!field)throw new Error(`Неизвестное текстовое поле ${key}`);field.set(value);
  }
  // Revalidate text lengths/required labels. Presentation cannot change conditions/effects/IDs.
  const checked=loadCatalog(cat.definitions,cat.packs);
  for(const [id,asset] of Object.entries(patch.media)){
    const media=checked.media.find(m=>m.id===id);if(!media)throw new Error(`Неизвестное медиа ${id}`);
    if(asset.src.startsWith('data:')&&asset.kind==='video')throw new Error('Для видео нужен локальный путь assets/.');
    Object.assign(media,asset);
  }
  validateSlotOverrides(checked,patch);
  return checked;
}

function mediaCandidates(cat:Catalog,slot:PresentationSlot,override:PresentationSlotOverride|undefined,animationsEnabled:boolean){
  const result:ResolvedPresentationMedia[]=[];
  const push=(candidate:ResolvedPresentationMedia)=>result.push(candidate);

  if(animationsEnabled&&override?.primary)push({...override.primary,slotId:slot.id,source:'override-primary'});
  const base=slot.baseMediaIds.map(id=>cat.media.find(m=>m.id===id)).filter((m):m is Catalog['media'][number]=>!!m);
  if(animationsEnabled){
    for(const m of base.filter(m=>m.kind==='gif'))push({kind:m.kind,src:m.src,alt:m.alt,slotId:slot.id,source:'catalog',mediaId:m.id});
  }
  if(override?.static)push({...override.static,slotId:slot.id,source:'override-static'});
  for(const m of base.filter(m=>m.kind==='image'))push({kind:m.kind,src:m.src,alt:m.alt,slotId:slot.id,source:'catalog',mediaId:m.id});
  if(animationsEnabled){
    for(const m of base.filter(m=>m.kind==='video'))push({kind:m.kind,src:m.src,alt:m.alt,slotId:slot.id,source:'catalog',mediaId:m.id});
  }
  return result;
}

export function resolvePresentation(cat:Catalog,input:unknown,presentationId:string,options:{animationsEnabled?:boolean}={}):ResolvedPresentation{
  const patch=presentationSchema.parse(input);
  validateSlotOverrides(cat,patch);
  const animationsEnabled=options.animationsEnabled??true;
  const slots=presentationSlots(cat);
  const byId=new Map(slots.map(slot=>[slot.id,slot]));
  const diagnostics:string[]=[];
  let current=byId.get(presentationId);
  if(!current){
    diagnostics.push(`Неизвестный presentationId ${presentationId}; использован безопасный fallback.`);
    current=byId.get('location/town/default');
  }

  const candidates:ResolvedPresentationMedia[]=[];
  const seenSlots=new Set<string>();
  while(current&&!seenSlots.has(current.id)){
    seenSlots.add(current.id);
    candidates.push(...mediaCandidates(cat,current,patch.slots?.[current.id],animationsEnabled));
    const fallbackId=patch.slots?.[current.id]?.fallbackId??current.fallbackId;
    current=fallbackId?byId.get(fallbackId):undefined;
  }

  const unique:ResolvedPresentationMedia[]=[];
  const keys=new Set<string>();
  for(const candidate of candidates){
    const key=`${candidate.kind}|${candidate.src}`;
    if(keys.has(key))continue;
    keys.add(key);unique.push(candidate);
  }

  return {
    requestedId:presentationId,
    candidates:unique,
    textOnly:unique.length===0,
    diagnostics
  };
}
