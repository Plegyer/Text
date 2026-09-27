# Next Production Integration Gate v11

Status: QA / Product acceptance summary
Queue item: Chat 4 item 150

Current main rechecked:
`23a8798f77c42e84a7540d71fdffd69d9db9fbfd`

Open PRs at final recheck: **0**

Latest current-main Actions:
- workflow `mindy-successor check`;
- run #56 / ID `36319433141`;
- exact head `23a8798…`;
- conclusion **success**;
- **299/299 tests, 0 failures**;
- validator **17 packs / 46 events / 35 actions / 9 endings**.

Worker heads at final recheck:
- Chat3 `chat3/lumber-production-proof-next`: `f6e439a0d35b8f4791e65023d1b3e2042fa14a27`, item 148 completed;
- Chat5 `chat5/school-pa-gate-next`: `9ced850e9a510e2a6042f53cf1f4fb5f39b90524`, item 150 completed;
- Chat2 `chat2/presentation-replacement-next`: `39932f85f1bff0b6fbcdb0a2c9d774ac8fd72e84`, item 167 completed.

All three are long-lived worker branches. None is a whole-branch merge candidate.

## GREEN_TO_INTEGRATE

### Ordinary poverty RU+EN content delta — selective files only

The Chat3 ordinary-poverty localization payload is now the strongest ready content candidate:

- item 140: 84 RU+EN keys;
- exact mapping to all 14 current PR37 production event IDs;
- 82 event presentation keys + 2 current media-alt keys;
- no Secret Debt;
- no gameplay fields;
- current PR43 runtime key convention;
- item 141 contract test present;
- item 143 exact key map present;
- items 147/148 handoff/current-main ledger present.

Disposition: **GREEN_TO_INTEGRATE as a selective content/test slice on a fresh branch from current main**.

Do not copy the staging multi-GIF patch.

This status means the reviewed source artifacts are suitable for Lead selective integration. It does not waive the exact integration-head CI and natural-path smoke required below.

### School safe copy subset — content only

Chat5 contains a complete RU+EN School UI/course copy bank and a gameplay-free production localization text payload. The safe UI/course text subset is suitable source material for a fresh-main integration.

Disposition: **GREEN_TO_INTEGRATE only as selectively extracted/remapped RU+EN text**, not as the complete worker patch file and not as the worker reachability map.

The Lead integration must use current-main identities/runtime key convention and wire the actual School UI to localization.

### Existing Forest PR43 baseline

Forest success/escape/failure bilingual production is already shipped and GREEN on main. Chat3 item 146 now adds real worker-branch executable natural-path regression evidence for exact `activityResult` success/escape/failure plus the Lumber Hard Work lock.

This is baseline/regression evidence rather than a new integration requirement.

## NEEDS_FRESH_MAIN_CI

### School localization selective PR

Before any School localization production merge:

- create a fresh branch from current main;
- copy only reviewed safe content;
- wire hard-coded School panel/course UI through localization;
- map only real current production event/media IDs;
- do not promote `school.generic.reachable.v2.*` or `school.night.exact.v3.*` as current production events;
- run RU/EN UI/gameplay invariance tests;
- record exact-head Actions;
- after merge require post-merge main Actions.

The current worker branch/worker tests cannot satisfy this gate.

### Ordinary poverty localization selective PR

After the 84-key delta/test/map are copied onto fresh main:

- collision-check `localization.json`;
- run contract test against current packs;
- execute the item-145 RU↔EN natural path through actual EndDay → lodging → poverty event;
- prove pending identity/Save/RNG/NightFlow invariance;
- run full exact-head CI;
- require post-merge main CI.

Current source artifacts are green, but no future integration head exists yet. Therefore production merge still **NEEDS_FRESH_MAIN_CI**.

### Any future real-GIF pool

Even after files arrive, every real pool requires source/blob preflight, GIF signature, 3–5 candidates, build copy to `dist/assets`, current semantic ID, RU+EN alt, static fallback, locale-invariant candidate selection, exact-head CI and post-merge main CI.

## WAITING_FOR_WORKER_DELIVERABLE

### Current localization waves

**None after the final Git recheck.**

Chat3 items 140–148 are all now present. The earlier same-session snapshot that showed item 146 stub / 147–148 missing is stale and has been corrected in item 141/142 QA files.

Chat5 items 137–150 are present and reconciled.

This does not make every artifact production-ready; several are staging/evidence only.

### Real media

There is no missing JSON/doc worker claim that would make a real pool shippable. The actual missing input is **real GIF media blobs**.

