import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const current=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const delta=JSON.parse(
  readFileSync('content/poverty-copyedit-final-delta-v2.fixture.json','utf8')
);

const packFiles=[
  'poverty-street-production.json',
  'poverty-street-production-v2.json',
  'poverty-cheap-production.json',
  'poverty-cheap-production-v2.json',
  'poverty-recovery-production.json',
  'poverty-pressure-production.json'
] as const;

const packs=packFiles.map(name=>
  JSON.parse(readFileSync('content/packs/'+name,'utf8'))
);

function requiredKeys(){
  const keys:string[]=[];
  for(const pack of packs){
    for(const event of pack.events){
      keys.push('event.'+event.id+'.title');
      for(const variant of event.variants){
        keys.push('event.'+event.id+'.variant.'+variant.id+'.text');
      }
      for(const choice of event.choices){
        keys.push('event.'+event.id+'.choice.'+choice.id+'.label');
        keys.push('event.'+event.id+'.choice.'+choice.id+'.text');
      }
    }
  }
  keys.push('media.stage.outside.alt','media.stage.room.alt');
  return keys;
}

test('final poverty copyedit uses existing merged-main keys only',()=>{
  const expected=new Set(requiredKeys());
  assert.equal(expected.size,84);
  assert.equal(Object.keys(delta.strings).length,33);

  for(const key of Object.keys(delta.strings)){
    assert.ok(expected.has(key),key);
    assert.ok(current[key],key);
  }

  assert.equal(delta.namespacePolicy,'EXISTING_KEYS_ONLY');
  assert.equal(delta.invariants.renamesKeys,false);
  assert.equal(delta.invariants.addsKeys,false);
  assert.equal(delta.invariants.deletesKeys,false);
});

test('every final replacement has complete RU EN and differs from current text',()=>{
  for(const [key,value] of Object.entries(delta.strings) as [string,{ru:string;en:string}][]){
    assert.ok(value.ru?.trim(),key+' ru');
    assert.ok(value.en?.trim(),key+' en');
    assert.notDeepEqual(value,current[key],key+' must be a real replacement');
  }
});

test('context-review keys are excluded from final replacement payload',()=>{
  assert.deepEqual(delta.excludedForContextReview,[
    'event.poverty-recovery-production.herb-bundle.variant.default.text',
    'media.stage.outside.alt',
    'media.stage.room.alt'
  ]);
  for(const key of delta.excludedForContextReview){
    assert.equal(delta.strings[key],undefined,key);
    assert.ok(current[key],key+' current');
  }
});

test('final copyedit contains text only and no gameplay fields',()=>{
  const raw=JSON.stringify(delta.strings).toLowerCase();
  for(const token of [
    '"conditions"','"effects"','"reward"','"chance"',
    '"cooldowndays"','"nightpolicy"','"reactiontriggers"',
    '"modifyresource"','"additem"','"addnextdaymodifier"',
    '"housingtier"','"rng"','"moneycost"'
  ]){
    assert.equal(raw.includes(token),false,token);
  }
});

test('all six ordinary-poverty production identities stay exact',()=>{
  assert.deepEqual(
    packs.map(pack=>pack.id),
    [
      'poverty-street-production',
      'poverty-street-production-v2',
      'poverty-cheap-production',
      'poverty-cheap-production-v2',
      'poverty-recovery-production',
      'poverty-pressure-production'
    ]
  );

  const eventIds=packs.flatMap(pack=>pack.events.map((event:any)=>event.id));
  assert.equal(eventIds.length,14);
  assert.equal(new Set(eventIds).size,14);
  assert.ok(eventIds.every(id=>id.startsWith('poverty-')));
});

test('Secret Debt is excluded from final poverty copyedit',()=>{
  const raw=JSON.stringify(delta).toLowerCase();
  for(const token of [
    'secret-debt','secret debt','lender','forced-night',
    'paid_freedom','bound_life','takeover'
  ]){
    assert.equal(raw.includes(token),false,token);
  }
});
