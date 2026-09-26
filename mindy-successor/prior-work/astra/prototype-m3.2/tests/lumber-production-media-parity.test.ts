import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import {loadCatalog} from '../src/core/content.ts';
import {
  presentationIdForAction,
  presentationIdForEvent,
  presentationSlots,
  resolvePresentation,
  emptyPresentation
} from '../src/core/presentation.ts';
import type {Catalog} from '../src/core/schema.ts';

const parity=JSON.parse(readFileSync('content/lumber-production-media-parity.fixture.json','utf8'));
const definitions=JSON.parse(readFileSync('content/lumber-target-definitions.fixture.json','utf8'));
const productionPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-production.pack.json','utf8'));
const crossPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-cross-system.pack.json','utf8'));
const nightPack=JSON.parse(readFileSync('content/packs/lumber-target/lumber-night-acceptance.pack.json','utf8'));

function catalog():Catalog{
  return loadCatalog(
    structuredClone(definitions),
    [structuredClone(productionPack),structuredClone(crossPack),structuredClone(nightPack)]
  );
}

test('media parity covers every approved target pack media ID exactly once',()=>{
  const packMedia=[productionPack,crossPack,nightPack].flatMap((p:any)=>p.media);
  assert.equal(parity.media.length,packMedia.length);
  assert.equal(new Set(parity.media.map((x:any)=>x.mediaId)).size,parity.media.length);
  assert.deepEqual(
    [...parity.media.map((x:any)=>x.mediaId)].sort(),
    [...packMedia.map((x:any)=>x.id)].sort()
  );

  for(const expected of parity.media){
    const pack=[productionPack,crossPack,nightPack].find((p:any)=>p.id===expected.packId);
    assert.ok(pack,expected.packId);
    const media=pack.media.find((m:any)=>m.id===expected.mediaId);
    assert.ok(media,expected.mediaId);
    assert.equal(media.kind,expected.declaredKind);
    assert.equal(media.src,expected.declaredSrc);
  }
});

test('future Lumber GIF declarations are not packaged and are never labeled shipped',()=>{
  for(const entry of parity.media){
    assert.equal(entry.declaredKind,'gif',entry.mediaId);
    assert.equal(existsSync(entry.declaredSrc),false,entry.declaredSrc);
    assert.equal(entry.sourcePackaged,false,entry.mediaId);
    assert.equal(entry.status,'FUTURE_GIF_MISSING_NON_FATAL',entry.mediaId);
    assert.notEqual(entry.status,'SHIPPED',entry.mediaId);
  }
  assert.equal(parity.rules.missingPathMayBeLabeledShipped,false);
});

test('packaged static Lumber/Forest fallback assets really exist',()=>{
  assert.equal(parity.packagedStaticFallbacks.lumber.path,'assets/stage-lumber.svg');
  assert.equal(parity.packagedStaticFallbacks.forest.path,'assets/stage-forest.svg');
  assert.equal(existsSync(parity.packagedStaticFallbacks.lumber.path),true);
  assert.equal(existsSync(parity.packagedStaticFallbacks.forest.path),true);
  for(const entry of parity.media){
    assert.equal(existsSync(entry.packagedStaticFallback),true,entry.mediaId);
  }
});

test('semantic presentation slots map target media IDs without treating dotted asset IDs as semantic IDs',()=>{
  const cat=catalog();
  const slots=new Map(presentationSlots(cat).map(slot=>[slot.id,slot]));

  for(const entry of parity.media){
    const slot=slots.get(entry.semanticPresentationId);
    assert.ok(slot,entry.semanticPresentationId);
    assert.ok(slot.baseMediaIds.includes(entry.mediaId),entry.mediaId);
    assert.equal(slot.fallbackId,entry.runtimeFallbackId,entry.mediaId);
    assert.ok(entry.semanticPresentationId.includes('/'),entry.semanticPresentationId);
    assert.notEqual(entry.semanticPresentationId,entry.mediaId);
  }
});

test('semantic IDs in parity match merged action/event resolvers',()=>{
  const cat=catalog();
  const shift=definitions.actions.find((a:any)=>a.id==='lumber.shift');
  assert.ok(shift);
  for(const scene of shift.scenes){
    const mediaId=scene.media[0];
    const entry=parity.media.find((x:any)=>x.mediaId===mediaId);
    assert.ok(entry,mediaId);
    assert.equal(presentationIdForAction(cat,'lumber.shift',scene.media),entry.semanticPresentationId);
  }

  const eventIds=[
    'lumber.career-first-shift',
    'lumber.foreman-notice',
    'lumber-cross.activity-forest-return',
    'lumber-night.foreman-professional'
  ];
  for(const eventId of eventIds){
    const event=cat.events.find(e=>e.id===eventId)!;
    const mediaId=event.variants[0].media[0];
    const entry=parity.media.find((x:any)=>x.mediaId===mediaId);
    assert.ok(entry,mediaId);
    assert.equal(presentationIdForEvent(cat,eventId,'default'),entry.semanticPresentationId);
  }
});

test('missing future GIF path is non-fatal to presentation resolution contract',()=>{
  const cat=catalog();
  for(const entry of parity.media){
    const resolved=resolvePresentation(cat,emptyPresentation(),entry.semanticPresentationId);
    assert.equal(resolved.requestedId,entry.semanticPresentationId);
    assert.ok(resolved.candidates.some(candidate=>candidate.mediaId===entry.mediaId),entry.mediaId);
  }
  assert.equal(parity.rules.missingFutureGifIsFatal,false);
});
