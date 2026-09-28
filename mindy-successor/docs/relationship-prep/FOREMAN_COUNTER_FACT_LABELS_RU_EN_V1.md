# Foreman Counter / Fact Labels RU+EN v1

Date: 2026-09-28
Status: PRESENTATION_ONLY
Baseline main: `01b31b9ab0d0267d95edf5b5b80638acd63f5c04`

## Exact current counter

Counter ID:
`night_meetings`

Stable key:
`relationship.lumber.foreman.counter.night_meetings.label`

RU:
`Вечерние разговоры`

EN:
`Evening conversations`

Current mechanic:
`lumber.foreman.night` increments this counter by exactly 1 per successful selection under current NightFlow.

The label does not imply affection, romance, reward, or a threshold.

## Exact current fact

Fact ID:
`night-followup-complete`

Stable key:
`relationship.lumber.foreman.fact.night-followup-complete.label`

RU:
`Вечерний рабочий разговор завершён`

EN:
`After-work conversation completed`

Current mechanic:
the `continue` choice in `lumber-night.foreman-professional` adds this relationship fact.

The label reports the current professional follow-up identity only.

## Boundary

No counter increment rule, fact-write rule, condition, reward, stage, NightFlow, Save, or RNG changes.
