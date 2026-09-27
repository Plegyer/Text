# Multi-GIF Presentation QA Requirements v1

Date: 2026-09-27
Worker: Chat 4 / QA Acceptance

## Purpose

Define QA requirements when one semantic gameplay event may choose from a pool of 3-5 presentation GIF candidates.

The media pool is presentation depth only.

It must never change gameplay outcome, transaction timing, state progression, or semantic identity.

## 1. One semantic event, one gameplay identity

A media pool belongs to an existing semantic presentation identity.

Selecting candidate A, B, C, D or E must not create a new gameplay event ID.

Required:
- same event/variant identity;
- same pending transaction identity;
- same allowed choices;
- same conditions;
- same effects.

PASS only if changing the chosen media candidate cannot change mechanics.

## 2. Same gameplay outcome and effects

For identical Save + command + deterministic gameplay RNG:
- money delta is identical;
- Energy delta is identical;
- stats are identical;
- counters/facts are identical;
- event history is identical;
- calendar result is identical;
- ending/meta behavior is identical.

Presentation candidate selection is excluded from mechanical comparison.

## 3. No media-driven timing

Forbidden:
- effect on GIF end;
- choice unlock on frame/time;
- transaction commit after animation duration;
- reroll because media took longer/shorter to load.

Mechanics commit through existing engine/Resolver commands only.

## 4. Selection distribution is presentation-only

A pool may:
- rotate;
- choose deterministically from presentation state;
- use presentation-only randomness;
- avoid immediate repeats.

But distribution may not influence:
- event eligibility;
- success/failure chance;
- reward magnitude;
- relationship progression;
- ending eligibility.

QA should compare normalized mechanical Saves across different media candidate selections.

## 5. Reload semantics

If a semantic pending scene is persisted, reload must preserve the semantic gameplay scene.

Allowed presentation policies after reload:
- same candidate;
- deterministic re-selection;
- restart of the selected animation.

Whichever policy is implemented must be documented and must not:
- reroll the gameplay event;
- replay an effect;
- duplicate a choice;
- change event history.

Do not persist frame/time.

## 6. Animation Off

With animations disabled:
- semantic scene still appears through static/text fallback;
- all choices remain available;
- all effects remain identical;
- no gameplay delay is introduced.

Compare animation-on and animation-off mechanical results.

## 7. Missing candidate

If one candidate file is missing:
- remove/skip that candidate safely;
- use another valid candidate if available;
- otherwise use normal semantic fallback.

The gameplay scene must remain resolvable.

## 8. Corrupt candidate

If media load/decoding fails:
- candidate failure is non-fatal;
- fallback path executes;
- no transaction repeats;
- no pending scene disappears.

Corrupt media is a presentation failure, not a game-state failure.

## 9. Empty pool

If every optional GIF candidate is absent:
- static fallback may render;
- text-only fallback may render where supported;
- mechanics remain fully playable.

A 3-5 candidate target must not become a hard runtime prerequisite.

## 10. Semantic-ID separation

Two distinct semantic scenes may reuse the same GIF candidate.

That reuse must not merge:
- event IDs;
- variant IDs;
- career IDs;
- relationship IDs;
- route IDs;
- ending IDs.

A shared media file is not a shared gameplay identity.

## 11. Candidate-pool uniqueness

Within one pool:
- duplicate file entries should be rejected or deduplicated;
- invalid references should not increase effective pool size;
- fallback should not count as a GIF candidate.

QA should report effective valid candidate count separately from configured count.

## 12. Pool changes and save compatibility

Replacing, adding or removing a GIF candidate must not require migration of gameplay Save state.

Old saves keep:
- semantic presentationId;
- event identity;
- mechanical state.

They do not depend on a historical asset filename.

## 13. Repetition controls

If the presentation system supports repeat avoidance:
- it may track presentation-only recent-media history outside mechanical progression;
- losing that optional history may change which GIF appears, but not mechanics.

Do not store media-history fields that become required for gameplay correctness.

## 14. Accessibility/fallback

Every pool must retain:
- meaningful static or text fallback;
- usable alt-text/description seed;
- no dependency on visual playback to understand a required choice.

## 15. Career coverage

For repeated career shifts:
- 3-5 candidate loops may reduce visual repetition;
- seasonal/context identities remain distinct;
- pool choice does not change wage/stat package.

## 16. School coverage

For teacher/lesson media pools:
- teacher presentation does not gate paid lessons;
- pool choice does not alter tuition, Energy, stat package or counters;
- Night study remains mechanically separate.

## 17. Poverty coverage

For street/cheap-lodging pools:
- pool choice does not alter event family or pressure/recovery effects;
- zero-money anti-softlock is unchanged;
- Secret Debt is not activated by presentation selection.

## 18. Activity coverage

Route/challenge media pools:
- route/challenge identity is authoritative;
- Activity progress/result is unaffected by candidate selection;
- reload cannot change a resolved challenge.

## 19. Ending coverage

Ending media pools:
- eligibility and commit remain reward-free as designed;
- completion/Meta reward is engine-driven;
- GIF completion never grants reward.

## 20. Minimum executable QA

For each multi-GIF implementation, add:
1. same semantic scene with at least two forced candidate selections;
2. normalized mechanical Save equality;
3. missing candidate fallback;
4. corrupt candidate fallback if loader surface supports simulation;
5. all-candidates-missing fallback;
6. animations-off equivalence;
7. save/reload with pending scene;
8. duplicate candidate/config validation;
9. no semantic-ID collision.

## Acceptance classification

Use:
- MULTI_GIF_MECHANICS_EQUIVALENT
- FALLBACK_GREEN
- RELOAD_GREEN
- PRESENTATION_ONLY_DISTRIBUTION
- BLOCKED_MEDIA_DRIVES_MECHANICS
- BLOCKED_SEMANTIC_ID_COLLISION

No art style, palette or animation direction is selected by this document.

No production runtime/UI/content file was modified by Chat 4.
