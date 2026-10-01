# CURRENT CHAT1 DEVELOPER TASK POINTER

Status: **ACTIVE — REPAIR/FINISH C1D-119..120 ON CURRENT MAIN**
Owner: Chat 1 Developer / Integration Developer

Current working PR:
- #178 — Undead Farm complete career runtime
- last red head observed: `880f47a711eecfac4b61f2e8ef59166926d4d64f`
- CI #587: 593/600, 7 failures.

Current main includes the accepted Satyr runtime and Forest product slice. Transplant/rebase the Undead v11 delta onto current main before final freeze.

Do not restore obsolete starter assumptions. The known red failures split into:
- stale tests that still assume the old 2-stage Undead shell / direct first-shift transition / reliable-helper after 50 shifts;
- one real generic ending-reward issue: authored complex endings with explicit no-Meta intent still receive legacy fallback unlocks;
- one natural acceptance test still calling legacy Activity `advance` without selecting a v12 Forest route.

Follow the exact repair direction recorded on PR #178.

Current queue:
- `TASK_CHAT1_DEVELOPER_QUEUE_v11.md`
- finish C1D-119 and C1D-120.

Required final state:
- clean current-main-based PR;
- full exact-head repository CI green;
- then freeze for Chat 4.

Do not move the old Satyr source PR; it is already integrated and closed.
