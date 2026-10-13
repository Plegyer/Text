/* SUSLIK 2 — isolated far-forest domain model. Plain script: safe on file://.
   The real sawmill must provide its approved wage, seasonal stat and energy logic. */
(function (host) {
  'use strict';
  const SCENES = Object.freeze({
    WORK: 'far-forest-work',
    ORDINARY: 'far-forest-ordinary-shift',
    GOBLIN: 'far-forest-goblin-encounter',
    PERMISSION_PENDING: 'far-forest-permission-pending',
    FIGHT_PENDING: 'far-forest-fight-pending'
  });
  const OUTCOMES = Object.freeze({ORDINARY: 'ordinary', GOBLIN: 'goblin'});
  const REQUIRED = Object.freeze({paidShifts: 15, strength: 15, endurance: 15});
  const RECEIPT = Object.freeze({energyCost: 1, extraGold: 10, paidShift: true,
    standardSeasonalStats: true, standardSawmillWage: true});
  const integer = n => Number.isSafeInteger(n) && n >= 0;

  function initialState() {
    return {version: 1, accessUnlocked: false, nextAttemptNumber: 1,
      currentAttempt: null, sceneId: SCENES.WORK};
  }
  function restoreState(raw) {
    const fresh = initialState();
    if (!raw || raw.version !== 1 || typeof raw !== 'object') return fresh;
    fresh.accessUnlocked = raw.accessUnlocked === true;
    if (integer(raw.nextAttemptNumber) && raw.nextAttemptNumber > 0) fresh.nextAttemptNumber = raw.nextAttemptNumber;
    const a = raw.currentAttempt;
    if (a && typeof a === 'object' && typeof a.id === 'string' &&
        /^(far-forest-)([1-9][0-9]*)$/.test(a.id) &&
        [OUTCOMES.ORDINARY, OUTCOMES.GOBLIN].includes(a.outcome) &&
        a.id === `far-forest-${fresh.nextAttemptNumber - 1}`) {
      fresh.currentAttempt = {id: a.id, outcome: a.outcome,
        settled: a.outcome === OUTCOMES.ORDINARY && a.settled === true,
        choice: a.outcome === OUTCOMES.GOBLIN &&
          ['permission', 'fight'].includes(a.choice) ? a.choice : null};
      fresh.sceneId = fresh.currentAttempt.outcome === OUTCOMES.ORDINARY ? SCENES.ORDINARY :
        fresh.currentAttempt.choice === 'permission' ? SCENES.PERMISSION_PENDING :
        fresh.currentAttempt.choice === 'fight' ? SCENES.FIGHT_PENDING : SCENES.GOBLIN;
    }
    return fresh;
  }
  function meetsForemanConditions(evidence) {
    return !!evidence && integer(evidence.paidShifts) && evidence.paidShifts >= REQUIRED.paidShifts &&
      Number.isFinite(evidence.strength) && evidence.strength >= REQUIRED.strength &&
      Number.isFinite(evidence.endurance) && evidence.endurance >= REQUIRED.endurance &&
      evidence.foremanConversationCompleted === true;
  }
  /* Invoke only from the completed mandatory foreman conversation callback. */
  function unlockAfterForeman(state, evidence) {
    if (!state || !meetsForemanConditions(evidence)) return false;
    state.accessUnlocked = true; // permanent for the active run once the dialogue has happened
    return true;
  }
  function isAvailable(state) {return state?.accessUnlocked === true;}

  function rollOutcome(rng = Math.random) {
    if (typeof rng !== 'function') throw new TypeError('random source must be a function');
    const value = rng(); // exactly one fresh draw per attempt, no cumulative odds
    if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value >= 1)
      throw new RangeError('random source must return a value in [0, 1)');
    return value < 0.5 ? OUTCOMES.ORDINARY : OUTCOMES.GOBLIN;
  }
  function beginAttempt(state, rng = Math.random) {
    if (!isAvailable(state)) return null;
    const previous = state.currentAttempt;
    if (previous && (!previous.settled || previous.outcome !== OUTCOMES.ORDINARY)) return null;
    if (!integer(state.nextAttemptNumber) || state.nextAttemptNumber < 1 ||
        !Number.isSafeInteger(state.nextAttemptNumber + 1)) throw new RangeError('attempt counter overflow');
    const outcome = rollOutcome(rng);
    const attempt = {id: `far-forest-${state.nextAttemptNumber}`, outcome, settled: false, choice: null};
    state.nextAttemptNumber += 1;
    state.currentAttempt = attempt;
    state.sceneId = outcome === OUTCOMES.ORDINARY ? SCENES.ORDINARY : SCENES.GOBLIN;
    return {...attempt};
  }
  function getOrdinaryReceipt(state) {
    const a = state?.currentAttempt;
    if (!a || a.outcome !== OUTCOMES.ORDINARY || a.settled) return null;
    return Object.freeze({...RECEIPT, attemptId: a.id});
  }
  /* Adapter must be PURE and return a new game state applying the existing standard
     seasonal wages/stats and exactly -1 energy, then +10 gold. The caller must
     commit BOTH returned states together to its existing save. Never use this
     callback for external payments or side effects. */
  function settleOrdinaryShift(farForestState, gameState, calculateApprovedShift) {
    const receipt = getOrdinaryReceipt(farForestState);
    if (!receipt) return null;
    if (typeof calculateApprovedShift !== 'function') throw new TypeError('approved shift adapter required');
    const nextGameState = calculateApprovedShift(gameState, receipt);
    if (!nextGameState || typeof nextGameState !== 'object' || nextGameState === gameState)
      throw new TypeError('approved shift adapter must return a NEW game-state object');
    const nextFarForestState = restoreState(farForestState);
    nextFarForestState.currentAttempt.settled = true;
    return {receipt, nextGameState, nextFarForestState};
  }
  /* Different destinations, deliberately NO energy/stat/money/time consequences. */
  function chooseGoblinPath(state, choice) {
    const attempt = state?.currentAttempt;
    if (!attempt || attempt.outcome !== OUTCOMES.GOBLIN || attempt.choice !== null) return null;
    if (choice !== 'permission' && choice !== 'fight') return null;
    attempt.choice = choice;
    state.sceneId = choice === 'permission' ? SCENES.PERMISSION_PENDING : SCENES.FIGHT_PENDING;
    return state.sceneId;
  }
  host.SUSLIK2FarForest = Object.freeze({
    SCENES, OUTCOMES, REQUIRED, RECEIPT, initialState, restoreState,
    meetsForemanConditions, unlockAfterForeman, isAvailable, rollOutcome,
    beginAttempt, getOrdinaryReceipt, settleOrdinaryShift, chooseGoblinPath
  });
})(globalThis);
