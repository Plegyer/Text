# Forest / Secret Debt Bilingual Handoff v1

Status: Chat 3 item 131 handoff for the RU+EN Forest + Secret Debt authoring wave.

Worker branch:
`chat3/lumber-production-proof-next`.

This branch is long-lived and diverged substantially from current `main`. It is **not** an integration unit. Lead should selectively copy reviewed files onto a fresh integration branch based on current `main`.

No shared runtime/schema/UI file is changed by items 123–131.

## Product model preserved

The authored wave follows the direct Product decision:

- Russian is the source authoring language.
- English is a full second locale.
- Gameplay/content IDs remain locale-neutral.
- One gameplay event serves both locales.
- Mechanics, conditions, rewards, RNG, timing and save-state are identical across RU and EN.
- GIF/media candidates are shared across locales.
- Every authored media candidate has or is planned to have paired RU/EN alt/caption.
- One semantic gameplay identity may own 3–5 presentation candidates.
- Candidate selection never changes gameplay outcome.

## Exact bilingual deliverables

### Forest

1. `docs/lumber-prep/FOREST_BILINGUAL_SOURCE_INVENTORY_v1.md`
   - inventories route, challenge, season, result, continuation and media sources;
   - classifies `REACHABLE_NOW` / `STAGED` / `PRODUCT_BLOCKED`;
   - preserves exact `activityResult`.

2. `docs/lumber-prep/FOREST_ROUTE_CHALLENGE_RU_EN_v1.md`
   - paired RU-source/EN copy for safe current Forest route/challenge prose;
   - logging road, old boundary, deep navigation and three challenge families;
   - Hunter prose translated without inventing its production ID/gate/source.

3. `prior-work/astra/prototype-m3.2/content/packs/forest-result-content-bilingual-v1.json`
   - one locale-neutral event each for success/escape/failure;
   - exact existing event IDs:
     - `forest-result-content-v1.success`;
     - `forest-result-content-v1.escape`;
     - `forest-result-content-v1.failure`;
   - exact `activityResult` reaction triggers unchanged;
   - RU source text in schema-shaped fields;
   - explicit RU/EN localization sidecar because current pack schema is single-string;
   - marked `BILINGUAL_DRAFT_NOT_CATALOG_INCLUDED`.

4. `prior-work/astra/prototype-m3.2/tests/forest-bilingual-content-contract.test.ts`
   - contract coverage for RU+EN completeness;
   - locale-neutral IDs;
   - exact result triggers;
   - shared media identity;
   - no Lumber Hard Work drift.

### Secret Debt

5. `docs/poverty-prep/SECRET_DEBT_CORE_CONTENT_RU_EN_v1.md`
   - paired RU/EN lender offer;
   - delayed activation;
   - repeatable hidden-career daytime work;
   - forced-Night scenes;
   - all unresolved numeric/mechanical parameters remain OPEN.

6. `docs/poverty-prep/SECRET_DEBT_OUTCOMES_RU_EN_v1.md`
   - paired RU/EN authored outcome content for:
     - `paid_freedom`;
     - `bound_life`;
     - `takeover`;
   - exact eligibility thresholds, external dependency and Meta rewards remain OPEN.

7. `prior-work/astra/prototype-m3.2/content/secret-debt-authored-content-ru-en-v1.fixture.json`
   - machine-readable bilingual authoring fixture;
   - locale-neutral semantic/content identities;
   - `ru` + `en` copy;
   - unresolved mechanics encoded as `OPEN/null`;
   - `productionCatalogIncluded: false`.

### Shared presentation planning

8. `docs/lumber-prep/FOREST_SECRET_DEBT_BILINGUAL_MULTI_GIF_MAP_v1.md`
   - 3–5 candidate pools for Forest routes/challenges/results;
   - shared candidate pools for Secret Debt lender/work/Night/outcomes;
   - one locale-neutral media candidate ID per visual;
   - paired RU/EN alt + caption;
   - Product-blocked gameplay bindings remain explicitly non-canonical.

## Forest readiness

### Bounded result-reaction family

Mechanically authoritative boundaries already exist:

- `activityResult(lumber.forest, success, lumber.forest.success)`;
- `activityResult(lumber.forest, escape, lumber.forest.escape)`;
- `activityResult(lumber.forest, failure, lumber.forest.failure)`.

The existing EN-only production-oriented pack from item 117 proved this content family can sit on those boundaries without mechanical effects.

