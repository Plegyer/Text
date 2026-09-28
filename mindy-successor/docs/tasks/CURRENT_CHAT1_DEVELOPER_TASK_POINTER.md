# Current Chat 1 Developer task pointer

Status: BLOCKED_PENDING_DESIGN_TO_CODE_MAPPING
Owner: Chat 1 Developer / Integration Developer

Source of truth:
- ACTIVE_TEAM_OWNERSHIP_MATRIX.md
- PROJECT_WORK_ENTRYPOINT.md
- CAREER_LUMBER_DRAFT_v0.md

## Verified design

Lumber design exists in:
- mindy-successor/docs/CAREER_LUMBER_DRAFT_v0.md

Design stages described there:
- L0 Newcomer
- L1 Accepted Hand
- L2 Trusted Worker
- L3A Veteran track
- L3B Forewoman track
- L3C Forest track
- L4 Outcome-ready

These names are design references only until matching implementation IDs are confirmed in code.

## Confirmed implementation state

Previous assignment incorrectly treated design stages as implemented IDs.
Do not create guessed stage IDs.
Do not add parallel career state.

Required implementation model:
- existing careers definitions;
- existing stages/transitions;
- event conditions/effects;
- RunState.progression.careers;
- existing endings acceptance flow.

## Required next action

Before code changes, identify the actual Lumber implementation identifiers in code:
- career id;
- implemented stage ids;
- transition ids;
- event ids;
- ending ids.

Compare them against CAREER_LUMBER_DRAFT_v0.

If a designed stage has no implementation ID, create the smallest missing implementation slice only after applying project ID naming rules and marking the ID as NEW.

## Allowed files

Only:
- existing career definition files;
- existing event condition/effect files;
- existing ending integration files if required by existing framework;
- UI route files required to display current career stage/outcome;
- focused tests.

Forbidden:
- new profession state layer;
- new Save schema;
- new ending framework;
- new gameplay rules not present in design.

## Acceptance

A completed PR must prove one playable Lumber route through:
- career assignment;
- actual stage transitions;
- RunState.progression.careers update;
- UI stage display;
- existing ending acceptance flow.

Current blocker:
The repository design names are confirmed, but concrete code IDs for Lumber stages/transitions/events/endings have not yet been mapped.
