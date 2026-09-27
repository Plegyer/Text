# Bilingual GIF Producer Batch — School + Poverty v1

Purpose / Назначение:
prepare shared RU+EN producer cards for reachable School presentation surfaces and current ordinary-poverty production.

Global invariant / Общее правило:
- one semantic presentationId;
- one shared 3–5 GIF pool;
- one locale-neutral candidate key/media path;
- RU + EN player-facing context and alt;
- no duplicated GIF per language;
- no locale-specific gameplay.

---

# School

## Card S1 — paid lesson result family

**Semantic IDs / Семантические ID**

- `school/literacy-and-numbers/lesson/default`
- `school/arcana/lesson/default`
- `school/rhetoric-and-social/lesson/default`
- `school/etiquette-and-presentation/lesson/default`
- `school/field-craft/lesson/default`
- `school/physical-training/lesson/default`
- `school/arts-and-performance/lesson/default`
- `school/body-confidence/lesson/default`

**Shared media identity / Общая media identity**

One locale-neutral media pool per semantic ID.

**RU context**

Платный урок завершён; визуальная сцена показывает учебную среду и упражнение по выбранному направлению без дополнительного игрового эффекта.

**EN context**

The paid lesson is complete; the presentation shows the learning environment and track-appropriate practice without any additional gameplay effect.

**Initial pool / Начальный pool: 3 candidates**

1. Classroom/study environment.
   - RU alt: Учебные материалы разложены в классе после упражнения.
   - EN alt: Study materials are arranged in the classroom after an exercise.
2. Track-appropriate practice.
   - RU alt: В классе продолжается короткое упражнение по выбранному учебному направлению.
   - EN alt: A short exercise continues in the classroom for the selected study track.
3. Reflection/review.
   - RU alt: После урока спокойно перечитывают записи и результат упражнения.
   - EN alt: Notes and the result of the exercise are reviewed quietly after the lesson.

**Static fallback**

`assets/stage-school.svg`

Do not infer a named teacher unless that exact teacher mapping is approved.

---

## Card S2 — generic after-School hook

**presentationId**

`location/town/event/school-lesson-content-v1-after-school/default`

**RU context**

После платного урока класс ненадолго затихает; остаётся короткая нейтральная рефлексия без нового расхода или награды.

**EN context**

After the paid lesson, the classroom settles briefly for a neutral reflection with no new cost or reward.

**Initial pool: 3**

1. RU alt: После урока в классе собирают записи и материалы.
   EN alt: Notes and materials are gathered in the classroom after the lesson.
2. RU alt: Учебные записи спокойно перечитывают перед уходом.
   EN alt: Study notes are reviewed quietly before leaving.
3. RU alt: Класс постепенно пустеет после завершённого занятия.
   EN alt: The classroom gradually empties after the completed lesson.

**Static fallback**

`assets/stage-school.svg`

---

## Card S3 — generic School-life post-lesson hook

**presentationId**

`location/town/event/school-life-content-v1-after-paid-lesson/default`

**RU context**

После завершённого урока остаётся короткий момент школьной жизни: класс, материалы и нейтральное общение без нового игрового эффекта.

**EN context**

After the completed lesson, a short School-life moment remains: classroom, materials and neutral interaction without a new gameplay effect.

**Initial pool: 3**

1. RU alt: После занятия в классе приводят в порядок учебное место.
   EN alt: The study area is tidied after class.
2. RU alt: Учебные материалы складывают перед продолжением дня.
   EN alt: Study materials are packed away before the day continues.
3. RU alt: В классе остаётся короткий спокойный момент после урока.
   EN alt: A brief quiet moment remains in the classroom after the lesson.

**Static fallback**

`assets/stage-school.svg`

---

## Card S4 — exact Night-study hook

**presentationId**

`location/town/event/school-life-content-v1-after-night-study/default`

**RU context**

Ночная учёба заканчивается спокойно; визуальная сцена показывает завершение самостоятельной работы без дополнительного игрового эффекта.

**EN context**

Night study winds down quietly; the presentation shows independent study ending without any additional gameplay effect.

**Initial pool: 5**

1. RU alt: После ночной учёбы перечитывают тихие записи.
   EN alt: Quiet notes are reviewed after Night study.
2. RU alt: В конце ночной учёбы проверяют учебную схему.
   EN alt: A study diagram is checked at the end of Night study.
3. RU alt: Материалы складывают после завершения ночной учёбы.
   EN alt: Study materials are organized after Night study ends.
4. RU alt: Перед окончанием ночной учёбы дописывают короткую заметку.
   EN alt: A short note is finished before Night study ends.
5. RU alt: Рабочее место спокойно готовят к завершению ночной учёбы.
   EN alt: The study area is quietly prepared for the end of Night study.

**Static fallback**

`assets/stage-school.svg`

Language selection must not change the exact completed Night choice or reroll the selected GIF candidate.

---

# Ordinary poverty

## Card P1 — street/helpful summer

**presentationId**

`location/town/event/poverty-street-production-helpful-summer/default`

**RU context**

У закрывающегося летнего рынка появляется короткая необязательная возможность помочь с ящиком; визуальная сцена не выбирает решение игрока.

**EN context**

At a closing summer market, a short optional opportunity appears to help with a crate; the presentation does not choose the player's response.

**Initial pool: 3**

1. RU alt: У закрывающегося прилавка остался обычный грузовой ящик.
   EN alt: An ordinary cargo crate remains beside a closing market stall.
2. RU alt: На краю летнего рынка заканчивают уборку после торговли.
   EN alt: Cleanup is finishing at the edge of the summer market.
