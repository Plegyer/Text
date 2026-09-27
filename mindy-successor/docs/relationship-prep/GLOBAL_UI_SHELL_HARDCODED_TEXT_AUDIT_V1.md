# Global UI Shell Hardcoded Text Audit v1

Date: 2026-09-27
Owner: Chat 5
Exact current-main baseline: `f93878b954385a1c61d8a06a0673354207d11d70`
Audited consumer: `src/ui/app.ts`

## Scope

Player-facing hardcoded shell text in current main, excluding:
- School-owned strings already localized under `ui.school.*`;
- poverty-owned presentation/content;
- Foreman-owned presentation/content;
- Forest-result content owned by Chat3;
- debug/editor/catalog/internal-only copy.

## READY_FOR_85_96_SOURCE

### Explore panel / activity entry
Current seams:
- panel title: `Окрестности и поручения`
- Activity explanation: `Отдельная Activity · checkpoint save/reload`
- entry cost suffix: `энергии на вход`
- enter button: `Войти`
- disclosure summary: `Обычные поручения`

Owner in this queue: items 86, 94, 95.

### Generic Sleep panel
Current seams:
- panel title: `Ночь`
- help: `NightFlow отдельно фиксирует lodging, voluntary choice и следующий день.`
- start button: `Начать NightFlow`

Owner in this queue: item 87.

Chat3 overlap remains excluded for the dedicated NightFlow stage text, lodging choice scene, voluntary-night choice scene, generic Night-slot annotations and lodging mechanics.

### Stats panel
Current seams:
- `Героиня`
- `Профессии`

Individual stat/career gameplay IDs are not localization identities.

Owner: item 88.

### Journal panel
Current seam:
- `Дневник`

The journal entries themselves are stored source strings. Their locale-neutral outcome consumer is governed by item 80 and is not solved by shell localization.

Owner: item 89.

### Bag/debt panel
Current seams:
- `Сумка и дела`
- `Долг:`

Inventory item names continue to come from existing labels/content.

Owner: item 90.

### Legacy/endings panel
Current seams:
- `Судьбы`
- `Достижение судьбы не завершает жизнь. Принятие выдаёт её наследие.`
- `Принять судьбу`
- `Наследие`
- `Ещё впереди`
- `Следующая жизнь`

Owner: item 91.

### Pre-arrival screen
Current seams:
- eyebrow: `По ту сторону люка`
- title: `Следуйте за сусликом`
- body: `Обычный день. Белый суслик. Люк, который кто-то забыл закрыть.`
- action button: `Пойти за ним`

Owner: item 92.

### Shared controls
Hardcoded generic controls still present:
- ordinary non-profession action button: `Выбрать`
- Activity entry: `Войти`
- modal close aria-label: `Закрыть`
- toast dismiss aria-label: `Закрыть уведомление`
- result-to-sleep button: `Выбрать ночлег`
- legacy accept: `Принять судьбу`
- next-life: `Следующая жизнь`
- brew mode buttons: `Надёжно`, `Быстро`

Some have domain-specific source files in this queue; item 93 supplies stable generic/shared labels and aliases without changing gameplay IDs.

## ALREADY_LOCALIZED_CURRENT_MAIN

No new source work required for:
- HUD day/year/energy/coins/menu;
- town eyebrow/title/prompts/subtitles;
- dock panel labels;
- Work title, profession Work button, work-again/result-return labels;
- School panel and lesson/night-study strings;
- language selector and menu title.

These already resolve through `tr(...)` and current root `ui.*` entries.

## CHAT3_NIGHT_LODGING_OVERLAP_EXCLUDED

Do not duplicate or override through this queue:
- NightFlow lodging stage `Ночлег`;
- lodging instruction `Выберите место на эту ночь. Оплата фиксируется ровно один раз.`;
- lodging option money / next-day Energy annotations;
- voluntary Night choice stage `Вечер`;
- `Один добровольный Night choice. Daytime Energy не расходуется.`;
- generic Night-slot annotation;
- active NightFlow phase scene;
- NightFlow mechanics or choice/lodging IDs.

Item 87 is limited to the outer Sleep panel shell before NightFlow starts.

## REMAINING_PLAYER_FACING_DEBT OUTSIDE ITEMS 86–93

These are genuine hardcoded player-facing seams, but no dedicated source file is assigned in this queue:

### Character creation
- `До первого шага`
- `Кем вы войдёте в этот мир?`
- `Новый город ещё ничего о вас не знает.`
- `Ваша героиня`
- `25 лет · свободных очков:`
- stat increase/decrease aria-labels
- `Начать историю`

### Event/result shell
- event eyebrow `Встреча`
- ended/expired headings `Судьба принята` / `Срок истёк`
- `Судьбы и следующая жизнь`
- town note prefix `Ночлег сегодня:`

### Active Activity shell
- eyebrow `Activity`
- `Прогресс:`
- `Выносливость:`
- literal `checkpoint:` / `route:`

These are player-visible today but look partly like development terminology; product/Lead should decide whether to retain or replace wording before localization.

### Condition explanation text
`explain()` contains numerous Russian-only human-readable condition descriptions such as:
- item capability;
- calendar day/year;
- housing/career/quest/relationship/world/meta facts;
- `Не требуется`;
- conjunctions `и` / `или`.

They appear in requirements/endings UI and need a separate structured localization pass because values and operators are composed dynamically.

### Menu/save lifecycle
Hardcoded player-facing strings remain for:
- export/import save;
- animation toggle;
- restart/new-hero control;
- confirmation dialogs;
- save import/recovery status/errors.

These are not authored in items 86–93 and remain a follow-up shell-localization debt.

## NON_PLAYER_FACING_EXCLUDED

Excluded from this queue:
- presentation editor heading/control copy;
- event catalog inspector;
- startup/catalog load diagnostics intended for operational failure handling;
- implementation tokens used as debug/status vocabulary where Product has not approved player wording;
- code-level internal keys/IDs.

## Consumer rule

All source text prepared by items 86–93 must be wired by Lead using stable `ui.*` localization keys and existing `tr(key,fallback)` behavior.

Locale switching must not:
- dispatch an action;
- enter/exit an Activity;
- start/end NightFlow;
- accept an ending;
- mutate Save;
- consume RNG.
