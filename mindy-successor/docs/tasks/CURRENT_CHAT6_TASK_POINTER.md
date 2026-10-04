# CURRENT CHAT6 TASK POINTER

Status: **ACTIVE — GLOBAL PRESENTATION MAPPING EXACT-HEAD QA v24**
Owner: Chat 6

Frozen producer:
`chat6/global-presentation-mapping-producer-v23@f25069c369c449ce0efbfe57acf877f950b1dfea`

v23 scope:
93 additive presentation mappings only.

Do not mutate the frozen producer.

QA branch:
`chat6/qa-global-presentation-mapping-v24`

Task:
run executable exact-head focused verification of v23.

The workflow must explicitly checkout:
`f25069c369c449ce0efbfe57acf877f950b1dfea`

Required checks:
- typecheck;
- validate;
- build;
- `global-presentation-mapping-producer-v23.test.ts`;
- presentation/source-inventory integrity tests;
- accessibility RU/EN parity tests;
- semantic presentation ID validation;
- Palace presentation firewall;
- no missing asset paths.

No full CI.
No production behavior changes on the frozen producer.

If green, document exact workflow/run/job IDs and report:
`READY_FOR_CHAT2_CONTENT_ASSEMBLY`.
