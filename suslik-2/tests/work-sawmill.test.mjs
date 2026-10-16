import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';
const base=new URL('../',import.meta.url);
const rules=await readFile(new URL('work-rules.js',base),'utf8');
const source=await readFile(new URL('content/work.json',base),'utf8');
const work=JSON.parse(source);
const scenes=JSON.parse(await readFile(new URL('content/scenes.json',base),'utf8'));
const creation=JSON.parse(await readFile(new URL('content/creation.json',base),'utf8'));
const runtime=runInNewContext(rules+'\n({newWorkRun,workSeason,sawmillAvailability,applySawmillShift})',{});
const state=(day=0,stats={})=>({run:{...runtime.newWorkRun(work),elapsedDays:day},character:{stats:Object.fromEntries(creation.stats.map(k=>[k,stats[k]??1]))}});

test('only the four exact authored pictures appear in proper seasons',async()=>{
 const seasons=['spring','summer','autumn','winter'];
 assert.equal(work.sawmill.lustBelow,undefined);
 assert.equal(work.sawmill.energyCost,1);
 for(const [i,season] of seasons.entries()){
  assert.equal(runtime.workSeason(i*10,work),season);
  assert.equal(runtime.workSeason(i*10+9,work),season);
  const image=work.sawmill.seasonal[season].image;
  assert.equal(image,`assets/work/sawmill/${season}.png`);
  assert.ok((await stat(new URL(image,base))).size>3000000);
 }
 assert.equal(runtime.workSeason(40,work),'spring');
});
test('seasonal effects are precisely authored: spring, summer, autumn, winter',()=>{
 const expected={spring:{strength:1,endurance:1},summer:{dexterity:1,endurance:1,grooming:-1},autumn:{charm:1},winter:{lust:2,strength:-1}};
 for(const [season,values] of Object.entries(expected)){
  assert.deepEqual(Object.fromEntries(work.sawmill.seasonal[season].effects.map(x=>[x.stat,x.delta])),values);
 }
});
test('one paid spring shift spends one energy, gains stats, pays using BEFORE stats, never advances day',()=>{
 const s=state(0,{strength:5,endurance:9,dexterity:2});
 const result=runtime.applySawmillShift(s,work);
 assert.equal(result.ok,true);
 assert.equal(result.season,'spring');
 assert.equal(result.wage,Math.round(35+5*.5+9*.25));
 assert.equal(s.run.energy,2);
 assert.equal(s.character.stats.strength,6);
 assert.equal(s.character.stats.endurance,10);
 assert.equal(s.character.stats.dexterity,2);
 assert.equal(s.run.moneyEarned,result.wage);
 assert.equal(s.run.elapsedDays,0);
});
test('successive shift charges exactly once per click, then no more with zero energy',()=>{
 const s=state();
 const earned=[];
 for(let i=0;i<3;i++){
  const r=runtime.applySawmillShift(s,work);assert.equal(r.ok,true);earned.push(r.wage);
 }
 assert.equal(s.run.energy,0);
 assert.equal(s.run.completedShifts,3);
 assert.equal(s.character.stats.strength,4);
 assert.equal(s.character.stats.endurance,4);
 const before=JSON.stringify(s);
 const blocked=runtime.applySawmillShift(s,work);
 assert.equal(blocked.ok,false);
 assert.equal(blocked.reason,'noEnergy');
 assert.equal(JSON.stringify(s),before);
 assert.equal(s.run.moneyEarned,earned.reduce((a,b)=>a+b,0));
});
test('lust >=25 never blocks; event odds equal Lust percent, with one wage/charge',()=>{
 const s=state();s.run.lust=25;
 const good=runtime.applySawmillShift(s,work,{random:()=>0.0});
 assert.equal(good.ok,true);assert.equal(good.lustEvent,true);assert.equal(s.run.energy,2);
 const plain=runtime.applySawmillShift(s,work,{random:()=>0.99});
 assert.equal(plain.ok,true);assert.equal(plain.lustEvent,false);assert.equal(s.run.completedShifts,2);
});
test('winter clamps negative strength to minimum 1 and grants lust, energy can grow to 5',()=>{
 const s=state(30,{strength:1,endurance:1});s.run.energyMax=5;s.run.energy=5;
 for(let i=0;i<5;i++)assert.equal(runtime.applySawmillShift(s,work).ok,true);
 assert.equal(s.character.stats.strength,1);
 assert.equal(s.character.stats.endurance,1);
 assert.equal(s.run.lust,15);
 assert.equal(s.run.energy,0);
 assert.equal(s.run.completedShifts,5);
});
test('wage is rounded and capped at 120 as in prior lumber.shift',()=>{
 const s=state(10,{strength:100,endurance:100});
 assert.equal(runtime.applySawmillShift(s,work).wage,110);
 assert.deepEqual(work.sawmill.wage,{base:35,weights:[{stat:'strength',factor:.5},{stat:'endurance',factor:.25}],cap:120,rounding:'Math.round',calculation:'before-effects'});
});
test('buttons and offline content bind the sawmill route; no additional day or hidden location unlocks',async()=>{
 assert.equal(scenes.scenes['sawmill-work'].kind,'work');
 assert.deepEqual(scenes.scenes['sawmill-work'].actions.map(x=>x.target),['sawmill-work','game-main']);
 const js=await readFile(new URL('offline.js',base),'utf8');
 assert.match(js,/if\(loc\.id === 'sawmill'\)/);
 assert.match(js,/state\.run\.lastShift=null;changeScene\('sawmill-work'\)/);
 assert.match(js,/again\.disabled=sawmillAvailability\(state,work\)!==null/);
 const bundled=await readFile(new URL('content/offline-content.js',base),'utf8');
 const content=JSON.parse(bundled.split('window.SUSLIK2_CONTENT = ',2)[1].trim().replace(/;$/,''));
 assert.deepEqual(content.work,work);
 assert.deepEqual(content.scenes,scenes);
 assert.match(await readFile(new URL('index.html',base),'utf8'),/src="work-rules\.js"/);
});
