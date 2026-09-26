# Контрольная точка M3.2 — 2026-09-24

Продолжение M2, база m3-stage. Архитектура TypeScript/Electron и старые ID сохранены.

## Реализовано
- Игровая сцена в центре; постоянные дата, год, монеты и энергия. Работа, школа, статы и журнал открываются отдельно. Нет длинной страницы карточек.
- 11 характеристик: базовое значение 1, десять распределяемых очков. Желание — отдельная характеристика, влияющая на вероятность и выбор постановки.
- Три единицы энергии; одна на занятие. Ночь только по команде игрока. Нормальный сон восстанавливает 3, улица 2. Наследие vitality добавляет единицу.
- Ночная оплата: монеты, сезонная помощь ценой характеристики или улица. Аренда 18/35/60/90/115 по годам. Нет прежнего недельного списания и ежедневной платы за еду.
- Рабочая сцена, повтор смены, итог изменений; сцена события и изображение выбранного результата в том же окне.
- Один вероятностный пример у лесорубов: обычный выход, учебный поединок или добровольный флирт. Последний пока разговор/прогулка, не откровенный контент. Сохранённый RNG воспроизводит выбор.
- Четыре сезонных слота на работу; временные оригинальные SVG, у лесорубов движется пила. GIF/видео можно подключить редактором.
- Судьба за 24 смены лесоруба даёт vitality в следующей жизни.
- Schema 3, миграция M1/M2, сцена и история сохраняются. Старые высокие статы намеренно не обнуляются. Для нового старта используйте меню перезапуска; наследие сохраняется.

## Проверено
npm run check: типы, каталог, сборка, 36/36 тестов. Каталог: 18 событий, 25 действий, 6 судеб.
Реальный Electron renderer в Linux offscreen: создание, город, работа, событие, альтернативная сцена, ночь. Проверены 1280×800, 960×640, 1920×1080, 850×640: нет прокрутки всей страницы и битых изображений. Сценарий scripts/visual-check.cjs, результаты в preview переданного архива. Windows-установщик здесь не проверен.

## Ограничения
Это прототип, не наполненная четырёхлетняя игра. JRPG-карт и боевой системы ещё нет; поединок в сцене — текстовый выбор. Полные отношения, ночные встречи NPC, тренировки перед сном и дорогие постоянные школьные усиления ещё предстоят.
Здоровье/стресс сохранены как совместимые поля старых сохранений, но не показываются и не участвуют в текущем ежедневном цикле. Изображения временные, сезонные слоты пока используют общие эскизы. Подмены presentation.json экспортируются отдельно от жизни.

## Продолжение
1. Прочитать AGENTS, README, этот файл; git status; npm run check.
2. Отдать DeepSeek одну задачу DS-004/005/006/007 на базе m3-stage. DS-007 меняет только постановки, не механику. Принимать по одному пакету, повторяя проверки.
3. Централизованно: ночные события жилья/NPC и независимые отношения, затем первый JRPG-район с перемещением, NPC, боями и сохранением экспедиции.
4. После каждого законченного этапа commit и npm run checkpoint. При лимите оставить точный статус и не пересоздавать проект.

## M3.1: DS-007 принят
Восемь сезонных текстов подключены через content/presentation.json. Проверка allowlist прошла до центральной интеграции; исправлены две формулировки с обязательным неуспехом охоты и бессодержательное самосравнение в тесте. Пользовательские замены накладываются поверх поставляемых по ключам: свои тексты/медиа сохраняются, новые сезонные тексты появляются в незаменённых полях. Сохранения жизни и механика не изменены. Следующая контентная задача — DS-004 на отдельной базе m3-stage.

## 2026-09-24: формат делегирования v2
Игровая сборка остаётся M3.1, контент не добавлен. DS-004–006 больше не выдавать как разработческие задания. Готов изолированный DS-004A: три базовые сцены, один result.json; все условия, эффекты и сборка остаются у интегратора. Следующий шаг — принять A, затем выдать сезонные альтернативы B. См. docs/tasks/EXTERNAL-CONTENT-PROTOCOL.md.

## DS-004A принят, DS-004B выдан
Оригинал принятого A сохранён в delegation/DS-004A/accepted/result.json; схема, ID и длины проверены, все три сцены заполнены. Механика в игру не добавлена. Следующее действие: получить шесть сезонных text из delegation/DS-004B/executor/result.json, затем собрать полный ds-lumber и проверить маршруты централизованно. Выдача B строго по одной сцене (два текста) за запрос.

## DS-004B и SOL-001
B принят с редактурой: исходник/принятый вариант в delegation/DS-004B/accepted. A+B пока не в игре. Подготовлен SOL-001 на сборку ds-lumber и сценарные тесты; результатом должны стать ровно три файла. Игровая версия остаётся M3.1. См. docs/tasks/MODEL-WORKFLOW.md.

