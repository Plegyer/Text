# Chat 5 — D47 Focused QA v13

Status: **GREEN — READY FOR CHAT 2 ASSEMBLY**

Frozen producer under test:

`chat5/hard-work-bonus-mapping-producer-v13@252dc26c514e24f4ab0f0cc0da7694254282e4c4`

The producer candidate was not mutated.

## Exact-head verification

QA branch:

`chat5/qa-d47-hard-work-mapping-v13`

Verification workflow:

`.github/workflows/chat5-d47-exact-head-focused.yml`

The workflow explicitly checked out the frozen producer SHA
`252dc26c514e24f4ab0f0cc0da7694254282e4c4`,
rather than testing QA-branch production state.

GitHub Actions:

- run: `37200203160`
- job: `111430151532`
- conclusion: **SUCCESS**

## Executed checks

- `npm run typecheck` — PASS
- `npm run validate` — PASS
  - 82 packs
  - 329 events
  - 39 actions
  - 22 endings
- `npm run build` — PASS
- focused D47 and adjacency executable tests — **103 passed / 0 failed / 0 skipped**

Focused executable coverage included:

- exact D47 package mapping;
- ordinary Hard Work package validation/runtime;
- arbitrary earned subset selection;
- New Start+ presentation and UI;
- D46 base Lust 5 -> active Prostitute package Lust 10;
- atomic once-per-new-run package application;
- save/reload idempotence;
- D23 10/10 package-identity semantics;
- D24 cap-200 clipping/non-multiplication;
- Strong Meta registry/runtime/isolation;
- Secret Debt separation;
- representative Tranche A advanced-ending adjacency for Lumber, Satyr Maid, Undead Farm, Tavern and Hunter;
- legacy ending/meta regression coverage.

## Scope

No full CI was run. Full integration CI remains Chat 2 assembly-owned.

The QA branch adds verification-only material and does not change D47 production behavior.
