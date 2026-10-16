import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';
import {createHash} from 'node:crypto';
const from=relative=>new URL('../'+relative,import.meta.url);
const work=JSON.parse(await readFile(from('content/work.json'),'utf8'));
const scenes=JSON.parse(await readFile(from('content/scenes.json'),'utf8'));
const music=JSON.parse(await readFile(from('content/music.json'),'utf8'));
const creation=JSON.parse(await readFile(from('content/creation.json'),'utf8'));
const manifest=JSON.parse(await readFile(from('content/undead-farm-media-manifest.json'),'utf8'));
const rules=await readFile(from('work-rules.js'),'utf8');
const runtime=runInNewContext(rules+'\n({newWorkRun,workSeason,applyUndeadFarmShift})',{});
const mk=(day,values={},lust=5)=>({
 run:{...runtime.newWorkRun(work),elapsedDays:day,lust},
 character:{stats:Object.fromEntries(creation.stats.map(k=>[k,values[k]??1]))}
});
test('four user uploaded images are present in the LIVE offline build with exact hashes and seasonal pairing',async()=>{
 const files={spring:'изображение(20261015-114702).png',summer:'изображение(20261015-114638).png',autumn:'изображение(20261015-114650).png',winter:'изображение(20261015-114654).png'};
 for(const [index,season] of ['spring','summer','autumn','winter'].entries()){
   const entry=work.farm.seasonal[season], reference=manifest.seasons[season];
   assert.equal(entry.image,reference.file);
   assert.equal(runtime.workSeason(index*10,work),season);
   assert.equal(reference.source,files[season]);
   const bytes=await readFile(from(entry.image));
   assert.ok(bytes.byteLength>3_000_000);
   assert.equal(createHash('sha256').update(bytes).digest('hex'),reference.sha256);
 }
});
test('farm uses legacy wage math, energy cost, shared funds and exact seasonal stats without items/endings',()=>{
 const expected={spring:{endurance:1,magic:1,reason:-1},summer:{endurance:1,strength:1},autumn:{endurance:1,reason:1,strength:-1},winter:{magic:1,reason:1}};
 const stats={strength:2,endurance:15,magic:10,reason:5};
 for(const [idx,season] of ['spring','summer','autumn','winter'].entries()){
  assert.deepEqual(Object.fromEntries(work.farm.seasonal[season].effects.map(v=>[v.stat,v.delta])),expected[season]);
  const state=mk(idx*10,stats);
  const r=runtime.applyUndeadFarmShift(state,work,{random:()=>.99});
  assert.equal(r.ok,true);
  assert.equal(r.wage,46);
  assert.equal(state.run.gold,46);
  assert.equal(state.run.energy,2);
  assert.equal(state.run.farmShifts,1);
  assert.equal(state.run.completedShifts,0,'sawmill counter must not change');
  assert.equal(state.run.moneyEarned,46);
  assert.equal(state.run.farmLastShift.season,season);
  assert.deepEqual(Object.keys(state.run).filter(k=>/farm_produce|farm_specimen/.test(k)),[]);
 }
 assert.deepEqual(work.farm.items,[]);
 assert.deepEqual(work.farm.endings,[]);
});
test('minimum of every stat is 1, wage computed before seasonal gains, and maximum wage is 120',()=>{
 let s=mk(20,{strength:1,endurance:1,reason:1,magic:1});
 let r=runtime.applyUndeadFarmShift(s,work,{random:()=>.99});
 assert.ok(r.effects.some(e=>e.stat==='strength'&&e.delta===0));
 assert.equal(s.character.stats.strength,1);
 s=mk(0,{strength:1,endurance:200,reason:200,magic:200});
 r=runtime.applyUndeadFarmShift(s,work,{random:()=>.99});
 assert.equal(r.wage,120);
 assert.equal(s.character.stats.endurance,200);
 s=mk(0,{strength:1,endurance:1,reason:1,magic:1});
 r=runtime.applyUndeadFarmShift(s,work,{random:()=>.99});
 assert.equal(r.wage,38); // Math.round(37.8) BEFORE spring increases
 assert.equal(s.character.stats.reason,1);
});
test('one universal Lust count across sawmill and farm, no blocking work',()=>{
 const s=mk(10,{endurance:10,strength:20,magic:3,reason:5},30);
 s.run.lustEventCount=2;
 const first=runtime.applyUndeadFarmShift(s,work,{random:()=>0});
 assert.equal(first.lustEvent,true);
 assert.equal(s.run.lust,31);
 assert.equal(s.run.lustEventCount,3);
 const second=runtime.applyUndeadFarmShift(s,work,{random:()=>.99});
 assert.equal(second.lustEvent,false);
 assert.equal(s.run.farmShifts,2);
 assert.equal(s.run.energy,1);
 const third=runtime.applyUndeadFarmShift(s,work,{random:()=>.99});
 assert.equal(third.ok,true);
 assert.equal(s.run.energy,0);
 const blocked=runtime.applyUndeadFarmShift(s,work,{random:()=>0});
 assert.equal(blocked.ok,false);
 assert.equal(s.run.farmShifts,3);
});
test('farm starts on city map, lives in one gameplay scene and requests one actual soundtrack',async()=>{
 const code=await readFile(from('offline.js'),'utf8');
 const ui=await readFile(from('gameplay-ui.js'),'utf8');
 const embed=await readFile(from('content/offline-content.js'),'utf8');
 assert.match(code,/loc\.id==='undead_farm'/);
 assert.match(code,/sceneUndeadFarmWork\(scene\)/);
 for(const id of ['undead-farm-start','undead-farm-continue','undead-farm-return'])assert.ok(ui.includes(id));
 assert.equal(scenes.scenes['undead-farm-work'].music,'farm');
 assert.equal(music.tracks.farm.file,manifest.music.file);
 assert.ok((await stat(from(music.tracks.farm.file))).size>1_000_000);
 const bytes=await readFile(from(music.tracks.farm.file));
 assert.equal(createHash('sha256').update(bytes).digest('hex'),manifest.music.sha256);
 assert.ok(embed.includes('"undead-farm-work"'));
 assert.ok(embed.includes('The_Ghoul_s_Night_Shift.mp3'));
});
test('free street night lowers current grooming by 1 to minimum 1, uses existing night music',async()=>{
 const source=await readFile(from('gameplay-system.js'),'utf8');
 const sandbox={window:{}};
 runInNewContext(source,sandbox);
 const game=sandbox.window.SUSLIK2Gameplay;
 for(const initial of [1,2,8]){
  const st=mk(0,{grooming:initial,magic:1,endurance:1});
  game.wake(st,true);
  assert.equal(st.character.stats.grooming,Math.max(1,initial-1));
  assert.equal(st.run.energy,2);
  assert.equal(st.run.elapsedDays,1);
  assert.equal(st.run.energyMax,3);
  assert.equal(st.run.currentHP,10);
 }
 const paid=mk(0,{grooming:8});game.wake(paid,false);
 assert.equal(paid.character.stats.grooming,8);
 assert.equal(paid.run.energy,3);
 assert.equal(scenes.scenes['night-street'].music,'night');
});
