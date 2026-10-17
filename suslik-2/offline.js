/* SUSLIK 2 portable offline runtime. Requires no HTTP server or Node.js. */
/* SUSLIK 2: isolated character state. Never confuse starting or finishing the intro with completing the game. */
const SAVE_VERSION = 3;
const STORAGE_KEY = 'suslik2.save.v1'; // reuse the existing namespace for migrated settings
const GAME_KEY_PREFIX = 'suslik2.';

/** Persist preferences plus only properly earned full-game completions; no scene autosaves. */
function launchPreferencesSnapshot(state) {
  return {
    version: SAVE_VERSION,
    settings: {...state.settings},
    meta: {completedRuns: state.meta.completedRuns, unlockedEndings:[...state.meta.unlockedEndings]},
    selectedBonuses:[...state.selectedBonuses],
    activeRun: state.activeGame ? {sceneId:state.sceneId,character:structuredClone(state.character),run:structuredClone(state.run)} : null
  };
}

/** A launch always begins from the title screen. Legacy startedOnce never unlocks Start+. */
function restoreLaunchState(raw, creation, validScenes, initialScene = 'splash') {
  const state = restoreState(raw, creation, validScenes, initialScene);
  state.sceneId = initialScene;
  state.character = freshCharacter(creation);
  state.run = newWorkRun(window.SUSLIK2_CONTENT.work);
  state.resumeSnapshot = raw?.activeRun || null;
  return state;
}

