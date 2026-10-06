# Chat 5 — Windows Release Preflight Refresh v37

Status: **PREFLIGHT REFRESH COMPLETE — READY FOR FINAL PACKAGING GATE**  
Owner: Chat 5  
Branch: `chat5/windows-release-preflight-v37`

Scope: release-process review only.

No runtime changes.  
No full CI.

## Sources reviewed

Primary checklist:

`mindy-successor/docs/qa-prep/WINDOWS_RELEASE_CHECKLIST_v1.md`

Final merge/regression sequence:

`CHAT5_FINAL_MERGE_AND_REGRESSION_SEQUENCE_v36.md`

Final combined save matrix:

`CHAT5_FINAL_COMBINED_SAVE_MATRIX_v29.md`

Current packaging/runtime source:

- `package.json`
- `scripts/build.mjs`
- `desktop/main.cjs`
- `desktop/preload.cjs`
- `desktop/save-store.cjs`

## Current package contract

Current package source declares:

- Node >= 22.18.0;
- Electron 44.4.3;
- Electron Builder 26.15.3;
- appId `game.portal-life.desktop`;
- productName `Portal Life`;
- current package version `0.1.0`;
- NSIS x64 target;
- interactive installer;
- installation-directory choice enabled;
- output directory `release/`.

`npm run dist:win` is:

```text
npm run check && electron-builder --win nsis --x64
```

Therefore a successful `dist:win` already includes:

- typecheck;
- validation;
- build;
- tests.

The Electron Builder file set is currently:

- `dist/**/*`
- `desktop/**/*`
- `package.json`

`scripts/build.mjs` builds/copies:

- `dist/content.json`;
- `dist/app.js`;
- `dist/save-validator.cjs`;
- `dist/index.html`;
- `dist/style.css`;
- complete `assets/` -> `dist/assets/`.

Desktop runtime loads:

- packaged `dist/content.json`;
- packaged `dist/save-validator.cjs`;
- packaged `dist/index.html`;
- packaged preload/save store.

This supports the existing no-source-tree/offline release design.

---

# 1. Existing checklist strengths

The existing Windows checklist already correctly separates:

1. source-tree correctness;
2. package production;
3. installed-app behavior;
4. clean-machine behavior;
5. persistence/recovery;
6. media packaging;
7. no-development-path behavior;
8. representative product smoke.

Keep these boundaries.

In particular, do not waive:

- clean-machine launch;
- save persistence;
- backup recovery;
- both-corrupt safe failure;
- installer-update compatibility;
- no-source-tree/offline launch;
- missing-media mechanical neutrality.

A green source-tree test suite is not evidence for any of those.

---

# 2. Missing gate W1 — stale installer/artifact prevention

Current checklist says:

> at least one expected installer artifact exists under release/

That is insufficient if `release/` already contains an older installer.

## Required pre-build rule

Before `npm run dist:win`:

- record the exact source SHA;
- verify working tree clean;
- remove or archive prior release artifacts from `release/`;
- ensure the output location used for this candidate contains no older installer that could be mistaken for the new build.

After build:

- enumerate newly produced installer artifacts;
- record exact filename;
- record byte size;
- compute SHA-256 immediately;
- record build completion timestamp;
- never infer candidate identity only from "an .exe exists".

If multiple legitimate artifacts are produced, record all and identify which one is the release candidate.

## Why required

Without a clean/stamped artifact boundary, a failed Electron Builder run could leave an old installer present and the checklist could accidentally hash/test the stale file.

This is a real release-evidence gap.

---

# 3. Missing gate W2 — intentional release identity/version freeze

Current package metadata reports:

`version: 0.1.0`

The release process is being described as final 1.0.

No accepted source reviewed here defines a different final package version string.

Therefore the packaging gate must explicitly record and approve:

- source SHA;
- `appId`;
- `productName`;
- package version;
- produced installer filename;
- installed application identity.

## Rule

Do not silently rename an installer or describe it as "1.0" while its embedded/package identity remains an unreviewed `0.1.0`.

