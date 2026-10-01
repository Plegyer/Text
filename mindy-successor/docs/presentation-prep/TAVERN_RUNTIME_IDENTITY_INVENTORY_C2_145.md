# C2-145 — Tavern runtime identity inventory

Status: COMPLETE
Owner: Chat 2 / Presentation & Media
Authoritative runtime contract: `chat1/tavern-complete-v12:mindy-successor/docs/tasks/TAVERN_RUNTIME_CONTRACT_v1.json`
Contract publication head first read by Chat 2: `7bf2531f208c8b3faf5f83c16064885b6295167b`
Frozen runtime candidate used for final inventory: PR #187 exact head `38c58ccdaa1d357f189cd640053d0b2a8605b9b4`

## Career

Career ID: `tavern`.

Stages:
- `new-hand`
- `trusted-worker`
- `house-node`
- `veteran-service`
- `innkeeper`
- `information-broker`
- `sanctuary`
- `outcome-ready`

Milestone events:
- `tavern.career.first-shift`
- `tavern.career.house-node`
- `tavern.career.veteran-service`
- `tavern.career.innkeeper`
- `tavern.career.information-broker`
- `tavern.career.sanctuary`
- `tavern.career.outcome-ready`

Contract counters relevant to presentation state:
- `traveler_flow`
- `room_pressure`
- `supply_pressure`
- `shelter_pressure`

Contract facts used only as qualitative presentation states:
- `staff-access-issued`
- `guest-ledger-evidence-ready`
- `traveler-rumour-known`
- `rumour-confirmed`
- `confidentiality-resolved`
- `confidentiality-kept`
- `activity-returned`
- `innkeeper-ready`
- `information-broker-ready`
- `sanctuary-ready`
- `outcome-ready`

## Recurring traveler relationship and Night

Relationship ID: `tavern.recurring-traveler`.
Role: recurring traveler only; no proper NPC name is introduced by Presentation.

Stages:
- `introduced`
- `trusted`
- `night-request`
- `request-resolved`
- `confidentiality-resolved`

Contract choice identities:
- `night-response`
- `confidentiality-response`

Presentation-safe relationship facts:
- `introduced-at-work`
- `professional-trust-earned`
- `night-met`
- `traveler-rumour-known`
- `request-resolved`
- `refusal-respected`
- `confidentiality-kept`

Night choice IDs:
- `tavern.night.traveler-request`
- `tavern.night.house-notes`

The initial contract did not publish separate traveler relationship event IDs, so Chat 2 did not invent any during preparation. The frozen runtime now provides these exact live identities and final Presentation binds them only after that publication:
- `tavern.recurring-traveler.intro`
- `tavern.recurring-traveler.trust`
- `tavern.recurring-traveler.request`
- `tavern.recurring-traveler.confidentiality`
- `tavern.recurring-traveler.night`
- `tavern.house-notes.night`

## Rooms / access / housing / information

Access item: `tavern_staff_key`.
Capability: `access_guest_rooms_staff`.

Events:
- `tavern.access.staff-key`
- `tavern.access.guest-ledger`
- `tavern.housing.meal-in-kind`

Information identities:
- produced fact `traveler-rumour-known`
- confirmed fact `rumour-confirmed`
- live route event `tavern.information.rumour-route`
- consumer milestone `tavern.career.information-broker`

Presentation maps room pressure and supply pressure qualitatively and does not expose authored hidden thresholds.

## School hooks

Exact Tavern-local hook events:
- `tavern.school.records`
- `tavern.school.broker`
- `tavern.school.etiquette`
- `tavern.school.arcana`

Their track thresholds remain gameplay-owned and are not copied into player-facing Presentation status.

## Activity return

Existing Activity/result seam:
- activity `lumber.forest`
- result `lumber.forest.success`

Tavern consumer event:
- `tavern.activity.forest-return`

## Crisis

Event:
- `tavern.crisis.occupancy-supply-confidentiality`

Resolution family choice IDs:
- `stabilize-house`
- `manage-information`
- `protect-shelter`

Presentation describes these families without adding success criteria, numeric thresholds, or new effects.

## Endings

Stable gameplay ending IDs:
- `tavern-stay`
- `tavern-guild`
- `tavern-court`
- `ending.tavern.hard-work`

Their existing reward identifiers remain runtime-owned and unchanged.

This inventory is identity-only. It does not author career or relationship transitions, thresholds, effects, rewards, Save/RNG, School rules, Activity rules, NightFlow, housing economy, ending eligibility, or Meta behavior.
