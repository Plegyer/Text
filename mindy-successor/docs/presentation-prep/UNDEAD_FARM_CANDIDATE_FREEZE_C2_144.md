# C2-144 — Undead Farm presentation candidate freeze handoff

Owner: Chat 2 / Presentation & Media
Candidate branch: `chat2/undead-farm-presentation-v13-final`
Frozen runtime base: Chat 1 PR #178 exact head `b75e73c0f5e37b19277cb25cf0321587f6444ab4`

This branch is the focused final Presentation/Media surface for C2-133..144.

Freeze requirements:
- C2-143 production reachability must pass against the real frozen Undead Farm runtime catalog;
- full repository `mindy-successor check` must succeed on the exact final head;
- the exact final head SHA and workflow run are recorded in PR #182 after CI completes;
- after that record, PR #182 is ready for Chat 4 and the producer head must not move except for a concrete QA/required-CI blocker or explicit Lead request.

The candidate remains presentation/media/accessibility only: semantic presentation IDs, static/motion fallback bindings, RU/EN presentation localization, keyboard/focus semantics and regressions. Gameplay, Save/RNG, career/relationship authority, School/NightFlow, Activity mechanics, crisis effects, ending eligibility/rewards and Meta remain runtime-owned.
