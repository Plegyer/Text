# Forest Production-Consumption Gap Audit v1

Status: C3-49 current-main content audit.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `593f9936d72296557b36a0e0ca7d3c7bb780839c`.
Fixture: `prior-work/astra/prototype-m3.2/content/forest-production-consumption-gap-audit-v1.fixture.json`.

## Player-facing now

The earlier Forest entry body handoff is now live. Current root localization contains:
- `presentation.activity.forest.entry.default.text`;
- `presentation.activity.forest.entry.logging-road.text`;
- `presentation.activity.forest.entry.old-boundary.text`.

Current `src/ui/app.ts` resolves those strings through `activityNarrative(activityId, routeId)` inside the live Activity screen.

Route labels/help/media are also live for Logging Road and Old Boundary.

Success / escape / failure terminal event copy remains live through the pending-event renderer.

The success-only Lumber continuation `lumber-cross.activity-forest-return` remains live.

## Preparation-only merged Forest content

`forest.seasonal-result-depth.v1` is merged as content-side preparation, not player-facing production.

Its ten candidate localization keys are absent from current root localization and current UI has no selector that chooses those route/result candidate strings.

Do not treat fixture presence as runtime consumption.

## Historical metadata correction

`forest.encounter-identity-audit.v2` still records the historical entry-consumer gap:
- production localization absent;
- UI consumer absent.

That metadata is now stale because later integration made the entry body live.

This audit supersedes those three historical status fields only. The underlying route/result identity audit remains useful.

## Remaining gaps

Preparation-only:
- seasonal route-depth selection;
- additional terminal-result-depth selection.

Blocked by missing gameplay identity:
- non-terminal Forest encounters/challenges;
- Lumber progression after escape;
- Lumber progression after failure.

## C3-49 disposition

Live: entry body, route labels/help/media, terminal result copy/media, success Lumber continuation.

Preparation-only: merged seasonal/result depth candidate strings.

Blocked: new encounters/challenges and escape/failure state continuations.

No runtime/UI/localization change is made by this audit.
