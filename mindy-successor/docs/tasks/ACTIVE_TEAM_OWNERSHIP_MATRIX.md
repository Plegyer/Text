# Active Team Ownership Matrix

Status: **ACTIVE / CI-SLOT MODEL**
Effective: 2026-10-02
Repository: `Plegyer/Text`

## Leadership

### Leader 1
Only project coordinator and final integration authority.
Owns scope, worker assignment, Product decisions, final QA acceptance, merge order, main protection and durable project memory.

There is **no worker Chat 1**.

## Workers

| Chat | Role | Active ownership |
|---|---|---|
| Chat 2 | Integration / Assembly + Technical QA | **SOLE WORKER CI-SLOT OWNER**; waits/takes one READY_FOR_CHAT2 candidate at a time |
| Chat 3 | Full-Career Producer A | Assassin; repair current candidate, then freeze READY_FOR_CHAT2 |
| Chat 4 | Full-Career Producer B | Voluntary Prostitute; finish current candidate, then freeze READY_FOR_CHAT2 |
| Chat 5 | Full-Career Producer C | Secret Debt foundation parked on Product authority |
| Chat 6 | Full-Career Producer D | Palace foundation parked on Product/shared authority |

## Single-runner rule

There is one self-hosted Windows runner.

Producer Chats 3–6 must never use full CI as a development loop and do not own automatic PR full CI.

Producer delivery is:
1. implement/fix the whole assigned slice;
2. perform static/focused checks available without the shared runner;
3. freeze one candidate SHA;
4. mark `READY_FOR_CHAT2`;
5. stop pushing until Chat 2 returns concrete QA/CI findings.

Chat 2:
1. reviews frozen candidates without moving them;
2. takes exactly one candidate when the runner slot is free;
3. creates `chat2/qa-*` or `chat2/assembly-*`;
4. runs one full executable QA/integration check;
5. extracts all failures from that run before asking for another;
6. hands a green merge-ready candidate to Leader 1.

Leader 1 merges; exact-main CI remains mandatory.

Automatic PR full CI is gated to Chat 2 QA/assembly and Lead validation/integration branches. Producer PR workflow jobs intentionally skip and do not consume the runner.

## Current queue

- Chat 4 has the last pre-rule producer run #1103 already in progress; let it finish.
- Chat 3 run #1102 produced three actionable test failures; repair them without another producer CI.
- After the gate change, Chat 2 schedules the next full checks serially rather than Chats 3/4 competing for the runner.
