import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createRequire} from 'node:module';

import {freshSave} from '../src/core/engine.ts';
import {
  STRONG_META_IDS,
  emptyStrongMetaState,
  grantStrongMetaReward
} from '../src/core/strongMeta.ts';

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

function boot(saved:string){
  const errors:string[]=[];
  const virtualConsole=new VirtualConsole();
  virtualConsole.on('jsdomError',(e:Error)=>errors.push(e.message));
  const dom=new JSDOM(html,{url:'http://localhost:4173',runScripts:'outside-only',virtualConsole});
  const w=dom.window;
  w.structuredClone=structuredClone;
  w.fetch=async()=>({ok:true,json:async()=>structuredClone(data)});
  w.confirm=()=>true;
  w.localStorage.setItem('portal-life.v1',saved);
  w.eval(bundle);
  return {dom,w,errors};
}

function ownedStrongMeta(){
  let strongMeta=emptyStrongMetaState();
  for(const id of [
    STRONG_META_IDS.workRhythm,
    STRONG_META_IDS.palaceCap200,
    STRONG_META_IDS.guardInstitutionalFavors,
    STRONG_META_IDS.merchantRiskLedger
  ])strongMeta=grantStrongMetaReward(strongMeta,id);
  return strongMeta;
}

test('v42 player UI uses the accepted Strong Meta selection seam without auto-selecting owned rewards',async()=>{
  const sourceMethodId='knowledge.source-method.practice';
  const initial=freshSave({
    hardWorkProgress:['lumber'],
    strongMeta:ownedStrongMeta()
  });
  initial.meta.strongMeta.knowledge.inheritedKnowledgeIds=[sourceMethodId];

  const first=boot(JSON.stringify(initial));
  try{
    const {w,errors}=first;
    await wait(()=>!!w.document.querySelector('[data-strong-meta-selector="true"]'));

    const selector=w.document.querySelector('[data-strong-meta-selector="true"]');
    const keystone=w.document.querySelector(`[data-strong-meta-keystone="${STRONG_META_IDS.workRhythm}"]`);
    const palace=w.document.querySelector(`[data-strong-meta-specialist="${STRONG_META_IDS.palaceCap200}"]`);
    const guard=w.document.querySelector(`[data-strong-meta-specialist="${STRONG_META_IDS.guardInstitutionalFavors}"]`);
    const merchant=w.document.querySelector(`[data-strong-meta-specialist="${STRONG_META_IDS.merchantRiskLedger}"]`);

    assert.ok(selector);
    assert.ok(keystone);
    assert.ok(palace);
    assert.ok(guard);
    assert.ok(merchant);
    assert.equal(keystone.getAttribute('aria-pressed'),'false');
    assert.equal(palace.getAttribute('aria-pressed'),'false');
    assert.equal(palace.closest('[data-strong-meta-reward]')?.getAttribute('data-strong-meta-class'),'specialist');
    assert.equal(selector.querySelector(`[data-strong-meta-reward="${sourceMethodId}"]`),null);
    assert.match(selector.querySelector('[data-strong-meta-automatic-knowledge]')?.textContent??'',/Source Method/);

    const hardWork=w.document.querySelector('[data-hard-work-package="lumber"]');
    assert.ok(hardWork);
    assert.equal(selector.contains(hardWork),false);

    const initiallyStored=JSON.parse(w.localStorage.getItem('portal-life.v1'));
    assert.equal(initiallyStored.meta.strongMeta.preferredSelection.keystoneId,null);
    assert.deepEqual(initiallyStored.meta.strongMeta.preferredSelection.specialistIds,[]);

    keystone.click();
    await wait(()=>JSON.parse(w.localStorage.getItem('portal-life.v1')).meta.strongMeta.preferredSelection.keystoneId===STRONG_META_IDS.workRhythm);

    w.document.querySelector(`[data-strong-meta-specialist="${STRONG_META_IDS.palaceCap200}"]`).click();
    await wait(()=>JSON.parse(w.localStorage.getItem('portal-life.v1')).meta.strongMeta.preferredSelection.specialistIds.includes(STRONG_META_IDS.palaceCap200));

    w.document.querySelector(`[data-strong-meta-specialist="${STRONG_META_IDS.guardInstitutionalFavors}"]`).click();
    await wait(()=>JSON.parse(w.localStorage.getItem('portal-life.v1')).meta.strongMeta.preferredSelection.specialistIds.length===2);

    const afterTwo=w.document.querySelector(`[data-strong-meta-specialist="${STRONG_META_IDS.merchantRiskLedger}"]`);
    assert.equal(afterTwo.disabled,true);
    assert.equal(w.document.querySelector(`[data-strong-meta-specialist="${STRONG_META_IDS.palaceCap200}"]`).disabled,false);
    assert.equal(w.document.querySelector(`[data-strong-meta-specialist="${STRONG_META_IDS.guardInstitutionalFavors}"]`).disabled,false);

    const selectedSave=w.localStorage.getItem('portal-life.v1');
    const selected=JSON.parse(selectedSave);
    assert.equal(selected.run.strongMetaSnapshot,null);
    assert.equal(selected.meta.strongMeta.preferredSelection.keystoneId,STRONG_META_IDS.workRhythm);
    assert.deepEqual(new Set(selected.meta.strongMeta.preferredSelection.specialistIds),new Set([
      STRONG_META_IDS.palaceCap200,
      STRONG_META_IDS.guardInstitutionalFavors
    ]));
    assert.deepEqual(errors,[]);

    const reloaded=boot(selectedSave);
    try{
      const rw=reloaded.w;
      await wait(()=>!!rw.document.querySelector('[data-strong-meta-selector="true"]'));
      assert.equal(rw.document.querySelector(`[data-strong-meta-keystone="${STRONG_META_IDS.workRhythm}"]`).getAttribute('aria-pressed'),'true');
      assert.equal(rw.document.querySelector(`[data-strong-meta-specialist="${STRONG_META_IDS.palaceCap200}"]`).getAttribute('aria-pressed'),'true');
      assert.equal(rw.document.querySelector(`[data-strong-meta-specialist="${STRONG_META_IDS.guardInstitutionalFavors}"]`).getAttribute('aria-pressed'),'true');

      for(let i=0;i<10;i++){
        rw.document.querySelector('[data-stat="strength"][data-delta="1"]').click();
        await wait(()=>rw.document.querySelector('#points').textContent===String(9-i));
      }
      rw.document.querySelector('#create').click();
      await wait(()=>!rw.document.querySelector('[data-strong-meta-selector="true"]'));

      const completed=JSON.parse(rw.localStorage.getItem('portal-life.v1'));
      assert.equal(completed.run.strongMetaSnapshot.keystoneId,STRONG_META_IDS.workRhythm);
      assert.deepEqual(new Set(completed.run.strongMetaSnapshot.specialistIds),new Set([
        STRONG_META_IDS.palaceCap200,
        STRONG_META_IDS.guardInstitutionalFavors
      ]));
      assert.deepEqual(completed.run.strongMetaSnapshot.automaticKnowledgeIds,[sourceMethodId]);
      assert.equal(completed.meta.strongMeta.preferredSelection.keystoneId,STRONG_META_IDS.workRhythm);
      assert.deepEqual(reloaded.errors,[]);
    }finally{
      reloaded.dom.window.close();
    }
  }finally{
    first.dom.window.close();
  }
});
