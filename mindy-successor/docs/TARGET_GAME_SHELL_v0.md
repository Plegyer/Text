# Target Game Shell v0

Дата: 2026-09-25.

Статус: **PRODUCT/UI DESIGN DRAFT**.

Покрывает: LIFE-17, LIFE-18 и визуальную сторону LIFE-01/06/07/10/12/13.

## 1. Главный принцип

Игрок должен видеть **сцену и жизнь героини**, а не административный dashboard.

Главный экран строится вокруг центрального media stage:
- изображение;
- GIF;
- короткое видео;
- заменяемая анимация работы;
- event illustration.

Текст и choices располагаются рядом/поверх него компактно.

## 2. Persistent HUD

Всегда видимы:

- день;
- сезон;
- год/cycle;
- Energy current/max;
- деньги;
- короткие важные condition indicators только если они реально существуют.

Не выводить десятки counters.

## 3. Main scene area

Состояния:

### Hub/location
Показывает текущий город/дом/локацию и доступные действия.

### Ordinary action
Например рабочая смена:
- work media;
- короткий текст варианта;
- результат;
- деньги;
- stat/resource deltas.

### Story/pending event
То же центральное окно заменяется event media:
- заголовок;
- текст;
- choices;
- никаких параллельных обычных действий до resolution blocking event.

### Result
После выбора:
- финальная постановка/текст;
- изменения;
- далее Resolver может сразу открыть следующую сцену.

## 4. Main navigation

Компактный dock/menu:

- Работа;
- Школа;
- Activity/Окрестности;
- Ночь/Дом — контекстно ближе к концу дня;
- Героиня;
- Инвентарь;
- Дневник;
- Отношения/контакты;
- Судьбы/Meta;
- Menu/save/settings.

На маленьком экране часть вторичных кнопок может уходить в menu.

## 5. Work screen

Показывает только доступные/известные профессии.

Для каждой:
- название;
- короткая роль;
- Energy cost;
- ожидаемый тип дохода;
- current career hint/progress без раскрытия секретных будущих веток.

Locked known jobs могут показывать понятный unlock hint.

**Secret jobs не показываются заранее**:
- Slave отсутствует до activation;
- Palace может отображаться как unknown/meta silhouette только если это соответствует выбранной meta UX, иначе скрыт полностью.

## 6. Work presentation

Repeatable job имеет stable media slots:

```text
job/<jobId>/shift/<season>/<variant>
job/<jobId>/event/<eventId>/<variant>
job/<jobId>/result/<resultId>
```

Медиа смены меняется в зависимости от:
- сезона;
- career stage;
- content axis thresholds;
- history/random pool.

Text and media variants не должны повторно применять mechanics.

## 7. School screen

Не просто список +stat.

Показывает:
- tracks;
- teacher;
- current progress;
- lesson cost;
- ближайший milestone;
- доступные экзамены/projects.

После выбора урока основной экран возвращается к central scene presentation.

## 8. Activity entry

Activity имеет собственный режим UI, но визуально остаётся частью одной игры.

Entry screen:
- cost 2 Energy;
- loadout/tools;
- known routes;
- warnings;
- resume active expedition, если есть.

Внутри Activity HUD меняется на её internal resources.
Daily Energy не отображается как внутреннее HP.

## 9. Night flow

End Day / Night:
1. forced intercept, если есть;
2. lodging;
3. voluntary night options;
4. event;
5. next-day result.

UI должен явно показывать, когда player уже оплатил lodging, чтобы reload/flow не выглядел как повторная плата.

Secret Slave forced night не показывает обычный voluntary menu.

## 10. Character screen

Показывает:
- progression stats;
- special content axes отдельно, если Похоть будет не обычным stat;
- conditions;
- active meaningful modifiers;
- career summary.

Не показывать internal flags/technical counters.

## 11. Relationships screen

Не универсальная heart list.

Для известных NPC:
- имя;
- контекст знакомства;
- краткий текущий статус;
- доступное публичное знание;
- возможно next known opportunity.

Скрытые conditions и будущие branches не раскрываются.

## 12. Inventory

Предмет показывает:
- что он делает качественно;
- где может использоваться, если героиня это знает;
- equipment/tool slot, если есть.

Не перегружать +2% descriptions.

Quest/key items могут иметь description без spoiler будущей ветки.

## 13. Endings / fates

Раздел показывает:
- уже eligible outcomes;
- краткое описание;
- возможность commitment, если flow позволяет;
- completed Meta history.

Eligibility не должна выглядеть как немедленный конец.

Несколько endings могут быть доступны одновременно.

## 14. Journal

Journal нужен не как лог каждой цифры, а как:
- важные события;
- обещания;
- задания;
- education milestones;
- relationship notes;
- known deadlines;
- major career changes.

Secret debt:
до 10-го дня журнал может хранить только факт:
«получены деньги; вернуть позже»,
если пользовательский design не решит вообще скрыть запись.

Не раскрывать будущие 20000/Slave route.

## 15. Presentation overrides

Сохранить сильную сторону M3.2:
- mechanics ID стабильны;
- text/media overrides отдельно;
- custom presentation не может менять conditions/effects;
- unknown/orphan targets валидируются.

Target slots поддерживают:
- image;
- GIF;
- video;
- возможно sequence/animation descriptor позже.

## 16. Media fallback

У каждого обязательного slot должен быть fallback:
- base image;
- neutral background;
- text-only safe mode.

Отсутствующий optional media asset не должен ломать save/scene.

## 17. Accessibility / usability

Минимум:
- keyboard navigation;
- readable text scaling;
- subtitles/alt text for video/GIF information;
- disable/reduce animated media;
- clear resource deltas;
- confirm irreversible ending commitment.

## 18. Secret handling

UI не должен спойлерить:
- Secret Slave Career;
- Palace exact unlock, если ещё не discovered;
- unknown endings;
- hidden NPC routes.

Inspector/dev tools могут видеть их отдельно, production UI — нет.

## 19. Product acceptance flow

Обязательный playable shell scenario:

1. Создать героиню.
2. Увидеть HUD/day/Energy/money.
3. Выбрать стартовую работу.
4. Увидеть ordinary work media/result.
5. Получить reactive career event.
6. Открыть школу и пройти урок.
7. School result запускает внешний career continuation.
8. Закончить день.
9. Выбрать lodging/night option.
10. Получить next-day modifier.
11. Войти в Activity и сохранить внутри.
12. Resume.
13. Activity result продвигает job/relationship.
14. Увидеть eligible ending.
15. Продолжить вместо немедленного завершения.
16. Commit ending.
17. Начать New Run с видимым Meta effect.

Это отдельный product gate поверх Architecture Migration Slice.

## 20. Открыто

- точный visual style;
- layout dimensions;
- сколько primary dock buttons;
- relationships screen visibility;
- Palace discovery UI;
- exact media formats/size budgets;
- target resolution;
- editor UX.
