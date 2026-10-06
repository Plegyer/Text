# Chat 3 — Final Product Invariant Traceability v38

Status: **RESEARCH COMPLETE — RELEASE TRACEABILITY BUILT**  
Owner: Chat 3  
Branch: `chat3/final-gameplay-release-smoke-bundle-v36`

## Purpose

Trace locked Product decisions into:

- owning runtime/content surface;
- accepted producer / frozen implementation source;
- focused executable test(s);
- final regression gate.

Coverage statuses:

- **GREEN** — executable coverage exists and is appropriate for the lock;
- **FINAL-UNION PENDING** — executable tests exist, but must still run on the fully assembled 1.0 branch;
- **GAP** — accepted Product behavior lacks a live executable consumer/test;
- **GOVERNANCE** — coordination/release policy, not a runtime behavior;
- **SUPERSEDED** — later lock narrows/strengthens the earlier rule.

Research-time main:

`37cda3b92c2228e0388c4ce6da47b36e1d52e543`

Final release evidence must always use the actual fully assembled head, not this research snapshot.

---

# 1. Executive coverage result

The core 1.0 Product model has executable ownership across:

- character/stat baseline;
- ten ordinary careers;
- School;
- Night;
- Secret Debt;
- Activity/Camp;
- Palace;
- Strong Meta;
- D40/D41 endings;
- D46/D47 economy/New Start+;
- ending transaction/save-reload.

Three concrete executable-coverage gaps remain visible from this audit:

## GAP 1 — Palace Formal Introduction live consumer

Runtime exists and is focused-green.

No accepted live authored ordinary-professional relationship consumer is present in frozen v18/v19/v20/v21 stack.

Required closure:

- exact event/choice;
- ordinary career;
- relationship ID;
- first professional transition;
- executable success/failure/use-counter test.

## GAP 2 — Palace Source Method live consumer

Knowledge ownership/query runtime exists and is focused-green.

No accepted live authored information-only consumer is present in frozen stack.

Required closure:

- exact already-legal scene;
- `strongMetaKnowledge = palace.inner-truth.source-method`;
- information-only branch;
- executable same-life/future-life exposure test.

## GAP 3 — exact generic ending compatibility IDs

Central legacy `accept` path is executable-tested with a synthetic legacy ending.

No dedicated exact-ID test was identified for:

- `guild-life`;
- `scholar-life`.

This is a narrow regression-coverage gap, not a known runtime defect.

---

# 2. Foundational Product decisions D1–D15

