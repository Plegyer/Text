# Chat 5 — Complete Successor Ending Atlas v9

Status: **RESEARCH / PRODUCT REVIEW PACKET — current-main truth + locked design; no runtime authority added**
Owner: Chat 5
Atlas baseline: `main@9f9a3c5b27e972a35c07d09a8784e06597ba8a69`
Machine-readable companion: `mindy-successor/research/successor_ending_atlas_v1.csv`

## Что это за документ

Этот Atlas отвечает на пользовательский вопрос:

> **«Что даёт каждая концовка и как её получить?»**

Он намеренно разделяет три уровня правды:

1. **LOCKED Product authority** — D1–D35;
2. **current executable main** — `definitions.json`, engine ending flow и current presentation registry;
3. **draft/designed family** — задумана, но ID/gates/reward могут оставаться OPEN.

Старый `COMPLEX_ENDING_META_REWARD_CATALOG_v0.md` используется только как исторический proposal и не переопределяет D16/D18/D21–D35.

### Главное правило D16

**Eligibility не завершает жизнь автоматически.**

Когда ending становится доступной, игрок может продолжать run. Завершение происходит только после:
1. явного `commitEnding`;
2. завершения возможной финальной reaction-сцены;
3. `completeEnding`.

Это правило применяется ко всем современным ending families, включая Palace True Ending.

---

# 1. Count reconciliation

| Слой | Количество |
| --- | ---: |
| Current executable ending IDs в `definitions.json` | **22** |
| Current exact static ending presentation slots в `presentation.json` | **22** |
| Canonical/designed/required family slots в Atlas | **50** |
| Canonical families с current-main runtime ID | **21/50** |
| Canonical families без current-main runtime ID | **29** |
| Дополнительные stale legacy executable IDs | **1** |
| Всего строк в CSV/Atlas | **51** |

Разложение canonical 50 families:

- **40 ordinary-career families**:
  - 10 Hard Work;
  - 30 advanced/complex outcomes;
- **3 Secret Debt**;
- **4 Palace**;
- **2 current global/education families**;
- **1 обязательная standalone Large Activity family** с OPEN name/route.

Current-main canonical coverage:

- 10/10 ordinary Hard Work;
- 9/30 advanced ordinary outcomes;
- 0/3 Secret Debt;
- 0/4 Palace;
- 2/2 executable global/education;
- 0/1 standalone Activity.

Итого: **21/50 canonical family slots**.

Почему `definitions.json` всё равно содержит 22, а не 21:
- ещё существует отдельный stale legacy `lumber-stay`;
- Tavern legacy IDs `tavern-stay/guild/court` уже засчитаны как runtime carriers для designed Innkeeper/Sanctuary/Information Broker и не являются дополнительными modern families.

---

# 2. Ordinary careers — полный Atlas

## Dwarven Lumber / Лесорубы

### Лесорубы — Упорный труд

- **Runtime ID:** `ending.lumber.hard-work`
- **Домен / категория:** `lumber` / `ordinary-hard-work`
- **Authority:** LOCKED D16/D21/D22/D26
- **Как получить / eligibility:** Завершить не менее 50 смен профессии lumber; по D26 максимум одна смена этой же профессии в календарный день, поэтому раньше Day 50 это невозможно.
- **Locked numbers:** 50 shifts; max 1 same-career shift/day; +5 package breadth per D22
- **Eligibility vs commit:** Eligibility non-terminal по D16; затем явный commit/accept ending и completeEnding.
- **Что происходит в этой жизни:** стать своей в артели
- **Наследие / New Start+:** Профессия навсегда доступна с начала следующих жизней независимо от обычного unlock gate; также зарабатывается selectable Hard Work package: один selectable +5 progression-stat bonus. Exact target stat(s) OPEN; хотя бы один из десяти пакетов должен включать Lust >= +3, placement OPEN.
- **Класс reward:** Hard Work package
- **Implementation:** EXECUTABLE_MAIN
- **Presentation:** EXACT_STATIC_MAIN
- **Оставшиеся блокеры:** Product: exact profession→+5 target mapping OPEN. Current hard-work-package fixture contains provisional concrete targets but D35 explicitly leaves mapping OPEN.
- **Маршрут в одну строку:** Сделай 50 смен lumber, дождись появления судьбы и отдельно нажми «Принять судьбу».

### Лесорубы — Бригадир / Forewoman

- **Runtime ID:** `ending.lumber.forewoman`
- **Домен / категория:** `lumber` / `ordinary-complex`
- **Authority:** MIXED: executable + D33/D34
- **Как получить / eligibility:** По D34 сначала достичь trusted-worker (минимум 8 Lumber shifts). Подготовить canonical School readiness через Literacy & Numbers: 3 paid lessons ИЛИ 3 Night Study sessions; Lumber consumer должен дать management-school-ready. Также нужен профессиональный route lumber.foreman и факт forewoman-problem-resolved. External prep может быть готов раньше shift 8.
- **Locked numbers:** Lumber stages 1/8/20; complex eligibility not before 8; School readiness 3 lessons OR 3 night studies
- **Eligibility vs commit:** Eligibility non-terminal; явный commit после появления ending.
- **Что происходит в этой жизни:** Перейти от работницы к управлению артелью/делянкой.
- **Наследие / New Start+:** Текущий ending имеет metaRewards: []; draft обещает более сильный professional/economic/logistics reward, exact reward OPEN.
- **Класс reward:** undefined
- **Implementation:** EXECUTABLE_MAIN_BUT_STALE_GATE
- **Presentation:** EXACT_STATIC_MAIN
- **Оставшиеся блокеры:** Runtime conditions currently omit D34 trusted-worker >=8 gate; current Lumber machine on main also lacks the full D34 four-stage 1/8/20 topology.
- **Маршрут в одну строку:** Сделай минимум 8 Lumber shifts, подготовь управленческую грамотность, пройди профессиональную ветку бригадира и реши производственную проблему, затем явно выбери исход.

### Лесорубы — Лесной договор / Forest Compact

- **Runtime ID:** `ending.lumber.forest`
- **Домен / категория:** `lumber` / `ordinary-complex`
- **Authority:** MIXED: executable + D34
- **Как получить / eligibility:** По D34 не раньше trusted-worker (8 Lumber shifts); нужны forest-truth-known и forest-problem-resolved, получаемые через Forest/Activity/career return chain. Draft допускает School/Hunter/Tavern/item preparation, но exact additional gates OPEN.
- **Locked numbers:** complex eligibility not before 8 Lumber shifts
- **Eligibility vs commit:** Eligibility non-terminal; явный commit.
- **Что происходит в этой жизни:** Разрешить лесную системную проблему и выбрать способ сосуществования/эксплуатации/защиты.
- **Наследие / New Start+:** Текущий ending имеет metaRewards: []; draft предполагает world knowledge / Activity-route changes, exact permanent reward OPEN.
- **Класс reward:** undefined
- **Implementation:** EXECUTABLE_MAIN_BUT_STALE_GATE
- **Presentation:** EXACT_STATIC_MAIN
- **Оставшиеся блокеры:** Current ending condition lacks D34 trusted-worker >=8 gate; exact final world/reward effects OPEN.
- **Маршрут в одну строку:** Дойди минимум до 8 Lumber shifts, раскрой и реши лесную проблему через Activity/cross-system подготовку, затем отдельно прими судьбу.

## Satyr Maid

### Satyr Maid — Упорный труд

- **Runtime ID:** `ending.satyr-maid.hard-work`
- **Домен / категория:** `satyr-maid` / `ordinary-hard-work`
- **Authority:** LOCKED D16/D21/D22/D26
- **Как получить / eligibility:** Завершить не менее 50 смен профессии satyr-maid; по D26 максимум одна смена этой же профессии в календарный день, поэтому раньше Day 50 это невозможно.
- **Locked numbers:** 50 shifts; max 1 same-career shift/day; +5 package breadth per D22
- **Eligibility vs commit:** Eligibility non-terminal по D16; затем явный commit/accept ending и completeEnding.
- **Что происходит в этой жизни:** остаться признанной частью заведения
- **Наследие / New Start+:** Профессия навсегда доступна с начала следующих жизней независимо от обычного unlock gate; также зарабатывается selectable Hard Work package: один selectable +5 progression-stat bonus. Exact target stat(s) OPEN; хотя бы один из десяти пакетов должен включать Lust >= +3, placement OPEN.
- **Класс reward:** Hard Work package
- **Implementation:** EXECUTABLE_MAIN
- **Presentation:** EXACT_STATIC_MAIN
- **Оставшиеся блокеры:** Product: exact profession→+5 target mapping OPEN. Current hard-work-package fixture contains provisional concrete targets but D35 explicitly leaves mapping OPEN.
- **Маршрут в одну строку:** Сделай 50 смен satyr-maid, дождись появления судьбы и отдельно нажми «Принять судьбу».

### Satyr Maid — Власть в доме / House Power

- **Runtime ID:** `ending.satyr-maid.house-power`
- **Домен / категория:** `satyr-maid` / `ordinary-complex`
- **Authority:** EXECUTABLE; final Product threshold/reward classification partly OPEN
- **Как получить / eligibility:** Current executable: completed_shifts >=15; crisis-house-power; house-power-ready; и School management OR rhetoric readiness. Draft design: reputation + School + resolved staffing/supply/customer crisis + management/social gate.
- **Locked numbers:** Current runtime uses 15 shifts; Product lock for this exact threshold not found
- **Eligibility vs commit:** Eligibility non-terminal; явный commit.
- **Что происходит в этой жизни:** Стать управляющей/совладелицей и реально задавать рабочие правила заведения.
- **Наследие / New Start+:** Current executable unlock satyr-maid.house-credit; freshSave получает +600 starting money. Whether this exact legacy effect/class survives final 1.0 is not re-locked by D27/D28.
- **Класс reward:** undefined (legacy broad unlock; D27 class not separately locked)
- **Implementation:** EXECUTABLE_MAIN
- **Presentation:** EXACT_STATIC_MAIN
- **Оставшиеся блокеры:** Product: final exact threshold and modern Meta classification/disposition of +600 starting money.
- **Маршрут в одну строку:** В текущем прототипе: 15 смен, управленческая/риторическая School-подготовка и успешное решение house-power crisis; после eligibility отдельно прими исход.

### Satyr Maid — Партнёр / личная сеть (Favourite / Partner / Personal Network)

- **Runtime ID:** — нет current-main ID
- **Домен / категория:** `satyr-maid` / `ordinary-relationship-centered`
- **Authority:** DRAFT-DESIGNED
- **Как получить / eligibility:** Repeated context-specific meetings + добровольные choices + внешний request + соответствующий relationship state; может закончиться совместной жизнью, деловым партнёрством, новым заведением или переходом в другой social route. Exact gates/counts OPEN.
- **Locked numbers:** нет утверждённых точных чисел; OPEN
- **Eligibility vs commit:** По D16 должна быть отдельная eligibility и явный commit.
- **Что происходит в этой жизни:** Закрепить добровольное крупное личное/деловое партнёрство, не обязательное для обычной карьеры.
- **Наследие / New Start+:** OPEN.
- **Класс reward:** undefined
- **Implementation:** DESIGNED_NO_ENDING_ID
- **Presentation:** NONE_NO_RUNTIME_ID
- **Оставшиеся блокеры:** Product: exact route/gates/reward; Content: authored route; Runtime: no ending ID/conditions/presentation.
- **Маршрут в одну строку:** Развивай добровольную recurring-guest/major relationship ветку, выполни её внешний запрос и после появления отдельной судьбы явно выбери её.

### Satyr Maid — Мастерство границ / Boundary Mastery

- **Runtime ID:** `ending.satyr-maid.boundary-mastery`
- **Домен / категория:** `satyr-maid` / `ordinary-complex`
- **Authority:** EXECUTABLE; final Product threshold partly OPEN
- **Как получить / eligibility:** Current executable: completed_shifts >=15; school-boundaries-ready; crisis-boundaries; boundaries-ready; recurring guest night-response=declined. Draft: последовательные boundary choices + серьёзный conflict resolution + support + optional rhetoric/law support.
- **Locked numbers:** Current runtime uses 15 shifts; exact Product threshold not separately locked
- **Eligibility vs commit:** Eligibility non-terminal; явный commit.
- **Что происходит в этой жизни:** Стать известной профессиональными правилами и обслуживанием на собственных условиях.
- **Наследие / New Start+:** Unlock satyr-maid.clear-terms. Current consumer adds an alternate recurring-guest negotiation choice: можно отказаться от private obligation и предложить professional alternative без разрыва рабочей связи.
- **Класс reward:** automatic knowledge/content-like unlock (runtime automatic; final D27 label not separately locked)
- **Implementation:** EXECUTABLE_MAIN
- **Presentation:** EXACT_STATIC_MAIN
- **Оставшиеся блокеры:** Product: final exact threshold/classification; otherwise route is executable.
- **Маршрут в одну строку:** В текущем прототипе: 15 смен, School boundary readiness, отказ от private meeting и решение boundary crisis; затем явно прими судьбу.

## Undead Farm / Ферма нежити

### Ферма нежити — Упорный труд

