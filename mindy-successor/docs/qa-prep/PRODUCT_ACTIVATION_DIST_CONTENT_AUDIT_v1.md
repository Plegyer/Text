# Product Activation Dist Content Audit v1

Date: 2026-09-26  
Worker: Chat 4 / QA Acceptance  
Worker branch: `chat4/activation-ci-gate-next`  
Lead branch inspected: `lead/product-activation-school-lumber-v2` @ `e54635bf0026be1d188723b927d5c4813306c71f`

## Purpose

This document defines the exact post-build contract for:

`dist/content.json`

after product activation lands.

The artifact must prove that the shipped desktop/web bundle receives the activated production catalog rather than isolated fixture content.

Current build logic serializes:

- production `content/presentation.json`;
- production `content/definitions.json`;
- every top-level `content/packs/*.json`, sorted by filename.

Nested directories are not recursively included.

---

# 1. Required top-level production pack set

On the reviewed Lead branch the top-level pack files are:

- `base.json`
- `ds-lumber.json`
- `gopher.json`
- `lumber-cross-production.json`
- `lumber-night-production.json`
- `lumber-production.json`
- `stage.json`

The directories:

- `lumber-target/`
- `school-target/`

must remain directories and must not be serialized recursively merely because they contain JSON.

## Required pack IDs in dist, exactly once

The corresponding expected pack IDs are:

1. `base`
2. `ds-lumber`
3. `gopher`
4. `lumber-cross`
5. `lumber-night`
6. `lumber`
7. `stage`

### Cardinality contract

`dist/content.json.packs.length === 7`

for this exact reviewed activation topology.

Every expected ID must occur once.

No duplicate `lumber`, `lumber-cross` or `lumber-night` pack may be present from nested fixture copies.

If another intentional production pack is added later, this contract must be deliberately revised rather than relaxed to “contains at least these packs”.

---

# 2. Fixture-only School pack must not be shipped

The repository contains:

`content/packs/school-target/school-production.pack.json`

This remains fixture/integration-prep content.

The reviewed Lead activation does not promote it as a top-level production pack.

Therefore `dist/content.json.packs` must **not** contain pack ID:

`school-production`

and no serialized pack path/source should be inferred from the nested School fixture directory.

School production activation is supplied through:

- `src/core/school.ts`;
- production `definitions.json` Night choices;
- production UI `schoolLesson` commands.

The fixture-only School pack must not become an accidental duplicate School authority.

---

# 3. Required target Lumber definitions in dist

`dist/content.json.definitions` must contain the activated target definitions copied from the production source.

## Action

Required:

`lumber.shift`

Legacy `lumber` may remain for schema-4/save compatibility, but the target action must exist distinctly.

## Career

Required career ID:

`lumber`

## Relationship

Required relationship ID:

`lumber.foreman`

## Activity

Required Activity ID:

`lumber.forest`

Expected core activation properties:

- entry cost remains 2 daytime Energy;
- adapter remains the existing accepted Activity adapter/version;
- success/escape/failure result IDs remain stable.

The dist audit should compare the serialized Activity object to production source rather than merely checking its ID.

## Target endings

Required:

- `ending.lumber.hard-work`
- `ending.lumber.forewoman`
- `ending.lumber.forest`

---

# 4. Hard Work exact dist contract

The shipped Hard Work ending must contain exactly one eligibility condition:

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

No extra prerequisite is allowed.

The shipped meta reward must contain exact:

```json
[
  {
    "kind":"hardWork",
    "rewardId":"hardWork:lumber",
    "career":"lumber"
  }
]
```

This audit must deep-compare both arrays.

A test that checks only `ending.id` is insufficient.

---

# 5. Synthetic School action must be absent

The isolated Lumber fixture contains a synthetic integration action:

`school.lumber-management`

That action must never appear in:

`dist/content.json.definitions.actions`

The dist assertion should be exact:

```ts
definitions.actions.some(a=>a.id==='school.lumber-management') === false
```

This prevents the fixture shortcut from becoming a second production School transaction.

---

# 6. Production School surface in dist definitions

The eight paid School courses are runtime-defined in `src/core/school.ts`, not ordinary catalog actions, so they are not expected in:

`definitions.actions`

as eight separate generic actions.

However production Night-study choices are authored into `definitions.nightChoices`.

The dist artifact should contain the complete currently activated School Night-study surface.

Representative required IDs:

- `school.night_study.literacy_and_numbers.reason`
- `school.night_study.arcana.magic`
- `school.night_study.arcana.reason`
- `school.night_study.field_craft.dexterity`
- `school.night_study.physical_training.strength`
- `school.night_study.arts_and_performance.creativity`
- `school.night_study.body_confidence.sexuality`

The exact generated set should be compared against `schoolNightStudyChoices()` during executable QA rather than maintaining a second manually copied list.

Each production Night-study choice must retain:

- +2 selected supported stat;
- +1 `night_study_sessions` typed School counter;
- no tuition effect;
- no current-day Energy effect;
- next-day Energy delta -1.

---

# 7. Required production Night definitions

Required production lodgings in dist:

