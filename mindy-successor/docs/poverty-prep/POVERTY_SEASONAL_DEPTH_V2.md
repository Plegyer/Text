# Ordinary Poverty Seasonal Depth v2

Status: C3-21 incremental content-side handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Current-main baseline used for this task: `b56628a81098146e7a2fc2c70b193e2587b9f025`.
Fixture: `prior-work/astra/prototype-m3.2/content/poverty-seasonal-depth-v2.fixture.json`.

## Current-main context

Current main now contains the previously prepared 26 ordinary-poverty depth localization keys and the shared `src/ui/povertyDepth.ts` consumer.

C3-21 therefore does not rebuild PR #67 and does not copy its keys.

Open PR #82 also already contains C3-07/C3-08 incremental poverty fixtures. C3-21 avoids those keys as well.

This bundle adds eight new RU/EN depth candidates:
- two spring;
- two summer;
- two autumn;
- two winter.

All attach to existing production event/variant identities.

## Spring

### Cold rain

Event:
`poverty-pressure-production.cold-rain / default`.

New key:
`presentation.poverty.depth.poverty-pressure-production-cold-rain.default.c.text`.

RU:
`Весенний дождь идёт ровно и холодно, без грозы, но вода быстро собирается у бордюров. Под одним из дверных козырьков уже тесно, поэтому приходится выбирать место так, чтобы не мешать людям входить и всё же остаться сухой.`

EN:
`The spring rain falls steadily and cold, without a storm, but water gathers quickly along the curbs. One doorway is already crowded, so you have to choose a place that leaves people room to pass while still keeping yourself dry.`

### Cheap shared room / spring window

Event:
`poverty-cheap-production-v2.shared-room-seasons / spring-window`.

New key:
`presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.spring-window.b.text`.

RU:
`Весной окно в общей комнате всё время спорит с погодой: его открывают ради свежего воздуха и снова прикрывают, когда тянет сыростью. Вечер проходит в этих мелких уступках между людьми, которым на одну ночь досталась одна комната.`

EN:
`In spring, the shared-room window keeps negotiating with the weather: opened for fresh air, then pulled nearly shut when the damp comes in. The evening passes through those small compromises between people sharing one room for the night.`

## Summer

### Late shade

Event:
`poverty-street-production-v2.helpful-summer-shade / late-shade`.

New key:
`presentation.poverty.depth.poverty-street-production-v2-helpful-summer-shade.late-shade.c.text`.

RU:
`Летняя жара ещё держится в камне, хотя рынок уже почти пуст. У стены остаётся узкая полоса тени и несколько минут до закрытия; можно сохранить прохладное место или потратить их на последнюю короткую работу.`

EN:
`Summer heat still lingers in the stone even though the market is nearly empty. A narrow strip of shade remains by the wall and only a few minutes are left before closing; you can keep the cooler spot or spend them on one last short job.`

### Cheap shared room / summer heat

Event:
`poverty-cheap-production-v2.shared-room-seasons / summer-heat`.

New key:
`presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.summer-heat.c.text`.

RU:
`Летом в дешёвой комнате жар остаётся даже после заката. Люди двигают вещи ближе к стенам, освобождают проход к окну и негромко договариваются, кому сегодня достанется место рядом с воздухом.`

EN:
`In summer, the cheap room holds the heat even after sunset. People move their belongings closer to the walls, clear a path to the window, and quietly work out who gets the place nearest the air tonight.`

## Autumn

### Quiet corner

Event:
`poverty-street-production.neutral-autumn / default`.

New key:
`presentation.poverty.depth.poverty-street-production-neutral-autumn.default.b.text`.

RU:
`Осенью сухой участок под навесом ценится не за удобство, а за предсказуемость. После закрытия улица постепенно пустеет, и на несколько часов этот угол перестаёт требовать от тебя новых решений.`

EN:
`In autumn, a dry place beneath an awning matters less for comfort than for predictability. Once the shops close, the street slowly empties, and for a few hours the corner stops demanding another decision from you.`

### Shared quiet

Event:
`poverty-cheap-production.shared-quiet-autumn / default`.

New key:
`presentation.poverty.depth.poverty-cheap-production-shared-quiet-autumn.default.c.text`.

RU:
`Осенним вечером в дешёвой комнате слышно, как дождь начинается где-то снаружи, но внутри спорят только о том, кто первым погасит лампу. Теснота остаётся теснотой, зато ночь хотя бы проходит под крышей.`

EN:
`On an autumn evening in the cheap room, you can hear rain beginning somewhere outside, but the only argument indoors is over who will put out the lamp first. Crowding is still crowding, but at least the night passes under a roof.`

## Winter

### Cold pavement

Event:
`poverty-street-production.pressure-winter / default`.

New key:
`presentation.poverty.depth.poverty-street-production-pressure-winter.default.c.text`.

RU:
`Зимой холод возвращается сразу, как только перестаёшь двигаться. Под навесом ветер слабее, но камень всё равно вытягивает тепло, поэтому даже безопасное место остаётся тяжёлым способом переждать ночь.`

EN:
`In winter, the cold returns as soon as you stop moving. The wind is weaker beneath the overhang, but the stone still pulls away warmth, so even the safer place remains a hard way to get through the night.`

### Cheap shared room / winter stove

Event:
`poverty-cheap-production-v2.shared-room-seasons / winter-stove`.

New key:
`presentation.poverty.depth.poverty-cheap-production-v2-shared-room-seasons.winter-stove.d.text`.

RU:
`Зимой маленькая печь делает комнату пригодной для сна, но не просторной. Мокрые вещи сушатся по очереди, кто-то подбрасывает полено, и на несколько часов тепло становится общим ресурсом, за которым приходится следить всем.`

EN:
`In winter, the small stove makes the room fit for sleep, though never spacious. Wet clothes dry in turns, someone adds a piece of wood, and for a few hours warmth becomes a shared resource everyone has to watch.`

## Integration contract

These are append-only candidates for the existing current-main depth lookup.

For each exact event/variant pair:
- append the new key to `orderedDepthLocalizationKeys`;
- preserve the existing core fallback;
- preserve the existing deterministic occurrence-count rotation;
- do not change event selection or variant selection.

No new runtime capability is required beyond the already-shipped poverty depth consumer.

## Collision / ownership boundary

The eight C3-21 keys were checked against:
- current-main localization;
- PR #82 C3-07 housing depth keys;
- PR #82 C3-08 survival/contact depth keys.

No collision was found.

Secret Debt remains separate:
- no lender language;
- no debt state;
- no hidden-career reference;
- no automatic transition from street housing to Secret Debt.

## Exact non-scope

No changes to:
- ordinary-poverty event conditions/effects;
- lodging prices;
- NightFlow;
- event cooldowns/maxShows;
- event history semantics;
- Save/RNG;
- media;
- Secret Debt.

## C3-21 disposition

Ready:
- eight additive RU/EN seasonal depth candidates;
- exact event/variant mappings;
- append-only integration rule for the current `povertyDepth` consumer;
- zero collision with current main or PR #82 incremental poverty fixtures.
