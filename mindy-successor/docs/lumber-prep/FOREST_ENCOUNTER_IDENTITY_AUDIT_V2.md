# Forest Encounter Identity Audit v2

Status: C3-31 current-main content identity audit.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `05fa2d1084a48cab20d42f23885e19ee627d3d09`.
Fixture: `prior-work/astra/prototype-m3.2/content/forest-encounter-identity-audit-v2.fixture.json`.

## Current Activity backbone

Current Forest Activity remains:
`lumber.forest`.

Existing route options:
- `forest.route.logging-road` -> route `logging-road`;
- `forest.route.old-boundary` -> route `old-boundary`, gated by existing item capability `enter_old_boundary`.

Current terminal results:
- `lumber.forest.success` -> world fact `lumber.forest.truth-known`;
- `lumber.forest.escape` -> world fact `lumber.forest.escaped`;
- `lumber.forest.failure` -> world fact `lumber.forest.failed`.

C3-31 does not alter any of those identities or effects.

## Current route presentation

Existing route presentation IDs:
- `activity/forest/route/default`;
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`.

Current route UI consumes route presentation media plus route label/help localization. It does not currently consume a route-body narrative string.

## Current terminal content

Existing content events:
- `forest-result-content-v1.success`;
- `forest-result-content-v1.escape`;
- `forest-result-content-v1.failure`.

Each currently has:
- one `default` variant;
- one `return` choice;
- no choice effect.

The terminal content remains correctly separated by exact ActivityResult outcome.

## Current Lumber continuation

Success has a live Lumber continuation:
`lumber-cross.activity-forest-return`.

It consumes:
- exact success ActivityResult;
- world fact `lumber.forest.truth-known`.

Its existing choice writes Lumber career facts:
- `forest-truth-known`;
- `forest-problem-resolved`.

Those facts feed:
`ending.lumber.forest`.

Escape and failure still have no Lumber state continuation.

C3-31 does not invent one.

## Entry-content state

Current main contains the handoff fixture:
`forest.entry-content.v1`.

Its keys are:
- `presentation.activity.forest.entry.default.text`;
- `presentation.activity.forest.entry.logging-road.text`;
- `presentation.activity.forest.entry.old-boundary.text`.

On the audited current main:
- none of those three keys is in production `content/localization.json`;
- current Activity UI renders media, progress, endurance, checkpoint, route label and choices;
- there is no shared UI consumer for those entry body strings.

Classification:
`CONTENT_READY_SHARED_CONSUMER_NOT_LIVE`.

This is a shared integration dependency, not permission for Chat 3 to edit the Activity UI.

## Encounter / challenge audit

Current `lumber.forest` defines:
- route options;
- adapter progress/endurance behavior;
- terminal results.

It defines no non-terminal encounter or challenge identity.

There is no current:
- `forest.encounter.*` ID;
- challenge event ID;
- challenge choice ID;
- challenge result vocabulary;
- encounter-specific world fact.

Therefore encounter-specific authoring is blocked by missing gameplay identity.

Chat 3 must not create a parallel text event system to simulate an encounter.

## Content-only gaps

### Route narrative depth

Current route labels/help and media are live.

A route-body narrative layer is not currently consumed.

Classification:
`CONTENT_ONLY_GAP` with shared-consumer dependency.

C3-32 may prepare optional route-depth strings attached to existing route IDs.

### Seasonal route/result copy

Current Forest Activity has no seasonal gameplay identity.

Classification:
`PRESENTATION_ONLY_CONTENT_GAP`.

C3-32 may author seasonal atmosphere against existing route/result IDs only. It must not imply seasonal mechanics or different success probabilities.

### Terminal result depth

Each terminal result event currently has one default variant.

Classification:
`PRESENTATION_ONLY_CONTENT_GAP`.

Additional RU/EN terminal copy can be prepared as handoff variants without changing:
- outcome;
- result ID;
- world fact;
- return choice;
- Lumber continuation.

### Escape/failure return-to-Lumber state

No current escape/failure continuation event exists.

Classification:
`BLOCKED_BY_RUNTIME_OR_PRODUCT_IDENTITY`.

C3-32 may deepen escape/failure player-facing result text but must not add:
- career facts;
- ending eligibility;
- penalties/rewards;
- a new resolver event.

## Media ownership

All current Forest route/return/reaction media paths remain Chat 2 ownership.

C3-31 consumes those presentation identities only.

No media source or presentation registry is changed.

## C3-31 disposition

Current Forest content surface is sufficient for:
- route atmosphere on existing Logging Road / Old Boundary;
- terminal success / escape / failure depth;
- success Lumber return context.

It is not sufficient for:
- non-terminal encounter/challenge content;
- escape/failure Lumber progression;
- seasonal mechanics.

C3-32 should therefore remain presentation-only and identity-preserving.
