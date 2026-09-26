# Forest Challenge Family Authoring Packet v1

Status: implementation-ready authoring contracts for the three authoritative Forest challenge families.

This packet defines mechanical authoring boundaries only. It does not invent final prose, lore, NPCs, thresholds, loot, or encounter IDs.

## Shared challenge contract

Every authored Forest challenge must have:
- stable challenge identity;
- stable route context;
- explicit eligibility/approach conditions;
- an explicit Activity option/action chosen by the player;
- deterministic checkpoint after resolution;
- no daily Energy cost inside Activity;
- Activity-owned resource/stat consequences only;
- resolved state persisted across reload;
- no reroll by reload;
- no duplicate item use/consume;
- no new terminal Activity result IDs.

Terminal outcomes remain exactly:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

## Family A — navigation

Allowed dependency categories:
- Wits;
- Reason;
- Hunter/public knowledge fact;
- map/navigation capability.

Navigation must present a route/information decision and change at least one next route, option, route resource/risk path, or known route information. A hidden numeric modifier with identical action-space is insufficient.

Allowed result semantics:
- set or confirm route state;
- open or close a later route option;
- adjust Activity progress;
- adjust Activity-owned resources;
- record an accepted route discovery.

Checkpoint after resolution must persist chosen option, route state, resolved challenge identity, RNG state and resulting option availability.

## Family B — physical obstacle

Allowed dependency categories:
- Strength;
- Endurance;
- Dexterity;
- rope/tool capability.

Relevant capabilities include `cross_rough_route` and `cut_heavy_wood` where authored.

Allowed result semantics:
- spend or avoid Activity endurance;
- change route availability;
- advance Activity progress;
- record obstacle resolution;
- branch to a detour.

If an item is used, its retain/consume behavior follows the accepted exactly-once item-use contract.

Checkpoint must persist selected approach, item-use transaction identity if applicable, inventory state, route/action availability, endurance/progress and resolved obstacle identity.

## Family C — interpretation / ritual anomaly

Allowed dependency categories:
- Reason;
- Magic;
- School Arcana public fact;
- specific sample/tool capability.

`preserve_specimen` may change extraction/sample action-space where authored.

Allowed result semantics:
- record anomaly interpretation;
- unlock route continuation;
- enable or disable extraction option;
- add an accepted public discovery fact;
- add an accepted item/sample;
- change Activity progress/resource state.

School-private progression must not be written by Forest.

Checkpoint must persist challenge identity, selected interpretation, public fact/capability state, item-use transaction if applicable, sample state if authored and resulting route/action availability.

## Success / escape / failure distinction

Challenge resolution does not create new terminal outcome IDs.

Successful challenge resolution may advance toward `lumber.forest.success`, which continues through exact A5 `activityResult(lumber.forest, success, lumber.forest.success)`.

Escape remains `lumber.forest.escape` and must not emit success-only facts.

Failure remains `lumber.forest.failure`.

## Cross-family coverage

The first production-depth Forest slice must include at least one challenge from each family and at least four stats with meaningful approaches across the slice.

## Explicitly OPEN

This packet does not decide final challenge IDs, stat thresholds, formulas, prose, NPC identity, lore, loot, School Arcana fact ID, Hunter clue fact ID, item retain/consume rules, or exact route binding for every capability.

## Hard Work firewall

No challenge family affects Hard Work eligibility.
Hard Work remains only `completed_shifts >= 50` with exact reward `hardWork:lumber`.
