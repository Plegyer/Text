# Chat 6 — Global Presentation Mapping Producer v23

Status: **READY_FOR_CHAT2_CONTENT_ASSEMBLY**  
Owner: Chat 6  
Branch: `chat6/global-presentation-mapping-producer-v23`

Frozen planning base:

`chat6/global-media-gap-audit-v22@f81788f046eafdafc8f9fbdc542793becfc6794c`

Scope: presentation mapping only.

No new art.  
No engine changes.  
No schema changes.  
No gameplay mechanics.  
No lore strengthening.  
No Palace D48 asset changes.  
No full CI.

---

## 1. Production result

v23 applies the P1/P2-safe non-Palace presentation corrections approved by v22.

Exactly **93 new explicit presentation slot mappings** were added.

Breakdown:

- Assassin authored event family: **41**
- Assassin infiltration routes/returns: **8**
- Secret Debt / lodging actions: **3**
- authored seasonal career sub-scenes: **40**
- Forest hunter-trail route: **1**

Total:

**93**

No pre-existing presentation slot override was modified or removed.

---

## 2. Assassin event family

All current Assassin-authored event variants whose source domain is `assassin` now resolve explicitly to the existing project-owned Assassin result master:

`assets/presentation/career-assassin-result.svg`

Stable accessibility key reused:

`presentation.static.career.assassin.result.alt`

Current count:

**41 event variants**

Covered pack families:

- Assassin Activity return
- career progression
- contracts
- cross-system echoes
- items
- relationship/handler scenes
- route progression
- School echoes

No event text, conditions, effects, quest logic, route logic, or rewards changed.

The purpose of this mapping is only to prevent Assassin-authored scenes from falling through to generic town art.

---

## 3. Assassin infiltration Activity

All eight generated Assassin infiltration presentation slots now use the existing Assassin result master.

Mapped slots:

- `activity/infiltration/route/default`
- `activity/infiltration/route/local-route`
- `activity/infiltration/route/concealed-route`
- `activity/infiltration/route/sealed-route`
- `activity/infiltration/route/disguise-route`
- `activity/infiltration/return/success`
- `activity/infiltration/return/escape`
- `activity/infiltration/return/failure`

Asset:

`assets/presentation/career-assassin-result.svg`

This removes the previous generic hunt/forest visual fallback without creating new art.

No Activity mechanics changed.

---

## 4. Secret Debt / lodging mappings

Three legacy action surfaces no longer inherit School imagery.

### Repay

Presentation ID:

`location/town/repay/default`

Asset:

`assets/presentation/poverty-pressure.svg`

Alt key:

`presentation.static.poverty.pressure.alt`

### Rest / choose lodging

Presentation ID:

`night/rest/default`

Asset:

`assets/stage-town.svg`

Alt key:

`media.base.town.alt`

The neutral town image intentionally does not pre-select a lodging outcome.

### Rent room

Presentation ID:

`night/rent-room/default`

Asset:

`assets/stage-room.svg`

Alt key:

`media.stage.room.alt`

No debt amount, repayment rule, forced Night priority, housing rule, cost, Energy rule, or economy mechanic changed.

---

## 5. Authored seasonal career sub-scenes

The existing seasonal career masters are now explicitly reused by authored seasonal sub-scenes that previously relied on generic/base action media.

Added sub-scene mappings:

- Satyr Maid: **8**
- Undead Farm: **8**
- Tavern: **8**
- Hunter: **8**
- Guard: **8**

Total:

**40**

Each new sub-scene mapping reuses the corresponding existing seasonal static master:

`career-<career>-shift-<season>.svg`

and the same already-localized seasonal `altKey`.

No new seasonal assets were added.

No existing parent seasonal mapping was replaced.

Animated pools on parent seasonal slots were not copied into the new sub-scene mappings; the v23 correction is deliberately static and deterministic.

---

## 6. Forest hunter-trail

Presentation ID:

`activity/forest/route/hunter-trail`

now explicitly reuses:

`assets/presentation/forest-route-default-v1.svg`

Alt key:

`presentation.static.forest.route.default.alt`