| Lock | Product invariant | Owner | Accepted source / producer | Focused executable coverage | Final gate | Status |
| --- | --- | --- | --- | --- | --- | --- |
| D1 | 12 progression stats + separate Lust | `schema.ts`, character state | canonical current-main schema lineage | `hard-work-stat-cap-d24.test.ts`, `hard-work-bonus-mapping-v13.test.ts`, School/stat tests | schema/typecheck + final smoke | GREEN |
| D2 | stats start at 1; 10 allocation points; Lust separate | fresh-save / creation flow | canonical creation runtime; D46 preserves baseline | `ending-meta.test.ts`, New Start+/creation tests, `economy-start-balance-v14.test.ts` | fresh-start smoke | FINAL-UNION PENDING |
| D3 | no universal +2/+2/-1; authored seasonal work packages | ordinary work engine/content | D31 accepted seasonal map already in main | `ordinary-work-seasonal-negative-tradeoffs.test.ts` | ordinary-career smoke | GREEN |
| D4 | 160 days = 4x40, seasons 10-day blocks | calendar/Night/start-day | canonical engine | `night-flow.test.ts`, `late-career-calendar-reachability.test.ts`, migration/drift sentinel | full save/calendar smoke | GREEN |
| D5 | automatic knowledge vs limited selectable strong modifiers | Strong Meta state/snapshot | Strong Meta runtime v7 lineage | `strong-meta-registry-v7.test.ts`, `strong-meta-engine-integration-v7.test.ts` | combined registry + creation snapshot | GREEN |
| D6 | Palace requires all ten ordinary Hard Work; hidden routes excluded | Palace qualification | strengthened by D23 | `palace-d23-consumer-integration-v8.test.ts`, `hard-work-palace-meta-smoke.test.ts` | Palace entry gate | SUPERSEDED by D23 |
| D7 | Activity is expedition umbrella, not flat city event list | Activity engine/content | four-region Activity producers through v15 | `activity.test.ts`, region producer tests | Activity final union smoke | GREEN |
| D8 | Camp allowed only for multi-day expeditions; separate from city Night | Activity Camp persisted state | Camp v17 + accepted repair v19 `efde0a38...` | `activity-camp-persistence-v17.test.ts`, Night/Activity adjacency | Camp + forced-Night smoke | FINAL-UNION PENDING |
| D9 | staged internal milestones; public 1.0 only at full scope | release governance | Leader queue/protocol | not a runtime assertion | Leader merge/full CI/exact-main CI | GOVERNANCE |
| D10 | Secret Debt is in public 1.0 | Secret Debt runtime/content/UI | v12 `10a2ece...` | `secret-debt-full-route-v12.test.ts` | post-D51 full smoke | FINAL-UNION PENDING |
| D11 | Palace is in intended 1.0 | Palace runtime/content/UI | v18/v19 + D39 v20 | Palace v15/v16/v18/v19/v20 suites | Palace focused gate + full CI | FINAL-UNION PENDING |
| D12 | Grooming is a normal progression stat; no volatile global cleanliness meter | schema/stat effects/content | canonical schema/current main | schema/stat roster assertions through D24/D47 and career tests | schema + final stat smoke | GREEN |
| D13 | worker queue depth / ownership coordination | project governance | Leader worker protocol | not runtime-testable | Git/ownership process | GOVERNANCE |
| D14 | exactly three starter careers: Lumber, Satyr Maid, Undead Farm | career availability/content/UI | current merged career baseline | `starter-trio-availability.test.ts`, `starter-trio-target-careers.test.ts`, UI test | fresh-start smoke | GREEN |
| D15 | 10 ordinary + Palace separate + Secret Debt extra hidden route | catalog/domain ownership | current main + v12/v18 | `all-ten-career-availability-smoke.test.ts`, `chat3-secret-debt-separation-v2.test.ts`, Palace D23 | cross-domain smoke | FINAL-UNION PENDING |

---

# 3. Ending / Hard Work / Palace activation D16–D29

