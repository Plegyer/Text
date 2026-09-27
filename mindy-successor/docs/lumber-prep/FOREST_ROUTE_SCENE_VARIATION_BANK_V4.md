# Forest Route Scene Variation Bank v4

Status: effect-free RU+EN presentation variants for the two existing Forest route identities.

Routes:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

These are presentation candidates only. They do not create new gameplay variants, routes, conditions, thresholds, rewards, season rules, Hunter semantics, or token semantics.

Russian is source authoring language; English is the full second locale.

# Logging road

Semantic presentation ID:
`activity/forest/route/logging-road`.

## Variant 1 — fresh ruts

RU:
Свежие колеи блестят в мягкой земле, а по краям дороги ещё лежат ветви, срезанные совсем недавно. Путь читается без труда: здесь лес отступал перед работой.

EN:
Fresh wheel ruts shine in the soft ground, and recently cut branches still lie along the road edges. The route is easy to read here; the forest has been pushed back by work.

## Variant 2 — stacked timber

RU:
За поворотом открывается просека со сложенными брёвнами. Кора, щепа и следы сапог делают место больше похожим на рабочую площадку, чем на лесную тропу.

EN:
A turn opens onto a clearing with stacked logs. Bark, wood chips, and boot marks make the place feel more like a worksite than a forest trail.

## Variant 3 — abandoned mark

RU:
На стволе у обочины осталась старая меловая метка. Рядом нет свежих следов работы, и знак выглядит как память о задаче, до которой так и не дошли.

EN:
An old chalk mark remains on a trunk beside the road. There are no fresh work traces nearby, and the mark feels like a reminder of a task nobody returned to.

## Variant 4 — narrowing track

RU:
Широкая дорога постепенно сужается. Колеи становятся слабее, трава возвращается между следами, а штабеля исчезают за спиной.

EN:
The broad road gradually narrows. The ruts fade, grass returns between the tracks, and the timber stacks disappear behind you.

## Variant 5 — quiet work road

RU:
На дороге никого нет, но работа заметна повсюду: обрезанные ветви, ровные следы колёс, пни у кромки и затёртые метки на коре.

EN:
Nobody is on the road, but the work is visible everywhere: trimmed branches, even wheel tracks, stumps at the edge, and worn marks on bark.

# Old boundary

Semantic presentation ID:
`activity/forest/route/old-boundary`.

## Variant 1 — moss stones

RU:
Первый камень почти скрыт мхом. Второй замечается легче, а третий уже подтверждает, что перед тобой не случайная россыпь, а старая линия.

EN:
The first stone is almost hidden by moss. The second is easier to notice, and the third confirms that this is not random rock but an old line.

## Variant 2 — repeated cuts

RU:
На нескольких деревьях повторяются выветренные зарубки. Они слишком ровные для случайности и слишком старые, чтобы относиться к нынешним работам.

EN:
Weathered cuts repeat across several trees. They are too regular to be accidental and too old to belong to the current logging work.

## Variant 3 — stony gap

RU:
Между деревьями проходит узкая полоса каменистой земли. Ничто не мешает пройти, но повторяющиеся знаки создают ощущение давно проведённой границы.

EN:
A narrow strip of stony ground runs between the trees. Nothing physically blocks the way, but the repeated markers create the sense of an old boundary.

## Variant 4 — line against the road

RU:
Новая лесовозная дорога уходит в одну сторону, а старые камни — в другую. Две системы маршрута существуют рядом, но явно появились в разное время.

EN:
The newer logging road turns one way while the old stones continue another. Two route systems sit beside each other, clearly made at different times.

## Variant 5 — beyond the markers

RU:
За наиболее заметными знаками лес становится тише и менее обжитым. Следы людей ещё встречаются, но уже не объясняются современной дорогой.

EN:
Beyond the clearest markers, the forest becomes quieter and less worked. Human traces remain, but the modern road no longer explains them.

# Integration rule

A presentation variant may be selected only after the authoritative route state is already known.

For every candidate:
- gameplay route ID stays unchanged;
- route state stays unchanged;
- no Activity progress changes;
- no endurance changes;
- no reward changes;
- no gameplay RNG is consumed;
- no save-state field is added;
- RU and EN use the same candidate identity.

# Explicit exclusions

This bank does not define:
- Hunter trail;
- Hunter clue/provider;
- Old Boundary Token acquisition;
- token price;
- token consume/retain/turn-in behavior;
- challenge mechanics;
- route outcomes;
- seasonal mechanical differences;
- School Arcana meaning;
- deeper lore truth.

The variants are atmosphere only.
