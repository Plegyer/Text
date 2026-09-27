import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {existsSync,readFileSync} from 'node:fs';

import {presentationSlots} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

type Asset={
  key:string;
  kind:'image';
  src:string;
  classification:'UNIQUE_PROJECT_OWNED'|'PRODUCT_OPEN';
  presentationIds:string[];
  fallbackPurpose:string;
  localization:{altKey:string;captionKey:string;requiredLocales:string[]};
  provenance:string;
  sharedCurrentPresentationId?:string;
  sourceGameplayIdentity?:string;
  productOpenReason?:string;
};
type Manifest={formatVersion:number;kind:string;status:string;assets:Asset[]};

const manifest=JSON.parse(readFileSync('content/presentation-drafts/project-owned-non-career-static-media-v2.json','utf8')) as Manifest;
const localization=JSON.parse(readFileSync('content/project-owned-non-career-static-localization-v2.fixture.json','utf8'));

const forbiddenKeys=new Set(['conditions','effects','effect','rewards','reward','cost','energy','energyCost','eligibility','mechanics','rng','save','saveState','outcome']);
function forbiddenFields(value:unknown,path:string[]=[]):string[]{
  if(Array.isArray(value))return value.flatMap((entry,index)=>forbiddenFields(entry,[...path,String(index)]));
  if(!value||typeof value!=='object')return [];
  const hits:string[]=[];
  for(const [key,entry] of Object.entries(value as Record<string,unknown>)){
    if(forbiddenKeys.has(key))hits.push([...path,key].join('.'));
    hits.push(...forbiddenFields(entry,[...path,key]));
  }
  return hits;
}

test('non-career manifest references real SVG files and truthful current semantic IDs',()=>{
  assert.equal(manifest.formatVersion,2);
  assert.equal(manifest.kind,'project-owned-non-career-static-media');
  assert.equal(manifest.status,'STAGING_ONLY_NOT_ROOT_LOADED');
  assert.equal(manifest.assets.length,29);

  const slots=new Set(presentationSlots(catalog).map(slot=>slot.id));
  const sources=new Set<string>();
  const mapped=new Set<string>();
  let productOpen=0;

  for(const asset of manifest.assets){
    assert.equal(asset.kind,'image',asset.key);
    assert.match(asset.src,/^assets\/presentation\/[a-z0-9][a-z0-9._-]*\.svg$/,asset.src);
    assert.equal(sources.has(asset.src),false,'duplicate source '+asset.src);
    sources.add(asset.src);
    assert.equal(existsSync(asset.src),true,asset.src);

    const svg=readFileSync(asset.src,'utf8');
    assert.ok(svg.trim().length>100,asset.src);
    assert.match(svg,/^<svg\b[^>]*>/,asset.src);
    assert.match(svg,/<\/svg>\s*$/,asset.src);
    assert.match(svg,/viewBox="0 0 1200 675"/,asset.src);
    assert.doesNotMatch(svg,/<script\b/i,asset.src);
    assert.doesNotMatch(svg,/(?:href|src)\s*=\s*["'](?:https?:|\/\/)/i,asset.src);

    if(asset.classification==='UNIQUE_PROJECT_OWNED'){
      assert.ok(asset.presentationIds.length>=1,asset.key);
      for(const id of asset.presentationIds){
        assert.ok(slots.has(id),id);
        assert.equal(mapped.has(id),false,'duplicate mapped semantic '+id);
        mapped.add(id);
      }
    }else{
      productOpen++;
      assert.equal(asset.classification,'PRODUCT_OPEN');
      assert.deepEqual(asset.presentationIds,[]);
      assert.equal(typeof asset.sharedCurrentPresentationId,'string');
      assert.ok(slots.has(asset.sharedCurrentPresentationId!),asset.sharedCurrentPresentationId);
      assert.match(asset.productOpenReason??'',/no route-specific presentationId/);
    }

    assert.deepEqual(asset.localization.requiredLocales,['ru','en']);
    for(const key of [asset.localization.altKey,asset.localization.captionKey]){
      const pair=localization.strings[key];
      assert.equal(typeof pair?.ru,'string',key+'.ru');
      assert.equal(typeof pair?.en,'string',key+'.en');
      assert.ok(pair.ru.trim(),key+'.ru empty');
      assert.ok(pair.en.trim(),key+'.en empty');
    }
  }

  assert.equal(sources.size,29);
  assert.equal(mapped.size,27);
  assert.equal(productOpen,2);
});

test('normal build distributes every non-career project-owned SVG',()=>{
  const build=readFileSync('scripts/build.mjs','utf8');
  assert.match(build,/cp\('assets','dist\/assets',\{recursive:true\}\)/);
  if(!manifest.assets.every(asset=>existsSync('dist/'+asset.src))){
    execFileSync(process.execPath,['scripts/build.mjs'],{stdio:'pipe'});
  }
  for(const asset of manifest.assets){
    const built='dist/'+asset.src;
    assert.equal(existsSync(built),true,built);
    assert.equal(readFileSync(built,'utf8'),readFileSync(asset.src,'utf8'),built);
  }
});

test('non-career static payload remains presentation-only, local and locale-neutral',()=>{
  assert.deepEqual(forbiddenFields(manifest),[]);
  const serialized=JSON.stringify(manifest);
  assert.doesNotMatch(serialized,/https?:\/\//i);
  assert.doesNotMatch(serialized,/data:/i);
  assert.doesNotMatch(serialized,/placeholder|assets\/staging|non-shipped/i);
  for(const asset of manifest.assets){
    assert.doesNotMatch(asset.src,/(?:^|\/)(?:ru|en)(?:\/|[-_.])/i,asset.src);
  }
});
