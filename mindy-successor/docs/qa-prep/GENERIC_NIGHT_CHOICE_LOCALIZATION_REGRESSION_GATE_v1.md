# Generic Night-choice localization regression gate v1

Status: COMPLETE / IMPLEMENTATION_SHAPE_GREEN / PR46_CI_STILL_BLOCKED

Scope:
generic localization lookup for ordinary Night-choice labels while preserving School Night-study dynamic formatting and gameplay-state invariance.

Reviewed PR46 exact head:
`f06a991e5d252931cd74ab2ea3ce1b699d8a6a54`.

## Stable-ID lookup contract

Accepted generic shape:

`nightChoice.<existing-choice-id>.label`

The localization key is derived from the already-authoritative gameplay choice ID.

Rules:
- gameplay choice ID remains unchanged;
- locale never becomes part of the choice ID;
- no locale-specific duplicate NightChoice definition;
- missing localization falls back to the embedded choice label;
- localization lookup itself cannot dispatch gameplay or modify Save.

PR46 uses this exact pattern for non-School Night choices.

## School Night-study special formatting

School Night-study IDs have structured form:
`school.night_study.<course>.<stat>`.

They must continue to render through:
- current School course localization;
- current stat localization;
- `ui.school.nightStudyChoice` format string.

Generic stable-ID lookup must not flatten these dynamic labels into one static per-choice translation requirement.

Reviewed PR46 implementation checks the School prefix first, resolves course/stat, and uses the existing dynamic formatter. Only non-School choices fall through to generic `nightChoice.<id>.label`.

Malformed/unknown School IDs safely fall back through the generic stable-ID key and then embedded label rather than changing gameplay identity.

## Existing School regression evidence

On PR46 failed workflow #68, both pre-existing School renderer regressions still PASS:

- `renderer: School RU EN localization preserves course command and pending scene identity`
- `renderer: School Night-study labels localize without changing NightFlow save`

Therefore the generic Night-choice lookup did not break the current School RU+EN formatting path on the reviewed head.

The overall workflow remains red for separate PR46 test defects documented in:
`PR46_FOREMAN_BILINGUAL_EXACT_HEAD_AUDIT_v1.md`.

## Save / locale boundary

Current UI locale is held outside the gameplay Save.

A Night-choice localization regression must prove:
- RU -> EN -> RU changes visible labels only;
- serialized `portal-life.v1` remains identical while no gameplay command is dispatched;
- NightFlow phase remains unchanged;
- selected lodging remains unchanged;
- available Night choice gameplay IDs remain unchanged;
- RNG state remains unchanged;
- relationship/career/School counters remain unchanged.

School's existing Night-study test already asserts serialized Save equality across locale switch.

The future/updated Foreman test must do the same for `lumber.foreman.night`.

## Button and effect identity

Only visible choice labels may be localized generically.

The following must remain sourced from gameplay definitions:
- `data-night-choice` ID;
- eligibility conditions;
- immediate effects;
- `nextDayEffects`;
- `nextDayEnergyDelta`;
- NightFlow transition/phase behavior.

For Foreman:
- ID stays `lumber.foreman.night`;
- effect stays exactly `night_meetings += 1`;
- `nextDayEnergyDelta=0`;
- `nextDayEffects=[]`.

For School Night study:
- IDs remain the 24 current structured School Night-study IDs;
- selected stat gain remains unchanged;
- current next-day Energy penalty remains unchanged.

## Fallback acceptance

A Night choice with no localization key must still render its embedded fallback label.

Missing translation must not:
- hide the choice;
- change eligibility;
- throw during render;
- alter the Save;
- change the chosen command ID.

Localization completeness is a QA debt classification, not a gameplay availability rule.

## Regression requirements for merge

A PR adding generic Night-choice localization is acceptable only when exact-head CI demonstrates:

1. School paid-lesson localization regression PASS.
2. School Night-study dynamic RU+EN regression PASS.
3. Foreman ordinary Night-choice RU+EN regression PASS.
4. Save is byte-identical across locale switch before choosing.
5. same stable Night choice ID is dispatched in both locales.
6. gameplay effects/next-day modifiers remain definition-owned.
7. no locale field enters Save/RNG/relationship state.
8. full typecheck/validate/build/test succeeds.

## Verdict

`IMPLEMENTATION_SHAPE_GREEN`.

The reviewed generic lookup is correctly presentation-only and preserves School-specific formatting in code and existing School tests.

PR46 itself is not merge-green yet because workflow #68 fails on two separate Foreman regression-test setup/identity errors.
