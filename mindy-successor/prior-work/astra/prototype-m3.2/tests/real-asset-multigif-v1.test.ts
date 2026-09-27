import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {presentationSlots} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

type Candidate={
  key:string;
  kind:'gif';
  src:string;
  alt:string;
  weight?:number;
};

type SlotOverride={
  pool?:{
    version:number;
    ordering:'ordered'|'unordered';
    selectionPolicy:'unweighted'|'weighted';
    candidates:Candidate[];
  };
  static?:{
    kind:'image';
    src:string;
    alt:string;
  };
  fallbackId?:string;
};

type Patch={
  version:number;
  texts:Record<string,string>;
  media:Record<string,unknown>;
  slots:Record<string,SlotOverride>;
};

const patch=JSON.parse(
  readFileSync('content/presentation-drafts/real-asset-only-multigif-v1.json','utf8')
) as Patch;

const placeholderMarker=/(?:^|[/_.-])(placeholder|staging|non-shipped|future|example)(?:[/_.-]|$)/i;
const forbiddenGameplayKeys=new Set([
  'conditions',
  'effects',
  'effect',
  'reward',
  'rewards',
  'cost',
  'energy',
  'energyCost',
  'eligibility',
  'gameplay',
  'mechanics',
  'rng',
  'save',
  'saveState'
]);

function walk(value:unknown,path:string[]=[]):string[] {
  if(Array.isArray(value))return value.flatMap((entry,index)=>walk(entry,[...path,String(index)]));
  if(!value||typeof value!=='object')return [];
  const hits:string[]=[];
  for(const [key,entry] of Object.entries(value as Record<string,unknown>)){
    if(forbiddenGameplayKeys.has(key))hits.push([...path,key].join('.'));
    hits.push(...walk(entry,[...path,key]));
  }
  return hits;
}

test('real-asset-only patch contains only bounded real GIF pools with unique stable keys',()=>{
  assert.equal(patch.version,1);
  assert.deepEqual(Object.keys(patch.texts),[]);
  assert.deepEqual(Object.keys(patch.media),[]);

  for(const [presentationId,slot] of Object.entries(patch.slots)){
    assert.ok(slot.pool,presentationId+' must use an explicit pool');
    assert.ok(slot.static,presentationId+' must keep a static fallback');

    const candidates=slot.pool!.candidates;
    assert.ok(candidates.length>=3&&candidates.length<=5,presentationId);
    assert.equal(new Set(candidates.map(candidate=>candidate.key)).size,candidates.length,presentationId);

    for(const candidate of candidates){
      assert.equal(candidate.kind,'gif',candidate.key);
      assert.match(candidate.key,/^[a-z0-9][a-z0-9._-]*$/);
      assert.match(candidate.src,/^assets\/[a-zA-Z0-9/_-]+\.gif$/);
      assert.equal(placeholderMarker.test(candidate.src),false,candidate.src);
      assert.ok(existsSync(candidate.src),candidate.src+' must exist in the repository checkout');
    }

    assert.equal(slot.static!.kind,'image');
    assert.match(slot.static!.src,/^assets\/[a-zA-Z0-9/_-]+\.(svg|png|jpg|jpeg|webp)$/);
    assert.ok(existsSync(slot.static!.src),slot.static!.src+' static fallback must exist');
  }
});

test('every patched semantic ID is a current production presentation slot',()=>{
  const productionSlots=new Set(presentationSlots(catalog).map(slot=>slot.id));
  for(const presentationId of Object.keys(patch.slots)){
    assert.ok(productionSlots.has(presentationId),presentationId);
  }
});

test('real-asset patch contains no placeholder references or gameplay-owned fields',()=>{
  const serialized=JSON.stringify(patch);
  assert.equal(placeholderMarker.test(serialized),false);
  assert.deepEqual(walk(patch),[]);
});
