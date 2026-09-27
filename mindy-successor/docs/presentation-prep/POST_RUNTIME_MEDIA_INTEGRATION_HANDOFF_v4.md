# Post-Runtime Media Integration Handoff v4

Current production baseline:
- PR #41 — RU/EN localization runtime — merged;
- PR #42 — deterministic 3–5 GIF presentation pools — merged;
- PR42 merge: `55adc69dcda4c41c71548cd146756896fa5976d0`;
- PR42 head: `41ebf0377c5b50b2ef298009562d5ba9fde56f18`;
- exact-head workflow: **SUCCESS**;
- current main observed during this queue: `f5c5edf71354c8e08acc202b9c2a1aa0d87c75a3`.

PR42 already supplies:
- pool size 3..5;
- unique stable candidate keys;
- ordered/unordered pool mode;
- unweighted/weighted presentation-only selection;
- deterministic `presentationId + occurrenceKey + poolVersion` selection;
- no gameplay RNG;
- no Save migration;
- animations-off static fallback;
- old primary/static compatibility.

No further shared runtime change is required for the staging/adoption artifacts in items 144–149.

---

# 1. Current real-asset state

Current-main prototype tree contains:

**0 real `.gif` files.**

Therefore:
- no new multi-GIF pool in items 144–147 is production-media-ready;
- every staged GIF path is a placeholder;
- placeholders must never be counted as shipped assets;
- existing static SVG fallbacks remain the only real media coverage for these new pools.

This is an art/animation production gap, not a runtime/gameplay gap.

---

# 2. Item 142 — bilingual production coverage

File:

`docs/presentation-prep/BILINGUAL_PRESENTATION_PRODUCTION_COVERAGE_v2.md`

Key status after PR41:
- town/HUD shell: `SHIPPED_RU_EN`;
- 10 ordinary career Work labels/descriptions: `SHIPPED_RU_EN`;
- deeper School/Forest/Night UI: mixed `RU_FALLBACK`;
- career seasonal/result presentation text: `STAGED_RU_EN`;
- ordinary poverty presentation localization: `STAGED_RU_EN`;
- multi-GIF alt/captions: `STAGED_RU_EN`;
- full Forest Activity/endings: still not fully migrated.

PR41 localization bundle at the audited point:
- 56 active keys;
- 0 missing EN values.

---

# 3. Item 144 — representative PR42 staging patch

File:

`prior-work/astra/prototype-m3.2/content/presentation-drafts/multi-gif-production-patch-v1.json`

Representative pools:
- Lumber spring;
- Satyr Maid spring;
- Undead Farm spring;
- Tavern spring;
- poverty cold-rain event;
- generic post-School event.

The nested `presentationPatch` uses the exact PR42 runtime pool shape.

Each pool contains:
- 3 stable GIF candidate keys;
- runtime-compatible `assets/...gif` path shape;
- real static SVG fallback;
- RU+EN localization references/payloads outside gameplay/runtime identity.

All 18 GIF paths are explicitly under:

`assets/staging/non-shipped/`

Status:
**STRUCTURALLY READY / ASSET BLOCKED**.

Do not apply this patch as production until every placeholder path is replaced by a real managed GIF.

---

# 4. Item 145 — all 10 career adoption manifest

File:

`prior-work/astra/prototype-m3.2/content/presentation-drafts/ten-career-pool-adoption-v2.json`

Coverage:
- 10 ordinary careers;
- 40 seasonal shift pools;
- 10 stable result/default pools;
- total: **50 pools**.

Every entry contains:
- shipped semantic presentationId;
- PR42-compatible runtime slot;
- pool version;
- 3 stable candidate keys;
- shipped static fallback;
- RU+EN alt localization key requirements;
- coverage status.

Current status:
- `REAL_ASSET_READY`: 0;
- `PLACEHOLDER`: 50;
- `NEEDS_ART`: 0.

