# CURRENT CHAT6 TASK POINTER

Status: **ACTIVE — RETIRED TAVERN LOCALIZATION CLEANUP v31**
Owner: Chat 6

Accepted audit:
`chat6/retired-tavern-localization-compat-audit-v30@083166a80439a6c9dbc222f3ab99a20e6ff0d4a6`

New branch:
`chat6/retired-tavern-localization-cleanup-v31`

Task:
remove exactly the six retired Tavern presentation-localization rows proven safe by v30:

- `presentation.static.ending.tavern-stay.alt`
- `presentation.static.ending.tavern-stay.caption`
- `presentation.static.ending.tavern-guild.alt`
- `presentation.static.ending.tavern-guild.caption`
- `presentation.static.ending.tavern-court.alt`
- `presentation.static.ending.tavern-court.caption`

Do not remove:
- migration-oriented ending title/description rows;
- retired unlock labels;
- any runtime/history compatibility key not explicitly listed above.

Add a focused static test proving:
- the six rows are absent;
- retired Tavern ending IDs remain absent from live definitions/presentation;
- D41 migration mappings remain unchanged.

No runtime changes.
No full CI.

Deliver:
`mindy-successor/docs/tasks/CHAT6_RETIRED_TAVERN_LOCALIZATION_CLEANUP_v31.md`

Freeze exact SHA and report:
`READY_FOR_CHAT2_CONTENT_ASSEMBLY`.
