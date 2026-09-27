# Secret Debt Lender Offer Text Bank v1

Status: CONTENT_DRAFT text bank for the one-time Secret Debt lender encounter.

This file authors narrative variants only. It does not define encounter probability, principal, delayed debt amount, activation delay, runtime state, or Meta rewards.

## Fixed scene structure

Every variant in this bank assumes the already-directed product structure:
- the encounter is available only from an eligible street Night context;
- it is a one-time opportunity per run;
- the offer is financially tempting relative to poverty pressure;
- the player may accept or refuse;
- refusal closes the offer for the current run;
- acceptance grants an immediate benefit once and creates a delayed obligation;
- the full later trap is not disclosed immediately;
- exact money values remain OPEN.

## Lender identity

Canonical identity:
**OPEN / CONTENT_DRAFT**

Until Product/content ownership chooses a final character, use role-only references such as:
- lender;
- creditor;
- well-dressed stranger;
- quiet broker;
- intermediary.

Do not infer:
- faction;
- species;
- gender;
- title;
- relationship route;
- permanent NPC ID.

## Variant A — dry gloves in the rain

### Setup

Rain has already driven most pedestrians indoors. A figure in dry gloves stops near the edge of the awning where you have settled.

They do not ask why you are sleeping outside.

They look once at your clothes, once at the closed inns, and then place a small purse on the stone between you.

### Offer copy

> "You need tonight to become tomorrow. I can make that easier."

The figure nudges the purse closer.

> "Take it if you want it. We can settle the rest later."

No amount is stated in authored prose. UI/economy presentation may show the configured immediate benefit separately if Product later approves that presentation.

### Accept choice — draft

Label:
**Take the money**

Resolution copy:

You close your hand around the purse.

The stranger does not smile. They only nod, as though a simple piece of bookkeeping has been completed.

> "Good. Use it well."

They leave before you can decide whether to ask what "settle later" means.

Immediate mechanical grant:
**OPEN / config-owned**

Delayed obligation:
**not explained numerically in scene text**

### Refuse choice — draft

Label:
**Leave it where it is**

Resolution copy:

You push the purse back across the stone.

For a moment, the stranger studies you with something closer to curiosity than annoyance.

> "Then we have nothing to discuss."

They pick it up and disappear into the rain.

Run rule:
the offer does not return this run.

## Variant B — after the market closes

### Setup

The last market lamps go out one by one.

Someone who has been waiting beneath a covered arcade falls into step beside you only after the street is mostly empty.

Their clothes are too clean for someone with nowhere else to be.

### Offer copy

> "A bad week can become a bad month for stupid reasons."

They hold out a folded pouch.

> "This keeps one bad week from deciding everything."

They do not call it charity.

They do not call it a loan until you ask.

If asked:

> "Call it an advance. Call it a debt. The name won't help you tonight."

### Accept choice — draft

Label:
**Accept the advance**

Resolution copy:

You take the pouch.

The stranger names no deadline in this content draft.

> "I'll know where to find you."

The sentence is quiet enough to sound ordinary.

Only after they leave does it feel less ordinary.

### Refuse choice — draft

Label:
**Refuse the advance**

Resolution copy:

You shake your head.

The stranger folds the pouch away without argument.

> "Then keep your own account."

They leave with no threat and no second offer.

## Variant C — the warm drink

### Setup

A paper cup of something hot appears at the edge of your vision before the person carrying it says anything.

They offer the drink first.

The money comes second.

### Offer copy

> "Cold makes every decision look permanent."

They set a purse beside the cup.

> "This one isn't."

If the heroine asks what is expected:

> "Not tonight."

This line deliberately preserves ambiguity and must not be rewritten into a hidden mechanical promise.

### Accept choice — draft

Label:
**Take the help**

Resolution copy:

The warmth reaches your hands before the implications do.

The lender keeps the exchange almost casual.

> "Spend what you need. We will speak again."

