# School Arcana / Forest Post-Decision Production Packet v1

Status: implementation checklist to use only after the Arcana/Forest path scope, provider, milestone/value, and consumer are approved. This document does not retain the route by assumption.

Fields to fill:
- path retained: OPEN;
- School provider type: OPEN;
- owning track: OPEN;
- canonical provider ID: OPEN;
- milestone/threshold form and exact value: OPEN;
- Night-study contribution: OPEN;
- canonical public result ID: OPEN;
- publication timing: OPEN;
- exact Forest/Activity consumer or option: OPEN.

If the path is not retained:
- do not create a School public result merely for compatibility;
- leave ordinary Arcana paid mechanics unchanged;
- leave Forest Activity/result ownership unchanged;
- remove only draft integration references that depended on the abandoned path.

If retained, implementation sequence:
1. author the Arcana School-private provider/milestone;
2. add one exactly-once public publication;
3. author the explicit Forest/Activity consumer or option;
4. keep Forest-owned state changes in Forest/Activity content;
5. preserve the existing Activity-result continuation unless explicitly changed;
6. add semantic presentation mapping and fallback.

Verification:
- provider eligibility;
- public publication once;
- reload before/after publication;
- Forest option/condition before and after the public result;
- option/consumer remains stable across reload;
- no direct Forest read of School-private counters;
- no duplicate tuition, Energy, paid stats, `lessons_completed`, Night progress, result, or reaction;
- Arcana paid presentation identity remains stable;
- later Activity result remains Activity-owned.

Rollback:
- remove the Arcana public-result definition and direct Forest consumer added by this package;
- preserve locked Arcana course mechanics;
- preserve unrelated Forest/Lumber content and results;
- preserve School/Forest save compatibility.

Shared runtime/schema work is outside the default packet unless approved content produces a failing integration test proving a missing primitive.
