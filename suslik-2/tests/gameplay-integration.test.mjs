import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,statSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const base=new URL('../',import.meta.url);
const work=JSON.parse(readFileSync(new URL('content/work.json',base),'utf8'));
const c={};const sandbox={window:c};
runInNewContext(readFileSync(new URL('gameplay-system.js',base),'utf8'),sandbox);
const core=runInNewContext(readFileSync(new URL('work-rules.js',base),'utf8')+'\n({newWorkRun,applySawmillShift})',sandbox);
const H=c.SUSLIK2Gameplay;
function start(str=15,end=15,dex=1){const s={character:{stats:{strength:str,endurance:end,dexterity:dex,magic:1,sexuality:1}},run:core.newWorkRun(work),meta:{unlockedEndings:[],completedRuns:0}};return s;}
test('first shift event precedes foreman; both stats required after 15 shifts',()=>{
 const s=start(50,50);s.run.completedShifts=0;
 assert.equal(H.shiftCompleted(s),null);
 core.applySawmillShift(s,work);
 assert.equal(H.shiftCompleted(s),'work-event');assert.equal(s.run.pendingEvent.id,'shift15');
 assert.equal(H.completeEvent(s),'sawmill-work');
 s.run.completedShifts=15;
 assert.equal(H.shiftCompleted(s),'work-event');assert.equal(s.run.pendingEvent.id,'foreman');
 assert.equal(H.completeEvent(s),'sawmill-work');assert.equal(s.run.farForestUnlocked,true);
 assert.equal(H.shiftCompleted(s),null);
});
test('foreman unlock requires both stats >=15 and at least 15 shifts',()=>{
 const s=start(10,14);s.run.completedShifts=0;
 assert.equal(H.shiftCompleted(s),null);
 core.applySawmillShift(s,work);
 H.shiftCompleted(s);H.completeEvent(s);
 s.run.completedShifts=15;
 assert.equal(H.shiftCompleted(s),null);assert.equal(s.run.farForestUnlocked,false);
 s.character.stats.strength=15;s.character.stats.endurance=15;
 assert.equal(H.shiftCompleted(s),'work-event');assert.equal(s.run.pendingEvent.id,'foreman');
});
test('one-time 50th event unlocks ending button only on map',()=>{
 const s=start();s.run.completedShifts=49;s.run.events.shift15=true;s.run.events.foreman=true;
 core.applySawmillShift(s,work);
 assert.equal(H.shiftCompleted(s),'work-event');assert.equal(s.run.pendingEvent.id,'shift50');
 assert.equal(H.endingAvailable(s),false);
 H.completeEvent(s);s.run.endingOfferOnMap=true;
 assert.equal(H.endingAvailable(s),true);
 assert.equal(H.unlockEnding(s),true);assert.deepEqual(s.meta.unlockedEndings,['hard-worker']);
 assert.equal(H.unlockEnding(s),true);assert.equal(s.meta.unlockedEndings.length,1);
});
test('60/40 fresh attempts and charged seasonal shift, no roll with zero energy',()=>{
 const s=start();s.run.farForestUnlocked=true;
 assert.equal(H.farOutcome(s,()=>0.61),'ordinary');
 assert.equal(H.farOutcome(s,()=>0.95),null); // previous attempt not settled
 const r=core.applySawmillShift(s,work,{extraGold:10,origin:'far-ordinary'});
 s.run.farAttempt.settled=true;
 assert.equal(r.ok,true);assert.equal(r.wage,r.baseWage+10);
 assert.equal(s.run.gold,r.wage);assert.equal(s.run.energy,2);
 assert.equal(H.farOutcome(s,()=>0.5),'goblin');
 s.run.energy=0;assert.equal(H.farOutcome(s,()=>0.8),null);
});
test('base strength 15 / endurance 15 => 150 HP and next battle defeat',()=>{
 const s=start();s.run.farAttempt={id:'far-1',outcome:'goblin',settled:false};
 assert.equal(H.startBattle(s),true);assert.equal(s.run.battle.heroHP,150);
 for(let i=0;i<3;i++)H.turn(s,'strike',()=>0.5);
 assert.equal(s.run.battle.status,'victory');assert.equal(s.run.currentHP,30);
 s.run.farAttempt={id:'far-2',outcome:'goblin',settled:false};
 H.startBattle(s);H.turn(s,'strike',()=>0.5);
 assert.equal(s.run.battle.status,'defeat');assert.equal(s.run.currentHP,0);
});
test('strength 50 kills in one success and agility 100 dodges normal goblin',()=>{
 const s=start(50,15,1);s.run.farAttempt={id:'far-1',outcome:'goblin',settled:false};H.startBattle(s);H.turn(s,'strike',()=>0.5);
 assert.equal(s.run.battle.status,'victory');assert.equal(s.run.currentHP,150);
 const d=start(15,15,100);d.run.farAttempt={id:'far-1',outcome:'goblin',settled:false};H.startBattle(d);H.turn(d,'strike',()=>0.5);
 assert.equal(d.run.currentHP,150);assert.equal(H.dodgeChance(100,60),50);
});
test('8% miss and +20 percentage points one round guard; flee and surrender defeat',()=>{
 const s=start();s.run.farAttempt={id:'far-1',outcome:'goblin',settled:false};H.startBattle(s);
 H.turn(s,'strike',()=>0);assert.equal(s.run.battle.history[0].kind,'miss');
 const t=start();t.run.farAttempt={id:'far-1',outcome:'goblin',settled:false};H.startBattle(t);
 assert.equal(H.dodgeChance(1,20,20),20);
 H.turn(t,'dodge',()=>.1);assert.equal(t.run.currentHP,150);
 H.turn(t,'strike',()=>.5);assert.equal(t.run.currentHP,90);
 for(const a of ['flee','surrender']){const f=start();f.run.farAttempt={id:'far-1',outcome:'goblin',settled:false};H.startBattle(f);H.turn(f,a);assert.equal(f.run.battle.status,'defeat');}
});
test('victory reward once; +10 plus [1..6] gold, only 15 spears total, exact 1 energy',()=>{
 const s=start(50);s.run.farAttempt={id:'far-1',outcome:'goblin',settled:false};H.startBattle(s);H.turn(s,'strike',()=>.5);
 s.run.brokenSpears=14;
 const before=s.run.gold,energy=s.run.energy;
 const reward=H.rewardVictory(s,work,()=>.99);
 assert.equal(reward.lootGold,6);assert.equal(reward.extraGold,10);assert.equal(reward.spear,1);assert.equal(s.run.gold-before,reward.wage);
 assert.equal(energy-s.run.energy,1);assert.equal(s.run.brokenSpears,15);
 assert.equal(H.rewardVictory(s,work,()=>0),null);
 const t=start(50);t.run.brokenSpears=15;t.run.farAttempt={id:'far-1',outcome:'goblin',settled:false};H.startBattle(t);H.turn(t,'strike',()=>.5);
 assert.equal(H.rewardVictory(t,work,()=>0).spear,0);
});
test('wake restores energy HP and mana after any nightly option',()=>{
 const s=start();s.run.energy=0;s.run.currentHP=1;s.run.currentMana=0;
 H.wake(s);assert.equal(s.run.energy,3);assert.equal(s.run.currentHP,150);assert.equal(s.run.currentMana,1);assert.equal(s.run.elapsedDays,1);
});
test('author artwork and audio used in combat and night exist',()=>{
 for(const f of ['assets/combat/hero-standard.png','assets/combat/goblin.png','assets/combat/Shields_Against_the_Sky.mp3','assets/night/room.png','assets/night/street.png','assets/night/satyr-work.png']) assert.ok(statSync(new URL(f,base)).size>100000);
});
