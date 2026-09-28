# Current Chat 1 Developer task pointer

Status: ASSIGNED
Owner: Chat 1 Developer / Integration Developer
Queue: CAREER ROUTE IMPLEMENTATION PACKAGE

Source of truth:
- ACTIVE_TEAM_OWNERSHIP_MATRIX.md
- PROJECT_WORK_ENTRYPOINT.md

## Objective
Implement one complete existing career route using existing `careers` definitions, `stages`, `transitions`, event conditions/effects, `RunState.progression.careers`, and existing `endings` completion flow.

No new career state layer.

## Route
Use the existing Lumber career route prepared in current career materials.

Implementation scope:
- connect the existing career stages into playable progression;
- verify stage transitions are driven by existing conditions/effects;
- verify career state persists through `RunState.progression.careers`;
- verify terminal route outcome enters existing endings mechanism.

## Required gameplay path

Stage 1: Apprentice Lumber Worker
Transition condition:
- existing starting career event eligibility.
Event/effect:
- existing career assignment/progression effect.

Stage 2: Skilled Lumber Worker
Transition condition:
- existing required work events and progression conditions.
Event/effect:
- existing stage advancement effect.

Stage 3: Forest Specialist
Transition condition:
- existing mastery/progression requirements.
Event/effect:
- existing career completion/outcome effect.

Outcome:
- route completion must resolve through existing `endings` acceptance flow, not a new career ending store.

## Allowed files
Only modify:
- existing career definition files;
- existing event condition/effect files;
- existing UI presentation route files needed to show the route;
- focused tests for this route.

Do not create:
- parallel profession state;
- new Save schema;
- new ending framework.

## Verification
Add/run a route test proving:
- career assignment;
- stage 1 -> stage 2 -> stage 3 transitions;
- RunState.progression.careers update;
- ending acceptance path;
- UI displays current stage and final outcome.

Deliver one PR with exact files, commit SHA and test results.
