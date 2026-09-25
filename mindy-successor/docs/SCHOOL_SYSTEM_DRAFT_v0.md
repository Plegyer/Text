# School System Draft v0

Дата: 2026-09-25.

Статус: **PRODUCT DESIGN DRAFT**, не финальный curriculum/balance.

Основание:
- LIFE-03, LIFE-06, LIFE-09, LIFE-12;
- `STAT_COVERAGE_MATRIX_v1.md`;
- `JOB_SYSTEM_MATRIX_v0.md`;
- fixed rule: school action costs 1 Energy + money;
- night study reduces next-day Energy by 1.

## 1. Роль школы

Школа — самостоятельная жизненная система, а не меню покупки stat points.

Она должна одновременно:
- быть денежным sink;
- конкурировать с работой за Energy;
- давать управляемое развитие build;
- иметь своих NPC и milestones;
- открывать career approaches;
- давать отдельные endings/education outcomes;
- создавать внешние условия для jobs/relationships/Activity.

Игрок должен иметь возможность прожить значимую часть жизни через образование.

## 2. Core loop

```text
выбрать направление
-> оплатить урок
-> потратить 1 Energy
-> получить небольшой учебный progress/stat effect
-> увидеть обычную/вариативную сцену
-> накопить course progress
-> milestone / экзамен / project
-> получить certificate/fact/unlock
-> внешние careers реагируют через Event Resolver
```

Не каждая лекция должна быть уникальной большой сценой.

Нужны:
- repeatable lesson variants;
- teacher/student micro-events;
- seasonal/exam variants;
- milestone scenes.

## 3. Proposed schools/tracks

Это не обязательно физически разные школы; они могут быть кафедрами/направлениями одного учебного места.

### A. Грамота и счёт

Оси:
- Разум;
- Смекалка/Манеры вторично.

Практическая польза:
- Merchant;
- Tavern;
- Farm management;
- Guard reports/investigation;
- Palace administration;
- debt/economy solutions.

Milestone examples:
- basic certificate;
- accounting project;
- contract-reading fact.

### B. Магические основы

Оси:
- Магия;
- Разум.

Польза:
- Undead Farm;
- Hunter supernatural routes;
- Assassin magical-security routes;
- Palace rituals;
- large Activity;
- world mystery.

Milestones:
- controlled spell/ritual fact;
- magical identification;
- advanced faculty recommendation.

### C. Риторика и переговоры

Оси:
- Обаяние;
- Смекалка.

Польза:
- Tavern;
- Merchant;
- Guard;
- Satyr Maid;
- Prostitute;
- relationship alternatives.

Milestones:
- debate/public speaking;
- negotiation credential/fact;
- special persuasion approach.

### D. Этикет и придворное поведение

Оси:
- Манеры;
- Обаяние/Разум.

Польза:
- Geisha;
- Merchant;
- Guard officer;
- Palace;
- elite-client Prostitute route.

Milestones:
- formal reception;
- court protocol certificate;
- invitation/contact.

### E. Практическая ловкость и ремесло

Оси:
- Ловкость;
- Смекалка.

Польза:
- Hunter;
- Assassin;
- tools/items;
- Activity;
- repair/crafting alternatives.

Milestones:
- tool proficiency;
- trap/lock project;
- special item recipe or technique.

### F. Физическая подготовка

Оси:
- Сила;
- Выносливость;
- часть Ловкости.

Польза:
- Lumber;
- Hunter;
- Guard;
- Secret Slave escape/takeover possibilities;
- Activity.

Важно: школа не должна полностью заменить физические профессии как лучший способ качать эти stats. Она дороже и более целенаправленна.

### G. Сценическое искусство и телесная подача

Оси:
- Манеры/Обаяние;
- возможная Сексуальность.

Польза:
- Geisha;
- Satyr Maid;
- Prostitute;
- seasonal competitions/festivals;
- Palace performance/status routes.

Это не обязано быть откровенным sexual training. Оно может включать:
- танец;
- сценическую уверенность;
- позирование;
- костюм;
- работу с аудиторией.

Если Сексуальность станет progression stat, это естественный school source.

## 4. Course structure

Каждый track имеет:

```text
CourseTrack
  trackId
  teacher/NPC
  lessonPool
  costCurve
  progress
  milestones[]
  exam/project[]
  certificates/facts[]
  relationship hooks[]
```

Урок:
- 1 Energy;
- money cost;
- небольшой stat/progress package;
- repeatable scene variant.

Milestone:
- не обязательно стоит отдельную Energy;
- может запускаться через Event Resolver после урока;
- может потребовать внешний предмет/отношение/season.

## 5. School progression is not one global level

Не делать:
`schoolLevel = 12`.

Хранить прогресс по направлениям.

