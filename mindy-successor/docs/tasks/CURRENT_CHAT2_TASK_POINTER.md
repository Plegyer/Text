# CURRENT CHAT2 TASK POINTER

Status: **ACTIVE — STRONG META CURRENT-MAIN ASSEMBLY**
Owner: Chat 2 / sole full-CI integration lane

Completed preflight:
`chat2/preflight-strong-meta-current-main-20261003-v1@08d337be6ce16fdfce1c032bbe5a1bb18abe22cd`

Preflight verdict:
`READY_FOR_CURRENT_MAIN_ASSEMBLY`

Frozen producer:
`chat4/strong-meta-runtime-producer-v7@6c3865aec1283055ab0713ca4b2873d379f3ddc6`

Exact producer dependency base:
`a579bd868d07a9fe10d504f6294ca7a7e3cea023`

Fresh assembly base:
`main@ecaf2af5de0932b3c9bd4d87b62533c74ed1e61e`

New branch:
`chat2/assembly-strong-meta-current-main-20261003-v1`

## Assignment

Reconstruct the frozen Strong Meta runtime safely on fresh current main.

Do NOT merge the old producer branch wholesale.
Do NOT copy old-base `engine.ts` or `schema.ts` wholesale.

### Production reconstruction

1. Add frozen `src/core/strongMeta.ts` exact producer blob.
2. Reconstruct only the accepted Strong Meta schema v6 hunks:
   - strong Meta reward variant;
   - run strongMetaSnapshot;
   - run strongMetaRuntime;
   - permanent meta.strongMeta;
   - schema v5 -> v6 migration.
3. Manually merge frozen Strong Meta `engine.ts` hunks into current engine.
4. Preserve current D23:
   - import `markPalaceCreationQualification`;
   - call it after creation completion/package/snapshot freeze;
   - no permanent Palace unlock;
   - never restore `ensurePalaceUnlock(s.meta)`.
5. Remove the old direct fresh-life cap-200 bypass:
   cap 200 must come only from selected `palace.true.cap-200` Specialist.
6. Preserve ordinary Hard Work packages completely outside Strong Meta capacity.
7. Preserve D31 content byte-for-byte.

### Exact capacity

Keep:
- 0..1 Keystone;
- 0..2 Specialists;
- cap-200 consumes one normal Specialist slot;
- no hidden/free Palace slot.

Run snapshot must preserve resolved selected effects for the life.

### Registry scope for this assembly

Do not speculatively broaden beyond frozen v7 approved runtime IDs:
- `palace.true.cap-200`
- `secret-debt.paid-freedom.earned-reserve-match`
- `secret-debt.bound-life.work-rhythm`
- `secret-debt.takeover.network-retainer`

D38-D41 reward extensions are later typed integrations after this base runtime lands.

### Secret Debt seam

Current executable main still lacks canonical bound runtime state.

Do not invent one in this assembly.

Preserve the frozen explicit `secretDebtBound` seam and ordering:
selected modifier -> bound next-day Energy -1 -> final available Energy.

### Tests

Reconstruct the nine frozen producer tests.

Repair current:
`tests/palace-d23-consumer-integration-v8.test.ts`
only so cap-200 is activated through the typed Specialist path rather than the deleted direct setup argument.

Keep all current D31/natural-route tests from main.

## Focused gate before full CI

Run:
- typecheck;
- validate;
- build;
- all frozen Strong Meta tests;
- D21-D24 Hard Work preservation;
- New Start+ UI preservation;
- Palace D23 consumer;
- D31 exact-map and natural routes;
- Night/Energy/poverty preservation;
- save migration v4/v5 -> v6;
- snapshot immutability/coherence;
- ending reward exactly-once ownership.

Mine all failures first.

Only after focused green:
1. open assembly PR;
2. consume one full-CI run;
3. freeze exact head;
4. report `READY_FOR_LEADER_MERGE`.

Do not merge main.
