# User Decisions Locked v1

Дата: 2026-09-25.

Статус: **CURRENT DECISION RECORD**.

Основание: последние прямые решения пользователя + разрешение SOL самостоятельно закрыть оставшиеся ранее предложенные варианты.

## Locked

### D1 — stat count/model
Не сокращать систему до 9 ради упрощения.

Target:
- 12 progression stats;
- отдельная Похоть.

См. `TARGET_STAT_SYSTEM_v1.md`.

### D2 — starting allocation
- 12 progression stats start at 1;
- 10 allocation points между ними;
- Lust отдельно.

### D3 — work stat changes
Отменён universal fixed `+2/+2/-1`.

Работа меняет разные stats по сезонам через seasonal packages.

### D4 — calendar
160 days:
- 4 years;
- 40 days/year;
- 4 seasons x 10 days.

### D5 — meta loadout
- knowledge/content unlocks automatic;
- strong rule modifiers selectable in limited pre-run loadout.
Exact slots/budget later.

### D6 — Palace unlock
Только после Hard Work на **всех 10 ordinary professions**.

Secret Debt/hidden careers не считаются.

### D7 — Large Activity direction
Expedition umbrella:
exploration/navigation + stat challenges + selected puzzle/tracking/investigation/tactical mechanics.

### D8 — Camp
Разрешён для multi-day expeditions.
Отдельный от city night.
Не обязателен в первом Forest product slice.

### D9 — release strategy
Staged internal playable milestones обязательны.
Public 1.0 может выпускаться только когда заявленный full scope действительно собран.

### D10 — Secret Debt in full public build
Да.

### D11 — Palace in full intended 1.0
Да.
Не обязателен в раннем internal product slice.

### D12 — Grooming/Cleanliness
Не отдельный volatile global meter.

**Ухоженность — полноценный progression stat**, допускающий быстрые gains/losses.

При необходимости короткие statuses (muddy/wet/etc.) отдельны.


### D13 — worker queue depth
Coordination target: **12 independent outstanding tasks per active worker whenever practical**.

This is a production-coordination rule, not a requirement to invent filler work:
- Lead verifies completion from Git before replenishing;
- replenish toward 12 when useful independent work exists;
- if a worker has no useful independent task, it may remain idle rather than create low-value staging paperwork;
- one file = one active owner remains mandatory.

This supersedes the earlier nine-deep queue target.

### D14 — starting careers

Стартовые карьеры ровно три:

- Dwarven Lumber;
- Satyr Maid;
- Undead Farm.

Старый набор стартовых профессий с Tavern/Hunter не является текущим дизайном.

Другие ordinary professions открываются позже через stats/build/system progression.

### D15 — profession count and hidden routes

Основная структура:

- 10 ordinary professions;
- hidden Palace как 11-я main profession;
- Secret Debt — отдельный extra hidden/forced route и не входит в эти 10;
- Secret Debt не считается для Palace unlock.

### D16 — ending eligibility is non-terminal

Достижение eligibility для ending не обязано завершать run.

Игрок может продолжать игру после появления доступного ending до явного принятия/commit через существующий ending flow.

### D17 — Lumber Hard Work

Для Dwarven Lumber зафиксировано:

`completed_shifts >= 50`

Это условие Hard Work ending.

Старые промежуточные Lumber thresholds вроде 10/25/30 не считаются утверждёнными автоматически.

### D18 — Palace True Ending / Return Home

Зафиксирована отдельная **истинная концовка** Дворца сверх обычных Palace outcome families.

Условия:
- Дворец уже должен быть открыт обычным правилом 10/10 Hard Work;
- **все 12 progression stats строго выше 90%**;
- Похоть не входит в эту проверку: она остаётся отдельной content-axis;
- героиня должна **победить Принца** в финальном Palace confrontation.

Результат:
- героиня возвращается в свой исходный мир;
- в Meta/New Game+ навсегда открывается **опция удвоения всех 12 progression stats** в новой жизни.

Это отдельная +1 True Ending и не заменяет Palace Hard Work / Court Power / Inner Truth.

Не зафиксировано этим решением:
- точная механика confrontation с Принцем;
- имя/лор Принца;
- порядок применения x2 относительно других NG+ бонусов и возможных stat caps;
- UI/ID/анимация финала.

Само условие `all 12 progression stats > 90`, победа над Принцем, возвращение домой и NG+ x2 reward **LOCKED**.

## Still open after this lock

- exact seasonal packages per job;
- exact numeric economy;
- exact Lust starting value;
- meta loadout slot/budget count;
- exact School curriculum/prices;
- exact Activity region count/mechanics;
- exact Palace role/content outside the locked True Ending requirements;
- macro mystery/lore;
- exact Secret Debt numbers/penalties/rewards;
- production art/media budget.
