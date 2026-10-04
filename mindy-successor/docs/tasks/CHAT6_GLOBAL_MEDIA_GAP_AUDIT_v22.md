# Chat 6 — Global 1.0 Media Gap Audit v22

Status: **READY_FOR_PRODUCT_LOCK**  
Owner: Chat 6  
Branch: `chat6/global-media-gap-audit-v22`

Accepted lore authority:
`chat6/macro-mystery-lore-authority-v21@d4313ea670340a3539b89e4c9ba34261aff1deb7`

Palace dedicated art remains governed separately by D48 and is excluded from the minimum count below.

Scope: research/planning only.

No art generated.  
No runtime changes.  
No mechanics changes.  
No presentation-engine changes.  
No full CI.

---

## 1. Product recommendation

### Minimum NEW non-Palace asset count for 1.0: **0**

The current project-owned inventory is sufficient to ship the non-Palace 1.0 media layer without creating any additional image/GIF asset, provided the remaining **mapping/fallback corrections** are applied.

There are real low-fidelity surfaces, but none of them is blocked by the absence of a canon-safe existing asset.

The highest-priority work is therefore:

1. remap incorrect/misleading fallback families to existing assets;
2. reuse existing seasonal career masters for authored sub-scenes;
3. keep generic career-result art where it is semantically safe;
4. treat new unique art as P2/P3 polish, not a 1.0 blocker.

### Optional polish recommendation

If Product has art bandwidth beyond the minimum, the first **5** new non-Palace assets should be:

1. one Assassin infiltration master;
2. Satyr Maid — House Power ending;
3. Satyr Maid — Boundary Mastery ending;
4. Undead Farm — Research Farmer ending;
5. Undead Farm — Successor ending.

These improve the most visible generic reuse without changing any mechanics.

---

## 2. Current project-owned media inventory

Audit source:

- v22 seed branch;
- current `main`.

The media inventory and `content/presentation.json` are identical between those two refs at audit time.

### Asset counts

`assets/` root files:

- **13 SVG**

`assets/presentation/`:

- **103 files**
- **97 SVG**
- **6 GIF**

`assets/presentation-frames/`:

- **36 SVG**

Total inspected project-owned media files:

**152**

### Presentation coverage

`content/presentation.json` currently contains:

**376 explicit slot overrides**

Resolved presentation candidates in those overrides:

**436**

Accessibility audit over those 436 candidates:

- missing fallback `alt`: **0**
- missing `altKey`: **0**

Unique localized alt keys referenced:

**343**

RU/EN localization audit:

- missing RU: **0**
- missing EN: **0**

The global media layer therefore has a strong accessibility baseline already.

---

## 3. Core visual convention

The game stage is:

**16:9**

Current runtime uses:

`object-fit: contain`

Existing core scene SVGs commonly use:

`viewBox="0 0 1200 675"`

Any new optional v22-follow-up asset should therefore use:

- SVG for static art;
- 1200 × 675 viewBox;
- 16:9;
- no remote dependencies;
- no essential baked text;
- central safe composition for title/UI overlays.

No alternate crop export is required for 1.0.

---

# 4. Ten ordinary careers

The ten ordinary career visual identities are already substantially covered.

Every ordinary career has:

- one dedicated result SVG;
- four dedicated seasonal shift SVGs.

That is:

**10 result masters + 40 seasonal masters = 50 dedicated career SVGs**

Additional motion:

- Satyr Maid: 3 service GIFs;
- Undead Farm: 3 field GIFs.

Total career motion pool:

**6 GIFs**

## 4.1 Current explicit presentation override distribution

| Career | Explicit job-slot overrides | Slots reusing career result | Seasonal dedicated slots |
|---|---:|---:|---:|
| Lumber | 11 | 2 | 4 |
| Satyr Maid | 27 | 23 | 4 |
| Undead Farm | 33 | 29 | 4 |
| Tavern | 40 | 36 | 4 |
| Hunter | 51 | 47 | 4 |
| Guard | 59 | 55 | 4 |
| Merchant | 5 | 1 | 4 |
| Artist/Geisha | 5 | 1 | 4 |
| Assassin | 5 | 1 | 4 |
| Prostitute | 39 | 35 | 4 |

