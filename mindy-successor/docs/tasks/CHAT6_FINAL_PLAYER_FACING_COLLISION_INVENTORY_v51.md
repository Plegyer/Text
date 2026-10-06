# Chat 6 — Final Player-Facing Collision Inventory v51

Status: **COMPLETE — INPUT TO v52/v53**  
Owner: Chat 6  
Branch: `chat6/final-player-facing-preassembly-v51`  
Date: 2026-10-06

This document reconciles the accepted player-facing/localization/presentation layers without creating a production candidate. It is an exact precedence/collision contract for later Chat2 composition. No runtime or mechanics file is changed by v51.

## 1. Accepted authorities

- global presentation producer v23: `f25069c369c449ce0efbfe57acf877f950b1dfea`
- localization/presentation closure audit v28: `d57381dc7fa4af028cea3effdb4146a75cc9c60a`
- cumulative player-facing packet v47 on `chat6/final-player-facing-cumulative-v45`
- Strong Meta/modal implementation head: `fac645878ebd726f50fd1364ac72414796755a2d`
- Palace v19 content/presentation authority: `chat6/palace-final-prose-media-v19@6cf19169b92fa709e8ae51cf73ff72ef2c0fac19`
- Palace D48 implementation head: `e0277dc302df178e73184bf1623d0e91e5237b45`
- Palace D48 handoff v50
- lumber-stay retirement verified target: `39912e7435c3707d98f96fe550d697c20ac0bedb`
- D46+D47+legacy final assembly packet: `CHAT3_D46_D47_LEGACY_FINAL_ASSEMBLY_PACKET_v29.md`

## 2. Cumulative operation accounting

### v47 baseline

The accepted v47 contract remains:

- localization: **330 unique upsert targets**
- localization ordered upsert operations: **331**
- localization deletes: **12**
- presentation target additions: **127**
- Strong Meta/modal UI: **7 semantic hunks**

The extra ordered localization operation is the intentional Activity Network override described below.

### D48 extension

D48 contributes:

- **4** new project-owned Palace SVG assets
- **8** new localization rows: four RU/EN alt/caption pairs
- **17** Palace presentation replacements over accepted v19 fallback slots
- **0** non-Palace slot changes
- **0** mechanics/runtime changes

The 17 slot IDs are already part of v47's 127-target presentation union through Palace v19. D48 therefore changes their final values; it does not increase the unique cumulative presentation target count.

### Lumber retirement player-facing extension

The accepted lumber-stay retirement contributes to the player-facing layer:

**Localization ADD — 5**
- `legacy.ending.lumber-stay.title`
- `legacy.ending.lumber-stay.description`
- `legacy.perk.lumber-stay-vitality.label`
- `ui.ending.state.historical`
- `ui.legacy.historicalTitle`

**Localization DELETE — 5**
- `ending.lumber-stay.title`
- `ending.lumber-stay.description`
- `presentation.static.ending.lumber-stay.alt`
- `presentation.static.ending.lumber-stay.caption`
- `unlock.vitality.label`

**Presentation DELETE — 1**
- `ending/lumber-stay`

**Live ending definition DELETE — 1**
- `lumber-stay`

The five compatibility rows are bilingual in the accepted retirement blob. The five removed live localization rows, live presentation slot, and live ending definition are absent in the accepted retirement state.

### Final cumulative player-facing accounting

After v47 + D48 + the player-facing portion of lumber retirement:

- unique localization upsert targets: **343**
- ordered localization upsert operations: **344**
- localization delete targets: **17**
- unique cumulative presentation target additions from v47: **127**
- later presentation replacements: **17** (D48 over Palace v19)
- presentation delete targets: **1** (`ending/lumber-stay`)
- dedicated new static assets: **4**
- accepted UI semantic hunks: **7**
- live ending definition removals relevant to this lane: **1** (`lumber-stay`)

The 17 localization deletes are the prior v47 12-row fence plus the 5 lumber live-surface rows.

## 3. Exact intentional collision / precedence table

| Surface | Earlier accepted value | Later authority | Final precedence | Third-value rule |
|---|---|---|---|---|
| `ending.ending.activity.network.epilogue` | Activity v17 accepted epilogue | v36 Activity Network correction | **v36 wins** | any value other than absent / frozen v17 / frozen v36 => STOP |
| 7 Palace service/court slots | v19 `assets/stage-room.svg` + generic service alt key | D48 service-interior | **D48 wins** | any non-v19/non-D48 object => STOP |
| 4 Palace archive/Inner Truth slots | v19 `assets/stage-room.svg` + generic archive alt key | D48 threshold-archive | **D48 wins** | any non-v19/non-D48 object => STOP |
| 5 Palace Custodian/confrontation slots | v19 `assets/stage-room.svg` + generic Custodian alt key | D48 custodian-audience | **D48 wins** | any non-v19/non-D48 object => STOP |
| `ending/palace/return-home` | v19 `assets/stage-town.svg` + generic Return Home alt key | D48 return-home-threshold | **D48 wins** | any non-v19/non-D48 object => STOP |
| `ending/lumber-stay` live surface | pre-retirement live definition/presentation | lumber retirement v17 | **delete live surface** | any later reintroduction => STOP |
| five live lumber-stay/vitality localization rows | pre-retirement live compatibility | lumber retirement v17 | **delete live rows** | any later resurrection => STOP |
| five lumber historical UI/localization rows | absent before retirement | lumber retirement v17 | **retain compatibility rows** | conflicting third value => STOP |

No other accepted-authority mutating-key collision is present in the v47 localization union.

## 4. Palace D48 exact slot precedence

