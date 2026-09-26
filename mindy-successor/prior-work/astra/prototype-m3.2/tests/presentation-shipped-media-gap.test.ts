import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {catalog} from './helpers.ts';

type Classification='direct-media-backed'|'fallback-backed'|'currently-unbound';
type MediaEvidence={mediaId:string;kind:'image'|'gif'|'video';assetPath:string;assetExists:boolean};
type GapEntry={
  presentationId:string;
  registryCoverage:'present'|'missing';
  classification:Classification;
  currentCatalogMedia:MediaEvidence[];
  fallbackChain:string[];
  resolvedFallbackPresentationId:string|null;
  fallbackCatalogMedia:MediaEvidence[];
  declaredTargetMedia:MediaEvidence[];
};
type Matrix={
  version:1;
  kind:'presentation-shipped-media-gap-matrix';
  status:'current-branch-audit';
  policy:{
    classificationBasis:string;
    missingMedia:'presentation-only-fallback-or-text-non-fatal';
    semanticSlotAndMediaIdAreDistinct:true;
    mechanicsDataAllowed:false;
  };
  entries:GapEntry[];
};

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const matrix=json('content/presentation-shipped-media-gap.fixture.json') as Matrix;
const coverage=json('content/presentation-product-coverage.fixture.json');
const registry=json('content/presentation-target-registry.fixture.json');
const migration=json('content/presentation-legacy-migration.fixture.json');
const targetPacks=[
  json('content/packs/lumber-target/lumber-production.pack.json'),
  json('content/packs/lumber-target/lumber-night-acceptance.pack.json')
];
const registryById=new Map<string,any>(registry.entries.map((entry:any)=>[entry.presentationId,entry]));
const currentMediaById=new Map(catalog.media.map(media=>[media.id,media]));
const targetMediaById=new Map(targetPacks.flatMap(pack=>pack.media).map((media:any)=>[media.id,media]));

const semanticToLegacy=new Map<string,string[]>();
for(const mapping of migration.mappings){
  for(const id of mapping.presentationIds){
    const list=semanticToLegacy.get(id)??[];
    list.push(mapping.legacyMediaId);
    semanticToLegacy.set(id,list);
  }
}

function currentDirectMedia(id:string):MediaEvidence[]{
  return (semanticToLegacy.get(id)??[]).map(mediaId=>{
    const media=currentMediaById.get(mediaId);
    assert.ok(media,`migration media missing from current catalog: ${mediaId}`);
    return {
      mediaId:media.id,
      kind:media.kind,
      assetPath:media.src,
      assetExists:existsSync(media.src)
    };
  });
}

function fallbackChain(id:string){
  const result:string[]=[];
  const seen=new Set<string>([id]);
  let current=registryById.get(id);
  while(current?.fallbackId){
    assert.equal(seen.has(current.fallbackId),false,`fallback cycle at ${current.fallbackId}`);
    seen.add(current.fallbackId);
    result.push(current.fallbackId);
    current=registryById.get(current.fallbackId);
  }
  return result;
}

function expectedClassification(id:string):{
  classification:Classification;
  chain:string[];
  resolved:string|null;
}{
  const direct=currentDirectMedia(id).filter(media=>media.assetExists);
  if(direct.length)return {classification:'direct-media-backed',chain:registryById.has(id)?fallbackChain(id):[],resolved:null};
  if(!registryById.has(id))return {classification:'currently-unbound',chain:[],resolved:null};
  const chain=fallbackChain(id);
  const resolved=chain.find(fallback=>currentDirectMedia(fallback).some(media=>media.assetExists))??null;
  return resolved
    ? {classification:'fallback-backed',chain,resolved}
    : {classification:'currently-unbound',chain,resolved:null};
}

function collectKeys(value:unknown,keys=new Set<string>()):Set<string>{
  if(Array.isArray(value)){for(const item of value)collectKeys(item,keys);return keys;}
  if(value&&typeof value==='object'){
    for(const [key,item] of Object.entries(value as Record<string,unknown>)){
      keys.add(key.toLowerCase());
      collectKeys(item,keys);
    }
  }
  return keys;
}

test('gap matrix covers exactly the completed product presentation coverage surface',()=>{
  const expected=new Set(coverage.entries.map((entry:any)=>entry.presentationId));
  const actual=new Set(matrix.entries.map(entry=>entry.presentationId));
  assert.deepEqual(actual,expected);
  assert.equal(matrix.entries.length,coverage.entries.length);
  assert.equal(actual.size,matrix.entries.length);
});