- **Runtime ID:** `ending.undead-farm.hard-work`
- **Домен / категория:** `undead-farm` / `ordinary-hard-work`
- **Authority:** LOCKED D16/D21/D22/D26
- **Как получить / eligibility:** Завершить не менее 50 смен профессии undead-farm; по D26 максимум одна смена этой же профессии в календарный день, поэтому раньше Day 50 это невозможно.
- **Locked numbers:** 50 shifts; max 1 same-career shift/day; +5 package breadth per D22
- **Eligibility vs commit:** Eligibility non-terminal по D16; затем явный commit/accept ending и completeEnding.
- **Что происходит в этой жизни:** остаться надёжной частью хозяйства
- **Наследие / New Start+:** Профессия навсегда доступна с начала следующих жизней независимо от обычного unlock gate; также зарабатывается selectable Hard Work package: один selectable +5 progression-stat bonus. Exact target stat(s) OPEN; хотя бы один из десяти пакетов должен включать Lust >= +3, placement OPEN.
- **Класс reward:** Hard Work package
- **Implementation:** EXECUTABLE_MAIN
- **Presentation:** EXACT_STATIC_MAIN
- **Оставшиеся блокеры:** Product: exact profession→+5 target mapping OPEN. Current hard-work-package fixture contains provisional concrete targets but D35 explicitly leaves mapping OPEN.
- **Маршрут в одну строку:** Сделай 50 смен undead-farm, дождись появления судьбы и отдельно нажми «Принять судьбу».

### Ферма нежити — Исследовательница / Research Farmer

- **Runtime ID:** `ending.undead-farm.research-farmer`
- **Домен / категория:** `undead-farm` / `ordinary-complex`
- **Authority:** EXECUTABLE; draft numbers partly OPEN
- **Как получить / eligibility:** Current executable: completed_shifts >=15; school-research-ready; sample-preserved; crisis-research; research-ready. Draft additionally frames Arcana/Reason, specimen preservation and experiment chain.
- **Locked numbers:** Current runtime uses 15 shifts; exact Product threshold not separately locked
- **Eligibility vs commit:** Eligibility non-terminal; явный commit.
- **Что происходит в этой жизни:** Превратить странное хозяйство в дисциплинированную область исследования.
- **Наследие / New Start+:** Current metaRewards: []; draft suggests research/knowledge unlock or early magical source, exact reward OPEN.
- **Класс reward:** undefined
- **Implementation:** EXECUTABLE_MAIN
- **Presentation:** EXACT_STATIC_MAIN
- **Оставшиеся блокеры:** Product: final threshold/reward.
- **Маршрут в одну строку:** Сохрани образец, подготовь School research readiness, реши исследовательский кризис и набери текущий runtime-порог смен; потом отдельно выбери исход.

### Ферма нежити — Преемница / Farm Successor

- **Runtime ID:** `ending.undead-farm.successor`
- **Домен / категория:** `undead-farm` / `ordinary-complex`
- **Authority:** EXECUTABLE; draft numbers partly OPEN
- **Как получить / eligibility:** Current executable: completed_shifts >=15; school-management-ready; successor-ready; crisis-successor; relationship undead-farm.keeper stage partner-ready. Draft: production record + accounting/management + crisis + professional trust.
- **Locked numbers:** Current runtime uses 15 shifts; exact Product threshold not separately locked
- **Eligibility vs commit:** Eligibility non-terminal; явный commit.
- **Что происходит в этой жизни:** Принять управление/долю хозяйства через производственный опыт и профессиональное доверие.
- **Наследие / New Start+:** Current metaRewards: []; draft economic/logistics contact/resource reward OPEN.
- **Класс reward:** undefined
- **Implementation:** EXECUTABLE_MAIN
- **Presentation:** EXACT_STATIC_MAIN
- **Оставшиеся блокеры:** Product: final threshold/reward.
- **Маршрут в одну строку:** Собери управленческую School-подготовку, professional trust с keeper, реши successor crisis и достигни текущего runtime-порога смен; затем явно прими исход.

### Ферма нежити — Внешняя аномалия

- **Runtime ID:** — нет current-main ID
- **Домен / категория:** `undead-farm` / `ordinary-complex`
- **Authority:** DRAFT-DESIGNED
- **Как получить / eligibility:** Anomaly during shift -> specimen -> School identifies partial cause -> Large Activity locates source -> player chooses treatment/use/containment. Exact shifts/items/stats OPEN.
- **Locked numbers:** нет утверждённых точных чисел; OPEN
- **Eligibility vs commit:** По D16 отдельная eligibility и явный commit.
- **Что происходит в этой жизни:** Разрешить внешний источник аномалии и изменить production/world fact/Activity route.
- **Наследие / New Start+:** OPEN.
- **Класс reward:** undefined
- **Implementation:** DESIGNED_NO_ENDING_ID
- **Presentation:** NONE_NO_RUNTIME_ID
- **Оставшиеся блокеры:** Product: exact gates/reward; Content/runtime: complete authored chain and ending identity.
- **Маршрут в одну строку:** Найди аномалию на ферме, исследуй образец в School, отыщи источник через Activity и выбери способ обращения с ним.

## Tavern / Таверна

### Таверна — Упорный труд

- **Runtime ID:** `ending.tavern.hard-work`
- **Домен / категория:** `tavern` / `ordinary-hard-work`
- **Authority:** LOCKED D16/D21/D22/D26
- **Как получить / eligibility:** Завершить не менее 50 смен профессии tavern; по D26 максимум одна смена этой же профессии в календарный день, поэтому раньше Day 50 это невозможно.
- **Locked numbers:** 50 shifts; max 1 same-career shift/day; +5 package breadth per D22
- **Eligibility vs commit:** Eligibility non-terminal по D16; затем явный commit/accept ending и completeEnding.
- **Что происходит в этой жизни:** выбрать стабильную жизнь в таверне
- **Наследие / New Start+:** Профессия навсегда доступна с начала следующих жизней независимо от обычного unlock gate; также зарабатывается selectable Hard Work package: один selectable +5 progression-stat bonus. Exact target stat(s) OPEN; хотя бы один из десяти пакетов должен включать Lust >= +3, placement OPEN.
- **Класс reward:** Hard Work package
- **Implementation:** EXECUTABLE_MAIN
- **Presentation:** EXACT_STATIC_MAIN
- **Оставшиеся блокеры:** Product: exact profession→+5 target mapping OPEN. Current hard-work-package fixture contains provisional concrete targets but D35 explicitly leaves mapping OPEN.
- **Маршрут в одну строку:** Сделай 50 смен tavern, дождись появления судьбы и отдельно нажми «Принять судьбу».

### Таверна — Хозяйка / Innkeeper

- **Runtime ID:** `tavern-stay`; maps by current facts to innkeeper-ready
- **Домен / категория:** `tavern` / `ordinary-complex`
- **Authority:** LEGACY EXECUTABLE mapped to current designed family
- **Как получить / eligibility:** Current executable ANY: legacy visits(tavern)>=18; OR completed_shifts>=18 + school-records-ready + guest-ledger-evidence-ready + crisis-resolved; OR innkeeper-ready. Draft intended route: reputation + accounting/literacy + supply/debt crisis + management/social gate; final exact threshold OPEN.
- **Locked numbers:** Current runtime 18; not established as final Product lock
- **Eligibility vs commit:** Eligibility non-terminal; явный commit.
- **Что происходит в этой жизни:** Получить контроль/долю в таверне.
- **Наследие / New Start+:** Current completion stores legacy unlock host. No consumer for host was found in audited core/Tavern packs. Old description claims Charm +5; that is not current Product authority.
- **Класс reward:** undefined legacy unlock
- **Implementation:** EXECUTABLE_MAIN_LEGACY_ID
- **Presentation:** EXACT_STATIC_MAIN
- **Оставшиеся блокеры:** Product/runtime cleanup: canonicalize route/ID/reward; remove stale old +5 claim.
- **Маршрут в одну строку:** В текущем прототипе доведи Tavern до innkeeper-ready (или выполни legacy 18-shift/fact route), затем отдельно выбери судьбу.

### Таверна — Информационный брокер

- **Runtime ID:** `tavern-court`; maps by current facts to information-broker-ready
- **Домен / категория:** `tavern` / `ordinary-complex`
- **Authority:** LEGACY EXECUTABLE mapped to current designed family; D23 limits Palace meaning
- **Как получить / eligibility:** Current executable ANY: legacy flag tavern.prince; OR school-broker-ready + rumour-route-open + rumour-confirmed + confidentiality-resolved + crisis-resolved; OR information-broker-ready. Draft: recurring traveler facts + at least two external networks + confidentiality + optional literacy/rhetoric.
- **Locked numbers:** нет утверждённых точных чисел; OPEN
- **Eligibility vs commit:** Eligibility non-terminal; явный commit.
- **Что происходит в этой жизни:** Сделать таверну узлом информации и связей.
- **Наследие / New Start+:** Current completion stores legacy unlock court; no current consumer verified. It cannot unlock/substitute Palace under D23.
- **Класс reward:** undefined legacy unlock
- **Implementation:** EXECUTABLE_MAIN_LEGACY_ID
- **Presentation:** EXACT_STATIC_MAIN
- **Оставшиеся блокеры:** Stale title/reward semantics; D23 forbids old Palace shortcut; final permanent reward OPEN.
- **Маршрут в одну строку:** Открой rumour/information-broker chain, сохрани/разреши confidentiality и crisis, затем явно прими информационный исход; это не открывает Palace.

### Таверна — Убежище / Sanctuary

- **Runtime ID:** `tavern-guild`; maps by current facts to sanctuary-ready
- **Домен / категория:** `tavern` / `ordinary-complex`
- **Authority:** LEGACY EXECUTABLE mapped to current designed family
- **Как получить / eligibility:** Current executable ANY: legacy flag tavern.guild; OR housing-assistance-complete + confidentiality-kept + crisis-resolved; OR sanctuary-ready. Draft: housing/economy sacrifice + relationship support + possible Guard/Merchant hooks.
- **Locked numbers:** нет утверждённых точных чисел; OPEN
- **Eligibility vs commit:** Eligibility non-terminal; явный commit.
- **Что происходит в этой жизни:** Сделать таверну безопасным домом/убежищем для выбранного сообщества.
- **Наследие / New Start+:** Current completion stores legacy unlock mediator; no current gameplay consumer verified. Final Sanctuary reward OPEN.
- **Класс reward:** undefined legacy unlock
- **Implementation:** EXECUTABLE_MAIN_LEGACY_ID
- **Presentation:** EXACT_STATIC_MAIN
- **Оставшиеся блокеры:** Canonical reward/ID and final route tuning OPEN.
- **Маршрут в одну строку:** Заверши housing-assistance и crisis/confidentiality ветки до sanctuary-ready, затем отдельно прими судьбу.

## Hunter / Охотница

### Охотница — Упорный труд

- **Runtime ID:** `ending.hunter.hard-work`
- **Домен / категория:** `hunter` / `ordinary-hard-work`
- **Authority:** LOCKED D16/D21/D22/D26
- **Как получить / eligibility:** Завершить не менее 50 смен профессии hunter; по D26 максимум одна смена этой же профессии в календарный день, поэтому раньше Day 50 это невозможно.
- **Locked numbers:** 50 shifts; max 1 same-career shift/day; +5 package breadth per D22
- **Eligibility vs commit:** Eligibility non-terminal по D16; затем явный commit/accept ending и completeEnding.
- **Что происходит в этой жизни:** стать признанной охотницей
- **Наследие / New Start+:** Профессия навсегда доступна с начала следующих жизней независимо от обычного unlock gate; также зарабатывается selectable Hard Work package: один selectable +5 progression-stat bonus. Exact target stat(s) OPEN; хотя бы один из десяти пакетов должен включать Lust >= +3, placement OPEN.
- **Класс reward:** Hard Work package
- **Implementation:** EXECUTABLE_MAIN
- **Presentation:** EXACT_STATIC_MAIN
- **Оставшиеся блокеры:** Product: exact profession→+5 target mapping OPEN. Current hard-work-package fixture contains provisional concrete targets but D35 explicitly leaves mapping OPEN.
- **Маршрут в одну строку:** Сделай 50 смен hunter, дождись появления судьбы и отдельно нажми «Принять судьбу».

### Охотница — Мастер-охотница

- **Runtime ID:** — нет current-main ID
- **Домен / категория:** `hunter` / `ordinary-complex`
- **Authority:** DRAFT-DESIGNED
- **Как получить / eligibility:** rare contract chain + preparedness + item capabilities + разные seasonal targets + successful returns. Exact numeric gates/thresholds OPEN unless separately locked later.
- **Locked numbers:** нет утверждённых точных чисел; OPEN
- **Eligibility vs commit:** По D16 eligibility non-terminal; требуется явный commit.
- **Что происходит в этой жизни:** Стать мастером сложных контрактов и подготовленных охот.
- **Наследие / New Start+:** Draft reward: strong Activity prep / rare route access / starting tool; exact reward OPEN.
- **Класс reward:** undefined
- **Implementation:** DESIGNED_NO_ENDING_ID
- **Presentation:** NONE_NO_RUNTIME_ID
- **Оставшиеся блокеры:** Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity.
- **Маршрут в одну строку:** Подготовь редкие контракты, нужные инструменты и методы, успешно возвращайся из разных сезонных задач и отдельно прими исход.

### Охотница — Хранительница / Warden

