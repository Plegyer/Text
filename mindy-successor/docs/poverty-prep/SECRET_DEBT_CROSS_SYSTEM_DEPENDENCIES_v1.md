# Secret Debt Cross-System Dependencies v1

Status: dependency matrix for Secret Debt / hidden Slave career.

Primary status vocabulary:
- **ALREADY_DEFINED** — Product/architecture contract already fixes the behavior;
- **REQUIRES_PRODUCT_DECISION** — behavior is intentionally unresolved and needs explicit Product ownership;
- **CONTENT_AUTHORING** — runtime shape is sufficiently known; concrete scenes/options/facts/content are still needed;
- **RUNTIME_SEAM** — implementation needs a domain/runtime integration seam not yet represented as shipped Secret Debt behavior.

Each row uses one primary status. Notes may identify downstream implementation/content that follows from the primary decision.

## Housing / street

| Point | Status | Contract / dependency |
| --- | --- | --- |
| Secret Debt offer is reachable only from street sleep context | **ALREADY_DEFINED** | User-directed hidden route begins from street sleep, not normal/cheap lodging. |
| Encounter is exceptional, not ordinary poverty recovery | **ALREADY_DEFINED** | Ordinary poverty must work even if offer never appears or is refused. |
| Ordinary street pool and Secret Debt check are separate | **CONTENT_AUTHORING** | Need concrete ordinary street pool plus separate one-time lender event; no canonical event IDs fixed yet. |
| Persist one-time street encounter state across reload | **RUNTIME_SEAM** | Secret Debt domain state must prevent reroll/reoffer. |
| Exact street penalty / housing prices | **REQUIRES_PRODUCT_DECISION** | Balance numbers remain open. |

## Job availability

| Point | Status | Contract / dependency |
| --- | --- | --- |
| After debt activation, all 10 ordinary jobs are blocked | **ALREADY_DEFINED** | Domain rule, not UI hiding. |
| Hidden `slave` career becomes available while bound | **ALREADY_DEFINED** | Additional hidden career, not part of ordinary roster. |
| Existing ordinary career progress is preserved while blocked | **ALREADY_DEFINED** | No reset/deletion. |
| Blocked ordinary careers cannot progress reactively while bound | **ALREADY_DEFINED** | Event Resolver must respect availability/domain lock. |
| Implement global professional-lock projection into job availability/resolver | **RUNTIME_SEAM** | Needs a persisted Secret Debt state exposed to job eligibility/progression. |
| Release professional lock after genuine exit from dependency | **RUNTIME_SEAM** | Must restore ordinary availability without regranting/resetting progress. |

## School

| Point | Status | Contract / dependency |
| --- | --- | --- |
| Whether ordinary School remains available while bound | **REQUIRES_PRODUCT_DECISION** | Draft explicitly leaves School unblocked unless Product later decides otherwise. |
| If School is allowed, exact bound-state variants/restrictions | **CONTENT_AUTHORING** | Only after availability decision. |
| If School result is used by takeover or another outcome, exact provider/public result | **REQUIRES_PRODUCT_DECISION** | Must not invent threshold/provider. |
| Read accepted School public result from Secret Debt outcome logic | **CONTENT_AUTHORING** | Use public boundary, not School-private counters. |

## Activity / Forest / large activity

| Point | Status | Contract / dependency |
| --- | --- | --- |
| Whether large Activity remains available while bound | **REQUIRES_PRODUCT_DECISION** | Draft leaves Activity availability open. |
| Existing active Activity save/resume must remain valid | **ALREADY_DEFINED** | Activity lifecycle/save contract is already locked. |
| Activity outcome may serve as external condition for a complex Secret Debt route | **CONTENT_AUTHORING** | Exact route/result dependency remains open. |
| Secret Debt must not replace exact Lumber Forest continuation | **ALREADY_DEFINED** | Lumber A5 remains `activityResult(lumber.forest, success, lumber.forest.success)`. |

## NightFlow

| Point | Status | Contract / dependency |
| --- | --- | --- |
| Bound state has mandatory forced Night obligation | **ALREADY_DEFINED** | It suppresses ordinary voluntary Night freedom and is distinct from daytime work. |
| Night forced-event host supports before/after lodging/choice interception | **ALREADY_DEFINED** | Target Night contract already provides intercept points and suppression flags. |
| Exact intercept point for Secret Debt Night | **REQUIRES_PRODUCT_DECISION** | Before lodging vs after lodging/choice remains open. |
| Whether forced Night suppresses lodging payment | **REQUIRES_PRODUCT_DECISION** | Must be authored explicitly; cannot depend on handler order. |
| Exact next-day Energy penalty | **REQUIRES_PRODUCT_DECISION** | Penalty exists structurally; magnitude open. |
| Persist forced-night phase/idempotency | **RUNTIME_SEAM** | Secret Debt forced event must use NightFlow persistence so reload cannot double-run or double-advance day. |
| Concrete forced Night variants/scenes | **CONTENT_AUTHORING** | NPC/prose/presentation/counters remain to author. |

