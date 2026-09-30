import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';

import {parseSave} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';

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

function savedScene(actionId:'lumber.shift'|'satyr-maid.shift'|'undead-farm.shift'){
  const action=catalog.definitions.actions.find(item=>item.id===actionId);
  assert.ok(action,actionId);
  const scene=action.scenes?.[0];
  assert.ok(scene,actionId+' scene');

  const s=started();
  s.run.flow.lastAction={
    id:action.id,
    title:action.label,
    text:scene.text,
    media:[...scene.media],
    deltas:{}
  };
  s.run.historyState.actionCounts[action.id]=1;
  return {
    action,
    scene,
    saved:JSON.stringify(parseSave(JSON.stringify(s),catalog))
  };
}

test('C1D-54 starter-career multi-scene result survives Save reload and locale switching',async()=>{
  for(const id of ['lumber.shift','satyr-maid.shift','undead-farm.shift'] as const){
    const {scene,saved}=savedScene(id);
    const key=`action.${id}.scene.${scene.id}.text`;
    const pair=localization[key];

    const {dom,w,errors}=boot(saved);
    try{
      await wait(()=>!!w.document.querySelector('.dialogue p')||errors.length>0);
      assert.deepEqual(errors,[]);
      const ru=w.document.querySelector('.dialogue p').textContent;

      if(id==='lumber.shift'){
        assert.equal(pair,undefined,'Lumber currently uses source-text fallback');
        assert.equal(ru,scene.text);
      }else{
        assert.ok(pair?.ru?.trim(),key+' ru');
        assert.ok(pair?.en?.trim(),key+' en');
        assert.equal(ru,pair.ru);
      }

      w.document.querySelector('[data-panel="menu"]').click();
      w.document.querySelector('#language-toggle').click();
      await wait(()=>w.document.documentElement.lang==='en');
      const en=w.document.querySelector('.dialogue p').textContent;

      if(id==='lumber.shift')assert.equal(en,scene.text);
      else assert.equal(en,pair.en);

      assert.equal(w.localStorage.getItem('portal-life.v1'),saved,id+' locale switch must not mutate Save');
    }finally{
      dom.window.close();
    }
  }
});
