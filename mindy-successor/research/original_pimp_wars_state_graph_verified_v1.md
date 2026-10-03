# Simply Mindy v3.6.0 — Pimp Wars shared-route state graph verified v1

Status: **REFERENCE ONLY / DIRECT BYTECODE EVIDENCE.**

Source:
- user-supplied `Simply_Mindy_360(5).swf`;
- embedded version `v. 3.6.0`;
- SHA-256 `90c894bb7610e16d2c4150e119d4c08caf52b5527deca4dded9f8059109188d6`;
- main reactive router `SceneEvents_0`;
- Pimp Wars scenes `SceneEvents_254..277`;
- normal sleep `SceneEvents_15`;
- minor crisis `SceneEvents_249`;
- dungeon scenes 42 / 104 / 205;
- combat scene `SceneEvents_44`.

Purpose:
recover one of the original game's densest cross-system routes exactly enough to show how work counters, build gates, hidden alignment, countdowns, Night, random crises, dungeons, combat and endings share state.

Nothing here is successor Product authority.

## 1. Two professions feed one shared route

Prostitute and Arm Candy do not have isolated late route machines.

Their normal-mode progression checks live in the same `SceneEvents_0` listener and share:
- `sooGirlsCollected`;
- `sooPoints`;
- `proArmCountdown`;
- `proArmAlly`;
- `donePimpWars01..05`;
- Soo/Pimpy relationship state.

Both still retain their own simple 50-work Sinner's Orb career endings.

Pimp Wars is therefore an additional cross-career authored route layered over two ordinary job counters.

## 2. The order of the two 15-shift milestones is encoded into a numeric sentinel

Both jobs have the common original career-start threshold of 15 visits/shifts.

### Arm Candy reaches 15 first

`SceneEvents_255` marks the Arm Candy stage complete.

If Prostitute has not already reached its corresponding stage:
- `sooPoints += 1`.

When Prostitute later reaches 15, `SceneEvents_256` sees the prior Arm Candy state and writes:

`sooGirlsCollected = 99`.

The main router interprets 99 as the Prostitute-side follow-up:
- Strength >= 40;
- Durability >= 40;
- then Scene 274.

### Prostitute reaches 15 first

`SceneEvents_256` marks the Prostitute stage complete.

If Arm Candy has not already reached its stage:
- `sooPoints += 1`.

When Arm Candy later reaches 15, `SceneEvents_255` writes:

`sooGirlsCollected = 100`.

The main router interprets 100 as the Arm Candy-side follow-up:
- Intellect >= 40;
- then Scene 264.

So the field name `sooGirlsCollected` is already misleading before any allies are collected.

Its first Pimp Wars role is effectively an enum:

- 99 = Arm Candy milestone happened first; Prostitute was second;
- 100 = Prostitute milestone happened first; Arm Candy was second.

## 3. Hidden alignment score: sooPoints

The route accumulates a hidden numeric alignment score named `sooPoints`.

Verified mutations include:

- first unmatched 15-shift scene: +1;
- Scene 255 choice: one branch -1, the other +1;
- Scene 256 choice:
  - Soo +1;
  - Pimpy -2 and `sooGirlsCollected=999`;
  - neither -1;
- Scene 257 init/branch can add +1; its binary choice applies -1 / +1;
- Scene 263 mirrors the Soo/Pimpy/neither pattern:
  - Soo +1;
  - Pimpy -2 plus sentinel 999;
  - neither -1;
- Scene 264 contains additional +1 / -1 route-choice effects;
- Scene 274 contains additional -1 / +1 route-choice effects.

The exact narrative wording of every intermediate choice is less important than the mechanical fact: the route accumulates alignment before the explicit faction-choice scene.

## 4. Sentinel 999 is a Pimpy proposal state, not a count

Choosing Pimpy in the relevant earlier branching scenes can write:

`sooGirlsCollected = 999`.

The main router treats 999 as a special route marker and can launch Scene 258 when its additional conditions are met.

Scene 258 resolves the proposal:

### Accept

- `sooPoints -= 2`;
- `sexPimpy = true`;
- `sooGirlsCollected = 1000`.

### Reject

- `sooPoints += 4`;
- `sooGirlsCollected = 0`.

Thus:
- 999 = Pimpy proposal pending;
- 1000 = accepted backstab-route latch.

Neither represents a literal number of recruited characters.

## 5. Sentinel 1000 is a direct ending latch

After the initial Pimp Wars countdown, if:

`sooGirlsCollected == 1000`

the router enters Scene 277.

Scene 277 directly writes:

- `endPimpyBackstab = true`;
- `endGot = true`.

This is the Backstabber ending route.

It bypasses the later ordinary Soo-vs-Pimpy war preparation.

