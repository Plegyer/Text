# Global UI Shell Consumer Map v2

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `5dffefd15703d431a604b4cc9f831c4e55460aed` (post-PR52)
Current consumer blob: `src/ui/app.ts` @ `312399d01b211f13c29017c1e17b61f2027d21b3`
Fixture: `content/global-ui-shell-localization-v2.fixture.json`

Every one of the 109 item-105 keys is mapped below. No UI code is edited by this item.

| Localization key | Exact current consumer seam | Current fallback/source | Wiring status |
|---|---|---|---|
| `season.autumn.label` | HUD season label labels[d.season], app.ts ~192; explain(calendarSeason/season), app.ts ~49/~73 | Осень | NEEDS_LOCALE_LABEL_RESOLVER |
| `season.spring.label` | HUD season label labels[d.season], app.ts ~192; explain(calendarSeason/season), app.ts ~49/~73 | Весна | NEEDS_LOCALE_LABEL_RESOLVER |
| `season.summer.label` | HUD season label labels[d.season], app.ts ~192; explain(calendarSeason/season), app.ts ~49/~73 | Лето | NEEDS_LOCALE_LABEL_RESOLVER |
| `season.winter.label` | HUD season label labels[d.season], app.ts ~192; explain(calendarSeason/season), app.ts ~49/~73 | Зима | NEEDS_LOCALE_LABEL_RESOLVER |
| `ui.activity.checkpointLabel` | central(), active flow.activity status line, app.ts ~156 | checkpoint: | NEEDS_TR |
| `ui.activity.enduranceLabel` | central(), active flow.activity status line, app.ts ~156 | Выносливость: | NEEDS_TR |
| `ui.activity.eyebrow` | central(), active flow.activity stage eyebrow, app.ts ~156 | Activity | NEEDS_TR |
| `ui.activity.progressLabel` | central(), active flow.activity status line, app.ts ~156 | Прогресс: | NEEDS_TR |
| `ui.activity.routeLabel` | central(), active flow.activity optional route segment, app.ts ~156 | route: | NEEDS_TR |
| `ui.app.catalogLoadFailed` | content.json response failure throw, app.ts ~218 | Не удалось прочитать каталог. | NEEDS_TR |
| `ui.app.startFailed` | main().catch root shell, app.ts ~226 | Ошибка запуска: {error} | NEEDS_FMT_TR |
| `ui.arrival.body` | pre-arrival body, app.ts ~150 | Обычный день. Белый суслик. Люк, который кто-то забыл закрыть. | NEEDS_TR |
| `ui.arrival.button` | pre-arrival data-action='arrival' button, app.ts ~150 | Пойти за ним | NEEDS_TR |
| `ui.arrival.title` | pre-arrival title, app.ts ~150 | Следуйте за сусликом | NEEDS_TR |
| `ui.bag.debtLabel` | Bag panel debt paragraph, app.ts ~183 | Долг: | NEEDS_TR |
| `ui.bag.empty` | Bag panel empty inventory seam, app.ts ~183 | none | OPTIONAL_INSERTION |
| `ui.bag.title` | panelContent(), panel==='bag' heading, app.ts ~183 | Сумка и дела | NEEDS_TR |
| `ui.condition.andSeparator` | explain(all).join(), app.ts ~75 |  и  | NEEDS_TR_SEPARATOR |
| `ui.condition.calendarDayInYear` | explain(calendarDayInYear), app.ts ~50 | День года {comparison} | NEEDS_FMT_TR |
| `ui.condition.calendarElapsedDays` | explain(calendarElapsedDays), app.ts ~51 | Прошло дней {comparison} | NEEDS_FMT_TR |
| `ui.condition.calendarYear` | explain(calendarYear), app.ts ~48 | Год {comparison} | NEEDS_FMT_TR |
| `ui.condition.careerChoice` | explain(careerChoice), app.ts ~57 | Карьера {career}: {choice} = {value} | NEEDS_FMT_TR |
| `ui.condition.careerCounter` | explain(careerCounter), app.ts ~55 | Карьера {career}: {counter} {comparison} | NEEDS_FMT_TR |
| `ui.condition.careerFact` | explain(careerFact), app.ts ~56 | Карьера {career}: факт {fact} {state} | NEEDS_FMT_TR |
| `ui.condition.careerShifts` | explain(careerShifts), app.ts ~54 | Карьера {career}: смен {comparison} | NEEDS_FMT_TR |
| `ui.condition.careerStage` | explain(careerStage), app.ts ~53 | Карьера {career}: этап {stage} | NEEDS_FMT_TR |
| `ui.condition.flagFalse` | explain(flag) when value=false, app.ts ~72 | Этот этап уже пройден | NEEDS_FMT_TR |
| `ui.condition.flagTrue` | explain(flag) when value=true, app.ts ~72 | Продвиньте связанную историю | NEEDS_FMT_TR |
| `ui.condition.housingTier` | explain(housingTier), app.ts ~52 | Жильё: {housing} | NEEDS_FMT_TR |
| `ui.condition.itemCapability` | explain(itemCapability), app.ts ~47 | Возможность предмета {capability}: {state} | NEEDS_FMT_TR |
| `ui.condition.metaEndingCompleted` | explain(metaEndingCompleted), app.ts ~68 | Судьба {ending}: {state} | NEEDS_FMT_TR |
| `ui.condition.metaHardWork` | explain(metaHardWork), app.ts ~69 | Тяжкий труд {career}: {state} | NEEDS_FMT_TR |
| `ui.condition.metaUnlock` | explain(metaUnlock), app.ts ~67 | Наследие {unlock}: {state} | NEEDS_FMT_TR |
| `ui.condition.not` | explain(not), app.ts ~74 | Не требуется: {condition} | NEEDS_FMT_TR |
| `ui.condition.orSeparator` | explain(any).join(), app.ts ~75 |  или  | NEEDS_TR_SEPARATOR |
| `ui.condition.questChoice` | explain(questChoice), app.ts ~61 | Задание {quest}: {choice} = {value} | NEEDS_FMT_TR |
| `ui.condition.questCounter` | explain(questCounter), app.ts ~59 | Задание {quest}: {counter} {comparison} | NEEDS_FMT_TR |
| `ui.condition.questFact` | explain(questFact), app.ts ~60 | Задание {quest}: факт {fact} {state} | NEEDS_FMT_TR |
| `ui.condition.questStage` | explain(questStage), app.ts ~58 | Задание {quest}: этап {stage} | NEEDS_FMT_TR |
| `ui.condition.relationshipChoice` | explain(relationshipChoice), app.ts ~65 | Отношения {relationship}: {choice} = {value} | NEEDS_FMT_TR |
| `ui.condition.relationshipCounter` | explain(relationshipCounter), app.ts ~63 | Отношения {relationship}: {counter} {comparison} | NEEDS_FMT_TR |
| `ui.condition.relationshipFact` | explain(relationshipFact), app.ts ~64 | Отношения {relationship}: факт {fact} {state} | NEEDS_FMT_TR |
| `ui.condition.relationshipStage` | explain(relationshipStage), app.ts ~62 | Отношения {relationship}: этап {stage} | NEEDS_FMT_TR |
| `ui.condition.state.absent` | explain(): careerFact/questFact/relationshipFact false branch, app.ts ~56/~60/~64 | отсутствует | NEEDS_TR_SUBVALUE |
| `ui.condition.state.completed` | explain(): metaEndingCompleted true branch, app.ts ~68 | пройдена | NEEDS_TR_SUBVALUE |
| `ui.condition.state.finished` | explain(): metaHardWork true branch, app.ts ~69 | завершён | NEEDS_TR_SUBVALUE |
| `ui.condition.state.no` | explain(): itemCapability/worldFact/metaUnlock false branch, app.ts ~47/~66/~67 | нет | NEEDS_TR_SUBVALUE |
| `ui.condition.state.notCompleted` | explain(): metaEndingCompleted false branch, app.ts ~68 | не пройдена | NEEDS_TR_SUBVALUE |
| `ui.condition.state.notFinished` | explain(): metaHardWork false branch, app.ts ~69 | не завершён | NEEDS_TR_SUBVALUE |
| `ui.condition.state.present` | explain(): careerFact/questFact/relationshipFact true branch, app.ts ~56/~60/~64 | есть | NEEDS_TR_SUBVALUE |
| `ui.condition.state.yes` | explain(): itemCapability/worldFact/metaUnlock true branch, app.ts ~47/~66/~67 | есть | NEEDS_TR_SUBVALUE |
| `ui.condition.visits` | explain(visits), app.ts ~71 | {action}: {value} смен | NEEDS_FMT_TR |
| `ui.condition.worldFact` | explain(worldFact), app.ts ~66 | Факт мира {fact}: {state} | NEEDS_FMT_TR |
| `ui.confirm.acceptEnding` | data-ending click confirm(), app.ts ~203 | Принять судьбу и завершить эту жизнь? | NEEDS_TR |
| `ui.confirm.loadSave` | file import confirm(), app.ts ~212 | Загрузить жизнь? Постоянные открытия сохранятся. | NEEDS_TR |
| `ui.confirm.restart` | #restart click confirm(), app.ts ~209 | Завершить текущую жизнь без новой награды? Наследие сохранится. Сначала можно экспортировать эту жизнь. | NEEDS_TR |
| `ui.creation.body` | central(), incomplete creation shell body, app.ts ~146 | Новый город ещё ничего о вас не знает. | NEEDS_TR |
| `ui.creation.decreaseStatAria` | central(), stat decrement aria-label, app.ts ~146 | Уменьшить {stat} | NEEDS_FMT_TR |
| `ui.creation.eyebrow` | central(), incomplete creation shell, app.ts ~146 | До первого шага | NEEDS_TR |
| `ui.creation.freePoints` | central(), creation form points paragraph, app.ts ~146 | 25 лет · свободных очков: {points} | NEEDS_FMT_TR |
| `ui.creation.heroineTitle` | central(), creation form <h2>, app.ts ~146 | Ваша героиня | NEEDS_TR |
| `ui.creation.increaseStatAria` | central(), stat increment aria-label, app.ts ~146 | Увеличить {stat} | NEEDS_FMT_TR |
| `ui.creation.startButton` | central(), #create button, app.ts ~146 | Начать историю | NEEDS_TR |
| `ui.creation.title` | central(), incomplete creation shell <h1>, app.ts ~146 | Кем вы войдёте в этот мир? | NEEDS_TR |
| `ui.explore.activityHelp` | activityEntryList(), app.ts ~112 | Отдельная Activity · checkpoint save/reload | NEEDS_TR |
| `ui.explore.enterButton` | activityEntryList(), data-enter-activity button, app.ts ~112 | Войти | NEEDS_TR |
| `ui.explore.entryEnergy` | activityEntryList(), app.ts ~112 | {entryEnergyCost} энергии на вход | NEEDS_FMT_TR |
| `ui.explore.errandsSummary` | panelContent(), Explore details summary, app.ts ~179 | Обычные поручения | NEEDS_TR |
| `ui.explore.title` | panelContent(), panel==='explore', app.ts ~179 | Окрестности и поручения | NEEDS_TR |
| `ui.generic.closeButton` | overlay close aria-label, app.ts ~192 | Закрыть | NEEDS_TR |
| `ui.generic.dismissButton` | toast dismiss aria-label, app.ts ~192 | Закрыть уведомление | NEEDS_TR |
| `ui.generic.selectButton` | actionList() ordinary non-profession button, app.ts ~96 | Выбрать | NEEDS_TR |
| `ui.journal.empty` | Journal panel when run.journal is empty, app.ts ~182 | none | OPTIONAL_INSERTION |
| `ui.legacy.acceptButton` | Legacy data-ending buttons, app.ts ~184 | Принять судьбу | NEEDS_TR |
| `ui.legacy.emptyInheritance` | Legacy empty meta.unlocks fallback, app.ts ~184 | Ещё впереди | NEEDS_TR |
| `ui.legacy.help` | Legacy intro paragraph, app.ts ~184 | Достижение судьбы не завершает жизнь. Принятие выдаёт её наследие. | NEEDS_TR |
| `ui.legacy.inheritanceTitle` | Legacy secondary heading, app.ts ~184 | Наследие | NEEDS_TR |
| `ui.legacy.nextLifeButton` | Legacy #new-life button, app.ts ~184 | Следующая жизнь | NEEDS_TR |
| `ui.media.missing` | mediaHTML(), no selected media fallback, app.ts ~140 | Сцена доступна без медиа | NEEDS_TR |
| `ui.menu.animationOff` | menu animation state branch, app.ts ~187 | выключена | NEEDS_TR_SUBVALUE |
| `ui.menu.animationOn` | menu animation state branch, app.ts ~187 | включена | NEEDS_TR_SUBVALUE |
| `ui.menu.animationToggle` | menu #animation-toggle text, app.ts ~187 | Анимация GIF: {state} | NEEDS_FMT_TR |
| `ui.menu.editor` | menu data-panel='editor' button, app.ts ~187 | Тексты и изображения | NEEDS_TR |
| `ui.menu.exportSave` | menu #export button, app.ts ~187 | Экспорт сохранения | NEEDS_TR |
| `ui.menu.footer` | menu muted footer paragraph, app.ts ~187 | M3 · Игровая оболочка. Иллюстрации — заменяемые эскизы. Новая героиня начинает со статами 1 и десятью очками. У загруженной старой жизни характеристики сохранены. | NEEDS_TR |
| `ui.menu.importSave` | menu #import button, app.ts ~187 | Импорт сохранения | NEEDS_TR |
| `ui.menu.restart` | menu #restart button, app.ts ~187 | Новая героиня с сохранением наследия | NEEDS_TR |
| `ui.panel.journal` | panelContent(), panel==='journal' heading, app.ts ~182 | Дневник | ROOT_IDENTICAL_NEEDS_CONSUMER |
| `ui.panel.legacy` | panelContent(), panel==='legacy' heading, app.ts ~184 | Судьбы | ROOT_IDENTICAL_NEEDS_CONSUMER |
| `ui.panel.stats` | panelContent(), panel==='stats' heading, app.ts ~181 | Героиня | ROOT_IDENTICAL_NEEDS_CONSUMER |
| `ui.presentation.customLoadFailed` | custom presentation load catch toast, app.ts ~219 | Замены не загружены: {error} | NEEDS_FMT_TR |
| `ui.presentation.saved` | presentation editor save callback toast, app.ts ~214 | Замены сохранены | NEEDS_TR |
| `ui.result.chooseLodging` | zero-Energy result shortcut, app.ts ~172 | Выбрать ночлег | NEEDS_TR |
| `ui.result.returnTown` | result #to-town, app.ts ~172 | Вернуться в город | ALREADY_WIRED_ROOT_IDENTICAL |
| `ui.save.backupRecovered` | gameStorage/localStorage recovery toast, app.ts ~221/~222 | Восстановлена резервная копия | NEEDS_TR |
| `ui.save.fileTooLarge` | file import size validation, app.ts ~212 | Файл слишком большой | NEEDS_TR |
| `ui.save.importFailed` | file import catch, app.ts ~212 | raw String(e) | NEW_LOCALIZED_WRAPPER |
| `ui.save.loadStopped` | outer load catch toast, app.ts ~223 | Загрузка остановлена: {error}. Автоперезапись отключена; импортируйте сохранение через меню. | NEEDS_FMT_TR |
| `ui.save.loaded` | successful file import toast, app.ts ~212 | Сохранение загружено | NEEDS_TR |
| `ui.save.noHealthyBackup` | localStorage backup failure throw, app.ts ~222 | Нет исправной резервной копии | NEEDS_TR |
| `ui.sleep.help` | panelContent(), Sleep paragraph, app.ts ~180 | NightFlow отдельно фиксирует lodging, voluntary choice и следующий день. | NEEDS_TR |
| `ui.sleep.startButton` | panelContent(), data-end-day button, app.ts ~180 | Начать NightFlow | NEEDS_TR |
| `ui.sleep.title` | panelContent(), panel==='sleep', app.ts ~180 | Ночь | NEEDS_TR |
| `ui.stats.help` | Stats panel after heading, app.ts ~181 | none | OPTIONAL_INSERTION |
| `ui.stats.professionsHelp` | Stats panel before profession-count paragraph, app.ts ~181 | none | OPTIONAL_INSERTION |
| `ui.stats.professionsTitle` | Stats panel professions heading, app.ts ~181 | Профессии | NEEDS_TR |
| `ui.town.eyebrow` | pre-arrival eyebrow, app.ts ~150; town/home wordmark already localized at ~174/~192 | По ту сторону люка | ROOT_IDENTICAL_MULTI_CONSUMER |
| `ui.work.recipeFast` | actionList() brew/bold button, app.ts ~96 | Быстро | NEEDS_TR |
| `ui.work.recipeReliable` | actionList() brew/gentle button, app.ts ~96 | Надёжно | NEEDS_TR |

## Wiring rules

- Direct fixed text: `tr(key,currentFallback)`.
- Templates: `fmt(tr(key,approvedRuFallback),values)`.
- Dynamic state words and separators: resolve their own stable keys before interpolating/joining.
- Season labels: resolve from the locale-neutral season ID; use the current `labels[season]` as RU fallback.
- Existing exact root keys must be reused, not duplicated under new semantic IDs.
- Optional insertion keys may be omitted without changing mechanics.

## Condition explanation constraint

The templates above localize only presentation grammar. Condition objects and their values remain authoritative. Do not translate or rewrite stored fact/stage/counter/choice IDs as gameplay identity.

## Locale invariants

UI wiring must not change:
- command/action/ending/Activity IDs;
- panel selection;
- eligibility;
- effects;
- resources;
- NightFlow state;
- RNG;
- Save identity.
