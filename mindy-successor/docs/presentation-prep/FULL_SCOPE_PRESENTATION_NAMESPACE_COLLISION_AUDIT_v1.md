# Full-Scope Presentation Namespace Collision Audit v1

Scope:
- ordinary careers;
- School;
- Night;
- ordinary poverty;
- Secret Debt / Slave;
- Activity;
- Palace;
- endings;
- Meta / New Run.

This audit does not rename shipped IDs.

## 1. Existing canonical patterns

### Careers

Shipped examples:
- `job/lumber/shift/<season>/default`
- `job/lumber/result/default`
- `job/lumber/event/<event>/<variant>`

Canonical future rule:
use `job/<career>/...` only after the career gameplay identity is authored.

Collision risk:
do not create generic identities such as:
- `job/work/default`
- `job/result/default`

for scenes that belong to distinct careers.

Shared media is allowed without shared semantic identity.

## 2. Relationships

Shipped examples:
- `relationship/lumber-foreman/lumber-foreman-notice/default`
- `relationship/lumber-foreman/lumber-night-foreman-professional/default`

Collision risk:
a relationship event occurring at Night must not be silently moved into a generic Night namespace if its authored identity is still relationship-owned.

Media reuse with another Night scene is safe.

## 3. School

Shipped patterns:
- `school/<track>/lesson/default`
- `location/town/event/base-school/lesson`

Important:
the paid lesson result and the blocking School event are distinct semantic identities.

Collision risks:
- using `school/arcana/lesson/default` for the blocking event;
- creating a second `school/<track>/lesson/default` for a public-result milestone;
- assigning teacher-specific identity before teacher/presenter content is authored.

Future public-result IDs must follow authored provider/result content, not guessed track names.

## 4. Night

Current Night presentation may be owned by:
- shared location context;
- relationship event;
- future forced-flow event.

Collision risk:
a namespace like `night/default` would collapse unrelated gameplay owners.

Safe rule:
derive final semantic identity from the authored gameplay owner.

Examples:
- location-owned normal lodging remains location context;
- relationship-owned Night scene remains relationship identity;
- Secret Debt forced Night should receive its own authored domain identity.

## 5. Ordinary poverty

No final production semantic poverty IDs are locked yet.

Potential collision risks:
- normal room vs cheap lodging;
- street sleep vs ordinary street event;
- street sleep vs Secret Debt lender offer.

All may reuse lodging/street media while retaining distinct authored semantic IDs.

Do not assign final poverty IDs until housing/event content identity is authored.

## 6. Secret Debt / Slave

No final production presentation namespace is locked.

Required distinct authored surfaces include:
- lender offer;
- delayed activation;
- hidden daytime work;
- forced Night obligation;
- endings/outcomes.

Collision risks:
- reusing ordinary street-sleep semantic identity for lender offer;
- reusing daytime hidden-career ID for forced Night;
- encoding outcome identity only in filename;
- treating hidden career as one of the ordinary ten careers.

The final namespace must follow the authoritative gameplay/content domain chosen during implementation.

This audit does not invent that domain.

## 7. Activity / Forest

Shipped:
- `activity/forest/route/default`
- `activity/forest/return/success`
- `activity/forest/return/escape`
- `activity/forest/return/failure`

Prepared future family shapes:
- route-specific;
- challenge-specific;
- seasonal topology-specific.

Collision risks:
- same slug used as both route and challenge;
- result words `success`, `escape`, `failure` reused as route/challenge names;
- season encoded inconsistently as a suffix in one family and path segment in another;
- generic route media mistaken for route gameplay identity.

Do not rename shipped Forest IDs.

## 8. Palace

No production Palace presentation IDs are locked.

Collision risks:
- treating Palace as ordinary `job/<career>` before the hidden/meta domain is authored;
- creating one Palace ID for multiple assignments/events/outcomes;
- naming presentation from a speculative court role.

Content identity must be authored first.

Reusable court media is safe before final IDs exist.

## 9. Endings

Shipped examples:
- `ending/lumber/hard-work`
- `ending/lumber/forewoman`
- `ending/lumber/forest`

Canonical rule:
ending identity is outcome identity, not media identity.

Collision risks:
- one generic `ending/hard-work` across all careers;
- using the same semantic ID for different career outcomes because the same epilogue GIF is reused;
- encoding outcome variants only in filenames.

Future careers should retain domain-specific ending identity once authored.

## 10. Meta / New Run

Current shipped New Run presentation safely returns to:
`location/town/default`.

No dedicated Meta reveal namespace is currently required.

Collision risk:
inventing `meta/.../default` IDs before there is an authored visible Meta scene/transition.

Meta data changes do not automatically require a presentation ID.

## 11. Canonical collision rules

Reject or defer:
1. duplicate exact semantic ID;
2. dotted alias of a slash semantic ID;
3. underscore/kebab aliases for the same intended slug;
4. route/challenge same canonical slug;
5. filename-derived semantic identity;
6. one generic ID for distinct gameplay owners;
7. final ID assigned before the content identity exists;
8. hidden career identity silently inserted into ordinary roster namespace without authoritative design.

## 12. Safe reuse

Safe:
- one work GIF reused by several career action IDs;
- one classroom GIF reused by eight School lesson IDs;
- one street background reused by street sleep and lender-offer IDs;
- one Forest route loop reused by several route/challenge IDs;
- one epilogue asset reused by distinct ending IDs.

Unsafe:
- replacing those distinct semantic IDs with the media reuse-group name.

## 13. Authoring-before-ID locations

Final semantic identity must wait on content authoring for:
- nine non-Lumber ordinary careers;
- ordinary poverty event/housing details;
- Secret Debt production events/work/Night/outcomes;
- School unresolved public-result providers;
- hunter-trail/challenge/season Forest depth;
- Palace assignments/events/outcomes;
- future Meta reveal scenes.

## Conclusion

The current shipped namespace is internally compatible.

Full-game expansion should preserve existing canonical IDs and use media reuse as a separate production layer.

No shipped semantic ID should be renamed merely to make the media library look more uniform.
