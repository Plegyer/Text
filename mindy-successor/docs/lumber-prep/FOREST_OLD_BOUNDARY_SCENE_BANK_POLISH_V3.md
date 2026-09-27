# Forest Old-Boundary Scene Bank Polish v3

Status: concise RU+EN presentation polish for existing route identity `forest.route.old-boundary`.

No route ID, gate, token acquisition/use, Hunter semantics, challenge rule, reward or deeper lore truth is changed or defined.

Semantic presentation ID:
`activity/forest/route/old-boundary`.

Current authoritative route gate remains external to this prose:
`itemCapability(enter_old_boundary) present=true`.

## Final UI-ready copy

| Existing key | Final RU | Final EN |
| --- | --- | --- |
| `forestRouteScene.forest.route.old-boundary.stones.text` | Первый межевой камень почти целиком ушёл во мох. Стоит заметить один — и следующий уже легче отличить от обычного валуна. Камни складываются в линию, не совпадающую с новой лесовозной дорогой. | The first boundary stone is almost lost beneath the moss. Once you notice one, the next is easier to distinguish from ordinary rock. The stones form a line that does not follow the newer logging road. |
| `forestRouteScene.forest.route.old-boundary.old-marks.text` | На нескольких стволах видны выветренные зарубки. Они повторяются слишком ровно для случайных повреждений и явно старше нынешних работ. | Several trunks bear weathered cuts. They repeat too regularly to be accidental and are clearly older than the current logging work. |
| `forestRouteScene.forest.route.old-boundary.clearing.text` | Деревья отступают от узкой полосы каменистой земли. Границу создаёт не преграда, а повторение: камень, знак, просвет, следующий камень. | The trees pull back from a narrow strip of stony ground. The boundary is made not by a barrier, but by repetition: stone, mark, gap, another stone. |
| `forestRouteScene.forest.route.old-boundary.beyond-markers.text` | За самыми заметными знаками лес выглядит менее обжитым. Старые следы людей ещё встречаются, но современные дороги уже не объясняют, откуда они пришли и куда вели. | Beyond the clearest markers, the forest looks less worked. Old traces of people remain, but modern roads no longer explain where they came from or where they led. |
| `forestRouteScene.forest.route.old-boundary.reaction.text` | Эти знаки настолько старые, что путь приходится скорее читать, чем просто проходить. | The markers are old enough that the route has to be read rather than simply followed. |

## Polish notes

The v3 pass:
- removes implementation-language references to the capability gate from player-facing prose;
- keeps the scene ambiguous about who made the boundary and why;
- avoids claiming the boundary is legal, ritual, magical, territorial or Hunter-owned;
- introduces no acquisition, price, consume, retain or turn-in rule for `old_boundary_token`;
- keeps the route visually distinct from the logging road.

## Token firewall

This scene bank does **not** answer:
- where the token comes from;
- whether it is bought;
- whether it is consumed;
- whether it is retained;
- whether it is surrendered;
- whether it has any deeper Forest use.

Those remain Product-open.

## Presentation boundary

Any future scene selection occurs only after the existing route gate and route selection have already been resolved by authoritative gameplay.

Presentation must not change:
- route availability;
- Activity progress;
- endurance;
- RNG;
- save state;
- result identity;
- exact `activityResult` continuation.

The bank is ready as presentation source after the shared route-state -> presentationId seam exists.
