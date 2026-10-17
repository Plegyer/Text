/* SUSLIK 2 media publisher — browser-only, technical metadata, no media previews. */
export const OWNER_REPO='Plegyer/Text';
export const BRANCH='suslik-2/portable-canonical-20261015';
export const MANIFEST_PATH='suslik-2/content/media-manager.published.js';
export const MAX_BYTES=95*1024*1024;
export const ALLOWED_EXTENSIONS=new Set(['png','jpg','jpeg','webp','gif','mp4']);
export const EXAMPLE_URL='https://github.com/'+OWNER_REPO+'/tree/'+BRANCH+'/suslik-2/';

export function parseManifest(source){
 const match=String(source).trim().match(/^window\.SUSLIK2_PUBLISHED_MEDIA\s*=\s*(\{[\s\S]*\})\s*;\s*$/);
 if(!match)throw Error('GitHub вернул незнакомый формат каталога. Публикация остановлена.');
 const data=JSON.parse(match[1]);
 if(!data||typeof data!=='object'||Array.isArray(data))throw Error('Каталог медиа повреждён.');
 for(const [key,values] of Object.entries(data)){
  if(!/^[a-zA-Z][a-zA-Z0-9]{0,70}$/.test(key)||!Array.isArray(values)||values.some(p=>typeof p!=='string'))
   throw Error('Каталог медиа содержит неизвестные значения.');
 }
 return data;
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
export function validateFiles(files,event){
 validateEvent(event);
 if(!Array.isArray(files)||files.length===0)throw Error('Сначала выбери хотя бы один файл.');
 if(files.length>event.maxFiles)throw Error('Слишком много файлов. Для этой сцены максимум: '+event.maxFiles+'.');
 for(const f of files){
  if(!f||!ALLOWED_EXTENSIONS.has(fileExtension(f.name)))throw Error('Неподдерживаемый формат: '+String(f?.name??''));
  if(!Number.isFinite(f.size)||f.size<0||f.size>MAX_BYTES)
   throw Error('Размер каждого файла должен быть не более 95 МБ.');
 }
}
export function planPublication(published,event,files){
 validateFiles(files,event);
 if(!published||typeof published!=='object'||Array.isArray(published))throw Error('Каталог медиа повреждён.');
 const prefix='assets/user-media/manager/'+event.id+'/';
 const path=f=>prefix+'slot-'+String(files.indexOf(f)+1).padStart(2,'0')+'.'+fileExtension(f.name);
 const nextPaths=files.map((f,i)=>prefix+'slot-'+String(i+1).padStart(2,'0')+'.'+fileExtension(f.name));
 const old=published[event.key]??[];
 if(!Array.isArray(old))throw Error('Каталог сцены повреждён.');
 const deletions=old.filter(p=>typeof p==='string'&&p.startsWith(prefix)&&
  /^assets\/user-media\/manager\/[a-z0-9-]+\/slot-\d\d\.(png|jpg|jpeg|webp|gif|mp4)$/.test(p)&&
  !nextPaths.includes(p));
 const mediaEntries=files.map((file,i)=>({file,path:'suslik-2/'+nextPaths[i]}));
 const next={...published,[event.key]:nextPaths};
 const manifest='window.SUSLIK2_PUBLISHED_MEDIA = '+JSON.stringify(next)+';\n';
 return {mediaEntries,deletions:deletions.map(p=>'suslik-2/'+p),manifest,nextPaths};
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
