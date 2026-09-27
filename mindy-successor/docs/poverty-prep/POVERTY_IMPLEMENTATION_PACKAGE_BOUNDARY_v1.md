# Poverty Implementation Package Boundary v1

Status: smallest future implementation packages for ordinary poverty + Secret Debt.

Goal: allow incremental production without mixing unresolved Product decisions into runtime work.

## Package 1 — ordinary housing / street poverty

Scope:
- normal room;
- cheap lodging;
- street/no lodging;
- anti-softlock recovery;
- ordinary street event host.

Dependencies:
- NightFlow lodging phases;
- money/economy state;
- next-day modifiers;
- calendar advance;
- relationship/item public hooks;
- semantic presentation fallback.

Allowed ownership domains:
- poverty/housing content;
- Night lodging definitions;
- ordinary street event content;
- economy balance data;
- presentation content.

Acceptance evidence:
- three housing contexts are distinct;
- zero-money street path reaches next day;
- lodging payment/penalty applies once;
- ordinary street event resolves without Secret Debt;
- at least one non-Secret-Debt recovery path remains reachable;
- reload preserves selected housing/event outcome.

Product-owned / not fixed by implementation:
- exact prices;
- exact street/cheap penalties;
- exact event weights/effects;
- final housing fiction;
- sale/barter policy if used.

## Package 2 — lender encounter + delayed debt

Scope:
- one-time street lender eligibility;
- offered -> refused/accepted;
- accepted immediate benefit exactly once;
- persisted delayed activation boundary;
- refusal permanently closes route for the run.

Dependencies:
- Package 1 street context;
- SecretDebtState domain persistence;
- event RNG/history;
- money transaction;
- save/reload.

Allowed ownership domains:
- Secret Debt state;
- poverty street event hook;
- economy transaction;
- presentation scene/choice.

Acceptance evidence:
- offer only from eligible street context;
- maximum one offer opportunity per run;
- reload cannot reroll/reoffer;
- refusal remains refused;
- accepted grant occurs once;
- activation boundary remains stable across reload.

Product-owned:
- offer chance;
- exact principal;
- exact activation delay if still balance-owned;
- exact future debt;
- lender identity/prose.

## Package 3 — hidden career availability blocking

Scope:
- activation transitions to `bound`;
- Secret Debt/Slave career available;
- all 10 ordinary careers unavailable;
- ordinary progression preserved but not advanced;
- lock release on genuine dependency exit;
- Palace accounting remains ordinary-only.

Dependencies:
- Package 2 bound-state activation;
- career/job availability resolver;
- career progression owner;
- Meta Palace prerequisite accounting.

Allowed ownership domains:
- Secret Debt state;
- job availability projection;
- career resolver gating;
- Palace/meta prerequisite read.

Acceptance evidence:
- all 10 ordinary jobs unavailable while bound;
- hidden career available;
- existing ordinary progress preserved after reload;
- blocked career reactive progression does not fire;
- exit restores normal availability without resetting progress;
- Secret Debt outcomes add zero Palace ordinary-Hard-Work credit.

Product-owned:
- School availability while bound;
- Activity availability while bound;
- any additional non-job action restrictions.

## Package 4 — forced Night behavior

Scope:
- bound-state forced Night hook;
- suppression of ordinary voluntary Night menu according to accepted policy;
- next-day modifier;
- exactly-once Night completion/calendar advance.

Dependencies:
- Package 3 bound state;
- NightFlow forced hooks;
- lodging/payment state;
- next-day modifier composition;
- calendar.

Allowed ownership domains:
- Secret Debt Night content;
- NightFlow event definitions;
- next-day modifiers;
- presentation.

Acceptance evidence:
- forced Night occurs only when authoritative bound state requires it;
- it is separate from daytime hidden-career shift;
- reload cannot duplicate event/penalty/day advance;
- ordinary voluntary choices are suppressed according to selected policy;
- housing payment behavior matches selected policy.

Product-owned:
- forced intercept point;
- whether lodging payment is suppressed;
- exact next-day Energy penalty;
- modifier stacking/capping policy;
- content variants.

## Package 5 — three outcome families

Scope:
- `paid_freedom`;
- `bound_life`;
- `takeover`;
- common ending eligible -> commit -> complete -> RunResult pipeline;
- outcome-specific dependency exit behavior.

Dependencies:
- Package 3 career state/blocking;
- Package 4 where Night/career counters are outcome inputs;
- economy transaction for paid freedom;
- external accepted hook(s) for takeover;
- generic ending/Meta pipeline.

Allowed ownership domains:
- Secret Debt outcome content;
- ending definitions;
- accepted public facts/items/relationships;
- Meta reward definitions only after Product approval.

Acceptance evidence:
- each outcome has mechanically distinct eligibility;
- eligibility survives reload;
- commitment is explicit;
- completion is idempotent;
- job lock behavior after resolution matches outcome contract;
- Meta applies only after completion;
- no outcome counts toward Palace 10/10 ordinary Hard Work.

Product-owned:
- exact thresholds;
- exact debt payoff requirement;
- takeover external dependency identity;
- exact Meta rewards;
- same-run continuation semantics where open.

## Package 6 — later content-depth expansion

Scope:
- richer repeatable shifts;
- multiple career stages;
- milestone/story scenes;
- multiple forced Night variants;
- relationship/story threads;
- seasonal/context variants;
- extra external hooks;
- route-specific presentation/media polish.

Dependencies:
- Packages 2–5 stable;
- content-depth matrix;
- semantic presentation contract;
- approved Product decisions for remaining identities/rewards.

Allowed ownership domains:
- Secret Debt content;
- relationships;
- School/Activity hooks after approval;
- items/economy;
- presentation.

Acceptance evidence:
- full-career structural depth matrix satisfied;
- no single repeated scene dominates the route;
- save/reload remains deterministic across stage/Night/event variants;
- all accepted external hooks use public/authoritative state;
- fallback presentation works with or without GIFs.

Product-owned:
- stage names/counts;
- exact thresholds;
- NPCs/prose/lore;
- event distribution;
- rewards;
- media priorities.

## Package dependency graph

```text
Package 1 ordinary poverty
  -> Package 2 lender + delayed debt
      -> Package 3 hidden career blocking
          -> Package 4 forced Night
          -> Package 5 outcomes
              -> Package 6 content-depth expansion
```

Package 4 and Package 5 may be developed in parallel after Package 3 if they touch separate owned files/contracts.

## Cross-package invariants

Every package must preserve:
- one file = one active owner;
- save/reload idempotency;
- no invented balance values;
- Secret Debt additional to 10 ordinary jobs;
- Secret Debt excluded from Palace 10/10 prerequisite;
- existing Lumber Hard Work ONLY `completed_shifts >= 50`;
- exact `hardWork:lumber`;
- exact Lumber Forest `activityResult` continuation.

## Not included in these packages

- final economy balance pass;
- final art budget;
- unrelated ordinary career authoring;
- Palace implementation;
- changes to current Lumber runtime/contracts unless a separately demonstrated missing primitive exists.
