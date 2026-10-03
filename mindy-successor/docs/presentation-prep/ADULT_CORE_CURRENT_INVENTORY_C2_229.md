# C2-229 — Current adult / suggestive presentation inventory

Status: COMPLETE PREP ONLY
Owner: Chat 2 / Presentation + Media
Queue: C2-229..240
Activation checkpoint: `260e44daad22a6ab8eb879ee24f13b9ec2abf19b`

## Authority summary

Current product direction makes adult/intimacy presentation a core future content family.

At this activation checkpoint, however:
- there are **no dedicated production adult/intimacy presentation consumers**;
- there are existing exact adult-career-safe and voluntary relationship/Night consumers;
- missing adult consumers must remain `PENDING_RUNTIME_ID`;
- asset shopping/inventory is owned by Chat 6 and is not gameplay or presentation authority.

## A. Dedicated adult/intimacy consumers

Exact production count:
- **0**

No current presentation ID is authoritative as:
- adult work;
- adult Night;
- adult relationship;
- adult route;
- adult ending payoff.

Do not attach adult media to an existing safe/default ID merely to avoid this pending state.

## B. Adult-career safe production consumers

The voluntary Prostitute career is adult-themed, but its current shipped presentation remains non-explicit and safe/default.

Exact LIVE_BOUND consumers:
- `job/prostitute/result/default`
- `job/prostitute/shift/spring/default`
- `job/prostitute/shift/summer/default`
- `job/prostitute/shift/autumn/default`
- `job/prostitute/shift/winter/default`
- `ending/prostitute/hard-work`

These surfaces communicate:
- professional work context;
- room/work-space preparation;
- seasonal context;
- ordinary completion;
- Hard Work persistence.

They do **not** authorize adult/intimacy media.

## C. Existing voluntary relationship / Night consumers

These exact shipped consumers are relevant architecture precedents for voluntary private/after-hours scenes, but they are not adult/intimacy consumers.

### Lumber

Runtime event:
- `lumber-night.foreman-professional`

Night choice:
- `lumber.foreman.night`

Presentation:
- `relationship/lumber-foreman/lumber-night-foreman-professional/default`

Current semantic:
- voluntary professional evening conversation;
- explicitly kept professional.

Classification:
- `LIVE_BOUND_NON_ADULT_PRECEDENT`

### Satyr Maid

Runtime event:
- `satyr-maid.recurring-guest.night`

Night choice:
- `satyr-maid.night.recurring-guest`

Presentation:
- `relationship/satyr-maid-recurring-guest/satyr-maid-recurring-guest-night/default`

Current semantic:
- voluntary after-hours contact;
- no automatic romance/intimacy.

Classification:
- `LIVE_BOUND_NON_ADULT_PRECEDENT`

### Tavern

Runtime event:
- `tavern.recurring-traveler.night`

Night choice:
- `tavern.night.traveler-request`

Exact presentation surfaces:
- `night/tavern/tavern-night-traveler-request`
- `relationship/tavern-recurring-traveler/tavern-recurring-traveler-night/default`

Current semantic:
- voluntary meeting/conversation after closing;
- future work remains professional.

Classification:
- `LIVE_BOUND_NON_ADULT_PRECEDENT`

### Undead Farm

Runtime event:
- `undead-farm.night.keeper-request`

Night choice:
- `undead-farm.night.keeper-request`

Presentation:
- `relationship/undead-farm-keeper/undead-farm-night-keeper-request/default`

Current semantic:
- voluntary Night meeting focused on process/work;
- not a romance shortcut.

Classification:
- `LIVE_BOUND_NON_ADULT_PRECEDENT`

## D. Existing Night architecture precedent

Current Night architecture already distinguishes:
- forced hooks;
- lodging resolution;
- voluntary Night choices;
- relationship scenes;
- Night event resolution;
- next-day modifiers;
- calendar advance exactly once.

Existing event definitions also carry exact Night policies such as:
- `before_lodging`
- `after_lodging`
- `after_choice`
through runtime authority.

Chat 2 presentation must consume those exact semantics, not invent Night ownership.

## E. Housing/privacy precedent

Current housing direction distinguishes:
- normal room;
- cheap lodging;
- street/no lodging.

Housing can alter availability/privacy context, but those are balance/product rules outside Chat 2 ownership.

Presentation may later render exact authorized housing variants, but cannot create:
- privacy eligibility;
- relationship availability;
- adult eligibility;
- Night mechanics.

## F. Suggestive vs adult classification

For v21 prep, use these presentation classifications:

- `SAFE_DEFAULT`
  - ordinary non-explicit presentation;
- `VOLUNTARY_PRIVATE_NON_ADULT`
  - exact voluntary relationship/Night surface with no adult semantics;
- `ADULT_PENDING`
  - future explicit/intimacy consumer requiring exact runtime/content authority;
- `COERCIVE_DEPENDENCY_PENDING`
  - future dependency/forced-context consumer that must remain separate from voluntary adult content.

A private room, Night meeting, recurring relationship or adult-themed profession does not by itself imply `ADULT_PENDING` eligibility.

## G. Product-direction families that remain pending

The product direction expects future coverage for:
- adult/intimacy work variants;
- adult/intimacy Night variants;
- relationship/partner variants;
- route-specific adult variants;
- non-killing ending adult payoff.

Current production runtime does not publish exact general-purpose consumers for those families.

Status:
- `PENDING_RUNTIME_ID`

## H. Chat 6 boundary

Chat 6 owns:
- asset shopping/inventory;
- filenames and sourcing plan within its assigned queue.

Chat 2 owns:
- semantic families;
- presentation identity/fallback contracts;
- accessibility rules;
- manifest interoperability semantics.

An asset filename from Chat 6 never becomes:
- a gameplay ID;
- a presentation consumer;
- an adult-routing condition;
- an ending/Night/relationship authority.

## Binding summary

`LIVE_BOUND`:
- exact existing safe/default Prostitute surfaces;
- exact existing non-adult voluntary relationship/Night surfaces listed above.

`PENDING_RUNTIME_ID`:
- all dedicated adult/intimacy consumers.

`NO_AUTHORITY_NOT_BINDABLE`:
- treating safe/default IDs as adult consumers;
- treating a Night/private/relationship context as automatic adult eligibility;
- treating Chat 6 asset inventory as gameplay authority.

## Firewall

C2-229 changes no gameplay conditions/effects/rewards, Lust threshold, consent state, relationship state, NightFlow ownership, housing rules, Save/RNG, economy, ending eligibility/reward, Meta or media sourcing.
