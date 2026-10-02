# CURRENT CHAT2 TASK POINTER

Status: **MERCHANT PRESENTATION v17 ACTIVE**
Owner: Chat 2 / Presentation & Media Worker
Queue: C2-181..192
Target branch: `chat2/merchant-presentation-v17`

Guard presentation PR #217 is frozen shipped history and must not move.

Authoritative queue:
- `TASK_CHAT2_PRESENTATION_QUEUE_v17.md`

Start rule:
- Lead creates `chat2/merchant-presentation-v17` from the same Merchant activation commit that publishes this pointer;
- begin **C2-181 immediately** and continue all safe preparation work in parallel;
- final advanced binding/rebuild and freeze at C2-192 must use the exact frozen Merchant runtime from Chat 1;
- presentation/media/accessibility only: no gameplay, Save/RNG, economy, ending-eligibility or Meta ownership changes.

Preserve all already-shipped career presentation consumers while adding Merchant-owned surfaces only.
