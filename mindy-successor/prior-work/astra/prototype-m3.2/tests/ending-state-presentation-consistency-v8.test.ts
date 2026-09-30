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

async function wait(check:()=>boolean){
  for(let i=0;i<100;i++){if(check())return;await new Promise(r=>setTimeout(r,5));}
  throw new Error('ending presentation UI update timed out');
}

function eligibleSave(){
  let s=started();
  s.run.progression.careers.lumber={
    stage:'accepted-hand',
    shifts:0,
    counters:{completed_shifts:49},
    choices:{},
    facts:[]
  };
  s=dispatch(s,{type:'action',id:'lumber.shift'},catalog);
  assert.ok(s.run.endings.eligible.includes('ending.lumber.hard-work'));
  return s;
}
function committedSave(){
  return dispatch(eligibleSave(),{type:'commitEnding',id:'ending.lumber.hard-work'},catalog);
}
function completedSave(){
  return dispatch(committedSave(),{type:'completeEnding'},catalog);
}

async function boot(save:any,locale:'ru'|'en'){
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

test('eligible ending stays an enabled existing fate action before commitment',async()=>{
  const {dom,w,errors}=await boot(eligibleSave(),'en');
  try{
    w.document.querySelector('[data-panel="legacy"]').click();
    await wait(()=>!!w.document.querySelector('[data-ending="ending.lumber.hard-work"]'));
    const button=w.document.querySelector('[data-ending="ending.lumber.hard-work"]');
    assert.equal(button.disabled,false);
    assert.deepEqual(errors,[]);
  }finally{dom.window.close();}
});

test('committed ending has distinct localized state title and exact ending presentation identity',async()=>{
  for(const locale of ['ru','en'] as const){
    const {dom,w,errors}=await boot(committedSave(),locale);
    try{
      await wait(()=>!!w.document.querySelector('[data-presentation-id="ending/lumber/hard-work"]'));
      const expected=data.localization.strings['ui.run.endingCommitted'][locale];
      assert.equal(w.document.querySelector('.stage-title h1')?.textContent,expected);
      assert.equal(w.document.querySelector('.media-window')?.getAttribute('data-presentation-id'),'ending/lumber/hard-work');
      assert.deepEqual(errors,[]);
    }finally{dom.window.close();}
  }
});

test('completed ending keeps the same ending presentation identity with completed state title',async()=>{
  for(const locale of ['ru','en'] as const){
    const {dom,w,errors}=await boot(completedSave(),locale);
    try{
      await wait(()=>!!w.document.querySelector('[data-presentation-id="ending/lumber/hard-work"]'));
      const expected=data.localization.strings['ui.run.endingAccepted'][locale];
      assert.equal(w.document.querySelector('.stage-title h1')?.textContent,expected);
      assert.equal(w.document.querySelector('.media-window')?.getAttribute('data-presentation-id'),'ending/lumber/hard-work');
      assert.deepEqual(errors,[]);
    }finally{dom.window.close();}
  }
});
