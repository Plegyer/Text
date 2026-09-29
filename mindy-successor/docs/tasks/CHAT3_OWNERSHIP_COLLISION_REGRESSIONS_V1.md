# Chat 3 Ownership / Collision Regressions v1

Status: C3-11 focused regression handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Exact comparison base: `95322727dc481b2ac54a9f764d31eb2067343149`.

Executable regression:
`prior-work/astra/prototype-m3.2/tests/chat3-content-ownership-collision-v1.test.ts`.

Regression manifest:
`prior-work/astra/prototype-m3.2/content/chat3-content-ownership-collision-v1.fixture.json`.

## Purpose

The C3-03…C3-10 worker slice is content-side only.

This regression proves the candidate stays inside that ownership boundary and does not silently modify:
- School;
- Chat 2 media-source ownership;
- Save schema/persistence;
- gameplay RNG/shared engine behavior;
- Lumber Foreman canon;
- shared runtime/UI architecture.

## Exact-base diff guard

The test runs:

`git diff --name-only <baseMain>...HEAD`

against the exact base recorded in the fixture.

Every changed path must be present in the manifest allowlist.

Protected prefixes include:
- `prototype-m3.2/src/`;
- `prototype-m3.2/assets/`;
- School content/test path prefixes.

Protected exact paths include:
- `content/definitions.json`;
- `content/presentation.json`;
- Lumber Night/Foreman integration packs.

Therefore a candidate that changes shared runtime, UI, Save/RNG source, presentation/media source, School-owned content, or protected Foreman integration fails the regression.

## Production modification allowlist

Only two pre-existing production files are allowed to differ from the exact base:

1. `content/localization.json`
2. `content/packs/forest-result-content-bilingual-v2.json`

All other C3 artifacts are new content fixtures, tests, or handoff documents.

## Localization collision guard

The exact allowed additive localization keys are only:
- `event.lumber-cross.activity-forest-return.title`;
- `event.lumber-cross.activity-forest-return.variant.default.text`;
- `event.lumber-cross.activity-forest-return.choice.continue.label`;
- `event.lumber-cross.activity-forest-return.choice.continue.text`.

The exact allowed changed localization keys are the eleven C3-05 Forest result text keys:
- success title/body/return label/return text;
- escape title/body/return label/return text;
- failure title/body/return text.

`event.forest-result-content-v1.failure.choice.return.label` remains unchanged and therefore is not in the delta allowlist.

No localization removal is allowed.

Forbidden localization ownership prefixes include School and Foreman namespaces.

This catches accidental mutation of:
- School localization;
- School presentation localization;
- `relationship.lumber.foreman.*` canon.

## Forest mechanics non-overlap guard

The Forest result pack is compared to exact-base main after recursively removing only:
- `title`;
- `text`;
- `label`.

The remaining structure must be identical.

The regression additionally requires:
- event IDs remain `forest-result-content-v1.success|escape|failure`;
- result IDs remain `lumber.forest.success|escape|failure`;
- one `default` variant each;
- one `return` choice each;
- no event conditions;
- empty choice effects.

Therefore C3-05 copy cannot change Activity result mechanics.

## Chat 2 media ownership guard

The candidate allowlist excludes:
- `assets/`;
- `content/presentation.json`.

The existing media arrays in the Forest result pack are protected indirectly by the mechanics-equivalence comparison because `media` is not a permitted presentation-copy field.

C3 fixtures may reference existing presentation IDs for handoff, but they do not own or replace media files/slots.

## Save / RNG / shared runtime guard

The candidate diff must contain no path under:
`prototype-m3.2/src/`.

This protects:
- `core/schema.ts`;
- `core/persistence.ts`;
- `core/engine.ts`;
- `core/presentation.ts`;
- `ui/app.ts`;
- shared runtime architecture generally.

No C3 regression claims that content fixtures themselves provide runtime capability.

## School ownership guard

No School production path is allowed in the candidate diff.

The localization exact-delta guard also rejects School-owned localization changes.

C3 documents may describe School as an external boundary, but no School content/state is mutated.

## Foreman canon guard

The candidate does not modify:
- `content/definitions.json`;
- Lumber Night/Foreman packs;
- Foreman relationship localization.

Forest-to-Lumber C3 content consumes the already-existing success continuation; it does not alter `lumber.foreman` relationship stages/transitions/canon.

## Current execution status

C3-11 adds the executable test and exact-base manifest.

Before C3-12 candidate freeze, Chat 3 must:
1. create the candidate from fresh current main;
2. update `baseMain` only if main advanced;
3. ensure the candidate handoff path is in the allowlist;
4. run targeted regression;
5. run repository full check through exact-head CI.

No QA acceptance is claimed by C3-11.

## C3-11 disposition

Regression source is ready.

It is deliberately ownership-focused, not gameplay QA:
- it proves what Chat 3 did not change;
- it proves Forest copy remains mechanics-equivalent;
- it proves localization deltas stay inside exact Forest keys.

QA acceptance remains Chat 4 ownership.
