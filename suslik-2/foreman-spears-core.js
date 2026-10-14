/* SUSLIK 2: one-off foreman spear handover. Classic file:// script.
   The portable sawmill owns the real quest, inventory, save and night handlers. */
(function (host) {
  'use strict';
  const ITEM_ID = 'broken_goblin_spear';
  const REQUIRED_SPEARS = 15;
  const SCENE_ID = 'foreman-spear-handover';
  const PHASE = Object.freeze({IDLE:'idle', SCENE:'scene', COMPLETE:'complete'});
  const validCount = n => Number.isSafeInteger(n) && n >= 0;
  function initialState() {
    return {version:1, phase:PHASE.IDLE, sceneShown:false,
      questCompleted:false, spearDropsDisabled:false, nightTrainingUnlocked:false};
  }
  function restoreState(raw) {
    const s=initialState();
    if(!raw || typeof raw!=='object' || raw.version!==1) return s;
    if(raw.phase===PHASE.COMPLETE && raw.questCompleted===true &&
       raw.spearDropsDisabled===true && raw.nightTrainingUnlocked===true) {
      return {version:1,phase:PHASE.COMPLETE,sceneShown:true,
        questCompleted:true,spearDropsDisabled:true,nightTrainingUnlocked:true};
    }
    if(raw.phase===PHASE.SCENE && raw.sceneShown===true &&
       raw.questCompleted!==true) {
      s.phase=PHASE.SCENE;s.sceneShown=true;
    }
    return s;
  }
  function canOffer(state, evidence) {
    const s=restoreState(state);
    return s.phase===PHASE.IDLE && !s.sceneShown && !s.questCompleted &&
      evidence?.questActive===true && validCount(evidence?.spearCount) &&
      evidence.spearCount>=REQUIRED_SPEARS &&
      evidence?.handoverSceneShown!==true && evidence?.questCompleted!==true;
  }
  /* Show the scene once and persist it BEFORE rendering. Do not spend spears
     until the player confirms with 'Далее'. */
  function openHandover(state, evidence) {
    if(!canOffer(state,evidence)) return null;
    return {...restoreState(state),phase:PHASE.SCENE,sceneShown:true};
  }
  function isHandoverScene(state) {return restoreState(state).phase===PHASE.SCENE;}
  function isTrainingUnlocked(state) {
    const s=restoreState(state);
    return s.phase===PHASE.COMPLETE && s.questCompleted && s.nightTrainingUnlocked;
  }
  function areSpearDropsDisabled(state) {return restoreState(state).spearDropsDisabled;}
  function confirmHandover(state, gameState, adapters) {
    if(!isHandoverScene(state)) return null;
    if(!gameState || typeof gameState!=='object') throw new TypeError('Existing game state required');
    if(typeof adapters?.readSpearCount!=='function' ||
       typeof adapters?.applyApprovedHandover!=='function' ||
       typeof adapters?.readQuestFlags!=='function')
      throw new TypeError('Real inventory/quest adapters required');
    const beforeCount=adapters.readSpearCount(gameState,ITEM_ID);
    if(!validCount(beforeCount)) throw new TypeError('Invalid real inventory count');
    if(beforeCount<REQUIRED_SPEARS) return null;
    const change=Object.freeze({itemId:ITEM_ID,quantity:REQUIRED_SPEARS,
      questCompleted:true,spearDropsDisabled:true,nightTrainingUnlocked:true});
    // Pure game adapter: do not mutate the input and do not write saves here.
    const nextGame=adapters.applyApprovedHandover(gameState,change);
    if(!nextGame || typeof nextGame!=='object' || nextGame===gameState)
      throw new TypeError('Handover adapter must return a NEW game state');
    if(adapters.readSpearCount(nextGame,ITEM_ID)!==beforeCount-REQUIRED_SPEARS)
      throw new Error('Exactly 15 broken goblin spears must be consumed');
    const flags=adapters.readQuestFlags(nextGame);
    if(flags?.questCompleted!==true || flags?.spearDropsDisabled!==true ||
       flags?.nightTrainingUnlocked!==true)
      throw new Error('All three permanent handover flags must be set together');
    return {nextGameState:nextGame,
      nextQuestState:{version:1,phase:PHASE.COMPLETE,sceneShown:true,
        questCompleted:true,spearDropsDisabled:true,nightTrainingUnlocked:true},
      change};
  }
  host.SUSLIK2ForemanSpears=Object.freeze({
    ITEM_ID,REQUIRED_SPEARS,SCENE_ID,PHASE,initialState,restoreState,
    canOffer,openHandover,isHandoverScene,isTrainingUnlocked,
    areSpearDropsDisabled,confirmHandover
  });
})(globalThis);
