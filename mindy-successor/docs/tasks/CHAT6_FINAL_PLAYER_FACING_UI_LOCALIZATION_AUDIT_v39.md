# Chat 6 — Final Player-Facing UI Localization Audit v39

Status: **AUDIT COMPLETE — 0 P0 / 4 P1 FINDINGS / 2 P2 FINDINGS**  
Owner: Chat 6  
Branch: `chat6/final-player-facing-release-audit-v39`

Scope: final player-facing RU/EN localization/presentation audit beyond ending prose.

This audit is read-only. No runtime, mechanics, routing, reward ownership, or presentation behavior is changed here.

## Frozen sources inspected

Release assembly authority:

- v33 manifest: `CHAT6_FINAL_LOCALIZATION_PRESENTATION_MANIFEST_v33.json`
- v33 manifest blob: `6ba6482acb4024e8eebd1ff81d4d18c944d58ac0`
- v36 final Activity Network localization blob: `d631544c96c724375ac48d3c563dd1c1865bb5b5`

Accepted player-facing/runtime sources:

- D42 localization: `9281d3880d01c54f352effa5e372ad5393cc3eaa`
- D42 presentation: `e800d2b16f2bc868273e39d45718dcd0c7fe74a5`
- accepted Activity v17 UI: `02afa7a9b32720c6e391c0a07974d662e77f8ea0`
- Activity v17 localization: `4449ca46ad6580ca5f36adf140e9e1e14a007b64`
- Secret Debt v27 localization: `80c1bf3e41c31ca57e7837c3b73c0d6f7e8a66ae`
- Palace v19 localization: `64922de3b6aab606f9b2932853e6bbd686766b6a`
- base live definitions on audit seed: `311b2fec271a274e61c34fad9645d5bff13f4993`
- Activity mechanics authority: `chat3/activity-ending-family-producer-v16-r1@3cf69d7cb3df1a58d68908159d0acc14736435c4`
- Secret Debt authority: `chat4/secret-debt-full-route-producer-v12@10a2ecebf02ce64bdaf54d74dbbb66d6bae6e59e`
- Palace prerequisite authority: `chat6/palace-prince-narrative-producer-v18@67f948d185883d8e706dad522e5010bff8e2bd48`

The v39 audit branch seed itself is:

`0f25d5f426bb139b7e10dc322ddadc410ebf2ce1`

The seed is not treated as a whole-file final assembly snapshot. The accepted v33/v36 overlay authorities are used where the seed intentionally predates later producer layers.

## Severity rubric

- **P0** — release-blocking corruption/crash/data loss or a localization fault that prevents a core flow from being completed.
- **P1** — reachable player-facing wrong-language/raw-ID/missing-copy defect, or a major required player-facing UI seam that is absent.
- **P2** — lower-frequency, developer-adjacent, diagnostic, or accessibility polish defect that does not block normal play.

## High-level result

### Existing localization rows

An in-memory v33 + v36 release assembly was constructed from the exact manifest source blobs and deletion fence.

Result:

- final localization entries: **3555**
- existing rows missing RU: **0**
- existing rows missing EN: **0**

So the release issue is not one-sided existing rows. It is **missing consumer keys** and runtime consumers that bypass localization.

### Presentation alt/caption

The assembled presentation registry contains **503** static slots with alt keys.

For all live/non-retired slots, both RU and EN alt/caption rows are present.

Three old Tavern slots remain as dead registry residue:

- `ending/tavern-stay`
- `ending/tavern-guild`
- `ending/tavern-court`

Their six retired presentation-localization rows are intentionally deleted by v31. The corresponding retired ending IDs are absent from the live ending catalog, so these slots are not player-facing and are **not a P1 localization defect**. Manual release smoke must still prove they never render.

## P1-1 — four accepted live literal localization consumers are missing

Classification: **P1 — content-only, v40 fixable**

The accepted Activity v17 UI consumes four literal `tr(...)` keys that are absent from the accepted final localization layers.

### Missing keys

1. `ui.condition.schoolCounter`
   - current RU fallback: `Школа {track}: {counter} {comparison}`
   - required EN: `School {track}: {counter} {comparison}`

2. `ui.activity.fieldTimeLabel`
   - current RU fallback: `Полевое время`
   - required EN: `Field time`

