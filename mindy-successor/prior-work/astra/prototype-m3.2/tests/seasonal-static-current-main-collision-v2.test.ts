import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {presentationSlots} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const manifest=JSON.parse(readFileSync('content/presentation-drafts/seasonal-static-incremental-production-v2.json','utf8'));
const delta=JSON.parse(readFileSync('content/seasonal-static-incremental-localization-v2.fixture.json','utf8'));
const rootPresentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const rootLocalization=JSON.parse(readFileSync('content/localization.json','utf8'));

const forbidden=new Set(['conditions','effects','effect','rewards','reward','cost','energy','energyCost','eligibility','mechanics','rng','save','saveState','outcome']);
function forbiddenFields(value:unknown,path:string[]=[]):string[]{
  if(Array.isArray(value))return value.flatMap((entry,index)=>forbiddenFields(entry,[...path,String(index)]));
  if(!value||typeof value!=='object')return [];
  const hits:string[]=[];
  for(const [key,entry] of Object.entries(value as Record<string,unknown>)){
    if(forbidden.has(key))hits.push([...path,key].join('.'));
    hits.push(...forbiddenFields(entry,[...path,key]));
  }
  return hits;
}

test('all 40 post-PR47 seasonal mappings are already shipped identically on current main',()=>{
  assert.equal(manifest.assets.length,40);
  const slots=new Set(presentationSlots(catalog).map((slot:any)=>slot.id));
  const ids=new Set<string>();
  for(const asset of manifest.assets){
    assert.equal(asset.currentMainState,'ALREADY_SHIPPED_CURRENT_MAIN');
    assert.equal(asset.integrationAction,'NONE');
    assert.ok(slots.has(asset.presentationId),asset.presentationId);
    assert.equal(ids.has(asset.presentationId),false,asset.presentationId);
    ids.add(asset.presentationId);
    assert.equal(existsSync(asset.src),true,asset.src);

    const current=rootPresentation.slots?.[asset.presentationId]?.static;
    assert.ok(current,asset.presentationId);
    assert.equal(current.src,asset.src,asset.presentationId);
    assert.equal(current.altKey,asset.localization.altKey,asset.presentationId);
  }
  assert.equal(ids.size,40);
});

test('seasonal localization delta is empty because current root already ships all 80 keys',()=>{
  assert.deepEqual(delta.strings,{});
  assert.equal(delta.summary.requiredKeys,80);
  assert.equal(delta.summary.alreadyShippedKeys,80);
  assert.equal(delta.summary.newKeys,0);

  for(const asset of manifest.assets){
    for(const key of [asset.localization.altKey,asset.localization.captionKey]){
      const pair=rootLocalization.strings?.[key];
      assert.equal(typeof pair?.ru,'string',key+'.ru');
      assert.equal(typeof pair?.en,'string',key+'.en');
    }
  }
});

test('seasonal reconciliation never re-adds result/default mappings or gameplay fields',()=>{
  for(const asset of manifest.assets)assert.doesNotMatch(asset.presentationId,/\/result\/default$/);
  assert.deepEqual(forbiddenFields(manifest),[]);
});
