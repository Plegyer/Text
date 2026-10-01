# C2-168 — Hunter presentation candidate freeze handoff

Owner: Chat 2 / Presentation & Media
Candidate branch: `chat2/hunter-presentation-v15-final`
Frozen runtime base: Chat 1 PR #201 exact head `8af661de2ce6d73e4db0f61fe4206d3334822998`

This branch is the focused Hunter Presentation/Media candidate for C2-157..168. It intentionally excludes the branch-local Chat 2 pointer/queue commits from the working branch.

Freeze requirements:
- C2-167 production reachability must pass against the exact frozen Hunter runtime;
- every published Hunter event override must be backed by a real frozen production event;
- real ordinary Hunter work and real Hunter expedition route/result surfaces must be exercised;
- `hunter.school.field-craft` must remain the only live Hunter School consumer;
- animation-off, missing-media fallback and save-neutral presentation resolution must pass;
- full repository `mindy-successor check` must succeed on the exact final head;
- the exact final head SHA and workflow run are recorded in the final PR conversation after CI completes.

After that exact-head record, the producer branch is frozen and must not move except for a concrete Chat 4 / required-CI blocker or explicit Lead request.

Scope remains Presentation/Media/accessibility only. No gameplay conditions/effects/rewards, Save/RNG, career/relationship state, Activity mechanics, School/NightFlow, economy, ending eligibility/rewards or Meta authority is changed.
