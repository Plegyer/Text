/* SUSLIK 2: free street sleep, host-independent night choice.
 * Must be invoked by the real sleep host; never advances dates by itself.
 * License and text remain under project policy.
 */
(function(root) {
  'use strict';
  const KEY = 'streetSleep';
  const GROOMING_MINIMUM = 1; // Canonical rule: stat minimum is always exactly 1.
  function integer(v) { return Number.isInteger(v) && v >= 0; }
  function prepare(options) {
    if (!options || typeof options !== 'object') throw Error('street sleep: options required');
    const {nightId, energyMax, groomingCurrent, committedNightIds} = options;
    if (typeof nightId !== 'string' || !nightId.trim()) throw Error('street sleep: nightId required');
    if (!integer(energyMax) || energyMax < 1) throw Error('street sleep: invalid maximum energy');
    if (!integer(groomingCurrent) || groomingCurrent < GROOMING_MINIMUM) {
      throw Error('street sleep: grooming must be an integer at least 1');
    }
    if (!Array.isArray(committedNightIds)) throw Error('street sleep: night ledger required');
    if (committedNightIds.includes(nightId)) return {kind: 'already-committed', nightId};
    const groomingOnWake = Math.max(GROOMING_MINIMUM, groomingCurrent - 1);
    // Spend 0 gold and set next-day energy to max(0, normal current maximum - 1).
    // The current max is preserved for other sleep types and later nights.
    return Object.freeze({
      kind: KEY,
      nightId,
      goldCost: 0,
      energyOnWake: Math.max(0, energyMax - 1),
      energyMaximumUnchanged: energyMax,
      groomingOnWake,
      groomingDelta: groomingOnWake - groomingCurrent,
      groomingMinimum: GROOMING_MINIMUM,
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
    // rollover & HP/mana refill, set waking energyOnWake and groomingOnWake,
    // respect the fixed minimum 1, persist the nightId,
    // and return a saved scene. Retrying same night must return its prior scene.
    return callbacks.commitNormalNight({
      nightId: transition.nightId,
      sleepKind: KEY,
      goldCost: 0,
      energyOnWake: transition.energyOnWake,
      groomingOnWake: transition.groomingOnWake,
      groomingDelta: transition.groomingDelta,
      groomingMinimum: transition.groomingMinimum,
      sceneId: 'street-sleep-result',
      musicMode: 'normal-sleep',
      secretBranchHook: 'slave',
    });
  }
  root.SuslikStreetSleep = Object.freeze({prepare, commit});
})(typeof window !== 'undefined' ? window : globalThis);
