# User media smoke — 2026-10-09 — 5 uploaded GIF + 7 MP3

**Priority today:** user corrected yesterday's "tomorrow" — **the Windows playtest is TODAY**, and explicitly uploaded 5 GIF plus 7 real MP3s so a visible/sounding game build can be tested. Follow up today, not tomorrow. First user-prompted mapping explicitly required exact order: P0 animal → P0 running/fall → P0 waking/emerge → P1 explaining → P1 tool. This is **an existing-game integration / acceptance**, not a request for new illustrations or reduced content.

## Source files received through ChatGPT conversation

**GIF — exact names and intended ordered narrative slots**:
1. `01-animal.gif` (733001 bytes, **30 frames**, 300×210): white ground-squirrel encounter/run (visual placeholder contains a small ground-dwelling mammal, not guaranteed to resemble fantasy white squirrel).
2. `02-running.gif` (321753 bytes, **1 frame**, 482×640): heroine chase/fall into hatch intended — **file is static**, so not truly animating the chase.
3. `03-waking.gif` (674805 bytes, **24 frames**, 500×300): wake up and emerge intended (actual source a woman waking in bed).
4. `04-explaining.gif` (153935 bytes, **1 frame**, 640×360): explaining to local resident intended — **static**.
5. `05-tool.gif` (164217 bytes, **1 frame**, 498×281): first employer hands tool intended — **static**, contains recognisable copyrighted superhero/movie art.

**MP3 — full original uploads, uncut**:
- `Rum Punch Parlay.mp3` — about 131.1s; town ambient.
- `Clockwork Cupcake.mp3` — about 61.1s; character creation / school.
- `Tiki Chase.mp3` — about 53.0s; introductory chase.
- `Banjo Barn Shuffle.mp3` — about 136.8s; ordinary career work.
- `Cape and Cadence.mp3` — about 52.6s; Palace.
- `Neon Orbit Loop.mp3` — about 148.8s; Activity/exploration.
- `Velvet Banana Split.mp3` — about 121.7s; night/lodging.

User files reside in the present conversation in `/mnt/data/01-animal.gif`, `.../02-running.gif`, `.../03-waking.gif`, `.../04-explaining.gif`, `.../05-tool.gif` and 7 named MP3s. **These are conversation uploads**, not binaries committed to GitHub; do not assume they automatically appear in a future agent's runtime. The current assistant created and verified a downloadable user ZIP `media-smoke-kit-5gif-7mp3-2026-10-09.zip`, containing all 12 original files under `assets/smoke/gif/` and `assets/smoke/music/`, a SHA256 manifest, simple `MEDIA-CHECK-NOW.html` standalone file tester, and `BUILD-WINDOWS.bat` / `BUILD-WINDOWS.ps1` that clone the specific integration branch, copy 12 media, perform Windows checks and build an **unsigned NSIS installer**. **GitHub connector is text-only for direct file create/update; it cannot move these ~19MB of actual chat-uploaded binary payloads into the repo**. This ZIP is the actual handoff for the media bytes; do not pretend an installer with them already exists in GitHub CI.

## Game UI integration

[Draft PR #308](https://github.com/Plegyer/Text/pull/308) on branch `lead/integrate-today-media-smoke-5gif-7mp3-v1`: `src/ui/mediaSmoke.ts` maps the exact five frames and seven contextual MP3s; `src/ui/media-smoke.css` styles preview; `src/ui/app.ts` adds a menu control `🎞 5 GIF + 7 MP3`, top HUD sound toggle and explicit-game-command contextual music. The slideshow auto-opens only after actual first `arrival` and only if `01-animal.gif` can be loaded from the packaged app. It is preview/presentation **NOT five independent fully scripted engine quests**; no game save altered by the media overlay. `src/ui/index.html` and `scripts/build.mjs` ship CSS and include copied `assets/smoke/` if present locally. `tests/media-smoke-catalog-contract.test.ts` verifies scene order, track presence, opt-in hooks. **PR #308 CI [#37913762207](https://github.com/Plegyer/Text/actions/runs/37913762207) initially RUNNING**; fetch exact results and do not merge blindly. This media feature requires the ZIP files in local build, because repo holds only source wiring.

## Safety, distribution, user-facing tests

- Recognisable third-party GIF art (especially superhero scene and unrelated live-action people) is a **temporary smoke placeholder**, *not a cleared/licensed public 1.0 asset*. Sound rights also must be clarified before public distribution. Do **not** upload/ship these clips in public release until clear rights; do not equate user testing permission with licensed distribution.
- User's today smoke should distinguish: (a) standalone HTML asset decode (b) real Electron with media files copied into `assets/smoke` and packaged into NSIS (c) actual installed GUI launch/MP3/SFX/state save. ZIP standalone HTML is **not** application-level evidence.
- Packaging on the existing CI without copied user binaries will **not** prove those binaries present. Need locally bundled Windows setup from attached ZIP script and actual human test to call `INSTALLED GUI` PASS.
- No new Chat4 GIF list duplication: Chat4's separate inventory work remains independent from today's 12-upload smoke integration.
- Continue preservation of `LEADER1_KNOWLEDGE_LIBRARY_CURRENT.md` and `CURRENT_LEADER1_CHECKPOINT.md` after verdict. Preserve prior merged source `daf8105005367811c53a248c186dab71d67d96d1` with certified 1357 PASS/0 FAIL; media candidate source must meet its own exact CI first.