test('each semantic slot is classified from current catalog media or explicit registry fallback only',()=>{
  for(const entry of matrix.entries){
    const expected=expectedClassification(entry.presentationId);
    assert.equal(entry.classification,expected.classification,entry.presentationId);
    assert.deepEqual(entry.fallbackChain,expected.chain,entry.presentationId);
    assert.equal(entry.resolvedFallbackPresentationId,expected.resolved,entry.presentationId);

    const coverageEntry=coverage.entries.find((item:any)=>item.presentationId===entry.presentationId);
    assert.ok(coverageEntry);
    assert.equal(entry.registryCoverage,coverageEntry.registryCoverage);
    assert.equal(entry.registryCoverage,registryById.has(entry.presentationId)?'present':'missing');
  }

  assert.ok(matrix.entries.some(entry=>entry.classification==='direct-media-backed'));
  assert.ok(matrix.entries.some(entry=>entry.classification==='fallback-backed'));
  assert.ok(matrix.entries.some(entry=>entry.classification==='currently-unbound'));
});

test('current catalog media IDs and actual shipped asset paths are exact and distinct from semantic IDs',()=>{
  for(const entry of matrix.entries){
    assert.match(entry.presentationId,/^[a-z0-9-]+(?:\/[a-z0-9-]+)+$/);
    for(const evidence of [...entry.currentCatalogMedia,...entry.fallbackCatalogMedia]){
      const media=currentMediaById.get(evidence.mediaId);
      assert.ok(media,evidence.mediaId);
      assert.equal(evidence.assetPath,media.src);
      assert.equal(evidence.kind,media.kind);
      assert.equal(evidence.assetExists,existsSync(evidence.assetPath));
      assert.equal(evidence.assetExists,true,`expected shipped asset: ${evidence.assetPath}`);
      assert.notEqual(evidence.mediaId,entry.presentationId);
      assert.equal(evidence.mediaId.includes('/'),false,evidence.mediaId);
    }
  }
});

test('declared target GIF media is audited separately from current shipped catalog media',()=>{
  for(const entry of matrix.entries){
    for(const evidence of entry.declaredTargetMedia){
      const media=targetMediaById.get(evidence.mediaId);
      assert.ok(media,`unknown target media declaration: ${evidence.mediaId}`);
      assert.equal(evidence.assetPath,media.src);
      assert.equal(evidence.kind,media.kind);
      assert.equal(evidence.assetExists,existsSync(evidence.assetPath));
      assert.notEqual(evidence.mediaId,entry.presentationId);
    }
  }

  const missingDeclared=matrix.entries.flatMap(entry=>entry.declaredTargetMedia).filter(media=>!media.assetExists);
  assert.ok(missingDeclared.length>0,'expected current target-media asset gaps to be visible');
});

test('fallback graph is cycle-free and fallback-backed rows resolve to usable shipped media',()=>{
  for(const entry of registry.entries)fallbackChain(entry.presentationId);

  for(const entry of matrix.entries.filter(entry=>entry.classification==='fallback-backed')){
    assert.ok(entry.resolvedFallbackPresentationId,entry.presentationId);
    assert.ok(entry.fallbackChain.includes(entry.resolvedFallbackPresentationId));
    assert.ok(entry.fallbackCatalogMedia.some(media=>media.assetExists));
  }
});

test('missing or unbound media remains explicitly presentation-only and non-fatal',()=>{
  assert.equal(matrix.policy.missingMedia,'presentation-only-fallback-or-text-non-fatal');
  for(const entry of matrix.entries.filter(entry=>entry.classification!=='direct-media-backed')){
    assert.ok(entry.presentationId);
  }
});

test('gap matrix contains no mechanics, effects, RNG or Energy payload',()=>{
  assert.equal(matrix.policy.mechanicsDataAllowed,false);
  assert.equal(matrix.policy.semanticSlotAndMediaIdAreDistinct,true);
  const keys=collectKeys(matrix.entries);
  for(const forbidden of [
    'condition','conditions','effect','effects','rng','random','energy','cost',
    'delta','reward','transition','command','metrics','inventory','save','runstate'
  ])assert.equal(keys.has(forbidden),false,forbidden);
});
