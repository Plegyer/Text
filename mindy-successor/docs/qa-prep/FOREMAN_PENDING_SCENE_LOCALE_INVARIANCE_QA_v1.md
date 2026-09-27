# Foreman pending-scene locale invariance QA v1

Status: COMPLETE / IMPLEMENTATION_GREEN / AWAITING_EXACT_HEAD_CI

Reviewed PR46 latest head during this audit:
`c71b29580da6350a92e0c236c86e499aebd3979c`.

The latest head replaces the invalid direct relationship-state mutation from the first PR46 attempt with the current production Lumber -> Foreman progression path.

## Natural route to Foreman professional state

The renderer regression now:
1. starts from the ordinary current save;
2. opens Work;
3. performs the real `lumber.shift`;
4. resolves current `lumber.career-first-shift` through choice `continue`;
5. reaches current `lumber.foreman-notice`;
6. resolves current `professional` choice;
7. verifies:
   - `completed_shifts = 1`;
   - relationship stage `route-professional`;
   - relationship choice `route=professional`.

This is superior to fabricating a relationship state object because it proves the current production reaction chain still owns the relationship transition.

## Voluntary Night choice invariance

The test then enters current NightFlow:
- End Day;
- normal lodging;
- voluntary Night choice list.

Exact Night choice:
`lumber.foreman.night`.

Before gameplay selection:
- RU label is visible;
- serialized gameplay Save is captured.

RU -> EN switch:
- changes the visible label to `Talk with the Foreman`;
- asserts the serialized life Save is byte-identical.

Therefore locale switching before the Night command preserves:
- NightFlow phase;
- lodging selection;
- eligible gameplay choice ID;
- relationship stage/choice;
- relationship counters;
- resources;
- next-day modifiers;
- RNG state;
- all other serialized gameplay state.

The locale remains external presentation preference.

## Choice transaction

Selecting the same exact gameplay ID in EN:
`lumber.foreman.night`

must perform the authoritative current effect once:
`relationship[lumber.foreman].counters.night_meetings += 1`.

The current definition remains:
- `nextDayEnergyDelta = 0`;
- `nextDayEffects = []`.

The regression checks after choice:
- pending event is `lumber-night.foreman-professional`;
- pending variant is `default`;
- `night_meetings = 1`;
- accumulated next-day Energy delta remains `0`.

No daytime relationship Energy transaction is added.

## Pending event RU↔EN invariance

While `lumber-night.foreman-professional/default` is pending, the test captures the serialized Save in EN.

It then switches EN -> RU and requires:
`localStorage['portal-life.v1']`
to remain byte-identical.

This single equality covers the required invariants:
- pending event ID unchanged;
- pending variant ID unchanged;
- reaction/presentation-owned persisted identity unchanged;
- `night_meetings` unchanged;
- next-day Energy delta unchanged;
- RNG state unchanged;
- relationship stage/choice unchanged;
- NightFlow unchanged;
- no duplicate Night choice effect.

Only rendered title/body/choice text changes language.

## Media and presentation

The same pending event resolves:
- EN title/body/choice/media alt;
- RU title/body/choice after locale switch.

The media identity itself is not localized or duplicated.

The regression does not alter candidate selection/gameplay RNG to choose media.

## Hard Work and Forest boundary

The updated PR46 contract test now finds the actual ending:
`ending.lumber.hard-work`

and separately asserts:
- only `completed_shifts >= 50`;
- Meta reward `hardWork:lumber`.

PR46 production diff does not change Forest result identities or the exact Lumber Forest continuation.

## Remaining execution status

The latest PR46 workflow for head `c71b295...` was still running when this item was written.

Therefore implementation review is:
`GREEN`

but merge acceptance remains:
`AWAITING_EXACT_HEAD_CI`.

The exact head must complete full typecheck/validate/build/tests successfully before PR46 can be accepted.
