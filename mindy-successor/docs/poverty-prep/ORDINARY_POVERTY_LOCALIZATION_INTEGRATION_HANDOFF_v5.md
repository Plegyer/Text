# Ordinary Poverty Localization Integration Handoff v5

Status: selective-integration handoff for ordinary-poverty localization items 136–145.

Worker branch: `chat3/lumber-production-proof-next`.

Do not merge this long-lived branch wholesale. Copy reviewed files onto a fresh branch from current `main`.

## Current shipped gameplay baseline

Ordinary-poverty gameplay from PR #37 is already shipped on `main`.

Production packs in scope:
- `poverty-street-production.json`;
- `poverty-street-production-v2.json`;
- `poverty-cheap-production.json`;
- `poverty-cheap-production-v2.json`;
- `poverty-recovery-production.json`;
- `poverty-pressure-production.json`.

Scope is ordinary poverty only. Secret Debt remains a separate system.

## Exact localization delta

Primary integration artifact:

`prior-work/astra/prototype-m3.2/content/poverty-localization-main-delta-v1.fixture.json`

It contains:
- 82 event presentation keys from the six shipped PR37 packs;
- 2 existing media alt keys:
  - `media.stage.outside.alt`;
  - `media.stage.room.alt`;
- 84 total localization entries;
- RU + EN for every included key;
- empty explicit `fallbackDebt`;
- no conditions/effects/rewards/gameplay data;
- no Secret Debt identity.

Lead merge target:
`content/localization.json`.

Merge only `delta.strings` after collision review. Preserve existing `version: 1` and `defaultLocale: "ru"`.

## Exact event-key map

`prior-work/astra/prototype-m3.2/content/poverty-event-localization-key-map-v1.fixture.json`

Maps the 14 shipped event IDs, 20 variant IDs, 24 choice IDs and two current media IDs to the Lead runtime conventions:

- `event.<eventId>.title`;
- `event.<eventId>.variant.<variantId>.text`;
- `event.<eventId>.choice.<choiceId>.label`;
- `event.<eventId>.choice.<choiceId>.text`;
- `media.<mediaId>.alt`.

No new gameplay IDs are introduced.

## Tests and smoke

Contract test:

`prior-work/astra/prototype-m3.2/tests/poverty-localization-main-delta-v1.test.ts`

It checks current shipped identities, RU+EN completeness, locale-neutral uniqueness, presentation-only content, current fallback media IDs, explicit fallback debt, and Secret Debt exclusion.

Natural-path smoke specification:

`docs/poverty-prep/POVERTY_LOCALIZATION_NATURAL_PATH_REGRESSION_v1.md`

Required flow:
day action -> EndDay -> street/cheap lodging -> ordinary-poverty event -> RU presentation -> switch EN -> same pending gameplay identity/state -> resolve -> reload -> exactly-once mechanics/history.

## Authored UI copy

`docs/poverty-prep/ORDINARY_POVERTY_UI_COPY_RU_EN_v1.md`

Contains polished RU-source + EN copy for:
- street lodging context;
- cheap lodging context;
- helpful/recovery reactions;
- neutral reactions;
- pressure/bad-luck reactions;
- reusable return/continue wording.

It is authoring guidance. Existing PR37 event IDs and mechanics remain authoritative.

## Multi-GIF staging

`prior-work/astra/prototype-m3.2/content/presentation-drafts/ordinary-poverty-multigif-staging-v1.json`

This is PR42-shape staging only.

It contains representative 3-candidate pools for shipped ordinary-poverty semantic presentation IDs, with:
- locale-neutral candidate keys;
- real existing static fallbacks `assets/stage-outside.svg` / `assets/stage-room.svg`;
- RU/EN alt localization-key references;
- placeholder GIF paths explicitly marked staging-only.

Do **not** load this patch into production as-is. The `assets/staging/*.gif` files are not shipped art.

PR42 multi-GIF runtime is already shipped, but real ordinary-poverty GIF assets are still missing.

Current UI also localizes catalog-media alt via `media.<mediaId>.alt`. Pool candidates expose `candidateKey`, not a catalog `mediaId`; therefore candidate-alt localization still needs Lead-owned presentation/UI wiring if candidate-specific localized alt is required.

## Selective integration order

1. Copy/review `poverty-localization-main-delta-v1.fixture.json`.
2. Merge its `delta.strings` into current-main `content/localization.json`.
3. Copy `poverty-localization-main-delta-v1.test.ts` and run it against current-main content.
4. Copy/use `poverty-event-localization-key-map-v1.fixture.json` as the exact identity map.
5. Execute the natural-path smoke from `POVERTY_LOCALIZATION_NATURAL_PATH_REGRESSION_v1.md`.
6. Keep `ORDINARY_POVERTY_UI_COPY_RU_EN_v1.md` as content authority for any UI copy follow-up.
7. Keep `ordinary-poverty-multigif-staging-v1.json` staging-only until real GIF assets exist and candidate-alt localization is wired.
8. Run current-main targeted poverty tests, `npm run check`, and exact-head CI.

## Remaining untranslated shipped poverty surfaces

The bounded PR37 event delta is complete, but shared Night/lodging UI still contains player-facing text outside the PR37 event packs.

Observed current-main gaps include:
- lodging labels from `definitions.json` rendered directly, including `Cheap lodging` and `Street / no lodging`;
- hardcoded Night/lodging headings and explanatory copy in the UI;
- housing/rent presentation that is not uniformly routed through ordinary-poverty-specific localization keys.

These are shared UI/localization surfaces, not Chat 3 gameplay-content ownership. They should be localized by Lead/Chat 1 without changing lodging IDs, prices, housing tiers, NightFlow, or save state.

The two current generic poverty fallback media alts are covered by the item-140 delta.

## Mechanics firewall

Localization integration must not change:
- lodging costs;
- housing tiers;
- street next-day penalties;
- money/item rewards;
- next-day modifiers;
- seasonal/day conditions;
- NightFlow ordering;
- event priority/cooldown/maxShows;
- RNG;
- event history;
- save schema/state.

Ordinary poverty remains independently playable with Secret Debt absent.

## Integration conclusion

The shipped PR37 ordinary-poverty event slice has a complete 84-key RU+EN localization delta, exact identity map, contract test, natural-path regression plan, UI copy bank, and multi-GIF staging plan. Remaining work is selective current-main localization/UI integration plus real media production, not a gameplay redesign.
