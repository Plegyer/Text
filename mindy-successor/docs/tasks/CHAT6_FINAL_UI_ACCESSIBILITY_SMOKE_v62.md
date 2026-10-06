# Chat 6 — Final UI / Accessibility Smoke v62

Status: **BUNDLE_COMPLETE — READY_FOR_FINAL_UI_ACCESSIBILITY_SMOKE_EXECUTION**  
Owner: Chat 6  
Date: 2026-10-06

## Paths

Matrix:  
`mindy-successor/prior-work/astra/prototype-m3.2/tests/fixtures/final-ui-accessibility-smoke-v60.json`

Validator:  
`mindy-successor/prior-work/astra/prototype-m3.2/tests/final-ui-accessibility-smoke-v61.test.ts`

Human notes: v60 matrix note, v61 validator note, and this v62 handoff.

The accepted v54 golden fixture is carried into this QA branch byte-identically so the focused smoke harness is self-contained.

## Checks actually run

GitHub-connector-backed JavaScript assertions against frozen authorities: **PASS**.

Verified before commit:

- unique required smoke surfaces;
- Strong Meta selector/capacity/automatic-knowledge contract represented;
- 11/11 localized modal accessible names;
- D42 exactly 110 localization + 12 presentation targets;
- Activity Network uses v36 final and not v17 predecessor;
- Palace matrix contains invitation/progression/confrontation and all four live explicit ending IDs;
- D48 exactly 4 assets / 17 approved Palace slots and neutral invitation slots excluded;
- retired Tavern/lumber historical-only fences included.

No npm/Node process execution and no full CI are claimed.

## Future commands

From `mindy-successor/prior-work/astra/prototype-m3.2`:

`node --experimental-strip-types --test tests/final-ui-accessibility-smoke-v61.test.ts`

On the future fully assembled release target only:

`FINAL_UI_ACCESSIBILITY_SMOKE_TARGET=1 node --experimental-strip-types --test tests/final-ui-accessibility-smoke-v61.test.ts tests/final-player-facing-golden-manifest-v55.test.ts`

Then execute the matrix `postIntegrationRenderedChecks` in both RU and EN on the actually mounted UI.

## Remaining post-integration requirements

Static/source assertions do not by themselves prove DOM focus behavior, runtime ARIA assignment, rendered image alt/caption behavior, or visual historical-vs-live distinction. Final closure must exercise those rendered states on the assembled target.

## STOP conditions

STOP if required copy is missing/non-bilingual; accepted human-readable surfaces leak raw IDs; raw panel ARIA returns; Source Method becomes selectable; D48 is missing/leaks outside 17 Palace slots; retired live Tavern/lumber surfaces return; Activity v17 wording returns; Palace Return Home loses explicit copy/card or any Palace ending disappears; or rendered RU/EN disagrees with the frozen matrix.

No production runtime/mechanics/content mutation. Main not merged.

`BUNDLE_COMPLETE — READY_FOR_FINAL_UI_ACCESSIBILITY_SMOKE_EXECUTION`
