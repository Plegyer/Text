/* SUSLIK 2 — portable, host-driven DOM renderer for far-forest scenes.
   No fetch, no modules, no save writes or game balance inside this file. */
(function (host) {
  'use strict';
  function node(tag, cls, value) {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (value !== undefined) el.textContent = value;
    return el;
  }
  function button(value, action, actionId) {
    const el = node('button', 'far-forest-button', value);
    el.type = 'button';
    el.dataset.actionId = actionId;
    el.addEventListener('click', action);
    return el;
  }
  function image(src, alt) {
    const img = node('img', 'far-forest-image');
    img.src = src;
    img.alt = alt;
    img.draggable = false;
    return img;
  }
  function localize(content, locale) {
    return content.locales[locale === 'en' ? 'en' : 'ru'];
  }
  /* Invoke only from the existing sawmill renderer; when locked, NO button exists. */
  function addAccessButton(container, farState, onOpen, options = {}) {
    const core = host.SUSLIK2FarForest;
    if (!core || !core.isAvailable(farState)) return null;
    const tr = localize(options.content || host.SUSLIK2FarForestContent, options.locale);
    const action = button(tr.access, onOpen, 'far-forest-access');
    container.append(action);
    return action;
  }
  /* Host settles ordinary shift BEFORE showing it. The two buttons are only
     available once the immutable receipt was committed with the game save. */
  function renderScene(container, params) {
    const core = host.SUSLIK2FarForest;
    const content = params.content || host.SUSLIK2FarForestContent;
    if (!core || !content) throw new Error('Far forest core and content required');
    const text = localize(content, params.locale);
    const sceneId = params.farState?.sceneId;
    const section = node('section', 'far-forest-scene');
    section.dataset.sceneId = sceneId;
    if (sceneId === core.SCENES.ORDINARY) {
      const attempt = params.farState.currentAttempt;
      if (!attempt?.settled) throw new Error('Ordinary shift must be settled before rendering its actions');
      if (typeof params.seasonalImage === 'string' && params.seasonalImage)
        section.append(image(params.seasonalImage, text.ordinaryAlt));
      section.append(node('h2', 'far-forest-title', text.ordinaryTitle));
      section.append(button(text.next, () => params.onNext(), 'far-forest-next'));
      section.append(button(text.continueWork, () => params.onContinue(), 'far-forest-continue'));
    } else if (sceneId === core.SCENES.GOBLIN) {
      section.append(image(content.goblinImage, text.goblinAlt));
      section.append(node('p', 'far-forest-text', text.goblinText));
      section.append(button(text.permission, () => params.onGoblinChoice('permission'), 'far-forest-permission'));
      section.append(button(text.fight, () => params.onGoblinChoice('fight'), 'far-forest-fight'));
    } else if (sceneId === core.SCENES.PERMISSION_PENDING) {
      section.append(node('p', 'far-forest-pending', text.permissionPending));
    } else if (sceneId === core.SCENES.FIGHT_PENDING) {
      section.append(node('p', 'far-forest-pending', text.fightPending));
    } else {
      throw new Error('Unknown far forest scene: ' + sceneId);
    }
    container.replaceChildren(section);
    return section;
  }
  host.SUSLIK2FarForestUI = Object.freeze({addAccessButton, renderScene});
})(globalThis);
