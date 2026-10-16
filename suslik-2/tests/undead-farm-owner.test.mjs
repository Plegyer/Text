import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';
import {createHash} from 'node:crypto';
const from = path => new URL('../'+path,import.meta.url);
const [rules,engine,ui,authored,offline,bundle]=await Promise.all([
 'work-rules.js','gameplay-system.js','gameplay-ui.js','gameplay-content.js',
 'offline.js','content/offline-content.js'
].map(p=>readFile(from(p),'utf8')));
const scenes=JSON.parse(await readFile(from('content/scenes.json'),'utf8'));
const work=JSON.parse(await readFile(from('content/work.json'),'utf8'));
const creation=JSON.parse(await readFile(from('content/creation.json'),'utf8'));
const screenshot='assets/events/undead-farm-owner-05.png';
const sourceText='— Уууу... аааргх... — проскрипел стоявший перед Амалией зомби. — Копать... носить... работать... ррааар...\n— Знаю-знаю, — понимающе кивнула Амалия. — Всё детство на ферме провела. Бери больше — кидай дальше.\n— Уааааа... Девошка умный... Кидай-носи... Уаааарх! — одобрительно прохрипел зомби.';
function setup(){
 const ctx={window:{},structuredClone,Math};
 runInNewContext(engine+'\n'+rules+'\n'+authored+'\n'+bundle,ctx);
 const state={run:ctx.window.SUSLIK2Gameplay.startRun(work),character:{stats:Object.fromEntries(creation.stats.map(id=>[id,1]))},settings:{locale:'ru'},sceneId:'undead-farm-work'};
 let saves=0,renders=0;
 Object.assign(ctx,{state,work,persist:()=>{saves++},render:()=>{renders++},changeScene:id=>{state.sceneId=id;saves++},
 root:{},copy:()=>({stats:{}})});
 runInNewContext(ui,ctx);
 ctx.gpScene=(image,text,buttons)=>{ctx.view={image,text,buttons};};
 return {ctx,state,game:ctx.window.SUSLIK2Gameplay,getSaves:()=>saves,getRenders:()=>renders};
}
test('exact authored dialogue is a single farm-music scene with exclusive render',()=>{
 const s=setup();
 assert.equal(s.ctx.window.SUSLIK2_GAMEPLAY_CONTENT.text.undeadFarmOwner05,sourceText);
 assert.equal(s.ctx.window.SUSLIK2_GAMEPLAY_CONTENT.images.undeadFarmOwner05,screenshot);
 assert.equal(scenes.scenes['undead-farm-owner-05'].music,'farm');
 assert.equal(scenes.scenes['undead-farm-owner-05'].kind,'panel');
 assert.ok(bundle.includes('"undead-farm-owner-05"'));
 assert.match(offline,/if \(state\.sceneId==='undead-farm-owner-05'\) sceneUndeadFarmOwner05\(\);\s*else if \(state\.sceneId==='work-event'\)/);
});
test('exact user PNG is checked when published in this branch',async t=>{
 try{await access(from(screenshot));}catch{t.diagnostic('Original PNG not published in this branch yet: GitHub binary import remains pending');return;}
 const image=await readFile(from(screenshot));
 assert.equal(createHash('sha256').update(image).digest('hex'),'493dd3ce9fd1c1fe73fb513e2cf97156e113874b2db4aa92c1d70c99be9a1f13');
});
test('paid fifth shift opens encounter once; Далее keeps shift rewards',()=>{
 const {ctx,state}=setup();
 for(let count=1;count<=5;count++){
  if(!state.run.energy)state.run.energy=state.run.energyMax;
  const previousGold=state.run.gold,previousEnergy=state.run.energy;
  assert.equal(ctx.startUndeadFarmShift(),true);
  assert.equal(state.run.farmShifts,count);
  assert.equal(state.run.energy,previousEnergy-1);
  assert.ok(state.run.gold>previousGold);
  assert.equal(state.run.farmOwnerMet,count===5);
  assert.equal(state.sceneId,count===5?'undead-farm-owner-05':'undead-farm-work');
  if(count<5)state.run.farmLastShift=null;
 }
 const gold=state.run.gold,energy=state.run.energy,shifts=state.run.farmShifts;
 assert.equal(ctx.startUndeadFarmShift(),false);
 ctx.sceneUndeadFarmOwner05();
 assert.equal(ctx.view.buttons.length,1);
 assert.equal(ctx.view.buttons[0].label,'Далее');
 assert.equal(ctx.view.image,screenshot);
 assert.equal(ctx.view.text,sourceText);
 ctx.view.buttons[0].fn();
 assert.equal(state.sceneId,'undead-farm-work');
 assert.equal(state.run.farmLastShift.shift,5);
 assert.equal(state.run.gold,gold);
 assert.equal(state.run.energy,energy);
 assert.equal(state.run.farmShifts,shifts);
 state.run.energy=3;
 assert.equal(ctx.startUndeadFarmShift(),true);
 assert.equal(state.run.farmShifts,6);
 assert.equal(state.sceneId,'undead-farm-work');
});
test('save restore preserves owner meeting and never repeats it',()=>{
 const {ctx,state,game}=setup();
 assert.equal(game.restoreRun({farmShifts:4},work).farmOwnerMet,false);
 assert.equal(game.restoreRun({farmShifts:5,farmOwnerMet:true},work).farmOwnerMet,true);
 state.run=game.restoreRun({farmShifts:5,farmOwnerMet:true,energy:3},work);
 assert.equal(ctx.startUndeadFarmShift(),true);
 assert.equal(state.run.farmShifts,6);
 assert.equal(state.sceneId,'undead-farm-work');
});
