# Toast / Error / Close Accessibility Copy RU+EN v1

Date: 2026-09-28
Status: PRESENTATION_ONLY
Baseline main: `5dffefd15703d431a604b4cc9f831c4e55460aed`

## Reuse from item 94

### `ui.generic.closeButton`
RU: Закрыть  
EN: Close

### `ui.generic.dismissButton`
RU: Закрыть уведомление  
EN: Dismiss notification

## Confirmation dialogs

### `ui.confirm.acceptEnding`
RU: Принять судьбу и завершить эту жизнь?  
EN: Accept this fate and end this life?

### `ui.confirm.restart`
RU: Завершить текущую жизнь без новой награды? Наследие сохранится. Сначала можно экспортировать эту жизнь.  
EN: End the current life without a new reward? Your legacy will be preserved. You can export this life first.

### `ui.confirm.loadSave`
RU: Загрузить жизнь? Постоянные открытия сохранятся.  
EN: Load this life? Permanent unlocks will be preserved.

## Import / recovery messages

### `ui.save.fileTooLarge`
RU: Файл слишком большой.  
EN: The file is too large.

### `ui.save.loaded`
RU: Сохранение загружено.  
EN: Save loaded.

### `ui.save.importFailed`
RU: Не удалось загрузить сохранение: {error}  
EN: Could not load the save: {error}

### `ui.save.backupRecovered`
RU: Восстановлена резервная копия.  
EN: Backup restored.

### `ui.save.noHealthyBackup`
RU: Нет исправной резервной копии.  
EN: No valid backup is available.

### `ui.save.loadStopped`
RU: Загрузка остановлена: {error}. Автоперезапись отключена; импортируйте сохранение через меню.  
EN: Loading stopped: {error}. Automatic overwrite is disabled; import a save through the menu.

## Presentation-editing status that can reach a normal user

### `ui.presentation.saved`
RU: Замены сохранены.  
EN: Changes saved.

### `ui.presentation.customLoadFailed`
RU: Замены не загружены: {error}  
EN: Changes could not be loaded: {error}

## Startup/catalog failure shell

### `ui.app.catalogLoadFailed`
RU: Не удалось прочитать каталог.  
EN: Could not read the content catalog.

### `ui.app.startFailed`
RU: Ошибка запуска: {error}  
EN: Startup error: {error}

## Boundary

Presentation/accessibility text only. Do not alter:
- confirmation flow;
- file-size limit;
- save parsing;
- backup selection;
- import/export format;
- error handling;
- lock/recovery behavior;
- presentation patch persistence;
- Save or RNG behavior.
