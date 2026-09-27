import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const fixturePaths=[
 'content/base-generic-world-localization-v1.fixture.json',
 'content/gopher-early-chain-localization-v1.fixture.json',
 'content/gopher-resolution-localization-v1.fixture.json',
 'content/gopher-world-hooks-localization-v1.fixture.json',
 'content/stage-goblin-localization-v1.fixture.json'
];
const fixtures=fixturePaths.map(path=>JSON.parse(readFileSync(path,'utf8')));
const root=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const base=JSON.parse(readFileSync('content/packs/base.json','utf8'));
const gopher=JSON.parse(readFileSync('content/packs/gopher.json','utf8'));
const stage=JSON.parse(readFileSync('content/packs/stage.json','utf8'));

const expectedIds=[
 'base.arrival','base.order','base.bran','base.invite','base.workday','base.winter','base.shelter',
 'gopher.arrival','gopher.tavern-intro','gopher.tavern-quest','gopher.receipt','gopher.tavern-resolution',
 'gopher.tavern-routine','gopher.woods-intro','gopher.hunt-intro','gopher.landlord','stage.goblin'
].sort();

function mergedStrings(){
 const out:Record<string,{ru:string;en:string}>={};
 for(const fixture of fixtures){
  assert.deepEqual(Object.keys(fixture).sort(),['defaultLocale','strings','version']);
  assert.equal(fixture.defaultLocale,'ru');
  for(const [key,value] of Object.entries(fixture.strings) as [string,{ru:string;en:string}][]){
   assert.equal(out[key],undefined,'duplicate fixture key '+key);
   out[key]=value;
  }
 }
 return out;
}

function expectedKeys(){
 const events=[...base.events,...gopher.events,...stage.events]
  .filter((event:{id:string})=>expectedIds.includes(event.id));
 assert.deepEqual(events.map((event:{id:string})=>event.id).sort(),expectedIds);
 const keys:string[]=[];
 for(const event of events){
  keys.push(`event.${event.id}.title`);
  for(const variant of event.variants)keys.push(`event.${event.id}.variant.${variant.id}.text`);
  for(const choice of event.choices){
   keys.push(`event.${event.id}.choice.${choice.id}.label`);
   keys.push(`event.${event.id}.choice.${choice.id}.text`);
  }
 }
 return keys.sort();
}

test('generic-world deltas cover exact current event identities',()=>{
 const strings=mergedStrings();
 assert.deepEqual(Object.keys(strings).sort(),expectedKeys());
});

test('generic-world deltas are complete RU EN and locale-neutral',()=>{
 const strings=mergedStrings();
 for(const [key,entry] of Object.entries(strings)){
  assert.ok(entry.ru?.trim(),key+' ru');
  assert.ok(entry.en?.trim(),key+' en');
  assert.doesNotMatch(key,/(^|[._/-])(ru|en)([._/-]|$)/i,key);
 }
});

test('generic-world deltas are additive or exact-identical against root localization',()=>{
 for(const [key,value] of Object.entries(mergedStrings())){
  const current=root[key];
  if(current!==undefined)assert.deepEqual(current,value,key);
 }
});

test('generic-world fixtures contain localization only',()=>{
 const serialized=JSON.stringify(fixtures);
 const forbidden=[
  '"conditions"','"effects"','"reward"','"rewards"','"trigger"','"priority"',
  '"cooldownDays"','"maxShows"','"rng"','"save"','"flags"','"metric"',
  '"money"','"energy"','"media"','"presentationId"'
 ];
 for(const field of forbidden)assert.equal(serialized.includes(field),false,field);
});

test('generic-world fixtures exclude other-owner namespaces',()=>{
 for(const key of Object.keys(mergedStrings())){
  const lower=key.toLowerCase();
  assert.equal(lower.includes('event.ds-lumber.'),false,key);
  assert.equal(lower.includes('event.lumber-cross.'),false,key);
  assert.equal(lower.includes('event.lumber.career-first-shift'),false,key);
  assert.equal(lower.includes('event.poverty'),false,key);
  assert.equal(lower.includes('event.base.school.'),false,key);
  assert.equal(lower.includes('event.school'),false,key);
  assert.equal(lower.includes('event.forest'),false,key);
  assert.equal(lower.includes('secret-debt'),false,key);
  assert.equal(lower.includes('secret.debt'),false,key);
 }
});
