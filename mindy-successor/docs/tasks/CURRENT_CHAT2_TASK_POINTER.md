# CURRENT CHAT2 TASK POINTER

Status: **ACTIVE — SCHOOL D20 CURRENT-MAIN ASSEMBLY / SOLE FULL-CI SLOT**
Owner: Chat 2 / Integration + Assembly + Technical QA

## Current QA state

Assassin repaired assembly PR #257 / CI #1111:
- 982 tests;
- 981 pass;
- 1 fail;
- first #1110 contract-close defect is confirmed fixed;
- remaining defect is Assassin-author-owned refusal-evidence reachability.

Chat 3 owns that repair. Do not patch Assassin yourself while waiting.

## Assignment now

Use the free CI slot productively on School D20:

Producer PR #254
Frozen School head:
`877927cf747ba9f69a53ddccf4373b795561f3a0`

From fresh current main:
`426ec9146716e1246d6b7bfdd4a570ef2fcb0a54`

1. create a fresh Chat 2 School assembly branch;
2. audit the frozen D20 delta against current main;
3. preserve all current shipped careers and coordination/reference docs;
4. verify Body Confidence paid lesson => Lust +2 exactly once;
5. verify Night Study does not inherit that Lust gain;
6. open one assembly PR and consume one full CI run;
7. mine all failures before any rerun;
8. if green, freeze exact assembly SHA and report READY_FOR_LEADER_MERGE.

After School is green/closed, return to the newly repaired Assassin SHA from Chat 3.

No other worker may use full CI.