Before final packaging, Leader/release owner must either:

- confirm that the current version is intentionally the release identity; or
- authorize/update the version through the normal source change + CI path.

This is an identity/provenance gate, not a request to change runtime in this branch.

Any version change after exact-main green creates a new source candidate and must pass the appropriate source gates again.

---

# 4. Missing gate W3 — exact SHA -> installer provenance chain

The checklist records source SHA and installer hash, but final evidence should make the chain explicit:

```text
exact-main-green SHA
  ->
clean checkout of same SHA
  ->
npm ci
  ->
dist:win
  ->
new installer artifact
  ->
SHA-256
  ->
same hash on every test machine
```

Required:

- packaging checkout SHA equals the final exact-main-green source candidate;
- no source edit after checkout;
- no release-only manual edit under `dist/` or `desktop/`;
- hash is recomputed after transfer to clean machine;
- hash must match the build record.

If source changes after package creation, the installer is invalidated even if its own smoke tests passed.

---

# 5. Missing gate W4 — test-environment / userData isolation

Persistence tests share:

`app.getPath('userData')/saves`

with files:

- `save-v1.json`;
- `save-v1.json.bak`;
- temporary `save-v1.json.tmp`.

Release evidence must record the actual userData path from the installed candidate.

Before each destructive persistence scenario:

- preserve or reset the test save directory intentionally;
- identify which scenario owns the primary/backup files;
- do not let a prior smoke test accidentally supply the backup for the next scenario.

Recommended scenario order:

1. fresh install/fresh save;
2. second valid save creates known-good backup;
3. normal relaunch;
4. corrupt-primary recovery;
5. restore known baseline;
6. corrupt-primary+backup safe failure;
7. rapid-save/atomic-write stress;
8. installer-update migration.

This prevents false passes caused by leftover backup state.

---

# 6. Save-store behavior the checklist must test exactly

Current desktop save store does the following.

## Save

On every queued save:

1. validate new text;
2. create save directory;
3. read current primary if present;
4. copy current primary to backup only if the current primary validates;
5. write new text to `.tmp`;
6. sync the temp file;
7. rename temp -> primary.

Save operations are serialized through an internal promise queue.

## Read

Load order:

1. try primary and validate;
2. if primary fails, try backup and validate;
3. if both are absent, return no save;
4. if neither usable, throw without changing files.

Backup recovery returns:

`recovered: true`

UI currently surfaces this through localized:

`ui.save.backupRecovered`

## Required release observations

### Primary healthy

- primary loads;
- `recovered=false`.

### Primary corrupt / backup healthy

- backup loads;
- `recovered=true`;
- localized recovery message is visible;
- corrupt primary is **not** silently overwritten merely by the read operation.

### Both corrupt/incompatible

- load fails safely;
- primary and backup remain available for forensic recovery;
- app does not bless either corrupt source as valid;
- failure is player-readable, not a raw crash/key.

### Rapid saves

- final accepted primary parses;
- no accepted truncated JSON;
- successful completion leaves no authoritative `.tmp` in place of the primary;
- backup remains the previous known-good save, not a copy of an already-invalid primary.

Do not require automatic primary self-healing from backup: the current store does not promise that behavior.

---

# 7. Missing gate W5 — packaged validator/content identity

Installed desktop startup reads:

- `../dist/content.json`
- `../dist/save-validator.cjs`

from the packaged application.

A release candidate should prove that the installed app is using these packaged resources, not a source checkout.

The existing clean-machine/no-development-path test covers most of this behaviorally.

Add one explicit evidence item:

- load a valid save that requires current final schema/content IDs;
- then load an intentionally incompatible/invalid save;
- confirm packaged validation accepts/rejects them correctly while the source checkout is unavailable.

This is stronger than merely checking that the app window opens.

No ASAR unpacking is required as a release gate if behavior proves packaged validator/content use.

---

# 8. Installer update gate refinement

The existing checklist correctly requires update compatibility but needs exact provenance fields.

Record:

## Previous installed build

