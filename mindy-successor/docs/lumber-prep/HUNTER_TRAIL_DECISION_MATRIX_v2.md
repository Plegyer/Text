# Hunter Trail Decision Matrix v2

Status: post-PR25 decision matrix for the locked Forest Hunter trail route.

## Locked route identity

Locked:
- route context: **Hunter trail**;
- authoring key: `hunter-trail`;
- it is distinct from logging road and old boundary path;
- it belongs inside `lumber.forest`;
- it must participate in the navigation challenge family;
- save/reload must preserve selected route and resolved challenge state.

Not locked:
- final production option ID;
- clue/public-fact ID;
- navigation capability ID;
- clue acquisition source;
- narrative provider/NPC;
- route-specific reward/lore;
- thresholds.

## Decision H1 — clue / capability identity

Decision status: **OPEN**.

Permissible answer shape:
- one Hunter-owned public clue fact;
- one accepted navigation capability;
- an explicit OR boundary between the two.

Do not reuse `enter_old_boundary` as the Hunter trail gate.

Runtime seams:
- existing public-fact and/or `itemCapability` conditions;
- `availableActivityActions` eligibility;
- route state persistence.

Content seams:
- exact fact/capability ID;
- route option condition authoring;
- optional clue/capability explanation.

Test seams:
- unavailable before ownership;
- available after authoritative ownership;
- reload preserves availability;
- old-boundary semantics remain unchanged.

## Decision H2 — acquisition source

Decision status: **OPEN**.

Question:
How does the player obtain the clue/capability that can expose Hunter trail?

No source is selected here.

Runtime seams:
- existing event/action/relationship/item transaction mechanisms only;
- no new generic runtime is assumed necessary.

Content seams:
- source event/action/relationship;
- accepted public fact or item/capability grant;
- source conditions and repeatability.

Test seams:
- pre/post acquisition boundary;
- exactly-once source behavior if one-shot;
- reload around acquisition;
- no fake production item ID.

## Decision H3 — narrative provider

Decision status: **OPEN**.

Question:
Which authored scene/provider communicates the Hunter trail clue or route meaning?

Runtime seams:
- none beyond shipped Resolver/presentation mechanisms.

Content seams:
- provider identity;
- scene/event ID;
- relationship/public ownership boundary;
- presentation slot/media reference if authored.

Test seams:
- provider scene does not directly mutate unrelated Forest state;
- public boundary is explicit;
- reload preserves pending scene/choice;
- Forest does not read provider-private counters.

## Decision H4 — route reward / lore

Decision status: **OPEN**.

Question:
What route-specific discovery, reward, or lore distinguishes Hunter trail?

Runtime seams:
- existing Activity effects/results and public fact/item effects;
- terminal Activity result IDs remain unchanged.

Content seams:
- exact discovery fact/item/reward;
- prose/lore;
- wildlife/resource content;
- any route-specific presentation.

Test seams:
- reward/discovery applies exactly once;
- reload cannot duplicate it;
- route-specific content does not invent a new terminal outcome;
- escape does not receive success-only reward.

## Decision H5 — threshold / check details

Decision status: **OPEN**.

Locked dependency categories for Hunter trail/navigation may include:
- Wits;
- Reason;
- Hunter/public knowledge;
- navigation capability.

Runtime seams:
- existing condition/effect/check mechanisms selected by the final authoring.

Content seams:
- threshold/check formula;
- challenge option IDs;
- failure/detour consequences.

Test seams:
- exact boundary around selected threshold;
- deterministic reload;
- no reroll after resolution.

## Compatibility firewall

Any Hunter trail implementation must preserve:
- legacy `optionModelVersion=0` save behavior;
- unconditional `forest.route.logging-road`;
- `forest.route.old-boundary` gated only by authoritative `enter_old_boundary` semantics;
- `lumber.forest.success`, `lumber.forest.escape`, `lumber.forest.failure`;
- exact A5 `activityResult` continuation.

## Hard Work firewall

Hunter trail never participates in Hard Work eligibility.

Hard Work remains only:
`completed_shifts >= 50`

Exact reward:
`hardWork:lumber`.
