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

test('Forest Activity consumes approved entry context without mutating gameplay save',async()=>{
  let s=started();
  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},catalog);
  const first=boot(JSON.stringify(s));
  try{
    await wait(()=>!!first.w.document.querySelector('.dialogue p')||first.errors.length>0);
    assert.deepEqual(first.errors,[]);
    const before=first.w.localStorage.getItem('portal-life.v1');
    assert.match(first.w.document.querySelector('.dialogue p').textContent,/За кромкой леса городской шум быстро стихает/);

    first.w.document.querySelector('[data-panel="menu"]').click();
    first.w.document.querySelector('#language-toggle').click();
    await wait(()=>first.w.document.documentElement.lang==='en');
    assert.match(first.w.document.querySelector('.dialogue p').textContent,/Beyond the forest edge, the town noise fades quickly/);
    assert.equal(first.w.localStorage.getItem('portal-life.v1'),before);
  }finally{
    first.dom.window.close();
  }

  s=dispatch(s,{type:'activityAction',id:'forest.route.logging-road'},catalog);
  const routed=boot(JSON.stringify(s));
  try{
    await wait(()=>!!routed.w.document.querySelector('.dialogue p')||routed.errors.length>0);
    assert.deepEqual(routed.errors,[]);
    assert.match(routed.w.document.querySelector('.dialogue p').textContent,/Лесовозная дорога широкая/);
  }finally{
    routed.dom.window.close();
  }
});
