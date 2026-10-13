/* SUSLIK 2 ending/meta progression: no dependency on the old game. */
export const HARD_WORKER = 'hard-worker';
export const BONUS_CATALOG = Object.freeze([
  Object.freeze({ id: HARD_WORKER, endingId: HARD_WORKER, stat: 'strength', amount: 5 })
]);
export function freshRun() {
  return { sawmillShifts: 0, sawmill50EventSeen: false, endingOfferOnMap: false, bonusesApplied: false };
}
export function restoreRun(raw) {
  const run = freshRun();
  if (!raw || typeof raw !== 'object') return run;
  if (Number.isSafeInteger(raw.sawmillShifts) && raw.sawmillShifts >= 0) run.sawmillShifts = raw.sawmillShifts;
  run.sawmill50EventSeen = run.sawmillShifts >= 50 && raw.sawmill50EventSeen === true;
  run.endingOfferOnMap = run.sawmill50EventSeen && raw.endingOfferOnMap === true;
  run.bonusesApplied = raw.bonusesApplied === true;
  return run;
}
export function unlockedEndingIds(state) {
  return Array.isArray(state.meta?.unlockedEndings) ? state.meta.unlockedEndings.filter(x => x === HARD_WORKER) : [];
}
export function hasNewGamePlus(state) { return unlockedEndingIds(state).length > 0; }
export function availableBonuses(state) {
  const endings = new Set(unlockedEndingIds(state));
  return BONUS_CATALOG.filter(b => endings.has(b.endingId));
}
export function selectedBonusIds(state) {
  const available = new Set(availableBonuses(state).map(b => b.id));
  return Array.isArray(state.selectedBonuses)
    ? [...new Set(state.selectedBonuses.filter(id => available.has(id)))] : [];
}
export function toggleBonus(state, bonusId) {
  if (state.sceneId !== 'bonus-selection' || !availableBonuses(state).some(b => b.id === bonusId)) return false;
  const selected = new Set(selectedBonusIds(state));
  if (selected.has(bonusId)) selected.delete(bonusId); else selected.add(bonusId);
  state.selectedBonuses = [...selected];
  return true;
}
export function startPlusRun(state) {
  if (state.sceneId !== 'bonus-selection' || !hasNewGamePlus(state)) return false;
  const selected = new Set(selectedBonusIds(state));
  for (const bonus of availableBonuses(state)) {
    if (selected.has(bonus.id)) state.character.stats[bonus.stat] += bonus.amount;
  }
  state.run.bonusesApplied = true;
  state.sceneId = 'game-start';
  return true;
}
/* Called by the REAL sawmill after a completed shift, not by opening its map icon. */
export function recordSawmillShift(state) {
  if (state.sceneId !== 'sawmill') return false;
  state.run.sawmillShifts += 1;
  return true;
}
/* Called only after the mandatory post-50-shift event actually resolves. */
export function markSawmill50EventSeen(state) {
  if (state.sceneId !== 'sawmill' || state.run.sawmillShifts < 50) return false;
  state.run.sawmill50EventSeen = true;
  return true;
}
/* Called on exiting the sawmill back to the main game map. */
export function returnFromSawmillToMap(state) {
  if (state.sceneId !== 'sawmill') return false;
  state.run.endingOfferOnMap = state.run.sawmillShifts >= 50 && state.run.sawmill50EventSeen;
  state.sceneId = 'map';
  return true;
}
export function canOpenEndingMenu(state) {
  return state.sceneId === 'map' && state.run?.sawmillShifts >= 50
    && state.run?.sawmill50EventSeen === true && state.run?.endingOfferOnMap === true;
}
export function openEndingMenu(state) {
  if (!canOpenEndingMenu(state)) return false;
  state.sceneId = 'endings-menu';
  return true;
}
export function openHardWorkerEnding(state) {
  if (state.sceneId !== 'endings-menu' || !state.run?.endingOfferOnMap) return false;
  state.sceneId = 'hard-worker-ending';
  return true;
}
export function refuseEnding(state) {
  if (state.sceneId !== 'endings-menu') return false;
  state.sceneId = 'map';
  return true;
}
/* Permanently record the reward, but reset only the CURRENT run. */
export function finishHardWorkerEnding(state, creation, freshCharacter) {
  if (state.sceneId !== 'hard-worker-ending' || !state.run?.endingOfferOnMap) return false;
  state.meta.unlockedEndings = [...new Set([...unlockedEndingIds(state), HARD_WORKER])];
  state.meta.startedOnce = true;
  state.sceneId = 'splash';
  state.character = freshCharacter(creation);
  state.selectedBonuses = [];
  state.run = freshRun();
  return true;
}
