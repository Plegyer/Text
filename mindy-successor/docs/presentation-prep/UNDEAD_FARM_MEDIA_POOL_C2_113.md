# C2-113 — Undead Farm production media pool

Status: COMPLETE
Owner: Chat 2 / Presentation & Media

All four seasonal Undead Farm shift slots plus `job/undead-farm/result/default` now carry a deterministic three-candidate GIF pool using project-owned local assets. Candidate selection uses the existing presentation hash/occurrence-key mechanism and does not consume gameplay RNG.

The existing project-owned SVG on every slot remains the static fallback. With animation disabled, the resolver selects that static source directly. The pool candidates have RU/EN accessibility text and remain replaceable through the existing presentation slot override mechanism.

No Undead Farm wage, effect, progression, career stage, condition, result, Save identity or gameplay state was changed.
