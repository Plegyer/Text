# Poverty Night Sequencing Contract Map v1

Status: sequencing map for ordinary poverty Night behavior and future Secret Debt forced Night obligations.

Source lifecycle:
`NIGHT_AND_ACTIVITY_CONTRACT_v1.md`

Target NightFlow phases:
```text
EndDayRequested
-> PreLodgingForcedCheck
-> LodgingResolution
-> PostLodgingForcedCheck
-> VoluntaryNightChoice
-> NightEventResolution
-> NextDayModifiersFinalized
-> CalendarAdvance
-> StartDay
```

This map does not change those phases.

## 1. EndDayRequested

Purpose:
- transition from daytime play into NightFlow;
- freeze the set of authoritative current-day state used by Night eligibility.

Poverty interaction:
- current money/resources may affect lodging choices;
- active conditions/public facts may affect poverty event eligibility;
- Secret Debt bound state may make a forced Night eligible.

Must not:
- charge lodging yet;
- apply street penalty yet;
- advance calendar;
- roll a street-dependent event before street housing context exists.

## 2. PreLodgingForcedCheck

Architecture capability:
- forced event may intercept before housing selection;
- event definition controls whether lodging payment/menu is suppressed.

Ordinary poverty:
- normal/cheap/street choice has not yet been resolved, so ordinary street-only events should not be finalized here.

Secret Debt while bound:
- **possible host phase**, because bound-state forced obligation does not inherently require street housing.

Product-owned Secret Debt questions:
- does forced debt Night intercept here?
- if yes, does it suppress lodging selection/payment?
- does it choose/retain a housing context for next-day modifiers/storage/privacy semantics?

Do not assume `before_lodging` merely because the Night is forced.

## 3. LodgingResolution

Purpose:
- enumerate eligible lodging choices;
- verify cost/conditions;
- apply payment atomically;
- establish authoritative housing context for this Night.

Ordinary housing contexts:
- normal room;
- cheap lodging;
- street/no lodging.

Structural poverty requirements:
- street remains the zero-money fallback;
- cheap lodging is distinct from normal room;
- lodging payment does not itself advance the day.

After this phase, housing-dependent event/menu eligibility may be evaluated deterministically.

Save/reload:
- committed payment cannot repeat;
- selected housing context survives reload.

## 4. Housing context becomes authoritative

Once LodgingResolution commits:
- `normal` may expose the full ordinary voluntary menu;
- `cheap` may expose a reduced/altered voluntary menu;
- `street` exposes restricted ordinary options plus street/poverty event eligibility.

Exact restrictions remain content/balance owned.

Inventory itself must not disappear because of street/cheap lodging.

## 5. PostLodgingForcedCheck

Architecture capability:
- forced event may run after housing/payment is known and before voluntary choice.

Ordinary street poverty:
- one-time or ordinary street events that must preempt the voluntary menu can be authored here, because street context is now known.

Secret lender encounter:
- it is eligible only when the authoritative housing context is street;
- therefore in the current phase model it cannot be resolved truthfully before housing context is established;
- exact authoring phase after lodging remains content-owned, but it must be before any later action that would invalidate its intended one-time Night semantics.

Bound Secret Debt forced Night:
- **possible host phase**;
- Product may choose this if lodging should still be paid/selected before the forced obligation.

Product-owned questions:
- pre- vs post-lodging intercept;
- lodging payment suppression;
- whether street-specific poverty event and bound forced Night can both occur in one Night or one suppresses the other.

## 6. Ordinary poverty event ordering

Ordinary street/cheap events must be ordered from authoritative housing state.

Minimum rules:
1. do not roll/resolve street-only event for normal/cheap housing;
2. once event outcome commits, reload cannot reroll it;
3. ordinary event must not silently become Secret Debt;
4. ordinary event may affect money/resource/condition/relationship/public state only through accepted effects;
5. event outcome may add next-day modifier for finalization later.

Whether an ordinary housing event happens:
- automatically before voluntary menu;
- as a selectable Night option;
- during NightEventResolution

is content-authoring choice as long as the same phase/idempotency rules hold.

