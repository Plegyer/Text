# Next production integration gate v19

Status: COMPLETE / CURRENT_GATE_RECORDED

Audit point:
after PR54 stable-ref Journal/outcome integration and PR55 shared Night/lodging UI localization.

Current main:
`295e6fc74d235f0b7555794555a18373451e8b7e`.

Current main CI:
- run #99;
- id `36403132544`;
- event: push;
- conclusion: SUCCESS;
- validator: 17 packs, 46 events, 35 actions, 9 endings;
- tests: 342 / 342 pass / 0 fail.

Open PRs at gate time:
none.

This gate summarizes Chat 4 items 235–245.

No whole worker/chat branch is approved for merge.

## 1. PR54 current-head compatibility

Classification:
`GREEN_COMPATIBILITY`.

Accepted exact PR54 head:
`81664ef3cf70e58daaa7b323dd42267971860088`.

Compatibility fixes verified:
- School direct journal producer appends matching null ref;
- legacy `run.journal=` setter keeps refs index-aligned;
- School course-result presentation keeps priority over event-choice refs;
- schema-4 saves without refs load with null refs;
- no fuzzy prose migration.

Stable refs are created only on actual event-choice resolution:
`eventId + choiceId`.

Old text-only entries remain fallback text.

## 2. PR54 exact-head CI

Classification:
`GREEN_EXACT_HEAD`.

Run #96:
- id `36402224927`;
- SUCCESS;
- validator 17/46/35/9;
- 338/338 tests.

Relevant stable-ref/compatibility tests PASS:
- ref storage beside fallback text;
- old schema-4 omission support;
- explicit ref-alignment validation;
- School save/reload/result regressions;
- Journal/lastAction RU↔EN stable-ref Save invariance.

Earlier red head `0a46de81...` remains historical only and is not accepted.

## 3. PR54 post-merge

Classification:
`GREEN_POST_MERGE_MAIN`.

PR54 merged as:
`6e2a5147603b71eed89a0966af417a33dd28d7a7`.

Post-merge run #97:
- SUCCESS;
- 338/338;
- validator 17/46/35/9.

Shipped:
- optional locale-neutral event-choice refs on lastAction;
- parallel journalRefs;
- old-save omission compatibility;
- legacy journal realignment;
- render-time localized Journal/lastAction outcome text.

Gameplay conditions/effects/RNG/content counts are unchanged.

## 4. Shared Night UI 16-key rebase

Initial classification:
`GREEN_REBASED_16_KEY_SOURCE`.

Worker source had 19 post-PR53 keys.

Correct production rebase:
- 16 genuinely additive keys;
- reuse shipped `ui.result.chooseLodging`;
- omit 3 superseded outer Sleep aliases:
  - `ui.night.panel.title`;
  - `ui.night.panel.description`;
  - `ui.night.panel.start`.

The active outer Sleep shell already uses:
- `ui.sleep.title`;
- `ui.sleep.help`;
- `ui.sleep.startButton`.

### Subsequent PR55 integration

Lead shipped the exact rebased slice as PR #55.

Exact head:
`724ab70a5a83424fb8a576c3deb082b60256ffc0`.

Run #98:
- SUCCESS;
- 342/342;
- validator 17/46/35/9.

Merged as current main:
`295e6fc74d235f0b7555794555a18373451e8b7e`.

Post-merge run #99:
- SUCCESS;
- 342/342;
- same validator counts.

Current classification:
`SHIPPED_GREEN`.

## 5. Shared Night natural-path invariance

Classification:
`GREEN_POST_MERGE_MAIN`.

Current exact mechanics remain:

### Normal lodging
- ID `lodging.normal`;
- cost 100;
- housing normal;
- next-day Energy delta 0.

### Cheap lodging
- ID `lodging.cheap`;
- cost 50;
- housing cheap;
- next-day Energy delta 0.

### Street
- ID `lodging.street`;
- cost 0;
- housing street;
- next-day Energy delta -1;
- grooming -1 next-day effect.

