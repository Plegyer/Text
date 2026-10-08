# Лидер 1 — обязательная библиотека знаний проекта / CURRENT KNOWLEDGE

## САМЫЙ СВЕЖИЙ КОНТЕКСТ — RC0 цельной игры (2026-10-08, последующие факты)

**Внимание будущему Лидеру 1:** пользователь дал явную команду ускориться путём **сохранения полного замысла и сборки уже существующей игры**, а не повторного конструирования движка и не удаления функций ради дедлайна. Дополнительно явно потребовал обновлять библиотеку знаний для каждого следующего Chat/Leader 1 **в том же каноническом файле**. Источник задачи: [GitHub Issue #306](https://github.com/Plegyer/Text/issues/306); результат детальной сверки [LIFE-01..18 / RC0 matrix](tasks/LEADER1_RC0_WHOLE_GAME_REQUIREMENTS_TRACEABILITY_2026-10-08.md).

**Выполнено текущим Лидером:**
- Проведена трассировка всех 18 `LIFE` критериев из пользовательского замысла + locked D1–D48 к живым `main` code/tests. Status `IMPLEMENTED` не равен `NATURAL FULL PLAY`, а `GREEN CI` не равен `public 1.0 GO`. Ни одно обязательное требование не вырезано.
- Зафиксирован **точный исходный RC0 baseline** `10ae406cd3ff107a6b1316959daab50f43372824` на НЕИЗМЕНЯЕМОЙ координационной ветке `release/rc0-exact-source-2026-10-08`. RC0 = snapshot для проверки, не готовый публичный релиз. Сборочное покрытие на этом же source SHA.
- **Первый реальный Windows NSIS installer собран УСПЕШНО**: отдельный SHA-pinned Windows workflow [#37816885139](https://github.com/Plegyer/Text/actions/runs/37816885139), wrapper `f180abe976305b9bcafbe2f654d9c8b8d568cf31`, его `actions/checkout` прямо использует **источник `10ae...`**, `npm ci`, `npm run build`, `electron-builder --win nsis --x64 --publish never` все PASS; найден `win-unpacked/Portal Life.exe`, `resources/app.asar`, installer `Portal Life Setup 0.1.0.exe` (112505127 bytes, SHA256 `BE07726D5CC400E0B407D3EA038A4308860EEECDE429AC7D2309DBDBDD80EDEE`). Artifact `rc1-windows-nsis-installer`, ID **11567362669**, expiry **2026-10-15**. **Чистая установка, GUI-запуск, реальный Save в установленном приложении ещё НЕ проверены; не объявлять этот релиз-кандидат готовым**.
- Медиа измерено, а не оценено «на глаз»: **507 семантических презентационных слотов с static entries → только 92 РАЗНЫХ статических src-файла**, все 92 существуют в каталогах; 60 дополнительных media candidates. В `assets/presentation`: 101 SVG + 6 GIF. Сильно переиспользуются одни базовые изображения Hunter (**65 слотов**), Guard (**63**), Tavern (**54**), Assassin (**52**), Undead Farm (**38**), Prostitute (**38**), Satyr Maid (**33**). Это **реальная зона художественной дифференциации**, не дефект движка; сначала уникальные вехи/финалы, не бездумно 507 рисунков.
- Проверены так называемые `*-natural-acceptance.test.ts`: у Guard, Merchant, Artist-Geisha, Assassin, Prostitute тесты напрямую проставляют статы ради ветки. Даже если остальные переходы настоящие, **это НЕ полное unseeded естественное прохождение**, не повторять прежнюю слишком сильную формулировку «9 профессий естественно проверены». У Tavern/Hunter есть более чистые пути; Lumber новый test-only #305 покрывает 50 настоящих смен, но Draft и **ещё не слит в RC0**.

**RC0 ПЕРВОЕ ДЕЙСТВИЕ ДЛЯ ПОЛЬЗОВАТЕЛЯ / человеческая приёмка:** [пошаговый чек-лист GitHub #306](https://github.com/Plegyer/Text/issues/306#issuecomment-6065558917). В [Actions #37816885139](https://github.com/Plegyer/Text/actions/runs/37816885139) скачать `rc1-windows-nsis-installer` **до 2026-10-15**, распаковать; `Portal Life Setup 0.1.0.exe` SHA256 `BE07726D5CC400E0B407D3EA038A4308860EEECDE429AC7D2309DBDBDD80EDEE`. Предпочесть тестовую учётную запись/VM; проверить установку, старт, создание героини, shift, Night/School, Save→закрыть→запустить→Load, RU/EN; записать видимые ошибки/заминки. Installer **unsigned**, возможен SmartScreen. GitHub Actions только **собрал** setup, **не запускал интерактивно установленную игру**. До реального теста `INSTALL/GUI/SAVE` остаются PENDING. Нет задачи для будущего Leader требовать от пользователя 50 игровых дней вручную: длинные пути покрываются автоматическими actual-command QA.

**Следующий реальный шаг:** (1) выполнить clean/isolated Windows install/launch and Save trial (по согласованным условиям без нарушения пользовательского хоста) и отметить отдельно от packaging; (2) проверить естественный много-жизненный `10 Hard Work → 10 active meta → Day1 Palace → ending`, все 4 региона/3-of-4 D38 и полноценный 160-day run без инъекций Save; (3) завершить творческое решение глобальной тайны только по пользовательскому authority, сравнить качество текстов/регионов/отношений, приоритизировать финальную графику/UX; (4) сохранить Frozen Golden и source/main CI в значимых релизных пакетах. Если нет evidence, писать `NOT PROVEN`, а не `MISSING ENGINE` и не `DONE`.

**Текущая командная защита:** Chats2–6 PARKED, устаревшие задания закрыты; лишь пользователь вручную активирует worker с НОВОЙ задачей. PR #305 остается test-only Draft (последний подтверждённый full CI #37814203592 SUCCESS, 1355/0/4). При смене SHA перепроверить GitHub, обновить эту библиотеку + `tasks/CURRENT_LEADER1_CHECKPOINT.md`, а не придумывать ещё один непомеченный «latest» handoff.

---

**Обновлено: 2026-10-08. Репозиторий: `Plegyer/Text`. Назначение: точка восстановления после потери контекста, а не очередной исторический отчёт.**

> **ПЕРВОЕ ПРАВИЛО НОВОГО ЛИДЕРА:** Прочитай эту библиотеку целиком **до** длинных исторических документов, старого Live Dashboard и назначения работ. Затем проверь актуальные `main`, CI, PR, worker pointers. Нельзя начинать новую «фазу строительства движка» или повторять закрытые задачи по старому handoff. Если библиотека и действительный Git расходятся, обнови библиотеку **до** выдачи поручений.

## 1. Короткая истина — что мы строим, в каком состоянии

**White Squirrel Chronicles / Mindy Successor** — самостоятельная однопользовательская комедийная фэнтезийная life-sim RPG для взрослой аудитории, не прямой перенос Simply Mindy. Героиня попадает в мир через белого суслика и люк; проживает полноценные связанные жизни: профессии, обучение, бедность и жильё, отношения, ночь, экспедиции, концовки и Meta/NG+; глобальная тайна — важна, но не вытесняет остальные жизни. Требование пользователя — **полная игра**, не «готовый движок» и не абстрактная архитектурная демонстрация.

**ДВИЖОК/ОСНОВНЫЕ СИСТЕМЫ ФАКТИЧЕСКИ ГОТОВЫ.** Это подтверждается реальными файлами `src/core`, `src/ui`, `desktop`, содержимым `content` и регрессией, а не только обещанием предыдущих исполнителей. **Stage1–Stage5 интеграция и QA ЗАКРЫТЫ (burn-down 0), но публичный 1.0 НЕ принят и НЕ объявлен готовым.** Теперь задача — окончательная **продуктовая сборка существующей игры**, качество игрового опыта, содержательные ветки/глобальная тайна, графика/UI и проверенный Windows-релиз.

Критическое предостережение из ошибки предыдущего Leader1: длинные документы 2026-09-25/10-01 с формулировками «Secret Debt/Palace/four regions ещё не сделаны» — **история**, не современное состояние. Нельзя принимать архив за очередь работ. Дата в имени файла не гарантирует актуальность; сравни с `main`.

## 2. Подтверждённый реальный технический состав (snapshot 2026-10-08)

**Надёжно реализовано:**
- **12 progression stats + отдельная Lust**; 10 очков создания, календарь **160 дней/4 года**, baseline 3 дневные Energy, seasonal-stat work; сохранение Run/Meta, миграции, детерминированный resolver, Game/Night/Activity/Ending lifecycle.
- **10 обычных профессий** (Lumber, Satyr Maid, Undead Farm, Tavern, Hunter, Guard, Merchant, Artist/Geisha, Assassin, Prostitute); **Palace** — 11-я main profession; **Secret Debt** — отдельный hidden route, НЕ 11-я обычная профессия. Реальные каталог/карьеры, не только docs.
- **8 платных курсов School** и progression, housing/poverty, Night, Relationships, inventory/capability-gated actions, Hard Work/Meta/Strong Meta, Palace rich-six progression and True Ending mechanics, Secret Debt path.
- **4 целевых региона Activity D36**: Forest Frontier (`lumber.forest`), Trade Corridor (`trade.corridor`), Anomalous Reach (`anomalous.reach`), Restricted Sites (`restricted.sites`); дополнительно `hunter.expedition` и `assassin.infiltration`. В каталогe **6 Activity definitions**, среди четырёх регионов **22/21/18/21** действий/options; реальные tracking/ritual/infiltration, field-time, camp, season/item paths и тесты.
- Кодовый инвентарь snapshot: **11 карьерных определений, 64 действия, 52 окончания, 25 предметов, 6 Activity**, **507 semantic presentation slots**, в `assets/presentation` **101 SVG + 6 GIF**, плюс общие assets. RU/EN интерфейс/медиа, Electron desktop shell, NSIS build config.
- Существуют **естественные тесты** карьер Satyr Maid, Undead Farm, Tavern, Hunter, Guard, Merchant, Artist/Geisha, Assassin, Prostitute и многих cross-system веток. Тест **естественных 50 смен Lumber** впервые добавлен только в отдельный Draft PR #305; см. статус далее.

**Доказательственная осторожность:** тесты многих продвинутых регионов/Palace создают предварительное состояние напрямую (день, инвентарь, 10/10 Meta и т.д.). Это корректная проверка контрактов, **не** свидетельство полного живого прохождения всех жизней/Дворца/регионов без инъекций. 52 ending definitions ≠ все 52 ветки вычитаны и реально пройдены глазами игрока. Доступность `npm run dist:win` ≠ проверенный на чистом ПК инсталлятор.

**Итог:** делать ещё один framework rewrite, «реализовать четыре региона», «добавить Secret Debt» либо «сделать все 10 профессий с нуля» — **дублировать уже сделанное**.

## 3. Подтверждённый Git/CI и текущее незавершённое действие

- Принятый **Stage5 exact-source** `8ea2279a5097e6568d9d31e9137ca3feb1f1a4e1`, [Actions #37809954382](https://github.com/Plegyer/Text/actions/runs/37809954382) SUCCESS: immutable Golden 32/32, strict RU/EN 6/6, migrations 38/38, Chromium-rendered RU/EN accessibility/caption controlled scenario, total 1354 PASS / 0 FAIL / 4 optional SKIP. Merged [PR #303](https://github.com/Plegyer/Text/pull/303), merge SHA `bb2a1c8649bf150b74611eda958ea874a8905952`.
- **Stage5 official exact-main** [Actions #37812797149](https://github.com/Plegyer/Text/actions/runs/37812797149) SUCCESS at code-tree commit `db3cc892cb96cca43bec298a85e61f0e2c376bda`, 1354 PASS / 0 FAIL / 4 SKIP. GitHub main after that may have *docs-only* commits; **перепроверь все новые commit diffs**, не экстраполируй CI на новый code commit. Предыдущий main CI fail был только Windows CRLF checkout immutable Golden, исправлено в workflow восстановлением byte-exact оригинала.
- Приняты замороженные Golden SHA `bc8617be68825543ed7617e9dd5c7d915f6b0e14` (v54), `e40737f3c6d6da83d1e4692e4457c04936279d53` (v55), сохранены D51 две narrow RU Secret Debt expectation exceptions и три точечные Tavern copy корректировки. **Не менять frozen Golden/границы без явной новой задачи.**
- **Post-Stage5 Draft [PR #305](https://github.com/Plegyer/Text/pull/305)**, test-only branch `lead/integrate-post-stage5-lumber-natural-50-v1`, head `de51aad2817e6cee1f39c5598a3ef9cd4c9a83ed`, [CI #37814203592](https://github.com/Plegyer/Text/actions/runs/37814203592) **SUCCESS**: 1355 PASS / 0 FAIL / 4 SKIP, новый unseeded 50-day Lumber Hard Work → New Life test PASS. **Этот PR остаётся Draft, не слит** на момент записи. Связанная [Issue #304](https://github.com/Plegyer/Text/issues/304) — evidence gap, **НЕ новый engine blocker**. Обновляй статус только после реального изменения Git.
- Chat2–Chat6 считаются **PARKED** на момент этой библиотеки. Старые stage2/stage5 task pointers Chat4–6 имеют устаревшие «START NOW» — необходимо синхронизировать. Новый исполнитель не может самостоятельно «разбудить» чаты: требуется ручное действие пользователя.

## 4. Что реально осталось до full public 1.0

**A. Сквозное доказательство игрового продукта, не переписывание механик.** Настоящие 160-дневные life runs, разные экономические/бедные пути, 10 Hard Work разных жизней → накопление Meta → активировать все десять бонусов в New Start+ → Day-1 Palace invitation → полноценный Palace path/True Ending; четыре региона Activity по естественным условиям с качественными encounter/mini-game интерфейсами; save/reload/migration на реальных переходах. Не выдавать seeded setup tests за естественное длинное прохождение.

**B. Финальное творческое наполнение:** связность карьер, плотность реакций, отношения, повторяемость текстов/событий, темп и варианты, global macro-mystery / overall lore. В `USER_DECISIONS_LOCKED_v1.md` **после D48** ещё явно OPEN **macro mystery/lore**, часть внешнего медиа/арт-бюджета. Решение Дворцовой D45 истории не означает автоматического разрешения общей тайны. Не придумывать окончательный reveal за пользователя.

**C. Визуал/редактура/UX:** содержательное качество 101 статических SVG/6 GIF, заглушки, осмысленные картинки/анимации, натуральный RU/EN, доступность экранов по действиям, UI и удобство прохождения. **Не считать все медиа готовыми только из-за 507 slots.**

**D. Windows release:** `npm run dist:win` + NSIS installer, чистая Windows учётная запись, реальный запуск, сохранение/миграция/повторная установка, внешние ресурсы, ошибки и восстановление. **Stage5 `npm run check` не запускал финальный installer smoke.**

Приоритет: **выбирать следующую работу по самому большому player-visible gap**, а не по количеству новых JSON/CI-циклов. Не множить искусственные этапы/микро-QA без обоснования. Параллельные независимые куски — авторы контента/медиа/creative и QA/assembly; объединение значимых партий → один полный exact-source CI → merge → exact-main CI. Быстрые focused tests локально. Не откладывать **все** ошибки до конца проекта, но и не проверять всю игру после каждого изменённого текста.

## 5. Замороженные решения и подчинение авторитетам

- Пользовательская цель и приоритет: `docs/USER_VISION_AND_ACCEPTANCE.md`.
- LOCKED product rules D1–D48: `docs/USER_DECISIONS_LOCKED_v1.md`, `docs/NEW_GAME_SPEC_v1.md`; выбранные неизвестные — НЕ молчаливые разрешения.
- Master spec: `docs/EXECUTABLE_TZ_v1.md`; shipped reality: `prior-work/astra/prototype-m3.2/content/definitions.json`, `src/core/*`, `src/ui/*`, `desktop/*`, `tests/*`; закрытый Stage5: `docs/tasks/LEADER1_STAGE5_FINAL_GO_NO_GO_2026-10-08.md`.
- Сверка всего проекта с фактами: `docs/tasks/LEADER1_WHOLE_PROJECT_REALITY_AUDIT_2026-10-08.md`.
- Текущая очередь/права/состояние: `docs/tasks/CURRENT_LEADER1_CHECKPOINT.md`, `docs/tasks/LEADER_STATE.md`, живые refs GitHub и workflow runs. Эти operational файлы надо обновлять вместе с библиотекой, а не отдельно.
- Инварианты: только 3 Day-1 careers; 10 ordinary; Palace unlock требует Hard Work 10/10 **и** activation all 10 packages для приглашения Day 1; Secret Debt не считается; Lumber 50 shifts; Stage5 Golden immutable; ending eligibility non-terminal; night/energy/save/RNG/Meta exactly-once.

## 6. Как предотвращать потерю знаний при смене контекста

1. **До работы читать ЭТОТ файл полностью**, потом `docs/tasks/CURRENT_LEADER1_CHECKPOINT.md`, `docs/tasks/LEADER_STATE.md`, latest `main`/CI/open PR/worker pointers; только потом детали конкретного поручения.
2. **После существенного изменения** редактировать библиотеку **в том же файле**: секции «готово», «не готово», «запреты», «активная работа», ссылки на доказательства. Не складывать всю оперативную истину лишь в новые датированные handoff — они быстро теряются в 300 файлах. При необходимости подробности вынести в отдельный аудит, но дать здесь ссылку.
3. **Знание vs статус:** подтверждённая способность движка и LOCKED decisions живут в этой библиотеке; быстро меняющиеся SHA/PR/runner status должны перепроверяться GitHub каждый запуск. Нельзя назвать Stage5 public-1.0 GO. Никогда не принимать старый README, restart prompt, worker pointer или Stage4/Stage5 OPEN фразы как актуальные без этой сверки.
4. **Перед уходом Лидера/исчерпанием контекста** проверить, что библиотека, `CURRENT_LEADER1_CHECKPOINT` и handoff/restart prompt согласованы, а открытая работа (в том числе frozen SHA, branch, PR, CI и следующий конкретный шаг) восстановима без чата. Новому Лидеру нужна не память переписки, а явная точка входа в Git.
5. **Если новый Лидер обнаруживает конфликт:** остановить ошибочное поручение; сверить `git main` + тесты + последние решения; задокументировать исправление с источником. Нельзя молча заменить «готово» на «не готово» только из-за старого checkpoint.
6. **Не выдавать «всю игру доделали» за факт:** до финального PRODUCT acceptance + Windows installer smoke отметка проекта — `ENGINE READY / GAME FINISHING`.

**Стоп-сигнал:** Если после смены контекста новый Лидер предлагает заново реализовать Palace, Secret Debt, School, четыре целевых Activity региона или все 10 ordinary careers, прежде чем обсуждать работу — снова прочитать разделы 1–4 и проверить соответствующие файлы/тесты `main`.
