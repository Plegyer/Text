import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';

const root=new URL('../',import.meta.url);
const read=path=>readFile(new URL(path,root),'utf8');
const [gameplay,ui,content,offline,mapText,bundleText,workText]=await Promise.all([
  'gameplay-system.js','gameplay-ui.js','gameplay-content.js','offline.js',
  'map-locations.json','content/offline-content.js','content/work.json'
].map(read));
const map=JSON.parse(mapText),work=JSON.parse(workText);
const overlaps=(a,b)=>a.x<b.x+b.w&&b.x<a.x+a.w&&a.y<b.y+b.h&&b.y<a.y+a.h;
const make=()=>{
 const ctx={window:{},structuredClone,Math};
 runInNewContext(gameplay+'\n'+content,ctx);
 return {ctx,H:ctx.window.SUSLIK2Gameplay,run:ctx.window.SUSLIK2Gameplay.startRun(work)};
};

test('zombie brain sits within the game map and outside every building and clickable zone',()=>{
 const brain=map.discoverables.zombieBrain;
 assert.equal(brain.label,'Мозг зомби');
 for(const box of [brain.position,brain.hit]){
  assert.ok(box.w>0&&box.h>0&&box.x>=0&&box.y>=0);
  assert.ok(box.x+box.w<=map.coordinateSystem.width);
  assert.ok(box.y+box.h<=map.coordinateSystem.height);
  for(const loc of map.locations){
   assert.ok(!overlaps(box,loc.position),loc.id+' building overlap');
   assert.ok(!overlaps(box,loc.hit),loc.id+' hotspot overlap');
  }
 }
 assert.ok(overlaps(brain.position,brain.hit),'visible icon must be clickable');
 assert.ok(brain.position.w<=32&&brain.position.h<=26,'small but visible');
 assert.ok(brain.hit.w>brain.position.w&&brain.hit.h>brain.position.h,'accessible target');
 const bundled=JSON.parse(bundleText.split('window.SUSLIK2_CONTENT = ')[1].trim().replace(/;$/,''));
 assert.deepEqual(bundled.map,map,'offline map must be regenerated');
});

test('brain is unavailable until the conversation Next and can only be picked up once',()=>{
 const {H,run}=make(),state={run};
 assert.equal(H.canCollectZombieBrain(state),false);
 assert.equal(H.unlockZombieBrainSearch(state),false);
 run.farmBrainsMet=true;
 assert.equal(H.unlockZombieBrainSearch(state),true);
 assert.equal(H.canCollectZombieBrain(state),true);
 assert.equal(H.collectZombieBrain(state),true);
 assert.equal(run.zombieBrainFound,true);
 assert.equal(H.collectZombieBrain(state),false);
 assert.equal(H.canCollectZombieBrain(state),false);
});

test('Next unlocks collectible without extra work or reward and saves survive reload',()=>{
 const {ctx,H,run}=make();
 const state={run,sceneId:'undead-farm-brains-15',settings:{locale:'ru'},character:{stats:{endurance:15,reason:15}}};
 run.farmBrainsMet=true;run.farmShifts=15;run.gold=123;run.energy=2;
 let saved=0,screen;
 Object.assign(ctx,{state,work,persist:()=>{saved++;},render:()=>{},changeScene:id=>{state.sceneId=id;saved++;},root:{},copy:()=>({stats:{}})});
 runInNewContext(ui,ctx);
 ctx.gpScene=(_image,_text,buttons)=>{screen=buttons;};
 ctx.sceneUndeadFarmBrains15();
 assert.equal(run.zombieBrainSearchUnlocked,false);
 screen[0].fn();
 assert.equal(state.sceneId,'undead-farm-work');
 assert.equal(run.zombieBrainSearchUnlocked,true);
 assert.equal(run.farmShifts,15);
 assert.equal(run.gold,123);
 assert.equal(run.energy,2);
 assert.ok(saved>0);
 const restored=H.restoreRun(JSON.parse(JSON.stringify(run)),work);
 assert.equal(restored.zombieBrainSearchUnlocked,true);
 assert.equal(restored.zombieBrainFound,false);
 assert.equal(H.collectZombieBrain({run:restored}),true);
 const picked=H.restoreRun(JSON.parse(JSON.stringify(restored)),work);
 assert.equal(picked.zombieBrainFound,true);
 assert.equal(H.canCollectZombieBrain({run:picked}),false);
});

test('canonical map uses original SVG, draws a subdued icon, and lists it in normal inventory',()=>{
 assert.match(offline,/brainFind=data\.discoverables\?\.zombieBrain/);
 assert.match(offline,/data-pickup-id':'zombie-brain'/);
 assert.match(offline,/data-action-id':'map-zombie-brain'/);
 assert.match(offline,/collectZombieBrain\(state\)/);
 assert.match(offline,/persist\(\);render\(\);/);
 assert.match(offline,/Мозг зомби',1/);
 assert.doesNotMatch(offline,/zombieBrainFound\s*=\s*false/);
});