| Lock | Product invariant | Owner | Accepted source | Focused tests | Final gate | Status |
| --- | --- | --- | --- | --- | --- | --- |
| D16 | ending eligibility non-terminal; explicit commit | central ending transaction | current engine + all family producers | `ending-meta.test.ts`, `ordinary-hard-work-lifecycle-parity.test.ts`, D40/D41, D38, v12, Palace v18 | v37 ending audit roster | GREEN |
| D17 | Lumber Hard Work = Hard Work condition | Lumber career/ending | current merged Lumber | `lumber-hard-work-invariant.test.ts`, `lumber-ending-commitment.test.ts` | ordinary ending smoke | GREEN |
| D18 | separate Palace True / Return Home; Prince defeated + 12x91 | Palace ending + confrontation | v18 `67f948d...` | `palace-prince-narrative-producer-v18.test.ts`, v15 Palace runtime | Palace QA | FINAL-UNION PENDING |
| D19 | Secret Debt baseline incl. 20% lender, trap, debt, career lock, School/Activity allowed, forced Night, 50 hidden shifts | Secret Debt + Night | v12 `10a2ece...` | `secret-debt-full-route-v12.test.ts`, separation tests | Secret Debt+D51 exact assembly | FINAL-UNION PENDING |
| D20 | Body Confidence paid lesson adds Lust +2 | School lesson engine/content | School production/current main | `school-body-confidence-lust-d20.test.ts` | School smoke | GREEN |
| D21 | ordinary Hard Work gives future-life package | ending Meta + creation | ordinary Hard Work meta runtime | `ordinary-hard-work-meta-production.test.ts`, `ending-meta.test.ts` | Hard Work -> new life smoke | GREEN |
| D22 | any earned subset selectable; package breadth; Lust separate | Hard Work package catalog | refined by D47 | `hard-work-package-catalog-runtime.test.ts`, D47 test | creation/package smoke | SUPERSEDED by D47 exact mapping |
| D23 | Palace = permanent 10/10 + active 10/10 -> deterministic Day-1 invitation | Hard Work + Palace invitation | `CHAT6_PALACE_D23_CONSUMER_INTEGRATION_v8` | `palace-d23-consumer-integration-v8.test.ts`, smoke | Palace entry gate | GREEN / final union pending |
| D24 | cap200 changes ceiling only; normal Specialist slot | Strong Meta + stat cap | current Strong Meta D24 | `hard-work-stat-cap-d24.test.ts`, Strong Meta registry/integration | combined registry + package clip | GREEN |
| D25 | original Plus Mode job mutation is not successor scope | negative architecture firewall | Product lock / Palace authority | Palace/Hard Work tests assert no alternate Plus jobs | final catalog/domain audit | GREEN as absence guard |
| D26 | one same-career ordinary shift/day; Hard Work >= Day50 | ordinary work cadence | merged ordinary runtime | `ordinary-hard-work-lifecycle-parity.test.ts`, career cadence suites | ten-career smoke | GREEN |
| D27 | Strong Meta architecture: limited Keystone + Specialists | `strongMeta.ts` | Strong Meta runtime lineage | registry/integration tests | combined final registry | GREEN |
| D28 | Specialist capacity exactly 2 | Strong Meta selection | canonical registry | `strong-meta-registry-v7.test.ts`, D40/D41/D39/D38 tests | final combined registry | FINAL-UNION PENDING |
| D29 | Palace rich six-stage / 15 duties | Palace state/runtime/content | v15 inherited by v18 | `palace-rich6-runtime-v15.test.ts` | Palace save/reload v34 gate | FINAL-UNION PENDING |

---

# 4. Secret Debt / work / School / housing D30–D35

| Lock | Invariant | Owner | Accepted source | Executable coverage | Final gate | Status |
| --- | --- | --- | --- | --- | --- | --- |
| D30 | three Secret Debt endings -> distinct bounded Keystones | Strong Meta + Secret Debt endings | D30/D32 Strong Meta runtime; v12 binding | `strong-meta-d30-runtime-v7.test.ts`, v12 route test | Secret Debt + Strong Meta combined | FINAL-UNION PENDING |
| D31 | exact ordinary seasonal negative map | ordinary shift effects | accepted seasonal tradeoff implementation | `ordinary-work-seasonal-negative-tradeoffs.test.ts` | D46/Strong Meta regression | GREEN |
| D32 | exact Secret Debt Keystone numeric parameters | Strong Meta runtime | canonical D30 runtime | `strong-meta-d30-runtime-v7.test.ts`, `strong-meta-engine-integration-v7.test.ts` | post-D51 combined smoke | GREEN / final union pending |
| D33 | Literacy & Numbers readiness at 3 paid OR 3 Night Study, no summing | School publisher -> Lumber fact | accepted Lumber/School integration | `school-natural-path-lumber-v1.test.ts` and School repetition tests | School/Lumber advanced route smoke | GREEN |
| D34 | Lumber stages 1/8/20; route readiness fact-based; Hard Work separate | Lumber career state/reactions | merged Lumber target | `lumber-target-production.test.ts`, `lumber-target-cross-system.test.ts`, D41 tests | Lumber multi-ending smoke | GREEN |
| D35 | normal lodging enables explicit private-space capability; forced Night wins | housing/Night authored conditions | current housing + D42 private-space seeds | D42 Night tests, relationship Night tests, `night-flow.test.ts` | Night/housing cross-domain smoke | GREEN |

