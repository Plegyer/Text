# Lumber Relationship Chain v0

Дата: 2026-09-25.

Статус: **CONCRETE PRODUCT SLICE DRAFT**. Имена, точные пороги и тексты не зафиксированы.

Покрывает: LIFE-07, LIFE-08, LIFE-09, LIFE-12, LIFE-13, LIFE-16.

Связано с:
- `CAREER_LUMBER_DRAFT_v0.md`;
- `RELATIONSHIP_SYSTEM_DRAFT_v0.md`;
- `FOREST_ACTIVITY_SLICE_v0.md`;
- `INITIAL_ITEM_CATALOG_v0.md`.

## 1. NPC role

Рабочее обозначение: **Бригадир**.

Он:
- руководит частью артели;
- знакомит героиню с ремеслом;
- сначала оценивает её только как работницу;
- позже может стать союзником, партнёром, романтическим интересом или соперником.

Имя и финальный характер OPEN.

## 2. Typed state

```text
RelationshipState[lumber_foreman]
  stage:
    unknown
    professional
    trusted
    personal_open
    route_professional
    route_close
    route_rival
    resolved

  counters:
    jointShifts
    nightMeetings

  facts:
    respects_work
    knows_private_problem
    helped_crew
    forest_request_open
    boundary_respected
    boundary_crossed

  optionalMeters:
    respect?   [candidate]
    trust?     [candidate]
```

Не нужен универсальный romance meter.

## 3. Entry

После первого карьерного milestone лесорубов:
- career создаёт public fact `foreman_noticed_player`;
- RelationshipState переходит `unknown -> professional`;
- обычные смены получают несколько новых variants с бригадиром;
- ночная встреча пока не обязана быть доступна сразу.

## 4. Professional progression

Чтобы перейти `professional -> trusted`, нужен не просто счётчик встреч.

Варианты:
- несколько совместных смен;
- хотя бы один meaningful work choice;
- отсутствие серьёзного crew-conflict fact либо его разрешение.

Player style может быть разным:
- надёжность;
- умение;
- хитрость;
- помощь другим.

## 5. Первая внешняя встреча

После `trusted` Resolver создаёт добровольную evening/night opportunity.

Это не обязательно романтика.

Сцена может быть:
- разговор после смены;
- совместный ужин;
- ремонт инструмента;
- помощь с ведомостью/планом;
- прогулка до жилья.

Player choices:
- остаться профессиональной;
- проявить личный интерес;
- задать вопрос о проблеме артели;
- отказаться.

Отказ не ломает relationship: остаётся professional route.

## 6. Personal problem hook

При достаточном доверии бригадир раскрывает проблему, связанную одновременно с ним и артелью:

**часть старой делянки официально считается закрытой/опасной, но причины противоречивы.**

Он не знает полной истины.

Это создаёт:
`forest_request_open`.

Дальше relationship не продвигается одной кнопкой "встретиться ещё".

Нужен внешний input.

## 7. External solution paths

Игрок может помочь разными системами.

### School
Курс грамотности/учёта позволяет разобрать старый документ или ведомость.

Result:
`old_ledger_understood`.

### Tavern
Слух от путешественника даёт:
`old_route_rumor`.

### Hunter
Контакт подтверждает следы/изменение маршрута:
`forest_tracks_confirmed`.

### Item
`old_boundary_token` или функциональный эквивалент открывает конкретную точку в Activity.

### Activity
Forest expedition даёт:
`hidden_grove_found` / `forest_truth_known` в зависимости от глубины прохождения.

Любой один input может сдвинуть линию; сложный route требует нескольких.

## 8. Route split

### Professional route
Player помогает решить проблему, но не переводит relationship в близкую.

Outcome:
- уважение;
- сильный work partnership;
- Forewoman branch bonus/option;
- возможная совместная профессиональная ending.

### Close route
Player сознательно выбирает личное сближение.

Высокая Похоть может открывать дополнительные добровольные варианты, но не заменяет выбор.

Route развивается через:
- несколько контекстных встреч;
- помощь с forest problem;
- один conflict/boundary choice;
- финальный commitment.

### Rival route
Игрок может:
- публично оспорить решение бригадира;
- скрыть важную информацию;
- выбрать противоположную позицию в лесном конфликте.

Rival route не равно "relationship failed".
Он может:
- открыть альтернативную leadership ending;
- сделать бригадира конкурентом;
- дать другой профессиональный итог.

## 9. Night behavior

Доступные добровольные встречи зависят от:
- relationship stage;
- career stage;
- housing;
- season;
- cooldown;
- forced-night overrides.

Если active Secret Debt forced night перехватывает ночь, добровольная встреча не происходит и не считается отказом.

Некоторые встречи могут дать NextDayModifier, но не обязаны.

## 10. Season variants

Не нужны четыре отдельные линии.

Примеры:
- Spring: помощь после грязной смены / вода / ремонт;
- Summer: поздний разговор после жары;
- Autumn: напряжение из-за высокого спроса;
- Winter: совместная дорога/риск/убежище.

Season меняет постановку и иногда condition, но stage progression остаётся общей.

## 11. Relationship -> career feedback

Concrete examples:

`respects_work`
-> дополнительный вариант в L2 milestone.

`old_ledger_understood`
-> Forewoman branch может открыть supply/legal solution.

`forest_truth_known`
-> Forest branch scene запускается сразу после возврата из Activity.

`route_rival`
-> leadership scene использует конфликтный вариант вместо поддержки.

## 12. Ending interactions

Relationship не обязана сама заканчивать run.

Возможные eligible results:
- Lumber Hard Work;
- Forewoman;
- Forest Compact;
- professional partnership;
- close relationship ending;
- rival/independent ending.

Несколько могут существовать одновременно.

## 13. Rejection / boundaries

Любой добровольный близкий вариант:
- показывается только если conditions;
- выбирается отдельной player command;
- отказ может оставить professional route;
- один отказ не обязан закрывать все будущие личные возможности;
- окончательное закрытие route должно быть отдельным ясным choice.

## 14. Acceptance chain

Полный test:

```text
Lumber milestone
-> Foreman relationship opens
-> professional shifts build trust
-> optional night meeting
-> player learns forest problem
-> School/Tavern/Hunter supplies external fact
-> item opens Activity route
-> Activity returns forest_truth_known
-> Resolver triggers Foreman scene without another shift
-> player chooses professional/close/rival response
-> career branch changes
-> multiple endings become eligible
```

Save/load проверить:
- перед night meeting;
- с pending relationship scene;
- после внешнего fact до triggered return scene.

## 15. Открыто

- NPC identity/name;
- optional meters;
- exact number meetings;
- exact romantic content;
- exact relationship endings;
- whether relationship persists into Meta as knowledge/contact.
