# LEADER 1 CHECKPOINT — 2026-10-03 08:05 +03

Status: **CURRENT RECOVERY CHECKPOINT**
Repository: `Plegyer/Text`
Purpose: durable save point for Leader 1 context rollover.

## Recovery rule

Future Leader 1 must:
1. requery fresh `main`, open PRs, workflow runs and worker heads before acting;
2. read `USER_DECISIONS_LOCKED_v1.md`;
3. read this checkpoint plus the prior `LEADER1_HANDOFF_2026-10-03.md`;
4. treat Git as source of truth;
5. do not infer worker activity from branch existence or pointer status alone.

At the time of this checkpoint, the user has explicitly paused the other workers. Lack of new Chat 2–6 commits is therefore expected and is not a reason to wake/refill them until the user resumes them.

## Snapshot before checkpoint commit

Fresh `main`:
`03215f6d699e0091840978cabb272f51f0348e81`
Message:
`Research: add Pimp Wars state-variable map`

Latest full CI remains:
- #1122
- branch `chat2/assembly-hard-work-meta-shared-20261003-v1`
- head `df18be22e0bc4677b20dada55f9b9cc8383d2e31`
- FAILURE
- 1009 tests / 992 pass / 17 fail

Do not rerun unchanged #264 head.

## Current worker state — intentionally paused

### Chat 2
PR #264:
`Chat 2: shared Hard Work Meta current-main assembly`

Head:
`df18be22e0bc4677b20dada55f9b9cc8383d2e31`

Still blocked by the already-mined 17 failures:
- schema-v5 completed-creation fixture state;
- stale schema-version expectation;
- real journal schema4/current alignment invariant;
- retired Lumber automatic Hard Work reward expectation;
- stale permanent Palace-unlock UI expectation.

No new full CI is authorized until focused/local green evidence exists for all 17 plus migration/journal, D21-D24, School D20, seasonal tradeoffs, Assassin and Prostitute.

### Chat 3
Branch:
`chat3/progression-floor-aware-negative-map-v5`

Head at checkpoint:
`0d0cf6657eab1cb0c81dafcf4f07c33707040789`
Leader dispatch only; no worker commit after dispatch.

Prior accepted packet:
`135efa45c291642fabc52bd49cbafc7111418cd3`

### Chat 4
Branch:
`chat4/strong-meta-keystone-capacity-v5`

Head at checkpoint:
`0d0cf6657eab1cb0c81dafcf4f07c33707040789`
Leader dispatch only; no worker commit after dispatch.

Prior accepted packet:
`1dda2de690e889fed0ce4d76ebcda1e7f62e37da`

### Chat 5
Branch:
`chat5/secret-debt-ending-meta-rewards-v6`

Head at checkpoint:
`0d0cf6657eab1cb0c81dafcf4f07c33707040789`
Leader dispatch only; no worker commit.

### Chat 6
Branch:
`chat6/palace-progression-topology-decision-v10`

Head at checkpoint:
`0d0cf6657eab1cb0c81dafcf4f07c33707040789`
Leader dispatch only; no worker commit.

## Leader/Product decisions added after prior handoff

### D26 — ordinary same-career daily pacing

Locked in `USER_DECISIONS_LOCKED_v1.md`.

For the 10 ordinary professions:
- max one shift of the **same profession** per calendar day;
- not a global one-work-action cap;
- different ordinary professions may still be worked on the same day if Energy/access allow;
- Hard Work remains exactly 50 completed shifts;
- no broad positive work-stat nerf was authorized by this decision.

### D27 — strong Meta architecture

Locked in `USER_DECISIONS_LOCKED_v1.md`.

Strong Meta uses:
- at most one **Keystone**;
- a separate limited **Specialist** layer;
- exact Specialist capacity still open;
- pure knowledge/content unlocks automatic;
- ordinary Hard Work packages remain a separate unrestricted subset layer;
- cap-200 is Specialist-class by default;
- Secret Debt forced next-day Energy -1 must remain a real loss after Meta Energy calculations;
- no housing/safety Meta may cancel forced Secret Debt Night;
- no access Meta may bypass D23 Palace qualification.

These decisions were first recorded at:
`0c8926049a4b4ee4fda0574cea588d39f39dd14e`.

## Original SWF research — current durable state

User supplied:
`Simply_Mindy_360(5).swf`

Verified:
- embedded UI version `v. 3.6.0`;
- SHA-256 `90c894bb7610e16d2c4150e119d4c08caf52b5527deca4dded9f8059109188d6`;
- SWF v16;
- main Stencyl ABC lives in old SWF tag 72, ~8.5 MB.

If a future chat needs raw extraction again, do **not** assume the uploaded SWF survives context/chat boundaries. Ask the user to re-upload it. Extracted findings below are already durable in Git.

### New research committed during this Leader context

`3a88d08e9be3988749c883a5f6e57ada0c5be4aa`
- added `original_system_interlocks_verified_v2.md`

`3278f155263614d85d44f3e281377ac26fe0b82b`
- linked v3.6.0 interlocks into `ORIGINAL_GAME_MECHANICS_REFERENCE_v1.md`

`cd97e55cf3a04ab18a4d40d4a3f42a792f7c6c55`
- added `original_route_numeric_condition_census_v1.md`

`f9906c74730c135a122e61891bc42e494e0d348f`
- quantified broad Meta stacking / Final Mode interlocks

`26b167e412a78cb3482290132d9658fba2677796`
- added machine-readable `original_ending_bonus_runtime_graph_v2.csv`

`dfe1e1afc549cc53280e452e643786ddf646878e`
- added `original_ending_bonus_runtime_verified_v2.md`

