# WORKER → LEADER: GITHUB HANDOFF PROTOCOL

**Active protocol, 2026-10-08.** Applies to Chat2 and any other future producer/worker chat in `Plegyer/Text`. GitHub is the shared durable message bus; **separate ChatGPT chats cannot directly read one another's conversation or proactively deliver inter-chat messages**. A report is received when Leader 1 explicitly inspects the GitHub PR, branch and handoff path. No real-time delivery or background monitoring is implied.

## Worker start / assignment

1. User manually activates a worker chat. Worker reads this protocol, `CURRENT_CHAT<N>_TASK_POINTER.md` where present, `LEADER_STATE.md`, and any exact named frozen task. Live GitHub SHA outranks old prose.
2. **No assigned production task = STANDBY**, not speculative work. A pointer that says `PARKED` / `READY_FOR_LEADER` is not an instruction to redo the work.
3. Worker creates a scoped production branch from the exact authorized baseline. Never merges to main, never changes another producer's branch, never assigns itself Leader QA/full CI unless explicitly overridden by a later authoritative contract.

## Durable handoff: required GitHub record

At the end of each production task, worker commits **on its own branch** one document:
`mindy-successor/docs/tasks/CHAT<N>_<STAGE>_<TASK>_PRODUCTION_HANDOFF_<DATE>.md`
and opens/updates a Draft PR targeting main (unless task explicitly forbids a PR). Handoff is authoritative, not the worker chat text. The handoff must state:

- Exact branch, base-main SHA, runnable **production/test SHA**, final branch head and whether later commits are docs-only.
- PR URL/number, status (`READY_FOR_LEADER` or `BLOCKED`), scope and actually changed files.
- Owned IDs/semantics, source authorities, collision/semantic-union handling, preservation audits, unresolved blockers.
- Executable command list and **real** run IDs/results if executed; otherwise explicitly `NOT RUN`. Do not invent green.
- Focused test roster and known failure classes; proposed Leader acceptance steps.
- One clear stop marker.

Put the PR link and handoff path in the PR description. If blocked, commit the report with exact blocker and next action; do not silently continue unrelated work.

## Minimal user-facing completion

After the GitHub handoff has been successfully committed, worker sends **at most two short lines**, for example:

`STAGE4_..._READY_FOR_LEADER ✅ — PR #299`
`Доклад: GitHub, docs/tasks/<file>.md. Лидер проверяет; остальные чаты не нужны.`

Do **not** paste the full task description, diff, test roster, explanatory report or repeated paragraphs to the user. In the exceptional case that GitHub commit/PR failed, say `BLOCKED — handoff not published` with the reason, not a false ready marker.

## Leader acceptance

Leader 1 opens the exact PR + branch handoff and checks SHA/diff/run status. Leader performs independent focused QA, exact-source full CI, production merge and official exact-main CI. Only the Leader updates `LEADER_STATE.md`, `CURRENT_LEADER1_CHECKPOINT.md` and the next worker task pointer on main. Worker success markers **do not** imply Stage closure.

Leader tells the user clearly **which worker to wake next**, if any. When all workers are parked and Leader QA is current, say **no worker needs waking**. Treat the worker's full report in GitHub as the handoff; do not require the user to copy it into Leader chat.

## Current worked example

Stage 4 handoff: Draft PR #299 `chat2/stage4-d46-d47-legacy-assembly-v1@5570e867d843186815ebc62c17e858e6a4e1165b`, exact production/test `f34b9585a7816d5b1235e1683160ce5423b767ba`, branch-only report `CHAT2_STAGE4_D46_D47_LEGACY_PRODUCTION_HANDOFF_2026-10-08.md`. It is **READY FOR LEADER QA** but **not executable green and not merged**. Chat2 successor remains parked until needed.
