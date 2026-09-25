import {z} from 'zod';
import {loadCatalog} from './content.ts';
import type {Catalog} from './schema.ts';
const source=z.string().max(3_000_000).refine(s=>/^assets\/[a-zA-Z0-9/_-]+\.(svg|png|jpg|jpeg|webp|gif|mp4|webm)$/.test(s)||/^data:image\/(png|jpeg|webp|gif);base64,[A-Za-z0-9+/]+={0,2}$/.test(s),'Только локальный assets/ путь или загруженное изображение PNG/JPEG/WebP/GIF.');
export const presentationSchema=z.object({version:z.literal(1),texts:z.record(z.string(),z.string().min(1).max(5000)),media:z.record(z.string(),z.object({kind:z.enum(['image','gif','video']),src:source,alt:z.string().min(1).max(300)}).strict())}).strict();
export type Presentation=z.infer<typeof presentationSchema>;
export const emptyPresentation=():Presentation=>({version:1,texts:{},media:{}});
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
  return checked;
}
