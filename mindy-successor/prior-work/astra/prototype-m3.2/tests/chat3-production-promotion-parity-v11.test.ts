import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const load=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const localization=load('content/localization.json').strings as Record<string,{ru:string;en:string}>;
const forest=load('content/packs/forest-result-content-bilingual-v2.json');
const manifest=load('content/chat3-production-promotion-manifest-v11.fixture.json');
const packs=[
 load('content/packs/poverty-street-production.json'),
 load('content/packs/poverty-street-production-v2.json'),
 load('content/packs/poverty-cheap-production.json'),
 load('content/packs/poverty-cheap-production-v2.json'),
 load('content/packs/poverty-recovery-production.json'),
 load('content/packs/poverty-pressure-production.json')
];
const events=packs.flatMap((pack:any)=>pack.events);

test('C3-110/C3-111 route continuity uses existing live route entry keys',()=>{
 assert.deepEqual(manifest.live.forestRouteLocalizationKeys,[
  'presentation.activity.forest.entry.logging-road.text',
  'presentation.activity.forest.entry.old-boundary.text'
 ]);
 for(const key of manifest.live.forestRouteLocalizationKeys){
  assert.ok(localization[key]?.ru?.trim(),key+' ru');
  assert.ok(localization[key]?.en?.trim(),key+' en');
 }
 assert.match(localization['presentation.activity.forest.entry.logging-road.text'].ru,/Лесовозная дорога широкая/);
 assert.equal(localization['activityOption.forest.route.logging-road.help'].ru,'Широкая рабочая дорога со свежими следами лесозаготовок.');
});

test('C3-112 frozen default aftermath remains present under intentional v13 result depth',()=>{
 for(const event of forest.events){
  assert.ok(event.variants.some((variant:any)=>variant.id==='default'),event.id);
  const key='event.'+event.id+'.variant.default.text';
  assert.ok(localization[key]?.ru?.trim(),key+' ru');
  assert.ok(localization[key]?.en?.trim(),key+' en');
  assert.equal(event.variants.find((variant:any)=>variant.id==='default')?.text,localization[key].ru,event.id);
  const effectful=event.choices.filter((choice:any)=>choice.effects.length>0);
  if(event.id==='forest-result-content-v1.success')assert.deepEqual(effectful.map((choice:any)=>({id:choice.id,effects:choice.effects})),[{id:'warden-conservation-route',effects:[{kind:'addWorldFact',fact:'reward.hunter.warden-signs.used'}]}]);
  else assert.deepEqual(effectful,[],event.id);
 }
});

test('C3-113/C3-114 promoted poverty text stays on existing event and variant IDs',()=>{
 for(const key of [...manifest.live.povertyEventVariantLocalizationKeys,...manifest.live.recoveryVariantLocalizationKeys,...manifest.live.alreadyLiveContactLocalizationKeys]){
  assert.ok(localization[key]?.ru?.trim(),key+' ru');
  assert.ok(localization[key]?.en?.trim(),key+' en');
 }
 for(const key of manifest.live.povertyEventVariantLocalizationKeys){
  const match=key.match(/^event\.(.+)\.variant\.([^.]+)\.text$/);
  assert.ok(match,key);
  const event=events.find((entry:any)=>entry.id===match![1]);
  assert.ok(event,match![1]);
  assert.ok(event.variants.some((entry:any)=>entry.id===match![2]),key);
 }
});

test('C3-115 promotes only unambiguous result localization',()=>{
 assert.deepEqual(manifest.live.unambiguousResultLocalizationKeys.sort(),[
  'event.poverty-recovery-production.herb-bundle.choice.take-herb.text',
  'event.poverty-recovery-production.short-cleanup.choice.do-cleanup.text',
  'event.poverty-recovery-production.small-coin-help.choice.take-coins.text',
  'event.poverty-street-production.helpful-summer.choice.take-errand.text'
 ].sort());
 for(const key of manifest.live.unambiguousResultLocalizationKeys){
  assert.ok(localization[key]?.ru?.trim(),key+' ru');
  assert.ok(localization[key]?.en?.trim(),key+' en');
 }
 assert.deepEqual(manifest.preparationOnly.ambiguousSmallJobResults.map((entry:any)=>entry.variantId).sort(),['late-shade','market-closing']);
});
