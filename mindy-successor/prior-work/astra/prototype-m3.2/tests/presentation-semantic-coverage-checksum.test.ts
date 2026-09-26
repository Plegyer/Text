import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';

const fixture=JSON.parse(
  readFileSync('content/presentation-semantic-coverage-checksum.fixture.json','utf8')
);

function canonicalIds(entries:{presentationId:string}[]){
  const ids=entries.map(entry=>entry.presentationId);
  if(new Set(ids).size!==ids.length)throw new Error('duplicate presentationId');
  return [...ids].sort((a,b)=>a.localeCompare(b));
}

function checksum(entries:{presentationId:string}[]){
  return createHash('sha256')
    .update(canonicalIds(entries).join('\n'),'utf8')
    .digest('hex');
}

test('RC semantic manifest has 26 unique slash semantic IDs in stable order',()=>{
  assert.equal(fixture.entries.length,fixture.entryCount);
  assert.equal(fixture.entryCount,26);
  const ids=canonicalIds(fixture.entries);
  assert.equal(ids.length,new Set(ids).size);
  for(const id of ids)assert.match(id,/^[a-z0-9-]+(?:\/[a-z0-9-]+)+$/);
});

test('checksum matches the canonical production RC semantic ID set',()=>{
  assert.equal(checksum(fixture.entries),fixture.checksum);
  assert.equal(
    fixture.checksum,
    '3cb5536054688b1beeb3adc7868f76bb76ae784159394bc0d923e5742113a499'
  );
});

test('fixture enumeration order cannot change the checksum',()=>{
  const original=checksum(fixture.entries);
  const reversed=checksum([...fixture.entries].reverse());
  const rotated=checksum([...fixture.entries.slice(7),...fixture.entries.slice(0,7)]);
  assert.equal(reversed,original);
  assert.equal(rotated,original);
});

test('gameplay identity mapping is unique and semantic IDs are not silently renamed',()=>{
  const gameplayKeys=fixture.entries.map((entry:any)=>entry.gameplayIdentity);
  assert.equal(new Set(gameplayKeys).size,gameplayKeys.length);

  const required=new Map(fixture.entries.map((entry:any)=>[entry.gameplayIdentity,entry.presentationId]));
  assert.equal(required.get('action-result:lumber.shift'),'job/lumber/result/default');
  assert.equal(required.get('event:lumber.career-first-shift:default'),'job/lumber/event/lumber-career-first-shift/default');
  assert.equal(required.get('course:school.course.field_craft'),'school/field-craft/lesson/default');
  assert.equal(required.get('activity:forest:route'),'activity/forest/route/default');
  assert.equal(required.get('ending:ending.lumber.hard-work'),'ending/lumber/hard-work');
});

test('future GIF filename changes never affect semantic coverage checksum',()=>{
  const before=checksum(fixture.entries);
  const mutatedMedia=fixture.optionalFutureMedia.map((row:any,index:number)=>({
    ...row,
    logicalFilename:`media/replacement-${index}.gif`
  }));
  assert.notDeepEqual(mutatedMedia,fixture.optionalFutureMedia);
  assert.equal(checksum(fixture.entries),before);
});

test('optional future media only references IDs already present in semantic manifest',()=>{
  const ids=new Set(fixture.entries.map((entry:any)=>entry.presentationId));
  for(const row of fixture.optionalFutureMedia){
    assert.ok(ids.has(row.presentationId),row.presentationId);
    assert.match(row.logicalFilename,/^media\/.*\.gif$/);
  }
});
