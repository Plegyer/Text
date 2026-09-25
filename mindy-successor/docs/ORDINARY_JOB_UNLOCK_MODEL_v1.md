# Ordinary Job Unlock Model v1

Дата: 2026-09-25.

Статус: **TARGET PRODUCT CONTRACT**.

Основание:
- прямое решение пользователя: в начале successor доступны только 3 ordinary professions;
- прямое решение пользователя: новые профессии должны открываться при достижении нужных характеристик;
- SWF-confirmed reference: Simply Mindy использует dual-gate — поздняя профессия открывается раньше по stat requirements или гарантированно позже по году;
- successor meta progression должна делать следующие жизни легче.

## 1. Стартовые профессии — LOCKED

С первого дня fresh run доступны только:

1. Lumber / артель гномов
2. Satyr Maid / служанка в баре сатиров
3. Undead Farm / помощница на ферме нежити

Ни Tavern, ни Hunter, ни Guard и т.д. не должны показываться как обычные доступные работы на старте.

UI может:
- скрывать поздние jobs полностью;
- или показывать часть как недоступные/неизвестные после discovery.

Но command availability = false.

## 2. Основной unlock principle

Для 7 остальных ordinary jobs применяется:

```text
stat gate satisfied
OR calendar fallback reached
OR explicit special/meta unlock if job defines one
```

Главная роль stat gate:
**сильный/целенаправленный build открывает профессию раньше календаря.**

Calendar fallback:
- не даёт игроку навсегда застрять из-за неправильного build;
- позволяет открыть job позднее даже без нужных stats;
- сохраняет accessibility.

## 3. Successor grouping

### Start group — Day 1
- Lumber
- Satyr Maid
- Undead Farm

### Mid group — target fallback Year 2
Candidate:
- Tavern
- Hunter
- Guard
- Merchant

### Late group — target fallback Year 3
Candidate:
- Artist / Geisha
- Assassin
- Prostitute

Это **структурный target**.

Exact stat thresholds ещё balance draft.

## 4. Candidate stat gates

Не final numbers; нужны для следующей simulation.

### Tavern
Candidate axes:
- Charm
- Sociability

Reason:
- social/public-facing hub.

Example gate shape:
`Charm >= X && Sociability >= Y`.

### Hunter
Candidate axes:
- Dexterity
- Endurance

Optional third:
- Wits.

### Guard
Candidate axes:
- Strength
- Endurance
- Manners

Не обязательно все три на одном высоком threshold.

### Merchant
Candidate axes:
- Wits
- Reason
- Charm / Sociability.

### Artist / Geisha
Candidate axes:
- Creativity
- Manners
- Grooming

Late social/status gate.

### Assassin
Candidate axes:
- Dexterity
- Wits
- Reason

Late covert/cognitive gate.

### Prostitute
Candidate axes:
- Sexuality
- Charm
- Sociability or Grooming

Lust не должна быть обязательным unlock stat:
она content-axis и не равна профессиональной способности.

## 5. Threshold philosophy

Mid group:
- достижима в Year 1 при целенаправленной работе + School;
- fresh casual build чаще увидит их автоматически в Year 2.

Late group:
- достижима в Year 1 только при сильной специализации / School / meta;
- normal fresh run чаще получает их через Year 3 fallback.

Это создаёт три слоя:
- старт;
- ранний skill unlock;
- гарантированный поздний access.

## 6. Meta easing emerges naturally

Meta rewards не требуют отдельного "unlock jobs earlier" ruleset, потому что:

```text
ending rewards
-> higher starting stats / more money / more Energy / stronger School
-> stat gate reached sooner
-> later profession opens earlier
```

Это один из главных способов, которыми NG+ становится легче.

Пример:
fresh Hunter gate может требовать несколько недель Lumber/Farm + Physical School.

После Lumber/Hunter-related meta bonuses:
тот же gate может быть достигнут в первые дни.

## 7. Meta direct unlocks

Допустимы для отдельных special rewards, но не нужны по умолчанию.

Обычные jobs должны прежде всего открываться:
- stat gate;
- либо calendar fallback.

Palace — отдельное исключение:
- только 10/10 ordinary Hard Work;
- нет year fallback.

Secret Debt — отдельное исключение:
- hidden event route;
- не stat-gated ordinary job.

## 8. Reactive unlock

Unlock проверяется в central Event Resolver после любого state-changing action.

То есть profession может открыться:
- после work shift;
- после School;
- после ending/meta-influenced new run creation;
- после stat-changing event.

Игрок не обязан делать ещё одну смену или отдельный refresh.

## 9. UI behavior

При первом открытии:
- Resolver создаёт non-blocking/optional discovery notification;
- job появляется в Work selection;
- может добавиться journal entry / location.

Не показывать 7 одинаковых popup подряд после large meta import; aggregate notification допустима.

## 10. Save/meta behavior

Job availability в run лучше вычислять из:
- stats;
- calendar;
- permanent unlocks;
- discovery facts where relevant.

Не хранить redundant `jobUnlocked=true` там, где unlock полностью derived.

Если discovery content должен быть одноразовым:
- хранить отдельный discovered/notified fact;
- не использовать его как authoritative mechanical unlock.

## 11. Simulation requirement

Следующий balance pass должен подобрать X/Y/Z thresholds так, чтобы:

Fresh:
- mid jobs можно было целенаправленно открыть в Year 1;
- late jobs — сложно, но возможно;
- без специализации fallback открывает mid jobs в Year 2, late jobs in Year 3.

Mid-meta:
- часть mid jobs доступна почти сразу;
- late jobs открываются заметно раньше.

Late-meta:
- большинство ordinary jobs могут открываться очень рано через сильный старт;
- Palace всё равно требует отдельного 10/10 meta prerequisite.

## 12. Reference distinction

Original:
- 4 early;
- 4 Year-2 fallback;
- 4 Year-3 fallback.

Successor:
- **3 early;
- 4 Year-2 candidate;
- 3 Year-3 candidate.**

Мы сохраняем принцип, а не исходный roster.