3. `ui.activity.miniGameLabel`
   - current RU fallback: `Мини-игра`
   - required EN: `Mini-game`

4. `ui.activity.suspicionLabel`
   - current RU fallback: `Подозрение`
   - required EN: `Suspicion`

Resolver behavior is:

`entry?.[locale] ?? entry?.ru ?? fallback ?? key`

Therefore an EN player sees the Russian fallback for these consumers.

Reachability is concrete:

- Activity status renders field time;
- active Activity mini-game status renders mini-game + suspicion;
- the accepted Activity definitions contain two live `schoolCounter` conditions in Activity gating.

No runtime change is required. Add exact bilingual localization rows.

## P1-2 — 17 permanent unlock rewards leak raw internal IDs in Legacy UI

Classification: **P1 — content-only, v40 fixable**

The Legacy panel renders permanent unlock ownership as:

`tr(\`unlock.\${k}.label\`, labels[k] ?? k)`

For the 17 IDs below:

- the exact consumer localization key is absent;
- the fallback `labels` map has no entry;
- therefore the visible fallback is the raw internal reward ID.

### D41 automatic knowledge/content

- `satyr-maid.clear-terms`
  - consumer: `unlock.satyr-maid.clear-terms.label`
- `knowledge.undead-farm.anomaly-catalog`
  - consumer: `unlock.knowledge.undead-farm.anomaly-catalog.label`
- `knowledge.tavern.broker-index`
  - consumer: `unlock.knowledge.tavern.broker-index.label`
- `knowledge.hunter.warden-signs`
  - consumer: `unlock.knowledge.hunter.warden-signs.label`
- `knowledge.hunter.legend-contracts`
  - consumer: `unlock.knowledge.hunter.legend-contracts.label`

### D40 automatic knowledge/content

D40 stable reward IDs intentionally begin with `unlock.`. The current generic Legacy consumer prepends `unlock.` again, so the exact content-only compatibility labels required by the live consumer are:

- `unlock.unlock.guard.command-briefing.label`
- `unlock.unlock.guard.reform-practice.label`
- `unlock.unlock.guard.casebook-index.label`
- `unlock.unlock.merchant.house-supplier.label`
- `unlock.unlock.merchant.patron-destinations.label`
- `unlock.unlock.artist.master-repertoire.label`
- `unlock.unlock.artist.court-context.label`
- `unlock.unlock.assassin.refusal-protocol.label`
- `unlock.unlock.prostitute.elite-protocol.label`

Adding these rows is a localization compatibility repair only. It must not rename the stable reward IDs.

### Secret Debt

The accepted Secret Debt definitions currently award these stable IDs through permanent unlock ownership, so the Legacy panel also requires:

- `unlock.secret-debt.paid-freedom.earned-reserve-match.label`
- `unlock.secret-debt.bound-life.work-rhythm.label`
- `unlock.secret-debt.takeover.network-retainer.label`

Locked Product display identities already exist for these rewards:

- Earned Reserve Match
- Work Rhythm
- Network Retainer

### Not a defect: Activity reward labels

The three Activity Specialist ownership labels are already present in the Activity prerequisite/full localization:

- `unlock.specialist.activity.surveyors-atlas.label`
- `unlock.specialist.activity.field-archive.label`
- `unlock.specialist.activity.contact-network.label`

They must be preserved during assembly.

## P1-3 — Strong Meta selection has engine commands but no accepted player-facing selector

Classification: **P1 — runtime/UI integration, NOT v40-fixable**

Locked Product requires pre-run selection of:

- 0..1 Keystone;
- 0..2 Specialists.

The engine exposes:

- `setStrongMetaKeystone`
- `setStrongMetaSpecialist`

and persists `preferredSelection`.

The accepted player-facing `app.ts` has no consumer/control for either command and no Strong Meta selection-card surface. It only exposes ordinary Hard Work package selection plus the Legacy ownership list.

Therefore the final accepted UI currently has no player-facing path to choose owned Strong Meta loadout rewards.

This is not a localization-row defect and Chat 6 must not add runtime/UI logic in v40.

**Leader action required:** route to the runtime/UI assembly lane before release if Strong Meta selection is expected to be playable in this build.

## P1-4 — modal dialog accessibility label exposes raw internal panel IDs

Classification: **P1 — runtime/UI localization seam, NOT v40-fixable**

