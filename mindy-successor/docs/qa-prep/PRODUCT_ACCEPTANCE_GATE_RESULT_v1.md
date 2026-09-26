# Product Acceptance Gate Result v1

Date: 2026-09-26
Lead branch: `lead/product-acceptance-gate-v1`
Production baseline: PR #20 merged to main.
Gate PR: #21.

## Executive result

The production-activated catalog is structurally healthy and the shipped mechanics exercised by this gate are green.

GitHub Actions merge-ref evidence:
- typecheck: PASS;
- validate: PASS;
- build: PASS;
- tests: **193/193 PASS**.

This does **not** mean the full Product Acceptance Slice is closed.

The gate intentionally distinguishes:
- **SHIPPED_PASS** — executable against production content without fabricated state;
- **ACCELERATOR_EVIDENCE_ONLY** — the engine/content boundary is proven, but the ordered product path reaches it only through an explicitly labeled pre-threshold/pre-capability accelerator;
- **OPEN_AUTHORING_BLOCKED** — the accepted product specification still lacks a production authoring decision or product-depth implementation;
- **NOT_YET_PROVEN** — shipped behavior exists but this gate does not yet contain sufficient direct end-to-end evidence for the exact row.

## PA00–PA26 status

| PA | Status | Current evidence / blocker |
| --- | --- | --- |
| PA00 | SHIPPED_PASS | Fresh save and real parser round-trip are already covered by the harness/core suite. |
| PA01 | SHIPPED_PASS | Character creation completion is shipped and covered by the current engine/UI suite. |
| PA02 | SHIPPED_PASS | First target `lumber.shift` enters the Lumber career context through the shipped Resolver path. |
| PA03 | SHIPPED_PASS | Target Lumber shift costs one daytime Energy, increments typed `completed_shifts`, and survives reload. |
| PA04 | SHIPPED_PASS | Spring/summer/autumn/winter Lumber shift variants execute directly from the shipped catalog with deterministic media and one-Energy Work cost. |
| PA05 | SHIPPED_PASS | First shift opens `lumber.career-first-shift` reactively; pending scene survives reload. |
| PA06 | SHIPPED_PASS | `continue` -> `lumber.foreman-notice` -> `professional` reaches `route-professional` at zero extra daytime Energy. |
| PA07 | OPEN_AUTHORING_BLOCKED | Paid School lesson, typed progress, cost/stat package, presentation and reload are shipped; the required School milestone/public result is not authored. |
| PA08 | OPEN_AUTHORING_BLOCKED | Lumber listener exists, but no authoritative School provider emits the management/accounting public fact. |
| PA09 | OPEN_AUTHORING_BLOCKED | `old_boundary_token` / `enter_old_boundary` identity is locked, but production acquisition + capability/action-space wiring is not authored. |
| PA10 | SHIPPED_PASS | Explicit NightFlow begins through `endDay`. |
| PA11 | SHIPPED_PASS | `lodging.normal` costs 100 exactly once and survives reload. |
| PA12 | SHIPPED_PASS | Professional Foreman Night choice is shipped, uses the Night slot, costs zero daytime Energy, and pending event survives reload. |
| PA13 | SHIPPED_PASS | Resolving the Night scene advances the calendar once with no duplicate lodging charge. |
| PA14 | SHIPPED_PASS | Forest Activity itself is production-enterable for 2 Energy. A route must be selected before advance; logging road is available without the Old Boundary Token. |
| PA15 | SHIPPED_PASS | Save/reload inside the shipped Activity envelope is proven on the ordinary logging-road path, including persisted route/checkpoint state. |
| PA16 | OPEN_AUTHORING_BLOCKED | Current `counter.v1` Activity proves resumable internal progress, but the required 3 route contexts / 3 challenge families / season depth are not authored. |
| PA17 | ACCELERATOR_EVIDENCE_ONLY | Production action-space is now capability-aware: a seeded real `old_boundary_token` exposes `forest.route.old-boundary`; acquisition/consume authoring remains OPEN, so this is not yet an ordered product pass. |
| PA18 | SHIPPED_PASS | Ordinary logging-road success emits exact A5 `activityResult` and immediately opens the Lumber continuation without item/capability acceleration. |
| PA19 | SHIPPED_PASS | Escape is production-reachable directly after Forest entry, is distinct from success, and does not grant success truth. |
| PA20 | SHIPPED_PASS | Post-Activity Lumber continuation is shipped from the ordinary logging-road success path and adds zero extra daytime Energy. |
| PA21 | ACCELERATOR_EVIDENCE_ONLY | Hard Work + Forest ending simultaneous eligibility is proven from a validated pre-threshold state; full complex-ending route is not yet fully player-authored. |
| PA22 | ACCELERATOR_EVIDENCE_ONLY | From the validated two-ending eligible accelerator state, another shipped `lumber.shift` remains available; the run stays active and no Meta reward is applied before commitment. |
| PA23 | ACCELERATOR_EVIDENCE_ONLY | Explicit Hard Work commitment is proven after the pre-threshold accelerator. |
| PA24 | ACCELERATOR_EVIDENCE_ONLY | Central completion produces one RunResult after explicit commitment. |
| PA25 | ACCELERATOR_EVIDENCE_ONLY | Reload/retry does not duplicate `hardWork:lumber`. |
| PA26 | ACCELERATOR_EVIDENCE_ONLY | New Run preserves Meta and visibly changes starting Strength/Endurance. |