- **Runtime ID:** — нет current-main ID
- **Домен / категория:** `hunter` / `ordinary-complex`
- **Authority:** DRAFT-DESIGNED
- **Как получить / eligibility:** knowledge of cycles + relationship/contact + conflict with employer/merchant/other hunter + possible School/Arcana/Farm hook. Exact numeric gates/thresholds OPEN unless separately locked later.
- **Locked numbers:** нет утверждённых точных чисел; OPEN
- **Eligibility vs commit:** По D16 eligibility non-terminal; требуется явный commit.
- **Что происходит в этой жизни:** Стать хранительницей территории и изменить будущие сезонные маршруты.
- **Наследие / New Start+:** Draft reward: protection/world access / MetaKnowledge; exact reward OPEN.
- **Класс reward:** undefined
- **Implementation:** DESIGNED_NO_ENDING_ID
- **Presentation:** NONE_NO_RUNTIME_ID
- **Оставшиеся блокеры:** Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity.
- **Маршрут в одну строку:** Изучи циклы территории, разреши конфликт вокруг её использования и собери внешние знания/союзников.

### Охотница — Легенда

- **Runtime ID:** — нет current-main ID
- **Домен / категория:** `hunter` / `ordinary-complex`
- **Authority:** DRAFT-DESIGNED
- **Как получить / eligibility:** rare target/anomaly + multi-system prep + Activity + unique capabilities + clues from Tavern/Farm/School. Exact numeric gates/thresholds OPEN unless separately locked later.
- **Locked numbers:** нет утверждённых точных чисел; OPEN
- **Eligibility vs commit:** По D16 eligibility non-terminal; требуется явный commit.
- **Что происходит в этой жизни:** Разрешить редкую легендарную цель/аномалию.
- **Наследие / New Start+:** OPEN.
- **Класс reward:** undefined
- **Implementation:** DESIGNED_NO_ENDING_ID
- **Presentation:** NONE_NO_RUNTIME_ID
- **Оставшиеся блокеры:** Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity.
- **Маршрут в одну строку:** Собери сеть улик и редкие capability, пройди сложную Activity/encounter цепь и отдельно выбери легендарный исход.

## Guard / Стража

### Стража — Упорный труд

- **Runtime ID:** `ending.guard.hard-work`
- **Домен / категория:** `guard` / `ordinary-hard-work`
- **Authority:** LOCKED D16/D21/D22/D26
- **Как получить / eligibility:** Завершить не менее 50 смен профессии guard; по D26 максимум одна смена этой же профессии в календарный день, поэтому раньше Day 50 это невозможно.
- **Locked numbers:** 50 shifts; max 1 same-career shift/day; +5 package breadth per D22
- **Eligibility vs commit:** Eligibility non-terminal по D16; затем явный commit/accept ending и completeEnding.
- **Что происходит в этой жизни:** остаться ветераном стражи
- **Наследие / New Start+:** Профессия навсегда доступна с начала следующих жизней независимо от обычного unlock gate; также зарабатывается selectable Hard Work package: один или два selectable +5 progression-stat bonus. Exact target stat(s) OPEN; хотя бы один из десяти пакетов должен включать Lust >= +3, placement OPEN.
- **Класс reward:** Hard Work package
- **Implementation:** EXECUTABLE_MAIN
- **Presentation:** EXACT_STATIC_MAIN
- **Оставшиеся блокеры:** Product: exact profession→+5 target mapping OPEN. Current hard-work-package fixture contains provisional concrete targets but D35 explicitly leaves mapping OPEN.
- **Маршрут в одну строку:** Сделай 50 смен guard, дождись появления судьбы и отдельно нажми «Принять судьбу».

### Стража — Офицер

- **Runtime ID:** — нет current-main ID
- **Домен / категория:** `guard` / `ordinary-complex`
- **Authority:** DRAFT-DESIGNED
- **Как получить / eligibility:** strong career record + School literacy/etiquette/rhetoric + staff/crisis issue + leadership gate. Exact numeric gates/thresholds OPEN unless separately locked later.
- **Locked numbers:** нет утверждённых точных чисел; OPEN
- **Eligibility vs commit:** По D16 eligibility non-terminal; требуется явный commit.
- **Что происходит в этой жизни:** Получить ранг и командование.
- **Наследие / New Start+:** Draft reward: institutional/restricted-area access; exact reward OPEN.
- **Класс reward:** undefined
- **Implementation:** DESIGNED_NO_ENDING_ID
- **Presentation:** NONE_NO_RUNTIME_ID
- **Оставшиеся блокеры:** Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity.
- **Маршрут в одну строку:** Наработай сильный служебный record, подготовь School-навыки и реши управленческий кризис.

### Стража — Реформа

- **Runtime ID:** — нет current-main ID
- **Домен / категория:** `guard` / `ordinary-complex`
- **Authority:** DRAFT-DESIGNED
- **Как получить / eligibility:** specific choices on street treatment/corruption/use of force/transparency + support/allies; no Morality meter. Exact numeric gates/thresholds OPEN unless separately locked later.
- **Locked numbers:** нет утверждённых точных чисел; OPEN
- **Eligibility vs commit:** По D16 eligibility non-terminal; требуется явный commit.
- **Что происходит в этой жизни:** Изменить практики/правила стражи.
- **Наследие / New Start+:** Draft reward: city variants / public trust/contact; exact reward OPEN.
- **Класс reward:** undefined
- **Implementation:** DESIGNED_NO_ENDING_ID
- **Presentation:** NONE_NO_RUNTIME_ID
- **Оставшиеся блокеры:** Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity.
- **Маршрут в одну строку:** Последовательно проводи выбранную линию в уличных/коррупционных конфликтах и собери поддержку.

### Стража — Сеть / коррупционная сеть

- **Runtime ID:** — нет current-main ID
- **Домен / категория:** `guard` / `ordinary-complex`
- **Authority:** DRAFT-DESIGNED
- **Как получить / eligibility:** Merchant/Tavern/Assassin contacts + access/service choices + risk. Exact numeric gates/thresholds OPEN unless separately locked later.
- **Locked numbers:** нет утверждённых точных чисел; OPEN
- **Eligibility vs commit:** По D16 eligibility non-terminal; требуется явный commit.
- **Что происходит в этой жизни:** Построить теневое влияние внутри института.
- **Наследие / New Start+:** Draft reward: alternate access/contact; exact reward OPEN.
- **Класс reward:** undefined
- **Implementation:** DESIGNED_NO_ENDING_ID
- **Presentation:** NONE_NO_RUNTIME_ID
- **Оставшиеся блокеры:** Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity.
- **Маршрут в одну строку:** Свяжи служебный доступ с Merchant/Tavern/Assassin контактами и пройди рискованную сетевую ветку.

### Стража — Большое дело / Major Case

- **Runtime ID:** — нет current-main ID
- **Домен / категория:** `guard` / `ordinary-complex`
- **Authority:** DRAFT-DESIGNED
- **Как получить / eligibility:** multi-system chain; possible Tavern ledger + Merchant cargo + Sealed Pass + Assassin clue + Activity location + Palace connection. Exact numeric gates/thresholds OPEN unless separately locked later.
- **Locked numbers:** нет утверждённых точных чисел; OPEN
- **Eligibility vs commit:** По D16 eligibility non-terminal; требуется явный commit.
- **Что происходит в этой жизни:** Закрыть крупное много-системное дело.
- **Наследие / New Start+:** OPEN.
- **Класс reward:** undefined
- **Implementation:** DESIGNED_NO_ENDING_ID
- **Presentation:** NONE_NO_RUNTIME_ID
- **Оставшиеся блокеры:** Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity.
- **Маршрут в одну строку:** Собери улики из нескольких систем, доведи большое расследование до разрешения и затем отдельно прими исход.

## Merchant / Торговка

### Торговка — Упорный труд

- **Runtime ID:** `ending.merchant.hard-work`
- **Домен / категория:** `merchant` / `ordinary-hard-work`
- **Authority:** LOCKED D16/D21/D22/D26
- **Как получить / eligibility:** Завершить не менее 50 смен профессии merchant; по D26 максимум одна смена этой же профессии в календарный день, поэтому раньше Day 50 это невозможно.
- **Locked numbers:** 50 shifts; max 1 same-career shift/day; +5 package breadth per D22
- **Eligibility vs commit:** Eligibility non-terminal по D16; затем явный commit/accept ending и completeEnding.
- **Что происходит в этой жизни:** выбрать стабильную торговую жизнь
- **Наследие / New Start+:** Профессия навсегда доступна с начала следующих жизней независимо от обычного unlock gate; также зарабатывается selectable Hard Work package: один или два selectable +5 progression-stat bonus. Exact target stat(s) OPEN; хотя бы один из десяти пакетов должен включать Lust >= +3, placement OPEN.
- **Класс reward:** Hard Work package
- **Implementation:** EXECUTABLE_MAIN
- **Presentation:** EXACT_STATIC_MAIN
- **Оставшиеся блокеры:** Product: exact profession→+5 target mapping OPEN. Current hard-work-package fixture contains provisional concrete targets but D35 explicitly leaves mapping OPEN.
- **Маршрут в одну строку:** Сделай 50 смен merchant, дождись появления судьбы и отдельно нажми «Принять судьбу».

### Торговка — Торговый дом / Merchant House

- **Runtime ID:** — нет current-main ID
- **Домен / категория:** `merchant` / `ordinary-complex`
- **Authority:** DRAFT-DESIGNED
- **Как получить / eligibility:** capital/reputation + School accounting + several suppliers + logistics crisis. Exact numeric gates/thresholds OPEN unless separately locked later.
- **Locked numbers:** нет утверждённых точных чисел; OPEN
- **Eligibility vs commit:** По D16 eligibility non-terminal; требуется явный commit.
- **Что происходит в этой жизни:** Создать крупную торговую сеть/дом.
- **Наследие / New Start+:** Draft reward: economy/logistics rule option; exact reward OPEN.
- **Класс reward:** undefined
- **Implementation:** DESIGNED_NO_ENDING_ID
- **Presentation:** NONE_NO_RUNTIME_ID
- **Оставшиеся блокеры:** Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity.
- **Маршрут в одну строку:** Накопи капитал и репутацию, свяжи поставщиков, подготовь accounting и реши логистический кризис.

### Торговка — Спекулянтка / контрабандистка

- **Runtime ID:** — нет current-main ID
- **Домен / категория:** `merchant` / `ordinary-complex`
- **Authority:** DRAFT-DESIGNED
- **Как получить / eligibility:** seasonal shortages + covert contact + Guard/Assassin interaction + accepted risk. Exact numeric gates/thresholds OPEN unless separately locked later.
- **Locked numbers:** нет утверждённых точных чисел; OPEN
- **Eligibility vs commit:** По D16 eligibility non-terminal; требуется явный commit.
- **Что происходит в этой жизни:** Построить рискованную скрытую торговую сеть.
- **Наследие / New Start+:** OPEN; draft mentions profit/network/legal consequences, not permanent Meta exactness.
- **Класс reward:** undefined
- **Implementation:** DESIGNED_NO_ENDING_ID
- **Presentation:** NONE_NO_RUNTIME_ID
- **Оставшиеся блокеры:** Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity.
- **Маршрут в одну строку:** Используй сезонный дефицит и covert contacts, пройди Guard/Assassin риск и отдельно выбери route.

### Торговка — Покровительница путей / Patron of Routes

- **Runtime ID:** — нет current-main ID
- **Домен / категория:** `merchant` / `ordinary-complex`
- **Authority:** DRAFT-DESIGNED
- **Как получить / eligibility:** inputs from Lumber + Farm + Hunter + Activity + Tavern. Exact numeric gates/thresholds OPEN unless separately locked later.
- **Locked numbers:** нет утверждённых точных чисел; OPEN
- **Eligibility vs commit:** По D16 eligibility non-terminal; требуется явный commit.
- **Что происходит в этой жизни:** Связать регионы новой supply network и расширить world accessibility.
- **Наследие / New Start+:** OPEN.
- **Класс reward:** undefined
- **Implementation:** DESIGNED_NO_ENDING_ID
- **Presentation:** NONE_NO_RUNTIME_ID
- **Оставшиеся блокеры:** Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity.
- **Маршрут в одну строку:** Собери поставки и знания из Lumber/Farm/Hunter/Activity/Tavern и сформируй новую сеть маршрутов.

## Artist/Geisha / Дом искусств

### Дом искусств — Упорный труд

- **Runtime ID:** `ending.artist-geisha.hard-work`
- **Домен / категория:** `artist-geisha` / `ordinary-hard-work`
- **Authority:** LOCKED D16/D21/D22/D26
- **Как получить / eligibility:** Завершить не менее 50 смен профессии artist-geisha; по D26 максимум одна смена этой же профессии в календарный день, поэтому раньше Day 50 это невозможно.
- **Locked numbers:** 50 shifts; max 1 same-career shift/day; +5 package breadth per D22
- **Eligibility vs commit:** Eligibility non-terminal по D16; затем явный commit/accept ending и completeEnding.
- **Что происходит в этой жизни:** остаться признанной профессионалкой дома
- **Наследие / New Start+:** Профессия навсегда доступна с начала следующих жизней независимо от обычного unlock gate; также зарабатывается selectable Hard Work package: один или два selectable +5 progression-stat bonus. Exact target stat(s) OPEN; хотя бы один из десяти пакетов должен включать Lust >= +3, placement OPEN.
- **Класс reward:** Hard Work package
- **Implementation:** EXECUTABLE_MAIN
- **Presentation:** EXACT_STATIC_MAIN
- **Оставшиеся блокеры:** Product: exact profession→+5 target mapping OPEN. Current hard-work-package fixture contains provisional concrete targets but D35 explicitly leaves mapping OPEN.
- **Маршрут в одну строку:** Сделай 50 смен artist-geisha, дождись появления судьбы и отдельно нажми «Принять судьбу».

