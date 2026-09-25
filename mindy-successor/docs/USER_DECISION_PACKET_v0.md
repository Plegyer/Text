# User Decision Packet v0

Дата: 2026-09-25.

Статус: **SUPERSEDED DECISION CHECKPOINT**. Resolved decisions are recorded in `USER_DECISIONS_LOCKED_v1.md`.

Цель: собрать только решения, которые уже нельзя качественно закрыть моделью без авторского выбора пользователя.

## D1. Sexuality / Lust

### A
Сексуальность и Похоть — одна характеристика.

### B — recommendation
9 progression stats, включая Сексуальность, + отдельная Похоть как content axis.

Сексуальность = навык/уверенность.
Похоть = внутренний интерес/добровольные content variants.

### C
Сексуальность — stat, Похоть — отдельный стартовый preference/profile.

**SOL recommendation: B.**

## D2. Starting allocation

Если D1=B:

### A
10 очков распределяются между 9 progression stats.
Похоть стартует отдельно с базового значения.

### B
10 очков можно вкладывать и в Похоть.

### C
9 stats получают points, Похоть задаётся отдельным стартовым выбором.

**SOL recommendation: A.**

## D3. Work +2/+2/-1

### A
У каждой профессии один fixed package.

### B — recommendation
У каждой профессии 2–3 work styles.
Каждый style всё равно даёт две положительные оси и одну отрицательную.

Это сохраняет исходное правило, но делает tradeoff выбором.

**SOL recommendation: B.**

## D4. Run length

### A — recommendation
160 days:
4 years x 40 days;
4 seasons x 10 days.

### B
224 days:
4 x 56;
14 days/season.

### C
Другой размер.

**SOL recommendation: A.**

## D5. Meta loadout

### A
Все earned rule modifiers автоматические.

### B — recommendation
Knowledge/content unlocks автоматические; сильные rule modifiers выбираются перед новым run через ограниченный loadout.

### C
Все significant meta bonuses выбираются по slots/budget.

**SOL recommendation: B.**

## D6. Bound-life and Palace Hard Work count

Нужно решить отдельно:

### bound_life
Считается ли Secret Debt ending `bound_life` как Hard Work contribution к Palace?

**SOL recommendation: нет.**
Причина: Palace unlock лучше связывать с ordinary professional lives; hidden debt route остаётся отдельной meta family.

### Palace threshold
Сколько уникальных ordinary Hard Work endings нужно.

Кандидаты:
- 3: ранний Palace;
- 5: medium;
- 7: late;
- 10: completionist.

**SOL recommendation: 5.**

## D7. Large Activity direction

### A — recommendation
Expedition umbrella:
exploration/navigation + stat challenges + occasional puzzle/tactical/investigation encounters.

### B
Investigation-first.

### C
Combat/tactical-heavy.

**SOL recommendation: A.**

## D8. Camp

### A — recommendation
Да, но только для multi-day expeditions; отдельный от city night.

### B
Нет; Activity всегда same-day.

**SOL recommendation: A, но не обязателен в первом Forest slice.**

## D9. Public release strategy

### A — recommendation
Разработка через staged internal playable milestones, публичный релиз можно делать только когда full intended 1.0 готов.

### B
Публичные ранние версии по starter/roster stages.

**SOL recommendation: A**, если пользователь не хочет ранний публичный доступ.

## D10. Secret Debt in first public build

### A — recommendation
Да, если first public build уже заявляется как полноценная life-sim.

### B
Можно позже, если first public build явно prototype/preview.

## D11. Palace in first public build

### A
Обязательно.

### B — recommendation
Не обязателен для первого внутреннего product slice, но обязателен для full intended 1.0, если meta progression является заявленной частью продукта.

## D12. Grooming / volatile condition

### A — recommendation
Добавить Ухоженность как volatile condition, не progression stat.

### B
Не добавлять.

Причина A:
- housing/street/work имеют ежедневные последствия;
- social careers получают бытовой planning axis;
- original Cleanliness function можно сохранить без permanent stat inflation.

## Решения, которые пока НЕ требуют пользователя

Можно довести технически позже:
- точные WU numbers;
- event priorities;
- save schema numbering;
- media slot filenames;
- exact test thresholds.

Они должны следовать уже утверждённым high-level decisions.
