# Current project-owned static coverage v5

Status: COMPLETE / PR59_STATIC_EXTENSION_GREEN

Current main:
`54131488c65302f81b3001abaaa345d21f0281e2`
(PR59 merge).

Root presentation blob:
`8dd48a4f2cd80ac908d8a838b82472a368fd3339`.

## Active project-owned root mappings

Current root semantic static mappings under:
`assets/presentation/*.svg`

= `81`.

Unique active physical project-owned sources:
`80`.

The one active physical source shared by two semantic slots remains:
`school-day-study.svg`.

Therefore:
- semantic mappings: 81;
- unique active physical sources: 80.

## Established pre-route-specific target

The previously established current static target was:
`80 / 80`
semantic IDs.

It includes:
- 10 ordinary career results;
- 40 ordinary career seasonal shifts;
- 11 current/reachable School;
- 10 ordinary poverty;
- 6 Forest result/reaction;
- 2 Foreman;
- 1 neutral Forest route/default.

PR59 does not reopen or reduce that target.

It adds one route-specific static mapping above that established target.

## Forest route static breakdown

### Neutral fallback

Semantic ID:
`activity/forest/route/default`.

Physical source:
`assets/presentation/forest-route-default-v1.svg`.

Role:
neutral fallback before route choice and for any route-specific slot without its own media.

This is part of the original 80-ID established static target.

### Logging-road route-specific media

Semantic ID:
`activity/forest/route/logging-road`.

Physical source:
`assets/presentation/forest-route-logging-road.svg`.

Role:
route-specific static added by PR59.

This is the 81st active semantic project-owned static mapping.

It is not counted as a second neutral/default slot.

### Old-boundary route-specific media

Semantic ID exists in the generated presentation catalog through the PR57 seam:
`activity/forest/route/old-boundary`.

Current root static override:
`absent`.

Current physical resolution:
falls back to:
`activity/forest/route/default`.

Therefore Old Boundary currently has:
- route-specific semantic identity;
- no route-specific root physical media.

Do not count the neutral fallback as an active Old Boundary-specific physical source.

## Physical asset directory

Current main `assets/presentation/` files:
`90`.

Active physical files referenced by root project-owned static slots:
`80`.

Retained but currently inactive physical source files:
`10`.

They are:
- `foreman-night-professional.svg`;
- `foreman-professional.svg`;
- `forest-result-escape.svg`;
- `forest-result-failure.svg`;
- `forest-result-success.svg`;
- `poverty-cheap-lodging.svg`;
- `poverty-pressure.svg`;
- `poverty-recovery-help.svg`;
- `poverty-street.svg`;
- `school-night-study.svg`.

These retained files are source history/superseded assets, not active root mappings.

## Route-specific ratio

Current Forest route root static mappings:
`2`.

- neutral default: 1;
- route-specific logging-road: 1.

Current Old Boundary route-specific root static:
0.

Thus route-specific physical coverage is:
`1 / 2 current route-specific route identities`
while both route identities always have a safe physical fallback through route/default.

## Localization/accessibility

PR59 ships complete RU+EN:
- logging-road alt/caption;
- old-boundary alt/caption;
- both route help strings.

The old-boundary accessibility keys are present even though its route-specific physical asset is not root activated yet.

This permits a later presentation-only asset activation without inventing new accessibility identity.

## Locale/media invariance

Current PR59 regressions prove:
- logging-road physical asset remains the same across RU↔EN;
- semantic presentationId remains the same;
- routeId remains the same;
- Save and global/Activity RNG remain unchanged.

Old-boundary fallback also remains locale-neutral.

## Animation coverage

Current real project-owned production GIFs:
`0`.

Current root GIF candidate pools:
`0`.

Static coverage counts above must not be confused with animation coverage.

## Current safe next extension

Reviewed Chat2 Old Boundary v3 can become the next route-specific project-owned static source.

If selectively activated successfully:
- active semantic mappings would become 82;
- unique active physical sources would become 81;
- route-specific physical coverage would become 2/2.

Those are future counts only and must not be claimed until actual merge + main CI.

## Verdict

Current post-PR59 project-owned static state:

- established baseline target: `80/80`;
- active project-owned semantic mappings: `81`;
- unique active physical sources: `80`;
- neutral Forest route/default: shipped;
- logging-road specific static: shipped;
- old-boundary specific static: not shipped, neutral fallback;
- production GIF pools: 0.
