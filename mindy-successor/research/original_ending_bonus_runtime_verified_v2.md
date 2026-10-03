# Simply Mindy v3.6.0 — ending bonus runtime graph verified v2

Status: **REFERENCE ONLY / DIRECT BYTECODE EVIDENCE.**

Source:
- user-supplied `Simply_Mindy_360(5).swf`;
- embedded version `v. 3.6.0`;
- SHA-256 `90c894bb7610e16d2c4150e119d4c08caf52b5527deca4dded9f8059109188d6`;
- main Stencyl ABC block: SWF tag 72, 8,519,400 bytes;
- achievement scene: `SceneEvents_72`.

Companion machine-readable file:
- `original_ending_bonus_runtime_graph_v2.csv` — all 66 ending flags, display descriptions and literal runtime writes from their enable/disable handlers.

## 1. SceneEvents_72 really contains 66 selectable ending bonuses

The scene declares `_end01` through `_end67`, but the recovered display/handler pairs contain **66 obtained-ending bonus entries**. This matches the earlier catalog count.

The code is divided into display listeners and mutation listeners. Each mutation listener checks the permanent ending flag, then lets the player toggle the corresponding `_endNN` state between `yes` and `no`.

Every normal selectable bonus increments `finaleBonusCount` by exactly **+1** when enabled and **-1** when disabled.

This confirms that Finale challenge cost is counted per enabled ending entry, not weighted by how strong the effect is.

## 2. Direct runtime families

### Starting-stat bonuses

The handlers directly add/subtract the advertised stat amounts. Examples include:
- `endTimesUp`: Fuckability ±5;
- `endCamWhore`: Charisma ±3, Creativity ±3;
- `endFrogLordLoss`: Strength/Durability/Prowess ±2 each;
- `endMoeBeat`: +20 / -20 to most normal stats;
- `endContest6Loss`: +2 / -2 to most normal stats;
- `endSooWin`: Fuckability ±20.

These are true current-run mutations rather than a separate persistent stat-bonus table.

### Starting money

Verified reversible current-run writes:
- `endNoRent`: money ±2000;
- `endJizzBizKill`: money ±4000;
- `endEmmShopKeeper`: money ±4000;
- `endTaroSheDevil`: money ±6666;
- `gasparCEOEnding`: money ±2000.

### Daily action economy

Two different selectable ending bonuses use the same accumulator:
- `chicoPenitentEnding`: `staminaBoost +1/-1`;
- `endContest5Win`: `staminaBoost +1/-1`.

They therefore stack to +2 before the separate Busy Bee Title layer.

### Broad economy/rule switches

- `endLandLadyJob`: `disableRent=true/false`;
- `endJizzBizBand`: `bandBonus=true/false`;
- `gasparButlerEnding`: enabling writes `year=0`; disabling restores `year=1`;
- `endMoeLose`: `easterEggActive=true/false`, which is the first step of the separately verified hidden cap-200 chain.

### Late-job early access

Exactly eight simple job bonuses toggle the eight normally gated jobs:
- `endGloryhole` -> `gloryTrigger`;
- `endCosplay` -> `cosplayTrigger`;
- `endModel` -> `modelTrigger`;
- `endCabaresque` -> `cabaresqueTrigger`;
- `endProstitute` -> `prostituteTrigger`;
- `endArmCandy` -> `armCandyTrigger`;
- `endGeisha` -> `geishaTrigger`;
- `mascotEnding` -> `mascotTrigger`.

Each is set `true` on enable and `false` on disable.

This is exact bytecode confirmation of the original's early-job-unlock family.

### Dungeon access

`endEmmWarrior` toggles all three:
- `doneDungeonIntro`;
- `doneDungeon02Intro`;
- `doneDungeon03Intro`.

All three become true on enable and false on disable.

### Equipment, spells and seduction moves

These are implemented through indexed `yes/no` arrays such as:
- `itemSwordGot`;
- `itemArmourGot`;
- `itemAccessories`;
- `spellHave`;
- `seductionList`.

Most such bonuses are genuinely reversible when deselected.

## 3. Title unlocks are not symmetric with bonus toggles

The bonus handlers set `titlesList[index] = "yes"` when the relevant bonus is first enabled.

They generally **do not set the Title back to `no` when the ending bonus is disabled**.

