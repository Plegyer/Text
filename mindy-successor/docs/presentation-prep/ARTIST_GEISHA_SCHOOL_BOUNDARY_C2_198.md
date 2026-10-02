# C2-198 — Artist/Geisha School presentation boundary

Status: COMPLETE FOR PRE-FREEZE PREPARATION
Owner: Chat 2 / Presentation & Media
Published runtime contract observed: `chat1/artist-geisha-complete-v16@73d328578f4d9c35e97675400edb14b2b1468493`
Final authority: exact frozen Artist/Geisha runtime + School authority required by C2-204.

## Authorized prepared tracks

Only these five existing School mappings are authorized for Artist/Geisha preparation:
- Arts & Performance
- Etiquette & Presentation
- Rhetoric & Social
- Body Confidence
- Literacy & Numbers

Existing prepared teacher continuity:
- Nessa Lark
- Eliane Marrow
- Cassian Reed
- Sera Vey
- Mara Fen

No specialized history/music/dance/craft curriculum is created by Chat 2.

## Runtime-contract School hooks

The current runtime contract names Artist-local consumer facts and consumers:
- `school-arts-ready` -> `artist-geisha.routes.master-ready`
- `school-etiquette-ready` -> `artist-geisha.routes.court-ready`
- `school-rhetoric-ready` -> `artist-geisha.relationship.trust`
- `school-body-confidence-ready` -> `artist-geisha.season.autumn-festival`
- `school-literacy-ready` -> `artist-geisha.routes.master-ready`

For all five hooks:
- numeric threshold remains `null`
- producer public fact remains `null`

These are runtime consumer-side facts only. Chat 2 does not invent the School producer condition that creates them.

## Presentation event firewall

`ARTIST_GEISHA_SCHOOL_EVENT_IDS` remains an empty list.

No `artist-geisha.school.*` presentation event is published unless the exact frozen runtime and School authority later contain a concrete live consumer/event identity.

Existing Artist events that consume a School-ready fact keep their own exact Artist event identity; presentation must not relabel them as School events.

## Curriculum boundary

The career draft mentions history/music/dance/craft conditionally. Those remain unsupported specialized curriculum concepts.

Presentation may not imply:
- a new School course;
- a new teacher;
- a certificate;
- a numeric milestone;
- a public School fact;
- a direct career transition;
- automatic Master Artist or Court Invitation readiness.

## Night-study boundary

School study presentation and Artist-local evening/salon opportunities remain separate semantic surfaces. C2-198 does not alter NightFlow or create a new night-study action.

## Accessibility

If a frozen live Artist event later consumes one of the five School-ready facts, its player-facing presentation must still use the exact Artist event identity and preserve RU/EN/static accessibility requirements from C2-203.

## Firewall

C2-198 changes no School mechanics, curriculum, thresholds, public facts, producer effects, career state, Save/RNG, NightFlow, ending eligibility/reward or Meta.
