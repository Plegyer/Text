import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const current=JSON.parse(readFileSync('content/localization.json','utf8'));
const delta=JSON.parse(
  readFileSync('content/poverty-copyedit-main-delta-v1.fixture.json','utf8')
);

const packFiles=[
  'poverty-street-production.json',
  'poverty-street-production-v2.json',
  'poverty-cheap-production.json',
  'poverty-cheap-production-v2.json',
  'poverty-recovery-production.json',
  'poverty-pressure-production.json'
];

const packs=packFiles.map(name=>
  JSON.parse(readFileSync('content/packs/'+name,'utf8'))
);

const changed=delta.strings as Record<string,{ru:string;en:string}>;

function expectedOrdinaryPovertyKeys(){
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

test('copyedit delta contains only existing merged-main ordinary-poverty keys',()=>{
  const expected=new Set(expectedOrdinaryPovertyKeys());
  assert.equal(expected.size,84);
  assert.equal(Object.keys(changed).length,36);

  for(const key of Object.keys(changed)){
    assert.ok(expected.has(key),'not ordinary-poverty namespace: '+key);
    assert.ok(current.strings[key],'missing current-main key: '+key);
  }

  assert.equal(delta.namespacePolicy,'EXISTING_KEYS_ONLY');
  assert.equal(delta.invariants.renamesKeys,false);
  assert.equal(delta.invariants.addsKeys,false);
});

test('every copyedit replacement has complete RU and EN and actually changes text',()=>{
  for(const [key,value] of Object.entries(changed)){
    assert.ok(value.ru?.trim(),key+' ru');
    assert.ok(value.en?.trim(),key+' en');

    const before=current.strings[key];
    assert.ok(before?.ru?.trim(),key+' current ru');
    assert.ok(before?.en?.trim(),key+' current en');
    assert.notDeepEqual(value,before,'copyedit key is not changed: '+key);
  }
});

test('copyedit fixture contains presentation text only',()=>{
  const allowedTop=new Set([
    'schemaVersion','id','status','baseMain','target',
    'namespacePolicy','strings','coverage','invariants'
  ]);
  for(const key of Object.keys(delta)){
    assert.ok(allowedTop.has(key),'unexpected top-level field '+key);
  }

  const serialized=JSON.stringify(delta.strings);
  for(const forbidden of [
    '"conditions"','"effects"','"reward"','"chance"',
    '"cooldownDays"','"nightPolicy"','"reactionTriggers"',
    '"modifyResource"','"addItem"','"addNextDayModifier"',
    '"housingTier"','"rng"'
  ]){
    assert.equal(serialized.includes(forbidden),false,forbidden);
  }
});

test('six ordinary-poverty pack and event identities are unchanged',()=>{
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

  for(const id of eventIds){
    assert.match(id,/^poverty-/);
    assert.equal(/secret.?debt/i.test(id),false,id);
  }
});

test('copyedit delta excludes Secret Debt',()=>{
  const serialized=JSON.stringify(delta).toLowerCase();
  for(const token of [
    'secret-debt','secret debt','lender','forced-night',
    'paid_freedom','bound_life','takeover'
  ]){
    assert.equal(serialized.includes(token),false,token);
  }
});