This does **not** mean Merchant/Artist/Assassin have only five live visual surfaces. Their later semantic/event slots often resolve through generated fallback rules rather than explicit overrides.

---

## 4.2 Authored shift variants without explicit override

There are **43** authored ordinary-career shift scene IDs that do not yet have a dedicated explicit `presentation.json` override.

Counts:

- Tavern: 9
- Lumber: 1
- Guard: 9
- Satyr Maid: 8
- Undead Farm: 8
- Hunter: 8
- Merchant: 0
- Artist/Geisha: 0
- Assassin: 0
- Prostitute: 0

These are **mapping gaps, not art gaps**.

The game already has the corresponding seasonal career masters.

### P1/P2 disposition

**P2 mapping cleanup; 0 new assets.**

Recommended rule:

- any `spring/*` sub-scene → existing spring career master;
- any `summer/*` sub-scene → existing summer career master;
- any `autumn/*` sub-scene → existing autumn career master;
- any `winter/*` sub-scene → existing winter career master;
- non-seasonal `default` → existing career result master.

This converts 43 low-fidelity fallback routes into intentional reuse without producing art.

---

# 5. Assassin career — largest uncovered event family

The Assassin career is the strongest current non-Palace presentation gap.

Audit of current Assassin packs found:

- career events: 8
- contract events: 7
- cross-system events: 3
- item events: 4
- relationship events: 5
- route events: 8
- school echoes: 5
- activity-return event: 1

Total:

**41 Assassin-authored event slots**

All audited Assassin event variants currently contain:

`media: []`

Because Assassin is not included in the current special event-fallback branch that redirects Merchant/Artist/Guard/Tavern to career result art, these event slots can fall through to the generic town presentation fallback.

That is low fidelity: an Assassin contract, handler conflict, infiltration result, or route decision should not visually read as the generic town scene.

## P1 fix — no new art

Map all:

`job/assassin/event/*/default`

to existing:

`assets/presentation/career-assassin-result.svg`

This is the safest 1.0 solution.

It is career-specific, project-owned, and already localized/accessibility-backed.

## P2 optional new asset

If one new Assassin asset is approved:

`assets/presentation/assassin-operations.svg`

Use it as a reusable authored-event master for:

- contracts;
- handler meetings;
- route decisions;
- evidence/preparation;
- advanced Assassin event surfaces.

Do not require more than one master for 1.0.

---

# 6. School

## 6.1 Modern course coverage

The eight current School tracks each have a dedicated course SVG:

- literacy-and-numbers
- arcana
- rhetoric-and-social
- etiquette-and-presentation
- field-craft
- physical-training
- arts-and-performance
- body-confidence

Explicit course slots:

**8 / 8 covered**

Additional project-owned School media includes:

- `school-day-study.svg`
- `school-night-study-generic-v2.svg`
- legacy `school-night-study.svg`

After-school and Night Study presentation surfaces already use dedicated School assets.

## 6.2 Legacy School actions

The following legacy action slots do not have explicit overrides:

- `school/general/lesson/default`
- `school/combat/lesson/default`
- `school/etiquette/lesson/default`
- `school/magic/lesson/default`

They resolve through `stage.school`.

This is semantically safe.

### Disposition

**No new asset required.**

P3 mapping polish may point these legacy surfaces to the closest existing dedicated modern course SVG, but that is not a release requirement.

---

# 7. Night and relationships

Night/relationship content is visually functional but often intentionally generic.

## 7.1 Explicit relationship overrides

Current explicit relationship override families:

- Lumber foreman: 2
- Undead Farm keeper: 5
- Satyr Maid recurring guest: 5
- Tavern recurring traveler: 11
- Hunter senior guide: 5
- Guard partner: 5

Total explicit relationship overrides:

**33**

Lumber foreman has the strongest dedicated relationship art.

