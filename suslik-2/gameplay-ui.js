/* SUSLIK 2: scene bindings for the existing portable offline runtime. */
function gp(){return window.SUSLIK2Gameplay;}
function gc(){return window.SUSLIK2_GAMEPLAY_CONTENT;}
function gl(key){return gc().i18n[state.settings.locale]?.[key]||gc().i18n.ru[key]||key;}
function gpButton(text,id,callback,disabled=false){const b=element('button','game-button gameplay-button',text);b.type='button';b.dataset.actionId=id;b.disabled=disabled;b.addEventListener('click',callback);return b;}
function gpArt(source,id){return media(source,id,'mediaMissing','story-image');}
function gpScene(image,text,buttons=[],title=''){
 const screen=element('section','story-scene gameplay-scene');const art=element('div','story-art');
 art.append(gpArt(image,'MEDIA.GAMEPLAY.'+(title||'SCENE')));
 const panel=element('article','story-panel gameplay-panel');
 if(title)panel.append(element('h1','work-title',title));
 if(text)panel.append(element('p','story-text',text));
 const actions=element('div','story-actions gameplay-actions');for(const b of buttons)actions.append(gpButton(b.label,b.id,b.fn,b.disabled));
 panel.append(actions);screen.append(art,panel);root.append(screen);return panel;
}
function gpShift(origin='sawmill',extraGold=0){
 const result=applySawmillShift(state,work,{origin,extraGold});if(!result.ok)return false;
 state.run.farAttempt=origin==='far-ordinary'?state.run.farAttempt:state.run.farAttempt;
 if(origin==='far-ordinary'&&state.run.farAttempt)state.run.farAttempt.settled=true;
 const resume=origin==='far-ordinary'?'far-ordinary':'sawmill-work';
 const event=gp().shiftCompleted(state,resume);
 state.sceneId=event||resume;persist();render();return true;
}
function gpFarAttempt(){
 if(!state.run.farForestUnlocked||sawmillAvailability(state,work)!==null){return false;}
 const outcome=gp().farOutcome(state);
 if(!outcome)return false;
 if(outcome==='ordinary')return gpShift('far-ordinary',10);
 state.sceneId='far-goblin';persist();render();return true;
}
function gpEventScreen(){
 const ev=state.run.pendingEvent;if(!ev){changeScene('sawmill-work');return;}
 const image=gc().images[ev.id],text=gc().text[ev.id];
 gpScene(image,text,[{id:'work-event-next',label:gl('next'),fn:()=>{
  const back=gp().completeEvent(state);
  const follow=gp().shiftCompleted(state,back);
  state.sceneId=follow||back;persist();render();
 }}]);
}
function gpHandoverScene(){
 gpScene(gc().images.foremanHandover,gc().text.foremanHandover,[{id:'foreman-handover-next',label:gl('next'),fn:()=>{
  if(!gp().handover(state))return;
  changeScene('sawmill-work');
 }}]);
}
function gpOgreIntroScene(){
 gpScene(gc().images.ogreIntro,gc().text.ogreIntro,[{id:'ogre-intro-next',label:gl('next'),fn:()=>changeScene('sawmill-work')}]);
}
function gpOgreVictoryScene(){
 gpScene(gc().images.ogre,gc().text.ogreVictory,[{id:'ogre-victory-next',label:gl('next'),fn:()=>{
  state.run.battle=null;changeScene('game-main');
 }}]);
}
function gpOgreAfterScene(){
 gpScene(gc().images.ogreAfter,gc().text.ogreAfter,[{id:'ogre-after-next',label:gl('next'),fn:()=>{
  if(!gp().finishOgreAfter(state))return;
  state.run.battle=null;changeScene('sawmill-work');
 }}]);
}
function gpEndingFinish(id){
 if(!gp().unlockEnding(state,id))return;
 state.activeGame=false;state.resumeSnapshot=null;state.selectedBonuses=[];
 state.run=newWorkRun(work);state.character=freshCharacter(creation);
 changeScene('splash');
}
function gpOgreCaptiveScene(){
 gpScene(gc().images.ogreCaptive,gc().text.ogreCaptive,[{id:'ogre-captive-end',label:gl('end'),fn:()=>gpEndingFinish('ogre-captive')}],gl('ogreCaptiveTitle'));
}
function gpForemanLadyEnding(){
 gpScene(gc().images.endingForemanLady,gc().text.endingForemanLady,[{id:'ending-foreman-lady-end',label:gl('end'),fn:()=>gpEndingFinish('foreman-lady')}],gl('foremanLady'));
}
function gpNightTraining(){
 gpScene(gc().images.nightTraining,'Амалия тренируется всю ночь. +1 Сила, +1 Выносливость. Здоровье, мана и энергия полностью восстанавливаются.',[
  {id:'training-finish',label:gl('next'),fn:()=>{if(gp().finishTraining(state))changeScene('game-main');}}
 ],gl('training'));
}
function gpFarOrdinaryScreen(){
 const shift=state.run.lastShift;if(!shift){changeScene('sawmill-work');return;}
 const def=work.sawmill.seasonal[shift.season];
 const lines=work.locales[state.settings.locale];
 const text=`${lines.season}: ${lines.seasons[shift.season]}\n${lines.wage}: +${shift.wage} ${lines.moneyUnit}\n${lines.energy}: ${state.run.energy}/${state.run.energyMax}\n${gl('gold')}: ${state.run.gold}`;
 gpScene(def.image,text,[{id:'far-next',label:gl('next'),fn:()=>changeScene('sawmill-work')},
 {id:'far-continue',label:gl('continue'),disabled:state.run.energy<1,fn:gpFarAttempt}],lines.location);
}
function gpEncounterScreen(){
 gpScene(gc().images.goblinEncounter,gc().text.goblinEncounter,[
 {id:'goblin-permission',label:gl('permission'),fn:gpAcceptGoblinPermission},
 {id:'goblin-fight',label:gl('fight'),fn:()=>{
  if(!gp().startBattle(state))return;
  state.sceneId='combat';persist();render();
 }}]);
}
function gpAcceptGoblinPermission(){
 const result=gp().resolveGoblinPermission(state,work,gc().permissionMedia);
 if(!result.ok)return false;
 const required=gp().shiftCompleted(state,'far-permission-result');
 state.sceneId=required||'far-permission-result';persist();render();return true;
}
function gpGoblinPermissionScreen(){
 const a=state.run.farAttempt,result=a?.permissionResult;
 if(!result||!a.settled){changeScene('far-goblin');return;}
 const source=gc().permissionMedia.find(item=>item.id===result.mediaId);
 const screen=element('section','story-scene gameplay-scene');
 const art=element('div','story-art');
 art.append(gpArt(source?.file??null,result.mediaId));
 const panel=element('article','story-panel gameplay-panel');
 panel.append(element('p','story-text',gc().text.goblinPermission));
 const lines=work.locales[state.settings.locale];
 const tally=element('div','work-tally permission-tally');
 tally.append(element('p','',`${lines.wage}: +${result.wage} ${lines.moneyUnit}`));
 tally.append(element('p','',`${lines.energy}: ${state.run.energy}/${state.run.energyMax}`));
 tally.append(element('p','',`+1 ${state.settings.locale==='en'?'Lust':'Похоть'}`));
 if(result.spear)tally.append(element('p','',`+1 ${gl('spear')}`));
 panel.append(tally);
 const actions=element('div','story-actions gameplay-actions');
 actions.append(gpButton(gl('continue'),'goblin-permission-continue',gpFarAttempt,
    state.run.energy<1||sawmillAvailability(state,work)!==null));
 actions.append(gpButton(gl('returnMapPeace'),'goblin-permission-return',()=>changeScene('game-main')));
 panel.append(actions);screen.append(art,panel);root.append(screen);
}
function gpNightScreen(type){
 if(type==='satyr'){
  gpScene(gc().images.satyrWork,gc().text.satyrWork+'\n\n−1 '+(copy().stats[state.run.lastSatyrLoss]||state.run.lastSatyrLoss||'характеристика'),[{id:'satyr-next',label:gl('next'),fn:()=>changeScene('night-room')}]);return;
 }
 const buttons=[{id:'wake',label:gl('wake'),fn:()=>{if(state.sceneId!==('night-'+type))return;gp().wake(state,type==='street');changeScene('game-main');}}];
 if(type==='room'&&gp().canTrain(state))buttons.unshift({id:'night-training',label:gl('training'),fn:()=>{
  if(gp().beginTraining(state))changeScene('night-training');
 }});
 gpScene(gc().images[type], '', buttons,gl(type));
}
function gpOpenSleep(){
 const dialog=element('dialog','new-game-dialog sleep-dialog');
 dialog.append(element('h2','',gl('sleep')));
 const opts=element('div','story-actions');
 opts.append(gpButton(gl('nightRent'),'sleep-rent',()=>{dialog.close();dialog.remove();if(state.run.gold>=100){state.run.gold-=100;changeScene('night-room');}else changeScene('night-street');}));
  opts.append(gpButton('Спать на улице бесплатно','sleep-free-street',()=>{dialog.close();dialog.remove();changeScene('night-street');}));
  opts.append(gpButton(gl('nightSatyr'),'sleep-satyr',()=>{dialog.close();dialog.remove();const lost=gp().satyrWork(state);changeScene(lost?'night-satyr':'night-street');}));
 if(gp().canStudyWithZombie(state))opts.append(gpButton('Обучение','sleep-zombie-study',()=>{
   dialog.close();dialog.remove();
   const pending=element('dialog','new-game-dialog info-dialog');
   pending.append(element('h2','','Обучение'));
   pending.append(element('p','','Сцена обучения будет добавлена позднее.'));
   pending.append(gpButton('Закрыть','zombie-study-close',()=>pending.close()));
   pending.addEventListener('close',()=>pending.remove(),{once:true});
   document.body.append(pending);pending.showModal();
 }));
 opts.append(gpButton(gl('nightCancel'),'sleep-cancel',()=>{dialog.close();dialog.remove();}));
 dialog.append(opts);dialog.addEventListener('close',()=>dialog.remove(),{once:true});document.body.append(dialog);dialog.showModal();
}
function gpMenuEnding(){
 const buttons=[];
 for(const id of gp().availableEndings(state)){
  if(id==='hard-worker')buttons.push({id:'ending-hard-worker',label:gl('hardWorker'),fn:()=>changeScene('ending-hard-worker')});
  if(id==='foreman-lady')buttons.push({id:'ending-foreman-lady',label:gl('foremanLady'),fn:()=>changeScene('ending-foreman-lady')});
 }
 buttons.push({id:'ending-cancel',label:gl('cancel'),fn:()=>changeScene('game-main')});
 gpScene(gc().images.endingMenu,'Вы хотите вырваться из этого порочного круга?',buttons);
}
function gpFinalEnding(){
 gpScene(gc().images.endingHardWorker,copy().hardWorkerText||'Амалия не знала, что ждёт её впереди, да и не хотела знать. Лес и всё, что было с ним связано, настолько захватили её, что другой судьбы она себе уже просто не желала.',[
  {id:'ending-finish',label:gl('end'),fn:()=>gpEndingFinish('hard-worker')}
 ]);
}
function gpBonusSelection(){
 const screen=element('section','scene--panel');const card=element('div','selection-panel');
 card.append(element('h1','',tr('bonusTitle')));
 const bonuses=[
  ['hard-worker','Трудяга: +5 Силы'],
  ['ogre-captive','Огненный шар: изученное заклинание, стоимость 10 маны'],
  ['foreman-lady','Бригадирша: +5 Выносливости']
 ];
 for(const [id,title] of bonuses){
  if(!state.meta.unlockedEndings.includes(id))continue;
  const selected=element('input');selected.type='checkbox';selected.id='bonus-'+id;
  selected.checked=state.selectedBonuses.includes(id);
  selected.addEventListener('change',()=>{
   const chosen=new Set(state.selectedBonuses);
   if(selected.checked)chosen.add(id);else chosen.delete(id);
   state.selectedBonuses=[...chosen];persist();
  });
  const label=element('label','',title);label.htmlFor=selected.id;
  const wrap=element('div','bonus-toggle');wrap.append(selected,label);card.append(wrap);
 }
 card.append(gpButton(gl('startRun'),'bonus-begin',()=>{
  state.run=newWorkRun(work);state.activeGame=true;
  if(state.selectedBonuses.includes('hard-worker'))state.character.stats.strength=Math.min(200,state.character.stats.strength+5);
  if(state.selectedBonuses.includes('foreman-lady'))state.character.stats.endurance=Math.min(200,state.character.stats.endurance+5);
  if(state.selectedBonuses.includes('ogre-captive'))state.run.knownSpells=['fireball'];
  changeScene('game-main');
 }));screen.append(card);root.append(screen);
}
function gpDefeatScreen(){
 const receipt=state.run.pendingDefeat;
 const fallback=state.run.battle;
 if(!receipt){
  // Show a safe fallback only if settlement failed for reasons other than insufficient gold.
  const screen=element('section','story-scene gameplay-scene');
  const panel=element('article','story-panel gameplay-panel');
  panel.append(element('h1','work-title',gl('defeatTitle')),
   element('p','story-text',gc().text.goblinDefeat));
  screen.append(panel);root.append(screen);
  return;
 }
 const rule=gc().defeats[receipt.enemyId],chosen=rule?.media[receipt.mediaIndex];
 const screen=element('section','story-scene gameplay-scene');
 const art=element('div','story-art');
 if(chosen?.file)art.append(gpArt(chosen.file,receipt.mediaId));
 else art.append(element('div','media-placeholder',tr('mediaMissing')+': '+receipt.mediaId));
 const panel=element('article','story-panel gameplay-panel');
 panel.append(element('h1','work-title',gl('defeatTitle')));
 panel.append(element('p','story-text',gc().text.goblinDefeat));
 const actions=element('div','story-actions gameplay-actions');
 actions.append(gpButton(gl('next'),'combat-defeat-next',()=>{
  const target=gp().leaveDefeat(state);
  if(target)changeScene(target);
 }));
 panel.append(actions);screen.append(art,panel);root.append(screen);
}
function gpBattleLog(entry,enemyName='Гоблин'){
 if(entry.kind==='spell')return `Огненный шар наносит ${entry.damage} урона.`;
 if(entry.kind==='hit')return entry.actor==='hero'?`Амалия наносит ${entry.damage} урона.`:`${enemyName} наносит ${entry.damage} урона.`;
 if(entry.kind==='miss')return 'Амалия промахнулась.';
 if(entry.kind==='enemy-dodge')return enemyName+' уклонился.';
 if(entry.kind==='dodged')return 'Амалия уклонилась.';
 if(entry.kind==='guard')return 'Амалия готовится уклониться (+20% на раунд).';
 if(entry.kind==='flee')return 'Амалия пытается убежать.';
 if(entry.kind==='surrender')return 'Амалия сдаётся.';
 return '';
}
function gpBar(name,val,max,type){
 const wrapper=element('div','combat-meter');const line=element('div','combat-meter-label');line.append(element('span','',name),element('strong','',`${val}/${max}`));
 const track=element('div','combat-meter-track');const fill=element('div','combat-meter-fill '+type);fill.style.width=(max?Math.round(val/max*100):0)+'%';track.append(fill);wrapper.append(line,track);return wrapper;
}
function gpBattleScreen(){
 const b=state.run.battle;if(!b){changeScene('far-goblin');return;}
 const screen=element('section','combat-screen');const fighters=element('div','combat-fighters');
 const hero=element('article','combat-fighter');hero.append(gpArt(gc().images.hero,'MEDIA.COMBAT.HERO.001'),element('h2','','Амалия'),gpBar(gl('health'),b.heroHP,gp().maxHP(state),'hp'),gpBar(gl('mana'),b.heroMana,gp().maxMana(state),'mana'));
 const st=state.character.stats;hero.append(element('p','',`Сила: ${st.strength} · Выносливость: ${st.endurance} · Ловкость: ${st.dexterity} · Магия: ${st.magic}`));
 const foe=element('article','combat-fighter');foe.append(gpArt(b.enemyId==='ogre'?gc().images.ogre:gc().images.goblin,'MEDIA.COMBAT.'+b.enemyId.toUpperCase()),element('h2','',b.enemyId==='ogre'?'Огр':'Гоблин'),gpBar(gl('health'),b.enemyHP,b.maxEnemyHP,'hp'),element('p','',`Урон: ${b.enemyDamage} · Ловкость: ${b.enemyDexterity} · Точность: ${b.enemyAccuracy}`));
 fighters.append(hero,foe);screen.append(fighters);
 const log=element('div','combat-history');log.append(element('strong','',`${gl('result')} — ${b.round}`));
 for(const e of b.history.slice(-6)){log.append(element('p','',gpBattleLog(e,b.enemyId==='ogre'?'Огр':'Гоблин')));}screen.append(log);
 const controls=element('div','story-actions combat-actions');
 if(b.status==='active'){
  const turn=(action)=>{if(gp().turn(state,action)){
    if(b.status==='defeat'){if(b.enemyId==='ogre')state.sceneId='ogre-captive';else{gp().resolveDefeat(state,gc().defeats.goblin);state.sceneId='combat-defeat';}}
    if(b.status==='victory'){
      if(b.enemyId==='ogre'){gp().finishOgreVictory(state);state.sceneId='ogre-victory';persist();render();return;}
      const reward=gp().rewardVictory(state,work);
      if(reward){const event=gp().shiftCompleted(state,'combat');if(event)state.sceneId=event;}
    }
    persist();render();
  }};
  controls.append(gpButton(gl('strike'),'combat-strike',()=>turn('strike')));
  controls.append(gpButton(gl('spell'),'combat-spell',()=>{
    const existing=screen.querySelector('.spell-panel');if(existing){existing.remove();return;}
    const spellPanel=element('div','spell-panel');
    if(state.run.knownSpells?.includes('fireball')){
      spellPanel.append(gpButton('Огненный шар — 10 маны','combat-fireball',()=>turn('spell'),b.heroMana<10));
    }else spellPanel.append(element('p','',gl('noSpells')));
    spellPanel.append(gpButton(gl('cancel'),'combat-spell-back',()=>spellPanel.remove()));screen.append(spellPanel);
  }));
  controls.append(gpButton(gl('dodge'),'combat-dodge',()=>turn('dodge')));
  controls.append(gpButton(gl('flee'),'combat-flee',()=>{gp().turn(state,'flee');if(b.enemyId==='ogre')changeScene('ogre-captive');else{gp().resolveDefeat(state,gc().defeats.goblin);changeScene('combat-defeat');}}));
  controls.append(gpButton(gl('surrender'),'combat-surrender',()=>{gp().turn(state,'surrender');if(b.enemyId==='ogre')changeScene('ogre-captive');else{gp().resolveDefeat(state,gc().defeats.goblin);changeScene('combat-defeat');}}));
 }else if(b.status==='victory'){
  screen.append(element('h2','combat-outcome',gl('victory')));
  const reward=b.reward;if(reward){
   screen.append(element('p','',`+${reward.wage} ${gl('gold')} (${gl('loot')}: +${reward.lootGold})${reward.spear?' · +1 '+gl('spear'):''}`));
   controls.append(gpButton(gl('continue'),'combat-continue',gpFarAttempt,state.run.energy<1));
   controls.append(gpButton(gl('returnCrew'),'combat-return',()=>{state.run.farAttempt=null;state.run.battle=null;changeScene('sawmill-work');}));
  }
 }else{screen.append(element('h2','',gl('defeat')),element('p','',gl('combatFailed')));}
 screen.append(controls);root.append(screen);
}


