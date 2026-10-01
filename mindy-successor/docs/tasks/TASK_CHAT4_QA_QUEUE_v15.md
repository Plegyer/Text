# Chat 4 QA Queue v15 — Current-Main Closeout + Hunter Frozen Gates

Status: **ACTIVE**
Owner: Chat 4 / QA + Product Acceptance Gate
Queue: C4-149..155

Ordering rule:
- Tavern remains ahead of Hunter for Lead integration.
- QA may gate independent frozen Hunter candidates now; a waiting Chat 2/3 sibling must not block an eligible frozen sibling.
- QA never implements producer fixes and never mutates producer/frozen candidate branches.

Current main:
- `2d16029a6a17e90b7b9b7faacc93ca8a1a4a08a0`
- exact push CI #756 / id `36849681771`: SUCCESS
- changes after accepted Undead main `d97a970...` are coordination/docs only; no production/test paths changed.

Accepted Tavern sibling set already complete:
- runtime #187 — PASS-WITH-NOTES;
- authored #185 — PASS-WITH-NOTES;
- School #191 — PASS-WITH-NOTES;
- presentation #200 — PASS-WITH-NOTES.
Lead still owns collision-safe Tavern integration before Hunter integration.

Frozen Hunter candidates already eligible:
- runtime PR #201 @ `8af661de2ce6d73e4db0f61fe4206d3334822998`
  - CI #734 / id `36844983432`: SUCCESS;
- School PR #199 @ `f04c93db866b1d2603f6917b41297670f86b0bef`
  - base frozen Hunter runtime `8af661de...`;
  - CI #745 / id `36846888973`: SUCCESS.

Active Hunter producer work still pending freeze:
- Chat 2 Hunter presentation v15 — C2-157..168;
- Chat 3 Hunter authored content v16 — C3-169..180.

### C4-149 — durable current-main closeout
Run the carried v14 durable closeout now on exact current main.

Record:
- exact main SHA + exact CI;
- shipped product truth remains unchanged from accepted Undead combined main because the descendant delta is docs-only;
- Tavern sibling QA is complete but Tavern is not yet integrated;
- Hunter runtime/School are frozen but Hunter must not bypass Tavern integration.

Identify the next incomplete ordinary career from shipped product truth without treating frozen-but-unintegrated work as shipped.

### C4-150 — gate frozen Hunter runtime #201
Gate exact PR #201 head `8af661de2ce6d73e4db0f61fe4206d3334822998`.

Verify:
- ordinary `hunter.shift` remains 1 Energy and natural Year-2/stat unlock is preserved;
- separate `hunter.expedition` remains a 2-Energy Activity, not every shift;
- exact items/capabilities and clue inputs remain typed and narrow;
- senior-guide relationship refusal preserves ordinary Hunter progression;
- save/reload during Activity and pending scenes is deterministic;
- natural clean run reaches late route readiness and 50-shift `ending.hunter.hard-work`;
- no public Master/Warden/Legend ending or Meta reward is invented;
- School thresholds in the Hunter contract remain `null`;
- no Secret Debt bypass, generic weapon/combat system, or shared runtime rewrite.

Record exact-head CI evidence and PASS / PASS-WITH-NOTES / BLOCKED.

### C4-151 — gate frozen Hunter School #199
Gate exact PR #199 head `f04c93db866b1d2603f6917b41297670f86b0bef`.

Verify:
- focused 15-file School/text delta over exact frozen #201 base;
- only authorized live Hunter School consumer is `hunter.school.field-craft`;
- exact Field Craft condition remains existing world fact `forest.school-field-notes`;
- Arcana/Literacy/Physical remain fact-only and do not invent event IDs;
- every Hunter-local numeric School threshold remains authoritative `null`;
- immediate Resolver uses existing 0-Energy `forest.collect-field-kit` without a dummy Hunter shift or extra reaction Energy;
- real Field Craft Night-study remains useful School progress but does not manufacture enrollment, field notes or a Hunter threshold;
- Rowan Pike continuity, RU/EN, accessibility, journal/ref, save/reload and exactly-once behavior remain green;
- no global School certificate/project rule or new curriculum leaks into runtime.

Record exact-head CI evidence and verdict independently of waiting Chat 2/3 siblings.

### C4-152 — gate Hunter authored content when Chat 3 freezes
When Chat 3 C3-180 publishes one frozen exact-head green Hunter authored candidate:
- gate only that focused delta;
- verify live production reachability, seasonal breadth, deterministic RU/EN/reload, clue/item/relationship/late-route authored depth;
- reject fixed unauthorized boss/species/lore, mechanics/economy drift or Secret Debt ownership drift.

Do not wait on Chat 2 presentation if Chat 3 becomes eligible first.

### C4-153 — gate Hunter presentation when Chat 2 freezes
When Chat 2 C2-168 publishes one frozen exact-head green Hunter presentation candidate:
- verify every published presentation override maps to a live frozen Hunter identity;
- ordinary shift vs expedition remains visually and semantically distinct;
- only `hunter.school.field-craft` is a live School presentation consumer;
- RU/EN alt-caption parity, keyboard/focus safety, animation-off and missing-GIF static fallback remain safe;
- no gameplay/save mutation.

Do not wait on Chat 3 authored content if Chat 2 becomes eligible first.

### C4-154 — Hunter integration collision ledger
After all eligible Hunter sibling verdicts are recorded, compare focused accepted deltas against then-current main and each other.

Record:
- exact safe application order;
- shared localization/presentation/content-pack collisions;
- ownership precedence;
- whether Tavern integration changed any Hunter base assumptions.

QA records the ledger only; Lead performs merges.

### C4-155 — post-Hunter current-main gate
Only after Lead has integrated Tavern in accepted order and then the QA-accepted Hunter wave:
- verify exact current main + exact CI;
- run natural Hunter product acceptance across runtime + authored + School + presentation;
- verify save/reload, NightFlow/Activity separation, 50-shift Hard Work, locale/media invariance and no Meta drift;
- record next incomplete ordinary career.

Do not mark Hunter shipped before this exact-current-main gate.
