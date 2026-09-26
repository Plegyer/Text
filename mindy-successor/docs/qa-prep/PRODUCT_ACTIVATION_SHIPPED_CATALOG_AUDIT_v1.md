# Product Activation — Shipped Catalog Audit v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Branch: `chat4/product-activation-qa-next`  
Audit HEAD baseline: `f3c8a73ebdce4be06ef4b2af49625c67bc1ae1df`  
Production baseline: current main after merged PR #19

## Executive result

The merged Phase B / Product Acceptance fixtures are **not activated in the shipped catalog**.

Current build and validation both use a non-recursive top-level pack scan:

`readdir('content/packs').filter(f => f.endsWith('.json'))`

and therefore load only the four top-level files:

- `content/packs/base.json`
- `content/packs/ds-lumber.json`
- `content/packs/gopher.json`
- `content/packs/stage.json`

The nested directories:

- `content/packs/lumber-target/`
- `content/packs/school-target/`

are not traversed by either build or validation.

The merged target definitions also remain isolated:

- `content/lumber-target-definitions.fixture.json`
- `content/school-target-definitions.fixture.json`

while production build/validation continue to load only:

- `content/definitions.json`

As a result, the current shipped UI still exposes the legacy M3.2 action/endings surface, not the target Product Acceptance Lumber/School/Forest/ending surface.

## 1. What `scripts/build.mjs` actually ships

The current production build performs:

1. `readdir('content/packs')`;
2. filters only entries whose names end in `.json`;
3. loads each selected file with `readFile('content/packs/'+f)`;
4. writes `dist/content.json` with:
   - `presentation` = `content/presentation.json`;
   - `definitions` = `content/definitions.json`;
   - `packs` = only those top-level JSON files.

The scan is not recursive and does not check directory children.

### Current shipped pack set

**SHIPPED:**
- `base.json`
- `ds-lumber.json`
- `gopher.json`
- `stage.json`

**NOT SHIPPED:**
- `lumber-target/lumber-production.pack.json`
- `lumber-target/lumber-cross-system.pack.json`
- `lumber-target/lumber-night-acceptance.pack.json`
- `school-target/school-production.pack.json`

### Responsible activation seam

Exact responsible file:

`prior-work/astra/prototype-m3.2/scripts/build.mjs`

Exact operation:

`readdir('content/packs').filter(f=>f.endsWith('.json'))`

No content threshold or product rule needs to be invented to describe the seam: the current build simply never discovers nested target packs.

## 2. What `scripts/validate.ts` actually validates

Validation uses the same top-level-only pattern:

`readdirSync('content/packs').filter(f=>f.endsWith('.json')).sort()`

It then calls:

`loadCatalog(content/definitions.json, topLevelPacks)`

and applies:

`content/presentation.json`

Therefore validation and shipping are aligned with each other, but aligned around the **legacy top-level catalog**, not around the target Product Acceptance fixtures.

The merged PR #19 record states a successful merge-ref check of 186/186. That result proves the repository tests/fixtures were green at merge time; it does **not** mean nested target packs were activated in production build output.

### Responsible activation seam

Exact responsible file:

`prior-work/astra/prototype-m3.2/scripts/validate.ts`

Exact API boundary:

`loadCatalog(definitions, files.map(...content/packs/<top-level-json>...))`

A future activation change must keep build and validation discovery rules consistent; otherwise validation could pass a different catalog than the one written to `dist/content.json`.

## 3. Target definitions are not production definitions

Current production `content/definitions.json` contains:

- 25 legacy actions;
- 6 legacy endings;
- no target careers;
- no target relationships;
- no target lodgings;
- no target night choices;
- no target Activities.

Its action IDs include legacy entries such as:

- `lumber`
- `school`
- `combat-class`
- `etiquette-class`
- `magic-class`
- `salon-lesson`
- `forest-search`

It does **not** contain target definitions such as:

- action `lumber.shift`;
- career `lumber`;
- relationship `lumber.foreman`;
- lodging `lumber.normal-room`;
- night choice `lumber.foreman.night`;
- Activity `lumber.forest`;
- target endings `ending.lumber.hard-work`, `ending.lumber.forewoman`, `ending.lumber.forest`.

