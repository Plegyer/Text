# Simply Mindy v3.6.0 — direct route numeric-condition census v1

Status: **REFERENCE ONLY / RAW ROUTER CENSUS.**

Source:
- user-supplied `Simply_Mindy_360(5).swf`;
- embedded version `v. 3.6.0`;
- SHA-256 `90c894bb7610e16d2c4150e119d4c08caf52b5527deca4dded9f8059109188d6`;
- main reactive router: `SceneEvents_0`.

Purpose:
preserve the **literal numeric checks and cross-system attributes** read by each normal-mode route listener before a later pass turns them into full topology graphs.

## Important interpretation rule

This is a condition census, **not a claim that every number is a standalone sequential milestone**.

The original listeners combine:
- numeric checks;
- prior scene-completion flags;
- branch flags;
- item/quest flags;
- relationship/night counters;
- shared route sentinels.

A literal such as `cosplayVisit >= 5` can occur late in a branch because an earlier completion flag is also required. Therefore do not sort these numbers and infer a linear 5 -> 10 -> 15 career without tracing the surrounding booleans.

The common facts already established elsewhere still hold:
- ordinary work ending opportunity: 50 visits/shifts;
- common career-start scene: 15 visits for all twelve jobs;
- ending eligibility is a separate Sinner's Orb opportunity.

## Global progression listener

Direct normal-mode numeric checks include:
- early dungeon intro: Strength 12 + Durability 15;
- terminal normal run: Year 5 route;
- contest breadth/volume state;
- 5 total contest wins;
- 6 total contest losses.

This listener is separate from the individual career/relationship listeners.

## Shirley / no-rent chain

Direct numeric checks:
- `noRentCount >= 5`;
- `noRentCount >= 20`;
- Intellect 20;
- Intellect 40;
- Intellect 60;
- Spirit 30 in the late high-Intellect branches;
- `shirleySexCount` 5 / 10 / 15 / 20;
- `shirleyScareCount` 5 / 10.

Cross-system reads:
- housing failure counter;
- Intellect/Spirit build;
- voluntary relationship state;
- forced-night scare counter.

The same storyline therefore reacts to both successful/voluntary nights and negative/forced sleep history.

## Camwhore / Jerry

Direct numeric checks:
- `camwhoreVisit >= 15`;
- Intellect >= 20;
- `jerrySexCount` >= 5 / 10 / 15;
- `camwhoreVisit >= 50`.

Non-numeric external dependencies:
- `JArmsGot`;
- `JHeadGot`;
- `JLegsGot`;
- `JTorsoGot`.

Pattern:
work -> stat gate -> four external/object flags -> repeated relationship/night counter -> work-ending opportunity.

## Guard / Wall / Su

Direct numeric checks:
- `wallVisits >= 15`;
- `monsterKills >= 10`;
- a Sociability boundary around 1 in the route branch;
- `suSexCount` >= 5 / 10 / 15;
- `wallVisits >= 30` in a later branch;
- Intellect >= 30 plus Prowess >= 30 in a late branch;
- `wallVisits >= 50`.

Pattern:
work progression is explicitly connected to the global combat/dungeon kill counter.

The 30-work check is real bytecode evidence, but it belongs to a route branch and must not be generalized into a universal original 30-shift milestone.

## Glory Hole / JizzBiz

Direct numeric checks:
- `gloryHoleVisit >= 15`;
- Prowess >= 30;
- Sociability >= 40;
- `jizzBizFailCount` >= 10;
- `jizzBizSexCount` >= 5 / 10 / 15;
- another `jizzBizFailCount >= 5` branch;
- `gloryHoleVisit >= 50`.

Pattern:
the route tracks both positive/repeated relationship participation and a separate failure-volume axis.

## Maid / Froglord

Direct numeric checks:
- `hotelVisit >= 15`;
- Charisma >= 20;
- Sociability >= 20;
- `frogLordSexCount` >= 5 / 10;
- `frogLordKillCountdown` sign/zero boundary;
- late Charisma >= 35 + Sociability >= 35;
- `hotelVisit >= 50`.

Cross-system relationship:
`sexFroglord` is also read by normal paid sleep, where it can generate random $180–220 income. Therefore the same relationship state affects both career routing and recurring night economy.

## Cosplay / Chico

Direct numeric checks found in this listener:
- `cosplayVisit >= 15`;
- **`bookRead >= 10`**;
- Strength >= 20;
- Prowess >= 20;
- Durability >= 20;
- Fuckability >= 30;
- `chicoSexCount` >= 5 / 10;
- flag-gated `cosplayVisit >= 5` and `>= 10` checks;
- Intellect >= 30;
- `chicoCountdown` sign/zero boundary;
- `cosplayVisit >= 50`.

External state:
- `braGot`.

Important cross-system link:
`bookRead` is produced by the voluntary night-reading option. The Cosplay route therefore contains a literal gate on repeated use of the Night/Study subsystem, not only work or stats.

## Farmer / John

Direct numeric checks:
- `zombieVisit >= 15`;
- Intellect >= 20 + Sociability >= 20;
- `johnSexCount` >= 5 / 10;
- `johnSpurnCountdown` >= 5 / 10 / 15 / 20 / 25;
- a late branch after the countdown uses:
  - Strength >= 70;
  - Prowess >= 50;
  - Fuckability >= 30;
