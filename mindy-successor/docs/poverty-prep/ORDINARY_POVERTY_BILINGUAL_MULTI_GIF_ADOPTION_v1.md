# Ordinary Poverty Bilingual Multi-GIF Adoption v1

Status: Chat 3 item 139 presentation-adoption map for the ordinary-poverty production content merged in PR #37.

Scope:
- street;
- cheap lodging;
- recovery/help;
- pressure/bad-luck.

Explicitly excluded:
- lender;
- Secret Debt;
- hidden Secret Debt career;
- forced Secret Debt Night;
- Secret Debt outcomes.

## Asset truth on current main

The six PR #37 packs declare no media of their own. Their variants reference two existing shared catalog media IDs:

| Media ID | Current file | Runtime status | Art status |
| --- | --- | --- | --- |
| `stage.outside` | `assets/stage-outside.svg` | **REAL_SHIPPED_STATIC_FALLBACK** | **GENERIC_STAGE_PLACEHOLDER_ART** |
| `stage.room` | `assets/stage-room.svg` | **REAL_SHIPPED_STATIC_FALLBACK** | **GENERIC_STAGE_PLACEHOLDER_ART** |

“Real shipped” means the file exists and is already safe as a fallback. “Generic placeholder art” means it is not bespoke final poverty media.

All GIF/media candidates proposed below are:
**NOT_YET_AUTHORED_MEDIA** unless a later current-main presentation pack explicitly supplies a matching file.

Do not manufacture file paths from these candidate IDs.

## Bilingual media rule

Each candidate:
- has one locale-neutral candidate ID;
- is shared by RU and EN;
- gets one deterministic alt localization key;
- uses `{ru,en}` text under the Lead localization bundle;
- never changes event conditions, choice effects, initial-tuning values, RNG, cooldown, NightFlow or save history.

Alt key convention:

`media.<candidateId>.alt`

No `.ru` or `.en` suffix belongs in the candidate ID.

---

# Shared pool 1 — generic street / outside

Pool ID:
`poverty/media/street-generic`

Candidate target:
**3**.

| Candidate ID | Alt key | RU alt | EN alt | Asset status |
| --- | --- | --- | --- | --- |
| `poverty.street-generic.awning` | `media.poverty.street-generic.awning.alt` | Сухая полоса под городским навесом после закрытия лавок. | Dry strip beneath a city awning after the shops close. | NOT_YET_AUTHORED_MEDIA |
| `poverty.street-generic.quiet-corner` | `media.poverty.street-generic.quiet-corner.alt` | Тихий угол улицы поздно вечером, без прохожих поблизости. | Quiet street corner late in the evening with no pedestrians nearby. | NOT_YET_AUTHORED_MEDIA |
| `poverty.street-generic.closed-stalls` | `media.poverty.street-generic.closed-stalls.alt` | Закрытые рыночные прилавки и свободное место у стены на ночь. | Closed market stalls and a free place by the wall for the night. | NOT_YET_AUTHORED_MEDIA |

Static fallback:
`stage.outside` -> `assets/stage-outside.svg`.

---

# Shared pool 2 — summer market / short work

Pool ID:
`poverty/media/summer-small-work`

Candidate target:
**4**.

| Candidate ID | Alt key | RU alt | EN alt | Asset status |
| --- | --- | --- | --- | --- |
| `poverty.summer-small-work.crate` | `media.poverty.summer-small-work.crate.alt` | Последний рыночный ящик переносят под навес перед закрытием. | Last market crate being carried under cover before closing. | NOT_YET_AUTHORED_MEDIA |
| `poverty.summer-small-work.canvas` | `media.poverty.summer-small-work.canvas.alt` | Полотно у закрывающегося прилавка сворачивают и связывают. | Canvas at a closing stall being rolled and tied. | NOT_YET_AUTHORED_MEDIA |
| `poverty.summer-small-work.late-shade` | `media.poverty.summer-small-work.late-shade.alt` | Полоска вечерней тени рядом с закрытым рыночным прилавком. | Strip of evening shade beside a closed market stall. | NOT_YET_AUTHORED_MEDIA |
| `poverty.summer-small-work.cleanup` | `media.poverty.summer-small-work.cleanup.alt` | Два табурета, метла и ведро у прилавка после закрытия. | Two stools, a broom, and a bucket beside a stall after closing. | NOT_YET_AUTHORED_MEDIA |

Static fallback:
`stage.outside`.

---

# Shared pool 3 — autumn arcade / shelter

Pool ID:
`poverty/media/autumn-arcade`

Candidate target:
**3**.

