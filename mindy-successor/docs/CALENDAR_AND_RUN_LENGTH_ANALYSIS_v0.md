# Calendar and Run Length Analysis v0

Дата: 2026-09-25.

Статус: **ANALYSIS WITH ACCEPTED TARGET**. User accepted Option A: 160 days = 4 years x 40 days, 4 seasons x 10 days.

Основание:
- base daily Energy = 3;
- Work = 1 Energy;
- School = 1 Energy + money;
- large Activity entry = 2 Energy;
- Night study -> -1 next-day Energy;
- seasons должны реально менять игру;
- replayability важнее попытки увидеть всё за один run.

## 1. Что должен обеспечить календарь

Run должен быть достаточно длинным, чтобы игрок успел:
- развить 1–3 серьёзных жизненных маршрута;
- пережить несколько сезонов;
- увидеть последствия школы/отношений;
- сделать несколько Activity runs;
- получить несколько одновременно eligible endings.

Но не настолько длинным, чтобы:
- 10 профессий можно было спокойно закрыть за одну жизнь;
- repeatable pools выгорали;
- поздние годы превращались в grind;
- один run занимал столько времени, что NG+ терял смысл.

## 2. Energy budget

Без meta/night penalties:

`total ordinary action budget = days * 3`.

Примеры:

| Run length | Max daily Energy budget |
|---|---:|
| 120 days | 360 |
| 160 days | 480 |
| 200 days | 600 |
| 224 days | 672 |
| 320 days | 960 |
| 448 days | 1344 |

Это верхняя граница: Night penalties, forced routes и Activity structure уменьшают реальную свободу.

## 3. Option A — compact 4x40

4 years x 40 days = 160 days.

Each year:
- 4 seasons x 10 days.

Плюсы:
- очень читаемая структура;
- seasons часто меняются;
- 480 Energy создают сильную opportunity cost;
- удобно для replay;
- content budget не взрывается;
- близко по плотности к референсу, но не копирует content.

Минусы:
- 10-day season требует аккуратных scheduled windows;
- длинные career chains должны быть хорошо темпированы;
- игрок может чувствовать давление времени.

## 4. Option B — medium 4x56

4 years x 56 days = 224 days.

Each year:
- 4 seasons x 14 days.

Плюсы:
- больше времени на школу/отношения;
- сезон всё ещё меняется достаточно часто;
- 672 Energy дают простор для mixed-life runs.

Минусы:
- выше риск закрывать слишком много careers за одну жизнь;
- больше repeatable content pressure;
- нужно больше micro-events/variants.

## 5. Option C — historical prototype 4x112

4 years x 112 days = 448 days.

Each season = 28 days.

Плюсы:
- очень много пространства;
- легко делать медленные routes.

Минусы:
- 1344 Energy — огромный budget;
- слабее replay pressure;
- потребует гораздо больше repeatable content;
- простой Hard Work threshold быстро теряет цену;
- Night/poverty/school pressure ощущается слабее;
- риск очень длинных runs.

Для текущего product vision этот вариант выглядит слишком длинным.

## 6. Recommendation

Зафиксированный target:
**160 days (4x40)**.

Причины:
- поддерживает плотность решений;
- seasons заметны;
- replay meaningful;
- compatible with content budget;
- достаточно места для одной глубокой career + второй/третьей side-route;
- делает School/Activity реальной конкуренцией за Energy.

Это рекомендация SOL, не lock.

## 7. Career pacing implication

При 160 days:
- 50 shifts = 50 Energy;
- это ~10.4% всего theoretical Energy budget;
- реально больше по opportunity cost, потому что игрок платит за School/Activity/other jobs.

Hard Work в диапазоне нескольких десятков shifts остаётся серьёзным, но достижимым.

Не фиксировать original 15/50 thresholds автоматически.

## 8. Seasonal event windows

При 10-day season нельзя ставить слишком много mandatory events.

Rule:
- major scheduled event максимум несколько на year;
- optional seasonal events имеют windows, а не единственный exact day;
- missed event не должен ломать весь career без альтернативы, кроме специально задуманных редких routes.

## 9. Run-end behavior

До финального lock нужно решить:
- terminal ending selection at time limit;
- grace period;
- central ending location;
- whether player may accept any eligible ending near end.

Предпочтительный target:
`time limit -> final choice window -> select among eligible outcomes / fallback life result`.

Не завершать run случайным mid-action cutoff.

## 10. Meta extra-time

Extra year/day reward потенциально очень силён.

При 160-day base:
+40 days = +25% времени.

Это major rule modifier, не Hard Work-level reward.

Если extra-time существует, оно должно быть high-tier/selectable.

## 11. Secret Debt timing

User-directed route:
- rare street lender event;
- immediate loan around 2000;
- demand around 20000 after 10 days.

При compact calendar 10 days = целый season.

Это делает ловушку очень заметной системно.

Exact numbers/probability всё ещё OPEN.

## 12. Acceptance before lock

Прогнать минимум scenarios:
- poor run;
- school-heavy run;
- single-career specialist;
- two-career mixed;
- Activity-heavy;
- Secret Debt;
- NG+ with strong modifier.

Проверить:
- сколько endings реально достигается;
- сколько season windows игрок видит;
- сколько дней повторяет одну и ту же activity;
- есть ли мягкий запас на ошибки.

## 13. Открыто

- run-end grace;
- year naming;
- extra-time meta reward;
- scheduled event density.
