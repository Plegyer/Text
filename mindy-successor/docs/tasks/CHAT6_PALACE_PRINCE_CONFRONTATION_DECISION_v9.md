# Chat 6 — Palace Prince Confrontation Decision Packet v9

Status: **READY FOR LEADER PRODUCT DECISION**
Owner: Chat 6 / Palace Producer  
Branch: `chat6/palace-prince-confrontation-decision-v9`  
Exact base: `75adf92042961be4e4eda51622123214e1c97dce`

Frozen Palace integration source:
- v8 D23 consumer: `9dfaab2a7b9e145c9753c0acd8e54d3f903be5fd`
- v5 authored Palace content: `c7b26032af9347af59c590de187abd7d44795050`
- v6 selective integration manifest: `29def63f348ffd0bf46c16a7a3c7292b0877db9a`

Machine-readable companion:

`content/palace-prince-confrontation-decision-v9.fixture.json`

Focused/static checks:

`tests/palace-prince-confrontation-decision-v9.test.ts`

---

## 1. Locked Product contract

This packet does not revisit these facts:

- successor True Ending is **Palace Return Home**;
- do not port the original Plus Mode / job-replacement True Ending structure;
- all 12 progression stats must be `>=91`;
- Lust is excluded;
- the Prince must be defeated before Return Home can become available;
- Prince identity/name/lore is not decided here;
- final Palace 3-stage vs 6-stage topology is not decided here.

The packet only asks Product to choose **how the final confrontation plays**.

---

## 2. Common readiness contract for every option

Every model uses the same entry readiness:

```text
Palace access
AND authoritative Palace progression completion signal
AND strength >= 91
AND endurance >= 91
AND dexterity >= 91
AND reason >= 91
AND magic >= 91
AND creativity >= 91
AND wits >= 91
AND charm >= 91
AND sociability >= 91
AND manners >= 91
AND grooming >= 91
AND sexuality >= 91
AND NOT palace.prince-defeated
```

The packet uses the placeholder:

`PALACE_PROGRESSION_COMPLETE_SIGNAL`

This is deliberately **not** a production fact ID.

It must later bind to the authoritative completion signal from whichever Palace topology Product approves.

No option defines the 3-vs-6 topology.

### Cap-200 interaction

The threshold remains raw `>=91`.

A cap-200 life does not normalize the threshold and does not change it to 181.

Palace confrontation logic does not multiply stats.

---

## 3. Common defeat and ending contract

All three options use one exact proposed defeat signal:

```text
worldFact palace.prince-defeated
```

This is written **only after a successful confrontation resolution**.

Defeat does not end the run.

After that fact exists, the separate Return Home ending can become eligible.

Proposed ending identity for future integration:

`ending.palace.return-home`

The actual ending still uses the existing lifecycle:

```text
eligible
-> player explicitly chooses Return Home
-> ending committed
-> authored ending scene if any
-> complete ending
```

No confrontation option automatically commits Return Home.

This keeps the two decisions separate:

1. defeat the Prince;
2. choose to return home.

---

# OPTION A — ACTIVITY CORE

## 4. Product shape

The final confrontation is one dedicated `counter.v1` Activity.

Candidate Activity ID:

`palace.prince-confrontation`

The player explicitly clicks:

**Confront the Prince**

This calls the already-existing `enterActivity` command.

No generic combat subsystem is added.

## 4.1 Availability

The Activity entry conditions contain:

- Palace access;
- authoritative Palace progression completion;
- all 12 stat conditions at `>=91`;
- `palace.prince-defeated = false`.

Readiness unlocks the button.

It does not resolve the confrontation.

## 4.2 Sequence

Suggested engineering default:

- 3–6 player choices;
- `adapter: counter.v1`;
- `resumePolicy: allowed`;
- `timePolicy: same_day`;
- `failurePolicy: exit_to_day`;
- initial endurance: 8;
- success at progress: 6;
- ordinary `advance` cost: 2 endurance.

The Activity should require an explicit approach choice before ordinary advance.

The current Activity runtime already stores:

- progress;
- endurance;
- step count;
- route;
- resolved option IDs;
- checkpoint;
- activity RNG state.

Therefore mid-confrontation save/reload resumes the same attempt.

## 4.3 Existing mechanics reused