---

# 5. Activity / Night / Palace content D36–D45

| Lock | Invariant | Owner | Accepted producer/source | Focused tests | Final gate | Status |
| --- | --- | --- | --- | --- | --- | --- |
| D36 | 4-region Activity, entry 2 Energy, FT6, no XP, Camp max2, Palace firewall | Activity core/regions/Camp | regions through v15 + Camp v19 | `activity.test.ts`, region tests, Camp tests, reload tests | Activity cumulative focused gate | FINAL-UNION PENDING |
| D37 | minimum Night authored completeness; forced > Palace > voluntary | Night content/flow | blueprint / D42 producer | `night-content-gap-v10.test.ts`, `night-flow.test.ts`, career Night suites | final Night/content parity | GREEN |
| D38 | 3 standalone Activity endings + 3 bounded Specialists | D38 endings + Strong Meta + authored tags | v16/v17/v26/v27 | `activity-ending-family-v16.test.ts`, `activity-d38-strong-meta-v26.test.ts`, tag-mapping QA | Activity final assembly | FINAL-UNION PENDING |
| D39 | Palace non-True rewards: Steady Practice, Formal Introduction, Source Method | Strong Meta D39 + ending bindings + authored consumers | v20 `b5ab23a...` | `palace-d39-reward-producer-v20.test.ts` for runtime | Palace v35 consumer gate | **GAP for two live consumers** |
| D40 | 16 advanced endings Guard/Merchant/Artist/Assassin/Prostitute | definitions/packs/Strong Meta/migration | merged D40 producer | `d40-advanced-endings-tranche-b-v11.test.ts` | v37 + final migration | GREEN |
| D41 | 14 advanced endings Lumber/Satyr/Farm/Tavern/Hunter | definitions/packs/Strong Meta/migration | merged D41 producer | `advanced-endings-tranche-a-v11.test.ts` | v37 + final migration | GREEN |
| D42 | 12 exact Night surfaces | Night packs/localization/presentation | `chat4/night-content-gap-producer-v10@9305d1d...` | `night-content-gap-v10.test.ts` + exact-main CI already green | regression after later assemblies | GREEN / must preserve |
| D43 | Palace 1 duty/day, support/day, Energy1, wage35..55, max15 | Palace engine/state | v15/v18 + D43 authority | `palace-rich6-runtime-v15.test.ts` | Palace v35 gate | FINAL-UNION PENDING |
| D44 | hidden work cost/stat/wage cap140; Takeover exact thresholds, 10 paid lessons | Secret Debt engine/content | v12 + D44 lock | `secret-debt-full-route-v12.test.ts` | Secret Debt assembly gate | FINAL-UNION PENDING |
| D45 | Palace Concordance/Threshold Archive; human Custodian; 12x91 proof; Return Home explicit | Palace packs/localization/UI | v18/v19 | `palace-prince-narrative-producer-v18.test.ts`, renderer, v19 prose test | Palace v35 gate | FINAL-UNION PENDING |

---

# 6. Release-balance/content locks D46–D51

