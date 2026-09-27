# Bilingual GIF Producer Batch — Ten Careers v1

Purpose / Назначение:
producer-ready RU+EN presentation cards for the already-authored base-shift media pools of all 10 ordinary careers.

Product localization invariant:
- one semantic presentationId;
- one shared GIF candidate/media path;
- RU + EN player-facing context and alt;
- no duplicated GIF asset per language;
- no locale-specific mechanics or save identity.

## Shared producer rules / Общие правила

- Initial pool: **3 GIF candidates** per career family; may expand to 4–5.
- Candidate keys are locale-neutral.
- GIF paths are locale-neutral.
- RU is source authoring; EN is full localization.
- Seasonal environment can vary under existing spring/summer/autumn/winter semantic IDs.
- A candidate must never imply a different gameplay reward/outcome.


## Lumber

**Semantic family / Семантическое семейство**

`job/lumber/shift/<season>/default`

**RU context / Контекст RU**

Обычная сезонная смена лесорубов: работа с древесиной, инструментами и рабочей площадкой без отдельного сюжетного исхода.

**EN context**

An ordinary seasonal lumber shift: timber, tools and worksite activity without a separate narrative outcome.

**Locale-neutral visual brief / Локально-независимое визуальное ТЗ — RU**

Показывать рутинную физическую работу и сезонную среду; не показывать уникальную встречу, повышение, концовку или отдельный маршрут.

**Locale-neutral visual brief — EN**

Show routine physical work and seasonal environment; do not imply a unique encounter, promotion, ending or separate route.

**Current static fallback / Текущий статический fallback**

`assets/stage-lumber.svg`

**Initial shared pool / Начальный общий pool: 3 candidates**

1. **lumber-handle**
   - RU alt: На рабочей площадке переносят и укладывают древесину.
   - EN alt: Timber is carried and stacked around the worksite.
2. **lumber-tools**
   - RU alt: Инструменты проверяют и готовят к обычной смене.
   - EN alt: Tools are checked and prepared for an ordinary shift.
3. **lumber-cleanup**
   - RU alt: Рабочую площадку приводят в порядок между этапами смены.
   - EN alt: The worksite is tidied between parts of the shift.

Optional candidates 4–5 / Опциональные кандидаты 4–5: добавлять только как дополнительную визуальную вариативность той же обычной смены, без нового gameplay outcome.

## Satyr Maid

**Semantic family / Семантическое семейство**

`job/satyr-maid/shift/<season>/default`

**RU context / Контекст RU**

Обычная сезонная смена в баре сатиров: обслуживание столов, подготовка зала и уборка без отдельного сюжетного исхода.

**EN context**

An ordinary seasonal shift at the satyr bar: table service, room preparation and cleanup without a separate narrative outcome.

**Locale-neutral visual brief / Локально-независимое визуальное ТЗ — RU**

Показывать нейтральную работу в зале; не закреплять внешность именованных гостей, отношения, ночную сцену или повышение.

**Locale-neutral visual brief — EN**

Show neutral service work; do not establish a named guest appearance, relationship, Night scene or promotion.

**Current static fallback / Текущий статический fallback**

`assets/stage-tavern.svg`

**Initial shared pool / Начальный общий pool: 3 candidates**

1. **satyr-service**
   - RU alt: Заказы разносят между столами в обычную смену.
   - EN alt: Orders are carried between tables during an ordinary shift.
2. **satyr-reset**
   - RU alt: После гостей стол приводят в порядок для следующего обслуживания.
   - EN alt: A table is reset after guests for the next service.
3. **satyr-prep**
   - RU alt: Зону обслуживания готовят к новым посетителям.
   - EN alt: The service area is prepared for new visitors.

Optional candidates 4–5 / Опциональные кандидаты 4–5: добавлять только как дополнительную визуальную вариативность той же обычной смены, без нового gameplay outcome.

## Undead Farm

**Semantic family / Семантическое семейство**

`job/undead-farm/shift/<season>/default`

**RU context / Контекст RU**

Обычная сезонная производственная смена на ферме нежити: уход, сортировка и обслуживание без отдельной аномалии или сюжетного исхода.

**EN context**

An ordinary seasonal production shift on the undead farm: tending, sorting and maintenance without a separate anomaly or narrative outcome.

