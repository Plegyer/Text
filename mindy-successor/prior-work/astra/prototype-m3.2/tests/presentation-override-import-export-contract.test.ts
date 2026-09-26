import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

type MediaRef={ref:string;alt:string};
type PortableReplacement={
  primaryGif?:MediaRef;
  static?:MediaRef;
};
type Payload={
  format:'portal-life.presentation-override-portable';
  formatVersion:1;
  presentationSchemaVersion:1;
  metadata:{bundleId:string;name:string};
  policy:{
    activation:'atomic';
    unknownPresentationId:'quarantine'|'reject';
  };
  replacements:Record<string,PortableReplacement>;
};

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const sourceBundle=json('content/presentation-replacement-bundle.fixture.json');
const patchPlan=json('content/presentation-production-patch-plan.fixture.json');
const knownIds=new Set<string>(patchPlan.slots.map((slot:any)=>slot.presentationId));
const portableRef=/^media\/[a-zA-Z0-9][a-zA-Z0-9/_-]*\.(?:gif|png|jpe?g|webp)$/;

function sourcePayload():Payload{
  return {
    format:'portal-life.presentation-override-portable',
    formatVersion:1,
    presentationSchemaVersion:1,
    metadata:{
      bundleId:sourceBundle.metadata.bundleId,
      name:sourceBundle.metadata.name
    },
    policy:{
      activation:'atomic',
      unknownPresentationId:'quarantine'
    },
    replacements:Object.fromEntries(
      Object.entries(sourceBundle.replacements).map(([presentationId,value]:[string,any])=>[
        presentationId,
        {
          primaryGif:{
            ref:value.futureGif.logicalTargetName,
            alt:presentationId
          }
        }
      ])
    )
  };
}

function tuples(payload:Payload):[string,PortableReplacement][]{
  return Object.entries(payload.replacements).map(([id,value])=>[id,structuredClone(value)]);
}

function validateMedia(media:MediaRef|undefined,label:string){
  if(!media)return;
  if(!media.alt.trim())throw new Error('missing alt: '+label);
  if(!portableRef.test(media.ref))throw new Error('non-portable ref: '+label);
  if(/(?:^[A-Za-z]:[\\/]|^\/|\.\.|file:|https?:|Users\/|home\/)/i.test(media.ref)){
    throw new Error('absolute or external ref: '+label);
  }
}

function preflight(payload:Payload,entries:[string,PortableReplacement][]=tuples(payload)){
  if(payload.format!=='portal-life.presentation-override-portable')throw new Error('unsupported format');
  if(payload.formatVersion!==1||payload.presentationSchemaVersion!==1)throw new Error('unsupported version');

  const seen=new Set<string>();
  const staged:Record<string,PortableReplacement>={};
  const quarantined:Record<string,PortableReplacement>={};

  for(const [presentationId,replacement] of entries){
    if(seen.has(presentationId))throw new Error('duplicate presentationId: '+presentationId);
    seen.add(presentationId);

    if(!knownIds.has(presentationId)){
      if(payload.policy.unknownPresentationId==='reject')throw new Error('unknown presentationId: '+presentationId);
      quarantined[presentationId]=structuredClone(replacement);
      continue;
    }

    if(!replacement.primaryGif&&!replacement.static)throw new Error('replacement has no media: '+presentationId);
    validateMedia(replacement.primaryGif,presentationId+' primaryGif');
    validateMedia(replacement.static,presentationId+' static');
    staged[presentationId]=structuredClone(replacement);
  }

  return {staged,quarantined};
}

function activateAtomic(
  previous:Record<string,PortableReplacement>,
  payload:Payload,
  entries:[string,PortableReplacement][]=tuples(payload)
){
  try{
    const result=preflight(payload,entries);
    return {activated:true,active:result.staged,quarantined:result.quarantined};
  }catch(error){
    return {activated:false,active:structuredClone(previous),quarantined:{},error};
  }
}