/* Obligatory owner encounter after the fifth PAID farm shift. No new payment. */
function sceneUndeadFarmOwner05(){
 gpScene(gc().images.undeadFarmOwner05,gc().text.undeadFarmOwner05,[{
  id:'undead-farm-owner-next',label:gl('next'),fn:()=>{
   if(state.sceneId!=='undead-farm-owner-05')return;
   // Keep the fifth shift's persisted result for the existing work window.
   changeScene('undead-farm-work');
  }
 }]);
}

/* Obligatory brain-request scene on the farm: no extra rewards or shift. */
function sceneUndeadFarmBrains15(){
 gpScene(gc().images.undeadFarmBrains15,gc().text.undeadFarmBrains15,[{
  id:'undead-farm-brains-15-next',label:gl('next'),fn:()=>{
   if(state.sceneId!=='undead-farm-brains-15')return;
   gp().unlockZombieBrainSearch(state);
   state.run.farmLastShift=null;
   changeScene('undead-farm-work');
  }
 }]);
}
/* First paid shift after collecting the brain: wide authored story with no extra rewards. */
function sceneUndeadFarmBrainReturn(){
 const panel=gpScene(gc().images.undeadFarmBrainReturn,gc().text.undeadFarmBrainReturn,[{
  id:'undead-farm-brain-return-next',label:gl('next'),fn:()=>{
   if(state.sceneId!=='undead-farm-brain-return')return;
   if(!gp().finishFarmBrainHandover(state))return;
   state.run.farmLastShift=null;
   changeScene('undead-farm-work');
  }
 }]);
 panel.parentElement.classList.add('farm-brain-return-scene');
}
function gpFarmBrainsReady(){
 return !state.run.farmBrainsMet&&state.run.farmShifts>=15&&
  state.character.stats.endurance>=15&&state.character.stats.reason>=15;
}