function freshCharacter(creation) {
  return {
    stats: Object.fromEntries(creation.stats.map(id => [id, creation.initialValue])),
    allocated: Object.fromEntries(creation.stats.map(id => [id, 0])),
    remaining: creation.allocationPoints
  };
}
function initialState(creation, initialScene = 'splash') {
  return {
    version: SAVE_VERSION,
    sceneId: initialScene,
    character: freshCharacter(creation),
    run: newWorkRun(window.SUSLIK2_CONTENT.work),
    meta: { completedRuns: 0, unlockedEndings: [] },
    selectedBonuses: [], activeGame:false, resumeSnapshot:null,
    settings: { locale: 'ru', soundEnabled: true, musicVolume: 100, effectsVolume: 100 }
  };
}
function restoreState(raw, creation, validScenes, initialScene = 'splash') {
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
  if (raw.meta?.unlockedEndings && Array.isArray(raw.meta.unlockedEndings)) {
    fresh.meta.unlockedEndings=raw.meta.unlockedEndings.filter(id=>['hard-worker','ogre-captive','foreman-lady'].includes(id));
    fresh.meta.completedRuns=Math.max(fresh.meta.completedRuns,fresh.meta.unlockedEndings.length);
  }
  if(Array.isArray(raw.selectedBonuses))fresh.selectedBonuses=raw.selectedBonuses.filter(x=>['hard-worker','ogre-captive','foreman-lady'].includes(x));
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
function adjustStat(state, creation, stat, delta) {
  if (!creation.stats.includes(stat) || (delta !== 1 && delta !== -1)) return false;
  if (state.sceneId !== 'character-selection') return false;
  if (delta === 1 && state.character.remaining === 0) return false;
  if (delta === -1 && state.character.allocated[stat] === 0) return false;
  state.character.stats[stat] += delta;
  state.character.allocated[stat] += delta;
  state.character.remaining -= delta;
  return true;
}
function resetAllocations(state, creation) {
  if (state.sceneId !== 'character-selection') return false;
  state.character = freshCharacter(creation);
  return true;
}

/** Points are optional. Starting the prologue does not grant New Game+. */
function canStart(state) { return state.sceneId === 'character-selection'; }
function canStartPlus(state) {
  return canStart(state) && state.meta.completedRuns > 0;
}
function begin(state, creationScene) {
  if (!canStart(state)) return false;
  state.sceneId = creationScene.actions[0].firstTarget;
  return true;
}
function beginPlus(state, creationScene) {
  if (!canStartPlus(state)) return false;
  state.sceneId = creationScene.actions[0].subsequentTarget;
  return true;
}

/** Invoke only from a future author-approved actual game ending (none currently exist). */
function recordCompletedRun(state) {
  if (!Number.isSafeInteger(state.meta.completedRuns) || state.meta.completedRuns < 0) return false;
  if (state.meta.completedRuns === Number.MAX_SAFE_INTEGER) return false;
  state.meta.completedRuns += 1;
  return true;
}

/** Clear SUSLIK 2 saved games/achievements, not Portal Life or other applications. */
function eraseSuslikData(...storages) {
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

/** One music player for all scenes. Media binding is authored in content/music.json. */
class MusicDirector {
  constructor(catalog, makeAudio = () => new Audio()) {
    this.catalog = catalog;
    this.audio = makeAudio();
    this.audio.preload = 'auto';
    this.currentCue = null;
    this.enabled = true;
    this.volume = 1;
    this.missing = false;
    this.lastPlayError = null;
    this.audio.addEventListener('error', () => {
      this.missing = true;
      this.lastPlayError = 'missing-media';
    });
  }
  setSettings(settings) {
    this.enabled = settings.soundEnabled !== false;
    const value = Number(settings.musicVolume);
    this.volume = Number.isFinite(value) ? Math.max(0, Math.min(1, value / 100)) : 1;
    this.audio.volume = this.volume;
    this.audio.muted = !this.enabled;
    if (!this.enabled || this.volume === 0) this.audio.pause();
    else this.tryPlay();
  }
  select(cue) {
    const next = cue ?? null;
    if (next === this.currentCue) return; // Same cue through consecutive screens: never seek/reload.
    if (next !== null && !Object.hasOwn(this.catalog.tracks, next)) {
      throw new Error('Unknown music cue ' + next);
    }
    this.currentCue = next;
    this.missing = false;
    this.lastPlayError = null;
    if (next === null) {
      this.audio.pause();
      this.audio.removeAttribute?.('src');
      return;
    }
    const track = this.catalog.tracks[next];
    this.audio.src = track.file;
    this.audio.loop = track.loop === true;
    this.tryPlay();
  }
  tryPlay() {
    if (!this.currentCue || !this.enabled || this.volume === 0 || this.missing) return;
    // Browsers may reject autoplay; the same player retries on the first user gesture.
    try {
      const result = this.audio.play();
      if (result && typeof result.catch === 'function') {
        void result.catch(error => {
          this.lastPlayError = error?.name === 'NotAllowedError' ? 'autoplay-blocked' : 'playback-error';
        });
      }
    } catch (error) {
      this.lastPlayError = error?.name === 'NotAllowedError' ? 'autoplay-blocked' : 'playback-error';
    }
  }
  onUserGesture() { this.tryPlay(); }
}

function safeStorage(name) { try { return window[name]; } catch (_) { return null; } }

const root = document.getElementById('game');
let config, creation, story, state, music, revealTimer, work;
const validScene = id => Object.hasOwn(config.scenes, id);
const copy = () => creation.locales[state.settings.locale];
const tr = key => story?.locales?.[state.settings.locale]?.[key] ?? copy()[key] ?? key;

function persist() {
  try { safeStorage('localStorage')?.setItem(STORAGE_KEY, JSON.stringify(launchPreferencesSnapshot(state))); }
  catch (_) { /* The game remains interactive if storage is blocked. */ }
}
function clearScene() {
  if (root.querySelector('video.scene-video') && music) music.tryPlay();
  if (revealTimer !== undefined) clearTimeout(revealTimer);
  revealTimer = undefined;
  root.replaceChildren();
  document.documentElement.lang = state.settings.locale;
}
function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}
function media(path, id, altKey, className) {
  if(!path)return element('div','media-placeholder',tr('mediaMissing')+': '+id);
  if(/\.(mp4|webm)(?:[?#].*)?$/i.test(path)) {
    const video=element('video',className+' scene-video');
    video.src=path;video.autoplay=true;video.loop=true;video.playsInline=true;
    video.controls=true;video.preload='auto';
    video.muted=state.settings.soundEnabled===false;
    video.volume=Math.max(0,Math.min(1,(state.settings.effectsVolume??100)/100));
    video.setAttribute('aria-label',tr(altKey));
    video.addEventListener('play',()=>{if(music)music.audio.pause();});
    video.addEventListener('error',()=>video.replaceWith(element('div','media-placeholder',tr('mediaMissing')+': '+id)),{once:true});
    // Play starts as part of a user action; browser controls remain if autoplay is blocked.
    video.addEventListener('loadeddata',()=>{try{void video.play()?.catch(()=>{});}catch(_){}} ,{once:true});
    return video;
  }
  const image = element('img', className);
  image.src = path;
  image.alt = tr(altKey);
  image.draggable = false;
  image.addEventListener('error', () => {
    image.replaceWith(element('div', 'media-placeholder', tr('mediaMissing') + ': ' + id));
  }, {once: true});
  return image;
}
function changeScene(id) {
  if (!validScene(id)) throw new Error('Unknown scene ' + id);
  state.sceneId = id;
  if (id==='game-main'){state.activeGame=true;if(state.run.events.shift50&&state.run.completedShifts>=50)state.run.endingOfferOnMap=true;}
  persist();
  render();
}
function sceneImage(scene) {
  const container = element('section', 'scene--image');
  const frame = element('div', 'art-frame');
  const image = media(scene.image, scene.imageId, scene.imageAltKey, 'splash-image');
  image.addEventListener('load', () => {
    if (image.naturalWidth && image.naturalHeight) {
      frame.style.setProperty('--image-ratio', String(image.naturalWidth / image.naturalHeight));
    }
  }, {once: true});
  frame.append(image);
  const controls = element('div', 'splash-actions');
  frame.append(controls);
  container.append(frame);
  root.append(container);
  revealTimer = setTimeout(() => {
    revealTimer = undefined;
    if (state.resumeSnapshot && typeof state.resumeSnapshot.sceneId==='string') {
      controls.append(gpButton(gl('continueRun'),'splash-continue',()=>{
        const old=state.resumeSnapshot;state.character=old.character;state.run=gp().restoreRun(old.run,work);
        state.activeGame=true;state.resumeSnapshot=null;changeScene(validScene(old.sceneId)?old.sceneId:'game-main');
      }));
    }
    for (const action of scene.actions) {
      const button = element('button', 'game-button is-entering', tr(action.labelKey));
      button.type = 'button';
      button.dataset.actionId = action.id;
      button.addEventListener('click', () => changeScene(action.target));
      controls.append(button);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        button.classList.remove('is-entering');
        button.classList.add('is-visible');
      }));
    }
  }, scene.buttonDelayMs);
}
function controlLabel(text, input) {
  const label = element('label', 'settings-line');
  const name = element('span', 'settings-name', text);
  label.append(name, input);
  return label;
}
function sceneCreation(scene) {
  const layout = element('section', 'creation-scene');
  const art = element('div', 'creation-art');
  art.append(media(scene.image, scene.imageId, scene.imageAltKey, 'creation-portrait'));
  const panel = element('div', 'creation-panel');
  const top = element('div', 'creation-top');
  const title = element('h1', 'creation-title', tr(scene.titleKey));
  const points = element('div', 'points-tally');
  points.append(element('span', 'points-label', tr('remaining')), element('strong', 'points-value', String(state.character.remaining)));
  top.append(title, points);
  panel.append(top);

  const stats = element('div', 'creation-stats');
  for (const key of creation.stats) {
    const row = element('div', 'stat-row');
    row.dataset.stat = key;
    const name = element('span', 'stat-name', copy().stats[key]);
    const minus = element('button', 'stat-adjust', '−');
    minus.type = 'button';
    minus.dataset.delta = '-1';
    minus.setAttribute('aria-label', '− ' + copy().stats[key]);
    minus.disabled = state.character.allocated[key] === 0;
    const value = element('strong', 'stat-value', String(state.character.stats[key]));
    const plus = element('button', 'stat-adjust', '+');
    plus.type = 'button';
    plus.dataset.delta = '1';
    plus.setAttribute('aria-label', '+ ' + copy().stats[key]);
    plus.disabled = state.character.remaining === 0;
    for (const [button, delta] of [[minus, -1], [plus, 1]]) {
      button.addEventListener('click', () => {
        if (adjustStat(state, creation, key, delta)) { persist(); render(); }
      });
    }
    row.append(name, minus, value, plus);
    stats.append(row);
  }
  panel.append(stats);
  const reset = element('button', 'reset-button', tr('reset'));
  reset.type = 'button';
  reset.addEventListener('click', () => {
    if (resetAllocations(state, creation)) { persist(); render(); }
  });
  panel.append(reset);

  const settings = element('fieldset', 'settings-panel');
  settings.append(element('legend', '', tr('settingsTitle')));
  const settingsGrid = element('div', 'settings-grid');
  const language = element('select', 'setting-select');
  language.setAttribute('aria-label', tr('language'));
  for (const code of ['ru', 'en']) {
    const option = element('option', '', tr(code === 'ru' ? 'russian' : 'english'));
    option.value = code;
    language.append(option);
  }
  language.value = state.settings.locale;
  language.addEventListener('change', () => {
    state.settings.locale = language.value;
    persist(); render();
  });
  settingsGrid.append(controlLabel(tr('language'), language));
  const checkbox = element('input', 'sound-toggle');
  checkbox.type = 'checkbox';
  checkbox.checked = state.settings.soundEnabled;
  checkbox.setAttribute('aria-label', tr('soundEnabled'));
  checkbox.addEventListener('change', () => { state.settings.soundEnabled = checkbox.checked; persist(); music.setSettings(state.settings); render(); });
  const mute = controlLabel(tr('soundEnabled'), checkbox);
  settingsGrid.append(mute);
  for (const [key, labelKey] of [['musicVolume', 'music'], ['effectsVolume', 'effects']]) {
    const slider = element('input', 'volume-slider');
    slider.type = 'range'; slider.min = '0'; slider.max = '100'; slider.step = '1';
    slider.value = String(state.settings[key]);
    slider.disabled = !state.settings.soundEnabled;
    slider.setAttribute('aria-label', tr(labelKey));
    const output = element('output', 'volume-value', state.settings[key] + '%');
    slider.addEventListener('input', () => {
      state.settings[key] = Number(slider.value);
      output.textContent = slider.value + '%';
      persist();
      if (key === 'musicVolume') music.setSettings(state.settings);
    });
    const sliderGroup = element('div', 'volume-controls');
    sliderGroup.append(slider, output);
    settingsGrid.append(controlLabel(tr(labelKey), sliderGroup));
  }
  settings.append(settingsGrid);
  if (music.missing) settings.append(element('p', 'music-unavailable', tr('musicUnavailable')));
  panel.append(settings);

  const startActions = element('div', 'creation-start-actions');
  const newGame = element('button', 'game-button creation-start', tr('newGame'));
  newGame.type = 'button';
  newGame.dataset.actionId = 'creation-new-game';
  newGame.addEventListener('click', () => showNewGameConfirmation(scene));
  const startPlus = element('button', 'game-button creation-start', tr('nextStart'));
  startPlus.type = 'button';
  startPlus.dataset.actionId = 'creation-start-plus';
  startPlus.disabled = !canStartPlus(state);
  startPlus.addEventListener('click', () => {
    if (beginPlus(state, scene)) { state.activeGame=true; persist(); render(); }
  });
  startActions.append(newGame, startPlus);
  panel.append(startActions);
  layout.append(art, panel);
  root.append(layout);
}


