# Release Candidate Readiness Matrix v1

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance  
Baseline: merged main after PR25  
Latest final-gate evidence: **218/218 tests PASS**

## Classification vocabulary

- **RUNTIME_GREEN** — current production runtime/integration behavior is implemented and no known blocking defect remains in this domain.
- **QA_GREEN** — current release-candidate suite has executable evidence for the critical domain invariants.
- **AUTHORING_OPEN** — a human/product decision is still required.
- **CONTENT_DEPTH_OPEN** — the runtime works, but accepted product depth/content is incomplete.
- **ASSET_POLISH_OPEN** — presentation/art polish remains, but is not a current technical blocker.

No percentages or composite scores are used.

---

# Readiness matrix

| Domain | Runtime | QA | Remaining open class | Current interpretation |
|---|---|---|---|---|
| Architecture / Resolver | **RUNTIME_GREEN** | **QA_GREEN** | — | Resolver ordering, reactive boundaries, typed progression and orphan-stage protection are covered. |
| Save / reload / schema-4 | **RUNTIME_GREEN** | **QA_GREEN** | — | Core compatibility, Activity option migration, Night checkpoints and ending transactions are green. Two small direct legacy-omission tests remain hardening only. |
| School | **RUNTIME_GREEN** | **QA_GREEN** | **AUTHORING_OPEN** | Paid lessons, typed counters, blocking scene, reload and Night separation are green. Public-result thresholds/providers remain human decisions. |
| Lumber / Foreman | **RUNTIME_GREEN** | **QA_GREEN** | — | Target shift, career milestone, professional Foreman route and reactive continuation are shipped and exercised. |
| NightFlow | **RUNTIME_GREEN** | **QA_GREEN** | — | Lodging payment, pending Night scenes, relationship Night, modifiers and one calendar advance are covered exactly once. |
| Forest / Activity core | **RUNTIME_GREEN** | **QA_GREEN** | **AUTHORING_OPEN**, **CONTENT_DEPTH_OPEN** | General entry, logging-road, old-boundary capability route, route reload, success/escape and Resolver continuation are green. Item acquisition and full 3-route/3-challenge/season content remain open. |
| Item capability | **RUNTIME_GREEN** | **QA_GREEN** | **AUTHORING_OPEN** | Capability is inventory-derived and validated. Old Boundary Token acquisition and final retain/consume policy remain product decisions. |
| Endings / Meta | **RUNTIME_GREEN** | **QA_GREEN** | — | Eligibility != commitment, commitment != completion, RunResult, exactly-once Meta and New Run persistence are green. |
| Hard Work | **RUNTIME_GREEN** | **QA_GREEN** | — | Exact rule remains only 50 completed Lumber shifts; exact reward remains `hardWork:lumber`. |
| Presentation runtime | **RUNTIME_GREEN** | **QA_GREEN** | **ASSET_POLISH_OPEN** | Semantic IDs, fallback, Animation Off, save compatibility and central stage are green. Final art/media quality may still be polished. |
| Product Acceptance authoring | — | — | **AUTHORING_OPEN**, **CONTENT_DEPTH_OPEN** | School public results, Old Boundary acquisition/policy and deeper Forest content are not yet authored. |

---

# Architecture / Resolver

## RUNTIME_GREEN

Current architecture supports:

- typed career/relationship/School progression;
- reactive Resolver boundaries after committed transactions;
- pending scene snapshots;
- Night intercepts;
- Activity results;
- ending eligibility/commit/completion.

## QA_GREEN

Current suite includes:

- architecture gap tests;
- orphan-stage gate;
- exactly-once reload;
- shipped Product Acceptance;
- one-Save RC E2E.

No current architecture blocker is in the authoring ledger.

---

# Save / reload / schema-4

## RUNTIME_GREEN

Green behaviors include:

- pre-option Activity compatibility;
- pending scene reload;
- NightFlow checkpoint reload;
- committed ending reload;
- ended RunResult compatibility;
- Meta transaction deduplication.

## QA_GREEN

Executable coverage exists for the critical persisted transaction boundaries.

Two direct legacy omission cases remain useful hardening:

- missing entire typed School state;
- missing semantic presentationId.

Their schema contracts are already compatible and they are not known blockers.

---

# School

## RUNTIME_GREEN

Current shipped School has:

