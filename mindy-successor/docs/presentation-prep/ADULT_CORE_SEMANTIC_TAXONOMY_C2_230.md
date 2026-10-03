# C2-230 — Adult core reusable semantic-family taxonomy

Status: COMPLETE PREP ONLY
Owner: Chat 2 / Presentation + Media
Production adult IDs: PENDING_RUNTIME_ID

## Purpose

Define reusable presentation families for future adult/intimacy coverage without creating runtime IDs, routing thresholds, partner state, Night ownership, ending eligibility, or media bindings.

## Family A — work-adult

Semantic scope:
- adult/intimacy presentation reached from an exact career/work event;
- profession-specific context remains visible;
- ordinary safe/default work presentation remains a separate semantic surface.

Required future authority:
- exact work event/variant ID;
- exact adult/content-router decision from runtime/content authority;
- exact presentation ID.

Must preserve:
- profession identity;
- route/method context where relevant;
- static fallback;
- gameplay-neutral media selection.

Must not imply:
- automatic relationship;
- automatic Night continuation;
- universal Lust threshold;
- universal client state.

Status:
- `PENDING_RUNTIME_ID`

## Family B — Night-adult

Semantic scope:
- adult/intimacy presentation reached from an exact Night consumer;
- voluntary and coercive/dependency routes remain distinct families.

Required future authority:
- exact Night choice/event;
- exact Night phase/intercept ownership;
- exact adult/content-router decision.

Must preserve:
- housing/privacy context only when runtime exposes it;
- calendar-advance ownership outside presentation;
- next-day modifiers outside presentation.

Must not:
- attach adult media to all Night choices;
- infer privacy from Night itself;
- merge voluntary and forced Night.

Status:
- `PENDING_RUNTIME_ID`

## Family C — relationship-adult

Semantic scope:
- adult/intimacy presentation attached to an exact relationship/partner/client stage or choice.

Required future authority:
- relationship ID;
- exact stage/choice/event;
- exact adult-authorized consumer.

Must preserve distinction between:
- professional relationship;
- recurring client;
- friendship;
- romance;
- patronage;
- conflict/exploitation;
- partner route.

Must not infer romance or consent from:
- repeat meetings;
- Night scenes;
- adult work;
- gifts/payment;
- private-room context.

Status:
- `PENDING_RUNTIME_ID`

## Family D — route-adult

Semantic scope:
- adult/intimacy presentation tied to an exact career/quest/route identity rather than generic work or relationship.

Examples of future route contexts:
- Independent House;
- Elite Clientele;
- professional partner route;
- non-killing power/status outcomes;
- route-specific voluntary intimacy.

Required future authority:
- exact route fact/stage/event;
- exact adult consumer;
- exact presentation identity.

Must not:
- create route readiness;
- substitute for ending eligibility;
- invent Palace/status access;
- reuse generic adult asset if it erases route identity.

Status:
- `PENDING_RUNTIME_ID`

## Family E — ending-adult

Semantic scope:
- optional adult/intimacy payoff layer after an exact ending commitment/completion where product/content authority explicitly authorizes it.

Required future authority:
- exact ending ID;
- explicit completed/committed ending state;
- exact adult payoff consumer.

Must not:
- create ending eligibility;
- create commitment;
- replace RunResult;
- grant Meta;
- turn every ending into the same generic adult scene.

Status:
- `PENDING_RUNTIME_ID`

## Cross-family rules

One exact consumer belongs to one primary semantic family.

Family fallback may be shared only when:
- gameplay outcome is identical;
- route/partner/profession distinction is not erased;
- accessibility still names the actual context;
- safe static fallback remains available.

Do not collapse:
- work-adult -> relationship-adult;
- Night-adult -> relationship-adult;
- route-adult -> ending-adult;
- voluntary Night -> coercive/dependency Night.

## Safe-default separation

Existing safe/default presentation IDs remain safe/default.

Adult families are opt-in semantic branches under exact future authority.

No adult family may silently bind to:
- ordinary default work;
- ordinary result;
- generic relationship stage;
- generic Night;
- generic ending static.

## Variant model

Within an exact adult consumer, media variants may be reusable:
- A/B/C/D staging variants;
- route-specific variants;
- partner-specific variants.

Variant choice must not change gameplay.

Presentation resolver may choose among equivalent media while preserving one semantic consumer.

## Accessibility model

Every future family must support:
- neutral RU/EN naming;
- scene-specific alt/caption;
- family-level safe fallback;
- exact semantic identity exposed to UI where needed.

Do not encode gameplay assumptions into accessibility labels.

## Firewall

C2-230 creates no runtime IDs, content-router thresholds, Lust rules, consent state, relationship progression, NightFlow mechanics, housing availability, ending eligibility/reward, Save/RNG or media sourcing.
