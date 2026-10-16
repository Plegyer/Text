import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const root=new URL('../',import.meta.url);
const work=JSON.parse(readFileSync(new URL('content/work.json',root),'utf8'));
const sandbox={window:{SUSLIK2_GAMEPLAY_CONTENT:{lustMedia:[]}},structuredClone};
const rule=runInNewContext(readFileSync(new URL('work-rules.js',root),'utf8')+'\n({newWorkRun,applySawmillShift})',sandbox);
runInNewContext(readFileSync(new URL('gameplay-system.js',root),'utf8'),sandbox);
const H=sandbox.window.SUSLIK2Gameplay;
function newState(){return {character:{stats:{strength:50,endurance:50,dexterity:1,magic:30,sexuality:1,charm:1,grooming:1}},run:rule.newWorkRun(work),meta:{unlockedEndings:[],completedRuns:0}};}
test('one work-lust pool and every-third bonus persist, with no blocking',()=>{
 const s=newState();s.run.lust=100;
 for(let n=1;n<=6;n++){
  if(n===4)s.run.energy=3;
  const receipt=rule.applySawmillShift(s,work,{random:()=>.1});
  assert.ok(receipt.ok);assert.equal(receipt.lustEvent,true);
  assert.equal(s.run.lustEventCount,n);
  if(n===3)assert.equal(s.run.lust,101);
 }
 assert.equal(s.run.lust,102);
});
test('sawmill season effects are only modern table, keep minimum',()=>{
 const s=newState();s.run.elapsedDays=10;
 s.character.stats.grooming=1;
 rule.applySawmillShift(s,work,{random:()=>.99});
 assert.equal(s.character.stats.dexterity,2);
 assert.equal(s.character.stats.endurance,51);
 assert.equal(s.character.stats.grooming,1);
});
test('handover only once and blocks further spear drops',()=>{
 const s=newState();s.run.farForestUnlocked=true;s.run.brokenSpears=15;
 assert.equal(H.canHandover(s),true);assert.equal(H.handover(s),true);
 assert.equal(s.run.brokenSpears,0);assert.equal(H.handover(s),false);
 assert.equal(s.run.foremanQuestFinished,true);
});
test('each night training counts once, restores energy and stats',()=>{
 const s=newState();s.run.foremanQuestFinished=true;s.run.energy=0;
 assert.equal(H.beginTraining(s),true);assert.equal(H.beginTraining(s),false);
 assert.equal(H.finishTraining(s),true);assert.equal(H.finishTraining(s),false);
 assert.equal(s.run.nightTrainingCount,1);assert.equal(s.character.stats.strength,51);
 assert.equal(s.run.energy,s.run.energyMax);
});
test('ogre gate respects training count + both stats and one-time entry',()=>{
 const s=newState();s.run.foremanQuestFinished=true;s.run.nightTrainingCount=14;
 assert.equal(H.ogreIntroReady(s),false);
 s.run.nightTrainingCount=15;
 assert.equal(H.beginOgreIntro(s),true);assert.equal(H.beginOgreIntro(s),false);
 assert.equal(H.startOgre(s),true);assert.equal(H.startOgre(s),false);
 assert.equal(s.run.battle.enemyId,'ogre');assert.equal(s.run.battle.enemyHP,280);
});
test('fireball costs 10, deals 40+2 magic, always after enemy turn',()=>{
 const s=newState();s.run.foremanQuestFinished=true;s.run.nightTrainingCount=15;
 H.beginOgreIntro(s);s.character.stats.mana=30;s.run.currentMana=30;H.startOgre(s);s.run.knownSpells=['fireball'];
 assert.equal(H.turn(s,'spell',()=>.1),true);
 assert.equal(s.run.battle.enemyHP,180);assert.equal(s.run.currentMana,20);
 assert.equal(s.run.battle.history.at(-1).kind,'spell');
});
test('ogre victory removes night training, head handed over once, ending optional',()=>{
 const s=newState();s.run.foremanQuestFinished=true;s.run.nightTrainingCount=15;
 H.beginOgreIntro(s);H.startOgre(s);s.run.battle.status='victory';
 assert.equal(H.finishOgreVictory(s),true);assert.equal(H.canTrain(s),false);
 assert.equal(H.ogreAfterIntro(s),true);assert.equal(H.finishOgreAfter(s),true);
 assert.equal(s.run.ogreHead,false);assert.equal(s.run.ogreEndingReady,true);
 assert.equal(H.finishOgreAfter(s),false);assert.equal(s.meta.unlockedEndings.length,0);
 assert.equal(H.unlockEnding(s,'foreman-lady'),true);assert.deepEqual([...s.meta.unlockedEndings],['foreman-lady']);
});
test('reload retains late quest state, lust, training, known magic',()=>{
 const s=newState();s.run.foremanQuestFinished=true;s.run.ogreEndingReady=true;
 s.run.nightTrainingCount=15;s.run.lust=64;s.run.knownSpells=['fireball'];
 const load=H.restoreRun(JSON.parse(JSON.stringify(s.run)),work);
 assert.equal(load.lust,64);assert.equal(load.nightTrainingCount,15);
 assert.equal(load.foremanQuestFinished,true);assert.deepEqual([...load.knownSpells],['fireball']);
});
