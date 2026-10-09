import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {createRequire} from 'node:module';import {started,created} from './helpers.ts';
const {JSDOM,VirtualConsole}=createRequire(import.meta.url)('jsdom');
const html=readFileSync('dist/index.html','utf8'),bundle=readFileSync('dist/app.js','utf8'),data=JSON.parse(readFileSync('dist/content.json','utf8'));
async function wait(check:()=>boolean){for(let i=0;i<100;i++){if(check())return;await new Promise(r=>setTimeout(r,5));}throw new Error('UI update timed out');}
function boot(saved?:string,presentation?:unknown){const errors:string[]=[];const vc=new VirtualConsole();vc.on('jsdomError',(e:Error)=>errors.push(e.message));const dom=new JSDOM(html,{url:'http://localhost:4173/?dev=1',runScripts:'outside-only',virtualConsole:vc});const w=dom.window;w.structuredClone=structuredClone;w.fetch=async()=>({ok:true,json:async()=>structuredClone(data)});w.confirm=()=>true;if(saved)w.localStorage.setItem('portal-life.v1',saved);if(presentation)w.localStorage.setItem('portal-life.presentation.v1',JSON.stringify(presentation));w.eval(bundle);return {dom,w,errors};}
test('renderer: create heroine, allocate ten points, begin without spending energy',async()=>{const {w,dom,errors}=boot();try{
 await wait(()=>!!w.document.querySelector('#create'));assert.equal(w.document.querySelector('#create').disabled,true);
 for(let i=0;i<10;i++){w.document.querySelector('[data-stat="strength"][data-delta="1"]').click();await wait(()=>w.document.querySelector('#points').textContent===String(9-i));}
 w.document.querySelector('#create').click();await wait(()=>!!w.document.querySelector('[data-action="arrival"]'));w.document.querySelector('[data-action="arrival"]').click();await wait(()=>!!w.document.querySelector('[data-choice="home"]'));w.document.querySelector('[data-choice="home"]').click();await wait(()=>!w.document.querySelector('[data-choice="home"]'));assert.equal(JSON.parse(w.localStorage.getItem('portal-life.v1')).run.dayState.energyCurrent,3);assert.deepEqual(errors,[]);
 }finally{dom.window.close();}});
test('renderer: target Lumber shift resolves milestone/Foreman chain, repeat consumes energy, reload retains target result',async()=>{const s=started();s.run.rng=1;const {w,dom,errors}=boot(JSON.stringify(s));try{
 await wait(()=>!!w.document.querySelector('[data-panel="work"]'));w.document.querySelector('[data-panel="work"]').click();w.document.querySelector('[data-action="lumber.shift"]').click();
 await wait(()=>!!w.document.querySelector('[data-choice="continue"]'));assert.equal(w.document.querySelectorAll('.media-window').length,1);
 w.document.querySelector('[data-choice="continue"]').click();await wait(()=>!!w.document.querySelector('[data-choice="professional"]'));
 w.document.querySelector('[data-choice="professional"]').click();await wait(()=>!!w.document.querySelector('[data-action="lumber.shift"]'));
 assert.match(w.document.querySelector('[data-action="lumber.shift"]').textContent,/Работать ещё/);
 w.document.querySelector('[data-action="lumber.shift"]').click();
 await wait(()=>JSON.parse(w.localStorage.getItem('portal-life.v1')).run.historyState.actionCounts['lumber.shift']===2);
 assert.match(w.document.querySelector('.energy').textContent,/1\/3/);
 const saved=w.localStorage.getItem('portal-life.v1');const second=boot(saved);try{
  await wait(()=>!!second.w.document.querySelector('[data-action="lumber.shift"]'));
  const stored=JSON.parse(second.w.localStorage.getItem('portal-life.v1'));
  assert.equal(stored.run.flow.lastAction.presentationId,'job/lumber/result/default');
 }finally{second.dom.window.close();}assert.deepEqual(errors,[]);
 }finally{dom.window.close();}});
test('renderer: zero energy remains same day, NightFlow street lodging and voluntary sleep advance date exactly once',async()=>{const s=started();s.run.metrics.energy=0;s.run.slot=3;const {w,dom}=boot(JSON.stringify(s));try{
 await wait(()=>!!w.document.querySelector('[data-panel="sleep"]'));w.document.querySelector('[data-panel="sleep"]').click();
 w.document.querySelector('[data-end-day]').click();await wait(()=>!!w.document.querySelector('[data-lodging="lodging.street"]'));
 w.document.querySelector('[data-lodging="lodging.street"]').click();await wait(()=>!!w.document.querySelector('[data-night-choice="night.sleep"]'));
 w.document.querySelector('[data-night-choice="night.sleep"]').click();await wait(()=>JSON.parse(w.localStorage.getItem('portal-life.v1')).run.calendar.elapsedDays===1);
 assert.match(w.document.querySelector('.date').textContent,/День 2/);assert.match(w.document.querySelector('.energy').textContent,/2\/3/);
 }finally{dom.window.close();}});
test('renderer: corrupt save stays untouched and controls lock',async()=>{const {w,dom}=boot('broken');try{await wait(()=>!!w.document.querySelector('#create'));assert.equal(w.document.querySelector('[data-delta="1"]').disabled,true);assert.equal(w.localStorage.getItem('portal-life.v1'),'broken');assert.match(w.document.body.textContent,/Загрузка остановлена/);}finally{dom.window.close();}});
test('renderer: editor edits action presentation separately from life save',async()=>{const {w,dom,errors}=boot(JSON.stringify(started()));try{
 await wait(()=>!!w.document.querySelector('[data-panel="menu"]'));const before=w.localStorage.getItem('portal-life.v1');w.document.querySelector('[data-panel="menu"]').click();w.document.querySelector('[data-panel="editor"]').click();
 const select=w.document.querySelector('[aria-label="Фрагмент текста"]');select.value='action/lumber/scene/spring';select.dispatchEvent(new w.Event('change'));w.document.querySelector('textarea').value='Новая рабочая постановка. Здесь можно вставить свой текст.';
 [...w.document.querySelectorAll('button')].find((b:any)=>b.textContent==='Сохранить текст').click();assert.equal(w.localStorage.getItem('portal-life.v1'),before);assert.match(w.localStorage.getItem('portal-life.presentation.v1'),/Новая рабочая/);assert.deepEqual(errors,[]);
 }finally{dom.window.close();}});

test('renderer: existing custom text preserves new shipped seasonal texts',async()=>{
 const key='action/lumber/scene/summer',custom='Моя собственная летняя постановка.';
 const {w,dom}=boot(JSON.stringify(started()),{version:1,texts:{[key]:custom},media:{}});
 try{
  await wait(()=>!!w.document.querySelector('[data-panel="menu"]'));
  w.document.querySelector('[data-panel="menu"]').click();w.document.querySelector('[data-panel="editor"]').click();
  const select=w.document.querySelector('[aria-label="Фрагмент текста"]');
  for(const [k,expected] of [['action/lumber/scene/spring',data.presentation.texts['action/lumber/scene/spring']],[key,custom]]){
   select.value=k;select.dispatchEvent(new w.Event('change'));assert.equal(w.document.querySelector('textarea').value,expected);
  }
 }finally{dom.window.close();}
});