### Дом искусств — Мастер искусства / Master Artist

- **Runtime ID:** — нет current-main ID
- **Домен / категория:** `artist-geisha` / `ordinary-complex`
- **Authority:** DRAFT-DESIGNED
- **Как получить / eligibility:** performance milestones + School + contest/festival success + item/costume/instrument capability. Exact numeric gates/thresholds OPEN unless separately locked later.
- **Locked numbers:** нет утверждённых точных чисел; OPEN
- **Eligibility vs commit:** По D16 eligibility non-terminal; требуется явный commit.
- **Что происходит в этой жизни:** Создать собственную школу/репертуар/мастерскую.
- **Наследие / New Start+:** Draft reward: education/performance meta option; exact reward OPEN.
- **Класс reward:** undefined
- **Implementation:** DESIGNED_NO_ENDING_ID
- **Presentation:** NONE_NO_RUNTIME_ID
- **Оставшиеся блокеры:** Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity.
- **Маршрут в одну строку:** Развивай выступления, School и фестивальные результаты, подготовь нужный costume/instrument и прими мастерский исход.

### Дом искусств — Сеть покровителей / Patron Network

- **Runtime ID:** — нет current-main ID
- **Домен / категория:** `artist-geisha` / `ordinary-complex`
- **Authority:** DRAFT-DESIGNED
- **Как получить / eligibility:** several relationship types + social choices + confidentiality + possible Merchant/Palace hooks. Exact numeric gates/thresholds OPEN unless separately locked later.
- **Locked numbers:** нет утверждённых точных чисел; OPEN
- **Eligibility vs commit:** По D16 eligibility non-terminal; требуется явный commit.
- **Что происходит в этой жизни:** Создать устойчивое культурное влияние через сеть контактов.
- **Наследие / New Start+:** Draft reward: high-status contacts / alternate introductions; exact reward OPEN.
- **Класс reward:** undefined
- **Implementation:** DESIGNED_NO_ENDING_ID
- **Presentation:** NONE_NO_RUNTIME_ID
- **Оставшиеся блокеры:** Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity.
- **Маршрут в одну строку:** Построй несколько независимых профессиональных связей, сохрани доверие/конфиденциальность и выбери сетевой исход.

### Дом искусств — Придворное приглашение

- **Runtime ID:** — нет current-main ID
- **Домен / категория:** `artist-geisha` / `ordinary-complex`
- **Authority:** DRAFT-DESIGNED
- **Как получить / eligibility:** career/festival/court-contact route; exact gates OPEN. Exact numeric gates/thresholds OPEN unless separately locked later.
- **Locked numbers:** нет утверждённых точных чисел; OPEN
- **Eligibility vs commit:** По D16 eligibility non-terminal; требуется явный commit.
- **Что происходит в этой жизни:** Получить придворный контакт/особый будущий entry option.
- **Наследие / New Start+:** Draft: Meta contact useful only after real Palace unlock; exact reward OPEN.
- **Класс reward:** undefined
- **Implementation:** DESIGNED_NO_ENDING_ID
- **Presentation:** NONE_NO_RUNTIME_ID
- **Оставшиеся блокеры:** Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity.
- **Маршрут в одну строку:** Добейся court-contact через артистическую карьеру; награда может помочь после Palace unlock, но не заменяет D23.

## Assassin / Ассасин

### Ассасин — Упорный труд

- **Runtime ID:** `ending.assassin.hard-work`
- **Домен / категория:** `assassin` / `ordinary-hard-work`
- **Authority:** LOCKED D16/D21/D22/D26
- **Как получить / eligibility:** Завершить не менее 50 смен профессии assassin; по D26 максимум одна смена этой же профессии в календарный день, поэтому раньше Day 50 это невозможно.
- **Locked numbers:** 50 shifts; max 1 same-career shift/day; +5 package breadth per D22
- **Eligibility vs commit:** Eligibility non-terminal по D16; затем явный commit/accept ending и completeEnding.
- **Что происходит в этой жизни:** стать профессионалом контрактов
- **Наследие / New Start+:** Профессия навсегда доступна с начала следующих жизней независимо от обычного unlock gate; также зарабатывается selectable Hard Work package: один или два selectable +5 progression-stat bonus. Exact target stat(s) OPEN; хотя бы один из десяти пакетов должен включать Lust >= +3, placement OPEN.
- **Класс reward:** Hard Work package
- **Implementation:** EXECUTABLE_MAIN
- **Presentation:** EXACT_STATIC_MAIN
- **Оставшиеся блокеры:** Product: exact profession→+5 target mapping OPEN. Current hard-work-package fixture contains provisional concrete targets but D35 explicitly leaves mapping OPEN.
- **Маршрут в одну строку:** Сделай 50 смен assassin, дождись появления судьбы и отдельно нажми «Принять судьбу».

### Ассасин — Призрак / Ghost

- **Runtime ID:** — нет current-main ID
- **Домен / категория:** `assassin` / `ordinary-complex`
- **Authority:** DRAFT-DESIGNED
- **Как получить / eligibility:** advanced contracts + varied methods + low fallout + item/prep mastery + Activity/infiltration. Exact numeric gates/thresholds OPEN unless separately locked later.
- **Locked numbers:** нет утверждённых точных чисел; OPEN
- **Eligibility vs commit:** По D16 eligibility non-terminal; требуется явный commit.
- **Что происходит в этой жизни:** Стать элитной скрытной исполнительницей.
- **Наследие / New Start+:** Draft reward: covert access/start option; exact reward OPEN.
- **Класс reward:** undefined
- **Implementation:** DESIGNED_NO_ENDING_ID
- **Presentation:** NONE_NO_RUNTIME_ID
- **Оставшиеся блокеры:** Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity.
- **Маршрут в одну строку:** Выполняй сложные контракты разными методами с низким fallout, используя подготовку и infiltration.

### Ассасин — Перехват сети / Handler Takeover

- **Runtime ID:** — нет current-main ID
- **Домен / категория:** `assassin` / `ordinary-complex`
- **Authority:** DRAFT-DESIGNED
- **Как получить / eligibility:** know clients + ledger/compromise + handler/rival relationship + Merchant/Tavern/Palace contacts. Exact numeric gates/thresholds OPEN unless separately locked later.
- **Locked numbers:** нет утверждённых точных чисел; OPEN
- **Eligibility vs commit:** По D16 eligibility non-terminal; требуется явный commit.
- **Что происходит в этой жизни:** Взять под контроль сеть заказов и контактов.
- **Наследие / New Start+:** Draft reward: rule-changing network/contact; exact reward OPEN.
- **Класс reward:** undefined
- **Implementation:** DESIGNED_NO_ENDING_ID
- **Presentation:** NONE_NO_RUNTIME_ID
- **Оставшиеся блокеры:** Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity.
- **Маршрут в одну строку:** Собери данные о клиентах и сеть контактов, добудь leverage на handler и отдельно выбери takeover.

### Ассасин — Отказ / перебежчица / Turncoat

- **Runtime ID:** — нет current-main ID
- **Домен / категория:** `assassin` / `ordinary-complex`
- **Authority:** DRAFT-DESIGNED
- **Как получить / eligibility:** repeated conscious refusals: spare/warn targets + redirect information + expose client + help Guard/Palace/relationship; no Morality meter. Exact numeric gates/thresholds OPEN unless separately locked later.
- **Locked numbers:** нет утверждённых точных чисел; OPEN
- **Eligibility vs commit:** По D16 eligibility non-terminal; требуется явный commit.
- **Что происходит в этой жизни:** Превратить сознательный отказ от заказов в самостоятельную судьбу.
- **Наследие / New Start+:** OPEN.
- **Класс reward:** undefined
- **Implementation:** DESIGNED_NO_ENDING_ID
- **Presentation:** NONE_NO_RUNTIME_ID
- **Оставшиеся блокеры:** Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity.
- **Маршрут в одну строку:** Несколько раз осознанно срывай/перенаправляй ключевые заказы и раскрой сеть заказчика, не опираясь на Morality stat.

## Professional / Prostitute

### Профессионалка — Упорный труд

- **Runtime ID:** `ending.prostitute.hard-work`
- **Домен / категория:** `prostitute` / `ordinary-hard-work`
- **Authority:** LOCKED D16/D21/D22/D26
- **Как получить / eligibility:** Завершить не менее 50 смен профессии prostitute; по D26 максимум одна смена этой же профессии в календарный день, поэтому раньше Day 50 это невозможно.
- **Locked numbers:** 50 shifts; max 1 same-career shift/day; +5 package breadth per D22
- **Eligibility vs commit:** Eligibility non-terminal по D16; затем явный commit/accept ending и completeEnding.
- **Что происходит в этой жизни:** выбрать стабильную профессиональную жизнь
- **Наследие / New Start+:** Профессия навсегда доступна с начала следующих жизней независимо от обычного unlock gate; также зарабатывается selectable Hard Work package: один или два selectable +5 progression-stat bonus. Exact target stat(s) OPEN; хотя бы один из десяти пакетов должен включать Lust >= +3, placement OPEN.
- **Класс reward:** Hard Work package
- **Implementation:** EXECUTABLE_MAIN
- **Presentation:** EXACT_STATIC_MAIN
- **Оставшиеся блокеры:** Product: exact profession→+5 target mapping OPEN. Current hard-work-package fixture contains provisional concrete targets but D35 explicitly leaves mapping OPEN.
- **Маршрут в одну строку:** Сделай 50 смен prostitute, дождись появления судьбы и отдельно нажми «Принять судьбу».

### Профессионалка — Независимый дом

- **Runtime ID:** — нет current-main ID
- **Домен / категория:** `prostitute` / `ordinary-complex`
- **Authority:** DRAFT-DESIGNED
- **Как получить / eligibility:** money + Merchant/housing hook + staff/client management choices; School accounting/rhetoric optional. Exact numeric gates/thresholds OPEN unless separately locked later.
- **Locked numbers:** нет утверждённых точных чисел; OPEN
- **Eligibility vs commit:** По D16 eligibility non-terminal; требуется явный commit.
- **Что происходит в этой жизни:** Контролировать собственное место, условия и доход.
- **Наследие / New Start+:** Draft reward: housing/economy rule option / safe professional base; exact reward OPEN.
- **Класс reward:** undefined
- **Implementation:** DESIGNED_NO_ENDING_ID
- **Presentation:** NONE_NO_RUNTIME_ID
- **Оставшиеся блокеры:** Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity.
- **Маршрут в одну строку:** Собери капитал и housing/Merchant поддержку, докажи управление клиентами/персоналом и открой собственную базу.

### Профессионалка — Элитная клиентура

- **Runtime ID:** — нет current-main ID
- **Домен / категория:** `prostitute` / `ordinary-complex`
- **Authority:** DRAFT-DESIGNED
- **Как получить / eligibility:** Manners/Charm/Sexuality + formal attire/status capability + high-status contacts + possible Artist/Palace hook. Exact numeric gates/thresholds OPEN unless separately locked later.
- **Locked numbers:** нет утверждённых точных чисел; OPEN
- **Eligibility vs commit:** По D16 eligibility non-terminal; требуется явный commit.
- **Что происходит в этой жизни:** Перейти к высокостатусной профессиональной сети без обязательной романтики.
- **Наследие / New Start+:** Draft reward: status/contact access; exact reward OPEN.
- **Класс reward:** undefined
- **Implementation:** DESIGNED_NO_ENDING_ID
- **Presentation:** NONE_NO_RUNTIME_ID
- **Оставшиеся блокеры:** Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity.
- **Маршрут в одну строку:** Подними социальный build, подготовь formal attire и высокостатусные контакты, затем отдельно прими исход.

### Профессионалка — Сеть / защита

- **Runtime ID:** — нет current-main ID
- **Домен / категория:** `prostitute` / `ordinary-complex`
- **Authority:** DRAFT-DESIGNED
- **Как получить / eligibility:** recurring NPCs + Guard/Tavern/Merchant contacts + mutual-aid choices + possible Secret Debt knowledge. Exact numeric gates/thresholds OPEN unless separately locked later.
- **Locked numbers:** нет утверждённых точных чисел; OPEN
- **Eligibility vs commit:** По D16 eligibility non-terminal; требуется явный commit.
- **Что происходит в этой жизни:** Построить сеть взаимной поддержки и безопасности.
- **Наследие / New Start+:** OPEN.
- **Класс reward:** undefined
- **Implementation:** DESIGNED_NO_ENDING_ID
- **Presentation:** NONE_NO_RUNTIME_ID
- **Оставшиеся блокеры:** Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity.
- **Маршрут в одну строку:** Развивай повторяющиеся контакты и mutual-aid решения с Guard/Tavern/Merchant, затем закрепи сеть отдельной судьбой.


