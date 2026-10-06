# Chat 6 — Final UI / Accessibility Smoke Validator v61

Status: **COMPLETE — TEST-ONLY HARNESS AUTHORED**  
Owner: Chat 6  
Date: 2026-10-06

Harness:

`mindy-successor/prior-work/astra/prototype-m3.2/tests/final-ui-accessibility-smoke-v61.test.ts`

The always-on test validates matrix identity, unique surfaces, RU/EN completeness, golden equality where frozen, 11 modal names, D42 110/12 preservation, D48 4/17 inventory, and Activity v36 authority.

The strict assembled-target smoke is enabled only with `FINAL_UI_ACCESSIBILITY_SMOKE_TARGET=1`. It detects missing RU/EN copy, raw visible IDs, modal ARIA regressions, selectable automatic knowledge, missing/mismatched alt/caption/presentation, D48 leakage, retired live-surface return, Activity v17 wording return, and Palace explicit-ending/Return Home regression.

Connector-backed structure assertions passed while building the matrix. No Node/npm run and no full CI are claimed from this connector-only lane.

**v61 COMPLETE**
