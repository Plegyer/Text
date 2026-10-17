import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';
const from=path=>new URL('../'+path,import.meta.url);
const [rules,engine,ui,authored,offline,bundle]=await Promise.all([
 'work-rules.js','gameplay-system.js','gameplay-ui.js','gameplay-content.js','offline.js','content/offline-content.js'
].map(p=>readFile(from(p),'utf8')));
const work=JSON.parse(await readFile(from('content/work.json'),'utf8'));
const creation=JSON.parse(await readFile(from('content/creation.json'),'utf8'));
const scenes=JSON.parse(await readFile(from('content/scenes.json'),'utf8'));
const expected="— Рааамгх... Уаааррр... Муаааа... муазгииии... мммозгииии... — речь явно давалась зомби с огромным трудом.\nОн надрывно завывал, пытаясь что-то объяснить, но Амалия никак не могла его понять. Наконец зомби рухнул перед ней на колени, вцепился в подол юбки и завопил с удвоенной силой:\n— УУУАААААА!.. РАААР!.. МММОЗГИИИИИ!.. МОЗГИИИИИИ!\n— Ладно-ладно, поняла я! — Амалия с трудом отцепила его от своей юбки. — Поищу я тебе мозги, страшила злоебучий!\nОбрадованный её догадливостью, зомби, наоборот, вцепился в юбку ещё крепче и завопил на всю ферму:\n— УУУААААМНАЯ!!! ММММООООЗГИИИИИИ!!! МММООЗГИ!!!";
function setup(){
 const ctx={window:{},structuredClone,Math};
 runInNewContext(engine+'\n'+rules+'\n'+authored+'\n'+bundle,ctx);
 const state={run:ctx.window.SUSLIK2Gameplay.startRun(work),character:{stats:Object.fromEntries(creation.stats.map(id=>[id,1]))},settings:{locale:'ru'},sceneId:'undead-farm-work'};
 let saves=0;
 Object.assign(ctx,{state,work,persist:()=>{saves++},render:()=>{},changeScene:id=>{state.sceneId=id;saves++},root:{},copy:()=>({stats:{}})});
 runInNewContext(ui,ctx);
 ctx.gpScene=(image,text,buttons)=>{ctx.view={image,text,buttons}};
 return {ctx,state,getSaves:()=>saves};
}
test('author text, soundtrack and illustration are published',async()=>{
 const {ctx}=setup();
 assert.equal(ctx.window.SUSLIK2_GAMEPLAY_CONTENT.text.undeadFarmBrains15,expected);
 assert.equal(ctx.window.SUSLIK2_GAMEPLAY_CONTENT.images.undeadFarmBrains15,'assets/events/undead-farm-brains-15.webp');
 assert.equal(scenes.scenes['undead-farm-brains-15'].music,'farm');
 assert.equal(scenes.scenes['undead-farm-brains-15'].kind,'panel');
 assert.ok(bundle.includes('"undead-farm-brains-15"'));
 assert.match(offline,/sceneId==='undead-farm-brains-15'\) sceneUndeadFarmBrains15\(\)/);
 assert.ok((await stat(from('assets/events/undead-farm-brains-15.webp'))).size>100_000);
});
test('fourteen shifts not enough; both thresholds must be met',()=>{
 const {ctx,state}=setup();
 state.run.farmShifts=13;state.run.farmOwnerMet=true;state.run.energy=3;
 state.run.elapsedDays=20;state.character.stats.endurance=14;state.character.stats.reason=12;
 assert.equal(ctx.startUndeadFarmShift(),true);
 assert.equal(state.run.farmShifts,14);
 assert.equal(state.sceneId,'undead-farm-work');
 assert.equal(state.run.farmBrainsMet,false);
 assert.equal(ctx.startUndeadFarmShift(),true);
 assert.equal(state.run.farmShifts,15);
 assert.equal(state.sceneId,'undead-farm-work');
 assert.equal(state.run.farmBrainsMet,false);
});
test('fifteenth paid shift triggers once; Далее goes to work menu without second payment',()=>{
 const {ctx,state}=setup();
 state.run.farmShifts=14;state.run.farmOwnerMet=true;state.run.energy=3;
 state.run.elapsedDays=20;state.character.stats.endurance=14;state.character.stats.reason=14;
 const beforeGold=state.run.gold,beforeEnergy=state.run.energy;
 assert.equal(ctx.startUndeadFarmShift(),true);
 assert.equal(state.run.farmShifts,15);
 assert.equal(state.character.stats.endurance,15);
 assert.equal(state.character.stats.reason,15);
 assert.equal(state.run.farmBrainsMet,true);
 assert.equal(state.sceneId,'undead-farm-brains-15');
 assert.ok(state.run.gold>beforeGold);
 assert.equal(state.run.energy,beforeEnergy-1);
 const paidGold=state.run.gold,paidEnergy=state.run.energy;
 ctx.sceneUndeadFarmBrains15();
 assert.equal(ctx.view.text,expected);
 assert.equal(ctx.view.buttons.length,1);
 assert.equal(ctx.view.buttons[0].label,'Далее');
 ctx.view.buttons[0].fn();
 assert.equal(state.sceneId,'undead-farm-work');
 assert.equal(state.run.farmLastShift,null);
 assert.equal(state.run.gold,paidGold);
 assert.equal(state.run.energy,paidEnergy);
 assert.equal(state.run.farmShifts,15);
 assert.equal(ctx.startUndeadFarmShift(),true);
 assert.equal(state.run.farmShifts,16);
 assert.equal(state.sceneId,'undead-farm-work');
});
test('late threshold triggers on farm entry; save survives reload',()=>{
 const {ctx,state}=setup();
 state.run.farmShifts=15;state.run.farmOwnerMet=true;state.run.energy=2;
 state.character.stats.endurance=15;state.character.stats.reason=15;
 const energy=state.run.energy,gold=state.run.gold;
 ctx.sceneUndeadFarmWork({});
 assert.equal(state.sceneId,'undead-farm-brains-15');
 assert.equal(state.run.farmBrainsMet,true);
 assert.equal(state.run.energy,energy);
 assert.equal(state.run.gold,gold);
 assert.equal(ctx.window.SUSLIK2Gameplay.restoreRun(state.run,work).farmBrainsMet,true);
 assert.equal(ctx.window.SUSLIK2Gameplay.restoreRun({},work).farmBrainsMet,false);
});
