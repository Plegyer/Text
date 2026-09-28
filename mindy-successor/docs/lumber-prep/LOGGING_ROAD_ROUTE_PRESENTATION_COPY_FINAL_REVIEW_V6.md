# Logging-Road Route Presentation Copy Final Review v6

Status: final RU-source + full EN presentation review for exact current route `forest.route.logging-road`.

Current route state:
`logging-road`.

Semantic presentation ID:
`activity/forest/route/logging-road`.

No route availability, progress, endurance, reward, RNG, result identity, Save or Lumber Hard Work change is proposed.

## Final reviewed copy

| Key | RU | EN |
| --- | --- | --- |
| `forestRouteScene.forest.route.logging-road.wheel-ruts.text` | Лесовозная дорога шире соседних троп. Свежие колеи режут грязь, а обрубленные ветви сложены по краям. Здесь трудно потерять путь: люди уже расчистили лес под дорогу. | The logging road is wider than the nearby trails. Fresh ruts cut through the mud, and trimmed branches lie along the edges. It is hard to lose the route here; people have already cleared a road through the forest. |
| `forestRouteScene.forest.route.logging-road.timber-stack.text` | Дорога выходит к просеке со штабелями брёвен. Ровные стволы сложены отдельно, повреждённые — в стороне, а кора и щепа втоптаны в землю. | The road opens onto a clearing stacked with timber. Straight trunks are kept together, damaged pieces lie apart, and bark and chips are ground into the soil. |
| `forestRouteScene.forest.route.logging-road.work-marks.text` | На деревьях у дороги остались старые меловые метки и зарубки. Одни ведут к уже законченной работе, другие отмечают места, к которым никто не вернулся. | Old chalk marks and axe cuts remain on trees beside the road. Some point toward finished work; others mark places nobody returned to. |
| `forestRouteScene.forest.route.logging-road.narrowing.text` | Построенная дорога постепенно сдаётся лесу. Колеи сужаются до следов, штабеля исчезают, и рабочий порядок растворяется среди деревьев. | The built road gradually gives way to the forest. Wheel ruts narrow into tracks, timber stacks disappear, and the order of the worksite dissolves among the trees. |
| `forestRouteScene.forest.route.logging-road.reaction.text` | По крайней мере, эту дорогу строили так, чтобы по ней можно было идти. | At least this road was built to be followed. |
| `presentation.activity.forest.route.logging-road.alt` | Лесовозная дорога с колеями и следами недавних работ. | Logging road with wheel ruts and signs of recent work. |
| `presentation.activity.forest.route.logging-road.caption` | Здесь путь читается по следам работы: колеям, ветвям и меткам на деревьях. | Here the route is readable through signs of work: wheel ruts, cut branches, and marks on trees. |
| `activityOption.forest.route.logging-road.help` | Широкая рабочая дорога со свежими следами лесозаготовок. | A broad work road with fresh signs of logging. |


## Review result

All logging-road copy above is approved as final for this route-specific presentation slice.

The copy consistently establishes:
- a broad human-made work road;
- wheel ruts and cut branches;
- timber handling;
- ordinary work marks;
- a gradual transition from worked road back into forest.

It does not establish:
- a challenge;
- a threshold;
- a safer/easier mechanical route;
- a reward;
- Hunter ownership;
- School knowledge;
- a hidden lore outcome.

## Current choice label

Existing shipped key:
`activityOption.forest.route.logging-road.label`.

Current RU:
`Лесовозная дорога`.

Current EN:
`Logging road`.

Disposition:
**KEEP_CURRENT**.

The final fixture should reference the current label rather than replace it.

## Help-copy disposition

Final additive help key:
`activityOption.forest.route.logging-road.help`.

The help copy describes visible route character only. It must not be used as:
- a route gate;
- a progress hint;
- a success promise;
- a reward hint.

## Presentation invariance

The reviewed text may be consumed only after authoritative gameplay has already selected:
`forest.route.logging-road`.

Presentation lookup must not change:
- route state;
- resolved option IDs;
- Activity progress;
- endurance;
- global RNG;
- Activity RNG;
- success/escape/failure result;
- reaction continuation.

## Final disposition

This exact RU+EN copy is ready for the post-PR50 route presentation fixture.
