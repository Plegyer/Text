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
| PA04 | NOT_YET_PROVEN | Seasonal Lumber data is shipped and covered in target contract tests, but PR #21 does not yet execute every seasonal variant directly from the shipped catalog as one PA row. |
| PA05 | SHIPPED_PASS | First shift opens `lumber.career-first-shift` reactively; pending scene survives reload. |
| PA06 | SHIPPED_PASS | `continue` -> `lumber.foreman-notice` -> `professional` reaches `route-professional` at zero extra daytime Energy. |
| PA07 | OPEN_AUTHORING_BLOCKED | Paid School lesson, typed progress, cost/stat package, presentation and reload are shipped; the required School milestone/public result is not authored. |
| PA08 | OPEN_AUTHORING_BLOCKED | Lumber listener exists, but no authoritative School provider emits the management/accounting public fact. |
| PA09 | OPEN_AUTHORING_BLOCKED | `old_boundary_token` / `enter_old_boundary` identity is locked, but production acquisition + capability/action-space wiring is not authored. |
| PA10 | SHIPPED_PASS | Explicit NightFlow begins through `endDay`. |
| PA11 | SHIPPED_PASS | `lodging.normal` costs 100 exactly once and survives reload. |
| PA12 | SHIPPED_PASS | Professional Foreman Night choice is shipped, uses the Night slot, costs zero daytime Energy, and pending event survives reload. |
| PA13 | SHIPPED_PASS | Resolving the Night scene advances the calendar once with no duplicate lodging charge. |
| PA14 | ACCELERATOR_EVIDENCE_ONLY | Production Forest Activity entry is correctly blocked without capability; direct capability-fact accelerator proves the 2-Energy entry boundary without claiming PA09 passed. |
| PA15 | ACCELERATOR_EVIDENCE_ONLY | Save/reload inside the shipped Activity envelope is proven after the explicit capability accelerator. |
| PA16 | OPEN_AUTHORING_BLOCKED | Current `counter.v1` Activity proves resumable internal progress, but the required 3 route contexts / 3 challenge families / season depth are not authored. |
| PA17 | OPEN_AUTHORING_BLOCKED | No production item-dependent Activity command/action-space change exists yet. |
| PA18 | ACCELERATOR_EVIDENCE_ONLY | Shipped Forest success emits exact A5 `activityResult` and immediately opens the Lumber continuation after accelerated entry. |
| PA19 | ACCELERATOR_EVIDENCE_ONLY | Shipped escape result is distinct and does not grant success truth; full ordered reachability still depends on PA09. |
| PA20 | ACCELERATOR_EVIDENCE_ONLY | Post-Activity Lumber continuation is shipped and zero-extra-Energy, but full ordered reachability inherits the PA09/PA16/PA17 blockers. |
| PA21 | ACCELERATOR_EVIDENCE_ONLY | Hard Work + Forest ending simultaneous eligibility is proven from a validated pre-threshold state; full complex-ending route is not yet fully player-authored. |
| PA22 | NOT_YET_PROVEN | Engine contract allows play while endings are merely eligible, but PR #21 does not yet execute an additional ordinary shipped action from the two-ending eligible state. |
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

Still OPEN:
- production item-definition/capability integration;
- acquisition source;
- retain/consume semantics;
- item-dependent Activity action-space behavior;
- full three-route / three-challenge / season authoring.

A direct worldFact accelerator is acceptance evidence for the Activity runtime only and is never counted as a PA09 or PA17 pass.

## Gate conclusion

**Production runtime/integration gate: GREEN.**

**Full Product Acceptance Slice: PARTIAL / NOT CLOSED.**

The remaining blockers are now concentrated in product authoring/depth rather than architecture:
1. meaningful item/capability production path;
2. School -> Lumber authored public result;
3. richer Forest route/challenge/season design;
4. item-driven Activity action-space behavior;
5. direct shipped evidence for the few remaining non-blocked rows such as PA04/PA22.

No unresolved blocker changes the locked Hard Work rule.
