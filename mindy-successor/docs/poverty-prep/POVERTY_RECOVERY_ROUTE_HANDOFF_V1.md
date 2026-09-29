# Poverty Recovery Route Handoff v1

Status: C3-09 current-main natural-path handoff.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `921abfa79f4dba9c0acee4eca6724c3ed122d42f`.
Fixture: `prior-work/astra/prototype-m3.2/content/poverty-recovery-route-v1.fixture.json`.

## Executive boundary

Current ordinary-poverty content already supports a readable **natural** recovery path, but not a guaranteed or persistent recovery state machine.

The safest current reading is:

`street lodging`
-> optional street recovery/help event after lodging
-> existing money/resource effect
-> finish the current NightFlow
-> later LodgingResolution
-> choose `lodging.cheap` or `lodging.normal` if current money allows
-> current housing tier changes for that night.

This is not a new quest and not a permanent “poverty cleared” flag.

## Why recovery cannot change the current night

The three existing recovery events trigger at:
`nightPhase: after_lodging`.

The runtime commits lodging before that boundary:
1. validates the lodging;
2. subtracts the existing lodging cost;
3. sets `housingState.current`;
4. commits lodging effects / next-day modifiers;
5. enters `PostLodgingForcedCheck`;
6. runs the `after_lodging` resolver.

Therefore a recovery event reached from `lodging.street` cannot retroactively buy `lodging.cheap` for the same night.

Money earned in that event is available later.

This temporal fact is important for copy: recovery content may say “this helps toward another night” but must not say “you move into a room tonight”.

## Current recovery nodes

### Street lodging

Existing identity:
`lodging.street`.

Role:
ordinary-poverty night context.

Selecting it sets current housing to `street` and enables street-conditioned after-lodging events when their other conditions match.

C3-09 does not alter its cost or next-day effects.

### Small coin help

Event:
`poverty-recovery-production.small-coin-help`.

Existing conditions:
- housing tier `street`;
- spring;
- current calendar-day condition from the production pack.

Existing positive choice:
`take-coins`.

Existing effect:
positive money modification.

Natural route role:
small assistance that may contribute to a future lodging choice.

It is not a loan, lender interaction, recurring patron, or Secret Debt activation.

### Short cleanup

Event:
`poverty-recovery-production.short-cleanup`.

Existing conditions:
- housing tier `street`;
- spring;
- current calendar-day condition from the production pack.

Existing positive choice:
`do-cleanup`.

Existing effect:
positive money modification.

Natural route role:
small work that may contribute to future lodging affordability.

It is not a profession, job contract, career transition, or persistent acquaintance.

### Herb bundle

Event:
`poverty-recovery-production.herb-bundle`.

Existing conditions:
- housing tier `street`;
- spring;
- current calendar-day condition from the production pack.

Existing positive choice:
`take-herb`.

Existing effect:
add existing item `herb`.

Natural route role:
resource survival support.

Current production has no mechanic that directly converts this herb into lodging payment. Therefore C3-09 does not count it as a direct housing-upgrade step.

## Cheap lodging stabilization

Existing identity:
`lodging.cheap`.

A later NightFlow may choose it if current money passes the existing affordability check.

Once chosen, `housingState.current` becomes `cheap` for the current night.

Existing cheap/shared-room context events:
- `poverty-cheap-production.shared-quiet-autumn`;
- `poverty-cheap-production-v2.shared-room-seasons`.

These provide readable “stabilization under a roof” content without changing lodging economics.

C3-07 adds optional narrative context for the `lodging.cheap` choice and extends the presentation depth around street/shared-room housing.

## Normal lodging as a possible current-night exit

Existing identity:
`lodging.normal`.

A later NightFlow may choose it if current money passes the existing affordability check.

Once chosen, current housing becomes `normal`, so street/cheap housing-conditioned ordinary-poverty events do not qualify at that after-lodging boundary.

