import test from 'node:test';import assert from 'node:assert/strict';import {readFileSync} from 'node:fs';import {createRequire} from 'node:module';import {started} from './helpers.ts';
const {JSDOM,VirtualConsole}=createRequire(import.meta.url)('jsdom');
const html=readFileSync('dist/index.html','utf8'),bundle=readFileSync('dist/app.js','utf8'),data=JSON.parse(readFileSync('dist/content.json','utf8'));
async function wait(check:()=>boolean){for(let i=0;i<100;i++){if(check())return;await new Promise(r=>setTimeout(r,5));}throw new Error('UI update timed out');}
function boot(saved?:string,presentation?:unknown){const errors:string[]=[];const vc=new VirtualConsole();vc.on('jsdomError',(e:Error)=>errors.push(e.message));const dom=new JSDOM(html,{url:'http://localhost:4173',runScripts:'outside-only',virtualConsole:vc});const w=dom.window;w.structuredClone=structuredClone;w.fetch=async()=>({ok:true,json:async()=>structuredClone(data)});w.confirm=()=>true;if(saved)w.localStorage.setItem('portal-life.v1',saved);if(presentation)w.localStorage.setItem('portal-life.presentation.v1',JSON.stringify(presentation));w.eval(bundle);return {dom,w,errors};}
test('renderer: create heroine, allocate ten points, begin without spending energy',async()=>{const {w,dom,errors}=boot();try{
 await wait(()=>!!w.document.querySelector('#create'));assert.equal(w.document.querySelector('#create').disabled,true);
 for(let i=0;i<10;i++){w.document.querySelector('[data-stat="lust"][data-delta="1"]').click();await wait(()=>w.document.querySelector('#points').textContent===String(9-i));}
 w.document.querySelector('#create').click();await wait(()=>!!w.document.querySelector('[data-action="arrival"]'));w.document.querySelector('[data-action="arrival"]').click();await wait(()=>!!w.document.querySelector('[data-choice="home"]'));w.document.querySelector('[data-choice="home"]').click();await wait(()=>!w.document.querySelector('[data-choice="home"]'));assert.equal(JSON.parse(w.localStorage.getItem('portal-life.v1')).run.metrics.energy,3);assert.deepEqual(errors,[]);
 }finally{dom.window.close();}});
test('renderer: work opens central scene, choice resolves, repeat consumes energy, reload retains scene',async()=>{const s=started();s.run.rng=1;const {w,dom,errors}=boot(JSON.stringify(s));try{
 await wait(()=>!!w.document.querySelector('[data-panel="work"]'));w.document.querySelector('[data-panel="work"]').click();w.document.querySelector('[data-action="lumber"]').click();await wait(()=>!!w.document.querySelector('[data-choice="learn"]'));assert.equal(w.document.querySelectorAll('.media-window').length,1);
 w.document.querySelector('[data-choice="learn"]').click();await wait(()=>!!w.document.querySelector('[data-action="lumber"]'));assert.match(w.document.querySelector('[data-action="lumber"]').textContent,/Работать ещё/);w.document.querySelector('[data-action="lumber"]').click();await wait(()=>JSON.parse(w.localStorage.getItem('portal-life.v1')).run.actionCounts.lumber===2);assert.match(w.document.querySelector('.energy').textContent,/1\/3/);
 const saved=w.localStorage.getItem('portal-life.v1');const second=boot(saved);try{await wait(()=>!!second.w.document.querySelector('[data-action="lumber"]'));assert.equal(second.w.document.querySelector('.media-window').dataset.mediaId,'stage.lumber.spring');}finally{second.dom.window.close();}assert.deepEqual(errors,[]);
 }finally{dom.window.close();}});
test('renderer: zero energy remains same day, sleep advances date and refreshes HUD',async()=>{const s=started();s.run.metrics.energy=0;s.run.slot=3;const {w,dom}=boot(JSON.stringify(s));try{
 await wait(()=>!!w.document.querySelector('[data-panel="sleep"]'));w.document.querySelector('[data-panel="sleep"]').click();w.document.querySelector('[data-sleep="outside"]').click();await wait(()=>JSON.parse(w.localStorage.getItem('portal-life.v1')).run.day===1);assert.match(w.document.querySelector('.date').textContent,/День 2/);assert.match(w.document.querySelector('.energy').textContent,/2\/3/);
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