### Generic sleep
- ID `night.sleep`;
- next-day Energy delta 0;
- no immediate effect.

PR55 regressions prove:
- exact 16-key presentation-only payload;
- shared Night consumers use stable localization keys;
- RU↔EN shared Night/lodging rendering causes no state drift;
- existing exactly-once lodging/Night behavior remains green.

School Night Study and Foreman Night remain separately owned.

## 6. Forest route pure presentation seam

Classification:
`GREEN_SOURCE / LEAD_IMPLEMENTATION_REQUIRED`.

Authoritative input:
`run.flow.activity.internalState.routeId`.

Required pure mapping:
- null/undefined -> `activity/forest/route/default`;
- `logging-road` -> `activity/forest/route/logging-road`;
- `old-boundary` -> `activity/forest/route/old-boundary`.

Requirements:
- no Save writes;
- no gameplay RNG;
- no Activity RNG;
- no route selection;
- no result mutation;
- locale-neutral output.

Current route gameplay remains:
- `forest.route.logging-road`;
- `forest.route.old-boundary`;
- Old Boundary gate `itemCapability(enter_old_boundary) present=true`.

Exact Forest results/reactions remain unchanged.

Lumber Hard Work remains:
- condition only `completed_shifts >= 50`;
- meta reward `hardWork:lumber`.

## 7. Forest route localization delta

Classification:
`GREEN_ADDITIVE_RU_EN_SOURCE`.

Current Chat3 delta:
- 10 keys;
- logging-road title/body/help/alt/caption;
- old-boundary title/body/help/alt/caption;
- missing RU: 0;
- missing EN: 0;
- current-root collisions after PR55: 0.

Localization keys use normalized dot-form.

Semantic presentation IDs remain slash-form.

The delta changes no:
- route availability;
- conditions;
- effects;
- results;
- reward;
- RNG;
- Save;
- token semantics.

No route-specific root presentation slot is shipped yet.

## 8. Route-specific visual boundary

Logging-road safe visual semantics:
- ordinary logging road/work traces.

Old-boundary safe semantics:
- mossed stones;
- weathered marks;
- old path/line.

Reject route-specific visuals that imply:
- token operation;
- gate/checkpoint;
- Hunter ownership;
- magic activation;
- challenge/reward.

Neutral route/default static remains the safe shipped fallback.

## 9. Animation exporter patch candidate

Classification:
`ACCEPTABLE_FOR_LEAD_INTEGRATION_WITH_NATIVE_CI_CHECK`.

Reviewed Chat2 items 280–291.

Proposed exact devDependencies:
- `sharp@0.35.4`;
- `gifenc@1.0.3`.

Worker package.json/package-lock blobs are identical to current main baseline used by the worker:
no silent dependency mutation.

Exporter properties:
- project-owned local SVG frames only;
- no fetch/download;
- reject URL/scheme;
- reject absolute/traversal paths;
- output only under `assets/gif/`;
- deterministic candidate naming;
- manifest-owned frame order;
- exact timing controls;
- dry-run does not require dependencies.

Security/license review:
- gifenc MIT, acceptable dev-only;
- sharp Apache-2.0/native, acceptable dev-only with exact `npm ci`/install-script/platform verification.

Reproducibility:
same pinned environment must be byte-identical.

Current dependencies remain uninstalled.

## 10. First-three GIF pool acceptance

Classification:
`ACCEPTANCE_CONTRACT_READY / NO_REAL_GIFS_YET`.

Planned first pools:
- Lumber spring;
- Guard summer;
- Tavern autumn.

Each requires exactly 3 real GIFs.

Total first-wave required files:
`9`.

Current actual:
`0 / 9`.

Every candidate must pass:
- GIF87a/GIF89a signature;
- 640×360;
- 4 frames;
- expected delay/loop duration;
- infinite loop;
- file/pool size budgets;
- build copy byte identity;
- project-owned provenance receipt;
- deterministic locale-neutral selection;
- static fallback;
- no gameplay RNG;
- no gameplay Save mutation.

