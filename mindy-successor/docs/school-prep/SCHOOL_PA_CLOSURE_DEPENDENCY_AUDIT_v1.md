# School PA Closure Dependency Audit v1

Status: closure dependency audit for the current School Product Acceptance gate.
Scope: School-owned evidence and the School-facing dependencies of PA07/PA08, Forewoman, and Forest.

## Evidence basis

The current repository contains:
- the Product Acceptance execution plan and harness for PA00-PA26;
- the shipped School runtime slice in `src/core/school.ts`;
- accepted School typed-progress/presentation/reload contracts and regression fixtures;
- Lumber cross-system design/handoff documents;
- no canonical final School management/accounting or Arcana/forest public fact IDs.

This audit does not turn an isolated fixture into a full Product Acceptance pass.

## Classification vocabulary

- **ALREADY SHIPPED** — current School runtime/data contract already demonstrates the required School behavior.
- **PRESENTATION / CONTENT-DEPTH ONLY** — mechanics/identity exist; authored player-facing depth is still missing.
- **OPEN AUTHORING** — a final content decision is intentionally unresolved and must not be guessed.
- **RUNTIME-INDEPENDENT EXTERNAL BLOCKER** — closure depends on another product/content route outside School-owned mechanics, not on changing School runtime.

## PA07 — School lesson produces progress/public fact

PA07 requires the School lesson to:
- charge the School cost once;
- spend 1 current-day Energy;
- apply the full stat package;
- produce School progress;
- expose teacher/presentation;
- produce at least one milestone/public fact;
- survive the named save/reload checkpoint.

Classification:

| PA07 component | Classification | Current evidence / dependency |
|---|---|---|
| Paid transaction | ALREADY SHIPPED | `executeSchoolLesson(...)` applies tuition + 1 Energy + complete stat package atomically. |
| Resolver facts from paid lesson | ALREADY SHIPPED | actionCompleted + all statChanged + money resourceChanged + energyChanged after the complete package. |
| School progress ownership/exactly-once | ALREADY SHIPPED as accepted School contract | `lessons_completed` and `night_study_sessions` ownership and reload semantics are fixed by typed-progress fixtures. Shared storage integration is Lead-owned and must only be reopened on a concrete failing contract. |
| Semantic presentation identity | ALREADY SHIPPED | eight stable paid lesson presentation IDs and 24 Night presentation mappings. |
| Teacher identity / teacher-led content | PRESENTATION / CONTENT-DEPTH ONLY | no canonical teacher identity or authored teacher scene is locked. |
| Paid lesson save/reload | ALREADY SHIPPED | runtime-backed School reload matrices preserve money/Energy/stats without replay. |
| Final School milestone/public fact | OPEN AUTHORING | final ID, private eligibility/threshold, certificate/project role and authored scene remain open. |

Therefore PA07 is **not a full product green** until at least one authored milestone/public result and teacher/presentation depth required by the slice are supplied.

## PA08 — School result triggers Lumber/relationship continuation

PA08 requires the earned School result to trigger continuation without another Work visit.

Classification:

| PA08 component | Classification | Current evidence / dependency |
|---|---|---|
| Same-boundary School stat reaction | ALREADY SHIPPED | paid lesson Resolver sees the complete stat package; stat-based consumers can react immediately. |
| Durable public transport | ALREADY SHIPPED | `worldFacts` / `worldFactAdded` is the durable public cross-domain mechanism. |
| Final School fact consumed by Lumber/Forewoman | OPEN AUTHORING | management/accounting fact ID and Arcana/forest fact ID remain intentionally OPEN. |
| Actual Lumber/relationship consumer event using the final fact | RUNTIME-INDEPENDENT EXTERNAL BLOCKER | belongs to integrated Lumber/Forewoman/Forest content; School must publish only through the public boundary. |
| No manual extra Work visit | ALREADY SHIPPED as boundary contract | reaction happens at the same authoritative boundary; another Lumber shift must not be required just to notice the result. |

PA08 cannot be marked product-green using direct `addWorldFact` injection or a synthetic fixture fact.

## School-facing Forewoman route

School-owned requirement:
- publish an accounting/leadership result through the public boundary.

Classification:
- public transport: **ALREADY SHIPPED**;
- School private counter ownership: **ALREADY SHIPPED**;
- final management/accounting fact ID: **OPEN AUTHORING**;
- exact private School threshold/certificate/project: **OPEN AUTHORING**;
- teacher/presentation for the authored milestone: **PRESENTATION / CONTENT-DEPTH ONLY**;
- Forewoman reputation/social threshold, production/crew conflict and final consumer content: **RUNTIME-INDEPENDENT EXTERNAL BLOCKER** from School's perspective.

School must not directly set a Forewoman/Lumber stage.

## School-facing Forest route

School-owned requirement:
- Arcana/Reason/Magic learning may contribute to anomaly interpretation;
- a final School-owned public result may cross into Forest/Lumber if authored.

Classification:
- Arcana paid stat package and statChanged reaction: **ALREADY SHIPPED**;
- durable public transport: **ALREADY SHIPPED**;
- final Arcana/forest School fact ID: **OPEN AUTHORING**;
- exact Arcana/Reason/Magic/private School threshold: **OPEN AUTHORING**;
- teacher/presentation for the authored School result: **PRESENTATION / CONTENT-DEPTH ONLY**;
- Forest clues, Old Boundary access, Activity result, item capability and Forest result content: **RUNTIME-INDEPENDENT EXTERNAL BLOCKER** from School's perspective.

School must not manufacture `forest_truth_known` merely because an Arcana lesson was taken.

## No new runtime blocker inferred

This audit does not request another School schema/dispatcher implementation solely because older pre-activation docs described one.

Rule:
- existing green contracts remain green;
- reopen shared runtime only when a concrete acceptance test fails against the integrated product;
- current unresolved PA07/PA08 School work is content authoring and presentation depth, plus external Lumber/Forewoman/Forest content dependencies.

## Forbidden closure shortcuts

Do not mark PA07/PA08 green using:
- a synthetic fixture-only public fact;
- direct typed School counter setup instead of the School transaction;
- direct track-state setup as proof of player reachability;
- fixture-only certificate or milestone placeholder;
- direct `worldFacts` injection as proof that an authored School milestone exists;
- guessed teacher identity;
- guessed management/accounting or Arcana/forest threshold.