---

# 3. Secret Debt — три отдельные судьбы

### Secret Debt — Выкупленная свобода / Paid Freedom

- **Runtime ID:** — нет current-main ID; off-main producer candidate used ending.secret-debt.paid-freedom
- **Домен / категория:** `secret-debt` / `hidden-secret-debt`
- **Authority:** LOCKED D15/D19/D30/D32
- **Как получить / eligibility:** На unseen street night lender имеет 20% chance; принять +2000; ровно через 10 дней активируется долг 20000 и lock всех 10 ordinary careers. Когда held money >=20000, выполнить отдельное all-at-once repayment 20000. После реального выхода ending становится eligible.
- **Locked numbers:** 20% chance; +2000; 10 days; debt/repayment 20000
- **Eligibility vs commit:** Repayment создаёт eligibility/exit; ending всё равно требует отдельного commit по D16.
- **Что происходит в этой жизни:** Полностью закрыть долг, снять forced route/domain lock и вернуть доступ к сохранённому ordinary-career progress.
- **Наследие / New Start+:** D30/D32 Keystone Earned Reserve Match: 1:1 match только eligible ordinary-profession wage while not bound; cap +1000/run; lender grant/hidden work/repayment/non-work income excluded.
- **Класс reward:** Keystone
- **Implementation:** LOCKED_NO_CURRENT_MAIN_RUNTIME (off-main producer candidate exists)
- **Presentation:** NONE_CURRENT_MAIN; off-main candidate had presentation
- **Оставшиеся блокеры:** Runtime/integration: Secret Debt absent from current main. Product remains OPEN only for hidden shift gains/wage, not Paid Freedom numbers.
- **Маршрут в одну строку:** Прими уличную помощь, переживи активацию долга, накопи 20 000 и выплати всё одной операцией; затем отдельно прими Paid Freedom.

### Secret Debt — Связанная жизнь / Bound Life

- **Runtime ID:** — нет current-main ID; off-main producer candidate used ending.secret-debt.bound-life
- **Домен / категория:** `secret-debt` / `hidden-secret-debt`
- **Authority:** LOCKED D19/D30/D32
- **Как получить / eligibility:** После активации bound route завершить 50 hidden daytime shifts. Это hidden Hard Work analogue, но не ordinary Hard Work и не Palace progress.
- **Locked numbers:** 50 hidden daytime shifts
- **Eligibility vs commit:** 50 shifts дают eligibility; сознательный explicit commit обязателен.
- **Что происходит в этой жизни:** Принять связанную профессиональную жизнь как полноценную судьбу, а не failure screen.
- **Наследие / New Start+:** D30/D32 Keystone Work Rhythm: qualifying ordinary-work day arms +1 usable Energy next day; non-stacking; max 20 rewarded days/run; hidden work/School-only/Activity-only do not arm; D26 unchanged.
- **Класс reward:** Keystone
- **Implementation:** LOCKED_NO_CURRENT_MAIN_RUNTIME (off-main producer candidate exists)
- **Presentation:** NONE_CURRENT_MAIN; off-main candidate had presentation
- **Оставшиеся блокеры:** Runtime/integration Secret Debt; exact hidden shift gains/wage still Product OPEN.
- **Маршрут в одну строку:** После активации ловушки отработай 50 дневных hidden shifts и, когда судьба станет доступна, отдельно выбери Bound Life.

### Secret Debt — Перехват власти / Takeover

- **Runtime ID:** — нет current-main ID; off-main producer candidate used ending.secret-debt.takeover
- **Домен / категория:** `secret-debt` / `hidden-secret-debt`
- **Authority:** PARTLY LOCKED D19/D20/D30/D32
- **Как получить / eligibility:** Bound route + минимум 50 hidden daytime shifts + минимум 10 paid School lessons + appropriate progression-stat build + high Lust + отдельное explicit Takeover action. Forced work Lust не повышает; Body Confidence paid lesson даёт Lust +2. Exact stat/Lust thresholds OPEN.
- **Locked numbers:** 50 hidden shifts; 10 paid School lessons; Body Confidence Lust +2; exact Takeover stat/Lust thresholds OPEN
- **Eligibility vs commit:** Takeover action/route resolution делает ending eligible; затем отдельный ending commit по D16.
- **Что происходит в этой жизни:** Устранить хозяина и взять под контроль систему/заведение.
- **Наследие / New Start+:** D30/D32 Keystone Network Retainer: +25 money в начале каждого eligible дня в первых 40 eligible calendar days; max 1000/run; while Secret Debt-bound payment paused, missed payments lost.
- **Класс reward:** Keystone
- **Implementation:** LOCKED_BUT_PRODUCT_AND_RUNTIME_BLOCKED
- **Presentation:** NONE_CURRENT_MAIN; off-main candidate had presentation
- **Оставшиеся блокеры:** Product: exact hidden shift gains, wage coefficients, Takeover progression-stat/Lust thresholds. Runtime/integration: Secret Debt absent current main.
- **Маршрут в одну строку:** Отработай 50 hidden shifts, оплати минимум 10 School lessons, собери нужный build и высокий Lust, выполни отдельное Takeover action и затем явно прими исход.


### Secret Debt authority summary

D19/D20/D30/D32 уже фиксируют:
- 20% unseen eligible street-night chance;
- +2000 immediate help;
- activation exactly after 10 days;
- exact debt / one-shot repayment = 20000;
- 50 hidden daytime shifts for Bound Life;
- 10 paid School lessons for Takeover;
- Body Confidence Lust +2 per paid lesson;
- three exact future-life Keystones:
  - Paid Freedom → Earned Reserve Match, 1:1, cap 1000;
  - Bound Life → Work Rhythm, +1 next-day Energy after qualifying ordinary-work day, max 20 days;
  - Takeover → Network Retainer, 25/day for first 40 eligible days, max 1000, paused while bound.

Still OPEN:
- hidden shift exact stat gains;
- hidden wage coefficients;
- Takeover exact progression-stat thresholds;
- Takeover exact high-Lust threshold.

Secret Debt **never** counts toward ordinary Hard Work 10/10.

---

# 4. Palace — три outcomes + True Ending

### Дворец — Служебная жизнь / Service Life

- **Runtime ID:** — нет current-main ID
- **Домен / категория:** `palace` / `palace`
- **Authority:** LOCKED TOPOLOGY D23/D29; exact reward/content partly OPEN
- **Как получить / eligibility:** Сначала навсегда заработать все 10 ordinary Hard Work и в новой жизни активировать все 10 packages -> Day-1 Palace invitation -> access. Palace duties advance rich six-stage topology: 2 Working Rhythm, 5 Trusted Service, 8 Palace Network, 12 Crossroads, 15 Outcome Ready. Service Life prep may begin at Trusted Service (>=5), but final-ready/eligibility only from Outcome Ready (15).
- **Locked numbers:** 10/10 earned + 10/10 active; Palace duty milestones 2/5/8/12/15; prep earliest duty 5; finalize at 15
- **Eligibility vs commit:** Preparation/finalization do not commit. Multiple Palace endings may remain eligible; explicit commit required.
- **Что происходит в этой жизни:** Остаться частью дворцовой службы как профессиональная судьба.
- **Наследие / New Start+:** OPEN; draft says thematic access/status/start option.
- **Класс reward:** undefined
- **Implementation:** LOCKED_CONTRACT_NO_CURRENT_MAIN_PALACE_CAREER
- **Presentation:** NONE_CURRENT_MAIN
- **Оставшиеся блокеры:** Content/runtime: Palace career/actions/outcome scenes integration; Product: exact reward and exact daily cadence.
- **Маршрут в одну строку:** Заработай и активируй все 10 ordinary Hard Work packages, войди по Day-1 invitation, доведи Palace до 15 duties и подготовь Service Life, затем отдельно выбери исход.

### Дворец — Дворцовая власть / Court Power

- **Runtime ID:** — нет current-main ID
- **Домен / категория:** `palace` / `palace`
- **Authority:** LOCKED TOPOLOGY D23/D29; exact reward/content partly OPEN
- **Как получить / eligibility:** D23 entry as above. Court Power prep may begin at Palace Network (>=8 duties); final-ready only at Outcome Ready (15). Exact social/management authored conditions beyond topology OPEN.
- **Locked numbers:** 10/10 earned+active; prep earliest 8 duties; final at 15
- **Eligibility vs commit:** Explicit commit; non-exclusive with other Palace outcomes until commit.
- **Что происходит в этой жизни:** Получить реальную должность/влияние/контроль над частью аппарата.
- **Наследие / New Start+:** OPEN; draft says strong status/rule-changing Meta option.
- **Класс reward:** undefined
- **Implementation:** LOCKED_CONTRACT_NO_CURRENT_MAIN_PALACE_CAREER
- **Presentation:** NONE_CURRENT_MAIN
- **Оставшиеся блокеры:** Product/content: exact prep requirements/reward; Runtime: Palace absent current main.
- **Маршрут в одну строку:** Открой Palace через 10/10, дойди минимум до Palace Network, подготовь ветку власти и заверши 15 duties; потом явно выбери Court Power.

### Дворец — Внутренняя истина / Inner Truth

- **Runtime ID:** — нет current-main ID
- **Домен / категория:** `palace` / `palace`
- **Authority:** LOCKED TOPOLOGY D23/D29; exact reward/content partly OPEN
- **Как получить / eligibility:** D23 entry. Inner Truth prep may begin at Crossroads (>=12 duties); final-ready only at Outcome Ready (15). Draft expects external legacy facts/knowledge fragments/world route; exact fragment set OPEN.
- **Locked numbers:** 10/10 earned+active; prep earliest 12 duties; final at 15
- **Eligibility vs commit:** Explicit commit; may coexist with Service Life/Court Power until commit.
- **Что происходит в этой жизни:** Использовать дворцовый доступ, чтобы раскрыть часть большой тайны мира.
- **Наследие / New Start+:** OPEN; may unlock knowledge/meta layer, but exact effect not locked.
- **Класс reward:** undefined
- **Implementation:** LOCKED_CONTRACT_NO_CURRENT_MAIN_PALACE_CAREER
- **Presentation:** NONE_CURRENT_MAIN
- **Оставшиеся блокеры:** Product: exact knowledge prerequisites/reward; Content/runtime Palace route.
- **Маршрут в одну строку:** Открой Palace через 10/10, дойди до Crossroads, собери нужную world-knowledge подготовку, закончи 15 duties и отдельно выбери Inner Truth.

### Дворец — Возвращение домой / True Ending

- **Runtime ID:** — нет current-main ID
- **Домен / категория:** `palace` / `palace-true`
- **Authority:** LOCKED D18/D23/D24/D29
- **Как получить / eligibility:** Permanent ordinary Hard Work 10/10 + active packages 10/10 -> Day-1 invite -> Palace access -> Outcome Ready / palace.progression-complete after 15 duties; все 12 progression stats >=91 (строго >90), Lust excluded; победить Принца (palace.prince-defeated). Только после этого ending eligible.
- **Locked numbers:** 10/10 + 10/10; 15 duties; all 12 progression stats >=91; cap reward 100→200; Lust excluded
- **Eligibility vs commit:** Prince defeat does NOT auto-end; explicit ending commit remains mandatory.
- **Что происходит в этой жизни:** Победить Принца и вернуться в исходный мир.
- **Наследие / New Start+:** Навсегда открыть selectable Palace True Specialist: progression-stat cap 200 вместо 100 для всех 12 progression stats. Current/start values и +5 packages НЕ умножаются; Lust не входит.
- **Класс reward:** Specialist
- **Implementation:** LOCKED_NO_CURRENT_MAIN_ENDING; shared cap consumer partly prepared
- **Presentation:** NONE_CURRENT_MAIN
- **Оставшиеся блокеры:** Runtime/content: Palace career, confrontation and ending integration; Product: exact confrontation mechanics/lore/UI, but eligibility/reward numbers locked.
- **Маршрут в одну строку:** Открой Palace по 10/10, выполни 15 duties, подними все 12 статов до 91+, победи Принца и только потом явно прими Return Home.


### Palace gate in plain language

D23:
**earn all 10 ordinary Hard Work permanently + activate all 10 packages in that New Start+ life → automatic Day-1 invitation → Palace access.**

Nothing else substitutes for that gate:
- not `tavern-court`;
- not Artist Court Invitation;
- not a relationship;
- not Secret Debt;
- not an old `palace` Meta unlock.

D29 rich-six-stage duty milestones:
- 0: Entered Service;
- 2: Working Rhythm;
- 5: Trusted Service;
- 8: Palace Network;
- 12: Crossroads;
- 15: Outcome Ready / `palace.progression-complete`.

D24 True reward:
**cap changes 100 → 200 only**.
Current values, starting stats, manual 10 allocation points and Hard Work +5 bonuses are **not multiplied**.

---

# 5. Current global / education endings

### Своя в артели

