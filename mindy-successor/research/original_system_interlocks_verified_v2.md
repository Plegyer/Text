# Simply Mindy v3.6.0 — verified system interlocks and numeric cross-effects v2

Status: **REFERENCE ONLY — verified from user-supplied SWF; never overrides successor Product authority.**

Source inspected in this pass:
- user upload: `Simply_Mindy_360(5).swf`;
- embedded UI version string: `v. 3.6.0`;
- SHA-256: `90c894bb7610e16d2c4150e119d4c08caf52b5527deca4dded9f8059109188d6`;
- file size: 44,588,359 bytes;
- SWF: compressed CWS, version 16.

This pass deliberately does not re-catalog facts already preserved in the existing original-game research. It focuses on **cross-system timing, affordability rules, hidden persistence and exact numeric coupling** that were not explicit enough in the earlier synthesis.

## 1. Housing stat payment preserves a hard floor instead of clipping

The existing housing reference already records the exact alternative stat-rent matrix:

| Year | Brimstone | Megahot | Ghostings | Darkly |
| --- | --- | --- | --- | --- |
| 1 | -1 Strength | -1 Durability | -1 Charisma | -1 Class |
| 2 | -1 Intellect | -1 Creativity | -1 Prowess | -1 Sociability |
| 3 | -2 Class | -2 Prowess | -2 Fuckability | -2 Spirit |
| 4 | -3 Intellect | -3 Charisma | -3 Sociability | -3 Class |
| 5+ | -4 Fuckability | -4 Sociability | -4 Class | -4 Strength |

Newly verified implementation detail from `SceneEvents_0` rent handler:

**the stat payment is allowed only when the chosen stat is strictly greater than the amount to be paid.**

The bytecode contains all 20 affordability checks:

- Year 1 cells: stat `<= 1` -> outdoor/no-rent sleep;
- Year 2 cells: stat `<= 1` -> outdoor/no-rent sleep;
- Year 3 cells: stat `<= 2` -> outdoor/no-rent sleep;
- Year 4 cells: stat `<= 3` -> outdoor/no-rent sleep;
- Year 5+ cells: stat `<= 4` -> outdoor/no-rent sleep.

Only the branch above that floor subtracts the rent stat cost.

Examples directly decoded:
- Year 1 / Brimstone checks `strength <= 1`; if true -> Scene 12 `noRent`; otherwise Strength -1.
- Year 5+ / Brimstone checks `fuckability <= 4`; if true -> Scene 12; otherwise Fuckability -4.

Therefore housing pressure does **not** become free merely because a stat has hit zero or another low floor. If the player cannot safely pay the stat cost, the game changes the night outcome instead.

This is a useful contrast with ordinary work penalties that can become ineffective after repeated floor clipping.

### Cash affordability is equally explicit

Cash rent uses the same style of hard gate:

- $100 tier: `money <= 99` -> no-rent;
- $300 tier: `money <= 299` -> no-rent;
- $600 tier: `money <= 599` -> no-rent;
- $1,000 tier: `money <= 999` -> no-rent;
- $1,500 tier: `money <= 1499` -> no-rent.

So the player must actually possess the full payment before the paid-sleep route is available.

## 2. Rent is a very large full-run economy sink

Existing verified normal-mode cash rent:
- Year 1: $100/night;
- Year 2: $300/night;
- Year 3: $600/night;
- Year 4: $1,000/night.

With the normal 40-day year and a timeout run that sleeps through all four normal years, an all-cash lodging strategy has a **derived** gross rent burden of:

`40 × (100 + 300 + 600 + 1000) = $80,000`.

This is not a literal single constant in the SWF; it is derived from the verified calendar and rent schedule.

The `gasparButlerEnding` Year-0 bonus adds another 40-day year. The rent code treats `year <= 1` as the first rent tier, so an all-cash Year 0 adds up to another **$4,000** of lodging pressure before the later years.

This helps explain why original job wages, contest prizes, large starting-money endings and late $15,000–$20,000 Title prices occupy much larger numeric ranges than successor values.

## 3. Starting work income versus Year-1 rent

Using the already-verified wage formulas and all relevant wage stats at their fresh-run value of 1, the expected midpoint wage per shift is approximately:

| Starter job | Expected midpoint / shift | Three shifts gross |
| --- | ---: | ---: |
| Camwhore | $26 | $78 |
| Farmer | $41 | $123 |
| Maid | $40 | $120 |
| Guard | $41 | $123 |

These are **derived reference values**, not literals and not long-run simulations. They use the midpoint of the inclusive random base and the known stat coefficients.

