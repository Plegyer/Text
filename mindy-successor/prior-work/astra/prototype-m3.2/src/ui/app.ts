import {mountEditor} from './editor.ts';
import {applyPresentation,emptyPresentation,resolvePresentation,presentationIdForActionResult,presentationIdForEvent,presentationIdForEnding,type Presentation} from '../core/presentation.ts';
import {loadCatalog} from '../core/content.ts';
import {freshSave,dispatch,parseSave,eligible,calendar,actionCost,meets,energyMax,rent,favorStat,availableActivityActions,type Command} from '../core/engine.ts';
import {stats,type Save,type Catalog,type Condition,type Action} from '../core/schema.ts';
import {SCHOOL_COURSES,type SchoolCourse} from '../core/school.ts';
import {labels,hints} from './labels.ts';
import {emptyLocalization,localizationSchema,normalizeLocale,resolveLocalizedText,type Locale,type LocalizationBundle} from '../core/localization.ts';
declare global {interface Window {gameStorage?:{load:()=>Promise<{text:string;recovered:boolean}|null>;save:(text:string)=>Promise<void>}}}
const app=document.querySelector<HTMLDivElement>('#app')!;
const esc=(s:unknown)=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
let baseCatalog:Catalog,catalog:Catalog,state:Save,patch:Presentation=emptyPresentation();
let localization:LocalizationBundle=emptyLocalization();
let panel='',screen='town',busy=false,locked=false,message='',error=false,mediaIndex=0;
let locale:Locale=normalizeLocale(localStorage.getItem('portal-life.locale'));
let animationsEnabled=localStorage.getItem('portal-life.presentation.animations')!=='off';
const tr=(key:string,fallback='')=>resolveLocalizedText(localization,key,locale,fallback);
const activityLabel=(id:string,fallback:string)=>tr(`activity.${id}.label`,fallback);
const activityOptionLabel=(id:string,fallback:string)=>tr(`activityOption.${id}.label`,fallback);
const eventTitle=(id:string,fallback:string)=>tr(`event.${id}.title`,fallback);
const eventVariantText=(eventId:string,variantId:string,fallback:string)=>tr(`event.${eventId}.variant.${variantId}.text`,fallback);
const eventChoiceLabel=(eventId:string,choiceId:string,fallback:string)=>tr(`event.${eventId}.choice.${choiceId}.label`,fallback);
const mediaAlt=(mediaId:string|undefined,fallback:string)=>mediaId?tr(`media.${mediaId}.alt`,fallback):fallback;
const fmt=(text:string,values:Record<string,string|number>)=>Object.entries(values).reduce((out,[key,value])=>out.replaceAll(`{${key}}`,String(value)),text);
const schoolCourseLabel=(course:SchoolCourse)=>tr(`${course.id}.label`,course.label);
const schoolCourseDescription=(course:SchoolCourse)=>tr(`${course.id}.description`,'');
const schoolStatLabel=(stat:string)=>tr(`stat.${stat}.label`,labels[stat]??stat);
function localizedNightChoiceLabel(id:string,fallback:string){
 const prefix='school.night_study.';
 if(id.startsWith(prefix)){
  const rest=id.slice(prefix.length),split=rest.lastIndexOf('.');
  if(split<1)return tr(`nightChoice.${id}.label`,fallback);
  const course=SCHOOL_COURSES.find(item=>item.id===`school.course.${rest.slice(0,split)}`);
  if(!course)return tr(`nightChoice.${id}.label`,fallback);
  const stat=rest.slice(split+1);
  return fmt(tr('ui.school.nightStudyChoice','Ночная учёба: {course} — {stat}'),{course:schoolCourseLabel(course),stat:schoolStatLabel(stat)});
 }
 return tr(`nightChoice.${id}.label`,fallback);
}
const professions=['lumber.shift','satyr-maid.shift','undead-farm.shift','tavern.shift','hunter.shift','guard.shift','merchant.shift','artist-geisha.shift','assassin.shift','prostitute.shift'];
function explain(c:Condition):string{
 const cmp=(op:'gte'|'lte'|'eq',value:number)=>`${op==='gte'?'≥':op==='lte'?'≤':'='} ${value}`;
 switch(c.kind){
 case 'stat':return `${labels[c.stat]??c.stat} ${cmp(c.op,c.value)}`;
 case 'resource':return `${labels[c.resource]??c.resource} ${cmp(c.op,c.value)}`;
 case 'itemCount':return `${labels[c.id]??c.id} ${cmp(c.op,c.count)}`;
 case 'itemCapability':return `Возможность предмета ${c.capability}: ${c.present?'есть':'нет'}`;
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
 const label=tr(`action.${a.id}.label`,a.label);
 const description=tr(`action.${a.id}.description`,a.description);
 return `<article class="activity"><div><h3>${esc(label)}</h3><p>${esc(description)}</p><small>${a.cost.energy} ${esc(tr('ui.work.energy','энергии'))}${actionCost(a,state)?` · ${actionCost(a,state)} ${esc(tr('ui.work.coins','монет'))}`:''}${forecast!==null?` · ${esc(tr('ui.work.income','доход ≈'))} ${forecast}`:''}</small><div class="effect-tags">${statsEffects.map(e=>e.kind==='metric'?`<span class="${e.delta>0?'gain':'loss'}">${esc(labels[e.key])} ${e.delta>0?'+':''}${e.delta}</span>`:'').join('')}</div>${miss.length?`<p class="requirement">${esc(miss.map(explain).join(' · '))}</p>`:''}</div>${a.mode==='brew'?`<div><button data-action="${a.id}" data-recipe="gentle" ${disabled(a)?'disabled':''}>Надёжно</button><button data-action="${a.id}" data-recipe="bold" ${disabled(a)?'disabled':''}>Быстро</button></div>`:`<button data-action="${a.id}" ${disabled(a)?'disabled':''}>${professions.includes(a.id)?esc(tr('ui.work.button','Работать')):'Выбрать'}</button>`}</article>`;
 }).join('')}</div>`;}
function schoolCourseDisabled(course:SchoolCourse){
 return busy||locked||state.run.status!=='active'||!state.run.creation.complete||!state.run.flags['story.arrived']||
  !!state.run.pending||!!state.run.flow.night||!!state.run.flow.activity||
  state.run.resources.money<course.tuition||state.run.dayState.energyCurrent<course.energyCost;
}
function schoolList(){
 return `<div class="activity-list">${SCHOOL_COURSES.map(course=>`<article class="activity"><div><h3>${esc(schoolCourseLabel(course))}</h3><p>${esc(schoolCourseDescription(course))}</p><p>${course.statEffects.map(effect=>`${esc(schoolStatLabel(effect.stat))} +${effect.amount}`).join(' · ')}</p><small>${esc(fmt(tr('ui.school.tuitionEnergy','Стоимость: {tuition} монет · Энергия сегодня: {energy}'),{tuition:course.tuition,energy:course.energyCost}))}</small></div><button data-school-course="${course.id}" ${schoolCourseDisabled(course)?'disabled':''}>${esc(tr('ui.school.lessonButton','Учиться'))}</button></article>`).join('')}</div>`;
}
function activityEntryDisabled(id:string){
 const activity=catalog.definitions.activities.find(item=>item.id===id);
 return !activity||busy||locked||state.run.status!=='active'||!!state.run.pending||!!state.run.flow.night||!!state.run.flow.activity||
  !eligible(activity.entryConditions,state,catalog)||state.run.dayState.energyCurrent<activity.entryEnergyCost;
}
function activityEntryList(ids:string[]){
 return `<div class="activity-list">${ids.map(id=>catalog.definitions.activities.find(item=>item.id===id)).filter(Boolean).map(activity=>`<article class="activity"><div><h3>${esc(activityLabel(activity!.id,activity!.label))}</h3><p>Отдельная Activity · checkpoint save/reload</p><small>${activity!.entryEnergyCost} энергии на вход</small></div><button data-enter-activity="${activity!.id}" ${activityEntryDisabled(activity!.id)?'disabled':''}>Войти</button></article>`).join('')}</div>`;
}
function nightChoiceList(){
 const choices=catalog.definitions.nightChoices.filter(choice=>eligible(choice.conditions,state,catalog));
 return `<div class="activity-list">${choices.map(choice=>{const schoolNight=choice.id.startsWith('school.night_study.');return `<article class="activity"><div><h3>${esc(localizedNightChoiceLabel(choice.id,choice.label))}</h3><small>${schoolNight?esc(tr('ui.school.nightStudyContext','Ночная учёба: выбранная характеристика +2, Energy следующего дня −1.')):`Ночной слот${choice.nextDayEnergyDelta?` · энергия завтра ${choice.nextDayEnergyDelta>0?'+':''}${choice.nextDayEnergyDelta}`:''}`}</small></div><button data-night-choice="${choice.id}" ${busy||locked?'disabled':''}>${schoolNight?esc(tr('ui.school.nightStudyButton','Учиться ночью')):'Выбрать'}</button></article>`;}).join('')}</div>`;
}
function presentationOccurrenceKey(presentationId:string){
 const r=state.run;
 const p=r.pending;
 if(p)return `${r.id}|event|${p.eventId}|${p.variantId}|${p.reactionEpochId??r.flow.reaction.currentEpochId??'none'}`;
 if(r.status!=='active')return `${r.id}|ending|${r.endings.result?.transactionId??r.endings.committed??r.acceptedEnding??'none'}|${presentationId}`;
 if(r.flow.activity){
  const a=r.flow.activity;
  return `${r.id}|activity|${a.activityId}|${a.startedDay}|${a.checkpoint}|${a.internalState.steps}|${a.internalState.routeId??'none'}`;
 }
 if(r.flow.night){
  const n=r.flow.night;
  return `${r.id}|night|${n.startedDay}|${n.phase}|${n.selectedNightChoiceId??'none'}|${n.selectedLodgingId??'none'}`;
 }
 if(screen==='scene'&&r.lastAction){
  return `${r.id}|action|${r.lastAction.id}|${r.actionCounts[r.lastAction.id]??0}|${presentationId}`;
 }
 return `${r.id}|town|${r.calendar.elapsedDays}|${presentationId}`;
}
function mediaHTML(presentationId:string){
 const occurrenceKey=presentationOccurrenceKey(presentationId);
 const resolved=resolvePresentation(catalog,patch,presentationId,{animationsEnabled,occurrenceKey});
 const m=resolved.candidates[mediaIndex];
 if(!m)return `<div class="media-window missing-art" data-presentation-id="${esc(presentationId)}"><span>Сцена доступна без медиа</span></div>`;
 const alt=mediaAlt(m.mediaId,m.alt);
 return `<div class="media-window" data-presentation-id="${esc(presentationId)}" data-resolved-slot="${esc(m.slotId)}" data-media-id="${esc(m.mediaId??'')}" data-candidate-key="${esc(m.candidateKey??'')}" data-candidate-index="${mediaIndex}">${m.kind==='video'?`<video src="${esc(m.src)}" aria-label="${esc(alt)}" autoplay loop muted playsinline controls></video>`:`<img src="${esc(m.src)}" alt="${esc(alt)}">`}</div>`;
}
function central(){
 const r=state.run,p=r.pending;
 if(!r.creation.complete)return `<section class="creation"><div class="creation-art">${mediaHTML('location/town/default')}<div><span class="eyebrow">До первого шага</span><h1>Кем вы войдёте<br>в этот мир?</h1><p>Новый город ещё ничего о вас не знает.</p></div></div><div class="creation-form"><h2>Ваша героиня</h2><p>25 лет · свободных очков: <strong id="points">${r.creation.remaining}</strong></p><div class="creation-stats">${stats.map(k=>`<div class="allocate" title="${esc(hints[k])}"><span>${labels[k]}</span><button data-stat="${k}" data-delta="-1" aria-label="Уменьшить ${labels[k]}" ${busy||locked||!r.creation.allocated[k]?'disabled':''}>−</button><strong>${r.metrics[k]}</strong><button data-stat="${k}" data-delta="1" aria-label="Увеличить ${labels[k]}" ${busy||locked||!r.creation.remaining?'disabled':''}>+</button></div>`).join('')}</div><button id="create" class="primary" ${r.creation.remaining||busy||locked?'disabled':''}>Начать историю</button></div></section>`;
 if(p){const e=catalog.events.find(e=>e.id===p.eventId)!,v=e.variants.find(v=>v.id===p.variantId)!;
 return `<section class="stage scene">${mediaHTML(p.presentationId??presentationIdForEvent(catalog,e.id,v.id))}<div class="stage-title"><span class="eyebrow">Встреча</span><h1>${esc(eventTitle(e.id,e.title))}</h1></div></section><section class="dialogue"><p>${esc(eventVariantText(e.id,v.id,v.text))}</p><div class="choices">${e.choices.map(c=>`<button data-choice="${c.id}" ${busy||locked||!eligible(c.conditions,state)?'disabled':''}>${esc(eventChoiceLabel(e.id,c.id,c.label))}</button>`).join('')}</div></section>`;}
 if(r.status!=='active'){return `<section class="stage">${mediaHTML(r.acceptedEnding?presentationIdForEnding(r.acceptedEnding):'location/town/default')}<div class="stage-title"><h1>${r.status==='ended'?'Судьба принята':'Срок истёк'}</h1></div></section><section class="dialogue"><p>${esc(r.journal.at(-1)??'')}</p><button data-panel="legacy">Судьбы и следующая жизнь</button></section>`;}
 if(!r.flags['story.arrived'])return `<section class="stage">${mediaHTML('location/town/default')}<div class="stage-title"><span class="eyebrow">По ту сторону люка</span><h1>Следуйте за сусликом</h1></div></section><section class="dialogue"><p>Обычный день. Белый суслик. Люк, который кто-то забыл закрыть.</p><button data-action="arrival" class="primary" ${locked||busy?'disabled':''}>Пойти за ним</button></section>`;
 if(r.flow.activity){
  const activity=r.flow.activity;
  const definition=catalog.definitions.activities.find(item=>item.id===activity.activityId);
  const slug=activity.activityId.split('.').at(-1)??'activity';
  const actions=availableActivityActions(state,catalog);
  return `<section class="stage scene">${mediaHTML(`activity/${slug}/route/default`)}<div class="stage-title"><span class="eyebrow">Activity</span><h1>${esc(activityLabel(activity.activityId,definition?.label??activity.activityId))}</h1></div></section><section class="dialogue"><p>Прогресс: ${activity.internalState.progress} · Выносливость: ${activity.internalState.endurance} · checkpoint: ${esc(activity.checkpoint)}${activity.internalState.routeId?` · route: ${esc(activity.internalState.routeId)}`:''}</p><div class="choices">${actions.map((action,index)=>`<button data-activity-action="${esc(action.id)}" class="${index===0?'primary':''}" ${busy||locked?'disabled':''}>${esc(activityOptionLabel(action.id,action.label))}</button>`).join('')}</div></section>`;
 }
 if(r.flow.night){
  const night=r.flow.night;
  if(night.phase==='LodgingResolution'){
   return `<section class="stage scene">${mediaHTML('night/lodging/default')}<div class="stage-title"><span class="eyebrow">Night</span><h1>Ночлег</h1></div></section><section class="dialogue"><p>Выберите место на эту ночь. Оплата фиксируется ровно один раз.</p><div class="sleep-options">${catalog.definitions.lodgings.map(lodging=>`<button data-lodging="${lodging.id}" ${busy||locked||!eligible(lodging.conditions,state,catalog)||state.run.resources.money<lodging.moneyCost?'disabled':''}><strong>${esc(lodging.label)}</strong><span>${lodging.moneyCost} монет${lodging.nextDayEnergyDelta?` · энергия завтра ${lodging.nextDayEnergyDelta>0?'+':''}${lodging.nextDayEnergyDelta}`:''}</span></button>`).join('')}</div></section>`;
  }
  if(night.phase==='VoluntaryNightChoice'){
   return `<section class="stage scene">${mediaHTML('night/choice/default')}<div class="stage-title"><span class="eyebrow">Night</span><h1>Вечер</h1></div></section><section class="dialogue"><p>Один добровольный Night choice. Daytime Energy не расходуется.</p>${nightChoiceList()}</section>`;
  }
  return `<section class="stage scene">${mediaHTML('night/default')}<div class="stage-title"><span class="eyebrow">Night</span><h1>Ночная последовательность</h1></div></section><section class="dialogue"><p>${esc(night.phase)}</p></section>`;
 }
 if(screen==='scene'&&r.lastAction){const last=r.lastAction,a=catalog.definitions.actions.find(a=>a.id===last.id),isProfession=!!a&&professions.includes(a.id);
  const schoolCourse=last.id==='school'?SCHOOL_COURSES.find(course=>course.presentationId===last.presentationId):undefined;
  const shownTitle=schoolCourse?schoolCourseLabel(schoolCourse):last.title;
  const shownText=schoolCourse?fmt(tr('ui.school.lessonResult','Урок завершён: {course}.'),{course:schoolCourseLabel(schoolCourse)}):last.text;
 return `<section class="stage">${mediaHTML(last.presentationId??presentationIdForActionResult(catalog,last.id,last.media))}<div class="stage-title"><span class="eyebrow">${isProfession?`${esc(tr('ui.result.shift','Смена'))} ${r.actionCounts[a!.id]??0}`:esc(tr('ui.result.default','Результат'))}</span><h1>${esc(shownTitle)}</h1></div><div class="result-deltas">${Object.entries(last.deltas).filter(([k])=>!['work','trust','health'].includes(k)).map(([k,v])=>`<span class="${v>0?'gain':'loss'}">${esc(labels[k]??k)} ${v>0?'+':''}${v}</span>`).join('')}</div></section><section class="dialogue"><p>${esc(shownText)}</p><div class="choices">${isProfession?`<button data-action="${a!.id}" class="primary" ${disabled(a!)?'disabled':''}>${esc(tr('ui.work.again','Работать ещё · 1 энергия'))}</button>`:''}<button id="to-town">${esc(tr('ui.result.returnTown','Вернуться в город'))}</button>${r.metrics.energy===0?'<button data-panel="sleep" class="primary">Выбрать ночлег</button>':''}</div></section>`;
 }
 return `<section class="stage town-stage">${mediaHTML('location/town/default')}<div class="stage-title"><span class="eyebrow">${esc(tr('ui.town.eyebrow','По ту сторону люка'))}</span><h1>${esc(tr('ui.town.title','Листоград'))}</h1><p>${esc(r.metrics.energy?tr('ui.town.energyPrompt','Город полон чужих планов. Какими будут ваши?'):tr('ui.town.noEnergyPrompt','На сегодня сил больше нет. Пора выбрать ночлег.'))}</p></div><div class="town-actions"><button data-panel="work"><b>${esc(tr('ui.panel.work','Работа'))}</b><span>${esc(tr('ui.town.work.subtitle','Смены и знакомства'))}</span></button><button data-panel="school"><b>${esc(tr('ui.panel.school','Школа'))}</b><span>${esc(tr('ui.town.school.subtitle','Занятия и практика'))}</span></button><button data-panel="explore"><b>${esc(tr('ui.panel.explore','Окрестности'))}</b><span>${esc(tr('ui.town.explore.subtitle','Поручения и находки'))}</span></button><button data-panel="sleep"><b>${esc(tr('ui.panel.sleep','Ночлег'))}</b><span>${esc(tr('ui.town.sleep.subtitle','Комната или навес'))}</span></button></div></section><section class="town-note"><span>${esc(labels[r.housing])}</span><span>Ночлег сегодня: ${rent(state)} ${esc(tr('ui.work.coins','монет'))}</span></section>`;
}
function panelContent(){
 if(panel==='work')return `<h2>${esc(tr('ui.work.title','Куда устроимся?'))}</h2>${actionList(professions)}`;
 if(panel==='school')return `<h2>${esc(tr('ui.school.title','Школа'))}</h2><p>${esc(tr('ui.school.help','Восемь оплачиваемых курсов. Урок списывает tuition + 1 Energy атомарно.'))}</p>${schoolList()}`;
 if(panel==='explore')return `<h2>Окрестности и поручения</h2>${activityEntryList(['lumber.forest'])}<details><summary>Обычные поручения</summary>${actionList(['forest-search','tavern-talk','forage','landlord','visit','oddjob'])}</details>`;
 if(panel==='sleep')return `<h2>Ночь</h2><p>NightFlow отдельно фиксирует lodging, voluntary choice и следующий день.</p><button data-end-day class="primary" ${busy||locked||!!state.run.pending||!!state.run.flow.night||!!state.run.flow.activity?'disabled':''}>Начать NightFlow</button>`;
 if(panel==='stats')return `<h2>Героиня</h2><div class="character-stats">${stats.map(k=>`<article><div><strong>${labels[k]}</strong><b>${state.run.metrics[k]}</b></div><progress value="${state.run.metrics[k]}" max="100"></progress><p>${hints[k]}</p></article>`).join('')}</div><h3>Профессии</h3><p>${professions.map(id=>`${esc(catalog.definitions.actions.find(a=>a.id===id)!.label)}: ${state.run.actionCounts[id]??0}`).join(' · ')}</p>`;
 if(panel==='journal')return `<h2>Дневник</h2>${[...state.run.journal].reverse().map(t=>`<p class="journal-entry">${esc(t)}</p>`).join('')}`;
 if(panel==='bag')return `<h2>Сумка и дела</h2>${Object.entries(state.run.inventory).map(([k,v])=>`<p>${labels[k]}: ${v}</p>`).join('')}<p>Долг: ${state.run.metrics.debt}</p>${actionList(['repay','rent-room'])}`;
 if(panel==='legacy')return `<h2>Судьбы</h2><p>Достижение судьбы не завершает жизнь. Принятие выдаёт её наследие.</p>${catalog.definitions.endings.map(e=>`<article class="ending"><h3>${esc(e.title)}</h3><p>${esc(e.description)}</p><small>${e.conditions.map(c=>`${meets(c,state,catalog)?'✓':'○'} ${esc(explain(c))}`).join(' · ')}</small><button data-ending="${e.id}" ${busy||locked||state.run.status==='ended'||!!state.run.pending||!state.run.availableEndings.includes(e.id)||!eligible(e.conditions,state)?'disabled':''}>Принять судьбу</button></article>`).join('')}<h3>Наследие</h3><p>${state.meta.unlocks.map(k=>labels[k]).join(' · ')||'Ещё впереди'}</p>${state.run.status!=='active'?'<button id="new-life">Следующая жизнь</button>':''}`;
 if(panel==='editor')return '<div id="editor" class="editor"></div>';
 if(panel==='catalog')return `<h2>Инспектор событий</h2>${catalog.events.map(e=>`<details><summary>${esc(e.title)}</summary><pre>${esc(JSON.stringify(e,null,2))}</pre></details>`).join('')}`;
 return `<h2>${esc(tr('ui.menu.title','Меню'))}</h2><div class="menu-buttons"><button id="language-toggle">${esc(fmt(tr('ui.menu.languageButton','Язык: {language}'),{language:tr(locale==='ru'?'ui.language.ru':'ui.language.en',locale==='ru'?'Русский':'English')}))}</button><button id="export">Экспорт сохранения</button><button id="import">Импорт сохранения</button><input type="file" id="file" accept=".json" hidden><button data-panel="editor">Тексты и изображения</button><button id="animation-toggle">Анимация GIF: ${animationsEnabled?'включена':'выключена'}</button><button data-panel="catalog">Инспектор событий</button><button id="restart" ${busy||locked?'disabled':''}>Новая героиня с сохранением наследия</button></div><p class="muted">M3 · Игровая оболочка. Иллюстрации — заменяемые эскизы. Новая героиня начинает со статами 1 и десятью очками. У загруженной старой жизни характеристики сохранены.</p>`;
}
function render(){
 if(!state||!catalog)return;const d=calendar(state.run.day);
 document.documentElement.lang=locale;
 app.innerHTML=`<div class="game-shell"><header class="hud"><button class="wordmark" id="home">${esc(tr('ui.town.eyebrow','По ту сторону люка'))}</button><div class="date"><strong>${labels[d.season]} · ${esc(tr('ui.hud.day','День'))} ${d.date}</strong><span>${esc(tr('ui.hud.year','Год'))} ${d.year} ${esc(tr('ui.hud.of','из'))} ${state.run.limitDays/40}</span></div><div class="energy" aria-label="${esc(tr('ui.hud.energy','Энергия'))}"><strong>${esc(tr('ui.hud.energy','Энергия'))} ${state.run.metrics.energy}/${energyMax(state)}</strong><span>${Array.from({length:energyMax(state)},(_,i)=>`<i class="${i<state.run.metrics.energy?'filled':''}"></i>`).join('')}</span></div><div class="coins"><strong>${state.run.metrics.money}</strong><span>${esc(tr('ui.hud.coins','монет'))}</span></div><button data-panel="menu" aria-label="${esc(tr('ui.hud.menu','Меню'))}">☰</button></header><main class="play-area">${central()}</main><footer class="dock">${[['work','ui.panel.work','Работа'],['school','ui.panel.school','Школа'],['explore','ui.panel.explore','Окрестности'],['sleep','ui.panel.sleep','Ночлег'],['stats','ui.panel.stats','Героиня'],['journal','ui.panel.journal','Дневник'],['bag','ui.panel.bag','Сумка'],['legacy','ui.panel.legacy','Судьбы']].map(([id,key,fallback])=>`<button data-panel="${id}" ${!state.run.creation.complete||!state.run.flags['story.arrived']||state.run.status!=='active'&&!['stats','journal','bag','legacy'].includes(id)?'disabled':''}>${esc(tr(key,fallback))}</button>`).join('')}</footer>${panel?`<div class="overlay"><section class="panel" role="dialog" aria-modal="true" aria-label="${esc(panel)}"><button class="close" id="close" aria-label="Закрыть">×</button>${panelContent()}</section></div>`:''}${message?`<div class="toast ${error?'error':''}" role="status">${esc(message)}<button id="dismiss" aria-label="Закрыть уведомление">×</button></div>`:''}</div>`;
 app.querySelectorAll<HTMLButtonElement>('[data-panel]').forEach(b=>b.onclick=()=>{panel=b.dataset.panel!;render();app.querySelector<HTMLButtonElement>('#close')?.focus();});
 app.querySelectorAll<HTMLButtonElement>('[data-action]').forEach(b=>b.onclick=()=>void perform({type:'action',id:b.dataset.action!,recipe:b.dataset.recipe as 'gentle'|'bold'|undefined}));
 app.querySelectorAll<HTMLButtonElement>('[data-school-course]').forEach(b=>b.onclick=()=>void perform({type:'schoolLesson',id:b.dataset.schoolCourse as Parameters<typeof perform>[0] extends {type:'schoolLesson';id:infer I}?I:never}));
 app.querySelectorAll<HTMLButtonElement>('[data-end-day]').forEach(b=>b.onclick=()=>void perform({type:'endDay'}));
 app.querySelectorAll<HTMLButtonElement>('[data-lodging]').forEach(b=>b.onclick=()=>void perform({type:'chooseLodging',id:b.dataset.lodging!}));
 app.querySelectorAll<HTMLButtonElement>('[data-night-choice]').forEach(b=>b.onclick=()=>void perform({type:'chooseNightChoice',id:b.dataset.nightChoice!}));
 app.querySelectorAll<HTMLButtonElement>('[data-enter-activity]').forEach(b=>b.onclick=()=>void perform({type:'enterActivity',id:b.dataset.enterActivity!}));
 app.querySelectorAll<HTMLButtonElement>('[data-activity-action]').forEach(b=>b.onclick=()=>void perform({type:'activityAction',id:b.dataset.activityAction!}));
 app.querySelectorAll<HTMLButtonElement>('[data-choice]').forEach(b=>b.onclick=()=>void perform({type:'choice',id:b.dataset.choice!}));
 app.querySelectorAll<HTMLButtonElement>('[data-stat]').forEach(b=>b.onclick=()=>void perform({type:'allocate',stat:b.dataset.stat as typeof stats[number],delta:Number(b.dataset.delta) as 1|-1}));
 app.querySelectorAll<HTMLButtonElement>('[data-ending]').forEach(b=>b.onclick=()=>{if(confirm('Принять судьбу и завершить эту жизнь?'))void perform({type:'accept',id:b.dataset.ending!});});
 const on=(id:string,fn:()=>void)=>{const b=app.querySelector<HTMLButtonElement>('#'+id);if(b)b.onclick=fn;};
 on('home',()=>{panel='';screen='town';mediaIndex=0;render();});on('to-town',()=>{screen='town';mediaIndex=0;render();});on('close',()=>{panel='';render();});on('dismiss',()=>{message='';render();});
 on('language-toggle',()=>{locale=locale==='ru'?'en':'ru';localStorage.setItem('portal-life.locale',locale);render();});
 on('animation-toggle',()=>{animationsEnabled=!animationsEnabled;localStorage.setItem('portal-life.presentation.animations',animationsEnabled?'on':'off');mediaIndex=0;render();});
 on('create',()=>void perform({type:'finishCreation'}));on('new-life',()=>void perform({type:'newLife'}));
 on('restart',()=>{if(confirm('Завершить текущую жизнь без новой награды? Наследие сохранится. Сначала можно экспортировать эту жизнь.'))void perform({type:'restart'});});
 on('export',()=>{const url=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=`portal-life-${state.run.id}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
 const file=app.querySelector<HTMLInputElement>('#file');on('import',()=>file?.click());
 if(file)file.onchange=async()=>{const f=file.files?.[0];if(!f||busy)return;if(f.size>2_000_000){message='Файл слишком большой';error=true;render();return;}if(!confirm('Загрузить жизнь? Постоянные открытия сохранятся.'))return;busy=true;try{const next=parseSave(await f.text(),catalog,state.meta);await write(next);state=next;screen='town';panel='';locked=false;message='Сохранение загружено';error=false;}catch(e){message=String(e);error=true;}busy=false;render();};
 app.querySelectorAll<HTMLImageElement|HTMLVideoElement>('.media-window img,.media-window video').forEach(node=>node.onerror=()=>{mediaIndex++;render();});
 const editor=app.querySelector<HTMLElement>('#editor');if(editor)mountEditor(editor,baseCatalog,patch,next=>{const updated=applyPresentation(baseCatalog,next);localStorage.setItem('portal-life.presentation.v1',JSON.stringify(next));patch=next;catalog=updated;message='Замены сохранены';error=false;});
}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel){panel='';render();}});
async function main(){
 const response=await fetch('content.json');if(!response.ok)throw new Error('Не удалось прочитать каталог.');const raw=await response.json();localization=localizationSchema.parse(raw.localization??emptyLocalization());baseCatalog=loadCatalog(raw.definitions,raw.packs);patch=raw.presentation??emptyPresentation();
 try{const custom=localStorage.getItem('portal-life.presentation.v1');if(custom){const saved:Presentation=JSON.parse(custom);applyPresentation(baseCatalog,saved);patch={version:1,texts:{...patch.texts,...saved.texts},media:{...patch.media,...saved.media},slots:{...(patch.slots??{}),...(saved.slots??{})}};}catalog=applyPresentation(baseCatalog,patch);}catch(e){patch=raw.presentation??emptyPresentation();catalog=applyPresentation(baseCatalog,patch);message=`Замены не загружены: ${String(e)}`;error=true;}
 state=freshSave();try{
  if(window.gameStorage){const saved=await window.gameStorage.load();if(saved){state=parseSave(saved.text,catalog);if(saved.recovered)message='Восстановлена резервная копия';}else await write(state);}
  else{const text=localStorage.getItem('portal-life.v1');if(text){try{state=parseSave(text,catalog);}catch{const backup=localStorage.getItem('portal-life.v1.bak');if(!backup)throw new Error('Нет исправной резервной копии');state=parseSave(backup,catalog);message='Восстановлена резервная копия';}}else await write(state);}
 }catch(e){message=`Загрузка остановлена: ${String(e)}. Автоперезапись отключена; импортируйте сохранение через меню.`;error=true;locked=true;}
 screen=state.run.lastAction?'scene':'town';render();
}
main().catch(e=>{app.textContent=`Ошибка запуска: ${String(e)}`;});
