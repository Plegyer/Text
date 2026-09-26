# Windows Release Checklist v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Target: Windows x64 NSIS release candidate

## Baseline evidence

The current prototype package declares Node >=22.18.0, Electron 44.4.3, and Electron Builder 26.15.3. Its scripts are:

- **npm start** → build, then Electron;
- **npm run check** → typecheck + catalog validation + build + tests;
- **npm run dist:win** → npm run check, then electron-builder --win nsis --x64.

The builder configuration packages dist/**/*, desktop/**/* and package.json, with the installer written under release/. scripts/build.mjs copies the whole assets directory into dist/assets.

The A4-era repository status records npm run check green with 84/84 tests. The historical M3.2 status explicitly says the Windows installer was **not verified in that environment**, so no Windows install/run item below is pre-marked as passed.

## Release evidence record

For each candidate record the candidate commit SHA, Windows version/build, x64 architecture, Node/npm versions on the build machine, clean-machine identity, generated installer filename/size/SHA-256, npm run check summary, and screenshots/logs for start, install, first run, reload, media fallback and uninstall.

A release is not accepted from “build succeeded” alone. Packaging, clean-machine launch and persistence are separate gates.

## A. Source-tree preflight

- [ ] Checkout the exact release candidate commit; working tree is clean.
- [ ] Confirm the candidate includes completed A5/A6 and intended Product Acceptance content before calling this a product release.
- [ ] Confirm package-lock.json is present and install with npm ci, not an unconstrained dependency update.
- [ ] Run node --version; it satisfies the package engine requirement.
- [ ] Record the current test count; do not hard-code the A4 baseline of 84 after new packages add tests.
- [ ] Confirm no release-only manual edits exist under dist/; dist must be reproducible by the build script.
- [ ] Confirm all shipped presentation/media references intended for release use packaged relative assets/... paths or allowed embedded image data.

## B. Mandatory command gate

Run from mindy-successor/prior-work/astra/prototype-m3.2, or the successor runtime directory if the Lead has moved the package by release time.

### npm run check

- [ ] npm run typecheck exits 0.
- [ ] npm run validate exits 0 with no missing content/media references.
- [ ] npm run build exits 0 and creates fresh dist/index.html, dist/app.js, dist/save-validator.cjs, dist/content.json, dist/style.css, and dist/assets/.
- [ ] npm test exits 0 with zero failed acceptance-critical tests.
- [ ] Archive the complete command output in the release evidence record.

### npm start

- [ ] Application opens as an Electron window with no renderer fatal error.
- [ ] Fresh-run character creation is usable.
- [ ] Day/season/year, Energy and money are visible after entering play.
- [ ] A normal action changes state and saves successfully.
- [ ] Closing and reopening the development Electron app loads the same save.
- [ ] Central-stage image/GIF rendering works from dist/assets.
- [ ] DevTools/source-tree access is not required for ordinary play.

### npm run dist:win

- [ ] Command first re-runs the complete npm run check gate and remains green.
- [ ] Electron Builder completes the --win nsis --x64 target.
- [ ] At least one expected installer artifact exists under release/.
- [ ] Compute and record installer SHA-256 after build.
- [ ] Do not rename or mutate the installer after hashing without producing a new recorded hash.

## C. Installer smoke test on the build machine

- [ ] Launch the generated installer, not npm start.
- [ ] Interactive NSIS installation succeeds with the default location.
- [ ] Repeat installation to a custom path containing spaces and non-ASCII characters.
- [ ] Start the installed app from the installer-created launcher/Start menu entry.
- [ ] Application reaches character creation/loaded run without access to the source repository.
- [ ] Close/reopen the installed app and confirm save persistence.
- [ ] Uninstall succeeds without deleting unrelated user files.

## D. Clean-machine gate

Use a Windows x64 VM or physical machine with **no Git checkout, no Node.js, no npm, and no project source directory**.

