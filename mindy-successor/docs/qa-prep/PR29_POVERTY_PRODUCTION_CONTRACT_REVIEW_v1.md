# PR29 Poverty Production Contract Review v1

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance  
PR: #29 — `Lead: add production poverty anti-softlock contract`  
Head: `bdd26e6dbfcd8feaf207b89a304efc8cc42bb225`  
Base: `188c0847d516078a1c6e713cce06d19b7d05b425`

## Final disposition

**GREEN_FOR_MERGE**

The PR is test-only, matches current production Night/lodging behavior, does not lock currently OPEN paid-lodging prices or a specific street Energy penalty, and preserves existing Lumber/School/Forest/Hard Work contracts.

No production runtime/content/UI file is changed.

A GitHub Actions run was not attached to the reviewed PR head at review time. The only PR comment is a Vercel deployment quota failure, which is unrelated to the game test contract. Standard full-check evidence should still be recorded by the Lead integration gate.

---

# 1. Changed files

PR29 changes exactly one file:

`prior-work/astra/prototype-m3.2/tests/poverty-production-contract.test.ts`

No changes to:

- `src/core/*`;
- `src/ui/*`;
- production `content/*`;
- presentation runtime;
- ending definitions.

Classification:

**PASS — TEST ONLY**

---

# 2. No OPEN paid-lodging price is newly locked

The test reads current production:

- `lodging.normal`;
- `lodging.cheap`;
- `lodging.street`.

For paid tiers it asserts only:

```text
normal.moneyCost > 0
cheap.moneyCost > 0
cheap.moneyCost < normal.moneyCost
```

It does **not** assert current exact production values such as:

- normal = 100;
- cheap = 50.

Therefore the test protects the structural ladder without converting current paid-lodging numbers into Product locks.

Classification:

**PASS**

---

# 3. Street penalty remains structural, not exact numeric lock

The test requires:

```text
street.moneyCost === 0
```

and:

```text
street.nextDayEnergyDelta < 0
OR
street next-day stat effect contains a negative delta
```

It does **not** assert a specific street Energy penalty such as:

`-1`.

This matches authoritative poverty direction:

- street sleep costs no money;
- it must have a real downside;
- exact balance values remain open/parameterized where not separately locked.

Classification:

**PASS**

The test therefore does not freeze the current exact street penalty.

---

# 4. Zero-money street sleep remains an anti-softlock path

The second test starts from the real production helper:

`started()`

then explicitly sets:

`money=0`

for the anti-softlock boundary.

It enters NightFlow through the real command:

`endDay`.

Then it selects real production lodging:

`lodging.street`.

Assertions:

- money remains zero;
- housing becomes `street`;
- lodging commit is recorded.

After reload and normal sleep:

- calendar advances;
- NightFlow clears;
- next-day Energy remains at least enough to perform one starting Work action.

Then one real:

`lumber.shift`

executes and increments typed Lumber progress.

This directly protects the economy safety invariant:

```text
0 money
-> street sleep
-> next day
-> starting job remains reachable
```

Classification:

**PASS**

---

# 5. School Night study remains unavailable on street

Current production School Night choices have housing conditions:

```text
housing == normal
OR
housing == cheap
```

They do not include street.

PR29 finds a real production:

`school.night_study.*`

choice and tries to dispatch it after choosing street lodging.

Expected error:

`недоступно`.

Current engine `chooseNightChoiceMutable` enforces authored conditions and throws:

`Это ночное занятие недоступно.`

Therefore test syntax/expectation matches current engine behavior.

Classification:

**PASS**

---

# 6. Starting Lumber shift remains reachable after poverty night

Current production:

`lumber.shift`

costs one Energy.

PR29 does not assert an exact post-street Energy value.

It asserts only:

`energyCurrent >= 1`

before the shift, then performs the actual shift and checks:

- `completed_shifts=1`;
- resulting Energy is non-negative.

This protects anti-softlock behavior without locking the exact street Energy penalty.

Classification:

**PASS**

---

# 7. Test syntax matches current helpers

Current `helpers.ts` provides:

- `catalog`;
- `started()`.

PR29 imports both correctly.

`started()` returns a normal arrived/creation-complete Save suitable for:

- `endDay`;
- NightFlow;
- next-day Work.

Reload helper:

```ts
parseSave(JSON.stringify(state),catalog)
```

matches the current parser contract.

Classification:

**PASS**

---

# 8. Test assumptions match current NightFlow

Current engine behavior:

- `endDay` enters NightFlow;
- `chooseLodging` commits housing;
- `chooseNightChoice` evaluates conditions;
- `night.sleep` completes the night;
- StartDay applies queued lodging penalties;
- calendar advances once.

PR29 uses this exact command surface.

It does not use legacy:

`sleep(payment)`

as the primary path.

Classification:

**PASS**

---

# 9. Current production lodging IDs match

Current `definitions.json` contains:

- `lodging.normal`;
- `lodging.cheap`;
- `lodging.street`.

Housing tiers are:

- normal;
- cheap;
- street.

Therefore PR29 is not relying on synthetic `night-flow.test.ts` IDs such as:

- `normal.room`;
- `cheap.room`;
- `street.sleep`.

It correctly tests the actual production catalog.

Classification:

**PASS**

---

# 10. Hard Work untouched

PR29 changes no ending/content file.

Current Hard Work remains:

`ending.lumber.hard-work`

with only:

`careerCounter(lumber, completed_shifts) >= 50`

and exact reward:

`hardWork:lumber`.

The test performs only one Lumber shift and does not mutate ending state.

Classification:

**PASS / UNCHANGED**

---

# 11. Forest ActivityResult untouched

PR29 changes no Activity/content/runtime file.

Current exact Lumber Forest continuation remains:

```text
activityResult(
  lumber.forest,
  success,
  lumber.forest.success
)
```

The poverty test does not inject or modify any Forest state.

Classification:

**PASS / UNCHANGED**

---

# 12. No false claim of full poverty implementation

The test title and PR body describe this as:

`production poverty anti-softlock contract`

for the already-shipped lodging ladder.

It does not claim to implement:

- street event pool;
- lender;
- Secret Debt;
- hidden Slave career;
- forced debt Night;
- poverty endings.

That distinction is important.

Existing lodging primitives are not being misreported as full poverty content.

Classification:

**PASS**

---

# 13. CI / deployment note

At review time:

- no GitHub Actions workflow run was attached to the reviewed head through the available workflow-run query;
- Vercel bot reported deployment quota exhaustion:
  `api-deployments-free-per-day`.

This is an external deployment quota issue and does not identify a game/test failure.

Because the code review found no contract/syntax blocker:

**GREEN_FOR_MERGE**

subject to the standard Lead full-check requirement on the exact integration head.

No PR29 files were changed by Chat 4.