The accepted UI renders the generic overlay as:

`aria-label="${panel}"`

Reachable values include internal IDs such as:

- `work`
- `school`
- `explore`
- `sleep`
- `stats`
- `journal`
- `bag`
- `legacy`
- `menu`

Visible panel headings are localized, but the dialog accessible name is the raw internal token.

This affects assistive technology in both RU and EN. Fixing it requires a UI consumer change, not localization rows.

**Leader action required:** bind the dialog ARIA label to the corresponding localized panel title.

## P2-1 — exposed Catalog Inspector remains hardcoded Russian

Classification: **P2 — runtime/UI, NOT v40-fixable**

The menu contains a directly rendered button:

`Инспектор событий`

and the catalog panel directly renders the same Russian heading.

Neither is wrapped in `tr(...)`, so EN remains Russian.

This is lower severity because the surface is developer/inspection-oriented, but it is exposed from the player menu.

## P2-2 — save/load failure wrapper is localized but diagnostic payload is raw

Classification: **P2 — runtime formatting, NOT v40-fixable**

Save/import/startup wrappers use bilingual keys such as:

- `ui.save.importFailed`
- `ui.save.loadStopped`
- `ui.app.startFailed`

However they interpolate `String(e)` / raw `Error.message`.

Malformed or incompatible saves can therefore append technical English, Russian engine text, or schema diagnostics after an otherwise localized prefix.

Normal successful save/load/migration notices are bilingual. This finding is limited to exceptional diagnostic paths.

## Areas audited clean

### Night

- D42 player-facing Night localization rows are bilingual.
- `ui.night.sequence.finish` and `ui.night.sequence.finishText` exist.
- active presentation alt/caption rows are bilingual.
- generic lodging/night buttons are localized.
- raw `night.phase` is not treated as a reachable defect: engine transitions synchronously to Lodging Resolution / Voluntary Choice, pending scene, or finished Night before render.

### Secret Debt

- ending title/description/epilogue RU/EN rows are complete.
- route prose is not rewritten here.
- the only copy defect found in this audit is the three permanent reward labels listed in P1-2.

### Activity

- ending prose is complete, including v36 final Network epilogue:
  - RU: `Контакты связывают разрозненные направления в единое рабочее пространство.`
  - EN: `The contacts tie disconnected routes into one practical working network.`
- three Activity Specialist ownership labels already exist.
- four missing literal UI labels are listed in P1-1.
- accepted localized ended-screen epilogue consumer remains a required assembly seam.

### Palace

- accepted Palace player-facing localization rows audited here are bilingual.
- no new Palace localization row defect was found.
- v19 remains subordinate to v18 mechanics/narrative prerequisite.

### School

- normal School headings, lesson buttons, tuition/energy copy and course copy are bilingual.
- `schoolCounter` condition display is the one missing generic condition label and is listed in P1-1.

### Generic ending screen

Bilingual generic keys exist for:

- ending completed;
- ending accepted;
- ending committed;
- time expired;
- fates/next life.

The final assembly must preserve Activity v17's localized epilogue consumer instead of the older journal-line-only seed behavior.

### Generic buttons/status

Literal generic player-facing `tr(...)` keys audited outside the four P1-1 misses are bilingual.

### Save/load/migration

Successful/recovery notices are localized. D41 retired Tavern migration localization rows intentionally retained by v31 remain bilingual.

No stale retired Tavern ending is live in the current ending catalog.

## v40 action set

Because v39 found content-only P1 defects, v40 is **not NOOP**.

v40 should add exactly:

- **4** missing literal UI rows;
- **17** missing permanent unlock label rows.

Total planned localization additions: **21**.

v40 must not:

- change `app.ts`;
- change engine/schema;
- change reward IDs/classes/ownership;
- change route mechanics;
- rename ending IDs;
- revive retired Tavern endings;
- edit presentation slots.

Focused tests should prove:

1. all 21 rows exist in RU and EN;
2. the four literal UI consumer keys no longer rely on RU fallback;
3. all 17 permanent reward IDs resolve to human-readable labels rather than raw IDs;
4. D40 double-prefix consumer aliases are localization-only compatibility rows;
5. v36 Activity Network epilogue remains exact.

Full CI is not requested.

**v39 AUDIT COMPLETE**
