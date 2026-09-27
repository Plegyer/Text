# Secret Debt Implementation Precondition Ledger v1

Status: exact preconditions before Lead starts production Secret Debt implementation.

Goal: prevent over-blocking engineering on decisions that can remain parameterized.

## Technical preconditions already satisfied

Current production already provides:
- NightFlow with before/after lodging/after-choice forced intercepts;
- `normal | cheap | street` housing tiers;
- street lodging context and atomic lodging payment;
- reaction/event delivery, event history and reload-stable pending scenes;
- career stages/counters/facts/choices persisted in save;
- calendar elapsed-day and day-start/calendar-advance reactions;
- world/public facts;
- next-day modifiers;
- ending eligibility/commit/completion/RunResult;
- Meta transaction infrastructure;
- presentationId + static/text fallback;
- ordinary 10-career Hard Work set excluding Secret Debt.

These do not need Product answers to exist.

## Technical precondition still required

### Ordinary-career professional lock enforcement

Status:
**REQUIRED BEFORE `bound` can be production-shipped**.

Need:
- one authoritative gate or validated equivalent covering all 10 ordinary careers;
- direct dispatch + availability projection parity;
- reactive ordinary career progression blocked while bound;
- preserved career state;
- lock release on dependency exit;
- School/Activity excluded from this gate.

Product input needed?
**NO** for the ordinary-career block itself; behavior is already directed.

Implementation may proceed with symbolic bound-state ownership.

## Engineering choice needed, but not Product blocker

### State owner

Recommendation available:
- Secret Debt career machine as authoritative owner;
- minimal public projections only for external consumers.

Lead may implement without Product values.

### Delayed activation persistence shape

Technically compatible options are already documented.

Lead may choose:
- career counter/day-boundary representation;
- narrowly typed activation-day representation;
- bounded scheduler extension only if deliberately justified.

Product only needs to provide the final delay value/rule before balance acceptance.

## Product decisions truly blocking observable production behavior

### School while bound

Need explicit:
`AVAILABLE | BLOCKED | CONDITIONAL`.

Blocks:
- School-specific bound-state gating acceptance.

Does not block:
- lender state;
- delayed activation;
- ordinary-career blocking;
- forced-Night plumbing;
- Secret Debt career shell.

### Activity/Forest while bound

Need explicit:
`AVAILABLE | BLOCKED | CONDITIONAL`.

Blocks only Activity-specific bound-state behavior.

### Forced-Night intercept/payment/composition

Need:
- intercept point;
- lodging-payment policy;
- modifier composition rule.

Blocks final forced-Night production sequencing.

Does not block:
- authoring forced-Night variant family;
- career/state scaffolding;
- generic Night tests.

### Exact outcome eligibility

Need final conditions for:
- `paid_freedom`;
- `bound_life`;
- `takeover` external dependency/build.

Blocks final ending definitions.

Does not block:
- ending IDs/family shells;
- common ending transaction tests;
- content scene drafting without locked numeric thresholds.

### Exact Meta rewards

Need exact reward ID/effect for all three outcomes.

Blocks final Meta acceptance.

Does not block ending lifecycle implementation.

## Balance values that may stay parameterized during implementation

These do not need to block structural implementation:
- normal-room price;
- cheap-lodging price;
- street/cheap penalties;
- lender probability;
- immediate principal;
- delayed debt amount;
- activation interval;
- forced-Night penalty magnitude;
- hidden-career stat gains;
- stage/progression thresholds while content shells are being built;
- outcome numeric thresholds until final ending conditions are activated.

Requirement:
- use one authoritative config/content parameter;
- tests distinguish structural invariants from exact-value assertions;
- final Product acceptance waits for approved values.

## Content identities that can be authored independently

Can proceed before final balance:
- lender offer/refuse/accept scene structure;
- activation reveal;
- hidden work action family;
- career stage/milestone scene families;
- forced-Night variant families;
- relationship/story event families;
- outcome scene shells;
- semantic presentation namespaces/fallbacks.

Must remain OPEN where Product identity is unresolved:
- final NPC names;
- exact external takeover dependency;
- exact Meta reward text/effect;
- School/Activity bound policy content.

## Tests writable before implementation

Contract/fixture tests can be written now for:
- Secret Debt state transition legality;
- one-off lender opportunity;
- refusal terminality;
- acceptance grant idempotency using symbolic parameter;
- delayed activation reload invariants with configurable interval;
- ordinary-career block contract;
- progress preservation;
- forced-Night exactly-once generic behavior;
- Palace exclusion;
- ending lifecycle exactly-once with placeholder/no Meta reward only as contract test;
- presentation fallback contract.

These tests must not claim production reachability before content/runtime exists.

## Tests requiring actual implementation but not final balance

After structural code/content exists:
- street-only lender natural reachability with configured chance override/test deterministic seed;
- pending activation round-trip;
- 10-career gate direct dispatch;
- forced Night trigger while bound;
- ordinary progress preservation across days/reload;
- lock release after dependency-resolving outcome.

Exact numeric assertions can read config rather than hard-coded guessed values.

## Tests requiring final Product decisions

Do not finalize until decisions are approved:
- exact housing price/penalty acceptance;
- lender discoverability probability acceptance;
- exact principal/debt economic balance;
- exact activation interval boundary;
- School bound-state availability;
- Activity bound-state availability;
- forced-Night exact intercept/payment/composition;
- `paid_freedom` exact eligibility/payment;
- `bound_life` exact stage/milestone condition;
- `takeover` exact build/external dependency;
- exact three Meta rewards/New Run effects.

## Minimum green-light to start production implementation

Lead does **not** need all Product values.

Production implementation can start when:
1. file ownership is assigned;
2. Secret Debt career/state canonical ID is accepted or locally owned for the package;
3. engineering state-owner representation is chosen;
4. ordinary-career gating seam ownership is assigned;
5. unresolved values are represented as explicit parameters, not guessed constants.

Product decisions are needed only before activating the affected final behavior.

## Stop conditions

Do not proceed with a specific production behavior if implementation would require guessing:
- School/Activity policy;
- forced-Night sequencing policy;
- outcome eligibility identity;
- Meta effect.

Do not let those stop unrelated state/gating/content scaffolding.

## Palace / Lumber firewalls

Always preserve:
- Secret Debt excluded from Palace 10 ordinary Hard Work prerequisite;
- Lumber Hard Work ONLY `completed_shifts >= 50`;
- exact `hardWork:lumber`;
- exact Lumber Forest `activityResult` continuation.
