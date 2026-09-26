# Save / Reload Adversarial Matrix v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Audit base: `42de07be793d0f5ef0b59ea2c8acf9f0c4c80125`

## How to execute this matrix

For every case, capture three normalized serialized states where applicable:

- **S0** — state immediately before the operation/checkpoint;
- **S1** — state immediately after the operation/checkpoint and successful save;
- **S2** — state immediately after reload, before any new user command.

Unless a migration is expected, `S2` must deep-equal the normalized `S1`. Repeating a UI click after reload must either be rejected by persisted flow state or perform only the next legitimate transition; it must never replay a committed cost/reward.

Coverage labels below describe the A4 audit base, not future completion.

| ID | Adversarial checkpoint | Procedure | Required assertions | Current coverage |
|---|---|---|---|---|
| SR-01 | **Before paid Work** | Save at DayHub with enough Energy and money, reload, execute one paid/wage-bearing Work command | Reload changes nothing; Work consumes exactly one declared Energy/cost; wage/reward/counter apply once; day unchanged; deterministic Resolver result | NOT_COVERED as a focused reload/exactly-once test |
| SR-02 | **After paid Work** | Execute Work, save immediately after atomic command but before resolving any resulting blocking scene, reload | Work cost/wage/stat/counter are not replayed; pending event snapshot is preserved; retry cannot create a second shift | PARTIAL: action/pending persistence exists, but no focused paid-work exactly-once reload test |
| SR-03 | **Pending Resolver scene** | Trigger a probabilistic blocking event, save pending, reload, attempt incompatible action, then resolve choice | Same event/variant/reaction epoch/allowed choices; RNG unchanged; incompatible action blocked; choice effects apply once | VERIFIED by `tests/resolver.test.ts` pending/RNG tests |
| SR-04 | **After lodging payment, before night choice** | Begin NightFlow, choose normal lodging, save, reload, try choosing lodging again, then choose night activity | Money remains at post-payment value; `lodgingPaymentCommitted=true`; second lodging payment rejected; calendar not advanced before night completion; final calendar advance once | VERIFIED by `tests/night-flow.test.ts` normal paid night test |
| SR-05 | **Pending forced night event** | Trigger probabilistic before- or post-lodging forced scene, save, reload, resolve | Same event/variant/RNG; intercept policy preserved; suppressed rent/menu remains suppressed; flow resumes correct phase; day advances once | VERIFIED by `tests/night-flow.test.ts` forced-night reload tests |
| SR-06 | **Inside future Activity** | Enter Activity (2 Energy), perform one internal action, save with nontrivial internal resource/checkpoint/RNG, reload | Activity ID/definitionVersion/status/internalState/checkpoint/RNG identical; entry cost not repeated; daily Energy unchanged by internal step | PENDING_A5 |
| SR-07 | **Activity result boundary** | Save immediately before success/escape exit; execute exit; save pending Resolver continuation; reload | Result emitted once; Activity closes once; accumulated reward not duplicated; Resolver sees same result fact; no second entry cost | PENDING_A5 |
| SR-08 | **Ending eligible, before commit** | Reach ≥2 eligible endings, save, reload, perform a normal permitted action | Run remains active; eligibility set preserved; no Meta reward; normal play allowed; no implicit commit | PENDING_A6 |
| SR-09 | **Ending committed, before reward/completion** | Commit an ending, save before central completion/reward, reload | Commitment and chosen ending preserved; normal progression suppressed; no premature Meta; completion resumes once | PENDING_A6 |
| SR-10 | **After reward, before New Run** | Complete run and apply reward, save immediately before New Run, reload repeatedly | Stable RunResult/proof preserved; reward count/unlock/resources unchanged across reload; no second award path | PENDING_A6 |
| SR-11 | **After New Run** | Start New Run after rewarded completion, save, reload | New Run domains remain reset; protected Meta and visible Meta modifier remain; old Activity/Night/Pending/Ending transient flow is absent | PENDING_A6 |
| SR-12 | **Corrupted JSON** | Replace primary save with malformed JSON while preserving backup; launch/load | Corrupt primary is not executed or silently repaired into gameplay; valid backup is used when available; if both invalid, load stops and files remain untouched | VERIFIED by `tests/storage.test.ts`, `tests/ui.test.ts` corrupt-save case and `desktop/save-store.cjs` |
| SR-13 | **Unknown persisted content ID / stage** | Mutate a persisted typed machine ID or stage to a nonexistent value and load | Load rejects with incompatible/reference error before play; no partial state is committed | VERIFIED by `tests/typed-effects.test.ts` schema4 save validation |
| SR-14 | **Unknown pending event/choice snapshot** | Mutate pending allowed choice or referenced pending content and load | Snapshot/reference validation rejects rather than selecting a new random choice/variant | VERIFIED for tampered allowed choices; broaden to deleted-event content migration in later migration suite |
| SR-15 | **Older imported profile vs newer Meta** | Import supported older save while current profile has additional completed/unlocks/hard-work/counters | Current Meta is never reduced; union/max policy is obeyed | VERIFIED by `tests/migration.test.ts` protected Meta merge |
| SR-16 | **Legacy pending scene migration** | Load schema-3 save with resolved pending event+variant and fixed RNG | Target PendingScene points to same event/variant; no reroll; repeated serialize/parse stable | VERIFIED by `tests/migration.test.ts` pending/RNG roundtrip |
| SR-17 | **Unsupported old calendar position** | Load legacy prototype save beyond supported 160-day target range | Explicit incompatibility/rejection; no modulo/wrap or invented date | VERIFIED by `tests/migration.test.ts` old-date rejection |
| SR-18 | **Unknown future schemaVersion** | Change schemaVersion to unsupported future value and load | Reject before play; source remains untouched | VERIFIED by `tests/engine.test.ts` invalid version case |
| SR-19 | **Removed/renamed content across contentVersion** | Load a supported old save whose event/stage/item ID was renamed/removed under a declared content migration | Explicit ID migration, compensated cancellation, or clear incompatibility; never silently clear a paid pending flow | NOT_COVERED by current focused fixtures |
| SR-20 | **Migration alias collision** | Construct two old IDs mapping to the same target alias in a forbidden collision | Loader/migration rejects deterministically with diagnostic | NOT_COVERED |
| SR-21 | **Save write interrupted** | Simulate a failed/partial write after a known-good primary exists | Serialized write queue prevents overlap; known-good backup survives; subsequent read returns primary or backup, never partial successful state | VERIFIED at storage-unit level by `tests/storage.test.ts`; repeat on packaged Windows build |
| SR-22 | **Presentation override corruption** | Store invalid presentation override while life save is valid, then launch | Mechanics save remains intact; invalid presentation patch is rejected/falls back independently | PARTIAL: separation is tested in `tests/ui.test.ts`; add explicit corrupt-presentation regression if release gate needs it |