- [ ] Transfer only the recorded installer.
- [ ] Verify the installer SHA-256 matches the build record.
- [ ] Disconnect network access for the primary offline smoke test.
- [ ] Install and launch successfully.
- [ ] Create a new run, perform an action, save/close, relaunch and recover the exact run.
- [ ] Exercise one blocking event and verify its pending scene survives relaunch.
- [ ] Exercise a normal paid night; relaunch after payment and verify no duplicate lodging charge.
- [ ] After A5 integration, enter Activity, relaunch inside it and verify no duplicate 2-Energy entry charge.
- [ ] After A6 integration, execute committed/reward checkpoints and verify reward idempotency.
- [ ] Confirm all tested functionality works while the original source folder is unavailable.

## E. Save persistence and recovery

The desktop main process currently creates its store under Electron app.getPath('userData')/saves. The store uses primary save-v1.json, backup save-v1.json.bak, and temporary atomic write save-v1.json.tmp.

Do not hard-code the absolute Windows userData path in the test; log the path from the running candidate or locate the app-specific userData directory after first save.

- [ ] Normal save creates/updates the primary.
- [ ] Second valid save keeps a known-good backup.
- [ ] Relaunch reads the valid primary.
- [ ] Corrupt the primary only; relaunch recovers the valid backup and exposes a recovery indication where the UI supports it.
- [ ] Corrupt both primary and backup; app stops loading that run and does not overwrite either corrupted source as if it were valid.
- [ ] Rapid consecutive saves do not leave a partial/truncated successful state.
- [ ] Save remains valid after installer update over the previous installation.
- [ ] Uninstall/reinstall persistence behavior is explicitly recorded; do not assume whether userData should be removed unless a product decision says so.

## F. GIF / image / video asset path gate

Current source evidence shows that presentation sources accept local assets/... files for SVG/PNG/JPEG/WebP/GIF/MP4/WebM; the build copies assets into dist/assets; the renderer uses relative media src paths; images/GIFs have an onerror missing-art fallback in the A4-era renderer; and a scene with no resolved media uses a generic missing-art placeholder.

Execute on the **installed** app:

- [ ] Ordinary Lumber shift media resolves from packaged files.
- [ ] Career milestone media resolves.
- [ ] Foreman relationship media resolves.
- [ ] Forest Activity media resolves.
- [ ] Ending media resolves.
- [ ] At least one real GIF animates after install and after relaunch.
- [ ] Temporarily use an acceptance override/reference to a missing optional GIF path; the scene remains usable and shows the missing-art fallback rather than a broken control.
- [ ] Missing optional media does not change mechanical result, choices, money, Energy, progression or reward.
- [ ] Exercise a missing video path separately. The current A4-era source review did not find a dedicated video onerror fallback, so this must be observed rather than assumed.
- [ ] Remove the acceptance-only broken-media override after the test and confirm normal media returns.

## G. No development-path dependency gate

The clean-machine test is the primary proof. Add these targeted checks:

- [ ] Rename or move the original source checkout after building; installed app still launches.
- [ ] Search packaged runtime logs/errors for absolute build-machine paths such as drive-letter paths pointing into the checkout.
- [ ] The installed app does not try to load src/, content/, or top-level source assets/; runtime content comes from packaged dist/desktop resources.
- [ ] No localhost, development web server, npm script, TypeScript source file or Git repository is needed at runtime.
- [ ] Save validation works in packaged desktop mode using bundled dist/save-validator.cjs.
- [ ] Offline launch succeeds.

## H. Product-acceptance smoke on installed build

Do not repeat the whole exhaustive product plan here, but execute one representative vertical path:

- [ ] Lumber ordinary shift.
- [ ] Reactive milestone/relationship scene.
- [ ] School trigger without extra Work refresh.
- [ ] Paid normal night + optional relationship night.
- [ ] Forest Activity save/reload and item capability.
- [ ] Two eligible endings without auto-completion.
- [ ] Explicit ending commitment/completion.
- [ ] New Run with visible Meta difference.

All money/Energy/calendar deltas must match PRODUCT_ACCEPTANCE_EXECUTION_PLAN_v1.md.

## Release disposition

Record each failed item with exact candidate SHA, exact command/action, expected result, observed result, log/screenshot/save fixture, and whether it is an implementation defect, content defect, packaging defect or only missing evidence.

Do not waive clean-machine, save persistence, missing-media fallback or no-development-path checks merely because npm run check is green.
