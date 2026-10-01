# C2-157 — Hunter frozen runtime identity inventory

Status: COMPLETE
Owner: Chat 2 / Presentation & Media
Frozen runtime: PR #201 exact head `8af661de2ce6d73e4db0f61fe4206d3334822998`
Authoritative contract: `mindy-successor/docs/tasks/HUNTER_RUNTIME_CONTRACT_v1.json`

## Ordinary work

Action:
- `hunter.shift`

Seasonal ordinary-work presentation:
- `job/hunter/shift/spring/default`
- `job/hunter/shift/summer/default`
- `job/hunter/shift/autumn/default`
- `job/hunter/shift/winter/default`
- result: `job/hunter/result/default`

Ordinary shift remains the runtime-owned 1-Energy action and is presentation-distinct from expedition entry.

## Career stages

Career ID: `hunter`.

Stages:
- `novice`
- `tracker`
- `recognized-hunter`
- `veteran`
- `master-hunter`
- `warden`
- `legend`
- `outcome-ready`

Career event IDs:
- `hunter.career.first-shift`
- `hunter.career.recognized-hunter`
- `hunter.career.expedition-qualified`
- `hunter.career.veteran-ready`
- `hunter.career.veteran`
- `hunter.career.master-hunter`
- `hunter.career.warden`
- `hunter.career.legend`
- `hunter.career.outcome-ready`

Master Hunter / Warden / Legend are career routes only. No public ending identity exists for them.

## Senior guide relationship

Relationship ID: `hunter.senior-guide`.
Role only: Senior Hunter / Guide. Presentation introduces no proper name and no romance requirement.

Stages:
- `introduced`
- `professional-trust`
- `conflict-open`
- `companion-ready`
- `route-resolved`

Live relationship events:
- `hunter.relationship.intro`
- `hunter.relationship.trust`
- `hunter.relationship.conflict-open`
- `hunter.relationship.conflict-resolve`
- `hunter.relationship.companion`

Choice/fact presentation must preserve:
- cooperation;
- professional rivalry;
- refusal;
- optional companion acceptance/refusal;
- `refusal-respected`;
- `companion-ready`.

Refusal cannot be presented as loss of ordinary Hunter work.

## Cross-system clue events

Exact live Hunter consumers:
- Forest: `hunter.clues.forest-trail`
- Lumber: `hunter.clues.lumber-truth`
- Tavern: `hunter.clues.tavern-rumour`
- Farm: `hunter.clues.farm-sample`

Recorded Hunter-local facts:
- `forest-clue-known`
- `lumber-clue-known`
- `tavern-clue-known`
- `farm-clue-known`

No Merchant/Guard future hook and no fixed creature identity is added by Presentation.

## Items / capabilities

- `rope_kit` -> capability `cross_rough_route`
- `field_preservation_kit` -> capability `preserve_specimen`

Live item-result events:
- `hunter.items.preserve-return`
- `hunter.items.rough-route-return`

Presentation treats these as route/extraction tools only and does not create combat/weapon semantics.

## Hunter expedition

Activity:
- `hunter.expedition`
- runtime entry Energy: 2

Route option IDs:
- `hunter.expedition.local-route` -> route `local-route`
- `hunter.expedition.rough-route` -> route `rough-route`
- `hunter.expedition.rare-route` -> route `rare-route`

Result IDs / outcomes:
- `hunter.expedition.success` -> `success`
- `hunter.expedition.escape` -> `escape`
- `hunter.expedition.failure` -> `failure`

Return event:
- `hunter.activity.expedition-return`

## School

Only authorized live Hunter School consumer:
- `hunter.school.field-craft`

Authority remains with the frozen runtime and Hunter School PR #199. Presentation does not invent Arcana/Literacy/Physical consumer event IDs and does not expose or create a numeric Hunter School threshold.

## Late routes

Live readiness/route events:
- `hunter.routes.master-ready`
- `hunter.routes.warden-ready`
- `hunter.routes.legend-contract`
- `hunter.routes.legend-return`

Presentation-safe readiness facts:
- `master-route-ready`
- `warden-route-ready`
- `legend-route-ready`
- `rare-contract-active`

No fixed boss/creature depiction is authorized.

## Ending

Only public Hunter ending:
- `ending.hunter.hard-work`

Existing Meta reward authority remains `hardWork:hunter`; Presentation creates no Master/Warden/Legend ending or reward.

This inventory is identity-only. It does not modify gameplay conditions/effects/rewards, Save/RNG, career/relationship state, School/NightFlow, Activity mechanics, economy, ending eligibility, or Meta.
