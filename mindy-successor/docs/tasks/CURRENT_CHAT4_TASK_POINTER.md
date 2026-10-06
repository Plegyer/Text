# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — SECRET DEBT LOCALIZATION QA RETRY v24**
Owner: Chat 4

Previous v23 QA was blocked by runner infrastructure / shell setup, not by a producer failure.

Frozen producer:
`chat6/secret-debt-ending-localization-producer-v27@b6cc4ca6990936f4d801004806b25e4d920f9abf`

Frozen mechanics adjacency source:
`chat4/secret-debt-full-route-producer-v12@10a2ecebf02ce64bdaf54d74dbbb66d6bae6e59e`

New branch:
`chat4/qa-secret-debt-localization-v24`

Task:
repair the QA workflow only and rerun exact-source executable verification.

Important runner fix:
- use Windows PowerShell available on HOME-PC;
- do not require `pwsh` if it is unavailable.

Required executable proof:
A. exact v27 checkout:
- exact SHA guard;
- production firewall;
- npm ci;
- typecheck;
- validate;
- build;
- v27 localization focused test;
- localization/runtime-key adjacency tests.

B. exact v12 checkout:
- Secret Debt v12 route suite;
- ordinary Prostitute separation suite.

Do not mutate frozen v27 or v12.
No full CI.

Deliver:
`mindy-successor/docs/tasks/CHAT4_SECRET_DEBT_LOCALIZATION_EXACT_HEAD_QA_v24.md`

If green, report:
`READY_FOR_CHAT2_CONTENT_ASSEMBLY`.
