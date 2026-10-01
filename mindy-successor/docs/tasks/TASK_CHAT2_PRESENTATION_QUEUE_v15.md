# Chat 2 Presentation Queue v15 — Hunter Complete Career Presentation

Status: **ACTIVE AFTER TAVERN v14 FREEZE**
Owner: Chat 2 / Presentation & Media Worker
Queue: C2-157..168
Target: **Hunter Complete Career Presentation**

Frozen predecessor:
- Tavern presentation PR #200
- exact head `4cf8aab9637e6393237d174e6d007dd0f3dcd24a`
- CI #721 / id `36843623336`: SUCCESS
- do not move it.

Frozen runtime dependency:
- Hunter runtime PR #201
- exact head `8af661de2ce6d73e4db0f61fe4206d3334822998`
- CI #734 / id `36844983432`: SUCCESS

Working branch:
- `chat2/hunter-presentation-v15`
- created directly from frozen Hunter runtime head `8af661de2ce6d73e4db0f61fe4206d3334822998`

Related frozen School candidate:
- Chat 5 Hunter School PR #199
- exact head `f04c93db866b1d2603f6917b41297670f86b0bef`
- CI #745 SUCCESS
- consume its exact School authority when relevant, but do not overwrite School-owned gameplay/localization.

Presentation/media/accessibility only.
Do not change conditions/effects/rewards, Save/RNG, career state, Activity mechanics, School mechanics, NightFlow, economy, ending eligibility or Meta.

### C2-157 — frozen Hunter identity inventory
Map every frozen Hunter runtime identity to presentation needs:
- `hunter.shift`;
- career stages and progression events;
- senior-guide relationship events;
- clue events;
- items/capabilities;
- `hunter.expedition` routes/results/return;
- School event `hunter.school.field-craft`;
- Master/Warden/Legend route events;
- `ending.hunter.hard-work`.

Use exact IDs from #201. No presentation-only fake gameplay identity.

### C2-158 — ordinary seasonal work surfaces
Cover Spring/Summer/Autumn/Winter Hunter ordinary shifts.

Use project-owned media only.
Prefer existing static Hunter surfaces where available.
Do not fabricate GIF assets or imply that every shift enters an expedition.

### C2-159 — career-stage surfaces
Cover the frozen stages:
- novice;
- tracker;
- recognized-hunter;
- veteran;
- master-hunter;
- warden;
- legend;
- outcome-ready.

Presentation must distinguish route meaning without adding gameplay state.

### C2-160 — senior-guide relationship
Cover:
- intro/work contact;
- professional trust;
- conflict;
- refusal/cooperation;
- companion decision;
- route-resolved state.

Refusal presentation must not imply career loss.

### C2-161 — clue/cross-system surfaces
Cover exact live Hunter clue inputs and recorded clue results from frozen #201:
- Forest;
- Tavern;
- Farm;
- Lumber.

Do not invent Merchant/Guard future hooks or fixed creature lore.

### C2-162 — items and expedition
Cover:
- `rope_kit` / rough-route capability;
- `field_preservation_kit` / specimen preservation;
- `hunter.expedition` entry;
- local/rough/rare routes;
- success/escape/failure;
- expedition return.

Keep ordinary 1-Energy shift visually distinct from 2-Energy expedition entry.

### C2-163 — Hunter School presentation
Cover only the authorized live Hunter School consumer:
- `hunter.school.field-craft`.

Respect #199:
- Rowan Pike continuity;
- existing Field Craft classroom media/localization ownership;
- no invented Arcana/Literacy/Physical consumer event IDs;
- no numeric Hunter School threshold.

### C2-164 — late-route presentation
Cover exact frozen readiness/events for:
- Master Hunter;
- Warden;
- Legend / rare-contract route.

Do not turn route readiness into an ending card if no public ending ID exists.
No fixed boss/creature depiction.

### C2-165 — ending presentation
Preserve and complete:
- `ending.hunter.hard-work`.

Do not invent public Master/Warden/Legend ending IDs or Meta rewards.

### C2-166 — RU/EN + accessibility + fallback
All new Hunter surfaces require:
- RU/EN alt/caption parity;
- keyboard/focus-safe presentation;
- project-owned static fallback;
- animation-off safety;
- no gameplay/save mutation from locale/media selection.

### C2-167 — production reachability
Prove every published Hunter presentation override maps to a real frozen production identity.

Required checks:
- real `hunter.shift` reaches ordinary Hunter presentation;
- real expedition reaches route/result/return presentation;
- relationship and route events resolve through live event presentation IDs;
- `hunter.school.field-craft` is the only live School presentation consumer;
- animation-off and missing-GIF fallback remain safe;
- no reservation/prep-only identity is published as live.

### C2-168 — candidate freeze
Run full exact-head repository CI.
Freeze one focused Hunter presentation PR for Chat 4 QA.

Record exact head/run and the exact frozen Hunter runtime base.
Do not move after freeze except for a concrete QA/required-CI blocker or explicit Lead request.
