import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {started} from './helpers.ts';

const {JSDOM,VirtualConsole}=createRequire(import.meta.url)('jsdom');
const html=readFileSync('dist/index.html','utf8');
const bundle=readFileSync('dist/app.js','utf8');
const data=JSON.parse(readFileSync('dist/content.json','utf8'));

const gif='data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
const png='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';

async function wait(check:()=>boolean){
  for(let i=0;i<100;i++){if(check())return;await new Promise(resolve=>setTimeout(resolve,5));}
  throw new Error('presentation UI update timed out');
}

function sceneSave(){
  const save=started();
  save.run.flow.lastAction={
    id:'lumber',
    title:'Лесоруб',
    text:'Весенняя смена',
    media:['stage.lumber.spring'],
    deltas:{}
  };
  return save;
}

function boot(){
  const errors:string[]=[];
  const vc=new VirtualConsole();vc.on('jsdomError',(e:Error)=>errors.push(e.message));
  const dom=new JSDOM(html,{url:'http://localhost:4173',runScripts:'outside-only',virtualConsole:vc});
  const w=dom.window;
  w.structuredClone=structuredClone;
  w.fetch=async()=>({ok:true,json:async()=>structuredClone(data)});
  w.confirm=()=>true;
  w.localStorage.setItem('portal-life.v1',JSON.stringify(sceneSave()));
  w.localStorage.setItem('portal-life.presentation.v1',JSON.stringify({
    version:1,
    texts:{},
    media:{},
    slots:{
      'job/lumber/shift/spring/default':{
        primary:{kind:'gif',src:gif,alt:'Лесоруб за работой'},
        static:{kind:'image',src:png,alt:'Лесоруб за работой без анимации'}
      }
    }
  }));
  w.eval(bundle);
  return {dom,w,errors};
}

test('central stage renders GIF by presentationId and animation-off swaps to static fallback',async()=>{
  const {dom,w,errors}=boot();
  try{
    await wait(()=>!!w.document.querySelector('[data-presentation-id="job/lumber/shift/spring/default"] img'));
    const stage=w.document.querySelector('[data-presentation-id="job/lumber/shift/spring/default"]');
    assert.equal(stage.querySelector('img').getAttribute('src'),gif);
    assert.equal(w.document.querySelectorAll('.media-window').length,1);

    w.document.querySelector('[data-panel="menu"]').click();
    w.document.querySelector('#animation-toggle').click();
    await wait(()=>w.document.querySelector('[data-presentation-id="job/lumber/shift/spring/default"] img')?.getAttribute('src')===png);
    assert.equal(w.document.querySelector('[data-presentation-id="job/lumber/shift/spring/default"] img').getAttribute('src'),png);
    assert.deepEqual(errors,[]);
  }finally{dom.window.close();}
});
