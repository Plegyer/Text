# Presentation Hardening v9 Candidate Handoff

Status: C2-96 CANDIDATE PREPARED
Owner: Chat 2 / Presentation & Media
Baseline main: `a341303183dc277a26b3e64a61d8ed8e35c5d05f`
Branch: `chat2/presentation-hardening-c2-85-96`

The exact frozen candidate head and exact-head repository CI are recorded in PR metadata after checks complete.

## Queue scope

This candidate covers C2-85 through C2-95 and prepares C2-96 freeze.

Delivered:
- post-v8 reachability classification;
- reduced-motion / animation-off audit;
- keyboard/focus accessibility audit v2;
- ending presentation parity v2;
- Forest presentation parity v2;
- ordinary-poverty presentation parity v2;
- School course/teacher media parity v3;
- project-owned source integrity v2;
- replacement/editor invariance v3;
- RU/EN locale accessibility parity v4;
- stale/dead binding regression v4.

## Relationship to predecessor

Frozen PR #136 remains the C2-73..84 presentation candidate and has QA PASS on exact head `fecb773b056d8912439350bb0d44a59b6009a7e0`.

This v9 candidate starts from current main and does **not** duplicate the predecessor production patch.

Prepared-only predecessor refinements are classified explicitly where current main does not yet contain them.

## Current-main reachability

Queue-v9 selected unique exact semantic bindings: **102**.

Domain membership:
- Work: **56**;
- endings: **9**;
- School: **11**;
- Forest: **10**;
- ordinary poverty: **20**.

Shared fallback-only semantic root: `location/town/default`.

Prepared-only semantic bindings: **0**.

Dead selected semantic bindings: **0**.

## Validation summary

The candidate adds focused regressions for:
- deterministic animation-off static resolution;
- Work/ending/School focus and disabled-state presentation;
- all 9 ending presentation IDs;
- 10 Forest route/result/reaction presentation IDs;
- 20 ordinary-poverty event/variant presentation IDs;
- all 8 School course presentation IDs and 8 teacher media identities;
- project-owned source integrity;
- replacement/editor gameplay + Save invariance;
- RU/EN alt/caption/help coverage;
- stale registry rows, dead manifest IDs, missing sources and invalid fallback chains.

## Production scope

Production gameplay/state files changed by this candidate: **0**.

Production presentation/UI/localization files changed by this candidate: **0**.

The candidate is audit/manifest/regression-only and intentionally leaves predecessor PR #136 production refinements on that frozen candidate.

## Ownership boundary

No gameplay mechanics, progression, Save/RNG, career facts, relationship/story canon, Activity mechanics, School mechanics, ending rules, economy or shared runtime architecture are changed.

Secret Debt remains outside ordinary-poverty presentation coverage.

## QA freeze

After exact-head required repository CI is green, the exact head is frozen under `CANDIDATE_QA_FREEZE_PROTOCOL.md`.

Any head movement after freeze invalidates prior exact-head QA/CI evidence.
