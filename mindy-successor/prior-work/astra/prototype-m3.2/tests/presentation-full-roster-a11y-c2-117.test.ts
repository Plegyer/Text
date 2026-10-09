import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {createRequire} from 'node:module';

import {dispatch} from '../src/core/engine.ts';
import {presentationSlots} from '../src/core/presentation.ts';
import {catalog,started} from './helpers.ts';

const {JSDOM,VirtualConsole}=createRequire(import.meta.url)('jsdom');
const html=readFileSync('dist/index.html','utf8');
const bundle=readFileSync('dist/app.js','utf8');
const data=JSON.parse(readFileSync('dist/content.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));

const lateCareerIds=['tavern.shift','hunter.shift','guard.shift','merchant.shift','artist-geisha.shift','assassin.shift','prostitute.shift'];
const careers=['lumber','satyr-maid','undead-farm','tavern','hunter','guard','merchant','artist-geisha','assassin','prostitute'];

async function wait(check:()=>boolean){
 for(let i=0;i<100;i++){if(check())return;await new Promise(r=>setTimeout(r,5));}
 throw new Error('C2-117 UI update timed out');
}
async function boot(save:any,locale:'ru'|'en'){
 const errors:string[]=[];
 const vc=new VirtualConsole();vc.on('jsdomError',(e:Error)=>errors.push(e.message));
 const dom=new JSDOM(html,{url:'http://localhost:4173/?dev=1',runScripts:'outside-only',virtualConsole:vc});
 const w=dom.window;
 w.structuredClone=structuredClone;
 w.fetch=async()=>({ok:true,json:async()=>structuredClone(data)});
 w.confirm=()=>true;
 w.localStorage.setItem('portal-life.v1',JSON.stringify(save));
 w.localStorage.setItem('portal-life.locale',locale);
 w.eval(bundle);
 await wait(()=>!!w.document.querySelector('.game-shell'));
 return {dom,w,errors};
}
function bilingual(key:string){
 assert.ok(localization[key]?.ru?.trim(),key+' ru');
 assert.ok(localization[key]?.en?.trim(),key+' en');
}

test('C2-117 late-career Work rows expose bilingual visible state and keyboard-safe lock semantics',async()=>{
 for(const locale of ['ru','en'] as const){
  const {dom,w,errors}=await boot(started(),locale);
  try{
   w.document.querySelector('[data-panel="work"]').click();
   await wait(()=>w.document.querySelectorAll('[data-late-career]').length===7);
   assert.equal(w.document.activeElement?.id,'close',locale+' panel close focus');
   for(const id of lateCareerIds){
    const article=w.document.querySelector(`[data-late-career="${id}"]`);
    const state=article?.querySelector('[data-career-availability]');
    const button=article?.querySelector(`[data-action="${id}"]`);
    assert.ok(article,id);
    assert.ok(state,id+' visible availability state');
    assert.equal(state?.getAttribute('data-career-availability'),'locked',id);
    assert.equal(state?.textContent?.trim(),locale==='ru'?'Закрыто':'Locked',id+' '+locale);
    assert.ok(state?.getAttribute('aria-label')?.trim(),id+' state aria');
    assert.equal(button?.disabled,true,id);
    assert.equal(button?.getAttribute('aria-disabled'),'true',id);
    const helpId=button?.getAttribute('aria-describedby');
    assert.ok(helpId,id+' aria-describedby');
    assert.ok(w.document.getElementById(helpId)?.textContent?.trim(),id+' visible lock reason');
    const before=w.document.activeElement;
    button?.focus();
    assert.equal(w.document.activeElement,before,id+' disabled control stays out of focus');
   }
   assert.deepEqual(errors,[]);
  }finally{dom.window.close();}
 }
});

test('C2-117 eligible Hard Work ending exposes focusable control and bilingual presentation state',async()=>{
 let save=started();
 save.run.progression.careers.lumber={stage:'veteran',shifts:0,counters:{completed_shifts:49},choices:{},facts:[]};
 save=dispatch(save,{type:'action',id:'lumber.shift'},catalog);
 for(const locale of ['ru','en'] as const){
  const {dom,w,errors}=await boot(save,locale);
  try{
   w.document.querySelector('[data-panel="legacy"]').click();
   await wait(()=>!!w.document.querySelector('[data-ending-id="ending.lumber.hard-work"]'));
   const article=w.document.querySelector('[data-ending-id="ending.lumber.hard-work"]');
   const state=article?.querySelector('.ending-state');
   const button=article?.querySelector('[data-ending="ending.lumber.hard-work"]');
   assert.equal(article?.getAttribute('data-ending-state'),'eligible');
   assert.equal(state?.textContent?.trim(),locale==='ru'?'Доступно':'Eligible');
   assert.equal(button?.disabled,false);
   button?.focus();
   assert.equal(w.document.activeElement,button,'eligible ending control focusable');
   assert.deepEqual(errors,[]);
  }finally{dom.window.close();}
 }
});

test('C2-117 all ten Hard Work presentation identities have RU EN title body alt caption and static source',()=>{
 const registry=new Set(presentationSlots(catalog).map(slot=>slot.id));
 for(const career of careers){
  const presentationId=`ending/${career}/hard-work`;
  const titleKey=`ending.ending.${career}.hard-work.title`;
  const bodyKey=`ending.ending.${career}.hard-work.description`;
  const altKey=career==='lumber'
   ?'presentation.static.lumber-ending-hard-work.alt'
   :`presentation.static.${career}-ending-hard-work.alt`;
  const captionKey=altKey.replace(/\.alt$/,'.caption');
  bilingual(titleKey);
  bilingual(bodyKey);
  bilingual(altKey);
  bilingual(captionKey);
  assert.ok(registry.has(presentationId),presentationId+' registry');
  const slot=presentation.slots?.[presentationId];
  assert.ok(slot?.static,presentationId+' static');
  assert.equal(slot.static.altKey,altKey,presentationId+' altKey');
  assert.ok(existsSync(slot.static.src),presentationId+' source');
 }
});
