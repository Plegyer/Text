# PR21 Product Acceptance Latest-Head Recheck v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Worker branch: `chat4/activation-ci-gate-next`  
PR: #21 — `lead/product-acceptance-gate-v1`  
Latest reviewed PR head: `58dc20c6c277cb3b3142b5611db6bece83832d34`  
Base main at PR creation/review: `d255ded647b97087892d80a755496da6282be0d1`

## Executive result

PR21 is an honest Product Acceptance evidence gate rather than a production-content patch.

Changed files are limited to:

- `docs/qa-prep/PRODUCT_ACCEPTANCE_GATE_RESULT_v1.md`
- `tests/product-acceptance-harness.test.ts`
- `tests/product-acceptance-shipped-v1.test.ts`

The harness now uses the first-class:

```ts
{type:'schoolLesson', id:<SchoolCourseId>}
```

command.

The shipped evidence test executes against the production catalog from `tests/helpers.ts`; it does not construct the old isolated Lumber target catalog.

The Forest capability boundary is explicitly accelerated by direct insertion of:

`lumber.capability.enter-old-boundary`

and the test first proves normal shipped entry is blocked without it. This is valid A5/runtime evidence only and is not counted as PA09 or PA17 completion.

The School public-fact gap remains explicit: a paid Arcana lesson proves that:

`lumber.school.management-ready`

is still absent.

Hard Work remains exactly:

- `ending.lumber.hard-work`
- only condition: `careerCounter(lumber, completed_shifts) >= 50`
- exact reward ID: `hardWork:lumber`.

## CI result — exact current evidence

The temporary `Product Acceptance Gate Check` workflow ran successfully on commit:

`0cfe9980e9247a32f1bb778cd822139c50f1df56`

Run:

`36263752828`

The `npm run check` job passed.

Captured log evidence:

- validation: `Content OK: 7 packs, 26 events, 26 actions, 9 endings.`
- build: `Built renderer, content catalog and desktop save validator.`
- tests: **194**
- pass: **194**
- fail: **0**

The latest PR commit `58dc20c...` removes the temporary workflow after that green merge-ref check. Therefore the exact current gate evidence is **194/194**, not 193/193.

The text in `PRODUCT_ACCEPTANCE_GATE_RESULT_v1.md` that says 193/193 is stale by one test relative to the final successful workflow and final commit message.

---

# Required contract checks

## First-class School command

**PASS**

`product-acceptance-harness.test.ts` now declares API:

`schoolLesson`

and its typed command adapter returns:

```ts
{type:'schoolLesson',id:ids.schoolAction as SchoolCourseId}
```

The shipped PA test directly dispatches:

```ts
dispatch(s,{type:'schoolLesson',id:'school.course.arcana'},catalog)
```

It asserts:

- 500 money tuition once;
- 1 current-day Energy once;
- full Arcana stat package;
- `lessons_completed=1`;
- semantic presentation `school/arcana/lesson/default`;
- double reload does not repeat charge/counter.

## Shipped Lumber / Foreman evidence

**PASS**

Production-catalog test directly executes:

`lumber.shift`

and proves:

- 1 Energy;
- typed `completed_shifts`;
- semantic result presentation;
- reactive `lumber.career-first-shift`;
- reload of pending scene;
- `lumber.foreman-notice`;
- professional route;
- no extra Energy for reactive scenes.

Seasonal shipped variants are also executed for spring/summer/autumn/winter.

## Shipped Night evidence

**PASS**

Production-catalog test executes:

- `endDay`;
- `chooseLodging('lodging.normal')`;
- reload after payment;
- `chooseNightChoice('lumber.foreman.night')`;
- pending Foreman Night event;
- reload;
- continuation;
- one calendar advance.

Normal lodging payment is asserted once.

## Shipped Forest evidence

**ACCELERATOR-BOUNDED**

The test first asserts production entry fails without capability.

Then it explicitly performs:

