# Core Numeric Baseline v1

Дата: 2026-09-25.

Статус: **TARGET NUMERIC BASELINE v1**.

Числа ниже считаются рабочим baseline для implementation/simulation. Они могут тюниться после playtest, но исполнитель не должен самовольно заменять их другой экономикой.

## 1. Calendar

- 4 years.
- 40 days/year.
- 4 seasons/year.
- 10 days/season.
- 160 days/run.

## 2. Daily Energy

Fresh base:
- 3 Energy/day.

Explicit costs:
- ordinary Work = 1;
- School lesson = 1 + tuition;
- Large Activity entry = 2;
- reactive dialogue/event = 0 unless explicitly defined.

Night:
- relationship night = Night slot, 0 daytime Energy;
- night study = Night slot, next-day Energy -1;
- street sleep = next-day Energy -1;
- modifiers stack only if explicitly permitted by invariant.

Derived next-day Energy has floor 1 unless a special terminal/forced state explicitly overrides it.

## 3. Progression stat range

Normal target:
- min 0;
- max 100.

Creation:
- 12 progression stats start at 1;
- 10 free points distributed among them.

Lust:
- separate content axis;
- starting numeric value remains content/balance configurable;
- not part of the 10 creation points.

Meta may later unlock a higher cap through an explicit rule modifier; no hidden cap increase.

## 4. Wage Unit / visible scale

Baseline:
- 1 WU = 50 visible currency.

Fresh average starter shift:
- 1 WU = 50.

Starting money:
- 12 WU = 600.

The UI currency name/symbol remains content choice.

## 5. Housing

Normal:
- 2 WU = 100/night;
- no Energy penalty;
- full normal Night/privacy.

Cheap:
- 1 WU = 50/night;
- no universal Energy penalty;
- restricted Night/privacy/storage content.

Street:
- 0;
- next-day Energy -1;
- Grooming -1;
- restricted Night;
- poverty/street event pool.

## 6. School v1 balance packages

Repeatable paid baseline:

| Course | Cost | Effects |
|---|---:|---|
| Literacy & Numbers | 6 WU / 300 | +4 Reason, +2 Wits |
| Arcana | 10 WU / 500 | +4 Magic, +4 Reason, +2 Creativity |
| Rhetoric & Social | 6 WU / 300 | +3 Charm, +3 Sociability, +2 Wits |
| Etiquette & Presentation | 8 WU / 400 | +3 Manners, +3 Grooming, +2 Charm |
| Field Craft | 8 WU / 400 | +3 Dexterity, +3 Wits, +2 Creativity |
| Physical Training | 8 WU / 400 | +3 Strength, +3 Endurance, +2 Dexterity |
| Arts & Performance | 10 WU / 500 | +3 Creativity, +3 Charm, +2 Sociability, +2 Dexterity |
| Body Confidence | 8 WU / 400 | +3 Sexuality, +3 Grooming, +2 Endurance |

School still has track milestones/teachers/certificates on top of these reliable stat effects.

## 7. Night study

Target baseline:
- choose one stat supported by an enrolled/known School track;
- +2 to that progression stat;
- no tuition;
- consumes Night slot;
- next day Energy -1;
- does not directly grant certificate/milestone completion unless a track explicitly allows study-progress credit.

This is weaker per lost daytime action than paid School, but bypasses the money bottleneck.

Lust cannot be raised by generic night study.

## 8. Job unlocks

Start:
- only Lumber;
- Satyr Maid;
- Undead Farm.

Candidate stat gates are adopted as v1 baseline:

- Tavern: Charm 45 + Sociability 35; fallback Year 2.
- Hunter: Dexterity 25 + Endurance 20 + Wits 15; fallback Year 2.
- Guard: Strength 30 + Endurance 30 + Manners 20; fallback Year 2.
- Merchant: Wits 20 + Reason 20 + Sociability 15; fallback Year 2.
- Artist/Geisha: Creativity 35 + Manners 25 + Grooming 30; fallback Year 3.
- Assassin: Dexterity 30 + Wits 25 + Reason 20; fallback Year 3.
- Prostitute: Sexuality 55 + Charm 40 + Sociability 35; fallback Year 3.

Unlock is reactive immediately after a qualifying state change.

## 9. Hard Work

Ordinary Hard Work baseline:
- 50 completed shifts in that profession;
- profession must be currently available;
- no seasonal-breadth requirement;
- no romance requirement;
- no complex external quest requirement.

Eligibility does not finish run automatically.

Player commits ending separately.

One completed run awards at most the committed run ending/meta reward.

Therefore 10/10 Hard Work requires at least ten completed runs unless future design explicitly adds multi-ending completion, which is not baseline.

## 10. Hard Work automatic rewards

Current v1:
- Lumber: +3 starting Strength, +3 Endurance.
- Satyr Maid: +3 Charm, +3 Grooming.
- Undead Farm: +3 Reason, +3 Magic.
- Tavern: +3 Sociability, +3 Manners.
- Hunter: +3 Dexterity, +3 Wits.
- Guard: +3 Endurance, +3 Manners.
- Merchant: +600 starting money.
- Artist/Geisha: +3 Creativity, +3 Grooming.
- Assassin: +3 Dexterity, +3 Wits.
- Prostitute: +3 Sexuality, +3 Charm.

Unique, automatic, non-repeatable.

Palace unlock:
- all ten ordinary Hard Work flags true.

## 11. Strong Legacy slots

Before first Palace completion:
- 2 active strong Legacy perks.

After first Palace completion:
- 3 active strong Legacy perks.

Automatic Hard Work/knowledge/content unlocks do not consume slots.

## 12. Balance intent

Fresh:
- survival and School expensive;
- job gates require planning.

Mid:
- endings reduce friction substantially.

Late:
- ordinary survival can become trivial;
- challenge moves to complex endings/Activity/Palace/meta content.

Do not rebalance late profile back to fresh difficulty.
