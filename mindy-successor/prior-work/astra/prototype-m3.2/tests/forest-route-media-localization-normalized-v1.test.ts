import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const root=JSON.parse(readFileSync('content/localization.json','utf8')).strings;
const fixture=JSON.parse(
  readFileSync(
    'content/forest-route-media-localization-normalized-v1.fixture.json',
    'utf8'
  )
);

const allowedKey=/^[a-z0-9._-]+$/;

test('normalized route localization keys match shipped localization key syntax',()=>{
  const keys=Object.keys(fixture.strings);
  assert.equal(keys.length,4);

  for(const key of keys){
    assert.match(key,allowedKey,key);
    assert.equal(key.includes('/'),false,key);
    assert.equal(key,key.toLowerCase(),key);
  }

  for(const route of fixture.routes){
    assert.match(route.altKey,allowedKey,route.altKey);
    assert.match(route.captionKey,allowedKey,route.captionKey);
    assert.equal(route.altKey.includes('/'),false);
    assert.equal(route.captionKey.includes('/'),false);
    assert.match(route.presentationId,/^activity\/forest\/route\/(logging-road|old-boundary)$/);
  }
});

test('normalized route localization keys do not collide with current root localization',()=>{
  for(const key of Object.keys(fixture.strings)){
    assert.equal(root[key],undefined,'unexpected current-root collision: '+key);
  }
});

test('every normalized route media string has complete RU and EN copy',()=>{
  for(const [key,pair] of Object.entries(fixture.strings) as [string,{ru:string;en:string}][]){
    assert.ok(pair.ru?.trim(),key+' ru');
    assert.ok(pair.en?.trim(),key+' en');
  }
});

test('fixture is presentation-only and contains no gameplay fields',()=>{
  const forbidden=[
    'conditions','effects','rewards','reward','chance',
    'progressDelta','enduranceCost','setRoute','moneyCost',
    'nextDayEnergyDelta','reactionTriggers','trigger',
    'modifyResource','addItem','addWorldFact'
  ];
  const seen=new Set<string>();
  const walk=(value:any)=>{
    if(Array.isArray(value)){for(const item of value)walk(item);return;}
    if(value&&typeof value==='object'){
      for(const [key,item] of Object.entries(value)){
        seen.add(key);
        walk(item);
      }
    }
  };
  walk(fixture);
  for(const key of forbidden)assert.equal(seen.has(key),false,key);
});

test('fixture does not create Product-open Hunter or Old Boundary token semantics',()=>{
  assert.deepEqual(
    fixture.routes.map((route:any)=>route.routeId),
    ['forest.route.logging-road','forest.route.old-boundary']
  );

  const authoredText=JSON.stringify(fixture.strings).toLowerCase();
  for(const forbidden of [
    'hunter',
    'hunter-trail',
    'token',
    'price',
    'consume',
    'turn-in',
    'surrender'
  ]){
    assert.equal(authoredText.includes(forbidden),false,forbidden);
  }

  assert.equal(fixture.invariants.changesOldBoundaryTokenSemantics,false);
  assert.equal(fixture.invariants.createsHunterRoute,false);
});