## M3.2 — SOL-001 принят и подключён
Три события лесорубов на 3/7/12 сменах, по три постановки и два выбора. Принятые A/B собраны без изменений текста. Механика, core, UI и схема сохранений не менялись. Каталог: 4 пакета, 21 событие, 25 действий, 6 судеб. Полный npm run check: 43/43 теста; границы пакета проверены. Добавлена проверка продолжения работы до 24 смен без повторных сцен/наград, концовка за стаж остаётся доступна.
Новая сборка совместима с M3.1. В старой жизни с большим стажем цепочка начинается с первого непройденного этапа при следующей подходящей смене, не перескакивает сразу к финалу. Итог пилота SOL: рабочий пакет принят без исправления производственного JSON; интегратор расширил тесты. Следующую задачу выбирать из небольших независимых пакетов, не перепоручать общую архитектуру.


## A1 target-state migration — 2026-09-26

A1 реализован на ветке `a1-state-migration`.

Изменено ядро сохранения:
- schemaVersion 4;
- target domain ownership: Calendar / Character / Resources / Day / Housing / Progression / Endings / Flow / RNG / History;
- 12 target progression stats + separate Lust;
- 10 creation points только по progression stats;
- target 160-day calendar (4×40, seasons по 10 дней);
- fresh money 600, Energy 3;
- ambiguous M3.2 prototype metrics quarantined in `legacyCompat` rather than silently reinterpreted;
- safe legacy aliases include `intelligence -> reason` and `persuasion -> charm`;
- schema3 saves beyond the target 160-day active range are rejected rather than wrapped.

Чтобы M3.2 demo-content/UI можно было мигрировать последовательно, добавлен non-enumerable compatibility façade для старых обращений `run.metrics/run.day/run.flags/run.inventory/run.pending/...`. Эти alias-поля не сериализуются: JSON-save содержит только target owners.

Проверено реальным GitHub Actions runner:
- `npm run typecheck` — pass;
- `npm run validate` — pass;
- `npm run build` — pass;
- `npm test` — 48/48 pass;
- полный `npm run check` — pass.

Следующий пакет: A2 Condition/Effect v2. Не масштабировать production content до A2–A6 и Product Acceptance Slice.


## A2 typed Condition/Effect v2 — 2026-09-26

A2 completed on `a2-condition-effect-v2`.

Core now supports target typed conditions/effects over schema-v4 owners without arbitrary save paths. Career/Quest/Relationship definitions can declare named stages and transitions. Effect batches use deterministic phases so counters/facts can satisfy a later named transition in the same transaction. Invalid transition ID, wrong source stage or failed transition condition aborts without mutating the caller's Save.

New content packs may declare typed read/write capabilities. Undeclared target-domain access is rejected by the loader. Legacy M3.2 `metric/flag/visits` content remains loadable during migration but is not the target authoring model.

Next-day modifiers now apply their Energy/stat effects once at the day boundary and then clear.

Schema-v4 loading additionally validates persisted career/quest/relationship IDs and stages against the active catalog.

Real GitHub Actions validation:
- `npm run typecheck` pass;
- `npm run validate` pass;
- `npm run build` pass;
- `npm test` **58/58**;
- `npm run check` pass.

Next architecture package: A3 Event Resolver.


## A3 deterministic Event Resolver — 2026-09-26

A3 completed on `a3-event-resolver`.

The old action-only event scheduler has been replaced by one reaction resolver. Existing M3.2 action triggers remain compatible through ActionCompleted facts; target events can subscribe to typed stat/domain/world/calendar facts.

Resolver state is persisted:
- reaction epoch;
- probabilistic attempt IDs;
- blocking cascade depth;
- latched/scheduled/optional resolved instances.

Blocking PendingScene snapshots variant + allowed choice IDs + reactionEpochId. Reload does not reroll chance/variant.

Implemented delivery:
- live blocking;
- optional non-blocking offers;
- latched;
- scheduled with deterministic expiry.

Priority class ordering is fixed before numeric priority. Equal candidates use oldest eligibility, least-recently-shown, then stable event ID.

After a scene choice, typed effects/transitions are applied and the resolver reruns immediately. Synthetic acceptance proves School -> Career -> Quest cascade without an extra daily action.

Cascade limit is 16 and failure is atomic to the caller.

Real GitHub Actions:
- typecheck pass;
- validate pass;
- build pass;
- tests **72/72**;
- full `npm run check` pass.

Next architecture package: A4 Night Flow.


## A4 resumable Night Flow — 2026-09-26

A4 completed on `a4-night-flow`.

Night is now an explicit persisted lifecycle instead of a single pay+day++ command.

Implemented phases:
`PreLodgingForcedCheck -> LodgingResolution -> PostLodgingForcedCheck -> VoluntaryNightChoice -> NightEventResolution -> NextDayModifiersFinalized -> CalendarAdvance -> StartDay`.

Target Night commands are resumable. Lodging payment is committed separately from calendar advance, so reload after payment cannot charge twice.

Target definitions now support normal/cheap/street-style lodging and voluntary night choices. Forced events can intercept before lodging, after lodging or after the voluntary choice and can suppress rent/menu according to policy.

Night study uses immediate progress plus a next-day Energy modifier; relationship nights consume the night slot without charging daytime Energy by default.

Street-style effects can queue Grooming and Energy penalties for StartDay exactly once.

The legacy M3.2 `sleep(payment)` command remains as a compatibility wrapper over the same NightFlow, not a second authoritative sleep implementation.

Real GitHub Actions:
- typecheck pass;
- validate pass;
- build pass;
- tests **84/84**;
- full `npm run check` pass.

Next architecture package: A5 Activity Envelope.
