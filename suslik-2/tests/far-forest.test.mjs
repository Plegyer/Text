import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';

const root = new URL('../', import.meta.url);
const [coreCode, contentCode, uiCode] = await Promise.all(
  ['far-forest-core.js', 'far-forest-content.js', 'far-forest-ui.js']
    .map(name => readFile(new URL(name, root), 'utf8'))
);
const context = {Math, Number, Object, TypeError, RangeError, console};
context.globalThis = context;
runInNewContext(coreCode, context, {filename:'far-forest-core.js'});
runInNewContext(contentCode, context, {filename:'far-forest-content.js'});
const core = context.SUSLIK2FarForest;
const toPlain = value => JSON.parse(JSON.stringify(value));
const unlocked = () => {const state=core.initialState();
  assert.equal(core.unlockAfterForeman(state,{paidShifts:15,strength:15,endurance:15,foremanConversationCompleted:true}),true);
  return state;
};
const adapter = (game, command) => ({...game,
  energy: game.energy - command.energyCost,
  gold: game.gold + game.baseWage + command.extraGold,
  paidShifts: game.paidShifts + Number(command.paidShift),
  seasonalEffects: game.seasonalEffects + Number(command.standardSeasonalStats)
});

test('far forest does not unlock early or without the completed foreman conversation',()=>{
 const s=core.initialState();
 for(const ev of [
  {paidShifts:14,strength:15,endurance:15,foremanConversationCompleted:true},
  {paidShifts:15,strength:14,endurance:15,foremanConversationCompleted:true},
  {paidShifts:15,strength:15,endurance:14,foremanConversationCompleted:true},
  {paidShifts:15,strength:15,endurance:15,foremanConversationCompleted:false}
 ]) assert.equal(core.unlockAfterForeman(s,ev),false);
 assert.equal(core.isAvailable(s),false);
 assert.equal(core.beginAttempt(s,()=>0),null);
 assert.equal(core.unlockAfterForeman(s,{paidShifts:15,strength:15,endurance:15,foremanConversationCompleted:true}),true);
 assert.equal(core.isAvailable(core.restoreState(toPlain(s))),true);
});

test('one independent random draw per attempt and exact 0.5 threshold',()=>{
 let count=0; const rng=()=>{count++;return .5;};
 assert.equal(core.rollOutcome(()=>0),core.OUTCOMES.ORDINARY);
 assert.equal(core.rollOutcome(()=>.49999999),core.OUTCOMES.ORDINARY);
 assert.equal(core.rollOutcome(rng),core.OUTCOMES.GOBLIN);
 assert.equal(core.rollOutcome(()=>.999999),core.OUTCOMES.GOBLIN);
 assert.equal(count,1);
 for(const value of [-.001,1,NaN,Infinity]) assert.throws(()=>core.rollOutcome(()=>value),RangeError);
});

test('seeded 10000 independent attempts remain near balanced 50/50',()=>{
 let seed=20261013;
 const rng=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 let ordinary=0,goblin=0;
 for(let i=0;i<10000;i++){
  const s=unlocked();
  const a=core.beginAttempt(s,rng);
  if(a.outcome===core.OUTCOMES.ORDINARY)ordinary++;else goblin++;
 }
 assert.equal(ordinary+goblin,10000);
 assert.ok(ordinary>4700 && ordinary<5300, `ordinary=${ordinary}`);
});

test('paid ordinary shift uses existing calculation callback once with +10 and -1 energy',()=>{
 const s=unlocked();
 const a=core.beginAttempt(s,()=>0);
 assert.equal(a.outcome,core.OUTCOMES.ORDINARY);
 const game={energy:10,gold:30,baseWage:7,seasonalEffects:0,paidShifts:15};
 let count=0;
 const result=core.settleOrdinaryShift(s,game,(old,receipt)=>{
   count++; assert.equal(receipt.attemptId,'far-forest-1');
   assert.equal(receipt.standardSawmillWage,true);
   assert.equal(receipt.standardSeasonalStats,true);
   return adapter(old,receipt);
 });
 assert.deepEqual(toPlain(result.nextGameState),{energy:9,gold:47,baseWage:7,seasonalEffects:1,paidShifts:16});
 assert.equal(game.gold,30);
 assert.equal(result.nextFarForestState.currentAttempt.settled,true);
 assert.equal(core.settleOrdinaryShift(result.nextFarForestState,result.nextGameState,()=>{throw Error('paid twice');}),null);
 assert.equal(core.settleOrdinaryShift(core.restoreState(toPlain(result.nextFarForestState)),result.nextGameState,()=>{throw Error('paid twice after reload');}),null);
 assert.equal(count,1);
});

test('adapter failures do not mark a shift as paid',()=>{
 const s=unlocked();core.beginAttempt(s,()=>0);
 assert.throws(()=>core.settleOrdinaryShift(s,{},()=>{throw new Error('roll back');}),/roll back/);
 assert.ok(core.getOrdinaryReceipt(s));
 assert.throws(()=>core.settleOrdinaryShift(s,{},old=>old),TypeError);
 assert.equal(s.currentAttempt.settled,false);
});

