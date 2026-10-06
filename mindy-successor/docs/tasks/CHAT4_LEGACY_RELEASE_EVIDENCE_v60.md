# Chat 4 — Legacy / D46 / D47 Release Evidence v60

Status: **RELEASE EVIDENCE PACKET COMPLETE — PRE-INTEGRATION**
Owner: Chat 4
Branch: `chat4/legacy-release-evidence-v59`

## Scope

This handoff completes Chat 4 v59-v60.

No production runtime/content file was changed.  
No main merge was performed.  
No full CI was run.

## 1. Release evidence ledger

Ledger:

`mindy-successor/docs/tasks/CHAT4_LEGACY_RELEASE_EVIDENCE_LEDGER_v59.md`

Blob:

`48ba285aac9878a8d8dd3d0844d84181139b4f71`

Primary accepted compact authority:

`mindy-successor/docs/tasks/CHAT4_CROSS_GOLDEN_LEGACY_CONSISTENCY_v58.md`

Blob:

`3a3038066809e1f391320ff9e3b0440e021ce36e`

Referenced mechanics operations:

`CHAT4_D46_D47_LEGACY_GOLDEN_OPERATIONS_v53.json@17282cf11436d54d49915f44ed84de56a0eebf7c`

Referenced focused gate:

`CHAT4_D46_D47_LEGACY_GOLDEN_GATE_v54.json@dae0b2bf197f66c1b1fe834e643caf541c6ef4c7`

## 2. Accepted evidence

The accepted pre-integration evidence is green for the following contract facts:

- fresh/new-life Lust = **5**;
- legitimate stored Lust is preserved;
- ordinary wage bases = **35 Lumber / 37 other nine**;
- ordinary wage cap = **120** and remains ordinary-only;
- D47 has exactly ten whole profession packages;
- D47 packages remain outside Strong Meta slots;
- ordinary Hard Work threshold = **50 shifts**;
- canonical ordinary ending count after retirement = **40**;
- live `lumber-stay` is absent;
- live generic `vitality` acquisition is absent;
- `legacy.lumber-stay.vitality` is historical-only;
- historical lumber Energy = **+1 exactly once**;
- existing historical RunResult/transaction proof is preserved;
- pre-RunResult lumber completion receives deterministic compatibility proof without reward replay;
- profile merge/reload dedupes the legacy perk;
- exactly five live lumber localization rows are deleted;
- exactly five historical compatibility localization rows are retained;
- presentation slot `ending/lumber-stay` is deleted;
- historical lumber display remains non-interactive;
- cross-golden consistency = **15/15 consistent, 0 conflicts**;
- cross-contract validator = **10/10 PASS**.

These are accepted contract/evidence facts, not a claim that final production assembly has already executed them.

## 3. What remains post-integration

The following remain **NOT-RUN** until Chat2 creates the exact integrated D46+D47+legacy production candidate:

- typecheck on the exact integrated head;
- content validation on the exact integrated head;
- build on the exact integrated head;
- all v54 focused phases;
- exact observed canonical ending count on the integrated head;
- exact observed live/retired lumber identities on the integrated head;
- exact observed historical Energy application count on the integrated head;
- final player-facing golden gate;
- final save/migration golden gate including F4/F5;
- release/full CI.

Chat4 must not convert these `NOT-RUN` fields to `PASS` without exact integrated-head evidence.

## 4. Exact selective assembly order

Chat2 should execute this order:

1. Freeze the actual live integration branch and exact SHA.
2. Reconfirm no newer Product authority supersedes D46/D47/legacy values.
3. Apply v53 D46 fresh-Lust operation semantically.
4. Apply the ten D46 wage-base operations by stable action ID.
5. Apply the ordinary-only wage cap 120 without capturing Palace, Secret Debt or other non-ordinary wages.
6. Apply D47 whole-package mapping and selection semantics.
7. Preserve D47 exactly-once package application and separation from Strong Meta slots.
8. Preserve the exact 50-shift ordinary Hard Work threshold.
9. Add/compose lumber retirement compatibility semantics.
10. Remove live `lumber-stay` and generic live `vitality` acquisition.
11. Preserve/normalize `legacy.lumber-stay.vitality` with exactly +1 Energy once.
12. Preserve historical RunResult/transaction and deterministic pre-RunResult proof semantics.
13. Delete exactly the five live lumber localization keys.
14. Retain exactly the five historical compatibility localization rows.
15. Delete presentation slot `ending/lumber-stay`.
16. Preserve non-interactive historical display.
17. Inspect shared-file diffs for unrelated reversion/deletion.
18. Freeze the exact integrated candidate SHA.
19. Execute the release evidence gates below.

