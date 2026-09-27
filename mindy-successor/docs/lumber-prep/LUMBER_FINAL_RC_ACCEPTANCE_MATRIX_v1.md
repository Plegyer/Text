# Lumber Final RC Acceptance Matrix v1

Status: final Lumber-facing Product Acceptance classification against merged main after PR #24.

Production baseline:
- PR #20 Product Activation: `9b427d75dc22021cd3373aa7dd3521782e54152d`;
- PR #21 Product Acceptance evidence: `e6c32903516d1ba40b9a3ffbf955d5f04783ac25`;
- PR #22 item-capability / Activity-option closure: `011572ef1335deda5ac33120c3a7ea7f9849dbbf`;
- PR #23 RC QA floor: `e12665ce9063689400d8f39f893378f6f01911f3`;
- PR #24 one-Save RC smoke: `9aa0eaf964735e82b9b964bbdcaf5362c292868a`;\n- PR #25 final technical RC gate: `961208ea995ca034e8dfe896337a38828db52415`.

PR #25 adds no production runtime/content/UI changes; it locks the exact Hard Work contract, inventory-derived capability semantics, schema4 legacy Activity compatibility, real School blocking-scene ordering, and the one-Save RC path in the merged gate.\n\nClassification vocabulary:
- **SHIPPED_GREEN** — merged production behavior is directly executable and the relevant contract is covered by current shipped/RC evidence;
- **RUNTIME_GREEN_AUTHORING_OPEN** — generic runtime support is shipped, but final product authoring is still missing;
- **CONTENT_DEPTH_OPEN** — the core runtime and basic path are shipped, but required authored product depth is incomplete;
- **HUMAN_DECISION_REQUIRED** — a Product/content decision is required before the row can be closed truthfully.

## PA00–PA26

| PA | Final class | Lumber-facing reason |
| --- | --- | --- |
| PA00 | **SHIPPED_GREEN** | Fresh save/catalog/parser baseline is shipped and exercised by the integrated suite. |
| PA01 | **SHIPPED_GREEN** | Character creation and DayHub entry are shipped prerequisites for the one-Save path. |
| PA02 | **SHIPPED_GREEN** | Target `lumber.shift` enters typed Lumber progression through the shipped Resolver path. |
| PA03 | **SHIPPED_GREEN** | Ordinary Lumber shift costs exactly one daytime Energy, increments `completed_shifts`, pays its authored result, and survives reload. |
| PA04 | **SHIPPED_GREEN** | Seasonal/repeatable Lumber shift variants are shipped and keep one-Energy Work semantics. |
| PA05 | **SHIPPED_GREEN** | First shift reactively opens `lumber.career-first-shift`; pending state survives reload. |
| PA06 | **SHIPPED_GREEN** | `continue -> lumber.foreman-notice -> professional` reaches `route-professional` with no romance prerequisite and no extra daytime Energy. |
| PA07 | **HUMAN_DECISION_REQUIRED** | Paid School lessons, typed `lessons_completed`, tuition/Energy, presentation and reload are shipped, but the required management/accounting progression result still has no accepted Product-owned provider/threshold. |
| PA08 | **HUMAN_DECISION_REQUIRED** | Lumber listener exists for `lumber.school.management-ready`; School-owned publication rule/provider/threshold remains a Product decision. |
| PA09 | **HUMAN_DECISION_REQUIRED** | `old_boundary_token -> enter_old_boundary` runtime is shipped, but natural acquisition source/timing and final use policy remain undecided. Seeded inventory is not a full PA09 pass. |
| PA10 | **SHIPPED_GREEN** | Explicit NightFlow begins through shipped `endDay`. |
| PA11 | **SHIPPED_GREEN** | `lodging.normal` payment commits exactly once and survives reload. |
| PA12 | **SHIPPED_GREEN** | `lumber.foreman.night` is shipped for the professional route, consumes the Night slot, and costs no daytime Energy. |
| PA13 | **SHIPPED_GREEN** | Night completion advances calendar once and does not duplicate lodging payment. |
| PA14 | **SHIPPED_GREEN** | `lumber.forest` is naturally enterable for 2 Energy without Old Boundary Token; logging road is an unconditional normal route. |
| PA15 | **SHIPPED_GREEN** | Activity envelope/route/checkpoint state survives save/reload; legacy option-model-0 saves retain `advance/escape`. |
| PA16 | **CONTENT_DEPTH_OPEN** | Runtime and two current route contexts are healthy, but full three-route / three-challenge-family / season-topology content is not authored. |
| PA17 | **RUNTIME_GREEN_AUTHORING_OPEN** | Inventory-derived capabilities and capability-gated Activity options are shipped; natural token acquisition and final retain/consume/use authoring remain OPEN. |
| PA18 | **SHIPPED_GREEN** | Logging-road success closes Activity and emits exact `activityResult(lumber.forest, success, lumber.forest.success)`, immediately opening Lumber continuation. |
| PA19 | **SHIPPED_GREEN** | Escape is distinct from success and does not emit success-only truth/reward state. |
| PA20 | **SHIPPED_GREEN** | `lumber-cross.activity-forest-return` advances Lumber state at zero extra Work Energy and requires no extra shift. |
| PA21 | **SHIPPED_GREEN** | Merged PR24 proves simultaneous Hard Work + Forest ending eligibility in one persisted Save. The setup of `completed_shifts=49` is explicitly a long-threshold accelerator only. |
| PA22 | **SHIPPED_GREEN** | Eligibility remains separate from ending commitment; run stays active before explicit commitment. |
| PA23 | **SHIPPED_GREEN** | Explicit `commitEnding(ending.lumber.hard-work)` is shipped and reload-stable. |
| PA24 | **SHIPPED_GREEN** | Central completion produces one stable RunResult and retry/reload is idempotent. |
| PA25 | **SHIPPED_GREEN** | Exact `hardWork:lumber` is applied once and remains once after reload/retry. |
| PA26 | **SHIPPED_GREEN** | New Run exposes the locked Lumber Meta effect (+3 starting Strength, +3 starting Endurance) and preserves it after reload. |

