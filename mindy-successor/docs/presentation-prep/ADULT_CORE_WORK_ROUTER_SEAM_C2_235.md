# C2-235 — Adult core high-Lust / content-router presentation seam

Status: COMPLETE PREP ONLY
Owner: Chat 2 / Presentation + Media
Future work-adult router IDs: PENDING_RUNTIME_ID
Numeric threshold: OPEN / NOT OWNED BY CHAT 2

## Product direction

Future work events may commonly route to adult/intimacy presentation above an authoritative Lust/content-routing threshold.

Current authority does not publish:
- exact Lust threshold;
- exact router field;
- exact work event IDs;
- exact adult variant IDs;
- exact override priority.

C2-235 defines only the presentation seam.

## Runtime-to-presentation handoff

Future runtime/content authority should resolve gameplay first and then expose an exact presentation consumer equivalent to:

- safe/default work semantic;
- adult/intimacy work semantic;
- route-specific adult semantic where applicable.

Presentation must not calculate the threshold itself.

## No numeric threshold

Chat 2 does not define or encode:
- `Lust >= X`;
- profession-specific thresholds;
- stat formulas;
- chance/weight;
- seasonal threshold changes.

Any numeric threshold in asset notes or old drafts is non-authoritative for presentation.

## Safe default

Every work event keeps a safe/default semantic identity.

Adult routing must be an explicit alternate consumer.

Never mutate:
- `job/<career>/result/default`;
- `job/<career>/shift/<season>/default`;
into adult consumers solely because a player stat is high.

## Adult work seam

Future exact work-adult binding requires:
1. exact runtime/content event or variant;
2. exact router result;
3. exact adult semantic presentation ID;
4. family fallback;
5. safe static fallback.

Status:
- `PENDING_RUNTIME_ID`

## Route-specific priority

If a future work event is both:
- route-specific;
- adult-routed;

the semantic identity should preserve both dimensions rather than fall back immediately to generic work-adult.

Preferred precedence:
1. exact route/work adult semantic;
2. same profession work-adult family;
3. generic compatible adult family only if meaning is preserved;
4. safe exact work static.

## Relationship boundary

High Lust/content routing does not create:
- partner identity;
- romance;
- recurring client;
- relationship stage;
- consent persistence.

A relationship-adult scene requires its own exact relationship authority.

## Night boundary

Work-adult routing does not automatically consume Night.

Night-adult is a separate family with exact NightFlow authority.

## Coercive/dependency boundary

High Lust must never be used by presentation to reinterpret:
- forced Night;
- dependency route;
- Secret Debt;
as voluntary adult content.

Voluntary/coercive classification comes from exact runtime/content semantics.

## Accessibility

Future work-adult accessibility must name:
- profession/work context;
- route context where relevant;
- adult/private presentation neutrally.

Do not expose the numeric Lust threshold in alt/ARIA unless UI product explicitly requires it.

## Save-neutral rule

Presentation resolution reads the final semantic consumer only.

It must not:
- increment Lust;
- store router state;
- reroll the chosen variant;
- mutate career state.

## Forbidden assumptions

`NO_AUTHORITY_NOT_BINDABLE`:
- adult asset filename implies high Lust;
- high Lust automatically implies adult relationship scene;
- adult work implies Night;
- one global threshold is assumed;
- presentation registry evaluates gameplay conditions.

## Firewall

C2-235 changes no Lust stat/rule, content router, conditions/effects, RNG, work rewards, relationship state, NightFlow, Save schema, economy, ending or media sourcing.
