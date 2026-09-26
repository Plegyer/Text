# Lumber PA Blocker Burn-down v1

Status: post-PR20 Product Acceptance blocker ledger.
Production baseline: PR #20 activation.

This ledger starts from the earlier unresolved-dependency list and removes everything that production activation already closed.

## Closed by production activation — no longer blockers

The following are **not blockers anymore**:

- target Work UI for `lumber.shift`;
- legacy/target Lumber coexistence;
- typed Lumber career/Foreman/Forest/endings;
- target NightFlow;
- normal lodging `lodging.normal`;
- Foreman Night choice `lumber.foreman.night`;
- Forest Activity UI entry/action controls;
- School `schoolLesson`;
- typed School `lessons_completed` / `night_study_sessions`;
- Hard Work identity/eligibility/reward.

Hard Work is shipped and closed:

`completed_shifts >= 50`

only, reward:

`hardWork:lumber`.

## Remaining blocker B1 — Old Boundary Token acquisition/use

Status: **OPEN**

Locked:

- item `old_boundary_token`;
- capability `enter_old_boundary`.

Missing:

- one natural production acquisition source;
- inventory-visible capability ownership;
- accepted retain/consume/turn-in rule;
- product action/route availability seam.

Affected PA rows:

- **PA09** — obtain meaningful item capability;
- **PA14** — natural Forest entry cannot be counted passed if capability is only injected by test setup;
- **PA17** — item must change available action/route; injected worldFact is not product evidence.

Smallest closure:

> accept and implement one reachable source that awards the locked item/capability, persist it visibly, and make the capability unlock a Forest entry/route/action deterministically across reload.

Still OPEN even after closure design is chosen:

- exact fiction/source until Product accepts one;
- consume/retain semantics until Product locks them.

Do not close B1 with `addWorldFact(lumber.capability.enter-old-boundary)` in a test fixture.

## Remaining blocker B2 — School management/accounting → Lumber public result

Status: **OPEN AUTHORING**

Accepted listener boundary:

`lumber.school.management-ready`

Existing Lumber listener:

`lumber-cross.school-management-return`

Missing on School side:

- exact course/track/provider;
- exact `lessons_completed`/milestone/project/exam/certificate threshold;
- authored transaction that publishes the fact.

Affected PA rows:

- **PA07** — the School lesson infrastructure is shipped, but the required Lumber-relevant School public result is not authored;
- **PA08** — direct School→Lumber reaction cannot be accepted naturally until School publishes the fact;
- **PA21 (conditional)** — only if the chosen complex ending is Forewoman rather than Forest.

Smallest closure:

> author one School-owned progression rule that publishes `lumber.school.management-ready` exactly once, with save/reload stability, without School writing Lumber-private state.

Do not invent a legacy `metrics.lessons` threshold.

## Remaining blocker B3 — Arcana / Forest School public boundary

Status: **OPEN AUTHORING**

Locked design intent says Arcana may help understand the Forest problem.

Missing:

- final public fact ID;
- exact School provider/track;
- threshold/milestone/certificate;
- exact Forest/Lumber consumer seam if this route is activated.

Affected PA rows:

- **PA16 (conditional)** — if one of the required route/challenge families is the School/Arcana route;
- **PA17 (conditional)** — if Arcana is authored as an alternative action-space unlock;
- **PA18 (conditional)** — if success requires an Arcana identification result in the final route design.

Smallest closure:

> either author one explicit School-owned Arcana public result and its consumer, or explicitly decide that the first PA Forest slice closes through the item route without Arcana.

Until that product decision exists, do not invent an Arcana fact or lesson threshold.

## Remaining blocker B4 — Forest depth to full PA spec

Status: **OPEN AUTHORING**

Current `counter.v1` already proves:

- 2-Energy entry;
- separate internal endurance;
- deterministic checkpoint/RNG;
- save/resume;
- success/escape/failure distinction;
- exact A5 `activityResult`.

Still missing for full depth:

- 3 route contexts;
- 3 challenge families;
- season difference;
- explicit item-driven route/action change in product content.

Affected PA rows:

- **PA16** — route/challenge/season traversal depth;
- **PA17** — item capability must visibly change action-space;
- **PA18** — success should come out of the final authored route/challenge surface, not only the generic counter adapter;
- **PA19** — escape mechanics exist, but final route-context presentation/depth still depends on the authored surface.

Smallest closure:

> author the minimum three route contexts, three distinguishable challenge families and one season-driven difference while preserving current result IDs and Activity save contracts.

Do not replace:

- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

## Non-blocking media gap

Future Lumber GIFs are currently missing.

This is **not a PA mechanical blocker** provided the shipped semantic presentation/fallback system remains usable.

Missing paths must not be labeled shipped.

## Burn-down summary

| Blocker | PA rows | Smallest closure |
| --- | --- | --- |
| B1 Old Boundary Token acquisition/use | PA09, PA14, PA17 | reachable persisted item/capability source + action-space unlock |
| B2 School management public result | PA07, PA08, conditional PA21 | School-owned rule publishes `lumber.school.management-ready` exactly once |
| B3 Arcana/Forest School boundary | conditional PA16–PA18 | explicit Arcana public result/consumer or product decision to omit from first slice |
| B4 Forest depth | PA16–PA19 | 3 routes + 3 challenge families + season difference + visible item route seam |

## Hard Work firewall

No blocker in this ledger may be added to Hard Work eligibility.

Hard Work remains exactly one condition:

`completed_shifts >= 50`

and one semantic A6 reward:

`hardWork:lumber`.
