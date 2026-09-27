# Localized Pending-Scene Invariance Gate v1

Status: executable QA acceptance definition
Queue item: Chat 4 item 145
Baseline: current main `23a8798f77c42e84a7540d71fdffd69d9db9fbfd`

## Purpose

Prove that switching RU↔EN while an authored event/result scene is already pending changes presentation only. The pending gameplay instance must not be rematerialized, rerolled or mutated by locale.

This gate covers the shipped PR43 Forest result surface and one ordinary-poverty production surface when the current Chat3 localization delta is selectively integrated.

School worker-specific exact-Night event identities are deliberately not used here because those `school.night.exact.v3.*` events are not current-main production events.

## Common executable snapshot

Immediately before locale switch, capture:

- complete serialized life Save;
- pending `eventId`;
- pending `variantId`;
- pending reaction epoch/instance identity when present;
- full ordered list of pending choice IDs;
- pending semantic `presentationId`;
- resolved `data-candidate-key` if the slot has a GIF pool;
- resolved media source and semantic media ID;
- gameplay RNG state/seed fields present in Save;
- resources, metrics, counters, facts, history/journal lengths and Night/Activity flow state.

Then switch locale through the real UI control without dispatching a gameplay command.

After re-render require byte-equivalent gameplay Save serialization. Locale storage itself is intentionally outside the life Save and may change.

## Forest case — shipped PR43 result

Use one naturally produced exact `activityResult` route, starting with success:

- activity: `lumber.forest`;
- result: `lumber.forest.success`;
- pending event: `forest-result-content-v1.success`;
- variant: `default`;
- choice: `return`.

Repeat the identity assertions for escape/failure when the test matrix covers all outcomes:

- `forest-result-content-v1.escape`;
- `forest-result-content-v1.failure`.

Required assertions across RU→EN and EN→RU while pending:

1. event ID unchanged;
2. variant ID unchanged;
3. choice ID set/order unchanged;
4. exact underlying `activityResult` remains unchanged;
5. semantic presentation ID unchanged;
6. selected GIF candidate key unchanged if a future real pool exists; if no pool exists, candidate key remains absent rather than being synthesized by locale;
7. complete life Save unchanged;
8. no gameplay RNG consumed;
9. title, body, choice label and media alt may change to the target locale;
10. resolving `return` applies no extra gameplay effect beyond the already materialized Activity result.

Current PR43 UI regression already proves RU→EN Forest title/choice/media-alt localization while preserving pending event/variant identity. This gate strengthens that baseline to whole-Save equality and candidate-key equality.

## Ordinary-poverty case

After selective integration of the reviewed Chat3 localization delta, use a current production event such as:

- `poverty-street-production.pressure-winter`;
- variant `default`;
- choices `take-shelter` / `keep-moving`.

Preferred natural path:

day action → EndDay → street lodging → after-lodging poverty reaction → pending event → locale switch.

Before resolving a choice, switch RU↔EN and require the same common snapshot invariants:

- event/variant/choice identities unchanged;
- NightFlow phase unchanged;
- resources/metrics/next-day modifiers unchanged before choice resolution;
- selected GIF key unchanged if a real pool later exists;
- Save unchanged;
- only localized title/body/choice/alt/caption presentation changes.

After the switch, resolve the same choice in paired RU and EN runs from the identical pre-choice Save. The resulting gameplay Saves must be equal after removing only locale-outside-save presentation state.

For `keep-moving`, the existing production effect must be identical in both locales. Localization must neither add nor suppress the production next-day Energy modifier.

## Candidate selection invariant

A locale switch must never call gameplay RNG and must never become part of the presentation occurrence key.

For a slot with a real PR42 pool:

- record `data-candidate-key` before switch;
- switch locale;
- require exact same candidate key after switch;
- reload the same Save and require the same candidate key;
- change locale again and require the same key.

RU/EN alt/caption text may differ; candidate key, source asset identity and pool version must not.

## Fallback acceptance

Test missing localization independently from missing media.

Missing translation:

- fallback to Russian/source or existing legacy text must be non-fatal;
- pending identity and Save remain unchanged;
- QA must record the surface as localization debt rather than SHIPPED_RU_EN.

Missing media in an explicitly fault-injected test:

- renderer may advance through resolved candidates and static fallback;
- no pending gameplay identity changes;
- no Save mutation;
- no gameplay RNG consumption;
- production CI/preflight must still reject a genuinely missing referenced production file.

## Failure conditions

This gate fails on any of the following:

- locale switch changes event, variant or choice identity;
- locale switch writes to life Save;
- locale switch rerolls a GIF candidate;
- locale switch consumes gameplay RNG;
- translated content changes effects/conditions/rewards/timing;
- fallback throws or deadlocks the pending scene;
- Forest result changes from success/escape/failure;
- poverty choice produces locale-dependent gameplay state.

## Current readiness

Forest: **EXECUTABLE_NOW on current main**, with current PR43 regression as partial existing evidence.

Ordinary poverty: **READY_AFTER_SELECTIVE_LOCALIZATION_INTEGRATION**; current event IDs exist on main and Chat3 RU+EN delta maps them exactly.

School exact-course worker events: **NOT USED AS CURRENT-MAIN PROOF / STAGING**.
