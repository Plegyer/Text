# Cheap / Recovery Scene-Depth Bank v2

Status: refined presentation-only RU-source + full EN copy for exact current **cheap lodging and recovery** ordinary-poverty identities.

Current-main baseline:
`54131488c65302f81b3001abaaa345d21f0281e2`.

No event/variant/choice/mechanic ID is created.

## `poverty-cheap-production.shared-quiet-autumn` / `default`

### Candidate `a`

Key:
`presentation.poverty.depth.poverty-cheap-production-shared-quiet-autumn.default.a.text`.

RU:
`В дешёвой комнате разговор стихает рано. Через тонкие стены слышны шаги и кашель, и жильцы стараются не добавлять лишнего шума.`

EN:
`Conversation dies down early in the cheap room. Footsteps and coughs carry through the thin walls, and the residents try not to add more noise.`

### Candidate `b`

Key:
`presentation.poverty.depth.poverty-cheap-production-shared-quiet-autumn.default.b.text`.

RU:
`Комната тесная, и вещи приходится держать рядом с собой. К вечеру жильцы молча распределяют оставшиеся свободные углы.`

EN:
`The room is cramped, and belongings have to stay close. By evening, the residents quietly divide the remaining free corners.`

## `poverty-cheap-production-v2.shared-room-seasons` / `spring-window`

### Candidate `a`

Key:
`presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.spring-window.a.text`.

RU:
`Из приоткрытого окна тянет прохладой. Под раму подложили старую кружку, и первый мягкий вечер проветривает всю комнату.`

EN:
`Cool air comes through the partly open window. An old cup has been wedged under the frame, letting the first mild evening air through the room.`

## `poverty-cheap-production-v2.shared-room-seasons` / `summer-heat`

### Candidate `b`

Key:
`presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.summer-heat.b.text`.

RU:
`После жаркого дня каждый старается оставить вокруг постели немного воздуха. Окно остаётся открытым для всей комнаты.`

EN:
`After a hot day, everyone tries to leave a little air around their bedroll. The window stays open for the whole room.`

## `poverty-cheap-production-v2.shared-room-seasons` / `winter-stove`

### Candidate `c`

Key:
`presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.winter-stove.c.text`.

RU:
`Маленькая печь потрескивает в углу, а на свободных крючках сушится одежда. В комнате тесно, но заметно теплее, чем снаружи.`

EN:
`A small stove ticks in the corner while clothes dry from spare hooks. The room is crowded, but noticeably warmer than outside.`

## `poverty-cheap-production-v2.shared-room-seasons` / `shared-room`

### Candidate `d`

Key:
`presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.shared-room.d.text`.

RU:
`Здесь мало места и почти нет уединения, зато есть крыша, закрывающаяся дверь и сухой угол на ночь.`

EN:
`There is little space and almost no privacy, but there is a roof, a closing door, and a dry corner for the night.`

## `poverty-recovery-production.small-coin-help` / `default`

### Candidate `a`

Key:
`presentation.poverty.depth.poverty-recovery-production-small-coin-help.default.a.text`.

RU:
`На общественной полке лежит бумажный свёрток с вчерашним хлебом. Рядом оставлены несколько мелких монет без подписи.`

EN:
`A paper parcel of yesterday’s bread rests on a public shelf. A few small coins have been left beside it without a name.`

### Candidate `b`

Key:
`presentation.poverty.depth.poverty-recovery-production-small-coin-help.default.b.text`.

RU:
`Возле корзины с бесплатным хлебом кто-то оставил немного мелочи. Никакой записки, имени или просьбы рядом нет.`

EN:
`Someone has left a little loose change beside a basket of free bread. There is no note, name, or request beside it.`

## `poverty-recovery-production.short-cleanup` / `default`

### Candidate `a`

Key:
`presentation.poverty.depth.poverty-recovery-production-short-cleanup.default.a.text`.

RU:
`Хозяин закрывающейся лавки просит сложить пару табуретов и подмести у порога. Работы всего на несколько минут.`

EN:
`The owner of a closing stall asks for two stools to be stacked and the doorstep swept. It is only a few minutes of work.`

### Candidate `b`

Key:
`presentation.poverty.depth.poverty-recovery-production-short-cleanup.default.b.text`.

RU:
`После закрытия нужно вынести ведро к стоку и убрать узкую полосу пола. Небольшая работа ещё ждёт желающего.`

EN:
`After closing, a bucket needs carrying to the drain and a narrow strip of floor needs cleaning. A small task is still available.`

## `poverty-recovery-production.herb-bundle` / `default`

### Candidate `a`

Key:
`presentation.poverty.depth.poverty-recovery-production-herb-bundle.default.a.text`.

RU:
`У пустого ящика лежит перевязанный пучок обычных трав. Похоже, его забыли после рынка.`

EN:
`A tied bundle of ordinary herbs lies beside an empty crate. It looks as though it was forgotten after the market.`

### Candidate `b`

Key:
`presentation.poverty.depth.poverty-recovery-production-herb-bundle.default.b.text`.

RU:
`На краю прилавка остался небольшой пучок простых трав, стянутый обычной бечёвкой. Никакой особой метки на нём нет.`

EN:
`A small bundle of common herbs remains at the edge of a stall, tied with ordinary string. There is no special mark on it.`

## Semantic constraints

Cheap-lodging depth may describe:
- cramped shared space;
- season-appropriate room details;
- ordinary shelter.

Recovery depth may describe:
- small anonymous help;
- short ordinary cleanup;
- common herbs.

It must not:
- add recovery bonuses;
- alter lodging cost;
- alter housing;
- state guaranteed money/item gain before choice;
- create relationship progress;
- create Secret Debt semantics.

## Deterministic-use rule

Candidates are presentation-only children of exact existing event/variant identities.

No gameplay RNG or Save write is used.
