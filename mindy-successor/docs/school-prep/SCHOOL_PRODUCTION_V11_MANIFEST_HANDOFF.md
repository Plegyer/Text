# School Production v11 Manifest / Handoff

Task: C5-119  
Baseline: `main@6f0e8803ea327b55c5079afb137b5aa016f614ec`

Live production is exactly:
- `content/packs/school-lesson-content-v1.json`;
- `content/packs/school-life-content-v1.json`;
- `content/packs/school-teachers-v1.json`;
- School-owned keys in `content/localization.json`;
- the existing eight-course runtime in `src/core/school.ts` (read-only for this queue).

Preparation-only material remains outside live routing, including `content/packs/school-target/*`, milestone-depth fixtures, whole-career transfer atlas, teacher response/tone matrices, and unresolved producer/public-result designs.

The machine-readable manifest is `content/school-production-manifest-v11.json`. It explicitly forbids unresolved Lumber management and Arcana/Forest producer facts, milestone thresholds, and invented exact-course reaction routing.

Compatibility note:
- `school-life-content-v1.after-night-study` is retained for historical queued Save identity;
- the validator-required known reaction trigger is gated by `not calendarYear >= 1`, which is false for every playable year;
- new runs therefore use only the 24 exact Night-study events.
