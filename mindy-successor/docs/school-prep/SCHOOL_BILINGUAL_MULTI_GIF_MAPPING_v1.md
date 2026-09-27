# School Bilingual Multi-GIF Mapping v1

Status: RU+EN presentation planning. GIF/static identity is shared across locales; only alt text/caption/context is localized.
Final art style remains OPEN.

## Shared rules

- Never duplicate a GIF asset merely because language changes.
- One semantic media identity serves RU and EN.
- RU and EN alt text describe the same visual meaning.
- RU and EN captions/context describe the same authored beat.
- Static fallback remains valid when GIF is absent.
- Media timing never controls tuition, Energy, stats, progress, public results, or scene completion.
- Current shared static fallback is `assets/stage-school.svg` unless Lead/Chat2 replaces it deliberately.

## Pool 1 — Generic classroom wrap-up

Reachability: **REACHABLE_NOW**

Primary content:
- generic post-paid-lesson event;
- peer note comparison;
- class dispersal;
- board cleanup;
- quiet reflection.

Suggested semantic media identity:
- `school.media.pool.classroom-wrapup`

RU alt:
Обычная школьная аудитория после урока: ученики собирают записи и материалы, преподавательская зона остаётся на заднем плане.

EN alt:
A generic School classroom after a lesson, with students gathering notes and materials while the teaching area remains in the background.

RU caption/context:
Урок уже завершён; сцена показывает только спокойное послесловие без новых игровых эффектов.

EN caption/context:
The lesson is already complete; the scene is only a quiet aftermath with no new gameplay effects.

Shared fallback:
- `assets/stage-school.svg`

Reusable for:
- `school.generic.reachable.v2.classroom`;
- generic peer/classroom post-lesson content;
- course-neutral School-life wrap-up.

## Pool 2 — Quiet Night study

Reachability: **REACHABLE_NOW**

Suggested semantic media identity:
- `school.media.pool.night-study-quiet`

RU alt:
Тихая ночная учёба при лампе: записи, книга или схема на небольшом рабочем месте.

EN alt:
Quiet Night study by lamplight, with notes, a book, or a diagram on a small work surface.

RU caption/context:
Ночное занятие уже выбрано игровым действием; изображение только сопровождает учёбу и не добавляет второй эффект.

EN caption/context:
The Night-study action has already been chosen; the image only accompanies the study and adds no second effect.

Shared fallback:
- `assets/stage-school.svg`

Strong reuse:
- Literacy & Numbers;
- Arcana reason/creativity;
- Rhetoric & Social;
- Etiquette & Presentation;
- low-motion Field Craft planning;
- Arts sketching.

## Pool 3 — Practical demonstration / controlled movement

Reachability:
- Night presentation: **REACHABLE_NOW**
- exact paid-course teacher content: **STAGED**

Suggested semantic media identity:
- `school.media.pool.practical-demonstration`

RU alt:
Спокойная демонстрация практического движения или работы с инструментом без соревновательной интенсивности.

EN alt:
A calm demonstration of practical movement or tool use without competitive intensity.

RU caption/context:
Учебная демонстрация подчёркивает технику и наблюдение; игровые параметры уже определены соответствующим действием.

EN caption/context:
The demonstration emphasizes technique and observation; gameplay values are already determined by the corresponding action.

Shared fallback:
- `assets/stage-school.svg`

Strong reuse:
- Rowan Pike / Field Craft;
- Tovan Kest / Physical Training;
- Sera Vey / Body Confidence.

## Pool 4 — Arcana observation

Reachability:
- exact Night Arcana routes: **REACHABLE_NOW**
- paid Arcana teacher/course content: **STAGED**

Suggested semantic media identity:
- `school.media.pool.arcana-observation`

RU alt:
Илира или ученик наблюдает безопасный арканный знак, схему или стеклянный прибор при холодном свете.

EN alt:
Ilyra or a student observes a safe arcane sigil, diagram, or glass instrument under cool light.

RU caption/context:
Магический эффект используется как объект наблюдения, а не как отдельная игровая награда или результат.

EN caption/context:
The magical effect is an object of observation, not a separate gameplay reward or result.

Shared fallback:
- `assets/stage-school.svg`

Strong reuse:
- Arcana Magic;
- Arcana Reason;
- Arcana Creativity;
- future Ilyra lesson presentation after exact-course routing.

## Pool 5 — Arts / performance rehearsal

Reachability:
- exact Night Arts routes: **REACHABLE_NOW**
- paid Arts & Performance teacher/course content: **STAGED**

Suggested semantic media identity:
- `school.media.pool.performance-rehearsal`

RU alt:
Несса или ученик репетирует короткий сценический фрагмент в зале с простым реквизитом и ярким рабочим светом.

EN alt:
Nessa or a student rehearses a short performance phrase in a hall with simple props and bright working light.

RU caption/context:
Повторяется короткий сценический выбор, чтобы уточнить ритм, жест или намерение без дополнительных игровых эффектов.

EN caption/context:
A short performance choice is repeated to refine rhythm, gesture, or intention without additional gameplay effects.

