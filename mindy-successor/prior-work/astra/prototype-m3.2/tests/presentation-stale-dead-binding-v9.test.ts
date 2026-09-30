import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {applyPresentation,presentationSchema,presentationSlots,resolvePresentation} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const manifest=JSON.parse(readFileSync('content/presentation-drafts/presentation-hardening-v9-manifest-v1.json','utf8'));
const registry=new Set(presentationSlots(catalog).map(slot=>slot.id));

function collect(value:any,key:string,out:any[]=[]):any[]{
  if(Array.isArray(value)){for(const item of value)collect(item,key,out);return out;}
  if(!value||typeof value!=='object')return out;
  for(const [name,child] of Object.entries(value)){
    if(name===key)out.push(child);
    collect(child,key,out);
  }
  return out;
}

test('production presentation has no stale registry row and no missing local source',()=>{
  presentationSchema.parse(presentation);
  applyPresentation(catalog,presentation);
  for(const [id,slot] of Object.entries<any>(presentation.slots??{})){
    assert.ok(registry.has(id),'stale production slot '+id);
    const sources=[
      slot.primary?.src,
      slot.static?.src,
      ...(slot.pool?.candidates??[]).map((candidate:any)=>candidate.src)
    ].filter(Boolean);
    for(const src of sources){
      if(src.startsWith('assets/'))assert.ok(existsSync(src),id+' missing '+src);
    }
  }
  assert.equal(manifest.staleDeadBindingAudit.productionStaleSlotIds,0);
  assert.equal(manifest.staleDeadBindingAudit.missingProductionSources,0);
});

test('selected presentation source manifests contain no dead semantic ID or missing local source',()=>{
  for(const path of manifest.staleDeadBindingAudit.selectedManifests){
    const value=JSON.parse(readFileSync(path,'utf8'));
    for(const id of collect(value,'presentationId')){
      if(typeof id==='string')assert.ok(registry.has(id),path+' stale presentationId '+id);
    }
    const candidatePaths=[
      ...collect(value,'sourceAsset'),
      ...collect(value,'staticFallback'),
      ...collect(value,'src'),
      ...collect(value,'frame'),
      ...collect(value,'frames').flatMap((entry:any)=>Array.isArray(entry)?entry:[])
    ];
    for(const src of candidatePaths){
      if(typeof src==='string'&&src.startsWith('assets/'))assert.ok(existsSync(src),path+' missing '+src);
    }
  }
  assert.equal(manifest.staleDeadBindingAudit.selectedManifestStalePresentationIds,0);
  assert.equal(manifest.staleDeadBindingAudit.missingManifestSources,0);
});

test('invalid presentation fallback targets and cycles are rejected',()=>{
  const unknown={
    version:1,texts:{},media:{},
    slots:{'school/arcana/lesson/default':{fallbackId:'school/not-a-real-course/lesson/default'}}
  };
  assert.throws(()=>applyPresentation(catalog,unknown),/fallback presentationId|Неизвестный fallback/);

  const cycle={
    version:1,texts:{},media:{},
    slots:{
      'school/arcana/lesson/default':{fallbackId:'school/literacy-and-numbers/lesson/default'},
      'school/literacy-and-numbers/lesson/default':{fallbackId:'school/arcana/lesson/default'}
    }
  };
  assert.throws(()=>applyPresentation(catalog,cycle),/Цикл presentation fallback|fallback/);
  assert.equal(manifest.staleDeadBindingAudit.invalidFallbackChainsAccepted,0);
});

test('unknown requested semantic ID resolves only through explicit safe fallback diagnostics',()=>{
  const checked=applyPresentation(catalog,presentation);
  const resolved=resolvePresentation(checked,presentation,'queue-v9/not-a-live-id',{animationsEnabled:false,occurrenceKey:'stale-v9'});
  assert.equal(resolved.requestedId,'queue-v9/not-a-live-id');
  assert.equal(resolved.selected?.slotId,'location/town/default');
  assert.ok(resolved.diagnostics.length>0);
  assert.equal(resolved.textOnly,false);
});
