# CURRENT CHAT2 TASK POINTER

Status: **ACTIVE — ASSASSIN CURRENT-MAIN ASSEMBLY / TECHNICAL QA**
Owner: Chat 2 / Integration + Assembly + Technical QA

## Candidate

Producer PR #252
Producer branch: `chat3/assassin-complete-reset-v1`
Frozen producer head: `0976b4fefdc4d6b379243cc0f3d3429e0e1a3642`
Current main baseline: `6a6029df8e9c007227da0173eb499d59ba51648e`

The producer has reported READY_FOR_CHAT2. Its last producer workflow #1106 was correctly **SKIPPED** by the CI-slot guard. Do not request producer full CI.

## Assignment

1. inspect the exact frozen Assassin diff against fresh current main;
2. review current-main drift and collisions, especially shared definitions/presentation/School/Activity preservation;
3. preserve the shipped Artist and Prostitute slices exactly;
4. create a fresh assembly branch such as `chat2/assembly-assassin-20261002` from current main;
5. selectively apply only verified Assassin semantics; never mutate the producer branch;
6. open exactly one assembly/QA PR when ready;
7. use the single full-CI slot once;
8. mine every failure before any second full run;
9. if green, freeze exact assembly SHA and hand it to Leader 1 for final merge.

Current exact-main #1108 is SUCCESS, so the CI slot is free.

Do not begin CI for School/Meta/Secret-Debt candidates while Assassin assembly CI is active.
