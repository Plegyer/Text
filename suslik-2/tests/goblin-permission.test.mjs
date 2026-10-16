import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const base=new URL('../',import.meta.url);
const work=JSON.parse(readFileSync(new URL('content/work.json',base),'utf8'));
const sandbox={window:{},structuredClone};
runInNewContext(readFileSync(new URL('gameplay-system.js',base),'utf8'),sandbox);
const core=runInNewContext(readFileSync(new URL('work-rules.js',base),'utf8')+'\n({applySawmillShift,newWorkRun})',sandbox);
runInNewContext(readFileSync(new URL('gameplay-content.js',base),'utf8'),sandbox);
const H=sandbox.window.SUSLIK2Gameplay,content=sandbox.window.SUSLIK2_GAMEPLAY_CONTENT;
const media=content.permissionMedia;
function start(spears=0){return {
 character:{stats:{strength:15,endurance:15,dexterity:1,magic:1,mana:1,sexuality:1}},
 run:core.newWorkRun(work),meta:{completedRuns:0,unlockedEndings:[]}
};}
function encounter(state,random=()=>.2){
 state.run.farForestUnlocked=true;
 assert.equal(H.farOutcome(state,random),'goblin');
}
test('Author text preserved and five permanent optional slots available',()=>{
 assert.equal(content.text.goblinPermission,
 '— Тихо-тихо, малыш, — примирительно подняла руки Амалия. — Я просто срублю одно деревце и уйду.\n'+
 '— А-а-ага... эмпр-уале... чпок! — заявил гоблин, многозначительно указывая на её грудь.\n'+
 '— Ну что же... Чпок так чпок, — вздохнула Амалия, решив, что с местными лучше договариваться по-хорошему.');
 assert.equal(media.length,5);
 assert.deepEqual(Array.from(media,x=>x.id),[1,2,3,4,5].map(x=>'MEDIA.FAR.GOBLIN.PERMISSION.00'+x));
 assert.ok(media.every(x=>x.file===null));
});
test('peaceful resolution is exactly one paid forest shift with +10, +1 lust and −1 energy',()=>{
 const s=start();encounter(s);
 const before={energy:s.run.energy,lust:s.run.lust,gold:s.run.gold,shifts:s.run.completedShifts};
 const result=H.resolveGoblinPermission(s,work,media,()=>.5);
 assert.equal(result.ok,true);assert.equal(result.already,false);
 assert.equal(s.run.energy,before.energy-1);
 assert.equal(s.run.lust,before.lust+1);
 assert.equal(s.run.gold-before.gold,s.run.lastShift.baseWage+10);
 assert.equal(s.run.completedShifts,before.shifts+1);
 assert.equal(s.run.lastShift.origin,'far-permission');
 assert.equal(s.character.stats.strength,16);
 assert.equal(s.character.stats.endurance,16);
 assert.equal(s.character.stats.dexterity,1);
 assert.equal(s.run.farAttempt.settled,true);
 assert.equal(result.receipt.energyCost,1);
 assert.equal(result.receipt.extraGold,10);
});
test('spear drop is independent 25%, respects max 15',()=>{
 for(const [chance,expected] of [[0,1],[.249999,1],[.25,0],[.999,0]]){
  const s=start();encounter(s);let drawCount=0;
  const r=H.resolveGoblinPermission(s,work,media,()=>[chance,.91][drawCount++]);
  assert.equal(r.receipt.spear,expected);assert.equal(s.run.brokenSpears,expected);
  assert.equal(drawCount,2);
 }
 const full=start();full.run.brokenSpears=15;encounter(full);
 assert.equal(H.resolveGoblinPermission(full,work,media,()=>0).receipt.spear,0);
 assert.equal(full.run.brokenSpears,15);
});
test('each encounter randomly chooses among supplied media; duplicates across attempts are allowed',()=>{
 const a=start();encounter(a);let n=0;
 assert.equal(H.resolveGoblinPermission(a,work,media,()=>[.5,.8][n++]).receipt.mediaIndex,4);
 H.farOutcome(a,()=>.2);n=0;
 const again=H.resolveGoblinPermission(a,work,media,()=>[.5,.8][n++]);
 assert.equal(again.receipt.mediaIndex,4);assert.notEqual(a.run.farAttempt.id,'far-1');
});
test('with some imported media, picks only supplied slots, original ids remain stable',()=>{
 const imported=media.map((x,i)=>({...x,file:i===1?'slot-02.mp4':i===3?'slot-04.webm':null}));
 const s=start();encounter(s);
 let i=0;const r=H.resolveGoblinPermission(s,work,imported,()=>[.3,.999][i++]);
 assert.equal(r.receipt.mediaIndex,3);
 assert.equal(r.receipt.mediaId,'MEDIA.FAR.GOBLIN.PERMISSION.004');
});
test('reopening after save/reload never pays, rerolls, or duplicates the shift',()=>{
 const s=start();encounter(s);H.resolveGoblinPermission(s,work,media,()=>0);
 const old={...s.run};const saved=H.restoreRun(JSON.parse(JSON.stringify(s.run)),work);
 const next={...s,run:saved};
 const gold=next.run.gold,shifts=next.run.completedShifts,lust=next.run.lust,energy=next.run.energy,spears=next.run.brokenSpears;
 const result=H.resolveGoblinPermission(next,work,media,()=>{throw Error('should not reroll');});
 assert.equal(result.ok,true);assert.equal(result.already,true);
 assert.equal(next.run.gold,gold);assert.equal(next.run.completedShifts,shifts);
 assert.equal(next.run.lust,lust);assert.equal(next.run.energy,energy);assert.equal(next.run.brokenSpears,spears);
 assert.equal(next.run.farAttempt.permissionResult.mediaId,old.farAttempt.permissionResult.mediaId);
});
test('cannot collect an award without eligible pending goblin attempt, energy or work access',()=>{
 const s=start();assert.equal(H.resolveGoblinPermission(s,work,media).ok,false);
 encounter(s);s.run.energy=0;
 assert.equal(H.resolveGoblinPermission(s,work,media).ok,false);
 s.run.energy=3;s.run.lust=25;
 assert.equal(H.resolveGoblinPermission(s,work,media,()=>.8).ok,true);
 assert.equal(s.run.completedShifts,1);assert.ok(s.run.gold>0);
});
test('events for the 15th/50th paid shifts remain reachable after permission route',()=>{
 const s=start();s.run.completedShifts=49;s.run.events.shift15=true;s.run.events.foreman=true;
 encounter(s);assert.equal(H.resolveGoblinPermission(s,work,media,()=>.5).ok,true);
 assert.equal(H.shiftCompleted(s,'far-permission-result'),'work-event');
 assert.equal(s.run.pendingEvent.id,'shift50');
 assert.equal(H.completeEvent(s),'far-permission-result');
 assert.equal(s.run.completedShifts,50);
});
test('UI wires both buttons to next 50/50 and direct map, not to battle',()=>{
 const source=readFileSync(new URL('gameplay-ui.js',base),'utf8');
 const main=readFileSync(new URL('offline.js',base),'utf8');
 assert.match(source,/function gpAcceptGoblinPermission\(/);
 assert.match(source,/gp\(\)\.resolveGoblinPermission\(state,work,gc\(\)\.permissionMedia\)/);
 assert.match(source,/goblin-permission-continue',gpFarAttempt/);
 assert.match(source,/goblin-permission-return',\(\)=>changeScene\('game-main'\)/);
 assert.match(main,/far-permission-result'\) gpGoblinPermissionScreen/);
});
test('local video playback supports loop, sound settings, and optional image fallback',()=>{
 const source=readFileSync(new URL('offline.js',base),'utf8');
 assert.match(source,/\\\.\(mp4\|webm\)/);
 assert.match(source,/video\.loop=true/);
 assert.match(source,/video\.volume=/);
 assert.ok(existsSync(new URL('IMPORT MEDIA.cmd',base)));
 assert.ok(existsSync(new URL('MEDIA IMPORT.ps1',base)));
});
