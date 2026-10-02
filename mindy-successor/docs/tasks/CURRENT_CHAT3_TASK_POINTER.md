# CURRENT CHAT3 TASK POINTER

Status: **ACTIVE — ASSASSIN / REPAIR BEFORE READY_FOR_CHAT2**
Owner: Chat 3 / Full-Career Producer A
Branch: `chat3/assassin-complete-reset-v1`
Current observed head before this coordination change: `88918ca95fc775afca4137384c4ea24c6cf7c0ac`
Producer PR: #252

## Assignment

Finish **Assassin** as one whole ordinary-career production slice under:
- `CAREER_ASSASSIN_DRAFT_v0.md`;
- `USER_DECISIONS_LOCKED_v1.md`;
- current shipped main facts.

Historical Assassin prep PRs #242/#235/#236/#238 are source-only.

## CI correction

Do **not** trigger more producer full-CI runs.

The prior process was wrong for a single runner. Runs #1097–#1102 consumed repeated full checks while the branch was still being repaired.

Latest inspected full run:
- #1102 / `37017616082`;
- producer head `88918ca95fc775afca4137384c4ea24c6cf7c0ac`;
- typecheck/validate/build passed;
- tests: 968 total, 965 pass, **3 fail**.

Known actionable failures from that single run:
1. `assassin-natural-acceptance.test.ts`: clean Assassin run expected contract stage `closed`, actual `intel`.
2. `generic-display-label-consumers-production.test.ts`: Assassin profession description regression still expects the older RU/EN copy instead of the candidate copy.
3. `hunter-presentation-v15-c2-158-166.test.ts`: old Hunter preservation assertion hard-codes only Lumber/Hunter Activity entries and now conflicts with the Assassin Activity entry.

Fix these as one coherent repair and perform all static/focused checks available without requesting another full run.

When you believe all known failures and the complete Assassin scope are resolved:
- freeze one exact SHA;
- write `READY_FOR_CHAT2` with the SHA and concise evidence;
- stop pushing until Chat 2 takes the CI slot.

Chat 2, not Chat 3, owns the next full executable CI.
