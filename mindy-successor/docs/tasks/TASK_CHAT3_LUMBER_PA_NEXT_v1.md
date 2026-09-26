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


## Queue item 3 — Lumber save/reload checkpoint suite

Create NEW test file only:
- `prior-work/astra/prototype-m3.2/tests/lumber-pa-reload-checkpoints.test.ts`

Use the existing Lumber target fixtures from this branch and prove save/reload stability at meaningful Product Acceptance boundaries:
- after paid/ordinary shift result;
- with pending career/Foreman scene;
- after lodging payment / before Night choice where applicable;
- inside Forest Activity;
- after Activity success continuation;
- after Hard Work commit;
- after Hard Work completion.

No duplicated money/Energy/progress/reward on reload.

## Queue item 4 — Lumber negative-path acceptance suite

Create NEW test file only:
- `prior-work/astra/prototype-m3.2/tests/lumber-negative-paths.test.ts`

Prove:
- 49 completed shifts never unlock Hard Work;
- exactly 50 does, even without milestone/relationship/season/Forest state;
- Forest escape/failure do not grant success continuation facts;
- repeated ending completion cannot duplicate `hardWork:lumber`;
- professional Foreman path does not silently require romance state;
- invalid item capability cannot enter Forest Activity.

Do not edit existing PR #16 files or shared runtime.


## Lead integration correction — presentation identity

For all new PA/checkpoint work:
- semantic presentation IDs use the merged slash taxonomy, never dotted media IDs;
- examples: `job/lumber/shift/spring/default`, `job/lumber/event/lumber-career-first-shift/default`, `ending/lumber/hard-work`;
- Lumber career events must resolve through `sourceDomain: "lumber"`;
- Foreman relationship events must resolve through `sourceDomain: "lumber.foreman"`;
- media asset IDs such as `job.lumber.event.*` remain asset IDs only and must not be treated as presentation IDs.
