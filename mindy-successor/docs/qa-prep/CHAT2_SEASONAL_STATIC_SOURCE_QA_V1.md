# Chat2 seasonal static source QA v1

Status: COMPLETE / GREEN_SELECTIVE_SOURCE

Reviewed Chat 2 items:
`196–207`
on `chat2/presentation-replacement-next`.

## Actual asset inventory

Seasonal manifest:
`project-owned-seasonal-static-media-v1.json`
blob `f246ab64a257318d23b3797402fabdbe1d6bed66`.

Verified:
- 40 manifest asset records;
- 40 unique presentation IDs;
- 40 unique source paths;
- 10 ordinary careers;
- four seasons per career;
- 40 actual SVG files present in Git;
- 40 distinct Git blob SHAs.

Careers:
- Lumber;
- Satyr Maid;
- Undead Farm;
- Tavern;
- Hunter;
- Guard;
- Merchant;
- Artist/Geisha;
- Assassin;
- Prostitute.

Every career has:
- spring;
- summer;
- autumn;
- winter.

## Exact semantic identity

Each asset maps to the already-current form:
`job/<career>/shift/<season>/default`.

No new action or scene identity is created.

Hunter entries are only:
`job/hunter/shift/<season>/default`.

No Hunter Forest route, Old Boundary, token, clue or expedition identity appears in the seasonal manifest.

## Accessibility

Seasonal localization fixture:
blob `5a2916243e67c531940fe5c65043819e92afb6de`.

Verified:
- 80 strings;
- 40 alt;
- 40 caption;
- missing RU: 0;
- missing EN: 0;
- no locale-specific asset duplication.

## Gameplay isolation

Manifest scan contains no gameplay-owned fields:
- conditions;
- effects;
- rewards;
- RNG;
- Save state.

Items 196–207 do not edit shared runtime/schema/UI.

Prostitute visuals/copy remain non-explicit.
Assassin assets remain presentation-only.

## Build regression

Item 204 validates:
- file existence;
- SVG sanity;
- 1200×675 viewBox;
- current semantic IDs;
- RU+EN coverage;
- local-only paths;
- byte-preserving build copy to `dist/assets/presentation/`;
- no same-career byte-identical season set.

Worker test evidence is source evidence only; exact integration-head CI is still required.

## 50/50 career static claim

Within the worker source set:
- 10 result/default identities have project-owned SVGs from items 185–186;
- 40 seasonal shift identities have project-owned SVGs from items 197–201.

Thus the prepared ordinary-career static source is:
`50 / 50`
for result + four seasonal shifts across ten careers.

This is worker-source readiness, not current-main activation.

## Verdict

`GREEN_SELECTIVE_SOURCE`.

The 40 seasonal assets are real, one-to-one, current-ID static sources with complete RU+EN accessibility.

Do not merge the worker branch wholesale. Integrate from fresh main and require exact-head CI.
