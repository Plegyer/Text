# CURRENT CHAT2 TASK POINTER

Status: **WAITING ON ASSASSIN AUTHOR REPAIR — HOLD CI SLOT**
Owner: Chat 2 / Integration + Assembly + Technical QA
Assembly PR: #255
Current failed assembly head: `c51d37e2a9d30cd7fc94bf9154203ca4ceefc2f8`

## Executable evidence

Workflow #1110 ran normally on the self-hosted runner:
- typecheck: PASS;
- validate: PASS;
- build: PASS;
- tests: **981 total / 980 pass / 1 fail**.

The sole failure is the natural Assassin acceptance path:
- after 50 real shifts the major contract remains `intel`;
- expected `closed`;
- cause is a real resolver/lifecycle routing collision after the intel transition: a higher-priority item event consumes the transition opportunity and the prep event cannot reopen later.

## Ownership

This is now an **AUTHOR_FIX**, not an integration guess.

- Chat 3 owns the repair on the Assassin producer branch.
- Do not mutate the frozen producer semantics yourself while waiting.
- Do not rerun #1110 unchanged.
- When Chat 3 freezes a repaired Assassin SHA, rebuild/review current-main assembly from the new exact producer head and use one full CI run.
- PR #254 School @ `877927cf747ba9f69a53ddccf4373b795561f3a0` is next in the queue only after Assassin is green/accepted.

No other worker may consume full CI.
