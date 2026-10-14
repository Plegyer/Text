/* Transaction boundary: uses actual full-run save, approved caps/maxima and
   the existing night-completion routine. No second time system or save key. */
(function (host) {
'use strict';
function create(bindings){
  const core=host.SUSLIK2ForemanNightTraining;
  const questCore=host.SUSLIK2ForemanSpears;
  if(!core||!questCore)throw new Error('Load quest and night training cores first');
  for(const name of ['readSnapshot','commitSnapshot','readQuestFlags',
      'isExistingNightScreen','readExistingNightId','readStats','readStatCaps',
      'applyTrainingStats','completeExistingNight','verifyExistingNight',
      'readResourceMaxima','applyFullRecovery','readResources']){
    if(typeof bindings?.[name]!=='function')
      throw new TypeError('Missing real night host binding: '+name);
  }
  let busy=false;
  function exclusive(fn){
    if(busy)throw new Error('Training transaction already in progress');
    busy=true;
    try{return fn();}finally{busy=false;}
  }
  function read(){
    const snapshot=bindings.readSnapshot();
    if(!snapshot||typeof snapshot!=='object'||!snapshot.game||
       (typeof snapshot.revision!=='string'&&!Number.isSafeInteger(snapshot.revision)))
      throw new TypeError('Real game, quest, training and save revision required');
    const flags=bindings.readQuestFlags(snapshot.game);
    return {snapshot,game:snapshot.game,
      quest:questCore.restoreState(snapshot.quest,flags),
      training:core.restoreState(snapshot.training)};
  }
  function commit(oldSnapshot,game,training){
    // Existing host must atomically compare old revision (CAS). A rejected
    // concurrent save MUST NOT apply the reward or advance the UI.
    const result=bindings.commitSnapshot({
      game,quest:oldSnapshot.quest,training
    },oldSnapshot.revision);
    if(result!==true)throw new Error('Atomic night save failed / stale revision');
  }
  function eligible(){
    const {game,quest,training}=read();
    const onNight=bindings.isExistingNightScreen(game)===true;
    const id=onNight?bindings.readExistingNightId(game):null;
    return core.canTrain(training,questCore.isTrainingUnlocked(quest),id,onNight);
  }
  function presentation(){return read().training.presentation;}
  function start(mediaContent=host.SUSLIK2ForemanNightTrainingContent,rng=Math.random){
    return exclusive(()=>{
      const {snapshot,game,quest,training}=read();
      const onNight=bindings.isExistingNightScreen(game)===true;
      const nightId=onNight?bindings.readExistingNightId(game):null;
      if(!core.canTrain(training,questCore.isTrainingUnlocked(quest),nightId,onNight))
        return null;
      const before=bindings.readStats(game);
      const desired=core.boostedStats(before,bindings.readStatCaps(game));
      const afterStats=bindings.applyTrainingStats(game,desired);
      if(!afterStats||typeof afterStats!=='object'||afterStats===game)
        throw new TypeError('Approved stat adapter must return a NEW game state');
      const updated=bindings.readStats(afterStats);
      if(updated.strength!==desired.strength||updated.endurance!==desired.endurance)
        throw new Error('Training stat update did not match approved caps');
      const receipt=Object.freeze({
        id:'foreman-training:'+nightId,nightId,type:'foreman-training'
      });
      // This is the REAL host night-ending flow: same seasons/year/day rules.
      const afterNight=bindings.completeExistingNight(afterStats,receipt);
      if(!afterNight||typeof afterNight!=='object'||afterNight===afterStats)
        throw new TypeError('Existing night must return a NEW game state');
      if(bindings.verifyExistingNight(afterStats,afterNight,receipt)!==true)
        throw new Error('Existing night completion not verified');
      const maxima=bindings.readResourceMaxima(afterNight);
      if(!maxima||typeof maxima!=='object')throw new TypeError('Live resource maxima required');
      for(const resource of ['hp','mana','energy'])
        if(!Number.isFinite(maxima[resource])||maxima[resource]<0)
          throw new RangeError('Invalid live '+resource+' maximum');
      if(maxima.hp!==10*bindings.readStats(afterNight).endurance)
        throw new Error('Existing HP maximum must equal 10 × Endurance');
      const recovered=bindings.applyFullRecovery(afterNight,Object.freeze({
        hp:maxima.hp,mana:maxima.mana,energy:maxima.energy
      }));
      if(!recovered||typeof recovered!=='object'||recovered===afterNight)
        throw new TypeError('Recovery adapter must return a NEW state');
      const resources=bindings.readResources(recovered);
      for(const resource of ['hp','mana','energy'])
        if(resources?.[resource]!==maxima[resource])
          throw new Error('Full training resource restoration failed: '+resource);
      const mediaIds=core.mediaChoices(mediaContent.mediaSlots,rng);
      const nextTraining=core.completedState(training,nightId,mediaIds);
      commit(snapshot,recovered,nextTraining);
      return nextTraining.presentation;
    });
  }
  function finishPresentation(){
    return exclusive(()=>{
      const {snapshot,game,training}=read();
      const next=core.acknowledgePresentation(training);
      if(!next)return false;
      commit(snapshot,game,next); // Only UI navigation remains after persistence.
      return true;
    });
  }
  return Object.freeze({eligible,presentation,start,finishPresentation});
}
host.SUSLIK2ForemanNightTrainingBridge=Object.freeze({create});
})(globalThis);
