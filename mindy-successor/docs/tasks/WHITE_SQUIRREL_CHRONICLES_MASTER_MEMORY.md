# White Squirrel Chronicles Master Memory

Status: ACTIVE
Purpose: allow a new Lead to understand project direction quickly.

## Project

Name: White Squirrel Chronicles

Cultural successor target: preserve the interconnected, time-boxed life-sim structure rather than reproducing old implementation details.

## Core locked direction

- calendar: 160 days = 4 years × 40 days = 4 seasons × 10 days;
- 3 daily actions remain part of the intended life-loop structure;
- 12 progression stats begin at 1 with 10 allocation points; Lust is separate;
- exactly three starting careers: Dwarven Lumber, Satyr Maid, Undead Farm;
- 10 ordinary professions total plus hidden Palace as the 11th main profession;
- Secret Debt is extra/hidden and does not count toward the 10 ordinary professions or Palace unlock;
- Palace unlock requires Hard Work on all 10 ordinary professions;
- Expedition is the large Activity umbrella;
- endings may become eligible without automatically ending the run;
- knowledge/content NG+ unlocks are automatic, while stronger modifiers belong to a limited pre-run loadout.

For exact current decisions and still-open values, read:
- `mindy-successor/docs/USER_DECISIONS_LOCKED_v1.md`;
- `mindy-successor/docs/USER_VISION_AND_ACCEPTANCE.md`.

## Architecture

The project uses a data-driven architecture.

Do not replace the current architecture with parallel systems.

Primary workflow:

manifest → fixture → validator → handoff → integration

Runtime truth remains:
- current main code;
- definitions;
- tests;
- merged PR history.

## Current coordination source

For active work use, in order:
- `PROJECT_WORK_ENTRYPOINT.md`;
- `ACTIVE_TEAM_OWNERSHIP_MATRIX.md`;
- `CURRENT_CHAT*_TASK_POINTER.md`;
- active queue named by each pointer.

Worker chat prose is not durable project memory. Detailed evidence belongs in Git.

## Current development focus

Priority is connected playable routes rather than isolated content packages.

Current primary slice:
1. valid shipped runtime baseline;
2. playable Dwarven Lumber vertical slice;
3. profession stages and outcomes;
4. School milestones affecting careers;
5. Forest/Expedition consequences;
6. poverty depth and alternative-life routes;
7. presentation/localization in parallel;
8. QA on frozen exact heads.

Lumber Hard Work is locked at `completed_shifts >= 50`.

Intermediate Lumber numeric thresholds remain open unless a later explicit current decision locks them.

## Design archive

Historical design memories are stored in:
- `DESIGN_MEMORY_ARCHIVE.md`.

The archive may contain obsolete or historical ideas. It never overrides current locked decisions, runtime definitions, tests, or active task pointers.
