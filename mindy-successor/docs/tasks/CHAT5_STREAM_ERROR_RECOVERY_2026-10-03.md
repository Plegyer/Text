# Chat 5 stream-error recovery — 2026-10-03

Git is the source of truth.

Read:
1. `CURRENT_CHAT5_TASK_POINTER.md`
2. `USER_DECISIONS_LOCKED_v1.md`
3. frozen D41 Product packet:
   `chat5/ordinary-complex-endings-tranche-a-v10@95c0f06449e0a62241e5286c8a95050c82346956`

Current producer branch:
`chat5/advanced-endings-tranche-a-producer-v11`

Latest known producer head before stream failure:
`ba9a336e707d8d8b4c72769855fcc1d314453f4d`

Do NOT restart the producer. Many real D41 commits already exist.

Leader latest exact QA branch:
`chat5/qa-d41-latest-20261003-v1`

QA workflow commit:
`1d91177ed3f7f5aef96f786540046153256afb07`

Use the self-hosted Windows QA result, not the producer branch's old ubuntu-latest workflow as authority.

Known production regression still present at producer head:
`content/packs/lumber-cross-production.json`

D41 added:
`removeItem forest_preserved_specimen`
to `lumber-cross.activity-forest-return`.

The accepted pre-D41 behavior was non-consuming.
That new removeItem makes the only unconditional choice fail the repository's free-exit validator.

Repair:
- remove only the newly-added specimen consumption from that event;
- preserve the existing D41 career-fact writes;
- do not invent an alternate progression mechanic.

Then rerun the latest self-hosted focused QA and fix only failures proven on the exact latest head.

Do not create duplicate Strong Meta runtime.
Specialist rewards remain integration seams for Chat 2 where current main lacks the assembled runtime.

Finish with:
- exact frozen SHA;
- changed files;
- focused QA results;
- Specialist seam list;
- READY_FOR_CHAT2_ASSEMBLY.

No full CI.
Do not merge main.
