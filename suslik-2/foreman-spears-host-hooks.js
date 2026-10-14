/* SUSLIK 2: optional host-specific wiring, never a replacement for sawmill.
   All host functions operate on the REAL game save and scene lifecycle.
   Does not call fetch, audio, time, or a new save storage API. */
(function (host) {
  'use strict';
  function create(bindings) {
    if (!host.SUSLIK2ForemanSpearsBridge || !host.SUSLIK2ForemanSpearsUI)
      throw new Error('Load foreman-spears core, UI and bridge first');
    for (const key of ['showExistingSawmillWork', 'showHandoverScene']) {
      if (typeof bindings?.[key] !== 'function')
        throw new TypeError('Real sawmill callback required: '+key);
    }
    const bridge=host.SUSLIK2ForemanSpearsBridge.create(bindings);
    const ui=host.SUSLIK2ForemanSpearsUI;
    function initializeExistingSave() {
      // Call before rendering after save load. False means no migration needed.
      return bridge.migrateLegacySave();
    }
    function resumePendingHandover(root, opts={}) {
      if(!bridge.isSceneOpen()) return false;
      // This scene inherits the CURRENT sawmill soundtrack. No music switch.
      ui.renderHandover(root,bridge.questState(),()=>{
        if(bridge.next()===true) bindings.showExistingSawmillWork();
      },opts);
      return true;
    }
    function mountSawmillButton(container,opts={}) {
      // Called ONLY by the normal sawmill work screen, not other scenes.
      if(bridge.isSceneOpen()) return null;
      const {quest,evidence}=bridge.availability();
      return ui.addTalkButton(container,quest,evidence,()=>{
        if(bridge.talk()===true) bindings.showHandoverScene();
      },opts);
    }
    function mountHomeNightTraining(container,onApprovedTraining,opts={}) {
      // No approved scenario/handler => do not add a nonfunctional button.
      if(typeof onApprovedTraining!=='function') return null;
      return ui.addNightTrainingButton(container,bridge.questState(),onApprovedTraining,opts);
    }
    function getCombatRewardOptions() {
      // Merge this into the REAL victory settlement's existing options.
      return Object.freeze({spearDropsDisabled:bridge.spearDropsDisabled()});
    }
    return Object.freeze({bridge,initializeExistingSave,resumePendingHandover,
      mountSawmillButton,mountHomeNightTraining,getCombatRewardOptions});
  }
  host.SUSLIK2ForemanSpearsHostHooks=Object.freeze({create});
})(globalThis);