The bilingual item-125 draft preserves exactly those event/result identities.

**Integration state: authoring-ready; production activation waits only for the shared localization representation/seam described below.**

No Forest result reaction:
- writes progression;
- changes an Activity result;
- changes Hard Work;
- grants a reward.

### Logging road

Production identity already exists:
`forest.route.logging-road`.

RU+EN route presentation copy:
**READY**.

Concrete deeper challenge mechanics:
**STAGED** until explicit challenge IDs/bindings/checks are authored.

### Old boundary

Production route identity already exists:
`forest.route.old-boundary`.

Authoritative gate:
`enter_old_boundary`.

RU+EN route presentation copy:
**READY**.

Still Product-blocked:
- natural `old_boundary_token` acquisition source;
- price if any;
- retained/consumed/turn-in semantics;
- deeper token-use policy.

Bilingual content does not answer those questions.

### Hunter trail

RU+EN prose and media planning:
**READY AS CONTENT**.

Production activation:
**PRODUCT_BLOCKED**.

Still OPEN:
- final production option ID;
- Hunter public clue fact;
- navigation capability identity if needed;
- provider/source;
- threshold/reward.

No item in this wave promotes a guessed Hunter ID.

### Challenge families

Bilingual content exists for:
- navigation;
- physical obstacle;
- interpretation/ritual anomaly.

Production mechanics remain:
**STAGED**.

Still needed:
- final challenge IDs;
- route bindings;
- conditions/check formulas;
- explicit Activity-owned effects/checkpoint behavior.

## Exact Forest continuation firewall

The Lumber continuation boundary remains exactly:

`activityResult(lumber.forest, success, lumber.forest.success)`.

The existing continuation event identity remains:
`lumber-cross.activity-forest-return`.

Localization must translate only visible presentation strings. It must not:
- duplicate the continuation event for English;
- replace the trigger with a locale-specific fact;
- add a second outcome;
- add a Hard Work prerequisite.

## Lumber Hard Work firewall

Unchanged:

Eligibility:
ONLY `completed_shifts >= 50`.

Exact reward:
`hardWork:lumber`.

There is still no:
- School prerequisite;
- Forest prerequisite;
- relationship prerequisite;
- milestone prerequisite;
- season prerequisite;
- item prerequisite.

## Secret Debt readiness

### Authored content

Now available in paired RU+EN:
- five lender-offer variants with accept/refuse agency;
- temporary relief / reminder / pre-activation / activation copy;
- ten daytime hidden-career work families;
- ten forced-Night scene families;
- `paid_freedom`;
- `bound_life`;
- `takeover`;
- reusable multi-GIF candidate pools.

This material is ready as authored authority/fixture data.

### Mechanical activation remains Product-blocked

Do not infer or activate:

- lender encounter probability;
- immediate principal;
- delayed debt amount;
- activation delay;
- hidden-career action cost;
- hidden-career wage/stat effects;
- stage/counter thresholds;
- School availability while bound;
- Activity/Forest availability while bound;
- forced-Night intercept;
- lodging payment policy;
- exact next-day penalty/modifier composition;
- `paid_freedom` exact eligibility;
- `bound_life` exact eligibility;
- `takeover` exact eligibility;
- `takeover` external dependency;
- any of the three Meta rewards.

The item-129 fixture keeps all of these as `OPEN/null`.

### Secret Debt structural invariants preserved

- route originates from street context;
- ordinary poverty and Secret Debt remain separate systems;
- bound state blocks the 10 ordinary careers;
- ordinary-career progress is preserved while blocked;
- Secret Debt is not one of those 10 careers;
- Secret Debt grants zero ordinary Hard Work credit;
- Secret Debt does not count toward Palace 10/10;
- forced Night is separate from daytime hidden-career work;
- outcome families remain exactly:
  - `paid_freedom`;
  - `bound_life`;
  - `takeover`.

## Exact Lead-owned localization seam required

The current event/media authoring shape uses single strings for fields such as:
- event `title`;
- variant `text`;
- choice `label`;
- choice `text`;
- media `alt`;
- any future media `caption`.

Chat 3 does not own the shared schema/runtime/UI, so item 125 uses a sidecar rather than changing those contracts.

The minimal Lead-owned seam must allow presentation lookup by:

`(locale-neutral semantic/content identity, field identity, locale) -> localized string`

