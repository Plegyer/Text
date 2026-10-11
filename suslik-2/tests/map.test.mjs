import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
const data=JSON.parse(await readFile(new URL('map-locations.json',root),'utf8'));
const ids=data.locations.map(x=>x.id);
const boxhit=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
test('map remains on independent /map.html route',async()=>{
 const page=await readFile(new URL('map.html',root),'utf8');
 assert.match(page,/map\.mjs/);
 assert.ok(!page.includes('localStorage'));
});
test('13 permanent IDs, all arts present, four start locations',async()=>{
 assert.equal(data.locations.length,13);
 assert.equal(new Set(ids).size,13);
 assert.deepEqual(data.initialVisible,['sawmill','satyr_bar','undead_farm','school']);
 assert.equal(data.coordinateSystem.width,1672);
 assert.equal(data.coordinateSystem.height,941);
 assert.ok((await stat(new URL(data.background,root))).size>200000);
 for(const loc of data.locations){
  assert.ok(loc.image&&loc.image.endsWith('.png'),loc.id);
  assert.ok((await stat(new URL(loc.image,root))).size>10000,loc.id);
 }
});
test('image and active hit regions remain in viewBox',()=>{
 const {width,height}=data.coordinateSystem;
 for(const loc of data.locations){
  for(const key of ['position','hit']){
   const b=loc[key];
   assert.ok(b&&[b.x,b.y,b.w,b.h].every(Number.isFinite),loc.id);
   assert.ok(b.x>=0&&b.y>=0&&b.w>0&&b.h>0&&b.x+b.w<=width&&b.y+b.h<=height,loc.id+' '+key);
  }
  assert.ok(boxhit(loc.position,loc.hit),loc.id);
 }
});
test('art layer and click targets are separate; preview cannot write saves',async()=>{
 const code=await readFile(new URL('map.mjs',root),'utf8');
 assert.match(code,/preview\|\|unlocked\.has\(loc\.id\)/);
 assert.match(code,/const clickable=map\.locations\.filter/);
 assert.match(code,/getInteractiveLocationIds/);
 assert.doesNotMatch(code,/localStorage|sessionStorage|persist\(|changeScene\(/);
});
