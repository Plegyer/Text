import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

const json=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const plan=json('content/presentation-production-patch-plan.fixture.json');
const assets=json('content/presentation-asset-consistency.fixture.json');
const stage=json('content/packs/stage.json');

const stageById=new Map(stage.media.map((media:any)=>[media.id,media]));
const planById=new Map(plan.slots.map((slot:any)=>[slot.presentationId,slot]));
const staticById=new Map(assets.currentStaticBindings.map((row:any)=>[row.presentationId,row]));

const representatives=[
  {presentationId:'job/lumber/shift/spring/default',label:'Lumber shift — spring'},
  {presentationId:'job/lumber/result/default',label:'Lumber shift — result'},
  {presentationId:'school/arcana/lesson/default',label:'School lesson — Arcana'},
  {presentationId:'relationship/lumber-foreman/lumber-night-foreman-professional/default',label:'Foreman Night — professional route'},
  {presentationId:'activity/forest/return/success',label:'Forest Activity — return success'},
  {presentationId:'ending/lumber/hard-work',label:'Ending — Lumber Hard Work'}
];

test('representative accessibility audit covers Lumber, School, Night, Activity, and ending',()=>{
  assert.equal(representatives.length,6);
  assert.ok(representatives.some(row=>row.presentationId.startsWith('job/lumber/')));
  assert.ok(representatives.some(row=>row.presentationId.startsWith('school/')));
  assert.ok(representatives.some(row=>row.presentationId.includes('lumber-night')));
  assert.ok(representatives.some(row=>row.presentationId.startsWith('activity/forest/')));
  assert.ok(representatives.some(row=>row.presentationId.startsWith('ending/lumber/')));
});

test('every representative has semantic ID, human slot label, and non-empty text fallback',()=>{
  for(const row of representatives){
    assert.match(row.presentationId,/^[a-z0-9-]+(?:\/[a-z0-9-]+)+$/);
    assert.ok(row.label.trim().length>=8,row.presentationId);
    assert.notEqual(row.label,row.presentationId,row.presentationId);

    const planned=planById.get(row.presentationId);
    assert.ok(planned,row.presentationId);
    assert.ok(planned.textFallback.trim().length>0,row.presentationId);
    assert.notEqual(planned.textFallback,row.presentationId,row.presentationId);
  }
});

test('resolved shipped static media has human-readable alt text and existing path',()=>{
  for(const row of representatives){
    const binding=staticById.get(row.presentationId);
    assert.ok(binding,row.presentationId);
    const media=stageById.get(binding.mediaId);
    assert.ok(media,binding.mediaId);
    assert.equal(media.kind,'image',binding.mediaId);
    assert.equal(media.src,binding.assetPath,row.presentationId);
    assert.equal(existsSync(binding.assetPath),true,binding.assetPath);
    assert.ok(media.alt.trim().length>=4,binding.mediaId);
    assert.notEqual(media.alt,media.src,binding.mediaId);
    assert.equal(media.alt.startsWith('assets/'),false,binding.mediaId);
  }
});

test('animations-off retains static or text-safe meaning for every representative',()=>{
  for(const row of representatives){
    const binding=staticById.get(row.presentationId);
    const planned=planById.get(row.presentationId);
    assert.ok(planned,row.presentationId);

    const staticAvailable=Boolean(binding&&existsSync(binding.assetPath));
    const textAvailable=Boolean(planned.textFallback?.trim());
    assert.equal(staticAvailable||textAvailable,true,row.presentationId);
  }
});

test('accessibility meaning never depends on animation timing or frame state',()=>{
  const serialized=JSON.stringify({
    representatives,
    plans:representatives.map(row=>{
      const planned=planById.get(row.presentationId);
      return {
        presentationId:row.presentationId,
        textFallback:planned?.textFallback,
        fallbackId:planned?.fallbackId
      };
    })
  }).toLowerCase();

  for(const forbidden of [
    'frameindex','currentframe','playbacktimestamp','animationtime',
    'elapsedms','loopcount','frameduration','timingrequired'
  ])assert.equal(serialized.includes(forbidden),false,forbidden);
});

test('audited metadata contains no mechanics payload',()=>{
  const payload=representatives.map(row=>({
    presentationId:row.presentationId,
    label:row.label,
    textFallback:planById.get(row.presentationId)?.textFallback,
    mediaAlt:stageById.get(staticById.get(row.presentationId)?.mediaId)?.alt
  }));
  const serialized=JSON.stringify(payload).toLowerCase();
  for(const forbidden of [
    '"conditions"','"effects"','"rng"','"energy"','"money"',
    '"reward"','"transition"','"delta"','"inventory"'
  ])assert.equal(serialized.includes(forbidden),false,forbidden);
});
