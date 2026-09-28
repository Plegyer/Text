# Player-Facing Validation / Recovery Copy Inventory v1

Date: 2026-09-28
Owner: Chat 5
Baseline main: `5dffefd15703d431a604b4cc9f831c4e55460aed`
Consumer: `src/ui/app.ts`

## Included normal-player messages

These messages can reach a normal player through save import, startup, recovery or confirmation flows.

| Current source / seam | Classification | Stable key |
|---|---|---|
| `Принять судьбу и завершить эту жизнь?` | confirmation | `ui.confirm.acceptEnding` |
| `Завершить текущую жизнь без новой награды? Наследие сохранится. Сначала можно экспортировать эту жизнь.` | confirmation | `ui.confirm.restart` |
| `Файл слишком большой` | validation | `ui.save.fileTooLarge` |
| `Загрузить жизнь? Постоянные открытия сохранятся.` | confirmation | `ui.confirm.loadSave` |
| `Сохранение загружено` | success toast | `ui.save.loaded` |
| raw import `String(e)` | import error | `ui.save.importFailed` wrapper with `{error}` |
| `Восстановлена резервная копия` | recovery toast | `ui.save.backupRecovered` |
| `Нет исправной резервной копии` | recovery failure | `ui.save.noHealthyBackup` |
| `Загрузка остановлена: {error}. Автоперезапись отключена; импортируйте сохранение через меню.` | protected-load failure | `ui.save.loadStopped` |
| `Не удалось прочитать каталог.` | startup failure | `ui.app.catalogLoadFailed` |
| `Ошибка запуска: {error}` | startup failure | `ui.app.startFailed` |

## Included normal presentation-editing status

The current menu exposes the presentation editor to users, so these visible statuses are included even though the editor itself remains outside ordinary gameplay copy:

| Current source | Stable key |
|---|---|
| `Замены сохранены` | `ui.presentation.saved` |
| `Замены не загружены: {error}` | `ui.presentation.customLoadFailed` |

## Accessibility shell

Reuse item-94 keys:
- `ui.generic.closeButton`
- `ui.generic.dismissButton`

No duplicate keys needed.

## Excluded developer/debug/internal text

Excluded from this inventory:
- event catalog inspector heading/content;
- serialized JSON shown inside the inspector;
- internal exception type names;
- internal catalog/editor diagnostics that never reach the ordinary shell;
- code-level validation messages consumed only by tests or developer tooling.

## Raw error payload rule

Where current UI exposes `String(e)`, localization should wrap the error in a localized player-facing prefix but must not translate or parse the underlying error payload.

Example:
- RU: `Не удалось загрузить сохранение: {error}`
- EN: `Could not load the save: {error}`

This preserves diagnostic detail without making error identity locale-dependent.

## Boundary

Presentation only. No file-size threshold, parser behavior, backup selection, recovery rules, overwrite protection, Save schema, restart/ending mechanics or error-control flow changes.
