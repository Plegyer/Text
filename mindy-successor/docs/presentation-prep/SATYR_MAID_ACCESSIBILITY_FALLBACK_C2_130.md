# C2-130 — Satyr Maid accessibility / reduced-motion / missing-media safety

Status: COMPLETE
Owner: Chat 2 / Presentation & Media

The expanded Satyr presentation surface is guarded by one focused regression covering:

- project-owned static fallback on every Satyr production presentation override;
- animation-off resolution to exact static media;
- missing GIF candidates cycling to the static candidate;
- keyboard focus on the Work-stage presentation state;
- explicit focusable relationship/Night regions and ending identity;
- visible focus-ring selectors for the new presentation-only focus targets.

The fallback test deliberately rewrites only presentation candidate paths to nonexistent GIF names; it does not modify gameplay state or production asset references.
