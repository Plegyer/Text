# Post-PR47 Forest / Poverty Handoff v6

Status: selective-integration handoff for Chat 3 queue items 209–219.

Worker branch:
`chat3/lumber-production-proof-next`.

Current-main baseline:
`7f27caca4e3e711799e9c1f235c4a27adbf31026`
(PR #47 merged after PR #46 / PR #45).

Integration rule:
**do not merge this long-lived worker branch wholesale**. Lead should selectively copy reviewed files onto a fresh branch from current `main`.

No shared runtime/schema/UI file is changed by this wave.

---

# SAFE_TEXT_PATCH

## 209 — poverty post-PR47 rebase audit

File:
`docs/poverty-prep/POST_PR47_POVERTY_COPYEDIT_REBASE_AUDIT_V1.md`.

Result:
all **33** item-198 text replacements classify as **CLEAN_APPLY** against exact current main.

Counts:
- CLEAN_APPLY: 33
- CONFLICT: 0
- SUPERSEDED: 0

PR47 did not modify those exact ordinary-poverty localization keys.

## 210 — final post-PR47 poverty delta

File:
`prior-work/astra/prototype-m3.2/content/poverty-copyedit-post-pr47-v3.fixture.json`.

Contains exactly the 33 CLEAN_APPLY RU+EN replacements.

Properties:
- existing keys only;
- no additions/deletions/renames;
- no media-alt keys;
- no gameplay fields;
- no Secret Debt content.

Selective application:
merge only `strings` values into the same current-main localization keys.

## 211 — natural-path expectations

File:
`prior-work/astra/prototype-m3.2/content/poverty-copyedit-natural-path-expectations-v1.fixture.json`.

For each changed key it records:
- current production pack;
- current event ID;
- current `after_lodging` reaction point;
- exact event conditions;
- exact selected representative variant;
- exact choice ID/effects where applicable;
- expected RU+EN text.

This fixture creates no event/variant/choice and changes no gameplay.

### Lead selective-copy set A

Copy:
- `docs/poverty-prep/POST_PR47_POVERTY_COPYEDIT_REBASE_AUDIT_V1.md`;
- `prior-work/astra/prototype-m3.2/content/poverty-copyedit-post-pr47-v3.fixture.json`;
- `prior-work/astra/prototype-m3.2/content/poverty-copyedit-natural-path-expectations-v1.fixture.json`;
- prior regression:
  `prior-work/astra/prototype-m3.2/tests/poverty-copyedit-final-delta-v2.test.ts`.

Then:
1. apply only the 33 exact-key strings;
2. run ordinary-poverty localization/natural-path/reload suites;
3. run full check;
4. require exact-head CI.

No whole localization file replacement.

---

# SHARED_UI_REQUIRED

## 212 — post-PR47 collision audit

File:
`docs/poverty-prep/SHARED_NIGHT_LODGING_POST_PR47_KEY_COLLISION_AUDIT_V1.md`.

Finalized 20-key shared UI fixture status:
- ADDITIVE: 20
- IDENTICAL: 0
- CONFLICT: 0

Existing keys to reuse:
- `ui.panel.sleep`;
- `ui.town.sleep.subtitle`;
- `ui.town.noEnergyPrompt`;
- `ui.work.coins`.

## 213 — UI consumer map

File:
`docs/poverty-prep/SHARED_NIGHT_LODGING_UI_CONSUMER_MAP_V3.md`.

Maps every finalized key to current exact `src/ui/app.ts` seam:
- LodgingResolution eyebrow/prompt;
- next-day Energy text;
- VoluntaryNightChoice title/prompt/context/action;
- generic Night fallback;
- Night panel;
- zero-Energy result bridge;
- town lodging summary;
- lodging labels;
- housing labels;
- `night.sleep` label.

Current code already has a valid generic resolver seam for:
`nightChoice.night.sleep.label`.

### Final source fixture

Use prior finalized file:
`prior-work/astra/prototype-m3.2/content/poverty-shared-ui-localization-v3.fixture.json`.

### Lead selective-copy set B

Copy:
- `docs/poverty-prep/SHARED_NIGHT_LODGING_POST_PR47_KEY_COLLISION_AUDIT_V1.md`;
- `docs/poverty-prep/SHARED_NIGHT_LODGING_UI_CONSUMER_MAP_V3.md`;
- `prior-work/astra/prototype-m3.2/content/poverty-shared-ui-localization-v3.fixture.json`;
- optional source-copy reviews:
  - `docs/poverty-prep/SHARED_NIGHT_LODGING_RU_COPY_REVIEW_V1.md`;
  - `docs/poverty-prep/SHARED_NIGHT_LODGING_EN_PARITY_REVIEW_V1.md`.

Lead/Chat 1 owns UI consumption changes.

Do not rename/change:
- NightFlow phase IDs;
- lodging IDs;
- housing values;
- money cost;
- next-day Energy mechanics;
- commands;
- Save state.

---

# ROUTE_PRESENTATION_SOURCE

## 214 — post-PR47 baseline

File:
`docs/lumber-prep/FOREST_ROUTE_POST_PR47_PRESENTATION_BASELINE_V1.md`.

Exact current findings:
- active Forest UI requests `activity/forest/route/default`;
- current `presentation.json` has no slot for that request;
- current `presentation.json` also has no logging-road / old-boundary route slots;
- PR47 now supplies project-owned static coverage for Forest result/return success, escape and failure;
- route gameplay IDs remain unchanged.

Current routes:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

## 215 — final route localization source

File:
`prior-work/astra/prototype-m3.2/content/forest-route-localization-final-v3.fixture.json`.

Contains **14** RU+EN presentation keys:
- 5 logging-road text/reaction strings;
- 5 old-boundary text/reaction strings;
- logging-road alt + caption;
- old-boundary alt + caption.

Semantic presentation IDs:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`.

No gameplay field is included.

## 216 — route scene variation bank

File:
`docs/lumber-prep/FOREST_ROUTE_SCENE_VARIATION_BANK_V4.md`.

Provides:
- 5 additional logging-road RU+EN presentation variants;
- 5 additional old-boundary RU+EN presentation variants.

They are effect-free presentation candidates only.

No:
- route outcome changes;
- token semantics;
- Hunter semantics;
- challenge mechanics;
- season mechanics.

## 217 — route choice-label polish

File:
`docs/lumber-prep/FOREST_ROUTE_CHOICE_LABEL_POLISH_V1.md`.

Final recommendation:
**KEEP_CURRENT** for both current labels.

Logging road:
- RU: `Лесовозная дорога`;
- EN: `Logging road`.

Old boundary:
- RU: `Старая межевая тропа`;
- EN: `Old boundary path`.

Optional help copy is documented but is not included in the final localization fixture and is not current gameplay.

## 218 — route natural-path expectations

File:
`prior-work/astra/prototype-m3.2/content/forest-route-presentation-natural-path-v1.fixture.json`.

For both shipped routes it records:
- exact route ID;
- exact route state;
- current authoritative conditions;
- proposed semantic presentation ID;
- representative localized route text;
- localized alt/caption;
- exact success continuation:
  `activityResult(lumber.forest, success, lumber.forest.success)`.

Also freezes unchanged result map:
- success -> `lumber.forest.success`;
- escape -> `lumber.forest.escape`;
- failure -> `lumber.forest.failure`.

### Lead selective-copy set C

Copy:
- `docs/lumber-prep/FOREST_ROUTE_POST_PR47_PRESENTATION_BASELINE_V1.md`;
- `prior-work/astra/prototype-m3.2/content/forest-route-localization-final-v3.fixture.json`;
- `docs/lumber-prep/FOREST_ROUTE_SCENE_VARIATION_BANK_V4.md`;
- `docs/lumber-prep/FOREST_ROUTE_CHOICE_LABEL_POLISH_V1.md`;
- `prior-work/astra/prototype-m3.2/content/forest-route-presentation-natural-path-v1.fixture.json`;
- prior acceptance/contract support:
  - `docs/lumber-prep/FOREST_ROUTE_PRESENTATION_ACCEPTANCE_CHECKLIST_V2.md`;
  - `prior-work/astra/prototype-m3.2/tests/forest-route-presentation-contract-v1.test.ts`;
  - `prior-work/astra/prototype-m3.2/tests/forest-route-natural-path-identity-v1.test.ts`.

Shared Lead/Chat 1 work still required:
route-state -> semantic presentationId consumption.

Exact desired mapping:
- `logging-road`
  -> `activity/forest/route/logging-road`;
- `old-boundary`
  -> `activity/forest/route/old-boundary`.

Presentation lookup must not mutate Save or gameplay RNG.

---

# OWNERSHIP_COLLISION_AUDIT

## 219 — localization ownership

File:
`docs/lumber-prep/POVERTY_FOREST_LOCALIZATION_OWNERSHIP_COLLISION_AUDIT_V1.md`.

Findings:
- 33 poverty exact-root overlaps are intentional same-domain text patches;
- shared Night/lodging exact-root collisions: 0;
- Forest route final exact-root collisions: 0;
- proposed exact collisions with shipped School keys: 0;
- proposed exact collisions with shipped Foreman keys: 0;
- proposed exact collisions with PR47 `presentation.static.*`: 0.

Important PR47 boundary:
Chat 3 route media keys use:
`presentation.activity/forest/route/*`
and do not overwrite:
`presentation.static.forest.result.*`.

Final poverty text patch does not edit PR47 static poverty media keys.

---

# PRODUCT_OPEN

Nothing in items 209–219 closes the following.

## Hunter route
Still open:
- gameplay route ID;
- route state;
- clue/fact/capability;
- provider;
- threshold;
- reward;
- challenge/season binding.

## Old Boundary Token
Still open:
- acquisition source;
- price;
- provider;
- consume/retain/turn-in;
- deeper use/lore.

Current authoritative route gate remains only:
`itemCapability(enter_old_boundary) present=true`.

## Forest challenges
Still open:
- production challenge IDs;
- route bindings;
- thresholds;
- progress/endurance values;
- rewards;
- persistence.

## School Arcana
Still open:
- public fact/result identity;
- provider;
- threshold;
- relation to Forest anomaly interpretation.

## Seasonal topology
Still open:
- closures;
- shortcuts;
- winter frozen passage;
- seasonal mechanical costs/rewards.

## Deeper Forest lore
Still open:
- creator/meaning of old marks;
- anomaly truth;
- Hunter provenance;
- deeper route outcome/reward.

---

# Locked invariants

## Forest

Lumber Hard Work:
- eligibility ONLY `completed_shifts >= 50`;
- exact reward `hardWork:lumber`;
- no route/item/School/relationship/challenge prerequisite.

Exact results:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

Exact routes:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

## Poverty

Ordinary poverty remains separate from Secret Debt.

Post-PR47 copyedit:
- text only;
- 33 existing keys;
- same six packs;
- same 14 event identities;
- no RNG/NightFlow/housing/Save change.

## Ownership

Chat 3 must not overwrite:
- School-owned localization;
- Foreman-owned localization;
- PR47 `presentation.static.*` keys.

## Branch policy

Never merge the entire Chat 3 worker branch.

Use fresh current-main integration branches and selective copy/application only.

# Handoff conclusion

Items 209–219 now provide:
- a clean post-PR47 poverty text patch;
- natural-path expectations for every changed poverty key;
- collision-clean shared Night/lodging localization;
- exact current UI consumer seams;
- a post-PR47 Forest route baseline;
- finalized route RU+EN text/media localization;
- route presentation variations and label guidance;
- natural-path presentation expectations;
- explicit localization ownership isolation.

The remaining implementation work is limited to Lead-owned shared UI/presentation wiring or explicit Product decisions.
