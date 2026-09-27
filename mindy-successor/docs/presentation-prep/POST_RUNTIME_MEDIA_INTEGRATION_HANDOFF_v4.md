# Post-Runtime Media Integration Handoff v4

Scope:
Queue items 142–149 after the Lead localization and multi-GIF runtime milestones.

Current production evidence:
- PR #41 localization runtime merged;
- PR #42 deterministic multi-GIF runtime merged;
- PR42 merge commit: `55adc69dcda4c41c71548cd146756896fa5976d0`;
- PR42 final head: `41ebf0377c5b50b2ef298009562d5ba9fde56f18`;
- PR42 final exact-head `mindy-successor check`: **SUCCESS**;
- current main observed after merge: `f5c5edf71354c8e08acc202b9c2a1aa0d87c75a3`.

## 1. What PR42 now provides

Current-main presentation runtime supports:

- optional `pool` per semantic slot;
- pool version;
- ordered/unordered metadata;
- unweighted/weighted selection;
- exactly 3–5 GIF candidates;
- unique stable candidate keys;
- optional positive finite presentation weights;
- `primary + pool` ambiguity rejection;
- deterministic selection using:
  - presentationId;
  - occurrenceKey;
  - pool version;
- selected candidate placed first;
- remaining candidates retained as fallback order;
- static animation-off fallback;
- existing semantic fallback;
- no gameplay RNG required;
- no Save migration.

This closes the core runtime gap identified by Chat 2.

## 2. Current asset reality

Prototype asset tree currently contains:
- static SVG fallbacks;
- **0 real .gif files**.

Therefore all GIF paths authored in items 144–147 are staging placeholders under:

`assets/staging/non-shipped/...`

They are not shipped assets.

### Ledger totals

From:
`RU_EN_MULTI_GIF_ASSET_READINESS_LEDGER_v1.md`

- ledger pool rows: 59;
- real GIF candidates: 0;
- placeholder references: 179;
- RU alt authoring: complete for staging candidates;
- EN alt authoring: complete for staging candidates;
- static fallback: complete.

Because item 144 duplicates representative pools also covered by 145–147:

Unique subsystem adoption scope is:
- 40 career seasonal pools;
- 10 poverty pools;
- 3 reachable School pools;
- **53 unique semantic pools**.

Unique adoption candidate references:
- 120 career;
- 30 poverty;
- 11 School;
- **161 candidate references**.

## 3. What can be selectively integrated immediately

### Safe immediately — docs / authoring metadata

These may be copied now for Lead review/use:
- coverage matrix;
- staging manifests;
- RU+EN alt metadata;
- localization references;
- readiness ledger;
- contract test.

They do not mutate gameplay.

### Safe immediately — static/localization text

Existing shipped static fallbacks remain active.

RU+EN localization strings/alt metadata may be integrated into the PR41 localization/catalog layer without activating placeholder GIFs.

### Safe immediately — contract test

`tests/multi-gif-production-patch-contract.test.ts`

may be selectively integrated and run against the target branch.

This worker handoff does not claim it was executed here.

### Not safe for active production yet

Do **not** activate any item-144–147 dynamic pool while its candidate paths still reference:
`assets/staging/non-shipped/`.

A valid path shape is not proof that a GIF file exists.

## 4. Representative first production patch — item 144

File:

`content/presentation-drafts/multi-gif-production-patch-v1.json`

Contains six PR42-compatible runtime patch pools:
- Lumber spring;
- Satyr Maid spring;
- Undead Farm spring;
- Tavern spring;
- poverty cold-rain event;
- generic reachable School after-lesson event.

Each has:
- 3 candidates;
- PR42-compatible `runtimePatch`;
- static fallback;
- RU+EN caption payload;
- RU+EN candidate alt payload;
- explicit PLACEHOLDER asset status.

### Integration readiness

**SCHEMA_READY**
but
**ASSET_BLOCKED**.

These six are the recommended first activation batch once 18 approved real GIFs, or an approved smaller reused file set mapped to the 18 candidate entries, exist.

## 5. Ten-career adoption — item 145

File:

`content/presentation-drafts/ten-career-pool-adoption-v2.json`

Coverage:
- 10 ordinary careers;
- 4 seasonal base shift slots each;
- 40 pools;
- 3 candidates each;
- 120 placeholder candidate references.

Every pool has:
- semantic presentationId;
- pool version;
- stable candidate keys;
- current static fallback;
- RU+EN alt;
- shared localization key;
- coverage status PLACEHOLDER.

### Production activation

Needs real GIFs first.

No Hard Work, relationship, milestone or ending surface is invented.

## 6. Ordinary poverty adoption — item 146

File:

`content/presentation-drafts/poverty-pool-adoption-v2.json`

Coverage:
- 10 PR37 event+variant semantic identities;
- 3 candidates each;
- 30 placeholder references.

Gameplay outcome policy is explicitly:

`FIXED_OUTSIDE_PRESENTATION`.

Media selection cannot alter:
- helpful/neutral/pressure identity;
- choices;
- effects;
- money/item reward;
- next-day modifiers.

### Production activation

Needs real GIFs first.

Static fallbacks already ship.

Secret Debt remains excluded.

## 7. Reachable School adoption — item 147

File:

`content/presentation-drafts/school-reachable-pool-adoption-v2.json`

Active pool candidates are prepared only for:
- generic post-School hook;
- generic School-life post-paid hook;
- exact Night-study hook.

