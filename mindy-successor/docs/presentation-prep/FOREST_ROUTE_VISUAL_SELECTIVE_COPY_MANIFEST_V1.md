# Forest Route Visual Selective-Copy Manifest v1

Purpose:
list the exact Forest route visual files from items **293–300** that are safe to copy onto a fresh Lead integration branch.

Do not merge the long-lived Chat 2 branch wholesale.

## Static assets

- `prior-work/astra/prototype-m3.2/assets/presentation/forest-route-logging-road-v2.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/forest-route-old-boundary-v3.svg`

## Localization candidate

- `prior-work/astra/prototype-m3.2/content/presentation-drafts/forest-route-static-localization-v4.json`

Contains RU+EN:
- logging-road alt/caption;
- old-boundary alt/caption.

## Slot candidate

- `prior-work/astra/prototype-m3.2/content/presentation-drafts/forest-route-static-slots-v2.json`

Candidate semantic slots:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`.

Both fall back to:
`activity/forest/route/default`.

## Regressions

- `prior-work/astra/prototype-m3.2/tests/forest-route-static-semantics-v2.test.ts`
- `prior-work/astra/prototype-m3.2/tests/forest-route-static-locale-invariance-v2.test.ts`

## Audit/review documents

- `docs/presentation-prep/FOREST_ROUTE_STATIC_BUILD_COPY_AUDIT_V1.md`
- `docs/presentation-prep/FOREST_ROUTE_STATIC_ACCESSIBILITY_REVIEW_V1.md`

## Files intentionally excluded

Do not select the older worker-only route sources for production activation:

- `prior-work/astra/prototype-m3.2/assets/presentation/forest-route-logging-road.svg`
- `prior-work/astra/prototype-m3.2/assets/presentation/forest-route-old-boundary.svg`

Reason:
- logging-road old source is superseded by clearer v2 route cues;
- old-boundary old source contains barrier-like geometry and is DO_NOT_SHIP.

Do not replace the shared current default:

- `prior-work/astra/prototype-m3.2/assets/presentation/forest-route-default-v1.svg`

It remains the correct shared fallback.

## Selective integration order

On a fresh branch from exact current main:

1. copy the two new SVG files;
2. copy the localization candidate;
3. copy the slot candidate;
4. copy the two regression tests;
5. optionally copy the build/accessibility review docs;
6. integrate route-specific slots only when the exact Chat3 route presentation semantics are present on that integration head;
7. merge only the four new RU+EN localization keys into root localization;
8. preserve `activity/forest/route/default` as fallback;
9. run targeted tests;
10. run normal build and verify source -> `dist/assets/presentation/` byte copy;
11. run full project checks/exact-head CI.

## Ownership boundary

Safe to copy:
presentation-only static media, localization candidates and isolated tests.

Not owned by Chat 2:
- route gameplay conditions;
- route choice plumbing;
- Activity mechanics;
- presentation runtime/schema/UI changes;
- Hunter/token/challenge mechanics.

## Readiness

Logging-road static visual:
**SAFE TO COPY**.

Old-boundary static visual:
**SAFE TO COPY**.

Localization:
**SAFE TO COPY**.

Slot candidate:
**SAFE TO COPY WHEN EXACT ROUTE SEMANTIC IDS EXIST**.

Build pipeline:
**NO MODIFICATION REQUIRED**.
