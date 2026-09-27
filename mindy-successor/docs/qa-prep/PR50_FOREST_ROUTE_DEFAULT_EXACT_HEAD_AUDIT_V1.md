# PR50 Forest route/default exact-head audit v1

Status: COMPLETE / GREEN_EXACT_HEAD

PR:
- #50 `Lead: add neutral Forest route/default static fallback`
- base: `d383a2282a15eb4ebc1bbb2fef2bbf9f3f2087fe`
- accepted exact head: `12aa6fa4a35fdb3e6f15edd13936f0757e394b93`

## Exact scope

PR50 adds one project-owned local SVG:
`assets/presentation/forest-route-default-v1.svg`.

Git blob:
`2405ace23316410db74a82daeb25aacbaf8580fd`.

The root presentation binding is exactly the existing current semantic ID:
`activity/forest/route/default`.

No route-specific semantic slot is added.

Absent on exact head:
- `activity/forest/route/logging-road`;
- `activity/forest/route/old-boundary`.

## Neutral visual semantics

The SVG contains:
- a generic forest path;
- vegetation/trees;
- a traveler;
- no explicit logging-road marker;
- no Old Boundary marker;
- no Hunter marker;
- no token;
- no challenge/result/reward depiction.

The root slot safety regression explicitly rejects route-specific/Hunter/token/challenge terms in the configured slot payload.

## RU+EN accessibility

Exact root keys:
- `presentation.static.forest.route.default.alt`;
- `presentation.static.forest.route.default.caption`.

Both contain non-empty RU and EN.

The alt explicitly states that the scene is neutral and does not indicate a specific route or outcome.

The physical SVG path is locale-neutral.

## Presentation-only change

PR diff changes only:
- one SVG asset;
- `content/presentation.json`;
- `content/localization.json`;
- presentation regression;
- UI regression.

No change to:
- gameplay definitions;
- gameplay packs;
- engine;
- Save schema;
- presentation schema/runtime implementation;
- route availability;
- Activity mechanics;
- Forest results;
- Lumber Hard Work.

## Exact-head regression

`forest-route-default-static-production.test.ts` verifies:
- exact semantic slot;
- exact project-owned source;
- exact altKey;
- RU+EN alt/caption;
- source/dist file presence;
- byte-identical build copy;
- animations-on/off resolve the same static source;
- presentation config does not mutate the catalog;
- no route-specific/Hunter/token/challenge semantic leak.

UI regression:
`renderer: neutral Forest route static fallback preserves save across RU EN`.

It enters `lumber.forest` through the natural Explore UI, confirms:
- generic route/default static SVG is shown;
- Activity ID is `lumber.forest`;
- route state is still null before route choice;
- serialized Save is byte-identical across RU -> EN;
- physical image src is unchanged;
- only localized alt changes;
- full Activity envelope remains deep-equal.

Byte-identical Save equality also protects the stored gameplay RNG state.

## Exact-head CI

Workflow:
- `mindy-successor check`
- run #81
- id `36346301697`
- conclusion: SUCCESS

Validator:
- 17 packs;
- 46 events;
- 35 actions;
- 9 endings.

Tests:
- 320 total;
- 320 pass;
- 0 fail.

Relevant tests PASS:
- `neutral Forest route/default uses one project-owned locale-neutral static fallback`;
- `route/default static fallback is presentation-only and deterministic`;
- `renderer: neutral Forest route static fallback preserves save across RU EN`.

## Verdict

`GREEN_EXACT_HEAD`.

PR50 exact head is a presentation-only activation of the existing generic Forest route/default semantic slot.
