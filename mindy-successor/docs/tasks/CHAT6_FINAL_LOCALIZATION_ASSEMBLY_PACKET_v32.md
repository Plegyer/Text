# Chat 6 — Final Localization Assembly Packet v32

Status: **READY_FOR_CHAT2_PREFLIGHT**  
Owner: Chat 6  
Branch: `chat6/final-localization-assembly-packet-v32`  
Task seed: `43eac0d3b1fdbcbd3ac080e3f70466410b6625a1`

Scope: research / assembly packet only.

No runtime change.  
No mechanics change.  
No production localization or presentation file change.  
No full CI.

This packet is the final merge-by-key / merge-by-slot contract for the accepted Chat 6 localization/presentation layers plus the accepted D42, Activity D38, and Palace presentation/localization surfaces.

---

## 1. Frozen source matrix

Use these exact source blobs. Do not substitute a branch-wide file copy.

| Layer | Localization source | Presentation source | Intended operation |
|---|---|---|---|
| v26 ordinary-ending closure | `b355f08650cc1cdbb0d08e07529382c1afb0605c` | none | 70 add + 9 replace + 6 delete |
| v27 Secret Debt endings | `80c1bf3e41c31ca57e7837c3b73c0d6f7e8a66ae` | none | 9 add |
| D42 accepted Night assembly | `9281d3880d01c54f352effa5e372ad5393cc3eaa` | `e800d2b16f2bc868273e39d45718dcd0c7fe74a5` | 110 add + 12 slots |
| Activity D38 v17 | `4449ca46ad6580ca5f36adf140e9e1e14a007b64` | `b6cc4cbce0dd0482cc41eeaf3df90708cb4c5432` | 9 add + 9 replace + 3 slots |
| Palace v19 | `64922de3b6aab606f9b2932853e6bbd686766b6a` | `02c9a19eee0366131f793ed9e141b33a93f213b3` | 14 add + 63 replace + 19 slots |
| global presentation v23 | no localization delta | `defe52fe665831a7194e4b7d0df99ae28588207c` | 93 slots |
| v29 generic captions | `75df2ed68b5cbf0a451e33d81e060ee5a3360d10` | none | 2 add |
| v31 retired Tavern cleanup | `d95d3e16b64d60e246f5923e2d0fc7840ddc8c04` | none | 6 delete |

Reference predecessor blobs used to classify additions versus intentional replacements:

- common localization seed: `65568847f09df4997fffc6facb7dc7907a10c872`
- v26 predecessor localization: same common seed
- Activity v17 localization predecessor: `c68f8eed960371c987f1ec79a6f219b6a5ffc8b5`
- Palace v19 localization predecessor: `7f7d976fc686a599abe3917018925ba0b85e1885`
- common v22 presentation predecessor: `83ce718fd324552b687342cd34707d62da8572fd`
- D42 presentation predecessor: `2adff5582cb9cf9c755b952c35fafb7e0ae6702b`

Frozen predecessor authorities:

- Activity v17 requires `chat3/activity-ending-family-producer-v16-r1@3cf69d7cb3df1a58d68908159d0acc14736435c4`.
- Palace v19 requires `chat6/palace-prince-narrative-producer-v18@67f948d185883d8e706dad522e5010bff8e2bd48`.

---

## 2. Global mutation accounting

Across the accepted localization layers in this packet:

- exact localization upsert operations: **295**
- exact localization deletions: **12**
- direct mutating-key collisions between accepted layers: **0**

Upsert breakdown:

- v26: 79 = 70 additions + 9 intentional replacements
- v27: 9 additions
- D42: 110 additions
- Activity v17: 18 = 9 additions + 9 intentional replacements
- Palace v19: 77 = 14 additions + 63 intentional replacements
- v29: 2 additions

Deletion breakdown:

- v26 disconnected Merchant / Artist Hard Work single-prefix rows: 6
- v31 retired Tavern presentation-localization rows: 6

Across presentation layers:

- v23: 93 additive slots
- D42: 12 additive slots
- Activity v17: 3 additive slots
- Palace v19: 19 additive slots
- total presentation upserts: **127**
- presentation slot removals: **0**
- direct target-slot collisions between accepted layers: **0**

Static cross-check also found that none of the v23 / Activity / Palace target slots are already occupied in the D42 presentation predecessor.

Do not use one global final row count as the assembly invariant. Activity v17 and Palace v19 are overlays on separately frozen predecessor content, and the current Chat 2 head may already contain some accepted rows. Use the exact allowlists and value checks below.

---

# 3. Exact composition order

Chat 2 should use this order.

## Phase 0 — prerequisite gate

Before any localization/presentation merge:

1. preserve the current Chat 2 runtime/mechanics head;
2. verify D42 Night runtime/content authority is present if assembling onto a post-D42 head;
3. verify Activity D38 frozen v16-r1 mechanics/content authority is present before applying Activity v17;
4. verify Palace v18 frozen mechanics/content authority is present before applying Palace v19;
5. verify no producer snapshot is about to replace a shared JSON file wholesale.

If Activity v16-r1 or Palace v18 is absent, stop. v17 and v19 are overlays, not standalone system imports.

## Phase 1 — v26 localization upserts

Apply the 79 v26 upserts from localization blob `b355f08650cc1cdbb0d08e07529382c1afb0605c`.

Do not perform the six v26 deletions yet; defer all deletion operations to the final deletion fence.

## Phase 2 — v27 Secret Debt localization

Apply the 9 v27 keys from `80c1bf3e41c31ca57e7837c3b73c0d6f7e8a66ae`.

## Phase 3 — D42 localization and presentation

Apply exactly the 110 D42 localization additions from `9281d3880d01c54f352effa5e372ad5393cc3eaa`.

Apply exactly the 12 D42 slot additions from `e800d2b16f2bc868273e39d45718dcd0c7fe74a5`.

Do not copy D42 definitions, runtime, or the whole shared JSON files as part of this packet.

## Phase 4 — Activity D38 v17 overlay

Only after the Activity v16-r1 prerequisite is present:

- apply the 18 Activity localization upserts from `4449ca46ad6580ca5f36adf140e9e1e14a007b64`;
- apply the 3 Activity presentation slots from `b6cc4cbce0dd0482cc41eeaf3df90708cb4c5432`.

The localized ended-screen epilogue runtime seam from accepted v17 is outside this data-only packet. If that accepted runtime seam is not already assembled, stop rather than copying `src/ui/app.ts` wholesale.

## Phase 5 — Palace v19 overlay

Only after frozen Palace v18 is present:

- apply the 77 v19 localization upserts from `64922de3b6aab606f9b2932853e6bbd686766b6a`;
- apply the 19 v19 presentation slots from `02c9a19eee0366131f793ed9e141b33a93f213b3`.

Do not replace `definitions.json` or Palace packs wholesale through this packet. v19 prose changes outside localization/presentation remain owned by the accepted Palace v19 content assembly.

## Phase 6 — global presentation v23

Apply exactly the 93 additive slot entries from `defe52fe665831a7194e4b7d0df99ae28588207c`.

No existing slot may be modified by this layer.

## Phase 7 — v29 caption closure

Apply exactly:

- `media.stage.room.caption`
- `media.base.town.caption`

from `75df2ed68b5cbf0a451e33d81e060ee5a3360d10`.

This intentionally closes the caption pairs used by v23's `night/rent-room/default` and `night/rest/default` mappings.

## Phase 8 — final deletion fence

After all upserts and presentation slots are in place, delete exactly the 12 rows listed in section 8.

This last step prevents an older producer snapshot from silently resurrecting disconnected or retired rows.

Then run the focused preflight bundle.

---

# 4. v26 exact localization manifest

Source: `b355f08650cc1cdbb0d08e07529382c1afb0605c`

## 4.1 D40 final copy — 48 additions

For each stable ending ID below, copy exactly:

`ending.<stable-ending-id>.title`  
`ending.<stable-ending-id>.description`  
`ending.<stable-ending-id>.epilogue`

Because the stable IDs already begin with `ending.`, these are the current double-prefix runtime keys.

Stable IDs:

- `ending.guard.officer`
- `ending.guard.reform`
- `ending.guard.network`
- `ending.guard.major-case`
- `ending.merchant.house`
- `ending.merchant.speculator-smuggler`
- `ending.merchant.patron-of-routes`
- `ending.artist-geisha.master-artist`
- `ending.artist-geisha.patron-network`
- `ending.artist-geisha.court-invitation`
- `ending.assassin.ghost`
- `ending.assassin.handler-takeover`
- `ending.assassin.refusal-turncoat`
- `ending.prostitute.independent-house`
- `ending.prostitute.elite-clientele`
- `ending.prostitute.network-protection`

Example actual key:

`ending.ending.guard.officer.epilogue`

## 4.2 Hard Work epilogues — 10 additions

Copy exactly:

- `ending.ending.lumber.hard-work.epilogue`
- `ending.ending.satyr-maid.hard-work.epilogue`
- `ending.ending.undead-farm.hard-work.epilogue`
- `ending.ending.tavern.hard-work.epilogue`
- `ending.ending.hunter.hard-work.epilogue`
- `ending.ending.guard.hard-work.epilogue`
- `ending.ending.merchant.hard-work.epilogue`
- `ending.ending.artist-geisha.hard-work.epilogue`
- `ending.ending.assassin.hard-work.epilogue`
- `ending.ending.prostitute.hard-work.epilogue`

## 4.3 Remaining D41 epilogues — 10 additions

