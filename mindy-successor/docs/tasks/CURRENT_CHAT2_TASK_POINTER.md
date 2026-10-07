# CURRENT CHAT2 TASK POINTER

Status: **STAGE 2 - D48 PALACE MEDIA OVERLAY NOW**
Owner: Chat 2 / sole production assembly + full-CI lane

Work branch:
`chat2/assembly-palace-d39-d48-current-main-v76`

Exact production base:
`63081de1641362b7b2b06202b7a09e554caa8ecf`

## Closed before this task

D39 runtime:
- `68f762ae6e87083e37badc418f9c903f7617419a`
- run `37648362110` SUCCESS

D39 live consumers:
- `c58ea7e64f1f1b08ca9d5e70384fe41a0d9dff38`
- run `37657002423` SUCCESS

Strong Meta UI:
- accepted source: `63081de1641362b7b2b06202b7a09e554caa8ecf`
- implementation production source before test-only compatibility: `5c1cecf31c9d7ac240bb96e4701ec6818e6830a4`
- run `37658731567` SUCCESS
- npm ci / typecheck / validate / build: PASS
- focused Strong Meta UI + adjacency: 65/65 PASS
- only post-implementation change was one stale Palace v16 test-compatibility assertion

Do not redo D39 or Strong Meta UI.

## This task only

Apply locked Stage 2 step 7:
**D48 Palace media overlay.**

Do NOT run Stage2 full CI yet.
Do NOT alter Palace mechanics, D39 rewards, Strong Meta mechanics, save/schema, or endings.

## Frozen D48 authority

Producer branch:
`chat6/palace-d48-media-producer-v48`

Exact implementation head:
`e0277dc302df178e73184bf1623d0e91e5237b45`

Producer seed:
`ee3ea8581f890bc7e5e6ed148e74f5a73b9398c7`

Implementation diff contains exactly seven production/test files:
- four added SVG assets:
  - `assets/presentation/palace-custodian-audience.svg`
  - `assets/presentation/palace-threshold-archive.svg`
  - `assets/presentation/palace-return-home-threshold.svg`
  - `assets/presentation/palace-service-interior.svg`
- `content/presentation.json`
- `content/localization.json`
- `tests/palace-d48-media-v50.test.ts`

No runtime/mechanics file belongs to D48.

## Critical merge rule

**Semantic union only. Never wholesale replace `content/presentation.json` or `content/localization.json`.**

Preserve all current Palace v19, D39, Strong Meta UI, Secret Debt/D51, Night/Activity and later presentation/localization rows.

If any target Palace slot currently has a third value that is neither the accepted v19 fallback nor the D48 authority value, STOP for conflict review.

## Exactly four D48 assets

Add exactly the four SVG masters listed above.

Required static properties:
- `viewBox="0 0 1200 675"`
- 16:9
- `role="img"`
- no `<script>`
- no embedded raster `<image>`
- no lore-bearing `<text>`
- no `href` / `xlink:href`
- no remote CSS/resource URLs

Do not add a fifth Palace D48 asset.

## Exactly 17 Palace presentation remaps

### Service Interior — 7
Use `assets/presentation/palace-service-interior.svg` with alt key `presentation.static.palace.service-interior.alt`:
- `job/palace/event/palace-progression-milestone-02-working-rhythm/default`
- `job/palace/event/palace-progression-milestone-05-trusted-service/default`
- `job/palace/event/palace-progression-milestone-08-palace-network/default`
- `job/palace/event/palace-outcome-finalize-service-life/default`
- `job/palace/event/palace-outcome-finalize-court-power/default`
- `ending/palace/service-life`
- `ending/palace/court-power`

### Threshold Archive — 4
Use `assets/presentation/palace-threshold-archive.svg` with alt key `presentation.static.palace.threshold-archive.alt`:
- `job/palace/event/palace-progression-milestone-12-crossroads/default`
- `job/palace/event/palace-progression-milestone-15-outcome-ready/default`
- `job/palace/event/palace-outcome-finalize-inner-truth/default`
- `ending/palace/inner-truth`

### Custodian Audience — 5
Use `assets/presentation/palace-custodian-audience.svg` with alt key `presentation.static.palace.custodian-audience.alt`:
- `location/town/palace/confront-prince/default`
- `job/palace/event/palace-prince-confrontation-phase-01-audit-record/default`
- `job/palace/event/palace-prince-confrontation-phase-02-name-contradiction/default`
- `job/palace/event/palace-prince-confrontation-phase-03-define-boundary/default`
- `job/palace/event/palace-prince-confrontation-phase-04-reconstruct-return/default`

### Return Home Threshold — 1
Use `assets/presentation/palace-return-home-threshold.svg` with alt key `presentation.static.palace.return-home-threshold.alt`:
- `ending/palace/return-home`

## Invitation slots must remain neutral

Do NOT remap:
- `job/palace/event/palace-invitation-day1-arrival/default`
- `job/palace/event/palace-invitation-reveal/default`

Both must remain on `assets/stage-town.svg`.

No non-Palace slot may use a D48 asset.

## Localization

Merge exactly the four asset-specific RU/EN alt/caption pairs by key:
- service-interior alt + caption
- threshold-archive alt + caption
- custodian-audience alt + caption
- return-home-threshold alt + caption

That is exactly 8 new localization rows.

Fallback `alt` in presentation must equal the localized EN alt for each D48 mapping family.

## Verification

Run on exact resulting head:
1. `npm ci`
2. `npm run typecheck`
3. `npm run validate`
4. `npm run build`
5. focused:
   - `tests/palace-d48-media-v50.test.ts`
   - Palace v15/v16/v18/v19 focused adjacency
   - Strong Meta UI smoke
   - D39 live-consumer smoke

Do not run Stage2 full CI yet.

## Stop marker

Stop at:
`D48_READY_FOR_STAGE2_FOCUSED_GATE`

Report exact head, changed files, exact 17 remaps, invitation-slot proof, 8 localization rows, and verification result.
