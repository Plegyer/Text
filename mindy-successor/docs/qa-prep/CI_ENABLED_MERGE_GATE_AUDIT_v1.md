# CI-Enabled Merge Gate Audit v1

Date: 2026-09-27  
Worker: Chat 4 / QA Acceptance  
Workflow: `.github/workflows/mindy-successor-check.yml`

## Executive result

**PASS — CI gate matches current project needs**

The workflow is correctly scoped to the mindy-successor subtree, uses the current minimum Node version, installs from the correct lockfile, and executes the project-standard aggregate check.

It does not change product/runtime/content semantics.

---

# 1. Workflow-only PR

PR31 changed exactly:

`.github/workflows/mindy-successor-check.yml`

No production runtime/content/UI file was changed.

Classification:

**PASS**

---

# 2. Node version matches package engines

Workflow:

`node-version: '22.18.0'`

Current `package.json`:

```json
"engines": {
  "node": ">=22.18.0"
}
```

Therefore CI uses the minimum supported Node version exactly.

Classification:

**PASS**

---

# 3. npm ci uses the correct lockfile

Workflow working directory:

`mindy-successor/prior-work/astra/prototype-m3.2`

Cache dependency path:

`mindy-successor/prior-work/astra/prototype-m3.2/package-lock.json`

That lockfile exists on current main.

Install step:

`npm ci`

Classification:

**PASS**

---

# 4. npm run check covers required phases

Current scripts:

```json
"check": "npm run typecheck && npm run validate && npm run build && npm test"
```

Therefore CI covers:

1. typecheck;
2. content validation;
3. build;
4. full test suite.

Classification:

**PASS**

---

# 5. Pull-request trigger scope

Workflow:

```yaml
pull_request:
  paths:
    - 'mindy-successor/**'
    - '.github/workflows/mindy-successor-check.yml'
```

This means:
- mindy-successor production/runtime/content/tests/docs changes trigger CI;
- workflow edits trigger CI;
- unrelated repository changes outside the project subtree do not waste this gate.

Classification:

**PASS**

---

# 6. Main push trigger scope

Workflow:

```yaml
push:
  branches:
    - main
  paths:
    - 'mindy-successor/**'
    - '.github/workflows/mindy-successor-check.yml'
```

This gives post-merge verification when:
- project files land on main;
- the workflow itself changes.

Classification:

**PASS**

---

# 7. Exact-head PR evidence

PR-triggered workflow runs are associated with exact PR head SHAs.

Observed examples:

## PR31

Head:
`ef800058518dd3fbcf3e06249bf89bdb21c2e9f5`

Run:
`36307384356`

Result:
**221/221 PASS**

## PR32 corrected head

Head:
`5ed5728cd5db75b8c27624c510125d0d0584b736`

Run:
`36307562265`

Result:
**225/225 PASS**

## PR33

Head:
`17bbc911a39cd6d726d82c49461cfe18c5b11d02`

Run:
`36307690216`

Result:
**223/223 PASS**

## PR34

Head:
`5f1bd3e644a00ed6c65f67511564e2414de09e5a`

Run:
`36308181336`

Result:
**227/227 PASS**

Classification:

**PASS — exact-head evidence is available**

---

# 8. Failure/retry visibility works

PR32 first target-career attempt:

Head:
`9d99592b10fb91d4aefc46abd36465749d4e8f80`

Run:
`36307477953`

Result:
- 225 tests;
- 224 pass;
- 1 fail.

Failure:

`Satyr Maid and Undead Farm first target shifts persist typed career progress and semantic result identity`

The corrected PR32 head later passed 225/225.

This proves the gate detects real target-state regression rather than merely reporting branch health.

Classification:

**PASS**

---

# 9. Push-to-main evidence

Observed successful push runs:

## PR33 merge commit

Merge SHA:
`e36cc1aaa44991d3340276b4f82efa5c9d9cf15a`

Push run:
`36307836767`

Conclusion:
**success**

## PR34 merge commit

Merge SHA:
`712ab6c7368ab21906f3fcb0184b35d4f3e1411c`

Push run:
`36308257142`

Conclusion:
**success**

## Later handoff main commit

SHA:
`22772b1439c247d67fdd20c4e3fd55cc2eba4e20`

Push run:
`36308484684`

Conclusion:
**success**

Classification:

**PASS**

---

# 10. No product/runtime semantics changed

The workflow:
- checks out code;
- installs dependencies;
- runs the existing project check.

It does not:
- mutate production content;
- change runtime state;
- alter save schema;
- modify UI behavior;
- add Product rules.

Classification:

**PASS**

---

# PR29 / PR33 policy change

Before CI:

PR29 was:
- test-only;
- static-review green;
- no executable workflow evidence.

Correct status was:
`GREEN_FOR_MERGE_PENDING_STANDARD_FULL_CHECK`

After CI became available:

PR29 was closed/superseded.

PR33 recreated the same test-only poverty contract on CI-enabled current main.

PR33 exact-head CI:
**223/223 PASS**

Then PR33 merged and push CI succeeded.

Policy consequence:

Future tests-only PRs should not rely on static review when the CI gate is available.

Require exact-head CI before treating them as regression-floor evidence.

---

# PR32 / PR34 replacement policy change

PR32 demonstrated CI correctly:
- first run red;
- corrected run green 225/225.

But main then advanced through PR33.

Instead of merging stale-base PR32, Lead closed it and created PR34 on current main.

PR34:
- exact-head 227/227;
- merged;
- post-merge push CI successful.

Policy consequence:

For long-lived/stale production PRs:
- green old-head CI is not enough after meaningful main advancement;
- rebuild/rebase on current main;
- require fresh exact-head CI.

This is the correct current integration model.

---

# Merge-gate limitations

The workflow is a strong repository check but does not by itself prove:
- manual product UX;
- final Windows installer behavior;
- external deployment quotas;
- human Product decisions.

Those remain separate gates where relevant.

---

# Final audit

| Check | Result |
|---|---|
| workflow-only change | **PASS** |
| Node version | **PASS** |
| lockfile path | **PASS** |
| npm ci | **PASS** |
| typecheck | **INCLUDED** |
| validate | **INCLUDED** |
| build | **INCLUDED** |
| full tests | **INCLUDED** |
| PR trigger scope | **PASS** |
| main push scope | **PASS** |
| exact-head evidence | **PASS** |
| failure detection | **PASS** |
| product/runtime semantics unchanged | **PASS** |

The CI gate is suitable as the default exact-head/full-check evidence source for future mindy-successor integration PRs.

No production runtime/UI/content file was modified by Chat 4.
