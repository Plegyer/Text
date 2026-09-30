# Work Locked-State Presentation Refinement v1

Status: C2-67 COMPLETE
Owner: Chat 2 / Presentation & Media

The queue-v6 locked-career accessibility refinement is active on current main and is sufficient for C2-67.

For the seven currently locked ordinary-career controls, the Work renderer now:
- derives lock state from the existing `actionAvailable(a,state,catalog)` contract;
- keeps the button mechanically disabled;
- shows neutral localized help explaining that the path is currently unavailable and its unlock requirement is not yet defined;
- attaches the visible help with `aria-describedby`;
- exposes a localized `aria-label`;
- exposes `aria-disabled="true"`.

RU/EN keys:
- `ui.work.lockedCareerHelp`
- `ui.work.lockedCareerAria`

Starter-career controls remain available and do not receive locked-state help.

Production mutation required by C2-67: **0**.

No unlock condition, starter-career rule, career stage, action condition, reward, Save field or gameplay state is changed.