Copy exactly:

- `ending.ending.lumber.forewoman.epilogue`
- `ending.ending.lumber.forest.epilogue`
- `ending.ending.satyr-maid.personal-network.epilogue`
- `ending.ending.undead-farm.external-anomaly.epilogue`
- `ending.ending.tavern.innkeeper.epilogue`
- `ending.ending.tavern.information-broker.epilogue`
- `ending.ending.tavern.sanctuary.epilogue`
- `ending.ending.hunter.master-hunter.epilogue`
- `ending.ending.hunter.warden.epilogue`
- `ending.ending.hunter.legend.epilogue`

## 4.4 Generic prototype epilogues — 2 additions

- `ending.guild-life.epilogue`
- `ending.scholar-life.epilogue`

Do not add a live `ending.lumber-stay.epilogue`.

## 4.5 Merchant replacements — 9 intentional replacements

Copy the v26 final values exactly for:

- `event.merchant.career.choose-route.choice.veteran.text`
- `event.merchant.career.choose-route.choice.speculator-smuggler.text`
- `event.merchant.routes.house-ready.choice.record.text`
- `event.merchant.routes.speculator-ready.choice.record.text`
- `event.merchant.routes.patron-ready.choice.record.text`
- `event.merchant.relationship.trust.choice.continue.text`
- `event.merchant.items.appraisal-scales.choice.defer.text`
- `event.merchant.items.manifest-case.choice.defer.text`
- `event.merchant.items.sample-kit.choice.defer.text`

These are the only v26 existing-row replacements.

---

# 5. v27 Secret Debt exact localization manifest

Source: `80c1bf3e41c31ca57e7837c3b73c0d6f7e8a66ae`

For each of these three stable ending IDs:

- `ending.secret-debt.paid-freedom`
- `ending.secret-debt.bound-life`
- `ending.secret-debt.takeover`

copy exactly:

- `ending.<stable-ending-id>.title`
- `ending.<stable-ending-id>.description`
- `ending.<stable-ending-id>.epilogue`

Exact runtime keys:

- `ending.ending.secret-debt.paid-freedom.title`
- `ending.ending.secret-debt.paid-freedom.description`
- `ending.ending.secret-debt.paid-freedom.epilogue`
- `ending.ending.secret-debt.bound-life.title`
- `ending.ending.secret-debt.bound-life.description`
- `ending.ending.secret-debt.bound-life.epilogue`
- `ending.ending.secret-debt.takeover.title`
- `ending.ending.secret-debt.takeover.description`
- `ending.ending.secret-debt.takeover.epilogue`

No Secret Debt mechanics, reward, gate, pack, or presentation mutation belongs to this layer.

---

# 6. D42 exact localization / presentation manifest

Localization source: `9281d3880d01c54f352effa5e372ad5393cc3eaa`  
Presentation source: `e800d2b16f2bc868273e39d45718dcd0c7fe74a5`

D42 adds 12 surfaces. For every row in the table below, copy all nine localization keys derived from the three stems:

- `<event>.title`
- `<event>.variant.default.text`
- `<event>.choice.continue.label`
- `<event>.choice.continue.text`
- `<night>.label`
- `<night>.body`
- `<night>.aria`
- `<media>.alt`
- `<media>.caption`

| Surface | event stem | night stem | media stem |
|---|---|---|---|
| Lumber foreman social | `event.lumber.night.foreman-social` | `night.lumber.foreman-social` | `presentation.static.lumber.night.foreman-social` |
| Hunter field debrief | `event.hunter.night.field-debrief` | `night.hunter.field-debrief` | `presentation.static.hunter.night.field-debrief` |
| Hunter senior guide | `event.hunter.night.senior-guide` | `night.hunter.senior-guide` | `presentation.static.hunter.night.senior-guide` |
| Guard case debrief | `event.guard.night.case-debrief` | `night.guard.case-debrief` | `presentation.static.guard.night.case-debrief` |
| Guard partner | `event.guard.night.partner` | `night.guard.partner` | `presentation.static.guard.night.partner` |
| Merchant ledger plan | `event.merchant.night.ledger-plan` | `night.merchant.ledger-plan` | `presentation.static.merchant.night.ledger-plan` |
| Merchant supplier | `event.merchant.night.supplier` | `night.merchant.supplier` | `presentation.static.merchant.night.supplier` |
| Assassin handler contact | `event.assassin.night.handler-contact` | `night.assassin.handler-contact` | `presentation.static.assassin.night.handler-contact` |
| Prostitute personal continuation | `event.prostitute.night.personal-continuation` | `night.prostitute.personal-continuation` | `presentation.static.prostitute.night.personal-continuation` |
| Satyr Maid recurring guest | `event.satyr-maid.night.recurring-guest-private` | `night.satyr-maid.recurring-guest-private` | `presentation.static.satyr-maid.night.recurring-guest-private` |
| Tavern recurring traveler | `event.tavern.night.traveler-private` | `night.tavern.traveler-private` | `presentation.static.tavern.night.traveler-private` |
| Prostitute client private | `event.prostitute.night.client-private` | `night.prostitute.client-private` | `presentation.static.prostitute.night.client-private` |

