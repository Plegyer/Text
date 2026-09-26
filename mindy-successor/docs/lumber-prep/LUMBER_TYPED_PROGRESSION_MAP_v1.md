# Lumber Typed Progression Map v1

Status: ISOLATED DATA/DESIGN DRAFT. Not loaded by the live catalog.

Authority used:
- CAREER_LUMBER_DRAFT_v0.md
- LUMBER_RELATIONSHIP_CHAIN_v0.md
- PRODUCT_ACCEPTANCE_SLICE_v0.md
- EXECUTABLE_TZ_v1.md
- PROGRESSION_CONDITION_EFFECT_CONTRACT_v1.md

This map does not lock values that the source documents leave OPEN. In particular, MILESTONE_A, MILESTONE_B, salary values, detailed reputation thresholds, and final Forewoman/Forest stat thresholds remain parameters for later balance/content lock.

## 1. Domain identity

Career ID: `lumber`.

Typed state target:

```text
CareerRunState[lumber]
  stage
  shifts
  counters
  choices
  facts
```

Stages:
- `l0_newcomer`
- `l1_accepted_hand`
- `l2_trusted_worker`
- `l3a_veteran_track`
- `l3b_forewoman_track`
- `l3c_forest_track`
- `l4_outcome_ready`

The L3 stages are route states, not exclusive ending commitments. Ending eligibility remains separate from commitment.

## 2. Counters

- `shifts` — authoritative completed Lumber shift count; Hard Work reads this counter through the career shifts condition.
- `meaningful_work_choices` — count of resolved milestone work choices that demonstrate a work style.
- `joint_foreman_shifts` — career-side work-context counter used to emit/coordinate Foreman relationship reactions.
- `seasonal_contexts_seen` — optional content/history support for Veteran presentation variety only. It is NOT a Hard Work requirement.
- `production_problems_resolved` — domain counter for Forewoman-oriented production/conflict solutions.
- `forest_clues_confirmed` — domain counter for public external clues accepted by Lumber progression.

No counter above is a global generic flag bag. Relationship-owned counters remain in `RelationshipRunState[lumber_foreman]`.

## 3. Career facts

Facts directly grounded in the source drafts:
- `foreman_noticed_player`
- `forest_anomaly_seen`
- `old_ledger_understood`
- `old_route_rumor`
- `forest_tracks_confirmed`
- `forest_truth_known`
- `forest_resource_exploitable`
- `forest_protection_needed`
- `forest_evidence_collected`

Career-local structural facts proposed for typed progression, without adding lore:
- `career_milestone_a_resolved`
- `career_milestone_b_ready`
- `meaningful_work_choice_made`
- `management_school_gate_ready` — placeholder semantic fact for the source requirement "accounting/leadership school fact"; final School public fact ID remains OPEN.
- `forest_school_gate_ready` — placeholder semantic fact for the source Arcana/Reason identification gate; final School public fact ID remains OPEN.
- `forewoman_problem_resolved`
- `forest_problem_resolved`

Cross-system facts should arrive through public facts/reaction effects. Lumber must not directly mutate School, Relationship, Activity, or other domain internal stages.

## 4. Choices

Milestone A work-style choice:
- choice ID `milestone_a_work_style`
- allowed values:
  - `strength`
  - `precision`
  - `coordination`
  - `wits`

This choice creates a career fact but does not permanently close other routes.

Forest resolution choice:
- choice ID `forest_resolution_stance`
- source-supported values:
  - `fulfill_order`
  - `investigate_cause`
  - later outcome-specific exploitation/compromise/protection wording remains content-authoring OPEN.

Forewoman production dilemma:
- choice ID `forewoman_production_stance`
- source-supported intent:
  - profit
  - crew safety
  - long-term sustainability
- Final player-facing labels/prose remain OPEN.

Relationship route choice is owned by `lumber_foreman`, not this career state.

## 5. Named career transitions

### T01 `lumber_accept_hand`
From: `l0_newcomer`  
To: `l1_accepted_hand`

Trigger/condition:
- `career.shifts(lumber) >= MILESTONE_A`.

Scene/effects:
- resolve the first real production problem;
- set `milestone_a_work_style`;
- add `meaningful_work_choice_made`;
- add `career_milestone_a_resolved`;
- add public/career fact `foreman_noticed_player`;
- emit resolver facts so the Foreman relationship can react immediately at 0 Energy.

Exact MILESTONE_A value remains OPEN.

### T02 `lumber_trusted_worker`
From: `l1_accepted_hand`  
To: `l2_trusted_worker`

Conditions:
- `career.shifts(lumber) >= MILESTONE_B`;
- at least one profile gate or accepted external fact;
- `career_milestone_a_resolved`.

The profile/external gate can be satisfied by Work, School, relationship, or world/Activity facts. A School or Activity state change that satisfies it must be able to trigger this transition without another shift.

Exact MILESTONE_B and exact profile threshold remain OPEN.