| Candidate ID | Alt key | RU alt | EN alt | Asset status |
| --- | --- | --- | --- | --- |
| `poverty.autumn-arcade.dry` | `media.poverty.autumn-arcade.dry.alt` | Сухая аркада и закрытые магазины тихой осенней ночью. | Dry arcade and closed shops on a quiet autumn night. | NOT_YET_AUTHORED_MEDIA |
| `poverty.autumn-arcade.drizzle` | `media.poverty.autumn-arcade.drizzle.alt` | Поздние прохожие укрываются под аркадой от лёгкой осенней мороси. | Late pedestrians sheltering under an arcade from light autumn drizzle. | NOT_YET_AUTHORED_MEDIA |
| `poverty.autumn-arcade.footprints` | `media.poverty.autumn-arcade.footprints.alt` | Мокрые следы на каменном полу под городской аркадой. | Wet footprints on the stone floor beneath a city arcade. | NOT_YET_AUTHORED_MEDIA |

Static fallback:
`stage.outside`.

---

# Shared pool 4 — winter street pressure

Pool ID:
`poverty/media/winter-street-pressure`

Candidate target:
**4**.

| Candidate ID | Alt key | RU alt | EN alt | Asset status |
| --- | --- | --- | --- | --- |
| `poverty.winter-street.cold-pavement` | `media.poverty.winter-street.cold-pavement.alt` | Холодная каменная мостовая под небольшим навесом зимой. | Cold stone pavement beneath a small overhang in winter. | NOT_YET_AUTHORED_MEDIA |
| `poverty.winter-street.crosswind` | `media.poverty.winter-street.crosswind.alt` | Сильный боковой ветер проходит через узкий зимний переулок. | Strong crosswind cutting through a narrow winter lane. | NOT_YET_AUTHORED_MEDIA |
| `poverty.winter-street.doorway` | `media.poverty.winter-street.doorway.alt` | Глубокий дверной проём предлагает укрытие от зимнего ветра. | Deep doorway offering shelter from winter wind. | NOT_YET_AUTHORED_MEDIA |
| `poverty.winter-street.rattling-shutters` | `media.poverty.winter-street.rattling-shutters.alt` | Долгие порывы ветра трясут ставни вдоль пустого переулка. | Long gusts rattling shutters along an empty lane. | NOT_YET_AUTHORED_MEDIA |

Static fallback:
`stage.outside`.

---

# Shared pool 5 — spring rain / loading / mud

Pool ID:
`poverty/media/spring-pressure`

Candidate target:
**5**.

| Candidate ID | Alt key | RU alt | EN alt | Asset status |
| --- | --- | --- | --- | --- |
| `poverty.spring-pressure.cold-rain` | `media.poverty.spring-pressure.cold-rain.alt` | Холодный весенний дождь затекает под край уличного укрытия. | Cold spring rain creeping beneath the edge of a street shelter. | NOT_YET_AUTHORED_MEDIA |
| `poverty.spring-pressure.deep-doorway` | `media.poverty.spring-pressure.deep-doorway.alt` | Более глубокий дверной проём остаётся сухим во время весеннего дождя. | Deeper doorway staying dry during spring rain. | NOT_YET_AUTHORED_MEDIA |
| `poverty.spring-pressure.loading-carts` | `media.poverty.spring-pressure.loading-carts.alt` | Телеги и ящики ранней погрузочной бригады до рассвета. | Carts and crates of an early loading crew before dawn. | NOT_YET_AUTHORED_MEDIA |
| `poverty.spring-pressure.puddle-cart` | `media.poverty.spring-pressure.puddle-cart.alt` | Колесо проезжей телеги попадает в большую весеннюю лужу. | Passing cart wheel hitting a large spring puddle. | NOT_YET_AUTHORED_MEDIA |
| `poverty.spring-pressure.muddy-clothes` | `media.poverty.spring-pressure.muddy-clothes.alt` | Край одежды забрызган грязью после проехавшей телеги. | Edge of clothing splashed with mud after a cart passes. | NOT_YET_AUTHORED_MEDIA |

Static fallback:
`stage.outside`.

---

# Shared pool 6 — recovery/help still-life

Pool ID:
`poverty/media/recovery-still-life`

Candidate target:
**4**.