That is 12 × 9 = 108 keys.

Also copy:

- `ui.night.sequence.finish`
- `ui.night.sequence.finishText`

Total D42 localization additions: **110**.

D42 presentation slots — copy these 12 `slots[id]` objects exactly:

- `night/guard/guard-night-case-debrief`
- `night/hunter/hunter-night-field-debrief`
- `night/merchant/merchant-night-ledger-plan`
- `night/prostitute/prostitute-night-client-private`
- `night/satyr-maid/satyr-maid-night-recurring-guest-private`
- `night/tavern/tavern-night-traveler-private`
- `relationship/assassin-handler/assassin-night-handler-contact/default`
- `relationship/guard-partner/guard-night-partner/default`
- `relationship/hunter-senior-guide/hunter-night-senior-guide/default`
- `relationship/lumber-foreman/lumber-night-foreman-social/default`
- `relationship/merchant-supplier/merchant-night-supplier/default`
- `relationship/prostitute-recurring-client/prostitute-night-personal-continuation/default`

The previously reported v25 "12 missing captions" condition is obsolete. The accepted D42 localization blob already contains all 12 paired caption keys.

---

# 7. Activity D38 v17 exact overlay manifest

Prerequisite:

`chat3/activity-ending-family-producer-v16-r1@3cf69d7cb3df1a58d68908159d0acc14736435c4`

Localization source: `4449ca46ad6580ca5f36adf140e9e1e14a007b64`  
Presentation source: `b6cc4cbce0dd0482cc41eeaf3df90708cb4c5432`

## 7.1 Ending copy — 9 upserts

For:

- `ending.activity.pathfinder`
- `ending.activity.preservation`
- `ending.activity.network`

copy the final v17:

- title
- description
- epilogue

through the double-prefix runtime keys:

- `ending.ending.activity.pathfinder.{title,description,epilogue}`
- `ending.ending.activity.preservation.{title,description,epilogue}`
- `ending.ending.activity.network.{title,description,epilogue}`

Relative to v16-r1:

- titles/descriptions: 6 intentional replacements
- epilogues: 3 additions

## 7.2 Specialist presentation copy — 3 replacements

- `specialist.activity.surveyors-atlas.description`
- `specialist.activity.field-archive.description`
- `specialist.activity.contact-network.description`

## 7.3 Accessibility rows — 6 additions

- `presentation.static.activity-ending-pathfinder.alt`
- `presentation.static.activity-ending-pathfinder.caption`
- `presentation.static.activity-ending-preservation.alt`
- `presentation.static.activity-ending-preservation.caption`
- `presentation.static.activity-ending-network.alt`
- `presentation.static.activity-ending-network.caption`

Total Activity localization upserts: **18**.

## 7.4 Presentation slots — 3 additions

Copy exact slot objects:

- `ending/activity/pathfinder`
- `ending/activity/preservation`
- `ending/activity/network`

Current accepted safe media intent:

- Pathfinder: `assets/presentation/forest-route-default-v1.svg`
- Preservation: `assets/stage-town.svg`
- Network: `assets/stage-town.svg`

Do not infer that Pathfinder is Forest-only and do not substitute career-specific art.

---

# 8. Palace v19 exact overlay manifest

Frozen prerequisite:

`chat6/palace-prince-narrative-producer-v18@67f948d185883d8e706dad522e5010bff8e2bd48`

Localization source: `64922de3b6aab606f9b2932853e6bbd686766b6a`  
Presentation source: `02c9a19eee0366131f793ed9e141b33a93f213b3`

v19 is an overlay on v18.

Static diff against the frozen v18 localization predecessor:

- additions: **14**
- intentional replacements: **63**
- removals: **0**

## 8.1 v19 additions — 14

Four ending epilogues:

- `ending.ending.palace.court-power.epilogue`
- `ending.ending.palace.inner-truth.epilogue`
- `ending.ending.palace.return-home.epilogue`
- `ending.ending.palace.service-life.epilogue`

Five accessibility pairs:

- `presentation.static.palace.archive.{alt,caption}`
- `presentation.static.palace.custodian.{alt,caption}`
- `presentation.static.palace.invitation.{alt,caption}`
- `presentation.static.palace.return-home.{alt,caption}`
- `presentation.static.palace.service.{alt,caption}`

## 8.2 v19 intentional replacements — 63

Action:

- `action.palace.confront-prince.description`
- `action.palace.confront-prince.scene.default.text`

