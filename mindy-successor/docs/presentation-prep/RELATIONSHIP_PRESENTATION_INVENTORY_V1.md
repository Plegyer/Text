# Relationship Presentation Inventory v1

Status: C2-40 COMPLETE
Owner: Chat 2 / Presentation & Media
Baseline main: `8265a6af2bd87b9e69f0bce96e6a20a80a9e852c`

This inventory uses only current relationship and event identities. It does not create relationship stages, counters, choices, events, routes, story facts, Save fields, or new semantic presentation IDs.

## Current relationship definition

Current main has one relationship definition:

- relationship ID: `lumber.foreman`
- initial stage: `unknown`
- current stages: `unknown`, `professional`, `route-professional`
- current transitions: `notice-work`, `choose-professional`

The presentation registry does not create standalone semantic slots for relationship stages themselves. Relationship semantic presentation slots are emitted from current events whose `sourceDomain` matches an existing relationship ID.

## Current relationship events

### Professional milestone

Gameplay event:
- `lumber.foreman-notice`
- `sourceDomain: lumber.foreman`
- variant: `default`

Semantic presentation ID:
- `relationship/lumber-foreman/lumber-foreman-notice/default`

Current exact static override:
- `assets/presentation/foreman-professional-milestone-v2.svg`

Catalog event media identity:
- `relationship.lumber.foreman.professional`
- current catalog source: `assets/stage-lumber.svg`

Classification:
- active semantic slot;
- exact project-owned static override present;
- safe registry fallback: `location/town/default`;
- RU/EN alt + caption present;
- not stale.

### Voluntary professional night

Gameplay event:
- `lumber-night.foreman-professional`
- `sourceDomain: lumber.foreman`
- variant: `default`

Semantic presentation ID:
- `relationship/lumber-foreman/lumber-night-foreman-professional/default`

Current exact static override:
- `assets/presentation/foreman-night-voluntary-v2.svg`

Catalog event media identity:
- `relationship.lumber.foreman.night.professional`
- current catalog source: `assets/stage-lumber.svg`

Classification:
- active semantic slot;
- exact project-owned static override present;
- safe registry fallback: `location/town/default`;
- RU/EN alt + caption present;
- not stale.

## Stale/missing audit

Current relationship semantic slots: **2**.

Active exact static overrides: **2 / 2**.

Current relationship event media identities: **2**.

Missing semantic static overrides: **0**.

Stale relationship semantic overrides: **0**.

No relationship presentation ID is invented for:
- the `unknown` stage;
- the `professional` stage by itself;
- the `route-professional` stage by itself;
- the relationship choice value;
- counters or facts.

Those are gameplay/state identities rather than currently emitted presentation registry slots.
