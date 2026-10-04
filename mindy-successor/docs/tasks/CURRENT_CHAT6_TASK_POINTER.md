# CURRENT CHAT6 TASK POINTER

Status: **ACTIVE — GLOBAL PRESENTATION MAPPING PRODUCER v23**
Owner: Chat 6

Frozen audit:
`chat6/global-media-gap-audit-v22@f81788f046eafdafc8f9fbdc542793becfc6794c`

Audit verdict:
- minimum new non-Palace 1.0 asset count = **0**;
- required work is presentation mapping/fallback correction.

New branch:
`chat6/global-presentation-mapping-producer-v23`

Base:
`f81788f046eafdafc8f9fbdc542793becfc6794c`

Implement only the P1/P2-safe mapping corrections identified by v22:
1. Assassin event family -> existing Assassin result master;
2. Assassin infiltration routes/returns -> existing Assassin result master;
3. Secret Debt repay/rest/rent-room -> approved poverty/town/room assets;
4. authored seasonal career sub-scenes -> matching existing seasonal master;
5. Forest hunter-trail -> approved existing Forest route master.

Rules:
- no new art;
- no engine/schema changes;
- no gameplay mechanics;
- no lore strengthening;
- preserve existing alt/altKey RU/EN accessibility;
- do not touch Palace D48 assets;
- do not invent character appearance canon.

Add focused static/presentation tests.
No full CI.

Deliver:
`mindy-successor/docs/tasks/CHAT6_GLOBAL_PRESENTATION_MAPPING_PRODUCER_v23.md`

Freeze exact SHA and report:
`READY_FOR_CHAT2_CONTENT_ASSEMBLY`.