Игрок может:
- глубоко специализироваться;
- брать базовые курсы нескольких направлений;
- менять build в середине run.

Это лучше поддерживает разные профессии.

## 6. Certificates / public facts

Школа должна выдавать не только stats.

Примеры public facts:
- `education.accounting_basic`;
- `education.arcana_certified`;
- `education.court_etiquette`;
- `education.field_craft`.

Career definitions читают эти facts через declarative conditions.

Так профессия может требовать:
- не просто Разум >= X,
- а «Разум >= X + закончен курс».

Это создаёт содержательные межсистемные зависимости.

## 7. Teacher relationships

Минимум несколько преподавателей должны иметь собственные relationship/milestone lines.

Не каждый курс требует romance.

Функции teacher relationship:
- скидка/бесплатный редкий урок;
- дополнительный project;
- рекомендательное письмо;
- специальный item;
- альтернативный экзамен;
- relationship ending/route, если это подходит NPC.

## 8. Night study

Night study — не бесплатный полный урок.

Предлагаемая роль:
- выбрать активный предмет/track;
- получить небольшой course progress или stat progress;
- следующий день: Energy -1.

Night study может:
- помочь добить milestone;
- подготовить экзамен;
- открыть variant следующего урока.

Оно НЕ должно:
- заменять деньги/учителя для продвинутых сертификатов;
- выдавать все course facts самостоятельно.

## 9. Exams / projects

Для глубины школа должна иметь события, где stat package недостаточен.

Типы:
- письменный/логический экзамен;
- практический project;
- публичное выступление;
- полевой тест;
- ритуал;
- совместная работа с NPC.

Успех может зависеть от:
- track progress;
- stat;
- item;
- relationship;
- season/calendar.

Failure не обязан стирать весь progress; может:
- стоить повторной попытки;
- дать другой route;
- временно закрыть milestone.

## 10. Connections to jobs

### Lumber
- leadership/accounting;
- physical technique.

### Satyr Maid
- rhetoric;
- performance;
- etiquette.

### Undead Farm
- arcana;
- accounting;
- biological/agricultural project.

### Tavern
- accounting;
- rhetoric;
- cooking/hospitality можно добавить как отдельный практический elective, если нужен.

### Hunter
- field craft;
- arcana for supernatural prey;
- physical training.

### Guard
- literacy/reporting;
- law/protocol;
- physical training.

### Geisha
- etiquette;
- performance;
- rhetoric.

### Assassin
- field craft;
- planning;
- magical security.

### Merchant
- accounting;
- negotiation;
- etiquette.

### Prostitute
- negotiation;
- finance;
- performance/etiquette for selected routes.

## 11. Education endings

School itself should support at least a small family of life outcomes, independent of one job.

Candidates:
1. **Scholar/Graduate** — complete advanced track(s).
2. **Teacher/Assistant** — relationship + mastery route.
3. **Polymath** — breadth across several tracks.
4. **Forbidden study** — optional complex magic/world-mystery route, if tone supports it.

Exact list OPEN.

Это важно для LIFE-06: образование может быть самостоятельной жизнью, а не только сервисом профессий.

## 12. Economy role

School должна быть достаточно дорогой, чтобы:
- работа оставалась необходимой;
- выбор «работать сегодня или учиться» был реальным;
- бедный run ощущался иначе.

Но она не должна быть настолько дорогой, что игрок может пользоваться ей только после победы в экономике.

Нужны:
- базовые доступные уроки;
- более дорогие продвинутые;
- scholarships/discounts/meta/relationship alternatives в ограниченном объёме.

Exact prices — после economy model.

## 13. Seasonal role

Сезоны могут менять:
- доступные electives;
- проекты;
- фестивали;
- teacher availability;
- экзаменационные окна;
- практические задания.

Не все курсы должны исчезать сезонно.

## 14. Acceptance

School system не считается реализованной, если есть только кнопки:
`Заплатить N -> +stat`.

Минимальная продуктовая проверка:

1. Есть минимум несколько tracks.
2. У каждого есть собственный progress.
3. Урок стоит 1 Energy + money.
4. Есть repeatable lesson variants.
5. Есть milestone/exam.
6. Certificate/fact открывает внешний career approach.
7. School stat gain может немедленно запустить карьерное событие через Event Resolver.
8. Night study даёт progress и -1 Energy следующего дня.
9. Save/load сохраняет course progress/pending exam.
10. Хотя бы один teacher relationship меняет учебный путь.
11. Есть хотя бы один education ending, не являющийся job ending.

## 15. Открыто

- exact число tracks;
- названия школы/преподавателей;
- prices;
- stat gains;
- milestone thresholds;
- какие certificates обязательны для jobs;
- отдельный ли Sexuality stat;
- есть ли special-school equivalent со swap/rule-change механикой;
- exact education endings/meta rewards.
