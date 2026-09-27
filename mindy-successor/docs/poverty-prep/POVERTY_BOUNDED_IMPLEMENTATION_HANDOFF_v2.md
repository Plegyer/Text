# Poverty Bounded Implementation Handoff v2

Status: bounded Lead handoff after ordinary-poverty / Secret Debt authoring-readiness work.

Classification:
- **READY_NOW** — production primitive/contract already exists and can be used without new Product answer;
- **CONTENT_AUTHORING_REQUIRED** — runtime is sufficient; canonical content is missing;
- **PRODUCT_DECISION_REQUIRED** — observable behavior/value remains Product-owned;
- **BOUNDED_RUNTIME_EXTENSION_REQUIRED** — a narrow runtime seam is still needed;
- **OPTIONAL_POLISH** — presentation/media specialization can follow later.

## Current baseline

Already shipped:
- NightFlow phases and forced intercept hooks;
- production `lodging.normal`, `lodging.cheap`, `lodging.street`;
- housing tiers `normal | cheap | street`;
- atomic lodging payment;
- next-day modifier queue;
- event/reaction delivery/history;
- career progression state primitives;
- world/public facts;
- ending/RunResult/Meta transaction infrastructure;
- presentationId with static/text fallback.

Secret Debt is not yet a shipped production career/state machine.

## Handoff matrix

| Area | Primary classification | Lead can do now | Blocker / remaining work |
| --- | --- | --- | --- |
| normal/cheap/street lodging infrastructure | **READY_NOW** | reuse production NightFlow/housing definitions, validate zero-money fallback | final prices/penalties still Product/balance-owned |
| ordinary street-event host | **READY_NOW** | use housingTier=street + reaction/history + existing effects | canonical event content missing |
| ordinary street-event production content | **CONTENT_AUTHORING_REQUIRED** | author helpful/neutral/bad families with fallbacks | final weights/effects/prose remain content/balance |
| ordinary recovery/help hooks | **CONTENT_AUTHORING_REQUIRED** | author starting-job/relationship/item/small-paid-event hooks using existing seams | provider/value identities may remain Product/content-owned |
| lender one-time encounter state | **CONTENT_AUTHORING_REQUIRED + PRODUCT_DECISION_REQUIRED** | prepare one-off state/eligibility using street context | chance, principal, provider/content |
| lender event runtime host | **READY_NOW** | Night/reaction system can host pending choice and reload-safe event | no generic event rewrite needed |
| delayed activation persistence | **READY_NOW at primitives / engineering shape open** | implement bounded current-compatible shape after Lead chooses representation | delay value Product/balance-owned; dedicated schema only if selected shape needs it |
| global 10-career professional lock | **BOUNDED_RUNTIME_EXTENSION_REQUIRED** | add/validate centralized ordinary-career availability enforcement | action->career ownership mapping must be authoritative |
| Secret Debt work action/career progression | **CONTENT_AUTHORING_REQUIRED** | existing career/action primitives can host work/stages | career IDs/content/thresholds/balance |
| forced Night runtime | **READY_NOW** | existing intercept/suppression/consumesNight primitives | exact intercept/payment/composition/penalty Product-owned |
| forced Night content | **CONTENT_AUTHORING_REQUIRED** | author variants after policy decisions | event identities/story/prose |
| School while bound | **PRODUCT_DECISION_REQUIRED** | ordinary-career lock can proceed independently | AVAILABLE/BLOCKED/CONDITIONAL unresolved |
| Activity/Forest while bound | **PRODUCT_DECISION_REQUIRED** | leave Activity contracts untouched | AVAILABLE/BLOCKED/CONDITIONAL unresolved |
| `paid_freedom` ending infrastructure | **READY_NOW** | use generic ending lifecycle | exact debt/eligibility + Meta/content unresolved |
| `paid_freedom` content | **CONTENT_AUTHORING_REQUIRED + PRODUCT_DECISION_REQUIRED** | prepare shell | exact payoff/reward/scene |
| `bound_life` ending infrastructure | **READY_NOW** | use generic ending lifecycle | exact progression condition + Meta/content unresolved |
| `bound_life` content | **CONTENT_AUTHORING_REQUIRED + PRODUCT_DECISION_REQUIRED** | prepare shell | threshold/milestone/reward/scene |
| `takeover` ending infrastructure | **READY_NOW** | generic ending + public dependency seams exist | exact external dependency/build/Meta unresolved |
| `takeover` content | **CONTENT_AUTHORING_REQUIRED + PRODUCT_DECISION_REQUIRED** | prepare shell | external hook/reward/scene |
| Secret Debt Meta rewards | **PRODUCT_DECISION_REQUIRED** | keep generic ending completion boundary | exact IDs/effects unknown; new Meta primitive only if chosen reward needs one |
| Palace exclusion | **READY_NOW / LOCKED** | preserve existing 10 ordinary Hard Work set | Secret Debt must never be added |
| semantic presentation fallback | **READY_NOW** | create IDs/fallbacks after content identities stabilize | bespoke art not required |
| GIF/bespoke route art | **OPTIONAL_POLISH** | schedule after semantic content | art priority/assets |

