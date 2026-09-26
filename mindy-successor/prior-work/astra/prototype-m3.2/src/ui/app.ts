import {mountEditor} from './editor.ts';
import {applyPresentation,emptyPresentation,resolvePresentation,presentationIdForAction,presentationIdForEvent,presentationIdForEnding,type Presentation} from '../core/presentation.ts';
import {loadCatalog} from '../core/content.ts';
import {freshSave,dispatch,parseSave,eligible,calendar,actionCost,meets,energyMax,rent,favorStat,type Command} from '../core/engine.ts';
import {stats,type Save,type Catalog,type Condition,type Action} from '../core/schema.ts';
import {labels,hints} from './labels.ts';
declare global {interface Window {gameStorage?:{load:()=>Promise<{text:string;recovered:boolean}|null>;save:(text:string)=>Promise<void>}}}
const app=document.querySelector<HTMLDivElement>('#app')!;
const esc=(s:unknown)=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
let baseCatalog:Catalog,catalog:Catalog,state:Save,patch:Presentation=emptyPresentation();
let panel='',screen='town',busy=false,locked=false,message='',error=false,mediaIndex=0;\nlet animationsEnabled=localStorage.getItem('portal-life.presentation.animations')!=='off';
const professions=['tavern','lumber','hunt','guard'];
function explain(c:Condition):string{
 const cmp=(op:'gte'|'lte'|'eq',value:number)=>`${op==='gte'?'≥':op==='lte'?'≤':'='} ${value}`;
 switch(c.kind){
 case 'stat':return `${labels[c.stat]??c.stat} ${cmp(c.op,c.value)}`;
 case 'resource':return `${labels[c.resource]??c.resource} ${cmp(c.op,c.value)}`;
 case 'itemCount':return `${labels[c.id]??c.id} ${cmp(c.op,c.count)}`;
 case 'calendarYear':return `Год ${cmp(c.op,c.value)}`;
 case 'calendarSeason':return labels[c.value]??c.value;
 case 'calendarDayInYear':return `День года ${cmp(c.op,c.value)}`;
 case 'calendarElapsedDays':return `Прошло дней ${cmp(c.op,c.value)}`;
 case 'housingTier':return `Жильё: ${labels[c.value]??c.value}`;
 case 'careerStage':return `Карьера ${c.career}: этап ${c.stage}`;
 case 'careerShifts':return `Карьера ${c.career}: смен ${cmp(c.op,c.value)}`;
 case 'careerCounter':return `Карьера ${c.career}: ${c.counter} ${cmp(c.op,c.value)}`;
 case 'careerFact':return `Карьера ${c.career}: факт ${c.fact} ${c.present?'есть':'отсутствует'}`;
 case 'careerChoice':return `Карьера ${c.career}: ${c.choice} = ${c.value}`;
 case 'questStage':return `Задание ${c.quest}: этап ${c.stage}`;
 case 'questCounter':return `Задание ${c.quest}: ${c.counter} ${cmp(c.op,c.value)}`;
 case 'questFact':return `Задание ${c.quest}: факт ${c.fact} ${c.present?'есть':'отсутствует'}`;
 case 'questChoice':return `Задание ${c.quest}: ${c.choice} = ${c.value}`;
 case 'relationshipStage':return `Отношения ${c.relationship}: этап ${c.stage}`;
 case 'relationshipCounter':return `Отношения ${c.relationship}: ${c.counter} ${cmp(c.op,c.value)}`;
 case 'relationshipFact':return `Отношения ${c.relationship}: факт ${c.fact} ${c.present?'есть':'отсутствует'}`;
 case 'relationshipChoice':return `Отношения ${c.relationship}: ${c.choice} = ${c.value}`;
 case 'worldFact':return `Факт мира ${c.fact}: ${c.present?'есть':'нет'}`;
 case 'metaUnlock':return `Наследие ${c.unlock}: ${c.present?'есть':'нет'}`;
 case 'metaEndingCompleted':return `Судьба ${c.ending}: ${c.present?'пройдена':'не пройдена'}`;
 case 'metaHardWork':return `Тяжкий труд ${c.career}: ${c.present?'завершён':'не завершён'}`;
 case 'metric':return `${labels[c.key]??c.key} ${cmp(c.op,c.value)}`;
 case 'visits':return `${catalog.definitions.actions.find(a=>a.id===c.action)?.label??c.action}: ${c.value} смен`;
 case 'flag':return c.value?'Продвиньте связанную историю':'Этот этап уже пройден';
 case 'season':return labels[c.value];case 'housing':return labels[c.value];case 'unlock':return labels[c.value];
 case 'item':return `${labels[c.id]} × ${c.count}`;case 'not':return `Не требуется: ${explain(c.condition)}`;
 case 'all':return c.conditions.map(explain).join(' и ');case 'any':return c.conditions.map(explain).join(' или ');
 }
}
async function write(s:Save){const text=JSON.stringify(s);parseSave(text,catalog);if(window.gameStorage)await window.gameStorage.save(text);else{
 const old=localStorage.getItem('portal-life.v1');if(old){try{parseSave(old,catalog);localStorage.setItem('portal-life.v1.bak',old);}catch{}}
 localStorage.setItem('portal-life.v1',text);
}}
async function perform(cmd:Command){
 if(busy||locked)return;busy=true;render();
 try{const next=dispatch(state,cmd,catalog);await write(next);state=next;error=false;message='';mediaIndex=0;
  if(!['allocate','finishCreation'].includes(cmd.type)){panel='';screen=['restart','newLife'].includes(cmd.type)?'town':'scene';}
 }catch(e){message=e instanceof Error?e.message:String(e);error=true;}
 busy=false;render();
}
function disabled(a:Action){return busy||locked||state.run.status!=='active'||!state.run.creation.complete||!!state.run.pending||!!state.run.flow.night||!!state.run.flow.activity||!eligible(a.conditions,state,catalog)||state.run.metrics.money<actionCost(a,state)||state.run.metrics.energy<a.cost.energy;}
function actionList(ids:string[]){return `<div class="activity-list">${ids.map(id=>catalog.definitions.actions.find(a=>a.id===id)).filter((a):a is Action=>!!a).map(a=>{
 const miss=a.conditions.filter(c=>!meets(c,state,catalog));
 const statsEffects=[...a.effects,...(a.seasonal?.[calendar(state.run.day).season]??[])].filter(e=>e.kind==='metric'&&(stats as readonly string[]).includes(e.key));
 const forecast=a.wage?Math.round(a.wage.base+a.wage.weights.reduce((sum,w)=>sum+state.run.metrics[w.stat]*w.factor,0)):null;
 return `<article class="activity"><div><h3>${esc(a.label)}</h3><p>${esc(a.description)}</p><small>${a.cost.energy} энергии${actionCost(a,state)?` · ${actionCost(a,state)} монет`:''}${forecast!==null?` · доход ≈ ${forecast}`:''}</small><div class="effect-tags">${statsEffects.map(e=>e.kind==='metric'?`<span class="${e.delta>0?'gain':'loss'}">${esc(labels[e.key])} ${e.delta>0?'+':''}${e.delta}</span>`:'').join('')}</div>${miss.length?`<p class="requirement">${esc(miss.map(explain).join(' · '))}</p>`:''}</div>${a.mode==='brew'?`<div><button data-action="${a.id}" data-recipe="gentle" ${disabled(a)?'disabled':''}>Надёжно</button><button data-action="${a.id}" data-recipe="bold" ${disabled(a)?'disabled':''}>Быстро</button></div>`:`<button data-action="${a.id}" ${disabled(a)?'disabled':''}>${professions.includes(a.id)?'Работать':'Выбрать'}</button>`}</article>`;
 }).join('')}</div>`;}
