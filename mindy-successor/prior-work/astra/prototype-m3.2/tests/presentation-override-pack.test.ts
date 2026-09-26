import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

type MediaRef={
  kind:'gif'|'image';
  ref:string;
  alt:string;
};
type OverrideEntry={
  primary?:MediaRef;
  static?:MediaRef;
};
type OverridePack={
  format:'portal-life.presentation-override-pack';
  formatVersion:1;
  presentationSchemaVersion:1;
  metadata:{packId:string;name:string;description?:string};
  activationPolicy:{
    mode:'atomic';
    unknownPresentationId:'quarantine'|'reject-pack';
    invalidEntry:'reject-pack';
  };
  entries:Record<string,OverrideEntry>;
};
type Registry={entries:{presentationId:string}[]};

const base=JSON.parse(readFileSync('content/presentation-override-pack.fixture.json','utf8')) as OverridePack;
const registry=JSON.parse(readFileSync('content/presentation-target-registry.fixture.json','utf8')) as Registry;
const knownIds=new Set(registry.entries.map(entry=>entry.presentationId));
const clone=():OverridePack=>structuredClone(base);

const portableRef=/^media\/[a-zA-Z0-9][a-zA-Z0-9/_-]*\.(?:gif|png|jpe?g|webp)$/;

function validateEntry(entry:OverrideEntry){
  if(!entry.primary&&!entry.static)throw new Error('override entry has no media');
  if(entry.primary){
    if(entry.primary.kind!=='gif'||!entry.primary.ref.toLowerCase().endsWith('.gif'))throw new Error('invalid primary GIF');
    if(!portableRef.test(entry.primary.ref))throw new Error('non-portable primary ref');
    if(!entry.primary.alt.trim())throw new Error('missing primary alt');
  }
  if(entry.static){
    if(entry.static.kind!=='image'||!/[.](?:png|jpe?g|webp)$/i.test(entry.static.ref))throw new Error('invalid static media');
    if(!portableRef.test(entry.static.ref))throw new Error('non-portable static ref');
    if(!entry.static.alt.trim())throw new Error('missing static alt');
  }
}

function stageImport(pack:OverridePack,known:Set<string>){
  if(pack.format!=='portal-life.presentation-override-pack'||pack.formatVersion!==1||pack.presentationSchemaVersion!==1)throw new Error('unsupported pack version');
  const staged:Record<string,OverrideEntry>={};
  const quarantined:Record<string,OverrideEntry>={};
  for(const [id,entry] of Object.entries(pack.entries)){
    if(!known.has(id)){
      if(pack.activationPolicy.unknownPresentationId==='reject-pack')throw new Error(`unknown presentationId: ${id}`);
      quarantined[id]=structuredClone(entry);
      continue;
    }
    validateEntry(entry);
    staged[id]=structuredClone(entry);
  }
  return {staged,quarantined};
}

function activateAtomically(
  previous:Record<string,OverrideEntry>,
  candidate:OverridePack,
  known:Set<string>
){
  try{
    const staged=stageImport(candidate,known);
    return {active:staged.staged,quarantined:staged.quarantined,activated:true};
  }catch(error){
    return {active:structuredClone(previous),quarantined:{},activated:false,error};
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

test('portable override pack is keyed by known semantic presentationId',()=>{
  assert.equal(base.format,'portal-life.presentation-override-pack');
  assert.equal(base.formatVersion,1);
  assert.equal(base.presentationSchemaVersion,1);
  for(const [id,entry] of Object.entries(base.entries)){
    assert.ok(knownIds.has(id),id);
    assert.match(id,/^(?:location|job|school|relationship|night|activity|ending)\//);
    validateEntry(entry);
  }
});

test('media references are package-relative and do not select a desktop filesystem location',()=>{
  for(const entry of Object.values(base.entries)){
    for(const media of [entry.primary,entry.static]){
      if(!media)continue;
      assert.match(media.ref,portableRef);
      assert.doesNotMatch(media.ref,/(?:^[A-Za-z]:[\\/]|^\/|\.\.|file:|https?:)/i);
    }
  }
});

test('unknown presentation IDs are quarantined and never guessed',()=>{
  const candidate=clone();
  candidate.entries['job/lumber/event/unknown-future/default']={
    primary:{kind:'gif',ref:'media/unknown.gif',alt:'Unknown future scene'}
  };
  const result=stageImport(candidate,knownIds);
  assert.equal(result.staged['job/lumber/event/unknown-future/default'],undefined);
  assert.ok(result.quarantined['job/lumber/event/unknown-future/default']);
  assert.equal(Object.keys(result.staged).length,Object.keys(base.entries).length);
});

test('strict unknown-ID policy rejects instead of rebinding',()=>{
  const candidate=clone();
  candidate.activationPolicy.unknownPresentationId='reject-pack';
  candidate.entries['relationship/unknown/moment/default']={
    primary:{kind:'gif',ref:'media/unknown.gif',alt:'Unknown relationship scene'}
  };
  assert.throws(()=>stageImport(candidate,knownIds),/unknown presentationId/);
});

test('invalid known entry preserves the previous active override set atomically',()=>{
  const previous=structuredClone(base.entries);
  const candidate=clone();
  candidate.entries['job/lumber/shift/spring/default']={
    primary:{kind:'gif',ref:'../escape.gif',alt:'Invalid path'}
  };
  const result=activateAtomically(previous,candidate,knownIds);
  assert.equal(result.activated,false);
  assert.deepEqual(result.active,previous);
});

test('valid known entries activate as one presentation transaction',()=>{
  const previous:Record<string,OverrideEntry>={};
  const result=activateAtomically(previous,base,knownIds);
  assert.equal(result.activated,true);
  assert.deepEqual(result.active,base.entries);
  assert.deepEqual(result.quarantined,{});
  assert.equal(base.activationPolicy.mode,'atomic');
});

test('override pack contains no life-save, mechanics, RNG or animation-frame state',()=>{
  const keys=collectKeys(base);
  for(const forbidden of [
    'save','lifesave','run','metrics','inventory','energy','money','rng','seed',
    'pending','eventid','variantid','conditions','condition','effects','effect',
    'transition','cost','reward','delta','frame','currentframe','loopcount',
    'elapsed','duration','playbacktimestamp'
  ])assert.equal(keys.has(forbidden),false,forbidden);
});

test('pack versioning is presentation-specific and independent from life-save schemas',()=>{
  assert.equal(typeof base.formatVersion,'number');
  assert.equal(typeof base.presentationSchemaVersion,'number');
  const keys=collectKeys(base);
  assert.equal(keys.has('saveversion'),false);
  assert.equal(keys.has('lifesaveversion'),false);
  assert.equal(keys.has('saveschemaversion'),false);
});
