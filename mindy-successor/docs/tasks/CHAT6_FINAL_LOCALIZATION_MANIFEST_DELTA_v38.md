# Chat 6 — Final Localization Manifest Delta v38

Status: **READY_FOR_CHAT2_CONTENT_ASSEMBLY**  
Owner: Chat 6  
Branch: `chat6/activity-network-copy-fix-v36`

This document is the authoritative post-v35 delta to the final localization assembly guidance.

It does not replace:

- `CHAT6_FINAL_LOCALIZATION_ASSEMBLY_PACKET_v32.md`
- `CHAT6_FINAL_LOCALIZATION_PRESENTATION_MANIFEST_v33.json`

It amends exactly one final localization value.

No runtime changes.  
No mechanics changes.  
No presentation changes.  
No full CI.

## Delta authority

Frozen v36 producer:

`2f8f291a7e03bcf1677d6f51feaec28fe98e29ba`

Final v36 localization blob:

`d631544c96c724375ac48d3c563dd1c1865bb5b5`

Predecessor accepted Activity v17 localization blob:

`4449ca46ad6580ca5f36adf140e9e1e14a007b64`

Frozen Activity mechanics authority remains:

`chat3/activity-ending-family-producer-v16-r1@3cf69d7cb3df1a58d68908159d0acc14736435c4`

## Exact manifest delta

Target key:

`ending.ending.activity.network.epilogue`

Operation relative to the v33 Activity v17 tranche:

**replace final authoritative value**

No key is added or deleted.

Final RU:

`Контакты связывают разрозненные направления в единое рабочее пространство.`

Final EN:

`The contacts tie disconnected routes into one practical working network.`

The predecessor v17 value containing the unconditional four-direction claim is superseded and must not be considered final release copy.

## Assembly order update

The v33 dependency order remains unchanged through the Activity v17 overlay.

After applying the Activity v17 localization tranche, apply this v36 one-key correction before final localization parity / copy-consistency validation.

Effective Activity localization order:

1. Activity v16-r1 mechanics/content prerequisite;
2. Activity v17 localization/presentation overlay;
3. **v36 Activity Network epilogue correction**;
4. later global assembly layers as already defined by v32/v33.

This delta introduces no dependency on Palace, D42, Secret Debt, Tavern migration, or global presentation.

## Accounting impact

v33 counted the Activity v17 localization overlay as:

- 9 additions;
- 9 intentional replacements.

v38 does not change the set of localization keys in the final assembly.

Relative to the already-declared v33 manifest, this delta contributes:

- new localization keys: **0**
- deleted localization keys: **0**
- final-value overrides: **1**
- presentation slots: **0**

Therefore the v33 global key/slot cardinality remains structurally unchanged. Only the authoritative final value for one already-manifested key changes.

## Conflict rule

For `ending.ending.activity.network.epilogue`:

- current key absent -> add v36 final value;
- current value equals Activity v17 predecessor -> replace with v36 final value;
- current value equals v36 final value -> no-op;
- current value is anything else -> **STOP**.

Do not resolve an unexpected value by chronology or last-write-wins.

## Superseded value

The Activity v17 epilogue ending with an unconditional claim that the network connects **four** directions is no longer the final release value.

Do not reintroduce that predecessor text from:

`4449ca46ad6580ca5f36adf140e9e1e14a007b64`

after v36 has been applied.

## Focused preflight addition

Add:

`tests/activity-network-copy-fix-v36.test.ts`

to the focused Chat 2 localization/Activity preflight bundle.

The existing v32/v33 focused localization and presentation checks remain required. v38 adds no full-CI requirement.

## Final authoritative contract

For release assembly, the authoritative Activity Network ending copy is now:

- title: unchanged from Activity v17;
- description: unchanged from Activity v17;
- epilogue: **v36 value from localization blob `d631544c96c724375ac48d3c563dd1c1865bb5b5`**.

Mechanics, requirements, reward ownership, presentation mapping, and localized ended-screen consumer remain owned by their previously frozen authorities.

**READY_FOR_CHAT2_CONTENT_ASSEMBLY**
