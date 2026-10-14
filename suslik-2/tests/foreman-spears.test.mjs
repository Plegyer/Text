import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';

const root=new URL('../',import.meta.url);
const paths=['foreman-spears-core.js','foreman-spears-content.js',
  'foreman-spears-ui.js','foreman-spears-bridge.js','combat-core.js'];
const sources=await Promise.all(paths.map(p=>readFile(new URL(p,root),'utf8')));
const ctx={};ctx.globalThis=ctx;
paths.forEach((p,i)=>runInNewContext(sources[i],ctx,{filename:p}));
const core=ctx.SUSLIK2ForemanSpears;
const ui=ctx.SUSLIK2ForemanSpearsUI;
const clone=x=>JSON.parse(JSON.stringify(x));
function setup(amount=15){
  let snapshot={game:{inventory:{broken_goblin_spear:amount},questActive:true,
    handoverSceneShown:false,questCompleted:false,spearDropsDisabled:false,
    nightTrainingUnlocked:false,gold:27,energy:6},quest:core.initialState()};
  let commits=0,saveOk=true,applyCalls=0,broken=false;
  const adapter={
    readSnapshot:()=>clone(snapshot),
    commitSnapshot:next=>{
      if(!saveOk)return false;
      snapshot=clone(next);commits++;return true;
    },
    readEvidence:game=>({
      questActive:game.questActive,
      spearCount:game.inventory.broken_goblin_spear,
      handoverSceneShown:game.handoverSceneShown,
      questCompleted:game.questCompleted
    }),
    readSpearCount:game=>game.inventory.broken_goblin_spear,
    applyApprovedHandover:(game,receipt)=>{
      applyCalls++;
      if(broken)return {...game};
      return {...game,inventory:{...game.inventory,
        broken_goblin_spear:game.inventory.broken_goblin_spear-receipt.quantity},
        handoverSceneShown:true,questCompleted:true,
        spearDropsDisabled:true,nightTrainingUnlocked:true};
    },
    readQuestFlags:game=>({
      questCompleted:game.questCompleted,spearDropsDisabled:game.spearDropsDisabled,
      nightTrainingUnlocked:game.nightTrainingUnlocked
    })
  };
  return {bridge:ctx.SUSLIK2ForemanSpearsBridge.create(adapter),
    snapshot:()=>clone(snapshot),commits:()=>commits,applyCalls:()=>applyCalls,
    setSave:v=>saveOk=v,setBroken:v=>broken=v,
    setQuestActive:v=>snapshot.game.questActive=v};
}
test('talk button requires active quest, 15 broken spears and unshown scene',()=>{
  for(const amount of [0,1,14]){
    const run=setup(amount);
    assert.equal(run.bridge.availability().canTalk,false);
    assert.equal(run.bridge.talk(),false);
  }
  const eligible=setup(15);
  assert.equal(eligible.bridge.availability().canTalk,true);
  eligible.setQuestActive(false);
  assert.equal(eligible.bridge.availability().canTalk,false);
  eligible.setQuestActive(true);
  assert.equal(eligible.bridge.availability().canTalk,true);
});
test('opening scene is persisted once and NEVER removes spears before Next',()=>{
  const run=setup(15);
  assert.equal(run.bridge.talk(),true);
  assert.equal(run.bridge.isSceneOpen(),true);
  assert.equal(run.snapshot().game.inventory.broken_goblin_spear,15);
  assert.equal(run.bridge.availability().canTalk,false);
  assert.equal(run.bridge.talk(),false);
  assert.equal(run.snapshot().quest.sceneShown,true);
  assert.equal(run.commits(),1);
});
test('Next removes exactly 15 and sets completion, drop lock and night training atomically',()=>{
  const run=setup(22);
  run.bridge.talk();
  assert.equal(run.bridge.next(),true);
  const s=run.snapshot();
  assert.equal(s.game.inventory.broken_goblin_spear,7);
  assert.equal(s.game.questCompleted,true);
  assert.equal(s.game.spearDropsDisabled,true);
  assert.equal(s.game.nightTrainingUnlocked,true);
  assert.equal(s.quest.phase,'complete');
  assert.equal(s.quest.questCompleted,true);
  assert.equal(s.quest.sceneShown,true);
  assert.equal(run.bridge.nightTrainingUnlocked(),true);
  assert.equal(run.bridge.spearDropsDisabled(),true);
  assert.equal(run.bridge.isSceneOpen(),false);
  assert.equal(run.bridge.availability().canTalk,false);
  assert.equal(run.bridge.next(),false);
  assert.equal(run.snapshot().game.inventory.broken_goblin_spear,7);
  assert.equal(run.snapshot().game.energy,6);
  assert.equal(run.snapshot().game.gold,27);
});
test('failed atomic save does not consume spears or claim quest completion',()=>{
  const run=setup(15);run.bridge.talk();run.setSave(false);
  assert.throws(()=>run.bridge.next(),/Atomic handover save failed/);
  assert.equal(run.snapshot().game.inventory.broken_goblin_spear,15);
  assert.equal(run.snapshot().quest.phase,'scene');
  run.setSave(true);
  assert.equal(run.bridge.next(),true);
  assert.equal(run.snapshot().game.inventory.broken_goblin_spear,0);
});
test('bad game inventory adapter cannot commit a duplicate or partial removal',()=>{
  const run=setup();run.bridge.talk();run.setBroken(true);
  assert.throws(()=>run.bridge.next(),/Exactly 15/);
  assert.equal(run.snapshot().game.inventory.broken_goblin_spear,15);
  assert.equal(run.snapshot().quest.phase,'scene');
});
test('state restored across reload remains one-shot and persists night training',()=>{
  const run=setup();run.bridge.talk();run.bridge.next();
  const saved=run.snapshot();
  const restored=core.restoreState(saved.quest);
  assert.equal(core.isTrainingUnlocked(restored),true);
  assert.equal(core.canOffer(restored,{questActive:true,spearCount:30}),false);
  assert.equal(core.confirmHandover(restored,saved.game,{}),null);
});
test('combat spear drops are permanently suppressed after completion even if count falls below 15',()=>{
  const C=ctx.SUSLIK2Combat;
  const battle={id:'far-forest-1',status:'victory',rewardApplied:false};
  const game={spearDropsDisabled:true,gold:0};
  const approved=(before,receipt)=>({...before,receipt});
  const result=C.settleVictory(battle,game,0,approved,()=>0.3);
  assert.equal(result.receipt.itemAmount,0);
  const withOptions=C.settleVictory(battle,{gold:0},0,approved,()=>0.3,{spearDropsDisabled:true});
  assert.equal(withOptions.receipt.itemAmount,0);
  const prior=C.settleVictory(battle,{gold:0},0,approved,()=>0.3);
  assert.equal(prior.receipt.itemAmount,1);
  assert.equal(prior.receipt.extraGold,10);
});
test('no additional combat victory reward when battle was already settled',()=>{
  const C=ctx.SUSLIK2Combat;
  assert.equal(C.settleVictory({id:'a',status:'victory',rewardApplied:true},
    {gold:0},0,()=>{throw Error('should not pay');}),null);
});
test('dialogue is exact author text, image path is replaceable and sawmill music inherited',()=>{
  const content=ctx.SUSLIK2ForemanSpearsContent;
  assert.equal(content.image,'assets/foreman/spears-handover.png');
  assert.equal(content.music,'inherit-sawmill');
  assert.equal(content.locales.ru.dialogue,
    'Амалия подошла к бригадиру и с усталым видом протянула ему свёрток с копьями.\n'+
    '— Вот. Все пятнадцать, как и заказывал. И, кстати, теперь я понимаю, почему ты называл их Злоебучими...\n'+
    '— Ну так это... Ого! Это ж ты, получается, сколько трудилась не разгибаясь! Сколько стонала от этого... ну... тяжкого бремени!\n'+
    '— Да уж, — вздохнула Амалия. — Было дело. И стонала, и не разгибалась...\n'+
    '— Вот-вот! — воодушевился бригадир. — Нарекаю тебя Лесной Шала... ну это... как её... Шаламыгой! Героем, по-нашему!\n'+
    'Он гордо выпятил грудь и одобрительно оглядел Амалию.\n'+
    '— Мы теперича с парнями готовы тебя всю ночь... это... обучать, вот! Выносливость твою да силу поднимать! Токмо позови!');
});
test('scene has exactly one Next button, home Training stays locked until completion',()=>{
  class Node {
    constructor(tag){this.tag=tag;this.children=[];this.dataset={};this.listeners={};}
    append(...nodes){this.children.push(...nodes);}
    replaceChildren(...nodes){this.children=nodes;}
    addEventListener(type,fn){this.listeners[type]=fn;}
    click(){this.listeners.click?.();}
  }
  ctx.document={createElement:tag=>new Node(tag)};
  const run=setup();
  const container=new Node('section'),home=new Node('section');
  assert.equal(ui.addNightTrainingButton(home,run.snapshot().quest,()=>{}),null);
  assert.equal(ui.addTalkButton(container,run.snapshot().quest,
    run.bridge.availability().evidence,()=>{}).dataset.actionId,'foreman-spear-talk');
  run.bridge.talk();
  const scene=ui.renderHandover(container,run.snapshot().quest,()=>run.bridge.next());
  assert.equal(scene.dataset.sceneId,'foreman-spear-handover');
  assert.deepEqual(scene.children.filter(x=>x.tag==='button').map(x=>x.dataset.actionId),
    ['foreman-spear-next']);
  assert.equal(scene.children[0].src,'assets/foreman/spears-handover.png');
  scene.children[2].click();
  assert.equal(run.bridge.nightTrainingUnlocked(),true);
  assert.equal(ui.addNightTrainingButton(home,run.snapshot().quest,()=>{}).dataset.actionId,
    'foreman-night-training');
});
test('plain file:// compatible scripts, without fetch or invented time/energy costs',()=>{
  for(const code of sources.slice(0,4)){
    assert.doesNotMatch(code,/\bfetch\s*\(|\bXMLHttpRequest\b|\bimport\s*\(/);
    assert.doesNotMatch(code,/\bsetTimeout\s*\(/);
    assert.match(code,/globalThis/);
  }
});

test('author PNG is byte-identical after loading all 20 offline source chunks',async()=>{
  const {createHash}=await import('node:crypto');
  const imageContext={SUSLIK2ForemanImageParts:[]};
  imageContext.globalThis=imageContext;
  for(let n=1;n<=20;n++){
    const path='assets/foreman/embedded/part-'+String(n).padStart(2,'0')+'.js';
    runInNewContext(await readFile(new URL(path,root),'utf8'),imageContext,{filename:path});
  }
  assert.equal(imageContext.SUSLIK2ForemanImageParts.length,20);
  const rawEncoded=imageContext.SUSLIK2ForemanImageParts.join('');
  assert.equal(rawEncoded.length,4715968);
  const bytes=Buffer.from(rawEncoded,'base64');
  assert.equal(bytes.length,3536974);
  assert.equal(createHash('sha256').update(bytes).digest('hex'),
    '015f3c0d6e1602abfa8580e4a98ce8c95d3322e7bf5b60a257b5d1f9503ab95e');
  runInNewContext(await readFile(new URL('foreman-spears-inline-image.js',root),'utf8'),imageContext);
  assert.equal(imageContext.SUSLIK2ForemanImageURL,'data:image/png;base64,'+rawEncoded);
});
