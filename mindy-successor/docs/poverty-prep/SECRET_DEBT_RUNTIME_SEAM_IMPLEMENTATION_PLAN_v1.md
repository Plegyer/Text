# Secret Debt Runtime-Seam Implementation Plan v1

Status: bounded implementation map against current production architecture.

Classification:
- **READY** — current production primitive can host the behavior without generic architecture change;
- **NEEDS_BOUNDED_RUNTIME_EXTENSION** — a narrow cross-cutting seam is missing or should be centralized to preserve invariants;
- **PRODUCT_DECISION_BLOCKED** — runtime shape can be prepared, but behavior cannot be finalized until Product chooses an open policy.

This plan chooses no chance, debt amount, reward, threshold, School policy or Activity policy.

## 1. NightFlow intercepts

Status: **READY + PRODUCT_DECISION_BLOCKED for exact policy**.

Current production already supports:
- `before_lodging` forced check;
- `after_lodging` forced check;
- `after_choice` forced check;
- `suppressLodgingPayment`;
- `suppressVoluntaryMenu`;
- `consumesNight`;
- persisted Night phase;
- exactly-once lodging payment;
- exactly-once calendar advance;
- reload-safe pending forced event.

Secret Debt can therefore host a forced Night obligation with existing primitives.

Still Product-owned:
- intercept point;
- lodging-payment suppression;
- modifier composition;
- exact penalty.

No broad NightFlow rewrite is justified.

## 2. `housingTier=street`

Status: **READY**.

Current production already has:
- target housing tiers `normal | cheap | street`;
- production `lodging.street` with zero money cost;
- `housingTier` condition;
- persisted `housingState.current`;
- lodging-specific next-day modifiers.

Secret Debt lender eligibility can use authoritative street housing context.

Ordinary street content can be authored independently.

No new housing enum/schema is needed.

## 3. Reaction / event delivery

Status: **READY**.

Current architecture supplies:
- reaction triggers;
- forced/normal event priority;
- blocking pending scenes;
- event history;
- probabilistic event selection with persisted pending result;
- `nightPhase` triggers;
- `choiceResolved` / action/career/world/calendar reactions.

Suitable Secret Debt uses:
- lender offer delivery after authoritative street context exists;
- activation reveal;
- career milestones;
- forced Night variants;
- relationship/story events;
- outcome continuation scenes.

Requirement:
- one-time lender eligibility must be derived from authoritative Secret Debt state/history, not a temporary QA flag.

## 4. Secret Debt domain / career state machine

Status: **READY for career progression primitives; NEEDS_BOUNDED_RUNTIME_EXTENSION only if Product requires a dedicated typed SecretDebtState outside existing career/public state**.

Current generic production supplies persisted career state:
- stage;
- shifts;
- counters;
- choices;
- facts;
- machine transitions with typed conditions/effects.

Minimum compatible representation can store:
- hidden-career stage such as inactive/pending/bound;
- acceptance/activation counters/facts/choices where semantically appropriate;
- hidden-career progression after activation.

However, implementation must keep the route coherent rather than scatter it across unrelated booleans.

Lead should decide during implementation whether:
- a dedicated `secretDebt` domain object is warranted for debt-specific durable fields; or
- existing career state + public facts provide a bounded, explicit owner.

Do not add a new schema domain merely because content becomes concrete.

## 5. World/public facts

Status: **READY**.

Current production supports:
- persisted `worldFacts`;
- `worldFact` conditions;
- add/remove world-fact effects;
- career facts/choices/counters;
- relationship public boundaries.

Appropriate uses:
- externally readable Secret Debt result/route facts;
- takeover external dependencies;
- School/relationship/Activity public integration where accepted.

Do not use world facts to replace state whose true owner is Secret Debt career progression or inventory.

## 6. Delayed activation / calendar interaction

Status: **READY at condition/calendar primitive level; implementation shape to be selected in item 75**.

Current production supports:
- persisted elapsed calendar days;
- `calendarElapsedDays` conditions;
- `calendarAdvanced` / `dayStarted` reactions;
- persisted career counters/facts/choices;
- event history;
- scheduled/optional event containers in save state.

A delayed accepted-loan boundary can therefore be represented without a timer service.

Exactly-once activation needs:
- persisted acceptance/target-day data or equivalent derivable state;
- reaction check at deterministic calendar boundary;
- committed state transition to `bound`;
- reload-safe no-repeat condition.

Delay length remains balance-owned.

## 7. Next-day modifiers

Status: **READY + PRODUCT_DECISION_BLOCKED for composition policy**.

Current production supports:
- `addNextDayModifier`;
- Energy delta;
- stat effects;
- source tags;
- lodging modifiers;
- final application at Night boundary.

Secret Debt forced Night can contribute a modifier with existing effect primitives.

Open:
- exact penalty;
- stack/replace/cap priority when housing and forced Night affect same metric.

