import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const current=json('content/presentation-replacement-bundle.fixture.json');
const plan=json('content/presentation-production-patch-plan.fixture.json');
const knownIds=new Set<string>(plan.slots.map((slot:any)=>slot.presentationId));

type V0Entry={
  presentationId:string;
  fallbackMediaId:string;
  fallbackAssetPath:string;
  futureGifTarget:string;
  declaredMediaId:string;
};
type V0={
  format:'portal-life.presentation-replacement-bundle';
  formatVersion:0;
  presentationSchemaVersion:1;
  metadata:{bundleId:string;name:string};
  entries:V0Entry[];
};

function v0FromCurrent():V0{
  return {
    format:'portal-life.presentation-replacement-bundle',
    formatVersion:0,
    presentationSchemaVersion:1,
    metadata:structuredClone(current.metadata),
    entries:Object.entries(current.replacements).map(([presentationId,value]:[string,any])=>({
      presentationId,
      fallbackMediaId:value.currentFallback.mediaId,
      fallbackAssetPath:value.currentFallback.assetPath,
      futureGifTarget:value.futureGif.logicalTargetName,
      declaredMediaId:value.futureGif.declaredMediaId
    }))
  };
}

function migrate(input:any){
  if(input.format!=='portal-life.presentation-replacement-bundle')throw new Error('unsupported format');
  if(input.formatVersion>1)throw new Error('unsupported future version');
  if(input.formatVersion===1){
    return {bundle:structuredClone(input),orphans:[] as {presentationId:string;reason:string}[]};
  }
  if(input.formatVersion!==0)throw new Error('unsupported version');
  if(input.presentationSchemaVersion!==1)throw new Error('unsupported presentation schema');

  const replacements:Record<string,any>={};
  const orphans:{presentationId:string;reason:string}[]=[];

  for(const entry of input.entries as V0Entry[]){
    if(!knownIds.has(entry.presentationId)){
      orphans.push({
        presentationId:entry.presentationId,
        reason:'unknown-semantic-presentation-id'
      });
      continue;
    }
    if(!entry.futureGifTarget.startsWith('media/'))throw new Error('invalid future GIF target');
    if(!entry.fallbackAssetPath.startsWith('assets/'))throw new Error('invalid fallback asset path');

    replacements[entry.presentationId]={
      currentFallback:{
        mediaId:entry.fallbackMediaId,
        assetPath:entry.fallbackAssetPath
      },
      futureGif:{
        logicalTargetName:entry.futureGifTarget,
        declaredMediaId:entry.declaredMediaId
      },
      staticFallbackMandatory:true,
      textFallbackAvailable:true
    };
  }

  return {
    bundle:{
      format:'portal-life.presentation-replacement-bundle',
      formatVersion:1,
      presentationSchemaVersion:1,
      metadata:structuredClone(input.metadata),
      preflightPolicy:{
        duplicatePresentationId:'reject',
        unknownPresentationId:'quarantine',
        activation:'atomic'
      },
      replacements
    },
    orphans
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

test('v0 -> v1 preserves every known semantic presentationId exactly',()=>{
  const source=v0FromCurrent();
  const result=migrate(source);
  assert.deepEqual(result.orphans,[]);
  assert.deepEqual(
    Object.keys(result.bundle.replacements).sort(),
    source.entries.map(entry=>entry.presentationId).sort()
  );
  assert.deepEqual(
    new Set(Object.keys(result.bundle.replacements)),
    new Set(Object.keys(current.replacements))
  );
});

test('v0 media and fallback payload converts structurally without semantic renames',()=>{
  const source=v0FromCurrent();
  const result=migrate(source);

  for(const entry of source.entries){
    const migrated=result.bundle.replacements[entry.presentationId];
    assert.ok(migrated,entry.presentationId);
    assert.equal(migrated.currentFallback.mediaId,entry.fallbackMediaId);
    assert.equal(migrated.currentFallback.assetPath,entry.fallbackAssetPath);
    assert.equal(migrated.futureGif.logicalTargetName,entry.futureGifTarget);
    assert.equal(migrated.futureGif.declaredMediaId,entry.declaredMediaId);
  }
});

test('dotted-vs-slash lookalike is orphaned and never normalized',()=>{
  const source=v0FromCurrent();
  const canonical=source.entries[0]!;
  source.entries.push({
    ...canonical,
    presentationId:canonical.presentationId.replaceAll('/','.')
  });
  const result=migrate(source);
  assert.equal(result.orphans.length,1);
  assert.equal(result.orphans[0]!.presentationId,canonical.presentationId.replaceAll('/','.'));
  assert.equal(result.bundle.replacements[canonical.presentationId.replaceAll('/','.')],undefined);
});

test('School underscore-vs-kebab lookalike is orphaned and never normalized',()=>{
  const source=v0FromCurrent();
  source.entries.push({
    presentationId:'school/literacy_and_numbers/lesson/default',
    fallbackMediaId:'stage.town',
    fallbackAssetPath:'assets/stage-town.svg',
    futureGifTarget:'media/school/literacy.gif',
    declaredMediaId:'future.school.literacy'
  });
  const result=migrate(source);
  assert.ok(result.orphans.some((item:any)=>item.presentationId==='school/literacy_and_numbers/lesson/default'));
  assert.equal(result.bundle.replacements['school/literacy-and-numbers/lesson/default'],undefined);
});

test('unknown old semantic ID is explicitly orphaned, not guessed',()=>{
  const source=v0FromCurrent();
  source.entries.push({
    presentationId:'job/lumber/shift/unknown/default',
    fallbackMediaId:'stage.lumber',
    fallbackAssetPath:'assets/stage-lumber.svg',
    futureGifTarget:'media/lumber/unknown.gif',
    declaredMediaId:'future.unknown'
  });
  const result=migrate(source);
  assert.ok(result.orphans.some((item:any)=>item.presentationId==='job/lumber/shift/unknown/default'));
});

test('unsupported future bundle versions reject',()=>{
  const future={...structuredClone(current),formatVersion:2};
  assert.throws(()=>migrate(future),/unsupported future version/);
});

test('migration payload contains no life-save or gameplay state',()=>{
  const result=migrate(v0FromCurrent());
  const keys=collectKeys(result.bundle);
  for(const forbidden of [
    'saveversion','saveschemaversion','run','eventid','variantid','courseid',
    'endingid','rng','energy','money','inventory','stats','conditions',
    'effects','transition','reward','delta'
  ])assert.equal(keys.has(forbidden),false,forbidden);
});