with at least:
- source locale `ru`;
- second locale `en`;
- deterministic fallback policy if a localized string is absent;
- no locale-specific gameplay event duplication;
- no locale in conditions/effects/RNG/save progression identity;
- no change to event history or one-shot semantics when locale changes.

An acceptable implementation may be:
- localized fields in the shared content schema;
- a localization table/registry keyed by semantic identity;
- an import-time transformation into the current runtime presentation shape.

The exact architecture is Lead-owned. The required behavior is what matters.

### Required presentation fields

At minimum the seam must cover:
- event title;
- event/variant body text;
- choice label;
- choice body text;
- media alt;
- media caption when captions exist.

### Multi-GIF interaction

The media-pool seam, if separate, must preserve:
- one semantic gameplay identity;
- 3–5 locale-neutral media candidate IDs;
- the same gameplay effects regardless of candidate;
- RU/EN alt/caption lookup for the selected candidate;
- static/text fallback.

No candidate ID should be created twice merely because there are two locales.

## Selective integration order

Because the worker branch is substantially stale/diverged, copy exact files rather than merging branch history.

### Step 1 — docs/authoring authority, no runtime risk

Safe first copy:
1. `FOREST_BILINGUAL_SOURCE_INVENTORY_v1.md`;
2. `FOREST_ROUTE_CHALLENGE_RU_EN_v1.md`;
3. `SECRET_DEBT_CORE_CONTENT_RU_EN_v1.md`;
4. `SECRET_DEBT_OUTCOMES_RU_EN_v1.md`;
5. `FOREST_SECRET_DEBT_BILINGUAL_MULTI_GIF_MAP_v1.md`;
6. this handoff.

These are authored-content/presentation contracts only.

### Step 2 — non-production fixtures

Copy:
1. `secret-debt-authored-content-ru-en-v1.fixture.json`.

Keep:
`productionCatalogIncluded: false`.

Use it as machine-readable authoring input, not production activation.

### Step 3 — Forest bilingual result draft + contract test

After Lead chooses/implements the shared localization representation:
1. adapt or import `forest-result-content-bilingual-v1.json` without changing its locale-neutral gameplay IDs;
2. use `forest-bilingual-content-contract.test.ts` as a preservation contract;
3. run targeted Forest result/content tests;
4. run existing Activity/Lumber regressions;
5. run full project check;
6. require exact-head CI for the integration branch.

Do not add the current sidecar draft directly to the production catalog if the current validator/schema does not support its authoring-only fields.

### Step 4 — deeper Forest content

Productionize in bounded slices:
- logging-road presentation first;
- concrete challenge instances only after their IDs/checks/effects are authored;
- old-boundary presentation without inventing token acquisition;
- Hunter only after Product closes the missing identity/gate/source decisions.

### Step 5 — Secret Debt mechanics

Use the bilingual fixture/content after each specific Product decision is made.

Activate mechanics slice-by-slice; never fill OPEN values merely to make the fixture executable.

## Validation status

Items 123–131 were authored through the connected Git repository.

The item-126 test is a **new contract test artifact**. This handoff does not claim that the worker executed the repository test suite or exact-head CI in a local checkout.

Lead integration of any non-doc content/test file should therefore run current-main validation and CI after selective copy.

## Files that are not integration instructions

The long-lived worker branch itself is not a merge recommendation.

Historical EN-only source files remain useful provenance:
- `FOREST_ROUTE_AUTHORED_SCENE_BANK_v1.md`;
- `FOREST_CHALLENGE_FAMILY_CONTENT_BANK_v1.md`;
- `FOREST_SEASONAL_CONTEXT_BANK_v1.md`;
- `content/packs/forest-result-content-v1.json`;
- Secret Debt items 105–112.

The new RU+EN wave is the localization-forward authoring layer. Do not blindly rewrite or delete historical files during selective integration.

## Handoff conclusion

Forest:
- bilingual route/challenge/result authoring is ready;
- exact result identities are preserved;
- result reaction is the clearest bounded production target after the shared localization seam;
- Hunter/token/challenge mechanical OPEN decisions remain fenced.

Secret Debt:
- bilingual lender/work/Night/outcome content is ready;
- machine-readable bilingual fixture is ready;
- mechanics remain Product-blocked exactly where values/policies are still OPEN.

Presentation:
- shared 3–5 candidate pools are mapped;
- media identity remains locale-neutral;
- RU/EN alt/captions are authored;
- candidate choice has no gameplay authority.
