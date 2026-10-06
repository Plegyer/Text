# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — SECRET DEBT LOCALIZATION EXACT-HEAD QA v23**
Owner: Chat 4

Producer under verification:
`chat6/secret-debt-ending-localization-producer-v27@b6cc4ca6990936f4d801004806b25e4d920f9abf`

QA branch:
`chat4/qa-secret-debt-localization-v23`

Task:
run executable exact-head verification of the frozen v27 Secret Debt localization producer.

Workflow must explicitly checkout:
`b6cc4ca6990936f4d801004806b25e4d920f9abf`

Required checks:
- typecheck;
- validate;
- build;
- `secret-debt-ending-localization-producer-v27.test.ts`;
- Secret Debt v12 focused route tests;
- ending localization loader/runtime-key coverage;
- verify production runtime/mechanics are unchanged.

No full CI.
Do not mutate the frozen v27 producer.

If green, document exact run/job evidence and report:
`READY_FOR_CHAT2_CONTENT_ASSEMBLY`.