- Activity entry conditions;
- `counter.v1`;
- route selection;
- one-use Activity options;
- stat conditions;
- item capability conditions;
- world facts;
- optional relationship conditions;
- success / escape / failure outcomes;
- ActivityEnvelope persistence;
- current Activity UI.

Items/relationships should improve or alter available responses.

They must not be required for the baseline success route.

Examples of already-shipped item capabilities that could support optional responses:

- `guard_sealed_pass`;
- `artist_handle_invitation`;
- `merchant_verify_manifest`;
- `assassin_handle_evidence`.

These are examples of reusable mechanics, not mandatory Prince lore.

## 4.4 Exact Prince defeat signal

Activity `success` result:

```json
{
  "kind": "addWorldFact",
  "fact": "palace.prince-defeated"
}
```

No escape/failure result writes this fact.

## 4.5 Failure / refusal / retry

Refusal is the existing Activity:

`escape`

Failure is the Activity failure outcome.

Both exit without `palace.prince-defeated`.

Because the underlying readiness conditions remain true, the player may explicitly start another attempt.

A new attempt starts with a fresh ActivityEnvelope.

## 4.6 Why it is not one automatic stat check

The 12×91 condition is an **entry gate only**.

After entry:

- the player chooses an approach;
- multiple choices change progress/endurance;
- a poor sequence can fail or be abandoned;
- optional supports alter the path;
- success is a confrontation result, not a readiness callback.

The existing counter adapter is deterministic by authored progress/endurance.

Its stored `lastRoll` does not currently decide success.

## 4.7 Return Home remains separate

Activity success writes only:

`palace.prince-defeated`.

The run remains active.

Return Home then becomes eligible and must be explicitly accepted through the existing ending UI.

## 4.8 Production files

Likely touches:

- `content/definitions.json`
  - one Activity definition;
- `content/packs/palace-prince-confrontation.json`
  - optional result follow-ups;
- `content/localization.json`;
- `src/ui/app.ts`
  - expose this Activity in a Palace-facing entry list/panel;
- focused confrontation tests;
- optional presentation mapping only after Palace presentation ownership is settled.

No engine change is required.

## 4.9 Focused acceptance

- 11 stats at 91 + one at 90: entry disabled.
- all 12 at 91 + Palace completion: entry enabled.
- Lust value never changes eligibility.
- entering creates ActivityEnvelope.
- save/reload preserves exact checkpoint/progress/endurance/route.
- success writes exactly one `palace.prince-defeated`.
- escape writes none.
- failure writes none.
- retry creates a fresh attempt.
- defeat does not auto-commit Return Home.
- Return Home is eligible only after defeat.

---

# OPTION B — QUEST-BACKED LATCHED EVENT CHAIN

## 5. Product shape

The confrontation is a short authored sequence tracked by a small quest state machine.

Candidate quest:

`palace.prince-confrontation`

Candidate stages:

- `ready`;
- `confronting`;
- `defeated`.

The player explicitly clicks a story action:

**Confront the Prince**

Candidate action ID:

`palace.confront-prince`

No Activity is required.

## 5.1 Availability

The story action requires:

- Palace access;
- authoritative Palace progression completion;
- all 12 progression stats `>=91`;
- Prince not yet defeated;
- confrontation quest stage `ready`.

The action advances:

`ready -> confronting`

and opens the first authored event.

## 5.2 Sequence

Recommended size:

**3–5 blocking scenes**

Example mechanical shape:

1. opening / choose approach;
2. confrontation pressure;
3. response / support decision;
4. resolution;
5. optional final confirmation beat.

Events use:

`delivery.policy = latched`

where needed.

Current queued/pending event state and quest stage already serialize.

Reload resumes the exact pending event with its allowed-choice snapshot.

## 5.3 Existing mechanics reused

- story action;
- quest machine;
- quest transition;
- latched blocking event resolver;
- `actionCompleted`;
- `choiceResolved`;
- `questTransition`;
- stat / relationship / itemCapability conditions;
- `advanceQuest`;
- `addWorldFact`.

No generic combat system is needed.

## 5.4 Exact Prince defeat signal

Final successful resolution choice writes:

`palace.prince-defeated`

and moves confrontation quest:

`confronting -> defeated`.

The world fact remains the ending-facing signal.

The quest stage is confrontation-local state.

## 5.5 Failure / refusal / retry

A withdraw/refusal choice moves:

`confronting -> ready`

