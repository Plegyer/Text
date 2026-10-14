/* Adapter boundaries for the currently unpublished portable sawmill.
   All transactions must use the real host save/inventory/music/night routines. */
(function (host) {
  'use strict';
  function create(bindings) {
    const core=host.SUSLIK2ForemanSpears;
    if(!core) throw new Error('Load foreman-spears-core.js first');
    for(const name of ['readSnapshot','commitSnapshot','readEvidence',
      'readSpearCount','applyApprovedHandover','readQuestFlags']) {
      if(typeof bindings?.[name]!=='function')
        throw new TypeError('Missing live sawmill binding: '+name);
    }
    let busy=false;
    const exclusive=fn=>{
      if(busy) throw new Error('Handover transaction already running');
      busy=true;
      try{return fn();}finally{busy=false;}
    };
    function read() {
      const snapshot=bindings.readSnapshot();
      if(!snapshot || typeof snapshot!=='object' || !snapshot.game)
        throw new TypeError('Single game + quest snapshot required');
      return {game:snapshot.game,quest:core.restoreState(snapshot.quest)};
    }
    function save(game,quest) {
      if(bindings.commitSnapshot({game,quest})!==true)
        throw new Error('Atomic handover save failed');
    }
    function availability() {
      const {game,quest}=read();
      const evidence=bindings.readEvidence(game);
      return {quest,evidence,canTalk:core.canOffer(quest,evidence)};
    }
    function talk() {
      return exclusive(()=>{
        const {game,quest}=read();
        const next=core.openHandover(quest,bindings.readEvidence(game));
        if(!next) return false;
        save(game,next); // persist sceneShown before showing the authored art
        return true;
      });
    }
    function isSceneOpen(){return core.isHandoverScene(read().quest);}
    /* This is called from the scene's single 'Далее' button.
       If save fails, scene and inventory stay unchanged and can be retried. */
    function next() {
      return exclusive(()=>{
        const {game,quest}=read();
        const settlement=core.confirmHandover(quest,game,bindings);
        if(!settlement) return false;
        save(settlement.nextGameState,settlement.nextQuestState);
        return true; // host then shows normal sawmill work screen
      });
    }
    function nightTrainingUnlocked() {
      const {quest}=read();return core.isTrainingUnlocked(quest);
    }
    function spearDropsDisabled() {
      const {quest}=read();return core.areSpearDropsDisabled(quest);
    }
    return Object.freeze({availability,talk,isSceneOpen,next,nightTrainingUnlocked,spearDropsDisabled});
  }
  host.SUSLIK2ForemanSpearsBridge=Object.freeze({create});
})(globalThis);
