# Generic Night-choice localization regression gate v1

Status: COMPLETE / GREEN_SHIPPED

Current main:
`1af3104c1e4c180019b965adac8e87e67de89347`.

PR46 implemented generic stable-ID Night-choice localization and is merged with green exact-head and post-merge CI.

## Stable-ID lookup

Accepted generic key:
`nightChoice.<existing-choice-id>.label`.

The lookup is derived from the authoritative gameplay choice ID.

Rules preserved:
- gameplay ID unchanged;
- no locale-specific duplicate NightChoice;
- missing localization falls back to embedded label;
- localization lookup does not dispatch gameplay;
- locale remains outside gameplay Save.

## School Night-study preservation

School Night-study IDs continue to use structured dynamic formatting:
`school.night_study.<course>.<stat>`.

The renderer:
1. detects the School Night-study prefix;
2. resolves the current course;
3. resolves the current stat;
4. formats `ui.school.nightStudyChoice`.

Only non-School Night choices use generic `nightChoice.<id>.label` lookup.

This keeps all 24 current School Night-study gameplay IDs locale-neutral and avoids duplicating 24 localized gameplay definitions.

## Regression evidence

PR46 exact-head workflow #70:
- SUCCESS;
- 307/307 tests.

Post-merge main workflow #71:
- SUCCESS;
- 307/307 tests.

Passing regressions include:
- `renderer: School RU EN localization preserves course command and pending scene identity`;
- `renderer: School Night-study labels localize without changing NightFlow save`;
- `renderer: Foreman relationship and voluntary Night scene localize RU EN without gameplay drift`.

## Save / RNG boundary

School Night-study and Foreman tests capture serialized gameplay Save before locale changes and require equality after switching locale.

Therefore generic label localization does not modify:
- NightFlow phase;
- selected lodging;
- choice ID;
- relationship/School counters;
- resources;
- next-day modifiers;
- RNG;
- pending event identity.

## Foreman mechanics

The new generic lookup exposes RU+EN for:
`lumber.foreman.night`.

It does not change:
- effect `night_meetings += 1`;
- `nextDayEnergyDelta=0`;
- `nextDayEffects=[]`;
- after-choice event identity.

## Fallback behavior

A Night choice without a localization key still renders its embedded label.

Missing translation cannot:
- hide the choice;
- alter eligibility;
- change the dispatched ID;
- mutate Save.

## Verdict

`GREEN_SHIPPED`.

Generic ordinary Night-choice localization is now production behavior, with School dynamic Night-study formatting preserved and no locale leakage into gameplay state.