The relationship is still informative:
- Year-1 cash rent is $100/night;
- three fresh Camwhore shifts do not cover one cash rent payment;
- three fresh Farmer/Maid/Guard shifts only narrowly exceed it before School, items, dungeon costs or other spending.

Thus the original early economy intentionally makes housing compete with action use and build investment.

## 4. The "$200 every day" Meta reward is actually sleep-path scoped

The ending reward associated with `endJizzBizBand` sets:

`bandBonus = true`.

Its text describes automatic $200 each day.

Raw bytecode shows a narrower implementation.

### Normal paid sleep — Scene 15

On entering `sleepPaid`, before Stamina is reset and before the day increments:

1. if `bandBonus == true`, money += **200**;
2. if `sexFroglord == true`, generate `randomInt(180,220)` and add that money too;
3. set Stamina = 3;
4. day += 1;
5. `newDay = true`.

Therefore, when both conditions are active, normal paid sleep can stack:

`+$200 + random $180–220 = +$380–420`

before the new day begins.

### Finale sleep — Scene 352

The Finale-specific `sleepFrog` scene also checks `bandBonus` and grants +200 before its day transition.

It does **not** contain the normal `sexFroglord` random-income block.

### Forced/outdoor nights

An exhaustive push-string scan finds runtime `bandBonus` reads only in:
- Scene 15 normal paid sleep;
- Scene 352 Finale sleep;

plus the achievement enable/disable handler.

It is not read by:
- Scene 12 `noRent`;
- Scene 101 `sleepWhitest`;
- Scene 138 `sleepScared`.

So the user-facing "each day" bonus is not a universal calendar tick. A night route that bypasses the qualifying sleep scene can suppress the payment entirely.

This also creates an important ordering effect:

**rent is resolved before entering Scene 15, while the +200 is awarded inside Scene 15.**

Therefore the +200 cannot rescue the rent payment that was already due that night. If insufficient money sends the player to outdoor sleep, the normal +200 payment is skipped as well.

## 5. Relationship income and Meta income can stack

The normal paid-sleep scene contains a separate relationship check:

`sexFroglord == true -> randomInt(180,220) money`.

This is independent of `bandBonus`.

Thus the original allows two different persistent systems to feed the same night economy:
- ending/meta reward: fixed +200;
- relationship state: random +180–220.

Their shared attachment point is the normal paid-sleep scene rather than the main day loop.

This is a concrete example of why subsystem **timing** matters as much as reward magnitude.

## 6. Broad Stamina Meta bonuses apply after negative night base values

Existing research already established the pieces:
- normal paid sleep establishes base Stamina 3;
- no-rent and scared sleep establish base 2;
- forced `sleepWhitest` can establish base 2, then 1, then 0;
- night reading effectively leaves the next day at base 2;
- `staminaBoost` can contain two independently selected +1 ending rewards;
- equipped Busy Bee Title adds another +1.

The new cross-system synthesis is the ordering:

`sleep/night result establishes base Stamina -> main newDay handler adds staminaBoost -> Busy Bee adds +1`.

So the effective next-day formulas are:

- normal paid sleep: `3 + staminaBoost + BusyBee`;
- night reading: `2 + staminaBoost + BusyBee`;
- no-rent: `2 + staminaBoost + BusyBee`;
- scared forced sleep: `2 + staminaBoost + BusyBee`;
- Whitest forced route: `(2 / 1 / 0) + staminaBoost + BusyBee`.

With both +1 ending rewards enabled and Busy Bee equipped, the broad Meta/Title layer can contribute **+3** after the night outcome.

Historical balance implication:
a sufficiently broad action-economy Meta stack can partially or completely offset pressure that the night system intended to create.

This is reference evidence only. Successor D19/D27 separately require Secret Debt's next-day Energy -1 to remain a real loss relative to the same unbound loadout.

## 7. Exact hidden cap-200 chain

Earlier research correctly recorded that `endMoeLose` says its reward "Does... nothing?" but participates in a hidden stat-cap route. This pass recovered the exact chain.

### Step A — select the ending bonus

On the achievement screen, enabling `endMoeLose`:
- sets `easterEggActive = true`;
- increments `finaleBonusCount` by 1.

Disabling it:
- sets `easterEggActive = false`;
- decrements `finaleBonusCount`.

### Step B — dungeon chest visibility

In Scene 59, actor 230 is removed when `easterEggActive == false`.

Therefore enabling the ending bonus exposes the hidden chest/interactable.

### Step C — first opening

The chest click handler checks `statBoost`.

