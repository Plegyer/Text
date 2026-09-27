# Multi-GIF Adoption Handoff v3

Status: Lead-facing adoption packet for Queue items 116–123.

Current main observed at handoff:
`f880915a8103287f5fd2fff2c537baffeeec7140`.

Production milestones already merged:
- PR #36 — all 10 ordinary base careers;
- PR #37 — ordinary poverty production content;
- PR #38 — authored School production content and safe routing.

## Current Lead/runtime status

Current-main `src/core/presentation.ts` still has:

- one optional override GIF `primary`;
- one optional static fallback;
- one optional semantic fallback;
- catalog candidate enumeration;
- animation filtering;
- fallback traversal;
- candidate de-duplication.

Current-main runtime does **not** yet contain:
- explicit `pool` schema;
- `occurrenceKey` selector input;
- selected-candidate field/helper.

Repository PR search at handoff found no open/closed PR explicitly titled around multi-GIF or presentation-pool runtime implementation.

Therefore the exact remaining runtime gap is still:

**explicit 3–5 candidate override pool + deterministic presentation-only selector + occurrence-key plumbing.**

Chat 2 does not implement that shared runtime here.

---

# Selector evidence

## Deterministic reference fixture

`prior-work/astra/prototype-m3.2/content/presentation-multi-gif-selector-v2.fixture.json`

Reference algorithm:
- seed = `presentationId|occurrenceKey|poolVersion`;
- FNV-1a 32-bit;
- unweighted selection = hash modulo candidate count;
- optional weighted threshold uses positive finite presentation-only weights.

Fixture proves:
- same occurrence + same pool version -> same candidate;
- reload repeats the same hash/candidate;
- different occurrence key may select another candidate;
- pool version may intentionally change presentation selection;
- no gameplay RNG read/write is required;
- no Save write is required.

## Black-box test

`prior-work/astra/prototype-m3.2/tests/presentation-multi-gif-selector-blackbox.test.ts`

Covers:
- same occurrence -> same reference selection;
- distinct occurrences may vary;
- pool order/replacement remains deterministic;
- one broken catalog GIF leaves remaining candidates;
- all dynamic candidates missing still reaches static fallback;
- animations-off needs no selector randomness;
- Save/RNG remains unchanged;
- explicit runtime pool remains intentionally unwired.

---

# All-ten-career media coverage

## Current production scope

All 10 ordinary careers on main expose:
- 4 seasonal shift semantic IDs;
- 1 stable `result/default`.

Total:
**50 shipped base presentation surfaces**.

Audit:
`docs/presentation-prep/TEN_CAREER_MEDIA_POOL_DENSITY_AUDIT_v1.md`

## Density

Suggested first production density:
- starter trio seasonal shifts: 4 candidates;
- remaining seven seasonal shifts: 3 candidates;
- result/default pools: 3 candidates when desired.

Candidate count remains a presentation-production value, never a gameplay rule.

## Current fallback families

- Lumber -> `assets/stage-lumber.svg`
- Satyr Maid -> `assets/stage-tavern.svg`
- Undead Farm -> `assets/stage-forest.svg`
- Tavern -> `assets/stage-tavern.svg`
- Hunter -> `assets/stage-forest.svg`
- Guard -> `assets/stage-town.svg`
- Merchant -> `assets/stage-town.svg`
- Artist/Geisha -> `assets/stage-tavern.svg`
- Assassin -> `assets/stage-town.svg`
- Prostitute -> `assets/stage-room.svg`

## Producer-ready ordinary-work batch

`docs/presentation-prep/GIF_PRODUCER_BATCH_ORDINARY_WORK_V1.md`

Contains:
- 10 career cards;
- 4 safe loop briefs per career;
- 40 producer briefs total;
- no named NPC, milestone, ending or art-style invention.

---

# PR37 ordinary-poverty mapping

## Production-authoritative surface count

PR37 contributes **10 mapped event+variant semantic surfaces** across:
- street;
- cheap lodging;
- recovery/help;
- pressure/bad-luck.

Mapping:
`docs/presentation-prep/POVERTY_PRODUCTION_MEDIA_POOL_MAPPING_v2.md`

Families:
- 3 street events;
- 1 cheap-lodging event;
- 3 recovery/help events;
- 3 pressure/bad-luck events.

Each pool sits beneath exact:
`eventId + variantId -> semantic presentationId`.

GIF choice never selects:
- helpful/neutral/pressure meaning;
- choice;
- effect;
- money/item reward;
- next-day modifier.

Current fallbacks:
- street/recovery/pressure -> `assets/stage-outside.svg`;
- cheap lodging -> `assets/stage-room.svg`.

Secret Debt remains excluded.

---

# PR38 School mapping

## Reachable generic hooks

Reachable generic post-paid-lesson surfaces:
- `location/town/event/school-lesson-content-v1-after-school/default`
- `location/town/event/school-life-content-v1-after-paid-lesson/default`

They route from generic:
`actionCompleted: school`.

These support generic 3-candidate classroom/reflection pools.

## Reachable exact Night-study hook

`location/town/event/school-life-content-v1-after-night-study/default`

Routes from the 24 exact:
`school.night_study.*`

choice IDs.

This supports a shared 3–5-candidate Night-study pool.

## Paid lesson result surfaces

Eight shipped:
`school/<track>/lesson/default`

remain directly addressable by semantic ID and can receive generic/track-aware pools.

## Staged teacher/course-specific libraries