**Locale-neutral visual brief / Локально-независимое визуальное ТЗ — RU**

Показывать повторяемую фермерскую работу; не показывать уникальное открытие, исследовательский результат, отношения или концовку.

**Locale-neutral visual brief — EN**

Show repeatable farm work; do not imply a unique discovery, research result, relationship or ending.

**Current static fallback / Текущий статический fallback**

`assets/stage-forest.svg`

**Initial shared pool / Начальный общий pool: 3 candidates**

1. **farm-tend**
   - RU alt: Рабочий участок фермы проверяют и обслуживают в ходе обычной смены.
   - EN alt: A farm work area is checked and tended during an ordinary shift.
2. **farm-sort**
   - RU alt: Собранные материалы сортируют для дальнейшей обработки.
   - EN alt: Gathered materials are sorted for later processing.
3. **farm-maintain**
   - RU alt: Инструменты и рабочее место приводят в порядок между задачами.
   - EN alt: Tools and the work area are maintained between tasks.

Optional candidates 4–5 / Опциональные кандидаты 4–5: добавлять только как дополнительную визуальную вариативность той же обычной смены, без нового gameplay outcome.

## Tavern

**Semantic family / Семантическое семейство**

`job/tavern/shift/<season>/default`

**RU context / Контекст RU**

Обычная сезонная смена в таверне: обслуживание, уборка и перенос припасов без уникального события.

**EN context**

An ordinary seasonal tavern shift: service, cleanup and moving supplies without a unique event.

**Locale-neutral visual brief / Локально-независимое визуальное ТЗ — RU**

Показывать повторяемую работу в таверне; не показывать именованного посетителя, конфликт, отношения или концовку.

**Locale-neutral visual brief — EN**

Show repeatable tavern work; do not imply a named patron, conflict, relationship or ending.

**Current static fallback / Текущий статический fallback**

`assets/stage-tavern.svg`

**Initial shared pool / Начальный общий pool: 3 candidates**

1. **tavern-serve**
   - RU alt: В обычной смене обслуживают столы и разносят заказы.
   - EN alt: Tables are served and orders carried during an ordinary shift.
2. **tavern-clean**
   - RU alt: Зал убирают и готовят к следующему потоку гостей.
   - EN alt: The room is cleaned and prepared for the next group of guests.
3. **tavern-supplies**
   - RU alt: Припасы переносят между складом и зоной обслуживания.
   - EN alt: Supplies are moved between storage and the service area.

Optional candidates 4–5 / Опциональные кандидаты 4–5: добавлять только как дополнительную визуальную вариативность той же обычной смены, без нового gameplay outcome.

## Hunter

**Semantic family / Семантическое семейство**

`job/hunter/shift/<season>/default`

**RU context / Контекст RU**

Обычная местная охотничья смена, отдельная от двухэнергетической экспедиции Activity.

**EN context**

An ordinary local hunting shift, separate from the 2-Energy expedition Activity layer.

**Locale-neutral visual brief / Локально-независимое визуальное ТЗ — RU**

Показывать местную рутинную полевую работу; не показывать экспедиционный checkpoint, редкую находку или отдельный маршрут Activity.

**Locale-neutral visual brief — EN**

Show routine local field work; do not imply an expedition checkpoint, rare find or separate Activity route.

**Current static fallback / Текущий статический fallback**

`assets/stage-forest.svg`

**Initial shared pool / Начальный общий pool: 3 candidates**

1. **hunter-tracks**
   - RU alt: На обычном маршруте проверяют следы и признаки зверя.
   - EN alt: Tracks and signs are checked along an ordinary local route.
2. **hunter-gear**
   - RU alt: Полевое снаряжение проверяют перед продолжением смены.
   - EN alt: Field gear is checked before the shift continues.
3. **hunter-carry**
   - RU alt: Обычные собранные материалы несут по местному лесному маршруту.
   - EN alt: Ordinary gathered materials are carried along a local forest route.

Optional candidates 4–5 / Опциональные кандидаты 4–5: добавлять только как дополнительную визуальную вариативность той же обычной смены, без нового gameplay outcome.

## Guard

**Semantic family / Семантическое семейство**

`job/guard/shift/<season>/default`

**RU context / Контекст RU**

Обычная сезонная смена городской стражи: патруль, пост и проверка повседневного движения.

**EN context**

