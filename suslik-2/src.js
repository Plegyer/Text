import {STORAGE_KEY, restoreLaunchState, launchPreferencesSnapshot, adjustStat, resetAllocations, canStartPlus, begin, beginPlus, eraseSuslikData, freshCharacter} from './creation-state.mjs';
import {MusicDirector} from './music-director.mjs';

const root = document.getElementById('game');
let config, creation, story, state, music, revealTimer;
const validScene = id => Object.hasOwn(config.scenes, id);
const copy = () => creation.locales[state.settings.locale];
const tr = key => story?.locales?.[state.settings.locale]?.[key] ?? copy()[key] ?? key;

function persist() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(launchPreferencesSnapshot(state))); }
  catch (_) { /* The game remains interactive if storage is blocked. */ }
}
function clearScene() {
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
    if (beginPlus(state, scene)) { persist(); render(); }
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
    if (!eraseSuslikData(localStorage, sessionStorage)) {
      message.textContent = tr('deleteFailed');
      return;
    }
    state.meta.completedRuns = 0;
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
    button.addEventListener('click', () => changeScene(action.target));
    buttons.append(button);
  }
  panel.append(buttons);
  screen.append(imagePane, panel);
  root.append(screen);
}

function scenePanel(scene) {
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
function render() {
  clearScene();
  const scene = config.scenes[state.sceneId];
  // Unspecified future pre-world screens keep the current cue until an authored change.
  if (Object.hasOwn(scene, 'music')) music.select(scene.music);
  if (scene.kind === 'image') sceneImage(scene);
  else if (scene.kind === 'creation') sceneCreation(scene);
  else if (scene.kind === 'story') sceneStory(scene);
  else if (scene.kind === 'panel') scenePanel(scene);
  else throw new Error('Unknown scene kind');
  root.dataset.ready = 'yes';
}
async function run() {
  const [scenesResponse, creationResponse, storyResponse, musicResponse] = await Promise.all([
    fetch('content/scenes.json', {cache: 'no-store'}),
    fetch('content/creation.json', {cache: 'no-store'}),
    fetch('content/story.json', {cache: 'no-store'}),
    fetch('content/music.json', {cache: 'no-store'})
  ]);
  if (!scenesResponse.ok || !creationResponse.ok || !storyResponse.ok || !musicResponse.ok) throw new Error('Game content unavailable');
  config = await scenesResponse.json();
  creation = await creationResponse.json();
  story = await storyResponse.json();
  music = new MusicDirector(await musicResponse.json());
  const valid = new Set(Object.keys(config.scenes));
  for (const [id, scene] of Object.entries(config.scenes)) {
    for (const action of scene.actions || []) {
      for (const target of [action.target, action.firstTarget, action.subsequentTarget]) {
        if (target && !valid.has(target)) throw new Error('Broken transition from ' + id);
      }
    }
  }
  let raw = null;
  try { raw = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (_) { /* Clean start. */ }
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
run().catch(err => { console.error(err); root.textContent = 'Не удалось загрузить игру. Перезапустите SUSLIK 2 или обновите страницу.'; });