function showNewGameConfirmation(scene) {
  // The destructive action is never triggered merely by opening the prompt.
  const dialog = element('dialog', 'new-game-dialog');
  dialog.setAttribute('aria-labelledby', 'new-game-dialog-title');
  const title = element('h2', '', tr('confirmNewGameTitle'));
  title.id = 'new-game-dialog-title';
  const message = element('p', '', tr('confirmNewGameBody'));
  const actions = element('div', 'new-game-dialog-actions');
  const cancel = element('button', 'new-game-cancel', tr('cancelNewGame'));
  cancel.type = 'button';
  cancel.addEventListener('click', () => dialog.close());
  const confirm = element('button', 'game-button new-game-confirm', tr('confirmNewGame'));
  confirm.type = 'button';
  confirm.dataset.actionId = 'confirm-new-game';
  confirm.addEventListener('click', () => {
    // Only our own keys are removed; Portal Life and unrelated site data are untouched.
    if (!eraseSuslikData(safeStorage('localStorage'), safeStorage('sessionStorage'))) {
      message.textContent = tr('deleteFailed');
      return;
    }
    state.meta.completedRuns = 0;
    state.meta.unlockedEndings = [];
    state.activeGame=true; state.resumeSnapshot=null;
    state.run = newWorkRun(window.SUSLIK2_CONTENT.work);
    if (begin(state, scene)) {
      dialog.close();
      persist();
      render();
    }
  });
  actions.append(cancel, confirm);
  dialog.append(title, message, actions);
  dialog.addEventListener('close', () => dialog.remove(), {once: true});
  document.body.append(dialog);
  dialog.showModal();
  cancel.focus();
}

