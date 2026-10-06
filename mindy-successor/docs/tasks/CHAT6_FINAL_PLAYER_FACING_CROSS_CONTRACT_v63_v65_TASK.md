# CHAT 6 — FINAL PLAYER-FACING CROSS-CONTRACT QA v63-v65

Status: **START NOW**
Owner: Chat 6
Branch: `chat6/final-player-facing-cross-contract-v63`

Previous final UI/accessibility smoke v60-v62 is accepted.

This bundle cross-checks the final player-facing golden contracts against save/migration and legacy-retirement closure requirements before final production assembly.

No production runtime/mechanics/content changes.
No full CI.
Do not merge main.

Accepted inputs:
- final player-facing golden manifest v54-v56;
- final player-facing golden QA v57-v59;
- final UI/accessibility smoke v60-v62;
- Chat3 final save/migration golden manifest v57-v59;
- Chat4 D46+D47+legacy golden manifest v53-v55;
- accepted D42, Activity Network v36, Palace v19/D48 and Strong Meta UI authorities.

## v63 — cross-contract consistency matrix

Prove the three closure layers agree:
1. player-facing localization/presentation/accessibility;
2. save/migration save-neutrality and historical compatibility;
3. legacy ending retirement/deletion fences.

At minimum check:
- content/presentation-only layers do not mutate save mechanics;
- retired lumber-stay/vitality is absent live but historical display remains;
- retired Tavern live surfaces stay absent while compatibility rows remain;
- D42 Night rows/slots survive;
- Activity Network v36 final copy is authoritative;
- Palace v19 + D48 slot/asset semantics agree with explicit-ending/Return Home behavior;
- Strong Meta automatic knowledge is not selectable and slot capacities remain representationally consistent;
- raw IDs never become the fallback for compatibility/historical UI;
- deletion sets do not conflict with migration-required historical labels.

Flag any exact key/slot/ID contradiction. Do not resolve by chronology.

## v64 — machine-auditable validator

Author test-only cross-contract manifest/validator.
It must fail on:
- player-facing deletion conflicting with required migration compatibility;
- required historical label deleted;
- save-neutral layer claiming a mechanical effect;
- retired live surface reintroduced;
- D48/Activity/D42 precedence conflict;
- Strong Meta UI representation contradicting slot-free automatic knowledge or 1/2 capacity rules;
- raw internal ID fallback on accepted visible/accessibility surfaces.

Run structure/static validation possible on this branch.
No production mutation.

## v65 — handoff

Create:
`mindy-successor/docs/tasks/CHAT6_FINAL_PLAYER_FACING_CROSS_CONTRACT_v65.md`

Include:
- exact authorities;
- consistency matrix;
- validator path/results;
- contradictions found, if any;
- final integration stop conditions;
- readiness for final player-facing closure execution.

Expected:
`BUNDLE_COMPLETE — READY_FOR_FINAL_PLAYER_FACING_CROSS_CONTRACT_GATE`

No production mutation. No full CI. Do not merge main.
