# CHAT4 — Activity Camp Persistence Producer v17

Status: **READY_FOR_CHAT2_ASSEMBLY**  
Owner: Chat 4  
Branch: `chat4/activity-camp-persistence-producer-v17`  
Leader seed: `0d1477cf4f3837ebb1c584661698423e6596df07`  
Activity runtime base: `chat3/restricted-sites-production-v15@ab378d68765f7c9bbff43abf3b4b41e24df82e01`  
Implementation head before this handoff: `5bef0a22498f533d537245038d520742e57e9c9e`

## Result

The v16 final save/migration audit P0 is repaired at the Activity runtime boundary: multi-day Camp now has explicit typed persisted state, deterministic staged commits, an old-save neutral migration, a two-night cap, and a forced-Night handoff that gives absolute priority to an eligible consuming forced Night before any Camp calendar commit.

This producer intentionally does **not** alter the four v15 production region definitions or opt arbitrary objectives into multi-day behavior. Camp is available only when an Activity definition explicitly declares `campPolicy` together with `timePolicy: "can_advance_days_internally"` and finite Field Time. This keeps the D36 distinction between ordinary same-day Activity and explicit multi-day objectives.

## Changed files

- `mindy-successor/prior-work/astra/prototype-m3.2/src/core/schema.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/src/core/content.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/src/core/engine.ts`
- `mindy-successor/prior-work/astra/prototype-m3.2/tests/activity-camp-persistence-v17.test.ts`

The production `content/definitions.json` blob is unchanged from the Leader seed.

## Persisted Camp contract

Each active Activity envelope now carries a local persisted substate version:

```text
campStateVersion = 1
campState = {
  phase:
    "idle"
    | "chosen"
    | "calendar_advanced"
    | "field_day_ready",
  nightsUsed: 0..2,
  boundaryDay: number | null,
  calendarAdvanceCommitted: boolean,
  fieldTimeRefreshCommitted: boolean
}
```

The Activity definition gate is explicit:

```text
campPolicy: { maxNights: 1..2 }
timePolicy: "can_advance_days_internally"
finite adapterConfig.fieldTimeSegments
```

A counter Activity without `campPolicy` remains `same_day`; its persisted Camp state must remain neutral.

## Migration / old-save behavior

The v15 producer still has global `schemaVersion=5`; this branch does not invent a competing global schema number because final assembly already owns later save-schema work. Instead, the new Activity-local Camp substate is explicitly versioned as `campStateVersion=1`.

Before schema parsing, an old active Activity envelope is migrated to exact neutral Camp v1 **only when both** `campStateVersion` and `campState` are absent:

```text
phase = idle
nightsUsed = 0
boundaryDay = null
calendarAdvanceCommitted = false
fieldTimeRefreshCommitted = false
```

No Camp progress is inferred from `startedDay`, current calendar day, checkpoint, route, Field Time, housing, lodging, or Activity progress. A partially present Camp state or an unsupported Camp substate version fails explicitly.

Chat 2 should fold this local migration into the final public save parser without downgrading or replacing the final branch's global schema version.

## Camp boundary state machine

Camp is offered only when the Activity explicitly supports Camp, finite Field Time has reached zero, fewer than `maxNights` were used, and one more calendar day is legal.

The deterministic boundary is split into persisted steps:

1. `camp` commits the Camp choice only. Calendar and Field Time are unchanged.
2. `camp.advance-calendar` first checks for an eligible forced consuming `nightPhase(before_lodging)` event. If none intercepts, the global calendar advances exactly once through the shared calendar helper, `nightsUsed` increments exactly once, and `calendarAdvanceCommitted=true`.
3. `camp.refresh-field-time` restores only the Activity Field Time budget exactly once and commits `fieldTimeRefreshCommitted=true`.

While a Camp boundary is half-committed, ordinary Activity actions and escape cannot bypass it. Parse-time invariants reject calendar/night-count mismatches and impossible phase/commit combinations.

After the first completed Camp boundary, the count survives reload. A second boundary is permitted when the objective still qualifies. A third Camp is unavailable/rejected.

## Night and Energy semantics

