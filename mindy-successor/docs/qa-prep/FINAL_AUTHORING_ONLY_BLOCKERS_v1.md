# Final Authoring-Only Blockers v1

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance  
Baseline: merged main after PR25, final RC gate green at 218/218

## Purpose

This ledger contains only unresolved product/human decisions.

It intentionally excludes runtime and QA issues that are already green.

---

# 1. Old Boundary Token acquisition source

## Human decision required

Choose the canonical shipped source for:

`old_boundary_token`.

Examples are intentionally not selected here.

## Runtime/QA status

Already green:

- typed production item definition;
- inventory-derived `enter_old_boundary`;
- generic capability validation;
- capability-gated Activity option;
- route save/reload;
- worldFact non-equivalence.

## Affected acceptance

- PA09;
- natural ordered PA17.

---

# 2. Old Boundary Token retain / consume policy

## Human decision required

Choose the final product policy when the token is used:

- retained;
- consumed;
- transformed;
- another explicitly authored consequence.

QA must not infer the answer from current non-consuming runtime behavior.

## Runtime/QA status

Already green:

- inventory add/remove mechanics;
- capability disappears when last provider is removed;
- route selection itself is deterministic.

## Affected acceptance

- PA09;
- PA17.

---

# 3. Hunter-trail / third Forest route identity

## Human decision required

If the accepted target still includes a third hunter-trail route, define:

- canonical route ID;
- player-facing concept;
- unlock/clue/capability identity;
- authoritative provider/source;
- presentation/text.

## Runtime/QA status

Already green for generic route infrastructure:

- authored route options;
- typed conditions;
- route selection;
- route persistence;
- one-shot option identity;
- reload determinism.

## Affected acceptance

- PA16;
- possibly natural PA17 depending on chosen unlock.

---

# 4. School management/accounting threshold

## Human decision required

Define:

- owning School course/track;
- exact progression threshold;
- whether paid lessons only or another accepted progression source counts;
- canonical milestone/result identity.

QA must not choose the number.

## Runtime/QA status

Already green:

- first-class School lessons;
- typed track progress;
- paid `lessons_completed`;
- separate `night_study_sessions`;
- School transaction exactly once;
- Resolver ordering;
- blocking scene compatibility.

## Affected acceptance

- PA07;
- PA08.

---

# 5. School management/accounting public-result provider

## Human decision required

Define the authoritative School-owned provider that exposes the accepted Lumber-facing result.

The old synthetic:

`school.lumber-management`

must not be promoted to production merely to satisfy a test.

## Runtime/QA status

Already green for ordinary provider mechanics:

- typed School progress;
- effects/facts;
- Resolver after School registration;
- reactive Lumber continuation infrastructure.

## Affected acceptance

- PA07;
- PA08.

---

# 6. School Arcana / Forest threshold

## Human decision required

If this accepted cross-system result remains in scope, define:

- exact Arcana progression condition;
- exact threshold;
- whether Night study contributes;
- canonical result/milestone identity.

If the feature is no longer in scope, update the acceptance specification explicitly rather than leaving an implied threshold.

## Runtime/QA status

Already green:

- Arcana paid progression;
- separate Night-study progression;
- Resolver boundary;
- Forest route infrastructure.

## Affected acceptance

- PA07 and any explicitly retained cross-system Forest requirement.

---

# 7. School Arcana / Forest provider

## Human decision required

Define:

- canonical public fact/event/milestone;
- exact consumer;
- whether it unlocks a route, challenge, option or another product behavior.

## Runtime/QA status

Already green for ordinary facts/events/options.

No new runtime requirement is proven necessary until the product shape is chosen.

---

# 8. Forest three-route product topology

## Human decision required

Current production has:

1. logging road;
2. old boundary.

Define the third route and approve the final three-route topology.

Do not count `escape` as a route.

## Runtime/QA status

Generic route infrastructure and reload behavior are green.

## Affected acceptance

- PA16.

---

# 9. Forest three challenge families

## Human decision required

Define three meaningfully distinct challenge families:

- canonical identities;
- route availability;
- conditions;
- player choices;
- effects/outcomes;
- presentation.

Different labels over the same identical `advance` behavior are not sufficient.

## Runtime/QA status

Current Activity option/progress/endurance infrastructure is partially ready.

Whether a focused adapter extension is needed depends on the authored challenge design.

## Affected acceptance

- PA16.

---

# 10. Forest seasonal difference

## Human decision required

Define at least one real seasonal Forest difference.

The decision may affect:

- route availability;
- challenge availability;
- effects;
- resource pressure;
- outcome context;
- another approved gameplay/content dimension.

QA does not select the design.

## Runtime/QA status

Calendar/season conditions and presentation infrastructure already exist.

## Affected acceptance

- PA16.

---

# 11. Presentation asset polish

## Human decision / art ownership

Decide whether placeholder/static shipped media is sufficient for the release target or whether final:

- GIFs;
- portraits;
- Forest route/challenge art;
- item icons;
- accessibility text

must be completed before release.

## Runtime/QA status

Presentation runtime is green:

- semantic IDs;
- save compatibility;
- fallback;
- Animation Off;
- one central stage;
- missing media nonfatal.

## Classification

**NON-BLOCKING by current technical QA definition**

Promote to a release blocker only if product/release ownership explicitly requires final art before release.

---

# Explicitly not authoring blockers anymore

Do not return these to the OPEN ledger:

- generic item capability runtime;
- worldFact vs inventory capability semantics;
- Activity route save/reload;
- old schema-4 Activity compatibility;
- School paid transaction;
- School blocking-scene compatibility;
- NightFlow exactly-once;
- Lumber activation;
- Forest general entry/logging-road;
- Forest success -> Lumber continuation;
- ending commit/completion transaction;
- Hard Work 50-shift condition;
- exact `hardWork:lumber` reward;
- semantic presentation persistence.

Those are already runtime/QA green.

---

# Final authoring classes

## Human decision required

- Old Boundary Token source;
- token retain/consume;
- hunter-trail/third-route identity;
- School management/accounting threshold;
- School management/accounting provider;
- School Arcana/Forest threshold if in scope;
- School Arcana/Forest provider if in scope.

## Content depth required

- final third Forest route;
- three challenge families;
- seasonal Forest difference.

## Non-blocking polish unless promoted

- final presentation/media asset quality.

No production runtime/UI/content file was modified by Chat 4.
