# Forest Activity Presentation Audit v1

Status: C2-42 COMPLETE
Owner: Chat 2 / Presentation & Media
Baseline main: `8265a6af2bd87b9e69f0bce96e6a20a80a9e852c`

This audit covers current Forest/Expedition presentation identities after the integrated Lumber/Forest state on main. It does not change Activity mechanics, routes, outcomes, rewards, RNG, Save state, career state, or event conditions.

## Current Activity registry

Current Activity:
- gameplay activity ID: `lumber.forest`
- presentation slug: `forest`

Current route semantic slots:
- `activity/forest/route/default`
- `activity/forest/route/logging-road`
- `activity/forest/route/old-boundary`

Current return/result semantic slots:
- `activity/forest/return/success`
- `activity/forest/return/escape`
- `activity/forest/return/failure`

## Current exact static bindings

| Semantic ID | Exact static source | Registry fallback |
| --- | --- | --- |
| `activity/forest/route/default` | `assets/presentation/forest-route-default-v1.svg` | `location/town/default` |
| `activity/forest/route/logging-road` | `assets/presentation/forest-route-logging-road.svg` | `activity/forest/route/default` |
| `activity/forest/route/old-boundary` | `assets/presentation/forest-route-old-boundary-v3.svg` | `activity/forest/route/default` |
| `activity/forest/return/success` | `assets/presentation/forest-return-success-v2.svg` | `activity/forest/route/default` |
| `activity/forest/return/escape` | `assets/presentation/forest-return-escape-v2.svg` | `activity/forest/route/default` |
| `activity/forest/return/failure` | `assets/presentation/forest-return-failure-v2.svg` | `activity/forest/route/default` |

All six Activity slots already have RU/EN presentation alt and caption metadata.

## Forest result/content reaction events

Current bilingual Forest result content is routed through Lumber-domain events, so the semantic IDs are job-event slots rather than additional Activity slots:

- `job/lumber/event/forest-result-content-v1-success/default`
- `job/lumber/event/forest-result-content-v1-escape/default`
- `job/lumber/event/forest-result-content-v1-failure/default`

Current cross-system Forest return reaction:
- `job/lumber/event/lumber-cross-activity-forest-return/default`

All four current Forest-related job-event slots:
- exist in the current presentation registry;
- have exact project-owned static overrides;
- have RU/EN alt + caption metadata;
- fall back to `location/town/default`.

## Forest ending surface

The existing target Lumber Forest ending is:
- `ending/lumber/forest`
- static: `assets/presentation/forest-return-success-v2.svg`
- fallback: `location/town/default`
- RU/EN alt + caption: complete.

It is already tracked by the C2-39 Lumber ending re-audit and is not duplicated as a second manifest entry.

## Fallback chain

Activity route/result chain:

`activity/forest/return/<outcome> -> activity/forest/route/default -> location/town/default`

`activity/forest/route/<specific-route> -> activity/forest/route/default -> location/town/default`

Forest-related Lumber event chain:

`job/lumber/event/<forest-event>/default -> location/town/default`

Every audited current Forest semantic slot has an exact static override, so normal resolution stays on the requested semantic ID instead of reaching generic fallback.

## Audit result

Forest Activity route/result slots: **6 / 6 exact static**.

Forest-related Lumber event slots: **4 / 4 exact static**.

Target Forest ending slot: **1 / 1 exact static**.

Missing current Forest semantic static overrides in the assigned audit: **0**.

Stale current Forest semantic overrides: **0**.
