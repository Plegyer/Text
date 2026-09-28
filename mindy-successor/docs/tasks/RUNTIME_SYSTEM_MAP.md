# Runtime System Map

Status: ACTIVE REFERENCE
Repository: `Plegyer/Text`

Purpose:

A compact map for a new Lead to locate the runtime sources of truth after reading the project memory files.

This document is a navigation map, not a replacement architecture.

## Runtime definition source

Primary content definitions:

`mindy-successor/prior-work/astra/prototype-m3.2/content/definitions.json`

Contains runtime data definitions such as:

- careers;
- stages;
- transitions;
- endings;
- actions;
- metrics and related content contracts.

Do not create parallel systems. Extend existing definitions where required.

## Event system

Event/content packs:

`mindy-successor/prior-work/astra/prototype-m3.2/content/packs/`

Important areas include:

- career events;
- school events;
- relationship events;
- night events;
- production events;
- poverty-related content when present.

Events should use the existing conditions/effects model.

## State model

Runtime progression state:

`RunState.progression`

Important areas:

- career progression;
- flags;
- player state changes;
- ending eligibility.

Do not add duplicate state containers for existing systems.

## Gameplay systems map

### Calendar / day loop

Source:
- runtime day progression code;
- action resolution.

Responsibilities:
- advancing days;
- limiting actions;
- energy consumption.

### Actions and energy

Source:
- action definitions;
- action resolver.

Responsibilities:
- player choices;
- costs;
- effects.

### Careers

Source:
- definitions.json careers.

Flow:

career
→ stages
→ transitions
→ events/effects
→ endings

### Endings

Source:
- ending definitions.

Rule:

Endings are completed through the existing ending acceptance mechanism.

## Validation path

Preferred implementation flow:

manifest/design input
→ fixture
→ validator/test
→ integration
→ UI verification

## UI verification

A gameplay change is incomplete until the player-facing route can be checked through UI or equivalent acceptance tests.

## Lead recovery checklist

After reading:

1. PROJECT_WORK_ENTRYPOINT.md
2. WHITE_SQUIRREL_CHRONICLES_MASTER_MEMORY.md
3. DESIGN_MEMORY_ARCHIVE.md
4. ACTIVE_TEAM_OWNERSHIP_MATRIX.md
5. CURRENT_CHAT*_TASK_POINTER.md
6. this runtime map

then inspect current `main`, tests, and merged PR history before assigning work.
