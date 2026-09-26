# PA Post-PR22 Row Reclassification v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Authoritative baseline: merged `main` @ `0450d46eb29c2551c4ecf55f994e0f271e82e3c7`  
PR22 merge commit: `011572ef1335deda5ac33120c3a7ea7f9849dbbf`

## Classification rules

- **SHIPPED_PASS** — current merged main has a natural production path for the row and executable evidence does not depend on fabricated product state.
- **ACCELERATOR_EVIDENCE_ONLY** — the real runtime boundary is exercised, but the ordered product path uses explicit threshold/item/state seeding.
- **OPEN_AUTHORING_BLOCKED** — runtime infrastructure is sufficient or largely sufficient, but required product content/decision is not authored.
- **NOT_YET_PROVEN** — potentially shipped but insufficient current evidence.

Seeded inventory is not counted as natural item acquisition.

## PA00–PA26

| PA | Post-PR22 status | Merged-main basis |
|---|---|---|
| PA00 | **SHIPPED_PASS** | Fresh save/parser baseline remains covered by current core/harness tests. |
| PA01 | **SHIPPED_PASS** | Character creation completion remains shipped and covered. |
| PA02 | **SHIPPED_PASS** | Real `lumber.shift` initializes target Lumber context. |
| PA03 | **SHIPPED_PASS** | Real target shift charges 1 Energy and increments typed `completed_shifts`. |
| PA04 | **SHIPPED_PASS** | Four seasonal Lumber variants remain production-executable. |
| PA05 | **SHIPPED_PASS** | First shift opens `lumber.career-first-shift`; pending state survives reload. |
| PA06 | **SHIPPED_PASS** | Foreman professional route executes reactively with no extra daytime Energy. |
| PA07 | **OPEN_AUTHORING_BLOCKED** | Paid School progression is real; required authored School milestone/public result is still absent. |
| PA08 | **OPEN_AUTHORING_BLOCKED** | Lumber listener exists; authoritative School provider for management/accounting fact is still absent. |
| PA09 | **OPEN_AUTHORING_BLOCKED** | Generic inventory capability runtime is shipped, but no production acquisition source/final policy for `old_boundary_token` exists. |
| PA10 | **SHIPPED_PASS** | Explicit `endDay` NightFlow remains shipped. |
| PA11 | **SHIPPED_PASS** | Normal lodging payment/reload exactly-once remains shipped. |
| PA12 | **SHIPPED_PASS** | Professional Foreman Night route remains shipped. |
| PA13 | **SHIPPED_PASS** | Night completion advances calendar once without duplicate lodging charge. |
| PA14 | **SHIPPED_PASS** | PR22 makes Forest generally enterable for 2 Energy; no item accelerator required. |
| PA15 | **SHIPPED_PASS** | Logging-road route gives a naturally reachable active Activity save/reload path. |
| PA16 | **OPEN_AUTHORING_BLOCKED** | Two authored routes + counter adapter do not satisfy required 3 routes / 3 challenge families / seasonal depth. |
| PA17 | **ACCELERATOR_EVIDENCE_ONLY** | Capability-aware action-space is shipped; current evidence seeds `old_boundary_token` directly because PA09 acquisition is not authored. |
| PA18 | **SHIPPED_PASS** | Natural logging-road success reaches the real ActivityResult -> Lumber continuation boundary. |
| PA19 | **SHIPPED_PASS** | Escape is naturally available and distinct from success. |
| PA20 | **SHIPPED_PASS** | Natural logging-road success can resolve the shipped Lumber continuation. |
| PA21 | **ACCELERATOR_EVIDENCE_ONLY** | Simultaneous Hard Work + complex Lumber ending uses prepared pre-threshold/complex-route state. |
| PA22 | **ACCELERATOR_EVIDENCE_ONLY** | Continued play while eligible is real, but source eligibility state is prepared. |
| PA23 | **ACCELERATOR_EVIDENCE_ONLY** | Real commit command, after prepared eligibility state. |
| PA24 | **ACCELERATOR_EVIDENCE_ONLY** | Real completion/RunResult, after prepared eligibility state. |
| PA25 | **ACCELERATOR_EVIDENCE_ONLY** | Real exactly-once reward/reload, after prepared eligibility state. |
| PA26 | **ACCELERATOR_EVIDENCE_ONLY** | Real New Run Meta effect, after prepared ending path. |

## Totals

- **SHIPPED_PASS:** 16
- **ACCELERATOR_EVIDENCE_ONLY:** 7
- **OPEN_AUTHORING_BLOCKED:** 4
- **NOT_YET_PROVEN:** 0

## PA09 — why it remains open

PR22 ships the generic mechanism:

```text
owned declared item
-> item capability
-> capability-gated Activity option
```

It does not ship:

- a normal source for `old_boundary_token`;
- when the player obtains it;
- final retain/consume semantics.

Therefore direct:

`inventory.old_boundary_token=1`

is a QA accelerator.

It cannot convert PA09 to `SHIPPED_PASS`.

## PA14 / PA15 / PA18 / PA19 / PA20 — why they are now direct

PR22 changes Forest topology:

```text
enter Forest
-> choose logging road
-> advance
```

requires no special item.

Thus the ordinary path can naturally prove:

- 2-Energy Activity entry;
- active Activity save/reload;
- success;
- escape;
- post-Activity Lumber continuation.

The old PR21 capability/worldFact accelerator is no longer necessary for these rows.

## PA17 — runtime closed, ordered product path still open

The runtime mechanism is genuinely shipped:

Without `enter_old_boundary` capability:

- old-boundary route absent.

With a real provider item in inventory:

- old-boundary route visible.

That is a real item-dependent action-space difference.

But until PA09 provides a normal acquisition path, the current PA17 test must seed inventory.

Therefore the correct Product Acceptance classification remains:

**ACCELERATOR_EVIDENCE_ONLY**

rather than `SHIPPED_PASS`.

## PA16 — PR22 does not close Forest depth

Current merged Forest authors two route options:

- logging road;
- old boundary.

The accepted Product Acceptance depth still calls for:

- three route contexts;
- three challenge families;
- a seasonal difference.

Generic options, route persistence and item capability are infrastructure.

They do not fabricate the missing authored content.

## PA21–PA26 — threshold acceleration remains acceptable but explicit

The Hard Work rule is still exactly:

`completed_shifts >= 50`

with reward:

`hardWork:lumber`.

Tests may prepare:

`completed_shifts=49`

to compress repetition if the real 50th `lumber.shift` is executed and eligibility is engine-computed.

However PA21 also needs simultaneous complex-ending eligibility. Until the fully authored complex Forest route is naturally demonstrated, the current PA21–PA26 chain remains accelerator-bounded.

## Locked invariant after PR22

PR22 did not add any item, route or capability prerequisite to:

`ending.lumber.hard-work`.

Its only eligibility condition remains the 50 completed Lumber shifts.

No production runtime/UI/content file was modified by Chat 4.
