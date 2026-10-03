# Simply Mindy v3.6.0 — Bikini Model / Whitest forced-night route verified v1

Status: **REFERENCE ONLY / DIRECT BYTECODE EVIDENCE.**

Source:
- user-supplied `Simply_Mindy_360(5).swf`;
- embedded version `v. 3.6.0`;
- SHA-256 `90c894bb7610e16d2c4150e119d4c08caf52b5527deca4dded9f8059109188d6`;
- `SceneEvents_0` Model reactive listener;
- Model route scenes 90–101;
- central new-day/night logic already verified in the core-loop research.

Purpose:
recover the exact route that converts a career choice into an escalating forced Night and next-day action-economy penalty.

This is historical evidence only. Successor Secret Debt remains governed by its own locked Product rules.

## 1. Career entry and build gates

The Bikini Model authored route starts on the same common work skeleton as the other original jobs.

### Work threshold

When:
- `modelVisit >= 15`;
- `doneModelScene02 == false`;
- prior Model intro state is complete;

the main reactive router launches Scene 90.

Scene 90 tells the player the next build target.

### First stat gate

The router then requires:
- Charisma >= 30;
- Prowess >= 30;
- Scene 90 complete.

This launches Scene 91.

### Second stat gate

The next gate is:
- Class >= 40;
- Scene 91 complete.

This launches Scene 92.

Scene 92 is the important route split.

## 2. Scene 92 creates the forced-night state

Scene 92 always sets:

`doneModelScene04 = true`.

The player is asked whether to accept a nightly ShutterBug associate arrangement.

The UI explicitly warns that this will decrease daily Stamina.

### Accept

The Yes handler writes:

`sexWhitestWhite = true`.

This is a global forced-night flag.

### Reject

The No handler leaves the forced-night flag false and writes:

`shutterBugCountdown = 3`.

So this is not merely flavour choice:
- Yes enters an escalating forced-night route;
- No enters a delayed investigation/escape route.

## 3. Forced Night has priority over ordinary rent/sleep

The central Sleep resolver checks `sexWhitestWhite` before the normal rent/payment path.

When true, Sleep switches to Scene 101 `sleepWhitest`.

Consequences:
- ordinary cash/stat rent selection is bypassed;
- normal paid sleep is bypassed;
- normal voluntary Night partner/activity selection is bypassed.

This matches the Scene 92 dialogue in which ShutterBug promises to cover rent for the duration.

Mechanically there is no ordinary rent transaction because the route never reaches that resolver.

## 4. Every forced night increments the route counter

On Scene 101 init:

`whitestSexCount += 1`.

Then the scene sets the next-day base Stamina according to route stage.

The same night also:
- advances day by 1;
- sets `newDay = true`.

## 5. Exact Stamina escalation

Scene 101 tests the two route-stage flags in this order.

### Before Scene 98 / first 10 forced nights

When `doneModelScene05Cont == false`:

`stamina = 2`.

Normal paid sleep would establish 3.

Relative next-day loss:
**−1 Stamina**.

### After the 10-night event

At `whitestSexCount >= 10`, while:
- `doneModelScene05Cont == false`;
- the forced route is still active;

the main router launches Scene 98.

Scene 98 sets:

`doneModelScene05Cont = true`.

From the following forced night onward, Scene 101 uses:

`stamina = 1`.

Relative normal-day loss:
**−2 Stamina**.

### At 15 nights

At `whitestSexCount >= 15`, while:
- `doneModelScene06Cont == false`;
- `doneModelScene05Cont == true`;

the router launches Scene 99.

Scene 99 sets:

`doneModelScene06Cont = true`

before presenting its continue/quit choice.

Therefore, if the player continues, subsequent forced nights use:

`stamina = 0`.

Relative normal-day loss:
**−3 Stamina**.

### At 18 nights

At `whitestSexCount >= 18`, while:
- `doneModelScene07Cont == false`;
- `doneModelScene06Cont == true`;

the router launches Scene 100.

Scene 100 sets:

`doneModelScene07Cont = true`.

This is the final forced-route ending opportunity.

## 6. Exact minimum forced-night burden

If the player accepts Scene 92 and continues at Scene 99, the minimum path to Scene 100 contains:

- nights 1–10: base Stamina 2;
- nights 11–15: base Stamina 1;
- nights 16–18: base Stamina 0.

Total forced-route base Stamina over those 18 next-days:

`10×2 + 5×1 + 3×0 = 25`.

Equivalent 18 normal paid-sleep days:

`18×3 = 54`.

Derived action-economy loss:

**54 − 25 = 29 Stamina/actions**

over the 18-night route.

This is a derived total from exact verified stages.

## 7. Broad Stamina Meta does not change the relative loss

Earlier verification established that after a night establishes base Stamina, the common new-day handler adds:
- `staminaBoost`;
- then Busy Bee +1 if equipped.

Therefore with both +1 Stamina ending bonuses and Busy Bee:

Normal:
`3 + 2 + 1 = 6`.

Forced stages:
- `2 + 2 + 1 = 5`;
- `1 + 2 + 1 = 4`;
- `0 + 2 + 1 = 3`.

Across the same 18 days:
- normal same-loadout total = `18×6 = 108`;
- forced same-loadout total = `10×5 + 5×4 + 3×3 = 79`.

Difference remains:

**108 − 79 = 29**.

So broad Stamina Meta makes the route less harsh in absolute terms but does not erase the route's relative action loss when compared with the same unbound loadout.

This is directly analogous to the successor D27 safeguard that Secret Debt's Energy penalty must remain a real loss relative to the same Meta loadout.

## 8. Forced Night bypasses sleep-scoped economy bonuses

Scene 101 contains no `bandBonus` payment.