Most other families reuse their career result image.

This is low-fidelity but safe: the visual preserves the correct career/social context and does not invent character appearance canon.

## 7.2 Other relationship families

Merchant supplier and Artist mentor semantic relationship stages are generated with safe fallback to their respective career result masters.

Prostitute recurring-client scenes are already covered through career-specific presentation reuse.

Assassin handler scenes are part of the 41-slot Assassin gap described above and should receive the same P1 career-result mapping.

## 7.3 Night choices

Current explicit dedicated Night family overrides are sparse.

Tavern Night currently has 2 explicit slots and uses Tavern result art.

Artist/Geisha Night semantic slots resolve safely through Artist House career-result fallback.

Satyr Maid / Undead Farm Night story events also remain career-contextual.

### Disposition

**No new Night/relationship asset is required for 1.0.**

P3 optional art can add character/conversation masters later, but 1.0 should prefer a neutral career-context image over prematurely locking NPC appearance.

---

# 8. Large Activity / Activity outcomes

There are currently three Activity definitions:

- `lumber.forest`
- `hunter.expedition`
- `assassin.infiltration`

Each has success / escape / failure result semantics.

---

## 8.1 Lumber Forest Activity

Generated route/outcome slots:

**7**

Explicit overrides:

**6**

Covered:

- route default
- logging-road
- old-boundary
- success return
- escape return
- failure return

Only missing route override:

`activity/forest/route/hunter-trail`

The missing route already falls back to the dedicated forest route master.

The three return outcomes each have dedicated art:

- `forest-return-success-v2.svg`
- `forest-return-escape-v2.svg`
- `forest-return-failure-v2.svg`

There are also dedicated forest reaction assets for:

- success
- escape
- failure

### Disposition

**Large Forest Activity and its three outcomes require 0 new assets.**

P3 mapping polish:

`activity/forest/route/hunter-trail`

→ existing `forest-route-default-v1.svg` or another approved existing Forest/Hunter route asset.

---

## 8.2 Hunter Expedition

Generated Activity slots:

**7 / 7 explicitly covered**

- route default
- local-route
- rough-route
- rare-route
- success
- escape
- failure

Current art:

`career-hunter-result.svg`

for all seven.

This is generic but on-theme.

### Disposition

**P3 fidelity gap. No new asset required.**

Optional later art could distinguish route from return outcomes, but not for minimum 1.0.

---

## 8.3 Assassin Infiltration

Generated Activity slots:

**8**

Explicit overrides:

**0**

Missing explicit slots:

- `activity/infiltration/route/default`
- `activity/infiltration/route/local-route`
- `activity/infiltration/route/concealed-route`
- `activity/infiltration/route/sealed-route`
- `activity/infiltration/route/disguise-route`
- `activity/infiltration/return/success`
- `activity/infiltration/return/escape`
- `activity/infiltration/return/failure`

The generic Activity base fallback is hunting/forest media, which is not a good semantic fit for infiltration.

### P1 fix — no new art

Map all eight to existing:

`assets/presentation/career-assassin-result.svg`

This is preferable to forest imagery.

### P2 optional new art

Recommended one-master solution:

`assets/presentation/activity-assassin-infiltration.svg`

Reuse for all eight slots.

If Product later wants outcome differentiation, add:

- `activity-assassin-infiltration-success.svg`
- `activity-assassin-infiltration-escape.svg`
- `activity-assassin-infiltration-failure.svg`

Those three are **post-minimum polish**, not 1.0 requirements.

---

# 9. Secret Debt / poverty pressure

The existing poverty visual library is already substantial.

Current poverty-related presentation assets:

**14 files**

They cover:

- street conditions;
- cheap lodging;
- seasonal pressure;
- recovery/help;
- rain/loading/mud pressure;
- shared lodging.

Therefore Secret Debt does not require a new asset family to be understandable.

## 9.1 Debt-specific action mismatch

Three current action slots have no explicit presentation override:

- `location/town/repay/default`
- `night/rent-room/default`
- `night/rest/default`

