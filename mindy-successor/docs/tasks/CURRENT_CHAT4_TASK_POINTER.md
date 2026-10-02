# CURRENT CHAT4 TASK POINTER

Status: **MERCHANT QA v17 ACTIVE — C4-162 + C4-165 COMPLETE / C4-166 PREFLIGHT ACTIVE**
Owner: Chat 4 / QA + Product Acceptance Gate
Queue: C4-162..167

Guard is shipped. Merchant runtime and presentation are already accepted:
- C4-162 runtime #226 @ `88422257f618c7182dd6d1f3eca7596c9972eb0a`: PASS-WITH-NOTES; CI #898 SUCCESS; 866/866.
- C4-165 presentation #227 @ `77becbeb8ce139ce4326df018af779fd741d70af`: PASS-WITH-NOTES; CI #905 SUCCESS; 871/871.
- QA ledger comments: `5947547430`, `5947590431`.

Still waiting for immutable sibling freezes:
- C4-163 School #224: gate immediately once non-draft/frozen and exact-head CI is green.
- C4-164 authored #225: gate immediately once non-draft/frozen and exact-head CI is green.

While neither sibling is QA-eligible, **do not idle**. Perform **C4-166 PREFLIGHT ONLY**:
- compare accepted focused deltas #226 and #227 against current shipped-product main and each other;
- prepare changed-file/shared-key intersections and ownership precedence for `definitions.json`, schema, presentation registry/UI and Merchant-owned packs;
- record preservation requirements for shipped Guard/Hunter/Tavern/Satyr/Undead/Forest consumers;
- inspect current #224/#225 changed-file shapes only as provisional evidence, clearly marking mutable heads non-authoritative;
- do not issue C4-166 final verdict before C4-163 and C4-164 are accepted;
- do not mutate any producer head.

The instant #224 or #225 becomes frozen+green, suspend preflight and gate that sibling independently. After both are accepted, finalize C4-166 and hand exact order/ledger to Lead. C4-167 remains post-integration exact-current-main gate.

Authoritative queue:
- `TASK_CHAT4_QA_QUEUE_v17.md`
