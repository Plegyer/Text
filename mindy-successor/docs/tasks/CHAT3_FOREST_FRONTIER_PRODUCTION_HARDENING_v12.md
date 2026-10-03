# Chat 3 — Forest Frontier Production Hardening v12

Status: **IMPLEMENTATION CANDIDATE — READY FOR CHAT2 ASSEMBLY**
Owner: Chat 3
Branch: `chat3/forest-frontier-production-hardening-v12`
Base: `main@ecaf2af5de0932b3c9bd4d87b62533c74ed1e61e`
Implementation head before this documentation commit: `c2b23ed27b610279bfe904aa740ae49c520fd555`

> The final branch SHA is reported in the handoff after this document is committed. A commit cannot safely self-embed its own cryptographic SHA.

## Current-runtime gap audit

Before v12, `lumber.forest` already had:

- the three intended route identities: Logging Road, Hunter Trail, Old Boundary Path;
- a capability-gated Old Boundary route;
- summer/autumn Hunter Trail availability plus seasonal Logging obstacles;
- Rope Kit / Reinforced Axe / Field Preservation Kit / Old Boundary Token capability hooks;
- route/navigation and physical challenge options;
- `counter.v1` deterministic Activity envelope and save/reload;
- entry Energy cost = 2 exactly once;
- success / escape / failure;
- exact typed result IDs:
  - `lumber.forest.success`
  - `lumber.forest.escape`
  - `lumber.forest.failure`;
- existing Lumber, Tavern, Undead Farm and Hunter cross-system consumers.

The production gaps were:

- no typed Field Time resource;
- no explicit finite six-segment field-day budget;
- no authored shortcut;
- no information-gated decision with an explicit risk/tradeoff;
- no specialized multi-step mini-game layer;
- no typed mini-game state in the save envelope;
- no Activity-local success/failure/abort mini-game outcomes;
- no stable Forest Frontier regional anchor/result marker namespace for D38;
- no explicit companion/relationship return seam;
- no School-facing Activity return feedback;
- no generic validation contract for incomplete mini-game definitions.

## Shared Activity runtime delta

The existing `counter.v1` adapter was extended rather than replaced.

### Optional Field Time

`adapterConfig` now optionally supports:

- `fieldTimeSegments`;
- `advanceFieldTimeCost`.

Activity options now optionally support:

- `fieldTimeCost`;
- typed `effects`.

The Activity save state now optionally stores:

- `fieldTimeRemaining`.

Compatibility behavior:

- activities that do not declare `fieldTimeSegments` remain unlimited;
- `hunter.expedition` and `assassin.infiltration` therefore retain existing behavior;
- new Activity entry initializes the finite value only for definitions that opt in;
- reload never repays entry Energy;
- old active saves without the new field are normalized:
  - finite definitions reconstruct remaining Field Time from `segments - steps`;
  - legacy unlimited definitions normalize to `null`.

### Minimal staged mini-game shell

Activity options may now declare a `miniGameTransition`:

- `game`;
- `from`;
- `to`;
- optional terminal outcome:
  - `success`
  - `failure`
  - `abort`.

The Activity envelope persists:

- mini-game stage;
- mini-game status;
- choice IDs.

Catalog validation requires every declared mini-game to have:

- at least one `start` transition;
- a success terminal;
- a failure terminal;
- an abort terminal.

This is a bounded generic sequence shell. No Pattern/Ritual Circuit, Infiltration/Suspicion, combat runtime, Activity XP, or second Activity subsystem was added.

## Forest Frontier production contract

`lumber.forest` remains the executable regional Activity and keeps version/result compatibility.

Exact core configuration:

- entry Energy: **2**
- Field Time: **6**
- initial internal Endurance: **6**
- ordinary Continue Endurance cost: **2**
- success progress target: **6**
- failure Endurance floor: **0**
- same-day Activity
- deterministic resume allowed

### Preserved route identities

1. Logging Road
2. Hunter Trail
3. Old Boundary Path

The old successful route cadence remains valid in six Field Time actions:

`route -> navigation -> physical -> preservation -> continue -> continue`

Therefore current Lumber/Tavern/Undead Farm natural consumers do not need a result-ID migration.

### New shortcut

`forest.shortcut.triangulated-line`

- gated by successful Tracking Triangulation knowledge;
- remains Hunter Trail context;
- grants +2 Activity progress;
- costs 1 Field Time;
- marks Pathfinder evidence.

### Information-dependent risk decision

`forest.tracking.informed-risk`

- requires `forest.school-field-notes`;
- explicitly exposes the tradeoff in the action label;
- +1 Activity progress;
- -2 internal Endurance;
- 1 Field Time.

No hidden universal risk score was introduced.

## Tracking Triangulation

Stable mini-game ID:

`forest.tracking-triangulation`

Entry:

`forest.detour.tracking-observe`

State path:

- `start -> first-observation`;
- player chooses cross-check or the School-informed risk option;
- `first-observation -> second-observation`;
- player then chooses:
  - successful triangulation;
  - forced uncertain conclusion / mini-game failure;
  - or earlier abort.

Success writes:

`forest.frontier.tracking-triangulated`

Failure writes:

`forest.frontier.tracking-misread`

Mini-game success does **not** auto-complete `lumber.forest`. It only creates a usable shortcut/evidence state.

The mini-game state and RNG-bearing Activity envelope survive save/reload.

