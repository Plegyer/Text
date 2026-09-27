import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {existsSync,readFileSync} from 'node:fs';

import {presentationSlots} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

type StaticAsset={
  key:string;
  kind:'image';
  src:string;
  semanticIds:string[];
  fallbackPurpose:string;
  localization:{
    altKey:string;
    captionKey:string;
    requiredLocales:string[];
  };
  provenance:string;
};

type StaticManifest={
  formatVersion:number;
  kind:string;
  status:string;
  assets:StaticAsset[];
};

const manifest=JSON.parse(
  readFileSync('content/presentation-drafts/project-owned-static-media-v1.json','utf8')
) as StaticManifest;

const localization=JSON.parse(
  readFileSync('content/project-owned-static-media-localization-v1.fixture.json','utf8')
);

const forbiddenGameplayKeys=new Set([
  'conditions','effects','effect','rewards','reward','cost','energy','energyCost',
  'eligibility','gameplay','mechanics','rng','save','saveState','outcome'
]);

function gameplayFields(value:unknown,path:string[]=[]):string[]{
  if(Array.isArray(value))return value.flatMap((entry,index)=>gameplayFields(entry,[...path,String(index)]));
  if(!value||typeof value!=='object')return [];
  const hits:string[]=[];
  for(const [key,entry] of Object.entries(value as Record<string,unknown>)){
    if(forbiddenGameplayKeys.has(key))hits.push([...path,key].join('.'));
    hits.push(...gameplayFields(entry,[...path,key]));
  }
  return hits;
}

test('project-owned static media manifest references real original SVG files and current semantic slots',()=>{
  assert.equal(manifest.formatVersion,1);
  assert.equal(manifest.kind,'project-owned-static-media');
  assert.equal(manifest.status,'STAGING_ONLY_NOT_ROOT_LOADED');

  const slots=new Set(presentationSlots(catalog).map(slot=>slot.id));
  const keys=new Set<string>();
  const srcs=new Set<string>();

  for(const asset of manifest.assets){
    assert.equal(asset.kind,'image',asset.key);
    assert.match(asset.key,/^[a-z0-9][a-z0-9._-]*$/,asset.key);
    assert.equal(keys.has(asset.key),false,'duplicate asset key '+asset.key);
    keys.add(asset.key);

    assert.match(asset.src,/^assets\/presentation\/[a-z0-9][a-z0-9._-]*\.svg$/,asset.src);
    assert.equal(srcs.has(asset.src),false,'duplicate physical asset path '+asset.src);
    srcs.add(asset.src);
    assert.equal(existsSync(asset.src),true,asset.src);

    const svg=readFileSync(asset.src,'utf8');
    assert.ok(svg.trim().length>100,asset.src+' must be non-empty SVG text');
    assert.match(svg,/^<svg\b[^>]*>/,asset.src);
    assert.match(svg,/<\/svg>\s*$/,asset.src);
    assert.match(svg,/viewBox="0 0 1200 675"/,asset.src);
    assert.doesNotMatch(svg,/<script\b/i,asset.src);
    assert.doesNotMatch(svg,/(?:href|src)\s*=\s*["'](?:https?:|\/\/)/i,asset.src+' must not embed external media');

    assert.ok(asset.semanticIds.length>=1,asset.key);
    for(const semanticId of asset.semanticIds){
      assert.ok(slots.has(semanticId),semanticId+' must exist on current production catalog');
    }

    assert.deepEqual(asset.localization.requiredLocales,['ru','en'],asset.key);
    for(const key of [asset.localization.altKey,asset.localization.captionKey]){
      const pair=localization.strings[key];
      assert.equal(typeof pair?.ru,'string',key+'.ru');
      assert.equal(typeof pair?.en,'string',key+'.en');
      assert.ok(pair.ru.trim(),key+'.ru empty');
      assert.ok(pair.en.trim(),key+'.en empty');
    }
  }

  assert.equal(manifest.assets.length,21);
  assert.equal(keys.size,21);
  assert.equal(srcs.size,21);
});

test('normal build distributes every project-owned SVG under dist/assets',()=>{
  const buildSource=readFileSync('scripts/build.mjs','utf8');
  assert.match(buildSource,/cp\('assets','dist\/assets',\{recursive:true\}\)/);

  if(!manifest.assets.every(asset=>existsSync('dist/'+asset.src))){
    execFileSync(process.execPath,['scripts/build.mjs'],{stdio:'pipe'});
  }

  for(const asset of manifest.assets){
    const built='dist/'+asset.src;
    assert.equal(existsSync(built),true,built);
    assert.equal(readFileSync(built,'utf8'),readFileSync(asset.src,'utf8'),built+' must preserve source bytes');
  }
});

test('project-owned static media manifest is presentation-only and local-path-only',()=>{
  assert.deepEqual(gameplayFields(manifest),[]);
  const serialized=JSON.stringify(manifest);
  assert.doesNotMatch(serialized,/https?:\/\//i);
  assert.doesNotMatch(serialized,/data:/i);
  assert.doesNotMatch(serialized,/assets\/staging|placeholder|non-shipped/i);
});
