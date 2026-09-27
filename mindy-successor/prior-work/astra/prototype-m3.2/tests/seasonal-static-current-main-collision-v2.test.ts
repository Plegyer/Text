import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {presentationSlots} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const patch=JSON.parse(readFileSync('content/presentation-drafts/seasonal-static-incremental-production-v2.json','utf8'));
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

test('seasonal incremental patch contains exactly 40 current seasonal semantic IDs',()=>{
  assert.equal(patch.assets.length,40);
  const slots=new Set(presentationSlots(catalog).map((slot:any)=>slot.id));
  const ids=new Set<string>();
  for(const asset of patch.assets){
    assert.match(asset.presentationId,/^job\/[a-z0-9-]+\/shift\/(spring|summer|autumn|winter)\/default$/);
    assert.ok(slots.has(asset.presentationId),asset.presentationId);
    assert.equal(ids.has(asset.presentationId),false,asset.presentationId);
    ids.add(asset.presentationId);
    assert.equal(existsSync(asset.src),true,asset.src);
    assert.equal(rootPresentation.slots?.[asset.presentationId]?.static,undefined,'current root already has static override for '+asset.presentationId);
  }
  assert.equal(ids.size,40);
});

test('seasonal localization delta is additive or identical against current root',()=>{
  assert.equal(Object.keys(delta.strings).length,80);
  for(const [key,value] of Object.entries(delta.strings)){
    const current=rootLocalization.strings?.[key];
    if(current!==undefined)assert.deepEqual(current,value,key);
    const pair=value as any;
    assert.equal(typeof pair.ru,'string',key+'.ru');
    assert.equal(typeof pair.en,'string',key+'.en');
  }
});

test('seasonal patch never duplicates shipped result/default mappings',()=>{
  for(const asset of patch.assets){
    assert.doesNotMatch(asset.presentationId,/\/result\/default$/);
  }
});

test('seasonal incremental payload contains no gameplay fields',()=>{
  assert.deepEqual(forbiddenFields(patch),[]);
});
