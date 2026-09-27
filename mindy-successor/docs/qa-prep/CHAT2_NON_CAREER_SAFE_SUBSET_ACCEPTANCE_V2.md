# Chat2 non-career safe subset acceptance v2

Status: COMPLETE / PARTIAL_WAVE_PRESENT / SAFE_SUBSET_GREEN

Reviewed Chat 2 post-PR47 items 220–231 as they currently appear on:
`chat2/presentation-replacement-next`.

Worker head during final review:
`ce35e8a0df41e44abecf5514cd9ad7b22f77e550`.

Current production main:
`4270bbc0d4d1117e1474a5ab9d9380dc350b0d1c`
(after PR48).

## Availability at review

Present:
- item 220 baseline reconciliation;
- item 221 seasonal incremental manifest;
- item 222 seasonal localization delta;
- item 223 seasonal collision regression;
- item 224 non-career safe production subset;
- item 225 non-career safe localization delta;
- item 226 non-career collision regression;
- item 227 shared Forest route/default SVG;
- item 228 shared Forest route/default media record.

Items 229–231 were not yet present at the review snapshot.

This QA therefore accepts only the artifacts that exist and does not infer future worker files.

## Item 224 safe subset

Manifest:
`non-career-safe-production-subset-v3.json`

Verified:
- physical asset records: 27;
- production mappings: 27;
- unique semantic IDs: 27;
- gameplay fields: 0.

Exact groups:
- School: 9;
- ordinary poverty: 10;
- Forest return/reaction: 6;
- Foreman: 2.

## School acceptance

Safe current-production mappings:
- eight current course lesson IDs;
- current generic post-Night-study event presentation ID.

No staged teacher-specific School ID is present.

No exact-course teacher event/routing identity is activated.

## Ordinary poverty acceptance

Exactly 10 current ordinary-poverty event presentation IDs are refined.

Secret Debt is absent.

The subset changes presentation media only and does not add lodging/Night mechanics.

## Forest result/reaction acceptance

Exactly six current production mappings:
- 3 Activity return IDs;
- 3 shipped result-reaction IDs.

No route-specific presentation ID is present in item 224.

Exact Forest result ownership remains unchanged.

## Foreman acceptance

Exactly two current production identities:
- professional milestone;
- voluntary professional Night follow-up.

No new relationship stage/route.

## Explicit route-specific rejection

Item-224 subset contains no:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`;
- `forest.route.logging-road`;
- `forest.route.old-boundary`
as production mapping payload.

This is the required Product-open firewall.

## Item 225 localization

`non-career-safe-static-localization-v3.fixture.json`

Verified:
- 54 RU+EN strings;
- complete RU;
- complete EN;
- locale-neutral keys;
- no gameplay fields.

These keys cover exactly the safe item-224 refinement set.

## Item 226 collision regression

The worker regression requires:
- exactly 27 current production mappings;
- every mapped semantic ID exists;
- every existing PR47 static slot is a same-ID refinement;
- route-specific Product-open IDs absent;
- staged School teacher IDs absent;
- localization additive or exact-identical;
- presentation-only payload.

This is the correct selective-integration guard.

## Shared route/default item 227–228

Chat 2 also now provides a separate neutral project-owned asset:
`forest-route-default-v1.svg`

mapped only to the already-current:
`activity/forest/route/default`.

Its record explicitly states:
- neutral between logging-road and old-boundary;
- no route-option identity encoded;
- no Hunter/token/challenge semantics;
- no gameplay fields.

Classification:
`SAFE_SEPARATE_CURRENT_ID_SOURCE`.

It is not the same as activating the two route-specific Product-open assets.

## PR48 interaction

PR48 shipped the 40 seasonal career media and does not alter the safe non-career semantic IDs above.

Before any non-career integration, Lead must still rebase/collision-check against exact current main `4270bbc...`.

## Verdict

`SAFE_SUBSET_GREEN`.

Safe production candidates:
- item 224 27 current-ID refinements;
- item 225 accessibility delta;
- item 226 collision guard;
- separately, item 227/228 neutral shared `activity/forest/route/default` fallback.

Rejected from production activation:
- route-specific logging-road asset mapping;
- route-specific old-boundary asset mapping;
- staged teacher-specific School identities.

No whole Chat 2 branch is approved for merge.