- **Runtime ID:** `guild-life`
- **Домен / категория:** `global-legacy` / `global`
- **Authority:** LEGACY EXECUTABLE; not modern Product ending authority
- **Как получить / eligibility:** Current exact runtime: metric work >=5; metric organization >=6; flag alchemy.delivered=true.
- **Locked numbers:** runtime only: work 5, organization 6
- **Eligibility vs commit:** Current engine uses normal non-terminal eligibility + explicit commit.
- **Что происходит в этой жизни:** Legacy guild/workshop life outcome.
- **Наследие / New Start+:** Completion stores legacy unlock guild. Core compatibility sleep path halves legacy room rent 100→50, but modern chooseLodging uses fixed lodging.moneyCost and does not consult guild. Old description's 'practicality +5' is not a current 12-stat effect.
- **Класс reward:** undefined legacy unlock
- **Implementation:** EXECUTABLE_MAIN_STALE
- **Presentation:** EXACT_STATIC_MAIN
- **Оставшиеся блокеры:** Product: decide retain/retire/modernize global ending. Runtime/UI text currently overstates reward relative to modern NightFlow.
- **Маршрут в одну строку:** В legacy-прототипе набери work 5, organization 6 и сдай alchemy order; затем отдельно прими судьбу — но её наследие нуждается в модернизации.

### Дипломированная алхимичка

- **Runtime ID:** `scholar-life`
- **Домен / категория:** `education-legacy` / `education`
- **Authority:** LEGACY EXECUTABLE; modern School reward mismatch
- **Как получить / eligibility:** Current exact runtime: flag school.exam=true.
- **Locked numbers:** нет утверждённых точных чисел; OPEN
- **Eligibility vs commit:** Current engine uses non-terminal eligibility + explicit commit.
- **Что происходит в этой жизни:** Legacy education/alchemy graduation outcome.
- **Наследие / New Start+:** Completion stores legacy unlock scholar. Core actionCost makes legacy action id 'school' free once per 7-day bucket; this does not establish a waiver for modern typed paid School courses. Old description's Wits +5 is not applied by current Meta reward transaction.
- **Класс reward:** undefined legacy unlock
- **Implementation:** EXECUTABLE_MAIN_STALE
- **Presentation:** EXACT_STATIC_MAIN
- **Оставшиеся блокеры:** Product/runtime: decide modern education-ending contract and typed School reward; stale description/reward consumer split.
- **Маршрут в одну строку:** В legacy-прототипе сдай school.exam и отдельно прими судьбу; для современной School эта концовка требует Product/runtime переопределения.


These two IDs are executable, but their reward descriptions belong to an older prototype layer.

Important runtime truth:
- `guild` half-rent is consumed by the **compatibility** sleep path; typed current NightFlow pays `lodging.moneyCost` directly;
- `scholar` free lesson is wired to legacy action id `school`, not proof of a tuition waiver for typed current School courses.

Therefore the Atlas does **not** promise their old prose as final 1.0 Meta behavior.

---

# 6. Standalone Large Activity ending requirement

### Самостоятельная Activity-концовка — название OPEN

- **Runtime ID:** — нет current-main ID
- **Домен / категория:** `large-activity` / `activity`
- **Authority:** REQUIRED BY LARGE_ACTIVITY_PRODUCT_ROLE; ID/name/gates OPEN
- **Как получить / eligibility:** Large Activity design requires минимум одну самостоятельную ending family, distinct from job/relationship contributions. Exact region, Activity depth, facts, stats, item requirements and final choice are OPEN.
- **Locked numbers:** нет утверждённых точных чисел; OPEN
- **Eligibility vs commit:** По D16 любая такая family должна стать eligible non-terminal и требовать явный commit.
- **Что происходит в этой жизни:** OPEN; должна быть самостоятельной судьбой глубокого Activity playstyle.
- **Наследие / New Start+:** OPEN.
- **Класс reward:** undefined
- **Implementation:** REQUIRED_UNDEFINED
- **Presentation:** NONE_NO_RUNTIME_ID
- **Оставшиеся блокеры:** Product: exact identity/route/reward; Content: authored Activity ending; Runtime/presentation: ending identity and integration.
- **Маршрут в одну строку:** Глубоко пройди Large Activity до её будущей самостоятельной финальной ветки; точный маршрут и название ещё не утверждены.


The Large Activity product role explicitly requires at least one independent ending family.
The current authority does **not** provide:
- a name;
- an ending ID;
- region;
- exact gates;
- reward.

Atlas therefore marks those fields OPEN rather than inventing a fake ending.

---

# 7. Relationship-specific ending truth

## Standalone current relationship endings

**0 standalone relationship-specific ending IDs exist on current main.**

Relationship state currently contributes to career endings instead.

Executable relationship-dependent examples:

- `ending.lumber.forewoman` requires professional `lumber.foreman` route;
- `ending.satyr-maid.boundary-mastery` requires explicit recurring-guest relationship choice;
- `ending.undead-farm.successor` requires keeper relationship stage `partner-ready`.

Designed relationship-centered family:

- **Satyr Maid — Favourite / Partner / Personal Network** is a real designed career/relationship outcome family, but no current ending ID exists.

Lumber draft also says a major relationship ending *may* coexist with career endings, but does not define its identity or require one. It is therefore **not** turned into a synthetic Atlas row.

D35 housing does not change this rule:
normal lodging may enable explicitly authored private-space branches, but cheap/street relationship content is not globally blocked and private-space branches may not gate Hard Work or Palace.

---

# 8. Ordinary Hard Work reward matrix

D21/D22 locked truth:
- each ordinary Hard Work permanently bypasses that profession's normal future-run unlock gate;
- each also earns a selectable New Start+ stat package;
- first five careers: exactly one +5 progression-stat target;
- later five: one or two +5 progression-stat targets;
- at least one package overall includes Lust >= +3;
- any earned subset may be active;
- all ten must be active in a Palace New Start+ life under D23.

**Critical authority warning:** D35 still says exact profession → +5 target mapping is OPEN.
Current runtime fixture contains a concrete mapping, shown below only for implementation reconciliation; it is **not Product authority**.

| Career | Hard Work ID | Locked route | Locked package breadth | Product target mapping | Current provisional runtime fixture |
| --- | --- | --- | --- | --- | --- |
| Dwarven Lumber / Лесорубы | `ending.lumber.hard-work` | 50 shifts; D26 max 1/day | ровно 1 × +5 progression stat | **OPEN** | strength +5 |
| Satyr Maid | `ending.satyr-maid.hard-work` | 50 shifts; D26 max 1/day | ровно 1 × +5 progression stat | **OPEN** | grooming +5 |
| Undead Farm / Ферма нежити | `ending.undead-farm.hard-work` | 50 shifts; D26 max 1/day | ровно 1 × +5 progression stat | **OPEN** | magic +5 |
| Tavern / Таверна | `ending.tavern.hard-work` | 50 shifts; D26 max 1/day | ровно 1 × +5 progression stat | **OPEN** | sociability +5 |
| Hunter / Охотница | `ending.hunter.hard-work` | 50 shifts; D26 max 1/day | ровно 1 × +5 progression stat | **OPEN** | dexterity +5 |
| Guard / Стража | `ending.guard.hard-work` | 50 shifts; D26 max 1/day | 1–2 × +5 progression stats | **OPEN** | endurance +5; manners +5 |
| Merchant / Торговка | `ending.merchant.hard-work` | 50 shifts; D26 max 1/day | 1–2 × +5 progression stats | **OPEN** | wits +5; reason +5 |
| Artist/Geisha / Дом искусств | `ending.artist-geisha.hard-work` | 50 shifts; D26 max 1/day | 1–2 × +5 progression stats | **OPEN** | creativity +5; grooming +5 |
| Assassin / Ассасин | `ending.assassin.hard-work` | 50 shifts; D26 max 1/day | 1–2 × +5 progression stats | **OPEN** | dexterity +5; wits +5 |
| Professional / Prostitute | `ending.prostitute.hard-work` | 50 shifts; D26 max 1/day | 1–2 × +5 progression stats + runtime provisional Lust +3 | **OPEN** | sexuality +5; charm +5; Lust +3 |

The concrete fixture must not be surfaced as final player promise until Product explicitly promotes a mapping.

---

# 9. Presentation status

Current presentation truth:

- all **22 current executable ending IDs** have exact static slots in current `presentation.json`;
- `presentationIdForEnding` also has generic `location/town/default` fallback;
- all 10 ordinary Hard Work presentation identities exist;
- current Satyr/Undead complex endings have static ending slots;
- absent gameplay families are **not** treated as presentation identities.

Historical presentation docs that report only **9 current endings** are stale count snapshots from earlier baselines.
They remain useful provenance, but current-main count is 22.

For each non-runtime family the correct presentation status is:
**no current ending ID → no current ending presentation identity**.

---

# 10. Stale / conflict audit

## D16 — no auto-ending

Current engine is compliant:
- `register` makes ending eligible;
- `commitEnding` is explicit;
- `completeEnding` applies first-completion Meta transaction.

Any draft phrasing that sounds like "route completes → run ends" must be read through D16.

## D17/D21 vs `lumber-stay`

### Бригадир поневоле — legacy

- **Runtime ID:** `lumber-stay`
- **Домен / категория:** `lumber-legacy` / `stale-legacy`
- **Authority:** STALE EXECUTABLE; conflicts with D17/D21/D27
- **Как получить / eligibility:** Current exact runtime: visits(action='lumber') >=24. Это не D17 Hard Work и не современная Lumber complex family.
- **Locked numbers:** legacy runtime 24 visits; superseded by D17 Hard Work 50
- **Eligibility vs commit:** Still follows current explicit commit flow, but identity itself is stale.
- **Что происходит в этой жизни:** Legacy Lumber stay/foreman-like fate.
- **Наследие / New Start+:** Stores legacy unlock vitality; current energyMax adds +1 max Energy whenever vitality exists. This is a broad rule modifier that predates D27 Keystone architecture and is not approved as modern Lumber reward.
- **Класс reward:** undefined legacy; would require D27 reclassification if retained
- **Implementation:** EXECUTABLE_MAIN_CONFLICTING_STALE
- **Presentation:** EXACT_STATIC_MAIN
- **Оставшиеся блокеры:** Must retire/migrate/re-author: D17 locks Lumber Hard Work=50; D21/D22 define modern Hard Work reward; broad +1 Energy cannot survive silently outside D27.
- **Маршрут в одну строку:** Не ориентируйся на эту legacy-судьбу как на 1.0 маршрут: текущий прототип открывает её после 24 old Lumber visits, но D17 её смысл supersede-ит.


`lumber-stay` at 24 legacy visits is not modern Lumber Hard Work.
Its `vitality` +1 Energy effect is broad and predates D27; it cannot silently survive as an unrestricted modern reward.

## D23 — Palace shortcuts forbidden

Stale/current names that mention court do not weaken Palace:
- `tavern-court` does not unlock Palace;
- Artist Court Invitation may only provide a special option **after** real Palace unlock;
- old Meta unlock `palace` is explicitly stripped during save migration/current parse.

Only:
**permanent 10/10 + active 10/10 → Day-1 invitation**.

## D24 — True reward is cap-only

Any old wording "double all stats" is stale shorthand.

Correct:
- cap 100→200 for 12 progression stats;
- values are not multiplied;
- Hard Work +5 is not multiplied;
- Lust excluded.

## D27/D28 — Meta classification

Current architecture:
- 0..1 Keystone;
- 0..2 Specialists;
- ordinary Hard Work packages separate/unrestricted;
- pure knowledge/content automatic;
- cap-200 consumes one Specialist.

Legacy reward strings such as `guild`, `host`, `mediator`, `court`, `vitality` do not receive an automatic modern class merely because they still execute.

## D30/D32 — Secret Debt supersedes old draft OPEN rewards

The poverty draft says exact Meta rewards OPEN.
D30/D32 supersede that for the three ending rewards:
- Earned Reserve Match cap 1000;
- Work Rhythm max 20;
- Network Retainer 25×40, max 1000.

Secret Debt still never counts toward Palace 10/10.

## D29 — Palace has no Hard Work ending

There is no `hardWork:palace`.
Service Life is a Palace outcome, not an 11th ordinary Hard Work package.

## D31 — seasonal negatives do not alter ending counts

D31 changes exact negative-stat target cells only.
It does not change:
- D26 pacing;
- Hard Work=50;
- ending family identities.

## D35 — housing private space does not become a universal relationship gate

Normal's private-space advantage applies only to explicit allowlisted authored choices.
It does not globally gate:
- relationship endings;
- School Night Study;
- public/workplace Night;
- Hard Work;
- Palace.

## Hard Work package mapping conflict

`hard-work-package-catalog-v1.fixture.json` is already bound in shared runtime with exact targets, but current Product authority still marks those mappings OPEN.

Atlas treatment:
- implementation mapping = observable provisional state;
- player-facing final reward mapping = **OPEN**.

## Legacy global reward copy mismatch

- `guild-life` prose claims half rent + old "practicality +5"; current core only has compatibility half-rent consumer.
- `scholar-life` prose claims Wits +5 + weekly free lesson; current core has legacy-school free lesson consumer, not typed School +5/tuition authority.
- `tavern-stay/guild/court` store legacy unlocks `host/mediator/court`; no current Tavern/core consumer was found for those IDs.
- old Tavern description stats therefore must not be treated as current Meta rewards.

## Original Plus Mode

D25:
**not successor scope**.
No ending in this Atlas unlocks original job-replacement Plus Mode.

---

# 11. Exact 1.0 gap list

## Product-blocked

1. **Ordinary Hard Work exact +5 target mapping**
   - D21/D22 breadth locked;
   - target stat(s) and Lust placement still OPEN despite provisional runtime fixture.

