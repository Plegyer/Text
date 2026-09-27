# Secret Debt State Machine Authoring Packet v1

Status: explicit state/transition authoring packet derived from `POVERTY_HIDDEN_CAREER_DRAFT_v0.md`.

This packet preserves the user-directed hidden-career structure and does not lock open economy numbers, penalties, rewards, thresholds or fiction.

## Core domain rule

Secret Debt is a separate hidden career/state machine, not an ordinary poverty fallback and not one of the 10 ordinary professions.

Do not implement it as unrelated generic booleans.

Authoritative state should be one coherent `SecretDebtState` (or an equivalent typed domain model) with stable phase/outcome data.

## State graph

```text
unseen
  -> offered
      -> refused
      -> accepted_pending_activation
          -> bound
              -> resolved:paid_freedom
              -> resolved:bound_life
              -> resolved:takeover
```

### `unseen`

Meaning:
- one-time lender encounter has never been resolved;
- route is still eligible to be offered only from accepted street-sleep context.

Allowed transition:
`unseen -> offered`

Requirements:
- street-sleep eligibility context;
- one-off encounter roll/check;
- persisted RNG/decision boundary so reload cannot reroll a different encounter outcome.

Open balance:
- exact chance;
- exact timing/season weighting;
- exact lender identity/prose.

### `offered`

Meaning:
- one-time offer is pending;
- player has not yet accepted or refused.

Allowed transitions:
- `offered -> refused`;
- `offered -> accepted_pending_activation`.

Save/reload:
- pending choice survives reload;
- offer is not rolled again;
- no money/debt/job lock is applied until the accepted choice commits.

### `refused`

Meaning:
- offer was refused;
- Secret Debt encounter is consumed for the current run;
- it cannot be offered again.

Terminal for this route in the current run.

Ordinary poverty remains playable through normal recovery.

### `accepted_pending_activation`

Meaning:
- player accepted the hidden loan;
- immediate benefit/grant has committed exactly once;
- acceptance day and future activation boundary are persisted;
- normal ordinary-job availability continues until activation.

Required persisted categories:
- accepted/consumed encounter identity;
- acceptance day;
- activation boundary/day;
- principal/benefit state;
- debt obligation state.

Open balance:
- exact immediate amount;
- exact future debt;
- exact delay length if balance authority has not locked it;
- exact presentation of the repayment deadline.

Transition:
`accepted_pending_activation -> bound` when the persisted activation boundary is reached.

Reload must not:
- move the activation boundary;
- replay the immediate grant;
- reroll acceptance;
- activate early or late because of load ordering.

### `bound`

Meaning:
- hidden Slave career is active;
- `slave` becomes the available career path;
- all 10 ordinary jobs are unavailable by domain rule;
- their previous career progress remains stored and unchanged;
- normal career progression for blocked jobs cannot advance;
- forced Secret Debt Night obligation is active.

Job availability contract:
```text
JobAvailability(ordinaryJob) = false
JobAvailability(secretDebt/slave) = true
```

This is not merely UI hiding.

School / large Activity:
**OPEN Product decision.**

Do not automatically block School or Activity just because ordinary jobs are blocked.

### Forced Night obligation while `bound`

Required behavior:
- intercepts normal NightFlow through an accepted forced-night hook;
- suppresses ordinary voluntary Night choice according to the authored forced-event policy;
- consumes the Night exactly once;
- may advance Secret Debt career counters/events;
- may apply an accepted negative next-day modifier;
- is separate from the daytime hidden-career shift;
- calendar advances exactly once.

Still OPEN:
- exact intercept point relative to lodging;
- whether lodging payment is suppressed;
- exact next-day Energy penalty;
- exact Night content variants.

Runtime host contract already supports forced Night hooks before/after lodging/choice; Product/content must choose the exact authored policy.

## Resolved outcome states

All three outcome families are distinct; they may not be reduced to one shift-count ladder.

### `resolved:paid_freedom`

Meaning:
- economic solution completes;
- professional lock is removed;
- ordinary jobs become available again if the run continues before/after ending flow as the accepted ending design permits;
- ending eligibility/commitment/completion uses the common ending transaction.

Exact debt amount and Meta reward remain OPEN.

### `resolved:bound_life`

Meaning:
- endurance/career-life solution;
- not a generic failure screen;
- requires substantial hidden-career progression plus conscious ending commitment.

Before ending completion/commitment, `bound` job/Night rules remain active.

After terminal ending completion the run follows common RunResult/New Run semantics. If Product later allows continuation after this outcome, job-lock behavior must be explicitly authored rather than inferred.

Exact threshold, milestone and Meta reward remain OPEN.

`bound_life` is excluded from the Palace 10/10 ordinary Hard Work prerequisite.

### `resolved:takeover`

Meaning:
- multi-system power solution;
- owner/master is eliminated and protagonist takes control;
- must require more than hidden-career shifts alone;
- at least one external dependency category is required by design.

After the dependency is resolved, the ordinary-job professional lock must not remain accidentally active if the run is allowed to continue.

Exact build, external condition, reward and lore remain OPEN.

## Transition table

| From | Trigger | To | Exactly-once effect |
| --- | --- | --- | --- |
| unseen | eligible street encounter selected | offered | mark pending one-time encounter |
| offered | refuse choice | refused | consume encounter for run |
| offered | accept choice | accepted_pending_activation | immediate benefit + persisted delayed obligation |
| accepted_pending_activation | activation boundary reached | bound | enable hidden career + block ordinary jobs + enable forced Night |
| bound | accepted economic resolution | resolved:paid_freedom | remove professional lock; ending-ready state |
| bound | accepted career/endurance resolution | resolved:bound_life | ending-ready state / terminal commitment path |
| bound | accepted multi-system takeover resolution | resolved:takeover | remove dependency lock according to ending continuation semantics |

## One-off encounter invariant

Exactly one offer opportunity per run:
- `refused` never returns to `unseen`;
- `accepted_pending_activation` never returns to `offered`;
- reload cannot duplicate the offer;
- starting a new run creates fresh run-level Secret Debt state according to normal new-run rules.

## Ordinary-job blocking invariant

While `bound`:
- all 10 ordinary jobs are unavailable;
- prior progress remains preserved;
- their reactive career progression does not advance;
- Secret Debt career remains separately available.

On genuine exit from dependency:
- the professional lock is released;
- previous ordinary career progress is restored as the same preserved state, not reset/regranted.

## Palace exclusion

Secret Debt is additional to the 10 ordinary jobs.

Secret Debt outcomes, including `bound_life`, do not count toward:
`completedOrdinaryHardWork contains ALL 10 ordinary job IDs`.

## Open authoring/balance fields

Do not lock here:
- offer chance;
- immediate money amount;
- future debt amount;
- exact delay if balance authority leaves it open;
- forced-Night penalty;
- career stages;
- shift stat magnitudes;
- School/Activity availability while bound;
- exact ending conditions;
- exact Meta rewards;
- lender/master identity;
- prose/presentation assets.
