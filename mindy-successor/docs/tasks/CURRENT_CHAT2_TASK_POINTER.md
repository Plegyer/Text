# CURRENT CHAT2 TASK POINTER

Status: **ACTIVE — PROSTITUTE TECHNICAL QA / CURRENT-MAIN ASSEMBLY**
Owner: Chat 2 / Integration + Assembly + Technical QA

## Candidate

Producer PR #251
Branch: `chat4/prostitute-complete-reset-v1`
Frozen producer head: `8f06e840adcb92a379bcff5179bae54b1c4062e5`

Useful executable evidence already exists:
- workflow #1103 / run `37017857750`: **SUCCESS** on the frozen producer head's PR integration state;
- an earlier producer head also passed #1096, but #1103 is the relevant final legacy producer-run evidence.

Do **not** request another producer-triggered full run.

## Current-main condition

Current main at assignment is at/after `deac006444e323aa933c630b63fbf3e95ed16aec`.

GitHub currently reports PR #251 as not directly mergeable against current main. Therefore:
1. inspect exact candidate diff and current-main drift;
2. identify concrete collisions in shared production files;
3. preserve voluntary-career / Secret-Debt firewall and all shipped Artist invariants;
4. build a collision-safe branch named `chat2/assembly-prostitute-20261002` (or the next collision-free sequence name) from fresh current main;
5. selectively apply only the verified Prostitute candidate semantics;
6. do not mutate the producer branch/head;
7. when assembly is ready and the single CI slot is free, open exactly one QA/assembly PR and run full CI once;
8. extract all failures from that run before any second full run;
9. if green, hand exact assembly SHA + CI evidence to Leader 1. Do not merge main.

## CI-slot ordering

- #1103 is already SUCCESS and must not be repeated.
- Chat 3 / Assassin is repairing known failures separately and is second in the queue unless its last legacy run changes the evidence materially.
- Do not open Assassin QA CI while Prostitute QA/assembly full CI is active.

This pointer supersedes the prior IDLE state.
