# Chat 2 — Stage 2 Palace v18 Assembly v68

Status: **RECOVERY v69 ACTIVE — CUMULATIVE v15 -> v16 -> v18 REQUIRED**
Owner: Chat 2 / sole current-main production assembly + full-CI lane

The original v68 task incorrectly assumed the Palace v15/v16 base already existed on post-Stage1 main.

That assumption is false.

Authoritative recovery:

`CHAT2_STAGE2_PALACE_BASE_RECONSTRUCTION_v69.md`

Continue on the same branch:

`chat2/assembly-palace-d39-d48-current-main-v68`

Do not reset it and do not create a replacement branch.

Accepted cumulative authorities:

- v15 runtime/base: `chat6/palace-rich6-runtime-producer-v15@40623a9de8b5a11ac9493b865c9f3fadd0435e1c`
- v16 UI: `chat6/palace-player-facing-ui-v16@65b9e668ff7112c86681905d62f723b6cf95cec0`
- v18 Prince/D45: `chat6/palace-prince-narrative-producer-v18@67f948d185883d8e706dad522e5010bff8e2bd48`

Required order:

`v15 semantic reconstruction -> v16 UI union -> v18 delta`

Whole-file replacement of diverged shared owners remains forbidden.

Known outcome-finalize capability repair remains deferred to Chat4.

Stop at:

`PALACE_V18_READY_FOR_CHAT4_REPAIR`

Do not continue to v19/D39/Strong Meta UI/D48.
