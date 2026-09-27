# Secret Debt Authored Content False-Green Audit v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance
Reviewed branch: chat3/lumber-production-proof-next

## Purpose

Prevent authored Secret Debt narrative/content from being misreported as implemented production mechanics.

Reviewed wave:
Chat3 items 105–113.

## Executive classification

AUTHORED_CONTENT_READY

but:

MECHANICS_NOT_SHIPPED
PRODUCTION_NOT_INCLUDED
PRODUCT_DECISIONS_OPEN
LOCALIZATION_MIGRATION_REQUIRED

The current authored wave is preparation/content evidence only.

It is not evidence that Secret Debt is naturally reachable, mechanically complete, or production integrated.

## 1. Lender offer content

Authored and ready:
- one-time street-offer scene variants;
- tempting loan framing;
- accept/refuse agency copy;
- generic lender role;
- presentation placeholders.

Still OPEN:
- encounter probability;
- immediate principal/benefit;
- canonical lender identity;
- exact production event ID;
- accepted/refused authoritative state owner.

False-green rule:
having lender dialogue does not prove that the lender can appear in production.

Status:
CONTENT_READY / MECHANICS_OPEN.

## 2. Delayed activation content

Authored and ready:
- temporary relief scenes;
- reminder/sign variants;
- pre-activation flavor;
- activation notice variants.

Still OPEN:
- activation delay length;
- delayed debt amount;
- exact transition timing;
- exact state representation;
- activation event ID.

False-green rule:
an activation notice draft does not prove delayed activation exists in runtime.

Status:
CONTENT_READY / MECHANICS_OPEN.

## 3. Hidden-career daytime work

Authored and ready:
- multiple repeatable work scene families;
- escalation flavor;
- compliance/resistance variants;
- early/middle/late narrative bands;
- identity-neutral reaction hooks.

Still OPEN:
- canonical hidden-career ID;
- shift Energy cost;
- wage;
- debt effect;
- stat gains;
- stages;
- counters/thresholds;
- public facts.

False-green rule:
repeatable work prose is not a production career/action.

Status:
CONTENT_READY / CAREER_MECHANICS_OPEN.

## 4. Forced Night content

Authored and ready:
- forced-Night scene families;
- separation from daytime hidden work;
- presentation opportunities;
- save/reload requirements.

Still OPEN:
- exact intercept point;
- before_lodging / after_lodging / after_choice selection;
- lodging-payment policy;
- housing behavior;
- next-day penalty;
- modifier composition;
- exact progression effects.

False-green rule:
Night scenes do not prove NightFlow interception/gating.

Status:
CONTENT_READY / NIGHT_MECHANICS_OPEN.

## 5. paid_freedom outcome

Authored and ready:
- approach;
- settlement copy;
- aftermath;
- reaction hooks;
- RunResult copy candidates;
- presentation placeholders.

Still OPEN:
- exact eligibility;
- exact payment requirement;
- exact transaction value;
- ending ID if not family identity;
- Meta reward.

False-green rule:
ending narrative shell is not ending eligibility/commit/completion logic.

Status:
CONTENT_READY / ENDING_MECHANICS_OPEN.

## 6. bound_life outcome

Authored and ready:
- substantial-progression narrative context;
- explicit commitment framing;
- aftermath/reactions;
- RunResult copy candidates.

Still OPEN:
- exact career stage/counter/milestone threshold;
- exact commitment event/ending ID;
- exact Meta reward;
- post-ending continuation policy if any.

False-green rule:
“substantial progression” text must not be converted into a guessed numeric threshold.

Status:
CONTENT_READY / ENDING_MECHANICS_OPEN.

## 7. takeover outcome

Authored and ready:
- preparation;
- leverage framing;
- confrontation/control-transfer;
- aftermath;
- reaction hooks;
- presentation placeholders.

Still OPEN:
- exact hidden-career progression requirement;
- stat/build requirements;
- external dependency category;
- exact item/fact/relationship/School/Activity dependency;
- controller/ally identities;
- Meta reward.

False-green rule:
takeover must not collapse into “enough shifts” or one guessed stat check.

Status:
CONTENT_READY / MULTI_SYSTEM_MECHANICS_OPEN.

## 8. Machine-readable fixture is explicitly non-production

File:
content/secret-debt-authored-content-v1.fixture.json

It explicitly states:
- status = CONTENT_DRAFT_NOT_PRODUCTION
- productionCatalogIncluded = false

Unresolved mechanics are encoded with:
- status = OPEN
- value = null

This is good false-green protection.

The fixture must not be copied unchanged into root production loading.

PASS.

## 9. Current production main check

Current main root production packs do not include a Secret Debt pack.

Current main definitions contain no Secret Debt/lender production state.

Therefore:
- lender is not naturally reachable;
- delayed activation is not implemented;
- hidden career is not a shipped career;
- ordinary careers are not production-gated by Secret Debt;
- forced Night is not production-enforced;
- the three Secret Debt outcomes are not production endings.

Status:
NOT_PRODUCTION_INCLUDED.

## 10. Probability / amount / delay values

