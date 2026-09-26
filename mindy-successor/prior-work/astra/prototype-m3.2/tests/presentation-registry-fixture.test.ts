import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

type MediaRef={kind:'gif'|'image';assetRef:string|null;status:'assigned'|'missing-intentional'};
type Entry={
  presentationId:string;
  family:'location'|'job'|'school'|'relationship'|'night'|'activity'|'ending';
  primary:MediaRef;
  staticFallback:MediaRef|null;
  fallbackId:string|null;
  textFallback:string;
};
type RegistryFixture={
  version:1;
  kind:'target-presentation-registry-fixture';
  status:'isolated-test-fixture';
  policy:{primaryKind:'gif';missingAsset:'fallback-then-text-non-fatal';mechanicsDataAllowed:false};
  entries:Entry[];
};

const fixture=JSON.parse(readFileSync('content/presentation-target-registry.fixture.json','utf8')) as RegistryFixture;

const familyPatterns:Record<Entry['family'],RegExp>={
  location:/^location\/[a-z0-9-]+\/[a-z0-9-]+$/,
  job:/^job\/[a-z0-9-]+\/(?:shift\/[a-z0-9-]+\/[a-z0-9-]+|result\/[a-z0-9-]+|event\/[a-z0-9-]+\/[a-z0-9-]+)$/,
  school:/^school\/[a-z0-9-]+\/[a-z0-9-]+\/[a-z0-9-]+$/,
  relationship:/^relationship\/[a-z0-9-]+\/[a-z0-9-]+\/[a-z0-9-]+$/,
  night:/^night\/[a-z0-9-]+\/[a-z0-9-]+$/,
  activity:/^activity\/[a-z0-9-]+\/[a-z0-9-]+\/[a-z0-9-]+$/,
  ending:/^ending\/[a-z0-9-]+\/[a-z0-9-]+$/
};

function objectKeys(value:unknown,found=new Set<string>()):Set<string>{
  if(Array.isArray(value)){for(const item of value)objectKeys(item,found);return found;}
  if(value&&typeof value==='object'){
    for(const [key,item] of Object.entries(value as Record<string,unknown>)){found.add(key);objectKeys(item,found);}
  }
  return found;
}

test('target registry fixture covers every required semantic presentation family',()=>{
  const families=new Set(fixture.entries.map(entry=>entry.family));
  for(const required of ['location','job','school','relationship','night','activity','ending'] as const)assert.ok(families.has(required),required);
  const ids=new Set(fixture.entries.map(entry=>entry.presentationId));
  assert.ok(ids.has('job/lumber/shift/spring/default'));
  assert.ok(ids.has('job/lumber/result/default'));
  assert.ok(ids.has('job/lumber/event/foreman-trust/default'));
  assert.ok(ids.has('ending/lumber/hard-work'));
});

test('fixture uses locked semantic IDs and GIF-first presentation policy',()=>{
  assert.equal(fixture.policy.primaryKind,'gif');
  assert.equal(fixture.policy.missingAsset,'fallback-then-text-non-fatal');
  assert.equal(fixture.policy.mechanicsDataAllowed,false);
  const ids=new Set<string>();
  for(const entry of fixture.entries){
    assert.match(entry.presentationId,familyPatterns[entry.family]);
    assert.equal(ids.has(entry.presentationId),false,`duplicate presentationId ${entry.presentationId}`);
    ids.add(entry.presentationId);
    assert.equal(entry.primary.kind,'gif');
    assert.ok(entry.textFallback.trim().length>0);
    if(entry.staticFallback)assert.equal(entry.staticFallback.kind,'image');
  }
});

test('fallback chain is explicit, references known slots and has no cycles',()=>{
  const byId=new Map(fixture.entries.map(entry=>[entry.presentationId,entry]));
  for(const entry of fixture.entries)if(entry.fallbackId)assert.ok(byId.has(entry.fallbackId),`unknown fallback ${entry.fallbackId}`);
  for(const start of fixture.entries){
    const seen=new Set<string>();
    let current:Entry|undefined=start;
    while(current?.fallbackId){
      assert.equal(seen.has(current.presentationId),false,`fallback cycle at ${current.presentationId}`);
      seen.add(current.presentationId);
      current=byId.get(current.fallbackId);
    }
  }
});

test('intentional missing primary remains non-fatal through fallback/text policy',()=>{
  const missing=fixture.entries.find(entry=>entry.primary.status==='missing-intentional');
  assert.ok(missing);
  assert.equal(missing.primary.assetRef,null);
  assert.ok(missing.fallbackId||missing.textFallback);
  assert.equal(fixture.policy.missingAsset,'fallback-then-text-non-fatal');
});

test('registry entries contain no mechanics, RNG, Energy or effect payload',()=>{
  const forbidden=new Set(['conditions','condition','effects','effect','rng','random','energy','cost','delta','transition','command','reward']);
  for(const key of objectKeys(fixture.entries))assert.equal(forbidden.has(key),false,`forbidden presentation fixture key: ${key}`);
});
