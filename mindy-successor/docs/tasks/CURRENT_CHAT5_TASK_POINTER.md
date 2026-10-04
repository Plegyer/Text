# CURRENT CHAT5 TASK POINTER

Status: **ACTIVE — PALACE D39 REWARD IMPLEMENTATION PREFLIGHT v19**
Owner: Chat 5

Previous D46+D47+legacy preflight v18 is complete and accepted.

New branch:
`chat5/palace-d39-reward-implementation-preflight-v19`

Problem:
Palace assembly preflight found that the three accepted D39 non-True Palace rewards are Product-locked but do not yet have a complete implementation source for current Strong Meta.

D39 accepted rewards:

1. Service Life -> Steady Practice
   `palace.service-life.steady-practice`
   class: Specialist

2. Court Power -> Formal Introduction
   `palace.court-power.formal-introduction`
   class: Specialist

3. Inner Truth -> Source Method
   `palace.inner-truth.source-method`
   class: automatic knowledge/content, no slot

Task:
prepare the exact implementation packet for current Strong Meta / ending reward lifecycle.

Specify:
- reward registry entries;
- ownership/migration semantics;
- future-run activation;
- Specialist slot behavior;
- Source Method automatic inheritance;
- exactly-once ending transaction binding;
- save/load and profile merge behavior;
- tests needed for each reward;
- exact files Chat 2 must modify during Palace assembly;
- interactions that must remain forbidden.

Do not invent new Product behavior.
Do not modify production runtime in this preflight.
Do not run full CI.

Deliver:
`mindy-successor/docs/tasks/CHAT5_PALACE_D39_REWARD_IMPLEMENTATION_PREFLIGHT_v19.md`

Report:
`READY_FOR_PALACE_ASSEMBLY`.
