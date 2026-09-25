# Simply Mindy — dungeon quest graph

Источники:
- [SWF] — прямые флаги/сцены/счётчики из bytecode.
- [Guide] — walkthrough v3.5.0, используется как карта пользовательской последовательности.
- Если деталь есть только в Guide, она не переименовывается в "verified by SWF".

## Общая архитектура

Dungeon quests не живут изолированно внутри одной карты. Они образуют сеть:

overworld/job progression
<-> dungeon NPC quest
<-> combat kill counters / seduction outcomes
<-> item/key object
<-> night partner / night counters
<-> career state machine
<-> ending routes

Ключевая особенность: многие kill/progress counters глобальные. Поэтому игра может засчитать действие, выполненное раньше, чем NPC формально выдал соответствующее задание. Walkthrough отдельно отмечает это для monster kills.

## Dungeon 1 — Forest

### Ink / mushroom chain

[SWF]
SceneEvents_42 содержит:
- inkDungeon01Scene02
- killedShroomGroom
- killedPixie
- inkTalk

[Guide]
Игрок получает задание убить обычные грибы, затем большого гриба; награда/результат цепочки — zombie brain.

Cross-system:
- Farmer career state machine позже читает отдельный `brainGo`/brain-related progression.
- Поэтому dungeon quest выдаёт объект/флаг, который продолжает НЕ dungeon-квест, а карьеру Farmer.

### Cherry / ghost chain

[SWF]
SceneEvents_42 содержит:
- cherryDungeon01Scene01
- cherryDungeon01Scene02
- ghost1 ... ghost6
- ghostFight

Это подтверждает шестичастную ghost-progress структуру.

[Guide]
Нужно взаимодействовать/заняться сексом с шестью ghosts; награда — одна из четырёх Strange Metal pieces.

Cross-system:
- Camwhore/Jerry route требует набор четырёх metal-part flags, то есть dungeon collectible становится карьерным/end-route условием.

### Shay / Blubby chain

[SWF]
SceneEvents_42 содержит:
- shayDungeon01Scene01
- shayDungeon01List
- несколько handlers, которые мутируют shayDungeon01List.

[Guide]
Задача — привести/соблазнить Blubby; награда — another Strange Metal piece.

### Aember chain — stage 1

[SWF]
SceneEvents_42 содержит:
- aemberDungeon01Scene01
- aemberDungeon01QuestGirls
- отдельные interaction handlers, меняющие aemberDungeon01QuestGirls.

[Guide]
Игрок ищет несколько NPC/подсказок, затем выходит на Sluggo. После выполнения Aember обучает первым двум Seduction techniques.

Архитектурно важно:
- Aember не одноразовый NPC.
- Эта ветка продолжается во втором и третьем dungeon и постепенно раскрывает весь seduction moveset.

### Emm chain — starts in/around Dungeon 1

[SWF]
SceneEvents_42 читает:
- doneEmmScene01
- doneEmmScene09Reject

Dungeon/combat код отдельно содержит quest-specific Judge logic.

[Guide]
Порог покупки у Emm -> 8 green monsters -> Ghostings priest/Judge -> после этого Emm становится night partner.

Cross-system:
shop/economy -> dungeon kills -> seasonal boss -> night system -> later ending route.

Это один из лучших примеров того, насколько сильно оригинал связывает разные подсистемы.

### Dungeon 2 unlock

[SWF]
SceneEvents_59 key-object interaction sets:
- doneDungeon02Intro = true

UI:
"Unlocked DirtFeast! (The second dungeon!)"

[Guide]
Это описано как red globe/orb в church-area.

## Dungeon 2 — Cave / DirtFeast

### BrainCase chain

[SWF]
SceneEvents_104 содержит:
- miniBrainKills
- brainCaseKill
- brainCaseFight

[Guide]
BrainCase появляется после убийства пяти blue brains в северной зоне Dungeon 1 во время Darkly.

Это означает:
seasonal area in Dungeon 1
-> kill counter
-> special boss spawned/available in Dungeon 2
-> reward/metal part

Quest objective физически начинается в предыдущем dungeon и завершается в следующем.

### Gloo / spider chain

[SWF]
SceneEvents_105 содержит:
- spiderKills
- webbsyFight
- webbsyKill
- spidered

[Guide]
Нужно убить spiders, затем Webbsy; награды — stronger sword/armour from nearby chests.

### Punch Drunk chain — stage 1

[Guide]
Убить несколько больших Orc, затем spar/fight Punch Drunk; награда — Crown.

[SWF]
Поздний Dungeon 3 код читает:
- punchDrunkKill
- punchDrunkDungeon03Scene01
- punchDrunkCasketCount

Это прямо подтверждает, что Punch Drunk storyline переносится из Dungeon 2 в Dungeon 3.

### Aember chain — stage 2