function sceneStory(scene) {
  const screen = element('section', 'story-scene');
  const imagePane = element('div', 'story-art');
  imagePane.append(media(scene.image, scene.imageId, scene.imageAltKey, 'story-image'));
  const panel = element('article', 'story-panel');
  panel.append(element('p', 'story-text', tr(scene.textKey)));
  const buttons = element('div', 'story-actions');
  for (const action of scene.actions || []) {
    const button = element('button', 'game-button story-next', tr(action.labelKey));
    button.type = 'button';
    button.dataset.actionId = action.id;
    button.addEventListener('click', () => {
      if(action.id==='intro05-allow'&&!state.run.introAllowApplied){state.run.lust=Math.min(200,state.run.lust+5);state.run.introAllowApplied=true;}
      changeScene(action.target);
    });
    buttons.append(button);
  }
  panel.append(buttons);
  screen.append(imagePane, panel);
  root.append(screen);
}

function scenePanel(scene) {
  if(state.sceneId==='bonus-selection'){gpBonusSelection();return;}
  const screen = element('section', 'scene--panel');
  const box = element('div', 'selection-panel');
  box.append(element('h1', '', tr(scene.titleKey)), element('div', 'selection-divider'));
  // The author has not yet supplied content or choices for these next screens.
  for (const action of scene.actions || []) {
    const button = element('button', 'game-button', tr(action.labelKey));
    button.type = 'button';
    button.addEventListener('click', () => changeScene(action.target));
    box.append(button);
  }
  screen.append(box); root.append(screen);
}

