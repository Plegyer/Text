# Executable TЗ Skeleton v0

Дата: 2026-09-25.

Статус: **SUPERSEDED ASSEMBLY SKELETON**. Current master implementation spec: `EXECUTABLE_TZ_v1.md`.

Цель: будущий полный документ собирается по этой структуре. High-impact decisions уже зафиксированы в `USER_DECISIONS_LOCKED_v1.md`; оставшиеся open numbers/content перечислены в `OPEN_QUESTIONS.md`.

## 0. Document contract

Каждый раздел финального ТЗ должен различать:
- LOCKED;
- CONFIGURABLE;
- DEFERRED;
- TEST-ONLY.

Ни один исполнитель не закрывает DESIGN OPEN своим вкусом.

## 1. Product statement

Source:
`USER_VISION_AND_ACCEPTANCE.md`.

Include:
- fantasy premise;
- adult audience/tone;
- life-sim priority;
- replay;
- cross-system density;
- what not to clone.

## 2. Fixed game loop

Include:
- Energy;
- DayHub;
- Work;
- School;
- Activity;
- EndDay;
- Night;
- next day;
- ending commitment;
- Meta/New Run.

Calendar already locked: 160 days = 4x40, seasons x10.

## 3. Character model

Use `TARGET_STAT_SYSTEM_v1.md`.

Specify:
- 12 progression stat IDs + separate Lust axis;
- caps/floors;
- starting values;
- allocation;
- Lust semantics;
- volatile conditions;
- derived values.

## 4. State schemas

From target architecture:
- SaveEnvelope;
- MetaState;
- RunState;
- DayState;
- Character;
- Resources;
- Progression;
- Ending;
- Flow;
- RNG;
- History.

Include exact Zod/TypeScript target schemas in implementation appendix.

## 5. Conditions/effects

Exact discriminated unions.
No arbitrary callbacks/path writes.

Include read/write permissions and examples.

## 6. Resolver

Exact:
- reaction facts;
- priority classes;
- tie-break;
- epoch;
- chance;
- queue/latch;
- cascade cap;
- debug trace.

## 7. Calendar

Locked baseline: 160 days = 4 years x 40 days, 4 seasons x10.

Specify:
- total run;
- seasons;
- scheduled windows;
- terminal flow;
- extra-time meta policy.

## 8. Economy

After calendar:
- WU scale;
- exact currency;
- starting money;
- wages;
- rent ladder;
- School costs;
- item costs;
- income variance;
- anti-softlock;
- simulations.

## 9. Jobs

For each ordinary career:
- availability;
- repeatable work;
- seasonal stat package from `SEASONAL_JOB_STAT_MODEL_v1.md`;
- wage formula;
- seasonal content pools;
- career stages;
- relationships;
- School hooks;
- item hooks;
- Activity hooks;
- endings;
- meta rewards.

Include all 10 specs.

## 10. Secret Debt career

Specify:
- street trigger chance;
- one-time behavior;
- loan amount;
- 10-day delay;
- demanded amount;
- job lock;
- forced night;
- Energy penalty;
- income/debt flow;
- paid_freedom;
- bound_life;
- takeover;
- exact rewards;
- Hard Work accounting.

## 11. Palace

Unlock fixed: all 10 ordinary Hard Work outcomes.

Specify:
- 10/10 prerequisite representation;
- discovery;
- repeatable assignments;
- legacy-sensitive options;
- career stages;
- outcomes;
- macro-goal hooks.

## 12. School

Finalize:
- tracks;
- teachers;
- lessons;
- milestones;
- certificates;
- exams/projects;
- endings;
- night study;
- prices.

## 13. Relationships

Specify:
- major NPC roster;
- per-NPC typed state;
- optional meters only where needed;
- night events;
- rejection;
- endings;
- Meta persistence.

## 14. Housing / poverty / night

Specify:
- normal/cheap/street;
- costs/effects;
- event pools;
- forced priorities;
- voluntary choices;
- NextDayModifiers.

## 15. Items

Specify:
- ItemDefinition;
- capability catalog;
- inventory;
- loadouts;
- sources;
- consumption;
- initial production catalog;
- UI.

## 16. Large Activity

Direction locked to expedition umbrella; camp allowed for multi-day expeditions.

Specify:
- umbrella mechanics;
- entry cost;
- internal resources;
- region structure;
- encounters;
- equipment;
- seasons;
- camp;
- save/resume;
- failure/escape;
- city feedback.

## 17. Endings / Meta

Policy locked: knowledge/content automatic; strong rule modifiers selectable.

Specify:
- eligibility;
- commitment;
- central completion;
- RunResult;
- reward tiers;
- exact catalog;
- loadout;
- knowledge fragments;
- macro route.

## 18. UI shell

Specify:
- target resolution;
- persistent HUD;
- central stage;
- navigation;
- screens;
- Activity mode;
- Night;
- endings;
- accessibility.

## 19. Presentation/media

From Media Contract:
- stable IDs;
- file formats;
- fallback;
- editor;
- overrides;
- budgets.

## 20. Persistence

Specify:
- schema versions;
- content versions;
- migrations;
- M3.2 development migration;
- import Meta merge;
- pending/activity migration.

## 21. Validation / tests

Three layers:
- unit;
- scenario;
- product acceptance.

Include:
- unreachable content;
- loops;
- economy simulations;
- endings too early;
- repeat exhaustion;
- save/reload determinism.

## 22. Production scope

Staged internal milestones locked; full public 1.0 includes Secret Debt and Palace/meta pillars.

Specify:
- internal milestone sequence;
- public release scope;
- career count;
- Activity regions;
- NPC count;
- media budget.

## 23. Execution packages

Every package includes:
- package ID;
- dependency commits;
- required read files;
- allowed write files;
- explicit out-of-scope;
- exact expected outputs;
- commands/tests;
- acceptance;
- integration order;
- rollback checkpoint.

## 24. Windows delivery

Specify:
- one-command/button startup;
- build;
- packaging;
- save path;
- portable/import/export behavior;
- clean-machine test.

## 25. Recovery / continuity

Each milestone:
- Git checkpoint;
- STATUS;
- incomplete changes;
- next command/task;
- no hidden local-only dependency.

## Appendix A — decision record

D1–D12 with final choices and rationale.

## Appendix B — IDs

Jobs, stats, events, items, NPCs, endings, media.

## Appendix C — reference evidence

Only links to relevant research, not full reverse-engineering dump.
