# School Public Result Publication Contract Draft v1

Status: generic content-authoring contract draft for School-owned public results.

This draft defines publication semantics only. It keeps management/accounting and Arcana/Forest IDs, providers and thresholds OPEN.

## 1. Stable result ID

Every authored School public result must have one stable canonical result ID.

Requirements:
- target-compatible stable ID grammar;
- explicitly declared in production content;
- not a fixture-only identifier;
- stable across save/reload;
- one canonical meaning;
- no alias pair that can cause duplicate publication.

Current management result ID: **OPEN**.

Current Arcana/Forest result ID: **OPEN**.

## 2. Private trigger remains School-owned

The trigger/provider that qualifies the result stays inside School ownership.

Possible authored trigger shapes:
- `lessons_completed` threshold;
- typed stat threshold;
- named School milestone;
- exam completion;
- project completion;
- certificate award;
- explicit conjunction of School-owned conditions.

Rules:
- Lumber/Forest must not evaluate School-private counters directly;
- private trigger state commits before public publication;
- Night-study contribution is included only if explicitly authored;
- legacy `metrics.lessons` is not authoritative.

## 3. Publication transaction

Canonical semantic order:

`School private trigger commits -> publication eligibility confirmed -> durable public result commits -> Resolver observes first publication`.

Requirements:
1. private School state is authoritative before publication;
2. publication happens once;
3. publication proof/transaction identity is stable;
4. the durable public result is present before downstream reaction resolution;
5. first publication emits one public-result reaction;
6. downstream scenes/actions cannot re-publish the result.

For the current world-fact transport, first publication is represented by:
- durable `run.progression.worldFacts`;
- `worldFactAdded`.

A future typed domain-public equivalent is acceptable only if it preserves the same ownership and exactly-once semantics.

## 4. Exactly-once requirements

A publication definition must have a stable proof identity derived from authored data, for example:
- School domain;
- provider/milestone definition;
- canonical public result ID.

Required behavior:
- first eligible publication -> one durable result + one first-publication reaction;
- repeated eligibility checks -> no duplicate publication;
- repeated paid lessons after publication -> no duplicate;
- repeated Night study after publication -> no duplicate;
- downstream scene resolution -> no duplicate;
- parser/save reload -> no duplicate.

## 5. Reload idempotency

### Reload before publication

Allowed:
- private School progress is already committed;
- publication is not yet committed;
- after reload, one later publication may occur if the authored trigger remains true.

Forbidden:
- duplicating private progress merely to cause publication;
- charging tuition/Energy again.

### Reload after publication

Required:
- durable public result remains present;
- publication proof remains committed;
- no second public-result reaction;
- pending downstream reaction/scene, if any, survives deterministically;
- reloading cannot reopen a completed School milestone solely to publish again.

## 6. Downstream consumer contract

Downstream systems consume only the public result.

Forbidden:
- Lumber reading `lessons_completed`;
- Forest reading `lessons_completed`;
- Lumber reading `night_study_sessions`;
- direct downstream reads of School-private milestone/certificate/project arrays;
- downstream writes to School-private progress;
- School directly advancing a Lumber/Forest private stage as a shortcut.

Allowed:
- conditions/listeners on the stable public result;
- immediate Resolver reaction after first publication;
- independent downstream state transitions owned by the downstream domain.

## 7. Paid/Night mechanics remain independent

Public-result publication must not change:
- paid tuition;
- paid current-day Energy;
- paid stat package;
- ordinary Lust behavior;
- `lessons_completed` semantics;
- Night tuition/current-day Energy;
- Night +2 stat;
- next-day Energy -1;
- `night_study_sessions` semantics.

Publication is a progression/result boundary, not a second School lesson transaction.

## 8. Management/accounting specialization

Still OPEN:
- School provider;
- threshold/milestone type;
- value;
- final canonical public result ID/rule.

Current Lumber-side management listener remains downstream-only. The listener does not own or infer the School trigger.

## 9. Arcana/Forest specialization

Still OPEN:
- provider;
- threshold/milestone type;
- value;
- final public result ID;
- exact direct Forest consumer/option/listener if retained.

The later Forest Activity result/continuation must remain owned by Forest/Lumber and must not substitute for a School publication proof.

## 10. Acceptance checklist for an authored result

Before integration:
- [ ] stable production result ID approved;
- [ ] private School provider approved;
- [ ] threshold/completion rule approved;
- [ ] private trigger persists correctly;
- [ ] one publication proof defined;
- [ ] reload-before test passes;
- [ ] reload-after test passes;
- [ ] downstream listener reads public result only;
- [ ] no paid tuition/Energy replay;
- [ ] no duplicate `lessons_completed`;
- [ ] no duplicate `night_study_sessions`;
- [ ] no Hard Work dependency introduced;
- [ ] presentation/result identity survives reload.