/** A visit to the sawmill commits exactly one shift on entry. A redraw costs nothing. */
function startSawmillShift() {
  const result=applySawmillShift(state,work);
  if(result.ok) {
    state.sceneId=gp().shiftCompleted(state,'sawmill-work')||'sawmill-work';
    persist();render();
  }
  return result;
}
function sceneSawmillWork(scene) {
  const def=work.sawmill;
  const labels=work.locales[state.settings.locale];
  const result=state.run.lastShift;
  if(!result){
    const seasonId=workSeason(state.run.elapsedDays,work),artDef=def.seasonal[seasonId];
    const screen=element('section','story-scene work-scene');
    const art=element('div','story-art');art.append(media(artDef.image,artDef.imageId,'location','story-image'));
    const panel=element('article','story-panel work-panel');
    panel.append(element('h1','work-title',labels.location),element('p','work-season',`${labels.season}: ${labels.seasons[seasonId]}`));
    panel.append(element('p','work-status',`${labels.energy}: ${state.run.energy}/${state.run.energyMax} · ${gl('gold')}: ${state.run.gold}`));
    const buttons=element('div','story-actions work-actions');
    buttons.append(gpButton('Работать','sawmill-start',()=>startSawmillShift(),state.run.energy<1));
    if(state.run.farForestUnlocked)buttons.append(gpButton(gl('far'),'far-forest-access',gpFarAttempt,state.run.energy<1));
    if(gp().canHandover(state))buttons.append(gpButton(gl('handover'),'foreman-handover',()=>changeScene('foreman-handover')));
    if(gp().canHuntOgre(state))buttons.append(gpButton(gl('huntOgre'),'ogre-find',()=>{if(gp().startOgre(state))changeScene('combat');}));
    buttons.append(gpButton(gl('returnMap'),'sawmill-return',()=>changeScene('game-main')));
    panel.append(buttons);screen.append(art,panel);root.append(screen);return;
  }
  const screen=element('section','story-scene work-scene');
  const art=element('div','story-art');
  const artDef=def.seasonal[result.season];
  const image=element('img','story-image');
  image.src=(result.lustEvent&&window.SUSLIK2_GAMEPLAY_CONTENT.lustMedia?.find(x=>x.id===result.lustMediaId)?.file)||artDef.image;
  image.alt=labels.imageAlt[result.season];
  image.draggable=false;
  image.addEventListener('error',()=>image.replaceWith(element('div','media-placeholder',tr('mediaMissing')+': '+artDef.imageId)),{once:true});
  art.append(image);
  const panel=element('article','story-panel work-panel');
  panel.append(element('h1','work-title',labels.location));
  const season=element('p','work-season',labels.season+': '+labels.seasons[result.season]);
  panel.append(season);
  if(result.lustEvent)panel.append(element('h2','work-subheading',window.SUSLIK2_GAMEPLAY_CONTENT.text.lustSawmill));
  const tally=element('div','work-tally');
  tally.append(element('p','',`${labels.energy}: ${state.run.energy}/${state.run.energyMax}`));
  tally.append(element('p','',`${labels.wage}: +${result.wage} ${labels.moneyUnit}`));
  panel.append(tally);
  panel.append(element('h2','work-subheading',labels.statChange));
  const changes=element('div','work-stats');
  for(const {stat,delta} of result.effects){
    const row=element('div','work-stat-row');
    row.append(element('span','',(stat==='lust'?(state.settings.locale==='en'?'Lust':'Похоть'):copy().stats[stat]||stat)),element('strong','',`${delta>0?'+':''}${delta} → ${(stat==='lust'?state.run.lust:state.character.stats[stat])}`));
    changes.append(row);
  }
  panel.append(changes);
  if(state.run.energy<def.energyCost)panel.append(element('p','work-notice',labels.noEnergy));
  const buttons=element('div','story-actions work-actions');
  const again=element('button','game-button story-next',labels.continueShift);
  again.type='button';again.dataset.actionId='sawmill-continue';
  again.disabled=sawmillAvailability(state,work)!==null;
  again.addEventListener('click',()=>{again.disabled=true;startSawmillShift();});
  const back=element('button','game-button story-next',labels.returnToCity);
  back.type='button';back.dataset.actionId='sawmill-return';
  back.addEventListener('click',()=>changeScene('game-main'));
  buttons.append(again,back);
  if(state.run.farForestUnlocked)buttons.append(gpButton(gl('far'),'far-forest-access',gpFarAttempt,sawmillAvailability(state,work)!==null));
  if(gp().canHandover(state))buttons.append(gpButton(gl('handover'),'foreman-handover',()=>changeScene('foreman-handover')));
  if(gp().canHuntOgre(state))buttons.append(gpButton(gl('huntOgre'),'ogre-find',()=>{if(gp().startOgre(state))changeScene('combat');}));
  panel.append(buttons);
  screen.append(art,panel);root.append(screen);
}