Chat2 has progressed to producer/readiness work, but the current recursive Chat2 Git tree was rechecked at 651 entries, `truncated=false`, and still contains **0 real `.gif` files**.

Do not convert producer briefs or paths in manifests into “worker deliverables shipped.”

## STAGING_ONLY

### School exact-course/routing families

Keep staging-only:

- `school-reachable-event-localization-key-map-v1.fixture.json` as a current-main reachability claim, because its `school.generic.reachable.v2.*` / `school.night.exact.v3.*` events are absent from current main;
- `school-exact-course-routing-v2.fixture.json`;
- teacher/course-specific localized content dependent on unshipped exact routing;
- proposed School multi-GIF pools/assets.

The routing fixture correctly has no attached production trigger and keeps teacher/lesson promotion staged.

### Poverty multi-GIF

`ordinary-poverty-multigif-staging-v1.json` remains staging-only.

Its GIF candidates are placeholder paths under `assets/staging/`; only the SVG fallback files are real current assets.

### Real-GIF production pools generally

PR42 runtime is shipped, but production content pools are **STAGING_ONLY / NONE SHIPPABLE** because current main and current Chat2 branch contain zero real GIF blobs.

The honest real-asset-only patch remains empty.

### Remaining Forest content depth

PR43 result/reaction bilingual slice is shipped.

Further Forest challenge/seasonal depth remains staged unless the exact production IDs, route binding, checks/effects and content are separately integrated and tested.

Existing `forest.route.logging-road` / `forest.route.old-boundary` identities and labels do not authorize invention of deeper route semantics.

## PRODUCT_BLOCKED

### Secret Debt

State: **AUTHORED_ONLY / PRODUCT_BLOCKED**.

Ordinary poverty integration must remain independent.

Still unresolved mechanics/rewards must not be guessed or promoted by localization/media work. Bilingual authoring is not activation evidence.

### School unresolved public results

Remain Product-blocked:

- management/accounting public result;
- Arcana/Forest public result.

Course localization does not select these results.

### Hunter / Old Boundary

Current main already has ordinary `hunter.shift`, `forest.route.old-boundary`, `old_boundary_token` and the `enter_old_boundary` capability seam.

What remains Product-blocked is new Hunter-trail / Old-Boundary-token acquisition/use/outcome semantics. Do not treat the existing IDs or localized route label as a decision.

### Palace

Palace unresolved content remains Product-blocked for new integration. No reviewed localization/media slice promotes it.

## Regression locks for every next integration

Do not reopen:

- Lumber Hard Work eligibility is only `completed_shifts >= 50`;
- reward is `hardWork:lumber`;
- Forest continuation uses exact `activityResult`;
- RU+EN changes presentation/text only;
- locale does not change gameplay IDs, conditions/effects/rewards, RNG, Save or deterministic GIF candidate;
- production multi-GIF pool requires 3–5 real repository GIF files;
- placeholders, external URLs and test-only GIFs are never shipped candidates.

## Integration order from QA perspective

The next clean production candidate is ordinary-poverty localization because its 14-event current-main identity map and 84-key RU+EN delta are exact and now fully delivered.

School localization can follow or run independently as a separate fresh-main selective PR, but Lead must first compose the current-main-compatible UI wiring/key mapping; the Chat5 worker patch is not a drop-in current-production patch.

Real-GIF pools cannot be integrated until actual GIF files exist.

Forest deeper content should remain separated from Product-blocked Hunter/Old Boundary semantics.

Secret Debt remains authored-only until Product closes its mechanics/reward decisions.

## Final gate state

- Ordinary poverty localization: **GREEN_TO_INTEGRATE selective source; NEEDS_FRESH_MAIN_CI before merge**.
- School localization: **GREEN_TO_INTEGRATE safe text subset; current worker patch/routing STAGING_ONLY; NEEDS_FRESH_MAIN_CI after fresh-main wiring**.
- Forest PR43 bilingual result baseline: **GREEN / SHIPPED**; remaining deeper content **STAGING_ONLY**, with Hunter/Old Boundary unresolved semantics **PRODUCT_BLOCKED**.
- Real-GIF production pools: **STAGING_ONLY / zero real GIF assets / no pool shippable**.
- Secret Debt: **PRODUCT_BLOCKED mechanics/rewards; authored-only presentation/content**.
- Worker-deliverable blocker for Chat3 140–148 or Chat5 137–150: **NONE at final recheck**.

Never merge `chat4/activation-ci-gate-next`, Chat2, Chat3 or Chat5 long-lived branches wholesale. Lead should selectively copy exact reviewed artifacts onto fresh branches from the then-current main and bind acceptance to exact-head and post-merge main CI.