## 6. Ten-day bridge after both career branches

The run-reset state initializes:

`proArmCountdown = 10`.

The global new-day logic decrements it only after both relevant career branch states are complete:
- `doneArmCandyScene04 == true`;
- `doneProstituteScene04 == true`.

Therefore the route deliberately inserts a calendar delay after the two work/build branches converge.

When the gate resolves, Scene 265 starts the actual Pimp Wars faction phase.

## 7. Final faction choice is not controlled only by the button just pressed

Scene 265:
- sets `donePimpWars01 = true`;
- resets `proArmCountdown = 20`.

The player is shown an explicit Soo/Pimpy choice.

The click itself only adjusts the accumulated score:

- choose Soo: `sooPoints += 1`;
- choose Pimpy: `sooPoints -= 1`.

The actual faction is then resolved from the **sign of the total accumulated score**:

- `sooPoints >= 0` -> `proArmAlly = "soo"`, `sexSoo = true`;
- `sooPoints < 0` -> `proArmAlly = "pimpy"`, `sexPimpy = true`.

So earlier route decisions can outweigh the final explicit click.

This is an unusual but verified implementation of:
`hidden accumulated alignment + final preference -> actual faction`.

It is also a UX risk because the apparent final choice is not authoritative.

## 8. Twenty-day preparation phase

Scene 265 sets:

`proArmCountdown = 20`.

The scene text describes the next conflict as occurring after two months in the original 10-day-season calendar vocabulary.

During this window, each faction uses different existing systems.

### Soo side

The player recruits allies from:
- normal dungeons;
- relationship progression;
- minor crises;
- repeated recruit interactions.

### Pimpy side

The player reduces Soo's strength through:
- Pimpy relationship progress;
- special minor crises;
- normal paid-sleep encounters;
- other click encounters.

Thus the same 20-day window reuses multiple systems rather than creating a standalone recruitment minigame immediately.

## 9. Soo side: intended eight-slot recruit array

The run reset creates:

`sooAllyList[0..7] = "no"`.

The final Soo-side minigame explicitly iterates all eight slots and counts the `"yes"` entries.

Verified producers:

- slot 0: Dungeon 1 / Scene 42;
- slot 1: Dungeon 2 / Scene 104;
- slot 2: intended Dungeon 3 / Scene 205;
- slot 3: Soo relationship route / Scene 266;
- slot 4: special minor-crisis recruitment / Scene 249;
- slots 5, 6, 7: repeated recruit actor handler `ActorEvents_1940`, filling the first free slot among those three.

### Special minor-crisis probability

Scene 249 can replace the ordinary crisis with the Soo recruit crisis when:
- `proArmAlly == "soo"`;
- slot 4 is still "no";
- its route-specific `randomInt(0,2)==0` succeeds.

Because normal minor-crisis availability itself is a 1/2 new-day offer, the combined raw offer probability is approximately 1/6 per eligible new day before the player's crisis-resolution success is considered.

## 10. Verified slot-2 producer/consumer bug

Dungeon 3 Scene 205 checks `sooAllyList[2]` to determine whether the recruit actor is already obtained.

However the interaction callback writes:

`sooAllyList[0] = "yes"`

instead of slot 2.

An exhaustive write scan did not find another normal runtime producer that sets slot 2 to "yes".

Consequences in this SWF:
- slot 2 cannot be naturally completed;
- the Dungeon 3 recruit may remain/reappear because its visibility check watches slot 2;
- the final minigame still counts all eight slots;
- therefore the intended eight unique recruits are not naturally achievable through the verified producers; maximum unique set flags are seven.

This is a direct producer/consumer index-alignment defect.

## 11. Soo-side final minigame reinterprets sooGirlsCollected again

Scene 268 begins the Soo-side final phase and leads to Scene 254.

Scene 254:
1. resets `sooGirlsCollected = 0`;
2. iterates `sooAllyList[0..7]`;
3. increments `sooGirlsCollected` once per recruited slot.

At this point the same field no longer means a route sentinel.

It now means the number of currently available allied recruits.

During the minigame:
- deploying an ally consumes one available unit;
- recycled/returned allies can increment the counter again.

Win/loss structure:
- survive until the timer reaches zero -> Scene 272;
- allow 10 enemies through -> Scene 271.

### Loss

Scene 271 immediately writes:
- `endSooLose = true`;
- `endGot = true`.

### Win

Scene 272 offers a Sinner's Orb commitment:
- Yes -> `endingSet = "sooWon"`;
- No -> decline.

The central ending flow later resolves `sooWon` into Scene 273, which writes:
- `endSooWin = true`;
- `endGot = true`.

So the winning route preserves the original eligibility/commit/finalize pattern, while the minigame loss records its ending immediately.

