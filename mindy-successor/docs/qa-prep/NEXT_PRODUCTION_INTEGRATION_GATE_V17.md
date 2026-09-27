# Next production integration gate v17

Status: COMPLETE / CURRENT_GATE_RECORDED

Audit point:
after PR50 generic Forest route/default static, PR51 ordinary-poverty copyedit, and PR52 legacy root localization integration.

Current main:
`5dffefd15703d431a604b4cc9f831c4e55460aed`.

Current main CI:
- workflow #88;
- run id `36347268518`;
- event: push;
- conclusion: SUCCESS;
- validator: 17 packs, 46 events, 35 actions, 9 endings;
- tests: 329 / 329 pass / 0 fail.

Open PRs at gate time:
`0`.

This gate summarizes Chat 4 items 211–221.
No whole worker/chat branch is approved for merge.

## 1. PR50 generic Forest route/default static

Classification:
`GREEN_POST_MERGE_MAIN`.

Accepted exact PR50 head:
`12aa6fa4a35fdb3e6f15edd13936f0757e394b93`.

Exact-head run #81:
- SUCCESS;
- 320/320;
- validator 17/46/35/9.

Merged as:
`f93878b954385a1c61d8a06a0673354207d11d70`.

Post-merge run #82:
- SUCCESS;
- 320/320;
- same validator counts.

Shipped:
- one project-owned neutral Forest route SVG;
- exact existing `activity/forest/route/default` static slot;
- RU+EN alt/caption;
- no route-specific semantic slot;
- no gameplay/runtime/schema change.

Natural Explore -> `lumber.forest` UI regression proves:
- generic static is displayed before route choice;
- route state remains null;
- serialized Save is byte-identical across RU↔EN;
- Activity envelope remains unchanged;
- image src is unchanged;
- only alt text localizes.

## 2. Established static target closure

Classification:
`ESTABLISHED_TARGET_80_OF_80`.

Current root:
- project-owned static semantic mappings: 80;
- unique active physical project-owned sources: 79;
- physical files under `assets/presentation/`: 89.

Established target:
- 10 career results;
- 40 career seasonal shifts;
- 11 current/reachable School;
- 10 ordinary-poverty;
- 6 Forest return/reaction;
- 2 Foreman;
- 1 generic Forest route/default.

Mapped:
`80 / 80`.

Remaining target gaps:
`0`.

