import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

type MediaRef={kind:string;ref:string;alt:string};
type OverrideEntry={primary?:MediaRef;static?:MediaRef};
type Pack={
  format:string;
  formatVersion:number;
  presentationSchemaVersion:number;
  metadata:{packId:string;name:string};
  activationPolicy:{
    mode:'atomic';
    unknownPresentationId:'quarantine'|'reject-pack';
    invalidEntry:'reject-pack';
  };
  entries:Record<string,OverrideEntry>;
};
type RegistryEntry={
  presentationId:string;
  fallbackId?:string|null;
};
type Registry={entries:RegistryEntry[]};
type EntryTuple=[string,OverrideEntry];

const pack=JSON.parse(readFileSync('content/presentation-override-pack-preflight.fixture.json','utf8')) as Pack;
const registry=JSON.parse(readFileSync('content/presentation-target-registry.fixture.json','utf8')) as Registry;

const portableRef=/^media\/[a-zA-Z0-9][a-zA-Z0-9/_-]*\.(?:gif|png|jpe?g|webp)$/;

function validateRegistryGraph(input:Registry){
  const byId=new Map<string,RegistryEntry>();
  for(const entry of input.entries){
    if(byId.has(entry.presentationId))throw new Error(`duplicate registry presentationId: ${entry.presentationId}`);
    byId.set(entry.presentationId,entry);
  }
  for(const entry of input.entries){
    if(entry.fallbackId&&!byId.has(entry.fallbackId))throw new Error(`missing fallback target: ${entry.fallbackId}`);
  }
  const mark=new Map<string,0|1|2>();
  const visit=(id:string,trail:string[])=>{
    const state=mark.get(id)??0;
    if(state===1)throw new Error(`fallback cycle: ${[...trail,id].join(' -> ')}`);
    if(state===2)return;
    mark.set(id,1);
    const next=byId.get(id)?.fallbackId;
    if(next)visit(next,[...trail,id]);
    mark.set(id,2);
  };
  for(const id of byId.keys())visit(id,[]);
  return byId;
}

function validateMedia(entry:OverrideEntry){
  if(!entry.primary&&!entry.static)throw new Error('override entry has no media');
  if(entry.primary){
    if(entry.primary.kind!=='gif'||!entry.primary.ref.toLowerCase().endsWith('.gif'))throw new Error('invalid primary kind/source pairing');
    if(!portableRef.test(entry.primary.ref))throw new Error('invalid primary source');
    if(!entry.primary.alt.trim())throw new Error('missing primary alt');
  }
  if(entry.static){
    if(entry.static.kind!=='image'||!/[.](?:png|jpe?g|webp)$/i.test(entry.static.ref))throw new Error('invalid static kind/source pairing');
    if(!portableRef.test(entry.static.ref))throw new Error('invalid static source');
    if(!entry.static.alt.trim())throw new Error('missing static alt');
  }
}

function tuples(input:Pack):EntryTuple[]{
  return Object.entries(input.entries).map(([id,entry])=>[id,structuredClone(entry)]);
}

function preflight(input:Pack,entries:EntryTuple[],targetRegistry:Registry){
  if(input.format!=='portal-life.presentation-override-pack'||input.formatVersion!==1||input.presentationSchemaVersion!==1){
    throw new Error('unsupported presentation override pack version');
  }
  if(input.activationPolicy.mode!=='atomic')throw new Error('non-atomic activation policy');
  const known=validateRegistryGraph(targetRegistry);
  const seen=new Set<string>();
  const staged:Record<string,OverrideEntry>={};
  const quarantined:Record<string,OverrideEntry>={};

  for(const [presentationId,entry] of entries){
    if(seen.has(presentationId))throw new Error(`duplicate presentationId override: ${presentationId}`);
    seen.add(presentationId);

    if(!known.has(presentationId)){
      if(input.activationPolicy.unknownPresentationId==='reject-pack')throw new Error(`unknown presentationId: ${presentationId}`);
      quarantined[presentationId]=structuredClone(entry);
      continue;
    }

    validateMedia(entry);
    staged[presentationId]=structuredClone(entry);
  }
  return {staged,quarantined};
}

