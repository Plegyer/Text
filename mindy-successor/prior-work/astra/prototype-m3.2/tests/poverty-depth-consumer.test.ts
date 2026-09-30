import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import {started} from './helpers.ts';
import {povertyDepthLookupEntries,povertyPendingLocalizationKey} from '../src/ui/povertyDepth.ts';

const {JSDOM,VirtualConsole}=createRequire(import.meta.url)('jsdom');
const html=readFileSync('dist/index.html','utf8');
const bundle=readFileSync('dist/app.js','utf8');
const data=JSON.parse(readFileSync('dist/content.json','utf8'));
const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const smallJob=JSON.parse(readFileSync('content/ordinary-poverty-small-job-depth-v1.fixture.json','utf8'));

async function wait(check:()=>boolean){
  for(let i=0;i<100;i++){
    if(check())return;
    await new Promise(r=>setTimeout(r,5));
  }
  throw new Error('UI update timed out');
}

function pendingSave(count:number){
  const s=started();
  const eventId='poverty-street-production.helpful-summer';
  s.run.historyState.eventHistory[eventId]={
    count,
    lastDay:s.run.day,
    variants:{default:s.run.day}
  };
  s.run.flow.pendingScene={
    eventId,
    variantId:'default',
    reactionEpochId:'poverty-depth-consumer',
    allowedChoiceIds:['take-errand','keep-resting']
  };
  return s;
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

test('poverty depth lookup preserves the approved deterministic occurrence contract',()=>{
  assert.equal(povertyDepthLookupEntries.length,20);
  assert.equal(
    povertyPendingLocalizationKey('poverty-street-production.helpful-summer','default',1),
    'presentation.poverty.depth.poverty-street-production-helpful-summer.default.a.text'
  );
  assert.equal(
    povertyPendingLocalizationKey('poverty-street-production.helpful-summer','default',2),
    'presentation.poverty.depth.poverty-street-production-helpful-summer.default.b.text'
  );
  assert.equal(
    povertyPendingLocalizationKey('poverty-street-production.helpful-summer','default',3),
    'presentation.poverty.depth.poverty-street-production-helpful-summer.default.f.text'
  );
  assert.equal(
    povertyPendingLocalizationKey('poverty-street-production.helpful-summer','default',4),
    'presentation.poverty.depth.poverty-street-production-helpful-summer.default.g.text'
  );
  assert.equal(
    povertyPendingLocalizationKey('poverty-street-production.helpful-summer','default',5),
    'presentation.poverty.depth.poverty-street-production-helpful-summer.default.a.text'
  );
  assert.equal(
    povertyPendingLocalizationKey('poverty-street-production-v2.helpful-summer-shade','late-shade',2),
    'presentation.poverty.depth.poverty-street-production-v2-helpful-summer-shade.late-shade.f.text'
  );
  assert.equal(
    povertyPendingLocalizationKey('poverty-street-production-v2.helpful-summer-shade','late-shade',3),
    'presentation.poverty.depth.poverty-street-production-v2-helpful-summer-shade.late-shade.g.text'
  );
  assert.equal(
    povertyPendingLocalizationKey('poverty-street-production.neutral-autumn','default',1),
    'presentation.poverty.recovery-depth-v5.street.autumn-no-milestone.text'
  );
  assert.equal(
    povertyPendingLocalizationKey('poverty-pressure-production.cold-rain','default',4),
    'presentation.poverty.housing-depth-v5.street.spring.cold-rain.text'
  );
  assert.equal(
    povertyPendingLocalizationKey('poverty-cheap-production-v2.shared-room-seasons','spring-window',3),
    'presentation.poverty.housing-depth-v5.cheap.spring.window.text'
  );
  assert.equal(
    povertyPendingLocalizationKey('poverty-cheap-production-v2.shared-room-seasons','spring-window',4),
    'presentation.poverty.recovery-depth-v5.shared-room.spring-breathing-space.text'
  );
  assert.equal(povertyPendingLocalizationKey('not-poverty','default',1),null);

  for(const entry of povertyDepthLookupEntries){
    for(const key of entry.orderedDepthLocalizationKeys){
      assert.ok(localization[key]?.ru?.trim(),key+' ru');
      assert.ok(localization[key]?.en?.trim(),key+' en');
    }
    assert.ok(localization[entry.coreFallbackLocalizationKey]?.ru?.trim(),entry.coreFallbackLocalizationKey+' ru');
    assert.ok(localization[entry.coreFallbackLocalizationKey]?.en?.trim(),entry.coreFallbackLocalizationKey+' en');
  }

  const selectedKeys=new Set(povertyDepthLookupEntries.flatMap(entry=>entry.orderedDepthLocalizationKeys));
  for(const key of Object.keys(smallJob.strings)){
    assert.equal(localization[key],undefined,key+' stays fixture-local because outcomeRef lacks variant identity');
    assert.equal(selectedKeys.has(key),false,key+' stays out of variant selector');
  }
});

test('renderer rotates poverty pending-scene depth by history count without changing save',async()=>{
  const first=boot(JSON.stringify(pendingSave(1)));
  try{
    await wait(()=>!!first.w.document.querySelector('.dialogue p')||first.errors.length>0);
    assert.deepEqual(first.errors,[]);
    const before=first.w.localStorage.getItem('portal-life.v1');
    assert.match(first.w.document.querySelector('.dialogue p').textContent,/Под навесом торговец/);

    first.w.document.querySelector('[data-panel="menu"]').click();
    first.w.document.querySelector('#language-toggle').click();
    await wait(()=>first.w.document.documentElement.lang==='en');
    assert.match(first.w.document.querySelector('.dialogue p').textContent,/Under the awning, a merchant/);
    assert.equal(first.w.localStorage.getItem('portal-life.v1'),before);
  }finally{
    first.dom.window.close();
  }

  const second=boot(JSON.stringify(pendingSave(2)));
  try{
    await wait(()=>!!second.w.document.querySelector('.dialogue p')||second.errors.length>0);
    assert.deepEqual(second.errors,[]);
    assert.match(second.w.document.querySelector('.dialogue p').textContent,/закрывающегося прилавка/);
  }finally{
    second.dom.window.close();
  }
});
