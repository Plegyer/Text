# Generic Labels / Hints Localization Debt Audit v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `295e6fc74d235f0b7555794555a18373451e8b7e`
Current labels source: `src/ui/labels.ts`
Current app consumer blob: `8bc496f8678640e7134730dda943e326a9379fb1`

## Player-facing direct dictionary consumers

Current normal gameplay still reads `labels[id]` / `hints[id]` directly in these seams:

- `explain(c)`: stat/resource/item/housing/metric/season/unlock requirement text;
- action cards: metric effect tags;
- character creation: stat labels, stat hint tooltips, stat allocation aria labels;
- result screen: generic delta labels;
- town note: housing label;
- Stats panel: stat labels and hint prose;
- Bag panel: item labels;
- Legacy panel: meta-unlock labels;
- HUD date: season label.

## Already localized and reusable

### Core target stat labels
Current root already ships:
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

Creation/Stats/result/requirement consumers still need to reuse these keys instead of raw `labels[id]`.

### Legacy housing aliases
Current root already ships:
- `housing.room.label`
- `housing.hostel.label`
- `housing.shelter.label`

Town-note housing on current main already uses `housingLabel(...)`.

### Shared Night/lodging
PR55 localized Night/lodging shell. Do not duplicate those keys here.

## RU-only debt still visible

### Core stat hints
All 12 current target stat hints remain sourced from hardcoded RU `hints` values.

### Seasons
`spring/summer/autumn/winter` remain raw RU dictionary values in HUD and requirement display.

### Current target housing IDs
`normal/cheap/street` are current `housingState.current` values and are not represented in `labels.ts`. Generic `housingTier` requirement text can expose raw IDs.

### Inventory
`herb/tonic/scales` have RU dictionary labels.
`reinforced_axe/rope_kit/field_preservation_kit/old_boundary_token` have no dictionary labels and can fall back to raw IDs in generic item presentation.

### Resources and legacy metrics
Current direct generic labels include RU-only values for:
- money, energy;
- health, debt, trust, work, lessons, alchemy;
- perception, intelligence, empathy, persuasion, composure, organization, lust.

### Meta unlocks
RU-only values:
- guild
- scholar
- host
- mediator
- court
- calendar
- vitality

## Debug-only exclusions

Excluded:
- catalog inspector serialized IDs/JSON;
- developer/editor-only metadata labels;
- test-only/internal schema names.

## Stable presentation-key rule

Use domain-specific localization keys and retain IDs as gameplay identity:

- stat → `stat.<id>.label`
- stat hint → `stat.<id>.hint`
- season → `season.<id>.label`
- housing → `housing.<id>.label`
- item → `item.<id>.label`
- resource → `resource.<id>.label`
- legacy/generic metric → `metric.<id>.label`
- meta unlock → `unlock.<id>.label`

Fallback remains current `labels[id] ?? id` / `hints[id] ?? ''`.

## Conclusion

Current root has good coverage for target stat labels and legacy housing aliases, but direct dictionary reads still leave hints, seasons, target housing IDs, inventory/resources, legacy metrics and meta unlocks RU-only or raw-ID visible.
