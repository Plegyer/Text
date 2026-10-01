# C2-118 — Animation-off / missing-media fallback safety

Status: COMPLETE
Owner: Chat 2 / Presentation & Media

Executable regression now proves that the Satyr Maid and Undead Farm production pools contain three valid project-owned GIF candidates per slot, while animation-off resolves directly to the existing project-owned SVG fallback.

The regression also substitutes three intentionally missing optional GIF paths and verifies that the resolver keeps the exact static candidate reachable after those failures and bypasses the missing GIFs entirely when animation is disabled. All ten Hard Work semantic identities are checked as non-text-only static-safe surfaces in both animation modes.

No gameplay RNG or Save state participates in fallback selection.