function normalize(payload:Payload):Payload{
  return {
    ...structuredClone(payload),
    replacements:Object.fromEntries(
      Object.entries(payload.replacements)
        .sort(([a],[b])=>a.localeCompare(b))
        .map(([id,value])=>[id,value])
    )
  };
}

function exportPayload(payload:Payload){
  const checked=preflight(payload);
  assert.deepEqual(checked.quarantined,{});
  return JSON.stringify(normalize(payload));
}

function importPayload(serialized:string){
  const parsed=JSON.parse(serialized) as Payload;
  const checked=preflight(parsed);
  return {
    payload:normalize({
      ...parsed,
      replacements:checked.staged
    }),
    quarantined:checked.quarantined
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

test('portable override payload is presentation-versioned independently from life saves',()=>{
  const payload=sourcePayload();
  assert.equal(payload.formatVersion,1);
  assert.equal(payload.presentationSchemaVersion,1);
  const keys=collectKeys(payload);
  assert.equal(keys.has('saveversion'),false);
  assert.equal(keys.has('lifesaveversion'),false);
  assert.equal(keys.has('saveschemaversion'),false);
});

test('all exported media refs are portable and semantic keys are exact presentation IDs',()=>{
  const payload=sourcePayload();
  const result=preflight(payload);
  assert.deepEqual(result.quarantined,{});

  for(const [presentationId,replacement] of Object.entries(result.staged)){
    assert.ok(knownIds.has(presentationId),presentationId);
    assert.match(presentationId,/^[a-z0-9-]+(?:\/[a-z0-9-]+)+$/);
    validateMedia(replacement.primaryGif,presentationId);
    validateMedia(replacement.static,presentationId);
  }
});

test('duplicates reject and unknown slots quarantine or reject without guessing',()=>{
  const payload=sourcePayload();
  const entries=tuples(payload);
  entries.push([entries[0]![0],structuredClone(entries[0]![1])]);
  assert.throws(()=>preflight(payload,entries),/duplicate presentationId/);

  const unknown:[string,PortableReplacement]=[
    'school/unknown/lesson/default',
    {primaryGif:{ref:'media/unknown.gif',alt:'Unknown'}}
  ];
  const quarantined=preflight(payload,[...tuples(payload),unknown]);
  assert.equal(quarantined.staged[unknown[0]],undefined);
  assert.ok(quarantined.quarantined[unknown[0]]);

  const strict=structuredClone(payload);
  strict.policy.unknownPresentationId='reject';
  assert.throws(()=>preflight(strict,[...tuples(strict),unknown]),/unknown presentationId/);
});

test('invalid known entry keeps previous active set unchanged atomically',()=>{
  const payload=sourcePayload();
  const previous={
    'job/lumber/result/default':{
      static:{ref:'media/previous.webp',alt:'Previous'}
    }
  };
  const entries=tuples(payload);
  const first=entries[0]!;
  entries[0]=[
    first[0],
    {primaryGif:{ref:'../escape.gif',alt:'Invalid'}}
  ];

  const result=activateAtomic(previous,payload,entries);
  assert.equal(result.activated,false);
  assert.deepEqual(result.active,previous);
});

test('deterministic export/import round trip preserves semantic identity exactly',()=>{
  const payload=sourcePayload();
  const exportedA=exportPayload(payload);
  const exportedB=exportPayload(structuredClone(payload));
  assert.equal(exportedA,exportedB);

  const imported=importPayload(exportedA);
  assert.deepEqual(imported.quarantined,{});
  assert.deepEqual(imported.payload,normalize(payload));
  assert.deepEqual(
    Object.keys(imported.payload.replacements),
    Object.keys(normalize(payload).replacements)
  );
});

test('portable payload contains no gameplay, RNG, Energy, or save-state data',()=>{
  const keys=collectKeys(sourcePayload());
  for(const forbidden of [
    'eventid','variantid','courseid','endingid','conditions','condition',
    'effects','effect','rng','random','energy','money','inventory','stats',
    'transition','reward','delta','run','save','state','frame','elapsed',
    'loopcount','playbacktimestamp'
  ])assert.equal(keys.has(forbidden),false,forbidden);
});
