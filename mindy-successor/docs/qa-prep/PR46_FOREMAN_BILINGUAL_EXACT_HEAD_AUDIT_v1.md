# PR46 Foreman bilingual exact-head audit v1

Status: COMPLETE / GREEN_EXACT_HEAD / GREEN_POST_MERGE_MAIN

PR:
- #46 `Lead: integrate Foreman relationship RU/EN localization`
- base: `c0763f9f9fa9887593fe8567165bbedce2b6cd3a`
- accepted exact head: `1ee9d26ce0dd12cb4b77b9e5b18ee1a117ce6433`
- merge SHA: `1af3104c1e4c180019b965adac8e87e67de89347`
- merged: YES.

## Scope

Production changes are limited to:
- 11 additive Foreman RU+EN localization entries;
- generic stable-ID ordinary Night-choice label localization;
- tests.

No relationship definition, Night mechanics, Lumber content pack, Forest result, Hard Work condition, Save schema or gameplay RNG is changed.

## Localization payload

Added exact current identities only:
- `event.lumber.foreman-notice.*`
- `nightChoice.lumber.foreman.night.label`
- `event.lumber-night.foreman-professional.*`
- two current Foreman media alt keys.

All have complete RU+EN and locale-neutral keys.

No wider roster, deeper stage, romance route, housing rule, School result, Hunter/Old Boundary meaning, Secret Debt or Palace content is promoted.

## Generic Night-choice wiring

The UI keeps School Night-study dynamic formatting first.

Non-School Night choices fall through to:
`nightChoice.<existing-choice-id>.label`

with the embedded gameplay label as fallback.

Thus localization changes presentation only:
- choice ID unchanged;
- conditions/effects unchanged;
- no locale field added to Save;
- no locale-specific NightChoice duplication.

## Initial failed head

Head `f06a991...`, workflow #68, failed 2 tests because of test defects:
1. Hard Work test searched for reward ID `hardWork:lumber` as if it were the ending ID.
2. Foreman renderer smoke mutated a relationship state object before it existed.

Production mechanics were not changed to solve these failures.

## Final test corrections

The final PR sequence corrected the tests to:
- find ending `ending.lumber.hard-work`;
- assert reward `hardWork:lumber` separately;
- reach `route-professional` naturally through current Lumber shift -> career milestone -> Foreman professional choice;
- check the Night-choice label on its rendered article rather than only the button text.

## Exact-head CI

Accepted head:
`1ee9d26ce0dd12cb4b77b9e5b18ee1a117ce6433`.

Workflow:
- run #70
- id `36343095488`
- conclusion: SUCCESS
- validator: 17 packs, 46 events, 35 actions, 9 endings
- tests: 307
- pass: 307
- fail: 0

Relevant tests PASS:
- Foreman RU+EN localization completeness;
- Foreman relationship/Night/Hard Work mechanics lock;
- School Night-study localization/save regression;
- ordinary poverty localization regression;
- Foreman relationship and voluntary Night RU↔EN gameplay-invariance smoke.

## Mechanic invariants

Verified:
- relationship: `lumber.foreman`;
- stages: `unknown -> professional -> route-professional`;
- Night choice: `lumber.foreman.night`;
- effect: `night_meetings += 1`;
- `nextDayEnergyDelta=0`;
- `nextDayEffects=[]`;
- Night event: `lumber-night.foreman-professional`;
- Lumber Hard Work only `completed_shifts >= 50`;
- Meta reward `hardWork:lumber`;
- Forest exact result identities unchanged.

## Post-merge main

Merged as:
`1af3104c1e4c180019b965adac8e87e67de89347`.

Main push workflow:
- run #71
- id `36343191446`
- conclusion: SUCCESS
- validator: 17 packs, 46 events, 35 actions, 9 endings
- tests: 307
- pass: 307
- fail: 0

## Verdict

`GREEN_EXACT_HEAD` and `GREEN_POST_MERGE_MAIN`.

PR46 is accepted as a localization/presentation-only production merge.