## 7. VoluntaryNightChoice

Reached only if no forced event policy suppresses the voluntary menu.

Housing-dependent shape:
- normal: full ordinary voluntary menu;
- cheap: reduced/altered menu as authored;
- street: restricted menu, no normal private/study behavior unless separately accepted.

Existing voluntary types may include:
- sleep;
- night study where housing allows;
- relationship scene;
- special voluntary activity.

Bound Secret Debt:
- forced obligation is user-directed to suppress ordinary voluntary Night freedom;
- therefore if Secret Debt forced event is active, the authored policy must prevent an incompatible ordinary voluntary choice from also consuming the same Night.

## 8. `after_choice` forced hook

Architecture supports a forced check after a voluntary choice.

Secret Debt:
- technically possible host phase;
- Product must decide whether this is appropriate for the intended loss-of-freedom fantasy.

If selected:
- there must be an explicit rule for whether voluntary action effects remain;
- the Night still advances once;
- no second independent sleep/lodging payment may occur.

This packet does not choose `after_choice`.

## 9. NightEventResolution

Purpose:
- resolve the selected/forced Night event transaction;
- persist event effects and career/relationship/public state;
- register any next-day modifiers.

Ordinary poverty:
- committed street/cheap event effects apply once.

Secret Debt lender:
- offered/refused/accepted choice and immediate grant, if this is the chosen authoring phase, must be idempotent.

Secret Debt bound forced Night:
- forced career counters/story facts may advance once;
- it remains separate from daytime Secret Debt shift;
- exact content variants remain open.

## 10. NextDayModifiersFinalized

All Night sources contribute accepted next-day effects here.

Potential sources:
- street housing penalty;
- cheap-lodging authored pressure;
- night study;
- ordinary poverty event;
- bound Secret Debt forced Night;
- other accepted Night content.

Product-owned policy:
- modifier stacking/replacement/capping/priority where multiple sources affect the same stat/resource.

Do not choose the policy in this map.

Required invariants:
- source identity remains traceable;
- each committed modifier is included once;
- reload cannot duplicate a modifier;
- current-day Energy is not retroactively changed;
- final next-day Energy/state is derived once at the Night boundary.

## 11. CalendarAdvance

Exactly one completed Night advances calendar once.

Not separate calendar advances:
- lodging payment;
- ordinary poverty event;
- Secret lender event;
- forced Secret Debt Night;
- voluntary choice;
- modifier finalization.

Save/reload:
- `calendarAdvanceCommitted` or equivalent invariant prevents duplicate day advance.

## 12. StartDay

Start next day with:
- finalized next-day Energy/modifiers;
- persisted money/resources/items;
- persisted housing-independent progression;
- Secret Debt state unchanged except for events committed during Night;
- delayed-debt activation evaluated at its proper calendar/resolver boundary.

Do not apply the same Night penalty again at StartDay if it was already committed/finalized.

## Secret Debt sequencing points still Product-owned

| Decision | Current status |
| --- | --- |
| forced Night intercept point | OPEN: before_lodging / after_lodging / after_choice |
| suppress lodging payment | OPEN |
| ordinary poverty event vs forced debt Night priority | OPEN |
| whether lender offer suppresses voluntary menu | OPEN authoring policy |
| next-day modifier composition | OPEN |
| exact forced-Night penalty | OPEN balance |
| exact lender chance | OPEN balance |

## Already-defined sequencing constraints

These are not open:
- street-dependent event requires authoritative street housing context;
- lodging payment is atomic;
- forced events use explicit NightFlow hooks rather than handler accident;
- voluntary menu cannot consume the same Night when an active forced policy suppresses it;
- next-day modifiers apply exactly once;
- calendar advances exactly once;
- save/reload cannot reroll committed event or duplicate payment/penalty/day advance.

## Activity / Lumber firewall

Night poverty sequencing must not alter:
- daytime Forest entry Energy cost;
- active Activity persistence;
- exact Lumber Forest `activityResult` continuation;
- Lumber Hard Work `completed_shifts >= 50` only;
- exact `hardWork:lumber` reward.
