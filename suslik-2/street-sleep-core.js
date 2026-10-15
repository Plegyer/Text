/* SUSLIK 2: free street sleep, host-independent night choice.
 * Must be invoked by the real sleep host; never advances dates by itself.
 * License and text remain under project policy.
 */
(function(root) {
  'use strict';
  const KEY = 'streetSleep';
  function integer(v) { return Number.isInteger(v) && v >= 0; }
  function prepare(options) {
    if (!options || typeof options !== 'object') throw Error('street sleep: options required');
    const {nightId, energyMax, committedNightIds} = options;
    if (typeof nightId !== 'string' || !nightId.trim()) throw Error('street sleep: nightId required');
    if (!integer(energyMax) || energyMax < 1) throw Error('street sleep: invalid maximum energy');
    if (!Array.isArray(committedNightIds)) throw Error('street sleep: night ledger required');
    if (committedNightIds.includes(nightId)) return {kind: 'already-committed', nightId};
    // Spend 0 gold and set next-day energy to max(0, normal current maximum - 1).
    // The current max is preserved for other sleep types and later nights.
    return Object.freeze({
      kind: KEY,
      nightId,
      goldCost: 0,
      energyOnWake: Math.max(0, energyMax - 1),
      energyMaximumUnchanged: energyMax,
      returnScreen: 'map',
      wakeButton: 'Проснуться',
      musicMode: 'normal-sleep',
      secretBranchHook: 'slave', // reserved only: no quest or flag is activated here.
    });
  }
  function commit(transition, callbacks) {
    if (!transition || transition.kind !== KEY) throw Error('street sleep: invalid transition');
    if (!callbacks || typeof callbacks.commitNormalNight !== 'function') {
      throw Error('street sleep: requires real host atomic night-commit callback');
    }
    // The host must atomically: verify nightId unused, run its usual night/day
    // rollover & HP/mana refill, set waking energyOnWake, persist the nightId,
    // and return a saved scene. Retrying same night must return its prior scene.
    return callbacks.commitNormalNight({
      nightId: transition.nightId,
      sleepKind: KEY,
      goldCost: 0,
      energyOnWake: transition.energyOnWake,
      sceneId: 'street-sleep-result',
      musicMode: 'normal-sleep',
      secretBranchHook: 'slave',
    });
  }
  root.SuslikStreetSleep = Object.freeze({prepare, commit});
})(typeof window !== 'undefined' ? window : globalThis);
