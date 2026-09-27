# School Arcana / Forest Result Decision Schema v1

Status: neutral Product/authoring decision schema.
Scope: optional/retained School Arcana -> Forest public-result path.

This file defines acceptable answer shapes only. It does not invent a provider, threshold, teacher, certificate, or Forest route unlock.

## 1. Provider / milestone category

If Product retains a durable School Arcana result in the Forest path, select one School-owned provider category.

Acceptable categories:
- Arcana `lessons_completed` threshold;
- named Arcana milestone;
- Arcana certificate;
- Arcana project;
- Arcana exam;
- Arcana event/result;
- another explicitly School-owned knowledge result.

Current selection: **OPEN**.

## 2. Threshold / value category

When the provider requires private eligibility, acceptable value categories include:
- integer Arcana `lessons_completed` threshold;
- Magic threshold;
- Reason threshold;
- multiple typed progression-stat thresholds;
- named School completion result;
- explicit conjunction of School-owned conditions.

Rules:
- Night study contribution is not assumed;
- no QA fixture threshold is production authority;
- legacy `metrics.lessons` is not authority;
- the provider cannot be inferred from the current Arcana stat package alone.

Current threshold/value: **OPEN**.

## 3. Durable publication boundary

Acceptable durable publication boundaries:
- existing `worldFacts/worldFactAdded`;
- a future explicitly typed domain-public equivalent if Product/Lead adopts one.

Requirements:
1. School owns the private provider/eligibility.
2. School commits its private result first.
3. One durable public result publishes.
4. Forest/Lumber reads the public result, not School-private counters.
5. Publication is stable across save/reload.

Final public result ID: **OPEN**.

## 4. Forest / Lumber consumer expectations

Current production surfaces:
- Forest Activity: `lumber.forest`;
- current successful result: `lumber.forest.success`;
- current post-Activity Lumber listener: `lumber-cross.activity-forest-return`;
- current post-Activity public fact: `lumber.forest.truth-known`.

No canonical direct Arcana-School-to-Forest listener is currently selected.

If Product retains the School Arcana result, it must attach to an explicit consumer such as:
- a named `lumber.forest` route/option condition;
- a named interpretation/challenge option;
- another explicit Forest entry/interpretation listener.

Do not invent a route unlock ID merely to fill this schema.

The later `lumber-cross.activity-forest-return` remains driven by the Activity result; it must not read private School counters.

## 5. Save/reload and exactly-once expectations

Required for every accepted option:
- reload before School publication may allow one later publication;
- reload after publication must not duplicate the public result;
- reload after publication must not duplicate the public-result reaction;
- an unlocked Forest option/interpretation must remain equivalently available after reload;
- entering/exiting `lumber.forest` must not re-publish the School result;
- Activity success must not mutate private School counters;
- later Lumber continuation remains result-driven.

## 6. Test impact after a decision

At minimum update/verify:
- School public-boundary exactly-once test;
- Arcana/Forest authored provider test;
- save/reload before/after School publication;
- Forest option/condition visibility before and after reload;
- no direct Lumber/Forest read of School-private counters;
- no duplicate `lessons_completed`;
- no cross-write into `night_study_sessions`;
- integrated Forest/PA route;
- `lumber-cross.activity-forest-return` still reacts to Activity success, not School-private state.

## 7. Neutrality guard

Still OPEN:
- provider/milestone category;
- threshold/value category;
- final public result ID;
- whether Night study contributes;
- teacher identity;
- certificate/project/exam identity;
- exact direct Forest consumer/listener;
- any new route unlock.

No preferred option is selected here.
