import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';

import {started} from './helpers.ts';

const {JSDOM,VirtualConsole}=createRequire(import.meta.url)('jsdom');
const html=readFileSync('dist/index.html','utf8');
const bundle=readFileSync('dist/app.js','utf8');
const data=JSON.parse(readFileSync('dist/content.json','utf8'));

async function wait(check:()=>boolean){
 for(let i=0;i<100;i++){if(check())return;await new Promise(r=>setTimeout(r,5));}
 throw new Error('UI update timed out');
}

async function inspect(locale:'ru'|'en'){
 const errors:string[]=[];
 const vc=new VirtualConsole();vc.on('jsdomError',(e:Error)=>errors.push(e.message));
 const dom=new JSDOM(html,{url:'http://localhost:4173/?dev=1',runScripts:'outside-only',virtualConsole:vc});
 const w=dom.window;w.structuredClone=structuredClone;w.fetch=async()=>({ok:true,json:async()=>structuredClone(data)});w.confirm=()=>true;
 w.localStorage.setItem('portal-life.v1',JSON.stringify(started()));
 w.localStorage.setItem('portal-life.locale',locale);
 w.eval(bundle);
 await wait(()=>!!w.document.querySelector('[data-panel="work"]'));
 w.document.querySelector('[data-panel="work"]').click();
 await wait(()=>!!w.document.querySelector('[data-action="lumber.shift"]'));
 return {dom,w,errors};
}

test('locked ordinary careers expose localized visible and accessible help without changing availability',async()=>{
 for(const locale of ['ru','en'] as const){
  const {dom,w,errors}=await inspect(locale);
  try{
   for(const id of ['lumber.shift','satyr-maid.shift','undead-farm.shift']){
    const button=w.document.querySelector(`[data-action="${id}"]`);
    assert.ok(button,id);assert.equal(button.disabled,false,id);assert.equal(button.hasAttribute('aria-describedby'),false,id);
   }
   for(const id of ['tavern.shift','hunter.shift','guard.shift','merchant.shift','artist-geisha.shift','assassin.shift','prostitute.shift']){
    const button=w.document.querySelector(`[data-action="${id}"]`);
    assert.ok(button,id);assert.equal(button.disabled,true,id);
    assert.equal(button.getAttribute('aria-disabled'),'true',id);
    const describedBy=button.getAttribute('aria-describedby');assert.ok(describedBy,id+' describedby');
    const help=w.document.getElementById(describedBy);assert.ok(help,id+' help');
    assert.ok(help.textContent?.trim(),id+' help text');
    assert.ok(button.getAttribute('aria-label')?.includes(help.textContent.trim()),id+' aria label');
    if(locale==='ru')assert.match(help.textContent,/карьерный путь/i);
    else assert.match(help.textContent,/career path/i);
   }
   assert.deepEqual(errors,[]);
  }finally{dom.window.close();}
 }
});