2. **Most advanced ordinary ending rewards**
   - Lumber Forewoman/Forest;
   - Satyr final disposition beyond currently executable legacy unlocks;
   - Undead Research/Successor;
   - all Hunter/Guard/Merchant/Artist/Assassin/Professional advanced rewards.

3. **Advanced ordinary exact numeric eligibility where not separately locked**
   - draft phrases such as "strong record", "substantial work", "high status" remain OPEN;
   - current Satyr/Undead/Tavern prototype numbers are implementation facts, not universal Product locks.

4. **Secret Debt balance-owned values**
   - hidden shift gains;
   - wage coefficients;
   - Takeover exact progression-stat/Lust thresholds.

5. **Palace non-True reward effects**
   - Service Life;
   - Court Power;
   - Inner Truth.

6. **Palace authored cadence details**
   - rich six-stage milestones locked;
   - exact daily cadence/content inside stages still OPEN.

7. **Standalone Activity ending**
   - name, route, gates, reward all OPEN.

8. **Legacy global/education disposition**
   - decide whether `guild-life` / `scholar-life` are modernized, replaced or retired.

## Content-blocked

1. Missing final authored ending chains/scenes/copy for **21 advanced ordinary families** without current ending IDs.
2. Satyr Personal Network family.
3. Undead External Anomaly family.
4. Hunter Master Hunter / Warden / Legend.
5. Guard Officer / Reform / Network / Major Case.
6. Merchant House / Speculator / Patron of Routes.
7. Artist Master Artist / Patron Network / Court Invitation.
8. Assassin Ghost / Handler Takeover / Turncoat.
9. Professional Independent House / Elite Clientele / Network Protection.
10. Palace Service/Court/Truth/Return Home authored final scenes and confrontation content.
11. Standalone Activity ending authored route.
12. D35 initial private-space relationship branches may support relationship play, but are not themselves ending definitions.

## Runtime-blocked

1. **29 canonical family slots have no current-main ending ID**:
   - 21 advanced ordinary;
   - 3 Secret Debt;
   - 4 Palace;
   - 1 Activity.

2. Current Lumber machine/complex ending gates lag D34:
   - main career machine does not yet expose full 1/8/20 stages;
   - Forewoman/Forest ending conditions omit the required trusted-worker >=8 gate.

3. Secret Debt production exists only in off-main producer work, not current main.

4. Palace D23 helper logic exists, but Palace career/endings are absent current main.

5. Legacy global rewards are wired through compatibility consumers rather than modern Night/School systems.

6. D27/D28 Keystone/Specialist loadout needs final runtime/catalog representation for D32 rewards and D24 Specialist if not already integrated by the owning shared-runtime lane.

7. Absent ending IDs correctly have no presentation identity; presentation work follows gameplay identity, not the reverse.

---

# 12. 1.0 player-facing route index — one line each

- **Лесорубы — Упорный труд:** Сделай 50 смен lumber, дождись появления судьбы и отдельно нажми «Принять судьбу».
- **Satyr Maid — Упорный труд:** Сделай 50 смен satyr-maid, дождись появления судьбы и отдельно нажми «Принять судьбу».
- **Ферма нежити — Упорный труд:** Сделай 50 смен undead-farm, дождись появления судьбы и отдельно нажми «Принять судьбу».
- **Таверна — Упорный труд:** Сделай 50 смен tavern, дождись появления судьбы и отдельно нажми «Принять судьбу».
- **Охотница — Упорный труд:** Сделай 50 смен hunter, дождись появления судьбы и отдельно нажми «Принять судьбу».
- **Стража — Упорный труд:** Сделай 50 смен guard, дождись появления судьбы и отдельно нажми «Принять судьбу».
- **Торговка — Упорный труд:** Сделай 50 смен merchant, дождись появления судьбы и отдельно нажми «Принять судьбу».
- **Дом искусств — Упорный труд:** Сделай 50 смен artist-geisha, дождись появления судьбы и отдельно нажми «Принять судьбу».
- **Ассасин — Упорный труд:** Сделай 50 смен assassin, дождись появления судьбы и отдельно нажми «Принять судьбу».
- **Профессионалка — Упорный труд:** Сделай 50 смен prostitute, дождись появления судьбы и отдельно нажми «Принять судьбу».
- **Лесорубы — Бригадир / Forewoman:** Сделай минимум 8 Lumber shifts, подготовь управленческую грамотность, пройди профессиональную ветку бригадира и реши производственную проблему, затем явно выбери исход.
- **Лесорубы — Лесной договор / Forest Compact:** Дойди минимум до 8 Lumber shifts, раскрой и реши лесную проблему через Activity/cross-system подготовку, затем отдельно прими судьбу.
- **Satyr Maid — Власть в доме / House Power:** В текущем прототипе: 15 смен, управленческая/риторическая School-подготовка и успешное решение house-power crisis; после eligibility отдельно прими исход.
- **Satyr Maid — Партнёр / личная сеть (Favourite / Partner / Personal Network):** Развивай добровольную recurring-guest/major relationship ветку, выполни её внешний запрос и после появления отдельной судьбы явно выбери её.
- **Satyr Maid — Мастерство границ / Boundary Mastery:** В текущем прототипе: 15 смен, School boundary readiness, отказ от private meeting и решение boundary crisis; затем явно прими судьбу.
- **Ферма нежити — Исследовательница / Research Farmer:** Сохрани образец, подготовь School research readiness, реши исследовательский кризис и набери текущий runtime-порог смен; потом отдельно выбери исход.
- **Ферма нежити — Преемница / Farm Successor:** Собери управленческую School-подготовку, professional trust с keeper, реши successor crisis и достигни текущего runtime-порога смен; затем явно прими исход.
- **Ферма нежити — Внешняя аномалия:** Найди аномалию на ферме, исследуй образец в School, отыщи источник через Activity и выбери способ обращения с ним.
- **Таверна — Хозяйка / Innkeeper:** В текущем прототипе доведи Tavern до innkeeper-ready (или выполни legacy 18-shift/fact route), затем отдельно выбери судьбу.
- **Таверна — Информационный брокер:** Открой rumour/information-broker chain, сохрани/разреши confidentiality и crisis, затем явно прими информационный исход; это не открывает Palace.
- **Таверна — Убежище / Sanctuary:** Заверши housing-assistance и crisis/confidentiality ветки до sanctuary-ready, затем отдельно прими судьбу.
- **Охотница — Мастер-охотница:** Подготовь редкие контракты, нужные инструменты и методы, успешно возвращайся из разных сезонных задач и отдельно прими исход.
- **Охотница — Хранительница / Warden:** Изучи циклы территории, разреши конфликт вокруг её использования и собери внешние знания/союзников.
- **Охотница — Легенда:** Собери сеть улик и редкие capability, пройди сложную Activity/encounter цепь и отдельно выбери легендарный исход.
- **Стража — Офицер:** Наработай сильный служебный record, подготовь School-навыки и реши управленческий кризис.
- **Стража — Реформа:** Последовательно проводи выбранную линию в уличных/коррупционных конфликтах и собери поддержку.
- **Стража — Сеть / коррупционная сеть:** Свяжи служебный доступ с Merchant/Tavern/Assassin контактами и пройди рискованную сетевую ветку.
- **Стража — Большое дело / Major Case:** Собери улики из нескольких систем, доведи большое расследование до разрешения и затем отдельно прими исход.
- **Торговка — Торговый дом / Merchant House:** Накопи капитал и репутацию, свяжи поставщиков, подготовь accounting и реши логистический кризис.
- **Торговка — Спекулянтка / контрабандистка:** Используй сезонный дефицит и covert contacts, пройди Guard/Assassin риск и отдельно выбери route.
- **Торговка — Покровительница путей / Patron of Routes:** Собери поставки и знания из Lumber/Farm/Hunter/Activity/Tavern и сформируй новую сеть маршрутов.
- **Дом искусств — Мастер искусства / Master Artist:** Развивай выступления, School и фестивальные результаты, подготовь нужный costume/instrument и прими мастерский исход.
- **Дом искусств — Сеть покровителей / Patron Network:** Построй несколько независимых профессиональных связей, сохрани доверие/конфиденциальность и выбери сетевой исход.
- **Дом искусств — Придворное приглашение:** Добейся court-contact через артистическую карьеру; награда может помочь после Palace unlock, но не заменяет D23.
- **Ассасин — Призрак / Ghost:** Выполняй сложные контракты разными методами с низким fallout, используя подготовку и infiltration.
- **Ассасин — Перехват сети / Handler Takeover:** Собери данные о клиентах и сеть контактов, добудь leverage на handler и отдельно выбери takeover.
- **Ассасин — Отказ / перебежчица / Turncoat:** Несколько раз осознанно срывай/перенаправляй ключевые заказы и раскрой сеть заказчика, не опираясь на Morality stat.
- **Профессионалка — Независимый дом:** Собери капитал и housing/Merchant поддержку, докажи управление клиентами/персоналом и открой собственную базу.
- **Профессионалка — Элитная клиентура:** Подними социальный build, подготовь formal attire и высокостатусные контакты, затем отдельно прими исход.
- **Профессионалка — Сеть / защита:** Развивай повторяющиеся контакты и mutual-aid решения с Guard/Tavern/Merchant, затем закрепи сеть отдельной судьбой.
- **Secret Debt — Выкупленная свобода / Paid Freedom:** Прими уличную помощь, переживи активацию долга, накопи 20 000 и выплати всё одной операцией; затем отдельно прими Paid Freedom.
- **Secret Debt — Связанная жизнь / Bound Life:** После активации ловушки отработай 50 дневных hidden shifts и, когда судьба станет доступна, отдельно выбери Bound Life.
- **Secret Debt — Перехват власти / Takeover:** Отработай 50 hidden shifts, оплати минимум 10 School lessons, собери нужный build и высокий Lust, выполни отдельное Takeover action и затем явно прими исход.
- **Дворец — Служебная жизнь / Service Life:** Заработай и активируй все 10 ordinary Hard Work packages, войди по Day-1 invitation, доведи Palace до 15 duties и подготовь Service Life, затем отдельно выбери исход.
- **Дворец — Дворцовая власть / Court Power:** Открой Palace через 10/10, дойди минимум до Palace Network, подготовь ветку власти и заверши 15 duties; потом явно выбери Court Power.
- **Дворец — Внутренняя истина / Inner Truth:** Открой Palace через 10/10, дойди до Crossroads, собери нужную world-knowledge подготовку, закончи 15 duties и отдельно выбери Inner Truth.
- **Дворец — Возвращение домой / True Ending:** Открой Palace по 10/10, выполни 15 duties, подними все 12 статов до 91+, победи Принца и только потом явно прими Return Home.
- **Своя в артели:** В legacy-прототипе набери work 5, organization 6 и сдай alchemy order; затем отдельно прими судьбу — но её наследие нуждается в модернизации.
- **Дипломированная алхимичка:** В legacy-прототипе сдай school.exam и отдельно прими судьбу; для современной School эта концовка требует Product/runtime переопределения.
- **Самостоятельная Activity-концовка — название OPEN:** Глубоко пройди Large Activity до её будущей самостоятельной финальной ветки; точный маршрут и название ещё не утверждены.

### Stale legacy route (not a 1.0 recommendation)

- **Бригадир поневоле — legacy:** Не ориентируйся на эту legacy-судьбу как на 1.0 маршрут: текущий прототип открывает её после 24 old Lumber visits, но D17 её смысл supersede-ит.

---

# 13. Implementation / presentation quick matrix

