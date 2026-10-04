# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — ACTIVITY CAMP BASELINE REPAIR v19**
Owner: Chat 4

Frozen Camp producer:
`chat4/activity-camp-persistence-producer-v17@0cae33dd3518dbda7d6d84e4ea6661b02fe49886`

Exact-head QA handoff:
`mindy-successor/docs/tasks/CHAT4_ACTIVITY_CAMP_PERSISTENCE_EXACT_HEAD_QA_v18.md`

QA verdict:
`EXACT_HEAD_QA_RED — NOT_READY_FOR_CHAT2_ASSEMBLY`

Known evidence:
- Camp behavior itself: 6/7 on frozen fixture;
- fixture-only proof branch:
  `chat4/activity-camp-persistence-qa-fixture-repair-v18@03eab6f049011e81efcda0641a790eaed6ecd803`
- repaired Camp focused suite: **7/7 PASS**;
- inherited v15 typecheck and validate blockers remain on frozen producer.

New repair branch:
`chat4/activity-camp-baseline-repair-v19`

Base:
exact frozen Camp producer
`0cae33dd3518dbda7d6d84e4ea6661b02fe49886`

Task:
make the Camp candidate executable-green without changing Camp semantics.

Required narrow repairs:

1. **Inherited Activity test typing**
   `tests/item-capability-activity-closure.test.ts`
   Fix only the typed synthetic Activity option shape that currently fails TS2345 because required `effects` is missing.
   Preserve the exact undeclared-item-capability rejection assertion.

2. **Inherited Forest capability manifest**
   `content/packs/forest-frontier-production.json`
   The research-grade event reads
   `activity.forest-frontier.result.research-grade`
   in a worldFact condition but the capability manifest declares it only under writes.
   Add the exact required read declaration.
   Do not change event mechanics, facts, triggers, choices, rewards or D38 semantics.

3. **Camp synthetic Night fixture**
   Bring in only the fixture correction proven by
   `03eab6f049011e81efcda0641a790eaed6ecd803`:
   the synthetic catalog must declare the existing NightFlow `rest` action identity and required room/outside stage media so post-Night parseSave is valid.
   Do not modify production NightFlow.

Then run:
- typecheck;
- validate;
- build;
- `activity-camp-persistence-v17.test.ts`;
- Activity option/capability closure;
- Forest Frontier production validation;
- migration;
- Activity option reload;
- Restricted Sites;
- Trade Corridor;
- Anomalous Reach;
- NightFlow/calendar/lodging adjacency.

No full CI.

Acceptance:
- typecheck PASS;
- validate PASS;
- build PASS;
- Camp 7/7 PASS;
- previously blocked adjacency files load and pass;
- no runtime Camp semantics changed from frozen v17;
- no Secret Debt priority change;
- no 2-Energy entry change;
- no Field Time change;
- no Palace/Strong Meta coupling.

Deliver:
`mindy-successor/docs/tasks/CHAT4_ACTIVITY_CAMP_BASELINE_REPAIR_v19.md`

Freeze exact green SHA and report:
`READY_FOR_CHAT2_ASSEMBLY`.
