import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';

const fixture=JSON.parse(readFileSync('content/presentation-semantic-coverage-checksum.fixture.json','utf8'));

function canonicalIds(entries:{presentationId:string}[]){
  const ids=entries.map(entry=>entry.presentationId);
  if(new Set(ids).size!==ids.length)throw new Error('duplicate presentationId');
  return [...ids].sort((a,b)=>a.localeCompare(b));
}
function checksum(entries:{presentationId:string}[]){
  return createHash('sha256').update(canonicalIds(entries).join('\n'),'utf8').digest('hex');
}

test('merged PR24 RC manifest has 27 unique semantic IDs',()=>{
  assert.equal(fixture.entries.length,27);
  assert.equal(fixture.entryCount,27);
  for(const id of canonicalIds(fixture.entries))assert.match(id,/^[a-z0-9-]+(?:\/[a-z0-9-]+)+$/);
});

test('checksum matches canonical merged PR24 semantic set',()=>{
  assert.equal(checksum(fixture.entries),fixture.checksum);
  assert.equal(fixture.checksum,'352bc691a0201c656c84a1e67f76398496bee64035b307f149fe4205cf869ca8');
});

test('final School blocking scene is included in RC semantic coverage',()=>{
  const map=new Map(fixture.entries.map((entry:any)=>[entry.gameplayIdentity,entry.presentationId]));
  assert.equal(map.get('event:base.school:lesson'),'location/town/event/base-school/lesson');
});

test('enumeration order never changes checksum',()=>{
  const expected=checksum(fixture.entries);
  assert.equal(checksum([...fixture.entries].reverse()),expected);
  assert.equal(checksum([...fixture.entries.slice(9),...fixture.entries.slice(0,9)]),expected);
});

test('gameplay identities remain uniquely mapped without silent rename',()=>{
  const keys=fixture.entries.map((entry:any)=>entry.gameplayIdentity);
  assert.equal(new Set(keys).size,keys.length);
  const map=new Map(fixture.entries.map((entry:any)=>[entry.gameplayIdentity,entry.presentationId]));
  assert.equal(map.get('action-result:lumber.shift'),'job/lumber/result/default');
  assert.equal(map.get('activity:forest:route'),'activity/forest/route/default');
  assert.equal(map.get('ending:ending.lumber.hard-work'),'ending/lumber/hard-work');
});

test('future GIF filenames never affect semantic checksum',()=>{
  const before=checksum(fixture.entries);
  const changed=fixture.optionalFutureMedia.map((row:any,i:number)=>({...row,logicalFilename:`media/x-${i}.gif`}));
  assert.notDeepEqual(changed,fixture.optionalFutureMedia);
  assert.equal(checksum(fixture.entries),before);
});
