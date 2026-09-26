# Lumber PA Closure Row Map v1

Status: closure-candidate map after Product Acceptance evidence PR #21 and the generic capability-aware runtime direction.

## Closure classes

- **ALREADY_SHIPPED** — row contract is available in the current production runtime/content.
- **RUNTIME_INFRASTRUCTURE** — a generic item/capability or Activity-option seam must exist before product authoring can close the row naturally.
- **AUTHORING** — runtime can support the boundary, but a product-owned source/rule/result is missing.
- **RICHER_CONTENT_DEPTH** — core mechanics exist; Product Acceptance still requires authored route/challenge/season depth.

A row can have more than one unresolved class. An upstream blocker does not make a downstream shipped transaction unshipped.

## PA00–PA26 closure map

| Row | Primary closure state | Secondary dependency | Closure candidate |
| --- | --- | --- | --- |
| PA00 | **ALREADY_SHIPPED** | — | shipped catalog/save baseline |
| PA01 | **ALREADY_SHIPPED** | — | character creation |
| PA02 | **ALREADY_SHIPPED** | — | target Work `lumber.shift` is shipped |
| PA03 | **ALREADY_SHIPPED** | — | ordinary Lumber shift |
| PA04 | **ALREADY_SHIPPED** | — | seasonal/repeatable shift package |
| PA05 | **ALREADY_SHIPPED** | — | reactive `lumber.career-first-shift` |
| PA06 | **ALREADY_SHIPPED** | — | professional Foreman route without romance |
| PA07 | **AUTHORING** | School transaction infrastructure already shipped | author one School-owned progression result that publishes the accepted Lumber management public fact |
| PA08 | **AUTHORING** | existing Lumber listener already shipped | publish `lumber.school.management-ready` exactly once so `lumber-cross.school-management-return` can react naturally |
| PA09 | **RUNTIME_INFRASTRUCTURE + AUTHORING** | inventory Save storage exists | generic capability-aware item ownership/query + one accepted `old_boundary_token` acquisition source |
| PA10 | **ALREADY_SHIPPED** | — | NightFlow start |
| PA11 | **ALREADY_SHIPPED** | — | `lodging.normal`, exactly-once payment |
| PA12 | **ALREADY_SHIPPED** | — | `lumber.foreman.night` + Night event |
| PA13 | **ALREADY_SHIPPED** | — | Night completion / next day |
| PA14 | **RUNTIME_INFRASTRUCTURE + AUTHORING** | `lumber.forest` and UI already shipped | replace test-only capability fact setup with real owned `enter_old_boundary` capability and natural source |
| PA15 | **ALREADY_SHIPPED** | upstream PA14 reachability | deterministic Activity save/resume |
| PA16 | **RICHER_CONTENT_DEPTH** | authoring required | author 3 routes, 3 challenge families and season topology/options while preserving current Activity contract |
| PA17 | **RUNTIME_INFRASTRUCTURE + AUTHORING** | richer Forest content consumes the seam | generic capability-gated Activity option/action surface + authored item option; injection is not a pass |
| PA18 | **ALREADY_SHIPPED** | upstream PA14/PA16/PA17 for natural full flow | success result + exact A5 `activityResult` + Lumber continuation trigger |
| PA19 | **ALREADY_SHIPPED** | richer route presentation/depth only | distinct escape result and no success-only rewards |
| PA20 | **ALREADY_SHIPPED** | upstream natural Forest reachability | post-Activity Lumber continuation without extra shift |
| PA21 | **ALREADY_SHIPPED** | accepted accelerator may be used for long 50-shift threshold; natural complex branch still depends on chosen authoring path | simultaneous ending eligibility contract |
| PA22 | **ALREADY_SHIPPED** | — | continue normal play while eligible/uncommitted |
| PA23 | **ALREADY_SHIPPED** | — | explicit central ending commitment |
| PA24 | **ALREADY_SHIPPED** | — | central completion / stable RunResult |
| PA25 | **ALREADY_SHIPPED** | — | exact `hardWork:lumber` Meta application once |
| PA26 | **ALREADY_SHIPPED** | — | New Run visible +3 Strength / +3 Endurance effect |

## Rows closable by runtime infrastructure

### PA09

Need a generic production representation/query for item capabilities so `old_boundary_token` can authoritatively provide `enter_old_boundary` without a test-only worldFact adapter.

Runtime closure alone does not choose the acquisition source.

### PA14

`enterActivity(lumber.forest)` already exists. The missing runtime seam is natural capability ownership/query instead of injected `lumber.capability.enter-old-boundary`.

### PA17

Need a generic capability-gated Activity option/action surface beyond the current `advance|escape` command surface.

Availability must be derived from actual owned item/capability state and survive save/reload.

## Rows still needing product authoring

### PA07–PA08

School infrastructure is shipped. Product still needs an accepted School progression rule that publishes:

`lumber.school.management-ready`

exactly once.

Course, track, lesson threshold, milestone/project/exam/certificate remain OPEN.

### PA09 / PA14 / PA17

After generic runtime seams exist, Product still must choose:
- one reachable Old Boundary Token acquisition source;
- inventory-facing acquisition presentation;
- retain/consume/turn-in policy;
- exact capability-driven Forest option placement.

## Rows needing richer content depth only

### PA16

Current `counter.v1` proves Activity persistence and result mechanics but not full product depth.

Need:
- logging road;
- hunter trail;
- old boundary path;
- navigation;
- physical obstacle;
- interpretation / ritual anomaly;
- season-driven topology/options.

Exact lore, NPC identity, loot and encounter IDs remain authoring-owned.

PA19's mechanics are already shipped; richer route-context presentation around escape belongs to the same content-depth work, not a runtime blocker.

## Already shipped rows with upstream blockers

PA15 and PA18–PA20 remain shipped contracts even though a natural end-to-end player path cannot close until PA09/PA14/PA16/PA17 are authored.

Do not relabel their engine/result transactions as missing.

## Hard Work closure firewall

Hard Work is fully closed and independent.

Ending: `ending.lumber.hard-work`

Only condition:

`completed_shifts >= 50`

Exact reward:

`hardWork:lumber`

PA21–PA26 must not gain an item, Forest, School, Foreman, season or milestone prerequisite.

## Smallest closure path

1. runtime: capability-aware item ownership/query;
2. runtime: capability-gated Activity options;
3. authoring: Old Boundary Token acquisition/use;
4. authoring: School management public result;
5. content depth: 3 Forest routes, 3 challenge families, season topology/options;
6. execute PA09–PA20 naturally without capability injection;
7. rerun PA21–PA26 unchanged.
