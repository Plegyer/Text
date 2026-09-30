# Chat 1 Developer — queue v5 current-main integration handoff

Status: HISTORICAL — completed queue evidence; current work is governed by `CURRENT_CHAT1_DEVELOPER_TASK_POINTER.md`
Owner: Chat 1 Developer / Integration Developer
Queue: C1D-37..C1D-48
Fresh current-main baseline: `699e0a5ffba4beba969c8e69cf1b0ec2a904a580`
Branch: `chat1/c1d-v5-final-current-main`

Do not merge the earlier working branch `chat1/c1d-v5-current-main-integration`; it was created before the accepted worker wave was merged and is stale as a final delivery base.

## C1D-37 — PR #97 revalidation

PR #97 is no longer only a candidate:
- exact frozen source head: `64c696459daf12f95d667df9303548eb1549b0eb`
- exact-head CI: run #273 / id `36585307807`, SUCCESS
- C4-40 starter-trio gate: PASS
- PR #97 merged into main as `c396780b159897cc0e3ccf70c6284cf815fe4613`

Current main therefore already contains the accepted starter-trio command/UI availability contract. No PR #97 file is duplicate-copied by queue v5.

The broader School-to-Lumber natural publisher gap remains unchanged: no approved production provider/milestone/threshold/publication rule exists for `lumber.school.management-ready`.

## C1D-38 — current-main selective integration prep

The final queue-v5 branch was rebuilt from current main after the worker wave landed.

Already merged and treated as current-main baseline, not cherry-picked:
- PR #97 — starter-trio availability + prior Chat 1 integration;
- PR #88 — starter/School presentation validation;
- PR #90 — School depth preparation;
- PR #93 — starter-career/poverty content preparation;
- PR #98 — late-career presentation validation;
- PR #99 — late-career School preparation;
- PR #100 — content-depth preparation.

Queue-v5 edits are limited to current-main consumer gaps still absent after those merges.

## C1D-39 — Satyr Maid content consumer inventory

Current approved identities:
- career `satyr-maid`
- action `satyr-maid.shift`
- stages `new-maid -> known-face`
- exact seasonal action scene IDs:
  - `spring.default`
  - `summer.default`
  - `autumn.default`
  - `winter.default`
- exact existing seasonal/result presentation IDs already shipped.

Safe current consumer:
- engine already stores the selected source-scene text in `run.lastAction.text`;
- UI can recover the exact existing scene by matching that stored source text to the action's authored scene and then resolve `action.satyr-maid.shift.scene.<sceneId>.text`;
- this requires no Save field, RNG selector, event ID, relationship state, reputation counter or threshold.

Approved player-facing content selected for this consumer:
- merged `satyr-maid-service-content-v1.fixture.json`
- exactly four `action.satyr-maid.shift.scene.<sceneId>.text` RU/EN strings.

Not consumed:
- boundary/reputation depth variants from PR #93/#100 because their fixtures explicitly add no runtime selector and current gameplay has no persistent guest/flirt/boundary/reputation identity.

Existing repeatability/progression limitations remain outside this task.

## C1D-40 — Undead Farm content consumer inventory

Current approved identities:
- career `undead-farm`
- action `undead-farm.shift`
- stages `new-hand -> reliable-helper`
- exact seasonal action scene IDs:
  - `spring.default`
  - `summer.default`
  - `autumn.default`
  - `winter.default`
- exact existing seasonal/result presentation IDs already shipped.

Safe current consumer:
- same generic action-scene localization seam as Satyr Maid;
- no research fact, specimen item, successor state, external Activity hook, relationship, world fact or threshold is required.

Approved player-facing content selected for this consumer:
- merged `undead-farm-research-agriculture-content-v1.fixture.json`
- exactly four `action.undead-farm.shift.scene.<sceneId>.text` RU/EN strings.

Not consumed:
- research-magic / successor / external depth variants from PR #93/#100 because their handoffs explicitly add no runtime selector or durable Farm research/successor/external identity.

## C1D-41 — starter-career content presentation seam

Implemented one generic current UI seam in `src/ui/app.ts`:
- direct action results now identify the exact authored action scene from the stored source text;
- localization resolves `action.<actionId>.scene.<sceneId>.text`;
- missing keys fall back to the stored source text;
- event-choice outcomes and School result routing keep their existing precedence;
- no new gameplay identity, Save field, RNG rule or presentation ID is created.

Implementation commit:
- `c0c5f2945ac57034b48f7a2908171158229aea94`

## C1D-42 — QA-accepted Chat 2 starter/School presentation candidate

Source PR #88 is QA-accepted and merged.

