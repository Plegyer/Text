# CURRENT CHAT2 TASK POINTER

Status: **STAGE 2 - D39 RUNTIME SEMANTIC UNION NOW**
Owner: Chat 2 / sole production assembly + full-CI lane

Work branch:
`chat2/assembly-palace-d39-d48-current-main-v76`

Exact current base:
`324502bf103d36730fc73443de239d8466cf703c`

Palace v19 is closed on this base. Leader executable evidence:
- source closure: `7031ebc99af5410a7f515429c3773c2e975f20d2`
- evidence: `LEADER1_PALACE_V19_CLOSURE_RESULT_v82.json`
- run `37644658481`: typecheck PASS, validate PASS, build PASS, focused Palace v8-v19 PASS.

Do not redo Palace v19.

## This task only

Apply Stage 2 locked step 4:
**D39 runtime semantic union + canonical Palace ending reward bindings.**

Do NOT apply D39 live consumers yet.
Do NOT apply Strong Meta UI closure yet.
Do NOT apply D48 yet.

## D39 runtime authority

Accepted producer:
`chat5/palace-d39-reward-producer-v20`

Executable implementation head:
`b28b19628c0374c405cd32afedb0f16c105e2403`

Producer base:
`09a97e0deef5bbccdbcdfbc4fc955f59b369345c`

Read:
`CHAT5_PALACE_D39_REWARD_PRODUCER_v20.md`

The accepted runtime delta is limited to:
- `src/core/strongMeta.ts`
- `src/core/schema.ts`
- `src/core/engine.ts`
- `src/core/content.ts`
- two exhaustive fallback cases in `src/ui/app.ts`
- focused D39/Strong Meta tests

Semantic union only. Never wholesale replace these shared owners from the old producer baseline.

Preserve all current Stage1 Secret Debt/D51, Palace v15-v19, Night/Activity, current Strong Meta registry entries, and current UI composition.

## Locked D39 semantics

Strong Meta:
- max 1 Keystone
- max 2 Specialists
- no extra/free Palace Specialist slot
- ordinary Hard Work packages remain outside slots
- current-run Strong Meta snapshot is immutable

Service Life reward:
`palace.service-life.steady-practice`
- Specialist
- first 2 distinct ordinary careers bind at exactly 8 completed shifts
- each bound career gets exactly 3 qualifying D31 seasonal -1 protections
- max 6 protected points/run
- non-D31 stat loss remains real

Court Power reward:
`palace.court-power.formal-introduction`
- Specialist
- 3 uses/run
- 1 use/relationship ID
- atomic successful authored transition only
- failed/invalid transition consumes nothing
- no generic relationship auto-tagging

Inner Truth knowledge:
`palace.inner-truth.source-method`
- automatic knowledge
- slot-free
- never selectable
- no same-life activation
- future run snapshot only
- no direct resource/progression mechanic

Return Home:
`palace.true.cap-200`
- Specialist slot behavior unchanged

## Canonical Palace ending bindings

In current v19 `content/definitions.json`, apply exactly:

`ending.palace.service-life`
-> strongMeta `palace.service-life.steady-practice`

`ending.palace.court-power`
-> strongMeta `palace.court-power.formal-introduction`

`ending.palace.inner-truth`
-> knowledge `palace.inner-truth.source-method`

`ending.palace.return-home`
-> strongMeta `palace.true.cap-200`

Use canonical D39 transaction lifecycle. Do not use generic unlocks and do not create a Palace-specific grant path.

## Compatibility rules

Preserve:
- schema-6 compatibility/defaults
- protected profile merge behavior
- exactly-once permanent ownership
- reward grant only at `completeEnding`
- no same-life activation
- Palace mechanics/content/presentation unchanged
- the three repaired Palace outcome capability reads
- Secret Debt/D51 state and validators
- current `src/ui/app.ts` Palace + Secret Debt + Night/Activity composition

If the target already has later Strong Meta IDs that producer v20 lacks, union them; never erase them.

## Verification

Run on the exact resulting Chat2 head:
1. `npm ci`
2. `npm run typecheck`
3. `npm run validate`
4. `npm run build`
5. focused:
   - `tests/palace-d39-reward-producer-v20.test.ts`
   - `tests/strong-meta-registry-v7.test.ts`
   - `tests/strong-meta-engine-integration-v7.test.ts`
   - `tests/ending-meta.test.ts`
   - `tests/palace-d23-consumer-integration-v8.test.ts`
   - Palace v15/v16/v18/v19 focused tests
   - Secret Debt separation smoke

Do NOT run Stage2 full CI yet.

If runner is unavailable, do not fabricate green. Report exact head for Leader executable QA.

## Stop condition

Stop at:
`D39_RUNTIME_READY_FOR_LIVE_CONSUMERS`

Report:
- exact head SHA
- files changed
- Strong Meta registry version/counts/capacities
- proof of four exact Palace metaReward bindings
- proof Source Method is automatic/slot-free
- proof current-run snapshot remains immutable
- proof no same-life activation
- verification results
- confirmation that D39 live consumer content was NOT applied.
