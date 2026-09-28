# Current-Main Ordinary Night Identity Audit v2

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `01b31b9ab0d0267d95edf5b5b80638acd63f5c04` (post-PR61)

## Exact current voluntary Night choices in Chat5 scope

Current `definitions.nightChoices` contains 26 entries. Two are ordinary non-School voluntary choices in this scope:

### `night.sleep`
- catalog label: `Sleep`
- conditions: none
- immediate effects: none
- next-day effects: none
- `nextDayEnergyDelta = 0`
- current localization key: `nightChoice.night.sleep.label`
- current RU/EN: `Спать` / `Sleep`

This choice has no dedicated follow-up event/result copy in current content.

### `lumber.foreman.night`
- catalog label: `Talk with the Foreman`
- condition: relationship `lumber.foreman` at stage `route-professional`
- immediate effect: increment relationship counter `night_meetings` by 1
- next-day effects: none
- `nextDayEnergyDelta = 0`
- current localization key: `nightChoice.lumber.foreman.night.label`
- current RU/EN: `Поговорить с бригадиром` / `Talk with the Foreman`

Completion emits `nightChoiceCompleted:lumber.foreman.night`, which can trigger exact current event `lumber-night.foreman-professional`.

## School-owned exact-course choices excluded

The remaining current voluntary choices are `school.night_study.*` exact-course Night study identities. They have their own stat/counter effects and `nextDayEnergyDelta = -1`.

This queue does not re-author or duplicate those School-owned exact-course mechanics/copy.

## Secret Debt excluded

No current `definitions.nightChoices` ID is a Secret Debt choice.

Forced Secret Debt/night interception remains a separate flow/owner and is explicitly outside this ordinary voluntary Night audit.

## Shared Night UI already localized

Current app already uses stable shared keys for:
- `ui.night.eyebrow`
- `ui.night.choice.title`
- `ui.night.choice.prompt`
- `ui.night.choice.slot`
- `ui.night.choice.select`
- `ui.night.nextDayEnergy`

This wave does not duplicate those shared shell strings.

## Locked mechanics

Ordinary relationship Night:
- consumes the Night slot through current NightFlow;
- does not spend daytime Energy;
- does not apply a universal next-day Energy penalty;
- does not change lodging payment rules;
- remains separate from forced Secret Debt flow.

## Conclusion

Exact Chat5 ordinary voluntary Night identity scope is two choices:
- `night.sleep`
- `lumber.foreman.night`

Only the Foreman choice currently has dedicated result-facing event content.
