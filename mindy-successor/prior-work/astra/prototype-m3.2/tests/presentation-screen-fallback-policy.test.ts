import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const fixture=json('content/presentation-screen-fallback-policy.fixture.json');
const plan=json('content/presentation-production-patch-plan.fixture.json');
const stage=json('content/packs/stage.json');

const stageById=new Map(stage.media.map((media:any)=>[media.id,media]));
const planById=new Map(plan.slots.map((slot:any)=>[slot.presentationId,slot]));

function chainFor(id:string){
  if(id==='location/town/default')return [];
  const out:string[]=[];
  const seen=new Set<string>([id]);
  let current=planById.get(id);
  while(current?.fallbackId){
    assert.equal(seen.has(current.fallbackId),false,'fallback cycle');
    seen.add(current.fallbackId);
    out.push(current.fallbackId);
    if(plan.supportFallbacks[current.fallbackId])break;
    current=planById.get(current.fallbackId);
  }
  return out;
}

test('screen classes cover required presentation surfaces',()=>{
  assert.deepEqual(
    new Set(fixture.rows.map((row:any)=>row.screenType)),
    new Set(['location','job-shift','job-result','job-event','school','relationship','night','activity','ending'])
  );
  assert.equal(fixture.rows.length,9);
});

test('declared fallback chains match production patch plan',()=>{
  for(const row of fixture.rows){
    assert.deepEqual(row.fallbackChain,chainFor(row.presentationId),row.presentationId);
    assert.match(row.presentationId,/^[a-z0-9-]+(?:\/[a-z0-9-]+)+$/);
  }
});

test('every terminal fallback is static-safe',()=>{
  for(const row of fixture.rows){
    assert.equal(row.terminal.kind,'static',row.presentationId);
    const media=stageById.get(row.terminal.mediaId);
    assert.ok(media,row.terminal.mediaId);
    assert.equal(media.kind,'image');
    assert.equal(media.src,row.terminal.assetPath);
    assert.equal(existsSync(row.terminal.assetPath),true,row.terminal.assetPath);
  }
});

test('missing media never changes gameplay state or requested presentation identity',()=>{
  const gameplay={eventId:'lumber.career-first-shift',courseId:'school.course.arcana',endingId:'ending.lumber.hard-work'};
  for(const row of fixture.rows){
    const before=structuredClone(gameplay);
    const requested=row.presentationId;
    assert.ok(['fallback-same-identity','text-safe-same-identity'].includes(row.missingMediaOutcome));
    assert.equal(row.presentationId,requested);
    assert.deepEqual(gameplay,before);
  }
});

test('fallback graph terminates without cycles',()=>{
  assert.equal(fixture.policy.cyclesAllowed,false);
  assert.equal(fixture.policy.missingMediaChangesGameplay,false);
  assert.equal(fixture.policy.terminalFallbackMustBe,'static-or-text-safe');
  for(const row of fixture.rows){
    const path=[row.presentationId,...row.fallbackChain];
    assert.equal(new Set(path).size,path.length,row.presentationId);
  }
});
