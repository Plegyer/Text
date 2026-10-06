# Chat 4 — Secret Debt Localization Exact-Head QA v23

Status: **EXECUTABLE_QA_BLOCKED — SELF-HOSTED RUNNER SHUTDOWN**  
Owner: Chat 4  
QA branch: `chat4/qa-secret-debt-localization-v23`

Frozen producer under verification:

`chat6/secret-debt-ending-localization-producer-v27@b6cc4ca6990936f4d801004806b25e4d920f9abf`

Frozen Secret Debt mechanics authority used for adjacency:

`chat4/secret-debt-full-route-producer-v12@10a2ecebf02ce64bdaf54d74dbbb66d6bae6e59e`

No producer mutation.  
No full CI.

## QA workflow

Workflow:

`.github/workflows/chat4-secret-debt-localization-exact-head-qa-v23.yml`

QA workflow commit:

`3a6e9539f0b6bbbc6090ef64bc9dc22b16d61bc3`

Run:

`37449165768`

The workflow is deliberately split into two exact-source jobs.

### Job A — exact-head localization

Job ID:

`112221222807`

Explicit checkout:

`b6cc4ca6990936f4d801004806b25e4d920f9abf`

Required steps:

- exact SHA guard;
- localization-only production firewall;
- `npm ci`;
- `npm run typecheck`;
- `npm run validate`;
- `npm run build`;
- `secret-debt-ending-localization-producer-v27.test.ts`;
- localization loader/runtime-key adjacency:
  - `localization.test.ts`
  - `ending-action-localization-production.test.ts`
  - `journal-outcome-localization.test.ts`
  - `generic-labels-localization-production-v1.test.ts`

Current state at this snapshot:

**QUEUED — not executed.**

### Job B — frozen v12 mechanics adjacency

Job ID:

`112221222390`

Explicit checkout:

`10a2ecebf02ce64bdaf54d74dbbb66d6bae6e59e`

Required focused route tests:

- `secret-debt-full-route-v12.test.ts`;
- `chat3-secret-debt-separation-v2.test.ts`.

Observed result:

**CANCELLED during Set up job before checkout/tests.**

Runner log states:

`The runner has received a shutdown signal.`

and then:

`The operation was canceled.`

Therefore this is infrastructure cancellation, not a test failure.

## Static exact-head production firewall

Git comparison:

base / v27 Leader seed:

`24b7bd0f7e6d4b06f606e5983b408e606d6704f2`

to frozen producer:

`b6cc4ca6990936f4d801004806b25e4d920f9abf`

Exact changed files:

1. `mindy-successor/docs/tasks/CHAT6_SECRET_DEBT_ENDING_LOCALIZATION_PRODUCER_v27.md`
2. `mindy-successor/prior-work/astra/prototype-m3.2/content/localization.json`
3. `mindy-successor/prior-work/astra/prototype-m3.2/tests/secret-debt-ending-localization-producer-v27.test.ts`

No changes to:

- `src/`;
- `content/definitions.json`;
- `content/packs/`;
- `content/presentation.json`;
- Secret Debt runtime;
- reward IDs;
- gates;
- economy;
- Palace.

This statically confirms the v27 producer is a localization/test/documentation delta only.

## Why v12 mechanics are a separate exact-source job

The frozen v27 localization branch intentionally does not contain the v12 Secret Debt runtime or `secret-debt-full-route-v12.test.ts`.

It is therefore incorrect to pretend the v12 route suite can be executed on the v27 checkout without overlaying unrelated production mechanics.

The QA workflow instead:

1. proves v27 exact-head localization/build/runtime-key behavior on the exact v27 SHA;
2. proves the frozen v12 route mechanics separately on the exact v12 SHA;
3. verifies v27 changed no runtime/mechanics files.

This preserves source-of-truth boundaries and does not mutate either frozen producer.

## Release disposition

Do **not** report `READY_FOR_CHAT2_CONTENT_ASSEMBLY` yet.

Executable evidence is incomplete solely because the self-hosted runner shut down before the required jobs could run.

Required closure:

- Job A must complete green;
- Job B must complete green;
- exact run/job evidence must then be recorded here.

Until then:

**BLOCKED_BY_RUNNER_INFRA — NOT A PRODUCER FAILURE**
