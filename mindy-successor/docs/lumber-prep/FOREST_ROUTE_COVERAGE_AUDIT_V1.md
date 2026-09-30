# Forest Route Coverage Audit v1

Status: C3-38 current-main coverage audit.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `8265a6af2bd87b9e69f0bce96e6a20a80a9e852c`.
Fixture: `prior-work/astra/prototype-m3.2/content/forest-route-coverage-audit-v1.fixture.json`.

## Current Forest identity surface

Current production contains one Activity:
`lumber.forest`.

Route options:
- `forest.route.logging-road` -> `logging-road`;
- `forest.route.old-boundary` -> `old-boundary`.

Terminal results:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

There are still no non-terminal encounter or challenge IDs.

## RU/EN route coverage after merged #89

Logging Road has live RU/EN coverage for:
- option label;
- option help;
- presentation alt;
- presentation caption.

Old Boundary has the same four live RU/EN surfaces.

The Old Boundary unlock remains the existing item-capability condition:
`enter_old_boundary`.

C3-38 does not change or reinterpret that capability.

The neutral/default Forest route presentation also has live RU/EN alt/caption coverage.

## RU/EN terminal coverage

Success, escape and failure each have live RU/EN:
- event title;
- default variant text;
- return choice label;
- return choice text.

Each also has separate activity-return and worksite-reaction presentation identities after merged #89.

Success alone has the live Lumber continuation:
`lumber-cross.activity-forest-return`.

Escape and failure still have no Lumber state continuation.

## Entry handoff status

Current main still contains the earlier content fixture:
`forest.entry-content.v1`.

Its three body-text keys are not in production localization and have no live shared UI consumer.

Classification:
`CONTENT_READY_SHARED_CONSUMER_NOT_LIVE`.

That is a shared integration gap, not permission for Chat 3 to edit Activity UI.

## Remaining content-only gaps

Safe content gaps:
- additional Logging Road route-body variants;
- additional Old Boundary route-body variants;
- success aftermath variants;
- escape/failure presentation variants.

Blocked gaps:
- non-terminal encounters/challenges;
- new route mechanics;
- escape/failure Lumber career progression.

## C3-38 disposition

Current RU/EN labels/help/alt/caption/result coverage is complete for the existing live route/result surfaces.

Tasks C3-39 through C3-42 can add presentation-only depth against the exact existing route/result identities without changing Activity architecture, unlocks, result effects, or Lumber state.
