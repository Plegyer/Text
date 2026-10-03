# Current Product Decision Blockers

Status: **ACTIVE — REFRESHED AFTER D38**
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
- whether any later-year lodging escalation exists;
- final School tuition/gain ratio.

Current executable scale is authority for testing until changed.

Leader audit:
`LEADER_LIVE_ECONOMY_DRIFT_AUDIT_v1.md`.

### Housing tier value — RESOLVED by D35

Normal lodging keeps price **100**, cheap keeps **50**, street keeps **0**.

D35 locks normal-room value as **explicit private-space capability**:
- only explicitly authored private-space Night/relationship branches require normal;
- School Night Study remains normal OR cheap;
- public/workplace Night remains independently authored;
- initial private-space seed targets Satyr Maid recurring guest, Tavern recurring traveler, Prostitute recurring client;
- forced Secret Debt Night always overrides voluntary private-space access.

No unconditional normal-room +1 Energy or broad stat protection is authorized.

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

D36 resolves the full-scope structure.
D38 now also resolves the standalone Activity ending family:
- three separate endings: Pathfinder / Preservation / Network;
- exact direction-specific eligibility;
- exact selectable Specialist rewards;
- no Hard Work / Palace substitution;
- no entry-Energy reduction.

Still open:
- final authored content inside each region;
- final player-facing lore names/epilogues;
- exact tagged survey/secure/network route content;
- final media production.

### Ordinary complex endings

The current Ending Atlas audit confirms the largest remaining ending-design gap is the **30 advanced ordinary-career outcomes** outside the 10 Hard Work endings.

Still open across many of them:
- exact final eligibility thresholds;
- exact stable ending IDs where absent;
- exact permanent/New Start+ reward;
- modern reward classification under D27/D28;
- retirement/migration of stale legacy reward semantics where applicable.

This work is now split into two parallel Product packets:
- Chat 5: Lumber / Satyr Maid / Undead Farm / Tavern / Hunter;
- Chat 3: Guard / Merchant / Artist-Geisha / Assassin / Prostitute.

### Production art/media budget

Still open.

## Decisions that are NOT open anymore

- D35 normal lodging private-space capability;
- D36 four-region Large Activity scope;
- D37 minimum Night completeness bar;
- D38 three standalone Activity endings + Specialist rewards;

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
