# Ending Current-Main Consumer Map v2

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `54131488c65302f81b3001abaaa345d21f0281e2`
Current consumer: `src/ui/app.ts`
Production patch: `content/ending-localization-production-v2.fixture.json`

## Legacy panel

Current Legacy panel still renders raw catalog ending fields:

- title: `<h3>${e.title}</h3>`
- description: `<p>${e.description}</p>`

Required presentation wiring for every item-146 ending:

- title → `tr(`ending.${e.id}.title`, e.title)`
- description → `tr(`ending.${e.id}.description`, e.description)`

No ending-specific UI branch is needed.

## Current exact keys

- `ending.ending.lumber.forest.description` → Legacy card description consumer
- `ending.ending.lumber.forest.title` → Legacy card title consumer
- `ending.ending.lumber.forewoman.description` → Legacy card description consumer
- `ending.ending.lumber.forewoman.title` → Legacy card title consumer
- `ending.ending.lumber.hard-work.description` → Legacy card description consumer
- `ending.ending.lumber.hard-work.title` → Legacy card title consumer
- `ending.guild-life.description` → Legacy card description consumer
- `ending.guild-life.title` → Legacy card title consumer
- `ending.lumber-stay.description` → Legacy card description consumer
- `ending.lumber-stay.title` → Legacy card title consumer
- `ending.scholar-life.description` → Legacy card description consumer
- `ending.scholar-life.title` → Legacy card title consumer
- `ending.tavern-court.description` → Legacy card description consumer
- `ending.tavern-court.title` → Legacy card title consumer
- `ending.tavern-guild.description` → Legacy card description consumer
- `ending.tavern-guild.title` → Legacy card title consumer
- `ending.tavern-stay.description` → Legacy card description consumer
- `ending.tavern-stay.title` → Legacy card title consumer

## Inactive-run end state

Current inactive-run screen does not consume ending title/description directly.

It renders:
- generic localized `ui.run.endingAccepted` / `ui.run.timeExpired`;
- latest journal text;
- ending media via `presentationIdForEnding(r.acceptedEnding)`.

If a future end-state title is added, reuse `ending.<acceptedEndingId>.title`; do not create a duplicate namespace.

## Acceptance control

Shared button:
- `ui.legacy.acceptButton`

No per-ending button localization is needed.

## Condition rows

Ending requirement text remains a separate `explain(c)` consumer. Item 146 does not replace condition templates or semantic IDs.

## Invariants

Wiring must not change:
- ending order;
- eligibility/availability;
- conditions;
- rewards/metaRewards;
- acceptedEnding;
- epilogues;
- ending presentation ID;
- Save;
- RNG.
