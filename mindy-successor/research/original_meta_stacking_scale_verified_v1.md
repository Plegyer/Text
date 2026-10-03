# Simply Mindy v3.6.0 — Meta stacking scale verified v1

Status: **REFERENCE ONLY / DERIVED FROM VERIFIED RUNTIME HANDLERS.**

Sources:
- user-supplied `Simply_Mindy_360(5).swf`;
- embedded version `v. 3.6.0`;
- SHA-256 `90c894bb7610e16d2c4150e119d4c08caf52b5527deca4dded9f8059109188d6`;
- `original_ending_bonus_runtime_graph_v2.csv`;
- `original_ending_bonus_runtime_verified_v2.md`;
- verified new-run / sleep / rent research.

Purpose:
quantify what the original selectable ending-bonus layer can do when many bonuses are enabled together.

This is historical scale evidence only. It does not authorize successor reward values.

## 1. All 66 selectable ending bonuses use the same Finale cost unit

The runtime graph contains exactly 66 selectable ending bonus entries.

Each enabled entry increments:

`finaleBonusCount += 1`

and each disable path decrements it by 1.

The cost model therefore ignores systemic reach:
- +5 to one stat costs 1;
- +1 daily Stamina costs 1;
- No Rent costs 1;
- +$200 sleep income costs 1;
- an early-job unlock package costs 1;
- a spell/equipment grant costs 1.

This is the core balance asymmetry of the original loadout model.

## 2. Fixed starting-stat stack

Across the literal fixed-stat add handlers, enabling all applicable fixed bonuses adds:

| Stat | Fixed bonus total | Fresh base 1 -> before allocation/carry-over |
| --- | ---: | ---: |
| Charisma | +46 | 47 |
| Strength | +37 | 38 |
| Durability | +45 | 46 |
| Prowess | +39 | 40 |
| Intellect | +32 | 33 |
| Spirit | +32 | 33 |
| Fuckability | +87 | 88 |
| Cleanliness | +32 | 33 |
| Creativity | +35 | 36 |
| Sociability | +42 | 43 |
| Class | +32 | 33 |

Total fixed starting-stat power:

**+459 stat points**

across the eleven normal allocated stats.

Morality is separate and is not part of this sum.

The normal new-run flow also gives the player 10 manual allocation points before the achievement-bonus screen. Therefore a fresh run with all fixed stat bonuses enabled contains:

`11 base points + 10 allocation + 459 fixed Meta = 480 normal-stat points`

before the dynamic quarter-stat carry-over is added.

This is a derived total from verified writes, not a single SWF constant.

## 3. Game Theorist adds a dynamic carry-over layer on top

`endContest4Win` is not included in the +459 fixed total because its handler uses the preserved `4ContestBonusStats` snapshot.

Earlier bytecode verification established:

`snapshotStat = ceil(previousRunStat / 4)`

for each of the eleven normal stats.

Therefore the maximum snapshot contribution from a previous run capped at 100 is:

`11 × 25 = +275`

additional pre-clamp stat points.

If the persistent hidden `statBoost` cap-200 upgrade has already been obtained and a prior run actually reaches 200 in all eleven stats, the mathematical snapshot ceiling is:

`11 × 50 = +550`.

These are theoretical snapshot ceilings from the verified formula. Actual values depend on the prior run.

Because the main loop clamps stats, the useful realized value can be lower once a stat reaches its current cap.

## 4. Fixed starting-money stack

Five selectable endings directly add fixed starting money:

- `endNoRent`: +$2,000;
- `endJizzBizKill`: +$4,000;
- `endEmmShopKeeper`: +$4,000;
- `endTaroSheDevil`: +$6,666;
- `gasparCEOEnding`: +$2,000.

Combined fixed Meta money:

**+$18,666**

Fresh reset money is $600, so with all five active:

**$19,266 starting money**

before any work, contest, sleep income or other economy source.

For scale, the separately derived all-cash Years-1–4 rent burden is about $80,000.

## 5. Action-economy stack

Two independent selectable ending bonuses mutate the same accumulator:

- `chicoPenitentEnding`: `staminaBoost +1`;
- `endContest5Win`: `staminaBoost +1`.

Together:

`staminaBoost = +2`.

Normal paid sleep establishes base Stamina 3 before the main new-day layer adds the boost.

Therefore:
- normal sleep + both ending bonuses -> 5 Stamina;
- if Busy Bee is the one active Title -> 6 Stamina.

Busy Bee is a separate Title layer, not a third ending bonus.

Negative-night bases are also modified afterward by the same broad boost, which is why the original can partially erase intended Night pressure.

## 6. Time extension stacks with daily action power

`gasparButlerEnding` sets the starting year to 0.

The verified normal calendar then becomes:
- Year 0;
- Year 1;
- Year 2;
- Year 3;
- Year 4;
- terminal Year 5 transition.

This adds 40 calendar days, taking the maximum normal-calendar span from 160 to 200 days.

Because the Stamina bonuses are independent selectable entries, the original allows:
- extra calendar time;
- extra daily actions;