## D38 anchor/result marker seam

Forest success keeps the exact old result:

`lumber.forest.success`

and adds one regional anchor fact:

`activity.forest-frontier.anchor-secured`

Optional evidence markers:

- Pathfinder:
  `activity.forest-frontier.mark.pathfinder`
- Preservation:
  `activity.forest-frontier.mark.preservation`
- Network:
  `activity.forest-frontier.mark.network`
- research-grade candidate:
  `activity.forest-frontier.result.research-grade`

No ending condition in v12 consumes any of these new markers.

Forest alone therefore does not implement or complete a D38 ending family.

## Existing typed compatibility

Unchanged typed success consumers:

- Lumber:
  `lumber-cross.activity-forest-return`
- Tavern:
  `tavern.activity.forest-return`
- Undead Farm:
  `undead-farm.activity.forest-return`

All still listen to:

`activity=lumber.forest / outcome=success / result=lumber.forest.success`

Hunter clue consumption remains compatible because:

`lumber.forest.truth-known`

still exists on the same successful result.

The new Forest Frontier feedback pack deliberately does not replace these primary consumers.

## City preparation -> Activity

Existing preparation remains live and meaningful:

- Rope Kit -> `cross_rough_route`
- Reinforced Axe -> `cut_heavy_wood`
- Field Preservation Kit -> `preserve_specimen`
- Old Boundary Token -> `enter_old_boundary`
- School Field Craft notes -> navigation/tracking knowledge
- Lumber route survey -> Logging navigation alternative
- Hunter trail clue -> Hunter Trail access

The four equipment hooks remain non-redundant.

## Activity -> career / relationship / School

Career feedback remains the shipped typed Lumber/Tavern/Undead consumers.

New bounded feedback:

- Hunter Trail / tracking opens:
  `forest.frontier.contact-thread-open`
- an already accepted `hunter.senior-guide` companion can record:
  `forest-frontier-return-shared`
  and Network marker;
- an existing Field Craft learner can record:
  `forest.frontier.school-reflection-recorded`.

These are feedback seams only. They do not auto-create romance, Palace access, certificates, tuition changes, School lesson counts, or stats.

## Camp boundary

Forest Frontier remains a same-day regional Activity.

v12 does **not** force camp, NightFlow, lodging, or calendar advancement into ordinary Forest entries.

If later Trade Corridor / Anomalous Reach / Restricted Sites require multi-day objectives, camp must integrate with the existing Night/calendar authority rather than creating a second calendar subsystem.

## D23 / Secret Debt boundaries

The Forest Activity and new feedback pack:

- do not read or write `palace.access-granted`;
- do not read or write `palace.d23-qualified`;
- do not create Palace access;
- do not read or write Secret Debt state;
- do not suppress forced Night;
- do not alter ordinary Prostitute semantics.

## Pacing

Preserved:

- entry = 2 global Energy exactly once;
- internal Field Time is separate from global Energy;
- one prepared legacy Forest run can still secure the regional anchor;
- Tracking is optional;
- regional anchor remains within the <=3 successful-entry target;
- no universal Activity XP;
- no mandatory Forest requirement for ordinary Hard Work.

## Production files changed

- `src/core/schema.ts`
- `src/core/engine.ts`
- `src/core/content.ts`
- `src/ui/app.ts`
- `content/definitions.json`
- `content/packs/forest-frontier-production.json`
- `tests/chat3-forest-authored-depth-v13.test.ts`
- `tests/forest-frontier-production-hardening-v12.test.ts`

## Focused QA

Added focused producer test:

`tests/forest-frontier-production-hardening-v12.test.ts`

It covers:

- D36 exact Forest config;
- 3 routes;
- 4 distinct equipment hooks;
- entry Energy exactly once;
- Field Time = 6;
- legacy six-action Logging success;
- exact old success result ID;
- Tracking staged state;
- save/reload during Tracking;
- Tracking success/failure/abort;
- informed risk gating;
- shortcut evidence;
- legacy unlimited Activity default;
- Lumber/Tavern/Undead result compatibility;
- D38 marker seam;
- no D38 marker ending conditions;
- Palace firewall;
- Secret Debt firewall.

Static branch audit performed through the GitHub connector:

- **42 checks passed**
- **0 failed**

The static audit includes the full D36 requirement matrix and compatibility checks.

### Executable QA status

No full CI was initiated, per assignment.

The connector available to this worker does not provide a shell/command runner for this private branch, so the following were **not claimed as executed**:

- `npm run typecheck`;
- `npm run validate`;
- `npm run build`;
- Node test execution.

Chat 2 should execute the requested focused command set during assembly.

## Remaining seams for later regions

### Trade Corridor

Needs its own regional route graph, economic/logistics options and regional anchor, but can reuse:

- Field Time;
- option effects;
- staged mini-game transition shell;
- typed result markers;
- same entry-energy/resume contract.

### Anomalous Reach

Can reuse Field Time and staged shell, but must not implement Pattern/Ritual Circuit by pretending Tracking Triangulation is generic ritual gameplay.

### Restricted Sites

Can reuse Activity envelope/save semantics, but Infiltration/Suspicion remains its own specialized mechanic. v12 does not generalize Assassin infiltration into a universal combat/suspicion system.

## Disposition

**READY_FOR_CHAT2_ASSEMBLY**
