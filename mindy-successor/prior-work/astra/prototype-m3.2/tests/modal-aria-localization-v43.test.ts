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
    await new Promise(resolve=>setTimeout(resolve,5));
  }
  throw new Error('UI update timed out');
}

function boot(){
  const errors:string[]=[];
  const virtualConsole=new VirtualConsole();
  virtualConsole.on('jsdomError',(e:Error)=>errors.push(e.message));
  const dom=new JSDOM(html,{url:'http://localhost:4173',runScripts:'outside-only',virtualConsole});
  const w=dom.window;
  w.structuredClone=structuredClone;
  w.fetch=async()=>({ok:true,json:async()=>structuredClone(data)});
  w.confirm=()=>true;
  w.localStorage.setItem('portal-life.v1',JSON.stringify(started()));
  w.eval(bundle);
  return {dom,w,errors};
}

async function openPanel(w:any,id:string){
  const trigger=w.document.querySelector(`[data-panel="${id}"]`);
  assert.ok(trigger,`missing ${id} trigger`);
  trigger.click();
  await wait(()=>!!w.document.querySelector('[role="dialog"]'));
  const dialog=w.document.querySelector('[role="dialog"]');
  assert.ok(dialog);
  return dialog;
}

async function closePanel(w:any){
  const close=w.document.querySelector('#close');
  assert.ok(close);
  close.click();
  await wait(()=>!w.document.querySelector('[role="dialog"]'));
}

test('v43 generic modal accessible names are localized and never expose raw panel ids',async()=>{
  const {dom,w,errors}=boot();
  try{
    await wait(()=>!!w.document.querySelector('[data-panel="work"]'));
    const ordinaryPanels=['work','school','explore','sleep','stats','journal','bag','legacy','menu'];
    const ruLabels:Record<string,string>={};
    for(const id of ordinaryPanels){
      const dialog=await openPanel(w,id);
      const label=dialog.getAttribute('aria-label')??'';
      assert.ok(label,id+' needs an accessible name');
      assert.notEqual(label,id,id+' leaked raw panel id');
      ruLabels[id]=label;
      await closePanel(w);
    }
    let menu=await openPanel(w,'menu');
    const editorTrigger=menu.querySelector('[data-panel="editor"]');
    assert.ok(editorTrigger);editorTrigger.click();
    await wait(()=>w.document.querySelector('[role="dialog"]')?.getAttribute('aria-label')!==ruLabels.menu);
    assert.notEqual(w.document.querySelector('[role="dialog"]')?.getAttribute('aria-label'),'editor');
    await closePanel(w);
    menu=await openPanel(w,'menu');
    const catalogTrigger=menu.querySelector('[data-panel="catalog"]');
    assert.ok(catalogTrigger);catalogTrigger.click();
    await wait(()=>w.document.querySelector('[role="dialog"]')?.getAttribute('aria-label')!==ruLabels.menu);
    assert.equal(w.document.querySelector('[role="dialog"]')?.getAttribute('aria-label'),'Инспектор событий');
    await closePanel(w);
    menu=await openPanel(w,'menu');
    const languageToggle=menu.querySelector('#language-toggle');
    assert.ok(languageToggle);languageToggle.click();
    await wait(()=>w.document.documentElement.lang==='en');
    await closePanel(w);
    for(const id of ordinaryPanels){
      const dialog=await openPanel(w,id);
      const label=dialog.getAttribute('aria-label')??'';
      assert.ok(label,id+' needs an English accessible name');
      assert.notEqual(label,id,id+' leaked raw panel id in English');
      assert.notEqual(label,ruLabels[id],id+' did not localize its accessible name');
      await closePanel(w);
    }
    menu=await openPanel(w,'menu');
    const catalogTriggerEn=menu.querySelector('[data-panel="catalog"]');
    assert.ok(catalogTriggerEn);catalogTriggerEn.click();
    await wait(()=>w.document.querySelector('[role="dialog"]')?.getAttribute('aria-label')==='Event inspector');
    assert.equal(w.document.querySelector('[role="dialog"]')?.getAttribute('aria-label'),'Event inspector');
    assert.deepEqual(errors,[]);
  }finally{dom.window.close();}
});
