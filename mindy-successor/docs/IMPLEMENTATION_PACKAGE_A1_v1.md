# IMPLEMENTATION PACKAGE A1 — Target State + Save Migration

Дата: 2026-09-25.

Статус: **IMPLEMENTED / GREEN**.

Base:
`mindy-successor/prior-work/astra/prototype-m3.2/`

Depends on:
- `EXECUTABLE_TZ_v1.md`
- `TARGET_STATE_OWNERSHIP_v1.md`
- `SAVE_AND_MIGRATION_CONTRACT_v1.md`
- `TARGET_STAT_SYSTEM_v1.md`
- `CORE_NUMERIC_BASELINE_v1.md`

Goal:
replace M3.2's generic metric-centric save shape with the target domain-owned SaveEnvelope foundation, without yet implementing full Resolver/Night/Activity content.

## 1. Allowed writes

Core:
- `src/core/schema.ts`
- `src/core/engine.ts`
- `src/core/persistence.ts`

Tests:
- `tests/engine.test.ts`
- `tests/migration.test.ts`
- `tests/helpers.ts`

Optional test fixtures:
- `tests/fixtures/*`

Package metadata/docs inside prototype:
- `docs/STATUS.md`
- new package note under `docs/tasks/` if desired.

## 2. Forbidden writes

Do not change in A1:
- production UI;
- presentation files;
- career content packs;
- Electron shell;
- all 10 jobs;
- relationship content;
- Activity adapter;
- M3.3.

Do not redesign product numbers.

## 3. Target save version

Use target development schema:
- `schemaVersion: 4`.

Keep:
- independent `contentVersion`.

Do not reuse schemaVersion 3 for the new ownership model.

## 4. Target top-level types

Implement:

```ts
type SaveEnvelope = {
  schemaVersion: 4;
  contentVersion: string;
  meta: MetaState;
  run: RunState;
}
```

### MetaState minimum

```ts
type MetaState = {
  profileVersion: number;
  completedEndings: string[];
  unlocks: string[];
  ruleModifiers: Record<string, unknown>;
  hardWorkProgress: string[];
  persistentChoices: Record<string, unknown>;
  activeLegacyPerks: string[];
  runsStarted: number;
  runsCompleted: number;
}
```

Use sets as arrays in JSON if that matches serialization discipline; validate uniqueness.

### RunState minimum

```ts
type RunState = {
  id: string;
  status: 'active'|'ending_committed'|'ended'|'expired';
  calendar: CalendarState;
  character: CharacterState;
  resources: ResourceState;
  day: DayState;
  housing: HousingState;
  progression: ProgressionState;
  endings: EndingState;
  flow: FlowState;
  rng: RngState;
  history: HistoryState;
}
```

## 5. CharacterState

Implement 12 progression stats:

```text
strength
endurance
dexterity
reason
magic
creativity
wits
charm
sociability
manners
grooming
sexuality
```

Separate:
- `lust`.

Suggested shape:

```ts
type CharacterState = {
  stats: Record<StatId, number>;
  lust: number;
  creation: {
    remaining: number;
    allocated: Partial<Record<StatId, number>>;
    complete: boolean;
  };
  conditions: Record<string, unknown>;
}
```

Validation:
- stats 0..100;
- creation.remaining 0..10;
- fresh stats = 1;
- lust validated separately;
- no money/Energy/work counters here.

## 6. CalendarState

Implement enough for locked 160-day calendar.

Authoritative:
- `elapsedDays` 0..159 while active.

Derived selectors:
- year = floor(elapsedDays/40)+1;
- dayInYear = elapsedDays%40 +1;
- season index = floor((elapsedDays%40)/10);
- dayInSeason = elapsedDays%10 +1.

Do not store independent mutable copies unless invariant-tested.

Target seasons:
`spring summer autumn winter`.

## 7. DayState

```ts
type DayState = {
  energyCurrent: number;
  nextDayModifiers: {
    energyDelta: number;
    statEffects: ...[];
    tags: string[];
  };
  optionalOfferIds: string[];
  scheduledEventIds: string[];
}
```

Fresh:
- energyCurrent = 3.

EnergyMax must be derived, not persisted as separate mutable state.

## 8. Resources

```ts
type ResourceState = {
  money: number;
  inventory: Record<string, number>;
}
```

Fresh money:
- 600.

Do not place Energy here.

## 9. ProgressionState minimum for A1

A1 does not need full production definitions.

Shape must already support:

```ts
careers: Record<string, CareerRunState>;
quests: Record<string, QuestRunState>;
relationships: Record<string, RelationshipRunState>;
worldFacts: string[];
```

CareerRunState minimum:
- stage;
- shifts;
- counters;
- choices;
- facts.

No generic global `flags: Record<string,boolean>` as the target progression mechanism.

## 10. EndingState

```ts
eligible: string[];
committed?: string;
result?: RunResult;
```

Do not mark completed ending in Meta in A1 engine path unless using an explicit exactly-once test helper.

A6 will finish full RunResult semantics.

## 11. FlowState

A1 creates shape only:

```ts
pendingScene?: ...
night?: ...
activity?: ...
```

No full Night/Activity behavior yet.

## 12. History / RNG

Preserve deterministic RNG state.

History remains for:
- event show counts;
- cooldown;
- action counts/audit.

Do not use History as career state owner.

## 13. freshSave

Rewrite freshSave to target state.

