/* SUSLIK 2: isolated character state. Never confuse starting or finishing the intro with completing the game. */
export const SAVE_VERSION = 3;
export const STORAGE_KEY = 'suslik2.save.v1'; // reuse the existing namespace for migrated settings
export const GAME_KEY_PREFIX = 'suslik2.';

/** Persist preferences plus only properly earned full-game completions; no scene autosaves. */
export function launchPreferencesSnapshot(state) {
  return {
    version: SAVE_VERSION,
    settings: {...state.settings},
    meta: {completedRuns: state.meta.completedRuns}
  };
}

/** A launch always begins from the title screen. Legacy startedOnce never unlocks Start+. */
export function restoreLaunchState(raw, creation, validScenes, initialScene = 'splash') {
  const state = restoreState(raw, creation, validScenes, initialScene);
  state.sceneId = initialScene;
  state.character = freshCharacter(creation);
  return state;
}

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
    meta: { completedRuns: 0 },
    settings: { locale: 'ru', soundEnabled: true, musicVolume: 100, effectsVolume: 100 }
  };
}
export function restoreState(raw, creation, validScenes, initialScene = 'splash') {
  const fresh = initialState(creation, initialScene);
  if (!raw || typeof raw !== 'object') return fresh;
  if (![1, 2, SAVE_VERSION].includes(raw.version)) return fresh;
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
  // No prior version contained a trustworthy full-game completion flag.
  if (raw.version === SAVE_VERSION && Number.isSafeInteger(raw.meta?.completedRuns) && raw.meta.completedRuns > 0) {
    fresh.meta.completedRuns = raw.meta.completedRuns;
  }
  // Legacy characters are not resumed on launch; respect integrity if restoreState is used directly.
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

/** Points are optional. Starting the prologue does not grant New Game+. */
export function canStart(state) { return state.sceneId === 'character-selection'; }
export function canStartPlus(state) {
  return canStart(state) && state.meta.completedRuns > 0;
}
export function begin(state, creationScene) {
  if (!canStart(state)) return false;
  state.sceneId = creationScene.actions[0].firstTarget;
  return true;
}
export function beginPlus(state, creationScene) {
  if (!canStartPlus(state)) return false;
  state.sceneId = creationScene.actions[0].subsequentTarget;
  return true;
}

/** Invoke only from a future author-approved actual game ending (none currently exist). */
export function recordCompletedRun(state) {
  if (!Number.isSafeInteger(state.meta.completedRuns) || state.meta.completedRuns < 0) return false;
  if (state.meta.completedRuns === Number.MAX_SAFE_INTEGER) return false;
  state.meta.completedRuns += 1;
  return true;
}

/** Clear SUSLIK 2 saved games/achievements, not Portal Life or other applications. */
export function eraseSuslikData(...storages) {
  for (const storage of storages) {
    if (!storage) continue;
    const keys = [];
    try {
      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (key && key.toLowerCase().startsWith(GAME_KEY_PREFIX)) keys.push(key);
      }
      for (const key of keys) storage.removeItem(key);
    } catch (_) { return false; }
  }
  return true;
}
