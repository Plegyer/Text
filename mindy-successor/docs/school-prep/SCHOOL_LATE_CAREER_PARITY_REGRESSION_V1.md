# Late-Career School Parity Regression v1

Task: C5-35
Baseline: `main@05fa2d1084a48cab20d42f23885e19ee627d3d09`
Test: `tests/school-late-career-parity-v1.test.ts`

The focused regression covers C5-25 through C5-34 and locks:
- exactly seven current late ordinary careers and their current `.shift` actions;
- use of existing School course IDs only;
- null threshold/public-result fields in career preparation fixtures;
- complete RU/EN pairs for every prepared player-facing string;
- unique prepared localization keys with no current root-localization collision;
- all eight existing teacher identities and their current course mappings;
- exact existing Night-study choice IDs;
- unchanged Night-study tuition/Energy/stat contract;
- zero School-authored career/world-fact writes;
- non-explicit voluntary Prostitute preparation with no Lust, consent-rule, or NightFlow changes.

This is content-side regression coverage only. It does not add a runtime producer or consumer.
