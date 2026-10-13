import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {initialState,restoreState,freshCharacter,adjustStat,begin} from '../creation-state.mjs';
import {freshRun,recordSawmillShift,markSawmill50EventSeen,returnFromSawmillToMap,
 canOpenEndingMenu,openEndingMenu,refuseEnding,openHardWorkerEnding,
 finishHardWorkerEnding,hasNewGamePlus,availableBonuses,selectedBonusIds,
 toggleBonus,startPlusRun} from '../ending-state.mjs';
const creation=JSON.parse(await readFile(new URL('../content/creation.json',import.meta.url),'utf8'));
const scenes=JSON.parse(await readFile(new URL('../content/scenes.json',import.meta.url),'utf8'));
const valid=new Set(Object.keys(scenes.scenes));
const setup=()=>initialState(creation,'sawmill');
function reach50(s){for(let n=0;n<50;n++)assert.equal(recordSawmillShift(s),true);}
test('no button before 50 shifts AND event AND map return',()=>{
 const s=setup();
 for(let n=0;n<49;n++)recordSawmillShift(s);
 assert.equal(markSawmill50EventSeen(s),false);
 returnFromSawmillToMap(s);assert.equal(canOpenEndingMenu(s),false);
 s.sceneId='sawmill';recordSawmillShift(s);
 assert.equal(canOpenEndingMenu(s),false);
 markSawmill50EventSeen(s);assert.equal(canOpenEndingMenu(s),false);
 returnFromSawmillToMap(s);assert.equal(canOpenEndingMenu(s),true);
});
test('refusal returns to map, only End unlocks plus and resets run',()=>{
 const s=setup();reach50(s);markSawmill50EventSeen(s);returnFromSawmillToMap(s);
 assert.equal(openEndingMenu(s),true);
 assert.equal(refuseEnding(s),true);
 assert.equal(s.sceneId,'map');assert.equal(hasNewGamePlus(s),false);
 openEndingMenu(s);openHardWorkerEnding(s);
 assert.equal(finishHardWorkerEnding(s,creation,freshCharacter),true);
 assert.equal(s.sceneId,'splash');
 assert.deepEqual(s.meta.unlockedEndings,['hard-worker']);
 assert.deepEqual(s.run,freshRun());
 assert.equal(hasNewGamePlus(restoreState(JSON.parse(JSON.stringify(s)),creation,valid)),true);
});
test('Start+ is locked after ordinary starts, then unlocked by an ending',()=>{
 const s=initialState(creation,'character-selection');
 for(let n=0;n<10;n++)adjustStat(s,creation,'strength',1);
 begin(s,scenes.scenes['character-selection']);assert.equal(s.sceneId,'game-start');
 s.sceneId='character-selection';begin(s,scenes.scenes['character-selection']);
 assert.equal(s.sceneId,'game-start');
 s.meta.unlockedEndings=['hard-worker'];s.sceneId='character-selection';
 begin(s,scenes.scenes['character-selection']);assert.equal(s.sceneId,'bonus-selection');
});
test('zero bonus or all bonus choices; +5 strength applied exactly once',()=>{
 const s=initialState(creation,'bonus-selection');s.meta.unlockedEndings=['hard-worker'];
 assert.deepEqual(availableBonuses(s).map(b=>b.id),['hard-worker']);
 assert.deepEqual(selectedBonusIds(s),[]);
 const initial=s.character.stats.strength;
 startPlusRun(s);assert.equal(s.character.stats.strength,initial);
 s.sceneId='bonus-selection';
 toggleBonus(s,'hard-worker');assert.deepEqual(selectedBonusIds(s),['hard-worker']);
 toggleBonus(s,'hard-worker');assert.deepEqual(selectedBonusIds(s),[]);
 toggleBonus(s,'hard-worker');startPlusRun(s);
 assert.equal(s.character.stats.strength,initial+5);
 assert.equal(startPlusRun(s),false);assert.equal(s.character.stats.strength,initial+5);
});
test('restore rejects early endings and migrates legacy v2 save',()=>{
 const s=setup();s.run={sawmillShifts:49,sawmill50EventSeen:true,endingOfferOnMap:true};s.sceneId='map';
 assert.equal(canOpenEndingMenu(restoreState(s,creation,valid)),false);
 const old=initialState(creation,'character-selection');old.version=2;old.meta.startedOnce=true;
 const restored=restoreState(old,creation,valid);
 assert.equal(restored.meta.startedOnce,true);assert.equal(hasNewGamePlus(restored),false);
 assert.deepEqual(restored.run,freshRun());
});
test('applied stat bonus survives reload without multiplying',()=>{
 const s=initialState(creation,'bonus-selection');s.meta.unlockedEndings=['hard-worker'];
 s.character.allocated.strength=2;s.character.stats.strength=3;s.character.remaining=8;
 toggleBonus(s,'hard-worker');startPlusRun(s);
 const reloaded=restoreState(JSON.parse(JSON.stringify(s)),creation,valid);
 assert.equal(reloaded.character.stats.strength,8);
 assert.equal(reloaded.character.remaining,8);
 assert.equal(reloaded.run.bonusesApplied,true);
});
