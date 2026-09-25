# Job Stat Tradeoff Pass v0

Дата: 2026-09-25.

Статус: **DESIGN ANALYSIS / NOT LOCKED**.

Основание:
- `NEW_GAME_SPEC_v0.md`: repeatable ordinary work повышает две характеристики и понижает одну;
- полный roster из 10 ordinary career drafts;
- `STAT_MODEL_RECOMMENDATION_v2.md`.

Рабочая модель для проверки:
9 progression stats + отдельная Похоть.

## 1. Цель

Найти такие tradeoffs, чтобы:
- две положительные оси отражали реальную практику профессии;
- отрицательная ось имела понятную профессиональную причину;
- один stat не становился универсальной свалкой;
- минус не выражал моральную оценку профессии;
- Похоть не использовалась как наказание;
- adult/physical jobs не теряли Разум автоматически.

## 2. Candidate matrix

Это не final package.

| Job | + axis A | + axis B | Candidate - axis | Уверенность | Обоснование минуса |
|---|---|---|---|---|---|
| Lumber | Сила | Выносливость | Манеры | medium | грубая бригадная/производственная рутина не тренирует формальную социальную дисциплину и может закреплять прямой стиль |
| Satyr Maid | Обаяние | Сексуальность | Манеры | low/medium | неформальный шумный бар развивает непосредственное общение, но может конфликтовать с формальным этикетом; риск слишком похожего penalty |
| Undead Farm | Выносливость | Магия | Обаяние | low | изолированная странная ферма может снижать привычку к широкой социальной подаче, но permanent loss выглядит спорно |
| Tavern | Обаяние | Смекалка | Магия | low | mundane information/service routine вытесняет arcane practice; причинность слабая без world rule |
| Hunter | Ловкость | Выносливость | Манеры | medium/high | field habits и длительное одиночное существование хорошо конфликтуют с формальным этикетом |
| Guard | Выносливость | Манеры | Смекалка | medium/high | институциональная процедура и дисциплина могут закреплять менее импровизационный стиль |
| Artist/Geisha | Манеры | Обаяние | Сила | medium | время уходит в social/performance mastery, а raw physical conditioning атрофируется как specialization tradeoff |
| Assassin | Ловкость | Смекалка | Обаяние | medium | скрытность/закрытость и привычка не привлекать внимание могут конфликтовать с открытым личным влиянием; social-infiltration branch остаётся исключением |
| Merchant | Смекалка | Обаяние | Сила | medium | торговая рутина преимущественно умственно-социальная; raw power не поддерживается |
| Prostitute | Сексуальность | Обаяние | ? | **low / unresolved** | почти любой очевидный permanent минус рискует стать либо стигматизирующим, либо физически нелепым |

## 3. Главный результат

Правило +2/+2/-1 хорошо формирует build drift, но **не все профессии естественно имеют постоянный отрицательный progression stat**.

Особенно проблемны:
- Prostitute;
- Undead Farm;
- Tavern;
- частично Satyr Maid.

Если просто выбрать удобную клетку, получится искусственный дизайн.

## 4. Почему нельзя использовать Похоть как удобный минус

Похоть — положительный content axis.

Нельзя делать:
- "тяжёлая работа снижает Похоть" по умолчанию;
- "сексуальная работа повышает/понижает Похоть автоматически";
- salary penalty через Похоть.

Изменения Похоти лучше привязывать к конкретным choices/events/routes.

## 5. Почему нельзя систематически использовать Разум

Нельзя делать:
- Lumber -> -Reason;
- Prostitute -> -Reason;
- Guard -> -Reason

только потому, что работа "не академическая".

Это превращает профессии в стереотипы и делает School обязательным ремонтом искусственного ущерба.

## 6. Возможные способы сохранить user rule без плохих минусов

### A. Fixed profession tradeoff
Самая буквальная модель.

Плюс:
- легко читать;
- легко балансировать.

Минус:
- несколько работ имеют искусственный permanent penalty.

### B. Profession defines 2–3 valid tradeoff styles
Каждая смена всё равно:
- +2 axes;
- -1 axis,

но игрок выбирает style.

Пример Guard:
- strict patrol: +Endurance +Manners -Wits;
- street patrol: +Endurance +Wits -Manners.

Плюс:
- правило сохраняется;
- работа формирует build через выбор;
- меньше стигмы/произвола.

Минус:
- больше UI/content/balance.

### C. Career-stage tradeoff changes
Один penalty у новичка, другой на поздней специализации.

Плюс:
- отражает развитие.

Минус:
- хуже читается.

## 7. Recommendation

**Не lock-ать fixed -1 matrix пока.**

Сильнейшее решение сейчас — вариант B:
**каждая ordinary job имеет 2–3 work styles, и каждый style всё равно соблюдает +2/+2/-1.**

Так не отменяется исходное правило пользователя, но оно превращается в meaningful daily choice.

Это рекомендация SOL, не пользовательский lock.

## 8. Example work styles

### Lumber
Heavy:
+Strength +Endurance -Manners.

Precision:
+Strength +Dexterity -Charm.

Crew lead:
+Endurance +Charm -Dexterity.

### Satyr Maid
Warm service:
+Charm +Manners -Strength.

Bold service:
+Charm +Sexuality -Manners.

Fast floor:
+Dexterity +Charm -Reason.

### Prostitute
Independent professional:
+Sexuality +Charm -Strength.

High-status:
+Sexuality +Manners -Endurance.

Streetwise:
+Sexuality +Wits -Manners.

Здесь минус означает specialization drift конкретного стиля, а не оценку профессии целиком.

## 9. Balance constraints

Если styles будут приняты:
- зарплата может немного зависеть от style, но не превращать один стиль в доминирующий;
- career events могут читать history выбранных styles;
- один style не должен всегда давать "лучшие" stats;
- негативный stat floor;
- School может корректировать build, но не быть обязательным repair tax.

## 10. Открыто

- fixed penalty vs work styles;
- final +2/+2/-1 packages;
- величина фактического изменения stat за смену;
- stat floor/cap;
- может ли job stage менять доступные styles.