All three currently inherit legacy action media based on:

`stage.school`

This is semantically wrong for debt/lodging.

### P1 fix — 0 new assets

Recommended existing-project mappings:

#### Repay

`location/town/repay/default`

→ `assets/presentation/poverty-pressure.svg`

Safe because it represents economic pressure without asserting a specific dwelling.

#### Rent room

`night/rent-room/default`

→ `assets/stage-room.svg`

Safe generic interior.

#### Begin rest / choose lodging

`night/rest/default`

→ `assets/stage-town.svg`

Safe neutral transition that does not pre-select room/hostel/shelter before the player's Night choice.

### Forced Secret Debt Night

Do not create a supernatural or special “debt night” visual identity.

Secret Debt is economic/institutional pressure, not macro-lore.

Existing poverty/town/room media are sufficient.

---

# 10. Strong Meta / New Start+

The Strong Meta / Hard Work New Start+ surface is primarily a UI/card presentation, not a narrative stage.

Current creation screen art:

`location/town/default`

New Start+ then presents:

- earned package cards;
- active/inactive state;
- package effects;
- Palace qualification progress;
- stat-cap text;
- ARIA labels.

This surface is already understandable without additional media.

### Disposition

**No new asset required for 1.0.**

Do not create ten mandatory package illustrations.

If Product wants post-1.0 iconography, it may commission a consistent 10-icon career set, but that is purely decorative and must not become the only way to distinguish packages.

Priority:

**P3 only**

---

# 11. Global endings and result surfaces

Current ending presentation overrides:

**22 / 22**

No current ending is forced to text-only presentation.

## 11.1 Dedicated ending art

Current endings with dedicated/non-result ending art:

**8**

- Lumber Forewoman
- Lumber Forest
- Guild Life
- Scholar Life
- Tavern Stay
- Tavern Guild
- Tavern Court
- Lumber Stay

## 11.2 Generic career-result ending reuse

Current endings using career result/pool art:

**14**

Ten are Hard Work endings:

- Lumber
- Satyr Maid
- Undead Farm
- Tavern
- Hunter
- Guard
- Merchant
- Artist/Geisha
- Assassin
- Prostitute

This reuse is acceptable for 1.0.

A Hard Work ending represents completion of the career itself; reusing the career result master is coherent.

The remaining four are complex ending routes:

- `ending/undead-farm/research-farmer`
- `ending/undead-farm/successor`
- `ending/satyr-maid/house-power`
- `ending/satyr-maid/boundary-mastery`

These are the strongest ending-art fidelity gap.

### P2 optional four-asset set

Recommended filenames:

- `assets/presentation/ending-undead-farm-research-farmer.svg`
- `assets/presentation/ending-undead-farm-successor.svg`
- `assets/presentation/ending-satyr-maid-house-power.svg`
- `assets/presentation/ending-satyr-maid-boundary-mastery.svg`

These are recommended polish, not minimum 1.0 blockers.

### Safe fallback if not produced

Keep current career result/pool art.

---

# 12. Results

Every ordinary career already has a dedicated result master:

- `career-lumber-result.svg`
- `career-satyr-maid-result.svg`
- `career-undead-farm-result.svg`
- `career-tavern-result.svg`
- `career-hunter-result.svg`
- `career-guard-result.svg`
- `career-merchant-result.svg`
- `career-artist-geisha-result.svg`
- `career-assassin-result.svg`
- `career-prostitute-result.svg`

### Disposition

**No new career-result asset required.**

These result masters should be the preferred safe fallback for career-owned events whenever no more specific asset exists.

---

# 13. Exact priority list

## P1 — must fix for 1.0, but needs **0 new assets**

### P1-A Assassin event family

**41 authored Assassin event slots**

Current problem:

generic town fallback.

Fix:

map to existing `career-assassin-result.svg`.

### P1-B Assassin Infiltration

**8 Activity slots**

Current problem:

generic Activity hunting/forest fallback.

Fix:

map to existing `career-assassin-result.svg`.

