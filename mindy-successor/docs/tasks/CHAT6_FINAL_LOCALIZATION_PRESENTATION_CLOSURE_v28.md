# Chat 6 — Final Localization / Presentation Closure v28

Status: **READY_FOR_LEADER_REVIEW**  
Owner: Chat 6  
Branch: `chat6/final-localization-presentation-closure-v28`

Scope: final 1.0 localization/presentation audit only.

No runtime change.  
No mechanics change.  
No reward/gate change.  
No full CI.

---

## 1. Executive disposition

The accepted/frozen producer layers are substantially localization-closed.

There is **no new P0 authoring defect** in:

- ordinary-career ending localization v26;
- Secret Debt ending localization v27;
- Activity D38 v17;
- Palace v19;
- current D42 Night assembly;
- accepted global presentation v23 alt coverage;
- accepted lumber-stay retirement v17.

The remaining concrete localization/presentation authoring gap is:

- **2 missing generic caption keys** used by v23.

Two additional Night labels are safe but remain optional RU/EN tone-alignment polish.

The main release risk is integration, not missing authored content: the v28 audit branch is intentionally **not a cumulative release assembly**. Its shared JSON files do not contain all accepted producer layers at once. A release candidate must assemble the accepted layers selectively by key / slot and must not wholesale replace newer shared files with any one producer snapshot.

---

## 2. Git-backed audit snapshots

### Current v28 seed

Audited blobs:

- `content/localization.json` — `65568847f09df4997fffc6facb7dc7907a10c872`
- `content/presentation.json` — `2adff5582cb9cf9c755b952c35fafb7e0ae6702b`
- `content/definitions.json` — `45d4287be3db6a828a4bd8b71825ff23e7f7bc31`

Observed:

- localization entries: **3288**
- localization rows missing RU: **0**
- localization rows missing EN: **0**
- explicit presentation slots: **381**
- current ending definitions: **43**

The v28 seed still shows the pre-v26/pre-retirement catalog shape. A direct audit of those 43 ending definitions finds **39** with at least one missing live localized title/description/epilogue field.

That is **not a new v28 authoring finding**. Those missing surfaces are already closed by accepted producer layers, especially v26 and lumber-stay retirement v17. The seed therefore must not be treated as a release candidate by itself.

---

## 3. Ordinary endings v26 — PASS

Audited accepted v26 localization blob:

`b355f08650cc1cdbb0d08e07529382c1afb0605c`

Observed:

- localization entries: **3352**
- canonical ordinary-career endings checked: **40**
- missing bilingual title/description/epilogue coverage: **0**

Also confirmed:

- `ending.guild-life.epilogue` — bilingual
- `ending.scholar-life.epilogue` — bilingual
- Merchant wrong-route RU fixes are present
- seven Merchant consequence-parity fixes are present
- the six disconnected single-prefix Merchant / Artist Hard Work duplicate rows are removed

No new v28 repair is required in this layer.

---

## 4. Secret Debt v27 — PASS

Audited accepted v27 localization blob:

`80c1bf3e41c31ca57e7837c3b73c0d6f7e8a66ae`

All nine live runtime ending localization keys are bilingual:

### Paid Freedom

- `ending.ending.secret-debt.paid-freedom.title`
- `ending.ending.secret-debt.paid-freedom.description`
- `ending.ending.secret-debt.paid-freedom.epilogue`

### Bound Life

- `ending.ending.secret-debt.bound-life.title`
- `ending.ending.secret-debt.bound-life.description`
- `ending.ending.secret-debt.bound-life.epilogue`

### Takeover

- `ending.ending.secret-debt.takeover.title`
- `ending.ending.secret-debt.takeover.description`
- `ending.ending.secret-debt.takeover.epilogue`

No Secret Debt localization repair is required.

Important integration note: v27 is a selective localization producer and is not cumulative with v26. Do not replace a newer `localization.json` wholesale with the v27 snapshot.

---

## 5. D42 Night current assembly — PASS, v25 caption finding superseded

Audited current D42 assembly:

`chat2/assembly-d42-night-current-main-20261004-v1`

Blobs:

- localization — `9281d3880d01c54f352effa5e372ad5393cc3eaa`
- presentation — `e800d2b16f2bc868273e39d45718dcd0c7fe74a5`

Relative to the v28 seed:

- localization: **3398**, exactly **+110** rows
- presentation slots: **393**, exactly **+12** slots
- changed existing localization rows: **0**
- removed localization rows: **0**
- localization rows missing RU: **0**
- localization rows missing EN: **0**

The twelve Night presentation alt keys all have matching bilingual captions in the current D42 assembly.

Therefore the old v25 finding that D42 was missing 12 caption pairs is **superseded**.

The following caption keys now exist and are bilingual:

