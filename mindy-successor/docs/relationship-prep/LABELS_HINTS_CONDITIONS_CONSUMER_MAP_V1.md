# Labels / Hints / Conditions Consumer Map v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `3fc5495310e281cf5cbe52da3642000f1cb1fb05` (post-PR53)
Current app blob: `30626e7fd68e6d92fcd01f0eb3bea1a1605002fb`

Mapped fixtures:
- item 114 `condition-state-word-localization-v1.fixture.json`
- item 115 `global-ui-shell-localization-v3.fixture.json`
- item 116 `global-labels-hints-localization-v1.fixture.json`

Every 139 localization entry in those fixtures is mapped below.

| Localization key | Exact current app.ts consumer seam | Current fallback/source | Integration status |
|---|---|---|---|
| `housing.cheap.label` | explain(housingTier) line ~52 for target id 'cheap'; canonical housingState.current resolver | cheap | WIRE_LABEL_RESOLVER |
| `housing.hostel.label` | central(): town-note labels[r.housing] line ~174; explain(housing) line ~73 for legacy id 'hostel' | Дешёвый ночлег | WIRE_LABEL_RESOLVER |
| `housing.normal.label` | explain(housingTier) line ~52 for target id 'normal'; canonical housingState.current resolver | normal | WIRE_LABEL_RESOLVER |
| `housing.room.label` | central(): town-note labels[r.housing] line ~174; explain(housing) line ~73 for legacy id 'room' | Обычная комната | WIRE_LABEL_RESOLVER |
| `housing.shelter.label` | central(): town-note labels[r.housing] line ~174; explain(housing) line ~73 for legacy id 'shelter' | Улица | WIRE_LABEL_RESOLVER |
| `housing.street.label` | explain(housingTier) line ~52 for target id 'street'; canonical housingState.current resolver | street | WIRE_LABEL_RESOLVER |
| `item.field_preservation_kit.label` | panelContent(): Bag inventory labels['field_preservation_kit'] line ~183; explain(itemCount/item) lines ~46/~74 | field_preservation_kit | WIRE_LABEL_RESOLVER |
| `item.herb.label` | panelContent(): Bag inventory labels['herb'] line ~183; explain(itemCount/item) lines ~46/~74 | Травы | WIRE_LABEL_RESOLVER |
| `item.old_boundary_token.label` | panelContent(): Bag inventory labels['old_boundary_token'] line ~183; explain(itemCount/item) lines ~46/~74 | old_boundary_token | WIRE_LABEL_RESOLVER |
| `item.reinforced_axe.label` | panelContent(): Bag inventory labels['reinforced_axe'] line ~183; explain(itemCount/item) lines ~46/~74 | reinforced_axe | WIRE_LABEL_RESOLVER |
| `item.rope_kit.label` | panelContent(): Bag inventory labels['rope_kit'] line ~183; explain(itemCount/item) lines ~46/~74 | rope_kit | WIRE_LABEL_RESOLVER |
| `item.scales.label` | panelContent(): Bag inventory labels['scales'] line ~183; explain(itemCount/item) lines ~46/~74 | Весы | WIRE_LABEL_RESOLVER |
| `item.tonic.label` | panelContent(): Bag inventory labels['tonic'] line ~183; explain(itemCount/item) lines ~46/~74 | Микстуры | WIRE_LABEL_RESOLVER |
| `metric.alchemy.label` | explain(metric) line ~70; result delta label labels['alchemy'] line ~172 when not filtered | Алхимия | WIRE_LABEL_RESOLVER |
| `metric.composure.label` | explain(metric) line ~70; result delta label labels['composure'] line ~172 when not filtered | Самообладание (legacy) | WIRE_LABEL_RESOLVER |
| `metric.debt.label` | explain(metric) line ~70; result delta label labels['debt'] line ~172 when not filtered | Долг | WIRE_LABEL_RESOLVER |
| `metric.empathy.label` | explain(metric) line ~70; result delta label labels['empathy'] line ~172 when not filtered | Чуткость (legacy) | WIRE_LABEL_RESOLVER |
| `metric.health.label` | explain(metric) line ~70; result delta label labels['health'] line ~172 when not filtered | Здоровье | WIRE_LABEL_RESOLVER |
| `metric.intelligence.label` | explain(metric) line ~70; result delta label labels['intelligence'] line ~172 when not filtered | Разум (legacy) | WIRE_LABEL_RESOLVER |
| `metric.lessons.label` | explain(metric) line ~70; result delta label labels['lessons'] line ~172 when not filtered | Уроки | WIRE_LABEL_RESOLVER |
| `metric.lust.label` | explain(metric) line ~70; result delta label labels['lust'] line ~172 when not filtered | Похоть | WIRE_LABEL_RESOLVER |
| `metric.organization.label` | explain(metric) line ~70; result delta label labels['organization'] line ~172 when not filtered | Организация (legacy) | WIRE_LABEL_RESOLVER |
| `metric.perception.label` | explain(metric) line ~70; result delta label labels['perception'] line ~172 when not filtered | Чутьё (legacy) | WIRE_LABEL_RESOLVER |
| `metric.persuasion.label` | explain(metric) line ~70; result delta label labels['persuasion'] line ~172 when not filtered | Обаяние (legacy) | WIRE_LABEL_RESOLVER |
| `metric.trust.label` | explain(metric) line ~70; result delta label labels['trust'] line ~172 when not filtered | Доверие | WIRE_LABEL_RESOLVER |
| `metric.work.label` | explain(metric) line ~70; result delta label labels['work'] line ~172 when not filtered | Практика в лавке | WIRE_LABEL_RESOLVER |
| `resource.energy.label` | explain(resource) line ~45; generic metric/result presentation for resource id 'energy' where applicable | Энергия | WIRE_LABEL_RESOLVER |
| `resource.money.label` | explain(resource) line ~45; generic metric/result presentation for resource id 'money' where applicable | Монеты | WIRE_LABEL_RESOLVER |
| `season.autumn.label` | render(): HUD labels[d.season] line ~192; explain(calendarSeason/season) lines ~49/~73 when id='autumn' | Осень | WIRE_LABEL_RESOLVER |
| `season.spring.label` | render(): HUD labels[d.season] line ~192; explain(calendarSeason/season) lines ~49/~73 when id='spring' | Весна | WIRE_LABEL_RESOLVER |
| `season.summer.label` | render(): HUD labels[d.season] line ~192; explain(calendarSeason/season) lines ~49/~73 when id='summer' | Лето | WIRE_LABEL_RESOLVER |
| `season.winter.label` | render(): HUD labels[d.season] line ~192; explain(calendarSeason/season) lines ~49/~73 when id='winter' | Зима | WIRE_LABEL_RESOLVER |
| `stat.charm.hint` | central(): creation stat tooltip hints['charm'] line ~146; panelContent(): Stats panel hint hints['charm'] line ~181 | Личное влияние и привлекательность общения. | WIRE_LABEL_RESOLVER |
| `stat.creativity.hint` | central(): creation stat tooltip hints['creativity'] line ~146; panelContent(): Stats panel hint hints['creativity'] line ~181 | Искусство, создание нового и выразительные решения. | WIRE_LABEL_RESOLVER |
| `stat.dexterity.hint` | central(): creation stat tooltip hints['dexterity'] line ~146; panelContent(): Stats panel hint hints['dexterity'] line ~181 | Координация, точность и скрытные физические действия. | WIRE_LABEL_RESOLVER |
| `stat.endurance.hint` | central(): creation stat tooltip hints['endurance'] line ~146; panelContent(): Stats panel hint hints['endurance'] line ~181 | Перенос нагрузки и тяжёлых условий. Не равна дневной Energy. | WIRE_LABEL_RESOLVER |
| `stat.grooming.hint` | central(): creation stat tooltip hints['grooming'] line ~146; panelContent(): Stats panel hint hints['grooming'] line ~181 | Уход за собой и профессиональная презентация; может быстро расти и падать. | WIRE_LABEL_RESOLVER |
| `stat.magic.hint` | central(): creation stat tooltip hints['magic'] line ~146; panelContent(): Stats panel hint hints['magic'] line ~181 | Чувствительность и практика взаимодействия с магией. | WIRE_LABEL_RESOLVER |
| `stat.manners.hint` | central(): creation stat tooltip hints['manners'] line ~146; panelContent(): Stats panel hint hints['manners'] line ~181 | Этикет, статусное поведение и формальная социальная дисциплина. | WIRE_LABEL_RESOLVER |
| `stat.reason.hint` | central(): creation stat tooltip hints['reason'] line ~146; panelContent(): Stats panel hint hints['reason'] line ~181 | Учёба, теория, память и анализ. | WIRE_LABEL_RESOLVER |
| `stat.sexuality.hint` | central(): creation stat tooltip hints['sexuality'] line ~146; panelContent(): Stats panel hint hints['sexuality'] line ~181 | Телесная уверенность и профессиональная сексуальная подача. | WIRE_LABEL_RESOLVER |
| `stat.sociability.hint` | central(): creation stat tooltip hints['sociability'] line ~146; panelContent(): Stats panel hint hints['sociability'] line ~181 | Неформальные связи, группы и поддержание контактов. | WIRE_LABEL_RESOLVER |
| `stat.strength.hint` | central(): creation stat tooltip hints['strength'] line ~146; panelContent(): Stats panel hint hints['strength'] line ~181 | Грубая физическая сила. | WIRE_LABEL_RESOLVER |
| `stat.wits.hint` | central(): creation stat tooltip hints['wits'] line ~146; panelContent(): Stats panel hint hints['wits'] line ~181 | Практическая хитрость, импровизация и обход препятствий. | WIRE_LABEL_RESOLVER |
| `ui.activity.checkpointLabel` | central(): activity status line 'checkpoint:', line ~156 | Контрольная точка | WIRE_TR |
| `ui.activity.eyebrow` | central(): active flow.activity stage eyebrow, line ~156 | Вылазка | WIRE_TR |
| `ui.activity.progressLabel` | central(): activity status line 'Прогресс:', line ~156 | Прогресс | WIRE_TR |
| `ui.activity.routeLabel` | central(): optional activity route segment 'route:', line ~156 | Маршрут | WIRE_TR |
| `ui.app.catalogLoadFailed` | main(): content.json fetch failure Error, line ~218 | Не удалось прочитать каталог. | WIRE_TR |
| `ui.app.startFailed` | main().catch(): startup shell text, line ~226 | Ошибка запуска: {error} | WIRE_ERROR_WRAPPER |
| `ui.condition.andSeparator` | app.ts explain(): case 'all' join(' и '), line ~75 |  и  | WIRE_SEPARATOR |
| `ui.condition.calendarDayInYear` | app.ts explain(): condition kind/template 'calendarDayInYear', lines ~47–75 | День года {comparison} | WIRE_FMT_TR |
| `ui.condition.calendarElapsedDays` | app.ts explain(): condition kind/template 'calendarElapsedDays', lines ~47–75 | Прошло дней {comparison} | WIRE_FMT_TR |
| `ui.condition.calendarYear` | app.ts explain(): condition kind/template 'calendarYear', lines ~47–75 | Год {comparison} | WIRE_FMT_TR |
| `ui.condition.careerChoice` | app.ts explain(): condition kind/template 'careerChoice', lines ~47–75 | Карьера {career}: {choice} = {value} | WIRE_FMT_TR |
| `ui.condition.careerCounter` | app.ts explain(): condition kind/template 'careerCounter', lines ~47–75 | Карьера {career}: {counter} {comparison} | WIRE_FMT_TR |
| `ui.condition.careerFact` | app.ts explain(): condition kind/template 'careerFact', lines ~47–75 | Карьера {career}: факт {fact} {state} | WIRE_FMT_TR |
| `ui.condition.careerShifts` | app.ts explain(): condition kind/template 'careerShifts', lines ~47–75 | Карьера {career}: смен {comparison} | WIRE_FMT_TR |
| `ui.condition.careerStage` | app.ts explain(): condition kind/template 'careerStage', lines ~47–75 | Карьера {career}: этап {stage} | WIRE_FMT_TR |
| `ui.condition.compare.eq` | app.ts explain(): local cmp(op,value), current comparison symbol generation around lines 42–43 | = | REFACTOR_CMP_PRESENTATION |
| `ui.condition.compare.gte` | app.ts explain(): local cmp(op,value), current comparison symbol generation around lines 42–43 | ≥ | REFACTOR_CMP_PRESENTATION |
| `ui.condition.compare.lte` | app.ts explain(): local cmp(op,value), current comparison symbol generation around lines 42–43 | ≤ | REFACTOR_CMP_PRESENTATION |
| `ui.condition.flagFalse` | app.ts explain(): condition kind/template 'flagFalse', lines ~47–75 | Этот этап уже пройден | WIRE_TR |
| `ui.condition.flagTrue` | app.ts explain(): condition kind/template 'flagTrue', lines ~47–75 | Продвиньте связанную историю | WIRE_TR |
| `ui.condition.housingTier` | app.ts explain(): condition kind/template 'housingTier', lines ~47–75 | Жильё: {housing} | WIRE_FMT_TR |
| `ui.condition.itemCapability` | app.ts explain(): condition kind/template 'itemCapability', lines ~47–75 | Возможность предмета {capability}: {state} | WIRE_FMT_TR |
| `ui.condition.metaEndingCompleted` | app.ts explain(): condition kind/template 'metaEndingCompleted', lines ~47–75 | Судьба {ending}: {state} | WIRE_FMT_TR |
| `ui.condition.metaHardWork` | app.ts explain(): condition kind/template 'metaHardWork', lines ~47–75 | Тяжкий труд {career}: {state} | WIRE_FMT_TR |
| `ui.condition.metaUnlock` | app.ts explain(): condition kind/template 'metaUnlock', lines ~47–75 | Наследие {unlock}: {state} | WIRE_FMT_TR |
| `ui.condition.not` | app.ts explain(): condition kind/template 'not', lines ~47–75 | Не требуется: {condition} | WIRE_FMT_TR |
| `ui.condition.notRequiredPrefix` | app.ts explain(): case 'not' prefix 'Не требуется: ', line ~74 | Не требуется:  | WIRE_PREFIX |
| `ui.condition.orSeparator` | app.ts explain(): case 'any' join(' или '), line ~75 |  или  | WIRE_SEPARATOR |
| `ui.condition.questChoice` | app.ts explain(): condition kind/template 'questChoice', lines ~47–75 | Задание {quest}: {choice} = {value} | WIRE_FMT_TR |
| `ui.condition.questCounter` | app.ts explain(): condition kind/template 'questCounter', lines ~47–75 | Задание {quest}: {counter} {comparison} | WIRE_FMT_TR |
| `ui.condition.questFact` | app.ts explain(): condition kind/template 'questFact', lines ~47–75 | Задание {quest}: факт {fact} {state} | WIRE_FMT_TR |
| `ui.condition.questStage` | app.ts explain(): condition kind/template 'questStage', lines ~47–75 | Задание {quest}: этап {stage} | WIRE_FMT_TR |
| `ui.condition.relationshipChoice` | app.ts explain(): condition kind/template 'relationshipChoice', lines ~47–75 | Отношения {relationship}: {choice} = {value} | WIRE_FMT_TR |
| `ui.condition.relationshipCounter` | app.ts explain(): condition kind/template 'relationshipCounter', lines ~47–75 | Отношения {relationship}: {counter} {comparison} | WIRE_FMT_TR |
| `ui.condition.relationshipFact` | app.ts explain(): condition kind/template 'relationshipFact', lines ~47–75 | Отношения {relationship}: факт {fact} {state} | WIRE_FMT_TR |
| `ui.condition.relationshipStage` | app.ts explain(): condition kind/template 'relationshipStage', lines ~47–75 | Отношения {relationship}: этап {stage} | WIRE_FMT_TR |
| `ui.condition.state.absent` | app.ts explain(): boolean/state branches for itemCapability, career/quest/relationship facts, world/meta conditions around lines 47,56,60,64,66–69 | отсутствует | WIRE_SUBVALUE |
| `ui.condition.state.completed` | app.ts explain(): boolean/state branches for itemCapability, career/quest/relationship facts, world/meta conditions around lines 47,56,60,64,66–69 | пройдена | WIRE_SUBVALUE |
| `ui.condition.state.finished` | app.ts explain(): boolean/state branches for itemCapability, career/quest/relationship facts, world/meta conditions around lines 47,56,60,64,66–69 | завершён | WIRE_SUBVALUE |
| `ui.condition.state.no` | app.ts explain(): boolean/state branches for itemCapability, career/quest/relationship facts, world/meta conditions around lines 47,56,60,64,66–69 | нет | WIRE_SUBVALUE |
| `ui.condition.state.notCompleted` | app.ts explain(): boolean/state branches for itemCapability, career/quest/relationship facts, world/meta conditions around lines 47,56,60,64,66–69 | не пройдена | WIRE_SUBVALUE |
| `ui.condition.state.notFinished` | app.ts explain(): boolean/state branches for itemCapability, career/quest/relationship facts, world/meta conditions around lines 47,56,60,64,66–69 | не завершён | WIRE_SUBVALUE |
| `ui.condition.state.present` | app.ts explain(): boolean/state branches for itemCapability, career/quest/relationship facts, world/meta conditions around lines 47,56,60,64,66–69 | есть | WIRE_SUBVALUE |
| `ui.condition.state.yes` | app.ts explain(): boolean/state branches for itemCapability, career/quest/relationship facts, world/meta conditions around lines 47,56,60,64,66–69 | есть | WIRE_SUBVALUE |
| `ui.condition.visits` | app.ts explain(): condition kind/template 'visits', lines ~47–75 | {action}: {value} смен | WIRE_FMT_TR |
| `ui.condition.word.career` | app.ts explain(): careerStage/careerShifts/careerCounter/careerFact/careerChoice branches, lines ~53–57 | Карьера | WIRE_SUBVALUE_OR_TEMPLATE |
| `ui.condition.word.dayOfYear` | app.ts explain(): calendarDayInYear branch, line ~50 | День года | WIRE_SUBVALUE_OR_TEMPLATE |
| `ui.condition.word.daysElapsed` | app.ts explain(): calendarElapsedDays branch, line ~51 | Прошло дней | WIRE_SUBVALUE_OR_TEMPLATE |
| `ui.condition.word.fact` | app.ts explain(): career/quest/relationship fact literal 'факт', lines ~56/~60/~64 | факт | WIRE_SUBVALUE_OR_TEMPLATE |
| `ui.condition.word.fate` | app.ts explain(): metaEndingCompleted branch, line ~68 | Судьба | WIRE_SUBVALUE_OR_TEMPLATE |
| `ui.condition.word.hardWork` | app.ts explain(): metaHardWork branch, line ~69 | Тяжкий труд | WIRE_SUBVALUE_OR_TEMPLATE |
| `ui.condition.word.housing` | app.ts explain(): housingTier branch, line ~52 | Жильё | WIRE_SUBVALUE_OR_TEMPLATE |
| `ui.condition.word.legacy` | app.ts explain(): metaUnlock branch, line ~67 | Наследие | WIRE_SUBVALUE_OR_TEMPLATE |
| `ui.condition.word.quest` | app.ts explain(): questStage/questCounter/questFact/questChoice branches, lines ~58–61 | Задание | WIRE_SUBVALUE_OR_TEMPLATE |
| `ui.condition.word.relationship` | app.ts explain(): relationshipStage/relationshipCounter/relationshipFact/relationshipChoice branches, lines ~62–65 | Отношения | WIRE_SUBVALUE_OR_TEMPLATE |
| `ui.condition.word.shifts` | app.ts explain(): careerShifts/visits literal 'смен', lines ~54/~71 | смен | WIRE_SUBVALUE_OR_TEMPLATE |
| `ui.condition.word.stage` | app.ts explain(): career/quest/relationship stage literal 'этап', lines ~53/~58/~62 | этап | WIRE_SUBVALUE_OR_TEMPLATE |
| `ui.condition.word.worldFact` | app.ts explain(): worldFact branch, line ~66 | Факт мира | WIRE_SUBVALUE_OR_TEMPLATE |
| `ui.condition.word.year` | app.ts explain(): calendarYear branch, line ~48 | Год | WIRE_SUBVALUE_OR_TEMPLATE |
| `ui.condition.worldFact` | app.ts explain(): condition kind/template 'worldFact', lines ~47–75 | Факт мира {fact}: {state} | WIRE_FMT_TR |
| `ui.confirm.acceptEnding` | render(): data-ending confirm(), line ~203 | Принять судьбу и завершить эту жизнь? | WIRE_TR_CONFIRM |
| `ui.confirm.loadSave` | render(): import confirm(), line ~212 | Загрузить жизнь? Постоянные открытия сохранятся. | WIRE_TR_CONFIRM |
| `ui.confirm.restart` | render(): #restart confirm(), line ~209 | Завершить текущую жизнь без новой награды? Наследие сохранится. Сначала можно экспортировать эту жизнь. | WIRE_TR_CONFIRM |
| `ui.creation.body` | central(): incomplete creation body, line ~146 | Новый город ещё ничего о вас не знает. | WIRE_TR |
| `ui.creation.decreaseStatAria` | central(): decrement button aria-label, line ~146 | Уменьшить {stat} | WIRE_FMT_TR |
| `ui.creation.eyebrow` | central(): incomplete creation eyebrow, line ~146 | До первого шага | WIRE_TR |
| `ui.creation.freePoints` | central(): age/free-points paragraph, line ~146 | 25 лет · свободных очков: {points} | WIRE_FMT_TR |
| `ui.creation.heroineTitle` | central(): creation form <h2>, line ~146 | Ваша героиня | WIRE_TR |
| `ui.creation.increaseStatAria` | central(): increment button aria-label, line ~146 | Увеличить {stat} | WIRE_FMT_TR |
| `ui.creation.startButton` | central(): #create button, line ~146 | Начать историю | WIRE_TR |
| `ui.creation.title` | central(): incomplete creation <h1>, line ~146 | Кем вы войдёте в этот мир? | WIRE_TR |
| `ui.media.missing` | mediaHTML(): no resolved media candidate fallback, line ~140 | Сцена доступна без медиа | WIRE_TR |
| `ui.menu.animationOff` | panelContent(): animationsEnabled false literal, line ~187 | выключена | WIRE_SUBVALUE |
| `ui.menu.animationOn` | panelContent(): animationsEnabled true literal, line ~187 | включена | WIRE_SUBVALUE |
| `ui.menu.animationToggle` | panelContent(): #animation-toggle composed label, line ~187 | Анимация GIF: {state} | WIRE_FMT_TR |
| `ui.menu.editor` | panelContent(): menu editor button, line ~187 | Тексты и изображения | WIRE_TR |
| `ui.menu.exportSave` | panelContent(): menu #export button, line ~187 | Экспорт сохранения | WIRE_TR |
| `ui.menu.footer` | panelContent(): muted menu footer paragraph, line ~187 | M3 · Игровая оболочка. Иллюстрации — заменяемые эскизы. Новая героиня начинает со статами 1 и десятью очками. У загруженной старой жизни характеристики сохранены. | WIRE_TR |
| `ui.menu.importSave` | panelContent(): menu #import button, line ~187 | Импорт сохранения | WIRE_TR |
| `ui.menu.restart` | panelContent(): #restart button, line ~187 | Новая героиня с сохранением наследия | WIRE_TR |
| `ui.presentation.customLoadFailed` | main(): custom presentation load catch toast, line ~219 | Замены не загружены: {error} | WIRE_ERROR_WRAPPER |
| `ui.presentation.saved` | render(): presentation editor save callback toast, line ~214 | Замены сохранены. | WIRE_TR |
| `ui.save.backupRecovered` | main(): gameStorage/localStorage recovery toast, lines ~221–222 | Восстановлена резервная копия. | WIRE_TR |
| `ui.save.fileTooLarge` | render(): import file-size validation toast, line ~212 | Файл слишком большой. | WIRE_TR |
| `ui.save.importFailed` | render(): import catch currently message=String(e), line ~212 | Не удалось загрузить сохранение: {error} | WIRE_ERROR_WRAPPER |
| `ui.save.loadStopped` | main(): protected load catch toast, line ~223 | Загрузка остановлена: {error}. Автоперезапись отключена; импортируйте сохранение через меню. | WIRE_ERROR_WRAPPER |
| `ui.save.loaded` | render(): successful import toast, line ~212 | Сохранение загружено. | WIRE_TR |
| `ui.save.noHealthyBackup` | main(): localStorage backup failure Error, line ~222 | Нет исправной резервной копии. | WIRE_TR |
| `unlock.calendar.label` | panelContent(): Legacy state.meta.unlocks labels['calendar'] line ~184; explain(unlock/metaUnlock) lines ~67/~73 | Дополнительное время | WIRE_LABEL_RESOLVER |
| `unlock.court.label` | panelContent(): Legacy state.meta.unlocks labels['court'] line ~184; explain(unlock/metaUnlock) lines ~67/~73 | Придворная выдержка | WIRE_LABEL_RESOLVER |
| `unlock.guild.label` | panelContent(): Legacy state.meta.unlocks labels['guild'] line ~184; explain(unlock/metaUnlock) lines ~67/~73 | Своя в артели | WIRE_LABEL_RESOLVER |
| `unlock.host.label` | panelContent(): Legacy state.meta.unlocks labels['host'] line ~184; explain(unlock/metaUnlock) lines ~67/~73 | Гостеприимство | WIRE_LABEL_RESOLVER |
| `unlock.mediator.label` | panelContent(): Legacy state.meta.unlocks labels['mediator'] line ~184; explain(unlock/metaUnlock) lines ~67/~73 | Посредница | WIRE_LABEL_RESOLVER |
| `unlock.scholar.label` | panelContent(): Legacy state.meta.unlocks labels['scholar'] line ~184; explain(unlock/metaUnlock) lines ~67/~73 | Образование | WIRE_LABEL_RESOLVER |
| `unlock.vitality.label` | panelContent(): Legacy state.meta.unlocks labels['vitality'] line ~184; explain(unlock/metaUnlock) lines ~67/~73 | Запас сил | WIRE_LABEL_RESOLVER |

## Shared label resolver recommendation

For generic IDs, Lead should use one presentation helper that selects the stable domain key without changing the ID:

- current target stat → `stat.<id>.label`
- resource → `resource.<id>.label`
- legacy/generic metric → `metric.<id>.label`
- season → `season.<id>.label`
- housing → `housing.<id>.label`
- item → `item.<id>.label`
- meta unlock → `unlock.<id>.label`

Fallback remains `labels[id] ?? id`.

## Hint resolver

Current target stat hints should resolve:

`tr(`stat.${id}.hint`, hints[id] ?? '')`

The stable stat ID is unchanged.

## Condition resolver

A presentation refactor may use item-113 templates plus item-114 state words/operators. It must not rewrite condition objects or localized prose into Save.

## Error wrapper rule

Entries marked `WIRE_ERROR_WRAPPER` localize only the stable wrapper. Preserve the raw validator/exception payload as `{error}` when no stable semantic error code exists.

## Invariants

Wiring changes presentation only:
- same IDs;
- same conditions/eligibility;
- same action/effect resolution;
- same inventory/resources;
- same Save;
- same RNG.
