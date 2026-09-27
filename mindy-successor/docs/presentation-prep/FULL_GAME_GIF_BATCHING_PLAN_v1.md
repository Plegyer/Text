# Full-Game GIF Batching Plan v1

Purpose: group future GIF production into reusable batches while preserving distinct semantic gameplay presentation identities.

Machine-readable source:
`prior-work/astra/prototype-m3.2/content/full-game-gif-batching-plan.fixture.json`

## Batch 1 — Starter trio

Members:
- Lumber;
- Satyr Maid;
- Undead Farm.

Shared production intent:
- repeatable work motion;
- work-result presentation;
- career-stage variants only where visually meaningful.

Lumber semantic IDs are already shipped.

Satyr Maid and Undead Farm must receive authored production scene IDs before dedicated GIF binding.

Reuse is allowed between careers only at the media level.

## Batch 2 — Remaining seven ordinary careers

Members:
- Hunter;
- Tavern;
- Guard;
- Merchant;
- Assassin;
- Prostitute;
- Geisha/Artist.

Shared reusable classes:
- outdoor route/search;
- indoor service;
- patrol;
- counter/logistics;
- stealth preparation;
- client/service;
- performance.

All dedicated semantic IDs wait on production content authoring.

Do not create a universal `job/work/default` identity merely because work loops can reuse animation.

## Batch 3 — School

Existing semantic coverage:
- all eight paid lesson IDs;
- `location/town/event/base-school/lesson`.

Reusable intent:
- classroom/study loop;
- workshop/classroom setting;
- teacher/presenter variants if Product chooses teacher-specific visual depth.

Current fallback:
- `assets/stage-school.svg`;
- `assets/workshop.svg`.

Future public-result IDs wait on provider/milestone authoring.

## Batch 4 — Ordinary poverty

Surfaces:
- normal room;
- cheap lodging;
- street sleep;
- ordinary street/cheap-housing events.

Reusable intent:
- lodging interior;
- cheap lodging interior;
- street-night exterior.

Current town fallback is sufficient while housing/event semantic IDs are authored.

Street media may later also be reused by Secret Debt scenes without sharing semantic IDs.

## Batch 5 — Secret Debt / Slave

Surfaces:
- lender offer;
- delayed activation;
- hidden daytime career work;
- forced Night obligation;
- paid_freedom;
- bound_life;
- takeover.

Reusable intent:
- street-night setting;
- hidden work loop;
- forced Night setting;
- ending/result presentation.

All final semantic IDs wait on Product decisions plus hidden-career content authoring.

## Batch 6 — Forest / Activity

Existing semantic coverage:
- `activity/forest/route/default`;
- success / escape / failure result IDs.

Reusable intent:
- generic forest route;
- challenge motion;
- result presentation;
- seasonal environment variants.

Future route/challenge/season IDs wait on authored content.

Current `assets/stage-forest.svg` remains the safe fallback.

## Batch 7 — Palace

Reusable intent:
- court service;
- document/logistics work;
- ceremony;
- audience/negotiation.

Final media binding waits on Palace role, assignments, events and outcomes being authored.

No placeholder Palace gameplay IDs are created by this batching plan.

## Batch 8 — Endings / Meta

Existing:
- Lumber ending semantic IDs;
- New Run town context.

Reusable intent:
- ending result;
- epilogue still/loop;
- New Run transition;
- Meta reveal setting.

Future career ending and Palace/Meta reveal identities wait on authored content.

## Batching invariant

A batch is a **media production unit**, not a namespace.

The same GIF may be assigned to several semantic IDs.

But:
- distinct gameplay identities retain distinct presentation IDs;
- save/reload ownership stays gameplay-driven;
- fallback remains available;
- animation never owns mechanics.
