# School Journal / Result Localization v11

Task: C5-114  
Baseline: `main@6f0e8803ea327b55c5079afb137b5aa016f614ec`

Content-side reachable localization is complete for:
- paid-lesson result title/body and exact course presentation alt;
- both generic after-School event outcomes;
- all twenty-four exact Night-study event titles/bodies/outcomes.

Two journal lines cannot be made locale-aware by School content alone:
1. `executeSchoolLesson()` writes a raw English action-journal line and `journalRefs.push(null)`;
2. the shared resolver logs event title + fallback variant text without a localization ref before the localized choice outcome is committed.

Those are recorded as shared-runtime blockers. Chat 5 does not change the runtime or Save schema to hide them.
