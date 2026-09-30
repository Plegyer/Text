# Chat 1 Developer — queue v6 current-main integration handoff

Status: WORKING
Owner: Chat 1 Developer / Integration Developer
Queue: C1D-49..C1D-60
Fresh current-main baseline: `f3a684448b0681c355452b7d24d836e3926cb594`
Branch: `chat1/c1d-v6-final-current-main`

The earlier working branch `chat1/c1d-v6-current-main` started before the accepted worker wave was merged and is not a final delivery source. This branch was rebuilt from then-current main after PR #106, #105, #108 and #109 had been merged.

## C1D-49 — post-v5 current-main consolidation inventory

Actually merged before this fresh queue-v6 branch:
- PR #97: starter-trio availability / Work UI contract;
- PR #106: C1D v5 generic multi-scene action localization + accepted ordinary-poverty depth consumer;
- PR #105: School whole-career transfer/reactive preparation;
- PR #108: Chat 3 Forest/poverty depth v5 preparation;
- PR #109: cross-domain presentation preparation.

PR #106 exact source head `58779c2d1b37394d0d2a6c23ad759b67b88e38f6` received C4-54 PASS-WITH-NOTES before merge. Its runtime/root-localization changes are now current-main facts and are not re-copied by queue v6.

Still preparation-only on current main:
- Chat 3 v5 fixture strings not yet connected to a safe existing selector;
- any Forest `activity_return` prose without a current post-Activity presentation boundary;
- any ordinary-poverty choice-depth text requiring exact variant identity after a choice;
- School threshold/public-result mappings;
- Secret Debt Product values.

## C1D-50 — career-unavailable reason contract audit

Engine:
- `starterCareerIds = lumber / satyr-maid / undead-farm`;
- `actionAvailable()` evaluates authored action conditions;
- ordinary non-starter `.shift` actions with `conditions=[]` remain unavailable.

UI:
- `disabled(action)` correctly uses `actionAvailable()`;
- requirement prose is generated only from failed authored `action.conditions`.

Gap:
- all seven late-career shifts currently have `conditions=[]`;
- their Work buttons are correctly disabled, but the UI has no failed condition to explain;
- therefore current UI cannot provide a specific unlock reason without an additional generic copy surface.

No threshold/stat/calendar/year value is inferred or authored.

## C1D-51 — generic late-career unlock-condition regression seam

Disposition: CURRENT-MAIN NO-OP.

Current `tests/starter-trio-availability.test.ts` already proves:
- empty conditions do not make a late ordinary career available;
- a test-only authored world-fact condition is evaluated by the existing condition evaluator;
- dispatch remains blocked before that condition and succeeds after it;
- no production threshold value is selected.

No duplicate regression was added.

## C1D-52 — Satyr Maid Save/reload regression

Added `tests/starter-career-save-reload.test.ts`.

A real current `satyr-maid.shift` is required to preserve through two existing `parseSave` reloads:
- stage `known-face`;
- `completed_shifts=1`;
- `shifts=1`;
- fact `first-shift-complete`;
- exact existing `lastAction` including source-scene text and presentation ID.

No new progression or Save state is created.

## C1D-53 — Undead Farm Save/reload regression

The same focused regression requires a real current `undead-farm.shift` to preserve through two reloads:
- stage `reliable-helper`;
- `completed_shifts=1`;
- `shifts=1`;
- fact `first-shift-complete`;
- exact existing `lastAction`.

It additionally asserts no research/specimen/successor/external career fact appears.

## C1D-54 — starter-career localized-result persistence

Added `tests/starter-career-localized-result-persistence.test.ts`.

The existing PR #106 generic multi-scene result consumer is exercised after Save parse/reload for:
- Lumber;
- Satyr Maid;
- Undead Farm.

Current exact behavior:
- Satyr Maid and Undead Farm use their merged RU/EN `action.<id>.scene.<scene>.text` strings;
- Lumber currently has no root action-scene localization key and therefore intentionally uses the existing source-text fallback;
- switching RU/EN does not mutate the serialized Save.

No new Lumber text is authored.

## C1D-55 — School exact-course reactive-routing audit

Current main safely exposes exact selected course identity to presentation/text consumers:
- each paid lesson persists the exact `SchoolCourse.presentationId` in existing `lastAction.presentationId`;
- UI recovers the unique current course by matching that presentation ID against `SCHOOL_COURSES`;
- `schoolTeacherReactionBinding(course.id)` provides the static authored course→teacher/text mapping.

Boundary:
- exact course identity is persisted through an existing field;
- teacher identity is a static authored mapping, not new Save or relationship state;
- no milestone, threshold, certificate, career fact or publisher is inferred.

Focused regression: `tests/school-reactive-current-main.test.ts`.

## C1D-56 — minimal School reactive consumer

Disposition: CURRENT-MAIN CONSUMER ALREADY PRESENT; regression added rather than duplicating code.

Current main already renders `schoolReactiveBody(course)` on the School result surface, backed by the eight exact course mappings and merged bilingual Chat 5 teacher-transfer body strings.

The focused regression proves:
- exact course presentation identity survives Save reload;
- all eight current courses map to authored bilingual reaction text;
- a real Rhetoric & Social lesson renders the Cassian Reed transfer body in RU and EN;
- locale switching does not mutate Save.

No School mechanics, threshold, relationship state or producer fact is added.

## C1D-57 — Forest depth selective consumer

QA source:
- merged PR #108;
- exact accepted worker head `66fb6bba3c679e77db36ce68101815d2c54446e7`;
- C4-56 PASS-WITH-NOTES.

Selected current-safe content only:
- all eight seasonal route strings from the existing `logging-road` / `old-boundary` route identities;
- six `result_event` strings attached to the existing success / escape / failure result events.

Runtime/UI seam:
- `src/ui/forestDepth.ts` selects route prose by existing route ID + existing calendar season;
- result prose rotates by existing result event ID + existing event-history count;
- `src/ui/app.ts` keeps the current entry/result text as fallback.

Not consumed:
- `activity_return` variants because current runtime has no separate persisted post-Activity return surface before resolver event selection;
- success `lumber_continuation` variants because this task remains route/result scoped and no additional continuation selector is needed.

Promoted root strings: 14 RU/EN pairs.

No Activity state, route/result/event ID, condition, effect, reward, world fact, career fact, Save field, RNG rule or media identity changes.

## C1D-58 — ordinary-poverty depth selective consumer

Current main already includes the accepted PR #106 poverty selector and its earlier append-only depth.

From merged/QA-accepted PR #108, queue v6 additionally selects:
- all 8 `ordinary-poverty.housing-seasonal-depth.v1` event/variant strings;
- all 6 `ordinary-poverty.recovery-depth.v1` event/variant strings.

Those 14 keys are appended to existing `povertyDepthLookupEntries` pairs and continue to rotate only by existing event-history count.

Intentionally not consumed:
- 6 `ordinary-poverty.small-job-depth.v1` strings.
Reason: those entries require exact event + variant + choice identity, while current persisted `lastAction.outcomeRef` stores event + choice but not the exact selected variant. Two variants share `take-small-task`; consuming by event+choice alone would conflate authored context.

The regression explicitly requires those 6 keys to remain fixture-local and outside the variant selector.

Secret Debt remains separate; no debt/lender/hidden-career mechanics or Product values are introduced.