/** Map art, hit rectangles and permanent IDs are imported unchanged from f5ec253.
 * Only approved initial buildings are interactive. Unlock thresholds are NOT invented. */
function gpInformationDialog(title,items){
 const d=element('dialog','new-game-dialog info-dialog');
 d.append(element('h2','',title));
 for(const [name,value] of items)d.append(element('p','',`${name}: ${value}`));
 d.append(gpButton('Закрыть','info-close',()=>d.close()));
 d.addEventListener('close',()=>d.remove(),{once:true});document.body.append(d);d.showModal();
}
function gpGameMenu(){
 const d=element('dialog','new-game-dialog game-menu');d.append(element('h2','','Меню игры'));
 const buttons=element('div','game-menu-actions');
 buttons.append(gpButton('Сохранить','menu-save',()=>{try{localStorage.setItem('suslik2.manual.save.v1',JSON.stringify(launchPreferencesSnapshot(state)));persist();d.close();}catch(_){alert('Не удалось сохранить игру.');}}));
 buttons.append(gpButton('Загрузить','menu-load',()=>{
   try{const manual=JSON.parse(localStorage.getItem('suslik2.manual.save.v1')||'null');const saved=manual?.activeRun;if(!saved)throw Error('no-save');
   state.character=saved.character;state.run=gp().restoreRun(saved.run,work);d.close();changeScene(validScene(saved.sceneId)?saved.sceneId:'game-main');
   }catch(_){alert('Сохранение текущего прохождения не найдено.');}
 }));
 buttons.append(gpButton('Настройки','menu-settings',()=>{
  d.close();gpInformationDialog('Настройки',[['Музыка',state.settings.soundEnabled?'Включена':'Выключена'],['Громкость',state.settings.musicVolume+'%']]);
  const settingsDialog=document.querySelector('dialog.info-dialog');
  if(settingsDialog){const toggle=gpButton('Звук вкл./выкл.','setting-audio',()=>{state.settings.soundEnabled=!state.settings.soundEnabled;music.setSettings(state.settings);persist();settingsDialog.querySelector('p').textContent='Музыка: '+(state.settings.soundEnabled?'Включена':'Выключена');});
   const slider=element('input');slider.type='range';slider.min=0;slider.max=100;slider.value=state.settings.musicVolume;slider.addEventListener('input',()=>{state.settings.musicVolume=Number(slider.value);music.setSettings(state.settings);persist();});settingsDialog.append(toggle,slider);}
 }));
 buttons.append(gpButton('Полный экран','menu-fullscreen',()=>{d.close();if(!document.fullscreenElement)document.documentElement.requestFullscreen?.();else document.exitFullscreen?.();}));
 buttons.append(gpButton('Выход из игры','menu-exit',()=>{persist();d.close();state.sceneId='splash';render();}));
 buttons.append(gpButton('Закрыть','menu-close',()=>d.close()));
 d.append(buttons);d.addEventListener('close',()=>d.remove(),{once:true});document.body.append(d);d.showModal();
}
function sceneMap(scene) {
  const data = window.SUSLIK2_CONTENT.map;
  const screen = element('section','game-map-screen');
  const heading = element('header','game-map-header');
  heading.append(element('h1','game-map-title',tr(scene.titleKey)));
  const day=state.run.elapsedDays;const ss=workSeason(day,work);
  heading.append(element('p','map-hud',`День ${day+1} · ${work.locales[state.settings.locale].seasons[ss]} · Год ${Math.floor(day/(work.daysPerSeason*4))+1} · Энергия ${state.run.energy}/${state.run.energyMax} · Золото ${state.run.gold} · Похоть ${state.run.lust}`));
  const canvas = element('div','game-map-canvas');
  const ns = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(ns,'svg');
  svg.setAttribute('viewBox',`0 0 ${data.coordinateSystem.width} ${data.coordinateSystem.height}`);
  svg.setAttribute('role','group');
  svg.setAttribute('aria-label',tr(scene.titleKey));
  svg.classList.add('game-map-svg');
  const make = (tag,attrs={}) => {
    const node=document.createElementNS(ns,tag);
    for (const [key,value] of Object.entries(attrs)) node.setAttribute(key,String(value));
    return node;
  };
  const rectAttrs = b => ({x:b.x,y:b.y,width:b.w,height:b.h});
  const terrain=make('image',{href:data.background,...rectAttrs({x:0,y:0,w:data.coordinateSystem.width,h:data.coordinateSystem.height}),preserveAspectRatio:'none'});
  svg.append(terrain);
  const available=new Set(data.initialVisible); // Later stat rules need author-approved numeric thresholds.
  const accessible=data.locations.filter(loc=>available.has(loc.id));
  const closeLocation = () => { const current=screen.querySelector('.map-location-dialog');if(current)current.remove(); };
  const openLocation = loc => {
    if(loc.id === 'sawmill') {
      if(gp().ogreAfterIntro(state)){changeScene('ogre-after');return;}
      if(gp().beginOgreIntro(state)){changeScene('ogre-intro');return;}
      state.run.lastShift=null;changeScene('sawmill-work');return;
    }
    if(loc.id==='undead_farm'){state.run.farmLastShift=null;changeScene('undead-farm-work');return;}
    closeLocation();
    const backdrop=element('div','map-location-dialog');
    const panel=element('section','map-location-panel');
    panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');
    const title=element('h2','',loc.name);
    const back=element('button','game-button',tr('backToMap'));
    back.type='button';back.addEventListener('click',()=>{closeLocation();});
    panel.append(title,back);backdrop.append(panel);screen.append(backdrop);
    backdrop.addEventListener('click',event=>{if(event.target===backdrop)closeLocation();});
    back.focus();
  };
  for(const loc of accessible) {
    const art=make('image',{href:loc.image,...rectAttrs(loc.position),preserveAspectRatio:'none','pointer-events':'none','data-location-id':loc.id});
    svg.append(art);
  }
  for(const loc of accessible) {
    const group=make('g',{'data-location-id':loc.id,role:'button',tabindex:0,'aria-label':loc.name,class:'game-map-hotspot'});
    group.append(make('rect',{...rectAttrs(loc.hit),rx:10,class:'game-map-hit'}));
    const title=make('title');title.textContent=loc.name;group.append(title);
    group.addEventListener('click',()=>openLocation(loc));
    group.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();openLocation(loc);}});
    svg.append(group);
  }
  const notice=element('div','game-map-missing',tr('mapAssetsMissing'));
  notice.hidden=true;
  let failed=false;
  function verify(path) { const img=new Image();img.onerror=()=>{failed=true;notice.hidden=false;};img.src=path; }
  verify(data.background);for(const loc of accessible)verify(loc.image);
  canvas.append(svg);
  screen.append(heading,canvas,notice);
  const footer=element('div','game-map-footer');
  footer.append(gpButton(gl('sleep'),'map-sleep',gpOpenSleep));
  footer.append(gpButton('Инвентарь','map-inventory',()=>gpInformationDialog('Инвентарь',[['Сломанное копьё гоблина',state.run.brokenSpears||0],['Голова огра',state.run.ogreHead?1:0]])));
  footer.append(gpButton('Характеристики','map-stats',()=>gpInformationDialog('Характеристики',[...creation.stats.map(k=>[copy().stats[k],state.character.stats[k]]),['Похоть',state.run.lust],['HP',state.run.currentHP??gp().maxHP(state)],['Мана',state.run.currentMana??gp().maxMana(state)]])));
  footer.append(gpButton('Меню','map-menu',gpGameMenu));
  footer.append(gpButton('Полный экран','map-fullscreen',()=>{if(!document.fullscreenElement)document.documentElement.requestFullscreen?.();else document.exitFullscreen?.();}));
  if(gp().endingAvailable(state))footer.append(gpButton(gl('ending'),'map-ending',()=>changeScene('ending-menu')));
  screen.append(footer);root.append(screen);
}