| Lock | Invariant | Owner | Accepted producer/source | Focused tests | Final gate | Status |
| --- | --- | --- | --- | --- | --- | --- |
| D46 | fresh Lust5; money600; Energy3; wages 35/37; ordinary cap120; lodging stable | freshSave + ordinary wage + definitions | `chat4/economy-start-balance-producer-v14@a0c5f85...` | `economy-start-balance-v14.test.ts` + ordinary tests | v30/v31/v32 career closure gate | FINAL-UNION PENDING |
| D47 | exact ten Hard Work package mapping; Prostitute Lust+5 | `hardWorkMeta.ts` + package catalog | `chat5/hard-work-bonus-mapping-producer-v13@252dc26...` | `hard-work-bonus-mapping-v13.test.ts` + catalog tests | v30 migration + v31 career smoke | FINAL-UNION PENDING |
| D48 | minimum Palace media target; neutral fallbacks allowed | presentation registry/assets/localization | v19 + D48 production plan | `palace-final-prose-media-v19.test.ts`, source/a11y parity | Palace v35 presentation gate | GREEN as fallback policy / final union pending |
| D49 | reveal timing; unresolved displacement cause; successor world real | Palace authored copy | `macro-mystery-lore-authority-v21@d4313ea...` + v19 | v18/v19 narrative tests | v35 lore gate | FINAL-UNION PENDING |
| D50 | minimum new non-Palace art count 0; fix mappings/fallbacks instead | global presentation registry | `global-presentation-mapping-producer-v23@f25069c...` | exact-head focused QA 36/36; source/a11y parity tests | global presentation closure | GREEN candidate / final union pending |
| D51 | Street -1 + bound Night -1 provenance pair floor2 only; unrelated later penalties still apply | start-day modifier provenance | `chat3/secret-debt-activity-energy-compat-producer-v20@79a868b...` | focused exact-head QA 58/58; D51 compatibility test | Secret Debt+D51 current Chat 2 tranche | FINAL-UNION PENDING |

---

# 7. Ending-family traceability

| Family | Definition owner | Commit owner | Reward owner | Exact tests | Coverage |
| --- | --- | --- | --- | --- | --- |
| 10 Hard Work | current definitions | central engine | Hard Work Meta | ordinary lifecycle parity all ten | GREEN |
| 14 D41 advanced | D41 definitions/packs | central engine | D41 Meta/Strong Meta | D41 v11 | GREEN |
| 16 D40 advanced | D40 definitions/packs | central engine | D40 Meta/Strong Meta | D40 v11 | GREEN |
| 3 Secret Debt | v12 definitions | central engine | D30/D32 | v12 route test + ending-meta | FINAL-UNION PENDING |
| 3 Activity | D38 v16/v17 | central engine | canonical D38 v26 | v16 + v26 | FINAL-UNION PENDING |
| 4 Palace | v18/v19 | central engine | D39 v20 / D24 | v15/v18/v20 | FINAL-UNION PENDING |
| guild/scholar | current legacy definitions | `accept -> commit -> complete` | legacy unlock | synthetic compatibility in ending-meta | **GAP: exact IDs** |

---

# 8. Save/migration traceability

## Central schema

Current target schema:

**6**

Main ownership:

- `schema.ts`;
- `engine.ts::parseSave/migration`;
- subsystem default/migration helpers;
- transaction proof.

Executable:

- `migration.test.ts`;
- `ending-meta.test.ts`;
- `qa-one-save-state-drift-sentinel-v2.test.ts`;
- subsystem reload tests.

## Final 1.0 migration gate

The already-authored final closure plan requires full assembled validation across:

- old schemas;
- current schema6;
- ending ID retirements;
- Hard Work package application guards;
- Strong Meta ownership/snapshot;
- Secret Debt;
- Activity Camp;
- D39/D38 runtime defaults;
- presentation/localization compatibility.

Status:

**FINAL-UNION PENDING**

This is not a missing test-design problem; it cannot be final-executed until all production tranches are assembled.

---

# 9. Executable-coverage gap register

## G1 — Formal Introduction live authored consumer

Product lock:
D39.

Runtime tests:
present.

Live content test:
**absent because live consumer is absent**.

Severity:
release blocker for Court Power reward usability.

Required final regression:

```text
owned + selected Formal Introduction
+ legal ordinary career
+ >=1 current-life shift
+ exact opted-in professional relationship event
-> option visible
-> exact first professional transition
-> one use consumed
-> reload cannot duplicate
```

## G2 — Source Method live authored consumer

Product lock:
D39.

Ownership/snapshot tests:
present.

Live content test:
**absent because live consumer is absent**.

Severity:
release blocker for Inner Truth reward player-facing value.

Required final regression:

