# Chat 6 — Modal ARIA Name Closure v43

Date: 2026-10-06
Branch: `chat6/strong-meta-ui-closure-v42`
Implementation head before documentation: `fac645878ebd726f50fd1364ac72414796755a2d`

## Scope

This closes the remaining generic modal accessibility P1 from the v39 audit. It does not alter modal routing, panel mechanics, gameplay, save data, or the known non-blocking player-facing copy findings outside this task.

## Change

The generic overlay in `src/ui/app.ts` no longer exposes `aria-label="${panel}"`. It now resolves the dialog accessible name through `panelAccessibleName(panel)`.

For normal panels, the resolver uses the same localized heading namespaces already used by the visible panel content: Work, School, Outskirts, Night, Heroine, Journal, Bag, Fates, and Menu. Editor uses the existing localized menu label. Catalog uses the new RU/EN `ui.menu.catalogInspector` row so its dialog is announced as `Инспектор событий` / `Event inspector` rather than `catalog`.

The unknown-panel fallback is a localized generic `Раздел` / `Panel`; it never echoes an internal route id. This keeps raw implementation identifiers out of normal ARIA output even if a future panel reaches the generic overlay before receiving a dedicated mapping.

## Localization

Added only the v43 accessibility row `ui.menu.catalogInspector` in RU/EN. Existing localized panel/title rows are reused rather than duplicated.

This change intentionally does not reopen the v39-v41 copy audit or repair unrelated visible strings. In particular, it does not use v43 as a vehicle to repeat the old content-only localization package.

## Focused coverage

Added `tests/modal-aria-localization-v43.test.ts`. It opens the standard modal panels in RU and EN and verifies that every dialog has a non-empty localized accessible name that is not the raw panel id. It also covers the nested editor and catalog routes, including `Инспектор событий` / `Event inspector`.

`tests/strong-meta-ui-localization-v42-v43.test.ts` adds source-level regression assertions that the generic dialog binds to `panelAccessibleName(panel)` and that the old raw `aria-label="${panel}"` binding is absent.

## Result

v43 implementation is complete on the branch. Modal mechanics and gameplay behavior are unchanged; only the generic dialog naming layer and its focused localization/test coverage changed.
