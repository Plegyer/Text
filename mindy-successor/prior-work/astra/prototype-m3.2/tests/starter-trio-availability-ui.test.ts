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
  for(let i=0;i<100;i++){
    if(check())return;
    await new Promise(r=>setTimeout(r,5));
  }
  throw new Error('UI update timed out');
}

function boot(){
  const errors:string[]=[];
  const vc=new VirtualConsole();
  vc.on('jsdomError',(e:Error)=>errors.push(e.message));
  const dom=new JSDOM(html,{url:'http://localhost:4173/?dev=1',runScripts:'outside-only',virtualConsole:vc});
  const w=dom.window;
  w.structuredClone=structuredClone;
  w.fetch=async()=>({ok:true,json:async()=>structuredClone(data)});
  w.confirm=()=>true;
  w.localStorage.setItem('portal-life.v1',JSON.stringify(started()));
  w.eval(bundle);
  return {dom,w,errors};
}

test('Work panel uses the engine starter-trio availability contract on Day 1',async()=>{
  const {dom,w,errors}=boot();
  try{
    await wait(()=>!!w.document.querySelector('[data-panel="work"]'));
    w.document.querySelector('[data-panel="work"]').click();
    await wait(()=>!!w.document.querySelector('[data-action="lumber.shift"]'));

    for(const id of ['lumber.shift','satyr-maid.shift','undead-farm.shift']){
      const button=w.document.querySelector(`[data-action="${id}"]`);
      assert.ok(button,id);
      assert.equal(button.disabled,false,id);
    }

    for(const id of [
      'tavern.shift',
      'hunter.shift',
      'guard.shift',
      'merchant.shift',
      'artist-geisha.shift',
      'assassin.shift',
      'prostitute.shift'
    ]){
      const button=w.document.querySelector(`[data-action="${id}"]`);
      assert.ok(button,id);
      assert.equal(button.disabled,true,id);
    }

    assert.deepEqual(errors,[]);
  }finally{
    dom.window.close();
  }
});