## Case-specific exact-once counters

For transactional cases, capture a small before/after ledger and require the delta to be exactly one application:

| Operation | Ledger fields |
|---|---|
| Work | daily Energy, money, career shifts/counter, affected stats, history count |
| School | daily Energy, money, track progress, affected stat/fact, reaction epoch |
| Lodging | money, `lodgingPaymentCommitted`, selected lodging, calendar |
| Night choice | selected choice, next-day modifiers, NightFlow phase, calendar |
| Activity entry | daily Energy, entry-cost proof/phase, Activity ID/version/checkpoint |
| Activity internal step | Activity-owned resource/checkpoint only; daily Energy unchanged |
| Activity exit | result ID/fact, accumulated reward, Activity status, Resolver epoch |
| Ending commit | committed ending ID/status; no Meta application |
| Run completion | stable RunResult/result ID, completion status |
| Meta reward | applied-result proof + affected Meta fields |
| New Run | run ID/domains reset + Meta preserved |

## Failure atomicity rule

For every intentionally rejected command or load:

1. serialize caller/current known-good state before the operation;
2. execute the invalid/repeated command;
3. assert an error/rejection;
4. serialize caller/current state again;
5. assert equality with the pre-operation state unless the contract explicitly defines a recovery migration.

A rejection that leaves half-paid money, advanced calendar, partial Activity reward or partially applied Meta is a gate failure.

## Highest-risk future checkpoints

The highest-risk unresolved cases are SR-06/SR-07 (Activity entry vs internal state vs result boundary) and SR-09/SR-10 (ending commitment/completion/reward idempotency). They cross subsystem boundaries and contain costs/rewards that are expensive to recover if duplicated. Execute them before broad product content scaling.
