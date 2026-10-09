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

function boot(saved:string){
  const errors:string[]=[];
  const vc=new VirtualConsole();
  vc.on('jsdomError',(e:Error)=>errors.push(e.message));
  const dom=new JSDOM(html,{url:'http://localhost:4173/?dev=1',runScripts:'outside-only',virtualConsole:vc});
  const w=dom.window;
  w.structuredClone=structuredClone;
  w.fetch=async()=>({ok:true,json:async()=>structuredClone(data)});
  w.confirm=()=>true;
  w.localStorage.setItem('portal-life.v1',saved);
  w.eval(bundle);
  return {dom,w,errors};
}

test('renderer: Lumber career stage and ending readiness are visible and locale-only',async()=>{
  const s=started();
  s.run.progression.careers.lumber={
    stage:'accepted-hand',
    shifts:0,
    counters:{completed_shifts:50},
    choices:{},
    facts:['foreman-noticed-player']
  };
  s.run.endings.eligible=['ending.lumber.hard-work'];

  const {w,dom,errors}=boot(JSON.stringify(s));
  try{
    await wait(()=>!!w.document.querySelector('[data-panel="stats"]'));
    const before=w.localStorage.getItem('portal-life.v1');

    w.document.querySelector('[data-panel="stats"]').click();
    await wait(()=>!!w.document.querySelector('.career-progress'));
    let text=w.document.querySelector('.career-progress').textContent;
    assert.match(text,/Карьера лесоруба/);
    assert.match(text,/Принятая работница/);
    assert.match(text,/Лесоруб: тяжкий труд: готово/);
    assert.match(text,/Бригадир лесной артели: не готово/);
    assert.match(text,/Лесная развязка артели: не готово/);

    w.document.querySelector('#close').click();
    w.document.querySelector('[data-panel="menu"]').click();
    w.document.querySelector('#language-toggle').click();
    await wait(()=>w.document.documentElement.lang==='en');
    assert.equal(w.localStorage.getItem('portal-life.v1'),before);

    w.document.querySelector('#close').click();
    w.document.querySelector('[data-panel="stats"]').click();
    await wait(()=>!!w.document.querySelector('.career-progress'));
    text=w.document.querySelector('.career-progress').textContent;
    assert.match(text,/Lumber career/);
    assert.match(text,/Accepted Hand/);
    assert.match(text,/Lumber: Hard Work: ready/);
    assert.match(text,/Lumber Forewoman: not ready/);
    assert.match(text,/Lumber Forest Resolution: not ready/);
    assert.equal(w.localStorage.getItem('portal-life.v1'),before);
    assert.deepEqual(errors,[]);
  }finally{
    dom.window.close();
  }
});
