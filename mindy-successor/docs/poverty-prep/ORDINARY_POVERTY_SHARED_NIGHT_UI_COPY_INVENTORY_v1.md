# Ordinary Poverty Shared Night/UI Copy Inventory v1

Status: current-main inventory of player-facing lodging/Night text surrounding ordinary-poverty events but living outside the event payloads.

Scope:
- Night panel entry;
- LodgingResolution screen;
- lodging labels;
- VoluntaryNightChoice shell;
- town lodging summary;
- immediately adjacent generic Night text.

Excluded:
- ordinary-poverty event title/body/choice/media-alt fields already covered by the 84-key item-140 delta;
- School-specific Night Study copy;
- Foreman relationship Night copy;
- Secret Debt.

Classification vocabulary:
- **SHIPPED_RU_EN** — current localization bundle already contains a complete RU+EN key and current UI uses that key.
- **RU_FALLBACK_ONLY** — current visible/fallback copy is Russian but no complete RU+EN localization key owns the surface.
- **MISSING** — current surface has no safe complete RU+EN localization ownership.
- **SHARED_UI_OWNER** — surface belongs to shared UI/Night integration and Chat 3 must not edit its renderer directly.

## Already localized and consumed

| Surface | Current source | Classification | Current key |
| --- | --- | --- | --- |
| Town dock lodging button | localized `tr(...)` | SHIPPED_RU_EN | `ui.panel.sleep` |
| Town lodging subtitle | localized `tr(...)` | SHIPPED_RU_EN | `ui.town.sleep.subtitle` |
| Town no-energy lodging prompt | localized `tr(...)` | SHIPPED_RU_EN | `ui.town.noEnergyPrompt` |
| Coin unit reused near rent | localized `tr(...)` | SHIPPED_RU_EN | `ui.work.coins` |

These keys should not be duplicated by Chat 3.

## LodgingResolution shell

| Surface | Current-main visible/fallback source | Classification | Notes |
| --- | --- | --- | --- |
| Eyebrow `Night` | hardcoded English in `app.ts` | SHARED_UI_OWNER | No Chat 3 UI edit. Candidate localization can use a new generic Night key. |
| Heading `Ночлег` | hardcoded Russian in `app.ts` | RU_FALLBACK_ONLY | `ui.panel.sleep` already has RU+EN but this exact renderer does not consume it. Lead may reuse existing key rather than add another. |
| Prompt `Выберите место на эту ночь. Оплата фиксируется ровно один раз.` | hardcoded Russian | RU_FALLBACK_ONLY | Presentation-only sentence; mechanics remain the same. |
| Lodging cost unit `монет` | hardcoded inside LodgingResolution | RU_FALLBACK_ONLY | Existing `ui.work.coins` already has RU+EN and is the safest reuse. |
| Next-day Energy suffix `энергия завтра {delta}` | hardcoded Russian | RU_FALLBACK_ONLY | Needs shared UI interpolation key; no gameplay change. |
| Lodging option button label | `definitions.json -> lodging.label` | MISSING | Current values are English-only data labels; safe future localization should key by locale-neutral lodging ID. |

## Current lodging labels

| Gameplay ID | Current fallback label | Classification | Safe proposed presentation key |
| --- | --- | --- | --- |
| `lodging.normal` | `Normal room` | MISSING | `lodging.lodging.normal.label` |
| `lodging.cheap` | `Cheap lodging` | MISSING | `lodging.lodging.cheap.label` |
| `lodging.street` | `Street / no lodging` | MISSING | `lodging.lodging.street.label` |

The gameplay IDs, housing tiers, costs, conditions and next-day effects remain locale-neutral and unchanged.

## VoluntaryNightChoice shell

