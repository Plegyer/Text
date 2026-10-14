# SUSLIK 2 — Сдача 15 сломанных копий бригадиру

**Статус:** изолированная одноразовая сцена и адаптер сохранений. Реальная переносимая лесопилка, домашние ночные действия, штатный инвентарь и музыка **не опубликованы** в доступных ветках GitHub `suslik-2/*`. Платёж/время/энергию/баланс код не меняет. Нельзя называть текущую ветку готовым игровым маршрутом; интерфейс должен быть подключён к реальной сборке координатором после публикации её исходников. Изменения только в `suslik-2/`, основаны на `suslik-2/combat-goblin-v1`.

## Содержимое

- `foreman-spears-core.js`: критерии появления кнопки, `foreman-spear-handover`, сохранение факта показа, подтверждение только на «Далее», одноразовое списание 15 `broken_goblin_spear`, завершение квеста, блокировка последующего дропа, открытие ночной «Тренировки».
- `foreman-spears-content.js`: **точный авторский русский диалог**, путь `assets/foreman/spears-handover.png`, ключ `music:'inherit-sawmill'`; изменяется без правки игровой логики.
- `foreman-spears-ui.js`, `foreman-spears.css`: одна кнопка «Далее» в сцене, условная кнопка разговора в обычной лесопилке и ночная «Тренировка» дома. В новой сцене **нет отдельного аудио**: музыкальный менеджер сохраняет уже играющую музыку лесопилки.
- `foreman-spears-bridge.js`: жёсткий контракт адаптера реального инвентаря и **одной атомарной записи**; повторное подтверждение не списывает копья ещё раз.
- `combat-core.js`: аргумент `options` (необязательный шестой аргумент) в `settleVictory`; запрет выдачи копья после завершения квеста через `options.spearDropsDisabled===true` или флаг в реальном сохранении `gameState.spearDropsDisabled`/`gameState.foremanQuest.spearDropsDisabled`. До сдачи работает прежнее ограничение 15 копий, награды не изменены.

## Подключение — только к настоящему portable host

Подключить обычные JS без ESM/fetch и новый CSS, затем создать `const bridge = SUSLIK2ForemanSpearsBridge.create(bindings)`. Все обязательные `bindings` должны существовать в переносимой игре:

```html
<script src="foreman-spears-core.js"></script>
<script src="foreman-spears-content.js"></script>
<script src="foreman-spears-ui.js"></script>
<script src="foreman-spears-bridge.js"></script>
<link rel="stylesheet" href="foreman-spears.css">
```

`readSnapshot()` должен вернуть `{game,quest}` из **одного** текущего сохранения. При отсутствии поля `quest` использовать `SUSLIK2ForemanSpears.initialState()`; при чтении — `restoreState()`. `commitSnapshot({game,quest})` обязан атомарно сохранить оба поля и вернуть строго `true` только после подтверждённой записи (ошибка — исключение/false). Для работающей в `file://` сборки это должен быть существующий синхронный механизм хранения, не отдельный запрос в сеть.

`readEvidence(game)` возвращает объект `{questActive:boolean,spearCount:integer,handoverSceneShown:boolean,questCompleted:boolean}` из живого квеста и инвентаря. `readSpearCount(game, 'broken_goblin_spear')` — чтение штатного инвентаря. `applyApprovedHandover(game,change)` **чисто** возвращает новое состояние с уменьшением количества копий на 15 и флагами `questCompleted`, `spearDropsDisabled`, `nightTrainingUnlocked`; `readQuestFlags(nextGame)` подтверждает их. Не хранить эти флаги только в DOM; не добавлять неизвестный способ повышения характеристик или расход ночной энергии.