`2902f28396d7ffc5e97432ccfc9c216c8195a2a4`
- added verified Pimp Wars shared-route state graph

`03215f6d699e0091840978cabb272f51f0348e81`
- added Pimp Wars state-variable CSV

## Important new original-game findings

These are historical reference only and never override successor Product authority.

### Housing / economy
- alternative stat rent can only be paid if the stat is strictly greater than the cost; otherwise route goes to outdoor/no-rent sleep;
- cash rent affordability is likewise explicit;
- verified four-year cash-rent scale derives to about $80,000;
- original "$200/day" reward is actually attached to qualifying sleep scenes, not a universal calendar tick;
- it can stack with Froglord relationship income $180–220 in normal paid sleep;
- No Rent can stack with the +200 sleep reward.

### Night / Stamina ordering
Night establishes base Stamina first, then main applies:
- `staminaBoost`;
- Busy Bee title.

Thus broad Meta action bonuses can partially erase negative-night pressure in the original. This is historical evidence supporting successor D27 safeguards.

### Hidden cap-200 chain
Exact original chain:
`endMoeLose selected -> easterEggActive -> hidden dungeon chest -> statBoost=true -> cap 200`.

Successor D24 remains simpler and explicit: cap-only 100 -> 200; values are not doubled.

### Final Mode Meta scaling
Final battle reads `finaleBonusCount` in exact tiers:
- 0 -> monsterBonus -10, +0 Health;
- 1–15 -> 0, +3000 Health;
- 16–30 -> +15, +5500;
- 31–45 -> +30, +8000;
- 46+ -> +45, +10000.

Attack-code pool also broadens with bonus count.

Every enabled ending bonus costs exactly one Finale-count unit regardless of reach, showing an original balance asymmetry between narrow and broad rewards.

### 66 ending-bonus runtime graph
All 66 selectable ending bonuses have been decoded from actual enable/disable handlers, not only display descriptions.

Verified families include:
- starting-stat packages;
- starting-money packages;
- two stackable +1 daily Stamina rewards;
- No Rent;
- sleep-scoped +200 income;
- Year 0;
- eight late-job early-access triggers;
- dungeon access;
- equipment/spells/seduction moves;
- Title unlocks;
- hidden cap-200 activation chain.

Important runtime defects found:
- `endIntBeastLoss` enables spell slots 0 and 5 but disable clears slot 5 twice, leaving slot 0;
- `endStrBeastLoss` enables slots 4 and 10 but disable clears only slot 4;
- `endEmmDistraction` text promises Immunologist but its selectable handler has no Title write;
- `endJerry` selectable handler writes Immunologist despite description omitting it; Jerry ending acquisition separately unlocks Blimp Enthusiast.

This demonstrates why successor selectable rewards require exact inverse tests and separate permanent-unlock/current-loadout state.

### Pimp Wars state graph
Prostitute + Arm Candy share one late reactive route.

The overloaded `sooGirlsCollected` field changes semantic type across phases:
- 99 / 100 = which career reached its 15-shift stage second;
- 999 = Pimpy proposal pending;
- 1000 = accepted backstab latch;
- later = Pimpy-side opposing power;
- later still = Soo-side available ally count.

Hidden `sooPoints` accumulates route decisions. Final faction is resolved by sign:
- >=0 -> Soo;
- <0 -> Pimpy.

The player's final Soo/Pimpy click only adds ±1, so prior hidden alignment can override the apparent final choice.

Pimp Wars also verifies:
- a 10-day convergence delay;
- then a 20-day preparation window;
- Night, dungeons, minor crises and relationships all mutate the same route;
- Pimpy-side final power tiers: <=0 auto-win, then 1–5 / 6–10 / 11–15 / 16+ combat tiers;
- Soo-side final minigame counts eight recruit slots;
- a producer/consumer bug prevents slot 2 from being naturally set because Dungeon 3 checks slot 2 but writes slot 0.

This is a strong anti-pattern reference for successor typed route state.

## Current independent Leader work

The user explicitly said the other workers are paused and authorized Leader to keep working independently.

Best next research task:
1. derive all-enabled / family-level Meta stacking scale from the 66-bonus runtime graph;
2. quantify starting-money, Stamina, stats, job access, spell/equipment coverage;
3. distinguish permanent Title unlocks from current-run reversible effects;
4. record any additional reversal/data-wiring defects;
5. then continue exact route graphs only where they illuminate successor architecture/balance.

Do not turn original numbers into successor locks.

## Project completion logic

The project continues by dependency, not by chat number:

1. keep Product authority explicit in locked docs;
2. research/design packet -> frozen exact SHA;
3. producer implementation only after authority exists;
4. Chat 2 independent current-main assembly/QA;
5. Leader acceptance;
6. merge to main;
7. exact-main CI;
8. repeat until all systems/routes/content are integrated;
9. final migration/save compatibility, progression/economy balance, route reachability, UI/localization, regression and release QA.

Critical integration path when workers resume:
- repair and green PR #264;
- Leader merge;
- exact-main CI;
- then Chat 2 integrates New Start+ Hard Work UI;
- then Palace D23 consumer in dependency-safe order.

## Periodic-save rule for future Leader

Do not wait for context exhaustion.

Create/update a durable Leader checkpoint after:
- several Product locks;
- a major research batch;
- important merges/CI transitions;
- queue reshuffles;
- or whenever the conversation has become long enough that losing local reasoning context would be costly.

A checkpoint must include:
- fresh main;
- PR/CI state;
- real worker heads;
- current authority;
- accepted/frozen SHAs;
- what is blocked;
- what the Leader was doing next;
- any uploaded external file identity/hash and the rule to re-request it if raw bytes are needed.