## Human decisions still required

### PA07 / PA08 — School management/accounting result

Runtime is already green.

Still requires an accepted human/Product decision for:
- School provider/course/track;
- exact `lessons_completed` threshold or alternative accepted milestone/project/exam/certificate;
- exact publication rule for `lumber.school.management-ready`.

Synthetic `school.lumber-management` is not production.

### PA09 — Old Boundary Token acquisition/use

Runtime is already green for typed inventory/capabilities.

Still requires Product decisions for:
- acquisition source;
- timing/requirements;
- retained vs consumed/turned-in;
- repeatability;
- presentation details;
- whether normal gameplay removes the token.

Seeded token inventory is runtime evidence only, never a natural PA09 pass.

## Runtime green, authoring open

### PA17

PR22 already ships:
- `old_boundary_token` item definition;
- `enter_old_boundary` capability;
- capability derivation from actual inventory;
- generic capability-gated Activity options;
- `forest.route.old-boundary` gated by `enter_old_boundary`.

Remaining work is authored acquisition/use policy, not generic runtime.

## Content depth open

### PA16

Required content depth still missing:
- Hunter trail route;
- navigation challenge family;
- physical obstacle challenge family;
- interpretation / ritual anomaly challenge family;
- at least one meaningful seasonal topology/option difference.

Logging road and old-boundary route semantics must remain compatible while this content is added.

## Long-threshold accelerator policy

Merged PR24 sets `completed_shifts=49` only to avoid replaying dozens of ordinary days.

The merged test then proves:
- Hard Work is not eligible at 49;
- one real `lumber.shift` moves 49 -> 50;
- that real shift pays its normal Energy cost;
- eligibility appears at 50;
- commitment/completion/Meta/New Run proceed through normal shipped commands.

Therefore PA21–PA26 are classified `SHIPPED_GREEN` without treating the seeded 49-state as ordinary-play evidence or product authoring.

## Locked Lumber invariants

Hard Work ending:
`ending.lumber.hard-work`

Only condition:
`completed_shifts >= 50`

Exact reward:
`hardWork:lumber`

Forest continuation boundary:
`activityResult(lumber.forest, success, lumber.forest.success)`

No School, Forest, item, relationship, Night, milestone or season prerequisite may be added to Hard Work.
