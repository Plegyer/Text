# Next production integration gate v15

Status: COMPLETE / CURRENT_GATE_RECORDED

Audit point:
after PR48 seasonal static media merge, with PR49 non-career static refinement open.

Current main:
`4270bbc0d4d1117e1474a5ab9d9380dc350b0d1c`.

Current main CI:
- workflow #77 / id `36344820956`;
- event: push;
- conclusion: SUCCESS;
- validator: 17 packs, 46 events, 35 actions, 9 endings;
- tests: 314 / 314 pass / 0 fail.

This gate summarizes Chat 4 items 187–197.
No whole worker/chat branch is approved for merge.

## 1. PR48 seasonal media

Classification:
`GREEN_POST_MERGE_MAIN`.

Accepted exact head:
`9a3789536b05717a77e576ac79d96eb2cc4f8319`.

Exact-head run #76:
- SUCCESS;
- 314/314;
- validator 17/46/35/9.

Merged as:
`4270bbc0d4d1117e1474a5ab9d9380dc350b0d1c`.

Post-merge main run #77:
- SUCCESS;
- 314/314;
- same validator counts.

Shipped:
- 40 project-owned seasonal SVGs;
- 40 exact existing seasonal presentation IDs;
- 80 RU+EN seasonal alt/caption keys.

No runtime/schema/gameplay architecture change was required beyond the already-shipped PR47 altKey seam.

## 2. Seasonal RU↔EN identity

Classification:
`GREEN`.

For all 40 seasonal rows:
- same presentationId in RU and EN;
- same physical SVG;
- same static selection with animations on/off;
- same locale-neutral altKey;
- only localized accessibility/presentation copy differs.

No media field enters Save or gameplay RNG.

PR48 does not alter action IDs, scene identity, career counters, wages, Energy or action-result mechanics.

## 3. Chat2 non-career safe subset

Classification:
`SAFE_SUBSET_GREEN`.

Current worker source provides:
- 27 current-production static refinements;
- 54 RU+EN alt/caption strings;
- collision regression;
- no route-specific Product-open semantic IDs;
- no staged teacher-specific School IDs.

Exact groups:
- School current lessons/Night refinement: 9;
- ordinary poverty: 10;
- Forest return/reaction: 6;
- Foreman: 2.

Separate safe current-ID source:
- neutral `forest-route-default-v1.svg`;
- maps only to existing `activity/forest/route/default`;
- does not encode logging-road/old-boundary identity.

Route-specific logging-road/old-boundary assets remain excluded from production activation.

### Live PR49 status

PR #49:
`Lead: refine non-career project-owned static media`.

Base:
`4270bbc...`.

Current exact head:
`51e8fba20d5cc0c7d08fa5d7e814a678b4f514ee`.

State:
`OPEN / NOT_MERGED`.

Exact-head workflow #78:
- SUCCESS;
- 317/317;
- validator 17 packs, 46 events, 35 actions, 9 endings.

Relevant tests PASS:
- 27 safe non-career semantic slots use refined project-owned static assets;
- safe non-career refinements preserve semantic identity and animation-mode independence;
- route-specific Product-open Forest assets remain absent from root production.

Because PR49 is not merged, current-main CI floor remains run #77 / 314 tests.

## 4. Poverty 33-key copyedit

Classification:
`GREEN_SAFE_TEXT_PATCH`.

Chat 3 post-PR47 delta:
- 33 exact existing localization keys;
- complete RU+EN;
- missing current-main keys: 0;
- new keys: 0;
- media keys: 0;
- Secret Debt markers: 0.

The final delta deliberately excludes shared-media over-specialization.

No condition/effect/money/item/RNG/NightFlow/housing/Save change.

Safe integration:
selectively replace the 33 existing root localization values on a fresh current-main branch, then run poverty natural-path/locale and full CI.

## 5. Shared Night/lodging localization

Classification:
`SHARED_UI_REQUIRED / ACCEPTANCE_CONTRACT_READY`.

Prepared:
- 20 additive RU+EN presentation keys.

Future consumer must preserve:
- exact lodging IDs;
- exact housing values;
- exact costs;
- exact next-day Energy;
- exact command IDs;
- NightFlow phases;
- Save and gameplay RNG.

Player-facing UI must not expose raw internal `NightFlow`/phase terminology.

Locale switch may change text only.

## 6. Non-Lumber seasonal scene text

Classification:
`GREEN_TEXT_SOURCE / SHARED_CONSUMER_REQUIRED`.

Chat 5 source:
- 36 RU+EN entries;
- nine non-Lumber careers × four seasons;
- exact current seasonal presentation IDs;
- Lumber entries: 0;
- gameplay fields: 0.

PR48 now ships the matching seasonal media identities.

Future text consumer must preserve:
- actionId;
- sceneId;
- presentationId;
- PR48 SVG;
- actionCounts/career counters;
- resource/stat deltas;
- RNG;
- Save.

Hunter remains ordinary `hunter.shift` only.

## 7. Forest route altKey normalization

