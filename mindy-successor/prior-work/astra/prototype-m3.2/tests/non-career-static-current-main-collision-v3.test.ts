import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {presentationSlots} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const patch=JSON.parse(readFileSync('content/presentation-drafts/non-career-safe-production-subset-v3.json','utf8'));
const delta=JSON.parse(readFileSync('content/non-career-safe-static-localization-v3.fixture.json','utf8'));
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

test('safe non-career subset contains exactly 27 current production mappings',()=>{
  assert.equal(patch.assets.length,27);
  const slots=new Set(presentationSlots(catalog).map((slot:any)=>slot.id));
  const ids=new Set<string>();

  for(const asset of patch.assets){
    assert.equal(asset.collisionPolicy,'REFINE_EXISTING_STATIC_SAME_SEMANTIC_ID');
    assert.equal(existsSync(asset.src),true,asset.src);
    assert.equal(asset.presentationIds.length,1,asset.key);

    const id=asset.presentationIds[0];
    assert.ok(slots.has(id),id);
    assert.equal(ids.has(id),false,id);
    ids.add(id);

    const current=rootPresentation.slots?.[id]?.static;
    assert.ok(current,'PR47/current main must already own static slot '+id);
  }

  assert.equal(ids.size,27);
});

test('safe subset excludes Product-open Forest route-specific presentation IDs',()=>{
  const ids=patch.assets.flatMap((asset:any)=>asset.presentationIds);
  assert.equal(ids.some((id:string)=>id.includes('activity/forest/route/logging-road')),false);
  assert.equal(ids.some((id:string)=>id.includes('activity/forest/route/old-boundary')),false);
  assert.equal(ids.some((id:string)=>id==='activity/forest/route/default'),false);
  assert.doesNotMatch(JSON.stringify(patch.assets),/forest\.route\.(logging-road|old-boundary)/);
});

test('safe subset excludes staged teacher-specific School identities',()=>{
  const ids=patch.assets.flatMap((asset:any)=>asset.presentationIds);
  assert.equal(ids.some((id:string)=>id.startsWith('school/teacher/')),false);
  assert.doesNotMatch(JSON.stringify(ids),/school\/teacher\//);
});

test('non-career localization delta is additive or identical against current root',()=>{
  assert.equal(Object.keys(delta.strings).length,54);
  for(const [key,value] of Object.entries(delta.strings)){
    const current=rootLocalization.strings?.[key];
    if(current!==undefined)assert.deepEqual(current,value,key);
    const pair=value as any;
    assert.equal(typeof pair.ru,'string',key+'.ru');
    assert.equal(typeof pair.en,'string',key+'.en');
  }
});

test('safe non-career payload is presentation-only',()=>{
  assert.deepEqual(forbiddenFields(patch),[]);
});
