# School Progression Ownership Audit v1

Status: boundary audit only. This file does not activate School progression and does not modify shared runtime/schema/build/UI.

## Sources audited

Locked School intent:
- `docs/SCHOOL_SYSTEM_v2.md`
- `docs/SCHOOL_SYSTEM_DRAFT_v0.md`
- `docs/school-prep/SCHOOL_PROGRESSION_STRUCTURE_v1.md`
- `docs/school-prep/SCHOOL_INTEGRATION_NOTES_v1.md`
- `docs/school-prep/SCHOOL_TRACK_DATA_MAP_v1.md`

Current implementation boundary:
- `prior-work/astra/prototype-m3.2/src/core/schema.ts`
- `prior-work/astra/prototype-m3.2/src/core/engine.ts`
- `prior-work/astra/prototype-m3.2/src/core/school.ts`
- `prior-work/astra/prototype-m3.2/content/definitions.json`

## 1. Required School ownership

The locked School contract distinguishes reliable lesson mechanics from School-owned progression.

For each paid lesson, the intended transaction is:
1. validate tuition and current-day Energy;
2. charge the locked tuition and exactly 1 current-day Energy;
3. apply the full locked stat package;
4. increment School-owned `lessons_completed` for the selected track;
5. expose the completed authoritative state to the Resolver.

The proposed School-owned track boundary also reserves separate counters such as:
- `lessons_completed`;
- `night_study_sessions`;
- `projects_completed`;
- `exam_attempts`.

Night study must not silently increment `lessons_completed`.

## 2. What is persisted today

The target save currently persists:
- authoritative character progression stats;
- money and current-day/next-day Energy state;
- career, quest, and relationship typed progression;
- global public `progression.worldFacts`;
- generic `historyState.actionCounts`;
- legacy compatibility metrics/flags when present.

The isolated School runtime currently persists the paid lesson's money, Energy, and full stat package because those fields already belong to the shared save model.

However, the current `src/core/school.ts` paid-lesson helper does **not** persist School-owned track progression. It applies tuition/Energy/stat effects and emits reaction facts, but it does not increment a typed per-track `lessons_completed` counter.

Likewise, current generated Night-study choices persist their stat gain and next-day Energy modifier through NightFlow, but there is no typed School-owned `night_study_sessions` counter.

Therefore the durable School-specific progress currently available is transaction outcome state, not a typed School progression record.

## 3. What is legacy-only and must not become School authority

### `legacyCompat.metrics.lessons`

The shared schema still recognizes legacy metric key `lessons`. The old prototype `content/definitions.json` has a generic action `id: "school"` that increments this legacy metric.

That value is:
- global rather than per School track;
- part of the compatibility/prototype model;
- not the locked `lessons_completed` School counter;
- not written by the current isolated School course helper.

The old prototype also contains an exam condition using `metric.lessons >= 3` together with legacy intelligence/alchemy conditions. This is obsolete prototype content and must **not** be promoted into a target School milestone or certificate threshold.

### Generic action counting

`historyState.actionCounts` is persisted and the generic action path increments counts by action ID.

This is useful history/compatibility data, but it is not a replacement for School-owned progression:
- it is action-global rather than track-owned;
- it cannot distinguish the eight School tracks;
- it cannot distinguish paid lessons from Night study;
- the isolated `executeSchoolLesson` helper does not currently increment it.

A later engine integration may retain an action count for observability or compatibility, but `lessons_completed` must remain School-owned rather than derived from a generic action counter.

## 4. Typed School-owned progress still missing

The current target progression schema has typed state for:
- careers;
- quests;
- relationships;
- global public world facts.

It has no School domain record.

The following School-owned durable state is therefore still missing from the shared typed model:
- per-track identity/state;
- per-track `lessons_completed`;
- per-track `night_study_sessions`;
- project/exam counters when authored;
- School-owned facts;
- completed milestones;
- earned certificates;
- optional School choices when later authored.

This audit does not prescribe the final schema representation. It only establishes that legacy `metrics.lessons` and generic `actionCounts` do not satisfy the locked ownership contract.

## 5. Public cross-system fact mechanism that exists today

The shared runtime already has a typed public cross-system mechanism: `run.progression.worldFacts`.

The current contracts include:
- condition read: `worldFact`;
- effects: `addWorldFact` and `removeWorldFact`;
- pack capabilities for reading/writing declared `worldFacts`;
- Resolver reaction fact `worldFactAdded` when a new public fact appears.

This is the current suitable boundary for durable facts that another domain must consume without reaching into School-private state.

Career/quest/relationship state also owns domain-specific counters/facts, but there is no equivalent typed School state yet. External domains must not write a future School track stage/counter directly.

## 6. Management/certificate threshold remains OPEN

No target threshold is locked for the management/certificate path.

The early School draft names Literacy & Numbers uses such as **Farm management** and gives **basic certificate** only as a milestone example. The same draft explicitly leaves milestone thresholds and which certificates are required for jobs open. The later locked prep keeps exact milestone thresholds, certificate names, certificate requirements, and certificate effects open.

Therefore no implementation may currently invent:
- a number of `lessons_completed` required for a management/basic certificate;
- a stat threshold for that certificate;
- a project/exam count for that certificate;
- a management career gate that requires it.

In particular, the legacy prototype's `lessons >= 3` exam rule is not evidence for the target School threshold and must remain quarantined.

## 7. Activation boundary for Lead integration

When shared ownership is later activated, the minimum semantic requirement is:

`paid course transaction -> increment that track's lessons_completed exactly once -> publish only explicitly public School facts -> Resolver observes the complete post-transaction state`.

Night study remains a separate path:

`Night choice -> +2 selected supported stat -> night_study_sessions (if/when typed School progress is activated) -> next-day Energy -1`.

No management milestone, certificate threshold, certificate identity/effect, teacher, ending, or other authorial value is resolved by this audit.
