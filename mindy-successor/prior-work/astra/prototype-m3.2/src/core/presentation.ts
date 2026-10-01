import {z} from 'zod';
import {loadCatalog} from './content.ts';
import type {Catalog} from './schema.ts';
import {SCHOOL_COURSES} from './school.ts';

const source=z.string().max(3_000_000).refine(
  s=>/^assets\/[a-zA-Z0-9/_-]+\.(svg|png|jpg|jpeg|webp|gif|mp4|webm)$/.test(s)||/^data:image\/(png|jpeg|webp|gif);base64,[A-Za-z0-9+/]+={0,2}$/.test(s),
  'Только локальный assets/ путь или загруженное изображение PNG/JPEG/WebP/GIF.'
);
const gifSource=source.refine(
  s=>/^assets\/[a-zA-Z0-9/_-]+\.gif$/.test(s)||/^data:image\/gif;base64,[A-Za-z0-9+/]+={0,2}$/.test(s),
  'Primary presentation media должен быть GIF.'
);
const staticSource=source.refine(
  s=>/^assets\/[a-zA-Z0-9/_-]+\.(svg|png|jpg|jpeg|webp)$/.test(s)||/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(s),
  'Static fallback должен быть SVG/PNG/JPEG/WebP.'
);
const presentationIdSchema=z.string().min(1).max(240).regex(/^[a-z0-9][a-z0-9/._-]*$/,'Некорректный presentationId.');
const legacyMediaOverrideSchema=z.object({
  kind:z.enum(['image','gif','video']),
  src:source,
  alt:z.string().min(1).max(300)
}).strict();
const localizedAltKey=z.string().min(1).max(240).regex(/^[a-z0-9][a-z0-9._-]*$/,'Некорректный localization alt key.');
const gifOverrideSchema=z.object({
  kind:z.literal('gif'),
  src:gifSource,
  alt:z.string().min(1).max(300),
  altKey:localizedAltKey.optional()
}).strict();
const staticOverrideSchema=z.object({
  kind:z.literal('image'),
  src:staticSource,
  alt:z.string().min(1).max(300),
  altKey:localizedAltKey.optional()
}).strict();
const poolCandidateKeySchema=z.string().min(1).max(120).regex(/^[a-z0-9][a-z0-9._-]*$/,'Некорректный media candidate key.');
const poolCandidateSchema=z.object({
  key:poolCandidateKeySchema,
  kind:z.literal('gif'),
  src:gifSource,
  alt:z.string().min(1).max(300),
  altKey:localizedAltKey.optional(),
  weight:z.number().finite().positive().optional()
}).strict();
const mediaPoolSchema=z.object({
  version:z.number().int().min(1).max(1000).default(1),
  ordering:z.enum(['ordered','unordered']).default('ordered'),
  selectionPolicy:z.enum(['unweighted','weighted']).default('unweighted'),
  candidates:z.array(poolCandidateSchema).min(3).max(5)
}).strict().superRefine((pool,ctx)=>{
  const keys=new Set<string>();
  for(let i=0;i<pool.candidates.length;i++){
    const key=pool.candidates[i]!.key;
    if(keys.has(key))ctx.addIssue({code:'custom',path:['candidates',i,'key'],message:`Duplicate media candidate key ${key}.`});
    keys.add(key);
  }
});
const slotOverrideSchema=z.object({
  primary:gifOverrideSchema.optional(),
  pool:mediaPoolSchema.optional(),
  static:staticOverrideSchema.optional(),
  fallbackId:presentationIdSchema.optional()
}).strict().superRefine((slot,ctx)=>{
  if(slot.primary&&slot.pool)ctx.addIssue({code:'custom',path:['pool'],message:'presentation slot cannot define both primary and pool.'});
});

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
  altKey?:string;
  slotId:string;
  source:'override-primary'|'override-pool'|'override-static'|'catalog';
  mediaId?:string;
  candidateKey?:string;
  weight?:number;
  poolVersion?:number;
}