This matches the wider persistence model:
- ending bonus activation is a per-run loadout choice;
- Title unlocks are persistent collection state;
- only one `activeTitle` is equipped separately.

So “disable this ending bonus” does not mean “forget the Title that this bonus unlocked.”

Recovered Title index map used by these handlers:
- 6 Brick Shithouse;
- 7 Stonewall;
- 8 Slip 'n Slide;
- 9 Clever Girl;
- 10 Spirited Away;
- 11 Busy Bee;
- 12 Buff as Fuck;
- 13 Mentalist;
- 14 Combat Vet;
- 15 Come At Me;
- 16 Knife Fighter;
- 17 The Wiz;
- 18 Spiritual Leader;
- 19 Blimp Enthusiast;
- 20 Immunologist.

## 4. Verified copy-paste / reversal defects

### IntBeast spell removal bug

`endIntBeastLoss` enable path writes:
- `spellHave[0] = "yes"`;
- `spellHave[5] = "yes"`.

Its disable path writes:
- `spellHave[5] = "no"`;
- `spellHave[5] = "no"` **again**.

It never clears slot 0.

Therefore enabling and then disabling this ending bonus can leave one granted spell active.

### StrBeast spell removal bug

`endStrBeastLoss` enable path writes:
- `spellHave[4] = "yes"`;
- `spellHave[10] = "yes"`.

Its disable path clears only:
- `spellHave[4] = "no"`.

Slot 10 is not cleared in the recovered handler.

Again, the selectable bonus is not perfectly reversible despite the UI model.

These are direct code facts, not inferred design intent.

## 5. Immunologist / Jerry mismatch

The description catalog says:
- `endEmmDistraction` unlocks the Immunologist Title;
- `endJerry` starts with Gold Sword + Gold Armour and does not mention a Title.

The actual selectable-bonus handlers do something different:
- `endEmmDistraction` changes Fuckability ±5 and Finale count, but contains **no `titlesList` write**;
- `endJerry` grants Gold Sword + Gold Armour **and writes `titlesList[20] = "yes"`**, which is Immunologist.

There is a second, separate surprise in Jerry's ending acquisition scene (`SceneEvents_299`): accepting its ending writes:
- `titlesList[19] = "yes"` = **Blimp Enthusiast**.

So the verified runtime chain is:
- obtain/accept Jerry ending -> persistent Blimp unlock;
- later enable Jerry selectable ending bonus -> equipment + persistent Immunologist unlock;
- EmmDistraction's displayed Immunologist promise is not implemented in its selectable handler.

This appears to be a historical wiring/copy-paste mismatch. It is exactly why successor research should validate runtime state transitions rather than copy reward prose.

## 6. Contest carry-over is implemented as a snapshot import

`endContest4Win` is the one large bonus whose raw writes are not expressible as simple ± constants in the companion CSV.

Its handler reads the preserved `4ContestBonusStats` array and adds/removes the stored values across the normal stat set. Earlier verification established those stored values as `ceil(previousStat / 4)`.

So toggle reversal uses the saved snapshot values rather than recomputing currentStat/4 at disable time.

## 7. Why this matters for successor design

Historical lessons only:

1. **Displayed reward text is not enough.** Even a small system can contain mismatched indices and incomplete reversal paths.
2. **Persistent unlock vs active modifier must be separate state.** The original Title behavior demonstrates this clearly.
3. **Reversible pre-run loadouts need exact inverse tests.** The two spell bugs are textbook regression cases.
4. **Broad and narrow bonuses should not share equal opportunity cost blindly.** Every original ending costs one `finaleBonusCount`, even though No Rent and +5 to one stat are radically different in reach.
5. **Successor D21-D27 are intentionally cleaner contracts.** This catalog is evidence for stronger typed IDs, explicit current-run snapshots and exact enable/disable tests; it is not authority to port these rewards.

## 8. Recommended regression pattern for successor Meta

For every future selectable reward/package:

`fresh state -> enable -> assert exact delta -> disable -> assert byte-for-byte semantic baseline`

plus a separate persistence assertion for unlocks that are intentionally permanent.

This should be mandatory for:
- stat packages;
- Energy modifiers;
- economy modifiers;
- access flags;
- item/spell/equipment grants;
- cap changes;
- any future Keystone/Specialist reward.
