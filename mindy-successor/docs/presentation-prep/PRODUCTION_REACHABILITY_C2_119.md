# C2-119 — Presentation-only production reachability gate

Status: COMPLETE
Owner: Chat 2 / Presentation & Media

The shipped build boundary is now covered explicitly: `scripts/build.mjs` consumes `content/presentation.json` and does not consume `content/presentation-drafts/*`.

Executable tests require all ten Hard Work semantic IDs plus all ten Satyr Maid / Undead Farm seasonal-result pool slots to exist simultaneously in the live semantic registry and in production `presentation.json`, then resolve them to the exact requested slot with no diagnostics and no text-only fallback.

Preparation manifests may document future or historical presentation work, but cannot satisfy this gate unless the corresponding production slot is actually shipped.
