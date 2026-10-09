import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {
  playerMaySeeFate,playerMaySeeCareer,playerMaySeeExactConditions,
  playerMaySeeSecretGate,playerMaySeeDebugTools,playerMaySeeStrongMetaSelection,
  lodgingPlayerHint
} from '../src/ui/playerDisclosure.ts';
import {started} from './helpers.ts';

const {JSDOM,VirtualConsole}=createRequire(import.meta.url)('jsdom');
const html=readFileSync('dist/index.html','utf8');
const bundle=readFileSync('dist/app.js','utf8');
const data=JSON.parse(readFileSync('dist/content.json','utf8'));
async function wait(check:()=>boolean){
 for(let i=0;i<120;i++){if(check())return;await new Promise(resolve=>setTimeout(resolve,5));}
 throw new Error('Player UI render timed out');
}
function boot(dev=false,saved?:string){
 const errors:string[]=[];const console=new VirtualConsole();
 console.on('jsdomError',(err:Error)=>errors.push(err.message));
 const dom=new JSDOM(html,{url:dev?'http://localhost:4173/?dev=1':'http://localhost:4173/',runScripts:'outside-only',virtualConsole:console});
 const w=dom.window;w.structuredClone=structuredClone;
 w.fetch=async()=>({ok:true,json:async()=>structuredClone(data)});
 w.confirm=()=>true;w.localStorage.setItem('portal-life.locale','ru');
 if(saved)w.localStorage.setItem('portal-life.v1',saved);
 w.eval(bundle);return {w,dom,errors};
}
test('disclosure policy: unknown fates, hidden careers, palace and debug are not public',()=>{
 assert.equal(playerMaySeeFate('locked'),false);
 assert.equal(playerMaySeeFate('eligible'),true);
 assert.equal(playerMaySeeFate('completed'),true);
 assert.equal(playerMaySeeFate('committed'),true);
 assert.equal(playerMaySeeCareer(true,false),false);
 assert.equal(playerMaySeeCareer(true,true),true);
 assert.equal(playerMaySeeCareer(false,false),true);
 assert.equal(playerMaySeeExactConditions(),false);
 assert.equal(playerMaySeeSecretGate(),false);
 assert.equal(playerMaySeeDebugTools(),false);
 assert.equal(playerMaySeeStrongMetaSelection(0),false);
 assert.equal(playerMaySeeFate('locked',true),true);
 assert.equal(playerMaySeeCareer(true,false,true),true);
 assert.equal(playerMaySeeExactConditions(true),true);
 assert.equal(playerMaySeeSecretGate(true),true);
 assert.equal(playerMaySeeDebugTools(true),true);
 assert.equal(playerMaySeeStrongMetaSelection(0,true),true);
});
test('lodging text describes privacy difference without changing price or mechanics',()=>{
 assert.match(lodgingPlayerHint('lodging.normal','ru'),/отдельная|Отдельная/);
 assert.match(lodgingPlayerHint('lodging.cheap','ru'),/без приватных встреч/);
 assert.match(lodgingPlayerHint('lodging.normal','en'),/Private room/);
 assert.equal(lodgingPlayerHint('lodging.street','ru'),'');
});
test('actual rendered NEW LIFE never advertises secret Palace or empty specialized rewards',async()=>{
 const {w,dom,errors}=boot();
 try{
  await wait(()=>!!w.document.querySelector('#create'));
  assert.equal(w.document.querySelector('.hard-work-palace-help'),null);
  assert.equal(w.document.querySelector('.strong-meta-new-start'),null);
  assert.doesNotMatch(w.document.body.textContent,/Для Дворца|Palace.*10\/10|Keystone|Specialist-наград/);
  assert.deepEqual(errors,[]);
 }finally{dom.window.close();}
});
test('actual player menu and fates do not expose the editor, inspector, locked ending IDs or exact conditions',async()=>{
 const {w,dom,errors}=boot(false,JSON.stringify(started()));
 try{
  await wait(()=>!!w.document.querySelector('[data-panel="menu"]'));
  w.document.querySelector('[data-panel="menu"]').click();
  assert.equal(w.document.querySelector('[data-panel="editor"]'),null);
  assert.equal(w.document.querySelector('[data-panel="catalog"]'),null);
  w.document.querySelector('#close').click();
  w.document.querySelector('[data-panel="legacy"]').click();
  assert.doesNotMatch(w.document.querySelector('.panel').textContent,/completed_shifts|Факт мира activity\.|Для Дворца|Условия:.*>=/);
  assert.equal(w.document.querySelector('.panel [data-ending-state="locked"]'),null);
  w.document.querySelector('#close').click();
  w.document.querySelector('[data-panel="work"]').click();
  assert.ok(w.document.querySelector('[data-action="lumber.shift"]'));
  for(const id of ['tavern.shift','hunter.shift','guard.shift','merchant.shift','artist-geisha.shift','assassin.shift','prostitute.shift']){
   assert.equal(w.document.querySelector('[data-action="'+id+'"]'),null,id+' should be discovered through play');
  }
  assert.doesNotMatch(w.document.querySelector('.panel').textContent,/>=|Карьера .*смен/);
  w.document.querySelector('#close').click();
  w.document.querySelector('[data-panel="sleep"]').click();
  assert.match(w.document.querySelector('[data-end-day]').textContent,/Закончить день/);
  assert.deepEqual(errors,[]);
 }finally{dom.window.close();}
});
test('developer mode still permits exact QA inspection without changing game save',async()=>{
 const saved=JSON.stringify(started());const {w,dom,errors}=boot(true,saved);
 try{
  await wait(()=>!!w.document.querySelector('[data-panel="menu"]'));
  w.document.querySelector('[data-panel="menu"]').click();
  assert.ok(w.document.querySelector('[data-panel="editor"]'));
  assert.ok(w.document.querySelector('[data-panel="catalog"]'));
  w.document.querySelector('#close').click();
  w.document.querySelector('[data-panel="work"]').click();
  assert.ok(w.document.querySelector('[data-action="tavern.shift"]'));
  assert.equal(w.localStorage.getItem('portal-life.v1'),saved);
  assert.deepEqual(errors,[]);
 }finally{dom.window.close();}
});
