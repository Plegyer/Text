# School Localization v10 Regression Scope

Baseline: `main@6afc01061646bc52cec824863bf89e8ad8c309d0`

Scope:
- existing School course identities;
- existing teacher identities;
- existing milestone-facing text;
- existing Night-study identities;
- existing School localization consumers.

Checks:
- no duplicate School-owned IDs;
- no missing RU/EN pairs in audited localized surfaces;
- no invented course, teacher, milestone, threshold, or career identity;
- no runtime mechanic ownership leakage.

Forbidden changes verified by review scope:
- RunState;
- Save schema;
- RNG;
- NightFlow;
- energy rules;
- career state machine;
- ending logic;
- Forest/Poverty content;
- Presentation/Media ownership.
