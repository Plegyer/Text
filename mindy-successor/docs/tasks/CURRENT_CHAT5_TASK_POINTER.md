# Current Chat 5 task pointer

Status: ASSIGNED
Owner: Chat 5 / School + Text Localization Content Worker

Mandatory startup:
- `WORKER_CHAT_RECREATION_PROTOCOL_v1.md`
- `ACTIVE_TEAM_OWNERSHIP_MATRIX.md`
- `CANDIDATE_QA_FREEZE_PROTOCOL.md`
- `TASK_CHAT5_SCHOOL_QUEUE_v8.md`
- `TASK_CHAT5_SCHOOL_QUEUE_v9.md`

Current status:
- C5-73 through C5-84 are complete;
- frozen candidate: PR #132 exact head `43ea615581cd8614a32434888fcaaf01b6e116dd`;
- exact-head repository CI #390 is green;
- do not move PR #132 unless QA requests a concrete repair.

Active queue:
- continue automatically with C5-85 through C5-96 from current main.

At each queue boundary:
- re-read current main and this pointer;
- carry forward only new School-owned docs/fixtures/tests absent from main;
- do not create runtime, thresholds, producer facts, curriculum, Save fields or NightFlow mechanics.

Keep technical evidence in Git only. Personal chat output:
- `Задание выполнено`
- `Задания выполнены`

Do not self-assign beyond C5-96.
