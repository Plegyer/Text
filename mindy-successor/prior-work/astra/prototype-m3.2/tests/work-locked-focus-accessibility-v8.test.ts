import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';

import {started} from './helpers.ts';

const {JSDOM,VirtualConsole}=createRequire(import.meta.url)('jsdom');
const html=readFileSync('dist/index.html','utf8');
const bundle=readFileSync('dist/app.js','utf8');
const data=JSON.parse(readFileSync('dist/content.json','utf8'));
const lockedIds=['tavern.shift','hunter.shift','guard.shift','merchant.shift','artist-geisha.shift','assassin.shift','prostitute.shift'];

async function wait(check:()=>boolean){
  for(let i=0;i<100;i++){if(check())return;await new Promise(r=>setTimeout(r,5));}
  throw new Error('locked Work focus UI update timed out');
}

async function inspect(locale:'ru'|'en'){
  const errors:string[]=[];
  const vc=new VirtualConsole();vc.on('jsdomError',(e:Error)=>errors.push(e.message));
  const dom=new JSDOM(html,{url:'http://localhost:4173',runScripts:'outside-only',virtualConsole:vc});
  const w=dom.window;
  w.structuredClone=structuredClone;
  w.fetch=async()=>({ok:true,json:async()=>structuredClone(data)});
  w.confirm=()=>true;
  w.localStorage.setItem('portal-life.v1',JSON.stringify(started()));
  w.localStorage.setItem('portal-life.locale',locale);
  w.eval(bundle);
  await wait(()=>!!w.document.querySelector('[data-panel="work"]'));
  w.document.querySelector('[data-panel="work"]').click();
  await wait(()=>!!w.document.querySelector('[data-action="tavern.shift"]'));
  return {dom,w,errors};
}

test('locked Work reasons are keyboard-focusable while action buttons remain mechanically disabled',async()=>{
  for(const locale of ['ru','en'] as const){
    const {dom,w,errors}=await inspect(locale);
    try{
      for(const id of lockedIds){
        const button=w.document.querySelector(`[data-action="${id}"]`);
        const help=w.document.querySelector(`[data-lock-help="${id}"]`);
        assert.ok(button,id+' button');
        assert.ok(help,id+' help');
        assert.equal(button.disabled,true,id);
        assert.equal(button.getAttribute('aria-disabled'),'true',id);
        assert.equal(button.getAttribute('aria-describedby'),help.id,id);
        assert.equal(help.getAttribute('role'),'note',id);
        assert.equal(help.tabIndex,0,id);
        assert.ok(help.getAttribute('aria-label')?.trim(),id+' aria-label');
        help.focus();
        assert.equal(w.document.activeElement,help,id+' focus');
      }
      for(const id of ['lumber.shift','satyr-maid.shift','undead-farm.shift']){
        assert.equal(w.document.querySelector(`[data-lock-help="${id}"]`),null,id);
        assert.equal(w.document.querySelector(`[data-action="${id}"]`)?.disabled,false,id);
      }
      assert.deepEqual(errors,[]);
    }finally{dom.window.close();}
  }
});
