# Foreman Relationship Content Depth Bank v1

Date: 2026-09-27  
Status: **AUTHORED CONTENT BANK / NOT A PRODUCT LOCK**  
Relationship identity: existing `lumber.foreman` only

This bank deepens the already-shipped professional Foreman tone without selecting a final NPC name, romance route, ending family, School public result, Hunter semantics, or Old Boundary semantics. Every entry is safe as presentation copy: it proposes no new condition, effect, reward, threshold, or transition.

Russian is the source text; English is a full second locale. Locale never changes gameplay identity.

## Authoring guardrails

- The speaker remains **the Lumber Foreman / бригадир**, never a newly named canonical NPC.
- Milestone dialogue is reactive and normally costs 0 daytime Energy.
- A voluntary evening continuation belongs to the Night slot.
- No entry implies a universal next-day Energy penalty.
- Professional-only and refusal responses are valid outcomes, not failure text.
- Seasonal entries are presentation flavor only; they do not change stats, wages, conditions, or route state.
- No text below resolves School management/accounting, Hunter, Forest truth, or Old Boundary Product decisions.

## Work recognition

### `foreman.work-recognition.steady-hands`

**RU — title:** Надёжные руки  
**RU — body:** Бригадир смотрит на готовую связку брёвен, потом на тебя. «Не быстро ради скорости. Ровно — и без чужой работы на переделку. Вот это я замечаю». В его тоне нет церемонии, только рабочее признание.  
**RU — choice:** Принять замечание спокойно.  
**RU — response:** «Буду держать тот же уровень».

**EN — title:** Steady hands  
**EN — body:** The Foreman looks over the finished bundle of logs, then at you. “Not fast for the sake of fast. Clean work, and nobody else has to redo it. That I notice.” There is no ceremony in his tone, only professional recognition.  
**EN — choice:** Take the comment in stride.  
**EN — response:** “I’ll keep the same standard.”

### `foreman.work-recognition.crew-aware`

**RU — title:** Видеть всю артель  
**RU — body:** «С пилой ты уже не споришь, это хорошо. Ещё лучше — начала замечать, кому рядом не хватает рук». Бригадир кивает в сторону площадки. «В артели ценят не только свой штабель».  
**RU — choice:** Ответить по делу.  
**RU — response:** «Если вижу, что могу помочь без задержки своей работы, помогу».

**EN — title:** Seeing the whole crew  
**EN — body:** “You’ve stopped arguing with the saw, which is good. Better yet, you’ve started noticing when someone nearby needs another pair of hands.” The Foreman nods toward the yard. “A crew values more than your own stack.”  
**EN — choice:** Answer practically.  
**EN — response:** “If I can help without leaving my own work behind, I will.”

## Professional trust

### `foreman.professional-trust.small-responsibility`

**RU — title:** Доверить участок  
**RU — body:** Бригадир оставляет тебе короткий список дел и не стоит над плечом. «Порядок знаешь. Если что-то пойдёт не так — скажешь раньше, чем это станет общей проблемой». Само отсутствие надзора звучит весомее похвалы.  
**RU — choice:** Взять ответственность.  
**RU — response:** «Разберусь и сообщу, если увижу риск».

**EN — title:** Entrusted with a section  
**EN — body:** The Foreman leaves you a short task list without hovering over your shoulder. “You know the order. If something starts going wrong, tell me before it becomes everybody’s problem.” The lack of supervision carries more weight than praise.  
**EN — choice:** Take responsibility.  
**EN — response:** “I’ll handle it and flag anything risky.”

### `foreman.professional-trust.ask-opinion`

**RU — title:** Спросить мнение  
**RU — body:** Перед тем как переставить людей на другой участок, бригадир неожиданно спрашивает: «Ты сегодня была ближе всех. Что там на самом деле мешает — люди, инструмент или сам порядок?» Он ждёт ответа как от работницы, чьё наблюдение имеет вес.  
**RU — choice:** Дать рабочую оценку.  
**RU — response:** «Сначала порядок. Если его поправить, станет видно, нужен ли другой инструмент».

**EN — title:** Asked for an opinion  
**EN — body:** Before moving workers to another section, the Foreman unexpectedly asks, “You were closest today. What is actually slowing it down—the people, the tools, or the way the work is arranged?” He waits for an answer as if your observation carries professional weight.  
**EN — choice:** Give a work assessment.  
**EN — response:** “The arrangement first. Fix that, and we’ll see whether the tool is really the problem.”

## After-work conversation

These lines fit an ordinary voluntary Night follow-up. They are effect-free presentation variants unless an existing authoritative Night transaction already owns the scene.

### `foreman.after-work.wrap-up`

**RU — title:** Когда площадка стихла  
**RU — body:** После смены в артели наконец становится достаточно тихо, чтобы слышать разговор, а не инструменты. Бригадир задерживается у закрытых ворот и коротко подводит итог дня. Постепенно обсуждение переходит от конкретной смены к тому, как вообще держится хорошая команда.  
**RU — choice:** Остаться ещё на несколько минут.  
**RU — response:** «Расскажи, что для тебя отличает хорошую артель от просто занятой».

**EN — title:** When the yard goes quiet  
**EN — body:** After the shift, the yard finally becomes quiet enough to hear conversation instead of tools. The Foreman lingers by the closed gate and briefly reviews the day. The discussion gradually moves from this particular shift to what makes a good crew hold together.  
**EN — choice:** Stay a few minutes longer.  
**EN — response:** “Tell me what separates a good crew from one that is merely busy.”

