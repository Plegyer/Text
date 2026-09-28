# Labels Dictionary Localization Debt Audit v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `3fc5495310e281cf5cbe52da3642000f1cb1fb05`
Current labels source: `src/ui/labels.ts`
Current app consumer: `src/ui/app.ts`

## Purpose

Audit the shared hardcoded `labels` dictionary only where its values can reach normal-player UI.

The dictionary is a RU fallback/source today. Locale switching does not automatically localize consumers that read `labels[id]` directly.

## Player-facing consumer seams

Current main reads `labels` in these normal-player surfaces:

- condition/eligibility explanation in `explain(c)`;
- work-card stat/effect tags;
- character creation stat names and accessibility labels;
- active result delta labels;
- town-note housing label;
- Stats panel stat names;
- Bag inventory item names;
- Legacy panel meta-unlock names;
- HUD season label.

## Already localized semantic keys

The current 12 target stats already have exact RU+EN root keys:

- `stat.strength.label`
- `stat.endurance.label`
- `stat.dexterity.label`
- `stat.reason.label`
- `stat.magic.label`
- `stat.creativity.label`
- `stat.wits.label`
- `stat.charm.label`
- `stat.sociability.label`
- `stat.manners.label`
- `stat.grooming.label`
- `stat.sexuality.label`

Current School code already demonstrates the safe lookup pattern:

`tr(`stat.${stat}.label`, labels[stat] ?? stat)`

Creation, Stats, result-delta and generic condition consumers do not yet consistently reuse that pattern.

## RU-only labels still exposed

### Legacy / migration metrics

Current labels dictionary contains RU-only fallback labels for:
- `perception` — Чутьё (legacy)
- `intelligence` — Разум (legacy)
- `empathy` — Чуткость (legacy)
- `persuasion` — Обаяние (legacy)
- `composure` — Самообладание (legacy)
- `organization` — Организация (legacy)
- `lust` — Похоть

These can surface through generic metric conditions/result deltas in legacy content.

Recommended stable key form:

`metric.<id>.label`

### Resources / legacy extras

RU-only dictionary values:
- `money` — Монеты
- `energy` — Энергия
- `health` — Здоровье
- `debt` — Долг
- `trust` — Доверие
- `work` — Практика в лавке
- `lessons` — Уроки
- `alchemy` — Алхимия

Some shell-specific money/Energy/debt words already have `ui.*` localization, but generic labels in result deltas / conditions still need semantic label keys instead of shell-text reuse.

Recommended:
- `resource.money.label`
- `resource.energy.label`
- `metric.health.label`
- `metric.debt.label`
- `metric.trust.label`
- `metric.work.label`
- `metric.lessons.label`
- `metric.alchemy.label`

### Seasons

RU-only dictionary values:
- `spring` — Весна
- `summer` — Лето
- `autumn` — Осень
- `winter` — Зима

These currently surface in HUD and condition explanations.

Stable keys prepared in item 98:
- `season.spring.label`
- `season.summer.label`
- `season.autumn.label`
- `season.winter.label`

### Legacy housing IDs

RU-only dictionary values:
- `room` — Обычная комната
- `hostel` — Дешёвый ночлег
- `shelter` — Улица

These are legacy/migration housing identities.

### Current target housing IDs are missing from labels

Current target housing identities are:
- `normal`
- `cheap`
- `street`

They are not present in `labels.ts`. A generic `housingTier` explanation currently falls back to raw IDs for these values.

Item 111 supplies explicit RU+EN for both current target identities and legacy aliases needed by current compatibility UI.

### Inventory items

Dictionary has RU-only labels for:
- `herb` — Травы
- `tonic` — Микстуры
- `scales` — Весы

Current item schema also includes IDs not present in `labels.ts`:
- `reinforced_axe`
- `rope_kit`
- `field_preservation_kit`
- `old_boundary_token`

Bag / generic item-condition presentation can therefore expose either Russian-only text or raw IDs.

Item 112 supplies stable RU+EN item/resource labels without changing item mechanics.

### Legacy/meta unlock labels

RU-only labels:
- `guild` — Своя в артели
- `scholar` — Образование
- `host` — Гостеприимство
- `mediator` — Посредница
- `court` — Придворная выдержка
- `calendar` — Дополнительное время
- `vitality` — Запас сил

These can appear in the Legacy panel via `state.meta.unlocks.map(k => labels[k])`.

Recommended stable keys:

`unlock.<id>.label`

## Consumer rule

Do not translate gameplay IDs themselves.

Preferred presentation resolver:
1. derive a semantic localization key from the stable ID/domain;
2. call `tr(key, labels[id] ?? id)`;
3. preserve the ID in Save/conditions/effects.

## Out of scope

- action/event/career names already owned by content-localization streams;
- Night/lodging mechanics;
- ending title/description localization beyond generic labels;
- debug/editor/catalog-inspector text;
- changing `labels.ts` gameplay identity or schema.

## Conclusion

The current labels dictionary is still a substantial RU-only fallback layer. The target 12 stat labels are already localized; seasons, housing, items/resources, legacy metrics and meta unlock labels remain presentation debt.
