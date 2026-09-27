# PR48 seasonal static exact-head audit v1

Status: COMPLETE / GREEN_EXACT_HEAD

PR:
- #48 `Lead: activate seasonal project-owned career media`
- base: `7f27caca4e3e711799e9c1f235c4a27adbf31026`
- accepted exact head: `9a3789536b05717a77e576ac79d96eb2cc4f8319`

## Scope

PR48 selectively adds:
- 40 project-owned seasonal SVGs;
- 40 existing current seasonal presentation slots;
- 80 RU+EN seasonal alt/caption strings;
- one production regression test.

No runtime/schema/UI architecture file is changed.
No gameplay pack, engine, Save schema or RNG implementation is changed.

## Exact 40/40 semantic mapping

Verified on exact head:
- seasonal static slots: 40;
- unique physical seasonal sources: 40;
- expected current semantic IDs: 40;
- missing expected slot: 0;
- source mismatch: 0;
- altKey mismatch: 0.

Semantic identity form:
`job/<career>/shift/<spring|summer|autumn|winter>/default`.

Careers:
- lumber;
- satyr-maid;
- undead-farm;
- tavern;
- hunter;
- guard;
- merchant;
- artist-geisha;
- assassin;
- prostitute.

## Physical assets

Exact head contains 40 seasonal SVG files under:
`assets/presentation/`.

Verified worker/PR source properties:
- 40 unique files;
- 40 unique Git blobs;
- project-owned local SVG paths;
- no remote media dependency;
- no locale-specific asset path.

## RU+EN accessibility

Exact-head root localization contains all:
- 40 seasonal alt keys;
- 40 seasonal caption keys.

Total:
`80` keys.

Missing RU:
`0`.

Missing EN:
`0`.

Root localization total on exact head:
`347` keys.

## Production regression

Test:
`tests/seasonal-static-media-production.test.ts`.

It verifies all 40 rows:
- semantic slot exists;
- exact static source;
- exact altKey;
- RU+EN alt/caption coverage;
- source and dist copy exist;
- build copy is byte-identical;
- animations on/off resolve the same seasonal static source;
- presentation IDs and asset paths remain locale-neutral;
- no gameplay field is present in the seasonal patch model.

## No gameplay drift

PR48 does not change:
- action IDs;
- career counters;
- wages;
- Energy costs;
- action results;
- conditions/effects/rewards;
- gameplay RNG;
- Save state;
- Forest routes;
- School mechanics;
- poverty mechanics;
- relationship mechanics.

Hunter seasonal art remains ordinary `hunter.shift` presentation only.

## Exact-head CI

Workflow:
- `mindy-successor check`
- run #76
- id `36344721303`
- conclusion: SUCCESS

Validator:
- 17 packs;
- 46 events;
- 35 actions;
- 9 endings.

Tests:
- 314 total;
- 314 pass;
- 0 fail.

Relevant exact-head tests PASS:
- `all 40 ordinary-career seasonal semantic slots use project-owned static SVGs`;
- `seasonal static selection remains deterministic and animation-mode independent`;
- `seasonal static production patch is presentation-only and locale-neutral`;
- `renderer: project-owned static fallback keeps asset identity across RU EN locale switch`.

## Verdict

`GREEN_EXACT_HEAD`.

PR48 exact head is accepted as a presentation-only seasonal static activation.
