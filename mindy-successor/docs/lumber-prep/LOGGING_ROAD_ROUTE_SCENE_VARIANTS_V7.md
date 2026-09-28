# Logging-Road Route Scene Variants v7

Status: six concise RU-source + full EN effect-free presentation variants for the exact current route `forest.route.logging-road`.

Semantic presentation ID:
`activity/forest/route/logging-road`.

No route availability, progress, endurance, result, reward, RNG or Save change.

## Variant 1 — Fresh ruts

RU:
`Свежие колеи режут мягкую землю, а срезанные ветви лежат вдоль дороги. Здесь лес отступил перед работой.`

EN:
`Fresh wheel ruts cut through soft ground, and trimmed branches lie along the road. Here the forest has given way to work.`

## Variant 2 — Timber clearing

RU:
`За поворотом открывается просека со штабелями брёвен. Кора и щепа втоптаны в землю между следами сапог.`

EN:
`A turn opens onto a clearing stacked with timber. Bark and wood chips are ground into the soil between boot marks.`

## Variant 3 — Work marks

RU:
`На стволах у обочины остались мел и старые зарубки. Одни метки ведут к законченной работе, другие обрываются без объяснений.`

EN:
`Chalk and old cuts remain on trunks beside the road. Some marks lead toward finished work; others simply stop.`

## Variant 4 — Narrowing road

RU:
`Широкая лесовозная дорога постепенно сужается. Колеи бледнеют, трава возвращается между ними, а рабочая площадка остаётся позади.`

EN:
`The broad logging road gradually narrows. The ruts fade, grass returns between them, and the worksite falls behind.`

## Variant 5 — Empty work road

RU:
`Людей не видно, но следы работы повсюду: пни, ровные колеи, сложенные ветви и затёртые метки на коре.`

EN:
`Nobody is in sight, but signs of work are everywhere: stumps, even ruts, stacked branches, and worn marks on bark.`

## Variant 6 — Road into forest

RU:
`Дорога всё ещё понятна без указателей. Колеи и расчистка ведут дальше, даже когда лес начинает закрываться вокруг.`

EN:
`The road is still readable without signs. Ruts and cleared ground lead onward even as the forest begins to close around it.`

## Effect-free rule

Every variant describes only visible route atmosphere.

No variant may imply:
- lower endurance cost;
- higher progress;
- safer outcome;
- guaranteed success;
- reward;
- hidden item;
- Hunter source;
- challenge trigger.

## Locale rule

RU and EN for a chosen presentation variant share one locale-neutral candidate identity.

Switching locale changes only the displayed text.

## Fallback rule

If route-specific presentation is unavailable, use shipped neutral:
`activity/forest/route/default`.

The gameplay route remains `forest.route.logging-road` either way.
