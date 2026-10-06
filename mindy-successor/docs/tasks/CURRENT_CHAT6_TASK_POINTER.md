# CURRENT CHAT6 TASK POINTER

Status: **ACTIVE — GLOBAL CAPTION CLOSURE PRODUCER v29**
Owner: Chat 6

Accepted audit:
`chat6/final-localization-presentation-closure-v28@d57381dc7fa4af028cea3effdb4146a75cc9c60a`

New branch:
`chat6/global-caption-closure-producer-v29`

v28 found exactly two required P1 presentation-caption gaps and no new authoring blocker.

Add bilingual captions only for:

1. `media.stage.room.caption`
   - RU: `Сцена дешёвой общей комнаты для ночлега.`
   - EN: `Cheap shared-room lodging scene.`

2. `media.base.town.caption`
   - RU: `Условная иллюстрация фэнтезийного города.`
   - EN: `A stylized illustration of the fantasy town.`

These must match the already accepted alt semantics.

Do not:
- change runtime;
- change mechanics;
- change presentation routing;
- touch D42 mechanics;
- delete retired Tavern compatibility localization;
- change Palace/Activity/Secret Debt content.

Add focused localization/presentation parity test.
No full CI.

Deliver:
`mindy-successor/docs/tasks/CHAT6_GLOBAL_CAPTION_CLOSURE_PRODUCER_v29.md`

Freeze exact SHA and report:
`READY_FOR_CHAT2_CONTENT_ASSEMBLY`.
