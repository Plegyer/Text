/* SUSLIK 2: минимальный движок экранов; содержание и переходы — в content/scenes.json. */
(() => {
  const STORAGE_KEY = 'suslik2.save.v1';
  const SAVE_VERSION = 1;
  const root = document.getElementById('game');
  let config;
  let sceneId;
  let pendingReveal;

  function readSave(validIds) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === null) return null;
      const value = JSON.parse(raw);
      if (value && value.version === SAVE_VERSION && validIds.has(value.sceneId)) return value.sceneId;
    } catch (_) { /* Отсутствие сохранения не препятствует запуску. */ }
    return null;
  }
  function saveScene(id) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: SAVE_VERSION, sceneId: id })); }
    catch (_) { /* Игра продолжает работать, если хранилище недоступно. */ }
  }
  function clearScene() {
    if (pendingReveal !== undefined) clearTimeout(pendingReveal);
    pendingReveal = undefined;
    root.replaceChildren();
  }
  function buttonFor(action) {
    const button = document.createElement('button');
    button.className = 'game-button';
    button.type = 'button';
    button.textContent = action.label;
    button.dataset.actionId = action.id;
    button.addEventListener('click', () => changeScene(action.target));
    return button;
  }
  function renderImageScene(scene) {
    const container = document.createElement('section');
    container.className = 'scene--image';
    const frame = document.createElement('div');
    frame.className = 'art-frame';
    const picture = document.createElement('img');
    picture.className = 'splash-image';
    picture.src = scene.image;
    picture.alt = scene.imageAlt || '';
    picture.draggable = false;
    picture.addEventListener('load', () => {
      if (picture.naturalWidth && picture.naturalHeight) {
        frame.style.setProperty('--image-ratio', String(picture.naturalWidth / picture.naturalHeight));
      }
    }, { once: true });
    picture.addEventListener('error', () => {
      const placeholder = document.createElement('div');
      placeholder.className = 'media-placeholder';
      placeholder.textContent = 'Нет изображения: ' + scene.imageId;
      picture.replaceWith(placeholder);
    }, { once: true });
    frame.append(picture);
    const controls = document.createElement('div');
    controls.className = 'splash-actions';
    frame.append(controls);
    container.append(frame);
    root.append(container);
    const delay = Math.max(0, Number(scene.buttonDelayMs) || 0);
    pendingReveal = setTimeout(() => {
      pendingReveal = undefined;
      const buttons = scene.actions.map(buttonFor);
      buttons.forEach(button => {
        button.classList.add('is-entering');
        controls.append(button);
      });
      requestAnimationFrame(() => requestAnimationFrame(() => {
        buttons.forEach(button => { button.classList.remove('is-entering'); button.classList.add('is-visible'); });
      }));
    }, delay);
  }
  function renderPanelScene(scene) {
    const container = document.createElement('section');
    container.className = 'scene--panel';
    const panel = document.createElement('div');
    panel.className = 'selection-panel';
    const title = document.createElement('h1');
    title.textContent = scene.title;
    const divider = document.createElement('div');
    divider.className = 'selection-divider';
    divider.setAttribute('aria-hidden', 'true');
    panel.append(title, divider);
    for (const action of scene.actions) panel.append(buttonFor(action));
    container.append(panel);
    root.append(container);
  }
  function changeScene(id) {
    if (!Object.prototype.hasOwnProperty.call(config.scenes, id)) throw new Error('Unknown scene: ' + id);
    sceneId = id;
    saveScene(id);
    clearScene();
    const scene = config.scenes[id];
    if (scene.kind === 'image') renderImageScene(scene);
    else if (scene.kind === 'panel') renderPanelScene(scene);
    else throw new Error('Unknown scene kind');
  }
  async function run() {
    const response = await fetch('content/scenes.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('Cannot load scenes');
    config = await response.json();
    const validIds = new Set(Object.keys(config.scenes));
    for (const [id, scene] of Object.entries(config.scenes)) {
      for (const action of scene.actions || []) {
        if (!validIds.has(action.target)) throw new Error('Invalid transition from ' + id);
      }
    }
    const params = new URLSearchParams(location.search);
    if (params.has('restart')) {
      try { localStorage.removeItem(STORAGE_KEY); } catch (_) { /* ignore */ }
    }
    changeScene(readSave(validIds) || config.initialScene);
  }
  run().catch(() => { root.textContent = 'Не удалось загрузить игру.'; });
})();
