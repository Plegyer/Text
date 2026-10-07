# CURRENT CHAT2 TASK POINTER

Status: **STAGE 2 - D39 RUNTIME REPAIR REQUIRED**
Owner: Chat 2 / sole production assembly + full-CI lane

Work branch:
`chat2/assembly-palace-d39-d48-current-main-v76`

Exact repair base:
`5ae81e33e4a699443ea2ac1e33241ba905bb81fb`

Do not apply D39 live consumers, Strong Meta UI, or D48 in this repair.

## Why this repair exists

Leader exact-source gate on `5ae81e33e4a699443ea2ac1e33241ba905bb81fb`:
- run: `37646730445`
- npm ci: reached successfully
- typecheck: **FAIL**
- validate/build/focused tests: not reached

The failure is a semantic-union defect, not a Palace v19 defect.

Leader also repaired the four Palace ending bindings on `5ae81e33e4a699443ea2ac1e33241ba905bb81fb` so they now use the canonical plural `metaRewards` arrays. Preserve that exact repair.

## Repair 1 — schema.ts D39 condition union

Current target imported `approvedStrongKnowledgeIdSchema` and added the Formal Introduction effect/capability IDs, but it omitted D39 condition variants.

Add to `Condition`:
- `{kind:'strongMetaKnowledge';knowledge:string;present:boolean}`
- `{kind:'strongMetaFormalIntroductionAvailable';career:string;relationship:string;transition:string}`

Add to `conditionSchema`:
- `strongMetaKnowledge` using `approvedStrongKnowledgeIdSchema`
- `strongMetaFormalIntroductionAvailable` using typed career/relationship/transition IDs

Accepted authority:
`chat5/palace-d39-reward-producer-v20@b28b19628c0374c405cd32afedb0f16c105e2403`

## Repair 2 — schema.ts knowledge MetaReward

Current `metaRewardSchema` omits D39 knowledge reward support even though engine handles it.

Add exactly:
`{kind:'knowledge', rewardId, knowledge:approvedStrongKnowledgeIdSchema}`

Preserve existing unlock/hardWork/strongMeta variants.

## Repair 3 — content.ts structural semantic union

Current Chat2 merge corrupted `content.ts` around machine-reference validation:
- duplicate `isAdvance`
- duplicate `checkEffectReference`
- relationship-condition code using `c` was moved into an effect function
- parts of effect validation are outside their intended function
- Formal Introduction typed read requirements are incomplete

Reconcile this section against accepted producer authority **semantically**, while preserving all current Secret Debt/D51/current-main validation logic.

Required resulting behavior:
- `checkMachineReference` retains relationshipStage / relationshipCounter / relationshipFact / relationshipChoice validation
- it additionally validates `strongMetaFormalIntroductionAvailable` career + relationship + transition
- exactly one `isAdvance`, including `useStrongMetaFormalIntroduction`
- exactly one `checkEffectReference`
- `advanceRelationship` validation remains intact
- `useStrongMetaFormalIntroduction` validates ordinary career, career machine, relationship machine, transition
- `checkTypedRead` for `strongMetaKnowledge` requires meta capability `strongMetaKnowledge`
- `checkTypedRead` for `strongMetaFormalIntroductionAvailable` requires:
  - meta `strongMetaFormalIntroduction`
  - referenced career read
  - referenced relationship read
- `checkTypedWrite` keeps `useStrongMetaFormalIntroduction` under relationship writes

Do NOT wholesale replace current `content.ts`; preserve Secret Debt/D51 and later shared validation.

## Already correct / preserve

Do not regress:
- `strongMeta.ts` registry v4
- Keystone cap 1
- Specialist cap 2
- Steady Practice D39 runtime
- Formal Introduction D39 runtime
- Source Method automatic knowledge registry
- engine D39 runtime transaction implementation
- app.ts two D39 condition labels
- Palace v15-v19 behavior
- exact four Palace `metaRewards` arrays now present on repair base
- no live consumers yet

## Four canonical Palace bindings that MUST remain

- `ending.palace.service-life` -> strongMeta `palace.service-life.steady-practice`
- `ending.palace.court-power` -> strongMeta `palace.court-power.formal-introduction`
- `ending.palace.inner-truth` -> knowledge `palace.inner-truth.source-method`
- `ending.palace.return-home` -> strongMeta `palace.true.cap-200`

Do not reintroduce singular `metaReward`.

## Verification

Run if executable environment is available:
1. `npm ci`
2. `npm run typecheck`
3. `npm run validate`
4. `npm run build`
5. focused D39 + Palace + Secret Debt bundle from the previous pointer

If environment is unavailable, report NOT RUN and exact SHA. Leader will run exact-source Actions.

Do not run Stage2 full CI yet.

## Stop marker

Stop at:
`D39_RUNTIME_REPAIR_READY_FOR_LEADER`

Report exact head, changed files, proof the four bindings remain canonical, and whether checks ran.
