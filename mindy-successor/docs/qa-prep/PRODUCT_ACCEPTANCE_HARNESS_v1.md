# Product Acceptance Harness v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Branch: `chat4/post-a6-gate`

## Purpose

`tests/product-acceptance-harness.test.ts` is the executable skeleton for the first Lumber Product Acceptance run. It does not declare the product slice passed and it does not create production content.

The harness is parameterized by a future integrated `ProductAcceptanceFixture` that supplies real catalog IDs and optional validated accelerator hooks for repetition-heavy thresholds. The skeleton maps every `PA00`–`PA26` step to current engine command APIs, assertion domains and named save/reload checkpoints.

## Current command mapping

The harness compiles against these current commands:

- `finishCreation`;
- `action(id)`;
- `choice(id)`;
- `endDay`;
- `chooseLodging(id)`;
- `chooseNightChoice(id)`;
- `enterActivity(id)`;
- `activityAction(id)`;
- `commitEnding(id)`;
- `completeEnding`;
- `newLife`.

Resolver execution is implicit at the corresponding state-changing boundaries. Save/reload uses the real `parseSave(JSON.stringify(state), catalog)` path.

## Fixture contract

A product integration fixture must supply IDs for:

- Lumber ordinary Work;
- School action;
- Lumber milestone event;
- Foreman relationship event;
- normal lodging;
- Foreman night choice;
- Forest Activity;
- Forest advance and escape actions;
- item-capability Activity action;
- post-Activity Lumber continuation;
- Lumber Hard Work ending;
- one complex Lumber ending.

These IDs are intentionally not invented by Chat 4. They must come from the integrated production catalog.

Optional accelerator hooks may place a generated, schema-valid state immediately before a repetition-heavy milestone or dual-ending eligibility state. An accelerator may pre-establish already-earned typed state, but the command/reaction being accepted must still be executed through the real engine.

## Executable skeleton checks already present

The test file currently executes four harness-integrity checks:

1. exactly 27 ordered rows exist for `PA00` through `PA26`;
2. mandatory save/reload checkpoints are explicitly named;
3. command adapters type-check against the current engine `Command` API;
4. the checkpoint helper roundtrips a real Save through the current parser.

This makes the harness executable now without falsely claiming unavailable product content.

## Promotion to full product run

When Product Acceptance content is integrated, add one fixture provider and a table runner; do not rewrite the sequence. Each row should execute its mapped command(s), run the state assertions listed in the table, and checkpoint when specified.

The source-of-truth expected flow remains `docs/qa-prep/PRODUCT_ACCEPTANCE_EXECUTION_PLAN_v1.md`. The harness table is the executable mapping layer for that plan.
