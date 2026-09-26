import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const bundle=json('content/presentation-replacement-bundle.fixture.json');

type Entry=[string,unknown];

function canonicalize(entries:Entry[]){
  const seen=new Set<string>();
  const normalized:Entry[]=[];
  for(const [id,value] of entries){
    if(seen.has(id))throw new Error('duplicate presentationId: '+id);
    seen.add(id);
    normalized.push([id,structuredClone(value)]);
  }
  normalized.sort(([a],[b])=>a.localeCompare(b));
  return normalized;
}

function stableExport(entries:Entry[]){
  return JSON.stringify(Object.fromEntries(canonicalize(entries)));
}

const entries=Object.entries(bundle.replacements) as Entry[];

test('canonical ordering is independent from source enumeration order',()=>{
  const forward=canonicalize(entries);
  const reverse=canonicalize([...entries].reverse());
  const rotated=canonicalize([...entries.slice(2),...entries.slice(0,2)]);

  assert.deepEqual(reverse,forward);
  assert.deepEqual(rotated,forward);
});

test('duplicate semantic IDs reject instead of selecting a later winner',()=>{
  const duplicate:Entry=[entries[0]![0],structuredClone(entries.at(-1)![1])];
  assert.throws(
    ()=>canonicalize([...entries,duplicate]),
    /duplicate presentationId/
  );
});

test('later file enumeration order cannot silently change replacement payload winner',()=>{
  const id=entries[0]![0];
  const original=entries[0]![1];
  const conflicting={
    futureGif:{
      logicalTargetName:'media/conflicting.gif',
      declaredMediaId:'conflicting.media.id'
    },
    currentFallback:{mediaId:'stage.town',assetPath:'assets/stage-town.svg'},
    staticFallbackMandatory:true,
    textFallbackAvailable:true
  };

  assert.throws(
    ()=>canonicalize([[id,original],[id,conflicting]]),
    /duplicate presentationId/
  );
  assert.throws(
    ()=>canonicalize([[id,conflicting],[id,original]]),
    /duplicate presentationId/
  );
});

test('stable export order is byte-identical across input permutations',()=>{
  const expected=stableExport(entries);
  assert.equal(stableExport([...entries].reverse()),expected);
  assert.equal(
    stableExport([...entries.slice(1),entries[0]!]),
    expected
  );
});

test('canonical export preserves semantic IDs and replacement payloads exactly',()=>{
  const sorted=canonicalize(entries);
  const exported=JSON.parse(stableExport(entries));

  assert.deepEqual(
    Object.keys(exported),
    sorted.map(([id])=>id)
  );
  for(const [id,value] of entries){
    assert.deepEqual(exported[id],value,id);
  }
});
