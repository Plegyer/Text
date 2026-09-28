# Old-Boundary Safe Visual Source Brief v3

Status: final safe visual semantics for future project-owned old-boundary media.

Gameplay route:
`forest.route.old-boundary`.

Route state:
`old-boundary`.

Semantic presentation ID:
`activity/forest/route/old-boundary`.

Current gameplay gate remains external:
`itemCapability(enter_old_boundary) present=true`.

## Required visual read

The scene should communicate only:
**an older path/boundary line through the forest, marked by old stones and weathered marks**.

Safe visible elements:
- low moss-covered boundary stones;
- one or more additional stones continuing the same line;
- weathered cuts/marks on trunks;
- narrow stony or worn path;
- ordinary forest vegetation;
- less-worked terrain than the modern logging road.

## Do not depict

Reject any source that shows or strongly implies:
- constructed gate;
- arch;
- fence;
- checkpoint;
- turnstile;
- lock/keyhole;
- token slot;
- toll/payment point;
- pedestal waiting for an item;
- Hunter insignia/NPC;
- magical activation;
- ritual device;
- challenge/reward marker;
- treasure;
- hidden destination reveal.

## Token firewall

The visual must not answer:
- where `old_boundary_token` comes from;
- whether it is bought;
- whether it is consumed;
- whether it is retained;
- whether it is surrendered/turned in.

The current capability gate is gameplay state, not a required visible interaction.

## Lore firewall

The scene may show that people marked the area long ago.

It must not establish:
- who made the markers;
- why they were made;
- legal/territorial authority;
- ritual/magical meaning;
- Hunter ownership;
- a deeper Forest reward/outcome.

## Static composition

Preferred:
- one low stone in foreground or midground;
- second marker farther along the same line;
- weathered tree mark offset from center;
- visibly walkable path;
- no dominant constructed entrance structure.

## GIF/motion guidance

Safe:
- leaves/grass moving;
- shifting light;
- slow camera drift;
- gradual reveal of successive markers.

Unsafe:
- gate opening;
- token insertion;
- glowing activation;
- Hunter arrival;
- challenge/reward reveal.

## Accessibility compatibility

Approved alt direction:
old boundary line with moss-covered stones and weathered marks.

Approved caption direction:
stones and old marks form a line distinct from the newer logging road.

Do not encode mechanics or hidden lore in alt/caption.

## Fallback

Until a route-specific source passes this brief:
use shipped neutral
`activity/forest/route/default`
static presentation.

Gameplay route remains `forest.route.old-boundary`.

## Acceptance

A safe source reads as:
**stones + marks + path boundary**.

Anything that reads as:
**entrance mechanism / gate / token interaction / Hunter route / reward**
is outside current Product authority.