Ending copy:

- `ending.ending.palace.court-power.title`
- `ending.ending.palace.court-power.description`
- `ending.ending.palace.inner-truth.description`
- `ending.ending.palace.return-home.description`
- `ending.ending.palace.service-life.description`

Invitation Day 1:

- `event.palace.invitation.day1-arrival.title`
- `event.palace.invitation.day1-arrival.variant.default.text`
- `event.palace.invitation.day1-arrival.choice.open.label`
- `event.palace.invitation.day1-arrival.choice.open.text`

Invitation reveal:

- `event.palace.invitation.reveal.title`
- `event.palace.invitation.reveal.variant.default.text`
- `event.palace.invitation.reveal.choice.accept.text`

For each route `court-power`, `inner-truth`, `service-life`:

- `event.palace.outcome-finalize.<route>.title`
- `event.palace.outcome-finalize.<route>.variant.default.text`
- `event.palace.outcome-finalize.<route>.choice.finalize.label`
- `event.palace.outcome-finalize.<route>.choice.finalize.text`

Prince phase 1:

- `event.palace.prince-confrontation.phase-01-audit-record.variant.default.text`
- `event.palace.prince-confrontation.phase-01-audit-record.choice.not-yet.text`
- `event.palace.prince-confrontation.phase-01-audit-record.choice.separate-record-from-claim.label`
- `event.palace.prince-confrontation.phase-01-audit-record.choice.separate-record-from-claim.text`
- `event.palace.prince-confrontation.phase-01-audit-record.choice.unsupported-conclusion.label`
- `event.palace.prince-confrontation.phase-01-audit-record.choice.unsupported-conclusion.text`

Prince phase 2:

- `event.palace.prince-confrontation.phase-02-name-contradiction.variant.default.text`
- `event.palace.prince-confrontation.phase-02-name-contradiction.choice.accept-exclusive-veto.text`
- `event.palace.prince-confrontation.phase-02-name-contradiction.choice.authority-is-not-proof.text`
- `event.palace.prince-confrontation.phase-02-name-contradiction.choice.not-yet.text`

Prince phase 3:

- `event.palace.prince-confrontation.phase-03-define-boundary.variant.default.text`
- `event.palace.prince-confrontation.phase-03-define-boundary.choice.declare-world-unreal.label`
- `event.palace.prince-confrontation.phase-03-define-boundary.choice.declare-world-unreal.text`
- `event.palace.prince-confrontation.phase-03-define-boundary.choice.leave-without-erasing.text`
- `event.palace.prince-confrontation.phase-03-define-boundary.choice.not-yet.text`

Prince phase 4:

- `event.palace.prince-confrontation.phase-04-reconstruct-return.variant.default.text`
- `event.palace.prince-confrontation.phase-04-reconstruct-return.choice.invent-original-cause.label`
- `event.palace.prince-confrontation.phase-04-reconstruct-return.choice.invent-original-cause.text`
- `event.palace.prince-confrontation.phase-04-reconstruct-return.choice.not-yet.text`
- `event.palace.prince-confrontation.phase-04-reconstruct-return.choice.present-origin-trace.text`

For each milestone `02-working-rhythm`, `05-trusted-service`, `08-palace-network`, `12-crossroads`, `15-outcome-ready`:

- `event.palace.progression.milestone-<milestone>.title`
- `event.palace.progression.milestone-<milestone>.variant.default.text`
- `event.palace.progression.milestone-<milestone>.choice.continue.text`

UI:

- `ui.palace.confrontation.complete`
- `ui.palace.returnHome.explicitCommit`

## 8.3 Palace presentation slots — 19 additions

Copy exact `slots[id]` objects:

- `ending/palace/court-power`
- `ending/palace/inner-truth`
- `ending/palace/return-home`
- `ending/palace/service-life`
- `job/palace/event/palace-invitation-day1-arrival/default`
- `job/palace/event/palace-invitation-reveal/default`
- `job/palace/event/palace-outcome-finalize-court-power/default`
- `job/palace/event/palace-outcome-finalize-inner-truth/default`
- `job/palace/event/palace-outcome-finalize-service-life/default`
- `job/palace/event/palace-prince-confrontation-phase-01-audit-record/default`
- `job/palace/event/palace-prince-confrontation-phase-02-name-contradiction/default`
- `job/palace/event/palace-prince-confrontation-phase-03-define-boundary/default`
- `job/palace/event/palace-prince-confrontation-phase-04-reconstruct-return/default`
- `job/palace/event/palace-progression-milestone-02-working-rhythm/default`
- `job/palace/event/palace-progression-milestone-05-trusted-service/default`
- `job/palace/event/palace-progression-milestone-08-palace-network/default`
- `job/palace/event/palace-progression-milestone-12-crossroads/default`
- `job/palace/event/palace-progression-milestone-15-outcome-ready/default`
- `location/town/palace/confront-prince/default`

