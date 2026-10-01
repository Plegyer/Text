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
    reactionEpochId:'forest-depth-v2-test',
    allowedChoiceIds:['return']
  };
  return s;
}

test('C1D-57 Forest v2 route selector uses only current route season and existing step state',()=>{
  assert.equal(
    forestRouteDepthLocalizationKey('logging-road','spring',1),
    'presentation.activity.forest.logging-road-v2.spring.wheelwash.text'
  );
  assert.equal(
    forestRouteDepthLocalizationKey('logging-road','spring',2),
    'presentation.activity.forest.logging-road-v2.spring.fresh-cuts.text'
  );
  assert.equal(
    forestRouteDepthLocalizationKey('logging-road','spring',3),
    'presentation.activity.forest.logging-road-v2.spring.wheelwash.text'
  );
  assert.equal(
    forestRouteDepthLocalizationKey('old-boundary','winter',1),
    'presentation.activity.forest.old-boundary-v2.winter.drift-gap.text'
  );
  assert.equal(
    forestRouteDepthLocalizationKey('old-boundary','winter',2),
    'presentation.activity.forest.old-boundary-v2.winter.bare-trunks.text'
  );
  assert.equal(forestRouteDepthLocalizationKey(null,'spring',1),null);
});

test('C1D-57 Forest v2 result selector rotates by existing event history only',()=>{
  assert.equal(
    forestResultDepthLocalizationKey('forest-result-content-v1.success',1),
    'presentation.activity.forest.success-aftermath-v2.evidence-order.text'
  );
  assert.equal(
    forestResultDepthLocalizationKey('forest-result-content-v1.success',2),
    'presentation.activity.forest.success-aftermath-v2.confirmed-thread.text'
  );
  assert.equal(
    forestResultDepthLocalizationKey('forest-result-content-v1.escape',1),
    'presentation.activity.forest.escape-failure-v2.escape.notes-held-back.text'
  );
  assert.equal(
    forestResultDepthLocalizationKey('forest-result-content-v1.failure',2),
    'presentation.activity.forest.escape-failure-v2.failure.no-state.text'
  );
  assert.equal(forestResultDepthLocalizationKey('other-event',1),null);
});

test('C1D-57 Forest terminal result depth is bilingual and presentation-only',async()=>{
  const saved=JSON.stringify(pendingForestResult('forest-result-content-v1.success',1));
  const first=boot(saved);
  try{
    await wait(()=>!!first.w.document.querySelector('.dialogue p')||first.errors.length>0);
    assert.deepEqual(first.errors,[]);
    assert.match(first.w.document.querySelector('.dialogue p').textContent,/Найденные признаки выглядят убедительно именно потому/);

    first.w.document.querySelector('[data-panel="menu"]').click();
    first.w.document.querySelector('#language-toggle').click();
    await wait(()=>first.w.document.documentElement.lang==='en');
    assert.match(first.w.document.querySelector('.dialogue p').textContent,/The observed signs are convincing because they repeat in the right order/);
    assert.equal(first.w.localStorage.getItem('portal-life.v1'),saved);
  }finally{
    first.dom.window.close();
  }
});
