import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const root=new URL('../',import.meta.url);
const sandbox={window:{},structuredClone};
runInNewContext(readFileSync(new URL('gameplay-system.js',root),'utf8'),sandbox);
runInNewContext(readFileSync(new URL('gameplay-content.js',root),'utf8'),sandbox);
const H=sandbox.window.SUSLIK2Gameplay;
const defs=sandbox.window.SUSLIK2_GAMEPLAY_CONTENT.defeats;
const text=sandbox.window.SUSLIK2_GAMEPLAY_CONTENT.text.goblinDefeat;
function game(gold=90,energy=3,attempt='far-7'){
 return {run:{gold,energy,energyMax:3,battle:{attemptId:attempt,enemyId:'goblin',status:'defeat',heroHP:0},farAttempt:{id:attempt,outcome:'goblin',settled:false},pendingDefeat:null},character:{stats:{strength:15,endurance:15,dexterity:1,magic:1}}};
}
test('archive slots keep 4 stable identifiers, no unapproved media included',()=>{
 assert.deepEqual(Array.from(defs.goblin.media,x=>x.id),['MEDIA.DEFEAT.GOBLIN.001','MEDIA.DEFEAT.GOBLIN.002','MEDIA.DEFEAT.GOBLIN.003','MEDIA.DEFEAT.GOBLIN.004']);
 assert.ok(defs.goblin.media.every(x=>x.file===null));
 assert.equal(text,'Последний удар оказался подсечкой, и Амалия, потеряв равновесие, рухнула на землю. Гоблин с торжествующим визгом отбросил копьё и набросился на неё.\nЛишь к самому вечеру обессиленная, перепачканная грязью Амалия кое-как выползла из леса.');
});
test('lost battle charges all energy and exactly 30 gold once',()=>{
 const s=game();let draws=0;
 const result=H.resolveDefeat(s,defs.goblin,()=>{draws++;return 0.74;});
 assert.equal(result.ok,true);
 assert.equal(s.run.gold,60);assert.equal(s.run.energy,0);
 assert.equal(s.run.pendingDefeat.mediaIndex,2);
 assert.equal(s.run.farAttempt.settled,true);
 assert.equal(s.run.battle.defeatResolved,true);
 assert.equal(draws,1);
 const again=H.resolveDefeat(s,defs.goblin,()=>{draws++;return 0;});
 assert.equal(again.already,true);assert.equal(draws,1);assert.equal(s.run.gold,60);
});
test('media slot selection covers all four entries, uniform ranges',()=>{
 for(const [number,value] of [0,.25,.5,.99999].entries()){
  const s=game(); const r=H.resolveDefeat(s,defs.goblin,()=>value);
  assert.equal(r.receipt.mediaIndex,number);
 }
});
test('persisted outcome cannot change on reload and continue exits to map',()=>{
 const s=game(30,5),r=H.resolveDefeat(s,defs.goblin,()=>.25);
 assert.equal(r.ok,true);
 const work={initial:{energy:3,energyMax:3,lust:0}};
 const restored=H.restoreRun(JSON.parse(JSON.stringify(s.run)),work);
 assert.equal(restored.pendingDefeat.mediaId,'MEDIA.DEFEAT.GOBLIN.002');
 const reState={run:restored};
 assert.equal(H.resolveDefeat(reState,defs.goblin,()=>0).already,true);
 assert.equal(H.leaveDefeat(reState),'game-main');
 assert.equal(reState.run.energy,0);
 assert.equal(reState.run.gold,0);
 assert.equal(reState.run.battle,null);
 assert.equal(reState.run.farAttempt,null);
 assert.equal(reState.run.pendingDefeat,null);
 assert.equal(H.leaveDefeat(reState),null);
});
test('other creatures use different rules with no hardcoded goblin effect',()=>{
 const s=game(80,4);s.run.battle.enemyId='troll';
 assert.equal(H.resolveDefeat(s,defs.goblin).ok,false);
 const troll={id:'troll',goldLoss:7,returnScene:'game-main',media:[{id:'MEDIA.DEFEAT.TROLL.01'}]};
 assert.equal(H.resolveDefeat(s,troll,()=>.3).ok,true);
 assert.equal(s.run.gold,73);assert.equal(s.run.pendingDefeat.mediaId,'MEDIA.DEFEAT.TROLL.01');
});
test('goblin defeat takes at most available gold; never creates debt',()=>{
 for(const available of [0,1,10,23,29,30,31,90]){
  const s=game(available,3);
  const result=H.resolveDefeat(s,defs.goblin,()=>.75);
  assert.equal(result.ok,true);
  assert.equal(s.run.gold,Math.max(0,available-30));
  assert.equal(result.receipt.goldLoss,Math.min(30,available));
  assert.equal(s.run.energy,0);
  const again=H.resolveDefeat(s,defs.goblin,()=>0);
  assert.equal(again.already,true);
  assert.equal(s.run.gold,Math.max(0,available-30));
  assert.equal(H.leaveDefeat(s),'game-main');
 }
});
test('shortfall and zero gold preserve one chosen defeat image over save/restore',()=>{
 const s=game(10,3);
 H.resolveDefeat(s,defs.goblin,()=>.999);
 const restored=H.restoreRun(JSON.parse(JSON.stringify(s.run)),{initial:{energy:3,energyMax:3,lust:0}});
 assert.equal(restored.gold,0);
 assert.equal(restored.pendingDefeat.mediaId,'MEDIA.DEFEAT.GOBLIN.004');
 assert.equal(restored.pendingDefeat.goldLoss,10);
 assert.equal(H.resolveDefeat({run:restored},defs.goblin,()=>0).already,true);
});
test('no defeat penalty on victory or an active battle',()=>{
 for(const status of ['victory','active']){
  const s=game();s.run.battle.status=status;
  assert.equal(H.resolveDefeat(s,defs.goblin,()=>0).ok,false);
  assert.equal(s.run.gold,90);assert.equal(s.run.energy,3);
 }
});
test('battle UI routes defeat through handler; one Next leaves to map',()=>{
 const ui=readFileSync(new URL('gameplay-ui.js',root),'utf8');
 const offline=readFileSync(new URL('offline.js',root),'utf8');
 assert.match(ui,/gp\(\)\.resolveDefeat\(state,gc\(\)\.defeats\.goblin\)/);
 assert.match(ui,/function gpDefeatScreen\(\)/);
 assert.match(ui,/'combat-defeat-next'/);
 assert.match(ui,/gp\(\)\.leaveDefeat\(state\)/);
 assert.match(offline,/else if \(state.sceneId==='combat-defeat'\) gpDefeatScreen\(\)/);
});