Production 3–5 candidate rule remains locked.

No source SVG sequence counts as a GIF candidate.

## 11. Bilingual coverage after PR54/55

Current root localization:
`556` keys.

Missing RU:
`0`.

Missing EN:
`0`.

Events fully root-localized:
`40 / 46`.

Choice labels:
`59 / 68`.

Choice bodies:
`59 / 68`.

Root media-alt:
`26 / 64`.

PR54:
stable-ref dynamic Journal/lastAction localization shipped.

PR55:
shared Night/lodging presentation shipped.

Project-owned static target:
`80 / 80`.

## 12. Remaining hardcoded visible/source debt

Current app:
`8bc496f8678640e7134730dda943e326a9379fb1`.

Current direct hardcoded RU-bearing source-line count under the documented rule:
`43`.

Largest remaining groups:
- structured condition explanations: 26;
- menu/save/status/error surfaces;
- creation shell;
- event/inactive-run shell;
- active Activity state copy;
- missing-media fallback;
- event inspector.

PR55 removes the former 5-line direct shared Night/lodging RU debt.

One generic Night fallback still exposes raw machine phase text; this remains player-language debt but is not counted as Cyrillic hardcoding.

## 13. Current main CI floor

Current main:
`295e6fc74d235f0b7555794555a18373451e8b7e`.

Run #99:
- SUCCESS;
- 342/342;
- validator 17/46/35/9.

Static:
`80 / 80`.

Next localization/presentation-only PR must not silently regress:
- test count below 342;
- validator counts;
- 556 current root keys;
- 80 active static mappings.

## 14. Current recommended integration order

### Forest route pure seam
`READY_FOR_FRESH_MAIN_LEAD_IMPLEMENTATION`.

Keep code change small and presentation-only.

Then selectively add the 10 route-localization keys.

Do not bundle Product-open Forest mechanics.

### Animation exporter
`READY_FOR_LEAD_TOOLCHAIN_DECISION`.

If approved:
1. fresh current-main branch;
2. copy exporter sources/tests/contracts;
3. add exact devDependencies;
4. regenerate lockfile with npm;
5. verify `npm ci`;
6. smoke export;
7. validate/reproducibility check;
8. full exact-head CI.

Do not activate root GIF pools in the same approval step unless real bytes separately pass pool QA.

### Remaining UI localization
Future slices may target:
- condition explanation formatter;
- creation shell;
- menu/save/status/errors;
- active Activity player-facing wording;
- remaining six event families.

## 15. Product-open isolation

Still unresolved/isolated:
- School exact-course teacher gameplay/routing;
- School management/accounting provider/result;
- School Arcana/Forest provider/result;
- Hunter Forest route/clue/token semantics;
- Old Boundary acquisition/consume/retain/turn-in;
- challenge thresholds/rewards;
- deeper relationship stages/housing/endings;
- Secret Debt;
- authored Palace content.

Presentation/localization/tooling work does not authorize these mechanics.

## Final gate verdict

- current main CI: `GREEN`;
- PR54 stable refs: `SHIPPED_GREEN`;
- PR55 shared Night UI: `SHIPPED_GREEN`;
- shared Night natural-path invariance: `GREEN`;
- Forest route pure seam source: `GREEN / IMPLEMENTATION_REQUIRED`;
- route localization delta: `GREEN_ADDITIVE_SOURCE`;
- route-specific visual activation: `WAIT_FOR_SEAM_AND_SAFE_ASSET`;
- animation exporter candidate: `ACCEPTABLE_WITH_LEAD_APPROVAL_AND_NATIVE_CI_CHECK`;
- first three GIF pools: `0/3 PRODUCTION READY`;
- real GIF candidates: `0/9`;
- project-owned static target: `80/80`;
- full-product bilingual status: `PARTIAL_BILINGUAL`;
- Product-open content: `ISOLATED`.

No whole worker/chat branch is approved for merge.
