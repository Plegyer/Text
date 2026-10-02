# CURRENT CHAT6 TASK POINTER

Status: **ACTIVE — PALACE NATURAL 10/10 + DAY-1 ENTRY ACCEPTANCE PREP v7**
Owner: Chat 6

Completed:
- safe prep v4;
- authored safe v5;
- integration manifest v6 `29def63f348ffd0bf46c16a7a3c7292b0877db9a`.

Assassin is shipped; all ten ordinary careers now exist on main.

Create `chat6/palace-natural-10of10-acceptance-v7` from fresh main.

## Assignment

Re-audit actual shipped roster:
- exact 10 ordinary careers;
- one real Hard Work ending each;
- all remain completed_shifts >= 50;
- Secret Debt excluded;
- Palace excluded.

Prepare future D23 acceptance fixtures/tests:
- 9/10 permanent + 9 active -> no Palace;
- 10/10 + 0 active -> no Palace;
- 10/10 + 9 active -> no Palace;
- 10/10 + 10 active -> deterministic Day-1 invitation eligibility;
- duplicates/Secret Debt cannot substitute;
- invitation acceptance -> run-local `palace.access-granted`;
- reload preserves pending invitation/access exactly once.

Use Palace v4-v6 as source. If shared D23 API is not yet landed, keep dependent checks as fixture/contract.
Do not choose Prince mechanics or Palace 3-vs-6 topology.
Do not modify shared Meta/Save/cap implementation.
No full CI.
Freeze SHA and report `READY_FOR_CHAT2_OR_LEADER`.