- `presentation.static.lumber.night.foreman-social.caption`
- `presentation.static.hunter.night.field-debrief.caption`
- `presentation.static.hunter.night.senior-guide.caption`
- `presentation.static.guard.night.case-debrief.caption`
- `presentation.static.guard.night.partner.caption`
- `presentation.static.merchant.night.ledger-plan.caption`
- `presentation.static.merchant.night.supplier.caption`
- `presentation.static.assassin.night.handler-contact.caption`
- `presentation.static.prostitute.night.personal-continuation.caption`
- `presentation.static.satyr-maid.night.recurring-guest-private.caption`
- `presentation.static.tavern.night.traveler-private.caption`
- `presentation.static.prostitute.night.client-private.caption`

No D42 caption repair remains.

---

## 6. Activity D38 v17 — PASS

Audited blobs:

- localization — `4449ca46ad6580ca5f36adf140e9e1e14a007b64`
- presentation — `b6cc4cbce0dd0482cc41eeaf3df90708cb4c5432`
- definitions — `942f9b514f1e512e9bfa08a9e2eda580bcaac872`

All three accepted D38 endings have bilingual:

- title
- description
- epilogue

IDs:

- `ending.activity.pathfinder`
- `ending.activity.preservation`
- `ending.activity.network`

All three explicit ending presentation slots have:

- localized alt
- localized caption

No v28 repair is required.

---

## 7. Palace v19 — PASS

Audited blobs:

- localization — `64922de3b6aab606f9b2932853e6bbd686766b6a`
- presentation — `02c9a19eee0366131f793ed9e141b33a93f213b3`
- definitions — `32762f60ec9bcb6e119b2cc8029d7766d3c0f862`

All four Palace endings have bilingual title/description/epilogue:

- `ending.palace.service-life`
- `ending.palace.court-power`
- `ending.palace.inner-truth`
- `ending.palace.return-home`

All **19** audited Palace presentation slots have bilingual alt and caption coverage.

The accepted v19 reveal ladder / D49 epistemic firewall remains intact. No v28 Palace rewrite is required.

---

## 8. Global presentation v23 — one remaining required closure

Audited v23 presentation blob:

`defe52fe665831a7194e4b7d0df99ae28588207c`

Observed:

- explicit presentation slots: **469**
- referenced unique alt keys: **346**
- referenced alt keys missing RU/EN: **0**
- referenced alt keys missing a matching caption pair: **2**

The two gaps are caused by approved neutral media reuse:

### `night/rent-room/default`

Uses:

- asset: `assets/stage-room.svg`
- alt key: `media.stage.room.alt`

Missing:

- `media.stage.room.caption`

### `night/rest/default`

Uses:

- asset: `assets/stage-town.svg`
- alt key: `media.base.town.alt`

Missing:

- `media.base.town.caption`

The images remain accessible because bilingual alt text exists. This is a strict presentation-caption closure issue, not an inaccessible-image blocker.

---

# 9. P0 — release blockers

## P0-1. Cumulative assembly gate

The exact v28 audit branch is **not** release-complete and must not be shipped as-is.

It does not simultaneously contain all accepted producer layers, including:

- ordinary ending localization v26;
- Secret Debt ending localization v27;
- global presentation v23;
- Activity D38 v17;
- Palace v19;
- lumber-stay retirement v17;
- current D42 Night assembly.

This is an integration blocker, not a request to rewrite accepted content.

Required:

1. assemble accepted layers selectively;
2. merge shared localization rows by key;
3. merge presentation mappings by slot;
4. preserve later D42 caption closure;
5. apply lumber-stay retirement rather than reintroducing the legacy live ending;
6. do not wholesale replace shared `localization.json`, `presentation.json`, or `definitions.json` with an older producer snapshot.

### New P0 authoring gaps

**0**

---

# 10. P1 — required closure

Exactly two localization rows remain to close the strict v23 caption convention.

## P1-1

Add:

`media.stage.room.caption`

Recommended safe parity copy:

- RU: `Сцена дешёвой общей комнаты для ночлега.`
- EN: `Cheap shared-room lodging scene.`

This intentionally matches the already-accepted `media.stage.room.alt`.

## P1-2

Add:

`media.base.town.caption`

Recommended safe parity copy:

- RU: `Условная иллюстрация фэнтезийного города.`
- EN: `A stylized illustration of the fantasy town.`

This intentionally matches the already-accepted `media.base.town.alt`.

No runtime or presentation-engine change is required.

---

# 11. P2 — cleanup / polish

## P2-1. D42 private-conversation label tone alignment

The body, alt, caption, and consent framing are already safe.

Two EN labels remain broader than their RU counterparts:

### Satyr Maid

Key:

`night.satyr-maid.recurring-guest-private.label`

Current:

- RU: `Поговорить с постоянным гостем наедине`
- EN: `Continue privately with the recurring guest`

Polish candidate:

- EN: `Talk privately with the recurring guest`

### Tavern

