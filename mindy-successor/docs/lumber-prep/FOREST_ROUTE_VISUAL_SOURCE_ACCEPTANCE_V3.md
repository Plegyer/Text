# Forest Route Visual Source Acceptance v3

Status: presentation-only acceptance criteria for future project-owned Forest route static/GIF sources.

Current main:
`3fc5495310e281cf5cbe52da3642000f1cb1fb05`.

No asset is activated by this document.

## Shared requirements

Any future route-specific visual source must:
- correspond only to an already-selected authoritative route state;
- use a locale-neutral presentation identity;
- share the same asset across RU and EN;
- localize alt/caption separately;
- remain compatible with the shipped neutral default fallback;
- change no gameplay state, RNG, result or Save.

Current fallback:
`activity/forest/route/default`
with project-owned
`assets/presentation/forest-route-default-v1.svg`.

## Logging-road acceptance

Target semantic ID:
`activity/forest/route/logging-road`.

Safe visual ingredients:
- broad logging road;
- wheel ruts;
- cut/trimmed branches;
- timber stacks;
- ordinary work marks;
- roadside stumps/chips;
- gradual narrowing back into forest.

Safe motion for GIF:
- slow forward/lateral camera drift;
- leaves/branches moving;
- light across road;
- subtle worksite environmental motion.

Reject if the source implies:
- guaranteed safety;
- lower endurance cost;
- faster progress;
- route reward;
- challenge completion;
- Hunter ownership;
- supernatural/lore revelation.

## Old-boundary acceptance

Target semantic ID:
`activity/forest/route/old-boundary`.

Safe visual ingredients:
- mossed boundary stones;
- weathered tree marks;
- narrow stony path/line;
- repeated marker rhythm;
- old human traces;
- less-worked forest than the current logging road.

Safe motion for GIF:
- leaves/grass moving;
- light crossing stones;
- slow reveal of successive markers;
- subdued camera movement along the line.

Reject if the source depicts or strongly implies:
- constructed arch;
- gate;
- fence;
- checkpoint;
- turnstile;
- token slot;
- toll/payment point;
- Old Boundary Token being used;
- Hunter symbol/NPC;
- magic activation;
- challenge reward;
- hidden destination/reward;
- legal/ritual/territorial authority not established by Product.

## Alt/caption acceptance

Logging-road keys:
- `presentation.activity.forest.route.logging-road.alt`;
- `presentation.activity.forest.route.logging-road.caption`.

Old-boundary keys:
- `presentation.activity.forest.route.old-boundary.alt`;
- `presentation.activity.forest.route.old-boundary.caption`.

Alt describes visible content only.

Caption may add restrained atmosphere, but must not state:
- mechanics;
- hidden lore;
- route reward;
- token semantics.

## Fallback behavior

If a route-specific source is missing, rejected or fails to load:
use the neutral shipped default source.

Do not:
- block the Activity;
- switch route state;
- reroll gameplay;
- change outcome.

## Media-pool acceptance

If multiple visuals are later used:
- 3–5 candidates per route is acceptable;
- all candidates must be semantically interchangeable for gameplay;
- candidate choice must not consume gameplay RNG;
- locale switch must not change the selected gameplay identity;
- same candidate may serve RU/EN with localized alt/caption.

## Result-media boundary

Active-route visuals must not replace or reinterpret current Forest result/return presentation.

Exact result identities remain:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

## Acceptance summary

Logging road:
ordinary forestry traces are safe.

Old boundary:
only old stones + weathered marks + path-boundary semantics are safe.

Anything implying a gate, token operation, Hunter ownership, challenge reward or deeper lore remains rejected until Product explicitly authorizes it.
