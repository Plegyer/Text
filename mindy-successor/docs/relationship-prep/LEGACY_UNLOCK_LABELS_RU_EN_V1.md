# Legacy Unlock Labels RU+EN v1

Date: 2026-09-28
Status: PRESENTATION_ONLY
Baseline main: `54131488c65302f81b3001abaaa345d21f0281e2`

| Unlock ID | RU label | EN label | Status |
|---|---|---|---|
| `guild` | Своя в артели | One of the Crew | current ending unlock |
| `scholar` | Образование | Education | current ending unlock |
| `calendar` | Дополнительное время | Extra Time | legacy-compatible unlock |
| `host` | Гостеприимство | Hospitality | current ending unlock |
| `mediator` | Посредница | Mediator | current ending unlock |
| `court` | Придворная выдержка | Court Composure | current ending unlock |
| `vitality` | Запас сил | Vitality Reserve | current ending unlock |
| `lumber.forewoman.compat` | Путь бригадира | Forewoman Path | current compatibility unlock |
| `lumber.forest.compat` | Лесная развязка | Forest Resolution | current compatibility unlock |
| `palace` | Дворец | Palace | all-Hard-Work meta unlock |

## Stable keys

For each row:

`unlock.<unlockId>.label`

## Copy constraints

- Existing seven legacy RU names are preserved where already established.
- Compatibility unlock labels are player-facing names, not internal reward-code explanations.
- `palace` is presented as an unlock only.
- No label changes the condition that grants an unlock.

## Hard Work exclusion

`lumber.hardwork.compat` is intentionally absent because the current Hard Work ending records typed `hardWork:lumber` progress instead of adding that compatibility string to `meta.unlocks`.

## Boundary

Text only. No unlock IDs, ending reward identities, Hard Work progress, Palace condition, Save or RNG changes.
