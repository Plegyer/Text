# Content Authoring Acceptance Framework v1

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance  
Purpose: define a shared QA vocabulary for future content production.

## Why this framework exists

The project now has many green generic runtime systems.

That creates a recurring risk:

```text
runtime can support X
```

gets misreported as:

```text
Product X is implemented
```

This framework separates technical readiness, human decisions, authored content, integration and polish.

No percentage scores are used.

---

# Core classifications

## RUNTIME_READY_CONTENT_OPEN

Meaning:

The generic engine/system can express the intended content shape, but the actual production content has not been authored or accepted.

Typical evidence:

- target state owner exists;
- command/condition/effect support exists;
- save/reload contract exists;
- generic tests are green;
- no accepted production IDs/content yet.

This classification does **not** mean:

- player can reach the content;
- the content is balanced;
- narrative/identity is decided;
- Product Acceptance row is closed.

---

## HUMAN_DECISION_BLOCKED

Meaning:

Implementation must not proceed to a final production answer because Product/design must select among meaningful alternatives.

Typical unresolved decisions:

- acquisition source;
- consume/retain policy;
- threshold;
- canonical provider;
- route identity;
- NPC identity;
- outcome semantics;
- exact reward.

QA rule:

Do not create a “reasonable default” to make tests pass.

A generic hook or fixture may be built only if it does not select the Product answer.

---

## AUTHORED_NOT_INTEGRATED

Meaning:

A production-target content package exists with accepted IDs/rules, but it is not yet merged/reachable in current main.

Required evidence:

- authoritative source;
- production-target definitions;
- explicit package boundary;
- no fixture-only placeholders;
- target tests prepared or included.

QA must still treat current shipped product as not containing the package.

A branch-only artifact is not a shipped pass.

---

## INTEGRATED_AND_TESTED

Meaning:

Content is merged into current production and is directly executable through intended player/runtime paths.

Required evidence:

- production definitions on main;
- UI/command reachability where applicable;
- targeted tests;
- save/reload;
- cross-system boundaries;
- presentation;
- full check green.

If a Product Acceptance row depends on natural reachability, seeded fixture state cannot substitute for the real path.

---

## OPTIONAL_PRESENTATION_POLISH

Meaning:

Gameplay/content is valid and presentation fallback satisfies release requirements, but richer art/GIF/text polish may still be added.

Examples:

- optional final GIF;
- portrait;
- unique route art;
- improved alt text;
- additional nonessential visual variants.

This is not a technical/content blocker unless release ownership explicitly promotes it.

---

# Supporting classifications

## CONTENT_DEPTH_OPEN

Use when a basic production slice exists but accepted product breadth/depth is incomplete.

Examples:

- two Forest routes exist but target calls for three plus challenge families;
- career has repeatable shift and first milestone but lacks major branches/endings;
- School has course runtime but lacks accepted milestones/public outputs.

This differs from `RUNTIME_READY_CONTENT_OPEN`:

- some real content is already integrated;
- accepted additional content is still missing.

---

## LEGACY_ONLY

Use when old prototype content exists but does not satisfy current target architecture/product contract.

Examples:

- legacy Tavern action;
- legacy Guard action;
- old generic School action;
- compatibility-only Lumber action.

Legacy content is evidence/reference, not proof of target production readiness.

---

## QA_ACCELERATOR_ONLY

Use when test setup directly creates an otherwise expensive or unauthored state to prove a downstream runtime boundary.

Valid example:

`completed_shifts=49`

followed by one real 50th shift.

Non-closing example:

seeded `old_boundary_token` when no natural acquisition source is authored.

The test must label the accelerator explicitly.

---

# Required evidence by classification

| Classification | Runtime proof | Product decision | Production authoring | Merged main | Natural reachability | Targeted tests |
|---|---:|---:|---:|---:|---:|---:|
| RUNTIME_READY_CONTENT_OPEN | yes | maybe open | no | generic runtime only | no | generic |
| HUMAN_DECISION_BLOCKED | maybe yes | **no/unfinished** | no final package | no | no | decision-neutral only |
| AUTHORED_NOT_INTEGRATED | yes | yes for package | yes | **no** | branch-only | package tests/preflight |
| INTEGRATED_AND_TESTED | yes | yes | yes | **yes** | yes where required | yes |
| OPTIONAL_PRESENTATION_POLISH | yes | core yes | core yes | yes | yes | core presentation fallback green |

