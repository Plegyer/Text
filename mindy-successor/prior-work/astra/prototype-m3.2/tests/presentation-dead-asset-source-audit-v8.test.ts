import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readdirSync,readFileSync,statSync} from 'node:fs';
import {join,relative} from 'node:path';

import {presentationSlots} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const manifest=JSON.parse(readFileSync('content/presentation-drafts/presentation-hardening-v8-manifest-v1.json','utf8'));

function files(root:string):string[]{
  const out:string[]=[];
  for(const name of readdirSync(root)){
    const full=join(root,name);
    if(statSync(full).isDirectory())out.push(...files(full));
    else out.push(full.replaceAll('\\','/'));
  }
  return out;
}
function assetRefs(text:string){
  return [...text.matchAll(/assets\/[A-Za-z0-9/_-]+\.(?:svg|png|jpg|jpeg|webp|gif|mp4|webm)/g)].map(match=>match[0]);
}
function collectPresentationIds(value:any,out:string[]=[]):string[]{
  if(Array.isArray(value)){for(const item of value)collectPresentationIds(item,out);return out;}
  if(!value||typeof value!=='object')return out;
  if(typeof value.presentationId==='string')out.push(value.presentationId);
  for(const child of Object.values(value))collectPresentationIds(child,out);
  return out;
}

test('dead presentation asset inventory matches production packs, presentation registry and source manifests',()=>{
  const referenced=new Set<string>();
  const jsonPaths=[
    'content/presentation.json',
    ...files('content/packs').filter(path=>path.endsWith('.json')),
    ...files('content/presentation-drafts').filter(path=>path.endsWith('.json'))
  ];
  for(const path of jsonPaths){
    let text=readFileSync(path,'utf8');
    if(path==='content/presentation-drafts/presentation-hardening-v8-manifest-v1.json'){
      const self=JSON.parse(text);
      delete self.deadAssetAudit;
      text=JSON.stringify(self);
    }
    for(const ref of assetRefs(text))referenced.add(ref);
  }
  const allPresentationAssets=files('assets/presentation')
    .map(path=>relative('.',path).replaceAll('\\','/'))
    .sort();
  const dead=allPresentationAssets.filter(path=>!referenced.has(path)).sort();
  assert.deepEqual(dead,[...manifest.deadAssetAudit.unreferencedPresentationAssets].sort());
});

test('every active production presentation override points to an existing source',()=>{
  for(const [id,slot] of Object.entries<any>(presentation.slots??{})){
    const candidates=[
      slot.primary?.src,
      slot.static?.src,
      ...(slot.pool?.candidates??[]).map((candidate:any)=>candidate.src)
    ].filter(Boolean);
    for(const src of candidates){
      if(src.startsWith('assets/'))assert.ok(existsSync(src),id+' missing '+src);
    }
  }
  assert.equal(manifest.deadAssetAudit.activeMissingSources,0);
});

test('selected active source manifests contain only live semantic presentation IDs',()=>{
  const registry=new Set(presentationSlots(catalog).map(slot=>slot.id));
  const paths=[
    'content/presentation-drafts/lumber-presentation-source-manifest-v1.json',
    'content/presentation-drafts/starter-school-presentation-source-manifest-v1.json',
    'content/presentation-drafts/late-career-presentation-source-manifest-v1.json',
    'content/presentation-drafts/cross-domain-presentation-source-manifest-v1.json',
    'content/presentation-drafts/presentation-wave-v6-source-manifest-v1.json',
    'content/presentation-drafts/presentation-production-binding-v7-manifest-v1.json',
    'content/presentation-drafts/presentation-hardening-v8-manifest-v1.json'
  ];
  for(const path of paths){
    const value=JSON.parse(readFileSync(path,'utf8'));
    for(const id of collectPresentationIds(value)){
      assert.ok(registry.has(id),path+' stale presentationId '+id);
    }
  }
  assert.equal(manifest.deadAssetAudit.staleSelectedManifestRows,0);
});