Selective integration result: CURRENT-MAIN NO-OP.
- PR #88 added presentation inventories/manifests/tests only;
- C4-37 independently verified the selected current production bindings/accessibility against main with zero mismatches;
- current main already owns the production presentation registry/assets required by the runtime slice;
- no duplicate manifest/test copy is required in this integration PR.

## C1D-43 — QA-accepted Chat 2 late-career presentation candidate

Source PR #98 is QA-accepted and merged.

Selective integration result: CURRENT-MAIN NO-OP.
- candidate adds audit/manifest/tests only;
- C4-43 verified all 35 selected late-career current bindings remain valid on main;
- no production presentation/media artifact remains missing for the assigned shift/result surface;
- no gameplay change is authorized.

## C1D-44 — QA-accepted Chat 5 School depth candidate

Source PR #90 is QA-accepted and merged.

Selective integration result: CURRENT-MAIN NO-OP.
- its six depth fixtures remain `CONTENT_PREP_ONLY`;
- all selected milestone/threshold fields remain null;
- the handoff explicitly states exact-course teacher/lesson reactive routing is still absent from shared runtime;
- fixture-local strings therefore remain preparation evidence until a safe exact-course consumer is separately approved.

No root-localization promotion or selector was invented.

## C1D-45 — QA-accepted Chat 5 late-career School candidate

Source PR #99 is QA-accepted and merged.

Selective integration result: CURRENT-MAIN NO-OP.
- all seven career preparation mappings keep `selectedThreshold=null` and `selectedPublicFactId=null`;
- teacher-transfer and Night-study depth are fixture-local preparation;
- the handoff explicitly says no runtime consumer or School-to-career producer identity is created;
- missing provider/milestone/public-result/consumer identities remain gaps.

No School producer, threshold, teacher relationship, curriculum, NightFlow rule or new selector was invented.

## C1D-46 — QA-accepted Chat 3 starter-career/poverty candidate

Source PR #93 is QA-accepted and merged.

Selective integration closes one real shared UI/localization gap:
- promoted only the four Satyr Maid service-scene and four Undead Farm agriculture-scene RU/EN strings whose exact current action/scene IDs already exist;
- did not promote presentation-only variants with no selector;
- generic C1D-41 seam displays those exact current scene strings.

Localization commit:
- `b8230adc56ace54559b02402df5cc7953200922a` (shared with C1D-47 localization additions)

Focused consumer regression:
- `tests/starter-career-content-consumer.test.ts`
- commit `b2dc597e1e4826928000ecdbb66d6422c4e9da1b`

## C1D-47 — QA-accepted Chat 3 content-depth candidate

Source PR #100 exact head `339ad87431bff58293cede198eeb22753ee31272` received C4-45 PASS-WITH-NOTES and is merged into current main as `699e0a5ffba4beba969c8e69cf1b0ec2a904a580`.

Selective integration consumes only the material whose own handoff names an existing runtime consumer:
- `ordinary-poverty-seasonal-survival-depth-v1.fixture.json`
- `ordinary-poverty-recovery-contact-depth-v1.fixture.json`
- both specify `consumer = existing poverty depth presentation selector`, append-only, with core fallback and occurrence rotation preserved.

Integrated:
- 16 RU/EN poverty depth strings into root localization;
- append-only 16 localization keys onto the existing 20 event/variant lookup entries in `src/ui/povertyDepth.ts`;
- no event/choice/effect identity changes;
- occurrence rotation remains deterministic by existing event-history count.

Not consumed:
- Forest seasonal/result depth: its own handoff says `runtimeSelectorAdded=false` and current route/help/result content remains authoritative;
- Satyr Maid v2 / Undead Farm v2 presentation variants: their own handoffs add no runtime selector;
- Secret Debt audit: all Product values remain OPEN and no Secret Debt runtime is authorized.

Selector commit:
- `0b080452fba7581be8bb4fad3fd2690c97491921`

Regression update:
- `4366dad012af5478a2cfb2cc76427312daa3054f`

Root localization commit shared with C1D-46:
- `b8230adc56ace54559b02402df5cc7953200922a`

## C1D-48 — candidate gate

Candidate composition is intentionally narrow:
- current main already supplies the accepted starter-trio availability contract and all merged worker handoffs;
- queue-v5 diff contains only:
  - generic multi-scene action localization consumer;
  - 8 approved starter-career scene strings;
  - 16 approved append-only poverty depth strings;
  - append-only poverty depth lookup additions;
  - focused regressions;
  - this handoff.

Before QA handoff:
- open one focused PR against current main;
- run full repository `mindy-successor check`;
- freeze one exact green head;
- do not move that head except for a concrete CI/QA blocker or explicit Lead request.
