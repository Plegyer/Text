# School Localization v10 Handoff Refresh

Task: C5-106
Baseline: `main@6afc01061646bc52cec824863bf89e8ad8c309d0`

The content-side handoff is refreshed from current main, not from stale worker branches.

Current identity counts:
- 8 courses;
- 8 teachers;
- 24 exact Night-study choices;
- 10 ordinary careers in the merged transfer atlas.

Current player-facing/consumer seams:
- two generic paid-lesson completion events;
- one exact Night-study completion event covering all 24 choices;
- paid-lesson journal/history text.

Open integration/design dependencies remain intentionally unselected:
- exact paid-course/teacher reaction identity;
- Night-study teacher presence;
- paid-lesson journal localization ref;
- School-to-career thresholds and producer/public-result facts;
- audited presentation terminology/accessibility debt.

No runtime consumer, threshold, producer fact, career state, root localization, presentation/media, Save, RNG, or NightFlow change is made.