without a defeat signal.

An authored failure can do the same.

The explicit **Confront the Prince** action becomes available again.

Implementation note:

retryable confrontation events cannot be authored as permanent one-show scenes.

Their `maxShows` must allow the approved retry budget, or retry attempts must use attempt-specific event identity/state.

This is the main complexity unique to Option B.

## 5.6 Why it is not one automatic stat check

Readiness merely exposes the explicit begin action.

After that, multiple authored choices are required.

Optional support may change response options.

The final world fact is written only by the successful ending choice of the sequence.

## 5.7 Return Home remains separate

After `palace.prince-defeated` is written:

- confrontation quest is over;
- run remains active;
- Return Home becomes eligible;
- player separately commits Return Home.

## 5.8 Production files

Likely touches:

- `content/definitions.json`
  - one quest machine;
  - one story action;
- `content/packs/palace-prince-confrontation.json`
  - 3–5 latched authored events;
- `content/localization.json`;
- `src/ui/app.ts`
  - expose explicit Palace confrontation action;
- focused quest/event/retry tests.

No engine change is required.

## 5.9 Focused acceptance

- readiness/action unavailable with any stat at 90.
- action available with all 12 at 91 and Palace completion.
- action changes quest `ready -> confronting`.
- reload preserves quest stage.
- reload preserves pending/latched scene and allowed choices.
- withdraw returns to `ready`.
- failure returns to `ready`.
- retry action becomes available.
- only successful terminal choice writes `palace.prince-defeated`.
- defeat does not auto-commit Return Home.

---

# OPTION C — AUTHORED PRELUDE + ACTIVITY CORE + VERDICT

## 6. Product shape

This model uses an authored opening and ending around the Activity core.

It is still built entirely from existing systems.

Sequence:

```text
explicit begin action
-> authored prelude
-> counter.v1 Activity
-> activityResult success
-> authored verdict event
-> prince-defeated
-> separate Return Home eligibility/commit
```

Candidate action:

`palace.begin-prince-confrontation`

Candidate Activity:

`palace.prince-confrontation`

## 6.1 Availability

The explicit begin action uses the same shared readiness contract:

- Palace completion;
- all 12 >=91;
- Prince undefeated.

The prelude can record:

- chosen approach;
- optional relationship support;
- optional item-supported approach;

and then open the Activity.

None of those supports becomes a second mandatory entry gate.

## 6.2 Sequence

Recommended player sequence:

- 1 prelude choice;
- 3–6 Activity choices;
- 1 verdict choice.

The prelude writes a run-local fact such as:

`palace.prince-confrontation-open`

only as internal confrontation state.

The Activity performs the multi-step mechanical challenge.

Activity success emits its existing:

`activityResult`

reaction fact.

A latched verdict event listens for successful Activity result.

The verdict choice writes the final:

`palace.prince-defeated`.

## 6.3 Existing mechanics reused

- explicit story action;
- authored event;
- event choices;
- relationship/itemCapability support;
- `counter.v1` Activity;
- ActivityEnvelope persistence;
- `activityResult` reaction trigger;
- latched verdict event;
- world fact;
- normal ending registration/commit.

No generic combat subsystem is introduced.

## 6.4 Exact Prince defeat signal

Unlike Option A, Activity success itself does not immediately write the final defeat signal.

Instead:

```text
Activity success
-> verdict event
-> explicit final verdict choice
-> palace.prince-defeated
```

This gives Product an authored final beat while keeping the mechanical core resumable.

## 6.5 Failure / refusal / retry

Prelude can offer:

**Not yet**

which leaves confrontation unopened.

Activity escape/failure writes no defeat signal.

For retry, Product can choose one small behavior detail later:

- keep confrontation-open and allow direct Activity retry; or
- clear it and replay the short prelude.

Neither choice changes the underlying systems.

## 6.6 Why it is not one automatic stat check

There are three explicit layers:

1. readiness unlocks the begin action;
2. the player chooses an authored approach;
3. several Activity decisions produce success/failure;
4. success is acknowledged through a final authored verdict choice.

No layer automatically commits Return Home.

## 6.7 Return Home remains separate

The verdict writes:

`palace.prince-defeated`.

Only after that does Return Home become an ending candidate.

The player still separately accepts Return Home.

## 6.8 Production files

Likely touches:

