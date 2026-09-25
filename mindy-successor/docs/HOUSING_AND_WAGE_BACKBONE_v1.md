# Housing + Wage Backbone v1

Дата: 2026-09-25.

Статус: **SIMULATION-SUPPORTED PRODUCT/BALANCE CANDIDATE**.

Основание:
- locked 160-day / 4-year calendar;
- 3 daily Energy;
- only explicit actions spend Energy;
- fresh life should be hard;
- later jobs pay more;
- original reference increases rent sharply over years and makes poor outdoor sleep mechanically bad;
- School can repair stat losses.

## 1. Economic backbone

Candidate target:

| Year | Expected accessible job tier | Average shift target | Normal lodging | Cheap lodging |
|---:|---|---:|---:|---:|
| 1 | starting | ~1 WU | 2 WU/night | 1 WU |
| 2 | mid | ~2 WU | 4 WU/night | 2 WU |
| 3 | late | ~3 WU | 6 WU/night | 3 WU |
| 4 | late/career-ranked | ~4 WU | 8 WU/night | 4 WU |

This is a balance backbone, not a rule that every job pays exactly the tier average.

## 2. Why this shape works

At expected tier income:

### Normal lodging

Two average shifts/day:
- Year 1: 2 × 1 = 2 WU;
- Year 2: 2 × 2 = 4;
- Year 3: 2 × 3 = 6;
- Year 4: 2 × 4 = 8.

So two Work actions approximately cover that day's normal lodging.

The third daily Energy remains available for:
- School;
- another job;
- Activity saving/preparation;
- deliberate extra income.

School still costs money, so using the third Energy for School usually requires:
- starting cash;
- prior savings;
- occasional third work shift;
- cheap housing;
- better-than-average wage;
- Activity/trade income.

That is the intended fresh-life pressure.

### Cheap lodging

One expected-tier shift/day approximately covers the bed.

The player gains much more daytime freedom but gives up housing quality/Night access.

This creates a real poverty strategy rather than a pure failure state.

## 3. Starting money

Current candidate:
- 12 WU.

At Year-1 normal lodging:
- covers 6 nights.

At visible candidate scale 1 WU≈50:
- 600 starting currency;
- 100 Year-1 normal lodging;
- 50 cheap lodging.

This reference-like ratio remains useful.

## 4. Normal room

Candidate properties:
- full voluntary Night menu;
- private relationship visits where route allows;
- night study;
- no routine next-day Energy penalty;
- no routine stat loss;
- storage/private-space hooks where needed.

Normal room does **not** grant free stats merely for sleeping.

Its value is reliability and access.

## 5. Cheap lodging

Candidate:
- half normal lodging price;
- restores normal base next-day Energy;
- no universal permanent stat penalty;
- limited privacy.

Night policy:
- basic sleep available;
- night study available where fiction allows;
- public/non-private relationship meetings may remain available;
- scenes tagged `requires_private_lodging` unavailable;
- some item/storage/guest options unavailable.

Optional cheap-lodging event pool may create:
- noise;
- roommates;
- theft/scuffle;
- helpful acquaintance;
- seasonal variants.

Do not make a random penalty happen every night.

## 6. Street

Candidate baseline deliberately closer to the useful original poverty pressure:

- cost = 0;
- next-day Energy = base -1;
- Grooming -1;
- Charm -1;
- Manners -1;
- no ordinary private Night menu;
- street-specific events;
- Secret lender can appear here.

Stats floor normally prevents going below minimum.

These are **candidate** mapped analogues of original outside sleep losing Cleanliness/Charisma/Class plus one Stamina.

Because School can repair stats, this is a recoverable cost rather than an irreversible spiral.

## 7. Street recovery

Starting from 0 money:

street night
-> next day 2 Energy
-> two starter shifts ≈ 2 WU
-> enough for one Year-1 normal room OR two cheap beds

Therefore 0 money is not a softlock.

Player can choose:
- recover immediately to normal room;
- move to cheap lodging and save;
- remain street to accumulate money faster at the cost of Energy/social stats.

## 8. Annual backbone simulation

Assume exactly expected-tier wage and normal lodging.

40 days/year.

Two work shifts/day produce:

- Year 1: 80 WU income / 80 rent;
- Year 2: 160 / 160;
- Year 3: 240 / 240;
- Year 4: 320 / 320.

Total:
- 800 WU work income;
- 800 WU normal rent.

This means normal housing deliberately consumes the value of ~2 daily Energy at the expected wage tier.

Starting money, School, better wages, cheap housing, Activity income and meta rewards create the actual strategic space.

## 9. Career wage variance

Individual jobs should not all pay the same.

Candidate behavior:

### Starting
around 1 WU average:
- Lumber stable;
- Satyr Maid variable tips;
- Farm base + seasonal goods.

### Mid
around 2 WU average:
- Tavern guest flow;
- Hunter variable contracts/resources;
- Guard salary/risk;
- Merchant margin.

### Late
around 3 WU base-equivalent:
- Artist event/patron spikes;
- Assassin contract spikes;
- Prostitute client/status variation.

Career rank and relevant stats can push actual income above tier average.

By Year 4, strong late-career work should commonly approach ~4 WU average-equivalent.

## 10. Why escalating rent matters

Without rent growth:
- later wages trivialize housing inside a single fresh run;
- No Rent meta reward loses late value;
- poverty becomes almost exclusively early-game.

Escalating lodging preserves pressure across the four-year life while higher-tier jobs provide the intended answer.

NG+ still becomes easier because:
- starting stats unlock better jobs sooner;
- money perks help;
- No Rent removes the whole ladder;
- +Energy creates extra earning/study capacity.

## 11. No Rent perk impact

Under this backbone, normal lodging over a full 160-day run costs:

- Year1 80 WU;
- Year2 160;
- Year3 240;
- Year4 320;
- total **800 WU**.

Therefore a No Rent complex-ending perk is intentionally enormous.

That is acceptable for a strong meta reward.

## 12. Cheap lodging is not a worse normal room

It is a different route:
- much stronger economy;
- weaker privacy/relationship access;
- poverty-specific content.

Some players may intentionally stay cheap for School/stat acceleration.

That supports LIFE-05.

## 13. Exact final numbers still open

Before lock:
- simulate actual per-job salary formulas;
- verify 2/4/6/8 against salary distributions;
- decide cheap-lodging event frequency;
- confirm Street stat losses;
- test School access under all three housing modes;
- test No Rent/+Energy meta combinations.
