import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';

import {dispatch} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';

const {JSDOM,VirtualConsole}=createRequire(import.meta.url)('jsdom');
const html=readFileSync('dist/index.html','utf8');
const bundle=readFileSync('dist/app.js','utf8');
const data=JSON.parse(readFileSync('dist/content.json','utf8'));
const manifest=JSON.parse(readFileSync('content/presentation-drafts/presentation-hardening-v9-manifest-v1.json','utf8'));

async function wait(check:()=>boolean){
  for(let i=0;i<100;i++){if(check())return;await new Promise(r=>setTimeout(r,5));}
  throw new Error('keyboard/focus v9 UI update timed out');
}
async function boot(save:any,locale:'ru'|'en'='en'){
  const errors:string[]=[];
  const vc=new VirtualConsole();vc.on('jsdomError',(e:Error)=>errors.push(e.message));
  const dom=new JSDOM(html,{url:'http://localhost:4173',runScripts:'outside-only',virtualConsole:vc});
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

test('Work controls keep clear disabled-state relationships and panel close receives initial focus',async()=>{
  const {dom,w,errors}=await boot(started());
  try{
    w.document.querySelector('[data-panel="work"]').click();
    await wait(()=>!!w.document.querySelector('[data-action="lumber.shift"]'));
    assert.equal(w.document.activeElement?.id,'close');

    for(const id of ['lumber.shift','satyr-maid.shift','undead-farm.shift']){
      const button=w.document.querySelector(`[data-action="${id}"]`);
      assert.ok(button,id);
      assert.equal(button.disabled,false,id);
      assert.ok(button.textContent?.trim(),id+' name');
      button.focus();
      assert.equal(w.document.activeElement,button,id+' focus');
    }
    for(const id of ['tavern.shift','hunter.shift','guard.shift','merchant.shift','artist-geisha.shift','assassin.shift','prostitute.shift']){
      const button=w.document.querySelector(`[data-action="${id}"]`);
      assert.ok(button,id);
      assert.equal(button.disabled,true,id);
      assert.equal(button.getAttribute('aria-disabled'),'true',id);
      const helpId=button.getAttribute('aria-describedby');
      assert.ok(helpId,id+' aria-describedby');
      const help=w.document.getElementById(helpId);
      assert.ok(help?.textContent?.trim(),id+' visible reason');
      const before=w.document.activeElement;
      button.focus();
      assert.equal(w.document.activeElement,before,id+' disabled focus');
    }
    assert.equal(manifest.accessibilityAudit.work.focusableLockedReason,'prepared-in-pr136-not-current-main');
    assert.deepEqual(errors,[]);
  }finally{dom.window.close();}
});

test('School course controls have visible accessible names and preserve current availability state',async()=>{
  const {dom,w,errors}=await boot(started());
  try{
    w.document.querySelector('[data-panel="school"]').click();
    await wait(()=>w.document.querySelectorAll('[data-school-course]').length===8);
    assert.equal(w.document.activeElement?.id,'close');
    const controls=[...w.document.querySelectorAll('[data-school-course]')];
    assert.equal(controls.length,8);
    for(const button of controls){
      assert.ok(button.textContent?.trim(),'School visible button name');
      const article=button.closest('article');
      assert.ok(article?.querySelector('h3')?.textContent?.trim(),'School adjacent course heading');
    }
    assert.deepEqual(errors,[]);
  }finally{dom.window.close();}
});

test('ending controls expose a visible name, disable unavailable endings and enable an eligible existing ending',async()=>{
  let s=started();
  s.run.progression.careers.lumber={stage:'veteran',shifts:0,counters:{completed_shifts:49},choices:{},facts:[]};
  s=dispatch(s,{type:'action',id:'lumber.shift'},catalog);
  const {dom,w,errors}=await boot(s);
  try{
    w.document.querySelector('[data-panel="legacy"]').click();
    await wait(()=>!!w.document.querySelector('[data-ending="ending.lumber.hard-work"]'));
    assert.equal(w.document.activeElement?.id,'close');
    const buttons=[...w.document.querySelectorAll('[data-ending]')];
    for(const button of buttons)assert.ok(button.textContent?.trim(),'ending visible name');
    const visibleIds=buttons.map((button:any)=>button.dataset.ending);
    const ordinaryEndingIds=catalog.definitions.endings.filter(ending=>!ending.id.startsWith('ending.palace.')).map(ending=>ending.id);
    assert.deepEqual([...visibleIds].sort(),[...ordinaryEndingIds].sort());
    const eligible=w.document.querySelector('[data-ending="ending.lumber.hard-work"]');
    assert.ok(eligible);
    assert.equal(eligible.disabled,false);
    const unavailable=buttons.filter((button:any)=>button.dataset.ending!=='ending.lumber.hard-work');
    assert.ok(unavailable.some((button:any)=>button.disabled));
    assert.equal(buttons.some((button:any)=>button.dataset.ending?.startsWith('ending.palace.')),false);
    assert.deepEqual(errors,[]);
  }finally{dom.window.close();}
});
