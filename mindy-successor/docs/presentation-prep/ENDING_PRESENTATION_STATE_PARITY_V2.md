# Ending Presentation State Parity v2

Status: C2-88 COMPLETE
Owner: Chat 2 / Presentation & Media

Current existing ending presentation IDs: **9**.

Every existing ending ID has:
- an exact static production binding;
- a project-owned local source;
- RU/EN alt;
- RU/EN caption;
- deterministic animation-off resolution to the exact static source.

Eligibility remains an active-run state and completion remains the existing ended state.

The engine's distinct `ending_committed` identity is preserved. Current main still lacks a distinct localized committed-state UI label; frozen predecessor PR #136 already prepares that presentation-only fix, so C2-88 records it as prepared rather than duplicating it.

No ending condition, reward, commit rule or completion rule is changed.
