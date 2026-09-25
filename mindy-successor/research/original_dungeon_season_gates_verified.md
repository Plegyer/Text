# Simply Mindy — verified seasonal dungeon gates

Источник: SWF bytecode + scene actor metadata.

## Dungeon 1 — BloodOrb Forest

### Brimstone: Earth elemental pedestal

Scene 42 actor metadata:
- actor 229 = elementPedestalBall

Scene init keeps this actor only when:
- season == brimstone
- ItemSwordElements[1] == "none"

Then its animation is set to:
- "earth"

Otherwise actor 229 is recycled.

### Darkly: northern cave route

Scene 42 transition logic checks the northern cave coordinate/region and allows the transition only under:
- season == darkly

The destination is:
- caveIndoor / Scene 59

This is the route that makes the IntBeast-area content effectively Darkly-limited.

### Darkly: Wind elemental pedestal

Scene 59 actor metadata:
- actor 223 = elementPedestalBall

Scene init keeps it only when:
- season == darkly
- ItemSwordElements[0] == "none"

Animation:
- "wind"

Otherwise the pedestal actor is recycled.

### Ghostings: Judge

Combat setup has a direct season check:
- correct church coordinates
- judgeKill == false
- season == ghostings
- relevant quest state

Then it creates the Judge boss flow (monster ID 9).

This is one of the clearest cases where combat itself directly reads season.

## Dungeon 2 — DirtFeast

### Ghostings: map geometry / northeast access

Scene 104 actor metadata:
- 307–311 = raftHor
- 312–313 = raftVer
- 314 = fakeTile01
- 315 = fakeTile02
- 316 = fakeTile03
- 321 = elementPedestalBall

When season == ghostings:
- fakeTile01/02/03 are recycled;
- raft actors remain;
- Ghostings water/rain configuration remains;
- the Water pedestal can exist.

Outside Ghostings:
- raft actors 307–313 are recycled;
- water/rain layers are removed/changed.

This is a literal seasonal topology swap: traversal objects and blockers are exchanged.

It explains why a part of Dungeon 2 is reachable only in Ghostings without needing a special "season door" in combat code.

### Ghostings: Water elemental pedestal

Actor 321 remains only when:
- season == ghostings
- ItemSwordElements[3] == "none"

Animation:
- "water"

### Megahot: Fire elemental pedestal

Scene 105 actor metadata:
- actor 241 = elementPedestalBall

It remains only when:
- season == megahot
- ItemSwordElements[2] == "none"

Animation:
- "fire"

### Darkly: brothel population

Scene 105 has a major season branch:
- if season != darkly, brothel layers are faded/removed and numerous brothel actors are recycled;
- in Darkly those actors/layers remain and Darkly-specific quest content is available.

So Darkly changes the inhabited version of the indoor map, not merely weather.

### StrBeast

Scene 105 actor metadata:
- actor 228 = strBeastDungeon

The actor is removed once beastKills[1] == "yes".

Its seasonal availability is therefore primarily produced by the Ghostings topology/access change in the preceding outdoor map rather than by putting monster ID 18 into a seasonal random table.

## Dungeon 3 — Mt. Ruin

### Megahot: ChrBeast / Cloud route

The route handler for:
- nextDest == "chrBeastOut"

checks:
- season == megahot

Outside Megahot the transition is rejected/redirected.

Thus ChrBeast (monster ID 40) is seasonally available through route gating.

### Other season effects

Dungeon 3 outdoor/indoor maps also contain season-specific environment and actor-state branches, including Ghostings rain-related layers. Those are separate from the Megahot boss route.

## Key pattern

Seasonal content is implemented with several different techniques:

- keep/remove an elemental pedestal;
- replace blockers with traversable objects;
- keep/remove whole NPC populations;
- permit/reject a map transition;
- direct season check inside a boss encounter.

So "season changes the dungeon" is not one single mechanic. It is a shared global variable read independently by many scene systems.
