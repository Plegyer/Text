# Mixed-Life Job Unlock Simulation v1

Дата: 2026-09-25.

Статус: **EXECUTED BALANCE ANALYSIS**.

Основание:
- `ORDINARY_JOB_UNLOCK_THRESHOLDS_v0.csv`;
- locked 3 Energy/day;
- fresh economy candidate v2.

Цель: проверить не speedrun, а жизнь, где часть Energy уходит не на work/School.

## 1. Scenario A — focused sprint

Все 3 Energy/day разрешены на starter work / School. Normal lodging = 2 WU.

Результаты: Tavern day 10; Guard day 13; Merchant day 21; Hunter day 22; Prostitute day 31; Assassin day 32; Artist/Geisha day 33.

Это theoretical minimum.

## 2. Scenario B — mixed life + normal lodging

Каждый день минимум 1 Energy считается занятым relationships / Activity-equivalent / city events / other life.
На work/School остаётся максимум 2 Energy/day. Normal lodging = 2 WU.

| Job | Stat-gate earliest | Calendar fallback | Actual access implication |
|---|---:|---|---|
| Tavern | day 19 | Year 2 / day 41 | stats win |
| Guard | day 35 | Year 2 / day 41 | stats barely win |
| Hunter | day 63 | Year 2 / day 41 | fallback wins |
| Merchant | not feasible before day 80 | Year 2 / day 41 | fallback wins |
| Prostitute | day 51 | Year 3 / day 81 | stats win in Year 2 |
| Artist/Geisha | day 63 | Year 3 / day 81 | stats win in Year 2 |
| Assassin | not feasible before day 80 | Year 3 / day 81 | fallback likely wins |

Это близко к желаемому поведению: targeted builds can beat calendar; mixed casual life often receives jobs through fallback.

## 3. Scenario C — mixed life + cheap lodging

Same life budget: 1 Energy/day reserved for other life; max 2 Energy/day work/School. Cheap lodging test = 1 WU/night.

| Job | Earliest |
|---|---:|
| Tavern | day 15 |
| Merchant | day 22 |
| Hunter | day 23 |
| Guard | day 24 |
| Prostitute | day 35 |
| Assassin | day 35 |
| Artist/Geisha | day 38 |

Cheap housing converts money otherwise spent on rent into School access.

## 4. Design meaning

Это потенциально **хорошо**, а не автоматически ошибка баланса.

Более бедная жизнь может создавать другую структуру возможностей:
- хуже Night/housing comfort;
- возможная потеря Grooming;
- меньше private/relationship options;
- зато больше денег остаётся на School.

Это поддерживает LIFE-05: poverty — другой способ жить, а не только меньшие числа.

## 5. Cheap lodging must not strictly dominate

Если cheap lodging стоит примерно вдвое меньше normal, нужны meaningful tradeoffs:
- restricted voluntary Night menu;
- Grooming pressure;
- часть relationship scenes недоступна;
- меньше privacy/storage;
- отдельные social/career scenes требуют normal housing.

Не компенсировать всё обязательным случайным stat damage каждый вечер.

## 6. Job unlock conclusion

Current threshold matrix ведёт себя хорошо в трёх стилях:
- focused player покупает ранний доступ временем;
- mixed normal player часто приходит к calendar fallback;
- frugal/poor player перенаправляет housing savings в School и открывает jobs раньше, но живёт с housing disadvantages.

Структура `3 start -> stat gate OR calendar fallback` выглядит устойчивой.

## 7. Next balance dependency

Перед final threshold lock последствия cheap lodging важнее, чем двигать gate numbers на ±5.
Threshold structure currently looks stable.