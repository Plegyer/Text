# Old-Boundary Copy Ambiguity Scrub v8

Status: final ambiguity scrub for all five post-PR54 old-boundary presentation fields.

Route:
`forest.route.old-boundary`.

Semantic presentation ID:
`activity/forest/route/old-boundary`.

Current gameplay gate remains external:
`itemCapability(enter_old_boundary) present=true`.

## Line-by-line review

| Field | Disposition | Final RU | Final EN | Reason |
| --- | --- | --- | --- | --- |
| title | KEEP | Старая межевая тропа | Old boundary path | Exact current route identity; does not explain the gate. |
| body | KEEP | Первый межевой камень почти целиком ушёл во мох. Стоит заметить один — и следующий уже легче отличить от обычного валуна. Камни складываются в линию, не совпадающую с новой лесовозной дорогой. | The first boundary stone is almost lost beneath the moss. Once you notice one, the next is easier to distinguish from ordinary rock. The stones form a line that does not follow the newer logging road. | Established stones/line semantics only. |
| help | KEEP | Старый путь по межевым камням и выветренным меткам. | An old route traced by boundary stones and weathered marks. | No token/gate/provider implication. |
| alt | KEEP | Старая межевая линия с замшелыми камнями и выветренными метками. | Old boundary line with moss-covered stones and weathered marks. | Visible-content description only. |
| caption | KEEP | Камни и старые знаки складываются в линию, не совпадающую с новой лесовозной дорогой. | Stones and old markers form a line that does not follow the newer logging road. | Describes the physical pattern without lore attribution. |

## Forbidden implications checked

No final line implies:
- a constructed gate/arch/checkpoint;
- token insertion, payment, consumption, retention or turn-in;
- Hunter ownership/provider;
- magical/ritual activation;
- legal/territorial authority;
- challenge success;
- hidden reward;
- deeper lore truth.

## Visual-language boundary

Safe nouns:
- stones;
- marks;
- path;
- line;
- moss;
- older traces.

Unsafe additions without Product approval:
- gate;
- key;
- lock;
- checkpoint;
- shrine;
- Hunter sign;
- portal.

## Gameplay firewall

Presentation copy does not alter:
- existing capability gate;
- inventory;
- route state;
- progress/endurance;
- RNG;
- result continuation;
- Save;
- Lumber Hard Work.

## Final disposition

No wording correction is required beyond the exact values already carried in
`forest-route-localization-delta-v8.fixture.json`.