to stack in the same run.

This is a multiplicative systems interaction, not merely two additive resource bonuses.

## 7. Broad economy stack

Two independent rule modifiers can be active together:

### No Rent

`endLandLadyJob -> disableRent = true`

This bypasses the normal rent payment resolver and enters paid sleep.

### Passive sleep income

`endJizzBizBand -> bandBonus = true`

Qualifying paid sleep grants +$200.

Because No Rent routes into the same paid-sleep implementation where `bandBonus` pays, the two broad modifiers stack rather than substitute for each other.

Derived scale over 160 qualifying normal sleeps:
- +$200 stream gross maximum: $32,000;
- removed all-cash Years-1–4 rent sink: about $80,000.

The combination can therefore change the economic problem far more than their identical two Finale-count units suggest.

## 8. Early-access stack

Eight normally gated jobs have independent toggleable Meta triggers:

- Glory Hole;
- Cosplayer;
- Bikini Model;
- Cabaresque;
- Prostitute;
- Arm Candy;
- Geisha;
- Mascot.

Enabling all eight removes all eight corresponding late-job stat/year availability gates for the new run.

The four original starter jobs are already available without these triggers.

Thus the original Meta layer can effectively collapse the normal 4-starter / 4-Year-2 / 4-Year-3 availability structure into all twelve jobs being accessible early.

This is historical evidence for why access rewards can be powerful even when they contain no raw stat points.

## 9. Dungeon-access stack

`endEmmWarrior` enables all three normal dungeon intro flags:

- `doneDungeonIntro = true`;
- `doneDungeon02Intro = true`;
- `doneDungeon03Intro = true`.

So one Finale-count unit can replace several ordinary access steps at once.

Again, original cost is per ending entry, not per number of systems/gates bypassed.

## 10. Spell coverage

Seven selectable ending bonuses collectively grant every indexed spell slot found in the runtime array:

`spellHave[0..11]`.

Combined enable coverage:

**12 / 12 spell slots**

The runtime graph also proves two reversal defects:

- `endIntBeastLoss` enables slots 0 and 5 but disables slot 5 twice, leaving slot 0;
- `endStrBeastLoss` enables slots 4 and 10 but disables only slot 4, leaving slot 10.

Therefore an enable-all -> disable-all cycle is not semantically clean in this original build.

## 11. Equipment / seduction coverage

Selectable bonuses can independently grant:
- sword tiers 1, 2 and 3;
- armour tiers 1, 2 and 3;
- accessory slots 3, 4 and 11;
- seduction move slots 2 and 3.

These grants coexist with stat, money, action-economy, access and rule bonuses.

The original loadout therefore does not force the player to choose a reward family; once earned, many families can stack simultaneously.

## 12. Title unlock side effects

Fourteen Title indices are written by selectable ending-bonus handlers:

`6..18` except 19, plus 20.

These Title unlock writes generally do not reverse when the corresponding ending bonus is disabled.

This is intentional/persistent for most Titles, but it means the achievement screen mixes:
- current-run reversible mutations;
- persistent unlock side effects.

Separately, Jerry's ending acquisition scene unlocks Title 19 (Blimp Enthusiast), while enabling the Jerry bonus unexpectedly writes Title 20 (Immunologist).

## 13. The original all-enabled state is systemically much stronger than a stat sum

An all-enabled profile can simultaneously contain:

- +459 fixed starting stat points;
- dynamic previous-run quarter-stat import;
- +$18,666 fixed starting money;
- +2 daily Stamina from ending bonuses;
- an additional +1 Stamina if Busy Bee is equipped;
- 40 extra calendar days;
- No Rent;
- +$200 qualifying-sleep income;
- all eight late-job early-access triggers;
- all three normal dungeon intros bypassed;
- all 12 spell slots granted;
- multiple equipment and seduction grants;
- many persistent Title unlocks;
- hidden cap-200 activation access.

The Final Mode response sees this only as the integer count of enabled ending entries.

That model creates large differences in power-per-count.

## 14. Why this matters for successor D27

This research strongly supports the current successor distinction between:
- broad Keystone-class rule changes;
- narrower Specialist-class modifiers;
- ordinary Hard Work packages as their own layer.

The historical problem is not that the original had strong rewards. The problem is that effects with radically different systemic reach share one flat opportunity-cost unit and can often stack without a normal-run counterweight.

Successor should therefore evaluate at least:
- action-economy reach;
- calendar reach;
- economy-sink removal;
- access bypass breadth;
- persistent versus current-run semantics;
- interactions with forced negative states;
- exact inverse behavior on deselection.

Do not copy any original magnitude automatically.

## 15. Regression implication

For every successor selectable Meta modifier, test both isolation and combinations.

Minimum contract:

`baseline -> enable A -> enable B -> verify composed state -> disable A -> verify only A reversed -> disable B -> semantic baseline`.

A separate test must cover permanent unlock side effects that intentionally survive deselection.

The original spell and Title wiring findings demonstrate why pairwise/combinational inverse tests are necessary.
