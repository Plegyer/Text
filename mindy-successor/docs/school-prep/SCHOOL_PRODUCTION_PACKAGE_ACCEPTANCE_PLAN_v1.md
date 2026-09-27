# School Production Package Acceptance Plan v1

Status: validation plan for the first real authored School production package after Product decisions. This file does not claim that package exists.

Required package properties:
- production content is included explicitly by the production catalog/bootstrap;
- no test or fixture file is shipped through recursive inclusion;
- all locked paid-course IDs, tuition, Energy costs, stat packages, counter ownership, Night-study rules, and semantic presentation IDs stay unchanged;
- approved teacher/presenter and milestone/result identities are canonical production IDs;
- any cross-system School result is committed once after its School-owned provider state;
- downstream career/Activity content reads only that public result;
- reload before/after payment, scene resolution, milestone completion, publication, and downstream reaction is deterministic;
- resolving scenes does not repeat payment or School progress;
- text/static fallback is usable even when optional media is absent.

Targeted verification:
1. authored teacher/presentation unit loads from production content;
2. authored provider/milestone becomes reachable through normal play;
3. any public result is emitted once;
4. downstream consumer reacts once using only public state;
5. reload does not repeat cost, Energy, stat gain, counters, milestone, result, or reaction;
6. presentation identity survives reload.

Full regression:
- all eight paid courses;
- all 24 Night-study choices;
- paid/Night counter separation;
- blocking School scene ordering;
- old-save default compatibility;
- long-Save unrelated-state preservation;
- Hard Work independence from School.

Direct counters, fixture-only facts, synthetic School state, or synthetic events may remain QA tools, but they do not prove natural production reachability.

Shared runtime/schema changes are outside the default authored package. Add them only when an approved content behavior cannot be represented and a concrete failing integration test demonstrates the missing primitive.
