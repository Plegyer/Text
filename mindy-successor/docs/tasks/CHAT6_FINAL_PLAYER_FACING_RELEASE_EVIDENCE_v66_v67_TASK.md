# CHAT 6 — FINAL PLAYER-FACING RELEASE EVIDENCE v66-v67

Status: **START NOW**
Owner: Chat 6
Branch: `chat6/final-player-facing-release-evidence-v66`

Previous cross-contract QA v63-v65 is accepted.

This is intentionally a LIGHTWEIGHT bundle to reduce context pressure.
Do not reread giant frozen manifests unless a specific contradiction requires it.

Read only:
1. `CURRENT_CHAT6_TASK_POINTER.md`
2. `CHAT6_FINAL_PLAYER_FACING_CROSS_CONTRACT_v65.md`
3. `LEADER1_CHECKPOINT_2026-10-06_LATE.md`
4. `USER_DECISIONS_LOCKED_v1.md`

Use paths/SHAs already frozen in v65. Fetch a large underlying fixture only when validating one exact field.

No production runtime/mechanics/content changes.
No full CI.
Do not merge main.

## v66 — compact release evidence ledger

Create a concise machine-/human-auditable evidence template for the future fully assembled release target.

It must contain:
- exact commands already frozen in v59/v62/v65;
- PASS/FAIL/NOT-RUN slots for player-facing golden, UI/accessibility smoke, cross-contract validator, and final rendered RU/EN checks;
- exact expected counts: 23 save/migration cases, D42 110/12, D48 4/17, legacy 32 mandatory assertions;
- explicit required checks for retired Tavern/lumber live absence + historical compatibility;
- Strong Meta 1 Keystone / 2 Specialists / automatic knowledge non-selectable;
- Activity Network v36;
- Palace explicit Return Home;
- raw-ID accessibility prohibition;
- exact stop conditions copied by reference, not re-expanded into a giant manifest.

Prefer one compact JSON or Markdown ledger plus optional tiny validator.

## v67 — handoff

Create:
`mindy-successor/docs/tasks/CHAT6_FINAL_PLAYER_FACING_RELEASE_EVIDENCE_v67.md`

Include:
- ledger path;
- exact commands;
- what can be filled only after final assembly;
- what evidence is already accepted;
- final go/no-go criteria for player-facing closure.

Expected:
`BUNDLE_COMPLETE — READY_FOR_FINAL_PLAYER_FACING_RELEASE_EVIDENCE`

No production mutation. No full CI. Do not merge main.
