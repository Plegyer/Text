# Generic Labels Consumer Map v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `295e6fc74d235f0b7555794555a18373451e8b7e`
Current app blob: `8bc496f8678640e7134730dda943e326a9379fb1`
Current labels blob: `e63895343632bbd36c7067d20f4b880ba6e590de`

Fixture mapped:
- `content/generic-labels-localization-v1.fixture.json`

Every one of the 49 fixture keys is mapped below.

| Key | Exact current consumer seam | Current fallback/source | Status |
|---|---|---|---|
| `housing.cheap.label` | explain(housingTier) target housingState ID 'cheap'; app.ts line ~55 | cheap | NEEDS_WIRING |
| `housing.hostel.label` | housingLabel() compatibility/town note + explain(housing); app.ts helper line ~25, lines ~77/~177 | Дешёвый ночлег | REUSE_EXISTING_ROOT |
| `housing.normal.label` | explain(housingTier) target housingState ID 'normal'; app.ts line ~55 | normal | NEEDS_WIRING |
| `housing.room.label` | housingLabel() compatibility/town note + explain(housing); app.ts helper line ~25, lines ~77/~177 | Обычная комната | REUSE_EXISTING_ROOT |
| `housing.shelter.label` | housingLabel() compatibility/town note + explain(housing); app.ts helper line ~25, lines ~77/~177 | Улица | REUSE_EXISTING_ROOT |
| `housing.street.label` | explain(housingTier) target housingState ID 'street'; app.ts line ~55 | street | NEEDS_WIRING |
| `item.field_preservation_kit.label` | Bag rows + explain(itemCount/item); app.ts lines ~49/~77/~190 | labels['field_preservation_kit'] ?? 'field_preservation_kit' | NEEDS_WIRING |
| `item.herb.label` | Bag rows + explain(itemCount/item); app.ts lines ~49/~77/~190 | labels['herb'] ?? 'herb' | NEEDS_WIRING |
| `item.old_boundary_token.label` | Bag rows + explain(itemCount/item); app.ts lines ~49/~77/~190 | labels['old_boundary_token'] ?? 'old_boundary_token' | NEEDS_WIRING |
| `item.reinforced_axe.label` | Bag rows + explain(itemCount/item); app.ts lines ~49/~77/~190 | labels['reinforced_axe'] ?? 'reinforced_axe' | NEEDS_WIRING |
| `item.rope_kit.label` | Bag rows + explain(itemCount/item); app.ts lines ~49/~77/~190 | labels['rope_kit'] ?? 'rope_kit' | NEEDS_WIRING |
| `item.scales.label` | Bag rows + explain(itemCount/item); app.ts lines ~49/~77/~190 | labels['scales'] ?? 'scales' | NEEDS_WIRING |
| `item.tonic.label` | Bag rows + explain(itemCount/item); app.ts lines ~49/~77/~190 | labels['tonic'] ?? 'tonic' | NEEDS_WIRING |
| `resource.energy.label` | explain(resource) + generic resource label resolver; app.ts line ~49 | Энергия | NEEDS_WIRING |
| `resource.money.label` | explain(resource) + generic resource label resolver; app.ts line ~49 | Монеты | NEEDS_WIRING |
| `season.autumn.label` | HUD labels[d.season] + explain(calendarSeason/season); app.ts lines ~52/~76/~199 | Осень | NEEDS_WIRING |
| `season.spring.label` | HUD labels[d.season] + explain(calendarSeason/season); app.ts lines ~52/~76/~199 | Весна | NEEDS_WIRING |
| `season.summer.label` | HUD labels[d.season] + explain(calendarSeason/season); app.ts lines ~52/~76/~199 | Лето | NEEDS_WIRING |
| `season.winter.label` | HUD labels[d.season] + explain(calendarSeason/season); app.ts lines ~52/~76/~199 | Зима | NEEDS_WIRING |
| `stat.charm.hint` | creation tooltip hints['charm'] and Stats panel hints['charm']; app.ts lines ~149/~184 | hints[charm] | NEEDS_WIRING |
| `stat.charm.label` | creation stat label/aria + Stats panel + explain(stat/metric when ID=charm) + result delta; app.ts lines ~49,149,175,184 | Обаяние | REUSE_EXISTING_ROOT |
| `stat.creativity.hint` | creation tooltip hints['creativity'] and Stats panel hints['creativity']; app.ts lines ~149/~184 | hints[creativity] | NEEDS_WIRING |
| `stat.creativity.label` | creation stat label/aria + Stats panel + explain(stat/metric when ID=creativity) + result delta; app.ts lines ~49,149,175,184 | Творчество | REUSE_EXISTING_ROOT |
| `stat.dexterity.hint` | creation tooltip hints['dexterity'] and Stats panel hints['dexterity']; app.ts lines ~149/~184 | hints[dexterity] | NEEDS_WIRING |
| `stat.dexterity.label` | creation stat label/aria + Stats panel + explain(stat/metric when ID=dexterity) + result delta; app.ts lines ~49,149,175,184 | Ловкость | REUSE_EXISTING_ROOT |
| `stat.endurance.hint` | creation tooltip hints['endurance'] and Stats panel hints['endurance']; app.ts lines ~149/~184 | hints[endurance] | NEEDS_WIRING |
| `stat.endurance.label` | creation stat label/aria + Stats panel + explain(stat/metric when ID=endurance) + result delta; app.ts lines ~49,149,175,184 | Выносливость | REUSE_EXISTING_ROOT |
| `stat.grooming.hint` | creation tooltip hints['grooming'] and Stats panel hints['grooming']; app.ts lines ~149/~184 | hints[grooming] | NEEDS_WIRING |
| `stat.grooming.label` | creation stat label/aria + Stats panel + explain(stat/metric when ID=grooming) + result delta; app.ts lines ~49,149,175,184 | Ухоженность | REUSE_EXISTING_ROOT |
| `stat.magic.hint` | creation tooltip hints['magic'] and Stats panel hints['magic']; app.ts lines ~149/~184 | hints[magic] | NEEDS_WIRING |
| `stat.magic.label` | creation stat label/aria + Stats panel + explain(stat/metric when ID=magic) + result delta; app.ts lines ~49,149,175,184 | Магия | REUSE_EXISTING_ROOT |
| `stat.manners.hint` | creation tooltip hints['manners'] and Stats panel hints['manners']; app.ts lines ~149/~184 | hints[manners] | NEEDS_WIRING |
| `stat.manners.label` | creation stat label/aria + Stats panel + explain(stat/metric when ID=manners) + result delta; app.ts lines ~49,149,175,184 | Манеры | REUSE_EXISTING_ROOT |
| `stat.reason.hint` | creation tooltip hints['reason'] and Stats panel hints['reason']; app.ts lines ~149/~184 | hints[reason] | NEEDS_WIRING |
| `stat.reason.label` | creation stat label/aria + Stats panel + explain(stat/metric when ID=reason) + result delta; app.ts lines ~49,149,175,184 | Разум | REUSE_EXISTING_ROOT |
| `stat.sexuality.hint` | creation tooltip hints['sexuality'] and Stats panel hints['sexuality']; app.ts lines ~149/~184 | hints[sexuality] | NEEDS_WIRING |
| `stat.sexuality.label` | creation stat label/aria + Stats panel + explain(stat/metric when ID=sexuality) + result delta; app.ts lines ~49,149,175,184 | Сексуальность | REUSE_EXISTING_ROOT |
| `stat.sociability.hint` | creation tooltip hints['sociability'] and Stats panel hints['sociability']; app.ts lines ~149/~184 | hints[sociability] | NEEDS_WIRING |
| `stat.sociability.label` | creation stat label/aria + Stats panel + explain(stat/metric when ID=sociability) + result delta; app.ts lines ~49,149,175,184 | Общительность | REUSE_EXISTING_ROOT |
| `stat.strength.hint` | creation tooltip hints['strength'] and Stats panel hints['strength']; app.ts lines ~149/~184 | hints[strength] | NEEDS_WIRING |
| `stat.strength.label` | creation stat label/aria + Stats panel + explain(stat/metric when ID=strength) + result delta; app.ts lines ~49,149,175,184 | Сила | REUSE_EXISTING_ROOT |
| `stat.wits.hint` | creation tooltip hints['wits'] and Stats panel hints['wits']; app.ts lines ~149/~184 | hints[wits] | NEEDS_WIRING |
| `stat.wits.label` | creation stat label/aria + Stats panel + explain(stat/metric when ID=wits) + result delta; app.ts lines ~49,149,175,184 | Смекалка | REUSE_EXISTING_ROOT |
| `ui.event.eyebrow` | pending event stage eyebrow; app.ts line ~151 | Встреча | NEEDS_WIRING |
| `ui.legacy.nextLifeButton` | Legacy panel #new-life button; app.ts line ~191 | Следующая жизнь | REUSE_EXISTING_ROOT |
| `ui.run.endingAccepted` | inactive run ended heading; app.ts line ~152 | Судьба принята | NEEDS_WIRING |
| `ui.run.fatesAndNextLife` | inactive run Legacy navigation button; app.ts line ~152 | Судьбы и следующая жизнь | NEEDS_WIRING |
| `ui.run.timeExpired` | inactive run expired heading; app.ts line ~152 | Срок истёк | NEEDS_WIRING |
| `ui.town.lodgingToday` | town note lodging-cost sentence; app.ts line ~177 | Ночлег сегодня: {cost} {coins} | ALREADY_WIRED_ROOT |

## Recommended generic resolvers

- stat label: `tr(`stat.${id}.label`, labels[id] ?? id)`
- stat hint: `tr(`stat.${id}.hint`, hints[id] ?? '')`
- item: `tr(`item.${id}.label`, labels[id] ?? id)`
- resource: `tr(`resource.${id}.label`, labels[id] ?? id)`
- season: `tr(`season.${id}.label`, labels[id] ?? id)`
- housing: existing `housingLabel(id,fallback)`

## Shell wiring

Pending encounter and inactive-run strings can use direct `tr(key,fallback)` calls.

`ui.town.lodgingToday` is already wired on current main and should not be touched except to preserve the existing consumer.

## Invariants

Consumer wiring changes only visible/accessibility presentation. Stable stat/item/resource/housing/season IDs, conditions, mechanics, Save and RNG remain unchanged.
