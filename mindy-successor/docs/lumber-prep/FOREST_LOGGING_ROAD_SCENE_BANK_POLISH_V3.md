# Forest Logging-Road Scene Bank Polish v3

Status: concise RU+EN presentation polish for existing route identity `forest.route.logging-road`.

No route ID, route state, condition, progress, endurance, reward, RNG, result identity or media behavior changes.

Semantic presentation ID:
`activity/forest/route/logging-road`.

## Final UI-ready copy

| Existing key | Final RU | Final EN |
| --- | --- | --- |
| `forestRouteScene.forest.route.logging-road.wheel-ruts.text` | Лесовозная дорога шире соседних троп. Свежие колеи режут грязь, а обрубленные ветви сложены по краям. Здесь трудно потерять путь: люди уже расчистили лес под дорогу. | The logging road is wider than the nearby trails. Fresh ruts cut through the mud, and trimmed branches lie along the edges. It is hard to lose the route here; people have already cleared a road through the forest. |
| `forestRouteScene.forest.route.logging-road.timber-stack.text` | Дорога выходит к просеке со штабелями брёвен. Ровные стволы сложены отдельно, повреждённые — в стороне, а кора и щепа втоптаны в землю. | The road opens onto a clearing stacked with timber. Straight trunks are kept together, damaged pieces lie apart, and bark and chips are ground into the soil. |
| `forestRouteScene.forest.route.logging-road.work-marks.text` | На деревьях у дороги остались старые меловые метки и зарубки. Одни ведут к уже законченной работе, другие отмечают места, к которым никто не вернулся. | Old chalk marks and axe cuts remain on trees beside the road. Some point toward finished work; others mark places nobody returned to. |
| `forestRouteScene.forest.route.logging-road.narrowing.text` | Построенная дорога постепенно сдаётся лесу. Колеи сужаются до следов, штабеля исчезают, и рабочий порядок растворяется среди деревьев. | The built road gradually gives way to the forest. Wheel ruts narrow into tracks, timber stacks disappear, and the order of the worksite dissolves among the trees. |
| `forestRouteScene.forest.route.logging-road.reaction.text` | По крайней мере, эту дорогу строили так, чтобы по ней можно было идти. | At least this road was built to be followed. |

## Polish notes

The v3 pass:
- shortens sentence length for dialogue/UI panels;
- removes explanatory phrasing that reads like design commentary;
- keeps the route visibly human-made and work-oriented;
- introduces no hidden route knowledge, threshold or reward;
- remains compatible with the existing `logging-road` route state.

## Presentation boundary

Any future scene choice among these strings must happen after gameplay has already selected `forest.route.logging-road`.

Text variation must not alter:
- Activity progress;
- endurance;
- global or Activity RNG;
- success/escape/failure;
- exact `activityResult` continuation.

The bank is ready as presentation source after the shared route-state -> presentationId seam exists.
