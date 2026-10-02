# CURRENT CHAT5 TASK POINTER

Status: **MERCHANT SCHOOL v17 ACTIVE**
Owner: Chat 5 / School + Text Localization Worker
Queue: C5-181..192
Target branch: `chat5/merchant-school-v17`

Frozen Guard School PR #206 is shipped history and must not move.

Authoritative queue:
- `TASK_CHAT5_SCHOOL_QUEUE_v17.md`

Start rule:
- Lead creates `chat5/merchant-school-v17` from the same Merchant activation commit that publishes this pointer;
- begin **C5-181 immediately** and continue C5-182..185 preparation in parallel;
- C5-186+ binds only exact Merchant School consumers published by the Merchant runtime contract;
- null thresholds/public facts stay null unless Chat 1 runtime explicitly authorizes a consumer;
- final natural acceptance/freeze at C5-192 uses the exact frozen Merchant runtime.

Reuse existing courses, teachers, media and Night-study machinery; no new curriculum, price engine, credit/debt subsystem or direct career transition.