An ordinary seasonal city-guard shift: patrol, watch duty and routine checks of everyday traffic.

**Locale-neutral visual brief / Локально-независимое визуальное ТЗ — RU**

Показывать рутинную городскую службу; не показывать арест, дворцовое поручение, именованного подозреваемого или кризис.

**Locale-neutral visual brief — EN**

Show routine city duty; do not imply an arrest, Palace assignment, named suspect or crisis.

**Current static fallback / Текущий статический fallback**

`assets/stage-town.svg`

**Initial shared pool / Начальный общий pool: 3 candidates**

1. **guard-patrol**
   - RU alt: Стража проходит обычный участок городского патруля.
   - EN alt: A guard walks an ordinary section of the city patrol.
2. **guard-watch**
   - RU alt: На городском посту несут обычное дежурство.
   - EN alt: Routine watch duty continues at a city post.
3. **guard-check**
   - RU alt: Обычную повозку или проход проверяют без задержания и конфликта.
   - EN alt: An ordinary cart or passage is checked without an arrest or conflict.

Optional candidates 4–5 / Опциональные кандидаты 4–5: добавлять только как дополнительную визуальную вариативность той же обычной смены, без нового gameplay outcome.

## Merchant

**Semantic family / Семантическое семейство**

`job/merchant/shift/<season>/default`

**RU context / Контекст RU**

Обычная сезонная торговая смена: рынок, оценка товара, доставка и переговоры без отдельного исхода сделки.

**EN context**

An ordinary seasonal merchant shift: market work, appraisal, delivery and negotiation without a separate deal outcome.

**Locale-neutral visual brief / Локально-независимое визуальное ТЗ — RU**

Показывать нейтральную торговую работу; не показывать уникальный контракт, редкий предмет, именованного покупателя или итог прибыли.

**Locale-neutral visual brief — EN**

Show neutral merchant work; do not imply a unique contract, rare item, named buyer or profit result.

**Current static fallback / Текущий статический fallback**

`assets/stage-town.svg`

**Initial shared pool / Начальный общий pool: 3 candidates**

1. **merchant-inspect**
   - RU alt: Обычные товары и записи проверяют у торгового места.
   - EN alt: Ordinary goods and records are checked at a market position.
2. **merchant-display**
   - RU alt: Товар раскладывают и готовят к обычной торговле.
   - EN alt: Goods are arranged and prepared for ordinary trade.
3. **merchant-parcel**
   - RU alt: Обычную посылку готовят к передаче или доставке.
   - EN alt: An ordinary parcel is prepared for handoff or delivery.

Optional candidates 4–5 / Опциональные кандидаты 4–5: добавлять только как дополнительную визуальную вариативность той же обычной смены, без нового gameplay outcome.

## Artist / Geisha

**Semantic family / Семантическое семейство**

`job/artist-geisha/shift/<season>/default`

**RU context / Контекст RU**

Обычная сезонная смена в Artist House: репетиция, подготовка пространства и работа с гостями без уникального выступления.

**EN context**

An ordinary seasonal Artist House shift: rehearsal, space preparation and guest-facing work without a unique performance.

**Locale-neutral visual brief / Локально-независимое визуальное ТЗ — RU**

Показывать рутинную репетицию и подготовку; не закреплять именованного покровителя, дворцовое приглашение, отношения или уникальный результат выступления.

**Locale-neutral visual brief — EN**

Show routine rehearsal and preparation; do not establish a named patron, Palace invitation, relationship or unique performance result.

**Current static fallback / Текущий статический fallback**

`assets/stage-tavern.svg`

**Initial shared pool / Начальный общий pool: 3 candidates**

1. **artist-rehearse**
   - RU alt: В обычной смене проходит спокойная репетиция движения или ритма.
   - EN alt: A quiet movement or rhythm rehearsal takes place during an ordinary shift.
2. **artist-prepare**
   - RU alt: Пространство готовят к обычному выступлению или приёму гостей.
   - EN alt: The space is prepared for an ordinary performance or guest reception.
3. **artist-host**
   - RU alt: Гостей встречают в нейтральной рабочей обстановке без отдельного сюжетного исхода.
   - EN alt: Guests are received in a neutral work setting without a separate narrative outcome.

Optional candidates 4–5 / Опциональные кандидаты 4–5: добавлять только как дополнительную визуальную вариативность той же обычной смены, без нового gameplay outcome.