| Surface | Current-main source | Classification | Notes |
| --- | --- | --- | --- |
| Eyebrow `Night` | hardcoded English | SHARED_UI_OWNER | Same generic Night surface as LodgingResolution. |
| Heading `Вечер` | hardcoded Russian | RU_FALLBACK_ONLY | Safe presentation-only localization. |
| Prompt `Один добровольный Night choice. Daytime Energy не расходуется.` | hardcoded mixed RU/EN | MISSING | Needs authored RU+EN copy; gameplay semantics remain authoritative in NightFlow. |
| Generic choice suffix `Ночной слот` | hardcoded Russian | RU_FALLBACK_ONLY | Shared UI key. |
| Choice next-day Energy suffix | hardcoded Russian | RU_FALLBACK_ONLY | Same interpolation family as lodging screen. |
| Choice action button `Выбрать` | hardcoded Russian | RU_FALLBACK_ONLY | Shared UI action key. |

## Sleep choice

| Gameplay ID | Current fallback label | Classification | Safe proposed presentation key |
| --- | --- | --- | --- |
| `night.sleep` | `Sleep` | MISSING | `nightChoice.night.sleep.label` |

Other Night choices are not ordinary-poverty content ownership:
- `lumber.foreman.night` belongs to the relationship surface;
- `school.night_study.*` belongs to School.

They are **SHARED_UI_OWNER/domain-owner** omissions from the poverty delta.

## Generic Night fallback shell

| Surface | Current-main source | Classification | Notes |
| --- | --- | --- | --- |
| Heading `Ночная последовательность` | hardcoded Russian | RU_FALLBACK_ONLY | Shared Night UI. |
| Raw `night.phase` enum rendered as body | runtime technical phase string | SHARED_UI_OWNER | Do not translate by changing save/runtime enum. A UI mapping is required if this fallback remains player-facing. |

## Night panel before EndDay

| Surface | Current-main source | Classification | Notes |
| --- | --- | --- | --- |
| Panel heading `Ночь` | hardcoded Russian | RU_FALLBACK_ONLY | Shared UI. |
| Panel description `NightFlow отдельно фиксирует lodging, voluntary choice и следующий день.` | hardcoded mixed terminology | MISSING | Safe to localize as explanatory presentation copy only. |
| Button `Начать NightFlow` | hardcoded mixed terminology | MISSING | Safe UI label; dispatch remains `{type:'endDay'}`. |

## Town lodging summary

| Surface | Current-main source | Classification | Notes |
| --- | --- | --- | --- |
| Housing label `room/hostel/shelter` | Russian-only `src/ui/labels.ts` map | RU_FALLBACK_ONLY | Current labels: `Обычная комната`, `Дешёвый ночлег`, `Улица`. Shared UI owner. |
| Prefix `Ночлег сегодня:` | hardcoded Russian | RU_FALLBACK_ONLY | Safe presentation-only key with `{cost}`. |
| coin unit | `tr('ui.work.coins',...)` | SHIPPED_RU_EN | Reuse existing key; do not duplicate. |

## Result-screen bridge into lodging

When daytime Energy is zero, the result screen exposes a hardcoded button:
`Выбрать ночлег`.

Classification:
**RU_FALLBACK_ONLY / SHARED_UI_OWNER**.

A shared UI key can safely localize this button without altering the command or NightFlow.

## Collision/ownership rules for item 163

Safe new localization entries may be authored for:
- locale-neutral lodging labels by lodging ID;
- generic Night eyebrow;
- lodging prompt;
- next-day Energy formatter;
- VoluntaryNightChoice title/prompt/suffix/action;
- generic Night fallback title;
- Night panel title/description/start action;
- town lodging-summary prefix;
- result-screen choose-lodging bridge;
- `night.sleep` label.

Do **not** duplicate these existing shipped keys:
- `ui.panel.sleep`;
- `ui.town.sleep.subtitle`;
- `ui.town.noEnergyPrompt`;
- `ui.work.coins`;
- `ui.hud.energy`;
- `ui.hud.coins`.

Do **not** author poverty-owned replacements for:
- School Night Study labels;
- Foreman Night label;
- raw NightFlow enum values;
- runtime errors;
- lodging costs/effects;
- housing-tier IDs.

## Ownership conclusion

The remaining gap is mostly shared UI presentation, not ordinary-poverty gameplay content. Chat 3 can supply collision-safe RU+EN fixture strings, but Lead/Chat 1 owns the renderer/localization wiring.
