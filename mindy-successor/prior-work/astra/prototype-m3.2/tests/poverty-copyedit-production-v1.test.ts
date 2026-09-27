import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const localization=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const delta=JSON.parse(readFileSync('content/poverty-copyedit-production-v1.fixture.json','utf8'));
const packs=[
 'poverty-street-production.json',
 'poverty-street-production-v2.json',
 'poverty-cheap-production.json',
 'poverty-cheap-production-v2.json',
 'poverty-recovery-production.json',
 'poverty-pressure-production.json'
].map(name=>JSON.parse(readFileSync('content/packs/'+name,'utf8')));

test('poverty copyedit production patch is exactly 33 existing RU EN text keys',()=>{
 const keys=Object.keys(delta.strings);
 assert.equal(keys.length,33);
 for(const key of keys){
  assert.ok(localization[key],key);
  assert.deepEqual(localization[key],delta.strings[key],key);
  assert.ok(localization[key].ru?.trim(),key+' ru');
  assert.ok(localization[key].en?.trim(),key+' en');
  assert.equal(key.startsWith('media.'),false,key);
 }
});

test('poverty copyedit leaves ordinary production identity set exact',()=>{
 assert.deepEqual(packs.map(pack=>pack.id),[
  'poverty-street-production',
  'poverty-street-production-v2',
  'poverty-cheap-production',
  'poverty-cheap-production-v2',
  'poverty-recovery-production',
  'poverty-pressure-production'
 ]);
 const eventIds=packs.flatMap(pack=>pack.events.map((event:any)=>event.id));
 assert.equal(eventIds.length,14);
 assert.equal(new Set(eventIds).size,14);
 assert.ok(eventIds.every((id:string)=>id.startsWith('poverty-')));
});

test('poverty copyedit is text-only and excludes Secret Debt',()=>{
 const raw=JSON.stringify(delta).toLowerCase();
 for(const token of [
  '"conditions"','"effects"','"rewards"','"rng"','"save"',
  'secret-debt','secret debt','lender','forced-night',
  'paid_freedom','bound_life','takeover'
 ]) assert.equal(raw.includes(token),false,token);
 assert.equal(delta.invariants?.changesMechanics,false);
 assert.equal(delta.invariants?.secretDebtIncluded,false);
});
