# Pressure Poverty Scene-Depth Bank v2

Status: refined presentation-only RU-source + full EN copy for exact current **pressure** ordinary-poverty identities.

Current-main baseline:
`54131488c65302f81b3001abaaa345d21f0281e2`.

No event/variant/choice/mechanic ID is created.

## `poverty-street-production.pressure-winter` / `default`

### Candidate `a`

Key:
`presentation.poverty.depth.poverty-street-production-pressure-winter.default.a.text`.

RU:
`Камень под ногами уже отдал дневное тепло. Под навесом суше, но зимний холод всё равно тянется с улицы.`

EN:
`The stone underfoot has already lost the day’s warmth. It is drier under the awning, but the winter cold still reaches in from the street.`

### Candidate `b`

Key:
`presentation.poverty.depth.poverty-street-production-pressure-winter.default.b.text`.

RU:
`Ветер идёт вдоль стены и быстро выдувает остатки тепла из угла. Ночь здесь будет беспокойной и холодной.`

EN:
`Wind runs along the wall and quickly carries the remaining warmth out of the corner. The night here will be restless and cold.`

## `poverty-street-production-v2.pressure-winter-wind` / `crosswind`

### Candidate `a`

Key:
`presentation.poverty.depth.poverty-street-production-v2-pressure-winter-wind.crosswind.a.text`.

RU:
`Поперечный ветер режет переулок насквозь. Даже места за выступами стены быстро снова становятся холодными.`

EN:
`A crosswind cuts straight through the lane. Even spots behind the wall’s projections quickly turn cold again.`

## `poverty-street-production-v2.pressure-winter-wind` / `long-gusts`

### Candidate `b`

Key:
`presentation.poverty.depth.poverty-street-production-v2-pressure-winter-wind.long-gusts.b.text`.

RU:
`Длинные порывы трясут ставни и гонят по камням сухой мусор. Между ними едва успевает наступить тишина.`

EN:
`Long gusts rattle the shutters and drive dry scraps across the stones. There is barely time for quiet between them.`

## `poverty-pressure-production.cold-rain` / `default`

### Candidate `a`

Key:
`presentation.poverty.depth.poverty-pressure-production-cold-rain.default.a.text`.

RU:
`Холодная вода медленно подбирается под край укрытия. По камням уже тянется новая тонкая струйка.`

EN:
`Cold water slowly creeps beneath the edge of the shelter. A fresh thin stream is already running over the stones.`

### Candidate `b`

Key:
`presentation.poverty.depth.poverty-pressure-production-cold-rain.default.b.text`.

RU:
`Дождь косит вдоль улицы и добирается до привычного места. Чуть дальше виден более глубокий дверной проём.`

EN:
`Rain slants along the street and reaches the familiar spot. A deeper doorway is visible a little farther away.`

## `poverty-pressure-production.noisy-loading` / `default`

### Candidate `a`

Key:
`presentation.poverty.depth.poverty-pressure-production-noisy-loading.default.a.text`.

RU:
`Первый грузовой воз приезжает ещё до рассвета. Колёса, ящики и голоса сразу заполняют улицу шумом.`

EN:
`The first loading cart arrives before dawn. Wheels, crates, and voices fill the street with noise almost at once.`

### Candidate `b`

Key:
`presentation.poverty.depth.poverty-pressure-production-noisy-loading.default.b.text`.

RU:
`Рабочие перекрикиваются через улицу, пересчитывая ящики. Каждый новый воз делает этот угол ещё шумнее.`

EN:
`Workers call across the street as they count crates. Each new cart makes the corner louder.`

## `poverty-pressure-production.muddy-splash` / `default`

### Candidate `a`

Key:
`presentation.poverty.depth.poverty-pressure-production-muddy-splash.default.a.text`.

RU:
`Колесо телеги входит в лужу у самого края дороги. Грязные брызги успевают долететь до одежды раньше, чем воз проходит мимо.`

EN:
`A cartwheel hits a puddle at the edge of the road. Mud reaches the clothes before the cart has fully passed.`

### Candidate `b`

Key:
`presentation.poverty.depth.poverty-pressure-production-muddy-splash.default.b.text`.

RU:
`После проехавшей телеги на ткани остаются мокрые грязные пятна. На улице быстро привести одежду в порядок почти нечем.`

EN:
`Wet muddy marks remain on the fabric after the cart passes. There is little nearby to clean the clothes with properly.`

## Semantic constraints

The scene may communicate:
- cold;
- wind;
- rain;
- noise;
- mud;
- ordinary environmental pressure.

It must not state exact mechanical penalties before the player chooses.

It must not imply:
- death/terminal danger;
- forced work;
- lender pressure;
- hidden career;
- Secret Debt.

## Deterministic-use rule

Selection occurs only after the current gameplay event/variant is fixed.

No gameplay RNG, Save write, choice/effect mutation, or NightFlow mutation.