export interface ResolvedPresentation {
  requestedId:string;
  candidates:ResolvedPresentationMedia[];
  selected?:ResolvedPresentationMedia;
  textOnly:boolean;
  diagnostics:string[];
}

export const emptyPresentation=():Presentation=>({version:1,texts:{},media:{}});

const jobIds=new Set(['tavern','lumber','hunt','hunter','guard','satyr-maid','undead-farm','artist-geisha','assassin','merchant','prostitute']);
const clean=(value:string)=>value.toLowerCase().replace(/[^a-z0-9_-]+/g,'-').replace(/^-+|-+$/g,'')||'default';
const pathParts=(value:string)=>value.toLowerCase().split(/[./]+/).map(clean).filter(Boolean);
const semanticPath=(value:string)=>pathParts(value).join('/');
const scenePath=(sceneId:string)=>{
  const path=semanticPath(sceneId)||'default';
  return path==='default'||path.endsWith('/default')?path:`${path}/default`;
};
const actionRoot=(actionId:string)=>pathParts(actionId)[0]??'default';
const sameIds=(a:string[],b:string[])=>a.length===b.length&&a.every((id,i)=>id===b[i]);

function jobIdForAction(actionId:string){
  const root=actionRoot(actionId);
  return jobIds.has(root)?root:null;
}
function schoolTrackForAction(actionId:string){
  const parts=pathParts(actionId);
  if(parts[0]==='school')return parts.slice(1).join('-')||'general';
  const legacy=parts[0]??'';
  return legacy.endsWith('-class')?legacy.slice(0,-6):null;
}
function actionPresentationId(actionId:string,sceneId:string){
  const jobId=jobIdForAction(actionId);
  if(jobId)return `job/${jobId}/shift/${scenePath(sceneId)}`;
  const root=actionRoot(actionId);
  if(root==='forest-search')return `activity/forest/route/${scenePath(sceneId)}`;
  const track=schoolTrackForAction(actionId);
  if(track)return `school/${track}/lesson/${scenePath(sceneId)}`;
  if(root==='rest'||root==='rent-room')return `night/${root}/${scenePath(sceneId)}`;
  return `location/town/${semanticPath(actionId)}/${scenePath(sceneId)}`;
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

export function presentationIdForActionResult(cat:Catalog,actionId:string,mediaIds:string[]=[]){
  const action=cat.definitions.actions.find(a=>a.id===actionId);
  const scenes=action?.scenes??[];
  const scene=scenes.find(s=>sameIds(s.media,mediaIds))
    ??scenes.find(s=>s.media.some(id=>mediaIds.includes(id)))
    ??scenes.find(s=>s.id==='default')
    ??scenes[0];
  const jobId=jobIdForAction(actionId);
  if(jobId){
    const targetShaped=pathParts(actionId)[1]==='shift';
    return `job/${jobId}/result/${targetShaped?'default':(semanticPath(scene?.id??'default')||'default')}`;
  }
  return actionPresentationId(actionId,scene?.id??'default');
}

export function presentationIdForActivityRoute(cat:Catalog,activityId:string,routeId:string|null|undefined){
  const activity=cat.definitions.activities?.find(item=>item.id===activityId);
  const slug=pathParts(activityId).at(-1)??'activity';
  const fallback=`activity/${slug}/route/default`;
  if(!activity||!routeId)return fallback;
  return activity.options.some(option=>option.setRoute===routeId)
    ?`activity/${slug}/route/${clean(routeId)}`
    :fallback;
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

export const SATYR_MAID_PRESENTATION_STAGES=[
  'new-maid','floor-rhythm','known-face','house-regular','veteran-service',
  'house-power','personal-network','boundaries','outcome-ready'
] as const;

export const SATYR_MAID_CAREER_EVENT_IDS=[
  'satyr-maid.career.first-shift',
  'satyr-maid.career.known-face',
  'satyr-maid.career.house-regular',
  'satyr-maid.career.veteran-service',
  'satyr-maid.career.house-power',
  'satyr-maid.career.personal-network',
  'satyr-maid.career.boundaries',
  'satyr-maid.career.outcome-ready'
] as const;

export function presentationIdForSatyrMaidCareerEvent(eventId:string){
  return `job/satyr-maid/event/${clean(eventId)}/default`;
}

export function presentationIdForSatyrMaidStage(stage:string){
  return `job/satyr-maid/stage/${clean(stage)}`;
}

export function presentationIdForEnding(endingId:string){
  const parts=pathParts(endingId);
  if(parts[0]==='ending')parts.shift();
  return `ending/${parts.join('/')||'default'}`;
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
      if(jobIdForAction(action.id)){
        add({
          id:presentationIdForActionResult(cat,action.id,scene.media),
          label:`${action.label} · результат · ${scene.id}`,
          baseMediaIds:scene.media,
          fallbackId:actionPresentationId(action.id,scene.id)
        });
      }
    }
  }

  // Presentation-only stage surfaces reserved from Chat 1's published C1D-97
  // Satyr Maid runtime contract. They consume a gameplay stage string but do
  // not define or advance career state.
  for(const stage of SATYR_MAID_PRESENTATION_STAGES){
    add({
      id:presentationIdForSatyrMaidStage(stage),
      label:`Satyr Maid · stage · ${stage}`,
      baseMediaIds:[],
      fallbackId:'job/satyr-maid/result/default'
    });
  }

  // C1D-98 publishes the career event IDs on Chat 1's Satyr branch. Reserve
  // their presentation identities so this stacked presentation branch can be
  // built before the gameplay branch is merged.
  for(const eventId of SATYR_MAID_CAREER_EVENT_IDS){
    add({
      id:presentationIdForSatyrMaidCareerEvent(eventId),
      label:`Satyr Maid · career event · ${eventId}`,
      baseMediaIds:[],
      fallbackId:'job/satyr-maid/result/default'
    });
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

  for(const course of SCHOOL_COURSES){
    add({
      id:course.presentationId,
      label:`${course.label} · lesson`,
      baseMediaIds:cat.media.some(m=>m.id==='stage.school')?['stage.school']:[],
      fallbackId:'location/town/default'
    });
  }

  for(const activity of cat.definitions.activities??[]){
    const slug=pathParts(activity.id).at(-1)??'activity';
    const routeId=`activity/${slug}/route/default`;
    add({
      id:routeId,
      label:`${activity.label} · route`,
      baseMediaIds:cat.media.some(m=>m.id==='stage.hunt')?['stage.hunt']:[],
      fallbackId:'location/town/default'
    });
    for(const specificRoute of [...new Set(activity.options.map(option=>option.setRoute).filter((value):value is string=>!!value))]){
      add({
        id:`activity/${slug}/route/${clean(specificRoute)}`,
        label:`${activity.label} · route · ${specificRoute}`,
        baseMediaIds:[],
        fallbackId:routeId
      });
    }
    for(const result of activity.results){
      add({
        id:`activity/${slug}/return/${result.outcome}`,
        label:`${activity.label} · ${result.outcome}`,
        baseMediaIds:cat.media.some(m=>m.id==='stage.hunt')?['stage.hunt']:[],
        fallbackId:routeId
      });
    }
  }

  // Presentation-owned full-roster Hard Work semantic surface. These IDs do not
  // create ending gameplay/state; they keep media/accessibility ready for the
  // ordinary career IDs already present in the production catalog.
  for(const career of cat.definitions.careers??[]){
    const careerId=clean(career.id);
    const resultId=`job/${careerId}/result/default`;
    add({
      id:`ending/${careerId}/hard-work`,
      label:`${career.label} · Hard Work · финал`,
      baseMediaIds:[],
      fallbackId:careerId==='lumber'?'location/town/default':slots.has(resultId)?resultId:'location/town/default'
    });
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

function stablePresentationHash(value:string){
  let hash=2166136261;
  for(let i=0;i<value.length;i++){
    hash^=value.charCodeAt(i);
    hash=Math.imul(hash,16777619);
  }
  return hash>>>0;
}

export function selectPresentationPoolIndex(
  candidates:ReadonlyArray<{weight?:number}>,
  input:{presentationId:string;occurrenceKey?:string;poolVersion?:number;selectionPolicy?:'unweighted'|'weighted'}
){
  if(!candidates.length)return -1;
  const seed=stablePresentationHash(`${input.presentationId}|${input.occurrenceKey??input.presentationId}|v${input.poolVersion??1}`);
  if(input.selectionPolicy==='weighted'){
    const weights=candidates.map(candidate=>candidate.weight??1);
    const total=weights.reduce((sum,weight)=>sum+weight,0);
    let ticket=(seed/4294967296)*total;
    for(let i=0;i<weights.length;i++){
      ticket-=weights[i]!;
      if(ticket<0)return i;
    }
    return weights.length-1;
  }
  return seed%candidates.length;
}

function mediaCandidates(
  cat:Catalog,
  slot:PresentationSlot,
  override:PresentationSlotOverride|undefined,
  animationsEnabled:boolean,
  occurrenceKey?:string
){
  const result:ResolvedPresentationMedia[]=[];
  const push=(candidate:ResolvedPresentationMedia)=>result.push(candidate);

  const base=slot.baseMediaIds.map(id=>cat.media.find(m=>m.id===id)).filter((m):m is Catalog['media'][number]=>!!m);
  if(animationsEnabled&&override?.primary){
    push({...override.primary,slotId:slot.id,source:'override-primary'});
    if(override.static)push({...override.static,slotId:slot.id,source:'override-static'});
  }
  if(animationsEnabled&&override?.pool){
    const pool=override.pool;
    const selected=selectPresentationPoolIndex(pool.candidates,{
      presentationId:slot.id,
      occurrenceKey,
      poolVersion:pool.version,
      selectionPolicy:pool.selectionPolicy
    });
    const order=selected<0?[]:[
      pool.candidates[selected]!,
      ...pool.candidates.filter((_,index)=>index!==selected)
    ];
    for(const candidate of order){
      push({
        kind:'gif',
        src:candidate.src,
        alt:candidate.alt,
        altKey:candidate.altKey,
        slotId:slot.id,
        source:'override-pool',
        candidateKey:candidate.key,
        weight:candidate.weight,
        poolVersion:pool.version
      });
    }
    if(override.static)push({...override.static,slotId:slot.id,source:'override-static'});
  }
  if(animationsEnabled){
    for(const m of base.filter(m=>m.kind==='gif'))push({kind:m.kind,src:m.src,alt:m.alt,slotId:slot.id,source:'catalog',mediaId:m.id});
  }
  if(!override?.primary&&!override?.pool&&override?.static)push({...override.static,slotId:slot.id,source:'override-static'});
  if(!animationsEnabled&&override?.static)push({...override.static,slotId:slot.id,source:'override-static'});
  for(const m of base.filter(m=>m.kind==='image'))push({kind:m.kind,src:m.src,alt:m.alt,slotId:slot.id,source:'catalog',mediaId:m.id});
  if(animationsEnabled){
    for(const m of base.filter(m=>m.kind==='video'))push({kind:m.kind,src:m.src,alt:m.alt,slotId:slot.id,source:'catalog',mediaId:m.id});
  }
  return result;
}

export function resolvePresentation(cat:Catalog,input:unknown,presentationId:string,options:{animationsEnabled?:boolean;occurrenceKey?:string}={}):ResolvedPresentation{
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
    candidates.push(...mediaCandidates(cat,current,patch.slots?.[current.id],animationsEnabled,options.occurrenceKey));
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
    selected:unique[0],
    textOnly:unique.length===0,
    diagnostics
  };
}