D48 replaces exactly 17 v19 fallback slots.

### Service Interior — 7

- `job/palace/event/palace-progression-milestone-02-working-rhythm/default`
- `job/palace/event/palace-progression-milestone-05-trusted-service/default`
- `job/palace/event/palace-progression-milestone-08-palace-network/default`
- `job/palace/event/palace-outcome-finalize-service-life/default`
- `job/palace/event/palace-outcome-finalize-court-power/default`
- `ending/palace/service-life`
- `ending/palace/court-power`

Final source:
`assets/presentation/palace-service-interior.svg`

### Threshold Archive — 4

- `job/palace/event/palace-progression-milestone-12-crossroads/default`
- `job/palace/event/palace-progression-milestone-15-outcome-ready/default`
- `job/palace/event/palace-outcome-finalize-inner-truth/default`
- `ending/palace/inner-truth`

Final source:
`assets/presentation/palace-threshold-archive.svg`

### Custodian Audience — 5

- `location/town/palace/confront-prince/default`
- `job/palace/event/palace-prince-confrontation-phase-01-audit-record/default`
- `job/palace/event/palace-prince-confrontation-phase-02-name-contradiction/default`
- `job/palace/event/palace-prince-confrontation-phase-03-define-boundary/default`
- `job/palace/event/palace-prince-confrontation-phase-04-reconstruct-return/default`

Final source:
`assets/presentation/palace-custodian-audience.svg`

### Return Home — 1

- `ending/palace/return-home`

Final source:
`assets/presentation/palace-return-home-threshold.svg`

### Palace invitation firewall

These two v19 slots are intentionally **not** D48 targets and must retain the neutral town mapping:

- `job/palace/event/palace-invitation-day1-arrival/default`
- `job/palace/event/palace-invitation-reveal/default`

Final source remains:
`assets/stage-town.svg`

## 5. D48 localization additions

D48 adds only these eight rows:

- `presentation.static.palace.service-interior.alt`
- `presentation.static.palace.service-interior.caption`
- `presentation.static.palace.threshold-archive.alt`
- `presentation.static.palace.threshold-archive.caption`
- `presentation.static.palace.custodian-audience.alt`
- `presentation.static.palace.custodian-audience.caption`
- `presentation.static.palace.return-home-threshold.alt`
- `presentation.static.palace.return-home-threshold.caption`

They do not collide with the v47 localization target set because v19 used generic Palace fallback keys rather than these asset-specific identities.

## 6. Retired Tavern live-surface fence

The accepted v28 audit confirms no live ending definition or presentation slot remains for:

- `tavern-stay`
- `tavern-guild`
- `tavern-court`

v47 already carries the v31 deletion fence for the six stale presentation-localization rows:

- `presentation.static.ending.tavern-stay.alt`
- `presentation.static.ending.tavern-stay.caption`
- `presentation.static.ending.tavern-guild.alt`
- `presentation.static.ending.tavern-guild.caption`
- `presentation.static.ending.tavern-court.alt`
- `presentation.static.ending.tavern-court.caption`

Retain the nine migration/history rows:

- `ending.tavern-stay.title`
- `ending.tavern-stay.description`
- `ending.tavern-guild.title`
- `ending.tavern-guild.description`
- `ending.tavern-court.title`
- `ending.tavern-court.description`
- `unlock.host.label`
- `unlock.mediator.label`
- `unlock.court.label`

Do not interpret “retired live presentation” as permission to delete migration compatibility.

## 7. Strong Meta / modal UI collision inventory

Accepted implementation head:

`fac645878ebd726f50fd1364ac72414796755a2d`

Its player-facing scope remains seven semantic hunks:

1. Strong Meta registry/capacity import.
2. Strong Meta label helpers and localized `panelAccessibleName`.
3. creation-time command navigation allowlist for `setStrongMetaKeystone` / `setStrongMetaSpecialist`.
4. `strongMetaNewStartHTML()`.
5. selector insertion after Hard Work in creation.
6. localized generic dialog accessible name.
7. Strong Meta Keystone/Specialist handlers.

Static source recheck on the accepted implementation head confirms:

- raw generic `aria-label="${esc(panel)}"`: **absent**
- localized `aria-label="${esc(panelAccessibleName(panel))}"`: **present**
- Strong Meta selector seam: **present**
- both accepted Strong Meta commands: **present**

Because D46/D47/legacy assembly can also touch `src/ui/app.ts` for historical display, the v42/v43 hunks must be rebased semantically after that integration. Never replace `app.ts` wholesale.

## 8. Third-value conflict disposition

Across the accepted authorities reviewed here:

- localization third-value conflicts: **0 identified**
- presentation third-value conflicts: **0 identified**
- D48 non-Palace slot collisions: **0**
- D48 localization key collisions with v47: **0**
- lumber retirement localization collisions with v47/D48 target rows: **0**
- lumber `ending/lumber-stay` delete collision with the v47 additive presentation target set: **0**

The only accepted same-target precedence is therefore:

1. Activity v17 -> v36 on one localization row.
2. Palace v19 -> D48 on 17 presentation slots.

Everything else is additive, retain-only, or delete-only.

A future assembly head containing a value that is neither the frozen predecessor nor the frozen final value is a **third-value conflict** and must STOP for owner review.

## 9. No-wholesale rule

Never resolve any collision by replacing whole snapshots of:

- `content/localization.json`
- `content/presentation.json`
- `content/definitions.json`
- `src/ui/app.ts`
- Palace/Activity/D42 runtime files
- D46/D47/legacy runtime files

Composition is by exact key, exact slot, exact delete fence, and semantic UI hunk only.

**v51 COMPLETE**