Route-specific:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`
remain outside this target and absent from root production by design.

## 3. Ordinary-poverty 33-key copyedit

Classification:
`GREEN_POST_MERGE_MAIN`.

Chat 3 final source:
- exactly 33 existing keys;
- complete RU+EN;
- no media keys;
- no Secret Debt;
- no gameplay fields;
- 33-row exact natural-path matrix.

Lead integrated the reviewed source as PR #51.

Accepted PR51 head:
`b90099f6bda958053c1325ec250ea07e7f6fb7c7`.

Exact-head run #84:
- SUCCESS;
- 323/323;
- validator 17/46/35/9.

Merged as:
`1a2f6e428da41e356f8d48df4a72923a5cc1928c`.

Post-merge run #85:
- SUCCESS;
- 323/323;
- same validator counts.

Production regressions confirm:
- exactly 33 existing RU+EN text keys;
- ordinary production identity set unchanged;
- text-only scope;
- Secret Debt excluded;
- six-pack natural paths remain locale-invariant;
- poverty pending scene preserves gameplay Save across RU↔EN.

## 4. Legacy root 109-key patch

Classification:
`GREEN_POST_MERGE_MAIN`.

Reviewed source:
- 109 total localization keys;
- 17 exact current event IDs;
- 16 exact current media IDs;
- 26 stable choice-outcome keys;
- complete RU+EN;
- 108 additive + 1 exact-identical against pre-integration root;
- no other-owner overlap;
- no gameplay fields.

PR #52 integration history matters.

### Failed head

Head:
`a47c766725f4b1034aa27c3cb74ce3819dfa4c47`.

Run #86:
- FAILURE;
- 325 tests / 324 pass / 1 fail.

Root cause:
the production regression referenced a missing fixture file:
`content/legacy-root-localization-production-patch-v2.fixture.json`.

This was an exact-head integration-copy/test completeness failure.

### Fixed accepted head

Head:
`eefcdff5f4eb4c0eb4c9f60a91a708b5da49d962`.

Run #87:
- SUCCESS;
- 329/329;
- validator 17/46/35/9.

Relevant production tests PASS:
- exact current event/media identities;
- complete RU+EN / locale-neutral keys;
- additive/identical/reviewed collision policy;
- localization-only payload;
- other-owner namespaces excluded.

Merged as current main:
`5dffefd15703d431a604b4cc9f831c4e55460aed`.

Post-merge run #88:
- SUCCESS;
- 329/329;
- same validator counts.

## 5. Shipped bilingual event coverage after PR52

Current root localization:
`511` keys.

Missing RU:
`0`.

Missing EN:
`0`.

Current root events:
`46`.

Fully root-localized:
`40 / 46`.

Partially localized:
`0`.

Zero root event localization:
`6 / 46`.

Remaining zero-coverage IDs:
- `ds-lumber.first`;
- `ds-lumber.second`;
- `ds-lumber.done`;
- `lumber-cross.school-management-return`;
- `lumber-cross.activity-forest-return`;
- `lumber.career-first-shift`.

Current choices:
- total: 68;
- RU+EN choice-label keys: 59;
- RU+EN choice-body keys: 59.

Root media-alt:
- localized: 26 / 64;
- remaining root media-alt debt: 38 / 64.

These are root-key presence counts and do not by themselves prove every identity is naturally reachable.

## 6. Legacy pending-scene localization

Classification:
`CURRENT_RENDERER_COMPATIBLE / EXECUTABLE_ACCEPTANCE_REQUIRED`.

Current generic pending-scene renderer already localizes by stable:
- event ID;
- variant ID;
- choice ID;
- media identity.

Representative acceptance contract covers:
- `base.arrival`;
- `gopher.tavern-quest`;
- `stage.goblin`.

Required invariant:
RU↔EN changes title/body/choice label/media alt only.

It must not change:
- event/variant/choice IDs;
- allowed-choice snapshot;
- conditions/effects;
- RNG;
- reaction epoch;
- resolver continuation;
- serialized gameplay Save.

PR52 ships the strings; dedicated representative/all-event pending-scene locale-invariance tests remain desirable for future shared acceptance.

## 7. Journal/outcome locale-neutral consumer

Classification:
`SHARED_CONSUMER_REQUIRED / ACCEPTANCE_CONTRACT_READY`.

Current engine still stores embedded source choice prose into:
- Journal strings;
- conditional `lastAction.text`.

PR52 now ships 26 stable bilingual choice-outcome keys, but current Journal/raw lastAction rendering does not generally resolve them from stable identity.

Required future model:
`stable event/choice identity -> localized render`.

Forbidden:
`active locale prose -> gameplay Save identity`.

Old text-only saves must:
- remain readable;
- not be fuzzy-matched back to IDs;
- not be rewritten merely because locale changes.

Mixed old/new history must remain valid.

Locale switching must be read-only:
- no duplicated effects;
- no Journal transaction duplication;
- no RNG draw;
- no resolver rerun.

## 8. Global UI-shell localization source

Classification:
`GREEN_TEXT_SOURCE / SHARED_UI_WIRING_REQUIRED`.

Chat 5 items 85–96 provide:
- 34 stable `ui.*` RU+EN keys;
- 29 additive on current root;
- 5 exact-identical existing root keys;
- 0 conflicts;
- exact consumer map against current `app.ts` blob
  `312399d01b211f13c29017c1e17b61f2027d21b3`.

Safe source domains:
- Explore shell;
- outer Sleep panel;
- Stats shell;
- Journal shell;
- Bag/debt shell;
- Legacy/endings shell;
- pre-arrival shell;
- generic shared controls.

Five existing root keys must be reused rather than duplicated:
- `ui.panel.stats`;
- `ui.panel.journal`;
- `ui.panel.legacy`;
- `ui.town.eyebrow`;
- `ui.result.returnTown`.

Chat3 Night/lodging transaction ownership remains excluded.

Journal shell localization does not solve Journal outcome persistence.

## 9. Remaining hardcoded player-facing app debt

Exact current `app.ts`:
blob `312399d01b211f13c29017c1e17b61f2027d21b3`.

Reproducible source scan:
- Cyrillic-bearing source lines: 64;
- already-localized-only lines: 5;
- remaining direct hardcoded RU-bearing source occurrences: 59.

Classification:
- SHARED_UI_SHELL: 39;
- NIGHT_LODGING: 7;
- ACTIVITY: 3;
- ENDING_LEGACY: 6;
- DEBUG_INTERNAL: 4;
- NON_PLAYER_FACING: 0.

Chat 5 item-94 wiring can close a meaningful subset but does not close:
- character creation;
- structured condition explanations;
- active Activity state labels;
- Chat3 Night/lodging transaction text;
- save/menu lifecycle;
- inactive-run/end confirmation;
- locale-neutral Journal/outcome consumer.

Visible implementation vocabulary should be replaced with approved player copy before broad translation where appropriate.

## 10. Current main CI floor

Current main:
`5dffefd15703d431a604b4cc9f831c4e55460aed`.

Authoritative workflow:
- run #88;
- id `36347268518`;
- SUCCESS.

Validator:
- 17 packs;
- 46 events;
- 35 actions;
- 9 endings.

Tests:
`329 / 329`.

For text/presentation-only work:
- test count must not silently fall below 329;
- gameplay validator counts must remain 17/46/35/9;
- active project-owned static mappings must remain 80;
- static target remains 80/80.

## 11. Forest route-specific presentation

PR50 closes only the generic current route/default fallback.

Route-specific future source remains separate.

Current gameplay stays:
- `forest.route.logging-road`;
- `forest.route.old-boundary`;
- Old Boundary gate `enter_old_boundary`;
- same success/escape/failure results;
- same exact activityResult reactions.

Chat 3 normalized route altKeys are source-ready.

Logging-road route SVG:
`SAFE_AFTER_SEAM`.

Old-boundary route SVG:
`NEEDS_REVISION_OR_EXPLICIT_APPROVAL`
because its constructed central feature is more specific than current stones/marks semantics.

No route-specific root slot is shipped.

## 12. Product-open isolation

Still not promoted:
- School exact-course teacher gameplay/routing;
- School management/accounting public-result provider;
- School Arcana/Forest public result;
- Hunter Forest route/clue/token semantics;
- Old Boundary acquisition/consume/retain/turn-in;
- Forest route challenge/reward topology;
- deeper relationship stages/housing/endings;
- Secret Debt;
- authored Palace content.

Current presentation/localization integrations do not authorize those mechanics.

## 13. Current next integration order

### Shared UI shell

Chat 5 34-key source:
`READY_FOR_FRESH_MAIN_SELECTIVE_UI_PR`.

Lead should:
- root-load 29 additive keys;
- reuse 5 identical current keys;
- wire exact mapped `tr(...)` seams;
- preserve panel/action/Activity/ending IDs and all gameplay state;
- test RU↔EN Save invariance.

### Journal/outcome

`SHARED_RUNTIME_PRESENTATION_WORK_REQUIRED`.

Do separately from shell wiring because it touches compatibility/persistence concerns.

### Night/lodging

Chat3 finalized 20-key source remains:
`SHARED_UI_REQUIRED`.

Keep transaction semantics untouched.

### Non-Lumber seasonal scene text

36-key source remains:
`SHARED_PRESENTATION_CONSUMER_REQUIRED`.

PR48 media is already shipped.

### Forest route-specific

Wait for reviewed route-state -> presentationId seam and safe asset selection.

### Animation

Project-owned frame sources exist, but real GIF export remains blocked until an approved reproducible exporter is integrated.

No production 3–5 GIF pool exists.

## Final gate verdict

- current main CI: `GREEN`;
- PR50 generic route/default static: `SHIPPED_GREEN`;
- project-owned static target: `80/80 CLOSED`;
- PR51 poverty copyedit: `SHIPPED_GREEN`;
- PR52 legacy root localization: `SHIPPED_GREEN`;
- legacy pending-scene strings: `SHIPPED / EXECUTABLE_LOCALE_GATE_DESIRABLE`;
- Journal/outcome dynamic localization: `SHARED_CONSUMER_REQUIRED`;
- global UI-shell source: `GREEN_TEXT_SOURCE / WIRING_REQUIRED`;
- hardcoded app text: `REMAINING_DEBT`;
- route-specific Forest presentation: `SEAM_REQUIRED`;
- full-product bilingual status: `PARTIAL_BILINGUAL`;
- Product-open content: `ISOLATED`.

No whole worker/chat branch is approved for merge.
