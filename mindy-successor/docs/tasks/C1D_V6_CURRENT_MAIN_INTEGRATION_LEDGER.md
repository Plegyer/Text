# Chat 1 Developer — queue v6 current-main integration ledger

Owner: Chat 1 Developer / Integration Developer
Queue: C1D-49..C1D-60
Starting current main: `593f9936d72296557b36a0e0ca7d3c7bb780839c`
Branch: `chat1/c1d-v6-current-main`

## C1D-49 — post-v5 current-main consolidation inventory

### Actually merged before queue v6 start

Current main already contains:
- PR #97 / C1D v4 starter-trio availability and earlier shared integration;
- Chat 2 PR #88 and #98 presentation preparation/validation;
- Chat 5 PR #90 and #99 School preparation;
- Chat 3 PR #93 and #100 content preparation;
- all coordination updates through main `593f9936d72296557b36a0e0ca7d3c7bb780839c`.

### Frozen but not merged at queue-v6 start

PR #106 — C1D v5 current-main content consumer integration:
- exact frozen head `58779c2d1b37394d0d2a6c23ad759b67b88e38f6`;
- repository CI run #314 / id `36687680861`: SUCCESS;
- 456 tests / 456 pass / 0 fail;
- open, non-draft, mergeable;
- no Chat 4 QA acceptance or merge was present at this inventory checkpoint.

PR #106 contains runtime/root-localization changes that are therefore **not** current-main facts yet:
- generic multi-scene action-result localization consumer;
- 8 promoted Satyr Maid / Undead Farm scene strings;
- 16 promoted ordinary-poverty depth strings;
- append-only poverty selector additions;
- focused integration regressions.

Queue-v6 branch deliberately starts from current main and does not copy those frozen PR #106 deltas while QA/merge is pending.

### Still preparation-only / selector gaps on current main

- Chat 5 School depth text has no exact-course reactive presentation selector wired into shared runtime.
- Chat 5 career mappings keep thresholds/public producer facts open.
- Chat 3 Forest seasonal/result depth is fixture-local and declares no runtime selector.
- Chat 3 Satyr Maid v2 / Undead Farm v2 depth variants declare no runtime selector.
- Secret Debt Product values remain open.
- No new late-career unlock threshold values are approved.

## C1D-50 — career-unavailable reason contract audit

Current engine contract:
- `starterCareerIds = lumber, satyr-maid, undead-farm`;
- `actionAvailable()` first evaluates authored `action.conditions`;
- ordinary non-starter `.shift` actions are available only when they have at least one authored condition and all conditions pass;
- empty conditions do **not** mean unlocked for the seven late careers.

Current UI contract:
- `disabled(action)` correctly consumes `actionAvailable()`;
- requirement text is built only from failed authored `action.conditions`:
  `const miss = a.conditions.filter(c => !meets(c,...))`.

Concrete gap:
- every current late-career shift has `conditions=[]`;
- each button is correctly disabled by the starter-lock contract;
- `miss=[]`, so the player receives no reason text for this specific unavailable state.

Conclusion:
- the UI **cannot currently explain** locked-by-missing-authored-unlock-condition without a new generic reason surface;
- no numeric/stat/calendar/year threshold is needed to explain it;
- a safe future message can state only that the career has no authored unlock condition yet;
- C1D-50 itself does not choose or invent any unlock threshold.

C1D-51 will lock the engine behavior with test-only authored conditions, not production values.


## C1D-51 — generic late-career unlock-condition regression seam

Current main already contains the exact focused regression requested by C1D-51 in `tests/starter-trio-availability.test.ts`.

It proves:
- a current late-career shift with `conditions=[]` is unavailable and dispatch is rejected;
- a test-only authored `worldFact` condition is evaluated through the existing condition evaluator;
- before the fact exists, availability is false and dispatch rejects;
- after the fact exists, availability is true and dispatch executes the existing career shift;
- no production stat/calendar/year/threshold value is selected.

Disposition: CURRENT-MAIN NO-OP. No duplicate test was added.

## C1D-52 — Satyr Maid Save/reload regression

Added `tests/starter-career-save-reload.test.ts`.

