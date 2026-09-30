import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {createRequire} from 'node:module';

import {applyPresentation,presentationSchema,resolvePresentation} from '../src/core/presentation.ts';
import {catalog,started} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const manifest=JSON.parse(readFileSync('content/presentation-drafts/presentation-hardening-v8-manifest-v1.json','utf8'));
const selected=manifest.semanticSlots.filter((entry:any)=>entry.reachability==='active-current-main');

test('queue-v8 active semantic surfaces remain complete with animations disabled',()=>{
  presentationSchema.parse(presentation);
  assert.equal(selected.length,47);
  const checked=applyPresentation(catalog,presentation);
  for(const entry of selected){
    assert.ok(existsSync(entry.sourceAsset),entry.sourceAsset);
    const resolved=resolvePresentation(checked,presentation,entry.presentationId,{
      animationsEnabled:false,
      occurrenceKey:'queue-v8-animation-off'
    });
    assert.equal(resolved.textOnly,false,entry.presentationId);
    assert.equal(resolved.selected?.kind,'image',entry.presentationId);
    assert.equal(resolved.selected?.src,entry.sourceAsset,entry.presentationId);
  }
});

const {JSDOM,VirtualConsole}=createRequire(import.meta.url)('jsdom');
const html=readFileSync('dist/index.html','utf8');
const bundle=readFileSync('dist/app.js','utf8');
const data=JSON.parse(readFileSync('dist/content.json','utf8'));

async function wait(check:()=>boolean){
  for(let i=0;i<100;i++){if(check())return;await new Promise(r=>setTimeout(r,5));}
  throw new Error('UI update timed out');
}

test('Work control coverage and availability remain intact with animation disabled',async()=>{
  const errors:string[]=[];
  const vc=new VirtualConsole();vc.on('jsdomError',(e:Error)=>errors.push(e.message));
  const dom=new JSDOM(html,{url:'http://localhost:4173',runScripts:'outside-only',virtualConsole:vc});
  try{
    const w=dom.window;
    w.structuredClone=structuredClone;
    w.fetch=async()=>({ok:true,json:async()=>structuredClone(data)});
    w.confirm=()=>true;
    w.localStorage.setItem('portal-life.v1',JSON.stringify(started()));
    w.localStorage.setItem('portal-life.presentation.animations','off');
    w.eval(bundle);
    await wait(()=>!!w.document.querySelector('[data-panel="work"]'));
    w.document.querySelector('[data-panel="work"]').click();
    await wait(()=>w.document.querySelectorAll('[data-action$=".shift"]').length>=10);

    const work=manifest.workControls;
    assert.equal(work.length,10);
    for(const entry of work){
      const button=w.document.querySelector(`[data-action="${entry.actionId}"]`);
      assert.ok(button,entry.actionId);
      assert.equal(button.disabled,entry.state==='locked',entry.actionId);
    }
    assert.deepEqual(errors,[]);
  }finally{dom.window.close();}
});
