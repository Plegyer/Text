import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const fixture=JSON.parse(readFileSync('content/legacy-root-localization-production-v1.fixture.json','utf8'));
const root=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const base=JSON.parse(readFileSync('content/packs/base.json','utf8'));
const gopher=JSON.parse(readFileSync('content/packs/gopher.json','utf8'));
const stage=JSON.parse(readFileSync('content/packs/stage.json','utf8'));

const expectedEventIds=[
  'base.arrival','base.order','base.bran','base.invite','base.workday','base.winter','base.shelter',
  'gopher.arrival','gopher.tavern-intro','gopher.tavern-quest','gopher.receipt',
  'gopher.tavern-resolution','gopher.tavern-routine','gopher.woods-intro',
  'gopher.hunt-intro','gopher.landlord','stage.goblin'
].sort();

const expectedMediaIds=[
  'base.workshop','base.town',
  'gopher.arrival.default','gopher.tavern-intro.default','gopher.tavern-quest.default',
  'gopher.receipt.default','gopher.tavern-resolution.default',
  'gopher.tavern-routine.spring','gopher.tavern-routine.summer',
  'gopher.tavern-routine.autumn','gopher.tavern-routine.winter',
  'gopher.tavern-routine.default','gopher.woods-intro.default',
  'gopher.hunt-intro.default','gopher.landlord.default','stage.goblin'
].sort();

const reviewedTextReplacements=new Set<string>([]);

const selectedEvents=[...base.events,...gopher.events,...stage.events]
  .filter((event:{id:string})=>expectedEventIds.includes(event.id));

function expectedKeys(){
  const keys:string[]=[];
  for(const event of selectedEvents){
    keys.push(`event.${event.id}.title`);
    for(const variant of event.variants){
      keys.push(`event.${event.id}.variant.${variant.id}.text`);
    }
    for(const choice of event.choices){
      keys.push(`event.${event.id}.choice.${choice.id}.label`);
      keys.push(`event.${event.id}.choice.${choice.id}.text`);
    }
  }
  for(const mediaId of expectedMediaIds)keys.push(`media.${mediaId}.alt`);
  return keys.sort();
}

test('production legacy patch covers exact current event and media identities',()=>{
  assert.deepEqual(selectedEvents.map((event:{id:string})=>event.id).sort(),expectedEventIds);

  const currentMedia=[...base.media,...gopher.media,...stage.media]
    .map((media:{id:string})=>media.id);
  for(const id of expectedMediaIds)assert.ok(currentMedia.includes(id),id);

  assert.deepEqual(Object.keys(fixture.strings).sort(),expectedKeys());
});

test('production legacy patch is complete RU EN and locale-neutral',()=>{
  assert.equal(fixture.version,2);
  assert.equal(fixture.defaultLocale,'ru');
  for(const [key,value] of Object.entries(fixture.strings) as [string,{ru:string;en:string}][]){
    assert.ok(value.ru?.trim(),key+' ru');
    assert.ok(value.en?.trim(),key+' en');
    assert.deepEqual(Object.keys(value).sort(),['en','ru'],key);
    assert.doesNotMatch(key,/(^|[._/-])(ru|en)([._/-]|$)/i,key);
  }
});

test('production root collision policy is additive, identical, or explicitly reviewed replacement',()=>{
  for(const [key,value] of Object.entries(fixture.strings)){
    const current=root[key];
    if(current===undefined)continue;
    if(JSON.stringify(current)===JSON.stringify(value))continue;
    assert.ok(reviewedTextReplacements.has(key),'unreviewed root replacement: '+key);
  }
});

test('production legacy patch contains localization only',()=>{
  assert.deepEqual(Object.keys(fixture).sort(),['defaultLocale','strings','version']);
  for(const value of Object.values(fixture.strings) as Record<string,string>[]){
    assert.deepEqual(Object.keys(value).sort(),['en','ru']);
  }
});

test('production legacy patch excludes other-owner namespaces',()=>{
  for(const key of Object.keys(fixture.strings)){
    const lower=key.toLowerCase();
    assert.equal(lower.includes('event.base.school.'),false,key);
    assert.equal(lower.includes('event.school'),false,key);
    assert.equal(lower.includes('event.poverty'),false,key);
    assert.equal(lower.includes('event.lumber.'),false,key);
    assert.equal(lower.includes('event.lumber-'),false,key);
    assert.equal(lower.includes('event.ds-lumber.'),false,key);
    assert.equal(lower.includes('event.forest-result'),false,key);
    assert.equal(lower.includes('media.forest-result'),false,key);
    assert.equal(lower.includes('foreman'),false,key);
    assert.equal(lower.includes('secret-debt'),false,key);
    assert.equal(lower.includes('secret.debt'),false,key);
  }
});