### P1-C Secret Debt basic action family

**3 slots**

Current problem:

legacy School media.

Fix using existing:

- repay → poverty-pressure;
- rent-room → room;
- rest → town.

Total P1 new asset requirement:

**0**

---

## P2 — recommended fidelity improvements

### P2-A Complex endings

4 optional unique ending assets:

- Satyr Maid House Power
- Satyr Maid Boundary Mastery
- Undead Farm Research Farmer
- Undead Farm Successor

### P2-B Assassin Infiltration master

1 optional reusable asset:

`activity-assassin-infiltration.svg`

### P2-C Seasonal authored sub-scene mapping

43 career shift scene IDs should reuse existing matching seasonal masters.

New assets:

**0**

P2 optional new-asset total if all recommended art is commissioned:

**5**

---

## P3 — polish only

- relationship-specific masters;
- hunter expedition route/outcome variations;
- Forest hunter-trail unique route art;
- legacy School action remaps;
- career stage/status-specific art;
- Strong Meta package iconography;
- additional Night-specific illustrations;
- unique Hard Work ending art.

None of these should block 1.0.

---

# 14. Safe existing fallback table

| Family | Preferred existing fallback |
|---|---|
| Ordinary career authored event | matching `career-<career>-result.svg` |
| Career seasonal sub-scene | matching `career-<career>-shift-<season>.svg` |
| Merchant supplier | `career-merchant-result.svg` |
| Artist mentor | `career-artist-geisha-result.svg` |
| Assassin handler/contracts | `career-assassin-result.svg` |
| Prostitute relationship | `career-prostitute-result.svg` |
| Hunter expedition | `career-hunter-result.svg` |
| Assassin infiltration | `career-assassin-result.svg` |
| Forest hunter-trail | `forest-route-default-v1.svg` |
| Secret Debt repay | `poverty-pressure.svg` |
| Night rent-room | `stage-room.svg` |
| Night rest selection | `stage-town.svg` |
| Legacy School lesson | `stage-school.svg` |
| New Start+ | `location/town/default` / existing town art |
| Hard Work ending | career result master |
| Satyr/Undead complex ending | current career result/pool until unique ending art exists |

Do not substitute unrelated flirt, goblin, combat, School, or Forest imagery merely to avoid reuse.

Correct generic reuse is better than incorrect specificity.

---

# 15. Accessibility requirements

The current presentation system is already strong:

- 436 current candidates;
- every candidate has fallback alt;
- every candidate has `altKey`;
- all 343 referenced alt keys have RU and EN.

Any future mapping or asset work must preserve that standard.

## Required for every new static/pool candidate

- non-empty fallback `alt`;
- localized `altKey`;
- RU alt;
- EN alt;
- image must not be required to understand mechanics;
- no critical choice/gate communicated only visually.

## Caption

The UI can derive a caption key when `altKey` ends in `.alt`.

Use a localized caption when:

- the image is intentionally generic;
- the art could otherwise imply more canon than intended;
- a fallback should be identified as contextual rather than literal.

Do not add captions merely to repeat narrative prose.

## Character/relationship art

If a future relationship master is added:

- alt describes visible role/action;
- do not assign unapproved ethnicity/species/proper-name canon through alt;
- avoid describing emotional consent or relationship status unless it is visibly and narratively established.

---

# 16. Areas where NO new asset is required

Product should explicitly lock the following as sufficiently covered for 1.0:

### Ten ordinary career core identity

**No new asset.**

50 dedicated static career masters already exist.

### Career results

**No new asset.**

10/10 result masters exist.

### School modern courses

**No new asset.**

8/8 dedicated course assets exist.

### School study

**No new asset.**

Day and Night study art exists.

### Lumber Forest Activity + three outcomes

**No new asset.**

Dedicated route/return/reaction art exists.

### Hunter Expedition

**No new asset required.**

Generic Hunter result art is safe.

### Secret Debt

**No new asset required.**

Existing poverty/town/room media are enough after mapping correction.

### Strong Meta / New Start+

**No new asset required.**

