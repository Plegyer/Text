/** One music player for all scenes. Media binding is authored in content/music.json. */
export class MusicDirector {
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