This is the closest current mechanic to “out of poverty” for that night.

However it is not persistent:
- there is no lease;
- there is no permanent housing upgrade;
- there is no `poverty_recovered` fact;
- the player may choose or be forced by affordability into another lodging tier on a later night.

Content must therefore avoid claiming that one normal-room night permanently resolves poverty.

## Supporting survival opportunities

The existing street helpful events can also contribute resources:
- `poverty-street-production.helpful-summer`;
- `poverty-street-production-v2.helpful-summer-shade`.

C3-08 prepares additional presentation depth around those existing small jobs and recovery events.

They may support the same natural affordability path, but C3-09 does not create a new combined quest order.

## Current readable natural path

A player-facing interpretation that stays within existing mechanics is:

1. **Street survival**
   - choose or remain with `lodging.street`;
   - encounter ordinary street context/pressure/help events when eligible.

2. **Small opportunity**
   - accept an existing small paid task or recovery-money choice;
   - or take an existing useful resource.

3. **Carry resources forward**
   - current night continues through normal NightFlow;
   - no retroactive lodging upgrade occurs.

4. **Try a roof on a later night**
   - at a future `LodgingResolution`, choose `lodging.cheap` if currently affordable;
   - shared-room events can then provide cheap-housing context.

5. **Choose normal lodging when currently affordable**
   - on a future night, `lodging.normal` can move current housing out of street/cheap context for that night.

This route is readable but opportunistic.

## Missing Product/runtime contracts

The following are **not** current mechanics and must not be invented in content.

### Persistent recovery state — missing

No typed ordinary-poverty milestone records:
- “stabilized”;
- “recovered”;
- “left poverty”;
- “secured housing”.

If Product wants one, Lead / Chat 1 must define the state owner and consumer contract first.

### Stable housing upgrade — missing

Current lodging is a nightly choice.

There is no:
- lease;
- prepaid room;
- guaranteed future cheap lodging;
- permanent home upgrade tied to recovery events.

### Guaranteed recovery sequence — missing

The three recovery events are calendar/housing conditioned.

They are naturally reachable under their exact conditions, but they do not form a guaranteed ordered quest and should not be narrated as one.

### Persistent acquaintance network — missing

No ordinary-poverty recovery event writes relationship/contact state.

C3-08 intentionally keeps human contact one-off.

### Herb-to-housing conversion — missing

`herb` is an existing resource/item assistance path.

There is no current rule that sells, trades, or converts it into lodging affordability inside this recovery route.

### Poverty-specific recovery ending — missing

There is no current ordinary-poverty “recovery ending” identity.

Ordinary poverty can feed back into ordinary life through current resources and housing choices without requiring a terminal ending.

If Product wants a specific ending, its conditions/reward need separate authority.

## Secret Debt boundary

No part of this recovery path:
- activates Secret Debt automatically;
- creates a lender;
- creates hidden debt principal;
- adds penalties;
- creates a hidden career;
- converts low money into debt.

A player can remain poor, improve current resources, choose cheap/normal lodging when affordable, or fall back to street lodging without entering Secret Debt.

## Integration use

This handoff is primarily a content/natural-path matrix.

Chat 1 / Lead may use it to:
- place C3-07/C3-08 presentation depth without implying nonexistent milestones;
- identify future Product decisions cleanly;
- verify that any UI explanation of recovery matches NightFlow order.

No runtime implementation is requested by C3-09.

## C3-09 disposition

Existing mechanics support:
- ordinary street survival;
- optional small help/jobs/resources;
- later-night movement into cheap or normal lodging when affordable;
- return to non-poverty current housing without Secret Debt.

Existing mechanics do **not** support:
- guaranteed recovery quest;
- permanent housing recovery;
- persistent acquaintance network;
- poverty-clear state;
- recovery ending.

Those gaps are Product/runtime decisions, not content gaps that Chat 3 should fill by invention.
