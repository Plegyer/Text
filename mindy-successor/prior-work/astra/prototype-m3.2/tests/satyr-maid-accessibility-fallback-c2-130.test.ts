import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {createRequire} from 'node:module';

import {applyPresentation,resolvePresentation} from '../src/core/presentation.ts';
import {catalog,started} from './helpers.ts';

const {JSDOM,VirtualConsole}=createRequire(import.meta.url)('jsdom');
const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const html=readFileSync('dist/index.html','utf8');
const bundle=readFileSync('dist/app.js','utf8');
const data=JSON.parse(readFileSync('dist/content.json','utf8'));
const appSource=readFileSync('src/ui/app.ts','utf8');
const css=readFileSync('src/ui/style.css','utf8');

const satyrSlots=Object.entries<any>(presentation.slots??{}).filter(([id])=>id.includes('satyr-maid'));

async function wait(check:()=>boolean){
 for(let i=0;i<100;i++){if(check())return;await new Promise(r=>setTimeout(r,5));}
 throw new Error('C2-130 UI update timed out');
}
async function boot(){
 const errors:string[]=[];
 const vc=new VirtualConsole();vc.on('jsdomError',(e:Error)=>errors.push(e.message));
 const dom=new JSDOM(html,{url:'http://localhost:4173',runScripts:'outside-only',virtualConsole:vc});
 const w=dom.window;
 w.structuredClone=structuredClone;
 w.fetch=async()=>({ok:true,json:async()=>structuredClone(data)});
 w.confirm=()=>true;
 w.localStorage.setItem('portal-life.v1',JSON.stringify(started()));
 w.eval(bundle);
 await wait(()=>!!w.document.querySelector('.game-shell'));
 return {dom,w,errors};
}

test('C2-130 every Satyr production presentation override retains a project-owned static fallback',()=>{
 assert.ok(satyrSlots.length>=30,'expected expanded Satyr presentation coverage');
 for(const [id,slot] of satyrSlots){
  assert.ok(slot.static,id+' static');
  assert.ok(existsSync(slot.static.src),id+' '+slot.static.src);
 }
});

test('C2-130 animations-off resolves every Satyr presentation override to static media',()=>{
 const checked=applyPresentation(catalog,presentation);
 for(const [id,slot] of satyrSlots){
  const off=resolvePresentation(checked,presentation,id,{animationsEnabled:false,occurrenceKey:'c2-130-off'});
  assert.equal(off.textOnly,false,id);
  assert.equal(off.selected?.source,'override-static',id);
  assert.equal(off.selected?.src,slot.static.src,id);
 }
});

test('C2-130 missing GIF candidates leave static candidates reachable for every pooled Satyr slot',()=>{
 const broken=structuredClone(presentation);
 for(const [id,slot] of Object.entries<any>(broken.slots??{})){
  if(!id.includes('satyr-maid')||!slot.pool)continue;
  slot.pool.candidates=slot.pool.candidates.map((candidate:any,index:number)=>({
   ...candidate,
   src:`assets/presentation/missing-c2-130-${index}.gif`
  }));
 }
 const checked=applyPresentation(catalog,broken);
 for(const [id,slot] of Object.entries<any>(broken.slots??{})){
  if(!id.includes('satyr-maid')||!slot.pool)continue;
  const resolved=resolvePresentation(checked,broken,id,{animationsEnabled:true,occurrenceKey:'c2-130-missing'});
  const fallbackIndex=resolved.candidates.findIndex(candidate=>candidate.source==='override-static');
  assert.equal(fallbackIndex,slot.pool.candidates.length,id+' fallback position');
  assert.equal(resolved.candidates[fallbackIndex]?.src,slot.static.src,id+' fallback source');
  assert.ok(existsSync(slot.static.src),id+' fallback exists');
 }
 assert.match(appSource,/node\.onerror=\(\)=>\{mediaIndex\+\+;render\(\);\}/);
});

test('C2-130 Satyr Work stage can be reached and focused with keyboard semantics',async()=>{
 const {dom,w,errors}=await boot();
 try{
  w.document.querySelector('[data-panel="work"]')?.click();
  await wait(()=>!!w.document.querySelector('[data-satyr-maid-stage]'));
  const stage=w.document.querySelector('.career-stage');
  assert.ok(stage);
  assert.equal(stage?.getAttribute('tabindex'),'0');
  stage?.focus();
  assert.equal(w.document.activeElement,stage);
  assert.ok(stage?.getAttribute('aria-label')?.trim());
  assert.deepEqual(errors,[]);
 }finally{dom.window.close();}
});

test('C2-130 relationship Night and ending focus affordances are explicit',()=>{
 for(const token of [
  'tabindex="0" role="region"',
  'data-satyr-night-option=',
  'data-satyr-choice-state=',
  'class="ending-identity" tabindex="0"',
  'class="ending" data-ending-id='
 ]) assert.ok(appSource.includes(token),token);
 assert.match(css,/\.dialogue\[tabindex\]:focus-visible/);
 assert.match(css,/\.career-stage\[tabindex\]:focus-visible/);
 assert.match(css,/\.ending-identity\[tabindex\]:focus-visible/);
});
