import test from 'node:test';import assert from 'node:assert/strict';
import {loadCatalog} from '../src/core/content.ts';
import {definitions,rawPacks} from './helpers.ts';
test('all shipped content is valid',()=>assert.doesNotThrow(()=>loadCatalog(definitions,rawPacks)));
test('duplicate event IDs are rejected',()=>{const p=structuredClone(rawPacks);p[0].events.push(p[0].events[0]);assert.throws(()=>loadCatalog(definitions,p),/Повтор ID/);});
test('undeclared writes are rejected',()=>{const p=structuredClone(rawPacks);const pack=p.find(x=>x.id==='guard.career');assert.ok(pack);pack.capabilities.writes.careers=pack.capabilities.writes.careers.filter((x:string)=>x!=='guard');assert.throws(()=>loadCatalog(definitions,p),/write career guard/);});
test('contradictory requirements are rejected',()=>{const p=structuredClone(rawPacks);p[0].events[0].conditions=[{kind:'metric',key:'strength',op:'gte',value:50},{kind:'metric',key:'strength',op:'lte',value:20}];assert.throws(()=>loadCatalog(definitions,p),/Противоречивые/);});
test('missing free choice, fallback variant and media are rejected',()=>{
  const p=structuredClone(rawPacks);p[0].events[0].choices[0].conditions=[{kind:'metric',key:'money',op:'gte',value:100}];assert.throws(()=>loadCatalog(definitions,p),/выход/);
  const q=structuredClone(rawPacks);q[0].events[0].variants[0].media=['missing.asset'];assert.throws(()=>loadCatalog(definitions,q),/медиа/);
});
