# Ordinary Voluntary Night Choice Copy Audit v2

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `01b31b9ab0d0267d95edf5b5b80638acd63f5c04`

## In-scope ordinary voluntary choices

### `night.sleep`
Current label:
- catalog: `Sleep`
- localized key: `nightChoice.night.sleep.label`
- RU/EN: `Спать` / `Sleep`

Mechanics:
- no condition
- no immediate effect
- no next-day effect
- next-day Energy delta 0

Result-facing text:
- no dedicated current event/result body
- no new result sentence should be invented

### `lumber.foreman.night`
Current label:
- catalog: `Talk with the Foreman`
- localized key: `nightChoice.lumber.foreman.night.label`
- RU/EN: `Поговорить с бригадиром` / `Talk with the Foreman`

Availability:
- exact relationship stage `lumber.foreman / route-professional`

Immediate effect:
- `night_meetings += 1`

Next-day:
- no effects
- Energy delta 0

Result-facing event:
- `lumber-night.foreman-professional`
- variant `default`
- choice `continue`

## Current shared Night help/UI

Already localized and not duplicated:
- Night eyebrow/title/prompt
- “Night activity” slot annotation
- select button
- next-day Energy annotation

The ordinary non-School row uses the shared Night-choice help line.

## School exact-course exclusion

All `school.night_study.*` choices are excluded from this copy audit because their exact course/stat mechanics and help copy are School-owned.

## Secret Debt exclusion

Forced Secret Debt/night interception is excluded.

No Secret Debt ID is introduced into this ordinary voluntary choice source.

## Copy debt result

Current ordinary labels are already bilingual in root.

Dedicated result copy exists only for the Foreman follow-up event; `night.sleep` has no authored result body and should remain a simple Night choice.

## Locked behavior

No copy change may alter NightFlow phase order, lodging payment, daytime Energy, next-day Energy, relationship effects, Save, or RNG.
