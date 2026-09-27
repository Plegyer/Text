# Ordinary Poverty Implementation Readiness v1

Status: implementation-readiness map derived from `ECONOMY_AND_POVERTY_DRAFT_v0.md` and current Night/housing contracts.

This packet locks no final economy numbers and invents no canonical street fiction.

## Authority boundary

Product-directed / structurally fixed:
- poverty must remain playable and must not become a softlock;
- three ordinary housing contexts exist: normal room, cheap lodging, street/no lodging;
- street sleep costs no money at the structural level and advances to the next day;
- starting jobs remain reachable as anti-softlock recovery and do not require an obligatory paid tool for a basic shift;
- ordinary street/poverty content exists independently of Secret Debt;
- Secret Debt is exceptional and is not the standard poverty recovery route.

Balance/fiction still OPEN:
- exact room/cheap lodging prices;
- exact street next-day penalty;
- exact cheap-lodging penalties;
- exact starting money/wages/school prices;
- exact street-event weights and rewards;
- final housing names/locations/NPCs/prose;
- exact relationship/resource-help values.

Simulation-supported candidate numbers may inform a later balance pass but are not promoted to Product lock by this packet.

## Normal room

Implementation structure:
- paid lodging option;
- normal housing context for NightFlow;
- full ordinary voluntary Night menu unless another accepted condition suppresses it;
- supports privacy/storage-compatible content;
- no automatic poverty penalty;
- payment is atomic and does not itself advance the calendar.

Runtime seams already available:
- Night lodging resolution;
- atomic payment;
- persisted housing/Night phase;
- relationship/night option gating;
- exactly-once calendar advance.

Content still needed:
- final price;
- final name/place presentation;
- relationship/private-scene inventory;
- optional storage/preparation content.

## Cheap lodging

Implementation structure:
- cheaper than normal room as a product relationship, without locking a number here;
- valid Night housing context, not a failure state;
- weaker privacy/menu than normal room;
- may limit selected relationship/private/study variants;
- may carry small authored penalties/events, but no universal penalty is fixed here.

Runtime seams already available:
- lodging choice/payment;
- housing-context-dependent Night options;
- next-day modifiers;
- pending scene/save/reload.

Content/balance still needed:
- exact cost;
- exact restricted options;
- any Grooming/condition pressure;
- ordinary cheap-lodging event pool.

## Street sleep

Implementation structure:
- zero-money fallback lodging;
- always permits the run to reach the next day;
- restricted ordinary voluntary Night menu;
- separate street/poverty event pool;
- season-aware street variants may exist;
- one-time Secret Debt encounter check is a separate exceptional hook;
- should worsen the next day without creating an inevitable permanent downward spiral.

Runtime seams already available:
- fallback outside/street lodging concept in NightFlow;
- next-day modifiers;
- forced/ordinary Night event hooks;
- calendar advance exactly once;
- save/reload around lodging and pending scenes.

Content/balance still needed:
- exact next-day Energy/Grooming/condition penalty;
- final event pool;
- seasonal event distribution;
- presentation.

## Anti-softlock recovery

Structural guarantees:
1. zero-money active run has at least one reachable income path;
2. a starting job remains executable without an obligatory purchase;
3. street sleep can advance the run;
4. ordinary poverty can recover without Secret Debt;
5. penalties must not mathematically force an irreversible downward spiral;
6. recovery should have more than one authored source over the full product.

Recovery hook families already directed by Product design:
- starting-job work;
- cheap lodging instead of normal room;
- temporary reduction of School spending;
- earned item/resource use;
- relationship help/favor;
- accessible small paid event;
- sale/barter of allowed resources if/when that economy path is accepted.

No single helper NPC may be made mandatory by this readiness packet.

## Ordinary street event pool

Required content shape:
- repeatable micro-events;
- helpful, neutral and bad outcome families;
- seasonal variants/hooks;
- acquaintance/relationship hooks;
- item/resource hooks;
- anti-softlock guard so an event cannot remove the last practical recovery path;
- semantic presentation identity with fallback.

Not fixed here:
- event IDs;
- probabilities;
- money amounts;
- stat/condition magnitudes;
- characters;
- prose;
- art.

Secret Debt must be checked separately from this ordinary pool so ordinary poverty still works if the Secret Debt offer never appears or is refused.

## Relationship/resource recovery hooks

Allowed structural roles:
- relationship help/favor can reduce immediate poverty pressure;
- an earned item/resource can unlock recovery or sale/barter if that system is accepted;
- events may grant or consume ordinary resources;
- none of these may become the only universal poverty recovery method.

Ownership rule:
- relationship systems own relationship progression/facts;
- inventory/economy owns item/money state;
- poverty content reads accepted public/authoritative state rather than private counters.

## Night / Energy interaction

Poverty lodging affects Night availability and next-day modifiers, not current-day Work/School/Activity Energy retroactively.

Night must still:
- resolve lodging atomically;
- apply any accepted next-day modifiers exactly once;
- advance the calendar exactly once;
- survive save/reload without double payment, reroll or duplicate penalty.

## Readiness classification

| Area | Structure | Runtime seam | Balance/content |
| --- | --- | --- | --- |
| normal room | DIRECTED | READY | price/fiction/private content OPEN |
| cheap lodging | DIRECTED | READY | price/restrictions/penalties OPEN |
| street sleep | DIRECTED | READY | exact penalties/events OPEN |
| anti-softlock recovery | LOCKED invariant | READY at primitive level | breadth/content OPEN |
| ordinary street pool | DIRECTED | READY at event/Night level | canonical events/weights OPEN |
| relationship help | DIRECTED hook | existing relationship/public-state seams | exact provider/effect OPEN |
| resource recovery | DIRECTED hook | inventory/economy seams | sale/barter policy and values OPEN |
| Secret Debt hook | separate user-directed route | Night/event seams available | exact balance remains OPEN |

## Acceptance-ready invariants

Future implementation must demonstrate:
- zero-money street fallback can reach the next day;
- at least one starting-job recovery path remains available outside Secret Debt;
- normal/cheap/street contexts produce distinct option shapes;
- ordinary street events can resolve without forcing Secret Debt;
- save/reload does not duplicate lodging payment, street penalty or event resolution;
- Secret Debt offer remains separate and one-off when implemented.

## Non-goals

Do not lock from this document:
- exact currency numbers;
- exact Energy/Grooming penalties;
- a canonical street NPC/event;
- a poverty ending;
- a shop/sale system not already accepted;
- Secret Debt exact chance/principal/debt.