Candidate counts:
- 3;
- 3;
- 5.

Total:
11 placeholder references.

Teacher/course-specific libraries remain:
`STAGED`

and do not own active runtime slots.

### Production activation

Reachable generic/Night pools need real GIFs first.

Teacher/course-specific pools additionally need safe routing before activation.

## 8. RU+EN localization coverage

### Shipped runtime seam

PR41 provides RU/EN text resolver with RU fallback.

### Staging authoring

Items 144–147 provide RU+EN alt authoring for every candidate.

Item 144 also provides bilingual caption payloads for the representative patch.

### Current PR42 media-alt shape

PR42 candidate schema still carries:

`alt: string`

not:

`alt: {ru,en}`.

Current UI renders `m.alt` directly.

Therefore bilingual alt must be materialized before rendering.

## 9. No-core-runtime-change localization path

No further `presentation.ts` change is required.

Recommended adapter:

```text
locale-neutral authoring manifest
-> PR41 resolveLocalizedText(...)
-> build in-memory PR42 Presentation patch for current locale
-> candidate alt:string is the resolved RU/EN value
-> resolvePresentation(...)
-> same candidate key/src selected
```

On locale switch:
- rebuild only presentation text/alt strings;
- keep presentationId;
- keep pool version;
- keep candidate keys;
- keep media paths;
- keep occurrenceKey;
- selection therefore remains identical.

This may be implemented in:
- UI presentation-patch materialization;
- presentation bundle loading adapter;
- another Lead-owned data seam.

It does **not** require changing the PR42 selector/schema.

## 10. Caption path

PR42 pool schema does not need a caption field.

Captions can remain PR41 localization keys resolved by UI using:

`loc/presentation/<presentationId>/caption`.

Keep caption localization separate from media selection.

## 11. Real-asset activation gate

Before an active pool is enabled:

1. candidate GIF file exists;
2. path is a managed production `assets/...gif` path;
3. candidate key stays stable;
4. RU alt approved;
5. EN alt approved;
6. static fallback remains valid;
7. pool size remains 3–5;
8. PR42 schema parses;
9. occurrence selection remains deterministic;
10. animations-off selects static fallback;
11. gameplay Save/RNG unchanged.

## 12. Placeholder replacement workflow

For one pool:

```text
assets/staging/non-shipped/.../1.gif
-> assets/presentation/.../approved-a.gif

assets/staging/non-shipped/.../2.gif
-> assets/presentation/.../approved-b.gif

assets/staging/non-shipped/.../3.gif
-> assets/presentation/.../approved-c.gif
```

Do not change:
- presentationId;
- candidate key unless visible semantic meaning changes;
- pool version unless replacement intentionally changes deterministic selection contract;
- gameplay IDs.

## 13. Reuse can reduce unique art count

The 161 unique adoption candidate references do not require 161 unique GIF files.

A real GIF may be reused if:
- visible meaning fits every mapped semantic slot;
- RU/EN alt is context-correct per mapping;
- candidate keys remain stable per pool;
- rollback remains understandable.

Do not count reuse until Product/art approves it.

## 14. Exact item 142–149 files

### Item 142
- `docs/presentation-prep/BILINGUAL_PRESENTATION_PRODUCTION_COVERAGE_v2.md`

### Item 143 context
- `docs/presentation-prep/LOCALIZATION_PRESENTATION_HANDOFF_v2.md`

### Item 144
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/multi-gif-production-patch-v1.json`

### Item 145
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/ten-career-pool-adoption-v2.json`

### Item 146
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/poverty-pool-adoption-v2.json`

### Item 147
- `prior-work/astra/prototype-m3.2/content/presentation-drafts/school-reachable-pool-adoption-v2.json`

### Item 148
- `docs/presentation-prep/RU_EN_MULTI_GIF_ASSET_READINESS_LEDGER_v1.md`

### Item 149
- `prior-work/astra/prototype-m3.2/tests/multi-gif-production-patch-contract.test.ts`

Worker branch is long-lived.

Selectively copy reviewed artifacts to fresh current-main integration work.

## 15. Recommended next production batches

### Batch A — first six semantic pools

Produce/approve real GIFs for item 144:
- four career spring shifts;
- one poverty pressure event;
- one School generic event.

Then:
- replace placeholder paths;
- integrate patch;
- run PR42/runtime + localization regression.

### Batch B — all career base shifts

Use:
- item 145 manifest;
- `TEN_CAREER_MEDIA_ALT_RU_EN_v1.md`;
- ordinary-work producer briefs.

Prioritize reuse to avoid commissioning 120 unique files unnecessarily.

### Batch C — poverty

Use:
- item 146 manifest;
- PR37 content;
- bilingual poverty producer briefs.

### Batch D — School

Use:
- item 147 reachable pools first.

Teacher/course-specific media remains staged.

## 16. CI / test expectation

PR42 final head is green.

Any selective non-doc integration should still run exact-head:
`npm run check`

on the actual integration commit.

Do not transfer PR42's green status to new media/content commits automatically.

## Final disposition

### Runtime
**READY / MERGED**

### RU+EN authoring
**READY for staged pools**

### Static fallbacks
**READY / SHIPPED**

### Real GIF assets
**NOT READY — 0 current GIF files**

### Active dynamic pool integration
**BLOCKED ON REAL ASSETS**

After real GIFs exist, PR42 means the media adoption path is primarily data/assets/localization work, not another core presentation-runtime change.