- `content/definitions.json`
  - story action;
  - one Activity definition;
- `content/packs/palace-prince-confrontation.json`
  - prelude + result/verdict events;
- `content/localization.json`;
- `src/ui/app.ts`
  - expose begin action and Activity entry;
- focused cross-system save/reload tests.

No engine change is required.

## 6.9 Focused acceptance

- same 12×91 readiness tests.
- begin action is explicit.
- refusal before Activity changes no defeat state.
- prelude choice persists across reload.
- Activity checkpoint persists across reload.
- Activity failure/escape cannot write defeat.
- successful Activity queues exactly one verdict.
- pending verdict survives reload.
- verdict confirmation writes exactly one `palace.prince-defeated`.
- Return Home remains uncommitted until separate player action.

---

# 7. Comparison matrix

| Axis | A — Activity Core | B — Quest/Event Chain | C — Prelude + Activity + Verdict |
|---|---|---|---|
| New generic subsystem | None | None | None |
| Engine change required | No | No | No |
| Main state carrier | ActivityEnvelope | Quest + event queue | Event + ActivityEnvelope + event queue |
| Explicit begin | Activity button | Story action | Story action |
| Typical player choices | 3–6 | 3–5 | 5–8 total |
| Mid-attempt reload | Native Activity state | Native quest/pending state | Native across all phases |
| Failure/retry | Native escape/failure | Authored transition back to ready | Native Activity retry |
| Authored dramatic control | Medium | Highest | High |
| Mechanical/systemic feel | Highest | Lowest | High |
| Item/relationship branching | Activity options | Event choices | Both |
| Retry implementation complexity | Low | Medium | Low–medium |
| UI integration | Activity entry | Action entry | Action + Activity entry |
| Separate Return Home commit | Yes | Yes | Yes |

---

# 8. Decision framing

This packet does not select a winner.

The Product decision can be reduced to the intended feel:

### If the confrontation should feel primarily systemic

Choose **A — Activity Core**.

This has the smallest state surface and the strongest built-in retry/save semantics.

### If the confrontation should feel primarily authored and dramatic

Choose **B — Quest-backed Event Chain**.

This gives the greatest control over pacing and specific beats, at the cost of more authored retry-state management.

### If the confrontation should combine a mechanical challenge with authored framing

Choose **C — Prelude + Activity + Verdict**.

This uses more production surfaces than A or B but still needs no new generic engine.

---

# 9. Leader decisions needed

Leader/Product only needs to answer these mechanics questions:

1. **A, B, or C?**
2. On failure, should retry be immediately available or require replaying a short prelude?
3. Should optional Palace relationship/item support:
   - only expose alternate choices; or
   - also make the Activity route more efficient?
4. For the final successful beat:
   - write `palace.prince-defeated` immediately on mechanical success; or
   - require the extra verdict confirmation represented by Option C?

No Prince lore/name decision is necessary to pick the implementation model.

No 3-vs-6 topology decision is necessary beyond later providing one authoritative Palace progression-complete signal.

---

# 10. Static feasibility findings

Current successor already has all core primitives needed:

- `counter.v1` Activity;
- resumable serialized ActivityEnvelope;
- Activity options with:
  - stat conditions;
  - item capability conditions;
  - world facts;
  - routes;
  - progress/endurance costs;
- success/escape/failure Activity results;
- `activityResult` reaction trigger;
- quest state machines and transitions;
- latched blocking events;
- serialized queued/pending scenes;
- relationship conditions;
- item capabilities;
- `addWorldFact`;
- explicit action command;
- explicit Activity entry command;
- separate ending eligibility / commit / completion lifecycle.

Current ending commit code explicitly rejects commit while a scene, NightFlow, or Activity is active.

Therefore every option naturally completes the confrontation first and only then permits Return Home commit.

---

# 11. Explicit non-goals

v9 does not implement or decide:

- Prince identity;
- Prince name;
- Prince motive;
- Prince personality;
- combat fiction;
- 3-stage Palace topology;
- 6-stage Palace topology;
- Palace stage thresholds;
- D23 package semantics;
- cap-200 runtime semantics;
- Return Home epilogue/lore.

It also does not port the original Plus Mode true-ending structure.

No production runtime is changed on this branch.

No full CI is requested.

Freeze exact SHA and report:

`READY_FOR_LEADER_PRODUCT_DECISION`