Those target definitions live in `content/lumber-target-definitions.fixture.json`, which neither `build.mjs` nor `validate.ts` reads.

PR #19 School course data is implemented through `src/core/school.ts` and isolated School fixture files, not through the production `definitions.json` action list.

### Responsible activation seam

Exact production data file:

`prior-work/astra/prototype-m3.2/content/definitions.json`

Exact build/validation consumers:

- `scripts/build.mjs`
- `scripts/validate.ts`

The activation problem is not lack of fixture definitions; it is that production catalog construction does not consume them.

## 4. Are nested Lumber target packs shipped?

**No.**

The nested directory contains the target content prepared by PR #19, including:

- `lumber-production.pack.json`
- `lumber-cross-system.pack.json`
- `lumber-night-acceptance.pack.json`

But top-level `readdir(...).filter(endsWith('.json'))` sees the directory name `lumber-target`, not the JSON files inside it, and filters the directory out.

Consequences in shipped catalog:

- no `lumber.career-first-shift`;
- no `lumber.foreman-notice`;
- no `lumber-cross.school-management-return`;
- no `lumber-cross.activity-forest-return`;
- no `lumber-night.foreman-professional`.

## 5. Are nested School target packs shipped?

**No.**

`content/packs/school-target/school-production.pack.json` is likewise excluded by the non-recursive pack scan.

PR #19’s School engine adapter `executeSchoolLesson(...)` exists in source and is directly tested, but production catalog construction does not expose those eight courses as normal player-facing catalog actions.

Consequences:

- `school-production.arcana-package-observer` is not in shipped `dist/content.json`;
- the eight target School course IDs are not in production `definitions.actions`;
- the UI has no production route that calls `executeSchoolLesson`.

## 6. What the current UI actually exposes

The current renderer builds UI actions directly from `catalog.definitions.actions`.

### Work panel

`app.ts` defines:

`const professions=['tavern','lumber','hunt','guard']`

and Work panel calls:

`actionList(professions)`

Therefore the shipped Lumber button uses action ID:

`lumber`

not target:

`lumber.shift`

### School panel

The School panel explicitly renders:

- `combat-class`
- `etiquette-class`
- `magic-class`
- `salon-lesson`
- `school`

plus legacy workshop actions.

It does not enumerate `SCHOOL_COURSES` and does not call:

`executeSchoolLesson(save, courseId, ...)`

Therefore target School course IDs such as:

`school.course.arcana`

are not player-facing in the shipped UI.

### Forest Activity

The current engine supports commands:

- `enterActivity`
- `activityAction`

but the production UI source has no player-facing control that dispatches `enterActivity`.

The “Окрестности”/legacy action surface includes `forest-search`, which is an ordinary legacy action, not target Activity `lumber.forest`.

Therefore target Forest Activity is not currently activatable from shipped UI.

### Target endings

The “Судьбы” panel enumerates:

`catalog.definitions.endings`

Current production definitions contain only legacy endings:

- `guild-life`
- `scholar-life`
- `tavern-stay`
- `tavern-guild`
- `tavern-court`
- `lumber-stay`

Target endings from the Lumber fixture are not production definitions, so the UI cannot present/commit them.

### Responsible UI seams

Exact file:

`prior-work/astra/prototype-m3.2/src/ui/app.ts`

Exact relevant boundaries:

- Work: `professions` + `actionList(professions)`
- School: hard-coded `actionList([...legacy school IDs...])`
- Activities: no `enterActivity` player-facing control
- Endings: `catalog.definitions.endings.map(...)`

No production UI change is made by this audit.

## 7. Semantic presentation IDs in shipped paths

The semantic presentation resolver is active in production source.

### Shipped IDs that already follow the taxonomy shape

Legacy Lumber action `lumber` is recognized as a job by `presentation.ts`, so its seasonal scenes resolve into semantic job slots such as:

- `job/lumber/shift/spring/default`
- `job/lumber/shift/summer/default`
- `job/lumber/shift/autumn/default`
- `job/lumber/shift/winter/default`

Legacy class actions are converted into School-shaped IDs. For example, class IDs ending in `-class` become:

`school/<track>/lesson/<scene>/default`

Legacy `forest-search` maps into the Activity family:

`activity/forest/route/<scene>/default`