- `zombieVisit >= 50`.

External state:
- `brainGo`;
- `mushroomGot`;
- `sexFarmerJohn`.

This is one of the clearest examples of a career route combining work count, stats, quest state, Night/relationship state, item state and a long timer.

## Emm route

Direct numeric checks:
- **`moneySpentEmm >= 6000`**;
- **`blobKills >= 8`**;
- `emmSexCount` >= 5 / 10 / 15;
- `emmCount` >= 5 / 10 / 15 / 20.

External state:
- `judgeKill`;
- `sexEmm`.

This route directly connects economy spending and dungeon/combat performance to the relationship/story machine.

## Mascot / Gaspar

Direct numeric checks:
- `mascotVisit >= 15`;
- Class >= 20;
- `gasparSexCount` >= 5 / 10 / 15;
- `gasparCount` uses 5 / 10 / 15 thresholds across different branches;
- `mascotVisit >= 50`.

External state:
- `itemStocks`;
- `gasparLost`;
- `sexGaspar`.

The route therefore reads inventory/stock state in addition to work/stat/relationship progression.

## Bikini Model / Whitest / ShutterBug

Direct numeric checks:
- `modelVisit >= 15`;
- Charisma >= 30 + Prowess >= 30;
- Class >= 40;
- `whitestSexCount` >= 10 / 15 / 18;
- `shutterBugCountdown` sign/zero boundary;
- late Prowess >= 35 + Intellect >= 35;
- Intellect >= 50 in another late branch;
- `modelVisit >= 50`.

The same `sexWhitestWhite` route flag is a central Sleep override:
it can force the night and establish next-day Stamina 2 -> 1 -> 0 as that route progresses.

So Model is a direct career -> forced-night -> action-economy coupling.

## Cabaresque / Seu

Direct numeric checks:
- `cabaresqueVisit >= 15`;
- Cleanliness >= 30 + Class >= 30;
- Fuckability >= 40;
- `seuSexCount` >= 5 / 10;
- flag-gated `cabaresqueVisit >= 5` and `>= 10` checks;
- late Sociability >= 50 + Creativity >= 30;
- `cabaresqueVisit >= 50`.

As with Cosplay, the 5/10 checks exist in the listener but must be read with their prior flags; they are not evidence that every Cabaresque run always fires a generic 5- and 10-shift event.

## Geisha / Taro

Direct numeric checks:
- `geishaVisit >= 15`;
- Charisma >= 50;
- Prowess >= 60;
- `taroSexCount` >= 5 / 10 / 15 / 16;
- `taroCountdown >= 5`;
- late build:
  - Strength >= 60;
  - Prowess >= 60;
  - Durability >= 60;
- `geishaVisit >= 50`.

This route demonstrates very high late stat gates compared with its ordinary work-ending count.

## Prostitute + Arm Candy / Pimp Wars

These two professions are deliberately handled in **one shared reactive listener**.

Direct numeric checks include:
- `armCandyVisit >= 15`;
- `prostituteVisit >= 15`;
- Fuckability >= 30;
- Strength >= 40 + Durability >= 40;
- Intellect >= 40;
- Cleanliness >= 30;
- repeated Strength 40 + Durability 40 checks in later branches;
- `sooSexCount >= 5`;
- `pimpySexCount >= 5`;
- `prostituteVisit >= 50`;
- `armCandyVisit >= 50`.

Shared route state includes:
- `proArmAlly`;
- `proArmCountdown`;
- `sooGirlsCollected`;
- `donePimpWars02..05`.

### Sentinel values

The listener compares `sooGirlsCollected` against conspicuous sentinel values:
- 99;
- 100;
- 999;
- 1000.

These must not be interpreted as literal numbers of ordinary recruits without tracing the writes that create them. They are strong evidence that the shared Pimp Wars machine uses the same numeric field both as a quantity/state carrier and as special route markers.

That overloading is exactly the kind of implementation coupling the successor should avoid with typed state.

## Cross-system dependency summary

The router proves that original career/story progress is not isolated inside the work system.

Verified external dependencies include:

- **Night/study:** `bookRead`, partner sex counters, forced-night flags;
- **Combat/dungeon:** `monsterKills`, `blobKills`, `judgeKill`;
- **Economy:** `moneySpentEmm`, relationship night income;
- **Items/inventory:** J* body-part flags, `mushroomGot`, `braGot`, `itemStocks`;
- **Housing:** `noRentCount`, Shirley scare/relationship state;
- **Shared multi-career route:** Prostitute + Arm Candy -> Pimp Wars;
- **Timers/countdowns:** John, Froglord, Chico, ShutterBug, Taro, Pimp Wars.

This supports the existing architectural conclusion:
the original's richness comes from cross-system state, but its implementation relies heavily on shared globals and sentinel values.

## Next topology pass

For exact graph reconstruction, each listener should be converted into:

`required prior flags + numeric conditions -> scene -> writes -> next eligible branch`.

Highest-value next targets:
1. Prostitute + Arm Candy / Pimp Wars sentinel semantics;
2. Model forced-night route because it mutates next-day action economy;
3. Cosplay `bookRead` dependency;
4. Farmer late spurn route with its 25-count and 70/50/30 build;
5. Emm $6000 + 8-blob cross-system route.

No original threshold in this census becomes successor Product authority automatically.
