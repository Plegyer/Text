# Secret Debt Forced-Night Authoring Boundary v1

Status: boundary between fixed forced-Night Product structure and unresolved authoring/balance.

## Fixed Product requirement

While Secret Debt is in authoritative `bound` state:
- a mandatory Secret Debt Night obligation exists;
- it is distinct from the daytime hidden-career shift;
- the same Night cannot also be consumed by an incompatible ordinary voluntary choice;
- forced Night may advance Secret Debt career/story state;
- any accepted next-day penalty applies through normal Night modifier flow;
- save/reload cannot duplicate the event, penalty or calendar advance.

## Current-compatible NightFlow intercept candidates

### Candidate A — `before_lodging`

Current runtime supports it.

Compatible shape:
- forced Secret Debt event triggers immediately after EndDay;
- may suppress lodging selection/payment if Product explicitly chooses that policy;
- voluntary Night menu is suppressed;
- event consumes Night;
- next-day modifiers finalize once.

Open questions:
- is housing skipped entirely?
- if housing is skipped, which housing context applies to storage/privacy/next-day content?
- should player still pay lodging?

Do not choose this candidate merely because it is earliest.

### Candidate B — `after_lodging`

Current runtime supports it.

Compatible shape:
- player selects/pays lodging first;
- forced Secret Debt event then intercepts;
- voluntary menu is suppressed;
- event consumes Night;
- housing context remains authoritative.

Open questions:
- should Secret Debt obligation occur regardless of housing tier?
- can street-specific ordinary event also occur on the same Night?
- how do lodging and forced-night modifiers compose?

### Candidate C — `after_choice`

Current runtime supports it.

Compatible shape:
- a voluntary choice is selected first;
- forced event follows.

Product concern:
this may conflict with the intended loss-of-freedom fantasy unless the earlier voluntary action is intentionally allowed.

If selected, authoring must define:
- whether voluntary choice effects remain;
- how one-Night consumption is enforced;
- which action is considered the actual Night occupation.

This packet does not select it.

## Voluntary-menu suppression

Fixed requirement once the forced Secret Debt obligation is active:
- incompatible ordinary voluntary Night choices must not remain available as a second independent Night action;
- one Night advances once.

Implementation may use existing `suppressVoluntaryMenu` / `consumesNight` policy according to chosen intercept.

## Day work vs Night obligation

Fixed separation:
- daytime Secret Debt work is an ordinary daytime action/career shift;
- forced Secret Debt Night is a NightFlow obligation;
- performing one does not count as performing the other;
- they may affect different counters/facts;
- daytime Energy cost and next-day Night penalty are separate concepts.

Do not merge them into one action to simplify content.

## Next-day penalty

Fixed only at structural level:
- forced Night may impose negative next-day pressure.

Still balance-owned:
- exact Energy delta;
- stat/condition effects;
- whether every variant has the same penalty.

Still Product/balance-owned:
- stack / replace / cap / priority behavior when lodging or other Night content also contributes a modifier.

Current runtime already supports tagged next-day modifiers; numeric magnitude remains parameterized.

## Relationship/story variants

Content-owned:
- event IDs;
- master/lender/ally involvement;
- relationship facts/stages;
- stage-specific variants;
- prose;
- presentationId;
- media/GIFs.

Fixed authoring expectation:
- more than one forced-Night variant over the full career;
- variants may react to career stage/relationship/context;
- cross-system conditions should use public/typed state.

## Save/reload contract

Any selected authoring shape must prove:
1. enter Night with authoritative bound state;
2. selected forced event/variant persists across reload;
3. lodging payment, if already committed, is not charged twice;
4. forced event effects commit once;
5. Secret Debt career/story progression commits once;
6. next-day modifier is queued once;
7. calendar advances once;
8. reload after StartDay does not replay the forced Night.

RNG:
- if a forced variant is probabilistic, reload cannot reroll after selection.

## Exactly-once transaction boundary

Recommended contract shape, without selecting intercept:
```text
Night eligibility check
-> choose/persist forced event instance
-> resolve forced scene choice/result
-> commit Secret Debt effects
-> queue next-day modifier
-> finalize Night
-> calendar advance once
```

The specific phase before the forced event remains Product-owned.

## Housing interaction remains open

Do not infer:
- forced Night always skips lodging;
- forced Night always requires paid lodging;
- street lodging is mandatory while bound;
- forced Night changes housing tier.

These are separate authoring/Product choices.

## School / Activity independence

Forced Night requirement does not decide whether School or Activity is available during the daytime while bound.

Those remain separate Product decisions.

## Acceptance table

| Point | Status |
| --- | --- |
| mandatory forced Night while bound | FIXED |
| voluntary-menu suppression once forced obligation is active | FIXED |
| daytime work and Night obligation separate | FIXED |
| exactly-once save/reload | FIXED |
| intercept point | OPEN: before_lodging / after_lodging / after_choice |
| lodging payment suppression | OPEN |
| exact penalty | OPEN BALANCE |
| modifier composition | OPEN PRODUCT/BALANCE |
| relationship/story variants | CONTENT AUTHORING |
| prose/media | CONTENT/PRESENTATION |

## Firewalls

Forced Night authoring must not alter:
- 10 ordinary-career Palace accounting;
- Lumber Hard Work threshold/reward;
- Lumber Forest Activity continuation.
