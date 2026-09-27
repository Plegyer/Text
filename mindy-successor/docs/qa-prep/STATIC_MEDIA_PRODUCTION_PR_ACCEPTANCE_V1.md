# Static media production PR acceptance v1

Status: COMPLETE / GREEN_EXACT_HEAD / GREEN_POST_MERGE_MAIN

PR:
- #47 `Lead: activate project-owned static presentation media`
- base: `1af3104c1e4c180019b965adac8e87e67de89347`
- accepted exact head: `8f7e5ae18d56542c21e777dfafcce050784c12fa`
- merged as: `7f27caca4e3e711799e9c1f235c4a27adbf31026`

## Scope acceptance

PR47 selectively integrates:
- 21 project-owned SVG assets;
- 39 existing current semantic static slot mappings;
- 42 RU+EN accessibility strings;
- optional presentation `altKey`;
- renderer localization of altKey;
- build/schema/runtime/UI regressions.

It does not merge the Chat 2 worker branch wholesale.

## Exact-head CI

Workflow:
- run #73
- id `36344188520`
- conclusion: SUCCESS
- validator: 17 packs, 46 events, 35 actions, 9 endings
- tests: 311
- pass: 311
- fail: 0

Relevant exact-head tests PASS:
- `project-owned static slots use current semantic IDs and bilingual alt keys`;
- `project-owned static resolution does not depend on animation mode`;
- `optional altKey preserves old overrides and deterministic GIF selection`;
- `renderer: project-owned static fallback keeps asset identity across RU EN locale switch`.

## Schema compatibility

Optional altKey is backward-compatible:
- legacy slot override without altKey still parses;
- legacy root media override shape remains unchanged;
- GIF deterministic candidate selection is unchanged;
- altKey is not a Save field or gameplay RNG input.

## Build/distribution

Every project-owned source:
`assets/presentation/*.svg`

is required by the regression to exist in:
`dist/assets/presentation/*.svg`

with byte-identical content.

Exact-head CI passes that regression.

## RU↔EN runtime invariance

The browser regression uses the real Guard result surface.

It verifies:
- RU static source is `career-guard-result.svg`;
- RU alt is localized;
- serialized gameplay Save is captured;
- RU -> EN does not change that Save;
- EN image src is exactly the same source;
- EN alt changes to the expected English text.

Thus locale changes accessibility text, not selected asset identity or gameplay state.

## Current semantic mapping

Exact-head data contains:
- 39 project-owned static slots;
- 21 unique physical sources;
- all mapped IDs are current production presentation slots;
- no Product-open route/teacher/Secret Debt IDs are activated.

## Post-merge main

Merge SHA:
`7f27caca4e3e711799e9c1f235c4a27adbf31026`.

Main push workflow:
- run #74
- id `36344297121`
- conclusion: SUCCESS
- validator: 17 packs, 46 events, 35 actions, 9 endings
- tests: 311
- pass: 311
- fail: 0

The same static-media tests, including the RU↔EN renderer invariance test, pass on merged main.

## Current main asset state

On merge main:
- physical project-owned assets: 21;
- root static mappings: 39;
- unique mapped sources: 21;
- authoritative localization keys: 267;
- missing RU/EN among the 21 static altKeys: 0.

## Gameplay drift

No gameplay pack/definitions/engine/Save schema change is part of PR47.

Validator gameplay counts remain unchanged.

## Verdict

`GREEN_EXACT_HEAD` and `GREEN_POST_MERGE_MAIN`.

PR47 project-owned static media activation is production-accepted.
