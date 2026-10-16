import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { MusicDirector } from '../music-director.mjs';

const scenes = JSON.parse(await readFile(new URL('../content/scenes.json', import.meta.url), 'utf8'));
const music = JSON.parse(await readFile(new URL('../content/music.json', import.meta.url), 'utf8'));
class FakeAudio {
  constructor() { this.calls = []; this.listeners = {}; this.paused = true; this.src = ''; }
  addEventListener(name, callback) { this.listeners[name] = callback; }
  play() { this.calls.push('play'); this.paused = false; return Promise.resolve(); }
  pause() { this.calls.push('pause'); this.paused = true; }
  removeAttribute(name) { if (name === 'src') this.src = ''; }
}
test('preworld cue is assigned to every currently authored preworld screen', () => {
  const expected = ['splash', 'character-selection', 'game-start', 'intro-02', 'intro-03', 'intro-fall', 'intro-04', 'intro-05', 'intro-allow-01', 'intro-forbid-01', 'intro-shared-02', 'intro-06', 'bonus-selection'];
  assert.deepEqual(expected.map(id => scenes.scenes[id].music), ['menu',...Array(expected.length-1).fill('preworld')]);
  assert.deepEqual(Object.keys(music.tracks), ['preworld','menu','night','combat','farm']);
  assert.equal(music.tracks.preworld.id, 'MUSIC.PREWORLD.001');
  assert.equal(music.tracks.preworld.file, 'assets/music/Clockwork Cupcake.mp3');
  assert.equal(music.tracks.preworld.loop, true);
});
test('the same music cue survives scene changes without restarting source or position', () => {
  const fake = new FakeAudio();
  const director = new MusicDirector(music, () => fake);
  director.setSettings({soundEnabled: true, musicVolume: 60});
  director.select('preworld');
  assert.equal(fake.src, 'assets/music/Clockwork Cupcake.mp3');
  assert.equal(fake.loop, true);
  assert.equal(fake.volume, .6);
  fake.currentTime = 27;
  director.select('preworld');
  assert.equal(fake.currentTime, 27);
  assert.equal(fake.calls.filter(x => x === 'play').length, 1);
});
test('sound controls mute, resume and change volume immediately', () => {
  const fake = new FakeAudio();
  const director = new MusicDirector(music, () => fake);
  director.select('preworld');
  director.setSettings({soundEnabled: false, musicVolume: 20});
  assert.equal(fake.muted, true);
  assert.equal(fake.paused, true);
  director.setSettings({soundEnabled: true, musicVolume: 35});
  assert.equal(fake.muted, false);
  assert.equal(fake.volume, .35);
  assert.equal(fake.paused, false);
  director.setSettings({soundEnabled: true, musicVolume: 0});
  assert.equal(fake.paused, true);
  director.select(null);
  assert.equal(fake.src, '');
});
test('a missing original track is flagged without replacing it with substitute audio', () => {
  const fake = new FakeAudio();
  const director = new MusicDirector(music, () => fake);
  director.select('preworld');
  fake.listeners.error();
  assert.equal(director.missing, true);
  assert.equal(director.lastPlayError, 'missing-media');
  const before = fake.calls.length;
  director.onUserGesture();
  assert.equal(fake.calls.length, before);
  assert.equal(fake.src, 'assets/music/Clockwork Cupcake.mp3');
});

test('original author supplied soundtrack is embedded for intro and stops after the last next',async()=>{
  const {stat,readFile}=await import('node:fs/promises');
  const file=new URL('../'+music.tracks.preworld.file,import.meta.url);
  const buffer=await readFile(file);
  assert.ok(buffer.length>1_000_000);
  assert.equal(buffer[0],0x49); // ID3
  assert.equal(buffer[1],0x44);
  assert.equal(buffer[2],0x33);
  assert.equal(scenes.scenes['intro-06'].actions[0].target,'game-main');
  assert.equal(scenes.scenes['game-main'].music,'menu');
});