- `lodging.normal`
- `lodging.cheap`
- `lodging.street`

Required Night choices include:

- `night.sleep`
- `lumber.foreman.night`
- generated School Night-study choices.

The production Foreman Night choice must retain its relationship-stage condition and one relationship counter increment.

---

# 8. Required production Lumber packs

## `lumber`

Required event IDs:

- `lumber.career-first-shift`
- `lumber.foreman-notice`

Required media IDs:

- `job.lumber.shift.spring.default`
- `job.lumber.shift.summer.default`
- `job.lumber.shift.autumn.default`
- `job.lumber.shift.winter.default`
- `job.lumber.event.accepted-hand`
- `relationship.lumber.foreman.professional`

Current production media path strategy uses:

`assets/stage-lumber.svg`

for these static fallback assets.

## `lumber-cross`

Required event IDs:

- `lumber-cross.school-management-return`
- `lumber-cross.activity-forest-return`

Required media:

- `job.lumber.event.forest-return`
- source `assets/stage-forest.svg`

## `lumber-night`

Required event:

- `lumber-night.foreman-professional`

Required media:

- `relationship.lumber.foreman.night.professional`
- source `assets/stage-lumber.svg`

---

# 9. Production media references must remain valid

Every `pack.media[].src` serialized into dist must satisfy both:

1. production media schema;
2. corresponding built asset exists in `dist/assets`.

For the newly promoted Lumber production packs, the reviewed strategy intentionally uses existing static assets instead of absent fixture GIFs.

Required source references currently include:

- `assets/stage-lumber.svg`
- `assets/stage-forest.svg`

After build, required artifact paths include:

- `dist/assets/stage-lumber.svg`
- `dist/assets/stage-forest.svg`

The dist audit must fail if a promoted production pack regresses to missing `assets/lumber/*.gif` references without those files actually being shipped.

---

# 10. Semantic presentation identity remains separate from media IDs

Dist content stores gameplay media IDs such as:

`job.lumber.shift.spring.default`

These dotted media IDs are not canonical semantic presentation IDs.

The runtime presentation layer derives semantic slots such as:

- `job/lumber/shift/spring/default`
- `job/lumber/result/default`
- `job/lumber/event/lumber-career-first-shift/default`
- `relationship/lumber-foreman/lumber-foreman-notice/default`
- `relationship/lumber-foreman/lumber-night-foreman-professional/default`
- `job/lumber/event/lumber-cross-activity-forest-return/default`
- `ending/lumber/hard-work`

The dist audit must not require slash semantic IDs to equal media IDs.

It should instead verify the serialized content is sufficient for the presentation resolver to derive the expected semantic IDs.

---

# 11. Production presentation payload

`dist/content.json.presentation` must equal the production source:

`content/presentation.json`

for the candidate build.

The current source has:

- `version:1`;
- text overrides;
- empty legacy `media` override map.

Activation must not silently serialize a fixture presentation registry instead of the production file.

In particular, these fixtures are not direct dist sources:

- `presentation-target-registry.fixture.json`;
- presentation coverage/gap fixtures.

---

# 12. Dist/source parity checks

For the same candidate SHA:

## Definitions parity

Deep compare:

`dist.definitions`

to parsed:

`content/definitions.json`.

## Pack parity

Compare sorted pack IDs from:

`dist.packs`

to sorted IDs loaded from the seven top-level production JSON files.

## Presentation parity

Deep compare:

`dist.presentation`

to:

`content/presentation.json`.

These checks prove the build did not transform or omit activation content unexpectedly.

---

# 13. Negative fixture leakage checks

The dist artifact must not contain fixture-only strings that indicate accidental recursive inclusion.

At minimum verify absence of:

- pack ID `school-production`;
- synthetic action `school.lumber-management`.

Recommended additional check:

none of the three nested fixture pack files appear as extra duplicate pack objects beyond the promoted top-level production versions.

Do not use raw substring absence for every fixture term if a legitimate production object can share a stable event ID. Prefer structured IDs/cardinality checks.

---

# 14. Suggested executable artifact test

A future `qa-dist-content-contract.test.ts` should run **after build** and:

1. assert `dist/content.json` exists;
2. parse source definitions/presentation/top-level pack files;
3. parse dist content;
4. deep-equal source definitions and presentation;
5. compare exact sorted pack IDs;
6. assert required target Lumber IDs;
7. deep-equal Hard Work condition/reward;
8. assert synthetic action absent;
9. assert fixture-only School pack absent;
10. assert production media paths exist in `dist/assets`.

This test must be tied to build order. Running it before `npm run build` against stale dist is invalid evidence.

---

# Current reviewed Lead expectation

If Lead HEAD `e54635bf0026be1d188723b927d5c4813306c71f` builds exactly from its visible source, the expected pack count is:

**7**

with IDs:

`base, ds-lumber, gopher, lumber-cross, lumber-night, lumber, stage`.

This is a specification based on inspected source.

The actual `dist/content.json` has **not been built or verified by Chat 4** on this HEAD, so artifact status remains:

**NOT VERIFIED**.

No production file was modified by Chat 4.
