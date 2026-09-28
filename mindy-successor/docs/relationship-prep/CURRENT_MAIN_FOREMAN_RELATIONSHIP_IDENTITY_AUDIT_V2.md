# Current-Main Foreman Relationship Identity Audit v2

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `01b31b9ab0d0267d95edf5b5b80638acd63f5c04`

## Relationship identity

Exact relationship ID:
- `lumber.foreman`

Catalog label:
- `Lumber Foreman`

Initial stage:
- `unknown`

Exact current stages:
- `unknown`
- `professional`
- `route-professional`

## Current transitions

### `notice-work`
- from: `unknown`
- to: `professional`
- condition: career `lumber` at stage `accepted-hand`
- no direct transition effects

### `choose-professional`
- from: `professional`
- to: `route-professional`
- no conditions
- effect: set relationship choice `route = professional`

There is no romance transition or affection meter in current schema/content.

## Exact current Foreman event identities

### Career/relationship milestone
Pack: `lumber-production`

Event:
- `lumber.foreman-notice`
- sourceDomain: `lumber.foreman`
- variant: `default`
- choice: `professional`
- effects: advance `notice-work`, then `choose-professional`

Presentation ID:
- `relationship/lumber-foreman/lumber-foreman-notice/default`

### Voluntary Night follow-up
Pack: `lumber-night-production`

Night choice:
- `lumber.foreman.night`

Event:
- `lumber-night.foreman-professional`
- sourceDomain: `lumber.foreman`
- reaction trigger: `nightChoiceCompleted:lumber.foreman.night`
- variant: `default`
- choice: `continue`
- night intercept: `after_choice`
- consumes Night: yes
- suppresses voluntary menu after selection: yes
- suppresses lodging payment: no

Presentation ID:
- `relationship/lumber-foreman/lumber-night-foreman-professional/default`

## Current relationship data added by Night

Night choice immediate effect:
- counter `night_meetings += 1`

Night event choice effect:
- add fact `night-followup-complete`

No daytime Energy cost and no next-day Energy delta are authored for `lumber.foreman.night`.

## Current presentation media identities

Milestone media:
- `relationship.lumber.foreman.professional`

Night media:
- `relationship.lumber.foreman.night.professional`

Current project-owned presentation slots use:
- `foreman-professional-milestone-v2.svg`
- `foreman-night-voluntary-v2.svg`

## Product-open boundaries

Not current canon and not to be invented by this wave:
- personal name/unique NPC identity for the Foreman;
- romance route;
- universal affection meter;
- sexual/explicit content;
- new relationship stages/facts/counters;
- housing/privacy gate not already authored;
- additional Night cost/reward;
- new ending condition.

The current relationship is a professional route only.