- source SHA;
- package version;
- appId;
- installer hash.

## Save created by previous build

- fixture identity;
- schema version;
- meaningful persisted state.

## Final candidate

- source SHA;
- package version;
- installer hash.

Required:

- install final candidate over prior compatible install;
- same app/userData identity is used intentionally;
- old save loads through final migration;
- no duplicate rewards/payments/calendar effects;
- final save after load is valid;
- relaunch final candidate and load again.

Use a representative mixed state when feasible, not only a fresh blank save.

---

# 9. Media packaging gate refinement

The current checklist is correct that source-tree media existence is insufficient.

Installed candidate must prove packaged paths.

Keep representative checks for:

- ordinary career media;
- milestone/relationship media;
- Activity media;
- ending media;
- at least one animated GIF;
- optional missing image/GIF fallback;
- missing video behavior observation.

## Add

Record the exact presentation/media stable ID used in each smoke.

This makes a failed package path traceable to:

- content mapping;
- build copy;
- packaged path;
- renderer fallback.

## Do not duplicate

It is not necessary to manually exercise every media mapping after final source validation and presentation source-integrity tests are green.

Use representative packaged-runtime samples across file/type families.

---

# 10. Path with spaces / non-ASCII

Keep as a mandatory installed-build test.

Recommended:

- choose a custom install directory containing both a space and non-ASCII characters;
- launch from the installed shortcut/executable;
- exercise save/reload and one media path from that install.

Do not count installer completion alone.

This tests both install path and runtime path handling.

---

# 11. No-source-tree / offline launch

The clean-machine gate remains the strongest evidence.

Required clean-machine conditions:

- no project checkout;
- no Node/npm;
- no Git dependency;
- no dev server;
- network disconnected for primary smoke.

Pass requires:

- install;
- launch;
- content load;
- save/load;
- packaged validation;
- representative media;
- gameplay action.

## Duplicate reduction

The existing additional "rename/move the original checkout on build machine" test is useful diagnostics but is redundant as a **release blocker** once a genuine clean machine with no source tree passes.

Keep it optional/diagnostic.

Clean-machine evidence is authoritative.

---

# 12. Duplicate gate D1 — standalone npm run check immediately before dist:win

The final source candidate already requires exact-main CI green.

On the packaging machine:

`npm run dist:win`

itself starts with:

`npm run check`.

Therefore this sequence:

```text
npm run check
npm run dist:win
```

runs the same full source check twice back-to-back if no source/dependency state changes between commands.

## Recommended release flow

On exact clean checkout:

```text
npm ci
npm run dist:win
```

Archive the nested `npm run check` output from `dist:win`.

Run standalone `npm run check` first only when:

- diagnosing the packaging machine;
- validating a suspected source/environment issue;
- source has changed since last authoritative check.

Do not count two identical back-to-back checks as two independent release gates.

---

# 13. Duplicate gate D2 — npm start as mandatory release proof

`npm start` proves the development Electron launch path.

It does not prove:

- installer contents;
- installed paths;
- no-source-tree behavior;
- clean-machine behavior.

A successful installed-app/clean-machine smoke is strictly stronger for release packaging.

## Recommendation

Keep `npm start` as:

- optional pre-package diagnostic;
- developer smoke.

Do not make final 1.0 GO depend on a second development-mode smoke if:

- source CI is green;
- `dist:win` nested check is green;
- installed candidate and clean-machine gates are green.

---

# 14. Duplicate gate D3 — repeated persistence scenarios on multiple machines

Do not execute the full corruption/backup/update matrix independently on both:

- build machine;
- clean machine.

Partition:

## Build machine

Prove:

- installer works;
- default install;
- non-ASCII/space install path;
- basic installed launch/save/reload;
- uninstall safety.

## Clean machine / dedicated release VM

Own the authoritative deep persistence gate:

- primary;
- backup;
- corrupt primary;
- both corrupt;
- rapid saves;
- mixed-state reload;
- update compatibility;
- offline/no-source-tree.

This keeps one authoritative evidence set for destructive save scenarios.

