# Chat 5 School Queue v15 — Hunter School Cross-System Slice

Status: **COMPLETED / CANDIDATE FROZEN**
Owner: Chat 5 / School + Text Localization Worker
Queue: C5-157..168

Final candidate:
- PR #199
- exact head `f04c93db866b1d2603f6917b41297670f86b0bef`
- frozen dependency: Chat 1 Hunter runtime PR #201 @ `8af661de2ce6d73e4db0f61fe4206d3334822998`
- exact-head CI #745 / id `36846888973`: **SUCCESS**
- tests: **704/704 pass**.

Frozen predecessor:
- Tavern School PR #191
- exact head `b31c10ac3b2e024018a8499bd1ff7b8f39d8824c`
- CI #692 SUCCESS
- never moved by v15 work.

Authoritative Hunter School result:
- exact Hunter-facing tracks: Field Craft, Arcana, Literacy & Numbers, Physical Training;
- exact existing teachers: Rowan Pike, Ilyra Venn, Mara Fen, Tovan Kest;
- exact published career facts: `school-field-craft-ready`, `school-arcana-ready`, `school-literacy-ready`, `school-physical-ready`;
- all four Hunter-local numeric School thresholds are `null` in frozen authority;
- only live Hunter School event is `hunter.school.field-craft`;
- its condition is existing world fact `forest.school-field-notes`;
- existing 0-Energy `forest.collect-field-kit` produces that fact after normal School enrollment;
- Night-study does not create `school.enrolled` or `forest.school-field-notes`, so v15 correctly does not invent a Night-only Hunter threshold/event;
- the optional practical medicine/craft course was not created because it is absent from current curriculum authority.

Task closure:
- C5-157 inventory — COMPLETE.
- C5-158 Field Craft producer — COMPLETE / LIVE.
- C5-159 Arcana producer — COMPLETE AS AUTHORIZED SOURCE; no unauthorized consumer/lore.
- C5-160 Literacy & Numbers producer — COMPLETE AS AUTHORIZED SOURCE; no information currency/contract economy.
- C5-161 Physical Training producer — COMPLETE AS AUTHORIZED SOURCE; no injury/combat system.
- C5-162 immediate resolver parity — COMPLETE through existing field-kit world-fact producer, no dummy Hunter shift or extra reaction Energy.
- C5-163 Night-study parity — COMPLETE BY AUTHORITY FIREWALL; typed Night-study progress remains useful but cannot manufacture the missing Hunter condition.
- C5-164 teacher continuity — COMPLETE.
- C5-165 RU/EN journal/result/accessibility — COMPLETE.
- C5-166 exactly-once + save/reload — COMPLETE.
- C5-167 threshold/global-policy firewall — COMPLETE.
- C5-168 natural acceptance + exact-head freeze — COMPLETE.

Natural acceptance:
Year-2 Hunter -> real Hunter work -> real paid Field Craft lesson -> existing `forest.collect-field-kit` -> `forest.school-field-notes` -> `hunter.school.field-craft` -> exact Hunter career fact, with pending-scene save/reload and no extra Hunter shift.

Freeze rule:
Do not mutate #199 or predecessor #191 except for a concrete QA/required-CI blocker or explicit Lead/user request. Any head movement invalidates exact-head evidence.
