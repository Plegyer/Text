# Next production integration gate v12

Status: COMPLETE / CURRENT_GATE_RECORDED

Audit timestamp context: after PR44 merge and during first PR45 ordinary-poverty selective integration attempt.

Current main:
- SHA: `ab53da4059e348734703c2de490e43e94c02b057`
- source: PR44 merge
- main push workflow #62 / id `36322824233`
- conclusion: SUCCESS
- validator: 17 packs, 46 events, 35 actions, 9 endings
- tests: 301 / 301 pass / 0 fail.

This gate summarizes Chat 4 queue items 151–161. It does not approve whole worker branches.

## 1. School PR44

Classification:
`GREEN_POST_MERGE_MAIN`.

Accepted PR head:
`07912a4870f82472a01f6ff8d0d81f1f67081593`.

Exact-head workflow #61:
- success;
- 301/301 tests.

Merged as:
`ab53da4059e348734703c2de490e43e94c02b057`.

Post-merge main workflow #62:
- success;
- 301/301 tests;
- unchanged validator content counts.

School now ships RU+EN for the reviewed panel/course/Night/current reachable event surfaces.

The failure sequence was correctly closed:
- first head assumed action-result render before current pending School event;
- second head read runtime-only `run.flags` from raw persisted JSON;
- final head follows `base.school` naturally and checks `legacyCompat.flags`.

No School mechanics, RNG or Save schema were changed to make localization tests pass.

Still staging/Product-open:
- exact-course teacher events/routing;
- management/accounting public-result provider/threshold;
- Arcana/Forest public result.

## 2. Ordinary poverty localization

Worker-source classification:
`GREEN_AS_SELECTIVE_SOURCE`.

Reviewed source:
- 84 RU+EN keys;
- exact current identities across six root poverty packs;
- no Secret Debt contamination;
- item-149 natural street + cheap-lodging execution;
- item-150 collision/current-ID guard.

### Live PR45 state

PR #45:
`Lead: integrate ordinary poverty RU/EN localization`

Base:
`ab53da4059e348734703c2de490e43e94c02b057`

Reviewed exact head:
`765995c098ed4f0c688c18cb8d660c1504d8b967`

Workflow #64 / id `36323122474`:
`FAILURE`

Test summary:
- tests: 304
- pass: 302
- fail: 2.

The 84-key root-bundle completeness test itself passes.

Blocking failures are test-fixture/path expectations:

1. `all six ordinary-poverty production packs have locale-invariant natural paths`

The v2 summer case uses elapsed day 12 while the v2 event requires day-in-year >=13. Current Resolver therefore correctly selects the eligible v1 summer event first. The test expected the v2 event on a day when its own condition is false.

Fix direction:
use a naturally eligible current day for the intended v2 identity and keep Resolver-driven selection; do not alter production event conditions to satisfy the test.

2. `renderer: ordinary poverty pending scene localizes RU EN without changing gameplay save`

The smoke seeds exact event:
`poverty-street-production.helpful-summer`

but waits for stale/unrelated title text:
- RU expected in test: `Мелкая помощь у рынка`;
- EN expected in test: `Small help near the market`.

The actual integrated current key is:
- RU: `Небольшое платное поручение`;
- EN: `A small paid errand`.

The pending fixture should also use the event's exact current choice IDs; the production event owns `take-errand` and `keep-resting`.

Fix direction:
align UI smoke expectations and fixture IDs to the exact merged 84-key/current-pack identity. Do not change localization/gameplay merely to match stale smoke text.

PR45 verdict at this gate:
`BLOCKED_BY_EXACT_HEAD_CI`.

A later head must pass the item-155 selective gate before merge:
- exact 84 current keys;
- natural paths;
- renderer locale invariance;
- one-time effects/reload;
- Secret Debt exclusion;
- exact-head full CI;
- post-merge main CI.

## 3. Real GIF production assets

Classification:
`BLOCKED_BY_REAL_ASSETS`.

Chat 2 now has:
- source/license policy;
- first discovery batch;
- explicit no-import blocker;
- zero-asset technical inventory;
- imported-GIF preflight that verifies no false production import;
- item-177 pool patch declaring zero candidates/pools;
- item-178 empty localization delta declaring no fake keys.

No production GIF was imported.

No 3–5 compatible rights-clear pool exists.

QA provenance rule remains:
- generic GIF hosting/search is not a license;
- rights conflict/uncertainty = DO_NOT_SHIP;
- every future candidate must be a real repo blob with provenance and technical preflight.

Do not activate a pool until one current semantic presentationId has 3–5 real compatible repository GIFs, RU+EN alt/caption, static fallback and deterministic locale-neutral selection.

## 4. Relationships / ordinary Night

Classification:
`SAFE_SELECTIVE_CONTENT_SOURCE_WITH_UI_LOCALIZATION_GAP`.

Current shipped typed identity:
`lumber.foreman`.

Current voluntary Night identity:
`lumber.foreman.night`.

