import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';

import {dispatch} from '../src/core/engine.ts';
import {forestRouteDepthLocalizationKey} from '../src/ui/forestDepth.ts';
import {catalog,started} from './helpers.ts';

const logging=JSON.parse(readFileSync('content/forest-logging-road-seasonal-depth-v1.fixture.json','utf8'));
const boundary=JSON.parse(readFileSync('content/forest-old-boundary-seasonal-depth-v1.fixture.json','utf8'));
const success=JSON.parse(readFileSync('content/forest-success-aftermath-depth-v1.fixture.json','utf8'));
const escapeFailure=JSON.parse(readFileSync('content/forest-escape-failure-depth-v1.fixture.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
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
  const dom=new JSDOM(html,{url:'http://localhost:4173',runScripts:'outside-only',virtualConsole:vc});
  const w=dom.window;
  w.structuredClone=structuredClone;
  w.fetch=async()=>({ok:true,json:async()=>structuredClone(data)});
  w.confirm=()=>true;
  w.localStorage.setItem('portal-life.v1',saved);
  w.eval(bundle);
  return {dom,w,errors};
}

test('C1D-57 Forest selector maps only current route ID plus season to approved route-depth keys',()=>{
  for(const fixture of [logging,boundary]){
    for(const variant of fixture.variants){
      assert.equal(
        forestRouteDepthLocalizationKey(fixture.routeId,variant.season),
        variant.localizationKey,
        fixture.routeId+' / '+variant.season
      );
      assert.deepEqual(localization[variant.localizationKey],fixture.strings[variant.localizationKey]);
    }
  }
  assert.equal(forestRouteDepthLocalizationKey(null,'spring'),null);
  assert.equal(forestRouteDepthLocalizationKey('not-a-route','spring'),null);
});

test('C1D-57 selector-less Forest result variants remain preparation-only',()=>{
  for(const fixture of [success,escapeFailure]){
    for(const key of Object.keys(fixture.strings)){
      assert.equal(key in localization,false,'result-depth key must stay fixture-local without an approved selector: '+key);
    }
  }
});

test('C1D-57 active Logging Road displays spring depth in RU and EN without mutating Save',async()=>{
  let s=started();
  s=dispatch(s,{type:'enterActivity',id:'lumber.forest'},catalog);
  s=dispatch(s,{type:'activityAction',id:'forest.route.logging-road'},catalog);
  assert.equal(s.run.flow.activity?.internalState.routeId,'logging-road');
  assert.equal(s.run.calendar.elapsedDays,0);

  const saved=JSON.stringify(s);
  const {dom,w,errors}=boot(saved);
  try{
    await wait(()=>!!w.document.querySelector('.dialogue p')||errors.length>0);
    assert.deepEqual(errors,[]);
    assert.match(w.document.querySelector('.dialogue').textContent,/Весной лесовозная дорога держит направление лучше троп/);
    const before=w.localStorage.getItem('portal-life.v1');

    w.document.querySelector('[data-panel="menu"]').click();
    w.document.querySelector('#language-toggle').click();
    await wait(()=>w.document.documentElement.lang==='en');
    assert.match(w.document.querySelector('.dialogue').textContent,/In spring, the logging road holds its direction better than the trails/);
    assert.equal(w.localStorage.getItem('portal-life.v1'),before);
  }finally{
    dom.window.close();
  }
});