The Satyr Maid regression:
- begins from the shipped started state;
- dispatches current `satyr-maid.shift`;
- proves career stage `known-face`;
- proves `completed_shifts=1`, `shifts=1`, fact `first-shift-complete`;
- snapshots the existing `lastAction` including the current presentation ID and selected source-scene text;
- round-trips through existing `parseSave` twice;
- requires exact career state and `lastAction` equality after each reload.

No new progression state or Save field is added.

Implementation commit: `c19b7a48118bfe8b0d9b890865baa07b898b7f6a`.

## C1D-53 — Undead Farm Save/reload regression

The same focused test file proves current `undead-farm.shift` survives two existing Save parse/reloads with:
- career stage `reliable-helper`;
- `completed_shifts=1`, `shifts=1`;
- only current fact `first-shift-complete`;
- exact existing `lastAction` persistence.

The regression also asserts no research/specimen/successor/external career fact is introduced by the current shift.

No new Farm research/progression state or Save field is added.

Implementation commit: `c19b7a48118bfe8b0d9b890865baa07b898b7f6a`.


## C1D-54 — starter-career localized result persistence

Dependency checkpoint:
- PR #106 exact head `58779c2d1b37394d0d2a6c23ad759b67b88e38f6` has C4-54 PASS-WITH-NOTES for the selective integration diff;
- PR #106 is still open/unmerged at this checkpoint;
- current main therefore still lacks the generic multi-scene Satyr Maid / Undead Farm localization consumer and its promoted strings.

Disposition at this checkpoint: DEPENDENCY / defer exact C1D-54 UI persistence proof until the QA-accepted #106 consumer is merged into current main. Do not duplicate the frozen #106 implementation into queue v6.

Independent Save persistence for both careers is already covered by C1D-52/53.

## C1D-55 — School exact-course reactive-routing audit

Exact course identity **is available safely to presentation/text consumers without a new Save field**:
- the `schoolLesson` command carries exact `SchoolCourseId`;
- `executeSchoolLesson()` writes the selected course's unique semantic `presentationId` into existing `run.flow.lastAction.presentationId`;
- root UI already recovers the exact `SchoolCourse` with `SCHOOL_COURSES.find(course => course.presentationId === last.presentationId)`;
- the School track counter also records exact `trackId`.

What is not available to the reaction event resolver:
- emitted reaction fact remains generic `{kind:'actionCompleted', action:'school'}`;
- current production School notification packs therefore cannot distinguish exact paid course through reaction facts;
- no exact teacher ID is serialized in Save.

Approved merged Chat 5 material provides a one-to-one content mapping from exact `sourceCourseId` to `teacherContentId` and one transfer body per existing course/teacher.

Conclusion:
- exact-course UI/presentation routing is safe;
- exact-course reaction-event routing is not safe without changing reaction facts;
- C1D-56 must remain a UI/text consumer using the already persisted course presentation identity, not a new gameplay reaction fact or Save field.

## C1D-56 — minimal School reactive consumer

Implemented presentation-only exact-course School reactive text:
- added `src/ui/schoolReactive.ts`;
- mapping contains exactly the eight approved Chat 5 `sourceCourseId -> teacherContentId -> bodyKey` bindings;
- UI keeps the existing exact course title and resolves one approved teacher-transfer body from the exact recovered course;
- fallback remains the previous generic `ui.school.lessonResult` text;
- no course mechanics, tuition, Energy, stat package, School progress, reaction facts, Save fields, thresholds or producer facts change.

Promoted only the eight corresponding approved RU/EN body strings from the merged Chat 5 fixture. The eight fixture title strings remain preparation-only because the existing result title continues to show the exact course label.

Implementation commits:
- `dcf9ca85d3e0f54cec6e57c07704fcd501461eb0` — exact-course binding;
- `7d06e5d8fecb6a3ca0284deefca4ec8fd7ed53ac` — UI consumer;
- `4b605963e07019f4f2e76328abf49a9282c7c844` — eight RU/EN bodies;
- `a068a69270e0ba8585d96f1d581d5e2d1bcb37e0` — focused audit/consumer/browser regression.

The browser regression proves Rhetoric & Social resolves the Cassian transfer body in RU and EN from existing course identity and locale switching does not mutate the serialized Save.