### T03A `lumber_enter_veteran_track`
From: `l2_trusted_worker`  
To: `l3a_veteran_track`

Intent:
- persistence/reliability route;
- seasonal contexts may enrich presentation and Veteran content but do not become a Hard Work eligibility requirement.

### T03B `lumber_enter_forewoman_track`
From: `l2_trusted_worker`  
To: `l3b_forewoman_track`

Conditions from source:
- sufficient Lumber reputation/progress;
- relevant social/management stat gate (final stat combination OPEN);
- accounting/leadership School public fact;
- a crew/supply/production conflict or production problem resolved.

External School facts must reach Lumber through public facts/reaction effects. Romance is never a requirement.

### T03C `lumber_enter_forest_track`
From: `l2_trusted_worker`  
To: `l3c_forest_track`

Conditions from source:
- world/Activity fact from the forest problem;
- Hunter or other forest contact clue where used;
- optional Reason/Magic/School Arcana gate;
- player engages with the cause rather than only repeating ordinary work.

### T04A `lumber_veteran_outcome_ready`
From: `l3a_veteran_track`  
To: `l4_outcome_ready`

This transition may coexist with other ending eligibility. It does not commit an ending.

### T04B `lumber_forewoman_outcome_ready`
From: `l3b_forewoman_track`  
To: `l4_outcome_ready`

Requires the Forewoman multi-system gate to be resolved. Exact numeric stat/reputation thresholds remain OPEN.

### T04C `lumber_forest_outcome_ready`
From: `l3c_forest_track`  
To: `l4_outcome_ready`

Requires the Forest multi-system chain to return a qualifying result and resolve the Lumber continuation. Exact final lore/outcome wording remains OPEN.

## 6. Hard Work eligibility

Ending ID proposal: `ending.lumber.hard_work`.

Locked baseline from EXECUTABLE_TZ_v1.md:
- `career.shifts(lumber) >= 50`;
- **this is the complete Hard Work eligibility gate**.

Not required:
- all seasons;
- Foreman romance/friendship;
- Forest Activity completion;
- School certificate;
- complex quest facts.

Hard Work is simple persistence. Eligibility registers the fate only; it does not end the run.

Locked Hard Work meta reward after commitment/completion:
- +3 starting Strength;
- +3 starting Endurance;
- awarded exactly once under the Meta/RunResult contract.

## 7. Complex outcome family A — Forewoman

Working ending family ID: `ending.lumber.forewoman`.

Required systems:
- Lumber shifts/reputation;
- School accounting/leadership fact;
- relevant social/management stat gate;
- production/crew/supply conflict resolution.

Permitted relationship contribution:
- professional Foreman route can support the branch;
- close route may coexist;
- rival route may supply an alternative leadership context.

Forbidden dependency:
- romance/close route as a mandatory gate.

Result remains eligible, not committed, until the player chooses it through the ending system.

## 8. Complex outcome family B — Forest route

Working ending family ID: `ending.lumber.forest_compact`.

Source chain:
```text
Lumber signs / forest_anomaly_seen
-> city clue(s): Tavern/Hunter/relationship
-> optional School Arcana/Reason identification
-> old_boundary_token or equivalent route capability
-> Forest Activity old boundary route
-> forest_truth_known / evidence result
-> ActivityCompleted reaction
-> Lumber continuation at 0 Energy
-> resolve forest production conflict
-> Forest outcome eligible
```

The exact truth of the forest, final NPC identity, and final prose are intentionally not invented here.

## 9. Simultaneous eligibility

The data model must permit, for one run:
- `ending.lumber.hard_work` eligible from 50 shifts;
- `ending.lumber.forewoman` eligible from management/school/problem resolution;
- `ending.lumber.forest_compact` eligible from the external chain;
- relationship ending(s) eligible independently where later authored.

None auto-commits. The player can continue playing while multiple fates remain eligible.

## 10. Resolver reaction requirements

State changes that can advance Lumber must be observable at a reaction boundary.

Required trigger families:
- `ActionCompleted(job.lumber)`;
- `CareerCounterChanged(lumber, ...)`;
- relevant `StatChanged(...)` after School;
- `WorldFactAdded(...)` for accepted School/Hunter/Tavern/Forest facts;
- `NightResolved(...)` for relationship milestones;
- `ActivityResult(forest, ...)` for returned Activity results;
- `EndingEligible(...)` when an ending condition becomes true.

Critical and normal progression scenes are 0-Energy reactions. The original Work/School/Activity command owns its own explicit cost; the reactive scene does not charge again.

## 11. Unresolved data questions

- Exact MILESTONE_A and MILESTONE_B shift counts.
- Exact Lumber wage/rank adjustments.
- Exact Forewoman reputation/stat thresholds and final School fact ID.
- Exact Forest Reason/Magic/Arcana gate and whether every clue is required or a subset.
- Exact final text/identity for the Foreman and forest problem.
- Exact complex ending meta rewards.
