# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — GLOBAL CAPTION CLOSURE EXACT-HEAD QA v25**
Owner: Chat 4

Previous Secret Debt localization QA v24 is green and accepted.

Producer under verification:
`chat6/global-caption-closure-producer-v29@6b56569e6a5dfff69af646c4ab5bd19c56632b60`

Frozen implementation head:
`e9f0805068a8144a3b3cebaf07803b7090732bfd`

QA branch:
`chat4/qa-global-caption-closure-v25`

Task:
run executable exact-head verification of the two-key global caption closure.

Workflow must explicitly checkout:
`e9f0805068a8144a3b3cebaf07803b7090732bfd`

Required:
- exact SHA guard;
- production firewall;
- npm ci;
- typecheck;
- validate;
- build;
- `global-caption-closure-producer-v29.test.ts`;
- localization/presentation parity adjacency.

No full CI.
Do not mutate the frozen producer.

If green, document run/job evidence and report:
`READY_FOR_CHAT2_CONTENT_ASSEMBLY`.
