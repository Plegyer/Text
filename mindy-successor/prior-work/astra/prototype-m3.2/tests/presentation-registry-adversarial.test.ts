import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

type MediaRef={
  kind:'gif'|'image';
  assetRef:string|null;
  status:'assigned'|'missing-intentional';
};
type Entry={
  presentationId:string;
  family:string;
  primary:MediaRef;
  staticFallback:MediaRef|null;
  fallbackId:string|null;
  textFallback:string;
};
type Registry={
  version:1;
  kind:'target-presentation-registry-fixture';
  status:'isolated-test-fixture';
  policy:{
    primaryKind:'gif';
    missingAsset:'fallback-then-text-non-fatal';
    mechanicsDataAllowed:false;
  };
  entries:Entry[];
};

const base=JSON.parse(readFileSync('content/presentation-target-registry.fixture.json','utf8')) as Registry;
const clone=():Registry=>structuredClone(base);

function validateRegistry(registry:Registry){
  const byId=new Map<string,Entry>();
  for(const entry of registry.entries){
    if(byId.has(entry.presentationId))throw new Error(`duplicate presentationId: ${entry.presentationId}`);
    byId.set(entry.presentationId,entry);
  }
  for(const entry of registry.entries){
    if(entry.fallbackId&&!byId.has(entry.fallbackId))throw new Error(`missing fallback target: ${entry.fallbackId}`);
  }
  const state=new Map<string,0|1|2>();
  const visit=(id:string,trail:string[])=>{
    const mark=state.get(id)??0;
    if(mark===1)throw new Error(`fallback cycle: ${[...trail,id].join(' -> ')}`);
    if(mark===2)return;
    state.set(id,1);
    const next=byId.get(id)?.fallbackId;
    if(next)visit(next,[...trail,id]);
    state.set(id,2);
  };
  for(const id of byId.keys())visit(id,[]);
  return byId;
}

function resolveAnimationOff(registry:Registry,startId:string){
  const byId=validateRegistry(registry);
  let current=byId.get(startId);
  const seen=new Set<string>();
  let requestedText='';
  while(current&&!seen.has(current.presentationId)){
    seen.add(current.presentationId);
    if(!requestedText&&current.textFallback)requestedText=current.textFallback;
    if(current.staticFallback?.assetRef){
      return {
        mode:'static' as const,
        requestedId:startId,
        resolvedId:current.presentationId,
        assetRef:current.staticFallback.assetRef
      };
    }
    current=current.fallbackId?byId.get(current.fallbackId):undefined;
  }
  return {
    mode:'text' as const,
    requestedId:startId,
    resolvedId:startId,
    text:requestedText||'Сцена доступна без медиа.'
  };
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

test('duplicate semantic presentation IDs are rejected',()=>{
  const fixture=clone();
  fixture.entries.push(structuredClone(fixture.entries[0]!));
  assert.throws(()=>validateRegistry(fixture),/duplicate presentationId/);
});

test('fallback to a missing semantic target is rejected',()=>{
  const fixture=clone();
  fixture.entries.find(entry=>entry.presentationId==='job/lumber/result/default')!.fallbackId='job/lumber/shift/missing/default';
  assert.throws(()=>validateRegistry(fixture),/missing fallback target/);
});

test('fallback cycle is rejected deterministically',()=>{
  const fixture=clone();
  const town=fixture.entries.find(entry=>entry.presentationId==='location/town/default')!;
  town.fallbackId='job/lumber/result/default';
  assert.throws(()=>validateRegistry(fixture),/fallback cycle/);
});

test('animation-off without same-slot static media reaches inherited static fallback',()=>{
  const resolved=resolveAnimationOff(base,'job/lumber/result/default');
  assert.equal(resolved.mode,'static');
  assert.equal(resolved.requestedId,'job/lumber/result/default');
  assert.equal(resolved.resolvedId,'job/lumber/shift/spring/default');
  assert.equal(resolved.assetRef,'fixture:lumber-shift-static');
});

test('animation-off without any static media remains safe through text fallback',()=>{
  const fixture=clone();
  for(const entry of fixture.entries)entry.staticFallback=null;
  const resolved=resolveAnimationOff(fixture,'activity/forest/encounter/default');
  assert.equal(resolved.mode,'text');
  assert.equal(resolved.requestedId,'activity/forest/encounter/default');
  assert.match(resolved.text,/Лесная встреча/);
});

test('registry remains presentation-only with no mechanics/effects/RNG/Energy fields',()=>{
  const keys=collectKeys(base.entries);
  for(const forbidden of [
    'condition','conditions','effect','effects','rng','random','energy','cost',
    'delta','reward','transition','command','writes','reads'
  ])assert.equal(keys.has(forbidden),false,forbidden);
  assert.equal(base.policy.mechanicsDataAllowed,false);
});

test('changing asset source never changes the semantic presentation ID',()=>{
  const fixture=clone();
  const before=fixture.entries.map(entry=>entry.presentationId);
  const target=fixture.entries.find(entry=>entry.presentationId==='job/lumber/shift/spring/default')!;
  target.primary.assetRef='fixture:replacement-lumber-shift-gif';
  target.staticFallback={kind:'image',assetRef:'fixture:replacement-lumber-shift-static',status:'assigned'};
  validateRegistry(fixture);
  assert.deepEqual(fixture.entries.map(entry=>entry.presentationId),before);
  assert.equal(target.presentationId,'job/lumber/shift/spring/default');
});
