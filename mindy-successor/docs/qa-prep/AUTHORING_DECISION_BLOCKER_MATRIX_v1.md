# Authoring Decision Blocker Matrix v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Baseline: current merged main after PR22

## Purpose

This matrix contains **only decisions that still require human/product authoring**.

It intentionally excludes runtime work already shipped by PR20–PR22.

A row here is not a request for QA to invent content.

| Authoring decision | Affected PA rows | Runtime infrastructure ready? | What must be decided |
|---|---|---:|---|
| Old Boundary Token acquisition source | PA09, natural PA17 | **Yes** | Where/when the player obtains `old_boundary_token`; the source must be a real shipped product path rather than direct inventory seeding. |
| Old Boundary Token retain/consume policy | PA09, PA17 | **Yes** | Whether old-boundary use retains, consumes, transforms, or otherwise explicitly changes the token. Generic capability lookup is read-only and does not decide this. |
| Hunter-trail clue/capability identity | PA16, potentially PA17 | **Yes for generic capability/options; identity/content not authored** | Whether the third Forest route uses a clue, item, capability, relationship fact, School result, or another approved condition; exact canonical ID(s) remain unresolved. |
| School management/accounting milestone threshold | PA07, PA08 | **Mostly** | Which School track/course progression qualifies and the exact threshold/condition. QA must not choose the number. |
| School management/accounting public-fact provider | PA07, PA08 | **Mostly** | Exact School-owned milestone/event/fact that publishes the accepted Lumber-facing result, including canonical ID and Resolver trigger. |
| School Arcana/Forest milestone threshold | PA07 and broader Forest/School integration acceptance | **Mostly** | Exact Arcana/Forest progression condition, if this accepted product result remains in scope. |
| School Arcana/Forest public-fact/provider identity | PA07 and downstream authored Forest integration | **Mostly** | Exact public fact/milestone/event identity and consumer. No current production rule should be inferred from test fixtures. |
| Forest three-route topology | PA16 | **Yes for route options** | Exact third route plus final meaning of all three route contexts. PR22 currently authors logging-road and old-boundary only. |
| Forest three challenge families | PA16 | **Partial** | Names, rules, availability, outcomes and route relationship for three distinct challenge families. Generic Activity option/state support exists, but challenge content is not authored. |
| Forest seasonal difference | PA16 | **Partial** | Which route/challenge behavior changes by season and how. Must be a real authored difference, not merely a cosmetic label. |
| Final Forest item/capability usage content | PA17 | **Yes mechanically** | Which naturally acquired item/capability changes which Activity option(s), after acquisition authoring is approved. Current old-boundary route proves the mechanism only. |

---

# 1. Old Boundary Token source

## Already ready

Merged main already has:

- typed item ID: `old_boundary_token`;
- typed capability: `enter_old_boundary`;
- inventory-derived capability lookup;
- capability-aware Activity options;
- save/reload behavior.

## Human decision still required

Choose a real acquisition source.

Examples must **not** be selected by QA.

The decision could conceptually be:

- quest/event reward;
- Foreman route reward;
- exploration pickup;
- shop purchase;
- School-linked result;
- another authored source.

Only product/design can select the canonical route.

## Evidence after decision

A shipped test must acquire the item through that real path and then prove the old-boundary route appears without direct inventory mutation.

---

# 2. Retain / consume

## Already ready

The runtime can explicitly add/remove inventory items.

Capability availability follows owned inventory deterministically.

## Human decision still required

Choose whether using the token:

- keeps it;
- consumes it once;
- transforms it;
- spends another resource;
- has another explicit authored consequence.

PR22 intentionally does not make this decision.

The current non-consuming route behavior is an implementation default for open policy, not final design canon.

---

# 3. Hunter-trail clue/capability identity

PR22's accepted gate still lists the hunter-trail clue/capability identity as OPEN.

## Already ready

Generic options can gate on:

- item capability;
- typed conditions;
- normal progression facts/choices where supported.

## Human decision still required

Define:

- third route canonical ID;
- player-facing meaning;
- exact unlock condition;
- whether the condition is item/capability, clue/fact, relationship, School output, or another accepted typed condition;
- associated presentation/text.

QA must not invent `hunter-trail` IDs or infer them from prose.

---

# 4. School management/accounting threshold

## Already ready

School has:

- eight first-class courses;
- typed track progression;
- `lessons_completed`;
- separate Night-study counter;
- atomic paid lesson transaction;
- Resolver boundary after School registration.

Lumber already has the accepted consumer seam for the management-ready concept.

## Human decision still required

Define:

- which School track/course owns the milestone;
- exact threshold/condition;
- whether only paid lessons count;
- canonical milestone/fact ID.

The threshold is authoring, not QA balance.

---

# 5. School management/accounting provider

A threshold alone is insufficient.

Product/design must approve the School-owned output:

```text
School progression
-> School milestone/public result
-> Lumber/Foreman consumer
```

The old synthetic:

`school.lumber-management`

must not return as production content merely to close the test.

The provider should be a normal School-owned rule/event/result.

---

# 6. School Arcana / Forest result

Current accepted documentation keeps an Arcana/Forest public-result concept open.

## Already ready

- typed Arcana course progression;
- Resolver after paid lesson;
- generic world/progression facts;
- Forest route option infrastructure.

## Human decision still required

Define:

- whether this result is actually required in the target slice;
- exact course/track;
- exact threshold;
- exact public fact/milestone ID;
- exact Forest consumer behavior.

If product decides it is out of scope, the acceptance specification must be updated explicitly rather than leaving an implied hidden threshold.

---

# 7. Forest 3-route topology

## Already ready

PR22 ships generic route selection and persistent route state.

Current production routes:

1. logging road;
2. old boundary.

## Human decision still required

Author the third route and approve final topology:

- canonical route ID;
- conditions;
- player-facing purpose;
- relation to items/School/Foreman;
- presentation/text.

Do not count `escape` as a third route.

Escape is an Activity outcome/control, not a route context.

---

# 8. Three challenge families

## Already ready

The Activity runtime can persist internal state and authored options.

## Human decision still required

Define three meaningfully distinct challenge families.

For each:

- canonical ID/family;
- which routes expose it;
- conditions;
- choices/actions;
- effects/progress/endurance behavior;
- success/failure consequences;
- presentation.

Three different labels over the same identical `advance` behavior should not be accepted as three challenge families.

---

# 9. Seasonal Forest difference

## Already ready

Calendar/season typed conditions already exist.

## Human decision still required

Choose at least one real Forest behavioral difference by season.

It should affect something materially authored such as:

- option availability;
- challenge family;
- route condition;
- resource/endurance effect;
- outcome/result context.

Pure presentation-only art variation does not satisfy a gameplay/content-depth requirement if the acceptance spec expects mechanical/content variation.

---

# Runtime readiness summary

## Fully ready infrastructure

- typed item definitions;
- inventory add/remove;
- item capability derivation;
- multiple capability providers;
- typed itemCapability condition;
- capability-aware Activity options;
- route selection;
- one-shot options;
- route/option save/reload;
- old active Activity compatibility;
- School paid/Night progression;
- Resolver boundaries;
- semantic presentation;
- ending/Meta transactions.

## Partial infrastructure, authoring still required

- challenge-family modeling may need only content if existing option/category semantics are accepted;
- richer route/challenge orchestration may require a focused extension if accepted authoring exceeds current `counter.v1` option model.

That implementation question should be driven by the authored design, not guessed in advance by QA.

---

# Product Acceptance rows still affected

## PA07 / PA08

Blocked by School milestone/public-result decisions.

## PA09

Blocked by real token acquisition and final item policy.

## PA16

Blocked by Forest content depth authoring.

## PA17

Mechanic exists, but natural ordered path remains blocked by PA09 acquisition and final authored item-use semantics.

No Hard Work authoring decision is open.

Its rule remains exactly 50 completed Lumber shifts with exact reward `hardWork:lumber`.

No production runtime/UI/content file was modified by Chat 4.