PR38 includes teacher media libraries for all eight tracks, but the teacher pack has no event routing.

Course-specific authored event libraries also remain staged because generic `actionCompleted: school` does not identify the exact paid course.

Mapping:
`docs/presentation-prep/SCHOOL_REACHABLE_HOOK_MEDIA_MAPPING_v2.md`

Safe rule:
- prepare teacher/course media;
- do not route it from generic School action until a safe exact-course bridge exists.

---

# Producer-ready School / poverty batch

`docs/presentation-prep/GIF_PRODUCER_BATCH_SCHOOL_POVERTY_V1.md`

Contains producer cards for:
- paid School lesson result pools;
- two reachable generic post-lesson hooks;
- exact Night-study hook;
- shared current rest/outside context;
- cheap lodging;
- representative street/recovery/pressure poverty events.

No Secret Debt content is included.

---

# Accessibility / alt coverage

Audit:
`docs/presentation-prep/MEDIA_POOL_ACCESSIBILITY_ALT_AUDIT_v1.md`

Required for every candidate:
- non-empty useful alt;
- visible context, not hidden mechanics;
- no unchosen outcome;
- no unapproved identity;
- per-semantic mapping alt may differ even when media file is reused.

Representative audits cover:
- careers;
- School;
- ordinary poverty.

Static/text fallback remains meaningful without GIFs.

---

# Selective integration list — items 116–123

## Item 116
- `prior-work/astra/prototype-m3.2/content/presentation-multi-gif-selector-v2.fixture.json`

## Item 117
- `prior-work/astra/prototype-m3.2/tests/presentation-multi-gif-selector-blackbox.test.ts`

## Item 118
- `docs/presentation-prep/TEN_CAREER_MEDIA_POOL_DENSITY_AUDIT_v1.md`

## Item 119
- `docs/presentation-prep/POVERTY_PRODUCTION_MEDIA_POOL_MAPPING_v2.md`

## Item 120
- `docs/presentation-prep/SCHOOL_REACHABLE_HOOK_MEDIA_MAPPING_v2.md`

## Item 121
- `docs/presentation-prep/GIF_PRODUCER_BATCH_ORDINARY_WORK_V1.md`

## Item 122
- `docs/presentation-prep/GIF_PRODUCER_BATCH_SCHOOL_POVERTY_V1.md`

## Item 123
- `docs/presentation-prep/MEDIA_POOL_ACCESSIBILITY_ALT_AUDIT_v1.md`

Worker branch is long-lived.

Do not merge wholesale.

Selectively copy reviewed artifacts onto a fresh Lead branch from current main.

---

# Authoring manifests already ready from previous queue

After runtime support lands, review/selectively integrate as appropriate:

- `content/presentation-multi-gif-runtime-v1.fixture.json`
- `content/presentation-multi-gif-selector-v2.fixture.json`
- `content/presentation-drafts/starter-trio-multi-gif-v2.json`
- `content/presentation-drafts/ten-career-multi-gif-v1.json`
- `content/presentation-drafts/school-authored-multi-gif-v1.json`
- `content/presentation-drafts/ordinary-poverty-multi-gif-v1.json`
- `content/presentation-drafts/media-pool-import-manifest-v1.json`

Placeholder `authoring://non-shipped/` paths must be replaced by approved managed media before production runtime use.

---

# Minimum Lead implementation

Recommended bounded shared-runtime package:

1. extend slot override schema with optional `pool`;
2. enforce 3–5 GIF candidates;
3. require candidate stable key + alt;
4. optionally validate positive finite presentation weight;
5. reject ambiguous `primary + pool`;
6. add pure deterministic selector;
7. pass derived `occurrenceKey`;
8. keep animations-off static fallback;
9. keep old `primary/static/fallbackId` bundles compatible;
10. keep Save schema unchanged.

Preferred selection:

`hash(presentationId + occurrenceKey + poolVersion)`.

Do not consume gameplay RNG.

---

# No-save-migration preferred path

Occurrence-key inventory from the previous queue found:
- action/result: derivable;
- reactive event: derivable;
- paid School lesson: derivable;
- Activity: derivable;
- ending/RunResult: derivable;
- ordinary poverty event: derivable;
- Night study: small plumbing, no new save field demonstrated as necessary.

Therefore:
**do not add a presentation candidate field to Save unless implementation proves deterministic derivation insufficient.**

No GIF frame/time/playback state belongs in Save.

---

# Adoption order

1. Lead implements bounded pool schema + selector.
2. Convert future schema-contract tests into direct positive runtime assertions.
3. Integrate one Lumber spring 3-candidate pool.
4. Verify occurrence stability, animations-off and rollback.
5. Expand starter trio.
6. Expand all 10 ordinary career base shift/result surfaces.
7. Add generic School paid-lesson/reachable-hook pools.
8. Add PR37 ordinary-poverty pools.
9. Route teacher/course-specific School libraries only after exact-course routing is safe.
10. Keep Secret Debt out until its own production identities exist.

---

# Remaining runtime gap

At this handoff, content/media authoring is ahead of runtime support.

The remaining technical feature is deliberately small:

**3–5 GIF pool schema + deterministic presentation-only selection.**

Everything else stays unchanged:
- semantic presentation IDs;
- gameplay event identity;
- effects/choices;
- save mechanics;
- animations-off fallback;
- rollback principles;
- accessibility requirements.

No broad runtime or save rewrite is justified by the current evidence.
