# Old-Boundary Route Presentation Copy Final Review v6

Status: final RU-source + full EN presentation review for exact current route `forest.route.old-boundary`.

Current route state:
`old-boundary`.

Semantic presentation ID:
`activity/forest/route/old-boundary`.

Current gameplay gate remains external to presentation:
`itemCapability(enter_old_boundary) present=true`.

## Final reviewed copy

| Key | RU | EN |
| --- | --- | --- |
| `forestRouteScene.forest.route.old-boundary.stones.text` | Первый межевой камень почти целиком ушёл во мох. Стоит заметить один — и следующий уже легче отличить от обычного валуна. Камни складываются в линию, не совпадающую с новой лесовозной дорогой. | The first boundary stone is almost lost beneath the moss. Once you notice one, the next is easier to distinguish from ordinary rock. The stones form a line that does not follow the newer logging road. |
| `forestRouteScene.forest.route.old-boundary.old-marks.text` | На нескольких стволах видны выветренные зарубки. Они повторяются слишком ровно для случайных повреждений и явно старше нынешних работ. | Several trunks bear weathered cuts. They repeat too regularly to be accidental and are clearly older than the current logging work. |
| `forestRouteScene.forest.route.old-boundary.clearing.text` | Деревья отступают от узкой полосы каменистой земли. Границу создаёт не преграда, а повторение: камень, знак, просвет, следующий камень. | The trees pull back from a narrow strip of stony ground. The boundary is made not by a barrier, but by repetition: stone, mark, gap, another stone. |
| `forestRouteScene.forest.route.old-boundary.beyond-markers.text` | За самыми заметными знаками лес выглядит менее обжитым. Старые следы людей ещё встречаются, но современные дороги уже не объясняют, откуда они пришли и куда вели. | Beyond the clearest markers, the forest looks less worked. Old traces of people remain, but modern roads no longer explain where they came from or where they led. |
| `forestRouteScene.forest.route.old-boundary.reaction.text` | Эти знаки настолько старые, что путь приходится скорее читать, чем просто проходить. | The markers are old enough that the route has to be read rather than simply followed. |
| `presentation.activity.forest.route.old-boundary.alt` | Старая межевая линия с замшелыми камнями и выветренными метками. | Old boundary line with moss-covered stones and weathered marks. |
| `presentation.activity.forest.route.old-boundary.caption` | Камни и старые знаки складываются в линию, не совпадающую с новой лесовозной дорогой. | Stones and old markers form a line that does not follow the newer logging road. |
| `activityOption.forest.route.old-boundary.help` | Старый путь по межевым камням и выветренным меткам. | An old route traced by boundary stones and weathered marks. |


## Review result

All copy above is approved because it stays within currently established visual semantics:
- old boundary stones;
- weathered marks;
- a repeated path-boundary line;
- forest less shaped by current logging work.

The copy deliberately does **not** establish:
- token origin;
- token purchase;
- token consumption/retention/turn-in;
- a constructed gate or arch;
- a checkpoint;
- Hunter ownership/knowledge;
- a challenge;
- a hidden reward;
- legal, ritual or magical boundary meaning;
- a deeper lore truth.

## Current choice label

Existing shipped key:
`activityOption.forest.route.old-boundary.label`.

Current RU:
`Старая межевая тропа`.

Current EN:
`Old boundary path`.

Disposition:
**KEEP_CURRENT**.

The final fixture should reference this current label rather than replace it.

## Help-copy disposition

Final additive help key:
`activityOption.forest.route.old-boundary.help`.

The help line may mention only:
- old route;
- boundary stones;
- weathered marks.

It must not become a gate explanation.

## Visual-language firewall

Player-facing old-boundary copy should never imply a visible constructed gate unless Product later authorizes one.

Words such as:
- gate;
- arch;
- checkpoint;
- lock;
- token slot;
- barrier mechanism

are outside this presentation source.

## Presentation invariance

Presentation lookup after route selection must not:
- change route availability;
- consume or mutate inventory;
- write Save state;
- advance gameplay RNG;
- alter Activity progress/endurance;
- alter success/escape/failure identity;
- alter Lumber Hard Work.

## Final disposition

This exact RU+EN copy is ready for the post-PR50 route presentation fixture.
