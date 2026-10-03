# CURRENT CHAT3 TASK POINTER

Status: **ACTIVE — ANOMALOUS REACH PRODUCTION v14**
Owner: Chat 3

Accepted frozen producer candidate:
`chat3/trade-corridor-production-v13@d176dea7c640d34e12dbb3abf94c9b7895fd43bb`

Leader disposition:
**ACCEPTED FOR CHAT2 ASSEMBLY QUEUE**.

Trade Corridor v13 remains frozen. Do not mutate it.

## New assignment

Build D36 Region 3 — **Anomalous Reach** — as the mid/late Activity region.

New branch:
`chat3/anomalous-reach-production-v14`

Base:
`d176dea7c640d34e12dbb3abf94c9b7895fd43bb`

No full CI.

## Production target

Implement a real playable region using the shared Activity runtime from Forest/Trade Corridor.

Requirements:
- at least 3 route contexts;
- at least 1 shortcut;
- at least 1 capability/fact-gated route;
- at least 1 season-sensitive edge;
- at least 1 information/risk decision;
- >=2 meaningful capability/equipment hooks;
- Field Time through the shared runtime;
- explicit continue / detour / escape;
- success / failure / escape;
- deterministic save/reload;
- city preparation -> Activity feedback;
- Activity -> city/career/School/contact feedback;
- mid/late difficulty identity distinct from Forest and Trade Corridor;
- no universal Activity XP.

## Specialized mini-game

Anomalous Reach owns the first production instance of:

**Pattern / Ritual Circuit**

Implement a bounded deterministic typed mini-game/state machine.

It must:
- involve multiple player observations/choices;
- persist safely across save/reload;
- support success / failure / abort;
- not be a single stat check;
- not auto-complete the regional anchor;
- produce typed result/fact/evidence;
- remain distinct from Tracking Triangulation;
- avoid becoming generic magic-combat.

If a minimal shared registry/shell is needed for the mini-game family, keep it narrow and compatible with Forest/Trade Corridor.

## D38 seams

Add stable typed Anomalous Reach markers for:
- Pathfinder where appropriate;
- Preservation;
- Network only where a real contact/network thread exists;
- meaningful extracted evidence/sample/capability;
- research-grade secured-result candidate;
- contact/companion thread.

Do not make a D38 ending prematurely completable unless the exact common baseline is genuinely satisfied.

## Existing systems

Preserve:
- Activity entry = 2 Energy;
- Forest v12 behavior;
- Trade Corridor v13 behavior;
- D23 Palace gate;
- NightFlow ownership;
- Secret Debt Activity availability while bound;
- no Activity item/capability becomes a Palace substitute.

## Pacing

Target:
- regional anchor resolvable in <=3 successful entries after city prep;
- do not make Anomalous Reach a 20-entry grind;
- do not require all possible route contexts in one run.

## Focused QA

Producer worker: no full CI.

Run/prepare focused checks for:
- typecheck;
- validate;
- build;
- Forest v12 regressions;
- Trade Corridor v13 regressions;
- Anomalous Reach routes;
- Pattern/Ritual Circuit transitions;
- success/failure/abort;
- Field Time;
- save/reload mid-mini-game;
- season edge;
- capability hooks;
- D38 marker correctness;
- no premature ending eligibility;
- 2-Energy entry preservation;
- Palace/Secret Debt/Night firewalls.

Deliver:
`mindy-successor/docs/tasks/CHAT3_ANOMALOUS_REACH_PRODUCTION_v14.md`

Freeze exact SHA and report:
`READY_FOR_CHAT2_ASSEMBLY`.

Do not merge main.
