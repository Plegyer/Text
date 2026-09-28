# Poverty Static Accessibility Wording Debt v2

Status: exact current-main audit of ordinary-poverty static alt/caption localization.

Current main:
`01b31b9ab0d0267d95edf5b5b80638acd63f5c04`.

Secret Debt excluded.

## Scope

Current root contains **28** poverty static alt/caption keys.

Of these:
- **20** keys belong to the 10 exact current event-specific poverty static assets referenced by root presentation slots;
- **8** keys are generic/root-only poverty fallback localization entries not directly referenced by the current event-specific static slots.

Item 331/332 replacement source is limited to the **20 active asset-bound keys**.

## Exact current strings

| Key | Scope | Current RU | Current EN | Audit |
| --- | --- | --- | --- | --- |
| `presentation.static.poverty-cheap-shared-quiet-autumn.alt` | ACTIVE_ASSET_BOUND | Тихая дешёвая комната осенью с простой кроватью и минимальной обстановкой. | A quiet low-cost room in autumn with a simple bed and minimal furnishings. | **VISUAL_DESCRIPTION_OK** |
| `presentation.static.poverty-cheap-shared-quiet-autumn.caption` | ACTIVE_ASSET_BOUND | Дешёвый осенний ночлег. | Cheap autumn lodging. | **VISUAL_DESCRIPTION_OK** |
| `presentation.static.poverty-pressure-cold-rain.alt` | ACTIVE_ASSET_BOUND | Холодный дождь на городской улице создаёт давление среды без показа точного штрафа. | Cold rain on a city street creates environmental pressure without showing an exact penalty. | **WORDING_DEBT** |
| `presentation.static.poverty-pressure-cold-rain.caption` | ACTIVE_ASSET_BOUND | Холодный дождь. | Cold rain. | **VISUAL_DESCRIPTION_OK** |
| `presentation.static.poverty-pressure-muddy-splash.alt` | ACTIVE_ASSET_BOUND | Грязные лужи и брызги осложняют уличную сцену без показа механического штрафа. | Mud, puddles, and splashes complicate the street scene without showing a mechanical penalty. | **WORDING_DEBT** |
| `presentation.static.poverty-pressure-muddy-splash.caption` | ACTIVE_ASSET_BOUND | Грязные брызги. | Muddy splash. | **VISUAL_DESCRIPTION_OK** |
| `presentation.static.poverty-pressure-noisy-loading.alt` | ACTIVE_ASSET_BOUND | Шумная погрузка на улице создаёт тяжёлые условия без изменения уже выбранного события. | Noisy street loading creates difficult conditions without changing the already selected event. | **WORDING_DEBT** |
| `presentation.static.poverty-pressure-noisy-loading.caption` | ACTIVE_ASSET_BOUND | Шумная погрузка. | Noisy loading. | **VISUAL_DESCRIPTION_OK** |
| `presentation.static.poverty-recovery-herb-bundle.alt` | ACTIVE_ASSET_BOUND | Небольшая помощь с пучком трав без отображения скрытых эффектов. | Small-scale help involving a bundle of herbs without showing hidden effects. | **WORDING_DEBT** |
| `presentation.static.poverty-recovery-herb-bundle.caption` | ACTIVE_ASSET_BOUND | Помощь с травами. | Herb-bundle help. | **VISUAL_DESCRIPTION_OK** |
| `presentation.static.poverty-recovery-short-cleanup.alt` | ACTIVE_ASSET_BOUND | Короткая бытовая уборка как небольшая восстановительная работа. | A short cleanup task as a small recovery activity. | **WORDING_DEBT** |
| `presentation.static.poverty-recovery-short-cleanup.caption` | ACTIVE_ASSET_BOUND | Короткая уборка. | Short cleanup. | **VISUAL_DESCRIPTION_OK** |
| `presentation.static.poverty-recovery-small-coin-help.alt` | ACTIVE_ASSET_BOUND | Сцена небольшой денежной помощи без указания суммы или изменения исхода. | A small-coin help scene without showing an amount or changing the event outcome. | **WORDING_DEBT** |
| `presentation.static.poverty-recovery-small-coin-help.caption` | ACTIVE_ASSET_BOUND | Небольшая денежная помощь. | Small-coin help. | **VISUAL_DESCRIPTION_OK** |
| `presentation.static.poverty-street-helpful-summer.alt` | ACTIVE_ASSET_BOUND | Летняя уличная сцена небольшой помощи в бедном городском районе без показа награды. | A summer street scene of small help in a poor city district without showing a reward. | **WORDING_DEBT** |
| `presentation.static.poverty-street-helpful-summer.caption` | ACTIVE_ASSET_BOUND | Летняя уличная помощь. | Summer street help. | **VISUAL_DESCRIPTION_OK** |
| `presentation.static.poverty-street-neutral-autumn.alt` | ACTIVE_ASSET_BOUND | Спокойная осенняя сцена на небогатой городской улице. | A neutral autumn scene on a modest city street. | **VISUAL_DESCRIPTION_OK** |
| `presentation.static.poverty-street-neutral-autumn.caption` | ACTIVE_ASSET_BOUND | Осенняя уличная сцена. | Autumn street scene. | **VISUAL_DESCRIPTION_OK** |
| `presentation.static.poverty-street-pressure-winter.alt` | ACTIVE_ASSET_BOUND | Зимняя уличная сцена давления среды со снегом и холодом без показа точного штрафа. | A winter street-pressure scene with snow and cold without showing an exact penalty. | **WORDING_DEBT** |
| `presentation.static.poverty-street-pressure-winter.caption` | ACTIVE_ASSET_BOUND | Зимнее уличное давление. | Winter street pressure. | **WORDING_DEBT** |
| `presentation.static.poverty.cheap-lodging.alt` | ROOT_ONLY_GENERIC/UNBOUND | Простая дешёвая комната с кроватью и минимальной обстановкой. | A simple low-cost room with a bed and minimal furnishings. | **VISUAL_DESCRIPTION_OK** |
| `presentation.static.poverty.cheap-lodging.caption` | ROOT_ONLY_GENERIC/UNBOUND | Дешёвый ночлег остаётся отдельной бытовой сценой. | Cheap lodging remains its own everyday scene. | **WORDING_DEBT** |
| `presentation.static.poverty.pressure.alt` | ROOT_ONLY_GENERIC/UNBOUND | Героиня переживает тяжёлые уличные условия под дождём и городской нагрузкой. | The heroine endures difficult street conditions under rain and city pressure. | **WORDING_DEBT** |
| `presentation.static.poverty.pressure.caption` | ROOT_ONLY_GENERIC/UNBOUND | Давление среды остаётся частью уже выбранного события. | Environmental pressure remains part of the already selected event. | **WORDING_DEBT** |
| `presentation.static.poverty.recovery-help.alt` | ROOT_ONLY_GENERIC/UNBOUND | Спокойная уличная сцена небольшой помощи и восстановления без показа награды. | A calm street scene of small-scale help and recovery without showing a reward. | **WORDING_DEBT** |
| `presentation.static.poverty.recovery-help.caption` | ROOT_ONLY_GENERIC/UNBOUND | Небольшая помощь не меняет смысл события. | Small help does not change the event identity. | **WORDING_DEBT** |
| `presentation.static.poverty.street.alt` | ROOT_ONLY_GENERIC/UNBOUND | Героиня на небогатой городской улице среди простой уличной обстановки. | The heroine on a modest city street among simple street surroundings. | **VISUAL_DESCRIPTION_OK** |
| `presentation.static.poverty.street.caption` | ROOT_ONLY_GENERIC/UNBOUND | Уличная сцена продолжается без изменения исхода. | The street scene continues without changing its outcome. | **WORDING_DEBT** |


