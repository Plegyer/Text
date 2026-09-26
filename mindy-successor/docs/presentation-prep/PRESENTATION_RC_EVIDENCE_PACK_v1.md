# Presentation RC Evidence Pack v1

Status: minimal final Lead handoff for the presentation layer.

This pack intentionally avoids re-integrating every historical Chat 2 artifact. It selects the smallest current evidence set that protects shipped RC behavior while keeping optional media polish and unfinished product authoring separate.

Machine-readable source:

`prior-work/astra/prototype-m3.2/content/presentation-rc-evidence-pack.fixture.json`

## Tests worth integrating

Recommended minimal executable set:

1. `presentation-central-stage-interaction.test.ts` — one logical central stage; gameplay flow state owns blocking.
2. `presentation-save-reload-adversarial.test.ts` — semantic identity across result/pending/School/Night/Activity/ending boundaries without GIF timing state.
3. `presentation-activity-option-save.test.ts` — PR22 legacy/v1 Activity option-state compatibility.
4. `presentation-production-fallback-release.test.ts` — current static fallback release coverage.
5. `presentation-pr24-one-save-audit.test.ts` — visible presentation boundaries across the Lead one-Save shipped RC path.
6. `presentation-semantic-coverage-checksum.test.ts` — deterministic 26-ID RC semantic set and rename guard.
7. `presentation-route-challenge-collision.test.ts` — safe naming preflight for future Forest families.
8. `presentation-override-rollback.test.ts` — deterministic removal of bad overrides and restoration of shipped fallback.

This subset is intentionally smaller than the full branch history.

## Docs worth indexing

Index these four:

- `PRESENTATION_RELEASE_GATE_v1.md`;
- `PRESENTATION_PR24_ONE_SAVE_AUDIT_v1.md`;
- `PRESENTATION_ASSET_BACKLOG_PRIORITY_v1.md`;
- `PRESENTATION_OVERRIDE_ROLLBACK_CONTRACT_v1.md`.

Together they cover release status, the longest shipped E2E presentation path, asset dependency priority and safe override recovery.

## Asset backlog

### RC-required missing assets

**None.**

Current Lumber, School, Night/town, Forest and ending presentation paths have static-safe coverage.

### Nice-to-have GIF backlog

Seven optional targets remain:

- four seasonal Lumber shift GIFs;
- accepted-hand milestone GIF;
- Foreman professional GIF;
- Foreman professional Night GIF.

They are post-release polish unless separately scheduled.

## Authoring-blocked presentation specialization

Do not invent final exact IDs/lore/assets for:

- logging-road-specific visual variants;
- hunter-trail presentation;
- Old Boundary-specific visual variants;
- navigation challenge;
- physical obstacle;
- interpretation / ritual anomaly;
- School management/accounting public result.

The generic shipped semantic/fallback surface remains safe while these are unfinished.

Presentation readiness does not close their gameplay/content authoring status.

## Superseded artifacts

Do not make older handoff/readiness/smoke layers mandatory alongside the final set.

Notably superseded:

- release readiness v1;
- release-candidate handoff v2;
- final integration handoff v3;
- pre-PR21 production smoke;
- broad PA scenario matrix;
- shipped closure inventory;
- pre-activation asset-consistency matrix.

They remain branch history/audit material only.

## Post-release-only work

Unless the release explicitly productizes external media replacement, defer:

- Future GIF drop-in package;
- override import/export contract;
- replacement-bundle migration;
- portable replacement-bundle/regression fixtures.

The shipped presentation resolver/editor foundations and safe static fallbacks are sufficient for the current RC.

## Final status

- central stage: protected;
- semantic identity/save compatibility: protected;
- PR22 Activity option compatibility: protected;
- current fallback assets: protected;
- PR24 one-Save presentation path: audited;
- optional GIF backlog: non-blocking;
- content-specific route/challenge presentation: authoring-blocked, not runtime-blocked;
- external replacement productization: post-release unless explicitly included.

No shared runtime/schema/UI change is requested by this final evidence pack.
