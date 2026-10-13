import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const globalThisObject={};
runInNewContext(readFileSync(new URL('../combat-core.js',import.meta.url),'utf8'),{globalThis:globalThisObject});
runInNewContext(readFileSync(new URL('../far-forest-core.js',import.meta.url),'utf8'),{globalThis:globalThisObject});
const C=globalThisObject.SUSLIK2Combat,F=globalThisObject.SUSLIK2FarForest;
const hero={strength:15,endurance:15,dexterity:1,mana:1,magic:1};
const fixed=()=>0.5;
test('first battle 150 -> 30 HP, second battle causes defeat without rest',()=>{
 let battle=C.newBattle(hero);for(let i=0;i<3;i++)battle=C.nextRound(battle,'strike',fixed);
 assert.equal(battle.status,'victory');assert.equal(battle.hero.hp,30);
 assert.equal(C.nextRound(C.newBattle({...hero,currentHP:30}),'strike',fixed).status,'defeat');
});
test('50 strength defeats goblin with one successful hit',()=>{
 const battle=C.nextRound(C.newBattle({...hero,strength:50}),'strike',fixed);
 assert.equal(battle.status,'victory');assert.equal(battle.hero.hp,150);
});
test('100 agility dodges goblin, not necessarily a strong enemy',()=>{
 const battle=C.nextRound(C.newBattle({...hero,dexterity:100}),'strike',fixed);
 assert.equal(battle.hero.hp,150);assert.equal(C.dodgePercent(100,60),50);
});
test('base physical miss is 8%, plus reciprocal enemy dodge',()=>{
 const missed=C.nextRound(C.newBattle(hero),'strike',()=>0);
 assert.equal(missed.enemy.hp,36);
 assert.equal(missed.history[0].reason,'base8');
 const speedyEnemy={...C.GOBLIN,dexterity:100};
 const missEnemy=C.nextRound(C.newBattle(hero,speedyEnemy),'strike',()=>0.5);
 assert.equal(missEnemy.enemy.hp,36);
});
test('guard adds 20 percent points for just one enemy turn',()=>{
 assert.equal(C.dodgePercent(1,20),0);assert.equal(C.dodgePercent(1,20,20),20);
 const guarded=C.nextRound(C.newBattle(hero),'dodge',()=>0.1);
 assert.equal(guarded.hero.hp,150);assert.equal(guarded.round,2);
 const normal=C.nextRound(guarded,'strike',fixed);
 assert.equal(normal.hero.hp,90);
});
test('spells unavailable until learned, when used caster acts second',()=>{
 const b=C.newBattle(hero);assert.equal(C.nextRound(b,{type:'spell',spellId:'fire'},fixed),null);
 const learned=C.newBattle({...hero,mana:8,learnedSpells:[{id:'fire',manaCost:5,damage:50}]});
 const cast=C.nextRound(learned,{type:'spell',spellId:'fire'},fixed);
 assert.equal(cast.status,'victory');assert.equal(cast.hero.hp,90);assert.equal(cast.hero.mana,3);
});
test('flee and surrender immediately produce defeat, no invented payment',()=>{
 for(const action of ['flee','surrender']){const b=C.nextRound(C.newBattle(hero),action,fixed);assert.equal(b.status,'defeat');assert.equal(b.hero.hp,150);}
});
test('victory gives standard shift receipt +10, 1-6 gold, at most 15 spears, only once',()=>{
 const battle=C.nextRound(C.newBattle({...hero,strength:50},C.GOBLIN,'far-forest-9'),'strike',fixed);
 const adapter=(state,receipt)=>({...state,receipts:[...state.receipts,receipt],gold:state.gold+receipt.extraGold+receipt.bonusGold});
 const r=C.settleVictory(battle,{gold:0,receipts:[]},14,adapter,()=>.99);
 assert.equal(r.receipt.bonusGold,6);assert.equal(r.receipt.extraGold,10);assert.equal(r.receipt.energyCost,1);
 assert.equal(r.receipt.itemAmount,1);assert.equal(r.receipt.paidShift,true);
 assert.equal(C.settleVictory(r.nextBattle,r.nextGameState,14,adapter,fixed),null);
 const capped=C.settleVictory(battle,{gold:0,receipts:[]},15,adapter,()=>0);
 assert.equal(capped.receipt.itemAmount,0);assert.equal(capped.receipt.bonusGold,1);
});
test('goblin attempt can be followed by new 50/50 attempt ONLY after rewarded victory',()=>{
 const state=F.initialState();state.accessUnlocked=true;
 const first=F.beginAttempt(state,()=>.9);assert.equal(first.outcome,'goblin');
 assert.equal(F.chooseGoblinPath(state,'fight'),F.SCENES.FIGHT_PENDING);
 assert.equal(F.beginAttempt(state,()=>0),null);
 assert.equal(F.finishGoblinVictory(state,{id:first.id,status:'victory',rewardApplied:false}),false);
 assert.equal(F.finishGoblinVictory(state,{id:first.id,status:'victory',rewardApplied:true}),true);
 const saved=F.restoreState(JSON.parse(JSON.stringify(state)));
 assert.equal(saved.currentAttempt.settled,true);
 const second=F.beginAttempt(saved,()=>0);
 assert.equal(second.outcome,'ordinary');assert.equal(F.finishGoblinVictory(state,{id:first.id,status:'victory',rewardApplied:true}),false);
});
