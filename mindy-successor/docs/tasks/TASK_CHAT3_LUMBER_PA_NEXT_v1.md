# TASK CHAT 3 — Lumber Product Acceptance Continuation v1

Status: ACTIVE / CONTINUOUS.
Base: continuation of `chat3/lumber-live-slice`.
Rule: PR #16 files are frozen for Lead review; next work goes to NEW files only.

Locked constraints:
- Hard Work eligibility = only 50 completed Lumber shifts;
- no milestone/relationship/season/Forest prerequisite for Hard Work;
- A5 boundary = `activityResult`;
- A6 Meta reward identifier = exactly `hardWork:lumber`.

## Queue item 1 — Lumber Night/Foreman acceptance fixture

Create new isolated fixture + test files for the Lumber/Foreman Night path required by Product Acceptance.

Allowed new files:
- `prior-work/astra/prototype-m3.2/content/packs/lumber-target/lumber-night-acceptance.pack.json`
- `prior-work/astra/prototype-m3.2/tests/lumber-night-acceptance.test.ts`
- optional docs under `docs/lumber-prep/`

Requirements:
- relationship progression is professional/non-romance unless existing locked docs say otherwise;
- reactive relationship scenes cost 0 daytime Energy;
- voluntary Night action uses Night slot, not daytime Energy;
- paid lodging remains exactly-once;
- save/reload after lodging or pending Night scene cannot duplicate payment/progress;
- do not alter Hard Work conditions.

## Queue item 2 — Lumber Product Acceptance fixture manifest

Create a NEW manifest file mapping PA-relevant Lumber IDs to the current target fixture IDs:
- Work;
- milestone;
- Foreman relationship;
- Forest Activity + return;
- Hard Work ending;
- one complex Lumber ending;
- Night hook;
- semantic presentation IDs where already defined.

No runner changes yet. Do not edit Chat 4 harness files.

Forbidden:
- existing PR #16 files;
- shared engine/schema/content loader;
- Chat 2 presentation runtime files;
- Chat 4 QA files.

Acceptance: all new fixtures are schema-valid and isolated; no locked decision is reopened.
