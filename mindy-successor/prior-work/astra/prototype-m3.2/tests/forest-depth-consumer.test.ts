import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';

import {forestResultDepthLocalizationKey,forestRouteDepthLocalizationKey} from '../src/ui/forestDepth.ts';
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
  const dom=new JSDOM(html,{url:'http://localhost:4173',runScripts:'outside-only',virtualConsole:vc});
  const w=dom.window;
  w.structuredClone=structuredClone;
  w.fetch=async()=>({ok:true,json:async()=>structuredClone(data)});
  w.confirm=()=>true;
  w.localStorage.setItem('portal-life.v1',saved);
  w.eval(bundle);
  return {dom,w,errors};
}

function pendingForestResult(eventId:string,count:number){
  const s=started();
  s.run.historyState.eventHistory[eventId]={
    count,
    lastDay:s.run.day,
    variants:{default:s.run.day}
  };
  s.run.flow.pendingScene={
    eventId,
    variantId:'default',
    reactionEpochId:'forest-depth-test',
    allowedChoiceIds:['return']
  };
  return s;
}

test('C1D-57 Forest depth selectors stay on existing route/result identities',()=>{
  assert.equal(
    forestRouteDepthLocalizationKey('logging-road','spring'),
    'presentation.activity.forest.depth.route.logging-road.spring.text'
  );
  assert.equal(
    forestRouteDepthLocalizationKey('logging-road','summer'),
    'presentation.activity.forest.depth.route.logging-road.summer.text'
  );
  assert.equal(
    forestRouteDepthLocalizationKey('old-boundary','autumn'),
    'presentation.activity.forest.depth.route.old-boundary.autumn.text'
  );
  assert.equal(
    forestRouteDepthLocalizationKey('old-boundary','winter'),
    'presentation.activity.forest.depth.route.old-boundary.winter.text'
  );
  assert.equal(forestRouteDepthLocalizationKey('logging-road','winter'),null);
  assert.equal(forestRouteDepthLocalizationKey(null,'spring'),null);

  assert.equal(
    forestResultDepthLocalizationKey('forest-result-content-v1.success',1),
    'presentation.activity.forest.depth.result.success.clear-route.text'
  );
  assert.equal(
    forestResultDepthLocalizationKey('forest-result-content-v1.success',2),
    'presentation.activity.forest.depth.result.success.work-notes.text'
  );
  assert.equal(
    forestResultDepthLocalizationKey('forest-result-content-v1.success',3),
    'presentation.activity.forest.depth.result.success.clear-route.text'
  );
  assert.equal(forestResultDepthLocalizationKey('other-event',1),null);
});

test('C1D-57 Forest terminal result depth rotates by existing event history only',async()=>{
  const firstSave=JSON.stringify(pendingForestResult('forest-result-content-v1.success',1));
  const first=boot(firstSave);
  try{
    await wait(()=>!!first.w.document.querySelector('.dialogue p')||first.errors.length>0);
    assert.deepEqual(first.errors,[]);
    assert.match(first.w.document.querySelector('.dialogue p').textContent,/К концу вылазки проверенные приметы складываются в последовательный маршрут/);

    first.w.document.querySelector('[data-panel="menu"]').click();
    first.w.document.querySelector('#language-toggle').click();
    await wait(()=>first.w.document.documentElement.lang==='en');
    assert.match(first.w.document.querySelector('.dialogue p').textContent,/By the end of the expedition, the checked signs form a coherent route/);
    assert.equal(first.w.localStorage.getItem('portal-life.v1'),firstSave);
  }finally{
    first.dom.window.close();
  }

  const second=boot(JSON.stringify(pendingForestResult('forest-result-content-v1.success',2)));
  try{
    await wait(()=>!!second.w.document.querySelector('.dialogue p')||second.errors.length>0);
    assert.deepEqual(second.errors,[]);
    assert.match(second.w.document.querySelector('.dialogue p').textContent,/Записи с маршрута больше не выглядят набором случайных пометок/);
  }finally{
    second.dom.window.close();
  }
});
