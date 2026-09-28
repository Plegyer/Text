# Lodging Consequence Copy Bank RU+EN v1

Status: concise player-facing RU-source + full EN copy for **current shipped lodging consequences only**.

Authoritative current lodging definitions remain:
- `lodging.normal`: 100 coins, housing `normal`, no next-day Energy/stat penalty;
- `lodging.cheap`: 50 coins, housing `cheap`, no next-day Energy/stat penalty;
- `lodging.street`: 0 coins, housing `street`, next-day Energy −1 and Grooming −1.

This document does not change those values.

## Normal room

Gameplay ID:
`lodging.normal`.

### Short consequence line

RU:
`Обычная комната · 100 монет.`

EN:
`Normal room · 100 coins.`

### Detail line

RU:
`Плата: 100 монет. Дополнительных последствий на утро нет.`

EN:
`Cost: 100 coins. No additional morning consequences.`

### Confirmation line

RU:
`Ночлег оплачен. Утром обычный запас Энергии.`

EN:
`Lodging paid. Normal Energy in the morning.`

The wording does not promise bonuses; it only states the absence of lodging-specific next-day penalties.

## Cheap lodging

Gameplay ID:
`lodging.cheap`.

### Short consequence line

RU:
`Дешёвый ночлег · 50 монет.`

EN:
`Cheap lodging · 50 coins.`

### Detail line

RU:
`Плата: 50 монет. Дополнительных последствий на утро нет.`

EN:
`Cost: 50 coins. No additional morning consequences.`

### Confirmation line

RU:
`Дешёвый ночлег оплачен. Утром обычный запас Энергии.`

EN:
`Cheap lodging paid. Normal Energy in the morning.`

No recovery bonus or safety bonus is implied.

## Street / no lodging

Gameplay ID:
`lodging.street`.

### Short consequence line

RU:
`Улица · бесплатно · Энергия завтра −1 · Ухоженность −1.`

EN:
`Street · free · Energy tomorrow −1 · Grooming −1.`

### Detail line

RU:
`Плата не требуется. К утру: Энергия −1 и Ухоженность −1.`

EN:
`No lodging cost. By morning: Energy −1 and Grooming −1.`

### Confirmation line

RU:
`Ночь на улице ничего не стоит, но утром Энергия и Ухоженность будут ниже на 1.`

EN:
`Sleeping outside costs nothing, but morning Energy and Grooming will each be 1 lower.`

This reflects the current exact lodging definition only.

## Generic one-time payment wording

RU:
`Плата за выбранный ночлег списывается один раз.`

EN:
`The selected lodging cost is charged once.`

This is presentation wording for the existing `lodgingPaymentCommitted` behavior and must not change that behavior.

## Generic next-day formatter

RU:
`Энергия завтра: {delta}`.

EN:
`Energy tomorrow: {delta}`.

Use only the authoritative `nextDayEnergyDelta`.

## Consequence-copy rules

Safe:
- show exact current money cost;
- show exact current next-day Energy delta;
- show exact current next-day Grooming effect;
- explain that normal/cheap lodging adds no lodging-specific next-day penalty.

Unsafe:
- invent recovery;
- imply protection/safety stat;
- imply relationship effects;
- add item gains/losses;
- change housing tier;
- hide current street penalties;
- describe ordinary-poverty event probability as a lodging consequence.

## Ordinary-poverty boundary

Street/cheap lodging can provide context for existing ordinary-poverty events, but those events are separate from the direct lodging consequences.

Do not summarize an event reward/penalty as guaranteed lodging outcome.

## Secret Debt boundary

Secret Debt is not a normal lodging consequence.

No lender, obligation, forced Night, career block or Secret Debt outcome belongs in these lines.

## Integration disposition

This bank is suitable for:
- lodging option detail text;
- confirmation text;
- tooltips;
- accessible consequence summaries.

It is copy only. Current costs, Energy, Grooming, housing and NightFlow remain authoritative.