## Locked invariants confirmed

### Lumber Hard Work

Exact ending:
`ending.lumber.hard-work`

Exact and only eligibility condition:
`careerCounter(lumber, completed_shifts) >= 50`

Exact reward:
`hardWork:lumber`

It has no School, Forest, relationship, milestone, item, or season prerequisite.

### School

Shipped:
- exactly eight paid courses;
- tuition + 1 current-day Energy exactly once;
- typed `lessons_completed`;
- separate typed `night_study_sessions`;
- semantic School presentation IDs;
- save/reload exactly-once behavior.

Still OPEN:
- final management/accounting public fact;
- final Arcana/Forest public fact;
- exact milestone/certificate thresholds;
- teacher/content-depth authoring.

### Old Boundary Token / Forest

Locked identities:
- item: `old_boundary_token`;
- capability: `enter_old_boundary`.

Now shipped:
- typed production item definitions for the locked Forest items;
- generic inventory-derived item capability evaluation;
- capability-aware Activity action-space;
- logging-road route selection;
- capability-gated old-boundary route selection;
- route/one-shot-option save compatibility and reload stability.

Still OPEN:
- acquisition source for `old_boundary_token`;
- retain/consume semantics;
- hunter-trail clue/capability identity;
- full three-route / three-challenge / season authoring.

A direct worldFact accelerator is acceptance evidence for the Activity runtime only and is never counted as a PA09 or PA17 pass.

## Gate conclusion

**Production runtime/integration gate: GREEN.**

**Full Product Acceptance Slice: PARTIAL / NOT CLOSED.**

The remaining blockers are now concentrated in product authoring/depth rather than architecture:
1. reachable acquisition authoring for `old_boundary_token` and its final retain/consume policy;
2. School -> Lumber authored public result;
3. richer Forest hunter-trail / 3-route / 3-challenge / seasonal topology design;
4. integration of the remaining accepted worker QA/contracts without relabeling authoring gaps as passes.

Generic item capability infrastructure and item-driven Activity action-space are no longer runtime blockers.

No unresolved blocker changes the locked Hard Work rule.


## Closure update — PR #22 candidate

The PA closure branch adds a backward-compatible generic item/capability layer and capability-aware Activity option model.

Authoritative identities now represented in production definitions:
- `reinforced_axe -> cut_heavy_wood`;
- `rope_kit -> cross_rough_route`;
- `field_preservation_kit -> preserve_specimen`;
- `old_boundary_token -> enter_old_boundary`.

Forest behavior:
- entering `lumber.forest` costs 2 Energy and no longer incorrectly requires the Old Boundary Token;
- logging road is a normal production route;
- Old Boundary Token exposes the hidden old-boundary route through actual inventory-derived capability;
- route must be selected before ordinary Activity advance;
- route/used-option state survives schema4 reload;
- old Activity saves missing new route fields load with safe defaults;
- no item is consumed because consume/retain policy remains product-authoring OPEN.

CI evidence on PR #22 merge-ref candidate:
- typecheck PASS;
- validate PASS;
- build PASS;
- **200/200 tests PASS**.

This closes the generic runtime/action-space portion of PA17 and moves PA14/15/18/19/20 to direct shipped evidence. It does not close PA09 acquisition or PA16 Forest depth.
