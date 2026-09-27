# School Production Test-Case Inventory v1

Status: executable/future School QA inventory.
Classification:
- **EXECUTABLE_NOW** — current mechanics/content boundary exists and can be tested today.
- **PRODUCT_DECISION_BLOCKED** — exact provider/threshold/identity must be chosen first.
- **CONTENT_BLOCKED** — Product shape is known enough, but authored scene/data/media does not yet exist.
- **FUTURE_RUNTIME_WORK** — only if approved content demonstrates a missing runtime primitive.

## All eight paid courses

Classification: **EXECUTABLE_NOW**.

Coverage:
- exact course IDs;
- tuition;
- 1 current-day Energy;
- full stat packages;
- no ordinary Lust mutation;
- semantic paid presentation IDs;
- picker availability/disabled states;
- atomic rejection for insufficient money/Energy;
- Resolver sees complete stat package;
- save/reload without replay;
- own-track `lessons_completed` behavior.

Existing evidence includes:
- production catalog parity;
- full reload matrix;
- transaction adversarial coverage;
- course/track ownership;
- UI disabled-state coverage;
- long-Save state preservation.

Future regression case:
- run every paid course through the first-class production `schoolLesson` path when a single consolidated integration test is desired.

No Product decision required.

## Night study

Classification: **EXECUTABLE_NOW**.

Coverage:
- all 24 course/stat choices;
- supported stat only;
- +2 selected stat;
- tuition 0;
- current-day Energy 0;
- next-day Energy -1;
- one Night slot;
- `night_study_sessions +1`;
- `lessons_completed +0`;
- normal/cheap housing allowed;
- street restricted;
- save/reload exactly once;
- paid/Night/Activity mutual exclusion.

Existing evidence includes:
- Night choice catalog;
- Night production parity;
- NightFlow reachability;
- reload chronology;
- day/Night interaction matrix.

No Product decision required.

## Teacher-authored variants

Classification: **PRODUCT_DECISION_BLOCKED + CONTENT_BLOCKED**.

Blocked by:
- canonical teacher/presenter IDs;
- course assignment;
- relationship-hook policy;
- authored lesson text/media.

After decisions/content, add tests for:
- teacher ID uniqueness;
- teacher/course mapping;
- semantic presentation stability;
- conditional variants;
- pending scene reload;
- no tuition/Energy/stat/progress replay;
- relationship hook remains optional unless explicitly approved;
- static/GIF/text fallback.

Runtime status:
- current presentation/scene system expected to be sufficient;
- mark **FUTURE_RUNTIME_WORK** only if an approved variant cannot be represented and a failing integration test proves it.

## Milestones

Classification: **PRODUCT_DECISION_BLOCKED + CONTENT_BLOCKED**.

Blocked by:
- milestone form;
- owning track;
- canonical ID;
- threshold/completion rule;
- Night contribution policy;
- public-result relation.

After authoring:
- below/at/above threshold test where numeric;
- completion exactly once;
- reload before/after completion;
- no paid/Night counter cross-write;
- milestone scene/presentation identity;
- public publication exactly once if applicable.

Do not use QA fixture thresholds as production expected values.

## Management/accounting public result

Classification: **PRODUCT_DECISION_BLOCKED**.

Blocked by:
- School provider;
- milestone type;
- threshold/value;
- final School publication identity/rule.

Current downstream Lumber listener can be tested independently, but full authored PA path cannot be green until the School provider exists.

After decision:
- real School provider transaction;
- publication exactly once;
- reload before/after publication;
- listener `lumber-cross.school-management-return` consumes public result;
- no direct private School counter read;
- no duplicate tuition/Energy/`lessons_completed`;
- Foreman/Lumber response exactly once;
- Hard Work unaffected.

Runtime status:
- current public-result/Resolver surfaces expected to be sufficient;
- future runtime work only on demonstrated missing primitive.

## Arcana / Forest public result

Classification: **PRODUCT_DECISION_BLOCKED**.

Blocked by:
- whether path remains in target scope;
- School provider;
- threshold/milestone type;
- public result ID;
- exact direct Forest option/listener.

After decision:
- real Arcana School provider;
- publication exactly once;
- reload before/after publication;
- Forest option/condition before/after result;
- option visibility stable after reload;
- no Forest read of private School counters;
- Arcana paid lesson remains locked;
- later `lumber.forest.success` continuation remains Activity-result driven.

Runtime status:
- current conditions/options/public boundary expected to be sufficient;
- future runtime work only on proven gap.

## Career consumers

### Lumber management

Classification: **EXECUTABLE_NOW** for listener mechanics, **PRODUCT_DECISION_BLOCKED** for full natural School reachability.

Current listener:
- `lumber-cross.school-management-return`.

Test now:
- public result reaches listener;
- downstream state change is Lumber-owned;
- reload of pending listener scene is deterministic.

Blocked full path:
- actual School provider/threshold.

### Other ordinary careers

Classification: **CONTENT_BLOCKED**, often also **PRODUCT_DECISION_BLOCKED**.

Use the School-to-career inventory to determine intended dependency.

After authoring:
- exact public result;
- exact listener/condition;
- immediate Resolver reaction where intended;
- reload idempotency;
- no private counter leakage;
- no School payment/progress replay.

### Careers with no School dependency intended

Classification: **EXECUTABLE_NOW** negative coverage.

Verify:
- Assassin current draft receives no fabricated School prerequisite;
- Secret Debt receives no fabricated School prerequisite;
- Lumber Hard Work remains independent.

## Save / reload exactly once

Classification: **EXECUTABLE_NOW** for current mechanics and generic publication contract.

Cases:
- after paid lesson;
- pending blocking School scene;
- after scene reload before resolution;
- Night before/after choice;
- old schema-4 Save missing School state;
- long Save with unrelated career/relationship/quest/Forest/ending/Meta state;
- future public publication before/after commit.

Existing evidence covers:
- no payment replay;
- no Energy replay;
- no stat replay;
- no paid/Night progress duplication;
- pending scene stability;
- default `{tracks:{}}` compatibility.

After authored milestones/results, instantiate the same matrix with real IDs.

## Presentation fallback

Classification: **EXECUTABLE_NOW** for semantic-ID/fallback mechanics; **CONTENT_BLOCKED** for final teacher/milestone assets.

Test now:
- semantic presentation ID survives reload;
- static/text fallback does not alter mechanics;
- missing GIF does not block gameplay;
- media timing does not control transaction completion.

After content:
- every teacher/lesson/milestone public-facing unit has approved static/GIF/text mapping;
- alt text present;
- content-specific IDs stable.

## Future runtime work inventory

Currently: **none required by known School decisions**.

Create a runtime task only when:
1. Product has approved a concrete authored behavior;
2. content implementation is attempted;
3. current runtime cannot represent it;
4. an executable failing integration test demonstrates the missing primitive.

Do not classify unmade Product decisions as runtime blockers.

## Minimum post-decision acceptance suite

When Product resolves School authoring:
1. all eight paid courses remain green;
2. all 24 Night choices remain green;
3. real teacher/presentation variants pass reload;
4. real milestone/provider boundary passes exactly once;
5. management public result reaches real Lumber listener if selected;
6. Arcana public result reaches real Forest consumer if retained;
7. all career consumers use public state only;
8. no double tuition/Energy/progress;
9. semantic presentation/fallback remains stable;
10. Hard Work remains independent.