## Assassin

**Semantic family / Семантическое семейство**

`job/assassin/shift/<season>/default`

**RU context / Контекст RU**

Обычная скрытая работа: наблюдение, доставка, подготовка маршрута или уборка следов без именованной цели и исхода контракта.

**EN context**

Ordinary covert work: surveillance, delivery, route preparation or cleanup without a named target or contract outcome.

**Locale-neutral visual brief / Локально-независимое визуальное ТЗ — RU**

Показывать подготовительную и наблюдательную работу; не изображать убийство, именованную цель, итог контракта или дворцовый заговор.

**Locale-neutral visual brief — EN**

Show preparatory and observational work; do not depict a killing, named target, contract outcome or Palace plot.

**Current static fallback / Текущий статический fallback**

`assets/stage-town.svg`

**Initial shared pool / Начальный общий pool: 3 candidates**

1. **assassin-observe**
   - RU alt: Городской маршрут наблюдают с нейтральной точки без видимой цели.
   - EN alt: A city route is observed from a neutral vantage point without a visible target.
2. **assassin-prepare**
   - RU alt: Обычные инструменты или посылку готовят к скрытой работе.
   - EN alt: Ordinary tools or a parcel are prepared for covert work.
3. **assassin-route**
   - RU alt: По городскому маршруту перемещаются без изображения результата задания.
   - EN alt: A city route is traversed without depicting the result of an assignment.

Optional candidates 4–5 / Опциональные кандидаты 4–5: добавлять только как дополнительную визуальную вариативность той же обычной смены, без нового gameplay outcome.

## Prostitute

**Semantic family / Семантическое семейство**

`job/prostitute/shift/<season>/default`

**RU context / Контекст RU**

Обычная добровольная профессиональная смена с сохранением агентности и границ персонажа.

**EN context**

An ordinary voluntary professional shift with the character's agency and boundaries preserved.

**Locale-neutral visual brief / Локально-независимое визуальное ТЗ — RU**

Показывать нейтральную подготовку профессионального пространства и самопрезентацию; не показывать явный сексуальный акт, принуждение, именованного клиента или отдельный исход.

**Locale-neutral visual brief — EN**

Show neutral preparation of the professional setting and self-presentation; do not depict explicit sexual activity, coercion, a named client or a separate outcome.

**Current static fallback / Текущий статический fallback**

`assets/stage-room.svg`

**Initial shared pool / Начальный общий pool: 3 candidates**

1. **professional-room**
   - RU alt: Приватную рабочую комнату готовят перед обычной сменой.
   - EN alt: A private professional room is prepared before an ordinary shift.
2. **professional-reset**
   - RU alt: Предметы в комнате аккуратно приводят в порядок между рабочими эпизодами.
   - EN alt: Items in the room are reset neatly between work periods.
3. **professional-presentation**
   - RU alt: В нейтральной обстановке готовятся к профессиональной встрече без изображения клиента.
   - EN alt: Preparation for a professional meeting takes place in a neutral setting without depicting a client.

Optional candidates 4–5 / Опциональные кандидаты 4–5: добавлять только как дополнительную визуальную вариативность той же обычной смены, без нового gameplay outcome.


## Asset delivery shape / Формат поставки

For each candidate / Для каждого кандидата:

```text
presentationId: <shared locale-neutral semantic ID>
candidateKey: <shared locale-neutral key>
mediaPath: <one shared GIF path>
alt.ru: <Russian source alt>
alt.en: <English alt>
staticFallback: <shared static asset>
```

Do not create / Не создавать:
- `*-ru.gif`;
- `*-en.gif`;
- locale-specific presentation IDs.

## Seasonal reuse / Сезонное переиспользование

A single loop may be reused across several seasons when the visible content remains correct.

Localized alt must still reflect the actual semantic mapping:
- RU alt for that season/context;
- EN alt for the same season/context.

The GIF file may remain the same.

## Acceptance / Приёмка

A ten-career bilingual producer batch passes when:
1. every candidate has RU + EN alt;
2. RU/EN describe the same visible candidate;
3. semantic/media identity is shared;
4. no candidate implies an unchosen gameplay outcome;
5. static fallback remains shared and usable;
6. switching locale does not reroll the selected candidate.
