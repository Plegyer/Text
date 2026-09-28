# Player-Facing Error Wrapper Localization v2

Date: 2026-09-28
Owner: Chat 5
Baseline main: `3fc5495310e281cf5cbe52da3642000f1cb1fb05`
Consumer: `src/ui/app.ts`

## Rule

Localize only stable player-facing wrapper text.

When the underlying validator/parser/storage error has no stable semantic code, preserve its raw `String(error)` payload unchanged inside the localized `{error}` placeholder.

Do not parse, translate, normalize or branch gameplay behavior on the human-readable payload.

## Import wrapper

### `ui.save.importFailed`

RU: Не удалось загрузить сохранение: {error}  
EN: Could not load the save: {error}

Current seam:
- file import `catch(e)`;
- current behavior assigns raw `String(e)` directly to the toast.

Target presentation:
- same catch/error state;
- only wrap the current payload through `fmt(tr(...), {error:String(e)})`.

## Protected load / recovery wrapper

### `ui.save.loadStopped`

RU: Загрузка остановлена: {error}. Автоперезапись отключена; импортируйте сохранение через меню.  
EN: Loading stopped: {error}. Automatic overwrite is disabled; import a save through the menu.

Current seam:
- outer startup/load recovery `catch(e)`;
- must keep `error=true` and `locked=true` exactly as today.

This wrapper covers failures from:
- game storage load;
- local storage parse;
- backup parse;
- missing valid backup propagated as an Error.

## Custom presentation-edit load wrapper

### `ui.presentation.customLoadFailed`

RU: Замены не загружены: {error}  
EN: Changes could not be loaded: {error}

Current seam:
- custom presentation patch parse/apply `catch(e)`.

Keep current recovery behavior:
- reset to bundled presentation;
- rebuild catalog from bundled patch;
- show error toast.

## Startup root wrapper

### `ui.app.startFailed`

RU: Ошибка запуска: {error}  
EN: Startup error: {error}

Current seam:
- `main().catch(e => ...)`.

Keep the raw payload because it may contain useful diagnostics not represented by a stable semantic code.

## Stable messages without raw payload

These remain direct localized strings rather than wrappers:

### `ui.save.fileTooLarge`
RU: Файл слишком большой.  
EN: The file is too large.

### `ui.save.loaded`
RU: Сохранение загружено.  
EN: Save loaded.

### `ui.save.backupRecovered`
RU: Восстановлена резервная копия.  
EN: Backup restored.

### `ui.save.noHealthyBackup`
RU: Нет исправной резервной копии.  
EN: No valid backup is available.

### `ui.presentation.saved`
RU: Замены сохранены.  
EN: Changes saved.

### `ui.app.catalogLoadFailed`
RU: Не удалось прочитать каталог.  
EN: Could not read the content catalog.

## Error identity / Save boundary

Locale switching must never:
- change which exception is caught;
- change recovery/lock behavior;
- modify imported bytes;
- rewrite the Save;
- change backup selection;
- retry an operation;
- dispatch gameplay;
- alter RNG.

Only wrapper/status presentation changes.

## Security / diagnostic boundary

Do not invent friendly explanations for unknown raw validator payloads in this layer. If a future stable error-code system is added, individual semantic codes can receive dedicated localized copy separately.
