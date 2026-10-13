/* SUSLIK 2: approved combat NUMERIC CONTRACT, not a combat engine.
   Specification: suslik-2/combat-logic-v1 : suslik-2/COMBAT_LOGIC.md.
   Classic script for portable file:// builds; no events, battle outcome or RNG here. */
(function (host) {
  'use strict';
  const FIRST_GOBLIN = Object.freeze({
    id: 'first-goblin', maxHp: 36, physicalDamage: 60,
    dexterity: 1, accuracy: 20
  });
  const RULES_SOURCE = 'suslik-2/combat-logic-v1:suslik-2/COMBAT_LOGIC.md';
  function nonNegative(value, field) {
    if (!Number.isFinite(value) || value < 0) throw new RangeError(field + ' must be non-negative');
    return value;
  }
  function positive(value, field) {
    if (!Number.isFinite(value) || value <= 0) throw new RangeError(field + ' must be positive');
    return value;
  }
  function maxHp(endurance) {
    return positive(endurance, 'endurance') * 10;
  }
  function dodgeChancePercent(defenderDexterity, attackerAccuracy) {
    return Math.max(0, Math.min(100, 1.25 * (
      nonNegative(defenderDexterity, 'defenderDexterity') -
      nonNegative(attackerAccuracy, 'attackerAccuracy'))));
  }
  /* Undefined tie cases are explicitly left unresolved. */
  function initiative(heroDexterity, enemyDexterity, action, enemyId) {
    nonNegative(heroDexterity, 'heroDexterity');
    nonNegative(enemyDexterity, 'enemyDexterity');
    if (action === 'magic') return 'enemy'; // spellcasting always second
    if (action !== 'physical') throw new RangeError('unapproved combat action');
    if (heroDexterity > enemyDexterity) return 'hero';
    if (heroDexterity < enemyDexterity) return 'enemy';
    return enemyId === FIRST_GOBLIN.id ? 'hero' : null;
  }
  function physicalDamage(strength) {return nonNegative(strength, 'strength');}
  /* Existing game/engine MUST supply maxMana; its formula is not approved here. */
  function restoredAfterNight(heroResources) {
    if (!heroResources || typeof heroResources !== 'object') throw new TypeError('hero resources required');
    nonNegative(heroResources.maxMana, 'maxMana');
    return {...heroResources,
      hp: maxHp(heroResources.endurance), mana: heroResources.maxMana};
  }
  /* Descriptor only. The missing universal engine owns attacks, misses,
     persistent resource writes and yet-to-be-approved win/loss consequences. */
  function prepareFirstGoblinEncounter(attemptId, heroResources) {
    if (typeof attemptId !== 'string' || !/^far-forest-[1-9][0-9]*$/.test(attemptId))
      throw new TypeError('persisted far-forest attempt ID required');
    if (!heroResources || typeof heroResources !== 'object') throw new TypeError('hero resources required');
    for (const key of ['strength', 'endurance', 'dexterity', 'hp', 'mana', 'maxMana'])
      nonNegative(heroResources[key], key);
    maxHp(heroResources.endurance);
    if (heroResources.hp > maxHp(heroResources.endurance) || heroResources.mana > heroResources.maxMana)
      throw new RangeError('combat resource exceeds its existing maximum');
    return Object.freeze({
      source: 'far-forest', attemptId, rulesSource: RULES_SOURCE,
      enemy: FIRST_GOBLIN, hero: Object.freeze({...heroResources}),
      pendingScene: 'far-forest-fight-pending',
      unresolvedRules: Object.freeze(['hero-attack-accuracy', 'battle-win-loss-consequences'])
    });
  }
  host.SUSLIK2CombatContract = Object.freeze({
    FIRST_GOBLIN, RULES_SOURCE, maxHp, dodgeChancePercent,
    initiative, physicalDamage, restoredAfterNight, prepareFirstGoblinEncounter
  });
})(globalThis);