No exact delay is spoken.

### Refuse choice — draft

Label:
**Refuse**

Resolution copy:

You keep your hands to yourself.

The stranger retrieves both purse and cup.

> "Your choice."

No anger. No pressure. No second attempt tonight.

## Variant D — no pity

### Setup

The stranger does not offer sympathy.

They ask one practical question:

> "How much longer can you afford to solve every problem one day at a time?"

Before you answer, they produce a purse.

### Offer copy

> "This buys you room to choose."

The sentence is persuasive because, in the immediate moment, it is true.

It does not explain the later cost.

### Accept choice — draft

Label:
**Buy some breathing room**

Resolution copy:

You accept.

The lender confirms the exchange with a short nod.

> "Use the room."

Nothing else is explained now.

### Refuse choice — draft

Label:
**Keep your debt at zero**

Resolution copy:

You refuse.

> "Then keep it that way."

The lender leaves.

This wording is scene flavor only and must not be interpreted as a system promise that no other debts/costs can exist.

## Variant E — the envelope

### Setup

An unmarked envelope is offered instead of a purse.

The paper is good quality. The contents are not shown until the player accepts.

### Offer copy

> "You don't need to trust me. You only need to decide whether this helps."

If the player asks what comes later:

> "A conversation."

No date. No amount. No explicit threat.

### Accept choice — draft

Label:
**Open the envelope**

Resolution copy:

You break the fold and take what is inside.

The lender watches only long enough to know you have accepted.

> "Then we understand each other."

The heroine may not actually understand the future trap. That asymmetry is intentional.

### Refuse choice — draft

Label:
**Hand it back unopened**

Resolution copy:

You return the envelope.

The lender takes it without protest.

> "Fair enough."

They leave.

## Optional heroine response tones

These are prose variants only. They must not silently change route mechanics.

### Wary

> "What do you get out of this?"

Lender response:

> "Later, something worth asking for."

### Defiant

> "I don't belong to anyone."

Lender response:

> "I didn't say you did."

The line must not imply that later dependency is already consented to.

### Exhausted

> "I just need enough to get through tomorrow."

Lender response:

> "Then decide about tomorrow."

### Practical

> "What are the terms?"

Lender response:

> "Not terms you need to memorize tonight."

This deliberately avoids inventing exact debt terms.

## Presentation identity placeholders

Suggested semantic families for later presentation work:

- `secret-debt/lender-offer/rain`
- `secret-debt/lender-offer/market-close`
- `secret-debt/lender-offer/warm-drink`
- `secret-debt/lender-offer/no-pity`
- `secret-debt/lender-offer/envelope`

These are CONTENT_DRAFT placeholders, not canonical production IDs.

Each may later have:
- static fallback;
- text fallback;
- 3–5 media/GIF candidates;
- the same mechanical offer identity regardless of media candidate.

## Prohibited content drift

Do not add to these scenes without Product authority:
- exact encounter probability;
- exact principal;
- exact future debt;
- exact activation delay;
- exact repayment deadline;
- guaranteed violence;
- guaranteed sexual coercion;
- canonical faction/owner identity;
- exact takeover route clues;
- exact Meta reward;
- hidden career threshold.

## Authoring acceptance

A production conversion of this text bank should prove:
1. scene is reachable only through the accepted street context;
2. offer opportunity occurs at most once per run;
3. accept/refuse are both available;
4. refusal remains terminal for the offer this run;
5. acceptance applies configured immediate benefit once;
6. save/reload cannot duplicate the grant or reroll a committed scene;
7. later obligation remains delayed;
8. prose does not expose guessed values that differ from config/Product authority.

## Secret Debt / Palace / Lumber firewalls

This text bank does not:
- count Secret Debt as one of the 10 ordinary careers;
- grant ordinary Hard Work;
- change Palace prerequisites;
- change Lumber Hard Work;
- change Lumber Forest Activity behavior.