Key:

`night.tavern.traveler-private.label`

Current:

- RU: `Поговорить с постоянным путешественником наедине`
- EN: `Continue privately with the recurring traveler`

Polish candidate:

- EN: `Talk privately with the recurring traveler`

This is tone parity only. It is not a consent or mechanics blocker.

---

## P2-2. Retired Tavern presentation localization cleanup

The current v28 seed has no live ending definitions or presentation slots for:

- `tavern-stay`
- `tavern-guild`
- `tavern-court`

Yet six old presentation-localization rows remain:

- `presentation.static.ending.tavern-stay.alt`
- `presentation.static.ending.tavern-stay.caption`
- `presentation.static.ending.tavern-guild.alt`
- `presentation.static.ending.tavern-guild.caption`
- `presentation.static.ending.tavern-court.alt`
- `presentation.static.ending.tavern-court.caption`

These are strong dead-live-presentation cleanup candidates.

Remove them only after migration/history tests confirm no compatibility surface deliberately references them.

### Do not blindly remove these yet

Migration-oriented ending copy remains:

- `ending.tavern-stay.title`
- `ending.tavern-stay.description`
- `ending.tavern-guild.title`
- `ending.tavern-guild.description`
- `ending.tavern-court.title`
- `ending.tavern-court.description`

Historical unlock labels also remain:

- `unlock.host.label`
- `unlock.mediator.label`
- `unlock.court.label`

The UI resolves unlock labels dynamically through `unlock.${k}.label`, so historical/meta compatibility is a real reason not to delete those labels without a migration proof.

---

## 12. Lumber-stay retirement v17 — PASS

Audited accepted v17 blobs:

- localization — `b2b3681d298d1c5c307d3031cdcc3b728b8ae7fd`
- presentation — `43af779493c627de82405f54368e950ad7ef8af6`
- definitions — `306c77bcbb72e70023b1055ef389d11108924b0c`

Accepted retirement state:

- no live `lumber-stay` ending definition;
- no live `ending/lumber-stay` presentation slot;
- live Lumber ending IDs remain:
  - `ending.lumber.hard-work`
  - `ending.lumber.forewoman`
  - `ending.lumber.forest`
- old live `ending.lumber-stay.*` / `unlock.vitality.label` localization is replaced by explicit compatibility localization:
  - `legacy.ending.lumber-stay.title`
  - `legacy.ending.lumber-stay.description`
  - `legacy.perk.lumber-stay-vitality.label`

Therefore the old v25 conditional `lumber-stay` policy gap is closed by accepted v17.

Do not re-add a live `lumber-stay` epilogue during assembly.

---

## 13. Live fallback-text audit

The accepted-layer union has authored bilingual copy for the ending families audited here:

- 40 canonical ordinary-career endings — v26
- generic guild-life / scholar-life epilogues — v26
- 3 Secret Debt endings — v27
- 3 Activity endings — v17
- 4 Palace endings — v19

Current D42 assembly has complete bilingual localization for all of its added rows.

Presentation alt coverage is complete across the audited accepted layers.

The only confirmed strict pair gap is the two v23 generic captions listed in P1.

The v28 seed alone still falls back for many endings because it does not include the accepted producer layers. That is why the cumulative assembly gate is P0.

---

## 14. Final repair / assembly order

Recommended release integration order:

1. start from the current Chat 2 assembly line;
2. preserve current D42 `+110` localization and `+12` presentation work, including all 12 Night captions;
3. merge v26 localization changes by key;
4. merge v27 Secret Debt localization by key;
5. merge Activity v17 content/presentation/localization using its accepted stable IDs;
6. merge Palace v19 content/presentation/localization using its accepted stable IDs;
7. merge v23 presentation slot additions selectively;
8. apply lumber-stay retirement v17 so the legacy live ending does not return;
9. add the two P1 generic caption keys;
10. optionally apply the two P2 D42 label tone edits;
11. optionally remove the six stale Tavern presentation localization rows after compatibility tests;
12. run the integration-owned focused localization/presentation validation on the assembled head.

Do not replace a shared JSON file wholesale from any producer branch.

---

## 15. Final closure result

### P0

- **1 integration gate**
- **0 new authoring defects**

### P1

- **2 missing generic caption localization keys**

### P2

- **2 optional D42 EN label tone alignments**
- **6 retired Tavern presentation localization cleanup candidates**

### Closed / PASS

- ordinary ending copy v26
- Secret Debt ending copy v27
- D42 Night event + alt + caption coverage
- Activity D38 v17 ending/presentation coverage
- Palace v19 copy/media/accessibility
- lumber-stay live-surface retirement v17
- Merchant v26 route/parity fixes
- Merchant / Artist single-prefix duplicate cleanup
- global presentation v23 alt coverage

No runtime or mechanics change was made by v28.

**READY_FOR_LEADER_REVIEW**
