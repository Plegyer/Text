# CURRENT CHAT2 TASK POINTER

Status: **ARTIST C2-204 FINAL HEAD HELD — CI INFRA BLOCKED / ASSASSIN PREP MAY CONTINUE**
Owner: Chat 2 / Presentation & Media Worker

Artist priority:
- final PR #237
- branch `chat2/artist-geisha-presentation-v18-final`
- exact current Artist head `ef9cc2df1edaf428ed44c34ba9832ff3a88032b4`
- exact base runtime #234 `955f4accf7e25c42e0384ddb9f76e5612f41dd00`
- required workflow #1007 / id `36987217980`: FAILURE **before runner steps**
- job steps = `[]`; validator/build/tests did not execute
- therefore this is infrastructure evidence, not a code verdict.

Do **not** move the Artist candidate merely to provoke CI. Hold `ef9cc2df...` unchanged unless a real executed workflow exposes a code blocker.

When one required exact-head workflow actually runs on `ef9cc2df...` and succeeds:
1. update #237 with exact run/counts;
2. mark **CANDIDATE_FROZEN / READY FOR CHAT 4 QA**;
3. hand to C4-171;
4. do not move the frozen head afterward.

No-idle while CI infrastructure is unavailable:
- continue safe Assassin presentation prep only on separate PR #235 / branch `chat2/assassin-presentation-prep-v19`;
- queue `TASK_CHAT2_PRESENTATION_QUEUE_v19.md`;
- do not publish Assassin production IDs or freeze Assassin presentation.

Artist finalization always preempts Assassin prep the moment executable CI returns.
