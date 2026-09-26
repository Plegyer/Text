# Product Activation CI Evidence v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Worker branch: `chat4/activation-ci-gate-next`  
Lead branch under review: `lead/product-activation-school-lumber-v2`

## Purpose

This checklist defines the exact evidence required before production activation can merge.

The activation candidate is not considered merge-ready from source inspection alone. Evidence must come from the exact candidate SHA or its merge-ref and must cover:

- type safety;
- production catalog validation;
- build output;
- full test suite;
- shipped `dist/content.json`;
- schema-4 save compatibility;
- School/Night/Forest exactly-once behavior;
- Hard Work exact contract and transaction idempotency.

Historic green runs from earlier PRs do not satisfy this gate.

At the time this document was written, Lead HEAD `e54635bf0026be1d188723b927d5c4813306c71f` had no attached GitHub workflow run.

---

# 1. Canonical command gate

The authoritative repository command is:

```bash
npm run check
```

from:

`mindy-successor/prior-work/astra/prototype-m3.2`

Current `package.json` expands it to:

```text
npm run typecheck
&& npm run validate
&& npm run build
&& npm test
```

The merge evidence must identify the exact commit SHA that ran these steps.

A manual statement that individual files “look correct” is not a replacement.

---

# 2. Typecheck evidence

## Required command

```bash
npm run typecheck
```

## Required result

Exit code 0.

## Why this matters for activation

The visible Lead diff adds or changes typed boundaries across:

- `Command.schoolLesson`;
- School typed progression state;
- `incrementSchoolCounter`;
- semantic presentation IDs;
- UI command dispatch for School, Night and Activity.

Typecheck must cover the exact merged combinations rather than isolated branches.

## Required log evidence

Keep:

- command;
- exact SHA;
- exit code;
- no TypeScript diagnostic lines.

---

# 3. Production content validation evidence

## Required command

```bash
npm run validate
```

## Required result

Exit code 0.

Current validator constructs the production catalog from:

- `content/definitions.json`;
- sorted top-level `content/packs/*.json`;
- `content/presentation.json`.

It also verifies production media paths exist.

## Must prove

Validation includes the promoted production Lumber packs:

- `lumber-production.json`;
- `lumber-cross-production.json`;
- `lumber-night-production.json`.

It must reject:

- dangling domain references;
- duplicate pack IDs;
- invalid event/condition/effect structures;
- missing media sources.

## Required log evidence

Capture the final:

`Content OK: ...`

line and the exact pack/action/ending counts.

Counts are evidence only when tied to the candidate SHA and the exact production pack set.

---

# 4. Build evidence

## Required command

```bash
npm run build
```

## Required result

Exit code 0.

Current build writes:

`dist/content.json`

from the same sorted top-level production pack directory.

It also bundles:

- renderer;
- save validator;
- assets.

## Required artifact evidence

The build job must retain or inspect:

- `dist/content.json`;
- `dist/app.js`;
- `dist/save-validator.cjs`;
- `dist/assets/`.

For activation QA, `dist/content.json` is the critical artifact.

Its exact contract is specified in:

`PRODUCT_ACTIVATION_DIST_CONTENT_AUDIT_v1.md`.

---

# 5. Full test suite evidence

## Required command

```bash
npm test
```

## Required result

Exit code 0, zero failing tests.

The result must come from the activation candidate after all source/content/UI/test updates are present together.

## Explicit stale-test watch

The current Lead source adds:

`incrementSchoolCounter(...night_study_sessions...)`

to Night study.

Any pre-activation test that still asserts a one-effect Night-study array must be updated intentionally before the full suite can be accepted.

A test disabled/skipped merely to make activation green does not satisfy the gate.

---

# 6. Shipped dist catalog evidence

After `npm run build`, parse:

`dist/content.json`.

The artifact must prove the player receives the activated production catalog, not only source fixtures.

## Required definitions

At minimum:

- action `lumber.shift`;
- career `lumber`;
- relationship `lumber.foreman`;
- Activity `lumber.forest`;
- ending `ending.lumber.hard-work`;
- ending `ending.lumber.forewoman`;
- ending `ending.lumber.forest`;
- production lodgings;
- `lumber.foreman.night`;
- School Night-study production choices.

## Required production pack IDs exactly once

- `lumber`;
- `lumber-cross`;
- `lumber-night`.

## Must be absent as production activation shortcuts

- synthetic action `school.lumber-management`;
- fixture-only nested pack duplicates.

Exact dist audit rules are defined in Queue item 3.

---

# 7. Schema-4 save compatibility evidence

The candidate must prove compatibility using serialized saves, not only direct schema-object tests.

Required cases:

1. old schema-4 save with no `progression.school`;
2. old pending scene with no presentationId;
3. new pending scene with slash semantic presentationId;
4. old legacy Lumber action count/lastAction;
5. old legacy School action count/lastAction;
6. active Activity;
7. active NightFlow before lodging;
8. active NightFlow after paid lodging;
9. paid School lesson state;
10. ending committed;
11. completed Hard Work RunResult.

For every case:

```text
JSON.stringify
-> parseSave
-> invariant assertions
```

must succeed unless the case is explicitly documented as incompatible.

The exact expected invariants are defined in Queue item 4.

---

# 8. Semantic presentation persistence evidence

Required direct proof:

```text
pending target event with
presentationId =
job/lumber/event/lumber-career-first-shift/default
-> serialize
-> parseSave
-> exact same presentationId
```

Mechanical identity must also remain exact:

- eventId;
- variantId;
- allowedChoiceIds;
- reactionEpochId.

Required result-render proof:

a School or Lumber action result must render using persisted:

`lastAction.presentationId`

after reload.

The UI must not replace the persisted semantic slot with a recomputed generic identity.

---

# 9. Paid School lesson exactly-once evidence

For each of the eight locked courses, or at minimum one representative course plus complete data-table assertions:

## Before

Capture:

- money;
- current-day Energy;
- all course target stats;
- `lessons_completed`;
- action count;
- pending/Resolver state.

## Execute

```ts
dispatch(save,{type:'schoolLesson',id:courseId},catalog)
```

## Assert exactly once

- tuition deducted once;
- current-day Energy reduced by exactly 1;
- every stat package delta applied once;
- `lessons_completed +1`;
- no `night_study_sessions` increment;
- Resolver sees the complete post-lesson state;
- save/reload twice does not repeat any charge/effect/counter.

## Ordering evidence

The final accepted engine integration must prove ending eligibility registration and Resolver visibility occur in the intended canonical order.

This remains a current blocker on the reviewed Lead source.

---

# 10. NightFlow exactly-once evidence

## Lodging

Required path:

```text
endDay
-> chooseLodging
-> save/reload
```

Assert:

- lodging money paid once;
- `lodgingPaymentCommitted=true`;
- reload cannot charge again.

## School Night study

Required path:

```text
VoluntaryNightChoice
-> choose school.night_study.*
-> reload twice
```

Assert:

- selected supported stat +2 exactly once;
- `night_study_sessions +1` exactly once;
- `lessons_completed` unchanged;
- zero tuition;
- zero current-day Energy charge;
- next-day Energy delta -1 applied through Night lifecycle once;
- no Lust mutation.

## Foreman Night

Assert:

- relationship night counter increments once;
- daytime Energy unchanged;
- pending event survives reload;
- next day advances once.

---

# 11. Forest Activity exactly-once evidence

Required production path:

```text
legitimate entry conditions
-> enterActivity(lumber.forest)
-> save/reload inside Activity
-> advance or escape
```

Assert:

- entry Energy cost = 2 exactly once;
- internal progress/endurance/RNG/checkpoint survive reload;
- reload does not redispatch entry;
- success emits the exact ActivityResult once;
- success continuation triggers once;
- escape does not emit success continuation;
- post-result reload does not duplicate career facts/rewards.

UI evidence must additionally show:

- active Activity screen after reload;
- exact `advance` / `escape` commands.

---

# 12. Hard Work boundary evidence

The production ending must be deep-equal on its eligibility condition to:

```json
[
  {
    "kind":"careerCounter",
    "career":"lumber",
    "counter":"completed_shifts",
    "op":"gte",
    "value":50
  }
]
```

Required executable boundary:

- 49 completed shifts -> not eligible;
- execute one real target `lumber.shift`;
- 50 -> eligible.

No School, Forest, relationship, stat, money, season or item prerequisite is allowed.

---

# 13. Hard Work completion exactly-once evidence

Required reward:

```text
hardWork:lumber
```

Required path:

```text
eligible
-> commitEnding
-> save/reload
-> completeEnding
-> save/reload twice
```

Assert:

- commit does not apply reward;
- completion creates one RunResult;
- `appliedMetaRewardIds` contains exactly one `hardWork:lumber`;
- `meta.hardWorkProgress` contains `lumber` once;
- transaction ID appears once in `appliedResultTransactions`;
- repeated reload does not duplicate reward or transaction;
- New Life preserves the Meta result.

---

# 14. UI reachability evidence

The final candidate needs focused jsdom/UI assertions for the production controls.

## Lumber

Work panel exposes:

`data-action="lumber.shift"`

not legacy `lumber` as the target route.

## School

Exactly eight course controls use:

`data-school-course="<SchoolCourseId>"`

and dispatch `schoolLesson`.

## Night

UI can dispatch:

- `endDay`;
- `chooseLodging`;
- `chooseNightChoice`.

## Activity

UI can dispatch:

- `enterActivity:lumber.forest`;
- `activityAction:advance`;
- `activityAction:escape`.

Reload into active Activity/Night states must restore the correct central UI.

---

# 15. Evidence package required for Lead review

Before merge, the Lead handoff should contain one compact evidence block with:

- candidate SHA;
- merge-ref SHA if used;
- `npm run typecheck` pass;
- `npm run validate` pass and catalog counts;
- `npm run build` pass;
- `npm test` pass with total/pass/fail;
- `npm run check` pass;
- dist-content contract pass;
- schema-4 compatibility matrix pass;
- School/Night/Forest exactly-once subset pass;
- 49/50 Hard Work boundary pass;
- Hard Work commit/completion/reload idempotency pass.

If any item is not run, say **NOT RUN**.

Do not substitute “source reviewed” for executable evidence.

---

# Current evidence disposition

For Lead HEAD `e54635bf0026be1d188723b927d5c4813306c71f`:

- typecheck: **NOT RUN / no workflow evidence found**;
- validate: **NOT RUN / no workflow evidence found**;
- build: **NOT RUN / no workflow evidence found**;
- full tests: **NOT RUN / no workflow evidence found**;
- dist artifact: **NOT VERIFIED**;
- schema-4 activation compatibility: **NOT VERIFIED on this HEAD**;
- School Resolver ordering: **source blocker remains**;
- Night-study test/source consistency: **source/test blocker remains**.

No production file was modified by Chat 4.