| Candidate ID | Alt key | RU alt | EN alt | Asset status |
| --- | --- | --- | --- | --- |
| `poverty.recovery-still-life.bread-coins` | `media.poverty.recovery-still-life.bread-coins.alt` | Бумажный свёрток со вчерашним хлебом и несколько мелких монет на общей полке. | Paper parcel of yesterday's bread with a few loose coins on a public ledge. | NOT_YET_AUTHORED_MEDIA |
| `poverty.recovery-still-life.coins-close` | `media.poverty.recovery-still-life.coins-close.alt` | Несколько ничьих мелких монет рядом со свёртком хлеба. | A few unclaimed loose coins beside a parcel of bread. | NOT_YET_AUTHORED_MEDIA |
| `poverty.recovery-still-life.herb-crate` | `media.poverty.recovery-still-life.herb-crate.alt` | Связанный пучок обычных трав рядом с пустым рыночным ящиком. | Tied bundle of ordinary herbs beside an empty market crate. | NOT_YET_AUTHORED_MEDIA |
| `poverty.recovery-still-life.empty-market` | `media.poverty.recovery-still-life.empty-market.alt` | Пустой рыночный угол после закрытия с забытыми мелочами. | Empty market corner after closing with small forgotten belongings. | NOT_YET_AUTHORED_MEDIA |

Static fallback:
`stage.outside`.

---

# Shared pool 7 — cheap shared room

Pool ID:
`poverty/media/cheap-shared-room`

Candidate target:
**5**.

| Candidate ID | Alt key | RU alt | EN alt | Asset status |
| --- | --- | --- | --- | --- |
| `poverty.cheap-room.thin-walls` | `media.poverty.cheap-room.thin-walls.alt` | Тесная общая комната с тонкими стенами и аккуратно сложенными вещами. | Crowded shared room with thin walls and belongings kept close. | NOT_YET_AUTHORED_MEDIA |
| `poverty.cheap-room.spring-window` | `media.poverty.cheap-room.spring-window.alt` | Приоткрытое окно общей комнаты подпёрто щербатой чашкой весенней ночью. | Cracked shared-room window propped open with a chipped cup on a spring night. | NOT_YET_AUTHORED_MEDIA |
| `poverty.cheap-room.summer-heat` | `media.poverty.cheap-room.summer-heat.alt` | Подстилки разложены по нагретому летнему полу общей комнаты. | Bedrolls spaced across the warm summer floor of a shared room. | NOT_YET_AUTHORED_MEDIA |
| `poverty.cheap-room.winter-stove` | `media.poverty.cheap-room.winter-stove.alt` | Маленькая печь и зимние пальто в тесной общей комнате. | Small stove and winter coats in a crowded shared room. | NOT_YET_AUTHORED_MEDIA |
| `poverty.cheap-room.generic-night` | `media.poverty.cheap-room.generic-night.alt` | Простая общая комната с крышей, дверью и местом для сна. | Plain shared room with a roof, a door, and a place to sleep. | NOT_YET_AUTHORED_MEDIA |

Static fallback:
`stage.room` -> `assets/stage-room.svg`.

---

# PR37 semantic identity adoption matrix

All presentation IDs below already exist semantically through the current resolver convention. The pool assignment is presentation-only.