```ts
s.run.progression.worldFacts.push('lumber.capability.enter-old-boundary');
```

This is labeled and visible.

After that accelerator it proves the real shipped Activity definition and A5 runtime:

- 2-Energy entry;
- reload inside Activity;
- internal progress;
- success;
- exact truth world fact;
- exact Lumber continuation;
- zero extra Energy in continuation;
- distinct escape branch.

This is not evidence for production item acquisition or item-driven Activity actions.

## School public fact

**OPEN**

PR21 explicitly verifies after a real paid Arcana lesson:

```ts
worldFacts.includes('lumber.school.management-ready') === false
```

No synthetic School action is used.

Therefore PA07/PA08 authoring gap remains honest.

## Hard Work

**PASS as locked invariant; downstream route evidence uses threshold accelerator**

Static shipped-catalog assertion deep-equals:

```ts
[{
  kind:'careerCounter',
  career:'lumber',
  counter:'completed_shifts',
  op:'gte',
  value:50
}]
```

and reward:

```ts
[{
  kind:'hardWork',
  rewardId:'hardWork:lumber',
  career:'lumber'
}]
```

PA21+ uses a visible pre-threshold accelerator:

- direct career state with `completed_shifts:49`;
- Forest ending facts already present;
- then one real `lumber.shift` crosses 49 -> 50.

The accelerator does not bypass the actual 50th shift or ending command under test.

---

# PA00–PA26 classification

## Legend

- **SHIPPED_PASS** — direct production catalog execution or existing production/core evidence sufficient for this exact row; no fixture-only prerequisite is required.
- **ACCELERATOR_EVIDENCE_ONLY** — the tested runtime boundary is real production behavior, but the ordered product path reaches it only after an explicit direct-state/capability/threshold accelerator.
- **OPEN_AUTHORING_BLOCKED** — the product requirement still requires an authored rule/content/capability that does not exist.
- **NOT_YET_PROVEN** — shipped behavior may exist but PR21 does not contain enough direct evidence for the row.