## What can be implemented before Product decisions

Safe bounded work:
1. ordinary poverty content that does not depend on final numeric lock;
2. canonical street event family shells/effects with parameterized balance;
3. one-off Secret Debt encounter persistence structure with symbolic config;
4. delayed-activation engineering seam with configurable interval;
5. ordinary-career gating helper/validator that reads bound state but does not touch School/Activity;
6. Secret Debt career content shells/stages without final thresholds;
7. generic ending shells without final eligibility/Meta;
8. presentation fallback namespaces.

Do not publish Product acceptance for behavior whose exact outcome still depends on an unanswered decision.

## What must wait for Product answers

Final observable behavior cannot close without:
- normal/cheap/street final price/penalty values where acceptance asserts them;
- lender chance;
- principal/debt;
- activation interval if balance-owned;
- School/Activity availability while bound;
- forced-Night intercept/payment/composition/penalty;
- exact `paid_freedom` eligibility;
- exact `bound_life` progression requirement;
- exact `takeover` build/external dependency;
- exact Meta rewards.

## Bounded runtime work

Current clear cross-cutting extension:
**ordinary-career availability enforcement while bound**.

Required properties:
- affects exactly the 10 ordinary careers;
- same rule in availability listing and direct dispatch;
- blocks reactive progression while unavailable;
- preserves career state;
- releases debt-specific lock on genuine dependency exit;
- does not include School/Activity;
- does not change Palace completed Hard Work history.

Delayed activation may use existing career/calendar primitives; only add schema/runtime state if the chosen technical representation truly needs it.

## Ordinary poverty first

Lead can ship visible ordinary poverty before Secret Debt decisions by combining:
- existing three lodging tiers;
- canonical ordinary street events;
- at least one optional recovery/help hook;
- seasonal/context variation;
- presentation fallback;
- zero-money acceptance.

Secret Debt must not be required for this slice.

## Palace firewall

Secret Debt is additional to the 10 ordinary professions.

Never:
- add Secret Debt to `ordinaryHardWorkCareers`;
- grant an ordinary Hard Work reward for Secret Debt;
- count any Secret Debt outcome toward Palace 10/10.

## Lumber firewall

Preserve:
- Lumber Hard Work ONLY `completed_shifts >= 50`;
- exact `hardWork:lumber`;
- exact Forest continuation `activityResult(lumber.forest, success, lumber.forest.success)`.

## Handoff conclusion

Lead has enough shipped primitives to begin ordinary poverty content and most Secret Debt scaffolding without architecture rewrite.

Product decisions block final behavior/content values, not the entire implementation stream.

The one clear bounded cross-cutting runtime requirement is safe ordinary-career availability gating; everything else should reuse current primitives unless implementation proves a narrower missing seam.
