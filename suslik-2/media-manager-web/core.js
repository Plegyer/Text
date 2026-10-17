/* SUSLIK 2 media publisher — browser-only, technical metadata, no media previews. */
export const OWNER_REPO='Plegyer/Text';
export const BRANCH='suslik-2/portable-canonical-20261015';
export const MANIFEST_PATH='suslik-2/content/media-manager.published.js';
export const MAX_BYTES=95*1024*1024;
export const SINGLE_BLOB_BYTES=8*1024*1024;
export const MEDIA_PART_BYTES=2*1024*1024;
export const ALLOWED_EXTENSIONS=new Set(['png','jpg','jpeg','webp','gif','mp4']);
export const EXAMPLE_URL='https://github.com/'+OWNER_REPO+'/tree/'+BRANCH+'/suslik-2/';

export function parseManifest(source){
 const match=String(source).trim().match(/^window\.SUSLIK2_PUBLISHED_MEDIA\s*=\s*(\{[\s\S]*\})\s*;\s*$/);
 if(!match)throw Error('GitHub вернул незнакомый формат каталога. Публикация остановлена.');
 const data=JSON.parse(match[1]);
 if(!data||typeof data!=='object'||Array.isArray(data))throw Error('Каталог медиа повреждён.');
 for(const [key,values] of Object.entries(data)){
  if(!/^[a-zA-Z][a-zA-Z0-9]{0,70}$/.test(key)||!Array.isArray(values)||values.some(p=>!isMediaValue(p)))
   throw Error('Каталог медиа содержит неизвестные значения.');
 }
 return data;
}
export function isMediaValue(item){
 if(typeof item==='string')return true;
 return !!item && typeof item==='object' && !Array.isArray(item) &&
  item.type==='chunked-mp4' && Array.isArray(item.parts) && item.parts.length>0 && item.parts.length<=100 &&
  item.parts.every(p=>typeof p==='string' && /^assets\/user-media\/manager\/[a-z0-9-]+\/[a-f0-9-]{36}\/slot-[0-9]{2}-part-[0-9]{3}\.js$/.test(p));
}
export function fileExtension(filename){
 const match=String(filename).toLowerCase().match(/\.([a-z0-9]+)$/);
 return match?match[1]:'';
}
export function validateEvent(event){
 if(!event||!/^([a-z][a-z0-9-]{1,50})$/.test(event.id)||!/^[a-zA-Z][a-zA-Z0-9]{0,70}$/.test(event.key)||
    !Number.isInteger(event.maxFiles)||event.maxFiles<1||event.maxFiles>30)throw Error('В списке событий обнаружена ошибка.');
 return event;
}
export function validateFiles(files,event,{existingCount=0,mode='append'}={}){
 validateEvent(event);
 if(!Array.isArray(files)||files.length===0)throw Error('Сначала выбери хотя бы один файл.');
 if(!['append','replace'].includes(mode))throw Error('Неизвестный режим публикации.');
 if(!Number.isInteger(existingCount)||existingCount<0||existingCount>event.maxFiles)throw Error('Текущий набор содержит слишком много файлов.');
 const remaining=mode==='append'?event.maxFiles-existingCount:event.maxFiles;
 if(files.length>remaining)throw Error('Недостаточно мест: можно добавить ещё '+remaining+' файлов. Для полной замены выбери «Заменить весь набор».');
 for(const f of files){
  if(!f||!ALLOWED_EXTENSIONS.has(fileExtension(f.name)))throw Error('Неподдерживаемый формат: '+String(f?.name??''));
  if(!Number.isFinite(f.size)||f.size<=0||f.size>MAX_BYTES)
   throw Error('Размер каждого файла должен быть больше 0 и не более 95 МБ.');
 }
}
export function planPublication(published,event,files,publicationId=crypto.randomUUID(),mode='append'){
 validateEvent(event);
 if(!published||typeof published!=='object'||Array.isArray(published))throw Error('Каталог медиа повреждён.');
 if(!/^[a-f0-9-]{36}$/.test(publicationId))throw Error('Некорректный идентификатор публикации.');
 const prefix='assets/user-media/manager/'+event.id+'/'+publicationId+'/';
 const old=published[event.key]??[];
 if(!Array.isArray(old)||old.some(p=>!isMediaValue(p)))throw Error('Каталог сцены повреждён.');
 validateFiles(files,event,{existingCount:old.length,mode});
 const mediaEntries=[];
 const addedPaths=files.map((file,i)=>{
  const base=prefix+'slot-'+String(i+1).padStart(2,'0');
  const ext=fileExtension(file.name);
  if(ext==='mp4' && file.size>SINGLE_BLOB_BYTES){
   const count=Math.ceil(file.size/MEDIA_PART_BYTES);
   const parts=Array.from({length:count},(_,index)=>base+'-part-'+String(index+1).padStart(3,'0')+'.js');
   for(let partIndex=0;partIndex<count;partIndex++)
    mediaEntries.push({file,partIndex,partCount:count,partPath:parts[partIndex],path:'suslik-2/'+parts[partIndex]});
   return {type:'chunked-mp4',parts};
  }
  const path=base+'.'+ext;
  mediaEntries.push({file,path:'suslik-2/'+path});
  return path;
 });
 const nextPaths=mode==='append'?[...old,...addedPaths]:addedPaths;
 const next={...published,[event.key]:nextPaths};
 const manifest='window.SUSLIK2_PUBLISHED_MEDIA = '+JSON.stringify(next)+';\n';
 return {mediaEntries,deletions:[],manifest,nextPaths,addedPaths};
}
export async function encodeFile(file){
 const bytes=new Uint8Array(await file.arrayBuffer());
 // 3-byte-aligned chunks keep concatenation a valid base64 payload.
 const step=24576;
 let out='';
 for(let i=0;i<bytes.length;i+=step){
  const part=bytes.subarray(i,Math.min(bytes.length,i+step));
  let binary='';
  for(let n=0;n<part.length;n+=8192){
   binary+=String.fromCharCode(...part.subarray(n,Math.min(part.length,n+8192)));
  }
  out+=btoa(binary);
 }
 return out;
}
export function toBase64Text(text){
 return btoa(String.fromCharCode(...new TextEncoder().encode(text)));
}
export function decodeContent(content){
 const binary=atob(String(content).replace(/\s/g,''));
 const bytes=Uint8Array.from(binary,c=>c.charCodeAt(0));
 return new TextDecoder().decode(bytes);
}


/* Large videos use JS data fragments so local file:// game builds can reconstruct MP4 safely. */
export async function encodeVideoPart(file,partIndex,partPath){
 if(!Number.isInteger(partIndex)||partIndex<0)throw Error('Неизвестный номер части видео.');
 const bytes=new Uint8Array(await file.slice(
  partIndex*MEDIA_PART_BYTES,Math.min(file.size,(partIndex+1)*MEDIA_PART_BYTES)).arrayBuffer());
 if(bytes.length===0||bytes.length>MEDIA_PART_BYTES)throw Error('Повреждённая часть загружаемого видео.');
 const encoded=await encodeFile({arrayBuffer:async()=>bytes.buffer});
 return 'window.SUSLIK2_MEDIA_PARTS = window.SUSLIK2_MEDIA_PARTS || Object.create(null);\n'+
  'window.SUSLIK2_MEDIA_PARTS['+JSON.stringify(partPath)+'] = '+JSON.stringify(encoded)+';\n';
}