This is the approved neutral Forest route master from v22.

No Forest Activity mechanics or route state changed.

---

## 7. Accessibility

v23 introduces no new localization key.

All mappings reuse existing bilingual accessibility keys.

Static audit:

- unique reused `altKey` values across the 93 new slots: **25**
- missing RU values: **0**
- missing EN values: **0**
- missing referenced project-owned assets: **0**

The existing fallback `alt` text is also present on every new static candidate.

No gameplay information is moved into image-only presentation.

---

## 8. Exact presentation diff audit

Compared:

base:

`f81788f046eafdafc8f9fbdc542793becfc6794c`

against v23 production mapping.

Results:

- base explicit slots: **376**
- v23 explicit slots: **469**
- added slots: **93**
- removed slots: **0**
- modified pre-existing slots: **0**
- Palace slots added: **0**
- unexpected family additions: **0**

Added-family audit:

- Assassin events: 41
- Assassin infiltration: 8
- Secret Debt/lodging: 3
- seasonal authored sub-scenes: 40
- Forest hunter-trail: 1
- other: 0

This confirms v23 is additive presentation mapping only.

---

## 9. Asset integrity

All sources used by the 93 new mappings already exist in the project.

Unique sources used:

- `assets/presentation/career-assassin-result.svg`
- `assets/presentation/poverty-pressure.svg`
- `assets/presentation/forest-route-default-v1.svg`
- `assets/stage-room.svg`
- `assets/stage-town.svg`
- existing seasonal masters for Satyr Maid, Undead Farm, Tavern, Hunter, and Guard across spring/summer/autumn/winter

No external URL is introduced.

No new image, GIF, video, or font is added.

---

## 10. Focused test added

Added:

`tests/global-presentation-mapping-producer-v23.test.ts`

The test covers:

1. presentation schema/application validity;
2. all 41 Assassin-authored event variants;
3. all 8 Assassin infiltration route/return slots;
4. exact Secret Debt repay/rest/rent-room media and bilingual alt keys;
5. all 40 authored seasonal career sub-scenes;
6. Forest hunter-trail mapping;
7. project-owned asset existence;
8. RU/EN accessibility parity for reused keys.

The test also calls `applyPresentation(catalog, presentation)`, so unknown or invalid semantic presentation IDs are rejected when run in the normal project checkout.

---

## 11. Files changed by Chat 6 v23

Production:

- `mindy-successor/prior-work/astra/prototype-m3.2/content/presentation.json`

Focused QA:

- `mindy-successor/prior-work/astra/prototype-m3.2/tests/global-presentation-mapping-producer-v23.test.ts`

Handoff:

- `mindy-successor/docs/tasks/CHAT6_GLOBAL_PRESENTATION_MAPPING_PRODUCER_v23.md`

The branch also contains the Leader-authored current Chat 6 pointer update inherited from the task seed.

No `definitions.json` change.  
No `localization.json` change.  
No runtime TypeScript change.  
No engine/schema change.  
No Palace asset/content change.

---

## 12. Chat 2 assembly guidance

This branch is safe to assemble as a content/presentation layer.

Recommended integration:

1. take the v23 `content/presentation.json` slot additions selectively if the integration branch has concurrent presentation work;
2. add the focused v23 test;
3. run the focused presentation test in the runnable integration checkout;
4. run normal presentation/source-integrity checks owned by Chat 2;
5. do not treat v23 as a mechanics branch;
6. do not introduce new art as part of assembling this packet.

Because `presentation.json` is a shared file, prefer merging the **93 added slot entries** rather than replacing a newer integration file wholesale.

---

## 13. QA disposition

Chat 6 performed static Git-backed QA:

- JSON parse: pass;
- exact diff accounting: pass;
- 93/93 expected additions: pass;
- existing-slot mutation check: pass;
- Palace firewall: pass;
- asset-path existence: pass;
- RU/EN reused alt-key parity: pass.

Full CI was not run, per task instruction.

The focused test is prepared for the runnable Chat 2 integration checkout.

**READY_FOR_CHAT2_CONTENT_ASSEMBLY**
