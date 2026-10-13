/* SUSLIK 2 — portable integration boundary for an UNPUBLISHED real sawmill
   and an UNIMPLEMENTED universal combat engine. No speculative rules. */
(function (host) {
  'use strict';
  function create(bindings) {
    const core = host.SUSLIK2FarForest;
    if (!core) throw new Error('Load far-forest-core.js first');
    for (const name of [
      'readSnapshot', 'commitSnapshot', 'readForemanEvidence',
      'readPaidShiftCount', 'canAttemptUsingExistingRules', 'calculateApprovedShift',
      'verifyApprovedShift', 'verifyMandatoryEventFlow'
    ]) {
      if (typeof bindings?.[name] !== 'function')
        throw new TypeError('Missing actual sawmill binding: ' + name);
    }
    let busy = false;
    const withGuard = action => {
      if (busy) throw new Error('A far-forest transaction is already running');
      busy = true;
      try {return action();} finally {busy = false;}
    };
    function read() {
      const snapshot = bindings.readSnapshot();
      if (!snapshot || typeof snapshot !== 'object' || !snapshot.game)
        throw new TypeError('readSnapshot must return current game and farForest from one save');
      return {game: snapshot.game, farForest: core.restoreState(snapshot.farForest)};
    }
    function commit(game, farForest) {
      /* The host must persist both in ONE atomic save, not separate writes.
         A false result never advances the UI. Async promises are rejected. */
      const result = bindings.commitSnapshot({game, farForest});
      if (result !== true)
        throw new Error('Atomic save failed: commitSnapshot must synchronously return true');
    }
    function paid(game) {
      const n = bindings.readPaidShiftCount(game);
      if (!Number.isSafeInteger(n) || n < 0)
        throw new TypeError('Paid shift count must come from real sawmill ledger');
      return n;
    }
    /* Invoke *only* from successful completion of the mandatory foreman dialog.
       The real event provides the true completion flag and live player stats. */
    function afterForemanConversation() {
      return withGuard(() => {
        const {game, farForest} = read();
        const evidence = bindings.readForemanEvidence(game);
        if (!core.meetsForemanConditions(evidence)) return false;
        if (evidence.paidShifts !== paid(game)) throw new Error('Foreman ledger mismatch');
        if (!core.unlockAfterForeman(farForest, evidence)) return false;
        commit(game, farForest);
        return true;
      });
    }
    function canDisplayAccessButton() {return core.isAvailable(read().farForest);}
    /* FIRST commit the unique roll to the same save. If payment later fails,
       the pending ordinary attempt remains resumable, without rerolling. */
    function beginAttempt(rng) {
      return withGuard(() => {
        const {game, farForest} = read();
        if (bindings.canAttemptUsingExistingRules(game) !== true) return null;
        const attempt = core.beginAttempt(farForest, rng === undefined ? Math.random : rng);
        if (!attempt) return null;
        commit(game, farForest);
        return {attempt, sceneId: farForest.sceneId,
          needsApprovedSettlement: attempt.outcome === core.OUTCOMES.ORDINARY};
      });
    }
    function settlePendingOrdinary() {
      return withGuard(() => {
        const {game, farForest} = read();
        if (!core.getOrdinaryReceipt(farForest)) return null;
        const beforeCount = paid(game);
        const settled = core.settleOrdinaryShift(farForest, game, (before, receipt) => {
          const after = bindings.calculateApprovedShift(before, receipt);
          if (!after || typeof after !== 'object' || after === before)
            throw new TypeError('Approved sawmill calculation must return a NEW state');
          if (paid(after) !== beforeCount + 1)
            throw new Error('Ordinary far-forest attempt must increment paid shifts exactly once');
          if (bindings.verifyApprovedShift(before, after, receipt) !== true)
            throw new Error('Approved energy, seasonal stats, wage and extra +10 not verified');
          if (bindings.verifyMandatoryEventFlow(before, after, receipt) !== true)
            throw new Error('Existing mandatory 15/50-shift event flow not verified');
          return after;
        });
        if (!settled) return null;
        commit(settled.nextGameState, settled.nextFarForestState);
        /* DO NOT call the post-shift flow here. The real host must resume its
           persisted mandatory-event queue (including shift 50) BEFORE Next. */
        return {receipt: settled.receipt,
          sceneId: settled.nextFarForestState.sceneId,
          paidShifts: paid(settled.nextGameState)};
      });
    }
    /* A goblin encounter never invokes a work/energy/money transaction. */
    function chooseGoblin(choice) {
      return withGuard(() => {
        const {game, farForest} = read();
        const destination = core.chooseGoblinPath(farForest, choice);
        if (!destination) return null;
        commit(game, farForest);
        return destination;
      });
    }
    function pendingFightRequest() {
      const {game, farForest} = read();
      const a = farForest.currentAttempt;
      if (!a || a.outcome !== core.OUTCOMES.GOBLIN || a.choice !== 'fight' ||
          farForest.sceneId !== core.SCENES.FIGHT_PENDING) return null;
      if (!host.SUSLIK2CombatContract || typeof bindings.readHeroCombatState !== 'function')
        return null; // No battle engine or character resource mapping published.
      return host.SUSLIK2CombatContract.prepareFirstGoblinEncounter(
        a.id, bindings.readHeroCombatState(game));
    }
    function enterUniversalCombatIfAvailable() {
      const request = pendingFightRequest();
      if (!request || typeof bindings.enterUniversalCombat !== 'function')
        return null; // Stay in explicit fight-pending placeholder.
      /* The real combat engine must persist HP/mana across fights and own
         win/loss results. The adapter must not synthesize either result. */
      return bindings.enterUniversalCombat(request);
    }
    /* After the existing overnight event (NEVER instead of that event),
       restore only approved HP/mana; do not touch energy or calendar here.
       Integration requires real maxMana and a pure host state adapter. */
    function afterExistingNightEvent() {
      return withGuard(() => {
        if (!host.SUSLIK2CombatContract ||
            typeof bindings.readHeroCombatState !== 'function' ||
            typeof bindings.applyRestoredCombatResources !== 'function')
          throw new Error('Existing night and combat-resource adapters required');
        const {game, farForest} = read();
        const restored = host.SUSLIK2CombatContract.restoredAfterNight(
          bindings.readHeroCombatState(game));
        const nextGame = bindings.applyRestoredCombatResources(game, restored);
        if (!nextGame || nextGame === game) throw new TypeError('Night adapter must return a NEW state');
        commit(nextGame, farForest);
        return restored;
      });
    }
    return Object.freeze({afterForemanConversation, canDisplayAccessButton,
      beginAttempt, settlePendingOrdinary, chooseGoblin,
      pendingFightRequest, enterUniversalCombatIfAvailable, afterExistingNightEvent});
  }
  host.SUSLIK2FarForestBridge = Object.freeze({create});
})(globalThis);