Ordinary Camp does not create a global NightFlow, does not charge city lodging, does not run a voluntary city Night menu, and does not restore global daily Energy. It advances the global calendar once and refreshes Activity Field Time once.

The raw calendar increment is not duplicated: Camp and ordinary NightFlow both use the same extracted one-day calendar helper. Ordinary NightFlow retains its existing lodging, next-day-modifier, Energy and resolver behavior.

The 2-Energy Activity entry contract is unchanged.

## Secret Debt forced-Night precedence

Before an ordinary Camp calendar commit, the producer runs the existing Resolver seam only for eligible blocking forced consuming `nightPhase(before_lodging)` events. If such an event wins:

- the Camp calendar commit does not happen;
- Activity continuation is terminated at the boundary;
- the selected forced event becomes the pending Night scene;
- the existing NightFlow owns lodging, next-day modifiers, calendar advance and start-day processing;
- the forced event is marked by existing `handledEventIds` logic when its choice resolves, so it cannot replay in the same Night;
- any next-day Energy penalty supplied by that forced Night remains owned by NightFlow and is not cancelled by Activity.

This matches the production Secret Debt v12 forced-Night shape: blocking/forced, `before_lodging`, `suppressVoluntaryMenu=true`, `consumesNight=true`. The producer does not change Secret Debt values or rules.

### Chat 2 assembly hook: accepted -> bound trap day

The v15 Activity base intentionally does not contain the later typed Secret Debt runtime. In Secret Debt v12, `activateSecretDebtIfDueMutable` is a start-day hook after calendar advance. When composing this producer with Secret Debt v12/final runtime, Chat 2 must preserve the same start-day activation hook for a calendar day advanced by Camp **before further field continuation**. This is an integration seam, not a new Debt rule.

Already-bound Secret Debt forced-Night precedence is implemented by this producer and covered by the focused synthetic forced-Night test.

## Focused QA

Added `tests/activity-camp-persistence-v17.test.ts` covering:

- typed neutral Camp v1 and unchanged 2-Energy entry;
- old active-save migration only when both new fields are absent;
- explicit rejection of partial/incompatible persisted Camp state;
- save/reload before Camp choice and after the choice before calendar advance;
- calendar advance exactly once across reload;
- Field Time refresh exactly once across reload;
- no ordinary Camp lodging payment, NightFlow, or global Energy refresh;
- first and second Camp nights survive persistence; third Camp rejects;
- same-day Activity cannot Camp;
- Secret-Debt-shaped forced Night preempts Camp, terminates continuation, charges its normal lodging only once, applies its next-day Energy -1 once, and does not double-process after reload;
- catalog rejection for invalid Camp time policy, missing finite Field Time, and `maxNights > 2`.

No full CI was run, per task instruction. The connected GitHub environment does not expose a command runner that can execute a single local Node test file, so the focused executable suite was authored but not executed in this session. Machine-static verification on implementation head passed:

- branch was strictly ahead of the Leader seed with only the expected four implementation/test files changed;
- production `content/definitions.json` SHA was identical to the seed;
- Camp substate version/migration guards were present;
- migration contained no `startedDay` inference;
- max-two-night gate and both exactly-once commit bits were present;
- forced-Night handoff used the existing `nightPhase(before_lodging)` seam;
- changed TypeScript files passed delimiter/comment/string structural-balance checks;
- GitHub reported no workflow runs for the implementation head.

## Protected scope

Not changed by this producer:

- D38 endings or ending eligibility/content;
- Activity entry Energy cost;
- Palace;
- universal Activity XP (none added);
- Secret Debt balance, route, penalty, forced-Night policy or priority;
- four production region definitions/content.

## Assembly guidance

Selectively compose the three core runtime/schema files plus the focused test. Preserve the final branch's newer global save-schema migration chain and fold `campStateVersion=1` migration into it rather than replacing that chain. Preserve Secret Debt v12/final start-day activation on Camp calendar advances. Do not blanket-merge v15 content over newer D38/Secret Debt/final content.

Final branch freeze SHA is the commit containing this handoff and should be taken from the branch head after this file is committed.

**READY_FOR_CHAT2_ASSEMBLY**