## Relationships

| Point | Status | Contract / dependency |
| --- | --- | --- |
| Secret Debt career should have relationship/story events like a full career | **ALREADY_DEFINED** | Career depth requirement. |
| Concrete lender/master/ally relationship identities | **CONTENT_AUTHORING** | Characters and route-specific relationships are not fixed. |
| Relationship may be external condition for takeover | **CONTENT_AUTHORING** | Exact relationship/fact/stage remains open; use public typed boundary. |
| Private relationship counters may not be read ad hoc by unrelated systems | **ALREADY_DEFINED** | Follow typed/public ownership pattern. |

## Items / economy

| Point | Status | Contract / dependency |
| --- | --- | --- |
| Acceptance grants immediate economic benefit and creates delayed debt | **ALREADY_DEFINED** | Structural relationship is fixed; exact amounts are open. |
| Paid Freedom is the economy-solution outcome family | **ALREADY_DEFINED** | It is mechanically distinct from career/endurance and takeover. |
| Exact principal/future debt/buyout values | **REQUIRES_PRODUCT_DECISION** | Balance remains open. |
| Whether item/resource is required for takeover | **REQUIRES_PRODUCT_DECISION** | At least one external condition is required, but category can be item/ally/School/Activity/etc. |
| Concrete resource/item recovery and sale/barter hooks | **CONTENT_AUTHORING** | Only use systems accepted elsewhere; do not invent shop economy. |
| Persist debt/progress/transaction state | **RUNTIME_SEAM** | Secret Debt needs authoritative durable debt/career state and idempotent payments. |

## Endings

| Point | Status | Contract / dependency |
| --- | --- | --- |
| Three outcome families: `paid_freedom`, `bound_life`, `takeover` | **ALREADY_DEFINED** | Distinct mechanical families required. |
| Paid Freedom removes professional lock | **ALREADY_DEFINED** | Ordinary jobs return if run continues under common ending semantics. |
| Bound Life is a career/endurance fate, not generic failure | **ALREADY_DEFINED** | Conscious commitment required. |
| Takeover requires multi-system condition beyond shifts | **ALREADY_DEFINED** | At least one external condition required. |
| Exact thresholds/stages/choices/external IDs | **REQUIRES_PRODUCT_DECISION** | Do not reduce outcomes to 20/40/60 shifts or invent thresholds. |
| Concrete ending scenes/transactions/presentation | **CONTENT_AUTHORING** | Must use common eligible -> commit -> complete flow. |
| Exactly-once ending completion / RunResult integration | **RUNTIME_SEAM** | Hidden-career ending definitions must enter the existing ending pipeline without duplicate reward/lock release. |

## Meta

| Point | Status | Contract / dependency |
| --- | --- | --- |
| Meta reward is applied only after ending completion | **ALREADY_DEFINED** | Common ending/meta transaction rule. |
| Exact Meta reward for all three Secret Debt outcomes | **REQUIRES_PRODUCT_DECISION** | Draft explicitly leaves rewards open. |
| Bound Life Palace credit | **ALREADY_DEFINED** | It does **not** count toward Palace 10/10 ordinary Hard Work prerequisite. |
| Other hidden-career Meta interactions | **REQUIRES_PRODUCT_DECISION** | Do not infer new Palace/meta credit. |

## Palace prerequisite exclusion

| Point | Status | Contract / dependency |
| --- | --- | --- |
| Palace unlock requires unique Hard Work across all 10 ordinary jobs | **ALREADY_DEFINED** | `completedOrdinaryHardWork contains ALL 10 ordinary job IDs`. |
| Secret Debt / `bound_life` is excluded | **ALREADY_DEFINED** | Hidden career is additional; does not occupy an ordinary slot. |
| Other Secret Debt outcomes are excluded from 10/10 count | **ALREADY_DEFINED** | Palace prerequisite is ordinary jobs only. |

## Cross-system implementation order constraints

These are dependency facts, not Product recommendations:
- Secret Debt domain state must exist before job blocking and forced Night can be persisted safely;
- housing/street one-time trigger must write that domain state exactly once;
- School/Activity availability cannot be implemented as locked behavior until Product decides it;
- ending authoring must not choose exact rewards/thresholds before Product locks them;
- Palace counting must ignore Secret Debt regardless of Secret Debt outcome.

## Lumber firewall

Secret Debt integration may coexist with Lumber but does not modify:
- Lumber Hard Work: ONLY `completed_shifts >= 50`;
- exact Lumber reward `hardWork:lumber`;
- exact Forest continuation `activityResult(lumber.forest, success, lumber.forest.success)`.
