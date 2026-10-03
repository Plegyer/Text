# C2-238 — Adult core RU/EN accessibility and ARIA naming rules

Status: COMPLETE PREP ONLY
Owner: Chat 2 / Presentation + Media
Future adult accessibility keys: PENDING_RUNTIME_ID

## Scope

Define naming/accessibility rules for future adult/intimacy presentation.

C2-238 does not add production localization keys for consumers that do not yet exist.

## Core rule

Accessibility names describe:
- what is visibly happening;
- exact route/relationship/Night context;
- voluntary vs dependency classification where material;
- safe fallback context.

They must not infer gameplay state that the exact runtime consumer does not publish.

## Neutral production labels

Preferred neutral family labels:
- adult work scene;
- voluntary Night intimacy;
- relationship intimacy;
- route-specific adult scene;
- ending adult payoff;
- dependency/forced Night context.

Avoid labels that sensationalize, moralize, or eroticize beyond what is necessary for accessibility.

## RU/EN parity

Every future production adult presentation key must have:
- RU alt;
- EN alt;
- RU caption;
- EN caption.

If a UI element has a presentation-specific ARIA label, both locales must also be present.

No adult consumer should ship with:
- one-locale-only accessibility;
- filename-derived alt;
- generic “adult scene” text when exact context is known.

## Exact context naming

For exact future consumers, alt/ARIA should include the material semantic axis.

Examples:
- profession/work context;
- relationship role/stage;
- voluntary Night context;
- route identity;
- ending identity;
- dependency/forced context.

Do not expose:
- internal IDs;
- numeric Lust threshold;
- hidden eligibility formulas;
- Meta reward assumptions.

## Voluntary vs dependency

Accessibility must preserve this distinction.

Voluntary example style:
- “A voluntary private Night scene following the selected relationship choice.”

Dependency example style:
- “A restricted Night context showing the route’s loss of choice.”

Do not label dependency/coercive presentation as:
- romance;
- reward;
- partner intimacy;
unless exact runtime authority explicitly provides that distinct meaning.

## Relationship naming

Do not use “romantic partner” unless runtime publishes romance/partner authority.

Safer labels:
- recurring client;
- professional contact;
- relationship contact;
- partner, only where exact relationship identity says partner;
- romantic partner, only where exact romance state says so.

## Client naming

Client presentation must not imply:
- relationship;
- romance;
- exclusivity;
- consent persistence.

Accessibility should describe the exact client/professional context.

## Housing/privacy naming

If future adult presentation is housing-aware:
- normal room;
- cheap lodging;
- street/public context
may be named only when exact runtime context is known.

Do not call a room “private” merely because the media depicts an interior if runtime has not resolved privacy.

## Safe fallback naming

Safe static fallback alt/caption must describe the same semantic consumer without pretending the missing adult media is shown.

Example:
- exact adult relationship consumer -> safe fallback describes the private relationship context, not explicit action.

## ARIA for selectors/options

If future UI exposes adult presentation choices/settings:
- control label names the option and context;
- current selection is programmatically available;
- keyboard focus remains visible;
- labels do not rely on color/icon alone;
- “safe/non-explicit” and “adult/intimacy” remain distinguishable in text.

No new selector is created by C2-238.

## Motion accessibility

Future motion media should preserve:
- textual alt/caption;
- static fallback;
- no information available only through motion;
- media-load failure path.

If motion is disabled, semantic identity must remain understandable.

## Filename boundary

Chat 6 filenames are not user-facing accessibility copy.

Never derive final alt/ARIA directly from:
- asset filename;
- shopping-list index;
- source-provider title.

## Localization key shape

Future keys should follow existing semantic presentation conventions rather than creating a parallel adult localization architecture.

Exact key names remain:
- `PENDING_RUNTIME_ID`

## Forbidden assumptions

`NO_AUTHORITY_NOT_BINDABLE`:
- adult == romance;
- client == partner;
- private room == consent;
- Night == intimacy;
- explicit asset filename supplies accessible meaning;
- safe fallback may use misleading explicit alt.

## Firewall

C2-238 changes no localization architecture, runtime IDs, consent/relationship state, adult router, NightFlow, housing mechanics or media sourcing.