function mediaHTML(presentationId:string){
 const resolved=resolvePresentation(catalog,patch,presentationId,{animationsEnabled});
 const m=resolved.candidates[mediaIndex];
 if(!m)return `<div class="media-window missing-art" data-presentation-id="${esc(presentationId)}"><span>Сцена доступна без медиа</span></div>`;
 return `<div class="media-window" data-presentation-id="${esc(presentationId)}" data-resolved-slot="${esc(m.slotId)}" data-candidate-index="${mediaIndex}">${m.kind==='video'?`<video src="${esc(m.src)}" aria-label="${esc(m.alt)}" autoplay loop muted playsinline controls></video>`:`<img src="${esc(m.src)}" alt="${esc(m.alt)}">`}</div>`;
}
function central(){
 const r=state.run,p=r.pending;
 if(!r.creation.complete)return `<section class="creation"><div class="creation-art">${mediaHTML('location/town/default')}<div><span class="eyebrow">До первого шага</span><h1>Кем вы войдёте<br>в этот мир?</h1><p>Новый город ещё ничего о вас не знает.</p></div></div><div class="creation-form"><h2>Ваша героиня</h2><p>25 лет · свободных очков: <strong id="points">${r.creation.remaining}</strong></p><div class="creation-stats">${stats.map(k=>`<div class="allocate" title="${esc(hints[k])}"><span>${labels[k]}</span><button data-stat="${k}" data-delta="-1" aria-label="Уменьшить ${labels[k]}" ${busy||locked||!r.creation.allocated[k]?'disabled':''}>−</button><strong>${r.metrics[k]}</strong><button data-stat="${k}" data-delta="1" aria-label="Увеличить ${labels[k]}" ${busy||locked||!r.creation.remaining?'disabled':''}>+</button></div>`).join('')}</div><button id="create" class="primary" ${r.creation.remaining||busy||locked?'disabled':''}>Начать историю</button></div></section>`;
 if(p){const e=catalog.events.find(e=>e.id===p.eventId)!,v=e.variants.find(v=>v.id===p.variantId)!;
 return `<section class="stage scene">${mediaHTML(p.presentationId??presentationIdForEvent(catalog,e.id,v.id))}<div class="stage-title"><span class="eyebrow">Встреча</span><h1>${esc(e.title)}</h1></div></section><section class="dialogue"><p>${esc(v.text)}</p><div class="choices">${e.choices.map(c=>`<button data-choice="${c.id}" ${busy||locked||!eligible(c.conditions,state)?'disabled':''}>${esc(c.label)}</button>`).join('')}</div></section>`;}
 if(r.status!=='active'){return `<section class="stage">${mediaHTML(r.acceptedEnding?presentationIdForEnding(r.acceptedEnding):'location/town/default')}<div class="stage-title"><h1>${r.status==='ended'?'Судьба принята':'Срок истёк'}</h1></div></section><section class="dialogue"><p>${esc(r.journal.at(-1)??'')}</p><button data-panel="legacy">Судьбы и следующая жизнь</button></section>`;}
 if(!r.flags['story.arrived'])return `<section class="stage">${mediaHTML('location/town/default')}<div class="stage-title"><span class="eyebrow">По ту сторону люка</span><h1>Следуйте за сусликом</h1></div></section><section class="dialogue"><p>Обычный день. Белый суслик. Люк, который кто-то забыл закрыть.</p><button data-action="arrival" class="primary" ${locked||busy?'disabled':''}>Пойти за ним</button></section>`;
 if(screen==='scene'&&r.lastAction){const last=r.lastAction,a=catalog.definitions.actions.find(a=>a.id===last.id)!;
 return `<section class="stage">${mediaHTML(presentationIdForAction(catalog,last.id,last.media))}<div class="stage-title"><span class="eyebrow">${professions.includes(a.id)?`Смена ${r.actionCounts[a.id]??0}`:'Результат'}</span><h1>${esc(last.title)}</h1></div><div class="result-deltas">${Object.entries(last.deltas).filter(([k])=>!['work','trust','health'].includes(k)).map(([k,v])=>`<span class="${v>0?'gain':'loss'}">${esc(labels[k]??k)} ${v>0?'+':''}${v}</span>`).join('')}</div></section><section class="dialogue"><p>${esc(last.text)}</p><div class="choices">${professions.includes(a.id)?`<button data-action="${a.id}" class="primary" ${disabled(a)?'disabled':''}>Работать ещё · 1 энергия</button>`:''}<button id="to-town">Вернуться в город</button>${r.metrics.energy===0?'<button data-panel="sleep" class="primary">Выбрать ночлег</button>':''}</div></section>`;
 }
 return `<section class="stage town-stage">${mediaHTML('location/town/default')}<div class="stage-title"><span class="eyebrow">По ту сторону люка</span><h1>Листоград</h1><p>${r.metrics.energy?'Город полон чужих планов. Какими будут ваши?':'На сегодня сил больше нет. Пора выбрать ночлег.'}</p></div><div class="town-actions"><button data-panel="work"><b>Работа</b><span>Смены и знакомства</span></button><button data-panel="school"><b>Школа</b><span>Занятия и практика</span></button><button data-panel="explore"><b>Окрестности</b><span>Поручения и находки</span></button><button data-panel="sleep"><b>Ночлег</b><span>Комната или навес</span></button></div></section><section class="town-note"><span>${esc(labels[r.housing])}</span><span>Ночлег сегодня: ${rent(state)} монет</span></section>`;
}
function panelContent(){
 if(panel==='work')return `<h2>Куда устроимся?</h2>${actionList(professions)}`;
 if(panel==='school')return `<h2>Школа</h2>${actionList(['combat-class','etiquette-class','magic-class','salon-lesson','school'])}<details><summary>Учебная мастерская</summary>${actionList(['work','brew','scales','exam','deliver','sell'])}</details>`;
 if(panel==='explore')return `<h2>Окрестности и поручения</h2>${actionList(['forest-search','tavern-talk','forage','landlord','visit','oddjob'])}`;
 if(panel==='sleep')return `<h2>Где провести ночь?</h2><p>После сна наступит следующий день. Неиспользованная энергия не переносится.</p><div class="sleep-options"><button data-sleep="money" ${busy||locked||!!state.run.pending||state.run.metrics.money<rent(state)?'disabled':''}><strong>Комната Силана</strong><span>${rent(state)} монет · завтра ${energyMax(state)} энергии</span></button><button data-sleep="favor" ${busy||locked||!!state.run.pending||state.run.metrics[favorStat(state)]<1?'disabled':''}><strong>Помочь хозяину</strong><span>−1 ${labels[favorStat(state)]} · завтра ${energyMax(state)} энергии</span></button><button data-sleep="outside" ${busy||locked||!!state.run.pending?'disabled':''}><strong>Под навесом</strong><span>Бесплатно · завтра ${energyMax(state)-1} энергии · Ухоженность −1</span></button></div>`;
 if(panel==='stats')return `<h2>Героиня</h2><div class="character-stats">${stats.map(k=>`<article><div><strong>${labels[k]}</strong><b>${state.run.metrics[k]}</b></div><progress value="${state.run.metrics[k]}" max="100"></progress><p>${hints[k]}</p></article>`).join('')}</div><h3>Профессии</h3><p>${professions.map(id=>`${esc(catalog.definitions.actions.find(a=>a.id===id)!.label)}: ${state.run.actionCounts[id]??0}`).join(' · ')}</p>`;
 if(panel==='journal')return `<h2>Дневник</h2>${[...state.run.journal].reverse().map(t=>`<p class="journal-entry">${esc(t)}</p>`).join('')}`;
 if(panel==='bag')return `<h2>Сумка и дела</h2>${Object.entries(state.run.inventory).map(([k,v])=>`<p>${labels[k]}: ${v}</p>`).join('')}<p>Долг: ${state.run.metrics.debt}</p>${actionList(['repay','rent-room'])}`;
 if(panel==='legacy')return `<h2>Судьбы</h2><p>Достижение судьбы не завершает жизнь. Принятие выдаёт её наследие.</p>${catalog.definitions.endings.map(e=>`<article class="ending"><h3>${esc(e.title)}</h3><p>${esc(e.description)}</p><small>${e.conditions.map(c=>`${meets(c,state,catalog)?'✓':'○'} ${esc(explain(c))}`).join(' · ')}</small><button data-ending="${e.id}" ${busy||locked||state.run.status==='ended'||!!state.run.pending||!state.run.availableEndings.includes(e.id)||!eligible(e.conditions,state)?'disabled':''}>Принять судьбу</button></article>`).join('')}<h3>Наследие</h3><p>${state.meta.unlocks.map(k=>labels[k]).join(' · ')||'Ещё впереди'}</p>${state.run.status!=='active'?'<button id="new-life">Следующая жизнь</button>':''}`;
 if(panel==='editor')return '<div id="editor" class="editor"></div>';
 if(panel==='catalog')return `<h2>Инспектор событий</h2>${catalog.events.map(e=>`<details><summary>${esc(e.title)}</summary><pre>${esc(JSON.stringify(e,null,2))}</pre></details>`).join('')}`;
 return `<h2>Меню</h2><div class="menu-buttons"><button id="export">Экспорт сохранения</button><button id="import">Импорт сохранения</button><input type="file" id="file" accept=".json" hidden><button data-panel="editor">Тексты и изображения</button><button id="animation-toggle">Анимация GIF: ${animationsEnabled?'включена':'выключена'}</button><button data-panel="catalog">Инспектор событий</button><button id="restart" ${busy||locked?'disabled':''}>Новая героиня с сохранением наследия</button></div><p class="muted">M3 · Игровая оболочка. Иллюстрации — заменяемые эскизы. Новая героиня начинает со статами 1 и десятью очками. У загруженной старой жизни характеристики сохранены.</p>`;
}
function render(){
 if(!state||!catalog)return;const d=calendar(state.run.day);
 app.innerHTML=`<div class="game-shell"><header class="hud"><button class="wordmark" id="home">По ту сторону люка</button><div class="date"><strong>${labels[d.season]} · День ${d.date}</strong><span>Год ${d.year} из ${state.run.limitDays/40}</span></div><div class="energy" aria-label="Энергия"><strong>Энергия ${state.run.metrics.energy}/${energyMax(state)}</strong><span>${Array.from({length:energyMax(state)},(_,i)=>`<i class="${i<state.run.metrics.energy?'filled':''}"></i>`).join('')}</span></div><div class="coins"><strong>${state.run.metrics.money}</strong><span>монет</span></div><button data-panel="menu" aria-label="Меню">☰</button></header><main class="play-area">${central()}</main><footer class="dock">${[['work','Работа'],['school','Школа'],['explore','Окрестности'],['sleep','Ночлег'],['stats','Героиня'],['journal','Дневник'],['bag','Сумка'],['legacy','Судьбы']].map(([id,label])=>`<button data-panel="${id}" ${!state.run.creation.complete||!state.run.flags['story.arrived']||state.run.status!=='active'&&!['stats','journal','bag','legacy'].includes(id)?'disabled':''}>${label}</button>`).join('')}</footer>${panel?`<div class="overlay"><section class="panel" role="dialog" aria-modal="true" aria-label="${esc(panel)}"><button class="close" id="close" aria-label="Закрыть">×</button>${panelContent()}</section></div>`:''}${message?`<div class="toast ${error?'error':''}" role="status">${esc(message)}<button id="dismiss" aria-label="Закрыть уведомление">×</button></div>`:''}</div>`;
 app.querySelectorAll<HTMLButtonElement>('[data-panel]').forEach(b=>b.onclick=()=>{panel=b.dataset.panel!;render();app.querySelector<HTMLButtonElement>('#close')?.focus();});
 app.querySelectorAll<HTMLButtonElement>('[data-action]').forEach(b=>b.onclick=()=>void perform({type:'action',id:b.dataset.action!,recipe:b.dataset.recipe as 'gentle'|'bold'|undefined}));
 app.querySelectorAll<HTMLButtonElement>('[data-choice]').forEach(b=>b.onclick=()=>void perform({type:'choice',id:b.dataset.choice!}));
 app.querySelectorAll<HTMLButtonElement>('[data-stat]').forEach(b=>b.onclick=()=>void perform({type:'allocate',stat:b.dataset.stat as typeof stats[number],delta:Number(b.dataset.delta) as 1|-1}));
 app.querySelectorAll<HTMLButtonElement>('[data-sleep]').forEach(b=>b.onclick=()=>void perform({type:'sleep',payment:b.dataset.sleep as 'money'|'favor'|'outside'}));
 app.querySelectorAll<HTMLButtonElement>('[data-ending]').forEach(b=>b.onclick=()=>{if(confirm('Принять судьбу и завершить эту жизнь?'))void perform({type:'accept',id:b.dataset.ending!});});
 const on=(id:string,fn:()=>void)=>{const b=app.querySelector<HTMLButtonElement>('#'+id);if(b)b.onclick=fn;};
 on('home',()=>{panel='';screen='town';mediaIndex=0;render();});on('to-town',()=>{screen='town';mediaIndex=0;render();});on('close',()=>{panel='';render();});on('dismiss',()=>{message='';render();});\n on('animation-toggle',()=>{animationsEnabled=!animationsEnabled;localStorage.setItem('portal-life.presentation.animations',animationsEnabled?'on':'off');mediaIndex=0;render();});
 on('create',()=>void perform({type:'finishCreation'}));on('new-life',()=>void perform({type:'newLife'}));
 on('restart',()=>{if(confirm('Завершить текущую жизнь без новой награды? Наследие сохранится. Сначала можно экспортировать эту жизнь.'))void perform({type:'restart'});});
 on('export',()=>{const url=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=`portal-life-${state.run.id}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
 const file=app.querySelector<HTMLInputElement>('#file');on('import',()=>file?.click());
 if(file)file.onchange=async()=>{const f=file.files?.[0];if(!f||busy)return;if(f.size>2_000_000){message='Файл слишком большой';error=true;render();return;}if(!confirm('Загрузить жизнь? Постоянные открытия сохранятся.'))return;busy=true;try{const next=parseSave(await f.text(),catalog,state.meta);await write(next);state=next;screen='town';panel='';locked=false;message='Сохранение загружено';error=false;}catch(e){message=String(e);error=true;}busy=false;render();};
 app.querySelectorAll<HTMLImageElement|HTMLVideoElement>('.media-window img,.media-window video').forEach(node=>node.onerror=()=>{mediaIndex++;render();});
 const editor=app.querySelector<HTMLElement>('#editor');if(editor)mountEditor(editor,baseCatalog,patch,next=>{const updated=applyPresentation(baseCatalog,next);localStorage.setItem('portal-life.presentation.v1',JSON.stringify(next));patch=next;catalog=updated;message='Замены сохранены';error=false;render();});
}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel){panel='';render();}});
async function main(){
 const response=await fetch('content.json');if(!response.ok)throw new Error('Не удалось прочитать каталог.');const raw=await response.json();baseCatalog=loadCatalog(raw.definitions,raw.packs);patch=raw.presentation??emptyPresentation();
 try{const custom=localStorage.getItem('portal-life.presentation.v1');if(custom){const saved:Presentation=JSON.parse(custom);applyPresentation(baseCatalog,saved);patch={version:1,texts:{...patch.texts,...saved.texts},media:{...patch.media,...saved.media},slots:{...(patch.slots??{}),...(saved.slots??{})}};}catalog=applyPresentation(baseCatalog,patch);}catch(e){patch=raw.presentation??emptyPresentation();catalog=applyPresentation(baseCatalog,patch);message=`Замены не загружены: ${String(e)}`;error=true;}
 state=freshSave();try{
  if(window.gameStorage){const saved=await window.gameStorage.load();if(saved){state=parseSave(saved.text,catalog);if(saved.recovered)message='Восстановлена резервная копия';}else await write(state);}
  else{const text=localStorage.getItem('portal-life.v1');if(text){try{state=parseSave(text,catalog);}catch{const backup=localStorage.getItem('portal-life.v1.bak');if(!backup)throw new Error('Нет исправной резервной копии');state=parseSave(backup,catalog);message='Восстановлена резервная копия';}}else await write(state);}
 }catch(e){message=`Загрузка остановлена: ${String(e)}. Автоперезапись отключена; импортируйте сохранение через меню.`;error=true;locked=true;}
 screen=state.run.lastAction?'scene':'town';render();
}
main().catch(e=>{app.textContent=`Ошибка запуска: ${String(e)}`;});
