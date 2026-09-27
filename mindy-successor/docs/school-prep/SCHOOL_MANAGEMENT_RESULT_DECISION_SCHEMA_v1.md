# School Management Result Decision Schema v1

Status: neutral Product/authoring decision schema.
Scope: management/accounting School public result only.

This file defines acceptable answer shapes. It does **not** choose a provider, threshold, certificate, project, exam, or final School-side publication rule.

## 1. Provider type

Product must select exactly one provider category for the authored management/accounting School result.

Acceptable provider types:
- lesson threshold;
- named School milestone;
- certificate;
- project;
- exam;
- School event/result;
- another explicitly School-owned authored result.

The selected provider must be owned by School. Lumber may consume only the durable published result, not the private School counter/stage that produced it.

Current selection: **OPEN**.

## 2. Milestone/result type

The authored provider must state how its private eligibility is represented.

Acceptable shapes:
- counter threshold;
- stat threshold;
- named milestone;
- completion result;
- compound School-owned condition;
- not applicable when the provider itself is the authoritative completion result.

Current selection: **OPEN**.

## 3. Threshold/value shape

When the selected provider requires a threshold, acceptable value shapes are:
- integer `lessons_completed` threshold;
- one or more typed progression-stat thresholds;
- named School completion ID;
- explicit conjunction of School-owned conditions.

Rules:
- Night study contributes only if Product explicitly authors that contribution;
- legacy `metrics.lessons` is not authority;
- no threshold from a QA fixture becomes production data.

Current value: **OPEN**.

## 4. Durable public result identifier

The final result ID must:
- satisfy the target stable ID grammar;
- be explicitly declared in production content;
- not be fixture-only;
- remain stable across save/reload;
- identify one canonical durable publication for the authored result.

This schema does not select the final ID.

Current final ID: **OPEN**.

## 5. Publication timing

Product/authoring must select one explicit publication boundary.

Acceptable timing shapes:
- same authoritative School transaction after the private result commits;
- same Resolver epoch immediately after a School-owned milestone commits;
- a later explicit School-owned result transaction.

Whichever timing is chosen:
1. private School state commits first;
2. the durable public result publishes once;
3. Resolver sees the new public result;
4. downstream Lumber may react without reading School-private state.

## 6. Exactly-once / reload contract

Required for every option:
- reload before publication may still allow one later publication if eligibility remains valid;
- reload after publication must not duplicate the public fact;
- reload after publication must not duplicate the reaction;
- resolving a downstream Lumber scene must not re-publish the School result;
- removing/replaying private counters after a committed publication must not silently emit a second publication.

## 7. Current downstream Lumber listener

Current production Lumber listener:
- event: `lumber-cross.school-management-return`;
- trigger family: `worldFactAdded`;
- current consumer transport key: `lumber.school.management-ready`;
- relationship gate: professional Foreman route;
- downstream career facts:
  - `management-school-ready`;
  - `forewoman-problem-resolved`.

This listener is a consumer contract. It does **not** select the School provider or private threshold.

If Product changes the canonical transport key, the listener/content/tests must be updated together. Do not leave two competing canonical facts.

## 8. Test impact after a decision

At minimum update/verify:
- School public-boundary exactly-once test;
- School no-false-green sentinel;
- integrated PA07 paid School result path;
- integrated PA08 immediate Lumber/relationship continuation;
- save/reload before and after publication;
- no-double-charge / no-duplicate `lessons_completed`;
- Lumber listener consumes the public result only;
- Hard Work eligibility remains independent from School.

## 9. Neutrality guard

This schema intentionally leaves:
- provider = OPEN;
- milestone/result type = OPEN;
- threshold/value = OPEN;
- certificate/project/exam identity = OPEN;
- final durable publication identity = OPEN.

No ordering above implies a preferred Product choice.
