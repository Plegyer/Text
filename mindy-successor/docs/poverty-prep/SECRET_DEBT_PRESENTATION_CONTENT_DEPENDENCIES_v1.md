# Secret Debt Presentation / Content Dependencies v1

Status: dependency map for Secret Debt / hidden Slave career presentation surfaces.

This document does not choose art, prose, exact rewards, balance numbers or final media files.

Presentation contract already fixed globally:
- semantic `presentationId` identifies gameplay/content meaning;
- central presentation stage;
- static fallback;
- text fallback;
- GIF/animation optional;
- mechanics do not depend on media timing/presence.

## Dependency status vocabulary

- **STRUCTURE_READY** — gameplay surface is already required and a presentation family/slot can be planned now.
- **CONTENT_IDENTITY_REQUIRED** — final semantic mapping must wait for concrete authored event/variant/provider identity.
- **PRODUCT_DECISION_REQUIRED** — exact presentation meaning depends on an unresolved Product choice.
- **POLISH_ONLY** — bespoke GIF/art can wait after semantic/fallback coverage exists.

## Lender offer

Fixed structure:
- one-time street-only offer;
- accept/refuse choice;
- immediate benefit on accept;
- hidden future cost not fully disclosed.

Can prepare now:
- presentation family for `secret-debt / lender-offer`;
- fallback layout for offer + choices;
- generic semantic category ensuring this is distinct from ordinary street events.

Still requires authored content first:
- canonical lender/provider identity;
- event ID;
- final choice labels/prose;
- final semantic presentationId suffix/variant if tied to provider/location.

Product decision dependencies:
- exact eligibility details beyond street;
- balance values are not presentation authority.

Final GIF/art:
**POLISH_ONLY after content identity**.

## Refusal / acceptance result

Fixed structure:
- refusal closes route for run;
- acceptance grants immediate benefit once and creates delayed obligation.

Can prepare now:
- two distinct result surface families;
- static/text fallback requirements;
- no timing-coupled mechanics.

Content identity required:
- authored result text;
- provider reaction;
- event IDs/public facts;
- any world-location context.

Do not encode money amount into semantic identity.

## Delayed activation / debt reveal

Fixed structure:
- delayed obligation activates later;
- route changes into bound hidden career;
- activation is a major reveal surface.

Can prepare now:
- dedicated activation/reveal presentation family;
- fallback shell capable of showing debt/career transition;
- semantic distinction from the original lender offer.

Product/content required before final mapping:
- exact activation timing/value presentation policy;
- whether repayment date was previously shown;
- master/employer identity;
- reveal event ID/prose.

Final GIF/art:
wait for authored reveal identity; no exact debt number should be baked into asset naming.

## Repeatable hidden work

Fixed structure:
- repeatable daytime hidden-career work;
- distinct from forced Night;
- full career eventually needs variants/stages.

Can prepare now:
- presentation namespace/family for hidden-career work;
- generic fallback for repeatable shift;
- variant-capable presentation mapping shape.

Content identity required:
- canonical shift action ID;
- stage/context variants;
- location/employer identity;
- exact work situations;
- seasonal/context variants.

Do not author one permanent GIF as if it fully represents the whole career before variants exist.

## Stage milestones / career transitions

Fixed structure:
- multiple stages;
- reactive milestone/story scenes;
- branch choices.

Can prepare now:
- milestone/choice surface contract;
- fallback support.

Content identity required:
- stage IDs/names;
- milestone event IDs;
- branch identities;
- characters/prose.

Presentation should follow authored milestone identity, not temporary stage numbers.

## Forced Night

Fixed structure:
- mandatory while bound;
- distinct from day shift;
- suppresses ordinary voluntary Night freedom according to accepted policy;
- may have multiple variants.

Can prepare now:
- presentation family distinct from ordinary Night and hidden work;
- fallback shell for forced scene;
- semantic separation between forced Night and daytime career.

Product decision required:
- intercept point;
- lodging-payment suppression;
- next-day modifier composition;
- exact variant policy.

