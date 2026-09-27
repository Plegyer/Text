# Forest Authoring-Ready Completeness v2

Status: post-PR26 separation of runtime-ready primitives from still-missing Forest authoring.

## Runtime-ready primitives

Already shipped on main:
- Activity `lumber.forest`;
- entry cost 2 daytime Energy;
- same-day/resume-safe Activity envelope;
- stable route state via authored options;
- generic option conditions including `itemCapability`;
- inventory-derived capabilities;
- route selection persistence;
- legacy optionModelVersion 0 compatibility with `advance|escape`;
- distinct terminal results: `lumber.forest.success`, `lumber.forest.escape`, `lumber.forest.failure`;
- exact Lumber continuation through `activityResult`;
- static/text presentation fallback and semantic presentation IDs.

Current item capability primitives already exist:
- `cut_heavy_wood` from reinforced axe;
- `cross_rough_route` from rope kit;
- `preserve_specimen` from field preservation kit;
- `enter_old_boundary` from Old Boundary Token.

These primitives are runtime-ready. They are not, by themselves, authored PA16 completeness.

## Authored-current route contexts

### Logging road

Current production option:
`forest.route.logging-road`

Current route state:
`logging-road`

Conditions:
none.

Status:
**AUTHORED_CURRENT / SHIPPED**.

### Old boundary

Current production option:
`forest.route.old-boundary`

Current route state:
`old-boundary`

Condition:
`itemCapability(enter_old_boundary) present=true`

Status:
**AUTHORED_CURRENT / SHIPPED RUNTIME GATE**.

Natural token acquisition/use policy is still a separate Product decision; that does not erase the authored route gate itself.

## Missing third route

Required route concept:
**Hunter trail**.

Status:
**MISSING AUTHORING**.

Locked:
- route identity/context;
- participation in navigation-family content;
- must remain distinct from logging road and old boundary.

Still OPEN:
- canonical production option ID;
- clue/public-fact identity;
- navigation-capability identity;
- source/provider;
- reward/lore;
- thresholds.

Runtime readiness:
**READY** for ordinary public-fact/item-capability conditions and route state.

## Missing challenge families

All three required families remain content-authoring gaps.

### Navigation

Status:
**MISSING AUTHORED CHALLENGE INSTANCE**.

Runtime-ready dependencies may include:
- Wits;
- Reason;
- public Hunter/route knowledge;
- navigation capability;
- season condition.

### Physical obstacle

Status:
**MISSING AUTHORED CHALLENGE INSTANCE**.

Runtime-ready dependencies may include:
- Strength;
- Endurance;
- Dexterity;
- `cross_rough_route`;
- `cut_heavy_wood`;
- season condition.

### Interpretation / ritual anomaly

Status:
**MISSING AUTHORED CHALLENGE INSTANCE**.

Runtime-ready dependencies may include:
- Reason;
- Magic;
- accepted School Arcana public fact;
- `preserve_specimen` or another accepted sample/tool capability;
- season condition.

No final threshold, prose, lore, NPC, sample or reward identity is selected here.

## Missing seasonal topology

Requirement:
at least one deterministic route/challenge availability or Activity-resource difference by season.

Status:
**MISSING AUTHORING**.

Runtime readiness:
existing calendar-season conditions and Activity options can host season-dependent authoring where accepted.

Still missing:
- actual spring/summer/autumn/winter option/topology bindings;
- concrete route/challenge placement;
- any exact authored resource delta.

Season must change topology/options or Activity-owned behavior, not only art.

## Save/reload readiness

Runtime contract is already ready for:
- route identity persistence;
- resolved option/challenge identity persistence;
- deterministic option recomputation from authoritative state;
- legacy option-model compatibility;
- no reload reroll after accepted resolution.

Authoring must use those seams; no new save primitive is required unless a future Product decision introduces genuinely new durable state.

## Presentation dependencies

Current RC presentation state:
- central media stage shipped;
- semantic `presentationId` shipped;
- static/text fallback safe;
- RC-blocking presentation assets: 0.

Forest route/challenge-specific presentation remains **AUTHORING-DEPENDENT**, not runtime-blocking.

Do not finalize route/challenge-specific media identity before the corresponding gameplay/content identity is authored.

Optional future GIFs or bespoke visuals remain polish-only while fallback remains valid.

## Completeness matrix

| Dimension | Runtime ready | Authored current | Remaining |
| --- | --- | --- | --- |
| Activity entry/resume | YES | YES | none |
| logging road | YES | YES | none |
| old-boundary route gate | YES | YES | natural token source/use policy remains separate |
| hunter trail | YES | NO | route condition/source/provider/reward authoring |
| navigation family | YES | NO | authored challenge instance |
| physical obstacle family | YES | NO | authored challenge instance |
| interpretation/ritual anomaly | YES | NO | authored challenge instance |
| seasonal topology | YES | NO | at least one deterministic seasonal difference |
| terminal success/escape/failure | YES | YES | none |
| save/reload checkpoint model | YES | YES at primitive level | apply to new authored content |
| presentation fallback | YES | YES | route/challenge specialization after content identity |

## Final completeness status

Technical/runtime readiness:
**GREEN**.

Full Forest Product Acceptance depth:
**NOT COMPLETE**.

Missing authored requirements remain:
1. Hunter trail;
2. navigation challenge;
3. physical obstacle challenge;
4. interpretation/ritual anomaly challenge;
5. deterministic season-dependent topology/options.

## Locked firewalls

Forest completion does not affect Hard Work eligibility.

Hard Work remains only:
`completed_shifts >= 50`

Exact reward:
`hardWork:lumber`.

A5 remains exact:
`activityResult(lumber.forest, success, lumber.forest.success)`.
