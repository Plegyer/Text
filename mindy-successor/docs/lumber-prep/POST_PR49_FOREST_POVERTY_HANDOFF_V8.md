# Post-PR49 Forest / Poverty Handoff v8

Status: selective-integration handoff for Chat 3 queue items 233–243.

Worker branch:
`chat3/lumber-production-proof-next`.

Current-main baseline:
`d383a2282a15eb4ebc1bbb2fef2bbf9f3f2087fe`
(PR #49 merged).

Integration rule:
**do not merge this long-lived worker branch wholesale**.

Use fresh branches from exact current `main` and selectively copy/apply only the files below.

No shared runtime/schema/UI source file is modified by this wave.

---

# SAFE_TEXT_PATCH

## 233 — post-PR49 poverty text rebase audit

File:
`docs/poverty-prep/POST_PR49_POVERTY_TEXT_REBASE_AUDIT_V3.md`.

Result:
- CLEAN_APPLY: 33
- SUPERSEDED: 0
- CONFLICT: 0

PR #49 did not change any of the 33 ordinary-poverty text keys.

## 234 — post-PR49 poverty text delta

File:
`prior-work/astra/prototype-m3.2/content/poverty-copyedit-post-pr49-v5.fixture.json`.

Contains exactly:
- 33 existing localization keys;
- RU+EN replacements;
- no new keys;
- no media keys;
- no gameplay fields;
- no Secret Debt.

Selective application:
merge only `strings` values into the matching current-root keys.

## 235 — natural-path expectations

File:
`prior-work/astra/prototype-m3.2/content/poverty-copyedit-natural-path-v3.fixture.json`.

Maps all 33 changed keys to exact current:
- production pack;
- event;
- reaction point;
- event conditions;
- representative variant;
- variant conditions;
- choice/effects where applicable;
- expected RU+EN text.

Creates no gameplay content.

### Exact selective-copy set A

Copy:
- `docs/poverty-prep/POST_PR49_POVERTY_TEXT_REBASE_AUDIT_V3.md`;
- `prior-work/astra/prototype-m3.2/content/poverty-copyedit-post-pr49-v5.fixture.json`;
- `prior-work/astra/prototype-m3.2/content/poverty-copyedit-natural-path-v3.fixture.json`;
- prior regression support:
  `prior-work/astra/prototype-m3.2/tests/poverty-copyedit-final-delta-v2.test.ts`.

Then:
1. apply only the 33 exact-key text replacements;
2. run ordinary-poverty localization/natural-path/reload coverage;
3. run full check;
4. require exact-head CI.

This patch is independent of the Forest route seam.

---

# SHARED_UI_REQUIRED

## 236 — post-PR49 key audit

File:
`docs/poverty-prep/SHARED_NIGHT_LODGING_POST_PR49_KEY_AUDIT_V5.md`.

Result:
- ADDITIVE: 20
- IDENTICAL: 0
- CONFLICT: 0
- REUSE_EXISTING: 4

No new exact-key conflict exists after PR #49.

Reuse existing:
- `ui.panel.sleep`;
- `ui.town.sleep.subtitle`;
- `ui.town.noEnergyPrompt`;
- `ui.work.coins`.

## 237 — final shared Night/lodging fixture

File:
`prior-work/astra/prototype-m3.2/content/poverty-shared-ui-localization-v4.fixture.json`.

Contains the final safe 20-key RU+EN additive presentation patch.

No:
- NightFlow mechanics;
- lodging-cost changes;
- Energy-mechanic changes;
- housing-mechanic changes;
- Save changes;
- Secret Debt content.

## 238 — exact consumer fixture

File:
`prior-work/astra/prototype-m3.2/content/shared-night-lodging-consumer-map-v1.fixture.json`.

Maps every item-237 key to the exact current UI fallback/consumer seam.

Current UI source:
`src/ui/app.ts`
SHA:
`312399d01b211f13c29017c1e17b61f2027d21b3`.

Consumer coverage includes:
- LodgingResolution eyebrow/prompt;
- next-day Energy suffix;
- VoluntaryNightChoice title/prompt/context/action;
- generic Night fallback;
- Night panel;
- result-to-lodging button;
- town lodging summary;
- lodging labels;
- housing labels;
- `night.sleep`.

`nightChoice.night.sleep.label` already has the generic
`localizedNightChoiceLabel(...)`
lookup seam.

### Exact selective-copy set B

Copy:
- `docs/poverty-prep/SHARED_NIGHT_LODGING_POST_PR49_KEY_AUDIT_V5.md`;
- `prior-work/astra/prototype-m3.2/content/poverty-shared-ui-localization-v4.fixture.json`;
- `prior-work/astra/prototype-m3.2/content/shared-night-lodging-consumer-map-v1.fixture.json`;
- optional prior copy review:
  - `docs/poverty-prep/SHARED_NIGHT_LODGING_RU_COPY_REVIEW_V1.md`;
  - `docs/poverty-prep/SHARED_NIGHT_LODGING_EN_PARITY_REVIEW_V1.md`.

Lead/Chat 1 still owns UI wiring.

Do not rename/change:
- NightFlow phase IDs;
- lodging IDs;
- housing values;
- command types;
- costs;
- next-day Energy mechanics;
- Save fields.

---

# ROUTE_PRESENTATION_READY

## 239 — post-PR49 Forest route baseline

File:
`docs/lumber-prep/FOREST_ROUTE_POST_PR49_BASELINE_V2.md`.

Exact current findings:
- Activity remains `lumber.forest`;
- current routes remain:
  - `forest.route.logging-road`;
  - `forest.route.old-boundary`;
- UI still requests shared:
  `activity/forest/route/default`;
- current root presentation has no:
  - default active-route slot;
  - logging-road route slot;
  - old-boundary route slot;
- PR #49 refined Forest result/return static media only;
- route-specific seam remains missing.

Current old-boundary gate remains:
`itemCapability(enter_old_boundary) present=true`.

## 240 — final route presentation fixture

File:
`prior-work/astra/prototype-m3.2/content/forest-route-presentation-final-v5.fixture.json`.

Contains 16 additive presentation keys:
- 10 route scene/reaction strings;
- 2 optional route help keys;
- 4 normalized route alt/caption keys.

Current route labels are references only and stay unchanged.

Semantic presentation mapping:

`logging-road`
-> `activity/forest/route/logging-road`.

`old-boundary`
-> `activity/forest/route/old-boundary`.

Current-root collisions:
0.

## 241 — current-main collision regression

File:
`prior-work/astra/prototype-m3.2/tests/forest-route-current-main-collision-v2.test.ts`.

Validates:
- exact two shipped route IDs only;
- route states exact;
- 16 proposed keys remain additive;
- alt/caption keys satisfy normalized key syntax;
- current route labels are references, not replacements;
- no gameplay fields;
- no Hunter/token/challenge semantics;
- old-boundary gameplay gate remains exact.

Test authored only; this handoff does not claim it was executed.

## 242 — seam executable acceptance fixture

File:
`prior-work/astra/prototype-m3.2/content/forest-route-seam-acceptance-v2.fixture.json`.

For both current routes records:
- exact route ID;
- exact route state;
- authoritative conditions;
- derived semantic presentationId;
- Save invariance fields;
- global RNG invariance;
- Activity RNG invariance;
- exact success/escape/failure identities;
- exact `activityResult` continuations;
- exact Lumber Hard Work invariant.

### Exact result continuations

Success:
`activityResult(lumber.forest, success, lumber.forest.success)`.

Escape:
`activityResult(lumber.forest, escape, lumber.forest.escape)`.

Failure:
`activityResult(lumber.forest, failure, lumber.forest.failure)`.

### Lumber Hard Work

Must remain:
- eligibility ONLY `completed_shifts >= 50`;
- Meta reward exactly `hardWork:lumber`.

### Exact selective-copy set C

Copy:
- `docs/lumber-prep/FOREST_ROUTE_POST_PR49_BASELINE_V2.md`;
- `prior-work/astra/prototype-m3.2/content/forest-route-presentation-final-v5.fixture.json`;
- `prior-work/astra/prototype-m3.2/tests/forest-route-current-main-collision-v2.test.ts`;
- `prior-work/astra/prototype-m3.2/content/forest-route-seam-acceptance-v2.fixture.json`;
- useful prior invariance support:
  - `prior-work/astra/prototype-m3.2/content/forest-route-locale-invariance-v1.fixture.json`;
  - `prior-work/astra/prototype-m3.2/content/forest-route-presentation-natural-path-v1.fixture.json`;
  - `docs/lumber-prep/FOREST_ROUTE_RESULT_CONTINUATION_INVARIANT_MATRIX_V2.md`;
  - `docs/lumber-prep/FOREST_ROUTE_PRESENTATION_ACCEPTANCE_CHECKLIST_V2.md`.

Lead/Chat 1 must still implement the shared route-state -> presentationId consumer seam.

Presentation lookup must:
- occur after authoritative route selection;
- mutate no gameplay Save;
- advance neither global nor Activity RNG;
- alter no route availability;
- alter no progress/endurance;
- alter no result identity.

---

# OWNERSHIP / COLLISION SAFETY

## 243 — shared ownership delta audit

File:
`docs/lumber-prep/POVERTY_FOREST_SHARED_OWNERSHIP_DELTA_AUDIT_V2.md`.

Post-PR49 results:
- poverty patch exact-root overlaps: 33, all intentional same-domain text replacements;
- shared Night/lodging exact-root overlaps: 0;
- Forest route exact-root overlaps: 0;
- real cross-owner collisions: 0.

No exact collision with:
- School-owned localization;
- Foreman-owned localization;
- `presentation.static.*`;
- legacy root `media.*`;
- current route-label ownership.

Current route-specific root presentation slots:
none.

### Exact selective-copy set D

Copy:
- `docs/lumber-prep/POVERTY_FOREST_SHARED_OWNERSHIP_DELTA_AUDIT_V2.md`.

Use as collision/ownership gate before applying sets A–C.

---

# PR49 STATIC-MEDIA BOUNDARY

PR #49 refined active Forest result/return static media.

Current active result/return sources include:
- `forest-return-success-v2.svg`;
- `forest-reaction-success-v2.svg`;
- `forest-return-escape-v2.svg`;
- `forest-reaction-escape-v2.svg`;
- `forest-return-failure-v2.svg`;
- `forest-reaction-failure-v2.svg`.

Chat 3 route-presentation work does not overwrite those slots or their
`presentation.static.*`
localization.

Route presentation and result/reaction presentation remain separate concerns.

---

# PRODUCT_OPEN

Items 233–243 do not close any Product-open Forest decisions.

## Hunter route

Still open:
- production route ID;
- route state;
- access source;
- clue/fact/capability;
- provider;
- threshold;
- reward;
- challenge/season binding.

No Hunter production route is created.

## Old Boundary Token

Current authority only:
`itemCapability(enter_old_boundary) present=true`.

Still open:
- acquisition;
- price;
- provider;
- consume/retain/turn-in;
- deeper use/lore.

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
- public fact/result;
- provider;
- threshold;
- exact interpretation.

## Seasonal topology

Still open:
- route closures;
- shortcuts;
- frozen passage;
- mechanical seasonal costs/rewards.

## Deeper lore

Still open:
- meaning/creator of old boundary marks;
- anomaly truth;
- Hunter provenance;
- deeper route outcome/reward.

---

# SAFE_TEXT_PATCH / SHARED_UI_REQUIRED / ROUTE_PRESENTATION_READY / PRODUCT_OPEN SUMMARY

## SAFE_TEXT_PATCH
Ready independently:
- item 233 audit;
- item 234 33-key final text delta;
- item 235 natural-path expectation map.

No shared seam required.

## SHARED_UI_REQUIRED
Data ready:
- item 236 audit;
- item 237 20-key final fixture;
- item 238 exact current consumer map.

Lead-owned UI wiring still required.

## ROUTE_PRESENTATION_READY
Content/acceptance source ready:
- item 239 baseline;
- item 240 final route presentation fixture;
- item 241 collision regression;
- item 242 seam acceptance fixture.

Shared route presentation seam still required.

## PRODUCT_OPEN
Still blocked from invention:
- Hunter;
- Old Boundary Token semantics;
- challenge mechanics;
- School Arcana authority;
- seasonal topology;
- deeper lore.

---

# Branch policy

Never merge the entire Chat 3 branch.

Use fresh current-main branches and selective copy/application only.

# Handoff conclusion

The post-PR49 Chat 3 payload now cleanly separates:
- safe ordinary-poverty text updates;
- additive shared Night/lodging localization plus exact consumer seams;
- additive Forest route presentation/localization plus executable seam expectations;
- unresolved Product decisions.

The remaining implementation work belongs to Lead-owned shared UI/presentation wiring or explicit Product decisions.
