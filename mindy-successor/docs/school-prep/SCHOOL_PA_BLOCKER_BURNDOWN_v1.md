# School PA Blocker Burn-down v1

Status: Chat 5 Product Acceptance blocker ledger.
Reference: `docs/PRODUCT_ACCEPTANCE_SLICE_v0.md`.
Assumption: Lead-owned production activation is integrated/verified independently. This ledger does not request duplicate shared runtime work without a concrete failing contract.

## 1. Smallest remaining blocker set

After production activation, the remaining School PA work reduces to two content-facing groups:

1. **Public-result authoring**
   - author at least one final School milestone/public fact;
   - choose its final canonical public fact ID;
   - author its private School eligibility/threshold/content;
   - wire the consuming Lumber continuation to that public boundary.

2. **Teacher/presentation content depth**
   - author at least one canonical teacher/presenter identity for the playable School slice;
   - provide approved teacher-led lesson presentation content/media for the existing semantic slot.

Everything else below is either already closed by Chat 5 contracts/evidence or a Lead activation verification item rather than a new Chat 5 runtime request.

## 2. PA row ledger

| PA row | Requirement | Category | Status | Evidence / remaining action |
|---|---|---|---|---|
| Required flow lines 34–35 | School lesson -> School result triggers career/relationship continuation | content authoring blocker | OPEN | Paid School transaction and same-boundary Resolver behavior are covered. A final authored School public result consumed by Lumber is still missing. |
| UI lines 58–66 | Energy/money visible, deltas understandable, pending event blocks incompatible actions | already closed / activation verification | CLOSED CONTRACT | Picker data and disabled-state matrix exist for all eight courses. Actual shared UI wiring is Lead-owned; do not reopen absent a concrete failure. |
| Economy line 72 | At least one School cost | already closed | CLOSED | All eight paid courses have locked tuition and 1 current-day Energy. |
| School lines 80–87: track | track | already closed | CLOSED | Eight stable `school.track.*` IDs map 1:1 to course IDs. |
| School lines 80–87: teacher/presentation | teacher/presentation | presentation/content-depth gap | OPEN | Semantic presentation IDs are closed; canonical teacher identity and authored teacher-led presentation depth remain open. |
| School lines 80–87: progress | progress | already closed / activation verification | CLOSED CONTRACT | `lessons_completed` and `night_study_sessions` ownership/exactly-once contracts are complete. Shared activation is Lead-owned; no duplicate runtime request without a failing test. |
| School lines 80–87: milestone/public fact | at least one milestone/public fact | content authoring blocker | OPEN | Public transport is ready; final School milestone/public fact ID and authorial threshold/content remain open. |
| School lines 80–87: affects Lumber | public result affects Lumber | content authoring blocker | OPEN | Boundary contract exists through `worldFacts/worldFactAdded`; final authored fact/consumer pair is missing. |
| Save lines 149–153 | deterministic reload, including after lodging before Night choice | already closed | CLOSED | Runtime-backed reload chronology/checkpoints exist; exactly-once Night effects are covered. |
| Failure line 162 | no manual job visit to notice already-earned School progression | already closed | CLOSED CONTRACT | School Resolver boundary sees the complete transaction; public result must publish before same-boundary reaction. |
| Failure line 168 | reload does not reroll pending event | already closed | CLOSED | Pending Night/Resolver checkpoint reload behavior is covered. |

## 3. Runtime blocker ledger

### Not a new Chat 5 request

These were identified as Lead/shared activation seams in prior readiness docs:
- production `schoolLesson` dispatcher command;
- shared typed School persistence/defaulting;
- production typed counter transaction application;
- shared School picker UI;
- housing filtering for School Night choices;
- semantic School presentation persistence;
- same-boundary ending registration where applicable.

For this burn-down they are **activation verification**, not automatic new blockers.

Rule:
- if Lead activation supplies these and the acceptance contracts are green, mark them CLOSED;
- if a concrete test fails, record the exact failing contract and reopen only that seam;
- do not request broad shared runtime/schema changes based solely on historical pre-activation gaps.

## 4. Content authoring blockers

### A. One final School public-result path for PA

Required to close PA School lines 80–87 and required-flow lines 34–35.

Author must choose:
- one canonical School public fact ID;
- owning track;
- private milestone eligibility;
- threshold(s), if any;
- project/exam/certificate role, if any;
- authored milestone/presentation content;
- Lumber consumer.

Candidates discussed in prep, but still not canonical:
- management/accounting -> Lumber management route;
- Arcana/forest knowledge -> Forest/Lumber route.

Only one fully authored PA path is needed to satisfy the minimum slice; additional paths can remain later content.

### B. Teacher/presentation content

Required to close the teacher/presentation depth reading of PA lines 80–87.

Author must provide:
- canonical teacher/presenter identity;
- course association;
- authored lesson text/scene;
- approved media/presentation content.

No gameplay mechanic changes are required.

## 5. Presentation/content-depth gaps

Already closed:
- semantic lesson presentation IDs;
- semantic Night presentation families;
- deterministic course labels;
- course/track/stat mapping.

Still open:
- teacher identity;
- teacher voice/personality;
- lesson scene copy;
- approved media;
- authored milestone/public-fact presentation.

These are not runtime blockers.

## 6. Already closed School baseline

Closed and should not be reopened without a failing contract:
- eight gameplay course IDs;
- tuition values;
- 1 current-day Energy paid cost;
- full stat packages;
- no ordinary Lust mutation;
- 24 Night-study choices;
- Night +2 supported stat;
- Night tuition/current-day Energy = 0;
- next-day Energy -1;
- normal/cheap vs street Night-study availability contract;
- separate `lessons_completed` / `night_study_sessions`;
- exactly-once reload expectations;
- atomic insufficient-money/Energy failure;
- UI disabled-state matrix;
- Resolver full-package facts;
- School/Lumber private/public ownership boundary;
- Lumber Hard Work independence from School.

## 7. Closure rule

School PA is content-complete when:
1. production activation passes the already-defined contracts;
2. one final School milestone/public fact is authored and consumed by Lumber in the same reaction boundary;
3. the playable School slice has approved teacher/presentation content.

Do not expand the blocker list with speculative certificates, additional milestones, or broad runtime rewrites.
