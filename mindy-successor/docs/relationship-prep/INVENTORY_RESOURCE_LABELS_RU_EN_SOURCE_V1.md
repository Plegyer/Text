# Inventory / Resource Labels RU+EN Source v1

Date: 2026-09-28
Status: PRESENTATION_ONLY
Baseline main: `3fc5495310e281cf5cbe52da3642000f1cb1fb05`

## Current resources

### `resource.money.label`
RU: Монеты  
EN: Coins

### `resource.energy.label`
RU: Энергия  
EN: Energy

`money` is the current target resource identity. `energy` remains a current player-facing metric/resource label even where shell-specific Energy strings already exist.

## Current inventory items

### `item.herb.label`
RU: Травы  
EN: Herbs

### `item.tonic.label`
RU: Микстуры  
EN: Tonics

### `item.scales.label`
RU: Весы  
EN: Scales

### `item.reinforced_axe.label`
RU: Усиленный топор  
EN: Reinforced axe

### `item.rope_kit.label`
RU: Набор верёвок  
EN: Rope kit

### `item.field_preservation_kit.label`
RU: Полевой набор для сохранения образцов  
EN: Field preservation kit

### `item.old_boundary_token.label`
RU: Жетон Старой границы  
EN: Old Boundary token

## Legacy / generic metrics that still reach shared result/condition presentation

### `metric.health.label`
RU: Здоровье  
EN: Health

### `metric.debt.label`
RU: Долг  
EN: Debt

### `metric.trust.label`
RU: Доверие  
EN: Trust

### `metric.work.label`
RU: Практика в лавке  
EN: Shop practice

### `metric.lessons.label`
RU: Уроки  
EN: Lessons

### `metric.alchemy.label`
RU: Алхимия  
EN: Alchemy

### `metric.perception.label`
RU: Чутьё (legacy)  
EN: Perception (legacy)

### `metric.intelligence.label`
RU: Разум (legacy)  
EN: Intelligence (legacy)

### `metric.empathy.label`
RU: Чуткость (legacy)  
EN: Empathy (legacy)

### `metric.persuasion.label`
RU: Обаяние (legacy)  
EN: Persuasion (legacy)

### `metric.composure.label`
RU: Самообладание (legacy)  
EN: Composure (legacy)

### `metric.organization.label`
RU: Организация (legacy)  
EN: Organization (legacy)

### `metric.lust.label`
RU: Похоть  
EN: Lust

## Meta-unlock labels visible in the Legacy panel

### `unlock.guild.label`
RU: Своя в артели  
EN: One of the crew

### `unlock.scholar.label`
RU: Образование  
EN: Education

### `unlock.host.label`
RU: Гостеприимство  
EN: Hospitality

### `unlock.mediator.label`
RU: Посредница  
EN: Mediator

### `unlock.court.label`
RU: Придворная выдержка  
EN: Court composure

### `unlock.calendar.label`
RU: Дополнительное время  
EN: Extra time

### `unlock.vitality.label`
RU: Запас сил  
EN: Vitality reserve

## Consumer rule

Use stable domain-prefixed presentation keys:

- item: `item.<id>.label`
- resource: `resource.<id>.label`
- legacy/generic metric: `metric.<id>.label`
- meta unlock: `unlock.<id>.label`

Fallback may use the existing `labels[id]` entry when present, otherwise the raw ID.

## Boundary

Presentation labels only. No item capabilities, inventory counts, rewards, resources, debt mechanics, unlock logic, conditions, effects, Save or RNG changes.
