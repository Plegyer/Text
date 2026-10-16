import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {
  STORAGE_KEY, initialState, restoreLaunchState, launchPreferencesSnapshot,
  adjustStat, begin, beginPlus, canStartPlus, eraseSuslikData, recordCompletedRun
} from '../creation-state.mjs';

const creation = JSON.parse(await readFile(new URL('../content/creation.json', import.meta.url), 'utf8'));
const catalog = JSON.parse(await readFile(new URL('../content/scenes.json', import.meta.url), 'utf8'));
const valid = new Set(Object.keys(catalog.scenes));

test('legacy silent save at game-main never resumes automatically', () => {
  const previous = initialState(creation, 'character-selection');
  previous.sceneId = 'game-main';
  previous.meta.completedRuns = 0;
  previous.settings.locale = 'en';
  previous.settings.musicVolume = 37;
  for (let i = 0; i < 10; i++) {
    previous.sceneId = 'character-selection';
    assert.equal(adjustStat(previous, creation, 'strength', 1), true);
  }
  previous.sceneId = 'game-main';
  const launched = restoreLaunchState(JSON.parse(JSON.stringify(previous)), creation, valid, catalog.initialScene);
  assert.equal(launched.sceneId, 'splash');
  assert.equal(launched.character.remaining, 10, 'unsaved character allocation does not resume');
  assert.equal(launched.character.stats.strength, 1);
  assert.equal(launched.settings.locale, 'en');
  assert.equal(launched.settings.musicVolume, 37);
  assert.equal(launched.meta.completedRuns, 0, 'prologue does not unlock Start+');
});

test('interrupted intro and older v1 saves cannot skip the splash', () => {
  for (const id of ['intro-05', 'intro-allow-01', 'intro-shared-02', 'game-main']) {
    const old = initialState(creation, id);
    const launched = restoreLaunchState(old, creation, valid, catalog.initialScene);
    assert.equal(launched.sceneId, 'splash');
  }
  assert.equal(restoreLaunchState({version: 1, sceneId: 'game-main'}, creation, valid).sceneId, 'splash');
  assert.equal(restoreLaunchState(null, creation, valid).sceneId, 'splash');
});

test('only settings and true full-game completions are saved — not scenes or character progression', () => {
  const state = initialState(creation, 'game-main');
  state.meta.completedRuns = 2;
  state.settings.soundEnabled = false;
  state.settings.effectsVolume = 55;
  const stored = launchPreferencesSnapshot(state);
  assert.deepEqual(Object.keys(stored).sort(), ['meta', 'settings', 'version']);
  assert.ok(!('sceneId' in stored));
  assert.ok(!('character' in stored));
  assert.equal(STORAGE_KEY, 'suslik2.save.v1');
  const restored = restoreLaunchState(stored, creation, valid);
  assert.equal(restored.sceneId, 'splash');
  assert.equal(restored.meta.completedRuns, 2);
  assert.equal(restored.settings.soundEnabled, false);
  assert.equal(restored.settings.effectsVolume, 55);
});

test('v13 startedOnce migrates as NOT completed and cannot skip the prologue',()=>{
  const old={version:2,sceneId:'game-main',meta:{startedOnce:true},settings:{locale:'en',soundEnabled:true,musicVolume:12,effectsVolume:100}};
  const s=restoreLaunchState(old,creation,valid);
  assert.equal(s.sceneId,'splash');
  assert.equal(s.meta.completedRuns,0);
  assert.equal(s.settings.locale,'en');
  assert.equal(s.settings.musicVolume,12);
  s.sceneId='character-selection';
  assert.equal(canStartPlus(s),false);
  assert.equal(beginPlus(s,catalog.scenes['character-selection']),false);
  assert.equal(begin(s,catalog.scenes['character-selection']),true);
  assert.equal(s.sceneId,'game-start');
});

test('future full-game ending, not the intro, unlocks Start+',()=>{
  const s=initialState(creation,'character-selection');
  assert.equal(begin(s,catalog.scenes['character-selection']),true);
  s.sceneId='intro-06';
  s.sceneId='game-main';
  assert.equal(s.meta.completedRuns,0);
  assert.equal(recordCompletedRun(s),true);
  const restored=restoreLaunchState(launchPreferencesSnapshot(s),creation,valid);
  assert.equal(restored.meta.completedRuns,1);
  restored.sceneId='character-selection';
  assert.equal(beginPlus(restored,catalog.scenes['character-selection']),true);
});

class FakeStorage {
  constructor(values){this.values=new Map(Object.entries(values));}
  get length(){return this.values.size;}
  key(index){return [...this.values.keys()][index]??null;}
  removeItem(k){this.values.delete(k);}
  getItem(k){return this.values.get(k)??null;}
}
test('new game erases only SUSLIK2 saved data, not the old project',()=>{
  const local=new FakeStorage({'suslik2.save.v1':'old','suslik2.achievements':'earned','portal-life.save':'old game','other-setting':'keep'});
  const session=new FakeStorage({'SUSLIK2.temp':'temporary','portal-life.session':'keep'});
  assert.equal(eraseSuslikData(local,session),true);
  assert.equal(local.getItem('suslik2.save.v1'),null);
  assert.equal(local.getItem('suslik2.achievements'),null);
  assert.equal(session.getItem('SUSLIK2.temp'),null);
  assert.equal(local.getItem('portal-life.save'),'old game');
  assert.equal(session.getItem('portal-life.session'),'keep');
  assert.equal(local.getItem('other-setting'),'keep');
});

test('New Game confirms deletion and Start+ is separately gated',async()=>{
  const src=await readFile(new URL('../src.js',import.meta.url),'utf8');
  const i18n=JSON.parse(await readFile(new URL('../content/creation.json',import.meta.url),'utf8'));
  assert.match(src,/showNewGameConfirmation/);
  assert.match(src,/newGame.addEventListener/);
  assert.match(src,/confirm.addEventListener/);
  assert.match(src,/eraseSuslikData/);
  assert.match(src,/startPlus.disabled = !canStartPlus/);
  assert.equal(i18n.locales.ru.newGame,'Новая игра');
  assert.equal(i18n.locales.ru.nextStart,'Старт+');
  assert.match(i18n.locales.ru.confirmNewGameBody,/все ваши сохранения и достижения/);
  assert.equal(i18n.locales.en.cancelNewGame,'Cancel');
});

test('Windows installer canonicalizes its source path to avoid ROBOCOPY destination swallowing', async () => {
  const installer = await readFile(new URL('../INSTALL OR UPDATE SUSLIK 2.cmd', import.meta.url), 'utf8');
  assert.match(installer, /for %%I in \("%~dp0\."\) do set "SOURCE=%%~fI"/i);
  assert.match(installer, /robocopy "%SOURCE%" "%DEST%" \/E/);
  assert.match(installer, /if errorlevel 8 \(/);
  assert.doesNotMatch(installer, /set "SOURCE=%~dp0"/i);
  assert.doesNotMatch(installer, /\/(?:MIR|PURGE)\b/i);
});