The authored fixture correctly keeps these OPEN/null:
- encounter probability;
- immediate principal;
- delayed debt amount;
- activation delay;
- hidden-career wage;
- hidden-career costs/stat gains;
- forced-Night penalty;
- ending thresholds;
- Meta rewards.

Do not promote prose examples or scene wording into numeric mechanics.

PASS.

## 11. Runtime state ownership is not shipped

Prior prep recommends a Secret Debt machine as authoritative owner plus bounded public projections.

That recommendation is not implementation.

Current authored wave did not modify:
- engine.ts;
- schema.ts;
- shared definitions;
- UI;
- build/catalog bootstrap.

Therefore no authoritative debt-state lifecycle exists in production from this wave.

Status:
RUNTIME_STATE_OWNERSHIP_NOT_SHIPPED.

## 12. Ordinary-career gating is not shipped

The directed concept says ordinary professional work becomes blocked after bound activation.

Current authored content does not implement that central gate.

Do not infer gating from:
- work prose;
- activation text;
- hidden-career fixture markers.

Status:
GATING_NOT_SHIPPED.

## 13. School / Activity bound-state policy remains Product-open

Still unresolved:
- School availability while bound;
- large Activity/Forest availability while bound.

No production behavior should be authored from assumption.

Status:
PRODUCT_BLOCKED.

## 14. Forced Night / lodging policy remains Product-open

Still unresolved:
- exact Night intercept;
- lodging payment behavior;
- housing interaction;
- next-day penalty;
- modifier composition.

Text variants must remain mechanics-neutral until these are supplied.

Status:
PRODUCT_BLOCKED.

## 15. Palace firewall

Secret Debt remains outside the ten ordinary careers.

No Secret Debt outcome may:
- add ordinary Hard Work credit;
- grant hardWork:<ordinary-career>;
- count toward Palace 10/10;
- substitute for one of the ten ordinary Hard Work completions.

The authored fixture/handoff preserves this firewall.

PASS.

## 16. Current localization requirement

The reviewed Chat3 player-facing Secret Debt drafts were committed before the current RU+EN Product rule and are predominantly English-only authoring.

Current rule requires:
- Russian source authoring;
- full English second locale;
- one gameplay/content identity;
- one semantic ID;
- identical mechanics across locales;
- locale affects text/presentation only.

Therefore these existing drafts require localization migration/review before production conversion.

Do not:
- duplicate gameplay events for EN;
- create locale-specific conditions/effects;
- change IDs per language.

Classification:
CONTENT_LOCALIZATION_MIGRATION_REQUIRED.

This localization gap is separate from the unresolved mechanics.

## 17. What may be integrated now

Safe evidence/prep integration:
- authored docs;
- non-production fixture;
- handoff;
- presentation planning references.

Not safe as production mechanics:
- fixture inclusion in root catalog;
- guessed lender chance;
- guessed principal/debt;
- guessed delay;
- guessed hidden-career wage/stats/stages;
- guessed forced-Night policy;
- guessed ending thresholds;
- guessed Meta rewards.

## 18. Production conversion gate

Before a Secret Debt mechanics slice can be marked shipped, require:

1. exact authoritative state owner;
2. exact trigger/acquisition path;
3. needed Product values supplied or explicitly parameterized;
4. ordinary-career gating behavior defined;
5. Night/lodging behavior defined for the slice;
6. save/reload ownership;
7. natural-path test from production entry;
8. no direct fixture-only activation counted as natural proof;
9. RU+EN text under one identity;
10. exact-head CI;
11. explicit production catalog inclusion.

## 19. False-green examples

Incorrect:
“Lender offer is implemented.”

Correct:
“Lender offer content is authored; encounter probability/state mechanics are open.”

Incorrect:
“Secret Debt hidden career exists.”

Correct:
“Hidden-career work content is authored; career ID/cost/wage/progression/gating are open.”

Incorrect:
“Forced Night is implemented.”

Correct:
“Forced-Night scene bank exists; NightFlow interception/lodging policy is open.”

Incorrect:
“All three Secret Debt endings are implemented.”

Correct:
“All three outcome narrative shells are authored; exact eligibility and Meta rewards remain open.”

Incorrect:
“Secret Debt is integrated.”

Correct:
“The authored fixture is explicitly non-production and current main contains no Secret Debt production pack/state.”

## Final status

Authored lender content:
READY.

Authored delayed-activation content:
READY.

Authored hidden-work content:
READY.

Authored forced-Night content:
READY.

Authored paid_freedom content:
READY.

Authored bound_life content:
READY.

Authored takeover content:
READY.

Encounter probability/principal/debt/delay:
OPEN.

Hidden-career costs/wage/stats/thresholds:
OPEN.

School/Activity bound policy:
OPEN.

Forced-Night/lodging/penalty policy:
OPEN.

Ending thresholds:
OPEN.

Meta rewards:
OPEN.

Runtime state ownership/gating:
NOT SHIPPED.

Production catalog inclusion:
NOT PRESENT.

RU+EN migration:
REQUIRED BEFORE PRODUCTION CONVERSION.

No production runtime/UI/content file was modified by Chat 4.