### `foreman.after-work.practical-story`

**RU — title:** История без героизма  
**RU — body:** На вопрос о худшей рабочей ошибке бригадир не рассказывает легенду о падающем дереве. Он вспоминает неправильно подписанную телегу, два часа лишней разгрузки и неделю насмешек. «Большие беды любят красивые истории. Маленькие ошибки просто крадут день».  
**RU — choice:** Поддержать разговор.  
**RU — response:** «Значит, аккуратность тоже часть мастерства».

**EN — title:** An unheroic story  
**EN — body:** Asked about his worst work mistake, the Foreman does not tell a legend about a falling tree. He remembers a mislabeled cart, two wasted hours of unloading, and a week of jokes. “Big disasters get good stories. Small mistakes just steal a day.”  
**EN — choice:** Continue the conversation.  
**EN — response:** “So accuracy is part of the craft too.”

## Refusal and professional-only responses

These responses explicitly preserve agency and the professional route.

### `foreman.boundary.decline-evening`

**RU — prompt:** «Если не спешишь, можем ещё немного посидеть и обсудить день».  
**RU — decline:** «Сегодня нет. Увидимся на работе».  
**RU — Foreman response:** Бригадир кивает без обиды. «Тогда до смены. Отдых — тоже часть техники безопасности».

**EN — prompt:** “If you’re not in a hurry, we can sit a little longer and talk through the day.”  
**EN — decline:** “Not tonight. I’ll see you at work.”  
**EN — Foreman response:** The Foreman nods without taking offense. “Then I’ll see you next shift. Rest is part of workplace safety too.”

### `foreman.boundary.professional-only`

**RU — prompt:** Разговор становится чуть более личным, чем обычно, но оставляет место для ясной границы.  
**RU — choice:** «Мне нравится наше рабочее доверие. Я хочу оставить всё именно так».  
**RU — Foreman response:** «Хорошая договорённость. Значит, так и работаем». Он возвращается к разговору об артели без уколов и намёков.

**EN — prompt:** The conversation becomes a little more personal than usual, while leaving room for a clear boundary.  
**EN — choice:** “I value the trust we have at work. I want to keep it exactly that way.”  
**EN — Foreman response:** “That’s a good agreement. Then that’s how we work.” He returns to crew business without barbs or hints.

### `foreman.boundary.not-now`

**RU — choice:** «Не хочу продолжать этот разговор сегодня».  
**RU — Foreman response:** «Принято. Если вопрос касается работы — вернёмся к нему на смене». Тема закрывается без штрафа в тоне сцены.

**EN — choice:** “I don’t want to continue this conversation tonight.”  
**EN — Foreman response:** “Understood. If it concerns the job, we can return to it next shift.” The subject closes without punitive framing.

## Seasonal presentation flavor

These are interchangeable presentation overlays around the same underlying professional beat. They must never become four gameplay events solely to localize or season the prose.

### Spring — `foreman.season.spring`

**RU:** Весенний воздух ещё прохладный, а площадка уже пахнет свежей древесиной и мокрой землёй. Бригадир стряхивает опилки с рукава: «Первый тёплый день всегда убеждает всех, что они бессмертны. Не поддавайся».  
**EN:** The spring air is still cool, but the yard already smells of fresh wood and wet earth. The Foreman brushes sawdust from his sleeve. “The first warm day convinces everyone they’re immortal. Don’t fall for it.”

### Summer — `foreman.season.summer`

**RU:** Даже после заката от сложенных брёвен идёт накопленное за день тепло. Бригадир ставит кружку в тень: «Летом хорошая работа начинается с умения не доказывать солнцу, кто упрямее».  
**EN:** Even after sunset, the stacked logs still give off the day’s heat. The Foreman moves his cup into the shade. “In summer, good work starts with knowing better than to prove who is more stubborn—you or the sun.”

### Autumn — `foreman.season.autumn`

**RU:** Ветер гоняет по пустеющей площадке листья, которые никто не нанимал в артель, но они всё равно лезут в каждый штабель. «Осень», — вздыхает бригадир. «Пора года, когда даже мусор работает сверхурочно».  
**EN:** Wind chases leaves across the clearing yard. Nobody hired them, yet they insist on joining every stack. “Autumn,” the Foreman sighs. “The season when even the rubbish works overtime.”

### Winter — `foreman.season.winter`

**RU:** Вечером пар от дыхания виден лучше, чем выражение лица. Бригадир проверяет закрытые ворота и говорит: «Зимой правило простое: если можно сделать спокойно — не делай героически».  
**EN:** In the evening, breath is easier to see than facial expressions. The Foreman checks the locked gate and says, “Winter has one simple rule: if it can be done calmly, don’t do it heroically.”

## Safe production use

The entries above can be selected as text variants only when an existing authoritative event/relationship state already makes the scene legal. They do not themselves establish a new milestone, stage, route, counter threshold, housing rule, School result, item requirement, Activity result, or ending.

For the current shipped `lumber.foreman` identity, the immediately safe content family is professional recognition, professional trust tone, voluntary after-work conversation, and respectful decline/professional-only response. Any deeper route mechanics remain Product/open-definition work.
