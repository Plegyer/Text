# Result Screen Generic UI Copy RU+EN v1

Date: 2026-09-28
Owner: Chat 5
Baseline main: `5dffefd15703d431a604b4cc9f831c4e55460aed`

## Already shipped / reuse existing keys

Current result screen already resolves:
- `ui.result.shift` — RU `Смена`, EN `Shift`
- `ui.result.default` — RU `Результат`, EN `Result`
- `ui.work.again` — RU `Работать ещё · 1 энергия`, EN `Work again · 1 energy`
- `ui.result.returnTown` — RU `Вернуться в город`, EN `Return to town`

Do not create duplicate keys for those semantics.

## Missing generic result control

### `ui.result.chooseLodging`
RU: Выбрать ночлег  
EN: Choose lodging

Current hardcoded consumer: zero-Energy result shortcut.

## Missing generic presentation fallback

### `ui.media.missing`
RU: Сцена доступна без медиа.  
EN: This scene is available without media.

Current hardcoded consumer: `mediaHTML()` fallback when no media candidate resolves.

This fallback is shared beyond result screens, but it is a safe generic presentation string and does not belong to any career-specific result prose.

## Boundary

Text only. Do not alter:
- action/result IDs;
- career-specific result body text;
- result deltas;
- repeat-work mechanics;
- Energy checks;
- lodging/NightFlow mechanics;
- media selection or fallback resolution;
- RNG or Save.