Verified ordinary relationship Night semantics:
- voluntary slot;
- 0 daytime Energy;
- nextDayEnergyDelta 0;
- typed `night_meetings` counter;
- current professional follow-up event;
- no forced-debt semantics.

Chat 5 localization fixture:
- 11 complete RU+EN keys;
- exact current Foreman identities;
- no gameplay mutation fields;
- Hard Work invariant protected.

Selective readiness:
- 10 event/media keys can use existing generic localization paths;
- `nightChoice.lumber.foreman.night.label` remains staged until generic Night-choice label UI wiring exists.

The relationship-target pack must remain staging/reference because it duplicates the existing `lumber.foreman-notice` production identity and is not additive root-load content.

No new career relationship roster is canonical; non-Lumber roles remain `CONTENT_DRAFT / PRODUCT_NOT_LOCKED`.

## 5. Forest

Current shipped baseline:
`GREEN`.

Preserve:
- `lumber.forest`;
- current route labels;
- success/escape/failure results;
- PR43 RU+EN result presentation;
- exact Lumber continuation:
  `activityResult(lumber.forest, success, lumber.forest.success)`.

Deeper Forest content remains separate staging/Product work.

Existing `forest.route.old-boundary` and capability `enter_old_boundary` are real base seams, but they do not settle:
- token acquisition;
- retain/consume/turn-in;
- Hunter integration;
- deeper route/challenge/lore semantics.

No integration in this gate may reinterpret the exact shipped Forest result IDs.

## 6. Secret Debt / Product-open boundaries

Classification:
`PRODUCT_BLOCKED / ISOLATED`.

Secret Debt mechanics/rewards/forced Night remain excluded from:
- School localization;
- ordinary-poverty localization;
- Relationships/ordinary Night;
- real-GIF sourcing.

Ordinary poverty PR45 must continue to reject lender/forced-debt IDs.

Other Product-open areas that remain unpromoted:
- School management/accounting public result;
- School Arcana/Forest public result;
- Hunter trail semantics;
- Old Boundary acquisition/consumption/deeper semantics;
- Palace authored content/routes/endings;
- final broader relationship roster/endings.

Existing consumer IDs, token/capability seams, ordinary Hunter shift, or Palace unlock infrastructure do not constitute completed authored Product decisions.

## 7. Localization product state

Current main after PR44:
`PARTIAL_BILINGUAL`.

Authoritative bundle:
- 130 keys;
- all 130 have non-empty EN;
- no current RU-only bundle entry.

Shipped strong slices:
- town/Work and ordinary career action copy;
- Forest Activity/result copy;
- School PR44 copy.

Still not shipped at this gate:
- ordinary poverty RU+EN (PR45 red);
- Foreman relationship RU+EN;
- several legacy/root event families;
- remaining hardcoded UI shell.

Russian fallback does not count as translation completion.

## 8. Current integration order from QA state

### Shipped / closed

School PR44:
`GREEN_POST_MERGE_MAIN`.

Forest PR43 baseline:
`GREEN_CURRENT_MAIN`.

### Active but blocked

Ordinary poverty PR45:
`BLOCKED_BY_EXACT_HEAD_CI`
on exact head `765995c...`.

The localization payload is sound enough to continue the selective PR; the current blockers are stale/incorrect test expectations, not a reason to alter gameplay.

### Ready for a separate future selective PR

Foreman event/media localization:
`PARTIAL_GREEN_FOR_SELECTIVE_INTEGRATION`.

Keep the generic voluntary Night-label wiring explicit.

### Waiting for external production input

Real multi-GIF pool:
`BLOCKED_BY_REAL_ASSETS`.

### Staging/Product-open

- deeper Forest depth;
- School exact-course/teacher content;
- broader relationship roster;
- Secret Debt;
- Hunter/Old Boundary unresolved semantics;
- Palace authored content.

## 9. CI floor

Current green main floor:
- main SHA `ab53da4059e348734703c2de490e43e94c02b057`;
- workflow #62 success;
- 17 packs / 46 events / 35 actions / 9 endings;
- 301/301 tests.

Every next production PR must bind approval to its own exact head.

For localization/presentation-only work, pack/event/action/ending counts should not drift without an explicitly reviewed gameplay-content reason.

After merge, a successful push run on the resulting main SHA remains mandatory.

## Final gate verdict

- School PR44: `GREEN_POST_MERGE_MAIN`.
- Poverty source: `GREEN_SELECTIVE_SOURCE`.
- Poverty PR45 current head: `BLOCKED_BY_EXACT_HEAD_CI`.
- Real GIF production: `BLOCKED_BY_REAL_ASSETS`.
- Relationships/Night source: `PARTIAL_GREEN_SELECTIVE`.
- Forest current shipped baseline: `GREEN`; deeper depth `STAGING_ONLY`.
- Secret Debt and other unresolved Product decisions: `PRODUCT_BLOCKED / ISOLATED`.

No whole worker branch is approved for merge.
