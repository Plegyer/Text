# Human-Decision False-Closure Audit v1

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance  
Baseline: current main after PR26 + PR27

## Sources compared

- `docs/qa-prep/RC_HUMAN_DECISIONS_REQUIRED_v1.md`
- `docs/lumber-prep/LUMBER_FINAL_RC_ACCEPTANCE_MATRIX_v1.md`
- `docs/lumber-prep/OLD_BOUNDARY_TOKEN_PRODUCT_DECISION_IMPACT_v1.md`
- `docs/school-prep/SCHOOL_AUTHORING_DECISION_READY_PACKET_v1.md`
- `docs/presentation-prep/PRESENTATION_RC_EVIDENCE_PACK_v1.md`
- current Product Acceptance row classifications

## Executive result

**NO FALSE PRODUCT CLOSURE FOUND**

The current closeout documents consistently separate:

- shipped runtime capability;
- QA/fixture evidence;
- threshold accelerators;
- unresolved Product decisions;
- optional presentation polish.

No reviewed document incorrectly promotes seeded state, a fixture placeholder, a synthetic provider, a QA-selected threshold or optional art work into an accepted Product decision.

---

# Seeded Old Boundary Token

## Reviewed evidence

Current runtime/QA may seed:

`inventory.old_boundary_token=1`

to prove:

- inventory-derived capability;
- old-boundary option visibility;
- route persistence.

## Documentation classification

`LUMBER_FINAL_RC_ACCEPTANCE_MATRIX_v1.md` explicitly says:

`Seeded inventory is not a full PA09 pass.`

`RC_HUMAN_DECISIONS_REQUIRED_v1.md` still requires Product to choose:

- acquisition source;
- timing;
- repeatability;
- retain/consume behavior.

`OLD_BOUNDARY_TOKEN_PRODUCT_DECISION_IMPACT_v1.md` explicitly states it does not select a preferred policy.

## Result

**SAFE / NOT FALSE-CLOSED**

Seeded inventory remains runtime evidence only.

---

# Legacy capability worldFact

The old QA concept:

`lumber.capability.enter-old-boundary`

is not treated as accepted Product ownership.

Current capability source of truth is inventory-derived item definitions.

No reviewed decision packet promotes the worldFact adapter to a final acquisition model.

## Result

**SAFE / SUPERSEDED AS PRODUCT CAPABILITY SOURCE**

---

# Synthetic School provider

Legacy fixture action:

`school.lumber-management`

is explicitly prohibited as a production shortcut.

Both:

- `RC_HUMAN_DECISIONS_REQUIRED_v1.md`
- `LUMBER_FINAL_RC_ACCEPTANCE_MATRIX_v1.md`

state that the real School provider/threshold remains a Product decision.

The School decision packet asks Product to choose a School-owned provider and does not canonize the synthetic fixture.

## Result

**SAFE / NOT FALSE-CLOSED**

---

# School management/accounting threshold

No reviewed document supplies a QA-selected numeric threshold.

The human-decision ledger states:

`No threshold is currently approved.`

The School packet lists categories such as:

- lesson threshold;
- project;
- exam;
- certificate;
- other School-owned result

as options only.

It explicitly says:

`No threshold is chosen here.`

## Result

**SAFE / HUMAN_DECISION_REQUIRED**

---

# School Arcana / Forest threshold/provider

The School packet lists possible provider families and condition types but does not select:

- a canonical public fact;
- a numeric threshold;
- whether Night study contributes;
- the final Forest consumer behavior.

The closeout ledger also says this path is conditional on remaining in scope.

## Result

**SAFE / HUMAN_DECISION_REQUIRED IF RETAINED IN SCOPE**

---

# Hunter-trail identity

The current docs lock only the broad concept:

`third Forest route concept = hunter trail`.

They do not select:

- final canonical route ID;
- clue ID;
- item/capability ID;
- provider;
- acquisition source.

The human-decision ledger explicitly says not to invent a fake item or clue ID.

## Result

**SAFE / HUMAN_DECISION_REQUIRED**

The phrase “third Forest route concept = hunter trail” should be read as scope/concept, not as a completed content definition.

---

# 49-shift accelerator

Merged RC evidence directly sets:

`completed_shifts=49`

before one real 50th `lumber.shift`.

