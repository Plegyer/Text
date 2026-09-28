# Poverty Static Accessibility RU Source v2

Status: polished Russian source for the exact 10 current ordinary-poverty event-specific static assets.

Current-main baseline:
`01b31b9ab0d0267d95edf5b5b80638acd63f5c04`.

Scope:
- 10 active current poverty static assets;
- 20 exact alt/caption keys;
- visible-scene description only;
- Secret Debt excluded.

## Final Russian replacements

| Key | Final RU |
| --- | --- |
| `presentation.static.poverty-street-helpful-summer.alt` | Летняя городская улица на закате: героиня стоит между простыми домами рядом с закрывающимся прилавком и ящиком. |
| `presentation.static.poverty-street-helpful-summer.caption` | Летний вечер у закрывающегося прилавка. |
| `presentation.static.poverty-street-neutral-autumn.alt` | Спокойная осенняя улица на закате: героиня стоит между домами, а по камням лежат опавшие листья. |
| `presentation.static.poverty-street-neutral-autumn.caption` | Тихая осенняя улица с опавшими листьями. |
| `presentation.static.poverty-street-pressure-winter.alt` | Холодная зимняя улица: героиня стоит между тёмными домами под редким снегом. |
| `presentation.static.poverty-street-pressure-winter.caption` | Зимний вечер на холодной улице. |
| `presentation.static.poverty-cheap-shared-quiet-autumn.alt` | Тесная дешёвая комната с простой кроватью и скромной обстановкой; героиня стоит у края комнаты. |
| `presentation.static.poverty-cheap-shared-quiet-autumn.caption` | Тихая общая комната с простой кроватью. |
| `presentation.static.poverty-recovery-small-coin-help.alt` | Героиня стоит на городской улице рядом с двумя монетами и небольшим свёртком. |
| `presentation.static.poverty-recovery-small-coin-help.caption` | Монеты и небольшой свёрток у дороги. |
| `presentation.static.poverty-recovery-short-cleanup.alt` | Героиня стоит рядом с метлой и ящиком на городской улице после короткой уборки. |
| `presentation.static.poverty-recovery-short-cleanup.caption` | Метла и ящик после уборки. |
| `presentation.static.poverty-recovery-herb-bundle.alt` | Героиня стоит рядом с перевязанным пучком трав и небольшим ящиком. |
| `presentation.static.poverty-recovery-herb-bundle.caption` | Перевязанный пучок трав у ящика. |
| `presentation.static.poverty-pressure-cold-rain.alt` | Героиня стоит на тёмной городской улице под косым холодным дождём; на камнях собирается вода. |
| `presentation.static.poverty-pressure-cold-rain.caption` | Холодный дождь на тёмной улице. |
| `presentation.static.poverty-pressure-noisy-loading.alt` | Героиня стоит на городской улице рядом со сложенными ящиками и местом погрузки. |
| `presentation.static.poverty-pressure-noisy-loading.caption` | Ящики на месте ранней уличной погрузки. |
| `presentation.static.poverty-pressure-muddy-splash.alt` | Героиня стоит на мокрой городской улице рядом с грязными лужами и брызгами. |
| `presentation.static.poverty-pressure-muddy-splash.caption` | Грязные лужи и брызги на улице. |


## Source rules

The replacements describe only what is visible:
- street/room environment;
- weather/season;
- heroine placement;
- simple props such as boxes, coins, broom, herbs, puddles.

They deliberately remove implementation/gameplay phrases such as:
- reward;
- penalty;
- event outcome;
- hidden effects;
- selected event;
- event identity.

## Asset semantics

Helpful summer:
street at sunset, heroine, simple buildings, nearby crate/stall context.

Neutral autumn:
quiet street, heroine, fallen leaves.

Winter pressure:
cold dark street, heroine, sparse snow.

Cheap autumn:
simple shared room, bed, minimal furnishings.

Recovery:
coins/package, broom/box, herb bundle/box.

Pressure:
cold rain, loading boxes, muddy puddles/splashes.

## Mechanics firewall

No wording states or changes:
- reward amount;
- penalty amount;
- event chance;
- event/variant/choice ID;
- choice effect;
- lodging cost;
- RNG;
- Save.

## Final disposition

Use these exact RU values as the Russian source for
`poverty-static-accessibility-v2.fixture.json`.