test('continue from paid ordinary work rolls again, and each receipt is distinct',()=>{
 const s=unlocked(); const first=core.beginAttempt(s,()=>0);
 assert.equal(core.beginAttempt(s,()=>.75),null,'unpaid attempt cannot be re-rolled');
 const one=core.settleOrdinaryShift(s,{energy:10,gold:0,baseWage:1,seasonalEffects:0,paidShifts:15},adapter);
 const second=core.beginAttempt(one.nextFarForestState,()=>0);
 assert.equal(second.id,'far-forest-2');
 assert.notEqual(first.id,second.id);
 const two=core.settleOrdinaryShift(one.nextFarForestState,one.nextGameState,adapter);
 assert.equal(two.nextGameState.gold,22);
 assert.equal(two.nextGameState.paidShifts,17);
});

test('goblin encounter branches do not spend energy, gold, or any other resource',()=>{
 for(const [choice,target] of [
  ['permission',core.SCENES.PERMISSION_PENDING],
  ['fight',core.SCENES.FIGHT_PENDING]
 ]){
  const s=unlocked();const game={energy:4,gold:50,paidShifts:22};const snapshot=JSON.stringify(game);
  const result=core.beginAttempt(s,()=>.99);
  assert.equal(result.outcome,core.OUTCOMES.GOBLIN);
  assert.equal(core.getOrdinaryReceipt(s),null);
  assert.equal(core.settleOrdinaryShift(s,game,()=>{throw Error('no payment in goblin encounter');}),null);
  assert.equal(core.chooseGoblinPath(s,choice),target);
  assert.equal(core.chooseGoblinPath(s,choice),null);
  assert.equal(core.beginAttempt(s,()=>0),null);
  assert.equal(JSON.stringify(game),snapshot);
  assert.equal(core.restoreState(toPlain(s)).sceneId,target);
 }
});

test('exact authored Russian scene, both distinct permanent IDs, local media path',()=>{
 const content=context.SUSLIK2FarForestContent;
 assert.equal(content.goblinImage,'assets/far-forest/goblin-encounter.png');
 assert.equal(content.locales.ru.permission,'Получить разрешение');
 assert.equal(content.locales.ru.fight,'Бой');
 assert.equal(content.locales.ru.goblinText,'Работая в самой глубине леса, Амалия вдруг услышала в листве осторожный шелест. Она обернулась и увидела маленького зелёного человечка, который с любопытством таращился на неё из кустов, а под его набедренной повязкой у него весьма недвусмысленно что-то выпирало.');
 assert.notEqual(core.SCENES.PERMISSION_PENDING,core.SCENES.FIGHT_PENDING);
});

test('new scripts use classic file:// compatible loading, no new time, wage or fetch system',()=>{
 for(const script of [coreCode,contentCode,uiCode]){
  assert.doesNotMatch(script,/\bfetch\s*\(|\bXMLHttpRequest\b|\bimport\s*\(|\blocalStorage\b/);
  assert.match(script,/globalThis/);
 }
 assert.match(uiCode,/far-forest-permission/);
 assert.match(uiCode,/far-forest-continue/);
 assert.match(uiCode,/far-forest-fight/);
 runInNewContext(uiCode,context,{filename:'far-forest-ui.js'});
 assert.equal(typeof context.SUSLIK2FarForestUI.renderScene,'function');
});

test('DOM renderer: locked button absent; goblin buttons route separately; ordinary actions require settlement',()=>{
 class Element {
   constructor(tag){this.tagName=tag;this.children=[];this.dataset={};this.listeners={};}
   append(...items){this.children.push(...items);}
   replaceChildren(...items){this.children=items;}
   addEventListener(type,fn){this.listeners[type]=fn;}
   click(){this.listeners.click?.();}
 }
 context.document={createElement:tag=>new Element(tag)};
 runInNewContext(uiCode,context,{filename:'far-forest-ui.js'});
 const ui=context.SUSLIK2FarForestUI;
 const buttons=new Element('div');
 const locked=core.initialState();
 assert.equal(ui.addAccessButton(buttons,locked,()=>{}),null);
 assert.equal(buttons.children.length,0);
 const s=unlocked();
 assert.ok(ui.addAccessButton(buttons,s,()=>{}));
 assert.equal(buttons.children.length,1);
 core.beginAttempt(s,()=>.9);
 const clicked=[];
 const root=new Element('main');
 let section=ui.renderScene(root,{farState:s,onGoblinChoice:choice=>clicked.push(choice)});
 assert.equal(section.dataset.sceneId,core.SCENES.GOBLIN);
 assert.equal(section.children[0].src,'assets/far-forest/goblin-encounter.png');
 assert.deepEqual(section.children.filter(x=>x.tagName==='button').map(x=>x.dataset.actionId),['far-forest-permission','far-forest-fight']);
 section.children[2].click(); section.children[3].click();
 assert.deepEqual(clicked,['permission','fight']);
 const o=unlocked();core.beginAttempt(o,()=>.1);
 assert.throws(()=>ui.renderScene(root,{farState:o}),/settled/);
 const settled=core.settleOrdinaryShift(o,{energy:4,gold:0,baseWage:1,seasonalEffects:0,paidShifts:15},adapter);
 let next=0,continues=0;
 section=ui.renderScene(root,{farState:settled.nextFarForestState,seasonalImage:'assets/approved-summer.png',onNext:()=>next++,onContinue:()=>continues++});
 assert.equal(section.children[0].src,'assets/approved-summer.png');
 assert.deepEqual(section.children.filter(x=>x.tagName==='button').map(x=>x.dataset.actionId),['far-forest-next','far-forest-continue']);
 section.children[2].click();section.children[3].click();
 assert.equal(next,1);assert.equal(continues,1);
});
