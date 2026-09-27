# Project-owned GIF deterministic-selection QA v1

Status: COMPLETE / BLOCKED_BY_EXPORT

Reviewed Chat 2 item 240:
`first-project-owned-gif-pool-v1.json`.

## Actual pool state

Target semantic presentation ID:
`job/lumber/shift/spring/default`.

Current actual GIF candidates:
`0`.

Pool status:
`BLOCKED_BY_GIF_EXPORT`.

No production slot/pool patch is emitted.

Therefore this item is not GREEN for production animation.

## Required future current semantic identity

When export is unblocked, the first pool must bind only to:
`job/lumber/shift/spring/default`.

No new gameplay or presentation semantic ID is needed.

## Candidate key requirements

A future real pool must have:
- 3–5 actual GIF files;
- unique stable candidate keys;
- locale-neutral keys;
- project-owned source provenance;
- real GIF signature;
- local asset paths.

Candidate keys must not contain RU/EN locale identity.

## Deterministic selection contract

Future selection must use the shipped presentation-only deterministic selector.

For the same:
- presentationId;
- occurrenceKey;
- poolVersion;

the selected candidate must remain identical across:
- RU;
- EN;
- reload;
- re-render.

Locale is not part of candidate selection.

## Gameplay RNG / Save

Future pool resolution must not:
- call gameplay RNG;
- mutate gameplay Save;
- alter action/scene/result identity;
- alter counters/effects.

Animation selection remains presentation-owned.

## Static fallback

Required fallback:
`assets/presentation/career-lumber-shift-spring.svg`.

Animations-off must deterministically return the static fallback.

Missing/broken GIF candidates must eventually fall through to remaining pool candidates and then the static fallback without gameplay effect.

## Current blocker evidence

Current repo has:
- real project-owned source frames;
- no declared reproducible SVG-frame -> GIF exporter;
- zero actual production GIF bytes.

Worker regression verifies:
- blocked status;
- empty candidate list;
- empty production slot/media patch;
- static fallback preserved;
- no fake localization candidate strings;
- no item-238 GIF files.

## Verdict

`BLOCKED_BY_EXPORT`.

Deterministic-selection acceptance criteria are defined, but there is no real 3–5 candidate pool to validate or ship yet.