When the upgrade has not yet been obtained, the interaction routes to Scene 217.

Scene 217 writes:
- `easterEggActive = false`;
- `statBoost = true`.

### Step D — persistent clamp change

The main stat-clamp handler reads `statBoost`.

With `statBoost == true`, the eleven normal original stats are clamped to:
- minimum 0;
- maximum **200**.

The ordinary branch clamps them to the normal 100 ceiling.

Existing reset research confirms `statBoost` is outside the ordinary run-reset writes, so after the hidden interaction it behaves as a persistent upgrade.

Structural chain:

`earned endMoeLose -> enable bonus -> reveal hidden dungeon chest -> open once -> permanent statBoost -> cap 200`.

This is a deliberately indirect original reward. It should not be copied over the successor's explicit D24 contract; it is useful only as historical evidence that the original already treated a doubled stat ceiling as a special late Meta rule rather than free doubled values.

## 8. Final Mode reads the size of the selected Meta loadout

Every enabled original ending bonus increments `finaleBonusCount`.

The final battle in Scene 369 uses that count in two independently verified ways.

### 8.1 Boss numeric tiers

| Enabled ending bonuses | monsterBonus | Added monster Health |
| ---: | ---: | ---: |
| 0 | -10 | +0 |
| 1–15 | 0 | +3000 |
| 16–30 | +15 | +5500 |
| 31–45 | +30 | +8000 |
| 46+ | +45 | +10000 |

`monsterBonus` is not decorative. The final battle adds it to multiple enemy combat rolls; verified examples use forms such as:

- `randomInt(1,200) + monsterBonus`;
- `randomInt(1,150) + monsterBonus`;
- several `randomInt(1,100/60/40) + monsterBonus` paths.

Exact interpretation of every attack code is intentionally left for a dedicated combat pass, but the direction is unambiguous: a larger selected Meta loadout raises the final encounter's numeric pressure.

### 8.2 Attack-selection range also changes

The same battle chooses `_triAttack` from different ranges:

| finaleBonusCount | random attack-code range |
| ---: | --- |
| 45+ | 0–12 |
| 30–44 | 1–12 |
| 15–29 | 2–12 |
| 1–14 | 3–11 |
| 0 | 5–10 |

The thresholds are not identical to the Health/`monsterBonus` tiers: notably the widest attack range begins at **45**, while the top numeric tier begins at **46**.

Do not infer that every newly included attack code is strictly stronger without decoding each attack. What is verified is that Meta loadout size changes both:
- boss numerical tuning;
- the set/range of attack codes available to the encounter.

This is a concrete historical implementation of:

`more pre-run Meta power -> stronger late challenge`.

## 9. Why these interlocks matter for successor design

These findings are reference, not authority.

Useful lessons:

1. **Resource floors need an alternate consequence.**  
   Original rent does not keep subtracting into the floor; inability to pay changes the night state. This avoids a pressure system becoming inert at zero.

2. **Reward timing can create accidental traps.**  
   A nominal "$200/day" reward that fires after rent and only on selected sleep paths is materially different from true passive income.

3. **Broad action bonuses can erase narrow penalties.**  
   Original Stamina Meta/Title stacking demonstrates exactly the dominance hazard D27 is intended to avoid.

4. **Persistent upgrades need a clear persistence boundary.**  
   The original hidden cap-200 route crosses ending selection, dungeon content and permanent Meta state.

5. **Meta power can feed difficulty rather than only flatten it.**  
   Finale uses selected bonus count as explicit challenge input.

6. **Numbers only make sense in the whole economy.**  
   Large wages, $3,000 contest prizes, $15k–$20k Titles and multi-thousand-dollar Meta rewards coexist with a derived full-run cash-rent burden around $80k.

## 10. Next raw-extraction priorities

High-value remaining catalog work:

1. verify actual enable/disable runtime effects for all 66 ending bonuses, not only their descriptions;
2. produce a machine-readable graph of ending flag -> active bonus state -> affected stat/rule/job/item/Title -> Finale count;
3. finish exact career-route dependency graphs for jobs whose intermediate gates are only partially catalogued;
4. decode the final battle's attack-code semantics so the `finaleBonusCount` range changes can be classified by real threat type;
5. inventory other recurring money sources/sinks by **timing hook** (action, main reaction, sleep, new-day, contest, dungeon) rather than only by nominal amount;
6. continue cross-system searches for cases where an ending/Title unexpectedly changes an unrelated route because of shared global state.

Authority rule remains:
explicit successor Product decisions > current successor locked docs > original-game reference.
