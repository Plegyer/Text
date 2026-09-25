# Successor — save/content migration contract v1

Дата: 2026-09-25.

Статус: **TARGET ARCHITECTURE CONTRACT**.

## 1. Два независимых version axis

Save хранит минимум:

- `schemaVersion` — структура state;
- `contentVersion` — набор/семантика content IDs и definitions.

Нельзя считать, что одинаковая schema означает совместимый content.

## 2. Migration pipeline

Загрузка:

```text
parse raw JSON
-> identify schemaVersion
-> sequential schema migrations
-> content ID/data migrations
-> validate target schema
-> validate references against current catalog
-> merge protected current Meta policy
-> invariant validation
-> return Save
```

Каждая migration:
- pure/deterministic;
- versioned;
- tested fixture;
- не использует текущий RNG для придумывания прошлого;
- не восстанавливает неизвестный progress фантазией.

## 3. Never silently drop progress

Если старое поле нельзя достоверно мигрировать:
- сохранить documented fallback;
- либо отказать с понятной incompatible-save ошибкой;
- либо поместить legacy payload в диагностический quarantine, если это предусмотрено.

Не обнулять молча career/meta progress.

## 4. Meta merge policy

M3.2 уже защищает persistent progress от отката старым imported save.

Target должен формализовать merge per meta field:

- completed endings: union;
- unlocks: union;
- hardWorkProgress: union;
- run counters lifetime: max/sum только по явно определённой семантике;
- mutually exclusive persistent choices: explicit conflict policy;
- rule modifiers: merge by definition, не "последний JSON победил".

Импорт save не должен отнимать уже заработанное в текущем профиле.

## 5. Pending scene migration

Если save содержит PendingScene:
- eventId/variantId должны иметь mapping;
- resolved random outcome сохраняется;
- migration не перебрасывает variant/chance.

Если target event удалён:
- нужен explicit migration: resolve to fallback, cancel with compensation, либо mark incompatible.
- нельзя просто очистить pending и позволить игроку повторить cost/reward.

## 6. Activity migration

Active ActivityEnvelope содержит `definitionVersion`.

Activity adapter обязан предоставить migration для internalState между поддерживаемыми versions.

Если невозможно:
- безопасный exit migration с заранее заданным result;
- либо несовместимость с ясным сообщением.

Нельзя интерпретировать старый arbitrary activity state новым adapter без version gate.

## 7. Career/quest migration

Переименование stage:
`oldStageId -> newStageId`.

Слияние stages:
- mapping + preservation counters/facts.

Разделение одного старого stage на два новых:
- только если старое состояние даёт достаточные факты для однозначного выбора;
- иначе documented conservative mapping.

Boolean legacy flags M3.2 должны мигрировать в typed domains через явную таблицу.

## 8. Stat catalog migration

Поскольку target stat list ещё не locked, migration должна быть отдельным design task после lock.

Запрещено автоматически:
- суммировать два старых stats;
- усреднять;
- удалять stat;
- превращать stat в condition meter;

без утверждённого mapping.

Prototype M3.2 saves — development artifacts, но pipeline всё равно должен уметь мигрировать поддерживаемые тестовые fixtures, чтобы не ломать саму инженерную дисциплину.

## 9. Calendar migration

Historical M3.2 calendar 28-day season / 448 days не является target rule.

Когда target calendar будет locked:
- state migration должна переводить положение run по утверждённой policy;
- либо старые prototype runs помечаются legacy/dev-only incompatibility.

Не делать математическое масштабирование дней без решения пользователя.

## 10. Exactly-once ending reward

RunResult получает stable `resultId`/transaction identity.

Meta reward хранит proof, что result уже applied.

При reload/повторном click:
- один RunResult;
- одна meta выдача;
- no duplicate unlock/resource.

Atomic SaveEnvelope помогает, но invariant должен быть явным и тестируемым.

## 11. Exactly-once costs

Та же дисциплина для:
- work shift;
- school payment;
- lodging payment;
- Activity entry;
- night action.

Pending flow должен знать, какие costs уже committed.

Reload никогда не списывает их повторно.

## 12. Content validation before play

Catalog loader проверяет:
- IDs;
- references;
- domain permissions;
- condition/effect schemas;
- transition graphs;
- media references;
- migration aliases.

Игра не должна обнаруживать отсутствующий stage/event только после 50 часов run.

## 13. Golden migration fixtures

Хранить маленькие anonymized/generated fixtures:
- M3.2 schema 3 active day;
- pending event;
- completed ending/meta;
- old flags/career progress;
- future target v1 fixtures;
- active Activity.

Для каждой поддерживаемой migration:
`old fixture -> expected target snapshot`.

## 14. Save checksum/security

Для локальной single-player игры anti-cheat не является целью.

Но parser должен:
- ограничивать размеры массивов/строк;
- reject prototype pollution keys;
- reject unknown discriminated union kinds;
- clamp/validate numeric ranges;
- не выполнять код из save/content.

## 15. Presentation overrides

Presentation override versioning остаётся отдельно от mechanics save.

Замена текста/изображения не меняет mechanical IDs.

Если mechanical content ID удаляется, presentation migration может удалить orphan override без изменения gameplay state.

## 16. M3.3

WIP M3.3 не является migration target автоматически.

Его schema-4 идеи можно использовать как reference, но официальный target migration строится от сохранённого stable M3.2 snapshot к будущей утверждённой target schema.