- eight first-class paid courses;
- typed tracks;
- paid `lessons_completed`;
- separate Night-study progress;
- semantic presentation IDs;
- blocking first-School scene behavior;
- Resolver integration.

## QA_GREEN

PR24 and PR25 prove the real accumulated path:

```text
paid Arcana
-> base.school
-> reload
-> listen
```

without double tuition, Energy or progress.

## AUTHORING_OPEN

Still human-owned:

- management/accounting threshold;
- management/accounting provider;
- Arcana/Forest threshold/provider if still in scope.

---

# Lumber / Foreman

## RUNTIME_GREEN

Shipped:

- `lumber.shift`;
- seasonal work scenes;
- typed career;
- first-shift milestone;
- Foreman professional route;
- Night relationship route;
- Forest return continuation.

## QA_GREEN

One-Save RC flow covers the same Save across these transitions.

No current Lumber runtime blocker remains.

---

# NightFlow

## RUNTIME_GREEN

Current engine protects:

- explicit endDay;
- lodging selection/payment;
- forced/intercept scenes;
- optional Night choice;
- next-day modifiers;
- calendar advance.

## QA_GREEN

Covered by:

- NightFlow suite;
- Lumber Night acceptance;
- PR24 one-Save E2E;
- PR25 School blocking compatibility.

No authoring blocker is required for the current Night slice.

---

# Forest / Activity

## RUNTIME_GREEN

Current production supports:

- 2-Energy entry;
- option-model-aware route selection;
- natural logging-road;
- inventory-capability-gated old-boundary route;
- route reload;
- legacy pre-option save;
- success/escape/failure;
- external Resolver continuation.

## QA_GREEN

Covered by:

- Activity suite;
- item-capability closure tests;
- generic option reload;
- Product Acceptance shipped test;
- PR24 one-Save E2E;
- PR25 final gate.

## AUTHORING_OPEN

Still needs a human decision for:

- Old Boundary Token acquisition;
- token retain/consume;
- third-route/hunter identity.

## CONTENT_DEPTH_OPEN

Still missing accepted deeper content:

- third route;
- three challenge families;
- seasonal Forest difference.

---

# Endings / Hard Work / Meta

## RUNTIME_GREEN

Central transaction boundary is stable:

```text
eligible
-> committed
-> completed RunResult
-> Meta ledger
-> New Run
```

## QA_GREEN

Current evidence proves:

- 49 not eligible;
- real 50th shift eligible;
- no automatic ending;
- commit no reward;
- completion reward once;
- reload/retry no duplicate;
- New Run Meta persists.

Hard Work remains exactly:

`careerCounter(lumber, completed_shifts) >= 50`

with:

`hardWork:lumber`.

No open product decision applies to that rule.

---

# Presentation

## RUNTIME_GREEN

Current presentation system supports:

- semantic IDs;
- persisted semantic pending/action identity;
- static/GIF fallback;
- Animation Off;
- missing-media nonfatal behavior;
- central presentation stage.

## QA_GREEN

Presentation unit/UI/semantic-ID suites remain in current full check.

## ASSET_POLISH_OPEN

Possible non-blocking polish:

- final GIFs;
- final portraits;
- Forest route/challenge art;
- item icons/descriptions;
- accessibility/alt text.

This becomes blocking only if release ownership explicitly requires final assets.

---

# Release-candidate conclusion

## Technically ready classes

- architecture: **RUNTIME_GREEN / QA_GREEN**
- save: **RUNTIME_GREEN / QA_GREEN**
- School runtime: **RUNTIME_GREEN / QA_GREEN**
- Lumber: **RUNTIME_GREEN / QA_GREEN**
- Night: **RUNTIME_GREEN / QA_GREEN**
- Forest runtime: **RUNTIME_GREEN / QA_GREEN**
- endings/Meta: **RUNTIME_GREEN / QA_GREEN**
- presentation runtime: **RUNTIME_GREEN / QA_GREEN**

## Still intentionally open

- School public-result authoring: **AUTHORING_OPEN**
- Old Boundary source/policy: **AUTHORING_OPEN**
- third/hunter route identity: **AUTHORING_OPEN**
- Forest 3-route/3-challenge/season depth: **CONTENT_DEPTH_OPEN**
- final media/art: **ASSET_POLISH_OPEN**

Technical RC green must not be relabeled as full authoring completion while those classes remain open.

No production runtime/UI/content file was modified by Chat 4.
