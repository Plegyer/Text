import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';

import {catalog,started} from './helpers.ts';
import {dispatch} from '../src/core/engine.ts';

const {JSDOM,VirtualConsole}=createRequire(import.meta.url)('jsdom');
const html=readFileSync('dist/index.html','utf8');
const bundle=readFileSync('dist/app.js','utf8');
const data=JSON.parse(readFileSync('dist/content.json','utf8'));

async function wait(check:()=>boolean){
  for(let i=0;i<100;i++){if(check())return;await new Promise(r=>setTimeout(r,5));}
  throw new Error('UI update timed out');
}
function boot(saved:string){
  const errors:string[]=[];const vc=new VirtualConsole();
  vc.on('jsdomError',(e:Error)=>errors.push(e.message));
  const dom=new JSDOM(html,{url:'http://localhost:4173',runScripts:'outside-only',virtualConsole:vc});
  const w=dom.window;w.structuredClone=structuredClone;
  w.fetch=async()=>({ok:true,json:async()=>structuredClone(data)});
  w.confirm=()=>true;w.localStorage.setItem('portal-life.v1',saved);w.eval(bundle);
  return {dom,w,errors};
}

test('v13 Forest checkpoint narrative is consumed by the live Activity dialogue in RU/EN',async()=>{
  let s=started();
  s.run.calendar.elapsedDays=10;
  s.run.resources.inventory.reinforced_axe=1;
  s.run.character.stats.reason=4;
  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},catalog);
  s=dispatch(s,{type:'activityAction',id:'forest.route.logging-road'},catalog);
  s=dispatch(s,{type:'activityAction',id:'forest.challenge.logging-summer-deadfall'},catalog);
  const app=boot(JSON.stringify(s));
  try{
    await wait(()=>!!app.w.document.querySelector('.dialogue p')||app.errors.length>0);
    assert.deepEqual(app.errors,[]);
    assert.match(app.w.document.querySelector('.dialogue p').textContent,/усиленн|топор/i);
    app.w.document.querySelector('[data-panel="menu"]').click();
    app.w.document.querySelector('#language-toggle').click();
    await wait(()=>app.w.document.documentElement.lang==='en');
    assert.match(app.w.document.querySelector('.dialogue p').textContent,/reinforced axe/i);
  }finally{app.dom.window.close();}
});
