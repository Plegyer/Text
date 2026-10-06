# CHAT 3 — FINAL SAVE / MIGRATION GATE PREP v51-v53

Status: **START NOW**
Owner: Chat 3
Branch: `chat3/final-save-migration-gate-prep-v51`

Previous Palace full-stack preassembly v48-v50 is accepted.

This bundle prepares the final 1.0 save/migration regression gate without modifying production runtime.
No full CI. Do not merge main. Do not invent final assembled behavior that is not yet integrated.

Primary authority:
- Chat4 final save/migration closure preflight v21 at `1601be7b224f7b6687c4146c53d37499efb6a3f1`
- exact 23-case closure matrix in that packet.
Also preserve the latest Leader recovery/locked decisions and current producer authorities.

## v51 — fixture/source inventory
For each of the 23 final closure cases:
- identify the exact existing fixture(s), test helper(s), stable IDs and producer authority needed;
- classify what is runnable on current main vs only runnable after future tranche assembly;
- identify missing fixture data separately from missing production behavior;
- do not convert unavailable future integration into a false product failure.

Produce a compact case -> fixture/source -> dependency matrix.

## v52 — executable gate design
Design the final `tests/final-save-migration-closure-v21.test.ts` implementation contract:
- exact test names;
- fixture construction rules;
- before/after reload checkpoints;
- exactly-once assertions;
- migration rejection assertions;
- Stable RunResult/transaction assertions;
- Strong Meta snapshot/ownership separation;
- Activity/Camp, Secret Debt/D51, Palace, D46/D47 and lumber-retirement coverage.

Where safe, author reusable test-only fixture/helper code on this branch, but do not change runtime/content behavior and do not weaken existing assertions.

No claim of final executable green is allowed until the fully assembled release target exists.

## v53 — handoff
Create:
`mindy-successor/docs/tasks/CHAT3_FINAL_SAVE_MIGRATION_GATE_PREP_v53.md`

Include:
- 23-case fixture/source matrix;
- exact future executable roster;
- test-only helper/file changes, if any;
- missing-fixture blockers;
- post-integration recheck requirements;
- stop conditions that distinguish product failure from stale fixture/test debt.

Report:
`BUNDLE_COMPLETE — READY_FOR_FINAL_SAVE_MIGRATION_GATE_ASSEMBLY`.

No production mutation. No full CI. Do not merge main.
