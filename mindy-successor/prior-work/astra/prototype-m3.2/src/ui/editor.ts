import {applyPresentation,emptyPresentation,presentationSchema,presentationSlots,resolvePresentation,textFields,type Presentation,type PresentationSlotOverride} from '../core/presentation.ts';
import type {Catalog} from '../core/schema.ts';

const MAX_EMBEDDED_BYTES=2_000_000;

export function mountEditor(root:HTMLElement,base:Catalog,current:Presentation,save:(p:Presentation)=>void){
  let draft:Presentation={
    version:1,
    texts:{...current.texts},
    media:{...current.media},
    slots:{...(current.slots??{})}
  };
  const catalog=applyPresentation(base,draft),fields=textFields(catalog),slots=presentationSlots(catalog);
  const el=<K extends keyof HTMLElementTagNameMap>(tag:K,text='')=>{const n=document.createElement(tag);n.textContent=text;return n;};
  const status=el('p');status.setAttribute('role','status');

  const commit=(next:Presentation)=>{
    try{
      applyPresentation(base,next);
      save(next);
      draft=next;
      status.textContent='Изменения presentation сохранены.';
    }catch(e){
      status.textContent=e instanceof Error?e.message:String(e);
    }
  };

  root.append(el('h1','Тексты и изображения'),el('p','Presentation-замены хранятся отдельно от сохранения жизни и не меняют условия, награды или RNG. Медиа выбирается по стабильному presentationId.'));

  const textSelect=el('select');textSelect.setAttribute('aria-label','Фрагмент текста');
  for(const field of fields){const o=el('option',field.label);o.value=field.key;textSelect.append(o);}
  const area=el('textarea');area.rows=7;area.setAttribute('aria-label','Текст фрагмента');area.value=fields[0]?.value??'';
  textSelect.onchange=()=>{area.value=fields.find(f=>f.key===textSelect.value)?.value??'';};
  const applyText=el('button','Сохранить текст');
  applyText.onclick=()=>commit({...draft,texts:{...draft.texts,[textSelect.value]:area.value}});
  const insert=el('button','Вставить абзац');
  insert.onclick=()=>{area.setRangeText('\n\nНовый абзац',area.selectionStart,area.selectionEnd,'select');area.focus();};
  root.append(textSelect,area,insert,applyText,el('h2','Central stage media'));

  const search=el('input');search.type='search';search.placeholder='job/lumber, relationship, ending…';search.setAttribute('aria-label','Поиск presentationId');
  const media=el('select');media.setAttribute('aria-label','presentationId');
  const fillSlots=()=>{
    const q=search.value.trim().toLowerCase(),selected=media.value;
    media.replaceChildren();
    const filtered=slots.filter(slot=>!q||slot.id.toLowerCase().includes(q)||slot.label.toLowerCase().includes(q));
    for(const slot of filtered){const o=el('option',`${slot.id} · ${slot.label}`);o.value=slot.id;media.append(o);}
    if(filtered.some(slot=>slot.id===selected))media.value=selected;
  };
  fillSlots();search.oninput=fillSlots;

  const usage=el('p');
  const alt=el('input');alt.setAttribute('aria-label','Описание сцены');alt.placeholder='Краткое описание для доступности';
  const gif=el('input');gif.type='file';gif.accept='image/gif';gif.setAttribute('aria-label','Выбрать GIF для presentationId');
  const staticFile=el('input');staticFile.type='file';staticFile.accept='image/png,image/jpeg,image/webp';staticFile.setAttribute('aria-label','Выбрать static fallback');
  const fallback=el('p');
  const animation=el('input');animation.type='checkbox';animation.checked=true;animation.id='presentation-preview-animation';
  const animationLabel=el('label','Анимированный preview');animationLabel.htmlFor=animation.id;
  const preview=el('div');preview.className='presentation-preview';preview.setAttribute('aria-label','Предпросмотр central stage');

  const slotOverride=()=>draft.slots?.[media.value];
  const writeSlot=(next:PresentationSlotOverride|undefined)=>{
    const all={...(draft.slots??{})};
    if(next&&Object.keys(next).length)all[media.value]=next;else delete all[media.value];
    draft={...draft,slots:all};
  };
  const withAlt=(override:PresentationSlotOverride|undefined)=>{
    if(!override)return override;
    return {
      ...override,
      primary:override.primary?{...override.primary,alt:alt.value}:undefined,
      static:override.static?{...override.static,alt:alt.value}:undefined
    };
  };

  const renderPreview=()=>{
    try{
      const checked=applyPresentation(base,draft);
      const resolved=resolvePresentation(checked,draft,media.value,{animationsEnabled:animation.checked});
      const show=(index:number)=>{
        preview.replaceChildren();
        const candidate=resolved.candidates[index];
        if(!candidate){
          const missing=el('div','Сцена доступна без медиа');
          missing.className='media-window missing-art';
          preview.append(missing);
          return;
        }
        const holder=el('div');holder.className='media-window';
        const node=candidate.kind==='video'?el('video'):el('img');
        node.setAttribute('src',candidate.src);
        node.setAttribute('aria-label',candidate.alt);
        if(node instanceof HTMLImageElement)node.alt=candidate.alt;
        if(node instanceof HTMLVideoElement){node.controls=true;node.autoplay=true;node.loop=true;node.muted=true;}
        node.onerror=()=>show(index+1);
        holder.append(node);preview.append(holder);
      };
      show(0);
      if(resolved.diagnostics.length)status.textContent=resolved.diagnostics.join(' ');
    }catch(e){
      status.textContent=e instanceof Error?e.message:String(e);
    }
  };

  const sync=()=>{
    const slot=slots.find(s=>s.id===media.value);
    const override=slotOverride();
    usage.textContent=slot?`${slot.label}. Base media: ${slot.baseMediaIds.join(', ')||'нет'}`:'presentationId не найден';
    fallback.textContent=`Fallback: ${override?.fallbackId??slot?.fallbackId??'text-only'}`;
    alt.value=override?.primary?.alt??override?.static?.alt??slot?.label??'';
    gif.value='';staticFile.value='';
    renderPreview();
  };
  media.onchange=sync;animation.onchange=renderPreview;search.onchange=sync;

  const readFile=(input:HTMLInputElement,allowed:string[],done:(dataUrl:string,file:File)=>void)=>{
    const file=input.files?.[0];if(!file)return;
    if(file.size>MAX_EMBEDDED_BYTES){status.textContent='Файл превышает 2 МБ для встроенной presentation-замены.';input.value='';return;}
    if(!allowed.includes(file.type)){status.textContent='Неподдерживаемый формат файла.';input.value='';return;}
    const reader=new FileReader();
    reader.onerror=()=>{status.textContent='Не удалось прочитать выбранный файл.';input.value='';};
    reader.onload=()=>{const value=String(reader.result);done(value,file);renderPreview();};
    reader.readAsDataURL(file);
  };

  gif.onchange=()=>readFile(gif,['image/gif'],dataUrl=>{
    const currentSlot=slotOverride()??{};
    writeSlot({...currentSlot,primary:{kind:'gif',src:dataUrl,alt:alt.value||slots.find(s=>s.id===media.value)?.label||media.value}});
    status.textContent='GIF выбран. Проверьте preview и сохраните замену.';
  });
  staticFile.onchange=()=>readFile(staticFile,['image/png','image/jpeg','image/webp'],(dataUrl,file)=>{
    const currentSlot=slotOverride()??{};
    writeSlot({...currentSlot,static:{kind:'image',src:dataUrl,alt:alt.value||file.name}});
    status.textContent='Static fallback выбран. Проверьте preview и сохраните замену.';
  });

  const saveMedia=el('button','Сохранить media replacement');
  saveMedia.onclick=()=>{
    const next=withAlt(slotOverride());
    writeSlot(next);
    commit(draft);
  };
  const clearGif=el('button','Вернуть базовый GIF');
  clearGif.onclick=()=>{
    const currentSlot=slotOverride();if(!currentSlot)return;
    const {primary:_primary,...rest}=currentSlot;writeSlot(rest);renderPreview();
  };
  const clearStatic=el('button','Убрать static override');
  clearStatic.onclick=()=>{
    const currentSlot=slotOverride();if(!currentSlot)return;
    const {static:_static,...rest}=currentSlot;writeSlot(rest);renderPreview();
  };

  root.append(search,media,usage,alt,gif,staticFile,animation,animationLabel,preview,saveMedia,clearGif,clearStatic,fallback,el('h2','Перенос замен'));

  const exp=el('button','Экспорт presentation-замен');
  exp.onclick=()=>{
    const url=URL.createObjectURL(new Blob([JSON.stringify(draft,null,2)],{type:'application/json'}));
    const a=el('a');a.href=url;a.download='presentation.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  };
  const imp=el('input');imp.type='file';imp.accept='.json';imp.setAttribute('aria-label','Импорт presentation-замен');
  imp.onchange=async()=>{
    const file=imp.files?.[0];if(!file)return;
    try{
      if(file.size>15_000_000)throw new Error('Пакет превышает 15 МБ.');
      const next=presentationSchema.parse(JSON.parse(await file.text()));
      applyPresentation(base,next);
      commit(next);
    }catch(e){status.textContent=e instanceof Error?e.message:String(e);}
  };
  const reset=el('button','Убрать пользовательские замены');
  reset.onclick=()=>{if(confirm('Вернуть тексты и presentation media к исходному каталогу? Сохранение жизни не изменится.'))commit(emptyPresentation());};
  root.append(exp,imp,reset,status);

  sync();
}
