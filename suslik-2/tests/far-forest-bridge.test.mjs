import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';

const dir = new URL('../', import.meta.url);
const names = ['far-forest-core.js', 'combat-contract.js', 'far-forest-bridge.js'];
const scripts = await Promise.all(names.map(n => readFile(new URL(n, dir), 'utf8')));
const ctx = {Math, console};
ctx.globalThis = ctx;
scripts.forEach((s, i) => runInNewContext(s, ctx, {filename:names[i]}));
const forest = ctx.SUSLIK2FarForest;
const combat = ctx.SUSLIK2CombatContract;
const plain = x => JSON.parse(JSON.stringify(x));
function setup(paidShifts = 15) {
  let saved = {game: {
    paidShifts, strength: 15, endurance: 15, dexterity: 1,
    energy: 9, gold: 20, wage: 7, seasonChanges: 0,
    foremanConversationCompleted: false, pendingEvent50: false,
    hp: 90, mana: 2, maxMana: 3
  }, farForest: forest.initialState()};
  let commits = 0, permitSave = true, calculations = 0, permitWork = true;
  let eventsValid = true, settlementValid = true;
  const adapters = {
    readSnapshot: () => plain(saved),
    commitSnapshot: next => {
      if (!permitSave) return false;
      saved = plain(next);
      commits++;
      return true;
    },
    readForemanEvidence: game => ({
      paidShifts: game.paidShifts,
      strength: game.strength, endurance: game.endurance,
      foremanConversationCompleted: game.foremanConversationCompleted
    }),
    readPaidShiftCount: game => game.paidShifts,
    canAttemptUsingExistingRules: () => permitWork,
    calculateApprovedShift: (game, receipt) => {
      calculations++;
      return {...game, energy:game.energy - receipt.energyCost,
        gold:game.gold + game.wage + receipt.extraGold,
        paidShifts:game.paidShifts + 1, seasonChanges:game.seasonChanges + 1,
        pendingEvent50:game.pendingEvent50 || game.paidShifts + 1 === 50};
    },
    verifyApprovedShift: (before, after, receipt) => settlementValid &&
      after.energy === before.energy - 1 &&
      after.gold === before.gold + before.wage + 10 &&
      after.seasonChanges === before.seasonChanges + 1 &&
      receipt.standardSeasonalStats && receipt.standardSawmillWage,
    verifyMandatoryEventFlow: (before, after) => eventsValid &&
      (after.paidShifts !== 50 || after.pendingEvent50 === true),
    readHeroCombatState: game => ({
      strength:game.strength, endurance:game.endurance, dexterity:game.dexterity,
      hp:game.hp, mana:game.mana, maxMana:game.maxMana
    }),
    applyRestoredCombatResources: (game, resources) => ({...game, hp:resources.hp, mana:resources.mana})
  };
  const bridge = ctx.SUSLIK2FarForestBridge.create(adapters);
  const grant = () => {
    saved.game.foremanConversationCompleted = true;
    assert.equal(bridge.afterForemanConversation(), true);
  };
  return {bridge,adapters,grant,read:()=>plain(saved),
    commits:()=>commits,calculations:()=>calculations,
    setSaving:v=>{permitSave=v;},
    setWork:v=>{permitWork=v;},
    setEvents:v=>{eventsValid=v;},
    setSettlement:v=>{settlementValid=v;}};
}
test('only actually completed 15+ paid shift foreman event unlocks',()=>{
  const app = setup();
  assert.equal(app.bridge.canDisplayAccessButton(), false);
  assert.equal(app.bridge.afterForemanConversation(), false);
  assert.equal(app.commits(),0);
  app.grant();
  assert.equal(app.bridge.canDisplayAccessButton(),true);
  const low = setup(14);
  low.grant = undefined;
  assert.equal(low.bridge.afterForemanConversation(),false);
});
test('actual sawmill work guard blocks rolls without consuming random numbers',()=>{
  const app = setup();app.grant();app.setWork(false);
  let draws = 0;
  assert.equal(app.bridge.beginAttempt(()=>{draws++;return 0;}),null);
  assert.equal(draws,0);
  assert.equal(app.read().farForest.currentAttempt,null);
});
test('ordinary attempt roll is persisted before calculation, paid exactly once',()=>{
  const app = setup();app.grant();
  let draws=0;
  const a=app.bridge.beginAttempt(()=>{draws++;return .2;});
  assert.equal(a.attempt.outcome,'ordinary');
  assert.equal(draws,1);
  assert.equal(app.read().game.paidShifts,15);
  assert.equal(app.read().farForest.currentAttempt.settled,false);
  const result=app.bridge.settlePendingOrdinary();
  assert.equal(result.paidShifts,16);
  assert.equal(result.receipt.extraGold,10);
  assert.equal(app.read().game.gold,37);
  assert.equal(app.read().game.energy,8);
  assert.equal(app.read().game.seasonChanges,1);
  assert.equal(app.read().farForest.currentAttempt.settled,true);
  assert.equal(app.bridge.settlePendingOrdinary(),null);
  assert.equal(app.calculations(),1);
});
test('failed calculation keeps SAME pending receipt; no reroll or double payout',()=>{
  const app=setup();app.grant();
  app.bridge.beginAttempt(()=>0);
  app.setSettlement(false);
  assert.throws(()=>app.bridge.settlePendingOrdinary(),/not verified/);
  assert.equal(app.read().game.gold,20);
  assert.equal(app.read().farForest.currentAttempt.id,'far-forest-1');
  assert.equal(app.bridge.beginAttempt(()=>{throw Error('must not reroll');}),null);
  app.setSettlement(true);
  app.bridge.settlePendingOrdinary();
  assert.equal(app.read().game.gold,37);
  assert.equal(app.bridge.settlePendingOrdinary(),null);
});
test('atomic save failure cannot advance ordinary shift or meta state',()=>{
  const app=setup();app.grant();
  app.bridge.beginAttempt(()=>0);
  app.setSaving(false);
  assert.throws(()=>app.bridge.settlePendingOrdinary(),/Atomic save failed/);
  assert.equal(app.read().game.paidShifts,15);
  assert.equal(app.read().farForest.currentAttempt.settled,false);
  app.setSaving(true);
  app.bridge.settlePendingOrdinary();
  assert.equal(app.read().game.paidShifts,16);
});
test('mandatory shift 50 must stay in approved sawmill event queue',()=>{
  const app=setup(49);app.grant();
  app.bridge.beginAttempt(()=>0);
  app.bridge.settlePendingOrdinary();
  assert.equal(app.read().game.paidShifts,50);
  assert.equal(app.read().game.pendingEvent50,true);
  assert.equal(app.read().farForest.currentAttempt.settled,true);
});
test('mandatory event verifier failure stops settlement before atomic commit',()=>{
  const app=setup(49);app.grant();app.bridge.beginAttempt(()=>0);
  app.setEvents(false);
  assert.throws(()=>app.bridge.settlePendingOrdinary(),/mandatory 15\/50|event flow/);
  assert.equal(app.read().game.paidShifts,49);
  assert.equal(app.read().farForest.currentAttempt.settled,false);
});
test('continue is a distinct roll, and goblin never pays or drains energy',()=>{
  const app=setup();app.grant();app.bridge.beginAttempt(()=>0);app.bridge.settlePendingOrdinary();
  let draws=0;
  const next=app.bridge.beginAttempt(()=>{draws++;return .5;});
  assert.equal(draws,1);
  assert.equal(next.attempt.outcome,'goblin');
  assert.equal(app.read().game.paidShifts,16);
  const prior=plain(app.read().game);
  assert.equal(app.bridge.chooseGoblin('permission'),'far-forest-permission-pending');
  assert.deepEqual(app.read().game,prior);
  assert.equal(app.bridge.chooseGoblin('fight'),null);
});
test('fight choice creates contract, but no invented battle without real engine',()=>{
  const app=setup();app.grant();app.bridge.beginAttempt(()=>.75);
  assert.equal(app.bridge.chooseGoblin('fight'),'far-forest-fight-pending');
  assert.equal(app.bridge.enterUniversalCombatIfAvailable(),null);
  const request=plain(app.bridge.pendingFightRequest());
  assert.equal(request.enemy.maxHp,36);
  assert.equal(request.enemy.physicalDamage,60);
  assert.equal(request.enemy.accuracy,20);
  assert.equal(request.hero.hp,90);
  assert.equal(request.rulesSource,'suslik-2/combat-logic-v1:suslik-2/COMBAT_LOGIC.md');
  assert.equal(app.read().game.energy,9);
  assert.equal(app.read().game.gold,20);
  let calls=0;
  app.adapters.enterUniversalCombat=(details)=>{calls++;return details.attemptId;};
  assert.equal(app.bridge.enterUniversalCombatIfAvailable(),'far-forest-1');
  assert.equal(calls,1);
});
test('approved dodge/initiative/HP scale to 200; unapproved tie left unresolved',()=>{
  assert.equal(combat.maxHp(15),150);
  assert.equal(combat.maxHp(200),2000);
  assert.equal(combat.physicalDamage(50),50);
  assert.equal(combat.dodgeChancePercent(100,20),100);
  assert.equal(combat.dodgeChancePercent(100,60),50);
  assert.equal(combat.dodgeChancePercent(1,60),0);
  assert.equal(combat.initiative(1,1,'physical','first-goblin'),'hero');
  assert.equal(combat.initiative(1,1,'physical','other-enemy'),null);
  assert.equal(combat.initiative(200,1,'magic','first-goblin'),'enemy');
});
test('night restores only HP/mana from provided maxMana; energy unchanged',()=>{
  const app=setup();app.grant();
  const resources=plain(app.bridge.afterExistingNightEvent());
  assert.equal(resources.hp,150);
  assert.equal(resources.mana,3);
  assert.equal(app.read().game.hp,150);
  assert.equal(app.read().game.mana,3);
  assert.equal(app.read().game.energy,9);
  assert.equal(app.read().game.paidShifts,15);
});
test('file://-compatible classic scripts with no invented battle loop',()=>{
  for(const script of scripts) {
    assert.doesNotMatch(script,/\bfetch\s*\(|\bXMLHttpRequest\b|\bimport\s*\(|\blocalStorage\b/);
    assert.match(script,/globalThis/);
  }
  assert.doesNotMatch(scripts[1],/Math\.random\s*\(/);
});
