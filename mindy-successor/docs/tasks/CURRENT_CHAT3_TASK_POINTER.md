# CURRENT CHAT3 TASK POINTER

Status: **ARTIST C3-216 FINAL HEAD HELD — CI INFRA BLOCKED / ASSASSIN PREP MAY CONTINUE**
Owner: Chat 3 / World + Career Content Bundles

Artist priority:
- PR #229
- branch `chat3/artist-geisha-live-authored-v19`
- exact current Artist head `75664819e824187ea23531e39f6cf5cd952b1047`
- exact base runtime #234 `955f4accf7e25c42e0384ddb9f76e5612f41dd00`
- required workflow #1010 / id `36987374078`: FAILURE **before runner steps**
- job steps = `[]`; no validator/build/test command executed.

Do **not** rewrite or move the Artist head because of an empty-run infrastructure failure.

When one required exact-head workflow actually executes on the held Artist head and succeeds:
1. update #229 to the exact frozen runtime-based C3-216 evidence;
2. mark non-draft / **CANDIDATE_FROZEN / READY FOR CHAT 4 QA**;
3. hand to C4-170;
4. keep the frozen head immutable.

No-idle while CI infrastructure is unavailable:
- continue safe Assassin authored prep only on separate PR #236 / branch `chat3/assassin-authored-prep-v20`;
- queue `TASK_CHAT3_CONTENT_QUEUE_v20.md`;
- every non-shipped Assassin consumer remains `PENDING_RUNTIME_ID`.

Artist finalization preempts Assassin prep as soon as executable CI returns.
