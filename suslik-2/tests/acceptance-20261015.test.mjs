import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const base = new URL('../',import.meta.url);
const read = p => readFileSync(new URL(p,base),'utf8');
const sandbox={window:{},structuredClone};
runInNewContext(read('gameplay-system.js'),sandbox);
const work=JSON.parse(read('content/work.json'));
const H=sandbox.window.SUSLIK2Gameplay;
const w=runInNewContext(read('work-rules.js')+'\n({applySawmillShift,newWorkRun})',sandbox);
const newState=()=>({character:{stats:{strength:1,endurance:1,dexterity:1,magic:1,sexuality:1,grooming:1}},run:w.newWorkRun(work),meta:{unlockedEndings:[],completedRuns:0}});
test('first paid shift triggers dwarf once; foreman still needs 15 shifts and both stats',()=>{
 const s=newState(); w.applySawmillShift(s,work,{random:()=>.99});
 assert.equal(H.shiftCompleted(s),'work-event'); assert.equal(s.run.pendingEvent.id,'shift15');
 H.completeEvent(s);assert.equal(H.shiftCompleted(s),null);
 s.run.completedShifts=15;s.character.stats.strength=15;s.character.stats.endurance=15;
 assert.equal(H.shiftCompleted(s),'work-event');assert.equal(s.run.pendingEvent.id,'foreman');
});
test('goblins encountered in 60% of tries',()=>{
 for(const [num,result] of [[0,'goblin'],[.59,'goblin'],[.6,'ordinary'],[.99,'ordinary']]){
  const s=newState();s.run.farForestUnlocked=true;assert.equal(H.farOutcome(s,()=>num),result);
 }
});
test('satyr subtracts only a characteristic above minimum, never lust',()=>{
 const s=newState(); assert.equal(H.satyrWork(s),null);
 s.character.stats.sexuality=3;assert.equal(H.satyrWork(s,()=>0),'sexuality');assert.equal(s.character.stats.sexuality,2);
 assert.equal(s.run.lastSatyrLoss,'sexuality');assert.equal(s.run.lust,work.initial.lust);
});
test('winter lust appears as separate stat while never locking work',()=>{
 const s=newState();s.run.elapsedDays=30;s.run.lust=100;
 const r=w.applySawmillShift(s,work,{random:()=>.4});
 assert.equal(r.ok,true);assert.ok(r.effects.some(x=>x.stat==='lust'&&x.delta===2));
 assert.equal(s.run.lust,102);assert.equal(r.lustEvent,true);
});
test('work entry and map include controls without automatic paid shift; log scrolls',()=>{
 const js=read('offline.js'),css=read('style.css');
 assert.match(js,/state\.run\.lastShift=null;changeScene\('sawmill-work'\)/);
 assert.match(js,/map-inventory/);assert.match(js,/map-stats/);assert.match(js,/map-menu/);
 assert.match(read('gameplay-ui.js'),/sleep-free-street/);assert.match(css,/\.combat-history\{flex:0 0 67px/);
 assert.match(js,/introAllowApplied/);assert.match(read('gameplay-ui.js'),/changeScene\('game-main'\)/);
});
