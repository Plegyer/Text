import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {existsSync,readFileSync} from 'node:fs';

import {presentationSlots} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

type SeasonalAsset={
  key:string;
  kind:'image';
  src:string;
  presentationId:string;
  career:string;
  season:string;
  fallbackPurpose:string;
  localization:{
    altKey:string;
    captionKey:string;
    requiredLocales:string[];
  };
  provenance:string;
};

type SeasonalManifest={
  formatVersion:number;
  kind:string;
  status:string;
  assets:SeasonalAsset[];
};

const manifest=JSON.parse(
  readFileSync('content/presentation-drafts/project-owned-seasonal-static-media-v1.json','utf8')
) as SeasonalManifest;

const localization=JSON.parse(
  readFileSync('content/project-owned-seasonal-static-localization-v1.fixture.json','utf8')
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

test('seasonal static manifest references 40 real project-owned SVGs and current semantic IDs',()=>{
  assert.equal(manifest.formatVersion,1);
  assert.equal(manifest.kind,'project-owned-seasonal-static-media');
  assert.equal(manifest.status,'STAGING_ONLY_NOT_ROOT_LOADED');
  assert.equal(manifest.assets.length,40);

  const slots=new Set(presentationSlots(catalog).map(slot=>slot.id));
  const keys=new Set<string>();
  const srcs=new Set<string>();
  const semanticIds=new Set<string>();

  for(const asset of manifest.assets){
    assert.equal(asset.kind,'image',asset.key);
    assert.match(asset.key,/^[a-z0-9][a-z0-9._-]*$/,asset.key);
    assert.equal(keys.has(asset.key),false,'duplicate key '+asset.key);
    keys.add(asset.key);

    assert.match(asset.src,/^assets\/presentation\/career-[a-z0-9-]+-shift-(spring|summer|autumn|winter)\.svg$/,asset.src);
    assert.equal(srcs.has(asset.src),false,'duplicate source '+asset.src);
    srcs.add(asset.src);
    assert.equal(existsSync(asset.src),true,asset.src);

    const svg=readFileSync(asset.src,'utf8');
    assert.ok(svg.trim().length>100,asset.src);
    assert.match(svg,/^<svg\b[^>]*>/,asset.src);
    assert.match(svg,/<\/svg>\s*$/,asset.src);
    assert.match(svg,/viewBox="0 0 1200 675"/,asset.src);
    assert.ok(svg.includes('data-career="'+asset.career+'"'),asset.src);
    assert.ok(svg.includes('data-season="'+asset.season+'"'),asset.src);
    assert.doesNotMatch(svg,/<script\b/i,asset.src);
    assert.doesNotMatch(svg,/(?:href|src)\s*=\s*["'](?:https?:|\/\/)/i,asset.src);

    assert.equal(semanticIds.has(asset.presentationId),false,'duplicate semantic '+asset.presentationId);
    semanticIds.add(asset.presentationId);
    assert.ok(slots.has(asset.presentationId),asset.presentationId+' must resolve on current production catalog');

    assert.deepEqual(asset.localization.requiredLocales,['ru','en']);
    for(const key of [asset.localization.altKey,asset.localization.captionKey]){
      const pair=localization.strings[key];
      assert.equal(typeof pair?.ru,'string',key+'.ru');
      assert.equal(typeof pair?.en,'string',key+'.en');
      assert.ok(pair.ru.trim(),key+'.ru empty');
      assert.ok(pair.en.trim(),key+'.en empty');
    }
  }

  assert.equal(keys.size,40);
  assert.equal(srcs.size,40);
  assert.equal(semanticIds.size,40);
});

test('seasonal SVGs have distinct bytes within each career and visible season markers',()=>{
  const byCareer=new Map<string,SeasonalAsset[]>();
  for(const asset of manifest.assets){
    const list=byCareer.get(asset.career)??[];
    list.push(asset);byCareer.set(asset.career,list);
  }

  assert.equal(byCareer.size,10);
  for(const [career,assets] of byCareer){
    assert.equal(assets.length,4,career);
    const contents=assets.map(asset=>readFileSync(asset.src,'utf8'));
    assert.equal(new Set(contents).size,4,career+' seasonal files must not be byte-identical');
    assert.deepEqual(new Set(assets.map(asset=>asset.season)),new Set(['spring','summer','autumn','winter']));
  }
});

test('normal build distributes every seasonal SVG under dist/assets',()=>{
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

test('seasonal static manifest stays presentation-only, local-path-only and locale-neutral',()=>{
  assert.deepEqual(gameplayFields(manifest),[]);
  const serialized=JSON.stringify(manifest);
  assert.doesNotMatch(serialized,/https?:\/\//i);
  assert.doesNotMatch(serialized,/data:/i);
  assert.doesNotMatch(serialized,/placeholder|non-shipped|assets\/staging/i);
  for(const asset of manifest.assets){
    assert.doesNotMatch(asset.src,/(?:^|\/)(?:ru|en)(?:\/|[-_.])/i,asset.src);
    assert.doesNotMatch(asset.presentationId,/(?:^|\/)(?:ru|en)(?:\/|$)/i,asset.presentationId);
  }
});
