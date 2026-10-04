# CURRENT CHAT6 TASK POINTER

Status: **ACTIVE — FINAL 1.0 LOCALIZATION / ACCESSIBILITY CLOSURE AUDIT v25**
Owner: Chat 6

Frozen presentation producer:
`chat6/global-presentation-mapping-producer-v23@f25069c369c449ce0efbfe57acf877f950b1dfea`

Executable QA:
run `37203184279` — **SUCCESS**
- exact producer checkout PASS;
- typecheck/validate/build PASS;
- focused presentation bundle 36/36 PASS;
- asset paths 98/98 present;
- RU/EN accessibility parity PASS;
- Palace firewall unchanged.

New branch:
`chat6/final-localization-closure-audit-v25`

Task:
audit the complete 1.0 RU/EN localization and accessibility surface across current main + frozen/queued producers.

Cover:
- D40 endings;
- D41 endings;
- D42 Night;
- Secret Debt;
- Palace v18/v19;
- Activity v15/v16/v17;
- D46/D47 New Start+;
- D49 macro-lore epistemic wording;
- D50/v23 presentation alt keys;
- result/ending epilogues;
- accessibility names/captions;
- stale retired legacy IDs/keys.

Produce:
- missing RU keys;
- missing EN keys;
- RU/EN semantic-strength mismatches;
- stale/dead localization keys that still reference retired live semantics;
- inaccessible presentation slots;
- copy that accidentally strengthens report/inference into objective canon;
- exact pre-1.0 repair list.

Do not rewrite Product lore unless a concrete mismatch is identified.
Do not change runtime.
No full CI.

Deliver:
`mindy-successor/docs/tasks/CHAT6_FINAL_LOCALIZATION_CLOSURE_AUDIT_v25.md`

Report:
`READY_FOR_LEADER_REVIEW`.
