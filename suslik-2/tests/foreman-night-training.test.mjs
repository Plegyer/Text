import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';

const root=new URL('../',import.meta.url);
const scripts=['foreman-spears-core.js','foreman-spears-content.js',
  'foreman-spears-ui.js','foreman-spears-bridge.js',
  'foreman-night-training-core.js','foreman-night-training-content.js',
  'foreman-night-training-bridge.js','foreman-night-training-ui.js',
  'foreman-spears-host-hooks.js'];
const code=await Promise.all(scripts.map(p=>readFile(new URL(p,root),'utf8')));
const ctx={};ctx.globalThis=ctx;
code.forEach((text,i)=>runInNewContext(text,ctx,{filename:scripts[i]}));
const training=ctx.SUSLIK2ForemanNightTraining;
const copy=x=>JSON.parse(JSON.stringify(x));
function setup(options={}){
  let revision=1, commits=0, settlementCalls=0, recoveryCalls=0,
    saveAllowed=true, verified=true, showTraining=0, showDay=0;
  let saved={
    game:{nightPhase:'night',nightId:'year-1-night-4',nightCompletions:0,
      strength:15,endurance:15,strengthCap:options.cap??200,
      enduranceCap:options.cap??200,
      hp:3,mana:2,energy:1,maxMana:8,maxEnergy:15,
      questCompleted:options.unlocked!==false,nightTrainingUnlocked:options.unlocked!==false,
      spearDropsDisabled:options.unlocked!==false,
      gold:20,paidShifts:18},
    quest:options.unlocked!==false?{
      version:1,phase:'complete',sceneShown:true,questCompleted:true,
      spearDropsDisabled:true,nightTrainingUnlocked:true
    }:ctx.SUSLIK2ForemanSpears.initialState(),
    training:training.initialState()
  };
  const nightBindings={
    readSnapshot:()=>({...copy(saved),revision}),
    commitSnapshot:(next,expectedRevision)=>{
      if(!saveAllowed||expectedRevision!==revision)return false;
      saved=copy(next);revision++;commits++;return true;
    },
    readQuestFlags:game=>({questCompleted:game.questCompleted,
      nightTrainingUnlocked:game.nightTrainingUnlocked,
      spearDropsDisabled:game.spearDropsDisabled}),
    isExistingNightScreen:game=>game.nightPhase==='night',
    readExistingNightId:game=>game.nightId,
    readStats:game=>({strength:game.strength,endurance:game.endurance}),
    readStatCaps:game=>({strength:game.strengthCap,endurance:game.enduranceCap}),
    applyTrainingStats:(game,boost)=>({...game,...boost}),
    completeExistingNight:(game,receipt)=>{
      settlementCalls++;
      return {...game,nightPhase:'day',lastCompletedNightId:receipt.nightId,
        nightCompletions:game.nightCompletions+1};
    },
    verifyExistingNight:(before,after,receipt)=>verified &&
      before.nightPhase==='night'&&after.nightPhase==='day'&&
      after.nightCompletions===before.nightCompletions+1&&
      after.lastCompletedNightId===receipt.nightId,
    readResourceMaxima:game=>({hp:game.endurance*10,
      mana:game.maxMana,energy:game.maxEnergy}),
    applyFullRecovery:(game,maxima)=>{
      recoveryCalls++;return {...game,...maxima};
    },
    readResources:game=>({hp:game.hp,mana:game.mana,energy:game.energy})
  };
  const bridge=ctx.SUSLIK2ForemanNightTrainingBridge.create(nightBindings);
  const foremanBindings={
    readSnapshot:()=>({...copy(saved),revision}),
    commitSnapshot:(next,expectedRevision)=>{
      if(!saveAllowed||expectedRevision!==revision)return false;
      saved={...copy(saved),...copy(next)};revision++;commits++;return true;
    },
    readEvidence:game=>({questActive:false,spearCount:0,
      handoverSceneShown:true,questCompleted:game.questCompleted}),
    readSpearCount:()=>0,
    applyApprovedHandover:()=>{throw Error('Quest already settled');},
    readQuestFlags:nightBindings.readQuestFlags,
    showExistingSawmillWork:()=>{},
    showHandoverScene:()=>{},
    showTrainingScene:()=>showTraining++,
    showExistingDayMap:()=>showDay++,
    nightTraining:nightBindings
  };
  return {bridge,nightBindings,foremanBindings,
    snapshot:()=>copy(saved),setGame:patch=>{saved.game={...saved.game,...patch};revision++;},
    setSave:value=>{saveAllowed=value;},
    setVerify:value=>{verified=value;},
    setMaxMana:v=>saved.game.maxMana=v,
    counts:()=>({commits,settlementCalls,recoveryCalls,showTraining,showDay}),
    getRevision:()=>revision};
}
test('training is absent until quest and real night are active',()=>{
  const locked=setup({unlocked:false});
  assert.equal(locked.bridge.eligible(),false);
  assert.equal(locked.bridge.start(),null);
  const run=setup();run.setGame({nightPhase:'day'});
  assert.equal(run.bridge.eligible(),false);
  assert.equal(run.bridge.start(),null);
});
test('one click completes exactly one existing night, boosts stats and restores all live maxima',()=>{
  const run=setup();
  const scene=run.bridge.start();
  assert.equal(scene.sceneId,training.SCENE_ID);
  const s=run.snapshot();
  assert.equal(s.game.strength,16);
  assert.equal(s.game.endurance,16);
  assert.equal(s.game.hp,160);
  assert.equal(s.game.mana,8);
  assert.equal(s.game.energy,15);
  assert.equal(s.game.nightPhase,'day');
  assert.equal(s.game.nightCompletions,1);
  assert.equal(s.game.gold,20);
  assert.equal(s.game.paidShifts,18);
  assert.equal(s.training.lastNightId,'year-1-night-4');
  assert.equal(run.bridge.start(),null);
  assert.equal(run.counts().settlementCalls,1);
  assert.equal(run.counts().commits,1);
});
test('strength and endurance respect the real 100 / 200 caps, without lowering over-cap saves',()=>{
  const low=setup({cap:100});low.setGame({strength:100,endurance:99});
  low.bridge.start();
  assert.equal(low.snapshot().game.strength,100);
  assert.equal(low.snapshot().game.endurance,100);
  const high=setup({cap:200});high.setGame({strength:199,endurance:200,maxEnergy:23,maxMana:30});
  high.bridge.start();
  assert.equal(high.snapshot().game.strength,200);
  assert.equal(high.snapshot().game.endurance,200);
  assert.equal(high.snapshot().game.hp,2000);
  assert.equal(high.snapshot().game.energy,23);
  assert.equal(high.snapshot().game.mana,30);
  const over=setup({cap:200});over.setGame({strength:201,endurance:201});
  over.bridge.start();
  assert.equal(over.snapshot().game.strength,201);
  assert.equal(over.snapshot().game.endurance,201);
});
test('reload preserves the result, pending scene and prevents duplicate payout',()=>{
  const run=setup();
  const first=run.bridge.start();
  const again=ctx.SUSLIK2ForemanNightTrainingBridge.create(run.nightBindings);
  assert.deepEqual(copy(again.presentation()),copy(first));
  assert.equal(again.start(),null);
  assert.equal(run.counts().settlementCalls,1);
  assert.equal(again.finishPresentation(),true);
  assert.equal(again.finishPresentation(),false);
  assert.equal(run.snapshot().training.presentation,null);
  assert.equal(run.snapshot().training.lastNightId,'year-1-night-4');
  assert.equal(run.counts().settlementCalls,1);
  assert.equal(again.start(),null);
});
test('failure to save does not grant rewards or consume the night',()=>{
  const run=setup();
  const before=run.snapshot();
  run.setSave(false);
  assert.throws(()=>run.bridge.start(),/Atomic night save failed/);
  assert.deepEqual(run.snapshot(),before);
  run.setSave(true);
  assert.ok(run.bridge.start());
  assert.equal(run.snapshot().game.strength,16);
  assert.equal(run.snapshot().game.nightCompletions,1);
});
test('night-completion verification fails closed, without applied reward',()=>{
  const run=setup();run.setVerify(false);
  assert.throws(()=>run.bridge.start(),/Existing night completion not verified/);
  assert.equal(run.snapshot().game.strength,15);
  assert.equal(run.counts().commits,0);
});
test('a fresh real night permits a new training, but never twice per night',()=>{
  const run=setup();
  run.bridge.start();run.bridge.finishPresentation();
  run.setGame({nightPhase:'night',nightId:'year-1-night-5',hp:70,mana:2,energy:4});
  assert.equal(run.bridge.eligible(),true);
  run.bridge.start();
  assert.equal(run.snapshot().game.strength,17);
  assert.equal(run.snapshot().game.endurance,17);
  assert.equal(run.snapshot().game.nightCompletions,2);
  assert.equal(run.bridge.eligible(),false);
});
test('empty media slots require zero random draws; slots accept authored variants',()=>{
  let draws=0;
  assert.deepEqual(copy(training.mediaChoices(ctx.SUSLIK2ForemanNightTrainingContent.mediaSlots,()=>{
    draws++;return .4;
  })),{main:'',detail:''});
  assert.equal(draws,0);
  const slots=[{id:'main',variants:[{id:'a',src:'assets/a.gif'},
    {id:'b',src:'assets/b.gif'}]},
    {id:'detail',variants:[{id:'c',src:'assets/c.webm',kind:'video'},
      {id:'d',src:'assets/d.webm',kind:'video'}]}];
  const chosen=copy(training.mediaChoices(slots,()=>[.1,.8][draws++]));
  assert.deepEqual(chosen,{main:'a',detail:'d'});
});
test('each new use rolls fresh variants; reload keeps already selected IDs',()=>{
  const slots=[{id:'main',variants:[{id:'one',src:'assets/one.gif'},
    {id:'two',src:'assets/two.gif'}]}];
  const content={mediaSlots:slots};
  const run=setup();const a=run.bridge.start(content,()=>.1);
  assert.equal(a.mediaIds.main,'one');
  const again=ctx.SUSLIK2ForemanNightTrainingBridge.create(run.nightBindings);
  assert.equal(again.presentation().mediaIds.main,'one');
  again.finishPresentation();
  run.setGame({nightPhase:'night',nightId:'year-1-night-5'});
  const b=again.start(content,()=>.9);
  assert.equal(b.mediaIds.main,'two');
});
test('training cannot run without actual existing night, cap or persistence callbacks',()=>{
  const run=setup();
  assert.throws(()=>ctx.SUSLIK2ForemanNightTrainingBridge.create({}),
    /real night host binding/);
  const missing=setup();
  missing.setGame({strengthCap:NaN});
  assert.throws(()=>missing.bridge.start(),/Invalid strength cap/);
  assert.equal(missing.counts().commits,0);
});
test('host night screen wires real training; Next returns to existing day map only after save',()=>{
  const run=setup();
  const hooks=ctx.SUSLIK2ForemanSpearsHostHooks.create(run.foremanBindings);
  class FakeNode{
    constructor(tag){this.tag=tag;this.children=[];this.dataset={};this.events={};}
    append(...children){this.children.push(...children);}
    replaceChildren(...children){this.children=children;}
    addEventListener(name,fn){this.events[name]=fn;}
    click(){this.events.click?.();}
  }
  ctx.document={createElement:tag=>new FakeNode(tag)};
  const buttons=new FakeNode('div'),screen=new FakeNode('main');
  const button=hooks.mountHomeNightTraining(buttons,undefined,{locale:'ru'});
  assert.equal(button.dataset.actionId,'foreman-night-training');
  button.click();
  assert.equal(run.counts().showTraining,1);
  assert.equal(run.counts().settlementCalls,1);
  assert.equal(hooks.mountHomeNightTraining(buttons),null);
  assert.equal(hooks.resumeNightTraining(screen,{locale:'ru'}),true);
  const section=screen.children[0];
  assert.equal(section.dataset.sceneId,'foreman-night-training');
  assert.equal(section.children.filter(x=>x.tag==='button').length,1);
  assert.equal(section.children.at(-1).dataset.actionId,'foreman-training-next');
  section.children.at(-1).click();
  assert.equal(run.counts().showDay,1);
  assert.equal(hooks.resumeNightTraining(screen),false);
  assert.equal(run.counts().settlementCalls,1);
});
test('night scene has inert media placeholders until author supplies assets',()=>{
  class FakeNode{
    constructor(tag){this.tag=tag;this.children=[];this.dataset={};this.events={};}
    append(...children){this.children.push(...children);}
    replaceChildren(...children){this.children=children;}
    addEventListener(name,fn){this.events[name]=fn;}
  }
  ctx.document={createElement:tag=>new FakeNode(tag)};
  const holder=new FakeNode('main');
  const scene={sceneId:training.SCENE_ID,nightId:'n1',
    mediaIds:{main:'',detail:''}};
  const rendered=ctx.SUSLIK2ForemanNightTrainingUI.render(holder,scene,()=>{});
  assert.equal(rendered.children.filter(x=>x.dataset.mediaSlot).length,2);
  assert.equal(rendered.children.filter(x=>x.tag==='button').length,1);
});
test('ledger prevents reuse of any earlier night ID if a game snapshot moves backwards',()=>{
  const run=setup();
  run.bridge.start();run.bridge.finishPresentation();
  run.setGame({nightPhase:'night',nightId:'year-1-night-5'});
  run.bridge.start();run.bridge.finishPresentation();
  run.setGame({nightPhase:'night',nightId:'year-1-night-4'});
  assert.equal(run.bridge.eligible(),false);
  assert.equal(run.bridge.start(),null);
  assert.equal(run.counts().settlementCalls,2);
  assert.deepEqual(run.snapshot().training.usedNightIds,
    ['year-1-night-4','year-1-night-5']);
});
test('presentation Next cannot navigate the map before a successful save',()=>{
  const run=setup();
  run.bridge.start();
  run.setSave(false);
  assert.throws(()=>run.bridge.finishPresentation(),/Atomic night save failed/);
  assert.equal(run.bridge.presentation()?.sceneId,training.SCENE_ID);
  run.setSave(true);
  assert.equal(run.bridge.finishPresentation(),true);
});
test('portable runtime never requires fetch, Node.js, additional calendar or storage',()=>{
  for(const source of code){
    assert.doesNotMatch(source,/\bfetch\s*\(|\bXMLHttpRequest\b|\bimport\s*\(/);
    assert.doesNotMatch(source,/\blocalStorage\b/);
    assert.match(source,/globalThis/);
  }
});
