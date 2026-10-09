import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';

import {actionAvailable,dispatch} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';
import type {Save,Stat} from '../src/core/schema.ts';

const {JSDOM,VirtualConsole}=createRequire(import.meta.url)('jsdom');
const html=readFileSync('dist/index.html','utf8');
const bundle=readFileSync('dist/app.js','utf8');
const data=JSON.parse(readFileSync('dist/content.json','utf8'));

const lateCareers=[
  {id:'tavern.shift',year:2,stats:{charm:45,sociability:35}},
  {id:'hunter.shift',year:2,stats:{dexterity:25,endurance:20,wits:15}},
  {id:'guard.shift',year:2,stats:{strength:30,endurance:30,manners:20}},
  {id:'merchant.shift',year:2,stats:{wits:20,reason:20,sociability:15}},
  {id:'artist-geisha.shift',year:3,stats:{creativity:35,manners:25,grooming:30}},
  {id:'assassin.shift',year:3,stats:{dexterity:30,wits:25,reason:20}},
  {id:'prostitute.shift',year:3,stats:{sexuality:55,charm:40,sociability:35}}
] as const;

async function wait(check:()=>boolean){
  for(let i=0;i<100;i++){
    if(check())return;
    await new Promise(r=>setTimeout(r,5));
  }
  throw new Error('UI update timed out');
}

async function uiDisabled(save:Save,id:string){
  const errors:string[]=[];
  const vc=new VirtualConsole();
  vc.on('jsdomError',(e:Error)=>errors.push(e.message));
  const dom=new JSDOM(html,{url:'http://localhost:4173/?dev=1',runScripts:'outside-only',virtualConsole:vc});
  const w=dom.window;
  w.structuredClone=structuredClone;
  w.fetch=async()=>({ok:true,json:async()=>structuredClone(data)});
  w.confirm=()=>true;
  w.localStorage.setItem('portal-life.v1',JSON.stringify(save));
  w.eval(bundle);
  try{
    await wait(()=>!!w.document.querySelector('[data-panel="work"]'));
    w.document.querySelector('[data-panel="work"]').click();
    await wait(()=>!!w.document.querySelector(`[data-action="${id}"]`));
    const button=w.document.querySelector(`[data-action="${id}"]`);
    assert.ok(button,id);
    assert.deepEqual(errors,[]);
    return button.disabled as boolean;
  }finally{
    dom.window.close();
  }
}

function withStatGate(entry:typeof lateCareers[number]){
  const s=started();
  for(const [stat,value] of Object.entries(entry.stats))s.run.character.stats[stat as Stat]=value;
  return s;
}

function withYearFallback(entry:typeof lateCareers[number]){
  const s=started();
  s.run.calendar.elapsedDays=entry.year===2?40:80;
  return s;
}

test('Work UI and command dispatch agree before every late-career stat/year gate',async()=>{
  for(const entry of lateCareers){
    const s=started();
    const action=catalog.definitions.actions.find(a=>a.id===entry.id);
    assert.ok(action,entry.id);
    assert.equal(actionAvailable(action,s,catalog),false,entry.id);
    assert.throws(()=>dispatch(s,{type:'action',id:entry.id},catalog),/Условия действия не выполнены/,entry.id);
    assert.equal(await uiDisabled(s,entry.id),true,entry.id);
  }
});

test('Work UI and command dispatch agree at every exact stat gate',async()=>{
  for(const entry of lateCareers){
    const s=withStatGate(entry);
    const action=catalog.definitions.actions.find(a=>a.id===entry.id);
    assert.ok(action,entry.id);
    assert.equal(actionAvailable(action,s,catalog),true,entry.id);
    assert.doesNotThrow(()=>dispatch(s,{type:'action',id:entry.id},catalog),entry.id);
    assert.equal(await uiDisabled(s,entry.id),false,entry.id);
  }
});

test('Work UI and command dispatch agree at Year-2/Year-3 fallback boundaries',async()=>{
  for(const entry of lateCareers){
    const s=withYearFallback(entry);
    const action=catalog.definitions.actions.find(a=>a.id===entry.id);
    assert.ok(action,entry.id);
    assert.equal(actionAvailable(action,s,catalog),true,entry.id);
    assert.doesNotThrow(()=>dispatch(s,{type:'action',id:entry.id},catalog),entry.id);
    assert.equal(await uiDisabled(s,entry.id),false,entry.id);
  }
});
