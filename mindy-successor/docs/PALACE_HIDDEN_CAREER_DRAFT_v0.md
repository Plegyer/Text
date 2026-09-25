# Hidden Palace Career Draft v0

Дата: 2026-09-25.

Статус: **PRODUCT DESIGN DRAFT**.

Покрывает: LIFE-01, LIFE-02, LIFE-03, LIFE-12, LIFE-14, LIFE-15.

Зафиксировано пользователем:
- Дворец — поздняя скрытая/meta-профессия;
- идёт сверх ordinary roster;
- открывается через профессиональную meta-прогрессию / Hard Work endings;
- exact required count пока OPEN.

## 1. Зачем нужен Дворец

Дворец не должен быть просто "11-я работа с большей зарплатой".

Он должен выполнять три функции:
1. награда за несколько прожитых профессиональных жизней;
2. профессия-синтез, где прежние компетенции реально меняют доступные задачи;
3. один из центральных узлов большой межжизненной цели.

При этом можно прожить сильный Palace-run и не закрывать всю глобальную тайну.

## 2. Unlock

Meta condition:

```text
HardWorkProgress >= PALACE_REQUIRED
+ optional global prerequisite(s)
```

`PALACE_REQUIRED` не фиксируется сейчас.

Важно:
- считаются уникальные профессиональные Hard Work endings, а не повтор одного и того же;
- Secret Debt `bound_life` пока не включён автоматически;
- Palace unlock хранится в MetaState;
- после unlock профессия может иметь собственные run-level availability gates.

## 3. Discovery

До unlock Дворец не показывается как обычная закрытая карточка "соберите 5 концовок".

Допустимы намёки:
- разговоры;
- приглашения;
- предмет/печать;
- эпилоги;
- NPC высокого статуса.

После unlock должен быть понятный способ начать путь.

## 4. Repeatable palace work

Даже meta-job сохраняет принцип:
`repeatable work + separate career progression`.

Repeatable tasks могут варьироваться по выбранному дворцовому assignment:
- приёмы/протокол;
- документы/логистика;
- сопровождение;
- переговоры;
- подготовка церемоний;
- поручения;
- закрытые хозяйственные задачи.

Exact role героини OPEN.

Одна профессия может позволять несколько assignments, чтобы предыдущий build реально влиял на стиль работы.

## 5. Legacy-sensitive opportunities

Meta unlocks не должны давать только +N.

Примеры:
- Lumber history -> отдельный supply/forestry solution;
- Merchant -> контракт/финансы;
- Guard -> security/access;
- Geisha -> ceremony/patronage;
- Assassin -> covert route;
- School ending -> archival/ritual access;
- relationship/meta knowledge -> новая реплика или доверенный contact.

Это должно быть data-driven через meta conditions.

## 6. Career state

```text
P0 outsider/invited
P1 probation
P2 trusted servant/agent
P3 chosen sphere
P4 inner court
P5 outcome-ready
```

Названия placeholder.

Progress требует:
- palace shifts;
- build checks;
- минимум одного внешнего факта;
- decisions;
- legacy-sensitive opportunities.

## 7. Минимум три outcome families

### A. Palace Hard Work / Service Life
Героиня остаётся частью дворцовой системы.

Это простая профессиональная судьба высокого уровня.

Reward:
- thematic meta access/status/start option.

Не должна автоматически быть самой сильной наградой только потому, что Palace late.

### B. Court Power
Героиня получает реальную власть:
- управление;
- должность;
- сеть влияния;
- контроль над частью аппарата.

Требует social/management build и нескольких систем.

Reward family:
- strong status/rule-changing meta option.

### C. Inner Truth / World Route
Дворцовый доступ помогает добраться до части большой тайны мира.

Требует нескольких legacy facts/knowledge fragments и внешнего route.

Это не обязано завершать macro-goal автоматически.
Может открыть новый meta layer или final-choice eligibility.

## 8. Дополнительные outcome families

Можно добавить:
- relationship/patron outcome;
- reform route;
- covert takeover/betrayal;
- ceremonial/mastery outcome.

Но минимум три выше задают разные игровые оси.

## 9. Связи с ordinary jobs

Palace должен получать входы минимум от:
- Guard;
- Geisha/artist;
- Merchant;
- Assassin;
- Tavern information network;
- School.

Lumber/Farm/Hunter тоже не должны быть бесполезны:
- supply;
- rare materials;
- seasonal logistics;
- external Activity facts.

## 10. School

Некоторые Palace options должны требовать certificates/public facts:
- literacy/accounting;
- etiquette;
- arcana;
- rhetoric.

Это делает School долгосрочно значимой.

## 11. Items

Palace хорошо подходит для capability items:
- invitation/seal;
- formal outfit;
- archive key;
- ceremonial component;
- proof/document.

Предметы открывают access/actions, а не дают декоративный процент.

## 12. Relationships

Во дворце нужны разные отношения:
- professional patron;
- rival;
- servant/official contact;
- optional romance.

Не делать одного "короля-NPC", от которого зависит вся профессия.

## 13. Seasons/calendar

Palace должен иметь календарные пики:
- церемонии;
- приёмы;
- налоги/поставки;
- сезонные делегации;
- ритуалы/фестивали.

Так calendar продолжает быть значим даже в late game.

## 14. Acceptance

Palace career считается содержательной, если:
1. unlock требует нескольких уникальных past-life achievements;
2. repeatable palace work остаётся игрой, а не эпилогом;
3. минимум три прошлых legacy факта дают разные реальные options;
4. School/Item/Relationship/Activity могут продвинуть career;
5. Hard Work и Court Power достижимы без полного раскрытия global mystery;
6. Inner Truth требует multi-life knowledge;
7. несколько endings могут быть eligible одновременно;
8. commitment остаётся отдельным;
9. Palace run имеет собственную replay value после первого unlock.

## 15. Открыто

- PALACE_REQUIRED;
- exact role/name;
- ruler/court structure;
- exact global mystery;
- exact three+ rewards;
- whether Palace itself grants Hard Work progress further;
- whether Palace is available from day 1 of a new unlocked run or appears through an invitation.
