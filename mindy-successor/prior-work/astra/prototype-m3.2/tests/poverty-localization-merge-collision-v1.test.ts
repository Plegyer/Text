import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const current=JSON.parse(readFileSync('content/localization.json','utf8'));
const deltaFixture=JSON.parse(
  readFileSync('content/poverty-localization-main-delta-v1.fixture.json','utf8')
);
const delta=deltaFixture.delta.strings as Record<string,{ru:string;en:string}>;

const povertyPacks=[
  'poverty-street-production.json',
  'poverty-street-production-v2.json',
  'poverty-cheap-production.json',
  'poverty-cheap-production-v2.json',
  'poverty-recovery-production.json',
  'poverty-pressure-production.json'
].map(name=>JSON.parse(readFileSync('content/packs/'+name,'utf8')));

const stage=JSON.parse(readFileSync('content/packs/stage.json','utf8'));

function eventIdFromKey(key:string){
  const body=key.slice('event.'.length);
  const cuts=[
    body.indexOf('.title'),
    body.indexOf('.variant.'),
    body.indexOf('.choice.')
  ].filter(index=>index>=0);
  assert.ok(cuts.length>0,'unrecognized event localization key '+key);
  return body.slice(0,Math.min(...cuts));
}

test('poverty localization delta is additive or exactly identical to current localization',()=>{
  for(const [key,value] of Object.entries(delta)){
    const existing=current.strings[key];
    if(existing===undefined)continue;
    assert.deepEqual(
      existing,
      value,
      'localization collision must be exact-identical for '+key
    );
  }
});

test('poverty delta references only real current production event and media identities',()=>{
  const eventIds=new Set(
    povertyPacks.flatMap((pack:any)=>pack.events.map((event:any)=>event.id))
  );
  const mediaIds=new Set(stage.media.map((media:any)=>media.id));

  for(const key of Object.keys(delta)){
    if(key.startsWith('event.')){
      const eventId=eventIdFromKey(key);
      assert.ok(eventIds.has(eventId),'unknown event '+eventId);
    }else if(key.startsWith('media.')&&key.endsWith('.alt')){
      const mediaId=key.slice('media.'.length,-'.alt'.length);
      assert.ok(mediaIds.has(mediaId),'unknown media '+mediaId);
    }else{
      assert.fail('unexpected poverty localization key '+key);
    }
  }
});

test('poverty localization identities are locale-neutral',()=>{
  const localeSpecific=/(^|[._/-])(ru|en)([._/-]|$)/i;

  for(const key of Object.keys(delta)){
    if(key.startsWith('event.')){
      assert.equal(localeSpecific.test(eventIdFromKey(key)),false,key);
    }else{
      const mediaId=key.slice('media.'.length,-'.alt'.length);
      assert.equal(localeSpecific.test(mediaId),false,key);
    }
  }
});

test('poverty localization merge has no Secret Debt contamination or conflicting replacement',()=>{
  const serialized=JSON.stringify(delta).toLowerCase();
  for(const token of [
    'secret-debt','secret debt','lender','forced-night',
    'paid_freedom','bound_life','takeover'
  ]){
    assert.equal(serialized.includes(token),false,token);
  }

  const conflicts=Object.entries(delta).filter(([key,value])=>
    current.strings[key]!==undefined &&
    JSON.stringify(current.strings[key])!==JSON.stringify(value)
  );
  assert.deepEqual(conflicts,[]);
});
