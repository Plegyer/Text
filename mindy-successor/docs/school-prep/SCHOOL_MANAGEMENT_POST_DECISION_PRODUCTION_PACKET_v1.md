# School Management Post-Decision Production Packet v1

Status: implementation checklist to use after the management/accounting School provider and milestone are approved. Until then all decision fields remain OPEN.

Fields to fill:
- provider type;
- owning track;
- canonical provider ID;
- milestone or threshold form;
- exact value;
- Night-study contribution policy;
- canonical public result ID;
- publication timing.

Implementation:
1. author the School-private provider or milestone in production content;
2. add the authored result scene and semantic presentation mapping;
3. publish the approved public result exactly once after private School state commits;
4. update or confirm the Lumber management consumer and any other approved consumer;
5. keep every downstream state change owned by the downstream domain.

Verification:
- provider eligibility, including below/at/above when numeric;
- reload before and after publication;
- pending downstream reaction survives reload;
- no duplicate tuition, Energy, paid stat package, or School progress;
- no duplicate public result or reaction;
- downstream consumer reads public state only;
- presentation identity and fallback remain stable.

Rollback:
- remove only the authored management provider/publication/consumer integration introduced by the package;
- preserve locked School mechanics and unrelated tracks;
- preserve Lumber Hard Work independence.

Shared runtime/schema work is outside the default packet unless an approved authored behavior produces a concrete failing integration test that proves a missing primitive.
