/* SUSLIK 2 turn-based combat: classic script; file:// compatible. */
(function installCombat(host){
'use strict';
const GOBLIN=Object.freeze({id:'forest-goblin',nameRu:'Гоблин',hp:36,damage:60,dexterity:1,accuracy:20});
const clamp=(x,l,h)=>Math.max(l,Math.min(h,x));
const nonnegative=(x,fallback=0)=>Number.isFinite(x)&&x>=0?x:fallback;
function roll(rng){const v=rng();if(!Number.isFinite(v)||v<0||v>=1)throw new RangeError('RNG must return value in [0,1)');return v;}
function dodgePercent(defenderDexterity,attackerAccuracy,guardBonus=0){return clamp(clamp(1.25*(nonnegative(defenderDexterity)-nonnegative(attackerAccuracy)),0,100)+guardBonus,0,100);}
function newBattle(hero,enemy=GOBLIN,attemptId='manual'){
if(!hero||!Number.isFinite(hero.strength)||!Number.isFinite(hero.endurance)||!Number.isFinite(hero.dexterity)||!Number.isFinite(hero.mana))throw new TypeError('Missing hero battle stats');
const maxHP=Math.max(1,Math.round(hero.endurance*10)),maxMana=Math.max(0,Math.floor(hero.mana)),enemyHP=Math.max(1,Math.round(enemy.hp));
const spells=Array.isArray(hero.learnedSpells)?hero.learnedSpells.filter(x=>x&&typeof x.id==='string'&&Number.isFinite(x.manaCost)&&x.manaCost>=5&&x.manaCost<=10&&Number.isFinite(x.damage)&&x.damage>=0).map(x=>({id:x.id,name:x.name||x.id,manaCost:x.manaCost,damage:x.damage})):[];
return {version:1,id:String(attemptId),status:(hero.currentHP!==undefined&&hero.currentHP<=0)?'defeat':'active',round:1,rewardApplied:false,history:[],
hero:{strength:nonnegative(hero.strength),endurance:nonnegative(hero.endurance),dexterity:nonnegative(hero.dexterity),accuracy:nonnegative(hero.accuracy,nonnegative(hero.dexterity)),magic:nonnegative(hero.magic,1),maxHP,hp:clamp(hero.currentHP??maxHP,0,maxHP),maxMana,mana:clamp(hero.currentMana??maxMana,0,maxMana),learnedSpells:spells},
enemy:{id:enemy.id||'enemy',nameRu:enemy.nameRu||'Враг',maxHP:enemyHP,hp:enemyHP,damage:nonnegative(enemy.damage),dexterity:nonnegative(enemy.dexterity),accuracy:nonnegative(enemy.accuracy)}};
}
function enemyAttack(s,guardBonus,rng){
const chance=dodgePercent(s.hero.dexterity,s.enemy.accuracy,guardBonus);
if(roll(rng)<chance/100){s.history.push({round:s.round,actor:'enemy',type:'dodged',chance});return;}
const damage=Math.floor(s.enemy.damage);s.hero.hp=Math.max(0,s.hero.hp-damage);
s.history.push({round:s.round,actor:'enemy',type:'hit',damage});
if(s.hero.hp===0)s.status='defeat';
}
function heroStrike(s,rng){
if(roll(rng)<0.08){s.history.push({round:s.round,actor:'hero',type:'miss',reason:'base8'});return;}
const chance=dodgePercent(s.enemy.dexterity,s.hero.accuracy);
if(roll(rng)<chance/100){s.history.push({round:s.round,actor:'hero',type:'miss',reason:'enemy-dodge',chance});return;}
const damage=Math.floor(s.hero.strength);s.enemy.hp=Math.max(0,s.enemy.hp-damage);
s.history.push({round:s.round,actor:'hero',type:'hit',damage});
if(s.enemy.hp===0)s.status='victory';
}
function nextRound(input,action,rng=Math.random){
if(!input||input.status!=='active')return null;
const kind=typeof action==='string'?action:action?.type;
if(!['strike','dodge','spell','flee','surrender'].includes(kind))return null;
const s=JSON.parse(JSON.stringify(input));
if(kind==='flee'||kind==='surrender'){s.status='defeat';s.history.push({round:s.round,actor:'hero',type:kind});return s;}
if(kind==='spell'){
const spell=s.hero.learnedSpells.find(x=>x.id===action?.spellId);
if(!spell||s.hero.mana<spell.manaCost)return null;
enemyAttack(s,0,rng);
if(s.status==='active'){s.hero.mana-=spell.manaCost;s.enemy.hp=Math.max(0,s.enemy.hp-Math.floor(spell.damage));s.history.push({round:s.round,actor:'hero',type:'spell',spellId:spell.id,damage:Math.floor(spell.damage),manaCost:spell.manaCost});if(s.enemy.hp===0)s.status='victory';}
}else if(kind==='dodge'){s.history.push({round:s.round,actor:'hero',type:'guard',bonusPercent:20});enemyAttack(s,20,rng);}
else if(s.hero.dexterity>=s.enemy.dexterity){heroStrike(s,rng);if(s.status==='active')enemyAttack(s,0,rng);}
else{enemyAttack(s,0,rng);if(s.status==='active')heroStrike(s,rng);}
if(s.status==='active')s.round++;
return s;
}
function settleVictory(battle,gameState,spearsInInventory,applyApprovedShift,rng=Math.random){
if(!battle||battle.status!=='victory'||battle.rewardApplied||!gameState||typeof applyApprovedShift!=='function')return null;
const bonusGold=1+Math.floor(roll(rng)*6);
const spearAmount=nonnegative(spearsInInventory)<15?1:0;
const receipt=Object.freeze({id:'combat-victory-'+battle.id,energyCost:1,standardSawmillWage:true,standardSeasonalStats:true,extraGold:10,bonusGold,paidShift:true,itemId:'broken_goblin_spear',itemAmount:spearAmount,itemLimit:15});
const nextGameState=applyApprovedShift(gameState,receipt);
if(!nextGameState||nextGameState===gameState)throw new TypeError('Shift adapter must return NEW game state');
const nextBattle=JSON.parse(JSON.stringify(battle));nextBattle.rewardApplied=true;nextBattle.reward={...receipt};
return {receipt,nextGameState,nextBattle};
}
host.SUSLIK2Combat=Object.freeze({GOBLIN,dodgePercent,newBattle,nextRound,settleVictory});
})(globalThis);
