# CURRENT CHAT3 TASK POINTER

Status: **ACTIVE — LIVE ECONOMY + HOUSING 160-DAY HARNESS v4**
Owner: Chat 3

Completed reusable progression harness:
`chat3/progression-balance-harness-v3@e631af2e17675c27309aa1b8bd5a6161a1090ce8`

Create:
`chat3/live-economy-housing-harness-v4`
from fresh main `836a716a017397d2e5768aada8a06299ee75e6fe`.

Read:
- `docs/tasks/LEADER_LIVE_ECONOMY_DRIFT_AUDIT_v1.md`;
- `ECONOMY_BALANCE_CANDIDATE_v3.md`;
- `HOUSING_AND_WAGE_BACKBONE_v1.md`.

## Assignment

Build a RESEARCH-ONLY simulator from current executable definitions/runtime constants.

Model actual live:
- starting money 600;
- base Energy 3;
- current ordinary wage formulas;
- normal/cheap/street lodging prices/effects;
- paid School tuition and stat packages;
- School Night Study next-day Energy cost;
- Activity 2-Energy opportunity cost where useful.

Compare daily work policies:
- current Energy-only repetition;
- max 2 shifts of the same career/day;
- max 1 shift of the same career/day while allowing different careers.

Outputs for representative fresh builds:
- money trajectory by day/year;
- % days forced to cheap/street if player attempts normal lodging;
- School lessons affordable at 5/10/20 lesson targets;
- days/energy spent working;
- 50-shift timing;
- 0-money recovery paths;
- normal vs cheap vs street opportunity cost;
- sensitivity to +1 daily Energy;
- exact point where current live wage scale materially diverges from the 1WU≈50 candidate.

Also run a **research comparison only** with wages scaled to the old WU candidate; do not propose runtime changes merely to match it.

No production tuning. No full CI.
Freeze SHA and report `READY_FOR_LEADER_ECONOMY_DECISION`.
