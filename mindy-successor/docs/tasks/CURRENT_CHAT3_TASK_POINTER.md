# CURRENT CHAT3 TASK POINTER

Status: **ACTIVE — FOREST FRONTIER PRODUCTION HARDENING v12**
Owner: Chat 3

Accepted frozen producer candidate:
`chat3/advanced-endings-tranche-b-producer-v11@4dbf89f612eb16fb8c3cd103f0a7864e0e97858e`

Leader disposition:
**ACCEPTED FOR CHAT2 ASSEMBLY QUEUE**.

Important D40 integration notes:
- 16 ending IDs / selected-route facts accepted;
- 9 automatic knowledge/content rewards use current compatible unlock layer;
- 7 Specialist rewards remain an explicit strong-Meta seam;
- no duplicate strong-Meta runtime was created;
- save repair only infers selected-route facts from unambiguous pre-outcome branch stages;
- ambiguous old `outcome-ready` saves are intentionally not guessed.

Chat 2 will integrate this candidate later on fresh main after the strong-Meta assembly order is resolved.

## New assignment

Turn D36 Region 1 — **Forest Frontier** — from current vertical slice into the first production-ready Large Activity region.

New branch:
`chat3/forest-frontier-production-hardening-v12`

Current executable activity:
`lumber.forest`

Authority:
- D36 Large Activity full scope;
- D38 standalone Activity ending family;
- current Lumber/Hunter/Undead/Tavern typed consumers;
- D16 explicit ending commit;
- current Activity save/resume contract.

No full CI.

## First step — exact current-runtime gap audit

Before editing production, inspect the current Activity runtime/schema and `lumber.forest`.

Map the current implementation against every D36 production-region requirement:

- 3 route contexts;
- at least 1 shortcut;
- at least 1 capability/fact-gated route;
- at least 1 season-dependent edge;
- at least 1 information-dependent risk decision;
- at least 2 meaningful equipment/capability hooks;
- route/navigation layer;
- physical/challenge layer;
- specialized mini-game layer;
- Field Time = 6 target;
- Endurance adapter target 6–8;
- explicit continue/detour/escape decisions;
- success / escape / failure;
- deterministic save/resume;
- city preparation -> Activity feedback;
- Activity -> career/relationship/School feedback;
- camp boundary if relevant;
- contact/companion hook;
- ending-anchor/result tags needed by D38.

## Production goal

Implement the **minimal shared runtime + Forest content delta** required to make Forest Frontier satisfy D36 as a production region, while preserving existing typed consumers.

Do not invent final lore prose.

### Preserve existing typed result compatibility

These current consumers must continue to work:
- Lumber Forest route;
- Undead Farm external-anomaly consumer;
- Tavern rumour-confirmation consumer;
- Hunter-related Forest clues/current hooks.

Existing `lumber.forest.success` typed result must not silently disappear or change meaning without a compatibility layer.

### Field Time

D36 target:
- 6 Field Time segments per field day;
- Field Time is internal Activity resource, not global Energy;
- entry still costs 2 global Energy exactly once;
- reload/resume never repays entry cost.

If current shared Activity runtime can be minimally extended to support Field Time safely:
- implement the typed shared field;
- make Forest use it;
- preserve existing other Activity adapters with explicit default/backward-compatible behavior.

If this requires a broad Activity-engine redesign larger than a minimal typed extension:
- do not build a parallel subsystem;
- stop that specific part and document exact shared-runtime seam for later assembly;
- continue all content work that is safe under current adapter.

### Forest routes

Preserve and production-harden the existing identities:
- Logging Road;
- Hunter Trail;
- Old Boundary Path.

Add only the minimum authored route/option content needed for D36 production bar.

At minimum ensure:
- one meaningful route shortcut;
- one route information/risk choice where the player knows enough to assess a tradeoff;
- season materially changes at least one available edge/option;
- Rope Kit / Reinforced Axe / Field Preservation Kit / Old Boundary Token remain meaningful and non-redundant.

### Specialized mini-game

Forest Frontier should host the first production instance of:
**Tracking Triangulation**.

Implement a bounded typed mini-game/shell or minimal compatible state machine rather than a single stat check.

It must:
- require multiple player choices/observations;
- have deterministic state;
- survive save/reload;
- support success/failure/abort;
- feed an Activity result/fact without auto-solving the whole regional anchor;
- not become universal combat.

Do not implement Pattern/Ritual Circuit or Infiltration/Suspicion here unless a shared interface requires a minimal registry shell.

### Regional anchor + D38 tags

Add stable typed Forest Frontier anchor/result facts/tags sufficient for later D38 endings, without making any D38 ending completable from Forest alone.

Support classification where appropriate:
- Pathfinder-marked anchor/result;
- Preservation-marked anchor/result;
- Network-marked anchor/result;
- research-grade secured result candidate;
- Activity contact/companion thread seam.

Do not fake the missing other three regions.

### Camp

Forest camp is optional unless the current objective is explicitly multi-day.

Do not globally force camp into ordinary Forest entries.

If current runtime lacks D36 camp semantics, leave an explicit typed integration seam rather than inventing a second Night/calendar implementation.

### Pacing

Preserve:
- Activity entry = 2 Energy;
- regional core anchor resolvable in <=3 successful Forest entries after city prep;
- no universal Activity XP bar;
- no mandatory Forest grind for ordinary Hard Work.

## Focused QA

Producer worker: no full CI.

Minimum:
1. typecheck;
2. validate;
3. build;
4. existing `lumber.forest` regression;
5. Tavern Forest result consumer;
6. Undead Farm Forest result consumer;
7. Lumber Forest route consumer;
8. Hunter/Forest clue consumers;
9. entry Energy exactly once;
10. save/reload during Activity;
11. Field Time behavior if implemented;
12. Tracking Triangulation state transitions;
13. success / escape / failure;
14. season edges;
15. item/capability routes;
16. no D38 ending becomes reachable from Forest alone;
17. D23 Palace unaffected;
18. Secret Debt Activity boundary preserved.

## Deliverable

Create:
`mindy-successor/docs/tasks/CHAT3_FOREST_FRONTIER_PRODUCTION_HARDENING_v12.md`

Document:
- exact current gap audit;
- production files changed;
- shared Activity runtime changes, if any;
- compatibility decisions;
- focused QA results;
- remaining seams for Trade Corridor / Anomalous Reach / Restricted Sites;
- exact frozen SHA.

Finish:
`READY_FOR_CHAT2_ASSEMBLY`

or, only if a true shared-runtime blocker prevents safe production:
`BLOCKED_FOR_LEADER_RUNTIME_DECISION`

with the exact blocker.

Do not merge main.
