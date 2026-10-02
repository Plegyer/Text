# CURRENT CHAT3 TASK POINTER

Status: **ACTIVE — ORDINARY WORK NEGATIVE-STAT TRADEOFF PACKET**
Owner: Chat 3

## Completed first

Assassin author repair is frozen at:
`e81053b203655486896b7926f4aeb07d1871a49d`

Do not move that branch unless Chat 2 returns a new concrete defect.

Preserve School candidate PR #254 at:
`877927cf747ba9f69a53ddccf4373b795561f3a0`

## Assignment now

Create `chat3/work-seasonal-negative-tradeoffs-v1` from fresh current main.

Current production audit:
- Lumber already has negative seasonal stat effects;
- the other 9 ordinary professions currently have only positive stat changes.

Locked Product direction:
- work must not cause giant pure stat growth;
- roughly **2 seasons out of 4 per profession** should carry a negative stat tradeoff;
- not every season needs a negative;
- Lust remains separate and is not an ordinary work negative unless separately authorized.

Deliver:
- exact proposed negative stat for two seasons per profession;
- rationale tied to profession identity;
- audit that no negative destroys the same stat needed to unlock/operate the profession too aggressively;
- focused regression test plan;
- preserve wages, counters, Hard Work=50, career events and unlock gates.

Packet first; do not change production seasonal numbers until Leader accepts the exact mapping.
No full CI.
Freeze SHA and report `READY_FOR_LEADER_DECISION`.
