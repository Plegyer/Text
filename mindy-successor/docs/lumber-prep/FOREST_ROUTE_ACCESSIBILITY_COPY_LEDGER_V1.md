# Forest Route Accessibility Copy Ledger v1

Status: final RU+EN accessibility/presentation coverage for the current Forest route family.

Current main:
`295e6fc74d235f0b7555794555a18373451e8b7e`.

## Coverage ledger

| Semantic presentation | Title | Body | Help | Alt | Caption |
| --- | --- | --- | --- | --- | --- |
| `activity/forest/route/default` | current Activity title: `activity.lumber.forest.label` — RU “Лесная экспедиция лесоруба”, EN “Lumber Forest Activity” | no dedicated default-route body key on current main | no dedicated active default-route help key; pre-entry helper remains `ui.explore.activityHelp` | `presentation.static.forest.route.default.alt` — complete RU+EN | `presentation.static.forest.route.default.caption` — complete RU+EN |
| `activity/forest/route/logging-road` | `presentation.activity.forest.route.logging-road.title` | `presentation.activity.forest.route.logging-road.body` | `presentation.activity.forest.route.logging-road.help` | `presentation.activity.forest.route.logging-road.alt` | `presentation.activity.forest.route.logging-road.caption` |
| `activity/forest/route/old-boundary` | `presentation.activity.forest.route.old-boundary.title` | `presentation.activity.forest.route.old-boundary.body` | `presentation.activity.forest.route.old-boundary.help` | `presentation.activity.forest.route.old-boundary.alt` | `presentation.activity.forest.route.old-boundary.caption` |

All ten route-specific keys above have final RU+EN values in:
`forest-route-localization-delta-v8.fixture.json`.

## Default fallback behavior

### Before route selection

Authoritative route state:
`null` / no selected route.

Required semantic presentation:
`activity/forest/route/default`.

Current root slot exists and uses:
`assets/presentation/forest-route-default-v1.svg`.

Use current default alt/caption.

Do not use logging-road or old-boundary copy before gameplay selects that route.

### After logging-road selection

Authoritative route state:
`logging-road`.

Preferred semantic presentation:
`activity/forest/route/logging-road`.

If a route-specific slot/source is unavailable:
fall back visually to
`activity/forest/route/default`
without changing the gameplay route state.

Route-specific title/body/help may be rendered only when the consumer intentionally supports that semantic presentation ID.

### After old-boundary selection

Authoritative route state:
`old-boundary`.

Preferred semantic presentation:
`activity/forest/route/old-boundary`.

If route-specific source is absent or rejected:
fall back visually to
`activity/forest/route/default`.

Do not replace the gameplay state with default.

## Accessibility semantics

Alt text must:
- describe visible route content;
- avoid mechanics/reward claims;
- avoid hidden lore;
- avoid token/gate implications.

Caption may add restrained context but must remain presentation-only.

## Old-boundary accessibility firewall

Approved visible semantics:
- mossed boundary stones;
- weathered marks;
- older line/path through forest.

Do not mention in alt/caption:
- token;
- gate/lock/checkpoint;
- Hunter;
- magic;
- challenge reward;
- hidden destination.

## Locale invariance

RU and EN use:
- the same gameplay route ID;
- the same route state;
- the same semantic presentation ID;
- the same media candidate.

Only localized title/body/help/alt/caption differ.

## Ledger conclusion

Default accessibility coverage is already shipped for static alt/caption.

Logging-road and old-boundary have complete final RU+EN title/body/help/alt/caption source ready for the shared route presentation seam.
