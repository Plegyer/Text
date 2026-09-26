import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const fixture=json('content/presentation-replacement-conflict.fixture.json');
const shipped=json('content/presentation-shipped-main-delta.fixture.json');

const known=new Set<string>(shipped.rows.map((row:any)=>row.presentationId));

function validateMedia(media:any){
  if(!media)return;
  if(!media.alt?.trim())throw new Error('missing alt');
  if(media.kind==='gif'&&!/^media\/[a-zA-Z0-9/_-]+\.gif$/.test(media.ref)){
    throw new Error('kind/source mismatch');
  }
  if(media.kind==='image'&&!/^(?:media|assets)\/[a-zA-Z0-9/_-]+\.(?:svg|png|jpg|jpeg|webp)$/.test(media.ref)){
    throw new Error('kind/source mismatch');
  }
}

function preflight(entries:any[]){
  const seen=new Set<string>();
  const staged:any[]=[];
  const quarantined:any[]=[];

  for(const entry of entries){
    if(seen.has(entry.presentationId))throw new Error('duplicate presentationId');
    seen.add(entry.presentationId);

    if(!known.has(entry.presentationId)){
      quarantined.push(entry);
      continue;
    }

    validateMedia(entry.primary);
    validateMedia(entry.static);
    if(!entry.primary&&!entry.static)throw new Error('empty replacement');
    staged.push(entry);
  }
  return {staged,quarantined};
}

test('matrix covers every required shipped-catalog conflict class',()=>{
  assert.deepEqual(
    new Set(fixture.cases.map((row:any)=>row.caseId)),
    new Set([
      'existing-static-plus-future-gif',
      'duplicate-semantic-id',
      'unknown-semantic-id',
      'asset-kind-source-mismatch',
      'existing-ending-slot',
      'existing-school-slot',
      'stale-removed-slot'
    ])
  );
});

test('existing shipped slots accept staged presentation-only overrides',()=>{
  for(const id of [
    'existing-static-plus-future-gif',
    'existing-ending-slot',
    'existing-school-slot'
  ]){
    const row=fixture.cases.find((x:any)=>x.caseId===id);
    const result=preflight(row.entries);
    assert.equal(result.staged.length,1,id);
    assert.equal(result.quarantined.length,0,id);
    assert.equal(row.expected,'accept-staged');
  }
});

test('duplicate semantic IDs reject deterministically',()=>{
  const row=fixture.cases.find((x:any)=>x.caseId==='duplicate-semantic-id');
  assert.throws(()=>preflight(row.entries),/duplicate presentationId/);
  assert.equal(row.expected,'reject');
});

test('unknown and stale removed semantic IDs quarantine without guessing',()=>{
  for(const id of ['unknown-semantic-id','stale-removed-slot']){
    const row=fixture.cases.find((x:any)=>x.caseId===id);
    const result=preflight(row.entries);
    assert.equal(result.staged.length,0,id);
    assert.equal(result.quarantined.length,1,id);
    assert.equal(row.expected,'quarantine');
  }
});

test('asset kind/source mismatch rejects before staging',()=>{
  const row=fixture.cases.find((x:any)=>x.caseId==='asset-kind-source-mismatch');
  assert.throws(()=>preflight(row.entries),/kind\/source mismatch/);
  assert.equal(row.expected,'reject');
});

test('ending and School override targets are proven shipped semantic slots',()=>{
  assert.ok(known.has('ending/lumber/hard-work'));
  assert.ok(known.has('school/arcana/lesson/default'));
  assert.equal(known.has('school/removed-course/lesson/default'),false);
});