No Hard Work, relationship or event IDs were invented.

### Immediate selective integration

Can be integrated immediately:
- localization key/data definitions;
- static fallback metadata;
- semantic coverage metadata;
- tests/docs.

Cannot be activated as production GIF overrides yet:
- all 50 pool overrides, because all 150 GIF candidate paths are placeholders.

---

# 5. Item 146 — ordinary poverty adoption manifest

File:

`prior-work/astra/prototype-m3.2/content/presentation-drafts/poverty-pool-adoption-v2.json`

Coverage:
- 3 street;
- 1 cheap lodging;
- 3 recovery/help;
- 3 pressure/bad-luck;
- total: **10 PR37 production pools**.

Each pool:
- is keyed by already-authored event+variant semantic identity;
- uses PR42-compatible 3-candidate shape;
- preserves static fallback;
- declares RU+EN alt localization keys;
- is marked `PLACEHOLDER`.

Hard invariant:
media selection cannot change:
- helpful/neutral/pressure gameplay meaning;
- choice;
- effect;
- reward;
- next-day modifier.

Secret Debt remains excluded.

### Immediate selective integration

Ready now:
- localization strings/keys;
- static fallback mapping;
- presentation metadata.

Blocked on real GIF files:
- all 10 dynamic pools.

---

# 6. Item 147 — reachable School adoption manifest

File:

`prior-work/astra/prototype-m3.2/content/presentation-drafts/school-reachable-pool-adoption-v2.json`

Reachable pools:
1. generic after-School;
2. generic after-paid-lesson;
3. exact Night-study post-event.

All 3 use:
- PR42-compatible 3-candidate pool shape;
- `assets/stage-school.svg` static fallback;
- RU+EN alt localization references;
- placeholder GIF paths.

Teacher libraries:
- 8 teacher media identities remain explicitly `STAGED`.

Course-specific routing:
- remains `STAGED` until an exact paid-course bridge exists.

### Immediate selective integration

Ready now:
- localized reachable-event text;
- localization keys;
- static fallback metadata.

Blocked on real GIF files:
- all 3 dynamic School pools.

Do not activate staged teacher/course pools through generic School routing.

---

# 7. Item 148 — asset readiness ledger

File:

`docs/presentation-prep/RU_EN_MULTI_GIF_ASSET_READINESS_LEDGER_v1.md`

Ledger rows:
- Item 144: 6;
- Item 145: 50;
- Item 146: 10;
- Item 147: 3;
- total manifest rows: **69**.

Candidate accounting:
- real GIF candidates: **0**;
- placeholder candidate references: **207**;
- production-ready dynamic pools: **0**.

Duplicate semantic IDs in the ledger are intentional where Item 144 overlaps subsystem manifests.

All static fallbacks are real shipped assets.

---

# 8. Item 149 — staging contract test

File:

`prior-work/astra/prototype-m3.2/tests/multi-gif-production-patch-contract.test.ts`

The Chat 2 branch is long-lived and does not itself contain PR42 runtime.

Therefore this test is self-contained and mirrors exact PR42 constraints rather than pretending the stale branch runtime already owns `pool`.

It validates:
- pool size 3..5;
- version bounds;
- ordering/selection policy;
- unique candidate keys;
- GIF source shape;
- static fallback shape;
- locale-neutral IDs/keys/paths;
- RU+EN localization coverage declarations;
- placeholder marking;
- no gameplay conditions/effects/rewards;
- poverty outcome independence;
- staged School teacher/course routing;
- no invented career Hard Work/relationship surfaces.

On selective integration to fresh main, Lead may additionally add direct:
`presentationSchema.parse(...)`
assertions against PR42.

---

# 9. Which pools can be integrated immediately?

## As active dynamic GIF pools

**None.**

Reason:
current main contains zero real GIF files and every candidate path in items 144–147 is a staging placeholder.

## As non-media production data

