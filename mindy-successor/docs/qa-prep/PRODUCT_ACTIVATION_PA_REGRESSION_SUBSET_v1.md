# Product Activation PA Regression Subset v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance

## Goal

This subset is a compact executable regression chain that can run on the current QA worker branch using already merged fixtures/contracts.

It intentionally does **not** claim full Product Acceptance.

It covers the stable mechanics that activation must preserve across:

- Lumber;
- paid School;
- Night;
- Forest Activity;
- semantic presentation identity;
- simultaneous ending eligibility;
- Hard Work commit/completion/reload.

## Existing IDs only

The test uses only existing merged IDs/contracts:

- `lumber.shift`
- `lumber.career-first-shift`
- `lumber.foreman-notice`
- relationship `lumber.foreman`
- School course `school.course.arcana`
- fixture lodging `lumber.normal-room`
- Night choice `lumber.foreman.night`
- Night event `lumber-night.foreman-professional`
- item adapter `old_boundary_token -> enter_old_boundary -> lumber.capability.enter-old-boundary`
- Activity `lumber.forest`
- Activity action IDs `advance`, `escape`
- Activity success result `lumber.forest.success`
- continuation `lumber-cross.activity-forest-return`
- endings `ending.lumber.forest`, `ending.lumber.hard-work`
- reward proof `hardWork:lumber`.

No new production content is authored.

## Deliberate exclusions

The subset does not fake these still-open/full-PA requirements:

- authoritative School→Lumber public fact/certificate threshold;
- real inventory acquisition for `old_boundary_token`;
- item-dependent Activity action-space change;
- Forest 3 route contexts × 3 challenge families;
- missing product authoring outside this slice.

The old-boundary capability is supplied only through the existing fixture adapter and is labeled as such in assertions.

## Sequence

1. Start a valid post-arrival run.
2. Execute one real `lumber.shift`.
3. Resolve the first-shift milestone and choose the professional Foreman route.
4. Execute one paid Arcana School lesson through `executeSchoolLesson`.
5. Save/reload the already-paid School state twice and assert no second charge.
6. Start NightFlow.
7. Pay existing fixture lodging once and reload.
8. Choose existing Foreman Night choice and reload its pending event.
9. Resolve the event and start the next day.
10. Apply the existing `old_boundary_token` test adapter fact.
11. Enter `lumber.forest`; assert 2 Energy entry cost once.
12. Save/reload inside Activity.
13. Advance to success; assert result→Resolver continuation.
14. Reload pending continuation and resolve it.
15. Assert Forest ending eligibility.
16. Use a validated QA accelerator to set Lumber completed shifts to 49.
17. Execute one real `lumber.shift` for the 50th shift.
18. Assert both Forest and Hard Work are eligible while the run remains active.
19. Commit Hard Work.
20. Reload before completion; assert no reward yet.
21. Complete ending.
22. Reload twice; assert one RunResult transaction and one `hardWork:lumber` proof.

## Presentation assertions

The same test asserts canonical IDs:

- `job/lumber/shift/spring/default`
- `job/lumber/result/default`
- `job/lumber/event/lumber-career-first-shift/default`
- `relationship/lumber-foreman/lumber-foreman-notice/default`
- `relationship/lumber-foreman/lumber-night-foreman-professional/default`
- `job/lumber/event/lumber-cross-activity-forest-return/default`
- `school/arcana/lesson/default`
- `ending/lumber/hard-work`.

This proves semantic identity remains stable while gameplay uses the existing fixture mechanics.

## Exactly-once assertions

The subset specifically checks:

- paid School tuition and 1 current-day Energy are not replayed by reload;
- lodging payment is not replayed by reload;
- Foreman Night relationship counter is not replayed by reload;
- Activity entry Energy is not replayed by reload;
- Activity result/continuation is not replayed by reload;
- ending commitment does not grant the Hard Work reward;
- ending completion grants `hardWork:lumber` once;
- repeated reload does not duplicate Meta transaction/reward.

## Promotion after PR20

After production activation merges, keep this fixture regression test as architecture coverage, but add/run the production-catalog regression and shipped-dist smoke gates separately.

A green isolated subset must never be used as proof that player-facing activation is shipped.
