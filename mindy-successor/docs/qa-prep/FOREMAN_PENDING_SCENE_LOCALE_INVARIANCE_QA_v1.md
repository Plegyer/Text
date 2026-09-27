# Foreman pending-scene locale invariance QA v1

Status: COMPLETE / GREEN_SHIPPED

Accepted PR46 head:
`1ee9d26ce0dd12cb4b77b9e5b18ee1a117ce6433`.

Merged main:
`1af3104c1e4c180019b965adac8e87e67de89347`.

## Natural route

The final renderer regression reaches the existing professional Foreman route through current production:
1. perform real `lumber.shift`;
2. resolve `lumber.career-first-shift`;
3. resolve `lumber.foreman-notice`;
4. choose `professional`;
5. verify `completed_shifts=1`;
6. verify relationship stage `route-professional`;
7. verify relationship choice `route=professional`.

No fabricated relationship state object is used.

## Voluntary Night choice

The test enters current NightFlow and reaches:
`lumber.foreman.night`.

RU label:
`Поговорить с бригадиром`.

Before gameplay selection, the serialized life Save is captured.

After RU -> EN:
- visible label becomes `Talk with the Foreman`;
- serialized gameplay Save remains byte-identical.

This preserves:
- NightFlow;
- lodging;
- relationship state;
- resources;
- next-day modifiers;
- RNG;
- all persisted gameplay identity.

## Choice transaction

Selecting the same exact gameplay ID:
`lumber.foreman.night`

applies current mechanics once:
- `night_meetings += 1`;
- `nextDayEnergyDelta = 0`;
- `nextDayEffects = []`.

The resulting blocking event is:
- event `lumber-night.foreman-professional`;
- variant `default`.

## Pending event invariance

While the Foreman Night event is pending, the test captures serialized Save in EN.

After EN -> RU:
- the serialized Save is byte-identical;
- title/body/choice copy changes language only.

Because the full serialized Save is equal, this covers:
- pending event ID;
- pending variant ID;
- relationship counter;
- relationship stage/choice;
- next-day Energy delta;
- RNG state;
- NightFlow;
- resources/history/progression.

No duplicate Night-choice effect occurs during locale switching.

## Media identity

The same current Foreman Night media identity remains selected.

Only localized alt/presentation text changes; locale does not create a second media/gameplay identity.

## Hard Work / Forest protection

PR46 contract coverage also proves:
- Lumber Hard Work only `completed_shifts >= 50`;
- Meta reward `hardWork:lumber`;
- current Forest identities remain unchanged.

## CI evidence

Exact PR head workflow #70:
- 307/307 PASS.

Post-merge main workflow #71:
- 307/307 PASS.

The Foreman renderer invariance test passes on both exact head and merged main.

## Verdict

`GREEN_SHIPPED`.

Voluntary Foreman Night choice localization and its blocking event preserve gameplay state across RU↔EN and are accepted on current main.