Classification:
`NORMALIZATION_REQUIRED_BEFORE_ALTKEY_INTEGRATION`.

Chat 3 slash-form localization keys cannot be consumed by the shipped PR47 altKey regex.

Required normalized key shape:
- `presentation.activity.forest.route.logging-road.alt`;
- `presentation.activity.forest.route.logging-road.caption`;
- `presentation.activity.forest.route.old-boundary.alt`;
- `presentation.activity.forest.route.old-boundary.caption`.

Presentation IDs retain slash path form:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`.

Only localization key names normalize; gameplay/presentation identities do not.

## 8. Forest route presentation seam

Classification:
`SHARED_PRESENTATION_WIRING_REQUIRED / EXECUTABLE_GATE_READY`.

Authoritative gameplay remains:
- Activity `lumber.forest`;
- routes `forest.route.logging-road` / `forest.route.old-boundary`;
- Old Boundary gate `enter_old_boundary`;
- exact success/escape/failure result IDs.

Future Lead seam may derive route-specific presentation IDs only after route state is already selected.

Acceptance requires:
- no route availability change;
- no RNG advance;
- no Save mutation;
- same static/media identity across locale;
- same Activity result;
- exact `activityResult` continuation;
- Hard Work still only `completed_shifts >= 50`;
- reward still `hardWork:lumber`.

## 9. Chat5 legacy root bilingual wave

Classification:
`GREEN_SELECTIVE_LOCALIZATION_SOURCE / CHOICE_BODY_UI_DEBT`.

Fixture:
- 109 RU+EN keys;
- 17 exact current root events;
- 16 exact current media IDs;
- missing event/media IDs: 0;
- missing RU/EN: 0;
- gameplay fields: 0.

Ownership overlap with School/poverty/Foreman/Forest/Secret Debt:
`0`.

Current-root collision:
- one exact-identical key `media.base.workshop.alt`;
- non-identical collisions: 0.

Safe now through existing shared renderer:
- event title;
- variant body;
- choice label;
- media alt.

Remaining shared UI debt:
localized post-choice body/journal presentation must not be solved by writing locale-specific prose into gameplay Save.

## 10. Product-open isolation

Still not promoted:
- School exact-course teacher gameplay/routing;
- School management/accounting public-result provider;
- School Arcana/Forest provider/result;
- Hunter Forest route/clue/token semantics;
- Old Boundary acquisition/consume/retain/turn-in;
- Forest challenge thresholds/rewards;
- relationship deeper stages/housing/endings;
- Secret Debt;
- authored Palace content.

Media/text assets cannot authorize gameplay semantics.

## 11. Current integration order from QA state

### Shipped green
- PR43 Forest bilingual result baseline;
- PR44 School bilingual;
- PR45 ordinary poverty bilingual;
- PR46 Foreman bilingual / generic Night label;
- PR47 first project-owned static wave;
- PR48 40 seasonal career static media.

### Open exact-head green, not merged
PR49 non-career static refinement:
`EXACT_HEAD_GREEN / POST_MERGE_PENDING`.

Do not mark current main with PR49 coverage until merge + main push CI exist.

### Ready selective text
Poverty 33-key copyedit:
`READY_FOR_FRESH_MAIN_SELECTIVE_PR`.

### Ready localization source with existing renderer
Chat5 legacy root title/body/choice-label/media-alt:
`READY_FOR_SELECTIVE_ROOT_LOCALIZATION_PR`.

Choice-body/journal remains separate shared-UI debt.

### Consumer-dependent
- shared Night/lodging 20 keys;
- non-Lumber seasonal scene 36 keys.

### Forest route
Before route-specific activation:
1. normalize altKeys;
2. ship/review route-state -> presentationId seam;
3. execute Save/RNG/result/Hard Work invariance gate.

## 12. Current CI floor

Current merged main:
- SHA `4270bbc0d4d1117e1474a5ab9d9380dc350b0d1c`;
- run #77;
- 17 packs / 46 events / 35 actions / 9 endings;
- 314/314 tests.

PR49's 317/317 is exact-head evidence only until merge.

## Final gate verdict

- PR48: `GREEN_POST_MERGE_MAIN`;
- current main: `GREEN`;
- PR49: `EXACT_HEAD_GREEN / NOT_YET_MERGED`;
- Chat2 safe non-career source: `GREEN`;
- poverty 33-key copyedit: `GREEN_SAFE_TEXT_PATCH`;
- shared Night/lodging: `SHARED_UI_REQUIRED`;
- non-Lumber seasonal text: `GREEN_TEXT_SOURCE / SHARED_CONSUMER_REQUIRED`;
- Forest route altKey: `NORMALIZATION_REQUIRED`;
- Forest route seam: `SHARED_WIRING_REQUIRED`;
- Chat5 legacy root localization: `GREEN_SELECTIVE_SOURCE / CHOICE_BODY_UI_DEBT`;
- Product-open content: `ISOLATED`.

No whole worker/chat branch is approved for merge.