No new modifier mechanism is needed for a simple additive policy; different Product semantics may require bounded policy logic.

## 8. Ending / RunResult / Meta infrastructure

Status: **READY for ending lifecycle; PRODUCT_DECISION_BLOCKED for exact Meta rewards**.

Existing production supplies:
- ending definitions with conditions;
- eligibility;
- explicit commitment;
- central completion;
- stable RunResult;
- exactly-once Meta transaction;
- New Run Meta persistence.

Secret Debt outcomes can use this generic lifecycle.

Important current limitation:
- `hardWork` Meta reward schema is intentionally restricted to the 10 ordinary careers.

Therefore Secret Debt must not counterfeit an ordinary `hardWork` reward.

If Product selects a Secret Debt Meta effect representable by existing generic `unlock`/other accepted Meta primitive, use it.

If Product selects a genuinely new Meta effect category, that specific reward may require a bounded Meta-schema/runtime extension.

Do not extend Meta before the reward is decided.

## 9. Ordinary-career action availability gating

Status: **NEEDS_BOUNDED_RUNTIME_EXTENSION / CENTRALIZATION**.

Fixed Product rule:
- while Secret Debt is bound, all 10 ordinary careers are unavailable;
- their progress is preserved;
- Secret Debt career remains available;
- after dependency exit, normal independent gates resume.

Current production conditions can gate individual actions, but there is no authoritative Secret-Debt global professional-lock seam that automatically protects all 10 ordinary career actions and reactive progression as one domain rule.

Why a bounded seam is needed:
- duplicating `not secretDebtBound` into every ordinary action risks omission/drift;
- UI availability and command dispatch must agree;
- reactive ordinary-career progression must not advance while profession is blocked;
- future content variants should inherit the lock automatically.

Minimal extension responsibility:
- expose one authoritative ordinary-career availability predicate/helper or equivalent centralized gate;
- read only Secret Debt bound/dependency state plus each career's existing normal conditions;
- affect exactly the 10 ordinary careers;
- leave non-job systems untouched;
- restore normal availability when debt-specific lock resolves.

This is the only clearly identified cross-cutting runtime seam in the current plan.

## 10. Hidden Secret Debt work availability

Status: **READY once hidden career definition/state is authored**.

Existing action/career conditions can expose hidden work only in the accepted bound stage/fact.

Needs content:
- career/action ID;
- shift effects;
- stage/progression authoring.

No generic action-system rewrite is needed.

## 11. School availability while bound

Status: **PRODUCT_DECISION_BLOCKED**.

Do not include School in the ordinary-career lock helper.

Product must choose:
- available;
- blocked;
- conditional.

After choice, current School action/condition/public-state seams are expected to be sufficient unless the chosen rule requires a new primitive.

## 12. Activity / Forest availability while bound

Status: **PRODUCT_DECISION_BLOCKED**.

Do not include Activity in the ordinary-career lock helper.

Product must choose:
- available;
- blocked;
- conditional.

Any implementation must preserve:
- Activity entry transaction;
- save/resume;
- route state;
- terminal results;
- exact Lumber Forest continuation.

## 13. Palace prerequisite exclusion

Status: **READY / ALREADY STRUCTURALLY ENFORCED**.

Current schema defines exactly 10 `ordinaryHardWorkCareers`.

Secret Debt is not in that set.

Do not add it.

Secret Debt outcomes must add zero ordinary Hard Work credit.

## Seam summary

| Seam | Classification |
| --- | --- |
| NightFlow forced intercepts | READY / policy decision blocked |
| housingTier=street | READY |
| reaction/event delivery | READY |
| generic career progression | READY |
| dedicated SecretDebtState object | only if existing career/public state proves insufficient |
| world/public facts | READY |
| calendar/delayed-boundary primitives | READY |
| next-day modifiers | READY / composition decision blocked |
| ending/RunResult | READY |
| exact Secret Debt Meta effect | PRODUCT_DECISION_BLOCKED; possible bounded extension after decision |
| global 10-career professional lock | NEEDS_BOUNDED_RUNTIME_EXTENSION |
| hidden work action | READY after content |
| School while bound | PRODUCT_DECISION_BLOCKED |
| Activity while bound | PRODUCT_DECISION_BLOCKED |
| Palace ordinary-only accounting | READY / locked |

## Implementation guardrail

Do not turn unresolved content decisions into new runtime architecture.

Start from existing primitives. Add bounded runtime only where a cross-cutting invariant cannot be made safe with current ownership.

Current clear candidate:
the centralized ordinary-career availability gate.

## Lumber firewall

No Secret Debt seam may alter:
- Lumber Hard Work ONLY `completed_shifts >= 50`;
- exact reward `hardWork:lumber`;
- exact Forest continuation `activityResult(lumber.forest, success, lumber.forest.success)`.
