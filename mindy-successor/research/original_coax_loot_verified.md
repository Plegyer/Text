# Simply Mindy — verified Coax loot / stealing

Источник истины: [SWF] main ABC, `SceneEvents_44`, steal resolver method 32407. Имена monster ID сопоставлены с `original_monster_id_map.csv`.

## Системная роль

[SWF] Coax — не декоративная реплика, а отдельный loot-channel внутри Seduction combat.

- успешный Coax выставляет `_coaxStole = true`;
- после успешной кражи повторный Coax в том же бою больше не делает normal success roll и идёт в гарантированный fail-path;
- часть врагов имеет common/rare loot table;
- часть даёт фиксированную сумму;
- часть даёт только joke/text outcome без реальной награды.

Rare-roll использует inclusive `randomInt(0, N)` и считается редким только при результате `N`.

Отсюда реальные шансы:
- `N=10` -> 1/11 ~= 9.09%;
- `N=15` -> 1/16 = 6.25%;
- `N=20` -> 1/21 ~= 4.76%;
- `N=40` -> 1/41 ~= 2.44%.

Это вручную настроенные rarity tiers, а не одна универсальная вероятность.

## Loot table

| ID | Enemy | Rare / special | Common / fixed |
|---:|---|---|---|
| 0 | Skelly | 1/16 Leather Armour | Lil D Patented Brew |
| 1 | Hellhound | 1/11 Speed Heels | Lil D Patented Brew |
| 2 | Nature Enthusiast | 1/11 Get Gud Potion | Perk-Me-Up |
| 3 | ShroomBoom | 1/11 It's Full of Stars Draught | Mental Dribble Draught |
| 4 | ShroomGroom | — | $1,000 |
| 5 | Phantom Peeper | 1/16 Pendant of Hips | Fleestone |
| 6 | Pixie | — | $1,200 |
| 7 | Blob | 1/11 It's Full of Stars Draught | Mental Dribble Draught |
| 8 | Phantom Peeper variant | 1/16 Pendant of Hips | Fleestone |
| 9 | Judge | — | $1,200 |
| 10 | IntBeast | — | $1 |
| 11 | Froglord | — | text-only joke outcome; no inventory/cash reward found |
| 12 | Orc | 1/21 Amulet of Muscles | Lil D Patented Brew |
| 13 | Perverse Pumpkin | 1/11 Get Gud Potion | Perk-Me-Up |
| 14 | Transformo | 1/21 Crown of Brain Cells | Mental Dribble Draught |
| 15 | Spider | 1/41 Corset of Cheating | Mental Dribble Draught |
| 16 | Hooded Weirdo | 1/16 Pendant of Hips | Fleestone |
| 17 | Webbsy | — | $2,000 |
| 18 | StrBeast | — | $2 |
| 19 | Master Wuzzles | — | $2,100 |
| 20 | Punch Drunk | — | $75 |
| 21 | BrainCase | — | $2,400 |
| 22 | Sluggo | — | $1,000 |
| 23 | Lil D | — | $1 |
| 24 | Su | — | $1 |
| 25 | Shirley | — | $25,000 |
| 26 | John | — | text-only: steals his hat then gives it back |
| 27 | ShroomDoom | — | $2,500 |
| 28 | Gal | — | $10,000 |
| 29 | OverBlob | — | $1 |
| 30 | Seu | — | $8,500 |
| 31 | Sir Defender | 1/16 Necklace of Abs | Perk-Me-Up |
| 32 | Magically Tentacular | 1/16 Crown of Brain Cells | Mental Dribble Draught |
| 33 | Soaring Dicks | 1/16 Speed Heels | Bucket of Water |
| 34 | Lesser Satyr | 1/16 Necklace of Abs | Fleestone |
| 35 | Great Titted Satyr | 1/16 Pendant of Hips | Fleestone |
| 36 | Mummy | 1/16 Amulet of Muscles | Relatively Restorative Potion |
| 37 | Goob | — | $50 |
| 38 | Lord SmackDown | — | $7,500 |
| 39 | ShroomGloom | — | $6,000 |
| 40 | ChrBeast | — | $1 |
| 41 | Punch Drunk variant | — | $30 |
| 42 | Mr. Moe | — | text-only "infinity" joke; no normal reward found |
| 43 | unresolved | — | text-only "didn't steal anything" |
| 44 | HardBeast | — | $1 |
| 45 | unresolved | — | no dedicated Coax branch found |
| 46 | unresolved | — | text-only "flat broke" outcome |
| 47–50 | unresolved 47–49; ID 50 = Soo | — | shared range branch: $666 |
| 51 | Emm | — | $2,100 |
| 52 | mystery sewer creature | — | $1 |

IDs 58–59 from the separate space/Dungeon-5 pool are not handled by this normal resolver.

## Verified UI/text bugs

[SWF] Blob has two presentation errors while the underlying inventory writes are coherent:

1. rare branch increments `itemStocks[6]` (full-MP / It's Full of Stars Draught), but the displayed sentence omits the item name;
2. common branch increments `itemStocks[4]` (Mental Dribble Draught), but the message incorrectly says the item was stolen from ShroomBoom.

[SWF] Mummy's rare steal message spells the item as "Amulet of Musckles"; the underlying reward path is the Amulet of Muscles.

These are display-string bugs, not evidence of different rewards.

## _coaxStoleRare scope

[SWF] `_coaxStoleRare` is written inside the Coax resolver, but an exhaustive main-ABC property scan did not find a persistent/meta consumer outside the combat implementation.

Current interpretation: it is local combat/result plumbing, not an achievement or cross-run flag.

## Architecture takeaway

The useful abstraction is:

`Seduction check -> one-per-battle steal entitlement -> enemy-specific loot policy -> consumable/equipment/money/text outcome`.

Common loot frequently sustains the current expedition, while rare loot can accelerate the long-term equipment build. This makes Coax an economy/build tool layered on top of combat rather than a flavour-only action.