All 19 use only the accepted project-owned neutral `assets/stage-room.svg` / `assets/stage-town.svg` fallbacks with v19 accessibility keys.

### Palace prerequisite stop rule

On the accepted D42 localization snapshot, 70 of the 77 v19 overlay keys are absent and 7 invitation rows exist with older values. This is proof that v19 must not be treated as a standalone Palace import onto that older head.

If frozen v18 Palace content is not already assembled, stop and assemble v18 first.

---

# 9. Global presentation v23 exact slot manifest

Presentation source: `defe52fe665831a7194e4b7d0df99ae28588207c`

The v23 delta is exactly:

- 93 added slots
- 0 removed
- 0 modified pre-existing slots

## 9.1 Assassin event slots — 41

Prefix each slug below with:

`job/assassin/event/`

and suffix with:

`/default`

Slugs:

- `assassin-activity-infiltration-return`
- `assassin-career-first-shift`
- `assassin-career-season-autumn`
- `assassin-career-season-spring`
- `assassin-career-season-summer`
- `assassin-career-season-winter`
- `assassin-career-seasonal-breadth`
- `assassin-career-trusted-blade`
- `assassin-career-veteran-ready`
- `assassin-contract-close`
- `assassin-contract-fallout`
- `assassin-contract-intel`
- `assassin-contract-method`
- `assassin-contract-offer`
- `assassin-contract-prep`
- `assassin-contract-resolve`
- `assassin-cross-guard-pressure`
- `assassin-cross-merchant-route`
- `assassin-cross-tavern-rumour`
- `assassin-items-concealed-toolset`
- `assassin-items-disguise-kit`
- `assassin-items-evidence-case`
- `assassin-items-sealed-pass`
- `assassin-relationship-conflict-open`
- `assassin-relationship-conflict-resolve`
- `assassin-relationship-intro`
- `assassin-relationship-trust`
- `assassin-relationship-utility`
- `assassin-routes-choose-network`
- `assassin-routes-choose-practice`
- `assassin-routes-ghost-ready`
- `assassin-routes-handler-takeover-ready`
- `assassin-routes-infiltration-qualified`
- `assassin-routes-outcome-ready`
- `assassin-routes-refusal-evidence`
- `assassin-routes-turncoat-ready`
- `assassin-school-etiquette`
- `assassin-school-field`
- `assassin-school-literacy`
- `assassin-school-physical`
- `assassin-school-rhetoric`

All 41 reuse:

- asset: `assets/presentation/career-assassin-result.svg`
- alt key: `presentation.static.career.assassin.result.alt`

## 9.2 Assassin infiltration — 8

- `activity/infiltration/route/default`
- `activity/infiltration/route/local-route`
- `activity/infiltration/route/concealed-route`
- `activity/infiltration/route/sealed-route`
- `activity/infiltration/route/disguise-route`
- `activity/infiltration/return/success`
- `activity/infiltration/return/escape`
- `activity/infiltration/return/failure`

All reuse the accepted Assassin result master.

## 9.3 Secret Debt / lodging surfaces — 3

- `location/town/repay/default`
  - source: `assets/presentation/poverty-pressure.svg`
  - alt: `presentation.static.poverty.pressure.alt`
- `night/rest/default`
  - source: `assets/stage-town.svg`
  - alt: `media.base.town.alt`
- `night/rent-room/default`
  - source: `assets/stage-room.svg`
  - alt: `media.stage.room.alt`

The last two require the v29 captions to be present by final preflight.

## 9.4 Seasonal authored career sub-scenes — 40

### Satyr Maid

- `job/satyr-maid/shift/autumn/closing-reset/default`
- `job/satyr-maid/shift/autumn/queue-control/default`
- `job/satyr-maid/shift/spring/arrival-rush/default`
- `job/satyr-maid/shift/spring/table-reset/default`
- `job/satyr-maid/shift/summer/refill-rush/default`
- `job/satyr-maid/shift/summer/split-order/default`
- `job/satyr-maid/shift/winter/familiar-order/default`
- `job/satyr-maid/shift/winter/hearth-round/default`

### Undead Farm

- `job/undead-farm/shift/autumn/contract-sort/default`
- `job/undead-farm/shift/autumn/reserve/default`
- `job/undead-farm/shift/spring/process-check/default`
- `job/undead-farm/shift/spring/wet-beds/default`
- `job/undead-farm/shift/summer/overgrowth/default`
- `job/undead-farm/shift/summer/production-run/default`
- `job/undead-farm/shift/winter/analysis-bench/default`
- `job/undead-farm/shift/winter/specimen-check/default`

### Tavern