function activateAtomically(
  previous:Record<string,OverrideEntry>,
  input:Pack,
  entries:EntryTuple[],
  targetRegistry:Registry
){
  try{
    const result=preflight(input,entries,targetRegistry);
    return {activated:true,active:result.staged,quarantined:result.quarantined};
  }catch(error){
    return {activated:false,active:structuredClone(previous),quarantined:{},error};
  }
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

test('duplicate presentationId override is rejected before activation',()=>{
  const input=tuples(pack);
  input.push([input[0]![0],structuredClone(input[0]![1])]);
  assert.throws(()=>preflight(pack,input,registry),/duplicate presentationId override/);
});

test('unknown presentationId is quarantined or rejected before activation and is never guessed',()=>{
  const unknown:EntryTuple=[
    'job/lumber/event/unknown-future/default',
    {primary:{kind:'gif',ref:'media/unknown.gif',alt:'Unknown future scene'}}
  ];

  const quarantined=preflight(pack,[...tuples(pack),unknown],registry);
  assert.equal(quarantined.staged[unknown[0]],undefined);
  assert.ok(quarantined.quarantined[unknown[0]]);

  const strict=structuredClone(pack);
  strict.activationPolicy.unknownPresentationId='reject-pack';
  assert.throws(()=>preflight(strict,[...tuples(strict),unknown],registry),/unknown presentationId/);
});

test('target registry fallback must resolve to an existing presentationId',()=>{
  const broken=structuredClone(registry);
  broken.entries.find(entry=>entry.presentationId==='job/lumber/result/default')!.fallbackId='job/lumber/shift/missing/default';
  assert.throws(()=>preflight(pack,tuples(pack),broken),/missing fallback target/);
});

test('target registry fallback graph cycle is rejected',()=>{
  const broken=structuredClone(registry);
  const town=broken.entries.find(entry=>entry.presentationId==='location/town/default')!;
  town.fallbackId='job/lumber/result/default';
  assert.throws(()=>preflight(pack,tuples(pack),broken),/fallback cycle/);
});

test('invalid media kind/source pairing is rejected',()=>{
  const input=tuples(pack);
  const index=input.findIndex(([id])=>id==='job/lumber/shift/spring/default');
  input[index]=[
    input[index]![0],
    {primary:{kind:'gif',ref:'media/not-a-gif.png',alt:'Wrong pairing'}}
  ];
  assert.throws(()=>preflight(pack,input,registry),/invalid primary kind\/source pairing/);
});

test('atomic activation prevents partial application when one known entry is invalid',()=>{
  const previous={
    'location/town/default':{
      primary:{kind:'gif',ref:'media/previous-town.gif',alt:'Previous town'}
    }
  };
  const input=tuples(pack);
  const index=input.findIndex(([id])=>id==='school/field-craft/lesson/default');
  input[index]=[
    input[index]![0],
    {static:{kind:'gif',ref:'media/invalid-static.gif',alt:'Invalid static'}}
  ];

  const result=activateAtomically(previous,pack,input,registry);
  assert.equal(result.activated,false);
  assert.deepEqual(result.active,previous);
  assert.equal(result.active['job/lumber/shift/spring/default'],undefined);
});

test('changing asset source never changes semantic presentationId',()=>{
  const input=tuples(pack);
  const before=input.map(([id])=>id);
  const index=input.findIndex(([id])=>id==='job/lumber/shift/spring/default');
  input[index]=[
    input[index]![0],
    {
      ...input[index]![1],
      primary:{kind:'gif',ref:'media/replacement-lumber-shift.gif',alt:'Replacement Lumber shift'}
    }
  ];

  const result=preflight(pack,input,registry);
  assert.deepEqual(Object.keys(result.staged),before);
  assert.ok(result.staged['job/lumber/shift/spring/default']);
});

test('override pack contains no life-save or gameplay state payload',()=>{
  const keys=collectKeys(pack);
  for(const forbidden of [
    'save','lifesave','run','metrics','inventory','energy','money','rng','seed',
    'pending','eventid','variantid','conditions','condition','effects','effect',
    'transition','cost','reward','delta','career','relationshipstage','activitystate',
    'endingcommitment','metastate','currentframe','loopcount','elapsed','duration'
  ])assert.equal(keys.has(forbidden),false,forbidden);
});
