# Poverty / Secret Debt Presentation Flow v1

This map separates ordinary poverty presentation from the hidden Secret Debt / Slave career.

It does not choose final GIFs, final prose, NPC identities, or unresolved balance numbers.

## Ordinary housing / poverty

### Normal room
Product mechanics:
- ordinary nightly payment;
- full normal Night menu;
- no poverty penalty.

Presentation:
- final semantic ID is not assigned here;
- safe implementation fallback: `location/town/default`;
- room/lodging media may be reusable once authored.

### Cheap lodging
Product mechanics:
- cheaper than normal room;
- some Night options limited;
- small penalties/events may occur;
- not a failure state.

Presentation:
- content-specific semantic identity should follow authored housing content;
- lodging imagery may reuse a shared setting while retaining a distinct ID.

### Street sleep
Product mechanics:
- free;
- next-day Energy penalty;
- street event pool;
- reduced ordinary Night options;
- one-time Secret Debt encounter check occurs only here.

Presentation:
- ordinary street sleep remains distinct from the Secret Debt offer;
- one street background/loop may be reused by several semantic IDs.

### Ordinary poverty events
Product mechanics:
- repeatable street/cheap-housing pool;
- helpful / neutral / bad outcomes;
- seasonal variants;
- acquaintance/route hooks.

Presentation:
- event identities must remain separate even if media is shared;
- current town/static fallback is sufficient during implementation.

## Secret Debt / Slave flow

### One-time secret lender offer
Current product draft:
- possible only during street sleep;
- rare chance;
- no more than once per run;
- player may accept or refuse;
- refusal closes this encounter for the run;
- acceptance grants immediate help and creates delayed debt.

Presentation:
- requires its own authored semantic event identity;
- should not reuse the ordinary street-sleep ID merely because the setting can reuse the same media.

### Delayed debt activation
Current product draft:
- normal life continues after acceptance until delayed activation;
- the current draft uses roughly ten days and a much larger future debt, with exact balance still open;
- activation reveals the trap and opens the hidden career.

Presentation:
- activation/reveal is a distinct semantic scene from the original offer.

### Hidden Slave career day work
Current product draft:
- hidden career becomes available during daytime;
- ordinary careers become unavailable while bound;
- their prior progression remains stored;
- hidden career has repeatable work and full career depth rather than a single repayment button.

Presentation:
- daytime work needs career/action/result identities only after authored career content exists;
- a small reusable work-loop set is appropriate, but each distinct gameplay scene keeps its own ID.

### Forced Night obligation
Current product draft:
- forced Night obligation preempts ordinary voluntary Night choices;
- it is separate from daytime work;
- it applies a next-day Energy penalty;
- exact penalty remains open.

Presentation:
- forced Night must have a distinct semantic identity from daytime hidden-career work;
- media may be reused only without collapsing scene identity.

## Outcome families

### paid_freedom
Economy solution:
- debt is paid;
- professional lock is removed;
- ordinary careers become available again.

### bound_life
Career/endurance solution:
- full life outcome, not a failure screen;
- final Meta relationship to Palace/Hard Work progress remains a Product decision.

### takeover
Multi-system power solution:
- requires more than shift count;
- owner is eliminated;
- protagonist takes control;
- exact route conditions and reward remain authored-content decisions.

Presentation rule for all three:
- final ending semantic IDs and dedicated media follow authored ending definitions;
- town/static/text fallback is sufficient while authoring is incomplete.

## Reuse rule

Shared visual media is allowed across:
- normal/cheap lodging;
- street events;
- secret lender scenes;
- hidden-career work/Night scenes;

only when the same visual motion/setting is appropriate.

But semantic IDs remain distinct whenever gameplay identity differs.

Machine-readable source:
`prior-work/astra/prototype-m3.2/content/poverty-secret-debt-presentation-flow.fixture.json`.
