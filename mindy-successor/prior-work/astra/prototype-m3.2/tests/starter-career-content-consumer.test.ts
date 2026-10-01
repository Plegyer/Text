import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';

import {started} from './helpers.ts';

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

function boot(initial=started()){
  const errors:string[]=[];
  const vc=new VirtualConsole();
  vc.on('jsdomError',(e:Error)=>errors.push(e.message));
  const dom=new JSDOM(html,{url:'http://localhost:4173',runScripts:'outside-only',virtualConsole:vc});
  const w=dom.window;
  w.structuredClone=structuredClone;
  w.fetch=async()=>({ok:true,json:async()=>structuredClone(data)});
  w.confirm=()=>true;
  w.localStorage.setItem('portal-life.v1',JSON.stringify(initial));
  w.eval(bundle);
  return {dom,w,errors};
}

const sceneKeys=[
  'action.satyr-maid.shift.scene.spring.default.text',
  'action.satyr-maid.shift.scene.summer.default.text',
  'action.satyr-maid.shift.scene.autumn.default.text',
  'action.satyr-maid.shift.scene.winter.default.text',
  'action.undead-farm.shift.scene.spring.default.text',
  'action.undead-farm.shift.scene.summer.default.text',
  'action.undead-farm.shift.scene.autumn.default.text',
  'action.undead-farm.shift.scene.winter.default.text'
] as const;

test('QA-accepted starter-career scene bundles have complete RU/EN localization',()=>{
  for(const key of sceneKeys){
    assert.ok(localization[key]?.ru?.trim(),key+' ru');
    assert.ok(localization[key]?.en?.trim(),key+' en');
  }
});

test('Satyr Maid multi-scene action result uses the generic scene localization seam',async()=>{
  const s=started();
  s.run.progression.careers['satyr-maid']={
    stage:'floor-rhythm',shifts:0,counters:{completed_shifts:1},choices:{},facts:['first-shift-complete']
  };
  const {dom,w,errors}=boot(s);
  try{
    await wait(()=>!!w.document.querySelector('[data-panel="work"]'));
    w.document.querySelector('[data-panel="work"]').click();
    await wait(()=>!!w.document.querySelector('[data-action="satyr-maid.shift"]'));
    w.document.querySelector('[data-action="satyr-maid.shift"]').click();
    await wait(()=>!!w.document.querySelector('.dialogue p'));
    assert.match(w.document.querySelector('.dialogue p').textContent,/Весной зал снова заполняют путешественники/);
    const before=w.localStorage.getItem('portal-life.v1');

    w.document.querySelector('[data-panel="menu"]').click();
    w.document.querySelector('#language-toggle').click();
    await wait(()=>w.document.documentElement.lang==='en');
    assert.match(w.document.querySelector('.dialogue p').textContent,/In spring, travellers fill the room again/);
    assert.equal(w.localStorage.getItem('portal-life.v1'),before);
    assert.deepEqual(errors,[]);
  }finally{
    dom.window.close();
  }
});

test('Undead Farm multi-scene action result uses the same localization seam',async()=>{
  const s=started();
  s.run.progression.careers['undead-farm']={
    stage:'outcome-ready',shifts:0,counters:{completed_shifts:1},choices:{},
    facts:['first-shift-complete','basic-production-ready','outcome-ready']
  };
  const {dom,w,errors}=boot(s);
  try{
    await wait(()=>!!w.document.querySelector('[data-panel="work"]'));
    w.document.querySelector('[data-panel="work"]').click();
    await wait(()=>!!w.document.querySelector('[data-action="undead-farm.shift"]'));
    w.document.querySelector('[data-action="undead-farm.shift"]').click();
    await wait(()=>!!w.document.querySelector('.dialogue p'));
    assert.match(w.document.querySelector('.dialogue p').textContent,/Весной почва тяжёлая от воды/);
    assert.deepEqual(errors,[]);
  }finally{
    dom.window.close();
  }
});