Required:
- all 12 stats = 1;
- 10 creation points;
- money = 600;
- EnergyCurrent = derived fresh max 3;
- calendar.elapsedDays = 0;
- only target starter/default domains initialized;
- Meta copied safely.

Do not apply obsolete M3.2 unlock meanings such as old guild/scholar/court stat bonuses unless an explicit migration compatibility layer is being tested.

## 14. M3.2 schema-3 migration

M3.2 saves are development artifacts.

Migration must be deterministic and must not invent ambiguous mappings.

### Direct safe mapping

Safe:
- strength -> strength
- endurance -> endurance
- dexterity -> dexterity
- intelligence -> reason
- magic -> magic
- persuasion -> charm
- old lust -> target lust content axis
- money -> resources.money
- energy -> day.energyCurrent
- day -> calendar elapsed position according to development compatibility policy

### Ambiguous old prototype stats

Do NOT silently reinterpret:
- perception
- empathy
- composure
- organization

into target Creativity/Wits/Sociability/Manners/Grooming/Sexuality without approved mapping.

For A1:
- preserve these values in a documented `legacyCompat.m3Stats` quarantine field **only in migrated development saves**, OR
- reject those dev saves with a precise incompatibility reason if adding legacyCompat would pollute target schema.

Preferred for test discipline:
temporary validated `legacyCompat?: {source:'m3.2'; metrics: Record<string,number>}` field allowed only on migrated dev saves and explicitly excluded from gameplay selectors.

New target stats without safe mapping initialize to 1.

### Creation allocation

Do not attempt to reconstruct semantic allocation across the new stat catalog.

For migrated active development saves:
- mark creation.complete = true;
- remaining = 0;
- allocated = {};
unless fixture specifically represents unfinished creation and has an explicit migration expectation.

## 15. Calendar migration from M3.2

Old 448-day runs are prototype artifacts.

Do not mathematically pretend old day 300 means a canonical target-life date.

A1 development policy:
- migration fixture uses small known elapsed day;
- map elapsed day only while <=159;
- old active save beyond target run range is marked dev-incompatible OR expired by an explicit test policy.

Document policy in test.

No silent modulo/wrapping.

## 16. Pending migration

If old save has:
`pending {eventId,variantId}`:
- preserve eventId/variantId in target PendingScene compatibility shape;
- no reroll;
- no automatic clearing.

If referenced content not present in A1 synthetic catalog:
migration test can use fixture IDs known to the test catalog.

## 17. Meta migration

From old:
- completed -> completedEndings union;
- unlocks -> compatibility unlock IDs only if still recognized by test fixture;
- lives -> runsStarted approximation documented for dev migration.

Do not convert old unlock meaning into new production rewards in A1.

Protected import merge:
- completedEndings union;
- hardWorkProgress union;
- unlocks union;
- never erase newer current-profile progress with older imported save.

## 18. Engine compatibility work

A1 may add selectors/adapters so existing tests can migrate incrementally.

But do not maintain two authoritative states.

Forbidden:
- `run.metrics.energy` plus `run.day.energyCurrent`;
- `run.metrics.money` plus `run.resources.money`.

Target owner wins.

Legacy compatibility exists only at parser/migration boundary.

## 19. Required tests

### Fresh state
Assert:
- 12 stats all 1;
- lust separate;
- money 600;
- Energy 3;
- 10 creation points;
- elapsed day 0.

### Creation
- only progression stats allocatable;
- lust not allocatable;
- exactly 10 points;
- stat cannot exceed validation range.

### Calendar
Assert:
- day 0 -> Year1 Spring day1;
- day9 -> Spring10;
- day10 -> Summer1;
- day39 -> Winter10;
- day40 -> Year2 Spring1;
- day159 -> Year4 Winter10.

### Ownership
Assert schema rejects:
- money under Character;
- Energy duplicated under resources;
- unknown progression stat;
- current career stage in generic flag bag if the fixture schema forbids it.

### Migration
Fixtures:
1. schema3 normal active save.
2. schema3 pending event.
3. schema3 completed meta.
4. protected-meta merge.

Assert:
- deterministic parse;
- no lost safe fields;
- ambiguous old stats not invented into new stats;
- pending variant preserved;
- RNG preserved;
- Meta union protected.

### Roundtrip
target save:
serialize -> parse -> deep equal normalized form.

## 20. Acceptance

Package A1 passes only if:

`npm run typecheck`
passes.

`npm run validate`
passes or is updated only where schema change requires it.

`npm test`
passes with new migration tests.

`npm run build`
passes.

Prefer full:
`npm run check`.

No UI visual acceptance required yet.

## 21. Commit discipline

Start from named green commit.

One package commit only after tests green.

Commit message candidate:
`Migrate M3.2 save state to target domain ownership`.

Update prototype `docs/STATUS.md` with:
- schema target;
- tests;
- known A2 next step;
- no claim that Resolver/Night/Activity are complete.


## 22. Implementation result — 2026-09-26

Implemented on branch `a1-state-migration`.

Final validation before merge:
- GitHub Actions Ubuntu/Node 22;
- `npm ci`;
- `npm run check`;
- typecheck/validate/build all pass;
- 48 tests pass, 0 fail.

Implementation note:
the M3.2 UI/demo content still uses a temporary non-enumerable compatibility façade for old `run.metrics/run.day/... ` access. The façade routes to target owners and is absent from serialized schema-v4 JSON. It exists only to permit incremental A2/B migration without restoring duplicate authoritative state.

Next package:
`A2 — Condition/Effect v2`.
