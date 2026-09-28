# Chat1 Lumber Vertical Slice Handoff

## Runtime integration point

Required existing career stages:
- lumber.newcomer
- lumber.accepted-hand

Required new runtime stage IDs for Lead integration:
- lumber.trusted-worker
- lumber.veteran
- lumber.forewoman-ready
- lumber.forest-ready
- lumber.outcome-ready

## Required transitions

Use existing career progression mechanism only:
- accept-hand
- trusted-worker progression transition
- veteran progression transition
- forewoman-ready progression transition
- forest-ready progression transition
- outcome-ready progression transition

Transition IDs must match the final runtime definitions implementation.

## Lumber event activation points

Existing event anchor:
- lumber.career-first-shift -> accept-hand

Existing progression events:
- lumber.foreman-notice

Expected future event activation chain:
- completed Lumber shifts -> trusted worker progression
- sustained Lumber work -> veteran progression
- foreman relationship/progression state -> forewoman-ready path
- forest conditions -> forest-ready path
- outcome conditions -> outcome-ready path

## Constraints

- Do not create new profession state.
- Do not create new save layer.
- Do not create new ending framework.
- Preserve existing ending.lumber.hard-work condition: completed_shifts >= 50.
