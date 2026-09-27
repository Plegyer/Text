# PR34 Starter-Career Presentation Coverage v1

Evidence:
- PR #34 merge: `712ab6c7368ab21906f3fcb0184b35d4f3e1411c`;
- current main checked after merge: `22772b1439c247d67fdd20c4e3fd55cc2eba4e20`;
- exact-head PR34 CI recorded by coordination: **227/227 PASS**.

## Production action IDs

PR34 adds:
- `satyr-maid.shift`
- `undead-farm.shift`

The current presentation resolver already recognizes both career roots as job domains.

Therefore target action semantic roots are:

`job/satyr-maid/*`

and

`job/undead-farm/*`.

## Seasonal Satyr Maid slots

PR34 action scenes:
- `spring.default` -> `stage.tavern.spring`
- `summer.default` -> `stage.tavern.summer`
- `autumn.default` -> `stage.tavern.autumn`
- `winter.default` -> `stage.tavern.winter`

Generated semantic shift slots:
- `job/satyr-maid/shift/spring/default`
- `job/satyr-maid/shift/summer/default`
- `job/satyr-maid/shift/autumn/default`
- `job/satyr-maid/shift/winter/default`

Stable result slot:
- `job/satyr-maid/result/default`

PR34 tests explicitly assert this seasonal slot set and the stable result identity.

## Seasonal Undead Farm slots

PR34 action scenes:
- `spring.default` -> `stage.hunt.spring`
- `summer.default` -> `stage.hunt.summer`
- `autumn.default` -> `stage.hunt.autumn`
- `winter.default` -> `stage.hunt.winter`

Generated semantic shift slots:
- `job/undead-farm/shift/spring/default`
- `job/undead-farm/shift/summer/default`
- `job/undead-farm/shift/autumn/default`
- `job/undead-farm/shift/winter/default`

Stable result slot:
- `job/undead-farm/result/default`

PR34 tests explicitly assert this seasonal slot set and the stable result identity.

## Result/default stability across seasons

For both careers, the resolver treats target-shaped `<career>.shift` actions specially:

season-specific scene presentation:
`job/<career>/shift/<season>/default`

while action result identity remains:
`job/<career>/result/default`.

PR34 test evidence confirms each seasonal dispatch still records the same career result `presentationId`.

This is intentional:
- season controls visible shift scene/media;
- the committed work result keeps one stable semantic identity.

## Reused base media does not merge semantic identity

Satyr Maid currently uses:
- `stage.tavern.spring`
- `stage.tavern.summer`
- `stage.tavern.autumn`
- `stage.tavern.winter`

All currently point to:
`assets/stage-tavern.svg`.

Undead Farm currently uses:
- `stage.hunt.spring`
- `stage.hunt.summer`
- `stage.hunt.autumn`
- `stage.hunt.winter`

All currently point to:
`assets/stage-forest.svg`.

Despite reuse:
- Satyr Maid semantic IDs remain `job/satyr-maid/...`;
- Undead Farm semantic IDs remain `job/undead-farm/...`;
- Forest/Hunt media IDs do not turn Undead Farm into an Activity/Hunter gameplay identity;
- Tavern media IDs do not turn Satyr Maid into the legacy Tavern action identity.

Media source and semantic identity are separate.

## Future GIF replacement

Later GIF replacement can target any seasonal slot independently:

`job/satyr-maid/shift/<season>/default`

`job/undead-farm/shift/<season>/default`

while preserving:
- gameplay action ID;
- typed career progression;
- seasonal mechanics;
- result/default identity;
- save/reload behavior.

No gameplay code needs to change merely because the media candidate changes.

## Functional merge needs no new media asset

PR34 shipped using already-existing static assets:
- Satyr Maid -> `assets/stage-tavern.svg`;
- Undead Farm -> `assets/stage-forest.svg`.

Therefore:
- no new GIF is required for functional merge;
- no new static asset is required for functional merge;
- animation-off remains inherently safe for these slots;
- media production is now optional enhancement on top of shipped semantic coverage.

## What PR34 intentionally does not add

PR34 does not add:
- guessed Satyr Maid Hard Work ending;
- guessed Undead Farm Hard Work ending;
- final NPC/relationship scenes;
- final Night scenes;
- final anomaly/research/Activity continuation scenes.

Presentation must not infer those identities from career design drafts.

## Conclusion

PR34 expands production semantic presentation coverage by exactly ten starter-career slots:

Satyr Maid:
- 4 seasonal shifts;
- 1 result/default.

Undead Farm:
- 4 seasonal shifts;
- 1 result/default.

They are safe for later media replacement with no gameplay changes and no new asset requirement for functional correctness.
