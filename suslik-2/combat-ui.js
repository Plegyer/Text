/* SUSLIK 2 combat screen; portable, UI-only, integrates through callbacks. */
(function(host){
'use strict';
const el=(tag,cls,txt)=>{const x=document.createElement(tag);if(cls)x.className=cls;if(txt!==undefined)x.textContent=txt;return x;};
function btn(label,action,id,disabled=false){const x=el('button','combat-button',label);x.type='button';x.dataset.actionId=id;x.disabled=disabled;x.addEventListener('click',action);return x;}
function stat(label,value){const x=el('div','combat-stat');x.append(el('span','',label),el('strong','',String(value)));return x;}
function bar(title,current,max,kind){const outer=el('div','combat-bar-wrap');const label=el('div','combat-bar-label');label.append(el('span','',title),el('strong','',current+' / '+max));const track=el('div','combat-bar-track');const fill=el('div','combat-bar-fill combat-'+kind);fill.style.width=(max>0?Math.max(0,Math.min(100,current/max*100)):0)+'%';track.append(fill);outer.append(label,track);return outer;}
function portrait(src,alt){const x=el('img','combat-portrait');x.src=src;x.alt=alt;x.draggable=false;return x;}
function describe(history,t){
const arr=[];const template=(v,n)=>v.replace('{n}',String(n));
for(const h of history.slice(-5)){
 if(h.type==='hit')arr.push(template(h.actor==='hero'?t.logHeroHit:t.logEnemyHit,h.damage));
 if(h.type==='dodged')arr.push(t.logHeroDodges);
 if(h.type==='miss')arr.push(h.reason==='enemy-dodge'?t.logEnemyDodges:t.logMiss);
 if(h.type==='guard')arr.push(t.logGuard);
 if(h.type==='spell')arr.push(template(t.logSpell,h.damage));
 if(h.type==='flee')arr.push(t.logEscape);
 if(h.type==='surrender')arr.push(t.logSurrender);
}
return arr;
}
function render(container,params){
const content=params.content||host.SUSLIK2CombatContent;
const battle=params.battle;
if(!content||!battle)throw new Error('combat content and battle required');
const t=content.locales[params.locale==='en'?'en':'ru'];
let audio=container.querySelector('[data-combat-soundtrack]');
if(!params.setMusic&&!audio){audio=el('audio','');audio.dataset.combatSoundtrack='1';audio.src=content.combatMusic;audio.loop=true;audio.volume=Math.max(0,Math.min(1,params.musicVolume??0.12));audio.muted=params.soundEnabled===false;}
if(params.setMusic)params.setMusic(content.musicId,content.combatMusic);
const root=el('section','combat-scene');root.dataset.sceneId=battle.status==='active'?'combat-active':battle.status==='victory'?'combat-victory':'combat-defeat-pending';
const header=el('div','combat-top');
const hero=el('article','combat-fighter');hero.append(portrait(content.heroImage,t.hero),el('h2','',t.hero),bar(t.hp,battle.hero.hp,battle.hero.maxHP,'hp'),bar(t.mana,battle.hero.mana,battle.hero.maxMana,'mana'));
const heroStats=el('div','combat-stats');for(const [label,value] of [[t.strength,battle.hero.strength],[t.endurance,battle.hero.endurance],[t.dexterity,battle.hero.dexterity],[t.magic,battle.hero.magic]])heroStats.append(stat(label,value));hero.append(heroStats);
const enemy=el('article','combat-fighter');enemy.append(portrait(content.goblinImage,battle.enemy.nameRu),el('h2','',battle.enemy.nameRu),bar(t.hp,battle.enemy.hp,battle.enemy.maxHP,'hp'));
const enemyStats=el('div','combat-stats');for(const [label,value] of [[t.damage,battle.enemy.damage],[t.dexterity,battle.enemy.dexterity],[t.accuracy,battle.enemy.accuracy]])enemyStats.append(stat(label,value));enemy.append(enemyStats);header.append(hero,enemy);root.append(header);
const log=el('div','combat-log');log.setAttribute('aria-live','polite');log.append(el('h3','',t.round+' '+battle.round));for(const line of describe(battle.history,t))log.append(el('p','',line));root.append(log);
const controls=el('div','combat-actions');
if(battle.status==='active'){
 controls.append(btn(t.strike,()=>params.onAction?.('strike'),'strike'),btn(t.spell,()=>{
   const panel=root.querySelector('.combat-spell-menu');
   if(panel){panel.remove();return;}
   const menu=el('div','combat-spell-menu');menu.append(el('p','',battle.hero.learnedSpells.length?'':t.noSpells));
   for(const spell of battle.hero.learnedSpells)menu.append(btn(spell.name+' · '+spell.manaCost+' '+t.mana,()=>params.onAction?.({type:'spell',spellId:spell.id}),'spell-'+spell.id,battle.hero.mana<spell.manaCost));
   menu.append(btn(t.back,()=>menu.remove(),'spell-back'));root.append(menu);
 },'spell'),btn(t.dodge,()=>params.onAction?.('dodge'),'dodge'),btn(t.flee,()=>params.onAction?.('flee'),'flee'),btn(t.surrender,()=>params.onAction?.('surrender'),'surrender'));
}else if(battle.status==='victory'){
 root.append(el('h2','combat-outcome',t.victory));
 if(battle.rewardApplied){const r=battle.reward;const reward=el('div','combat-reward');reward.append(el('p','',t.extraPay+': +'+r.extraGold),el('p','',t.lootGold+': +'+r.bonusGold));if(r.itemAmount)reward.append(el('p','',t.spear+': +1'));root.append(reward);controls.append(btn(t.continueWork,()=>params.onContinue?.(),'continue-work'),btn(t.returnToArtel,()=>params.onReturn?.(),'return-to-artel'));}
 else root.append(el('p','combat-pending',t.rewardPending));
}else{root.append(el('h2','combat-outcome',t.defeat),el('p','combat-pending',t.defeatPending));}
root.append(controls);
if(audio){container.replaceChildren(audio,root);audio.play().catch(()=>{});}else container.replaceChildren(root);
return root;
}
host.SUSLIK2CombatUI=Object.freeze({render});
})(globalThis);
