# CURRENT CHAT2 TASK POINTER — STAGE 4 HANDOFF COMPLETE

**Status: PARKED / NO NEW PRODUCTION WORK ASSIGNED.** Do not resume previous Chat2 conversation. Open a new Chat2 context only when needed; it must first read this pointer and the shared reporting protocol. Merely reading this pointer does not activate any task.

## Current Stage 4 artifact

- Frozen Chat2 assembly branch: `chat2/stage4-d46-d47-legacy-assembly-v1`
- Exact PR head: `5570e867d843186815ebc62c17e858e6a4e1165b`
- Exact production/test source: `f34b9585a7816d5b1235e1683160ce5423b767ba`; PR head adds only the handoff Markdown.
- Base main: `8c376be749579077663e46e719747774c55b64be`
- Draft PR: https://github.com/Plegyer/Text/pull/299
- Detailed worker report **on the worker branch**: `mindy-successor/docs/tasks/CHAT2_STAGE4_D46_D47_LEGACY_PRODUCTION_HANDOFF_2026-10-08.md`
- Stop marker: `STAGE4_D46_D47_LEGACY_PRODUCTION_READY_FOR_LEADER`
- **Not QA-accepted, not merged**, and the worker has not run npm/typecheck/validate/build/tests. Leader 1 owns independent QA and production merge.

## Successor Chat2 behavior

Read `mindy-successor/docs/tasks/WORKER_TO_LEADER_GITHUB_REPORTING_PROTOCOL.md` and `LEADER_STATE.md`; re-query live GitHub for refs. **Do not replay Stage 4 assembly and do not push any changes to PR #299 without a new explicit Leader repair task.** If no concrete production task has been assigned, acknowledge standby in a single line, then stop.

On a new Leader production task: use a new scoped branch, save a complete GitHub handoff file there, reference it in the PR, and send the user **only** `<STOP_MARKER> — <PR link>` or a similarly short blocked status. All details go in GitHub, for Leader 1 to read. Chat2 never owns full CI or merge to main. Only the user can activate this separate Chat2 conversation.