The feature is a text/card UI and already has accessible package state.

### Hard Work endings

**No new asset required.**

Career-result reuse is appropriate.

### Night/relationships as a system

**No new asset required.**

Career-context fallbacks are safe; unique portraits are polish.

---

# 17. Areas that need mapping but not art production

Before declaring global presentation fully release-ready, the integration owner should schedule the following content-only mapping pass:

1. Assassin event family → Assassin result master;
2. Assassin infiltration routes/returns → Assassin result master;
3. Secret Debt repay/rest/rent-room → poverty/town/room assets;
4. 43 authored seasonal career sub-scenes → matching existing seasonal master;
5. Forest hunter-trail → existing Forest route master.

This pass should modify only presentation mapping/localized accessibility entries if needed.

No schema or engine work is justified.

---

# 18. Optional new asset filenames

If Product approves P2/P3 polish, use the following names.

## P2

- `assets/presentation/activity-assassin-infiltration.svg`
- `assets/presentation/ending-undead-farm-research-farmer.svg`
- `assets/presentation/ending-undead-farm-successor.svg`
- `assets/presentation/ending-satyr-maid-house-power.svg`
- `assets/presentation/ending-satyr-maid-boundary-mastery.svg`

## P3 examples

- `assets/presentation/relationship-merchant-supplier.svg`
- `assets/presentation/relationship-artist-geisha-mentor.svg`
- `assets/presentation/relationship-assassin-handler.svg`
- `assets/presentation/relationship-prostitute-recurring-client.svg`
- `assets/presentation/activity-hunter-expedition.svg`
- `assets/presentation/secret-debt-night-pressure.svg`

P3 filenames are planning placeholders, not a production requirement.

---

# 19. Product acceptance checklist

## Inventory

- [ ] acknowledge current 152-file media inventory;
- [ ] acknowledge 376 explicit presentation overrides;
- [ ] preserve current 0-missing-alt baseline.

## P1

- [ ] Assassin 41-event family no longer resolves to generic town art;
- [ ] Assassin 8-slot infiltration family no longer resolves to hunt/forest art;
- [ ] Secret Debt repay no longer displays School art;
- [ ] Night rent-room no longer displays School art;
- [ ] Night rest-selection no longer displays School art.

## Careers

- [ ] all ten career result masters remain available;
- [ ] all 40 seasonal career masters remain available;
- [ ] deep seasonal variants may intentionally reuse the corresponding season master.

## School

- [ ] all 8 modern course assets remain intact;
- [ ] School remains understandable without new imagery.

## Activity

- [ ] Forest success/escape/failure keep dedicated return art;
- [ ] Forest hunter-trail has a safe route fallback;
- [ ] Hunter Expedition retains safe Hunter-context art;
- [ ] Assassin infiltration uses Assassin-context art.

## Endings

- [ ] all 22 current endings retain a valid presentation override;
- [ ] Hard Work career-result reuse is accepted for 1.0;
- [ ] four complex Satyr/Undead endings are classified P2, not blockers.

## Strong Meta / New Start+

- [ ] no package icon art becomes mandatory;
- [ ] package selection remains text/ARIA-complete;
- [ ] town creation art remains an acceptable 1.0 backdrop.

## Accessibility

- [ ] every new/changed candidate has alt + altKey;
- [ ] RU and EN exist for every new altKey;
- [ ] no media is the sole carrier of a gameplay requirement.

---

# 20. Product lock summary

Recommended lock:

### Minimum new non-Palace asset budget

**0**

### Required pre-1.0 work

A **presentation mapping pass**, not an art-production tranche.

### Highest-value optional art tranche

**5 assets**:

- 1 Assassin infiltration master;
- 4 complex Satyr/Undead ending illustrations.

### Palace accounting

The separate D48 Palace minimum remains outside this v22 count and should not be reopened here.

The global non-Palace 1.0 media problem is therefore primarily a **reuse/mapping fidelity problem**, not a missing-art blocker.

**READY_FOR_PRODUCT_LOCK**