Content identity required:
- forced Night event IDs;
- stage/relationship/context variants;
- characters/actions/prose.

Final GIF/art:
wait for authored variant identities.

## Relationship / story events

Fixed structure:
- full hidden career requires relationship/story depth.

Can prepare now:
- generic relationship/story fallback conventions only.

Content identity required before semantic specialization:
- lender/master/ally characters;
- relationship stage/event IDs;
- public facts;
- story branches;
- location/context.

Do not create canonical portraits/GIF mappings for unnamed placeholder NPC roles.

## `paid_freedom` outcome

Fixed structure:
- exact outcome identity `paid_freedom`;
- economy solution;
- dependency exit;
- ending completion uses generic ending flow.

Can prepare now:
- semantic ending surface family keyed to `paid_freedom`;
- ending fallback shell;
- RunResult presentation category.

Product decision required before reward-specific presentation:
- exact Meta reward;
- exact payoff/continuation semantics where open.

Content identity required:
- ending scene/prose/location/characters.

Art can remain fallback-safe until ending content is finalized.

## `bound_life` outcome

Fixed structure:
- exact outcome identity `bound_life`;
- career/endurance fate;
- terminal ending flow;
- excluded from Palace ordinary Hard Work.

Can prepare now:
- semantic ending surface family keyed to `bound_life`;
- fallback shell distinct from ordinary career Hard Work.

Product decision required:
- exact Meta reward;
- any same-run continuation semantics.

Content identity required:
- final commitment scene/prose;
- career milestone context.

Do not reuse ordinary `hardWork:*` presentation identity.

## `takeover` outcome

Fixed structure:
- exact outcome identity `takeover`;
- multi-system power solution;
- external dependency required;
- ending completion through generic flow.

Can prepare now:
- semantic ending surface family keyed to `takeover`;
- fallback shell capable of reflecting control transition.

Product decision required:
- exact external dependency identity;
- exact Meta reward;
- build/check details.

Content identity required:
- takeover event/scene;
- master/ally context;
- resulting control/world fact;
- prose/location.

Final bespoke art should wait for those identities.

## Meta result presentation

Fixed transaction structure:
- reward applies after ending completion;
- RunResult is stable;
- New Run reads Meta state.

Can prepare now:
- generic Meta reward result slot;
- fallback for unknown/not-yet-specialized reward content.

Product decision required before final semantic reward mapping:
- exact reward ID/effect for each of three outcomes;
- automatic vs selectable loadout treatment where applicable.

Do not create reward-specific art or text from qualitative family ideas alone.

## Presentation readiness matrix

| Surface | Structure ready? | Needs content identity first? | Needs Product decision? | Bespoke GIF/art |
| --- | --- | --- | --- | --- |
| lender offer | YES | provider/event/prose | some eligibility identity | after content |
| accept/refuse result | YES | result prose/provider reaction | no exact number needed for slot | after content |
| delayed activation | YES | reveal event/master context | timing/value display policy | after content |
| repeatable hidden work | YES | shift/stage variants | work balance not needed for slot | after content |
| stage milestones | generic shell only | YES | thresholds not needed for shell | after content |
| forced Night | YES family | event variants | intercept/payment policy | after content |
| relationship/story | fallback conventions only | YES | relationship semantics where open | after content |
| paid_freedom | YES outcome family | ending scene | exact Meta reward | optional polish |
| bound_life | YES outcome family | ending scene | exact Meta reward | optional polish |
| takeover | YES outcome family | ending scene/external route | external identity + Meta | optional polish |
| Meta result | generic shell | reward-specific text | exact reward ID/effect | after decision |

## Dependency rule

Prepare generic semantic families/fallbacks from fixed structure now.

Finalize exact `presentationId` mappings and bespoke media only after the gameplay/content identity is authoritative enough that replacing placeholder content will not rename semantics.

## Firewalls

Presentation authoring must not:
- choose debt numbers;
- choose Meta rewards;
- choose School/Activity availability;
- choose external takeover dependency;
- create ordinary Hard Work credit for Secret Debt;
- couple mechanics to GIF availability/timing.