| PA | Status | PR21 evidence |
|---|---|---|
| PA00 | **SHIPPED_PASS** | Fresh save and parser baseline are part of the current harness/core suite. |
| PA01 | **SHIPPED_PASS** | Creation completion is existing shipped core/UI behavior and remains green in the 194-test gate. |
| PA02 | **SHIPPED_PASS** | First real `lumber.shift` initializes target Lumber career context and Resolver path. |
| PA03 | **SHIPPED_PASS** | Real target shift costs one Energy, increments `completed_shifts`, uses production presentation, and participates in reload-tested flow. |
| PA04 | **SHIPPED_PASS** | PR21 directly executes all four seasonal shipped variants with deterministic media and one-Energy cost. |
| PA05 | **SHIPPED_PASS** | Real first shift opens shipped reactive milestone; pending scene survives reload. |
| PA06 | **SHIPPED_PASS** | Shipped milestone -> Foreman notice -> professional route executes with zero additional daytime Energy. |
| PA07 | **OPEN_AUTHORING_BLOCKED** | Paid School/progress/presentation/reload pass, but required School milestone/public result is not authored. |
| PA08 | **OPEN_AUTHORING_BLOCKED** | Lumber listener exists; authoritative School provider still does not emit `lumber.school.management-ready`. |
| PA09 | **OPEN_AUTHORING_BLOCKED** | Item/capability identity is known, but production acquisition/capability/action-space semantics are not authored/integrated. |
| PA10 | **SHIPPED_PASS** | Explicit shipped `endDay` enters NightFlow. |
| PA11 | **SHIPPED_PASS** | `lodging.normal` payment is exercised against production catalog and survives reload once. |
| PA12 | **SHIPPED_PASS** | Shipped Foreman Night choice/event executes on professional route and survives reload. |
| PA13 | **SHIPPED_PASS** | Resolving Night event closes NightFlow and advances calendar once without recharging lodging. |
| PA14 | **ACCELERATOR_EVIDENCE_ONLY** | Test first proves normal entry is blocked, then directly injects capability fact and proves real shipped 2-Energy entry. |
| PA15 | **ACCELERATOR_EVIDENCE_ONLY** | Real shipped Activity envelope save/reload is proven only after the explicit capability accelerator. |
| PA16 | **OPEN_AUTHORING_BLOCKED** | Current shipped `counter.v1` does not provide required 3 route contexts / 3 challenge families / season depth. |
| PA17 | **OPEN_AUTHORING_BLOCKED** | No item-dependent Activity action/action-space mutation exists. |
| PA18 | **ACCELERATOR_EVIDENCE_ONLY** | Real shipped success/result->Resolver boundary is proven after accelerated entry. |
| PA19 | **ACCELERATOR_EVIDENCE_ONLY** | Real shipped escape branch is distinct, but ordered reachability still inherits missing item acquisition. |
| PA20 | **ACCELERATOR_EVIDENCE_ONLY** | Real Lumber continuation executes, but the ordered route to it still depends on accelerated Forest entry. |
| PA21 | **ACCELERATOR_EVIDENCE_ONLY** | Direct 49-shift + complex-ending-facts state is prepared; one real shift proves simultaneous Hard Work + Forest eligibility. |
| PA22 | **ACCELERATOR_EVIDENCE_ONLY** | From that prepared eligibility state, one more shipped shift proves play remains possible before commitment. |
| PA23 | **ACCELERATOR_EVIDENCE_ONLY** | Explicit Hard Work commitment is real, but source state is the prepared threshold/complex-ending state. |
| PA24 | **ACCELERATOR_EVIDENCE_ONLY** | Real completion creates one RunResult after accelerated route setup. |
| PA25 | **ACCELERATOR_EVIDENCE_ONLY** | Real repeated completion/reload preserves single `hardWork:lumber` result after accelerated route setup. |
| PA26 | **ACCELERATOR_EVIDENCE_ONLY** | Real `newLife` preserves Meta and produces visible Strength/Endurance difference, but route setup is accelerated. |

## Classification totals

- **SHIPPED_PASS:** 12
- **ACCELERATOR_EVIDENCE_ONLY:** 10
- **OPEN_AUTHORING_BLOCKED:** 5
- **NOT_YET_PROVEN:** 0

These totals match the actual PR21 evidence boundary: runtime/integration coverage is broad, but the remaining five authoring gaps prevent a fully natural end-to-end Product Acceptance path.

---

# No-false-green checks from PR21

## Legitimate accelerator

Direct:

```ts
worldFacts.push('lumber.capability.enter-old-boundary')
```

is legitimate only for:

- PA14–PA20 Activity runtime evidence.

It must never promote:

- PA09 item acquisition;
- PA17 item-dependent Activity action.

## Legitimate repetition-threshold accelerator

Direct setup to:

`completed_shifts=49`

is legitimate for proving:

- 49/50 boundary;
- ending eligibility/commit/completion/idempotency.

It does not prove the full 50-shift player journey.

The test still performs the actual 50th `lumber.shift`.

## Non-fabricated School blocker

PR21 does not insert:

`lumber.school.management-ready`

after School.

It asserts its absence.

This correctly preserves PA07/PA08 as open.

## Synthetic School action

Production catalog assertion proves:

`school.lumber-management`

is absent.

No PR21 pass depends on it.

---

# Final PR21 QA disposition

**Production shipped mechanics evidence: GREEN.**

**Current exact successful Product Acceptance workflow evidence: 194/194.**

**Full Product Acceptance Slice: NOT CLOSED.**

Remaining direct blockers are exactly the authoring/product-depth items represented by:

- PA07;
- PA08;
- PA09;
- PA16;
- PA17.

Accelerated PA14–PA26 evidence remains valuable regression evidence but must not be relabeled as a naturally reachable full shipped flow until the upstream blockers close.

No production runtime/UI/content file was modified by Chat 4.
