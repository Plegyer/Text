# C2-112 — Satyr Maid production media pool

Status: COMPLETE
Owner: Chat 2 / Presentation & Media

All four seasonal Satyr Maid shift slots plus `job/satyr-maid/result/default` now carry a deterministic three-candidate GIF pool using project-owned local assets. Candidate selection uses the existing presentation hash/occurrence-key mechanism and does not consume gameplay RNG.

The existing project-owned SVG on every slot remains the static fallback. With animation disabled, the resolver selects that static source directly. The pool candidates have RU/EN accessibility text and remain replaceable through the existing presentation slot override mechanism.

No Satyr Maid wage, effect, progression, career stage, condition, result, Save identity or gameplay state was changed.
