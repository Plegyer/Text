# SUSLIK 2 — медиа и рабочая ветка: инструкция новому чату (16.10.2026)

## Самое важное

**Не переносить бинарные байты изображения/музыки между чатами или инструментами. Они УЖЕ лежат в GitHub.** Непосредственно разрабатывать по ветке **`suslik-2/portable-canonical-20261015`**, каталог `suslik-2/`. Старую игру в `main` не менять. Ветка `suslik-2/import-recovery-staging-20261015` содержит другие/ранние компоненты и **не равна** канонической переносимой игре с медиа.

Полный источник (включая ассеты): https://github.com/Plegyer/Text/tree/suslik-2/portable-canonical-20261015/suslik-2

GitHub release с сохранённым ZIP исходников и медиа: https://github.com/Plegyer/Text/releases/tag/suslik2-canonical-20261015

Наличие релиза подтверждено по GitHub API 16.10.2026: `SUSLIK2-CANONICAL-Windows-2026-10-15.zip`, 121700148 байт; SHA256 `f863a06e08118460d5fdca57653430bdd277929969cd436a95f4885621621c8c` (из метаданных канонической публикации). GitHub Actions ранее записал тесты 85/85 в `TEST_RESULTS_85_OF_85.txt`; новые правки требуют своих тестов.

## Где уже доступны реальные бинарные файлы

**Проверено по GitHub Contents API** — это существующие файлы в канонической ветке, а не придуманные пути:

- `assets/music/Clockwork Cupcake.mp3` — старт/вступление
- `assets/music/Velvet Banana Split.mp3` — меню/карта/стандартная работа
- `assets/music/Slow_Midnight_Breath.mp3` — сон и ночь на улице
- `assets/music/The_Ghoul_s_Night_Shift.mp3` — ферма нежити
- `assets/combat/Shields_Against_the_Sky.mp3` — бои
- `assets/combat/{hero-standard.png,goblin.png,ogre.png}` — бойцы
- `assets/events/{foreman-handover.png,goblin-encounter.png,ogre-after.png,ogre-intro.png,sawmill-15.png,sawmill-50.png}` — сюжет
- `assets/night/{room.png,satyr-work.png,street.png}` — ночь
- `assets/undead-farm/shift-{spring,summer,autumn,winter}.png` — ферма
- `assets/work/sawmill/{spring,summer,autumn,winter}.png` — лесопилка
- `assets/map/map-background.webp`, `assets/map/buildings/*.png` — карта и 13 зданий
- прочие `assets/preworld-*.png`, `assets/intro-*.png|gif`, `assets/splash-title.png`, `assets/character-selection.png` — вводная часть.

GitHub-коннектор может **не декодировать PNG/MP3 как текст** и поэтому сообщать «не умею перенести байты». Это **не означает отсутствия файлов**. Извлекать байты для штатного подключения не требуется: в коде использовать существующие относительные пути в канонической ветке. Общее управление фоновой музыкой — через `music-director.mjs`, `content/music.json`, `content/offline-content.js`, не создавать второй аудиодвижок.

При необходимости перенести УЖЕ хранящийся в GitHub медиафайл на другую ветку можно использовать **Git blobs по SHA** через GitHub Git Trees API (сослаться на готовый blob в нужном пути, затем создать commit/update_ref); содержимое повторно не загружается. Предпочтительнее, однако, работать в канонической ветке, чтобы вообще не требовался перенос.

## Чем подтверждать и где править

1. Сначала открыть `START_HERE_ANY_CHAT.md`, `CANONICAL_GITHUB_SOURCE.md`, `PROJECT_MEMORY.md`, `PROJECT_AUTHORED_SCENES.md` из ЭТОЙ ветки.
2. Получать исходники через GitHub по пути и ref `suslik-2/portable-canonical-20261015`. Для новых окон/кнопок изменять `offline.js`, `gameplay-ui.js`, `gameplay-system.js`, `work-rules.js`, `gameplay-content.js`, `content/*.json`; не путать со старой демо-картой `map.html`.
3. После редактирования JSON синхронизировать офлайновую копию: `node tools/rebuild-offline-content.mjs`; проверить `node --test tests/*.test.mjs`. При отсутствии оболочки локальных команд честно указать, какие тесты не запускались.
4. Не заявлять, что новые изображения или музыка добавлены, пока они действительно не появились как GitHub-файлы с известными путями.
5. **Новые, ещё НЕ опубликованные авторские бинарные вложения** — отдельная задача первичной загрузки. Коннектор GitHub в этом чате принимает `create_blob.content` как строку Base64, но не путь на локальный диск; перенос произвольного нового много-мегабайтного медиа из файловой песочницы напрямую коннектором может быть недоступен. В этом случае нужна отдельная загрузка через GitHub Actions/release/специализированный импорт или единичное пользовательское вложение. НЕ путать с уже опубликованными медиа в списке выше.

## Конкретная инструкция, если другой чат жалуется «нет доступа к байтам»

**Не переносите байты. Работайте непосредственно в ветке `suslik-2/portable-canonical-20261015`, где исходные PNG/MP3/GIF уже лежат.** Проверяйте медиа через Contents API (входная мета-информация и blob SHA). Для игровых экранов указывайте пути; для музыки — штатный MusicDirector. Если вы меняете код другой ветки, сначала перенесите текстовые патчи/сам код в каноническую, сохранив её `assets/`. Не создавайте параллельную копию пустых ассетов.

Новых сюжетных правил этот документ не вводит, только устраняет техническое недоразумение при передаче между чатами.