The following can be selectively integrated now without any runtime change:
- RU+EN localization strings;
- localization keys;
- presentation captions;
- static fallback alt;
- semantic mapping metadata;
- PR42 contract tests;
- accessibility metadata.

## After real GIF files arrive

A pool becomes eligible for production activation when:
1. at least 3 candidate GIFs physically exist;
2. paths replace `assets/staging/non-shipped/`;
3. RU+EN alt is available;
4. semantic target exists;
5. PR42 schema validation passes;
6. exact-head CI is green.

---

# 10. Recommended first real media batch

When art delivers real GIFs, use this order:

### Batch A — starter trio spring
- `job/lumber/shift/spring/default`
- `job/satyr-maid/shift/spring/default`
- `job/undead-farm/shift/spring/default`

Why:
- shipped semantic identities;
- stable static fallbacks;
- high repeatability;
- already-prepared RU+EN text/alt;
- no new gameplay decision required.

### Batch B — Tavern spring
- `job/tavern/shift/spring/default`

Useful as a remaining-seven adoption proof.

### Batch C — ordinary poverty
Start with:
- `location/town/event/poverty-pressure-production-cold-rain/default`

Then expand to the other nine PR37 event surfaces.

### Batch D — School generic
Start with:
- `location/town/event/school-lesson-content-v1-after-school/default`

Then:
- after-paid-lesson;
- after-night-study.

Teacher-specific content remains staged.

---

# 11. No-runtime-change path after PR42

After real GIF delivery, Lead does not need another presentation runtime feature.

Production integration can be:

1. add real GIF files under managed `assets/`;
2. add/update PR41 localization entries for caption/alt;
3. copy reviewed PR42 slot overrides;
4. keep static fallbacks;
5. validate semantic targets;
6. run presentation pool tests;
7. run locale-switch tests;
8. run full `npm run check`;
9. require exact-head CI;
10. merge.

No:
- new gameplay schema;
- Save migration;
- gameplay RNG;
- event duplication;
- locale-specific media identity

is required.

---

# 12. Localization integration

PR41 already resolves RU/EN.

Remaining presentation-specific seam is mostly data wiring:
- candidate/static alt currently enters PR42 as `alt:string`;
- authoring uses locale-neutral localization keys;
- production integration should resolve the active locale's alt before/at render boundary.

Locale must not be included in:
- occurrenceKey;
- pool version;
- candidate key;
- media path.

Same occurrence:
RU -> EN must keep the same selected candidate.

---

# 13. Exact selective-integration files from this wave

## Docs
- `docs/presentation-prep/BILINGUAL_PRESENTATION_PRODUCTION_COVERAGE_v2.md`
- `docs/presentation-prep/LOCALIZATION_PRESENTATION_HANDOFF_v2.md`
- `docs/presentation-prep/RU_EN_MULTI_GIF_ASSET_READINESS_LEDGER_v1.md`
- `docs/presentation-prep/POST_RUNTIME_MEDIA_INTEGRATION_HANDOFF_v4.md`

## Staging manifests
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/multi-gif-production-patch-v1.json`
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/ten-career-pool-adoption-v2.json`
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/poverty-pool-adoption-v2.json`
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/school-reachable-pool-adoption-v2.json`

## Test
- `prior-work/astra/prototype-m3.2/tests/multi-gif-production-patch-contract.test.ts`

---

# 14. Integration safety

Worker branch is long-lived.

Do not merge wholesale.

Selectively copy reviewed artifacts onto a fresh branch from current main.

Before activating any pool:
- replace all placeholder GIF paths;
- confirm physical files exist;
- ensure localization keys are integrated;
- run exact-head CI.

## Final status

Runtime blockers:
**NONE** for deterministic multi-GIF or RU/EN localization.

Current blocker for these pool manifests:
**real GIF asset production**.

Static/text fallback keeps the game playable and presentation-safe while those assets are absent.