- `job/tavern/shift/autumn/orders/default`
- `job/tavern/shift/autumn/rumours/default`
- `job/tavern/shift/spring/rooms/default`
- `job/tavern/shift/spring/supplies/default`
- `job/tavern/shift/summer/deliveries/default`
- `job/tavern/shift/summer/occupancy/default`
- `job/tavern/shift/winter/house-node/default`
- `job/tavern/shift/winter/shelter/default`

### Hunter

- `job/hunter/shift/autumn/migration/default`
- `job/hunter/shift/autumn/trophy-handoff/default`
- `job/hunter/shift/spring/edge-scout/default`
- `job/hunter/shift/spring/melt-tracks/default`
- `job/hunter/shift/spring/trap-check/default`
- `job/hunter/shift/summer/edge-predator/default`
- `job/hunter/shift/summer/training/default`
- `job/hunter/shift/winter/route-limits/default`

### Guard

- `job/guard/shift/autumn/cargo-check/default`
- `job/guard/shift/autumn/market-records/default`
- `job/guard/shift/spring/property-dispute/default`
- `job/guard/shift/spring/road-reopen/default`
- `job/guard/shift/summer/festival/default`
- `job/guard/shift/summer/market-crowd/default`
- `job/guard/shift/winter/closed-quarter/default`
- `job/guard/shift/winter/lodging-pressure/default`

Each copies the exact static candidate from v23 and reuses the corresponding accepted seasonal master / alt key.

## 9.5 Forest route — 1

- `activity/forest/route/hunter-trail`

Accepted source:

- `assets/presentation/forest-route-default-v1.svg`
- `presentation.static.forest.route.default.alt`

---

# 10. v29 exact caption closure

Source: `75df2ed68b5cbf0a451e33d81e060ee5a3360d10`

Add exactly two rows:

## `media.stage.room.caption`

- RU: `Сцена дешёвой общей комнаты для ночлега.`
- EN: `Cheap shared-room lodging scene.`

It must remain exactly equal to `media.stage.room.alt`.

## `media.base.town.caption`

- RU: `Условная иллюстрация фэнтезийного города.`
- EN: `A stylized illustration of the fantasy town.`

It must remain exactly equal to `media.base.town.alt`.

No other v29 localization row is part of the producer delta.

---

# 11. Final deletion fence — 12 rows

Delete only these rows after all upserts.

## 11.1 v26 disconnected single-prefix duplicates — 6

- `ending.merchant.hard-work.title`
- `ending.merchant.hard-work.description`
- `ending.merchant.hard-work.epilogue`
- `ending.artist-geisha.hard-work.title`
- `ending.artist-geisha.hard-work.description`
- `ending.artist-geisha.hard-work.epilogue`

The live double-prefix rows must remain.

## 11.2 v31 retired Tavern presentation localization — 6

- `presentation.static.ending.tavern-stay.alt`
- `presentation.static.ending.tavern-stay.caption`
- `presentation.static.ending.tavern-guild.alt`
- `presentation.static.ending.tavern-guild.caption`
- `presentation.static.ending.tavern-court.alt`
- `presentation.static.ending.tavern-court.caption`

Do not widen this deletion set.

---

# 12. Migration compatibility rows that must remain

The following rows are not part of the v31 deletion and must remain present and bilingual:

- `ending.tavern-stay.title`
- `ending.tavern-stay.description`
- `ending.tavern-guild.title`
- `ending.tavern-guild.description`
- `ending.tavern-court.title`
- `ending.tavern-court.description`
- `unlock.host.label`
- `unlock.mediator.label`
- `unlock.court.label`

Do not delete them through this packet.

The accepted D41 migration mapping must also remain unchanged:

- `tavern-stay` -> `ending.tavern.innkeeper`
- `tavern-guild` -> `ending.tavern.sanctuary`
- `tavern-court` -> `ending.tavern.information-broker`

---

# 13. Conflict policy

Static audit of the accepted producer deltas found:

- localization mutating-key collisions: **0**
- presentation target-slot collisions: **0**

Therefore the final assembly must not introduce an unreviewed last-write-wins rule.

For every localization upsert:

1. if the key is absent and the producer classifies it as an addition: add it;
2. if the key already equals the frozen producer value: no-op;
3. if the key is an intentional replacement and the current value equals the frozen predecessor value: replace it;
4. otherwise: **STOP**.

For every presentation slot:

1. if absent: add the exact producer `slots[id]` object;
2. if already byte/JSON-equivalent to the frozen producer value: no-op;
3. if present with any other value: **STOP**.

For every deletion key:

1. if absent: no-op;
2. if present with the known retired/disconnected value: delete;
3. if a newer branch has repurposed the same key or a live consumer now references it: **STOP**.

Do not resolve any unexpected collision by producer chronology alone.

---

# 14. Focused localization / presentation test bundle

