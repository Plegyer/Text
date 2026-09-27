# Poverty Recovery Source Authoring Matrix v1

Status: authoring matrix for ordinary poor-run recovery sources.

Global rule: no single source below may become mandatory. Secret Debt is not an ordinary recovery source.

| Recovery source | Structural authority | Content needed | Runtime seam | Balance dependency | Anti-softlock role |
| --- | --- | --- | --- | --- | --- |
| starting-job work | `ECONOMY_AND_POVERTY_DRAFT_v0.md`: basic starting work remains reachable without mandatory paid tool | ordinary shift content already owned by each career | existing job availability/action/economy | wage values | primary reliable income floor before any Secret Debt bound-state lock |
| cheap lodging | poverty draft + housing balance candidate | cheap housing option, context restrictions/events | Night lodging resolution/payment/context gating | price and penalties | reduces spend pressure so player can avoid street or preserve School money |
| ordinary street event | poverty draft ordinary street pool | helpful/neutral/bad event set, cooldowns, season variants | Night/event history/RNG/public effects | weights and effect magnitudes | occasional recovery/opportunity, never sole guaranteed income |
| relationship help | poverty draft recovery hooks | accepted helper/favor content and public boundary | relationship public fact/stage + event/effect | help value/frequency | alternative recovery for some builds, not universal mandatory rescuer |
| item/resource assistance | poverty draft recovery hooks | accepted consumable/resource use, earned resource opportunities | inventory/capability/effect transactions | item values/drop/access rates | converts prior preparation/resources into recovery without replacing job floor |
| small paid event | poverty draft recovery hooks | low-gate paid task/event content | event eligibility + money effect + history | pay and frequency | extra short-term income source when normal plan is strained |
| optional sale/barter | only if separately accepted by Product/economy design | seller/buyer/context and allowed resource list | economy transaction/inventory removal | prices/exchange rates | supplemental liquidation path; never assumed before acceptance |

## 1. Starting-job work

Authority status: **STRUCTURALLY REQUIRED** as anti-softlock floor outside the active bound Secret Debt career.

Content requirements:
- at least one reachable starting profession under ordinary conditions;
- basic shift cannot require an obligatory purchased tool;
- reward/income commits exactly once;
- job-specific normal eligibility still applies.

Runtime seam:
- existing action/job availability;
- career progression;
- money effect.

Balance-owned:
- exact wage;
- seasonal/stat wage modifiers.

Anti-softlock invariant:
- at zero money, ordinary poverty must still have a reachable earned-income path unless the run is deliberately in Secret Debt bound state, where the hidden career must provide its own progress/exit path.

## 2. Cheap lodging

Authority status: **DIRECTED STRUCTURE**.

Content requirements:
- distinct from normal room;
- cheaper relationship to normal room;
- some privacy/Night tradeoff;
- not a failure state.

Runtime seam:
- lodging selection/payment;
- housing-context option filtering;
- next-day modifiers/events.

Balance-owned:
- exact price;
- exact restrictions/penalties.

Anti-softlock role:
- lowers recurring cost pressure and reduces frequency of forced street use.

## 3. Ordinary street events

Authority status: **DIRECTED STRUCTURE**.

Content requirements:
- helpful/neutral/bad families;
- repeatable/cooldown history;
- seasonal variants;
- optional relationship/item hooks;
- Secret Debt excluded from ordinary pool.

Runtime seam:
- street context;
- event resolver/history/RNG;
- accepted effect primitives.

Balance-owned:
- chance/weights;
- money/resource/condition values.

Anti-softlock role:
- broadens recovery possibilities, but a helpful event may not be required for survival.

Bad-event guard:
- cannot erase all reachable recovery paths.

## 4. Relationship help

Authority status: **DIRECTED OPTIONAL HOOK**.

Content requirements:
- accepted relationship/provider identity;
- public fact/stage boundary;
- help/favor scene/effect;
- repeatability/cooldown policy.

Runtime seam:
- typed/public relationship state;
- event eligibility/effects.

Balance-owned:
- amount/value;
- frequency/cost/favor requirement.

Anti-softlock role:
- optional build-dependent help; never the sole universal rescuer.

## 5. Item/resource assistance

Authority status: **DIRECTED OPTIONAL HOOK**.

Content requirements:
- accepted item/resource identity;
- how it was earned/acquired;
- explicit use/sale/barter transaction where accepted.

Runtime seam:
- inventory/item effects;
- capability/public-state checks if relevant;
- economy transaction.

Balance-owned:
- item value;
- resource yield;
- conversion/recovery magnitude.

Anti-softlock role:
- rewards prior preparation and gives alternate recovery, but zero-money survival cannot assume the player owns an optional item.

## 6. Small paid event

Authority status: **DIRECTED OPTIONAL HOOK**.

Content requirements:
- low-gate event/task;
- deterministic eligibility/history;
- explicit money reward transaction;
- presentation/fallback.

Runtime seam:
- generic event/action + money effect.

Balance-owned:
- pay;
- frequency;
- any small resource cost.

Anti-softlock role:
- supplemental income path; useful when ordinary job access/timing is constrained, but not mandatory.

## 7. Optional sale/barter

Authority status: **NOT YET PRODUCT-LOCKED**.

Content requirements if accepted:
- allowed resource categories;
- transaction venue/context;
- price/exchange logic;
- UI/presentation.

Runtime seam:
- inventory removal + money/resource addition, if existing economy primitives are sufficient.

Balance-owned:
- prices;
- rates;
- limits/cooldowns.

Anti-softlock role:
- optional liquidation path only; must not be assumed by baseline poverty acceptance until Product accepts the system.

## Recovery portfolio acceptance

A production poverty slice should prove a portfolio, not one magic source:
1. deterministic earned-income floor;
2. cheaper housing tradeoff;
3. ordinary street event pool;
4. at least one optional authored help/resource path;
5. zero-money next-day progression;
6. Secret Debt not required.

## Bound Secret Debt exception

Once Secret Debt becomes `bound`:
- all 10 ordinary jobs are blocked by its separate Product rule;
- starting-job recovery no longer applies while that professional lock is active;
- hidden career must provide its own progression/exit routes;
- School/Activity availability remains separately Product-owned.

This exception does not weaken ordinary poverty anti-softlock outside the hidden bound state.

## Validation rules

For every source:
- save/reload does not duplicate reward/cost;
- no source silently grants Secret Debt state;
- no optional source becomes hidden mandatory prerequisite;
- accepted effects use authoritative money/inventory/public state;
- final numeric values remain parameterized until balance approval.
