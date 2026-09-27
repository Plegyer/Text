import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const fixture=JSON.parse(readFileSync('content/legacy-root-event-localization-v1.fixture.json','utf8'));
const root=JSON.parse(readFileSync('content/localization.json','utf8'));
const base=JSON.parse(readFileSync('content/packs/base.json','utf8'));
const gopher=JSON.parse(readFileSync('content/packs/gopher.json','utf8'));
const stage=JSON.parse(readFileSync('content/packs/stage.json','utf8'));

const expectedEventIds=[
 'base.arrival','base.order','base.bran','base.invite','base.workday','base.winter','base.shelter',
 'gopher.arrival','gopher.tavern-intro','gopher.tavern-quest','gopher.receipt','gopher.tavern-resolution',
 'gopher.tavern-routine','gopher.woods-intro','gopher.hunt-intro','gopher.landlord','stage.goblin'
].sort();

const selectedEvents=[...base.events,...gopher.events,...stage.events]
 .filter((event:{id:string})=>expectedEventIds.includes(event.id));

const expectedMediaIds=[...new Set(selectedEvents.flatMap((event:any)=>
 event.variants.flatMap((variant:any)=>variant.media??[])
))].sort();

function expectedKeys(){
 const keys:string[]=[];
 for(const event of selectedEvents){
  keys.push(`event.${event.id}.title`);
  for(const variant of event.variants)keys.push(`event.${event.id}.variant.${variant.id}.text`);
  for(const choice of event.choices){
   keys.push(`event.${event.id}.choice.${choice.id}.label`);
   keys.push(`event.${event.id}.choice.${choice.id}.text`);
  }
 }
 for(const mediaId of expectedMediaIds)keys.push(`media.${mediaId}.alt`);
 return keys.sort();
}

test('legacy root localization fixture covers exact current event and media identities',()=>{
 assert.deepEqual(selectedEvents.map((event:{id:string})=>event.id).sort(),expectedEventIds);
 const mediaIds=[...base.media,...gopher.media,...stage.media].map((media:{id:string})=>media.id);
 for(const id of expectedMediaIds)assert.ok(mediaIds.includes(id),id);
 assert.deepEqual(Object.keys(fixture.strings).sort(),expectedKeys());
});

test('legacy root localization fixture is complete RU EN and locale-neutral',()=>{
 assert.equal(fixture.defaultLocale,'ru');
 for(const [key,entry] of Object.entries(fixture.strings) as [string,{ru:string;en:string}][]){
  assert.ok(entry.ru?.trim(),key+' ru');
  assert.ok(entry.en?.trim(),key+' en');
  assert.doesNotMatch(key,/(^|[._/-])(ru|en)([._/-]|$)/i,key);
 }
});

test('legacy root localization keys are additive or exact-identical against current root',()=>{
 for(const [key,value] of Object.entries(fixture.strings)){
  const current=root.strings[key];
  if(current!==undefined)assert.deepEqual(current,value,key);
 }
});

test('fixture is localization-only and contains no gameplay fields',()=>{
 assert.deepEqual(Object.keys(fixture).sort(),['defaultLocale','strings','version']);
 for(const entry of Object.values(fixture.strings) as Record<string,string>[]){
  assert.deepEqual(Object.keys(entry).sort(),['en','ru']);
 }
 const serialized=JSON.stringify(fixture);
 const forbidden=[
  '"conditions"','"effects"','"reward"','"rewards"','"trigger"','"priority"','"cooldownDays"',
  '"maxShows"','"rng"','"save"','"flags"','"metric"','"money"','"energy"','"transitions"'
 ];
 for(const field of forbidden)assert.equal(serialized.includes(field),false,field);
});

test('fixture does not overlap excluded ownership namespaces',()=>{
 const keys=Object.keys(fixture.strings);
 for(const key of keys){
  assert.equal(key.includes('event.base.school.'),false,key);
  assert.equal(key.includes('event.school.'),false,key);
  assert.equal(key.includes('event.poverty'),false,key);
  assert.equal(key.includes('event.lumber.'),false,key);
  assert.equal(key.includes('event.lumber-'),false,key);
  assert.equal(key.includes('event.forest'),false,key);
  assert.equal(key.toLowerCase().includes('secret-debt'),false,key);
  assert.equal(key.toLowerCase().includes('secret.debt'),false,key);
  assert.equal(key.includes('media.relationship.lumber.foreman'),false,key);
 }
});
