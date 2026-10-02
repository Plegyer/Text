# CURRENT CHAT4 TASK POINTER

Status: **ACTIVE — HARD WORK NEXT-LIFE META DESIGN / IMPLEMENTATION PACKET**
Owner: Chat 4
New branch: `chat4/hard-work-next-life-meta-packet-v1`
Base: fresh current main `6a6029df8e9c007227da0173eb499d59ba51648e`

The voluntary Prostitute producer branch is finished and must remain frozen. Prostitute is already shipped on main.

## Assignment

Prepare the production-ready packet for D21 without touching shared runtime yet.

Deliver:
- inventory of the current 10 ordinary profession unlock gates;
- inventory of current Hard Work completion/meta plumbing;
- exact files/functions that must change so a completed Hard Work profession is available from the start of later lives;
- a generic design for a selectable profession-specific **+5 starting-stat bonus**;
- a concrete profession -> +5 stat mapping proposal for all 10 ordinary professions, clearly marked **PROPOSAL / awaiting Product lock**;
- save/migration and UI implications;
- focused acceptance tests that the eventual implementation must satisfy;
- collision analysis against current Secret Debt, Palace and New Game+ work.

Do not implement guessed profession -> stat mappings in runtime code. Do not touch Chat 5 or Chat 6 owned files. No full CI.

Freeze the packet SHA and report `READY_FOR_LEADER_DECISION`.
