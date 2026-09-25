import {applyPresentation,textFields,presentationSchema,type Presentation} from '../core/presentation.ts';
import type {Catalog} from '../core/schema.ts';
export function mountEditor(root:HTMLElement,base:Catalog,current:Presentation,save:(p:Presentation)=>void){
  const catalog=applyPresentation(base,current),fields=textFields(catalog);
  const el=<K extends keyof HTMLElementTagNameMap>(tag:K,text='')=>{const n=document.createElement(tag);n.textContent=text;return n;};
  root.append(el('h1','Тексты и изображения'),el('p','Выберите фрагмент, замените текст или вставьте абзац. Условия и награды остаются прежними. Изменения хранятся отдельно от сохранения игры; экспортируйте пакет для переноса. Старые записи дневника не переписываются.'));
  const select=el('select');select.setAttribute('aria-label','Фрагмент текста');
  for(const f of fields){const o=el('option',f.label);o.value=f.key;select.append(o);}
  const area=el('textarea');area.rows=9;area.setAttribute('aria-label','Текст фрагмента');area.value=fields[0]?.value??'';
  select.onchange=()=>{area.value=fields.find(f=>f.key===select.value)!.value;};
  const status=el('p');status.setAttribute('role','status');
  const commit=(next:Presentation)=>{try{applyPresentation(base,next);save(next);}catch(e){status.textContent=String(e);}};
  const apply=el('button','Сохранить текст');apply.onclick=()=>commit({...current,texts:{...current.texts,[select.value]:area.value}});
  const insert=el('button','Вставить абзац');insert.onclick=()=>{area.setRangeText('\n\nНовый абзац',area.selectionStart,area.selectionEnd,'select');area.focus();};
  root.append(select,area,insert,apply,el('h2','Медиа'));
  const media=el('select');media.setAttribute('aria-label','Медиа');for(const m of catalog.media){const o=el('option',`${m.id} · ${m.alt}`);o.value=m.id;media.append(o);}
  const path=el('input');path.placeholder='assets/my-scene.webp';path.setAttribute('aria-label','Путь медиа');
  const alt=el('input');alt.setAttribute('aria-label','Описание медиа');
  const kind=el('select');for(const k of ['image','gif','video']){const o=el('option',k);o.value=k;kind.append(o);}
  const sync=()=>{const m=catalog.media.find(m=>m.id===media.value)!;path.value=m.src;alt.value=m.alt;kind.value=m.kind;};sync();media.onchange=sync;
  const preview=el('div');const show=el('button','Предпросмотр');show.onclick=()=>{try{
    const patch={...current,media:{...current.media,[media.value]:{src:path.value,alt:alt.value,kind:kind.value as 'image'|'gif'|'video'}}};applyPresentation(base,patch);
    preview.replaceChildren();const node=kind.value==='video'?el('video'):el('img');node.setAttribute('src',path.value);node.setAttribute('aria-label',alt.value);if(node instanceof HTMLVideoElement)node.controls=true;preview.append(node);
  }catch(e){status.textContent=String(e);}};
  const upload=el('input');upload.type='file';upload.accept='image/png,image/jpeg,image/webp,image/gif';upload.setAttribute('aria-label','Загрузить изображение');
  upload.onchange=()=>{const f=upload.files?.[0];if(!f)return;if(f.size>2_000_000){status.textContent='Для встроенного изображения предел 2 МБ. Большие файлы положите в assets/.';return;}const reader=new FileReader();reader.onload=()=>{path.value=String(reader.result);kind.value=f.type==='image/gif'?'gif':'image';};reader.readAsDataURL(f);};
  const applyMedia=el('button','Сохранить медиа');applyMedia.onclick=()=>commit({...current,media:{...current.media,[media.value]:{src:path.value,alt:alt.value,kind:kind.value as 'image'|'gif'|'video'}}});
  root.append(media,path,alt,kind,upload,show,applyMedia,preview,el('h2','Перенос замен'));
  const exp=el('button','Экспорт замен');exp.onclick=()=>{const url=URL.createObjectURL(new Blob([JSON.stringify(current,null,2)],{type:'application/json'}));const a=el('a');a.href=url;a.download='presentation.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
  const imp=el('input');imp.type='file';imp.accept='.json';imp.setAttribute('aria-label','Импорт замен');imp.onchange=async()=>{const f=imp.files?.[0];if(!f)return;try{if(f.size>15_000_000)throw new Error('Пакет превышает 15 МБ.');const next=presentationSchema.parse(JSON.parse(await f.text()));commit(next);}catch(e){status.textContent=String(e);}};
  const reset=el('button','Убрать пользовательские замены');reset.onclick=()=>{if(confirm('Вернуть тексты и медиа из исходного каталога? Сохранение жизни не изменится.'))commit({version:1,texts:{},media:{}});};
  root.append(exp,imp,reset,status);
}
