import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {initialState,restoreState,adjustStat,resetAllocations,canStart,begin} from '../creation-state.mjs';
const scenes=JSON.parse(await readFile(new URL('../content/scenes.json',import.meta.url),'utf8'));
const creation=JSON.parse(await readFile(new URL('../content/creation.json',import.meta.url),'utf8'));
const valid=new Set(Object.keys(scenes.scenes));

test('two supplied images belong to their scenes',async()=>{
  assert.equal(scenes.initialScene,'splash');
  assert.equal(scenes.scenes.splash.buttonDelayMs,2200);
  assert.equal(scenes.scenes.splash.imageId,'MEDIA.SPLASH.001');
  assert.equal(scenes.scenes['character-selection'].imageId,'MEDIA.CHARACTER_CREATION.001');
  for(const id of ['splash','character-selection']){
    const scene=scenes.scenes[id];
    assert.ok((await stat(new URL('../'+scene.image,import.meta.url))).size>100_000);
  }
});
test('all transitions are defined',()=>{
  for(const scene of Object.values(scenes.scenes)){
    for(const action of scene.actions||[]){
      for(const dest of [action.target,action.firstTarget,action.subsequentTarget]){
        if(dest)assert.ok(valid.has(dest),dest);
      }
    }
  }
});
test('old creation baseline is 12 stats starting at one with 10 points',()=>{
  assert.deepEqual(creation.stats,['strength','endurance','dexterity','reason','magic','creativity','wits','charm','sociability','manners','grooming','sexuality']);
  assert.equal(creation.initialValue,1);
  assert.equal(creation.allocationPoints,10);
  const s=initialState(creation,'character-selection');
  assert.deepEqual(Object.values(s.character.stats),Array(12).fill(1));
  assert.equal(s.character.remaining,10);
  assert.equal(canStart(s),false);
});
test('point distribution / refund / reset does not spend time or energy',()=>{
  const s=initialState(creation,'character-selection');
  for(let n=0;n<10;n++)assert.equal(adjustStat(s,creation,'strength',1),true);
  assert.equal(s.character.stats.strength,11);
  assert.equal(s.character.remaining,0);
  assert.equal(adjustStat(s,creation,'magic',1),false);
  assert.equal(adjustStat(s,creation,'strength',-1),true);
  assert.equal(s.character.remaining,1);
  assert.equal(adjustStat(s,creation,'strength',-1),true);
  assert.equal(s.character.stats.strength,9);
  assert.equal(resetAllocations(s,creation),true);
  assert.equal(s.character.stats.strength,1);
  assert.equal(s.character.remaining,10);
  assert.equal('energy' in s,false);
  assert.equal('day' in s,false);
});
test('first Start begins game; second Start+ goes to bonus menu',()=>{
  const s=initialState(creation,'character-selection');
  const scene=scenes.scenes['character-selection'];
  assert.equal(begin(s,scene),false);
  for(let n=0;n<10;n++)adjustStat(s,creation,'charm',1);
  assert.equal(begin(s,scene),true);
  assert.equal(s.sceneId,'game-start');
  assert.equal(s.meta.startedOnce,true);
  s.sceneId='character-selection';
  resetAllocations(s,creation);
  for(let n=0;n<10;n++)adjustStat(s,creation,'magic',1);
  assert.equal(begin(s,scene),true);
  assert.equal(s.sceneId,'bonus-selection');
});
test('saved values and next-start flag restore independently of old game',()=>{
  const s=initialState(creation,'character-selection');
  adjustStat(s,creation,'strength',1);
  s.settings.locale='en';
  s.settings.musicVolume=53;
  s.meta.startedOnce=true;
  const restored=restoreState(JSON.parse(JSON.stringify(s)),creation,valid);
  assert.equal(restored.character.stats.strength,2);
  assert.equal(restored.character.remaining,9);
  assert.equal(restored.settings.locale,'en');
  assert.equal(restored.settings.musicVolume,53);
  assert.equal(restored.meta.startedOnce,true);
  const corrupt=JSON.parse(JSON.stringify(s));
  corrupt.character.stats.strength=1000;
  assert.equal(restoreState(corrupt,creation,valid).character.stats.strength,1);
  assert.equal(restoreState({version:1,sceneId:'character-selection'},creation,valid).sceneId,'character-selection');
});