Shared fallback:
- `assets/stage-school.svg`

Strong reuse:
- Arts Creativity;
- Arts Charm;
- Arts Sociability;
- Arts Dexterity;
- future Nessa paid-lesson presentation.

## Teacher-specific staged still/GIF identities

These remain **STAGED** until exact paid-course routing exists.

### Mara Fen
Shared candidate ID:
- `school.media.teacher.mara-fen.classroom`

RU alt:
Мара Фен у ведомости и грифельной доски, с испачканными чернилами рукавами и письменными принадлежностями.

EN alt:
Mara Fen beside a ledger and slate board, with ink-stained sleeves and writing tools.

RU caption:
Практическое объяснение записи, счёта или ясной формулировки.

EN caption:
A practical explanation of records, arithmetic, or clear wording.

Fallback:
- classroom wrap-up/static School fallback.

### Ilyra Venn
Shared candidate ID:
- `school.media.teacher.ilyra-venn.classroom`

RU alt:
Илира Венн среди меловых знаков и подписанных стеклянных приборов.

EN alt:
Ilyra Venn among chalk sigils and labeled glass instruments.

RU caption:
Наблюдение и проверка гипотезы перед выводом.

EN caption:
Observation and testing before a conclusion.

Fallback:
- Arcana observation/static School fallback.

### Cassian Reed
Shared candidate ID:
- `school.media.teacher.cassian-reed.classroom`

RU alt:
Кассиан Рид на открытой площадке для дебатов, жестикулирующий во время упражнения.

EN alt:
Cassian Reed on an open debate floor, gesturing during an exercise.

RU caption:
Речь меняется под аудиторию, но смысл остаётся тем же.

EN caption:
Delivery changes for the audience while the point remains the same.

Fallback:
- generic classroom wrap-up.

### Eliane Marrow
Shared candidate ID:
- `school.media.teacher.eliane-marrow.classroom`

RU alt:
Элиан Марроу в учебной комнате с зеркалами и формальной сервировкой.

EN alt:
Eliane Marrow in a practice room with mirrors and a formal setting.

RU caption:
Небольшая осознанная коррекция вместо полной переделки образа.

EN caption:
A small deliberate correction instead of redesigning the whole presentation.

Fallback:
- generic classroom wrap-up.

### Rowan Pike
Shared candidate ID:
- `school.media.teacher.rowan-pike.classroom`

RU alt:
Роуэн Пайк с картой, верёвкой и простыми полевыми инструментами во дворе для практики.

EN alt:
Rowan Pike with a map, rope, and simple field tools in an outdoor practice yard.

RU caption:
Практическая задача решается через наблюдение, маршрут и надёжную импровизацию.

EN caption:
A practical problem is approached through observation, route choice, and reliable improvisation.

Fallback:
- practical demonstration/static School fallback.

### Tovan Kest
Shared candidate ID:
- `school.media.teacher.tovan-kest.classroom`

RU alt:
Тован Кест показывает контролируемое движение в светлом тренировочном дворе.

EN alt:
Tovan Kest demonstrates controlled movement in a bright training yard.

RU caption:
Техника, темп и восстановление важнее показного усилия.

EN caption:
Technique, pacing, and recovery matter more than showy effort.

Fallback:
- practical demonstration/static School fallback.

### Nessa Lark
Shared candidate ID:
- `school.media.teacher.nessa-lark.classroom`

RU alt:
Несса Ларк в репетиционном зале среди масок, лент и инструментов.

EN alt:
Nessa Lark in a rehearsal hall among masks, ribbons, and instruments.

RU caption:
Сценический выбор сначала делается ясным, а затем уточняется.

EN caption:
A performance choice is made clear first, then refined.

Fallback:
- performance rehearsal/static School fallback.

### Sera Vey
Shared candidate ID:
- `school.media.teacher.sera-vey.classroom`

RU alt:
Сера Вей в спокойной студии движения и ухода за собой с мягким боковым светом.

EN alt:
Sera Vey in a calm movement and grooming studio with soft side light.

RU caption:
Осознанная самопрезентация строится вокруг выбора, комфорта и границ.

EN caption:
Deliberate self-presentation is built around choice, comfort, and boundaries.

Fallback:
- practical demonstration/static School fallback.

## Product-blocked media

Do not finalize RU/EN captions or dedicated GIFs for:
- management/accounting milestone/result;
- Arcana/Forest public result;
- certificate/project/exam scenes;
- education endings;
- Palace/Meta School-result scenes;
- teacher relationship ending scenes.

Their underlying authored meaning is still OPEN.

## Locale invariants

For every shared media identity:
- asset/GIF identity is locale-neutral;
- RU/EN alt/caption are presentation data only;
- asset reuse policy is identical across locales;
- static fallback is identical across locales unless accessibility tooling later requires locale-specific rendered text embedded in an image;
- no gameplay event is duplicated for localization.

If an image contains rendered language-dependent text, prefer a language-neutral art version or treat localized rendered text as a presentation resource under one semantic media identity, never as a separate gameplay event.