[SWF]
SceneEvents_105 содержит:
- aemberDungeon02Scene01
- aemberDungeon02Scene02
- fuckerAemberBrothelDudes
- Darkly checks
- aemberDungeon03Scene02 / aemberKill references for later continuity

[Guide]
В Darkly нужно пройти brothel-related seduction objective с stat requirements. После этого Aember обучает ещё двум Seduction techniques; Coax становится доступен как steal mechanic.

Теперь Aember chain связывает:
D1 quest -> seduction unlocks -> D2 season/stat gate -> more seduction unlocks -> D3 mastery test.

### Shay chain — stage 2

[SWF]
SceneEvents_104/105 содержит:
- shayDungeon02Scene01
- shayDungeon02Scene01B
- dungeon02ShayConvo
- wuzzlesKill

[Guide]
Bear/Master Wuzzles fight gives Panties of SexyTimes.

Combat code separately confirms Panties have a special sex-result path against ordinary enemies, so quest reward directly changes combat rules.

### Hooded Weirdos

[SWF]
SceneEvents_104/105 contains:
- killedHoodedWeirdos
- hoodedWeirdo00..03
- hoodedWeirdoFight
- Darkly branches

[Guide]
Darkly quest asks to clear all hooded creatures for money/Fuckability reward.

### Dungeon 3 unlock

[SWF]
SceneEvents_105 key-object interaction sets:
- doneDungeon03Intro = true

UI:
"Unlocked Mt. Ruin! (The third dungeon!)"

## Dungeon 3 — Mt. Ruin

### Ink chain — multi-stage stat test

[SWF]
SceneEvents_205 contains:
- inkDungeon03Scene01
- inkDungeon03Scene02
- inkDungeon03Scene03
- inkDungeon03Quest
- dungeon03InkConvo
- multiple state-dependent Ink signs/interaction handlers

[Guide]
Requirements include very high Cleanliness, Prowess and Durability.

Rewards described in Guide:
- Seductive Perfume
- ShroomHeirloom / family ring
- maze route information

Combat/map code independently confirms:
- Perfume changes encounter frequency.
- ShroomHeirloom adds +10 to all five combat stats.

So this chain acts as a late-game build check whose rewards modify exploration/combat.

### Gloo / maze chain

[SWF]
SceneEvents_206 contains:
- dungeon03GlooConvo
- mazeFail
- mazeSucceed

[Guide]
Maze ends in a boss; reward Bracelet of Fuck Off.

Map code confirms Bracelet disables generic random encounters, so this quest gives the player direct control over dungeon encounter density.

### Punch Drunk chain — stage 2

[SWF]
SceneEvents_205 contains:
- punchDrunkDungeon03Scene01
- punchDrunkCasketCount
- punchDrunkKill

[Guide]
Three coffin/zombie interactions span several days, then another Punch Drunk fight; reward Corset of Cheating.

Combat code confirms Corset gives +30 to all five combat totals.

### Shay chain — stage 3

[SWF]
SceneEvents_205 contains:
- shayDungeon03Scene01
- shayDungeon03Scene02

[Guide]
A direct fight/reward continuation exists in Mt. Ruin.

### Aember chain — final mastery test

[SWF]
SceneEvents_205 init explicitly checks continuity:
- aemberDungeon01Scene02
- aemberDungeon02Scene02
- aemberDungeon03Scene02
- aemberKill

This is strong evidence that D3 Aember content requires completion of prior dungeon stages.

[Guide]
Final task is to successfully apply all four Seduction effects to Aember and not attack her.

This is structurally important: the game teaches mechanics in D1/D2, then uses D3 as a mastery exam.

Reward described by Guide includes the Purse; combat code separately verifies Purse doubles combat money rewards.

## Cross-system dependency examples

### Dungeon -> Farmer job
Dungeon mushroom quest produces the brain-related progression needed by Farmer/John route.

### Dungeon -> Camwhore/Jerry ending
Several dungeon quests distribute Strange Metal parts; Jerry route consumes the four-part set.

### Dungeon -> Night system
Emm dungeon quest unlocks her as a night partner.

### Dungeon -> Combat build
Shay -> Panties
Ink -> Perfume/Ring
Gloo -> Bracelet
Punch Drunk -> Corset

These are not mere treasure rewards; each changes encounter/combat rules.

### Season -> quest availability
Judge/Emm in Ghostings, Brain-related Darkly route, Aember/brothel Darkly content and other route gates mean quest progression is also calendar planning.

## Design abstraction

The original dungeon quest structure can be represented as:

NPC storyline
-> stage in Dungeon N
-> persistent global flag/counter
-> possibly an overworld/job/night dependency
-> stage in Dungeon N+1
-> mechanical reward
-> later ending/job consequence

This is stronger than independent "fetch quests": recurring NPCs teach or test mechanics across multiple regions and years.