3. RU alt: Под навесом у улицы стоит ящик перед закрытием рынка.
   EN alt: A crate stands under cover beside the street as the market closes.

**Static fallback**

`assets/stage-outside.svg`

The GIF does not imply that the paid errand was accepted.

---

## Card P2 — cheap lodging

**presentationId**

`location/town/event/poverty-cheap-production-shared-quiet-autumn/default`

**RU context**

Дешёвая общая комната осенью рано затихает; сцена показывает тесный ночлег без дополнительного штрафа или награды.

**EN context**

A cheap shared room settles early in autumn; the scene shows cramped lodging without an additional penalty or reward.

**Initial pool: 3**

1. RU alt: Тесная общая комната постепенно затихает вечером.
   EN alt: A cramped shared room gradually settles into quiet for the evening.
2. RU alt: В комнате с тонкими стенами готовятся ко сну.
   EN alt: People prepare to sleep in a room with thin walls.
3. RU alt: Личные вещи аккуратно устраивают в общей дешёвой комнате.
   EN alt: Personal belongings are arranged carefully in the shared cheap room.

**Static fallback**

`assets/stage-room.svg`

---

## Card P3 — recovery/help cleanup

**presentationId**

`location/town/event/poverty-recovery-production-short-cleanup/default`

**RU context**

У закрывающегося прилавка осталась небольшая уборка; визуальная сцена показывает работу, но не означает, что игрок уже согласился её выполнить.

**EN context**

A small cleanup remains at a closing stall; the presentation shows the task without implying that the player has agreed to do it.

**Initial pool: 3**

1. RU alt: У закрывающегося прилавка складывают два табурета.
   EN alt: Two stools are stacked beside a closing stall.
2. RU alt: Узкую полосу у прилавка подметают перед закрытием.
   EN alt: A narrow strip beside the stall is swept before closing.
3. RU alt: Ведро несут от прилавка к сливу после уборки.
   EN alt: A bucket is carried from the stall toward a drain after cleanup.

**Static fallback**

`assets/stage-outside.svg`

The GIF never grants money.

---

## Card P4 — recovery/help herb bundle

**presentationId**

`location/town/event/poverty-recovery-production-herb-bundle/default`

**RU context**

Возле пустого рыночного ящика лежит забытый связанный пучок обычных трав; сцена не означает, что предмет уже взят.

**EN context**

A forgotten tied bundle of ordinary herbs lies beside an empty market crate; the scene does not mean the item has already been taken.

**Initial pool: 3**

1. RU alt: Связанный пучок обычных трав лежит рядом с пустым ящиком.
   EN alt: A tied bundle of ordinary herbs lies beside an empty crate.
2. RU alt: Забытые травы лежат у края тихого рынка.
   EN alt: Forgotten herbs lie at the edge of a quiet market.
3. RU alt: Небольшой пучок трав заметен рядом с закрытым торговым местом.
   EN alt: A small herb bundle is visible beside a closed market stall.

**Static fallback**

`assets/stage-outside.svg`

---

## Card P5 — pressure/cold rain

**presentationId**

`location/town/event/poverty-pressure-production-cold-rain/default`

**RU context**

Холодный весенний дождь добирается до уличного укрытия; визуальная сцена показывает ситуацию, но не выбирает безопасный или рискованный ответ.

**EN context**

Cold spring rain reaches a street shelter; the presentation shows the situation without choosing the safer or riskier response.

**Initial pool: 3**

1. RU alt: Холодный дождь добирается до края уличного укрытия.
   EN alt: Cold rain reaches the edge of a street shelter.
2. RU alt: За мокрым бордюром виден более глубокий дверной проём.
   EN alt: A deeper doorway is visible beyond the wet curb.
3. RU alt: Вода течёт по мостовой рядом с открытым местом для ночлега.
   EN alt: Rainwater runs along the pavement beside an exposed resting place.

**Static fallback**

`assets/stage-outside.svg`

The alt must not state hidden Energy/grooming penalties.

---

## Card P6 — pressure/noisy loading

**presentationId**

`location/town/event/poverty-pressure-production-noisy-loading/default`

**RU context**

До рассвета начинается погрузка, и привычный угол становится шумным; визуальная сцена не определяет решение игрока.

**EN context**

Loading begins before dawn and the familiar corner becomes noisy; the presentation does not determine the player's response.

**Initial pool: 3**

1. RU alt: До рассвета к улице подъезжают рабочие повозки.
   EN alt: Work carts arrive on the street before dawn.
2. RU alt: Ящики и колёса заполняют место ранней погрузки.
   EN alt: Crates and wheels fill an early-morning loading area.
3. RU alt: Тихий угол становится шумным из-за начавшейся погрузки.
   EN alt: A quiet corner becomes noisy as loading begins.

**Static fallback**

`assets/stage-outside.svg`

---

# Shared delivery format / Общий формат поставки

```text
presentationId: <shared semantic ID>
candidateKey: <locale-neutral>
mediaPath: <one shared GIF>
context.ru: <RU source>
context.en: <EN localization>
alt.ru: <RU alt>
alt.en: <EN alt>
staticFallback: <shared asset>
```

## Exclusions / Исключения

Do not add:
- locale-specific media files by default;
- locale-specific semantic IDs;
- Secret Debt content;
- unapproved teacher routing;
- hidden mechanics in alt;
- gameplay outcome selection through media.

## Acceptance / Приёмка

Each card passes when:
1. RU + EN context describes the same semantic scene;
2. every candidate has RU + EN alt;
3. the media pool is shared between locales;
4. static fallback is shared;
5. locale switch changes text only;
6. the current candidate remains stable for the same occurrence.