Whole historical producer files must not be used as replacement snapshots for current shared owners.

## 5. Exact gate execution order

On the frozen integrated candidate:

```text
npm ci
npm run typecheck
npm run validate
npm run build
```

Then execute the complete phase order from:

`mindy-successor/docs/tasks/CHAT4_D46_D47_LEGACY_GOLDEN_GATE_v54.json`

exact accepted blob:

`dae0b2bf197f66c1b1fe834e643caf541c6ef4c7`

Then, on the same assembled candidate:

1. run the final accepted Chat6 player-facing golden gate/validator;
2. run the final accepted Chat3 save/migration golden closure;
3. explicitly execute historical lumber F4 and F5 coverage;
4. run any newer authoritative focused tests for systems present on the actual integration base;
5. only after all focused gates are green may the designated Chat2/Leader release lane run full CI.

## 6. Required evidence before GO

A future GO packet must contain:

- exact integrated branch;
- exact integrated SHA;
- typecheck = PASS;
- validate = PASS;
- build = PASS;
- every v54 phase = PASS;
- final player-facing gate = PASS;
- final save/migration gate = PASS;
- F4 historical existing-RunResult case = PASS;
- F5 historical pre-RunResult case = PASS;
- canonical ordinary ending count observed = 40;
- live `lumber-stay` observed = absent;
- live generic `vitality` observed = not acquirable;
- historical legacy Energy observed maximum = +1 once;
- D47 packages observed outside Strong Meta slots;
- stored historical Lust observed preserved;
- fresh/new-life Lust observed = 5;
- no unrelated shared-file reversion;
- no unresolved third-value conflict.

## 7. GO criteria

D46+D47+legacy selective assembly is **GO for focused-gate execution** only if:

- the assembly followed v53 semantic operations rather than whole-file replacement;
- there is no third-value conflict;
- current/newer systems are preserved;
- all exact live/historical lumber key/slot boundaries are respected;
- no historical evidence fabricates a modern ending, Strong Meta, Hard Work or Palace identity;
- exact integrated-head typecheck/validate/build are green;
- the complete v54 focused gate is green;
- final player-facing and save/migration gates are green.

Release/full-CI GO requires all of the above plus the release lane's required full CI.

## 8. NO-GO criteria

Immediate **NO-GO / STOP** if:

- valid stored Lust is rewritten to 5;
- fresh/new-life Lust is not 5;
- D46 35/37 wage bases or cap 120 drift without newer Product authority;
- non-ordinary wages are captured by the ordinary wage helper;
- D47 package mapping changes;
- D47 packages consume Strong Meta slots;
- Hard Work threshold differs from 50;
- canonical ordinary endings differ from 40;
- live `lumber-stay` returns;
- live generic `vitality` acquisition returns;
- historical Energy stacks above +1;
- historical evidence fabricates modern ending/Strong Meta/Hard Work/Palace identity;
- historical RunResult/transaction changes or replays;
- either exact five-key localization set drifts;
- `ending/lumber-stay` remains a live presentation slot;
- historical display becomes interactive;
- any v53-owned value is a third value not covered by accepted authority;
- a shared production owner is replaced wholesale from a historical snapshot;
- a focused gate is red.

Do not resolve a disagreement by chronology, last-write-wins or test-fixture accommodation.

## 9. Current disposition

Pre-integration contract evidence:

**PASS**

Cross-golden semantic conflict:

**NONE**

Selective assembly semantic permission:

**YES**

Integrated production execution:

**NOT-RUN**

Focused integrated-head gates:

**NOT-RUN**

Full CI:

**NOT-RUN**

Production mutation by Chat4:

**NONE**

Main merge by Chat4:

**NONE**

**v59 COMPLETE — COMPACT RELEASE EVIDENCE LEDGER PUBLISHED**  
**v60 COMPLETE — RELEASE EVIDENCE HANDOFF READY**

**BUNDLE_COMPLETE — READY_FOR_D46_D47_LEGACY_RELEASE_EVIDENCE**
