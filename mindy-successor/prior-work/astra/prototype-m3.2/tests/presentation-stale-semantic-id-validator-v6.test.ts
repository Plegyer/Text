import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

import {applyPresentation,presentationSchema,presentationSlots} from '../src/core/presentation.ts';
import {catalog} from './helpers.ts';

const presentation=JSON.parse(readFileSync('content/presentation.json','utf8'));
const v6=JSON.parse(readFileSync('content/presentation-drafts/presentation-wave-v6-source-manifest-v1.json','utf8'));
const manifestPaths=[
  'content/presentation-drafts/lumber-presentation-source-manifest-v1.json',
  'content/presentation-drafts/starter-school-presentation-source-manifest-v1.json',
  'content/presentation-drafts/late-career-presentation-source-manifest-v1.json',
  'content/presentation-drafts/cross-domain-presentation-source-manifest-v1.json',
  'content/presentation-drafts/presentation-wave-v6-source-manifest-v1.json'
];

function collectPresentationIds(value:any,out:string[]=[]):string[]{
  if(Array.isArray(value)){for(const item of value)collectPresentationIds(item,out);return out;}
  if(!value||typeof value!=='object')return out;
  if(typeof value.presentationId==='string')out.push(value.presentationId);
  for(const child of Object.values(value))collectPresentationIds(child,out);
  return out;
}
function collectSourceAssets(value:any,out:string[]=[]):string[]{
  if(Array.isArray(value)){for(const item of value)collectSourceAssets(item,out);return out;}
  if(!value||typeof value!=='object')return out;
  for(const key of ['sourceAsset','animationSource']){
    const candidate=value[key];
    if(typeof candidate==='string'&&candidate.startsWith('assets/'))out.push(candidate);
  }
  for(const child of Object.values(value))collectSourceAssets(child,out);
  return out;
}

test('production presentation overrides contain no dead semantic IDs',()=>{
  presentationSchema.parse(presentation);
  const registry=new Set(presentationSlots(catalog).map(slot=>slot.id));
  for(const id of Object.keys(presentation.slots??{}))assert.ok(registry.has(id),'dead production presentation ID '+id);
  assert.doesNotThrow(()=>applyPresentation(catalog,presentation));
});

test('active presentation source manifests contain no stale semantic IDs or missing project-owned sources',()=>{
  const registry=new Set(presentationSlots(catalog).map(slot=>slot.id));
  for(const path of manifestPaths){
    assert.ok(existsSync(path),path);
    const manifest=JSON.parse(readFileSync(path,'utf8'));
    const ids=collectPresentationIds(manifest);
    const unique=new Set(ids);
    assert.equal(unique.size,ids.length,path+' duplicate presentationId');
    for(const id of ids)assert.ok(registry.has(id),path+' stale presentationId '+id);
    for(const src of collectSourceAssets(manifest))assert.ok(existsSync(src),path+' missing source '+src);
  }
});

test('queue-v6 work and teacher identities point to current catalog identities',()=>{
  const actionIds=new Set(catalog.definitions.actions.map(action=>action.id));
  const mediaIds=new Set(catalog.media.map(media=>media.id));
  assert.equal(v6.workControls.length,10);
  assert.equal(v6.teacherMediaSurfaces.length,8);
  for(const entry of v6.workControls)assert.ok(actionIds.has(entry.actionId),'dead Work action '+entry.actionId);
  for(const entry of v6.teacherMediaSurfaces){
    assert.ok(mediaIds.has(entry.mediaId),'dead teacher media '+entry.mediaId);
    assert.ok(existsSync(entry.sourceAsset),'missing teacher source '+entry.sourceAsset);
  }
});

test('stale-ID validation is presentation-only and does not authorize gameplay deletion',()=>{
  assert.equal(v6.gameplayMutation,false);
  assert.equal(v6.invariants.existingSemanticIdsOnly,true);
  assert.equal(v6.invariants.noGameplayFieldsChanged,true);
  assert.equal(v6.invariants.noSaveOrRngMutation,true);
  assert.equal(v6.coveragePolicies.staleSemanticValidator.deleteGameplayIdentity,false);
});
