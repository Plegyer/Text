import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';

import {actionAvailable,dispatch} from '../src/core/engine.ts';
import {catalog,started} from './helpers.ts';

const {JSDOM,VirtualConsole}=createRequire(import.meta.url)('jsdom');
const html=readFileSync('dist/index.html','utf8');
const bundle=readFileSync('dist/app.js','utf8');
const data=JSON.parse(readFileSync('dist/content.json','utf8'));

const starters=['lumber.shift','satyr-maid.shift','undead-farm.shift'] as const;
const late=['tavern.shift','hunter.shift','guard.shift','merchant.shift','artist-geisha.shift','assassin.shift','prostitute.shift'] as const;
const careers=[...starters,...late];

async function wait(check:()=>boolean){
  for(let i=0;i<100;i++){if(check())return;await new Promise(resolve=>setTimeout(resolve,5));}
  throw new Error('UI update timed out');
}

test('C1D-75 command and Work UI agree on all ten ordinary careers',async()=>{
  const save=started();
  const errors:string[]=[];
  const vc=new VirtualConsole();vc.on('jsdomError',(e:Error)=>errors.push(e.message));
  const dom=new JSDOM(html,{url:'http://localhost:4173',runScripts:'outside-only',virtualConsole:vc});
  const w=dom.window;
  w.structuredClone=structuredClone;
  w.fetch=async()=>({ok:true,json:async()=>structuredClone(data)});
  w.confirm=()=>true;
  w.localStorage.setItem('portal-life.v1',JSON.stringify(save));
  w.eval(bundle);

  try{
    await wait(()=>!!w.document.querySelector('[data-panel="work"]'));
    w.document.querySelector('[data-panel="work"]').click();
    await wait(()=>!!w.document.querySelector('[data-action="lumber.shift"]'));

    for(const id of careers){
      const action=catalog.definitions.actions.find(item=>item.id===id);
      assert.ok(action,id);
      const available=actionAvailable(action,save,catalog);
      const button=w.document.querySelector('[data-action="'+id+'"]');
      assert.ok(button,id);
      assert.equal(button.disabled,!available,id+' UI parity');
      if(available)assert.doesNotThrow(()=>dispatch(save,{type:'action',id},catalog),id);
      else assert.throws(()=>dispatch(save,{type:'action',id},catalog),/Условия действия не выполнены/,id);
    }

    const visible=careers.filter(id=>!w.document.querySelector('[data-action="'+id+'"]').disabled);
    assert.deepEqual(visible,[...starters]);
    assert.deepEqual(errors,[]);
  }finally{dom.window.close();}
});
