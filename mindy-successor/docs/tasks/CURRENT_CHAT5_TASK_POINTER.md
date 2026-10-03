# CURRENT CHAT5 TASK POINTER

Status: **ACTIVE — D41 PRODUCER FREE-EXIT REPAIR**
Owner: Chat 5

Accepted D41 Product authority:
`chat5/ordinary-complex-endings-tranche-a-v10@95c0f06449e0a62241e5286c8a95050c82346956`

Producer branch:
`chat5/advanced-endings-tranche-a-producer-v11`

Current head:
`ba9a336e707d8d8b4c72769855fcc1d314453f4d`

Latest exact-head self-hosted diagnostics:
run `37125509264`

Results:
- typecheck: **SUCCESS**
- build: **SUCCESS**
- validate: **FAILURE**
- D41 focused: **FAILURE**

## Exact root blocker

Both failing jobs collapse on:

`Нет бесплатного выхода lumber-cross.activity-forest-return`

D41 added this new effect in:
`content/packs/lumber-cross-production.json`

inside event:
`lumber-cross.activity-forest-return`

new effect:
`removeItem forest_preserved_specimen`

The accepted pre-D41 behavior was non-consuming.
D41 does not authorize consuming the specimen.
That new removal makes the event's only unconditional choice non-free and violates the repository validator.

## Repair

On the producer branch:
- remove ONLY the newly-added `removeItem forest_preserved_specimen` effect from the live
  `lumber-cross.activity-forest-return` event;
- preserve the D41 career-fact writes;
- do not invent a second exit;
- do not weaken the free-exit validator;
- do not change Forest result meaning;
- do not alter D33/D34/D41 gates;
- do not duplicate Strong Meta runtime.

After repair, run fresh self-hosted focused verification from the exact repaired head:
- typecheck;
- validate;
- build;
- all D41 focused tests;
- Lumber cross-system/natural tests;
- Satyr/Undead/Tavern/Hunter natural tests;
- migration;
- Palace D23;
- presentation parity.

No full CI.

If green:
1. create final handoff:
   `mindy-successor/docs/tasks/CHAT5_ADVANCED_ENDINGS_TRANCHE_A_PRODUCER_v11.md`;
2. list exact 14 endings and reward seams;
3. freeze exact SHA;
4. report:
   `READY_FOR_CHAT2_ASSEMBLY`.

Do not rebase onto current main.
Do not merge main.
