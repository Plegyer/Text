# Post-PR56 visible-shell bilingual QA v1

Status: COMPLETE / GREEN_CORE_PATHS / TARGETED_E2E_GAP_FOR_ERROR_BRANCHES

Current main:
`4223be1f90f15a43938e072bc2171b0de5d2d1aa`.

Current app blob:
`505ab4fbe0467067eba2748aa9ef01fbbab99b6e`.

Current root localization:
`630` keys, all non-empty RU+EN.

## Creation natural path

Production browser regression starts on the real creation screen.

RU verifies:
- localized creation title;
- localized heroine heading.

The test opens the real menu, switches RU -> EN, then verifies:
- EN creation title;
- EN heroine heading;
- gameplay Save byte string unchanged.

Creation commands/stat allocation mechanics are not changed by localization.

Classification:
`GREEN_EXECUTABLE`.

## Menu natural path

The same browser smoke opens the current menu through:
`data-panel="menu"`.

RU verifies current localized:
- export-save control;
- restart/new-heroine control.

After RU -> EN:
- same panel/control path;
- EN text;
- gameplay Save unchanged.

PR56 also wires import/editor/animation/footer and confirmation wrappers through stable `ui.*` keys.

Classification:
`GREEN_EXECUTABLE_FOR_PRIMARY_MENU / SOURCE_WIRED_FOR_SECONDARY_CONTROLS`.

## Season HUD

The creation/menu/season smoke verifies the same current calendar state renders:
- RU `Весна`;
- EN `Spring`
after locale switch.

The Save is unchanged.

Season localization uses stable:
`season.<id>.label`
and does not change the stored day/calendar state.

Classification:
`GREEN_EXECUTABLE`.

## Activity shell

The dedicated Activity smoke:
1. enters Explore;
2. enters `lumber.forest`;
3. snapshots gameplay Save;
4. verifies RU Activity eyebrow/progress/endurance/checkpoint;
5. switches to EN;
6. verifies EN labels;
7. requires the same gameplay Save.

Current Activity ID, checkpoint, route state, progress, endurance and available actions remain gameplay-owned.

Endurance reuses:
`stat.endurance.label`.

Classification:
`GREEN_EXECUTABLE`.

## Save/import/recovery/startup messages

PR56 wires stable keys for:
- file too large;
- load confirmation;
- save loaded;
- import failure;
- backup restored;
- no healthy backup;
- load stopped;
- presentation saved/custom load failed;
- catalog load failed;
- startup failed.

These consumers are presentation/status wrappers around the existing save/recovery flow.

Current full CI retains broad save/import/migration/recovery compatibility coverage.

However PR56 adds no dedicated browser RU↔EN natural-path smoke that deliberately forces every individual error/recovery branch.

Classification:
`GREEN_SOURCE_AND_CONSUMER / TARGETED_E2E_GAP`.

Acceptance rule:
triggering the same error/recovery state in RU and EN must preserve the same parser/storage outcome; only rendered wrapper text changes.

## Condition explanations

PR56 localizes condition grammar/state words for current typed conditions:
- item capability;
- calendar;
- housing;
- career/quest/relationship;
- world facts;
- Meta/Hard Work;
- visits;
- flags;
- not/all/any.

The underlying `Condition` object remains exact and is still evaluated by gameplay code.

Current suite retains typed-condition and composition tests, including `all/any/not conditions still compose`.

No dedicated browser test exhaustively renders every condition kind in both locales.

Classification:
`GREEN_TYPED_MECHANICS / PRESENTATION_WIRED / EXHAUSTIVE_UI_MATRIX_GAP`.

## RU+EN parity

The 108-key PR56 production fixture has:
- missing RU: 0;
- missing EN: 0.

No locale-specific gameplay key/ID is introduced.

## Save/RNG rule

For all shell presentation:
- locale changes text only;
- gameplay Save must not be rewritten due to translation;
- condition eligibility must remain identical;
- no RNG draw may occur due to text lookup.

Executable creation/menu/season and Activity smokes prove the Save rule on their natural paths.

## Verdict

`GREEN_CORE_PATHS`.

Creation, menu, season HUD and Activity shell have direct executable RU↔EN Save-invariance coverage.

Save/recovery/error branches and the full condition-kind presentation matrix are correctly wired and CI-green, but remain candidates for additional targeted bilingual browser smokes.
