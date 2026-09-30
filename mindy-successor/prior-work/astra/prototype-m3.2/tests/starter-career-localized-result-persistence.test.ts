import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';

import {dispatch,parseSave} from '../src/core/engine.ts';
import {act,catalog,started} from './helpers.ts';

const {JSDOM,VirtualConsole}=createRequire(import.meta.url)('jsdom');
const html=readFileSync('dist/index.html','utf8');
const bundle=readFileSync('dist/app.js','utf8');
const data=JSON.parse(readFileSync('dist/content.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;

async function wait(check:()=>boolean){
  for(let i=0;i<100;i++){
    if(check())return;
    await new Promise(r=>setTimeout(r,5));
  }
  throw new Error('UI update timed out');
}

function boot(saved:string){
  const errors:string[]=[];
  const vc=new VirtualConsole();
  vc.on('jsdomError',(e:Error)=>errors.push(e.message));
  const dom=new JSDOM(html,{url:'http://localhost:4173',runScripts:'outside-only',virtualConsole:vc});
  const w=dom.window;
  w.structuredClone=structuredClone;
  w.fetch=async()=>({ok:true,json:async()=>structuredClone(data)});
  w.confirm=()=>true;
  w.localStorage.setItem('portal-life.v1',saved);
  w.eval(bundle);
  return {dom,w,errors};
}

function directResult(actionId:'lumber.shift'|'satyr-maid.shift'|'undead-farm.shift'){
  let s=started();
  if(actionId==='lumber.shift'){
    s=act(s,'lumber.shift');
    assert.equal(s.run.pending,null);
  }
  const out=dispatch(s,{type:'action',id:actionId},catalog);
  assert.equal(out.run.pending,null,actionId);
  assert.equal(out.run.lastAction?.id,actionId);
  assert.equal(out.run.lastAction?.outcomeRef,undefined);
  return out;
}

for(const actionId of ['lumber.shift','satyr-maid.shift','undead-farm.shift'] as const){
  test('C1D-54 '+actionId+' direct result identity survives Save reload and locale switching',async()=>{
    const before=directResult(actionId);
    const restored=parseSave(JSON.stringify(before),catalog);
    const restoredAgain=parseSave(JSON.stringify(restored),catalog);
    assert.deepEqual(restored.run.lastAction,before.run.lastAction,actionId+' first reload');
    assert.deepEqual(restoredAgain.run.lastAction,before.run.lastAction,actionId+' second reload');

    const action=catalog.definitions.actions.find(item=>item.id===actionId);
    assert.ok(action,actionId);
    const scene=action.scenes?.find(item=>item.text===restoredAgain.run.lastAction?.text);
    assert.ok(scene,actionId+' exact scene');
    const key='action.'+actionId+'.scene.'+scene.id+'.text';
    const ru=localization[key]?.ru??scene.text;
    const en=localization[key]?.en??scene.text;

    const saved=JSON.stringify(restoredAgain);
    const {dom,w,errors}=boot(saved);
    try{
      await wait(()=>!!w.document.querySelector('.dialogue p')||errors.length>0);
      assert.deepEqual(errors,[]);
      assert.equal(w.document.querySelector('.dialogue p').textContent,ru,actionId+' ru/fallback');
      const persisted=w.localStorage.getItem('portal-life.v1');

      w.document.querySelector('[data-panel="menu"]').click();
      w.document.querySelector('#language-toggle').click();
      await wait(()=>w.document.documentElement.lang==='en');
      assert.equal(w.document.querySelector('.dialogue p').textContent,en,actionId+' en/fallback');
      assert.equal(w.localStorage.getItem('portal-life.v1'),persisted,actionId+' locale switch must not mutate Save');
    }finally{
      dom.window.close();
    }
  });
}
