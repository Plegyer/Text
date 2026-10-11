/* SUSLIK 2: isolated, versioned creation state. Uses old project stat contract only. */
export const SAVE_VERSION = 2;
export const STORAGE_KEY = 'suslik2.save.v1'; // keep previous screen-only saves readable

export function freshCharacter(creation) {
  return {
    stats: Object.fromEntries(creation.stats.map(id => [id, creation.initialValue])),
    allocated: Object.fromEntries(creation.stats.map(id => [id, 0])),
    remaining: creation.allocationPoints
  };
}
export function initialState(creation, initialScene = 'splash') {
  return {
    version: SAVE_VERSION,
    sceneId: initialScene,
    character: freshCharacter(creation),
    meta: { startedOnce: false },
    settings: { locale: 'ru', soundEnabled: true, musicVolume: 100, effectsVolume: 100 }
  };
}
export function restoreState(raw, creation, validScenes, initialScene = 'splash') {
  const fresh = initialState(creation, initialScene);
  if (!raw || typeof raw !== 'object') return fresh;
  if (raw.version === 1 && validScenes.has(raw.sceneId)) {
    fresh.sceneId = raw.sceneId;
    return fresh;
  }
  if (raw.version !== SAVE_VERSION) return fresh;
  if (validScenes.has(raw.sceneId)) fresh.sceneId = raw.sceneId;
  if (raw.settings && typeof raw.settings === 'object') {
    fresh.settings.locale = raw.settings.locale === 'en' ? 'en' : 'ru';
    fresh.settings.soundEnabled = raw.settings.soundEnabled !== false;
    for (const key of ['musicVolume', 'effectsVolume']) {
      if (Number.isInteger(raw.settings[key]) && raw.settings[key] >= 0 && raw.settings[key] <= 100) {
        fresh.settings[key] = raw.settings[key];
      }
    }
  }
  fresh.meta.startedOnce = raw.meta?.startedOnce === true;
  const c = raw.character;
  if (c && typeof c === 'object' && c.stats && c.allocated) {
    const values = creation.stats.map(key => [Number(c.stats[key]), Number(c.allocated[key])]);
    const valid = values.every(([value, spent]) => Number.isSafeInteger(value) && Number.isSafeInteger(spent)
      && spent >= 0 && spent <= creation.allocationPoints && value === creation.initialValue + spent);
    const spent = values.reduce((total, [, allocation]) => total + allocation, 0);
    if (valid && spent <= creation.allocationPoints && c.remaining === creation.allocationPoints - spent) {
      fresh.character = {
        stats: Object.fromEntries(creation.stats.map((id, i) => [id, values[i][0]])),
        allocated: Object.fromEntries(creation.stats.map((id, i) => [id, values[i][1]])),
        remaining: c.remaining
      };
    }
  }
  return fresh;
}
export function adjustStat(state, creation, stat, delta) {
  if (!creation.stats.includes(stat) || (delta !== 1 && delta !== -1)) return false;
  if (state.sceneId !== 'character-selection') return false;
  if (delta === 1 && state.character.remaining === 0) return false;
  if (delta === -1 && state.character.allocated[stat] === 0) return false;
  state.character.stats[stat] += delta;
  state.character.allocated[stat] += delta;
  state.character.remaining -= delta;
  return true;
}
export function resetAllocations(state, creation) {
  if (state.sceneId !== 'character-selection') return false;
  state.character = freshCharacter(creation);
  return true;
}
export function canStart(state) { return state.sceneId === 'character-selection' && state.character.remaining === 0; }
export function begin(state, scene) {
  if (!canStart(state)) return false;
  state.sceneId = state.meta.startedOnce ? scene.actions[0].subsequentTarget : scene.actions[0].firstTarget;
  state.meta.startedOnce = true;
  return true;
}