test('renderer: animation-off swaps GIF override to static fallback without changing run save',async()=>{
 const presentation={version:1,texts:{},media:{},slots:{'location/town/default':{
  primary:{kind:'gif',src:'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==',alt:'Animated town'},
  static:{kind:'image',src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB',alt:'Static town'}
 }}};
 const {w,dom}=boot(undefined,presentation);try{
  await wait(()=>!!w.document.querySelector('.media-window img'));
  const before=w.localStorage.getItem('portal-life.v1');
  assert.match(w.document.querySelector('.media-window img').getAttribute('src'),/^data:image\/gif/);
  w.document.querySelector('[data-panel="menu"]').click();
  const toggle=w.document.querySelector('#animation-toggle');assert.ok(toggle);toggle.click();
  await wait(()=>/^data:image\/png/.test(w.document.querySelector('.media-window img')?.getAttribute('src')??''));
  assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  assert.equal(w.localStorage.getItem('portal-life.presentation.animations'),'off');
 }finally{dom.window.close();}
});

test('renderer: editor replaces GIF by presentationId and rejects invalid replacement without touching life save',async()=>{
 const {w,dom,errors}=boot(JSON.stringify(started()));try{
  await wait(()=>!!w.document.querySelector('[data-panel="menu"]'));
  const lifeBefore=w.localStorage.getItem('portal-life.v1');
  w.document.querySelector('[data-panel="menu"]').click();w.document.querySelector('[data-panel="editor"]').click();
  const select=w.document.querySelector('[aria-label="presentationId"]');
  select.value='job/lumber/shift/spring/default';select.dispatchEvent(new w.Event('change'));
  assert.equal(select.value,'job/lumber/shift/spring/default');
  const input=w.document.querySelector('[aria-label="Выбрать GIF для presentationId"]');
  const file=new w.File([new Uint8Array([71,73,70,56,57,97])],'lumber.gif',{type:'image/gif'});
  Object.defineProperty(input,'files',{configurable:true,value:[file]});input.dispatchEvent(new w.Event('change'));
  await wait(()=>/GIF выбран/.test(w.document.querySelector('[role="status"]').textContent));
  [...w.document.querySelectorAll('button')].find((b:any)=>b.textContent==='Сохранить media replacement').click();
  await wait(()=>!!JSON.parse(w.localStorage.getItem('portal-life.presentation.v1')).slots?.['job/lumber/shift/spring/default']?.primary);
  const valid=w.localStorage.getItem('portal-life.presentation.v1');
  const parsed=JSON.parse(valid);
  assert.equal(parsed.slots['job/lumber/shift/spring/default'].primary.kind,'gif');
  assert.match(parsed.slots['job/lumber/shift/spring/default'].primary.src,/^data:image\/gif/);
  assert.equal(w.localStorage.getItem('portal-life.v1'),lifeBefore);

  const wrong=new w.File([new Uint8Array([1,2,3])],'wrong.png',{type:'image/png'});
  Object.defineProperty(input,'files',{configurable:true,value:[wrong]});input.dispatchEvent(new w.Event('change'));
  await wait(()=>/Неподдерживаемый формат/.test(w.document.querySelector('[role="status"]').textContent));
  assert.equal(w.localStorage.getItem('portal-life.presentation.v1'),valid);
  assert.deepEqual(errors,[]);
 }finally{dom.window.close();}
});


test('renderer: Work panel exposes exactly the ten target ordinary career shifts',async()=>{
 const {w,dom}=boot(JSON.stringify(started()));try{
  await wait(()=>!!w.document.querySelector('[data-panel="work"]'));
  w.document.querySelector('[data-panel="work"]').click();
  const ids=[...w.document.querySelectorAll('[data-action]')].map((node:any)=>node.getAttribute('data-action')).filter(Boolean);
  assert.deepEqual(ids,[
   'lumber.shift',
   'satyr-maid.shift',
   'undead-farm.shift',
   'tavern.shift',
   'hunter.shift',
   'guard.shift',
   'merchant.shift',
   'artist-geisha.shift',
   'assassin.shift',
   'prostitute.shift'
  ]);
  for(const legacy of ['tavern','hunt','guard'])assert.equal(ids.includes(legacy),false,legacy);
 }finally{dom.window.close();}
});


test('renderer: all ten target careers are exposed but only starter trio is available at start',async()=>{
 const initial=started();
 const beforeMoney=initial.run.resources.money;
 const {w,dom,errors}=boot(JSON.stringify(initial));try{
  await wait(()=>!!w.document.querySelector('[data-panel="work"]'));
  w.document.querySelector('[data-panel="work"]').click();
  const starter=['lumber.shift','satyr-maid.shift','undead-farm.shift'];
  const late=[
   'tavern.shift','hunter.shift','guard.shift','merchant.shift',
   'artist-geisha.shift','assassin.shift','prostitute.shift'
  ];
  for(const id of starter){
   const button=w.document.querySelector('[data-action="'+id+'"]');
   assert.ok(button,id);
   assert.equal(button.disabled,false,id+' should be available at start');
  }
  for(const id of late){
   const button=w.document.querySelector('[data-action="'+id+'"]');
   assert.ok(button,id);
   assert.equal(button.disabled,true,id+' should wait for an authored unlock condition');
  }

  w.document.querySelector('[data-action="lumber.shift"]').click();
  await wait(()=>{
   const raw=w.localStorage.getItem('portal-life.v1');
   return !!raw&&JSON.parse(raw).run.resources.money>beforeMoney;
  });
  const saved=JSON.parse(w.localStorage.getItem('portal-life.v1'));
  assert.equal(saved.run.resources.money,beforeMoney+37);
  assert.equal(saved.run.historyState.actionCounts['lumber.shift'],1);
  assert.match(saved.run.historyState.journal.join('\n'),/Заработано: 37 монет/);
  assert.deepEqual(errors,[]);
 }finally{dom.window.close();}
});


test('renderer: locale switch changes presentation only and preserves Work gameplay state',async()=>{
 const initial=started();
 const {w,dom,errors}=boot(JSON.stringify(initial));try{
  await wait(()=>!!w.document.querySelector('[data-panel="work"]'));
  const before=w.localStorage.getItem('portal-life.v1');

  w.document.querySelector('[data-panel="work"]').click();
  assert.match(w.document.querySelector('[data-action="lumber.shift"]').closest('article').textContent,/Смена лесоруба/);
  assert.equal(w.document.documentElement.lang,'ru');
  const idsRu=[...w.document.querySelectorAll('[data-action]')].map((node:any)=>node.getAttribute('data-action'));

  w.document.querySelector('#close').click();
  w.document.querySelector('[data-panel="menu"]').click();
  w.document.querySelector('#language-toggle').click();
  await wait(()=>w.document.documentElement.lang==='en');
  assert.equal(w.localStorage.getItem('portal-life.locale'),'en');
  assert.equal(w.localStorage.getItem('portal-life.v1'),before);

  w.document.querySelector('#close').click();
  w.document.querySelector('[data-panel="work"]').click();
  assert.match(w.document.querySelector('[data-action="lumber.shift"]').closest('article').textContent,/Lumber shift/);
  assert.match(w.document.querySelector('[data-action="merchant.shift"]').closest('article').textContent,/Merchant shift/);
  const idsEn=[...w.document.querySelectorAll('[data-action]')].map((node:any)=>node.getAttribute('data-action'));
  assert.deepEqual(idsEn,idsRu);
  for(const id of ['lumber.shift','satyr-maid.shift','undead-farm.shift']){
    const button=w.document.querySelector('[data-action="'+id+'"]');
    assert.equal(button.disabled,false,id+' remains available after locale switch');
  }
  for(const id of ['tavern.shift','hunter.shift','guard.shift','merchant.shift','artist-geisha.shift','assassin.shift','prostitute.shift']){
    const button=w.document.querySelector('[data-action="'+id+'"]');
    assert.equal(button.disabled,true,id+' remains locked after locale switch');
  }
  assert.equal(w.localStorage.getItem('portal-life.v1'),before);

  w.document.querySelector('#close').click();
  w.document.querySelector('[data-panel="menu"]').click();
  w.document.querySelector('#language-toggle').click();
  await wait(()=>w.document.documentElement.lang==='ru');
  assert.equal(w.localStorage.getItem('portal-life.locale'),'ru');
  assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  assert.deepEqual(errors,[]);
 }finally{dom.window.close();}
});


test('renderer: multi-GIF selection survives reload and locale switch without touching life save',async()=>{
 const gifA='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
 const gifB='data:image/gif;base64,R0lGODlhAQABAIAAAAD/AAAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
 const gifC='data:image/gif;base64,R0lGODlhAQABAIAAAAD/AP///ywAAAAAAQABAAACAUwAOw==';
 const png='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB';
 const presentation={version:1,texts:{},media:{},slots:{'location/town/default':{
  pool:{version:1,ordering:'ordered',selectionPolicy:'unweighted',candidates:[
   {key:'town-a',kind:'gif',src:gifA,alt:'Town A'},
   {key:'town-b',kind:'gif',src:gifB,alt:'Town B'},
   {key:'town-c',kind:'gif',src:gifC,alt:'Town C'}
  ]},
  static:{kind:'image',src:png,alt:'Static town'}
 }}};
 const saved=JSON.stringify(started());
 const {w,dom,errors}=boot(saved,presentation);try{
  await wait(()=>!!w.document.querySelector('#home'));
  w.document.querySelector('#home').click();
  await wait(()=>w.document.querySelector('.media-window')?.getAttribute('data-presentation-id')==='location/town/default');
  const before=w.localStorage.getItem('portal-life.v1');
  const first=w.document.querySelector('.media-window').getAttribute('data-candidate-key');
  assert.ok(first);

  w.document.querySelector('[data-panel="menu"]').click();
  w.document.querySelector('#language-toggle').click();
  await wait(()=>w.document.documentElement.lang==='en');
  assert.equal(w.document.querySelector('.media-window').getAttribute('data-candidate-key'),first);
  assert.equal(w.localStorage.getItem('portal-life.v1'),before);

  w.document.querySelector('#close').click();
  w.document.querySelector('[data-panel="menu"]').click();
  w.document.querySelector('#animation-toggle').click();
  await wait(()=>w.document.querySelector('.media-window')?.getAttribute('data-candidate-key')==='');
  assert.equal(w.localStorage.getItem('portal-life.v1'),before);

  const second=boot(before,presentation);try{
   await wait(()=>!!second.w.document.querySelector('#home'));
   second.w.document.querySelector('#home').click();
   await wait(()=>second.w.document.querySelector('.media-window')?.getAttribute('data-presentation-id')==='location/town/default');
   assert.equal(second.w.document.querySelector('.media-window').getAttribute('data-candidate-key'),first);
   assert.equal(second.w.localStorage.getItem('portal-life.v1'),before);
  }finally{second.dom.window.close();}
  assert.deepEqual(errors,[]);
 }finally{dom.window.close();}
});


test('renderer: Forest result scene localizes RU EN without changing pending gameplay state',async()=>{
 const s=started();
 s.run.flow.pendingScene={
  eventId:'forest-result-content-v1.success',
  variantId:'default',
  reactionEpochId:'forest-ui-smoke',
  allowedChoiceIds:['return']
 };
 const {w,dom,errors}=boot(JSON.stringify(s));try{
  await wait(()=>/Вернуться с ясным следом/.test(w.document.querySelector('.stage-title h1')?.textContent??''));
  const before=w.localStorage.getItem('portal-life.v1');
  assert.match(w.document.querySelector('.dialogue p').textContent,/К концу маршрута/);
  assert.match(w.document.querySelector('[data-choice="return"]').textContent,/Вернуться с результатом/);
  assert.match(w.document.querySelector('.media-window img').getAttribute('alt'),/Отдельная рабочая реакция/);

  w.document.querySelector('[data-panel="menu"]').click();
  w.document.querySelector('#language-toggle').click();
  await wait(()=>w.document.documentElement.lang==='en');
  assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  assert.match(w.document.querySelector('.stage-title h1').textContent,/Return with a clear trail/);
  assert.match(w.document.querySelector('.dialogue p').textContent,/By the end of the route/);
  assert.match(w.document.querySelector('[data-choice="return"]').textContent,/Return with the result/);
  assert.match(w.document.querySelector('.media-window img').getAttribute('alt'),/A separate worksite reaction after a successful return from the forest/);

  const stored=JSON.parse(w.localStorage.getItem('portal-life.v1'));
  assert.equal(stored.run.flow.pendingScene.eventId,'forest-result-content-v1.success');
  assert.equal(stored.run.flow.pendingScene.variantId,'default');
  assert.deepEqual(errors,[]);
 }finally{dom.window.close();}
});


test('renderer: School RU EN localization preserves course command and pending scene identity',async()=>{
 const initial=started();
 initial.run.resources.money=2_000;
 initial.run.dayState.energyCurrent=3;
 const reasonBefore=initial.run.character.stats.reason;
 const witsBefore=initial.run.character.stats.wits;
 const {w,dom,errors}=boot(JSON.stringify(initial));try{
  await wait(()=>!!w.document.querySelector('[data-panel="school"]'));
  const beforeLocale=w.localStorage.getItem('portal-life.v1');
  w.document.querySelector('[data-panel="school"]').click();
  assert.match(w.document.querySelector('.panel h2').textContent,/Школа/);
  const literacyRu=w.document.querySelector('[data-school-course="school.course.literacy_and_numbers"]').closest('article');
  assert.match(literacyRu.textContent,/Грамотность и счёт/);
  assert.match(literacyRu.textContent,/Практическая грамотность/);
  assert.match(literacyRu.textContent,/Разум \+4/);
  assert.match(literacyRu.textContent,/Стоимость: 300 монет/);
  assert.match(literacyRu.querySelector('button').textContent,/Учиться/);
  const idsRu=[...w.document.querySelectorAll('[data-school-course]')].map((node:any)=>node.getAttribute('data-school-course'));

  w.document.querySelector('#close').click();
  w.document.querySelector('[data-panel="menu"]').click();
  w.document.querySelector('#language-toggle').click();
  await wait(()=>w.document.documentElement.lang==='en');
  assert.equal(w.localStorage.getItem('portal-life.v1'),beforeLocale);
  w.document.querySelector('#close').click();
  w.document.querySelector('[data-panel="school"]').click();
  const literacyEn=w.document.querySelector('[data-school-course="school.course.literacy_and_numbers"]').closest('article');
  assert.match(w.document.querySelector('.panel h2').textContent,/School/);
  assert.match(literacyEn.textContent,/Literacy & Numbers/);
  assert.match(literacyEn.textContent,/Practical literacy/);
  assert.match(literacyEn.textContent,/Reason \+4/);
  assert.match(literacyEn.textContent,/Tuition: 300 coins/);
  assert.match(literacyEn.querySelector('button').textContent,/Study/);
  const idsEn=[...w.document.querySelectorAll('[data-school-course]')].map((node:any)=>node.getAttribute('data-school-course'));
  assert.deepEqual(idsEn,idsRu);

  literacyEn.querySelector('button').click();
  await wait(()=>{
   const raw=w.localStorage.getItem('portal-life.v1');
   return !!raw&&JSON.parse(raw).run.flow.pendingScene?.eventId==='base.school';
  });
  const pendingEnRaw=w.localStorage.getItem('portal-life.v1');
  const pendingEn=JSON.parse(pendingEnRaw);
  assert.equal(pendingEn.run.resources.money,1_700);
  assert.equal(pendingEn.run.dayState.energyCurrent,2);
  assert.equal(pendingEn.run.character.stats.reason,reasonBefore+4);
  assert.equal(pendingEn.run.character.stats.wits,witsBefore+2);
  assert.equal(pendingEn.run.flow.lastAction.id,'school');
  assert.equal(pendingEn.run.flow.lastAction.presentationId,'school/literacy-and-numbers/lesson/default');
  assert.equal(pendingEn.run.flow.pendingScene.eventId,'base.school');
  assert.equal(pendingEn.run.flow.pendingScene.variantId,'lesson');
  assert.match(w.document.querySelector('.stage-title h1').textContent,/The Steady Boil Class/);
  assert.match(w.document.querySelector('.dialogue p').textContent,/If a potion argues with you/);
  assert.match(w.document.querySelector('[data-choice="listen"]').textContent,/Write down the rule/);
  assert.match(w.document.querySelector('.media-window img').getAttribute('alt'),/alchemy workshop/);

  w.document.querySelector('[data-panel="menu"]').click();
  w.document.querySelector('#language-toggle').click();
  await wait(()=>w.document.documentElement.lang==='ru');
  assert.equal(w.localStorage.getItem('portal-life.v1'),pendingEnRaw);
  assert.match(w.document.querySelector('.stage-title h1').textContent,/Класс устойчивого кипения/);
  assert.match(w.document.querySelector('.dialogue p').textContent,/Если зелье спорит с вами/);
  assert.match(w.document.querySelector('[data-choice="listen"]').textContent,/Записать правило/);

  w.document.querySelector('#close').click();
  w.document.querySelector('[data-choice="listen"]').click();
  await wait(()=>{
   const raw=w.localStorage.getItem('portal-life.v1');
   return !!raw&&JSON.parse(raw).run.flow.pendingScene===null;
  });
  const resolved=JSON.parse(w.localStorage.getItem('portal-life.v1'));
  assert.equal(resolved.run.legacyCompat?.flags?.['school.enrolled'],true);
  assert.match(w.document.querySelector('.stage-title h1')?.textContent??'',/Грамотность и счёт/);
  assert.match(w.document.querySelector('.dialogue p')?.textContent??'',/Урок завершён: Грамотность и счёт/);
  assert.match(w.document.querySelector('.media-window img')?.getAttribute('src')??'',/assets\/presentation\/school-course-literacy-and-numbers\.svg$/);
  assert.match(w.document.querySelector('.media-window img')?.getAttribute('alt')??'',/Грамотность и счёт/);
  assert.deepEqual(errors,[]);
 }finally{dom.window.close();}
});

test('renderer: School Night-study labels localize without changing NightFlow save',async()=>{
 const initial=started();
 initial.run.resources.money=2_000;
 initial.run.dayState.energyCurrent=3;
 const {w,dom,errors}=boot(JSON.stringify(initial));try{
  await wait(()=>!!w.document.querySelector('[data-panel="sleep"]'));
  w.document.querySelector('[data-panel="sleep"]').click();
  w.document.querySelector('[data-end-day]').click();
  await wait(()=>!!w.document.querySelector('[data-lodging="lodging.normal"]'));
  w.document.querySelector('[data-lodging="lodging.normal"]').click();
  await wait(()=>!!w.document.querySelector('[data-night-choice="school.night_study.literacy_and_numbers.reason"]'));
  const ru=w.document.querySelector('[data-night-choice="school.night_study.literacy_and_numbers.reason"]').closest('article');
  assert.match(ru.textContent,/Ночная учёба: Грамотность и счёт — Разум/);
  assert.match(ru.textContent,/выбранная характеристика \+2/);
  assert.match(ru.querySelector('button').textContent,/Учиться ночью/);
  const before=w.localStorage.getItem('portal-life.v1');

  w.document.querySelector('[data-panel="menu"]').click();
  w.document.querySelector('#language-toggle').click();
  await wait(()=>w.document.documentElement.lang==='en');
  assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  w.document.querySelector('#close').click();
  const en=w.document.querySelector('[data-night-choice="school.night_study.literacy_and_numbers.reason"]').closest('article');
  assert.match(en.textContent,/Night study: Literacy & Numbers — Reason/);
  assert.match(en.textContent,/selected stat gains \+2/);
  assert.match(en.querySelector('button').textContent,/Study at night/);
  assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  assert.deepEqual(errors,[]);
 }finally{dom.window.close();}
});


test('renderer: ordinary poverty pending scene localizes RU EN without changing gameplay save',async()=>{
 const s=started();
 s.run.flow.pendingScene={
  eventId:'poverty-street-production.helpful-summer',
  variantId:'default',
  reactionEpochId:'poverty-ui-smoke',
  allowedChoiceIds:['take-errand','keep-resting']
 };
 const {w,dom,errors}=boot(JSON.stringify(s));try{
  await wait(()=>!!w.document.querySelector('.stage-title h1')||errors.length>0);
  assert.deepEqual(errors,[]);
  assert.match(w.document.querySelector('.stage-title h1').textContent,/Небольшое платное поручение/);
  const before=w.localStorage.getItem('portal-life.v1');
  const beforeSave=JSON.parse(before);
  assert.match(w.document.querySelector('.dialogue p').textContent,/Под навесом торговец/);
  assert.match(w.document.querySelector('[data-choice="take-errand"]').textContent,/Взяться/);
  assert.match(w.document.querySelector('.media-window img').getAttribute('alt'),/Летняя городская улица на закате/);

  w.document.querySelector('[data-panel="menu"]').click();
  w.document.querySelector('#language-toggle').click();
  await wait(()=>w.document.documentElement.lang==='en');
  assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  assert.match(w.document.querySelector('.stage-title h1').textContent,/A small paid errand/);
  assert.match(w.document.querySelector('.dialogue p').textContent,/Under the awning, a merchant/);
  assert.match(w.document.querySelector('[data-choice="take-errand"]').textContent,/Take/);
  assert.match(w.document.querySelector('.media-window img').getAttribute('alt'),/A summer city street at sunset/);

  const after=JSON.parse(w.localStorage.getItem('portal-life.v1'));
  assert.equal(after.run.flow.pendingScene.eventId,beforeSave.run.flow.pendingScene.eventId);
  assert.equal(after.run.flow.pendingScene.variantId,beforeSave.run.flow.pendingScene.variantId);
  assert.equal(after.run.rngState.state,beforeSave.run.rngState.state);
  assert.deepEqual(after.run.flow.night,beforeSave.run.flow.night);
  assert.deepEqual(errors,[]);
 }finally{dom.window.close();}
});


test('renderer: Foreman relationship and voluntary Night scene localize RU EN without gameplay drift',async()=>{
 const s=started();
 s.run.resources.money=2_000;
 s.run.rng=1;
 const {w,dom,errors}=boot(JSON.stringify(s));try{
  // Reach the authoritative Foreman professional route through the current production Lumber chain.
  await wait(()=>!!w.document.querySelector('[data-panel="work"]'));
  w.document.querySelector('[data-panel="work"]').click();
  w.document.querySelector('[data-action="lumber.shift"]').click();
  await wait(()=>!!w.document.querySelector('[data-choice="continue"]'));
  w.document.querySelector('[data-choice="continue"]').click();
  await wait(()=>!!w.document.querySelector('[data-choice="professional"]'));
  assert.match(w.document.querySelector('.stage-title h1').textContent,/Бригадир замечает работу/);
  w.document.querySelector('[data-choice="professional"]').click();
  await wait(()=>!!w.document.querySelector('[data-action="lumber.shift"]'));

  const routed=JSON.parse(w.localStorage.getItem('portal-life.v1'));
  assert.equal(routed.run.progression.careers.lumber.counters.completed_shifts,1);
  assert.equal(routed.run.progression.relationships['lumber.foreman'].stage,'route-professional');
  assert.equal(routed.run.progression.relationships['lumber.foreman'].choices.route,'professional');

  // Enter ordinary voluntary NightFlow; the Foreman choice owns the Night slot and no next-day Energy penalty.
  w.document.querySelector('[data-panel="sleep"]').click();
  w.document.querySelector('[data-end-day]').click();
  await wait(()=>!!w.document.querySelector('[data-lodging="lodging.normal"]'));
  w.document.querySelector('[data-lodging="lodging.normal"]').click();
  await wait(()=>!!w.document.querySelector('[data-night-choice="lumber.foreman.night"]'));
  const ruChoice=w.document.querySelector('[data-night-choice="lumber.foreman.night"]');
  const ruArticle=ruChoice.closest('article');
  assert.match(ruArticle.textContent,/Поговорить с бригадиром/);
  const beforeLocale=w.localStorage.getItem('portal-life.v1');

  w.document.querySelector('[data-panel="menu"]').click();
  w.document.querySelector('#language-toggle').click();
  await wait(()=>w.document.documentElement.lang==='en');
  assert.equal(w.localStorage.getItem('portal-life.v1'),beforeLocale);
  w.document.querySelector('#close').click();
  const enChoice=w.document.querySelector('[data-night-choice="lumber.foreman.night"]');
  const enArticle=enChoice.closest('article');
  assert.match(enArticle.textContent,/Talk with the Foreman/);

  enChoice.click();
  await wait(()=>/After-shift conversation/.test(w.document.querySelector('.stage-title h1')?.textContent??''));
  const pendingEn=w.localStorage.getItem('portal-life.v1');
  const parsedEn=JSON.parse(pendingEn);
  assert.equal(parsedEn.run.flow.pendingScene.eventId,'lumber-night.foreman-professional');
  assert.equal(parsedEn.run.flow.pendingScene.variantId,'default');
  assert.equal(parsedEn.run.progression.relationships['lumber.foreman'].counters.night_meetings,1);
  assert.equal(parsedEn.run.dayState.nextDayModifiers.energyDelta,0);
  assert.match(w.document.querySelector('.dialogue p').textContent,/voluntary continuation/);
  assert.match(w.document.querySelector('[data-choice="continue"]').textContent,/Continue professionally/);
  assert.match(w.document.querySelector('.media-window img').getAttribute('alt'),/calm voluntary evening conversation/);

  w.document.querySelector('[data-panel="menu"]').click();
  w.document.querySelector('#language-toggle').click();
  await wait(()=>w.document.documentElement.lang==='ru');
  assert.equal(w.localStorage.getItem('portal-life.v1'),pendingEn);
  assert.match(w.document.querySelector('.stage-title h1').textContent,/Разговор после смены/);
  assert.match(w.document.querySelector('.dialogue p').textContent,/добровольное продолжение/);
  assert.match(w.document.querySelector('[data-choice="continue"]').textContent,/Продолжить по-деловому/);
  assert.deepEqual(errors,[]);
 }finally{dom.window.close();}
});


test('renderer: project-owned static fallback keeps asset identity across RU EN locale switch',async()=>{
 const s=started();
 s.run.progression.careers['satyr-maid']={
  stage:'floor-rhythm',shifts:0,counters:{completed_shifts:1},choices:{},facts:['first-shift-complete']
 };
 const {w,dom,errors}=boot(JSON.stringify(s));try{
  await wait(()=>!!w.document.querySelector('[data-panel="work"]'));
  w.document.querySelector('[data-panel="menu"]').click();
  w.document.querySelector('#animation-toggle').click();
  await wait(()=>w.localStorage.getItem('portal-life.presentation.animations')==='off');
  w.document.querySelector('#close').click();
  w.document.querySelector('[data-panel="work"]').click();
  w.document.querySelector('[data-action="satyr-maid.shift"]').click();
  await wait(()=>!!w.document.querySelector('.media-window img')&&/career-satyr-maid-result\.svg$/.test(w.document.querySelector('.media-window img').getAttribute('src')??''));

  const imgRu=w.document.querySelector('.media-window img');
  const src=imgRu.getAttribute('src');
  assert.match(src,/assets\/presentation\/career-satyr-maid-result\.svg$/);
  assert.match(imgRu.getAttribute('alt'),/Служанка в таверне/);
  const before=w.localStorage.getItem('portal-life.v1');

  w.document.querySelector('[data-panel="menu"]').click();
  w.document.querySelector('#language-toggle').click();
  await wait(()=>w.document.documentElement.lang==='en');
  assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  w.document.querySelector('#close').click();

  const imgEn=w.document.querySelector('.media-window img');
  assert.equal(imgEn.getAttribute('src'),src);
  assert.match(imgEn.getAttribute('alt'),/A tavern maid finishes resetting a table/);
  assert.deepEqual(errors,[]);
 }finally{dom.window.close();}
});


test('renderer: neutral Forest route static fallback preserves save across RU EN',async()=>{
 const s=started();
 const {w,dom,errors}=boot(JSON.stringify(s));try{
  await wait(()=>!!w.document.querySelector('[data-panel="explore"]'));
  w.document.querySelector('[data-panel="explore"]').click();
  await wait(()=>!!w.document.querySelector('[data-enter-activity="lumber.forest"]'));
  w.document.querySelector('[data-enter-activity="lumber.forest"]').click();
  await wait(()=>!!w.document.querySelector('[data-activity-action="forest.route.logging-road"]'));

  const imgRu=w.document.querySelector('.media-window img');
  assert.match(imgRu.getAttribute('src'),/assets\/presentation\/forest-route-default-v1\.svg$/);
  assert.match(imgRu.getAttribute('alt'),/нейтральной лесной тропе/);
  const before=w.localStorage.getItem('portal-life.v1');
  const activityBefore=JSON.parse(before).run.flow.activity;
  assert.equal(activityBefore.activityId,'lumber.forest');
  assert.equal(activityBefore.internalState.routeId,null);

  w.document.querySelector('[data-panel="menu"]').click();
  w.document.querySelector('#language-toggle').click();
  await wait(()=>w.document.documentElement.lang==='en');
  assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  w.document.querySelector('#close').click();

  const imgEn=w.document.querySelector('.media-window img');
  assert.equal(imgEn.getAttribute('src'),imgRu.getAttribute('src'));
  assert.match(imgEn.getAttribute('alt'),/neutral forest trail/);
  const after=JSON.parse(w.localStorage.getItem('portal-life.v1'));
  assert.deepEqual(after.run.flow.activity,activityBefore);
  assert.deepEqual(errors,[]);
 }finally{dom.window.close();}
});


test('renderer: legacy gopher pending scene localizes RU EN without gameplay drift',async()=>{
 const s=started();
 s.run.flow.pendingScene={
  eventId:'gopher.tavern-intro',
  variantId:'default',
  reactionEpochId:'legacy-gopher-ui-smoke',
  allowedChoiceIds:['agree']
 };
 const {w,dom,errors}=boot(JSON.stringify(s));try{
  await wait(()=>!!w.document.querySelector('[data-choice="agree"]')||errors.length>0);
  assert.deepEqual(errors,[]);
  assert.match(w.document.querySelector('.stage-title h1')?.textContent??'',/Кружки прежде легенд/);
  assert.match(w.document.querySelector('.dialogue p')?.textContent??'',/Трактирщик Марек/);
  assert.match(w.document.querySelector('[data-choice="agree"]')?.textContent??'',/Договориться о правилах/);
  assert.match(w.document.querySelector('.media-window img')?.getAttribute('alt')??'',/таверн/i);

  const before=w.localStorage.getItem('portal-life.v1');
  const beforeSave=JSON.parse(before);
  w.document.querySelector('[data-panel="menu"]').click();
  w.document.querySelector('#language-toggle').click();
  await wait(()=>w.document.documentElement.lang==='en');
  assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  w.document.querySelector('#close').click();

  assert.match(w.document.querySelector('.stage-title h1')?.textContent??'',/Mugs before legends/);
  assert.match(w.document.querySelector('.dialogue p')?.textContent??'',/Marek/);
  assert.match(w.document.querySelector('[data-choice="agree"]')?.textContent??'',/Agree on the rules/);
  assert.match(w.document.querySelector('.media-window img')?.getAttribute('alt')??'',/tavern/i);

  const after=JSON.parse(w.localStorage.getItem('portal-life.v1'));
  assert.equal(after.run.flow.pendingScene.eventId,beforeSave.run.flow.pendingScene.eventId);
  assert.equal(after.run.flow.pendingScene.variantId,beforeSave.run.flow.pendingScene.variantId);
  assert.deepEqual(after.run.flow.pendingScene.allowedChoiceIds,beforeSave.run.flow.pendingScene.allowedChoiceIds);
  assert.equal(after.run.rngState.state,beforeSave.run.rngState.state);
  assert.deepEqual(after.run.flow.night,beforeSave.run.flow.night);
  assert.deepEqual(errors,[]);
 }finally{dom.window.close();}
});


test('renderer: global UI shell localizes panels RU EN without changing save',async()=>{
 const s=started();
 const {w,dom,errors}=boot(JSON.stringify(s));try{
  await wait(()=>!!w.document.querySelector('[data-panel="explore"]'));
  const before=w.localStorage.getItem('portal-life.v1');

  w.document.querySelector('[data-panel="explore"]').click();
  assert.equal(w.document.querySelector('.panel h2')?.textContent,'Окрестности и поручения');
  assert.match(w.document.querySelector('.panel')?.textContent??'',/Отдельная вылазка/);
  assert.equal(w.document.querySelector('[data-enter-activity="lumber.forest"]')?.textContent,'Войти');
  w.document.querySelector('#close').click();

  w.document.querySelector('[data-panel="menu"]').click();
  w.document.querySelector('#language-toggle').click();
  await wait(()=>w.document.documentElement.lang==='en');
  assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  w.document.querySelector('#close').click();

  w.document.querySelector('[data-panel="explore"]').click();
  assert.equal(w.document.querySelector('.panel h2')?.textContent,'Outskirts and errands');
  assert.match(w.document.querySelector('.panel')?.textContent??'',/separate outing/i);
  assert.equal(w.document.querySelector('[data-enter-activity="lumber.forest"]')?.textContent,'Enter');
  w.document.querySelector('#close').click();

  w.document.querySelector('[data-panel="sleep"]').click();
  assert.equal(w.document.querySelector('.panel h2')?.textContent,'Night');
  assert.equal(w.document.querySelector('[data-end-day]')?.textContent,'Start the night sequence');
  w.document.querySelector('#close').click();

  w.document.querySelector('[data-panel="stats"]').click();
  assert.equal(w.document.querySelector('.panel h2')?.textContent,'Heroine');
  assert.match(w.document.querySelector('.panel')?.textContent??'',/Careers/);
  w.document.querySelector('#close').click();

  w.document.querySelector('[data-panel="journal"]').click();
  assert.equal(w.document.querySelector('.panel h2')?.textContent,'Journal');
  w.document.querySelector('#close').click();

  w.document.querySelector('[data-panel="bag"]').click();
  assert.equal(w.document.querySelector('.panel h2')?.textContent,'Bag and errands');
  assert.match(w.document.querySelector('.panel')?.textContent??'',/Debt:/);
  w.document.querySelector('#close').click();

  w.document.querySelector('[data-panel="legacy"]').click();
  assert.equal(w.document.querySelector('.panel h2')?.textContent,'Fates');
  assert.match(w.document.querySelector('.panel')?.textContent??'',/Accept fate/);
  assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  assert.deepEqual(errors,[]);
 }finally{dom.window.close();}
});

test('renderer: arrival shell localizes RU EN before gameplay state changes',async()=>{
 const s=created();
 const {w,dom,errors}=boot(JSON.stringify(s));try{
  await wait(()=>!!w.document.querySelector('[data-action="arrival"]'));
  const before=w.localStorage.getItem('portal-life.v1');
  assert.equal(w.document.querySelector('.stage-title h1')?.textContent,'Следуйте за сусликом');
  assert.match(w.document.querySelector('.dialogue p')?.textContent??'',/Белый суслик/);
  assert.equal(w.document.querySelector('[data-action="arrival"]')?.textContent,'Пойти за ним');

  w.document.querySelector('[data-panel="menu"]').click();
  w.document.querySelector('#language-toggle').click();
  await wait(()=>w.document.documentElement.lang==='en');
  assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  w.document.querySelector('#close').click();

  assert.equal(w.document.querySelector('.stage-title h1')?.textContent,'Follow the gopher');
  assert.match(w.document.querySelector('.dialogue p')?.textContent??'',/white gopher/i);
  assert.equal(w.document.querySelector('[data-action="arrival"]')?.textContent,'Follow it');
  assert.deepEqual(errors,[]);
 }finally{dom.window.close();}
});


test('renderer: journal and lastAction choice outcome localize from stable refs',async()=>{
 const s=started();
 s.run.pending={eventId:'base.arrival',variantId:'welcome',allowedChoiceIds:['introduce']};
 const {w,dom,errors}=boot(JSON.stringify(s));try{
  await wait(()=>!!w.document.querySelector('[data-choice="introduce"]'));
  w.document.querySelector('[data-choice="introduce"]').click();
  await wait(()=>{
   const raw=w.localStorage.getItem('portal-life.v1');
   if(!raw)return false;
   const parsed=JSON.parse(raw);
   return parsed.run.flow.lastAction?.outcomeRef?.eventId==='base.arrival';
  });

  assert.match(w.document.querySelector('.dialogue p')?.textContent??'',/Вы договорились начать с простого/);
  assert.match(w.document.querySelector('.stage-title h1')?.textContent??'',/Помощница, а не чайник/);

  w.document.querySelector('[data-panel="journal"]').click();
  assert.match(w.document.querySelector('.panel')?.textContent??'',/Вы договорились начать с простого/);
  w.document.querySelector('#close').click();

  const before=w.localStorage.getItem('portal-life.v1');
  const parsedBefore=JSON.parse(before);
  assert.deepEqual(parsedBefore.run.historyState.journalRefs.at(-1),{
   kind:'eventChoice',
   eventId:'base.arrival',
   choiceId:'introduce'
  });

  w.document.querySelector('[data-panel="menu"]').click();
  w.document.querySelector('#language-toggle').click();
  await wait(()=>w.document.documentElement.lang==='en');
  assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  w.document.querySelector('#close').click();

  assert.match(w.document.querySelector('.dialogue p')?.textContent??'',/You agree to start with something simple/);
  assert.match(w.document.querySelector('.stage-title h1')?.textContent??'',/An assistant, not a kettle/);

  w.document.querySelector('[data-panel="journal"]').click();
  assert.match(w.document.querySelector('.panel')?.textContent??'',/You agree to start with something simple/);
  assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  assert.deepEqual(errors,[]);
 }finally{dom.window.close();}
});


test('renderer: shared Night and lodging UI localizes RU EN without state drift',async()=>{
 const s=started();
 s.run.resources.money=2_000;
 s.run.dayState.energyCurrent=0;
 const {w,dom,errors}=boot(JSON.stringify(s));try{
  await wait(()=>!!w.document.querySelector('[data-panel="sleep"]'));
  w.document.querySelector('[data-panel="sleep"]').click();
  w.document.querySelector('[data-end-day]').click();
  await wait(()=>!!w.document.querySelector('[data-lodging="lodging.normal"]'));

  assert.equal(w.document.querySelector('.stage-title .eyebrow')?.textContent,'Ночь');
  assert.equal(w.document.querySelector('.stage-title h1')?.textContent,'Ночлег');
  assert.match(w.document.querySelector('.dialogue p')?.textContent??'',/Плата за ночлег списывается один раз/);
  assert.match(w.document.querySelector('[data-lodging="lodging.normal"]')?.textContent??'',/Обычная комната/);

  const before=w.localStorage.getItem('portal-life.v1');
  w.document.querySelector('[data-panel="menu"]').click();
  w.document.querySelector('#language-toggle').click();
  await wait(()=>w.document.documentElement.lang==='en');
  assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  w.document.querySelector('#close').click();

  assert.equal(w.document.querySelector('.stage-title .eyebrow')?.textContent,'Night');
  assert.equal(w.document.querySelector('.stage-title h1')?.textContent,'Lodging');
  assert.match(w.document.querySelector('.dialogue p')?.textContent??'',/lodging cost is charged once/);
  assert.match(w.document.querySelector('[data-lodging="lodging.normal"]')?.textContent??'',/Normal room/);

  w.document.querySelector('[data-lodging="lodging.normal"]').click();
  await wait(()=>!!w.document.querySelector('[data-night-choice="night.sleep"]'));
  assert.equal(w.document.querySelector('.stage-title h1')?.textContent,'Evening');
  assert.match(w.document.querySelector('.dialogue p')?.textContent??'',/voluntary night activity/);
  const sleep=w.document.querySelector('[data-night-choice="night.sleep"]')?.closest('article');
  assert.match(sleep?.textContent??'',/Sleep/);
  assert.match(sleep?.textContent??'',/Night activity/);
  assert.equal(w.document.querySelector('[data-night-choice="night.sleep"]')?.textContent,'Choose');
  assert.deepEqual(errors,[]);
 }finally{dom.window.close();}
});


test('renderer: remaining UI shell v2 localizes creation menu and season without save drift',async()=>{
 const {w,dom,errors}=boot();try{
  await wait(()=>!!w.document.querySelector('#create'));
  const before=w.localStorage.getItem('portal-life.v1');
  assert.match(w.document.querySelector('.creation h1')?.textContent??'',/Кем вы войдёте в этот мир/);
  assert.match(w.document.querySelector('.creation')?.textContent??'',/Ваша героиня/);

  w.document.querySelector('[data-panel="menu"]').click();
  assert.match(w.document.querySelector('.panel')?.textContent??'',/Экспорт сохранения/);
  assert.match(w.document.querySelector('.panel')?.textContent??'',/Новая героиня с сохранением наследия/);
  w.document.querySelector('#language-toggle').click();
  await wait(()=>w.document.documentElement.lang==='en');
  assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  assert.match(w.document.querySelector('.panel')?.textContent??'',/Export save/);
  assert.match(w.document.querySelector('.panel')?.textContent??'',/New heroine with legacy preserved/);
  w.document.querySelector('#close').click();

  assert.match(w.document.querySelector('.creation h1')?.textContent??'',/Who will you be when you enter this world/);
  assert.match(w.document.querySelector('.creation')?.textContent??'',/Your heroine/);
  assert.match(w.document.querySelector('.date strong')?.textContent??'',/Spring/);
  assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  assert.deepEqual(errors,[]);
 }finally{dom.window.close();}
});

test('renderer: Activity shell v2 localizes labels without gameplay drift',async()=>{
 const s=started();
 const {w,dom,errors}=boot(JSON.stringify(s));try{
  await wait(()=>!!w.document.querySelector('[data-panel="explore"]'));
  w.document.querySelector('[data-panel="explore"]').click();
  await wait(()=>!!w.document.querySelector('[data-enter-activity="lumber.forest"]'));
  w.document.querySelector('[data-enter-activity="lumber.forest"]').click();
  await wait(()=>!!w.document.querySelector('[data-activity-action]'));
  const before=w.localStorage.getItem('portal-life.v1');

  assert.match(w.document.querySelector('.stage-title .eyebrow')?.textContent??'',/Вылазка/);
  const activityText=[...w.document.querySelectorAll('.dialogue p')].map((node:any)=>node.textContent).join(' ');
  assert.match(activityText,/Прогресс:/);
  assert.match(activityText,/Выносливость:/);
  assert.match(activityText,/Контрольная точка:/);

  w.document.querySelector('[data-panel="menu"]').click();
  w.document.querySelector('#language-toggle').click();
  await wait(()=>w.document.documentElement.lang==='en');
  assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  w.document.querySelector('#close').click();

  assert.match(w.document.querySelector('.stage-title .eyebrow')?.textContent??'',/Activity/);
  const activityTextEn=[...w.document.querySelectorAll('.dialogue p')].map((node:any)=>node.textContent).join(' ');
  assert.match(activityTextEn,/Progress:/);
  assert.match(activityTextEn,/Endurance:/);
  assert.match(activityTextEn,/Checkpoint:/);
  assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  assert.deepEqual(errors,[]);
 }finally{dom.window.close();}
});


test('renderer: Forest route presentation seam follows route state without save drift',async()=>{
 const s=started();
 const {w,dom,errors}=boot(JSON.stringify(s));try{
  await wait(()=>!!w.document.querySelector('[data-panel="explore"]'));
  w.document.querySelector('[data-panel="explore"]').click();
  await wait(()=>!!w.document.querySelector('[data-enter-activity="lumber.forest"]'));
  w.document.querySelector('[data-enter-activity="lumber.forest"]').click();
  await wait(()=>!!w.document.querySelector('[data-activity-action="forest.route.logging-road"]'));

  let media=w.document.querySelector('.media-window');
  assert.equal(media?.getAttribute('data-presentation-id'),'activity/forest/route/default');
  assert.equal(media?.getAttribute('data-resolved-slot'),'activity/forest/route/default');

  w.document.querySelector('[data-activity-action="forest.route.logging-road"]').click();
  await wait(()=>{
   const raw=w.localStorage.getItem('portal-life.v1');
   const presentationId=w.document.querySelector('.media-window')?.getAttribute('data-presentation-id');
   return !!raw
    && JSON.parse(raw).run.flow.activity?.internalState?.routeId==='logging-road'
    && presentationId==='activity/forest/route/logging-road';
  });

  media=w.document.querySelector('.media-window');
  assert.equal(media?.getAttribute('data-presentation-id'),'activity/forest/route/logging-road');
  assert.equal(media?.getAttribute('data-resolved-slot'),'activity/forest/route/logging-road');
  assert.match(media?.querySelector('img')?.getAttribute('src')??'',/assets\/presentation\/forest-route-logging-road\.svg$/);

  const beforeLocale=w.localStorage.getItem('portal-life.v1');
  const activityBefore=JSON.parse(beforeLocale).run.flow.activity;

  w.document.querySelector('[data-panel="menu"]').click();
  w.document.querySelector('#language-toggle').click();
  await wait(()=>w.document.documentElement.lang==='en');
  assert.equal(w.localStorage.getItem('portal-life.v1'),beforeLocale);
  w.document.querySelector('#close').click();

  media=w.document.querySelector('.media-window');
  assert.equal(media?.getAttribute('data-presentation-id'),'activity/forest/route/logging-road');
  assert.equal(media?.getAttribute('data-resolved-slot'),'activity/forest/route/logging-road');
  const activityAfter=JSON.parse(w.localStorage.getItem('portal-life.v1')).run.flow.activity;
  assert.deepEqual(activityAfter,activityBefore);
  assert.deepEqual(errors,[]);
 }finally{dom.window.close();}
});


test('renderer: generic labels and hints localize Stats Bag and encounter shell without save drift',async()=>{
 const s=started();
 const {w,dom,errors}=boot(JSON.stringify(s));try{
  await wait(()=>!!w.document.querySelector('[data-panel="stats"]'));
  const before=w.localStorage.getItem('portal-life.v1');

  w.document.querySelector('[data-panel="stats"]').click();
  assert.match(w.document.querySelector('.panel')?.textContent??'',/Сила/);
  assert.match(w.document.querySelector('.panel')?.textContent??'',/Грубая физическая сила/);
  w.document.querySelector('#close').click();

  w.document.querySelector('[data-panel="bag"]').click();
  assert.match(w.document.querySelector('.panel')?.textContent??'',/Травы|Микстуры|Весы/);
  w.document.querySelector('#close').click();

  w.document.querySelector('[data-panel="menu"]').click();
  w.document.querySelector('#language-toggle').click();
  await wait(()=>w.document.documentElement.lang==='en');
  assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  w.document.querySelector('#close').click();

  w.document.querySelector('[data-panel="stats"]').click();
  assert.match(w.document.querySelector('.panel')?.textContent??'',/Strength/);
  assert.match(w.document.querySelector('.panel')?.textContent??'',/Raw physical strength/);
  w.document.querySelector('#close').click();

  w.document.querySelector('[data-panel="bag"]').click();
  assert.match(w.document.querySelector('.panel')?.textContent??'',/Herbs|Tonics|Scales/);
  w.document.querySelector('#close').click();

  assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  assert.deepEqual(errors,[]);
 }finally{dom.window.close();}
});

test('renderer: pending encounter eyebrow localizes without changing pending scene identity',async()=>{
 const s=started();
 s.run.pending={eventId:'base.arrival',variantId:'welcome',allowedChoiceIds:['introduce']};
 const {w,dom,errors}=boot(JSON.stringify(s));try{
  await wait(()=>!!w.document.querySelector('[data-choice="introduce"]'));
  const before=w.localStorage.getItem('portal-life.v1');
  assert.equal(w.document.querySelector('.stage-title .eyebrow')?.textContent,'Встреча');

  w.document.querySelector('[data-panel="menu"]').click();
  w.document.querySelector('#language-toggle').click();
  await wait(()=>w.document.documentElement.lang==='en');
  assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  w.document.querySelector('#close').click();

  assert.equal(w.document.querySelector('.stage-title .eyebrow')?.textContent,'Encounter');
  const after=JSON.parse(w.localStorage.getItem('portal-life.v1'));
  assert.equal(after.run.flow.pendingScene.eventId,'base.arrival');
  assert.equal(after.run.flow.pendingScene.variantId,'welcome');
  assert.deepEqual(after.run.flow.pendingScene.allowedChoiceIds,['introduce']);
  assert.deepEqual(errors,[]);
 }finally{dom.window.close();}
});


test('renderer: Forest route-specific presentation stays locale and save invariant',async()=>{
 const s=started();
 const {w,dom,errors}=boot(JSON.stringify(s));try{
  await wait(()=>!!w.document.querySelector('[data-panel="explore"]'));
  w.document.querySelector('[data-panel="explore"]').click();
  await wait(()=>!!w.document.querySelector('[data-enter-activity="lumber.forest"]'));
  w.document.querySelector('[data-enter-activity="lumber.forest"]').click();
  await wait(()=>!!w.document.querySelector('[data-activity-action="forest.route.logging-road"]'));

  assert.match(w.document.querySelector('.media-window img')?.getAttribute('src')??'',/forest-route-default-v1\.svg$/);
  assert.match(w.document.querySelector('.dialogue')?.textContent??'',/Широкая рабочая дорога со свежими следами лесозаготовок/);

  w.document.querySelector('[data-activity-action="forest.route.logging-road"]').click();
  await wait(()=>JSON.parse(w.localStorage.getItem('portal-life.v1')).run.flow.activity?.internalState?.routeId==='logging-road');
  const before=w.localStorage.getItem('portal-life.v1');
  const beforeParsed=JSON.parse(before);
  const imgRu=w.document.querySelector('.media-window img');
  assert.match(imgRu?.getAttribute('src')??'',/forest-route-logging-road\.svg$/);
  assert.match(imgRu?.getAttribute('alt')??'',/Лесовозная дорога с колеями/);
  assert.match(w.document.querySelector('.dialogue')?.textContent??'',/Маршрут: Лесовозная дорога/);
  assert.doesNotMatch(w.document.querySelector('.dialogue')?.textContent??'',/logging-road/);

  w.document.querySelector('[data-panel="menu"]').click();
  w.document.querySelector('#language-toggle').click();
  await wait(()=>w.document.documentElement.lang==='en');
  assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  w.document.querySelector('#close').click();

  const imgEn=w.document.querySelector('.media-window img');
  assert.equal(imgEn?.getAttribute('src'),imgRu?.getAttribute('src'));
  assert.match(imgEn?.getAttribute('alt')??'',/Logging road with wheel ruts/);
  assert.match(w.document.querySelector('.dialogue')?.textContent??'',/Route: Logging road/);
  assert.doesNotMatch(w.document.querySelector('.dialogue')?.textContent??'',/logging-road/);
  const after=JSON.parse(w.localStorage.getItem('portal-life.v1'));
  assert.equal(after.run.flow.activity.internalState.routeId,'logging-road');
  assert.equal(after.run.flow.activity.rngState,beforeParsed.run.flow.activity.rngState);
  assert.equal(after.run.rngState.state,beforeParsed.run.rngState.state);
  assert.deepEqual(after.run.flow.activity.accumulatedRewards,beforeParsed.run.flow.activity.accumulatedRewards);
  assert.deepEqual(errors,[]);
 }finally{dom.window.close();}
});


test('renderer: ordinary action result localizes RU EN without changing save',async()=>{
 const s=started();
 const {w,dom,errors}=boot(JSON.stringify(s));try{
  await wait(()=>!!w.document.querySelector('[data-panel="explore"]'));
  w.document.querySelector('[data-panel="explore"]').click();
  await wait(()=>!!w.document.querySelector('[data-action="oddjob"]'));
  w.document.querySelector('[data-action="oddjob"]').click();
  await wait(()=>w.document.querySelector('.stage-title h1')?.textContent==='Мелкая подработка');

  assert.match(w.document.querySelector('.dialogue p')?.textContent??'',/10 монет за поручение/);
  const before=w.localStorage.getItem('portal-life.v1');
  const beforeParsed=JSON.parse(before);

  w.document.querySelector('[data-panel="menu"]').click();
  w.document.querySelector('#language-toggle').click();
  await wait(()=>w.document.documentElement.lang==='en');
  assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  w.document.querySelector('#close').click();

  assert.equal(w.document.querySelector('.stage-title h1')?.textContent,'Take a small odd job');
  assert.match(w.document.querySelector('.dialogue p')?.textContent??'',/Earn 10 coins for an errand/);
  const after=JSON.parse(w.localStorage.getItem('portal-life.v1'));
  assert.equal(after.run.historyState.actionCounts.oddjob,beforeParsed.run.historyState.actionCounts.oddjob);
  assert.equal(after.run.rngState.state,beforeParsed.run.rngState.state);
  assert.deepEqual(after.run.flow.lastAction,beforeParsed.run.flow.lastAction);
  assert.deepEqual(errors,[]);
 }finally{dom.window.close();}
});

test('renderer: ending cards localize RU EN without changing eligibility or save',async()=>{
 const s=started();
 const {w,dom,errors}=boot(JSON.stringify(s));try{
  await wait(()=>!!w.document.querySelector('[data-panel="legacy"]'));
  const before=w.localStorage.getItem('portal-life.v1');

  w.document.querySelector('[data-panel="legacy"]').click();
  assert.match(w.document.querySelector('.panel')?.textContent??'',/Своя в артели/);
  assert.match(w.document.querySelector('.panel')?.textContent??'',/Пять практик в лавке/);
  w.document.querySelector('#close').click();

  w.document.querySelector('[data-panel="menu"]').click();
  w.document.querySelector('#language-toggle').click();
  await wait(()=>w.document.documentElement.lang==='en');
  assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  w.document.querySelector('#close').click();

  w.document.querySelector('[data-panel="legacy"]').click();
  assert.match(w.document.querySelector('.panel')?.textContent??'',/One of the Crew/);
  assert.match(w.document.querySelector('.panel')?.textContent??'',/Five shop practices/);
  assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  assert.deepEqual(errors,[]);
 }finally{dom.window.close();}
});


test('renderer: Stats profession labels localize without save changes',async()=>{
 const s=started();
 const {w,dom,errors}=boot(JSON.stringify(s));try{
  await wait(()=>!!w.document.querySelector('[data-panel="stats"]'));
  const before=w.localStorage.getItem('portal-life.v1');

  w.document.querySelector('[data-panel="stats"]').click();
  assert.match(w.document.querySelector('.panel')?.textContent??'',/Лесоруб:/);
  assert.doesNotMatch(w.document.querySelector('.panel')?.textContent??'',/lumber\.shift/);
  w.document.querySelector('#close').click();

  w.document.querySelector('[data-panel="menu"]').click();
  w.document.querySelector('#language-toggle').click();
  await wait(()=>w.document.documentElement.lang==='en');
  assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  w.document.querySelector('#close').click();

  w.document.querySelector('[data-panel="stats"]').click();
  assert.match(w.document.querySelector('.panel')?.textContent??'',/Lumber Worker:/);
  assert.doesNotMatch(w.document.querySelector('.panel')?.textContent??'',/lumber\.shift/);
  assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  assert.deepEqual(errors,[]);
 }finally{dom.window.close();}
});


test('renderer: remaining legacy unlock labels localize without save changes',async()=>{
 const s=started();
 s.meta.unlocks=['guild'];
 const {w,dom,errors}=boot(JSON.stringify(s));try{
  await wait(()=>!!w.document.querySelector('[data-panel="legacy"]'));
  const before=w.localStorage.getItem('portal-life.v1');

  w.document.querySelector('[data-panel="legacy"]').click();
  assert.match(w.document.querySelector('.panel')?.textContent??'',/Своя в артели/);
  w.document.querySelector('#close').click();

  w.document.querySelector('[data-panel="menu"]').click();
  w.document.querySelector('#language-toggle').click();
  await wait(()=>w.document.documentElement.lang==='en');
  assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  w.document.querySelector('#close').click();

  w.document.querySelector('[data-panel="legacy"]').click();
  assert.match(w.document.querySelector('.panel')?.textContent??'',/One of the Crew/);
  assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  assert.deepEqual(errors,[]);
 }finally{dom.window.close();}
});
