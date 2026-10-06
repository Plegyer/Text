# CURRENT CHAT6 TASK POINTER

Status: **ACTIVE — AUTO-CONTINUE ACTIVITY NETWORK COPY FIX BUNDLE v36-v38**
Owner: Chat 6

Previous release-localization bundle v33-v35 is complete.

v35 found one concrete route-semantic contradiction:
`ending.activity.network.epilogue`
claims all four directions are connected, while the accepted route can complete with only 3 of 4 regional anchors.

Current branch:
`chat6/activity-network-copy-fix-v36`

Complete ALL tasks below in order.

## Task A — v36
Create a localization-only content correction producer.

Change only the RU/EN epilogue for:
`ending.activity.network.epilogue`

Required semantic correction:
remove the unconditional numeric claim of **four** directions while preserving the idea that the heroine's contact network connects previously separate routes/areas into a practical working network.

Safe target wording:

RU:
`Контакты связывают разрозненные направления в единое рабочее пространство.`

EN:
`The contacts tie disconnected routes into one practical working network.`

Do not change mechanics, requirements, rewards, title, description, or lore.

Add a focused test proving:
- bilingual epilogue exists;
- no unconditional four-region claim remains;
- Activity Network mechanics are unchanged.

## Task B — v37
Create:
`mindy-successor/docs/tasks/CHAT6_ACTIVITY_NETWORK_COPY_FIX_QA_NOTE_v37.md`

Document exact diff, source authority, and assembly guidance.

## Task C — v38
Create:
`mindy-successor/docs/tasks/CHAT6_FINAL_LOCALIZATION_MANIFEST_DELTA_v38.md`

Update the final localization assembly guidance to include the v36 corrected epilogue as the authoritative final value.

No runtime changes.
No full CI.

Freeze exact producer SHA and report:
`BUNDLE_COMPLETE — READY_FOR_CHAT2_CONTENT_ASSEMBLY`.