---

# 15. Duplicate gate D4 — check:package

Current package exposes:

`npm run check:package`

This script is **not** a general release-package validator.

It expects a historical DS-001 ... DS-007 task contract and validates allowed task files/content boundaries.

Do not add it to the final Windows release gate.

It would not prove installer correctness and could create a false requirement unrelated to 1.0 packaging.

---

# 16. Final packaged Windows gate — refreshed minimal form

After Stage 5 exact-main is green and the source candidate is frozen:

## P0 — identity

- [ ] exact main SHA recorded;
- [ ] working tree clean;
- [ ] final appId/productName/package-version identity intentionally approved;
- [ ] Node/npm/Windows build environment recorded.

## P1 — clean package output

- [ ] old `release/` artifacts removed/archived;
- [ ] `npm ci`;
- [ ] `npm run dist:win`;
- [ ] nested `npm run check` PASS;
- [ ] Electron Builder NSIS x64 PASS.

## P2 — artifact

- [ ] new installer filename;
- [ ] byte size;
- [ ] build timestamp;
- [ ] SHA-256;
- [ ] same hash after transfer.

## P3 — build-machine installed smoke

- [ ] default install;
- [ ] spaces/non-ASCII install;
- [ ] installed launch;
- [ ] basic save/reload;
- [ ] representative media;
- [ ] uninstall safety.

## P4 — clean-machine/offline

- [ ] no source/Node/npm/Git;
- [ ] offline launch;
- [ ] gameplay/content load;
- [ ] packaged save validation;
- [ ] representative media.

## P5 — persistence

- [ ] healthy primary;
- [ ] known-good backup;
- [ ] corrupt primary -> backup + recovery message;
- [ ] both corrupt -> safe failure, no overwrite;
- [ ] rapid saves remain parseable/atomic;
- [ ] mixed final-state close/reopen.

Recommended mixed state:

one D38 Specialist + one D39 Specialist with run-local usage in both families, if the final accepted D39 consumer decision supports that fixture.

## P6 — update

- [ ] prior compatible installer identity recorded;
- [ ] representative prior save;
- [ ] final installer update;
- [ ] migration/load;
- [ ] save again;
- [ ] relaunch/load again.

## P7 — media/fallback

- [ ] representative packaged SVG/image;
- [ ] GIF animation;
- [ ] ending media;
- [ ] missing optional image/GIF neutral fallback;
- [ ] missing video behavior recorded;
- [ ] no mechanical state change from optional media failure.

## P8 — manual player-facing

Use final Chat 6 manual matrix:

- [ ] RU/EN;
- [ ] Night;
- [ ] Secret Debt;
- [ ] Activity;
- [ ] Palace;
- [ ] endings;
- [ ] alt/captions;
- [ ] no raw keys;
- [ ] no retired live labels.

---

# 17. Current release-specific dependency note

Current Leader state has accepted a real D39 blocker:

Formal Introduction has **no safe existing live consumer**.

Chat 3 is now preparing:

- Source Method mapping;
- minimal Formal Introduction authored seam proposal;
- D39 consumer decision packet.

Therefore Windows packaging must not begin merely because package tooling is ready.

The source-tree release candidate must first include the accepted resolution/decision and all five production stages must close through exact-main.

This is a source-release prerequisite, not a Windows packaging defect.

---

# 18. Disposition

The existing Windows checklist is fundamentally sound.

Required refreshes:

1. add stale-artifact prevention;
2. freeze intentional app/version identity;
3. make SHA -> installer provenance explicit;
4. isolate userData scenarios;
5. test packaged validator/content behavior;
6. make update provenance explicit.

Remove as duplicate release blockers:

- standalone `npm run check` immediately before `dist:win`;
- mandatory `npm start` after stronger installed/clean-machine evidence;
- full corruption matrix on multiple machines;
- historical `check:package`.

The final Windows gate should remain strict, but every required check should prove a distinct property.

**READY FOR FINAL WINDOWS RELEASE EXECUTION**
