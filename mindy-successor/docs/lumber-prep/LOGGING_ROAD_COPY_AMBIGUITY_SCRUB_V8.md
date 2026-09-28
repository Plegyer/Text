# Logging-Road Copy Ambiguity Scrub v8

Status: final ambiguity scrub for all five post-PR54 logging-road presentation fields.

Route:
`forest.route.logging-road`.

Semantic presentation ID:
`activity/forest/route/logging-road`.

## Line-by-line review

| Field | Disposition | Final RU | Final EN | Reason |
| --- | --- | --- | --- | --- |
| title | KEEP | Лесовозная дорога | Logging road | Exact current route meaning; no mechanic or reward implication. |
| body | REVISE | Лесовозная дорога шире соседних троп. Свежие колеи режут грязь, а обрубленные ветви сложены по краям. Следы недавней работы тянутся дальше между деревьями. | The logging road is wider than the nearby trails. Fresh ruts cut through the mud, and trimmed branches lie along the edges. Signs of recent work continue between the trees. | Removes “hard to lose the route,” which could read as a navigation/ease mechanic. |
| help | KEEP | Широкая рабочая дорога со свежими следами лесозаготовок. | A broad work road with fresh signs of logging. | Describes visible route character only. |
| alt | KEEP | Лесовозная дорога с колеями и следами недавних работ. | Logging road with wheel ruts and signs of recent work. | Accessibility description only. |
| caption | REVISE | Вдоль дороги остаются следы работы: колеи, срезанные ветви и метки на деревьях. | Signs of work line the road: wheel ruts, cut branches, and marks on trees. | Removes “route is readable,” avoiding a navigation/challenge implication. |

## Explicit exclusions

The final copy does not imply:
- lower endurance cost;
- faster progress;
- easier route checks;
- challenge success;
- guaranteed safety;
- reward;
- Hunter ownership;
- special item access;
- seasonal mechanical advantage.

## Gameplay firewall

No line changes:
- route availability;
- `setRoute: logging-road`;
- progress/endurance;
- RNG;
- Activity result;
- Save state;
- Lumber Hard Work.

## Final disposition

The two revised fields are already reflected in
`forest-route-localization-delta-v8.fixture.json`.

All five final fields are presentation-only and safe for selective integration.