function render() {
  clearScene();
  const scene = config.scenes[state.sceneId];
  // Unspecified future pre-world screens keep the current cue until an authored change.
  if (Object.hasOwn(scene, 'music')) music.select(scene.music);
  else if (['game-main','sawmill-work','far-ordinary','far-goblin','far-permission-result','work-event','foreman-handover','ogre-intro','ogre-after'].includes(state.sceneId)) music.select('menu');
  if (state.sceneId==='undead-farm-owner-05') sceneUndeadFarmOwner05();
  else if (state.sceneId==='undead-farm-brains-15') sceneUndeadFarmBrains15();
  else if (state.sceneId==='work-event') gpEventScreen();
  else if(state.sceneId==='foreman-handover')gpHandoverScene();
  else if(state.sceneId==='night-training')gpNightTraining();
  else if(state.sceneId==='ogre-intro')gpOgreIntroScene();
  else if(state.sceneId==='ogre-victory')gpOgreVictoryScene();
  else if(state.sceneId==='ogre-after')gpOgreAfterScene();
  else if(state.sceneId==='ogre-captive')gpOgreCaptiveScene();
  else if(state.sceneId==='ending-foreman-lady')gpForemanLadyEnding();
  else if (state.sceneId==='far-ordinary') gpFarOrdinaryScreen();
  else if (state.sceneId==='far-goblin') gpEncounterScreen();
  else if (state.sceneId==='night-room') gpNightScreen('room');
  else if (state.sceneId==='night-street') gpNightScreen('street');
  else if (state.sceneId==='night-satyr') gpNightScreen('satyr');
  else if (state.sceneId==='combat') gpBattleScreen();
  else if (state.sceneId==='combat-defeat') gpDefeatScreen();
  else if (state.sceneId==='far-permission-result') gpGoblinPermissionScreen();
  else if (state.sceneId==='far-permission-pending') gpScene(gc().images.goblinEncounter,gl('pending'),[]);
  else if (state.sceneId==='ending-menu') gpMenuEnding();
  else if (state.sceneId==='ending-hard-worker') gpFinalEnding();
  else if (scene.kind === 'image') sceneImage(scene);
  else if (scene.kind === 'creation') sceneCreation(scene);
  else if (scene.kind === 'story') sceneStory(scene);
  else if (scene.kind === 'panel') scenePanel(scene);
  else if (scene.kind === 'map') sceneMap(scene);
  else if (scene.kind === 'work'&&scene.workId==='undead_farm') sceneUndeadFarmWork(scene);
  else if (scene.kind === 'work') sceneSawmillWork(scene);
  else throw new Error('Unknown scene kind');
  root.dataset.ready = 'yes';
}
function run() {
  if (!window.SUSLIK2_CONTENT) throw new Error('Offline content missing: content/offline-content.js');
  config = window.SUSLIK2_CONTENT.scenes;
  creation = window.SUSLIK2_CONTENT.creation;
  story = window.SUSLIK2_CONTENT.story;
  work = window.SUSLIK2_CONTENT.work;
  music = new MusicDirector(window.SUSLIK2_CONTENT.music);
  const valid = new Set(Object.keys(config.scenes));
  for (const [id, scene] of Object.entries(config.scenes)) {
    for (const action of scene.actions || []) {
      for (const target of [action.target, action.firstTarget, action.subsequentTarget]) {
        if (target && !valid.has(target)) throw new Error('Broken transition from ' + id);
      }
    }
  }
  let raw = null;
  try { raw = JSON.parse(safeStorage('localStorage')?.getItem(STORAGE_KEY) ?? 'null'); } catch (_) { /* Clean start. */ }
  state = restoreLaunchState(raw, creation, valid, config.initialScene);
  music.setSettings(state.settings);
  // Do not restart the music on scene redraws. Resume after a user gesture if autoplay was blocked.
  for (const eventType of ['pointerdown', 'keydown']) {
    document.addEventListener(eventType, () => music.onUserGesture(), {capture: true});
  }
  const params = new URLSearchParams(location.search);
  if (params.has('replayIntro')) {
    // Replay the introductory sequence without altering the character or New Start+ history.
    state.sceneId = 'game-start';
  } else if (params.has('restart')) {
    state.sceneId = config.initialScene;
    state.character = freshCharacter(creation);
  }
  // URL-only replay/reset commands are consumed once; normal launches always
  // begin at the splash, with only preferences and Start+ eligibility retained.
  if (params.has('replayIntro') || params.has('restart')) {
    params.delete('replayIntro');
    params.delete('restart');
    const query = params.toString();
    history.replaceState(null, '', location.pathname + (query ? '?' + query : '') + location.hash);
  }
  persist(); render();
}
try { run(); } catch (err) { console.error(err); root.textContent = 'Не удалось загрузить игру. Перезапустите SUSLIK 2 или обновите страницу.'; }

