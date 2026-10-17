/* SUSLIK 2 — approved sawmill, night, far forest, endings and reusable battle rules.
   Data and media are in gameplay-content.js. Plain script works from file://. */
(function (global) {
'use strict';
const H=global.SUSLIK2Gameplay={};
const clamp=(n,lo,hi)=>Math.max(lo,Math.min(hi,n));
const roll=(random=Math.random)=>{const n=random();if(!Number.isFinite(n)||n<0||n>=1)throw Error('Invalid random draw');return n;};
H.startRun = (work)=>({elapsedDays:0,lust:work.initial.lust,energy:work.initial.energy,energyMax:work.initial.energyMax,moneyEarned:0,gold:0,completedShifts:0,lastShift:null,farmShifts:0,farmLastShift:null,farmOwnerMet:false,farmBrainsMet:false,events:{shift15:false,shift50:false,foreman:false},pendingEvent:null,returnScene:'sawmill-work',farForestUnlocked:false,farAttempt:null,battle:null,pendingDefeat:null,currentHP:null,currentMana:null,brokenSpears:0,endingOfferOnMap:false,lustEventCount:0,lastSatyrLoss:null,introAllowApplied:false,foremanHandoverSeen:false,foremanQuestFinished:false,nightTrainingCount:0,ogreIntroSeen:false,ogreQuestStarted:false,ogreDefeated:false,ogreHead:false,ogreAfterSceneSeen:false,ogreEndingReady:false,pendingNightTraining:false,knownSpells:[]});
H.restoreRun=(raw,work)=>{
 const base=H.startRun(work);
 if(!raw||typeof raw!=='object')return base;
 for(const key of ['elapsedDays','energy','energyMax','moneyEarned','gold','completedShifts','brokenSpears','currentHP','currentMana','nightTrainingCount','lustEventCount','lust','farmShifts'])if(Number.isFinite(raw[key])&&raw[key]>=0)base[key]=raw[key];
 base.energyMax=clamp(base.energyMax,1,5);base.energy=clamp(base.energy,0,base.energyMax);
 base.brokenSpears=clamp(Math.floor(base.brokenSpears),0,15);
 base.events={shift15:raw.events?.shift15===true,shift50:raw.events?.shift50===true,foreman:raw.events?.foreman===true};
 for(const key of ['lastShift','farmLastShift','pendingEvent','farAttempt','battle','pendingDefeat'])if(raw[key]&&typeof raw[key]==='object')base[key]=structuredClone(raw[key]);
 base.returnScene=typeof raw.returnScene==='string'?raw.returnScene:base.returnScene;
 base.farForestUnlocked=raw.farForestUnlocked===true;base.endingOfferOnMap=raw.endingOfferOnMap===true;
 base.farmOwnerMet=raw.farmOwnerMet===true;
 base.farmBrainsMet=raw.farmBrainsMet===true;
 base.lastSatyrLoss=typeof raw.lastSatyrLoss==='string'?raw.lastSatyrLoss:null;
 base.introAllowApplied=raw.introAllowApplied===true;
 for(const flag of ['foremanHandoverSeen','foremanQuestFinished','ogreIntroSeen','ogreQuestStarted','ogreDefeated','ogreHead','ogreAfterSceneSeen','ogreEndingReady','pendingNightTraining'])base[flag]=raw[flag]===true;
 if(Array.isArray(raw.knownSpells))base.knownSpells=raw.knownSpells.filter(x=>x==='fireball');
 return base;
};
H.maxHP=state=>Math.max(10,Math.round(state.character.stats.endurance*10));
H.maxMana=state=>Math.max(0,Math.floor(state.character.stats.magicMana??state.character.stats.mana??1));
H.balance=(state)=>{
 const r=state.run;
 r.currentHP=r.currentHP===null?H.maxHP(state):clamp(r.currentHP,0,H.maxHP(state));
 r.currentMana=r.currentMana===null?H.maxMana(state):clamp(r.currentMana,0,H.maxMana(state));
};
H.shiftCompleted=(state,returnScene='sawmill-work')=>{
 const r=state.run;r.returnScene=returnScene;
 if(r.completedShifts>=1&&!r.events.shift15){r.events.shift15=true;r.pendingEvent={id:'shift15',returnScene};return 'work-event';}
 if(r.completedShifts>=15&&!r.events.foreman&&state.character.stats.strength>=15&&state.character.stats.endurance>=15){r.events.foreman=true;r.pendingEvent={id:'foreman',returnScene};return 'work-event';}
 if(r.completedShifts>=50&&!r.events.shift50){r.events.shift50=true;r.pendingEvent={id:'shift50',returnScene};return 'work-event';}
 return null;
};
H.completeEvent=(state)=>{
 const e=state.run.pendingEvent;
 if(!e)return 'sawmill-work';
 if(e.id==='foreman')state.run.farForestUnlocked=true;
 state.run.pendingEvent=null;
 return e.returnScene||'sawmill-work';
};
H.farOutcome=(state,random=Math.random)=>{
 if(!state.run.farForestUnlocked||state.run.energy<1||state.run.battle?.status==='active'||(state.run.farAttempt&&!state.run.farAttempt.settled))return null;
 const n=state.run.farAttempt?.n??0;
 const outcome=roll(random)<.6?'goblin':'ordinary';
 state.run.farAttempt={id:`far-${n+1}`,n:n+1,outcome,settled:false};
 return outcome;
};
/* Peaceful far-forest result: one paid shift and one independently rolled trophy.
   The media choice is persisted once per encounter; revisiting is never paid twice. */
H.resolveGoblinPermission=(state,work,media,random=Math.random)=>{
 const run=state?.run,a=run?.farAttempt;
 if(!a||a.outcome!=='goblin'||!Array.isArray(media)||media.length===0)return {ok:false,reason:'invalid-encounter'};
 if(a.permissionResult&&a.settled)return {ok:true,already:true,receipt:a.permissionResult};
 if(a.settled||run.energy<1||run.battle?.status==='active')return {ok:false,reason:'already-resolved-or-no-energy'};
 // Draw once for the trophy, once for the art; each outcome is independent.
 const trophyDraw=roll(random),mediaDraw=roll(random);
 const available=media.map((item,index)=>({item,index})).filter(entry=>!!entry.item?.file);
 const choices=available.length?available:media.map((item,index)=>({item,index}));
 const selection=choices[Math.floor(mediaDraw*choices.length)];
 const selectedIndex=selection.index,selectedMedia=selection.item;
 if(typeof selectedMedia?.id!=='string'||!selectedMedia.id)return {ok:false,reason:'media-missing-id'};
 const wage=applySawmillShift(state,work,{extraGold:10,origin:'far-permission'});
 if(!wage.ok)return {ok:false,reason:wage.reason};
 const spear=(trophyDraw<0.25 && run.brokenSpears<15&&!run.foremanQuestFinished)?1:0;
 run.brokenSpears+=spear;
 run.lust+=1;
 const receipt={attemptId:a.id,mediaId:selectedMedia.id,mediaIndex:selectedIndex,
   wage:wage.wage,season:wage.season,effects:wage.effects,extraGold:10,
   spear,lustDelta:1,energyCost:1,shift:wage.shift};
 a.permissionResult=receipt;
 a.settled=true;
 return {ok:true,already:false,receipt};
};
H.dodgeChance=(defDex,accuracy,guard=0)=>clamp(clamp(1.25*(defDex-accuracy),0,100)+guard,0,100);
H.startBattle=(state)=>{
 H.balance(state);
 const a=state.run.farAttempt;
 if(!a||a.outcome!=='goblin'||a.settled)return false;
 if(state.run.battle&&state.run.battle.attemptId===a.id)return true;
 state.run.battle={attemptId:a.id,enemyId:'goblin',status:state.run.currentHP<=0?'defeat':'active',round:1,heroHP:state.run.currentHP,heroMana:state.run.currentMana,enemyHP:36,maxEnemyHP:36,enemyDamage:60,enemyDexterity:1,enemyAccuracy:20,history:[],rewardApplied:false,reward:null};
 return true;
};
H.turn=(state,action,random=Math.random)=>{
 const b=state.run.battle;if(!b||b.status!=='active')return false;
 if(['flee','surrender'].includes(action)){b.status='defeat';b.history.push({round:b.round,actor:'hero',kind:action});return true;}
 if(action==='spell'){
   if(!state.run.knownSpells?.includes('fireball')||b.heroMana<10)return false;
   // Spell is ALWAYS second, after enemy's attack, regardless of Dexterity.
   const hero=state.character.stats;
   const dodge=H.dodgeChance(hero.dexterity,b.enemyAccuracy);
   const miss=roll(random)<(b.enemyId==='ogre'?0.4:0);
   if(!miss&&roll(random)>=dodge/100){b.heroHP=Math.max(0,b.heroHP-b.enemyDamage);b.history.push({round:b.round,actor:'enemy',kind:'hit',damage:b.enemyDamage});}
   else b.history.push({round:b.round,actor:'enemy',kind:'dodged'});
   if(b.heroHP<=0)b.status='defeat';
   else{b.heroMana-=10;const dmg=40+2*Math.max(0,Math.floor(hero.magic));b.enemyHP=Math.max(0,b.enemyHP-dmg);b.history.push({round:b.round,actor:'hero',kind:'spell',damage:dmg});if(b.enemyHP===0)b.status='victory';}
   state.run.currentHP=b.heroHP;state.run.currentMana=b.heroMana;if(b.status==='active')b.round++;
   return true;
 }
 if(!['strike','dodge'].includes(action))return false;
 const hero=state.character.stats;
 const enemyTurn=(guard=0)=>{
  const chance=H.dodgeChance(hero.dexterity,b.enemyAccuracy,guard);
  if(roll(random)<(b.enemyId==='ogre'?0.4:0)||roll(random)<chance/100){b.history.push({round:b.round,actor:'enemy',kind:'dodged'});return;}
  b.heroHP=Math.max(0,b.heroHP-b.enemyDamage);
  b.history.push({round:b.round,actor:'enemy',kind:'hit',damage:b.enemyDamage});
  if(b.heroHP===0)b.status='defeat';
 };
 const heroTurn=()=>{
  if(roll(random)<.08){b.history.push({round:b.round,actor:'hero',kind:'miss'});return;}
  // No separate author-approved accuracy stat: dexterity is the provisional accuracy source.
  if(roll(random)<H.dodgeChance(b.enemyDexterity,hero.dexterity)/100){b.history.push({round:b.round,actor:'hero',kind:'enemy-dodge'});return;}
  const dmg=Math.max(0,Math.floor(hero.strength));b.enemyHP=Math.max(0,b.enemyHP-dmg);
  b.history.push({round:b.round,actor:'hero',kind:'hit',damage:dmg});
  if(b.enemyHP===0)b.status='victory';
 };
 if(action==='dodge'){b.history.push({round:b.round,actor:'hero',kind:'guard'});enemyTurn(20);}
 else if(hero.dexterity>=b.enemyDexterity){heroTurn();if(b.status==='active')enemyTurn();}
 else{enemyTurn();if(b.status==='active')heroTurn();}
 state.run.currentHP=b.heroHP;state.run.currentMana=b.heroMana;
 if(b.status==='active')b.round++;
 return true;
};
H.rewardVictory=(state,work,random=Math.random)=>{
 const b=state.run.battle;
 if(!b||b.status!=='victory'||b.rewardApplied||state.run.energy<1)return null;
 const extraGold=10,lootGold=1+Math.floor(roll(random)*6);
 const res=applySawmillShift(state,work,{extraGold:extraGold+lootGold,origin:'far-victory'});
 if(!res.ok)return null;
 const spear=state.run.brokenSpears<15&&!state.run.foremanQuestFinished?1:0;
 state.run.brokenSpears+=spear;
 b.reward={wage:res.wage,extraGold,lootGold,spear,season:res.season,effects:res.effects};
 b.rewardApplied=true;state.run.farAttempt.settled=true;
 return b.reward;
};
/* Generic defeat settlement: enemy-specific rules live in gameplay-content.js.
   Each battle produces one persisted receipt and chooses one media ID once. */
H.resolveDefeat=(state,rule,random=Math.random)=>{
 const r=state?.run,b=r?.battle;
 if(!b||b.status!=='defeat'||!rule||rule.id!==(b.enemyId||'goblin')||!b.attemptId)return {ok:false,reason:'invalid-defeat'};
 if(r.pendingDefeat?.attemptId===b.attemptId&&b.defeatResolved===true)return {ok:true,already:true,receipt:r.pendingDefeat};
 if(b.defeatResolved===true||r.pendingDefeat)return {ok:false,reason:'already-resolved'};
 if(!Number.isSafeInteger(rule.goldLoss)||rule.goldLoss<0||!Array.isArray(rule.media)||!rule.media.length||!rule.returnScene)return {ok:false,reason:'invalid-rule'};
 if(!Number.isFinite(r.gold)||r.gold<0)return {ok:false,reason:'invalid-gold-balance'};
 const actualGoldLoss=Math.min(r.gold,rule.goldLoss); // Never create debt; if fewer than 30 gold, lose the remaining balance.
 const draw=roll(random),index=Math.floor(draw*rule.media.length),selected=rule.media[index];
 if(!selected?.id)return {ok:false,reason:'invalid-media-id'};
 const receipt={attemptId:b.attemptId,enemyId:rule.id,mediaIndex:index,mediaId:selected.id,
  returnScene:rule.returnScene,goldLoss:actualGoldLoss,energyLoss:r.energy};
 r.gold-=actualGoldLoss;
 r.energy=0;
 r.pendingDefeat=receipt;
 b.defeatResolved=true;
 if(r.farAttempt?.id===b.attemptId)r.farAttempt.settled=true;
 return {ok:true,already:false,receipt};
};
H.leaveDefeat=(state)=>{
 const r=state?.run;
 if(!r?.pendingDefeat||r.battle?.defeatResolved!==true)return null;
 const scene=r.pendingDefeat.returnScene;
 r.pendingDefeat=null;r.farAttempt=null;r.battle=null;
 return scene;
};
H.wake=(state,street=false)=>{const r=state.run;r.elapsedDays+=1;r.energy=Math.max(0,r.energyMax-(street?1:0));if(street)state.character.stats.grooming=Math.max(1,state.character.stats.grooming-1);r.currentHP=H.maxHP(state);r.currentMana=H.maxMana(state);};
H.satyrWork=(state,random=Math.random)=>{
 const keys=Object.keys(state.character.stats).filter(key=>key!=='lust'&&state.character.stats[key]>1);
 if(!keys.length)return null;
 const key=keys[Math.floor(roll(random)*keys.length)];state.character.stats[key]--;state.run.lastSatyrLoss=key;
 H.balance(state);return key;
};
// One-time quest handover and night training. A training finishes exactly one night.
H.canHandover=state=>!!state.run.farForestUnlocked&&!state.run.foremanQuestFinished&&state.run.brokenSpears>=15;
H.handover=(state)=>{
 if(!H.canHandover(state))return false;
 state.run.brokenSpears-=15;state.run.foremanQuestFinished=true;state.run.foremanHandoverSeen=true;return true;
};
H.canTrain=state=>!!state.run.foremanQuestFinished&&!state.run.ogreDefeated&&!state.run.pendingNightTraining;
H.beginTraining=state=>{if(!H.canTrain(state))return false;state.run.pendingNightTraining=true;return true;};
H.finishTraining=state=>{
 if(!state.run.pendingNightTraining)return false;
 state.run.pendingNightTraining=false;state.run.nightTrainingCount++;
 for(const stat of ['strength','endurance'])state.character.stats[stat]=Math.min(200,state.character.stats[stat]+1);
 H.wake(state);return true;
};
H.ogreIntroReady=state=>state.run.foremanQuestFinished&&!state.run.ogreIntroSeen&&state.run.nightTrainingCount>=15&&state.character.stats.strength>=50&&state.character.stats.endurance>=50;
H.beginOgreIntro=state=>{if(!H.ogreIntroReady(state))return false;state.run.ogreIntroSeen=true;return true;};
H.canHuntOgre=state=>state.run.ogreIntroSeen&&!state.run.ogreQuestStarted;
H.startOgre=(state)=>{
 if(!H.canHuntOgre(state))return false;
 H.balance(state);state.run.ogreQuestStarted=true;
 state.run.battle={attemptId:'ogre-only',enemyId:'ogre',status:'active',round:1,heroHP:state.run.currentHP,heroMana:state.run.currentMana,enemyHP:280,maxEnemyHP:280,enemyDamage:200,enemyDexterity:1,enemyAccuracy:20,history:[],rewardApplied:false,reward:null};return true;
};
H.finishOgreVictory=state=>{const b=state.run.battle;if(!b||b.enemyId!=='ogre'||b.status!=='victory'||b.rewardApplied)return false;
 b.rewardApplied=true;state.run.ogreDefeated=true;state.run.ogreHead=true;return true;};
H.ogreAfterIntro=state=>state.run.ogreDefeated&&state.run.ogreHead&&!state.run.ogreAfterSceneSeen;
H.finishOgreAfter=state=>{if(!H.ogreAfterIntro(state))return false;state.run.ogreHead=false;state.run.ogreAfterSceneSeen=true;state.run.ogreEndingReady=true;return true;};
H.availableEndings=state=>[...(state.run.completedShifts>=50&&state.run.events.shift50&&state.run.endingOfferOnMap?['hard-worker']:[]),...(state.run.ogreEndingReady?['foreman-lady']:[])];
H.endingAvailable=state=>H.availableEndings(state).length>0;
H.unlockEnding=(state,id='hard-worker')=>{
 if(id==='hard-worker'&&!H.availableEndings(state).includes('hard-worker'))return false;
 if(id==='foreman-lady'&&!state.run.ogreEndingReady)return false;
 if(id==='ogre-captive'&&state.run.battle?.enemyId!=='ogre')return false;
 if(!state.meta.unlockedEndings.includes(id))state.meta.unlockedEndings.push(id);
 state.meta.completedRuns=state.meta.unlockedEndings.length;
 return true;
};
})(window);