---

# Career application

## RUNTIME_READY_CONTENT_OPEN

Use when:

- generic career state machine exists;
- Resolver exists;
- ending/Meta exists;
- Night/items/School hooks exist generically;
- dedicated career package is absent.

Current examples:

- Hunter;
- Merchant;
- Assassin

at the generic-system level.

Their design drafts are deep, but current main lacks target production packages.

## HUMAN_DECISION_BLOCKED

Use for career-specific open choices such as:

- final Geisha/Artist fantasy name/framing;
- exact career thresholds;
- exact NPC identities;
- exact ending rewards;
- exact Prostitute workplace model;
- Assassin lethal/nonlethal scope.

Do not convert draft examples into canon.

## AUTHORED_NOT_INTEGRATED

Use when a worker branch contains accepted target career definitions but main does not.

Required QA:

- compare to current main;
- verify no locked-rule drift;
- test save/reload;
- verify presentation IDs;
- run full package gate.

## INTEGRATED_AND_TESTED

Lumber currently demonstrates this class for the implemented vertical slice.

But full Lumber draft depth may simultaneously remain:

`CONTENT_DEPTH_OPEN`.

A career can therefore be:

```text
INTEGRATED_AND_TESTED for current production slice
+
CONTENT_DEPTH_OPEN for accepted broader authoring
```

These are not contradictory.

---

# School application

## Current runtime baseline

School already has:

- eight paid courses;
- typed track progress;
- first-class lesson command;
- Night study;
- presentation;
- save/reload.

Therefore the School engine is not:

`RUNTIME_READY_CONTENT_OPEN`

as a whole.

It is already integrated.

## CONTENT_DEPTH_OPEN

Use for richer School life:

- teachers;
- projects/exams/certificates;
- major milestones;
- broader relationship/content depth.

## HUMAN_DECISION_BLOCKED

Current examples:

- management/accounting provider;
- management threshold/milestone type;
- Arcana/Forest provider;
- Arcana/Forest threshold if retained.

QA must not decide these.

## INTEGRATED_AND_TESTED

Current paid lesson, typed progression, Night study and blocking scene all qualify.

Do not let open milestone authoring invalidate green base School mechanics.

---

# Poverty application

## RUNTIME_READY_CONTENT_OPEN

Current generic Night/housing/resource systems provide partial infrastructure.

But ordinary poverty as a complete product life is not integrated.

Use this class for:

- generic ability to represent street/cheap lodging;
- save/reload infrastructure;
- Night event support.

## CONTENT_DEPTH_OPEN

Use once real street/poverty content pools begin landing but full recovery/alternative-life depth is incomplete.

## HUMAN_DECISION_BLOCKED

Use for open values such as:

- exact street penalties;
- exact debt amount;
- exact lender benefit;
- exact forced Night penalty;
- hidden career thresholds/rewards;
- School/Activity availability during debt lock.

## AUTHORED_NOT_INTEGRATED

A complete Secret Debt package on a worker branch remains unshipped until merged and tested.

## INTEGRATED_AND_TESTED

Requires natural path:

```text
street sleep
-> lender
-> accept/refuse
-> delayed activation
-> hidden career lock
-> forced Night
-> outcome
-> release/ending
-> reload
```

Directly setting debt-active state cannot prove full product reachability.

---

# Activity application

## Integrated baseline

Current Forest slice already provides:

- entry;
- route selection;
- logging-road;
- item-capability old-boundary route;
- save/resume;
- success/escape;
- Lumber continuation.

Therefore core Activity is:

`INTEGRATED_AND_TESTED`

for the current slice.

## CONTENT_DEPTH_OPEN

The accepted broader Activity role still expects:

- additional route context;
- challenge families;
- seasonal differences;
- richer item/equipment use;
- NPC/quests;
- more city feedback loops.

## HUMAN_DECISION_BLOCKED

Current examples:

- hunter-trail final unlock identity;
- final third-route authoring;
- exact challenge content;
- season topology;
- broader Activity genre/mechanics where still open.

## RUNTIME_READY_CONTENT_OPEN

