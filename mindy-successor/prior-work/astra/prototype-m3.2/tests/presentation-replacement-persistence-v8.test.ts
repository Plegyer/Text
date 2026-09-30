import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';

import {started} from './helpers.ts';

const {JSDOM,VirtualConsole}=createRequire(import.meta.url)('jsdom');
const html=readFileSync('dist/index.html','utf8');
const bundle=readFileSync('dist/app.js','utf8');
const data=JSON.parse(readFileSync('dist/content.json','utf8'));
const png='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';

async function wait(check:()=>boolean){
  for(let i=0;i<100;i++){if(check())return;await new Promise(r=>setTimeout(r,5));}
  throw new Error('presentation persistence UI update timed out');
}

test('saved replacement survives render refresh and locale change without touching gameplay Save identity',async()=>{
  const errors:string[]=[];
  const vc=new VirtualConsole();vc.on('jsdomError',(e:Error)=>errors.push(e.message));
  const dom=new JSDOM(html,{url:'http://localhost:4173',runScripts:'outside-only',virtualConsole:vc});
  try{
    const w=dom.window;
    w.structuredClone=structuredClone;
    w.fetch=async()=>({ok:true,json:async()=>structuredClone(data)});
    w.confirm=()=>true;

    const save=started();
    const saveJson=JSON.stringify(save);
    const custom={
      version:1,
      texts:{},
      media:{},
      slots:{
        'location/town/default':{
          static:{kind:'image',src:png,alt:'Persistent replacement town preview.'}
        }
      }
    };
    const customJson=JSON.stringify(custom);

    w.localStorage.setItem('portal-life.v1',saveJson);
    w.localStorage.setItem('portal-life.presentation.v1',customJson);
    w.localStorage.setItem('portal-life.locale','ru');
    w.eval(bundle);

    await wait(()=>!!w.document.querySelector('#home'));
    w.document.querySelector('#home').click();
    await wait(()=>w.document.querySelector('[data-presentation-id="location/town/default"] img')?.getAttribute('src')===png);
    assert.equal(w.document.documentElement.lang,'ru');

    w.document.querySelector('[data-panel="menu"]').click();
    await wait(()=>!!w.document.querySelector('#language-toggle'));
    w.document.querySelector('#language-toggle').click();
    await wait(()=>w.document.documentElement.lang==='en');

    assert.equal(w.document.querySelector('[data-presentation-id="location/town/default"] img')?.getAttribute('src'),png);
    assert.equal(w.localStorage.getItem('portal-life.presentation.v1'),customJson);
    assert.equal(w.localStorage.getItem('portal-life.v1'),saveJson);

    w.document.querySelector('#close').click();
    await wait(()=>!w.document.querySelector('.overlay'));
    assert.equal(w.document.querySelector('[data-presentation-id="location/town/default"] img')?.getAttribute('src'),png);
    assert.equal(w.localStorage.getItem('portal-life.presentation.v1'),customJson);
    assert.equal(w.localStorage.getItem('portal-life.v1'),saveJson);
    assert.deepEqual(errors,[]);
  }finally{dom.window.close();}
});