## 12. Pimpy side: sooGirlsCollected becomes enemy power

After choosing Pimpy, `sooGirlsCollected` has yet another meaning: the remaining strength of Soo's side before the final combat.

Verified reductions include:

### Pimpy relationship milestone

Scene 267:
- sets `donePimpWars03 = true`;
- subtracts **5** from `sooGirlsCollected`.

There is no floor clamp in this write.

### Pimpy special minor crisis

The special Pimpy crisis in Scene 249 can reduce:
- `sooGirlsCollected -= 1`.

### Normal paid sleep

Scene 15, while `proArmAlly == "pimpy"`, performs:

`randomInt(0,3)==0`

for a **25% raw chance** to spawn a Soo interference actor during normal paid sleep.

Interacting with that opportunity subtracts:
- `sooGirlsCollected -= 1`.

Therefore ordinary Night/sleep directly alters the power of the future route boss.

## 13. Pimpy final fight uses four coarse power tiers

Scene 270 begins the Pimpy-side final and sets:

`dungeon = "sooFight"`.

If `sooGirlsCollected <= 0`, the route can skip combat and transition directly to Scene 275.

If positive, combat setup maps the value into four special monster IDs:

- 1–5 -> `monsterRandomPick = 50`;
- 6–10 -> 49;
- 11–15 -> 48;
- 16+ -> 47.

Thus old route sentinels such as 99/100, if they survive into this stage, do not imply a need to remove ninety-nine units one by one. They simply land in the maximum `16+` combat tier.

This is another example of the same global numeric field changing semantic type.

## 14. Pimpy combat endings

### Win

The central combat result handler checks:

`dungeon == "sooFight" && _winGo == true`

and switches to Scene 275.

Scene 275 writes:
- `endPimpyWin = true`;
- `endGot = true`.

The same ending is reachable without combat when pre-fight Soo power is <=0.

### Sexual/seduction loss

Combat's generic seduction-failure engine enters `_sexSeduction=true` after three accumulated seduction failures.

The `_sexSeduction` result listener maps all four Soo combat IDs:
- 47;
- 48;
- 49;
- 50

to Scene 276.

Scene 276 writes:
- `endPimpyLose = true`;
- `endGot = true`.

This exact loss path is therefore confirmed for the sexual/seduction-loss state.

### Ordinary HP defeat

This pass did not isolate a separate `sooFight` HP-zero branch with the same certainty.

Do not silently generalize Scene 276 to every possible combat-loss mode until that generic defeat path is traced.

## 15. One variable carries at least three incompatible semantic types

`sooGirlsCollected` is the strongest implementation anti-pattern in this route.

### Phase A — route enum

- 99;
- 100;
- 999;
- 1000.

These are branch/sentinel states.

### Phase B — Pimpy enemy-power number

The same field is decremented by relationship, crisis and Night interactions, then quantized into four combat tiers.

### Phase C — Soo ally-resource count

Scene 254 resets it and derives it from eight boolean recruit slots, then mutates it as allies are consumed/recycled in the minigame.

A typed successor state model should never overload one field this way.

Equivalent typed concepts would be separate fields such as:
- branch order/state enum;
- faction alignment score;
- proposal state;
- recruited ally IDs;
- opposing-faction power;
- current minigame available allies.

## 16. Other cross-system lessons

This route proves several original patterns directly:

1. **Two careers can converge into one authored state machine.**
2. **Career progress can require build gates after the work-count milestone.**
3. **Calendar countdowns create space for other systems to matter.**
4. **Night, random crises and dungeons can all produce progress for a career-owned route.**
5. **Relationship counters can alter later combat difficulty.**
6. **A hidden alignment score can aggregate prior decisions.**
7. **Producer/consumer ID alignment needs exhaustive tests.** The slot-2 bug is the exact failure mode.
8. **Numeric sentinels are fragile.** The 99/100/999/1000 overload makes route semantics difficult to validate.
9. **Endings use more than one commitment style.** Soo win uses an Orb commitment; several losses/backstab branches directly set ending flags.

## 17. Successor relevance

This is reference, not a route to copy.

The useful abstraction is:
`two ordinary systems -> shared authored conflict -> delayed preparation window -> multiple subsystem contributions -> explicit faction branch -> distinct final challenge`.

The implementation lessons are equally important:
- use typed route stages rather than magic sentinel numbers;
- use stable recruit IDs rather than positional array assumptions;
- test every producer against every consumer;
- keep hidden affinity separate from the player's explicit final decision unless Product deliberately wants prior decisions to constrain it;
- do not reuse one integer for route enum, power score and consumable-resource count.

Successor Product decisions remain governed by `USER_DECISIONS_LOCKED_v1.md`.
