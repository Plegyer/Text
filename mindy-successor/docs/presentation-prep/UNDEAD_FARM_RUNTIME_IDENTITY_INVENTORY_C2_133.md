# C2-133 — Undead Farm runtime identity inventory

Status: COMPLETE
Owner: Chat 2 / Presentation & Media
Authoritative source: `chat1/undead-farm-complete-v11:mindy-successor/docs/tasks/UNDEAD_FARM_RUNTIME_CONTRACT_v1.json`

## Career stages
- `new-hand`
- `reliable-helper`
- `keeper-of-process`
- `veteran`
- `research`
- `successor`
- `external-anomaly`
- `outcome-ready`

## Career milestone events
- `undead-farm.career.first-shift`
- `undead-farm.career.keeper-of-process`
- `undead-farm.career.veteran`
- `undead-farm.career.research`
- `undead-farm.career.successor`
- `undead-farm.career.external-anomaly`
- `undead-farm.career.outcome-ready`

## Production / specimen events and item identities
Events:
- `undead-farm.production.first-output`
- `undead-farm.production.prepare-delivery`
- `undead-farm.production.preserve-sample`
- `undead-farm.sample.kit-issued`

Items/capability identities:
- `farm_produce`
- `farm_unstable_specimen`
- `farm_preserved_specimen`
- `farm_delivery_input`
- `field_preservation_kit` with capability `preserve_specimen`

## Farm Keeper relationship and Night
Relationship: `undead-farm.keeper` (role label only: Farm Keeper; no proper NPC name).

Relationship events:
- `undead-farm.keeper.intro`
- `undead-farm.keeper.trust`
- `undead-farm.keeper.request`
- `undead-farm.keeper.successor-reaction`

Night choices/events:
- `undead-farm.night.keeper-request`
- `undead-farm.night.process-notes`

Required refusal-safe presentation states include explicit decline paths on `undead-farm.keeper.trust` and `undead-farm.keeper.request`.

## School hooks
- `undead-farm.school.arcana-research`
- `undead-farm.school.management-records`

## Activity return
- existing Activity/result seam: `lumber.forest` / `lumber.forest.success`
- Farm consumer event: `undead-farm.activity.forest-return`
- compatibility fact remains gameplay-owned: `activity-source-returned`

## Crisis
- `undead-farm.crisis.supply-labor-containment`
- resolution families: `stabilize-production`, `contain-and-study`, `trust-network`
- `defer` remains a runtime choice but is not presented as a successful resolution family.

## Endings
- `ending.undead-farm.hard-work`
- `ending.undead-farm.research-farmer`
- `ending.undead-farm.successor`

This inventory is identity-only. It does not define thresholds, effects, relationship/career transitions, NightFlow, School mechanics, Activity mechanics, item consumption, ending eligibility, or rewards.