Bring the producer tests into the runnable Chat 2 assembly checkout and run at least:

- `tests/ending-localization-closure-producer-v26.test.ts`
- `tests/secret-debt-ending-localization-producer-v27.test.ts`
- `tests/global-caption-closure-producer-v29.test.ts`
- `tests/retired-tavern-localization-cleanup-v31.test.ts`
- `tests/night-content-gap-v10.test.ts`
- `tests/shared-night-ui-localization-production-v1.test.ts`
- `tests/activity-ending-content-presentation-v17.test.ts`
- `tests/palace-final-prose-media-v19.test.ts`
- `tests/global-presentation-mapping-producer-v23.test.ts`

Cross-cutting parity / integrity checks:

- `tests/localization.test.ts`
- `tests/presentation.test.ts`
- `tests/presentation-source-integrity-v9.test.ts`
- `tests/presentation-locale-accessibility-v9.test.ts`

For D42, Chat 2 should also retain its existing focused Night/save-reload/private-space/Secret-Debt checks around the accepted D42 runtime assembly. v32 does not replace the D42 runtime gate.

v32 itself does not run full CI.

---

# 15. Stop conditions

Stop preflight and return to the owning producer / Leader if any of the following occurs:

1. any frozen source blob in section 1 no longer resolves to the expected content;
2. Activity v16-r1 is absent while trying to apply Activity v17;
3. Palace v18 is absent while trying to apply Palace v19;
4. an additive localization key already exists with a different value;
5. an intentional replacement key is neither the frozen predecessor value nor the frozen final value;
6. a target presentation slot already exists with a different object;
7. a deletion key has acquired a new live consumer or a new value;
8. any of the nine Tavern migration compatibility rows in section 12 disappears;
9. any retired Tavern ending ID reappears in live definitions or presentation;
10. any of the 12 D42 media alt keys lacks its matching caption after assembly;
11. either v29 caption differs from its accepted paired alt;
12. any v23 target asset is missing;
13. the Activity ended-state localization seam is missing while localized epilogues are expected to be player-facing;
14. Palace v19 content is being applied without its frozen v18 mechanics/content base;
15. any focused producer or parity test fails;
16. resolving the merge would require replacing `localization.json`, `presentation.json`, `definitions.json`, or a runtime file wholesale.

---

# 16. Files / snapshots that must never be copied wholesale

Never wholesale-copy any producer's:

- `content/localization.json`
- `content/presentation.json`

The accepted layers were authored on different, non-cumulative branch snapshots.

In particular:

- v27 is a 9-key Secret Debt layer, not a replacement localization file;
- v29 is a 2-key caption layer, not a replacement localization file;
- v31 is a 6-key deletion layer, not a replacement localization file;
- v23 is a 93-slot additive presentation layer, not a replacement presentation file;
- D42's shared JSON snapshots must not overwrite newer ending/Palace/Activity/global presentation work.

Also never copy wholesale through this packet:

- Palace v19 `definitions.json`;
- Palace packs;
- Activity v17 `src/ui/app.ts`;
- D42 runtime / definitions / packs.

Those belong to their accepted owner assemblies and must be integrated through their own scoped diffs.

---

# 17. Chat 2 preflight checklist

A correct final content preflight should prove all of the following simultaneously:

- all 40 canonical ordinary-career endings have bilingual title / description / epilogue coverage;
- all 3 Secret Debt endings have bilingual title / description / epilogue coverage;
- all 3 Activity endings have final bilingual copy and 3 explicit ending presentation slots;
- Palace v19 final prose localization overlay is present on top of v18 and all 19 Palace presentation slots exist;
- all 12 D42 Night surfaces have RU/EN event, UI, alt, and caption coverage;
- all 93 v23 global presentation mappings exist;
- `media.base.town.caption` and `media.stage.room.caption` exist and equal their accepted alt semantics;
- the six disconnected Merchant/Artist single-prefix Hard Work rows are absent;
- the six retired Tavern presentation-localization rows are absent;
- the nine Tavern migration-compatibility rows remain;
- retired Tavern ending IDs remain absent from live definitions/presentation;
- D41 legacy Tavern migration mappings remain unchanged;
- no accepted layer changed runtime, mechanics, rewards, gates, or presentation routing outside its owned content surface;
- all focused tests in section 14 are green.

---

## Final disposition

The accepted layers compose cleanly by explicit key/slot allowlist.

There are no direct localization or presentation collisions between the accepted producer deltas.

The only required ordering constraints are dependency and cleanup constraints:

- Activity v17 after Activity v16-r1;
- Palace v19 after Palace v18;
- v29 present by the time v23 lodging mappings are accessibility-validated;
- the 12-row deletion fence last.

Any integration that requires a whole-file replacement is outside this packet and must stop.

**READY_FOR_CHAT2_PREFLIGHT**
