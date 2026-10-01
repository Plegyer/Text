# C2-132 — Satyr Maid presentation candidate freeze handoff

Owner: Chat 2 / Presentation & Media
Candidate branch: `chat2/satyr-maid-presentation-v12-final`
Stack base: frozen Chat 1 runtime `de27bb5ac70edb7238657fcb51c1f201a1b1908e`

This branch is the focused Chat 2 v12 finalization surface for C2-121..132. It contains the presentation/media/accessibility delta only, stacked on the QA-gated C1D-97..108 Satyr runtime.

Freeze requirements:
- C2-131 production reachability regression must pass against the live Satyr runtime identities;
- full repository `mindy-successor check` must succeed on the exact final head;
- the exact head SHA and workflow run are recorded in the final PR conversation after CI completes;
- after that record, the producer branch is frozen and must not move except for a concrete Chat 4 blocker or explicit Lead request.

Scope retained:
- nine persisted Satyr career-stage surfaces;
- repeatable work/milestone presentation pools where project-owned assets exist;
- recurring-guest and voluntary Night presentation including explicit refusal;
- School reaction and crisis presentation;
- House Power and Boundary Mastery ending presentation;
- keyboard, animation-off and missing-GIF safety;
- live production reachability with no preparation-only consumer dependency.

Out of scope remains gameplay, Save/RNG, progression, wages, School/NightFlow mechanics, crisis effects, ending eligibility/rewards and Meta authority.