| Family | Runtime ID | Authority | Implementation | Presentation | Blocker headline |
| --- | --- | --- | --- | --- | --- |
| Лесорубы — Упорный труд | `ending.lumber.hard-work` | LOCKED D16/D21/D22/D26 | EXECUTABLE_MAIN | EXACT_STATIC_MAIN | Product: exact profession→+5 target mapping OPEN. Current hard-work-package fixture contains provisional concrete targets but D35 explicitly leaves mapping OPEN. |
| Satyr Maid — Упорный труд | `ending.satyr-maid.hard-work` | LOCKED D16/D21/D22/D26 | EXECUTABLE_MAIN | EXACT_STATIC_MAIN | Product: exact profession→+5 target mapping OPEN. Current hard-work-package fixture contains provisional concrete targets but D35 explicitly leaves mapping OPEN. |
| Ферма нежити — Упорный труд | `ending.undead-farm.hard-work` | LOCKED D16/D21/D22/D26 | EXECUTABLE_MAIN | EXACT_STATIC_MAIN | Product: exact profession→+5 target mapping OPEN. Current hard-work-package fixture contains provisional concrete targets but D35 explicitly leaves mapping OPEN. |
| Таверна — Упорный труд | `ending.tavern.hard-work` | LOCKED D16/D21/D22/D26 | EXECUTABLE_MAIN | EXACT_STATIC_MAIN | Product: exact profession→+5 target mapping OPEN. Current hard-work-package fixture contains provisional concrete targets but D35 explicitly leaves mapping OPEN. |
| Охотница — Упорный труд | `ending.hunter.hard-work` | LOCKED D16/D21/D22/D26 | EXECUTABLE_MAIN | EXACT_STATIC_MAIN | Product: exact profession→+5 target mapping OPEN. Current hard-work-package fixture contains provisional concrete targets but D35 explicitly leaves mapping OPEN. |
| Стража — Упорный труд | `ending.guard.hard-work` | LOCKED D16/D21/D22/D26 | EXECUTABLE_MAIN | EXACT_STATIC_MAIN | Product: exact profession→+5 target mapping OPEN. Current hard-work-package fixture contains provisional concrete targets but D35 explicitly leaves mapping OPEN. |
| Торговка — Упорный труд | `ending.merchant.hard-work` | LOCKED D16/D21/D22/D26 | EXECUTABLE_MAIN | EXACT_STATIC_MAIN | Product: exact profession→+5 target mapping OPEN. Current hard-work-package fixture contains provisional concrete targets but D35 explicitly leaves mapping OPEN. |
| Дом искусств — Упорный труд | `ending.artist-geisha.hard-work` | LOCKED D16/D21/D22/D26 | EXECUTABLE_MAIN | EXACT_STATIC_MAIN | Product: exact profession→+5 target mapping OPEN. Current hard-work-package fixture contains provisional concrete targets but D35 explicitly leaves mapping OPEN. |
| Ассасин — Упорный труд | `ending.assassin.hard-work` | LOCKED D16/D21/D22/D26 | EXECUTABLE_MAIN | EXACT_STATIC_MAIN | Product: exact profession→+5 target mapping OPEN. Current hard-work-package fixture contains provisional concrete targets but D35 explicitly leaves mapping OPEN. |
| Профессионалка — Упорный труд | `ending.prostitute.hard-work` | LOCKED D16/D21/D22/D26 | EXECUTABLE_MAIN | EXACT_STATIC_MAIN | Product: exact profession→+5 target mapping OPEN. Current hard-work-package fixture contains provisional concrete targets but D35 explicitly leaves mapping OPEN. |
| Лесорубы — Бригадир / Forewoman | `ending.lumber.forewoman` | MIXED: executable + D33/D34 | EXECUTABLE_MAIN_BUT_STALE_GATE | EXACT_STATIC_MAIN | Runtime conditions currently omit D34 trusted-worker >=8 gate; current Lumber machine on main also lacks the full D34 four-stage 1/8/20 topology. |
| Лесорубы — Лесной договор / Forest Compact | `ending.lumber.forest` | MIXED: executable + D34 | EXECUTABLE_MAIN_BUT_STALE_GATE | EXACT_STATIC_MAIN | Current ending condition lacks D34 trusted-worker >=8 gate; exact final world/reward effects OPEN. |
| Satyr Maid — Власть в доме / House Power | `ending.satyr-maid.house-power` | EXECUTABLE; final Product threshold/reward classification partly OPEN | EXECUTABLE_MAIN | EXACT_STATIC_MAIN | Product: final exact threshold and modern Meta classification/disposition of +600 starting money. |
| Satyr Maid — Партнёр / личная сеть (Favourite / Partner / Personal Network) | — | DRAFT-DESIGNED | DESIGNED_NO_ENDING_ID | NONE_NO_RUNTIME_ID | Product: exact route/gates/reward; Content: authored route; Runtime: no ending ID/conditions/presentation. |
| Satyr Maid — Мастерство границ / Boundary Mastery | `ending.satyr-maid.boundary-mastery` | EXECUTABLE; final Product threshold partly OPEN | EXECUTABLE_MAIN | EXACT_STATIC_MAIN | Product: final exact threshold/classification; otherwise route is executable. |
| Ферма нежити — Исследовательница / Research Farmer | `ending.undead-farm.research-farmer` | EXECUTABLE; draft numbers partly OPEN | EXECUTABLE_MAIN | EXACT_STATIC_MAIN | Product: final threshold/reward. |
| Ферма нежити — Преемница / Farm Successor | `ending.undead-farm.successor` | EXECUTABLE; draft numbers partly OPEN | EXECUTABLE_MAIN | EXACT_STATIC_MAIN | Product: final threshold/reward. |
| Ферма нежити — Внешняя аномалия | — | DRAFT-DESIGNED | DESIGNED_NO_ENDING_ID | NONE_NO_RUNTIME_ID | Product: exact gates/reward; Content/runtime: complete authored chain and ending identity. |
| Таверна — Хозяйка / Innkeeper | `tavern-stay` | LEGACY EXECUTABLE mapped to current designed family | EXECUTABLE_MAIN_LEGACY_ID | EXACT_STATIC_MAIN | Product/runtime cleanup: canonicalize route/ID/reward; remove stale old +5 claim. |
| Таверна — Информационный брокер | `tavern-court` | LEGACY EXECUTABLE mapped to current designed family; D23 limits Palace meaning | EXECUTABLE_MAIN_LEGACY_ID | EXACT_STATIC_MAIN | Stale title/reward semantics; D23 forbids old Palace shortcut; final permanent reward OPEN. |
| Таверна — Убежище / Sanctuary | `tavern-guild` | LEGACY EXECUTABLE mapped to current designed family | EXECUTABLE_MAIN_LEGACY_ID | EXACT_STATIC_MAIN | Canonical reward/ID and final route tuning OPEN. |
| Охотница — Мастер-охотница | — | DRAFT-DESIGNED | DESIGNED_NO_ENDING_ID | NONE_NO_RUNTIME_ID | Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity. |
| Охотница — Хранительница / Warden | — | DRAFT-DESIGNED | DESIGNED_NO_ENDING_ID | NONE_NO_RUNTIME_ID | Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity. |
| Охотница — Легенда | — | DRAFT-DESIGNED | DESIGNED_NO_ENDING_ID | NONE_NO_RUNTIME_ID | Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity. |
| Стража — Офицер | — | DRAFT-DESIGNED | DESIGNED_NO_ENDING_ID | NONE_NO_RUNTIME_ID | Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity. |
| Стража — Реформа | — | DRAFT-DESIGNED | DESIGNED_NO_ENDING_ID | NONE_NO_RUNTIME_ID | Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity. |
| Стража — Сеть / коррупционная сеть | — | DRAFT-DESIGNED | DESIGNED_NO_ENDING_ID | NONE_NO_RUNTIME_ID | Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity. |
| Стража — Большое дело / Major Case | — | DRAFT-DESIGNED | DESIGNED_NO_ENDING_ID | NONE_NO_RUNTIME_ID | Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity. |
| Торговка — Торговый дом / Merchant House | — | DRAFT-DESIGNED | DESIGNED_NO_ENDING_ID | NONE_NO_RUNTIME_ID | Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity. |
| Торговка — Спекулянтка / контрабандистка | — | DRAFT-DESIGNED | DESIGNED_NO_ENDING_ID | NONE_NO_RUNTIME_ID | Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity. |
| Торговка — Покровительница путей / Patron of Routes | — | DRAFT-DESIGNED | DESIGNED_NO_ENDING_ID | NONE_NO_RUNTIME_ID | Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity. |
| Дом искусств — Мастер искусства / Master Artist | — | DRAFT-DESIGNED | DESIGNED_NO_ENDING_ID | NONE_NO_RUNTIME_ID | Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity. |
| Дом искусств — Сеть покровителей / Patron Network | — | DRAFT-DESIGNED | DESIGNED_NO_ENDING_ID | NONE_NO_RUNTIME_ID | Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity. |
| Дом искусств — Придворное приглашение | — | DRAFT-DESIGNED | DESIGNED_NO_ENDING_ID | NONE_NO_RUNTIME_ID | Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity. |
| Ассасин — Призрак / Ghost | — | DRAFT-DESIGNED | DESIGNED_NO_ENDING_ID | NONE_NO_RUNTIME_ID | Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity. |
| Ассасин — Перехват сети / Handler Takeover | — | DRAFT-DESIGNED | DESIGNED_NO_ENDING_ID | NONE_NO_RUNTIME_ID | Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity. |
| Ассасин — Отказ / перебежчица / Turncoat | — | DRAFT-DESIGNED | DESIGNED_NO_ENDING_ID | NONE_NO_RUNTIME_ID | Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity. |
| Профессионалка — Независимый дом | — | DRAFT-DESIGNED | DESIGNED_NO_ENDING_ID | NONE_NO_RUNTIME_ID | Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity. |
| Профессионалка — Элитная клиентура | — | DRAFT-DESIGNED | DESIGNED_NO_ENDING_ID | NONE_NO_RUNTIME_ID | Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity. |
| Профессионалка — Сеть / защита | — | DRAFT-DESIGNED | DESIGNED_NO_ENDING_ID | NONE_NO_RUNTIME_ID | Product: exact eligibility thresholds/reward; Content: final authored ending chain/copy; Runtime: no current ending ID; Presentation: no current ending identity. |
| Secret Debt — Выкупленная свобода / Paid Freedom | — | LOCKED D15/D19/D30/D32 | LOCKED_NO_CURRENT_MAIN_RUNTIME (off-main producer candidate exists) | NONE_CURRENT_MAIN; off-main candidate had presentation | Runtime/integration: Secret Debt absent from current main. Product remains OPEN only for hidden shift gains/wage, not Paid Freedom numbers. |
| Secret Debt — Связанная жизнь / Bound Life | — | LOCKED D19/D30/D32 | LOCKED_NO_CURRENT_MAIN_RUNTIME (off-main producer candidate exists) | NONE_CURRENT_MAIN; off-main candidate had presentation | Runtime/integration Secret Debt; exact hidden shift gains/wage still Product OPEN. |
| Secret Debt — Перехват власти / Takeover | — | PARTLY LOCKED D19/D20/D30/D32 | LOCKED_BUT_PRODUCT_AND_RUNTIME_BLOCKED | NONE_CURRENT_MAIN; off-main candidate had presentation | Product: exact hidden shift gains, wage coefficients, Takeover progression-stat/Lust thresholds. Runtime/integration: Secret Debt absent current main. |
| Дворец — Служебная жизнь / Service Life | — | LOCKED TOPOLOGY D23/D29; exact reward/content partly OPEN | LOCKED_CONTRACT_NO_CURRENT_MAIN_PALACE_CAREER | NONE_CURRENT_MAIN | Content/runtime: Palace career/actions/outcome scenes integration; Product: exact reward and exact daily cadence. |
| Дворец — Дворцовая власть / Court Power | — | LOCKED TOPOLOGY D23/D29; exact reward/content partly OPEN | LOCKED_CONTRACT_NO_CURRENT_MAIN_PALACE_CAREER | NONE_CURRENT_MAIN | Product/content: exact prep requirements/reward; Runtime: Palace absent current main. |
| Дворец — Внутренняя истина / Inner Truth | — | LOCKED TOPOLOGY D23/D29; exact reward/content partly OPEN | LOCKED_CONTRACT_NO_CURRENT_MAIN_PALACE_CAREER | NONE_CURRENT_MAIN | Product: exact knowledge prerequisites/reward; Content/runtime Palace route. |
| Дворец — Возвращение домой / True Ending | — | LOCKED D18/D23/D24/D29 | LOCKED_NO_CURRENT_MAIN_ENDING; shared cap consumer partly prepared | NONE_CURRENT_MAIN | Runtime/content: Palace career, confrontation and ending integration; Product: exact confrontation mechanics/lore/UI, but eligibility/reward numbers locked. |
| Своя в артели | `guild-life` | LEGACY EXECUTABLE; not modern Product ending authority | EXECUTABLE_MAIN_STALE | EXACT_STATIC_MAIN | Product: decide retain/retire/modernize global ending. Runtime/UI text currently overstates reward relative to modern NightFlow. |
| Дипломированная алхимичка | `scholar-life` | LEGACY EXECUTABLE; modern School reward mismatch | EXECUTABLE_MAIN_STALE | EXACT_STATIC_MAIN | Product/runtime: decide modern education-ending contract and typed School reward; stale description/reward consumer split. |
| Самостоятельная Activity-концовка — название OPEN | — | REQUIRED BY LARGE_ACTIVITY_PRODUCT_ROLE; ID/name/gates OPEN | REQUIRED_UNDEFINED | NONE_NO_RUNTIME_ID | Product: exact identity/route/reward; Content: authored Activity ending; Runtime/presentation: ending identity and integration. |
| Бригадир поневоле — legacy | `lumber-stay` | STALE EXECUTABLE; conflicts with D17/D21/D27 | EXECUTABLE_MAIN_CONFLICTING_STALE | EXACT_STATIC_MAIN | Must retire/migrate/re-author: D17 locks Lumber Hard Work=50; D21/D22 define modern Hard Work reward; broad +1 Energy cannot survive silently outside D27. |

---

# 14. Bottom line

For a player today, the most reliable modern rule is:

- **ordinary Hard Work:** 50 shifts, explicit commit, permanent future profession access + selectable package whose exact stat target is still Product-open;
- **complex ordinary endings:** some starter-career families are executable, most later-career families are still designed but lack ending IDs;
- **Secret Debt:** three routes and exact Meta rewards are strongly locked, but not integrated into current main;
- **Palace:** four outcomes are locked structurally; D23/D29/D18/D24 define the route, but gameplay ending IDs are not current-main yet;
- **Activity:** one standalone ending is required but intentionally unnamed/undefined;
- **relationships:** currently contribute to career outcomes; no standalone current relationship-ending ID exists;
- **legacy global endings:** remain executable but require 1.0 modernization/retirement decisions.

The CSV is the machine-readable source for every row in this Atlas.
