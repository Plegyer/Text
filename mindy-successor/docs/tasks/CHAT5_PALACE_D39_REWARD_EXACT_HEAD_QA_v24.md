# Chat 5 — Palace D39 Reward Exact-Head QA v24

Status: **READY_FOR_CHAT2_ASSEMBLY**  
Owner: Chat 5  
QA branch: `chat5/qa-palace-d39-reward-v24`

## Frozen producer boundary

Producer branch:

`chat5/palace-d39-reward-producer-v20@b5ab23a88ee0e18c6250251de15818ff799ff3f6`

Frozen executable implementation head documented by v20:

`b28b19628c0374c405cd32afedb0f16c105e2403`

Leader task branch base:

`09a97e0deef5bbccdbcdfbc4fc955f59b369345c`

The QA workflow explicitly checked out the executable implementation head, not the later handoff commit.

The frozen producer was not mutated.

## Exact-head production firewall

The implementation delta from the Leader task base to the executable head was required to be exactly these seven prototype files:

1. `src/core/content.ts`
2. `src/core/engine.ts`
3. `src/core/schema.ts`
4. `src/core/strongMeta.ts`
5. `src/ui/app.ts`
6. `tests/palace-d39-reward-producer-v20.test.ts`
7. `tests/strong-meta-registry-v7.test.ts`

The firewall passed.

The QA also compared:

`b28b19628c0374c405cd32afedb0f16c105e2403`

to final producer handoff head:

`b5ab23a88ee0e18c6250251de15818ff799ff3f6`

under:

`mindy-successor/prior-work/astra/prototype-m3.2`

Result:

**no post-implementation prototype delta**

The final producer head adds only the v20 handoff document outside the prototype tree.

## Final successful executable evidence

Workflow:

`Chat 5 Palace D39 Reward v24 exact-head QA`

Run:

`37458982676`

Job:

`112253482681`

Runner:

self-hosted Windows X64

Node:

`22.18.0`

Exact SHA guard:

**PASS**

Verified checkout:

`b28b19628c0374c405cd32afedb0f16c105e2403`

Production firewall:

**PASS**

## Build / schema gate

- `npm ci` — **PASS**
- `npm run typecheck` — **PASS**
- `npm run validate` — **PASS**
  - `Content OK: 84 packs, 357 events, 39 actions, 43 endings.`
- `npm run build` — **PASS**
  - `Built renderer, content catalog and desktop save validator.`

## D39 reward lifecycle / Strong Meta / save-load bundle

Executed:

```text
node --experimental-strip-types --test
tests/palace-d39-reward-producer-v20.test.ts
tests/strong-meta-registry-v7.test.ts
tests/strong-meta-engine-integration-v7.test.ts
tests/ending-meta.test.ts
```

Result:

- tests: **41**
- pass: **41**
- fail: **0**

This independently verifies the D39 producer's required lifecycle surface:

- `palace.service-life.steady-practice` is a normal Strong Meta Specialist;
- `palace.court-power.formal-introduction` is a normal Strong Meta Specialist;
- Specialist capacity remains exactly **2**;
- no free/third Palace Specialist slot exists;
- `palace.inner-truth.source-method` is automatic knowledge, not Specialist/Keystone ownership;
- Source Method does not enter preferred Keystone/Specialist selection;
- Service Life / Court Power permanent ownership is applied only at `completeEnding`;
- Inner Truth permanent knowledge is applied only at `completeEnding`;
- eligibility / finalize / commit alone do not grant the D39 reward;
- repeated completion remains idempotent;
- current run snapshot is not mutated by a reward earned in that life;
- D39 Specialists activate only in a later life after explicit selection;
- Source Method activates automatically only in a later run snapshot;
- old schema6 saves missing D39 runtime fields receive empty defaults;
- Steady Practice runtime survives save/reload;
- Formal Introduction used-relationship state survives save/reload;
- invalid D39 ghost runtime is rejected;
- protected profile merge unions ownership/knowledge without overwriting current preference.

## Palace D23 / Secret Debt isolation bundle

Executed:

```text
node --experimental-strip-types --test
tests/palace-d23-consumer-integration-v8.test.ts
tests/hard-work-palace-meta-smoke.test.ts
tests/chat3-secret-debt-separation-v2.test.ts
```

Result:

- tests: **18**
- pass: **18**
- fail: **0**

This confirms the requested adjacency/firewalls:

- D39 ownership does not grant Palace entry;
- D23 Palace qualification remains separate;
- Palace remains isolated from ordinary Hard Work package ownership;
- Secret Debt separation remains green;
- D39 reward mechanics do not create a Secret Debt bypass;
- Source Method remains informational/knowledge state, not a Palace-access mechanism.

## Focused total

Across both executable test bundles:

**59 / 59 PASS**

No full CI was run.

## Final disposition

Frozen implementation:

`b28b19628c0374c405cd32afedb0f16c105e2403`

from producer:

`chat5/palace-d39-reward-producer-v20@b5ab23a88ee0e18c6250251de15818ff799ff3f6`

is independently executable-green for the exact Chat 5 v24 verification scope.

Verified:

- exact SHA guard;
- production firewall;
- npm ci;
- typecheck;
- validate;
- build;
- D39 reward lifecycle;
- Strong Meta registry/integration;
- Palace D23 adjacency;
- Secret Debt isolation;
- save/load defaults and persisted runtime;
- future-life-only activation;
- Source Method as automatic slot-free knowledge only.

The frozen producer was not changed.

No full CI was run.

**READY_FOR_CHAT2_ASSEMBLY**
