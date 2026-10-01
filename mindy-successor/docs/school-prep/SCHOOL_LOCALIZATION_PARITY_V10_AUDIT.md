# School Localization Parity v10 Audit

Task: C5-98
Baseline: `main@6afc01061646bc52cec824863bf89e8ad8c309d0`

Current main has complete RU/EN pairs for 8/8 canonical course labels and descriptions, 8/8 teacher media alts and captions, two generic paid-lesson events, one generic Night-study event, `ui.school.lessonResult`, and `ui.school.nightStudyChoice`.

Fallback-only text remains: raw English paid-lesson journal/lastAction and 24 raw English Night-study definition labels. These are recorded as routing/fallback debt, not patched through invented localization ownership.