Use for a future Activity region/challenge that can use existing generic option/state machinery but has no content yet.

---

# Items/capabilities application

## INTEGRATED_AND_TESTED runtime

Generic inventory-derived capability semantics are green.

## HUMAN_DECISION_BLOCKED product path

Old Boundary Token still lacks accepted:

- acquisition source;
- use/consume policy.

Therefore:

```text
capability runtime = INTEGRATED_AND_TESTED
token natural product path = HUMAN_DECISION_BLOCKED
```

This split is required.

---

# Presentation application

## INTEGRATED_AND_TESTED

Central semantic presentation runtime is green.

## OPTIONAL_PRESENTATION_POLISH

Use when:

- semantic ID exists;
- valid fallback exists;
- mechanics work with missing GIF;
- animation off works.

Future GIF or portrait improvements then remain polish.

## HUMAN_DECISION_BLOCKED

Use only when visual/narrative identity itself depends on an unresolved Product content decision.

Example:

presentation for an unauthored hunter-trail route should not invent the final route identity.

---

# Endings / Meta application

## INTEGRATED_AND_TESTED runtime

Eligibility, commit, completion, RunResult, Meta and New Run are green.

## Career content classification remains independent

A future career may still be:

`RUNTIME_READY_CONTENT_OPEN`

for endings if no ending definitions are authored.

Do not say:

“ending system exists, therefore this career has endings.”

---

# Natural reachability rule

For any classification that claims integrated product behavior:

Ask:

> Can a player reach this through the intended production path?

If no, distinguish:

- runtime proof;
- seeded accelerator;
- missing authoring.

Examples:

### Hard Work

`49 -> real 50th shift`

is acceptable threshold compression because the actual transition under acceptance is real and the product path itself exists.

### Old Boundary Token

Direct inventory seeding does not prove acquisition because that product path does not yet exist.

---

# Fixture rule

Fixture content may prove:

- schema;
- validator;
- generic adapter;
- transaction;
- negative behavior.

Fixture content may not by itself prove:

- production reachability;
- Product decision;
- shipped career;
- authored public result.

If fixture semantics become accepted production content, record an explicit promotion decision and production review.

---

# Human-decision rule

A document is human-decision blocked when two or more materially different Product outcomes remain legitimate.

QA should write:

- required decision dimensions;
- runtime implications;
- test implications.

QA should not write:

- preferred option;
- best choice;
- guessed threshold;
- invented ID.

---

# Integration checklist for promotion

To promote:

`AUTHORED_NOT_INTEGRATED`

to:

`INTEGRATED_AND_TESTED`

require:

1. exact current-main base;
2. production files merged;
3. normal UI/command reachability;
4. content validation;
5. targeted tests;
6. save/reload;
7. public-boundary tests;
8. presentation/fallback;
9. full check green;
10. updated current authority/readiness docs.

---

# Status combination examples

Valid combined classifications:

## Lumber

```text
INTEGRATED_AND_TESTED
+
CONTENT_DEPTH_OPEN
+
HUMAN_DECISION_BLOCKED at School/token boundaries
```

## Satyr Maid

```text
RUNTIME_READY_CONTENT_OPEN
+
DESIGN_READY
```

## School

```text
INTEGRATED_AND_TESTED base mechanics
+
CONTENT_DEPTH_OPEN
+
HUMAN_DECISION_BLOCKED for public-result authoring
```

## Forest

```text
INTEGRATED_AND_TESTED base Activity slice
+
CONTENT_DEPTH_OPEN
+
HUMAN_DECISION_BLOCKED for third-route identity
```

## Secret Debt

Current:

```text
RUNTIME_READY_CONTENT_OPEN / partial shared infrastructure
+
HUMAN_DECISION_BLOCKED on balance/content values
```

not:

`INTEGRATED_AND_TESTED`.

---

# Reporting rule

Every future QA readiness document should answer separately:

1. Is generic runtime ready?
2. Has Product made the necessary decisions?
3. Is production content authored?
4. Is it merged?
5. Is it naturally reachable?
6. Is save/reload tested?
7. Is presentation valid?
8. Is remaining work only optional polish?

This prevents “green architecture” from being mistaken for “finished game”.

No production runtime/UI/content file was modified by Chat 4.