So the current resolver already uses semantic slash namespaces rather than filenames.

### Target semantic IDs that are not reachable from shipped catalog

The merged target IDs include:

- `job/lumber/result/default`
- `job/lumber/event/lumber-career-first-shift/default`
- `relationship/lumber-foreman/lumber-foreman-notice/default`
- `relationship/lumber-foreman/lumber-night-foreman-professional/default`
- `job/lumber/event/lumber-cross-activity-forest-return/default`
- `school/arcana/lesson/default`
- `school/field-craft/lesson/default`
- `ending/lumber/hard-work`

Their taxonomy is correct in merged fixtures/tests, but most require target events/actions/endings that are not in the shipped catalog.

### Presentation registry activation

`content/presentation-target-registry.fixture.json` is a test fixture only.

Production build loads:

`content/presentation.json`

The current production presentation file has text overrides and an empty legacy media map; it does not load the target registry fixture as production slot data.

This does not break semantic ID generation itself — `presentation.ts` can derive IDs dynamically — but it means the prepared target registry assignments are not a shipped production registry.

### Responsible presentation seams

Files/APIs:

- semantic derivation: `src/core/presentation.ts`
- shipped override source: `content/presentation.json`
- unshipped prepared registry: `content/presentation-target-registry.fixture.json`
- catalog inputs controlling which semantic IDs can actually occur: `content/definitions.json` and shipped packs

## 8. Activation seam table

| Product surface | Fixture merged? | Shipped now? | Exact missing activation seam |
|---|---:|---:|---|
| target Lumber action `lumber.shift` | yes | **no** | `content/lumber-target-definitions.fixture.json` is not consumed by `build.mjs` / `validate.ts`; UI Work list still uses `lumber` |
| Lumber typed career | yes | **no** | production `content/definitions.json` has no careers |
| Foreman typed relationship | yes | **no** | production `content/definitions.json` has no relationships; nested Lumber pack not shipped |
| Lumber career/relationship events | yes | **no** | nested `content/packs/lumber-target/*.json` excluded by top-level-only scan |
| target School courses | yes | **no** | `src/core/school.ts` adapter exists, but `app.ts` School panel does not invoke it; course IDs are not production actions |
| School target observer pack | yes | **no** | nested `content/packs/school-target/*.json` excluded |
| normal target lodging | test fixture | **no** | production `definitions.json.lodgings=[]`; `lumber.normal-room` exists only in QA fixture construction |
| Foreman Night choice | yes as target fixture definition in test construction | **no** | production `definitions.json.nightChoices=[]`; UI sleep panel uses legacy `sleep` compatibility flow |
| Forest Activity `lumber.forest` | yes | **no** | fixture definitions not production; UI has no `enterActivity` control |
| Hard Work ending | yes | **no** | fixture ending absent from production `definitions.endings` |
| Forewoman / Forest complex endings | yes | **no** | same production-definition seam |
| target presentation registry fixture | yes | **no** | build loads `content/presentation.json`, not `presentation-target-registry.fixture.json` |
| target semantic ID taxonomy | yes | **partially** | resolver ships and legacy surfaces use semantic namespaces; target-only event/course/ending IDs cannot appear until their content is activated |

## 9. Shipped Product Acceptance implication

A test that constructs an isolated catalog from PR #19 fixtures can prove target mechanics. It does not prove player-facing activation.

For Product Acceptance row-runner purposes, a row must be called “executable from shipped catalog” only when all required definitions/packs/API routes are reachable from the same catalog construction path used by:

- `scripts/validate.ts`;
- `scripts/build.mjs`;
- `dist/content.json`;
- `src/ui/app.ts`.

At the audited baseline, target Lumber/School/Night/Forest/endings do not meet that standard.

## 10. Item 1 disposition

**Shipped catalog activation: NOT COMPLETE.**

The exact missing seams are now identified without changing production files:

1. production pack discovery is non-recursive in both build and validation;
2. target fixture definitions are not production `definitions.json`;
3. UI Work/School surfaces still address legacy action IDs;
4. UI has no target Activity entry/action controls;
5. target endings are absent from production definitions;
6. target presentation registry remains a fixture rather than shipped presentation data.

No production runtime, UI, or content file was modified during this audit.
