# Ordinary Poverty Content Seed Plan v1

Status: bounded first authored content batch for ordinary poverty that can ship before Secret Debt decisions.

Goal:
turn already-shipped lodging/Night infrastructure into visible poverty gameplay using generic, nameless/noncanonical event families and tunable balance parameters.

## Immediate-authoring boundary

Can be authored now without Secret Debt decisions:
- ordinary street micro-event families;
- recovery/help event shapes;
- seasonal/context variants;
- semantic presentation IDs/fallbacks;
- save/reload contracts;
- anti-softlock guards.

Must remain parameterized/open:
- exact event weights;
- exact money/resource deltas;
- exact penalties;
- exact helper value/frequency;
- final NPC identities;
- final prose;
- final GIF assets.

## Seed family A — found work / short paid task

Purpose:
- supplemental earned-income opportunity;
- not replacement for starting-job floor.

Eligibility shape:
- housingTier=street or accepted poverty context;
- optional cooldown/history;
- no unique NPC requirement.

Outcome shapes:
- success: small tunable money gain;
- neutral: opportunity/follow-up without immediate gain;
- constrained variant: resource/condition tradeoff only if anti-softlock remains safe.

Parameters:
`payAmount`, `cooldownDays`, optional `weight`.

Presentation hook:
`poverty/street/paid-task/<variant>` semantic family.

Acceptance:
- exactly-once money transaction;
- reload no reroll after selection;
- failure/neutral path does not block baseline recovery.

## Seed family B — discarded usable resource

Purpose:
- item/resource assistance without a named helper.

Eligibility:
- street context;
- optional season/context;
- only items/resources already accepted by inventory/economy ownership.

Outcome shapes:
- find ordinary useful item/resource;
- leave it;
- exchange/use later through existing systems where supported.

Parameters:
`resourceId`, `count`, `weight`.

Do not:
- invent a new item type solely for this seed;
- invent sale/barter if not accepted.

Presentation hook:
`poverty/street/found-resource/<variant>`.

Acceptance:
- inventory add once;
- reload stable;
- absence of this event cannot softlock run.

## Seed family C — weather exposure

Purpose:
- ordinary bad/neutral street pressure with seasonal context.

Eligibility:
- street housing;
- calendar season;
- optional existing condition/stat context.

Outcome shapes:
- mild next-day Energy pressure;
- Grooming/condition pressure;
- neutral shelter-like variant with no reward.

Parameters:
`energyDelta`, `statEffects`, `weight`.

Guard:
- configured effect may not remove all practical next-day recovery paths.

Presentation hook:
`poverty/street/weather/<season>/<variant>`.

Acceptance:
- season deterministic;
- modifier queued once;
- reload no duplicate;
- no permanent hidden penalty.

## Seed family D — anonymous kindness

Purpose:
- helpful event family without canonical relationship identity.

Eligibility:
- ordinary street context;
- cooldown/history;
- no relationship prerequisite.

Outcome shapes:
- small tunable money/resource help;
- temporary next-day relief;
- optional public `received-help`-style content fact only if a real downstream consumer exists.

Parameters:
`helpAmount`, `resourceId`, `cooldownDays`, `weight`.

Do not create a named recurring rescuer from this seed.

Presentation hook:
`poverty/street/anonymous-help/<variant>`.

Acceptance:
- help applies once;
- never mandatory for zero-money recovery;
- no Secret Debt state mutation.

## Seed family E — small loss / nuisance

Purpose:
- bad event family that gives poverty texture without spiral trap.

Eligibility:
- street context;
- only if configured loss cannot violate anti-softlock invariant.

Outcome shapes:
- lose small tunable money/resource;
- receive temporary accepted condition/modifier;
- avoid loss through already-authorized item/stat/public condition only if content later chooses it.

Parameters:
`moneyLoss`, `resourceLoss`, `nextDayModifier`, `weight`.