/* Farm seasonal work: the same game state, persist(), and music director that
 * the sawmill uses. A visit shows the work button; it never pays automatically. */
function startUndeadFarmShift(){
 if(state.sceneId!=='undead-farm-work'||state.run.energy<1)return false;
 const result=applyUndeadFarmShift(state,work);
 if(!result.ok)return false;
 // Set the one-time flag in the same persisted transition as the fifth
 // paid shift. Visiting the location never counts as work.
 if(state.run.farmShifts>=5&&!state.run.farmOwnerMet){
  state.run.farmOwnerMet=true;
  state.sceneId='undead-farm-owner-05';
 }else if(gpFarmBrainsReady()){
  state.run.farmBrainsMet=true;
  state.sceneId='undead-farm-brains-15';
 }else if(gp().beginFarmBrainHandover(state)){
  state.sceneId='undead-farm-brain-return';
 }
 persist();render();return true;
}
function sceneUndeadFarmWork(scene){
 // If the stats matured elsewhere, returning to the farm still triggers once.
 if(gpFarmBrainsReady()){
  state.run.farmBrainsMet=true;
  state.sceneId='undead-farm-brains-15';
  persist();render();return;
 }
 const def=work.farm;
 const labels=work.locales[state.settings.locale];
 const isEn=state.settings.locale==='en';
 const result=state.run.farmLastShift;
 const seasonId=result?.season||workSeason(state.run.elapsedDays,work);
 const artDef=def.seasonal[seasonId];
 const screen=element('section','story-scene work-scene farm-work-scene');
 const art=element('div','story-art');
 const image=element('img','story-image');
 const lustFile=result?.lustEvent&&window.SUSLIK2_GAMEPLAY_CONTENT?.lustMedia?.find(x=>x.id===result.lustMediaId)?.file;
 image.src=lustFile||artDef.image;
 image.alt=isEn?'Amalia working at the undead farm, '+seasonId:'Амалия работает на ферме зомби: '+labels.seasons[seasonId];
 image.draggable=false;
 image.addEventListener('error',()=>image.replaceWith(element('div','media-placeholder',tr('mediaMissing')+': '+artDef.imageId)),{once:true});
 art.append(image);
 const panel=element('article','story-panel work-panel');
 panel.append(element('h1','work-title',isEn?'Undead farm':'Ферма зомби'));
 panel.append(element('p','work-season',labels.season+': '+labels.seasons[seasonId]));
 const buttons=element('div','story-actions work-actions');
 if(!result){
   const wage=Math.min(def.wage.cap,Math.round(def.wage.base+def.wage.weights.reduce((sum,w)=>sum+state.character.stats[w.stat]*w.factor,0)));
   panel.append(element('p','work-status',`${labels.energy}: ${state.run.energy}/${state.run.energyMax} · ${gl('gold')}: ${state.run.gold}`));
   panel.append(element('p','work-status',`${labels.wage}: +${wage} ${labels.moneyUnit}`));
   buttons.append(gpButton(isEn?'Work':'Работать','undead-farm-start',startUndeadFarmShift,state.run.energy<def.energyCost));
 }else{
   const summary=element('div','work-tally');
   summary.append(element('p','',`${labels.energy}: ${state.run.energy}/${state.run.energyMax}`));
   summary.append(element('p','',`${labels.wage}: +${result.wage} ${labels.moneyUnit}`));
   panel.append(summary);
   panel.append(element('h2','work-subheading',labels.statChange));
   const changes=element('div','work-stats');
   for(const {stat,delta} of result.effects){
     const row=element('div','work-stat-row');
     row.append(element('span','',copy().stats[stat]||stat),element('strong','',`${delta>0?'+':''}${delta} → ${state.character.stats[stat]}`));
     changes.append(row);
   }
   panel.append(changes);
   if(result.lustEvent&&result.lustEventIndex%3===0)panel.append(element('p','work-status',isEn?'Lust +1':'Похоть +1'));
   buttons.append(gpButton(isEn?'Continue working':'Продолжить работу','undead-farm-continue',()=>{
      if(state.sceneId!=='undead-farm-work')return;
      startUndeadFarmShift();
   },state.run.energy<def.energyCost));
 }
 if(state.run.energy<def.energyCost)panel.append(element('p','work-notice',labels.noEnergy));
 buttons.append(gpButton(isEn?'Return home':'Вернуться домой','undead-farm-return',()=>{state.run.farmLastShift=null;changeScene('game-main');}));
 panel.append(buttons);screen.append(art,panel);root.append(screen);
}
