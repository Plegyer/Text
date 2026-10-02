# C2-236 — Adult core relationship / partner / client semantic separation

Status: COMPLETE PREP ONLY
Owner: Chat 2 / Presentation + Media
Future adult relationship IDs: PENDING_RUNTIME_ID

## Existing relationship architecture

Current relationship design distinguishes multiple archetypes:
- professional mentor;
- peer/partner;
- patron/client;
- quest relationship;
- casual/repeatable Night contact.

Relationship progression is typed runtime state and can be condition-triggered through career, Event Resolver, and voluntary Night choices.

Presentation must preserve the exact relationship identity selected by runtime.

## Professional relationship

Prepared presentation meaning:
- work-related trust;
- mentor/colleague coordination;
- professional follow-up.

Must not imply:
- romance;
- adult intimacy;
- exclusivity;
- client relationship.

Adult presentation requires a separate exact future consumer.

## Peer / partner

Prepared presentation meaning:
- established peer/partner relationship where runtime publishes that identity.

“Partner” must not automatically mean:
- romantic partner;
- sexual partner;
- exclusive partner.

Adult relationship presentation requires exact stage/choice authority.

Status:
- `PENDING_RUNTIME_ID`

## Patron / client

Prepared presentation meaning:
- professional/client/patron context.

Must preserve distinction between:
- paying client;
- patron/contact;
- recurring professional relationship;
- romance.

Payment, gifts, repeat meetings or status do not create romance.

Adult client presentation requires exact client/work consumer.

Status:
- `PENDING_RUNTIME_ID`

## Casual / repeatable Night contact

Prepared presentation meaning:
- exact voluntary Night contact;
- repeatable or recurring contact where runtime publishes it.

Must not imply:
- romance;
- committed partner;
- daytime relationship stage;
- adult eligibility.

Adult Night/relationship presentation requires separate authority.

Status:
- `PENDING_RUNTIME_ID`

## Romance

Romance is a distinct route/state.

Presentation may use romance semantics only when runtime/content authority publishes:
- exact relationship ID;
- exact romance stage/fact/choice;
- exact presentation consumer.

Do not infer romance from:
- recurring meetings;
- private room;
- Night;
- adult/intimacy scene;
- client familiarity;
- high-status patronage.

## Adult intimacy

Adult relationship presentation is a layer over exact relationship semantics, not a replacement for them.

Preferred identity dimensions:
- relationship id;
- stage/choice;
- voluntary context;
- adult-content consumer;
- route/partner identity.

Status:
- `PENDING_RUNTIME_ID`

## Professional client vs relationship client

A client may exist only as a work/event context and never become a typed relationship.

Presentation must not manufacture a relationship card/stage merely because:
- client recurs visually;
- an adult scene repeats;
- a Night choice exists.

## Refusal

Current relationship design permits professional-only/friendship routes and notes that refusal need not destroy a relationship.

Presentation should support refusal/decline without automatically signalling:
- relationship failure;
- romance breakup;
- career penalty;
- moral judgment.

## Housing boundary

Private housing may affect relationship availability under runtime/product rules, but privacy does not create:
- relationship;
- romance;
- adult eligibility.

## Night boundary

Voluntary Night can advance an exact relationship when runtime says so.

Presentation does not:
- increment Night counter;
- advance relationship;
- create partner state.

## Coercive/dependency boundary

Secret Debt/dependency routes are not the model for ordinary relationships.

Adult relationship semantics must never silently reuse coercive/dependency presentation families.

## Forbidden assumptions

`NO_AUTHORITY_NOT_BINDABLE`:
- partner == romance;
- client == relationship;
- recurring client == romance;
- adult intimacy == relationship progression;
- private room == consent;
- Night meeting == adult scene.

## Firewall

C2-236 changes no RelationshipState, counters/stages/facts, romance, consent, client state, NightFlow, housing availability, Lust/content routing, Save/RNG, ending eligibility or media sourcing.
