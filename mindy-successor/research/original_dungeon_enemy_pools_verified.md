# Simply Mindy — verified dungeon enemy pools

Источник: SWF bytecode SceneEvents_44::init + monsterRandomPick loot/name branches + scene actor metadata.

## Главное уточнение

Обычные random encounters в просмотренном combat initializer выбираются прежде всего по dungeon/region, а НЕ напрямую по season.

Seasonal enemy variation существует, но в основном через:
- special/fixed encounter actors;
- открытие/закрытие маршрута к конкретному противнику;
- сезонное создание/удаление NPC/actors на карте.

То есть не надо моделировать это как "в каждом сезоне полностью новый random table". В оригинале смешаны стабильный региональный random pool и сезонные специальные встречи.

## Generic random pools

### Dungeon 1 — Forest

Основной outdoor pool:
`randomInt(0,6)`

- 0 Skelly
- 1 Hellhound
- 2 Nature Enthusiast
- 3 ShroomBoom
- 4 ShroomGroom
- 5 Phantom Peeper
- 6 Pixie

Отдельная outdoor subregion использует:
`randomInt(0,3)`
то есть только IDs 0–3.

Dungeon 1 indoor использует:
`randomInt(0,5)`
то есть IDs 0–5.

### Dungeon 2 — Cave

Outdoor:
`randomInt(12,15)`

Indoor:
`randomInt(12,15)`

Pool:
- 12 Orc
- 13 Perverse Pumpkin
- 14 Transformo
- 15 Spider

### Dungeon 3 — Mountain

Outdoor:
`randomInt(31,34)`

Indoor:
`randomInt(31,34)`

Pool:
- 31 Sir Defender
- 32 Magically Tentacular
- 33 Soaring Dicks
- 34 Lesser Satyr

IDs 35 Great Titted Satyr and 36 Mummy exist in the combat tables, but are NOT part of the generic 31–34 Dungeon 3 roll. Они therefore belong to special/fixed content rather than the ordinary random encounter table.

### Later / Finale dungeon maps

Dungeon04Outdoor:
`randomInt(0,5)`

Dungeon04Indoor / reused church-style combat routing:
`randomInt(0,3)`

Dungeon05 / space:
`randomInt(58,59)`

IDs 58–59 are verified as a two-enemy random pool, but their user-facing names have not yet been recovered with enough confidence.

## Seasonal special-enemy examples

### IntBeast — ID 10

IntBeast is handled as a special encounter, not as part of Dungeon 1's normal 0–6 roll.

Its fight trigger exists in Dungeon 1 cave/indoor logic and is reached through the northern cave route. The outdoor transition into that cave is explicitly Darkly-only.

Therefore the effective rule is:
`Darkly route availability -> access to IntBeast content`

This agrees with the walkthrough description without requiring the normal random pool itself to change.

### Judge — ID 9

Judge is a coordinate/special fight in the Dungeon 1 church area.

The trigger requires:
- season == Ghostings
- judgeKill == false
- relevant Emm quest state

So Judge is a true season-conditioned enemy appearance.

### StrBeast — ID 18

Scene metadata identifies actor 228 as `strBeastDungeon`.

The actor itself remains available until `beastKills[1] == "yes"`, but the route geometry in Dungeon 2 changes in Ghostings:
- outdoor actor metadata maps 307–313 to rafts;
- 314–316 are fakeTile blockers;
- when season == Ghostings, fakeTile01/02/03 are recycled;
- outside Ghostings, the raft actors are recycled and water/season layers are removed/changed.

Thus the season gate is implemented at the MAP/ROUTE level rather than by adding ID 18 to a seasonal random table.

This is a strong concrete example of "enemy availability changes with season because the world route changes".

### ChrBeast / Cloud route — ID 40

The Dungeon 3 route to `chrBeastOut` is checked against season == Megahot. Outside Megahot the route is rejected/redirected.

Again, the enemy is seasonally available via geography, not via the ordinary 31–34 random pool.

## Architecture

Combat population has at least three layers:

1. Regional random pool
   - repeated common encounters.

2. Fixed/special actor encounter
   - boss, quest target, named enemy.

3. Seasonal route/actor gate
   - season changes whether the special encounter can physically exist/be reached.

This makes seasonal variation much cheaper than maintaining four entirely separate combat tables for every dungeon.
