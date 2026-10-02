# CURRENT CHAT2 TASK POINTER

Status: **ACTIVE — ORDINARY WORK SEASONAL TRADEOFFS CURRENT-MAIN ASSEMBLY / SOLE FULL-CI SLOT**
Owner: Chat 2 / Integration + Assembly + Technical QA

Current main: `6a6f69f2a8f4f48a0767114ef41626e8f0cab61c`

Producer candidate:
- PR #260
- frozen SHA `d94a6a236a87267221a386406189a93a13615f47`

Assassin and School D20 are already shipped and exact-main green.

## Assignment

1. create fresh `chat2/assembly-work-seasonal-tradeoffs-*` from current main;
2. selectively apply PR #260, preserving shipped Assassin/School;
3. verify exactly 2 negative seasons per ordinary profession, one -1 progression-stat effect each, no Lust negatives;
4. preserve all positive effects, wages, unlocks, counters/items, events and Hard Work=50;
5. audit `definitions.json` collisions carefully;
6. run focused/static audit first;
7. open one assembly PR and consume the sole full-CI slot once;
8. mine all failures before any rerun;
9. if green freeze exact SHA and report `READY_FOR_LEADER_MERGE`.

No other worker uses full CI.