```text
earned in prior life
-> later run snapshot contains knowledge
-> already-legal authored scene exposes info-only branch
-> no mechanical progression mutation
-> same earning life does not gain branch retroactively
```

## G3 — exact `guild-life` / `scholar-life` compatibility lifecycle

Central compatibility test:
present with synthetic legacy ending.

Exact stable-ID test:
not identified.

Severity:
small regression-coverage gap, not a known behavior failure.

Required minimal test:

for each exact ID:

- make eligible;
- verify active/not auto-ended;
- explicit `accept`;
- verify one RunResult/legacy reward;
- reload;
- verify no duplication.

---

# 10. Rules with executable test but final-union execution still pending

These should not be mislabeled as uncovered.

They include:

- Secret Debt v12;
- D51;
- Activity Camp;
- D38 canonical Strong Meta wiring;
- Palace v18/v19/v20;
- D46;
- D47;
- legacy lumber retirement;
- final presentation/localization union.

Each has focused producer/QA evidence, but selective composition may create shared-file drift.

Their release status becomes green only after tests run on the actual final assembled head.

---

# 11. Final regression gate by domain

## Build/catalog

```text
npm ci
npm run typecheck
npm run validate
npm run build
```

## Character/economy/ordinary

- D46 test;
- D47 test;
- ordinary seasonal tradeoff;
- ten-career Hard Work lifecycle;
- D40/D41 advanced suites.

## School

- School production firewall;
- School save/localization;
- D20 Lust;
- Night Study;
- key School-to-career publishers.

## Night

- Night flow;
- D42 Night;
- private-space/housing;
- Secret Debt forced precedence.

## Secret Debt / D51

- full-route v12;
- D51 compatibility;
- separation;
- migration.

## Activity

- all four region producer suites;
- option reload;
- Camp persistence;
- D38 ending;
- D38 Strong Meta;
- authored-tag mapping.

## Palace

- D23;
- v15 runtime;
- v16 UI;
- v18 Prince;
- v19 prose/presentation;
- D39 v20;
- v33 consumer-gap assertions;
- v34 save/reload cases.

## Endings/meta

- ending-meta;
- v37 family roster;
- generic exact-ID compatibility test to be added/located.

## Presentation/localization

- source integrity;
- ending parity;
- locale accessibility parity;
- global D50 mapping;
- final localization closure.

## Save

- migration;
- one-save drift sentinel;
- final assembled multi-system matrix.

---

# 12. Release stop conditions from traceability

Do not call 1.0 Product-locked if:

- any D1–D51 runtime/content invariant is silently dropped during selective assembly;
- a producer-focused test exists but is not run on the final union where files overlap;
- a Strong Meta registry merge removes accepted IDs to satisfy stale counts;
- schema6 is downgraded;
- D42 is overwritten by later localization/presentation;
- Secret Debt forced Night loses precedence;
- Activity Camp bypasses forced Night;
- Palace access becomes permanent;
- D16 explicit commit is bypassed;
- D46/D47 rewrite existing saves;
- retired `lumber-stay` returns live;
- Formal Introduction remains without live consumer;
- Source Method remains without live consumer;
- generic compatibility endings remain untested by exact ID at final closure unless an equivalent later test is identified.

---

# 13. Traceability disposition

The final target is well-covered structurally.

The important distinction is:

```text
producer test exists
!=
final assembled invariant proven
```

Most remaining domains are **FINAL-UNION PENDING**, not untested.

True executable gaps identified by this audit are narrow and explicit:

1. Formal Introduction live consumer;
2. Source Method live consumer;
3. exact-ID guild-life/scholar-life compatibility regression.

Governance-only D9/D13 intentionally have no runtime executable test.

No additional Product decision is required to close G1/G2: the accepted D39 rules already define the consumer constraints. What is missing is exact authored mapping/content plus executable QA.

**v38 COMPLETE**

**BUNDLE_COMPLETE — READY_FOR_LEADER_REVIEW**
