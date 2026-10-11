import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
const scenes = JSON.parse(await readFile(new URL('../content/scenes.json', import.meta.url), 'utf8'));
test('Start scene uses author supplied splash media', async () => {
  assert.equal(scenes.initialScene, 'splash');
  const splash = scenes.scenes.splash;
  assert.equal(splash.kind, 'image');
  assert.equal(splash.imageId, 'MEDIA.SPLASH.001');
  assert.ok(splash.buttonDelayMs >= 2000 && splash.buttonDelayMs <= 3000);
  assert.ok((await stat(new URL('../' + splash.image, import.meta.url))).size > 0);
});
test('single Start button transitions to characteristic screen without state costs', () => {
  const splash = scenes.scenes.splash;
  assert.deepEqual(splash.actions, [{ id: 'start', label: 'Старт', target: 'character-selection' }]);
  assert.equal(scenes.scenes['character-selection'].title, 'Выбор характеристик');
  assert.deepEqual(scenes.scenes['character-selection'].actions, []);
});
test('every declared transition has a target', () => {
  for (const scene of Object.values(scenes.scenes)) {
    for (const action of scene.actions) assert.ok(scenes.scenes[action.target]);
  }
});
