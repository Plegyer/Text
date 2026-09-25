# Successor — Event Resolver contract v1

Дата: 2026-09-25.

Статус: **TARGET ARCHITECTURE CONTRACT**.

Цель: сохранить сильную реактивность Simply Mindy, но сделать порядок событий детерминированным, сохраняемым и тестируемым.

## 1. Что Resolver решает

После любого state-changing boundary могут стать доступны события другой системы.

Примеры:
- школа подняла stat -> career stage ready;
- работа достигла нужного shifts threshold;
- night counter достиг 10;
- Activity вернула quest item/result;
- наступил календарный день;
- ending стало eligible;
- forced night condition активировалось.

Resolver отвечает только за arbitration событий. Он не является владельцем career/quest state.

## 2. Reaction boundary

Resolver вызывается после атомарной команды/effect batch в определённых точках:

- character creation completion;
- action completion;
- event choice resolution;
- StartDay;
- calendar advance;
- Night resolution;
- Activity exit/result;
- domain transition;
- ending commitment/completion.

Resolver НЕ запускается посреди применения одного effect batch.

## 3. Reaction facts

Команда формирует набор фактов текущей транзакции, например:

```text
ActionCompleted(job.lumber)
StatChanged(strength, old, new)
CareerCounterChanged(lumber, shifts, 14, 15)
DayStarted(...)
NightResolved(...)
ActivityCompleted(...)
WorldFactAdded(...)
EndingEligible(...)
```

Event definition подписывается на typed trigger kinds, а не только action ID.

Conditions затем проверяют полный authoritative state.

## 4. Event candidate

```text
EventDefinition
  id
  sourceDomain
  triggers[]
  conditions[]
  priorityClass
  priority
  blocking
  repeatPolicy
  cooldown
  chance?
  variants[]
  choices[]
```

`priorityClass` не заменяет числовой priority, а ограничивает категории, чтобы content author не дал бытовому событию priority выше terminal transition.

## 5. Priority classes

Target order:

1. `terminal`
2. `ending_committed`
3. `forced`
4. `scheduled_mandatory`
5. `critical_progression`
6. `normal_progression`
7. `optional_world`
8. `notification`

Внутри class:
1. numeric priority descending;
2. oldest eligible/scheduled first;
3. least recently shown, где применимо;
4. stable event ID lexical tie-break.

Одинаковый save всегда выбирает одно и то же событие.

## 6. Chance resolution

Chance бросается только после:
- trigger match;
- conditions;
- cooldown/repeat checks;
- availability of a valid variant/choice.

RNG persisted.

Важно: проигранный chance не должен бесконечно перебрасываться из-за UI rerender/save reload.

Resolver фиксирует attempt identity в transaction/reaction epoch.

## 7. Reaction epoch

Каждая state-changing command создаёт `reactionEpochId`.

В рамках epoch:
- один probabilistic event проверяется максимум один раз;
- generated candidates получают стабильный snapshot/attempt marker;
- save/load не создаёт новый бросок.

После следующей пользовательской command или явного lifecycle boundary начинается новый epoch.

## 8. Blocking event

Если выбран blocking event:
- он превращается в persisted `PendingScene`;
- обычные actions блокируются;
- UI показывает resolved variant;
- RNG outcome и variant уже не перебрасываются.

PendingScene хранит минимум:
- eventId;
- variantId;
- reactionEpochId;
- context/facts needed for resolution;
- optional allowedChoiceIds snapshot, если design требует фиксировать доступность.

## 9. После choice — повторная проверка

Ключевое расширение против M3.2:

`resolve choice -> apply effects -> domain transitions -> new reaction facts -> run Resolver again`.

Если появился новый blocking event, он может следовать сразу.

Если нет — flow возвращается в DayHub/Night/Activity caller.

## 10. Cascade limit

Чтобы ошибка контента не создала бесконечную цепь:

- hard technical cap blocking cascade per command, например configurable 16;
- если cap превышен — deterministic engine error + diagnostic trace;
- validator/test tooling предупреждает о очевидных loops.

Число cap — техническая константа, не gameplay rule.

## 11. Queue semantics

Не нужно сохранять гигантский список всех когда-либо eligible events.

Resolver может повторно вычислять candidates после каждого resolution.

Persisted queue нужна только для событий, чьё право показа должно пережить изменение conditions.

Для таких событий EventDefinition имеет delivery policy:
- `live`: показывать только пока conditions истинны;
- `latched`: eligibility фиксируется и ждёт показа;
- `scheduled`: созданный календарный instance сохраняется до resolve/expire.

## 12. Optional events

Optional world/day events не должны блокировать critical progression без причины.

Варианты:
- создать Offer в DayState;
- notification + добровольная кнопка;
- blocking только если content explicitly forced.

Это позволяет реализовать minor-crisis pattern оригинала без перехвата дня.

## 13. Ending eligibility

Resolver может обнаружить eligibility, но не обязан сразу показывать ending scene.

Effect:
`RegisterEndingEligible(endingId)`.

Commitment происходит отдельной player command/central location rule.

После commitment priority class `ending_committed` подавляет normal progression.

## 14. Final/alternate modes

Ruleset может отключать event categories или domains декларативно.

Например:
- optional crises disabled;
- normal careers suspended;
- отдельный event catalog.

Не размазывать `if finaleMode` по сотням handlers.

## 15. Debug trace

Для dev/test режима Resolver возвращает trace:

```text
trigger facts
candidate events
rejected reason per event
chance roll
sorted order
selected event
variant selection
cascade depth
```

Это заменяет гадание, почему career сцена "внезапно" запустилась.

## 16. Minimum tests

Обязательные tests:
- одинаковый priority -> stable ID order;
- save/reload не перебрасывает RNG;
- school stat gain запускает career event;
- choice запускает следующий event cascade;
- higher class beats arbitrary high lower-class number;
- committed ending suppresses normal progression;
- optional offer не блокирует work;
- latched event переживает временную потерю condition;
- scheduled event expires по explicit policy;
- cascade loop ловится cap;
- pending blocks incompatible commands;
- resolver trace объясняет rejection.