Порядок:
1. В обычном рендере лесопилки: `const {quest,evidence}=bridge.availability()`, затем `SUSLIK2ForemanSpearsUI.addTalkButton(sawmillButtons,quest,evidence,()=>{if(bridge.talk())showHandoverScene();},{locale})`. Кнопка физически **не создаётся** до выполнения всех требований.
2. При `bridge.talk()` сцена получает `sceneShown=true` и сохраняется **до** рисования; товар пока не списывается. После перезагрузки `bridge.isSceneOpen()` возвращает true — показать **ту же** одноразовую сцену повторно без второго открытия/дропа.
3. `SUSLIK2ForemanSpearsUI.renderHandover(view,quest,()=>{if(bridge.next())showExistingSawmillWorkScreen();},{locale})`. «Далее» атомарно уменьшает инвентарь на 15 и записывает завершение квеста, запрет копий и доступность «Тренировки». При ошибке записи оставаться в сцене. **Только одна кнопка** в самой сцене; музыку лесопилки не останавливать и не менять.
4. В существующем рендере дома (ночь): `SUSLIK2ForemanSpearsUI.addNightTrainingButton(homeNightButtons,quest,existingApprovedTrainingHandler,{locale})`. Содержимое, стоимость и эффекты тренировки **не утверждены в этом задании**: требуется уже существующий обработчик; модуль не придумывает его.
5. В реальном обработчике награды гоблина передавать из того же snapshot `options={spearDropsDisabled:bridge.spearDropsDisabled()}` в `SUSLIK2Combat.settleVictory(battle,game,spearCount,approvedShift,rng,options)` или хранить соответствующий флаг в `gameState`. Чтобы не получить гонку, награду и квест сериализовать в одном штатном сохранении. После сдачи 15 копий выпадение **навсегда запрещено в этом заходе**, даже при нулевом количестве в инвентаре.
6. Для сброса нового захода создавать новый `initialState()`, сохраняя прочие утверждённые мета-достижения; без пользовательского решения не переносить квестовое завершение в новую игру.

## Оригинальный авторский рисунок без сервера

GitHub-коннектор отклонил единый вызов `create_blob(encoding:'base64')` с 4 715 968 символами (`h2 protocol error: error reading a body from connection`), хотя приём небольших blob-объектов работает. Поэтому исходные **точные бинарные данные** PNG опубликованы без перекодирования как 20 обычных JS частей в `assets/foreman/embedded/part-01.js` … `part-20.js`. Их объединяет `foreman-spears-inline-image.js`, превращая в `data:image/png;base64,` без fetch/Node или сети. Рисунок в сцене использует `SUSLIK2ForemanImageURL` перед стандартным путём `content.image`. После обычной публикации отдельного PNG можно убрать JS части из HTML без правок механики.

Для использования из `file://` ПОСЛЕДОВАТЕЛЬНО добавить перед `foreman-spears-ui.js` 20 тегов `<script src="assets/foreman/embedded/part-01.js"></script>` … `part-20.js`, затем `<script src="foreman-spears-inline-image.js"></script>`. Все части должны загрузиться прежде, чем рисуется сцена. Это **не** отдельный готовый PNG-путь в GitHub: фактический `assets/foreman/spears-handover.png` пока отсутствует, но оригинал побайтно восстановим и отображается в портативном браузере. Тест сверяет длину 3 536 974 байта и SHA-256 `015f3c0d6e1602abfa8580e4a98ce8c95d3322e7bf5b60a257b5d1f9503ab95e`.

При необходимости восстановить обычный PNG локально из точных данных, команда разработчика из каталога `suslik-2/`: `node tools/materialize-foreman-image.mjs`. Она побайтно проверяет SHA-256 и создаёт `assets/foreman/spears-handover.png`. Node — только для необязательной подготовки бинарного файла; игра с загруженными JS-фрагментами работает без Node и сервера.

## Блокеры

- Опубликованные ветки SUSLIK 2 не содержат актуальных `sawmill`, `home/night`, инвентаря, сериализации текущей переносимой игры и музыкального менеджера. Прямой E2E тест невозможен.
- Пользовательское изображение `изображение(20261014-095427).png` доступно в среде диалога (`1448×1086`, оригинал около 3.5 МБ), но GitHub `create_blob` требует встроенную строку Base64. Контейнерный файл не доступен для чтения инструментом GitHub, а container/git не имеют сетевого подключения. **В GitHub пока нет `suslik-2/assets/foreman/spears-handover.png`.** Нельзя подменять или объявлять ресурс загруженным. После появления канала передачи бинарных файлов добавить исходные байты без изменения.
- Для активной «Тренировки» требуется реальный сценарный обработчик в ночной сцене; этот модуль только открывает кнопку.

Тесты: `node --test tests/foreman-spears.test.mjs` из `suslik-2`, Node необходим только для разработки, не для запуска игры.
