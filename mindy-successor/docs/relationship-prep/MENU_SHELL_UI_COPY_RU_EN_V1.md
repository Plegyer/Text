# Menu Shell UI Copy RU+EN v1

Date: 2026-09-28
Status: PRESENTATION_ONLY
Baseline main: `5dffefd15703d431a604b4cc9f831c4e55460aed`

## Existing reusable keys

- `ui.menu.title` — already shipped.
- `ui.menu.languageButton` — already shipped.
- `ui.language.ru`, `ui.language.en` — already shipped.

## New menu shell source

### `ui.menu.exportSave`
RU: Экспорт сохранения  
EN: Export save

### `ui.menu.importSave`
RU: Импорт сохранения  
EN: Import save

### `ui.menu.editor`
RU: Тексты и изображения  
EN: Text and images

### `ui.menu.animationToggle`
RU: Анимация GIF: {state}  
EN: GIF animation: {state}

### `ui.menu.animationOn`
RU: включена  
EN: on

### `ui.menu.animationOff`
RU: выключена  
EN: off

### `ui.menu.restart`
RU: Новая героиня с сохранением наследия  
EN: New heroine with legacy preserved

### `ui.menu.footer`
RU: M3 · Игровая оболочка. Иллюстрации — заменяемые эскизы. Новая героиня начинает со статами 1 и десятью очками. У загруженной старой жизни характеристики сохранены.  
EN: M3 · Game shell. Illustrations are replaceable drafts. A new heroine starts with stats at 1 and ten points to assign. Loaded older lives keep their saved stats.

## Debug/internal exclusion

Current menu also exposes an event catalog inspector. Its button/title remain excluded from this content pass because item 85 classified it as internal/debug-facing rather than normal player shell.

## Boundary

Text only. Do not alter import/export format, animation behavior, presentation editor mechanics, restart/new-life mechanics, legacy persistence or Save identity.
