import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
const data=JSON.parse(await readFile(new URL('map-locations.json',root),'utf8'));
const ids=data.locations.map(x=>x.id);
const hit=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
test('independent map URL and unchanged game entry',async()=>{
 const page=await readFile(new URL('map.html',root),'utf8');
 const home=await readFile(new URL('index.html',root),'utf8');
 assert.match(page,/map\.mjs/);assert.match(home,/src\.js/);assert.doesNotMatch(home,/map\.mjs/);
});
test('13 permanent ID, exactly four start assets',async()=>{
 assert.equal(ids.length,13);assert.equal(new Set(ids).size,13);
 assert.deepEqual(data.initialVisible,['sawmill','satyr_bar','undead_farm','school']);
 assert.deepEqual(data.locations.filter(x=>x.image).map(x=>x.id),data.initialVisible);
 for(const x of data.locations){assert.ok(x.position&&x.hit&&x.slot);
 if(x.image)assert.ok((await stat(new URL(x.image,root))).size>100000);
 }
 assert.ok((await stat(new URL(data.background,root))).size>100000);
});
test('rectangles remain disjoint in common viewBox',()=>{
 const {width,height}=data.coordinateSystem;
 for(const a of data.locations){
  assert.ok(a.hit.x>=0&&a.hit.y>=0&&a.hit.x+a.hit.w<=width&&a.hit.y+a.hit.h<=height,a.id);
  for(const b of data.locations)if(a!==b)assert.equal(hit(a.hit,b.hit),false,a.id+' '+b.id);
 }
});
test('no game save or scene changes from map',async()=>{
 const code=await readFile(new URL('map.mjs',root),'utf8');
 assert.doesNotMatch(code,/localStorage|sessionStorage|changeScene\(|persist\(/);
});