`LUMBER_FINAL_RC_ACCEPTANCE_MATRIX_v1.md` explicitly labels this:

- long-threshold accelerator only;
- not ordinary-play evidence;
- not product authoring.

The actual condition under test is still crossed by a real shift.

No document claims Product chose a special 49-shift shortcut.

## Result

**SAFE / LEGITIMATE QA ACCELERATOR**

---

# Forest logging-road

Logging-road is current production content and is correctly classified as shipped.

That is not a fixture placeholder.

It naturally proves:

- Forest entry;
- route selection;
- save/reload;
- success/escape;
- Lumber continuation.

It does not close the missing third-route/challenge/season depth.

## Result

**SAFE / SHIPPED CONTENT, NOT FALSE-CLOSED DEPTH**

---

# Old-boundary route

The route itself is production-shipped and capability-gated.

The missing Product decision is how the player obtains and uses the token over normal gameplay.

Docs consistently separate:

- route runtime = shipped;
- natural acquisition/policy = open.

## Result

**SAFE**

---

# Optional presentation polish

`PRESENTATION_RC_EVIDENCE_PACK_v1.md` states:

`RC-required missing presentation assets: none.`

Seven optional Lumber/Foreman GIFs are explicitly labeled polish-only.

`RC_HUMAN_DECISIONS_REQUIRED_v1.md` likewise describes presentation polish priorities as optional human/art decisions.

No optional GIF is represented as a missing technical RC requirement.

## Result

**SAFE / NON-BLOCKING POLISH**

---

# Static fallback assets

Current static assets and text fallbacks are valid release behavior.

They must not be described as “temporary fixture placeholders” merely because future GIF polish is possible.

The presentation evidence pack correctly treats current fallback-backed scenes as valid shipped presentation.

## Result

**SAFE**

---

# PA07 / PA08

Current classification:

**HUMAN_DECISION_REQUIRED**

because School runtime is green but public-result provider/threshold is not authored.

No reviewed doc promotes:

- paid School progress;
- `base.school`;
- a fixture event;
- a QA threshold

into the missing management/accounting Product result.

## Result

**CONSISTENT**

---

# PA09

Current classification:

**HUMAN_DECISION_REQUIRED**

because token identity/capability runtime is shipped but acquisition/policy is not.

Seeded inventory remains non-passing evidence.

## Result

**CONSISTENT**

---

# PA16

Current classification:

**CONTENT_DEPTH_OPEN**

because two routes and generic options do not equal:

- three route contexts;
- three challenge families;
- seasonal topology/content difference.

No reviewed doc counts `escape` as a route or counts duplicate advance behavior as separate challenge families.

## Result

**CONSISTENT**

---

# PA17

Current classification:

**RUNTIME_GREEN_AUTHORING_OPEN**

Capability-gated action-space behavior exists.

Natural ordered reachability still depends on the unauthored PA09 source/policy.

## Result

**CONSISTENT**

---

# Wording cautions

These statements are valid but must not be over-read.

## “Runtime READY”

Means:

the current engine can probably express an ordinary authored choice.

It does not mean:

the Product decision has been made.

## “Choose”

In decision packets, “choose” identifies a required future human action.

It is not a recommendation for one listed option.

## Example option lists

Examples such as:

- shop;
- quest;
- relationship reward;
- threshold;
- exam;
- certificate

are option families only.

None is canon unless Product explicitly selects it.

## “Implementation dependency order”

The ordered decision list in `RC_HUMAN_DECISIONS_REQUIRED_v1.md` is explicitly described as dependency sequencing, not preference ranking.

---

# False-closure checks

| Risk | Result |
|---|---|
| seeded token treated as accepted acquisition | **NO** |
| legacy worldFact treated as item ownership | **NO** |
| synthetic School provider treated as production | **NO** |
| QA-selected School threshold | **NO** |
| fixture placeholder promoted to Product canon | **NO** |
| 49 accelerator treated as ordinary authoring | **NO** |
| optional GIF polish treated as blocking RC asset | **NO** |
| two Forest routes treated as full PA16 depth | **NO** |
| runtime-ready labeled Product-decided | **NO** |

## Final disposition

The current human-decision ledger and subsystem packets are neutral and internally consistent.

Remaining Product decisions remain genuinely open.

No production runtime/UI/content file was modified by Chat 4.
