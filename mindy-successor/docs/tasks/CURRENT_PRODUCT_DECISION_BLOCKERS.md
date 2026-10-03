# Current Product Decision Blockers

Status: **ACTIVE — REFRESHED AFTER D33/D34**
Owner: Leader / Product coordination

Authority rule:
`USER_DECISIONS_LOCKED_v1.md` is canonical. This file is only a current queue/index and must not override locked decisions.

## Recently resolved blockers

### Lumber School -> management publisher — RESOLVED by D33

Canonical source:
- `school.course.literacy_and_numbers`;
- `school.track.literacy_and_numbers`.

Readiness:
- paid `lessons_completed >= 3`
  OR
- `night_study_sessions >= 3`.

Canonical public result:
`lumber.school.management-ready`.

Publication is School-owned, exactly once, and independent of Lumber state.

Lumber consumer must be order-independent:
- School fact after professional Foreman route;
- or professional Foreman route after School fact.

No certificate/project/exam/parallel progression system is introduced.

### Intermediate Lumber progression — RESOLVED by D34

True ordinary stages:
- `newcomer`;
- `accepted-hand`;
- `trusted-worker`;
- `veteran`.

Shift milestones:
- 1;
- 8;
- 20.

Hard Work remains exactly 50 and independent.

Forewoman / Forest / outcome readiness remains fact/ending based and must not become mutually exclusive career stages.

Both complex Lumber outcome families require at least `trusted-worker`, so they cannot become eligible before 8 completed Lumber shifts.

## Current project-wide Product gaps

These are open Product/balance/content questions. They do **not** authorize workers to invent values.

### Economy

Still open:
- final ordinary wage scale;
- final lodging price/value relationship;
- whether any later-year lodging escalation exists;
- final School tuition/gain ratio.

Current executable scale is authority for testing until changed.

Leader audit:
`LEADER_LIVE_ECONOMY_DRIFT_AUDIT_v1.md`.

### Housing tier value

Current live normal lodging (100) is mechanically dominated by cheap lodging (50).

Leader audit:
`LEADER_HOUSING_SEMANTIC_AUDIT_v1.md`.

Chat 5 currently owns the Product comparison packet for:
- private-space allowlist;
- bounded storage/preparation utility;
- narrow rest/recovery utility.

No production housing change is authorized before that decision.

### Exact Lust starting value

Still open.

Workers must not infer the value from original-game Lust, School Body Confidence or Secret Debt thresholds.

### Remaining Secret Debt balance values

D19/D30/D32 already lock trigger/debt timing, forced Night, Energy penalty, exits and future-run Keystone identities/numbers.

Still open:
- hidden-work shift stat gains;
- hidden-work wage coefficients;
- owner-kill exact stat/Lust thresholds.

### Palace

D29 locks rich six-stage topology and 2/5/8/12/15 structural duty milestones.

Still open:
- exact Palace daily cadence;
- final authored content/lore within the topology;
- macro mystery/lore.

Chat 6 currently owns the implementation-ready stage/duty contract.

### Activity

Still open:
- final region count;
- final mechanic mix outside already-shipped/accepted Activity slices.

### Production art/media budget

Still open.

## Decisions that are NOT open anymore

Do not reopen without explicit Leader/Product action:
- D26 same-career max one shift/day;
- D28 0..1 Keystone + 0..2 Specialists;
- D29 rich-six Palace topology;
- D30 Secret Debt reward identities;
- D31 seasonal negative target map;
- D32 Secret Debt Keystone exact numbers;
- D33 Lumber School management publisher;
- D34 Lumber 1/8/20 career topology;
- Hard Work = 50;
- Palace D23 10/10 permanent + 10/10 active -> Day-1 invitation;
- Palace True cap-only 100 -> 200;
- Secret Debt +2000 / 10 days / 20000 / forced Night / next-day Energy -1.

## Worker handling

- Product/research workers may prepare decision packets but not silently lock open values.
- Producer workers implement only locked authority.
- Chat 2 remains the only full-CI integration lane.
- Leader is the only merge authority.
- Git exact SHA + tests, not verbal completion, determine acceptance.