| Production presentation identity | Pool | Static fallback | Bespoke media status |
| --- | --- | --- | --- |
| `location/town/event/poverty-street-production-helpful-summer/default` | `poverty/media/summer-small-work` | `stage.outside` | NOT_YET_AUTHORED_MEDIA |
| `location/town/event/poverty-street-production-neutral-autumn/default` | `poverty/media/autumn-arcade` | `stage.outside` | NOT_YET_AUTHORED_MEDIA |
| `location/town/event/poverty-street-production-pressure-winter/default` | `poverty/media/winter-street-pressure` | `stage.outside` | NOT_YET_AUTHORED_MEDIA |
| `location/town/event/poverty-street-production-v2-helpful-summer-shade/market-closing` | `poverty/media/summer-small-work` | `stage.outside` | NOT_YET_AUTHORED_MEDIA |
| `location/town/event/poverty-street-production-v2-helpful-summer-shade/late-shade` | `poverty/media/summer-small-work` | `stage.outside` | NOT_YET_AUTHORED_MEDIA |
| `location/town/event/poverty-street-production-v2-neutral-autumn-crossing/drizzle` | `poverty/media/autumn-arcade` | `stage.outside` | NOT_YET_AUTHORED_MEDIA |
| `location/town/event/poverty-street-production-v2-neutral-autumn-crossing/dry-arcade` | `poverty/media/autumn-arcade` | `stage.outside` | NOT_YET_AUTHORED_MEDIA |
| `location/town/event/poverty-street-production-v2-pressure-winter-wind/crosswind` | `poverty/media/winter-street-pressure` | `stage.outside` | NOT_YET_AUTHORED_MEDIA |
| `location/town/event/poverty-street-production-v2-pressure-winter-wind/long-gusts` | `poverty/media/winter-street-pressure` | `stage.outside` | NOT_YET_AUTHORED_MEDIA |
| `location/town/event/poverty-cheap-production-shared-quiet-autumn/default` | `poverty/media/cheap-shared-room` | `stage.room` | NOT_YET_AUTHORED_MEDIA |
| `location/town/event/poverty-cheap-production-v2-shared-room-seasons/spring-window` | `poverty/media/cheap-shared-room` | `stage.room` | NOT_YET_AUTHORED_MEDIA |
| `location/town/event/poverty-cheap-production-v2-shared-room-seasons/summer-heat` | `poverty/media/cheap-shared-room` | `stage.room` | NOT_YET_AUTHORED_MEDIA |
| `location/town/event/poverty-cheap-production-v2-shared-room-seasons/winter-stove` | `poverty/media/cheap-shared-room` | `stage.room` | NOT_YET_AUTHORED_MEDIA |
| `location/town/event/poverty-cheap-production-v2-shared-room-seasons/shared-room` | `poverty/media/cheap-shared-room` | `stage.room` | NOT_YET_AUTHORED_MEDIA |
| `location/town/event/poverty-recovery-production-small-coin-help/default` | `poverty/media/recovery-still-life` | `stage.outside` | NOT_YET_AUTHORED_MEDIA |
| `location/town/event/poverty-recovery-production-short-cleanup/default` | `poverty/media/summer-small-work` | `stage.outside` | NOT_YET_AUTHORED_MEDIA |
| `location/town/event/poverty-recovery-production-herb-bundle/default` | `poverty/media/recovery-still-life` | `stage.outside` | NOT_YET_AUTHORED_MEDIA |
| `location/town/event/poverty-pressure-production-cold-rain/default` | `poverty/media/spring-pressure` | `stage.outside` | NOT_YET_AUTHORED_MEDIA |
| `location/town/event/poverty-pressure-production-noisy-loading/default` | `poverty/media/spring-pressure` | `stage.outside` | NOT_YET_AUTHORED_MEDIA |
| `location/town/event/poverty-pressure-production-muddy-splash/default` | `poverty/media/spring-pressure` | `stage.outside` | NOT_YET_AUTHORED_MEDIA |

Coverage:
**20 / 20 current PR #37 semantic variant identities mapped**.

## Candidate selection policy

For a presentation identity:
1. choose only from its mapped pool;
2. candidate selection may vary presentation only;
3. locale switch resolves the alt key for the **same selected candidate**;
4. locale switch must not select another event variant;
5. locale switch must not consume gameplay RNG;
6. static fallback remains valid if no GIF candidate exists.

A future presentation implementation may use deterministic/non-gameplay presentation selection, but that implementation is shared-runtime ownership and is not authored here.

## Lead localization merge projection

When a candidate becomes a real media record, merge its alt entry into the Lead localization bundle:

```json
{
  "media.poverty.street-generic.awning.alt": {
    "ru": "Сухая полоса под городским навесом после закрытия лавок.",
    "en": "Dry strip beneath a city awning after the shops close."
  }
}
```

The media record itself keeps only the locale-neutral candidate identity.

## Static fallback localization debt

Current `stage.outside` and `stage.room` alt strings are generic Russian stage labels in `stage.json`.

They are:
- mechanically safe;
- real shipped fallback files;
- not sufficient as polished bilingual bespoke ordinary-poverty accessibility copy.

Until shared stage media is localized, ordinary-poverty event text remains fully bilingual through item 137 while the fallback image alt is a separate shared-media localization debt owned by the presentation/localization integration layer.

This does not justify duplicating `stage.outside` or `stage.room` per locale.

## Mechanics firewall

Media adoption must not alter:
- event IDs;
- variant IDs;
- choice IDs;
- housing conditions;
- season/day conditions;
- NightFlow interception;
- money/item/next-day effects;
- cooldown/maxShows;
- initial-tuning values;
- event history/reload behavior.

## Secret Debt firewall

No pool/candidate in this file represents:
- lender offer;
- debt activation;
- hidden Secret Debt work;
- forced Secret Debt Night;
- `paid_freedom`;
- `bound_life`;
- `takeover`.

Those remain separate content/system identities.

## Item 139 completion boundary

The existing 20 PR #37 ordinary-poverty semantic presentation identities now have:
- a 3–5 candidate shared media-pool adoption path;
- deterministic RU/EN alt localization keys;
- explicit shipped static fallback;
- explicit real-vs-placeholder/not-yet-authored asset status;
- no gameplay or balance change.