The verified +$200 ending reward fires in normal `sleepPaid` and Finale sleep, not here.

Therefore an 18-night forced route can forgo up to:

`18 × $200 = $3,600`

of fixed bandBonus income compared with 18 qualifying normal paid sleeps.

This is a derived opportunity-cost ceiling assuming the bonus is active for the whole interval.

## 9. Froglord relationship income is also bypassed

Normal paid sleep independently grants:
- random $180–220 when `sexFroglord == true`.

Scene 101 does not execute that block.

If the relationship would otherwise have paid on all 18 nights, the foregone range is:

- minimum: `18×180 = $3,240`;
- midpoint expectation: `18×200 = $3,600`;
- maximum: `18×220 = $3,960`.

Again, this is a scale comparison, not a claim that every player enters the route with that relationship active.

## 10. Daily stat Titles are bypassed; Busy Bee is not

The ordinary apartment/paid-sleep implementation contains the one-active-Title nightly stat-growth checks.

Scene 101 does not contain those stat-Title application checks.

Therefore a forced Whitest night bypasses ordinary sleep-scoped stat Title growth.

By contrast, Busy Bee is applied later by the shared main new-day handler, so it still contributes +1 Stamina after Scene 101.

This creates a concrete Title balance asymmetry:
- narrow nightly +1-stat Titles can lose value during forced-night routes;
- broad Busy Bee action economy continues to function.

That is additional historical evidence for why the original Busy Bee-style effect is unusually dominant.

## 11. The 15-night checkpoint contains a real exit

Scene 99 is reached after 15 forced nights.

At scene entry:
`doneModelScene06Cont = true`.

Its explicit choice asks whether Mindy continues working for ShutterBug.

### Continue

The Yes path leaves:

`sexWhitestWhite = true`.

The route continues to the 0-Stamina phase and Scene 100 at count 18.

### Quit

The No path writes:

`sexWhitestWhite = false`.

This immediately releases the central forced-night override.

Because the continuation flags have already advanced, the earlier No-route investigation gates are not simply re-entered.

The special ShutterBug continuation route effectively terminates here, although the ordinary 50-work Model Sinner's Orb career ending remains independently available.

## 12. The 18-night endpoint is effectively forced commitment

Scene 100 asks:

"Should Mindy take the Sinner's Orb?"

However the recovered interaction code only exposes a Yes continuation for the route.

There is no corresponding recovered No button/handler in `SceneEvents_100`.

Selecting Yes proceeds directly to Scene 97, the `endShutterBugModel` ending scene.

This differs from the normal 50-work job Sinner's Orb pattern, which explicitly offers Yes/No commitment.

So the deep forced-night route turns increasingly coercive mechanically as well as narratively:
- initial opt-in;
- an exit at night 15;
- if the player continues beyond that exit, the night-18 endpoint no longer exposes the normal decline branch.

## 13. Rejecting the route produces a separate investigation chain

If the player rejects Scene 92:

- `sexWhitestWhite = false`;
- `shutterBugCountdown = 3`;
- `doneModelScene04 = true`.

The common new-day logic decrements `shutterBugCountdown` once per day while this branch is waiting.

When:
- countdown <= 0;
- `doneModelScene05Nope == false`;

the router launches Scene 93.

Scene 93 sets:
`doneModelScene05Nope = true`.

### Investigation build gate

Next:
- Prowess >= 35;
- Intellect >= 35;
- Scene 93 complete;

-> Scene 94.

Scene 94 sets:
`doneModelScene06Nope = true`.

### Final investigation gate

Next:
- Intellect >= 50;
- Scene 94 complete;

-> Scene 95.

Scene 95 is the ShutterBug boss/alternate ending branch and offers an ordinary explicit Sinner's Orb Yes/No commitment.

Therefore the initial Model choice creates two mechanically distinct paths:

**forced-night endurance**
vs
**delayed investigation + high Intellect/Prowess build**.

## 14. Ordinary Model Hard Work remains independent

The main router separately checks:

`modelVisit >= 50`

and, if the generic Model Sinner's Orb has not already been handled, launches Scene 102.

This ordinary work-volume ending opportunity is independent of the ShutterBug special route.

The original therefore layers:
- repeatable career Hard Work at 50;
- authored relationship/boss route;
- forced Night;
- alternate investigation route;

over the same profession.

## 15. System-interlock summary

The Model route directly links:

`work count`
-> `stat gates`
-> `route choice`
-> `forced Night priority`
-> `rent bypass`
-> `next-day Stamina escalation`
-> `normal sleep income suppression`
-> `Title timing differences`
-> `relationship/Night opportunity loss`
-> `ending commitment`.

It is one of the clearest original examples of a career state changing the global daily loop rather than only adding career scenes.

## 16. Successor relevance

Do not copy the content or exact escalation.

Useful design evidence:

1. Forced Night should be represented as a real route state with clear entry and exit.
2. A forced-night penalty should be defined relative to the same Meta loadout, not only as an absolute Energy value.
3. Timing hooks matter: a forced Night can affect rent, passive income, study, relationships and passive stat growth even if its headline penalty is "Energy".
4. Broad action-economy Meta can remain more generally useful than sleep-scoped/narrow bonuses.
5. A route can trade economic relief for action-economy pressure.
6. The point at which a route becomes irrevocable should be explicit; the original Scene 100 UI/code mismatch is a useful anti-pattern.
7. Ordinary career completion and a special authored route can coexist without being the same progression axis.

Successor Secret Debt remains locked to its own rules:
- forced Night every bound night;
- next-day Energy -1;
- no automatic Lust gain from forced Night;
- no Meta/housing effect may silently cancel forced Night;
- repayment/Hard Work/Takeover remain separate exits.