Hard guard:
- cannot consume unavailable resource;
- cannot reduce required recovery action availability to zero;
- cannot force lender/Secret Debt route.

Presentation hook:
`poverty/street/nuisance/<variant>`.

## Seed family F — quiet/neutral street observation

Purpose:
- neutral pacing event with world/season flavor and no balance pressure.

Eligibility:
- street context;
- season/context.

Outcome:
- presentation/journal only;
- optional harmless public discovery only if separately authored.

Parameters:
`weight` only.

Presentation hook:
`poverty/street/observation/<season>/<variant>`.

Acceptance:
- no gameplay mutation required;
- reload keeps committed event identity;
- valid fallback.

## Recovery/help shapes beyond street RNG

Can author immediately as generic shells:

### Low-gate paid task
- reachable through event/action condition;
- tunable pay;
- explicit cooldown/history;
- no named employer required.

### Generic relationship-help hook
- define reusable event shape expecting a public relationship condition;
- leave provider relationship ID OPEN until authored;
- tunable help effect.

### Resource-help hook
- define reusable event shape expecting an accepted item/resource;
- no new item identity selected.

These shells may exist before provider-specific content.

## Seasonal strategy

First seed batch does not need four unique canonical event sets.

Use one or more families with season-tagged variants:
- weather exposure;
- observation;
- found resource if season affects plausibility;
- paid task if seasonal labor is later accepted.

Required:
- season condition is authoritative;
- committed variant does not change on reload;
- season affects content/eligibility, not mechanics through hidden code.

## Parameter block

Future content pack should centralize tunable values conceptually as:
```text
streetEventWeights
smallPaidTaskReward
anonymousHelpValue
weatherEnergyPenalty
weatherStatPenalty
smallLossCap
eventCooldowns
```

Exact representation is implementation-owned.

Tests should read configured values rather than copy guessed literals.

## Semantic presentation hooks

Every event family receives stable semantic namespace before bespoke media:
- `poverty/street/paid-task/*`;
- `poverty/street/found-resource/*`;
- `poverty/street/weather/*`;
- `poverty/street/anonymous-help/*`;
- `poverty/street/nuisance/*`;
- `poverty/street/observation/*`.

These are namespace examples for planning, not canonical production IDs unless presentation/content owner accepts them.

Fallback requirement:
- text always available;
- static visual where mapping exists;
- GIF optional.

## Save/reload acceptance

For each authored event:
1. reach naturally through production street context;
2. event/variant selected;
3. save/reload pending state;
4. resolve;
5. assert effect once;
6. save/reload;
7. assert cooldown/history and no replay;
8. complete Night;
9. assert calendar/modifier once.

## Anti-softlock acceptance

Seed batch must pass scenarios with:
- zero money;
- no helpful random event;
- no relationship helper;
- no optional item;
- repeated street nights.

Required result:
- next day remains reachable;
- deterministic earned-income recovery path exists outside Secret Debt;
- bad-event configuration does not create inevitable downward spiral.

## Secret Debt separation

None of these seed families may:
- offer lender choice;
- write Secret Debt accepted/pending/bound state;
- grant hidden-career progress;
- serve as substitute Secret Debt trigger.

The lender remains a separate one-off exceptional event.

## Requires Product choice before finalization

Do not finalize:
- exact probabilities;
- exact money/resource effects;
- exact street/cheap penalties;
- canonical named helper NPC;
- relationship-specific provider;
- sale/barter content;
- final media/GIF priority.

## Can ship before those choices

A first production content batch can still ship if:
- parameters are explicitly tunable/owned;
- Product has approved the use of parameterized values for that package;
- natural reachability and anti-softlock are tested;
- no unresolved unique identity is fabricated.

## Completion target

The seed plan is fulfilled when ordinary street poverty has several naturally reachable production event families, at least one optional recovery/help shape, meaningful seasonal/context variation, reload-safe presentation fallback, and no dependency on Secret Debt decisions.