## Debt definition

`WORDING_DEBT` means the string describes implementation/gameplay framing instead of only visible scene content.

Examples found in current root:
- “без показа награды” / “without showing a reward”;
- “без показа точного штрафа” / “without showing an exact penalty”;
- “без изменения исхода” / “without changing the outcome”;
- “без отображения скрытых эффектов” / “without showing hidden effects”;
- “не меняет смысл события” / “does not change event identity”;
- “остаётся частью уже выбранного события” / “remains part of the already selected event”.

These phrases are mechanically safe but weak accessibility copy because a screen reader should describe what is visible rather than explain what the image does not do to gameplay.

## Active asset-bound debt

The active assets needing player-facing visual wording include:
- helpful summer street;
- winter street pressure;
- small-coin recovery;
- short cleanup;
- herb bundle;
- cold rain;
- noisy loading;
- muddy splash.

Neutral autumn and cheap shared-room assets are already semantically close to good visual description, but item 331/332 still provides one consistent polished RU+EN source for all 10 active assets.

## Generic/root-only debt

The generic/root-only keys remain outside the item-333 exact asset replacement fixture.

Several contain the same meta wording:
- event outcome;
- reward;
- event identity;
- selected event.

They should be handled only if/when a current consumer or asset binds to those generic keys.

## Secret Debt exclusion

No audited key belongs to:
- lender/offer;
- forced debt Night;
- bound career;
- `paid_freedom`;
- `bound_life`;
- `takeover`.

## Audit conclusion

Current poverty static semantics are compatible with ordinary-poverty scenes.

The accessibility debt is wording-only: replace implementation/mechanical commentary with concise visible-scene descriptions while keeping asset paths, event identity and gameplay unchanged.
