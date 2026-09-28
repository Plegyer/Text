# Current Chat 1 Developer task pointer

Status: ASSIGNED
Owner: Chat 1 Developer / Integration Developer

Source of truth:
- mindy-successor/docs/PROJECT_WORK_ENTRYPOINT.md
- mindy-successor/docs/tasks/ACTIVE_TEAM_OWNERSHIP_MATRIX.md
- mindy-successor/docs/CAREER_LUMBER_DRAFT_v0.md
- mindy-successor/prior-work/astra/prototype-m3.2/content/definitions.json

# Lumber career vertical slice

Implement the existing Lumber career route using the existing systems only:
- careers definitions;
- stages;
- transitions;
- event conditions/effects;
- RunState.progression.careers;
- existing endings acceptance flow.

Do not create a parallel profession state layer.

# Confirmed runtime IDs

Career:
- lumber

Existing stages:
- newcomer
- accepted-hand

Existing transition:
- accept-hand

Existing endings:
- ending.lumber.hard-work
- ending.lumber.forewoman
- ending.lumber.forest

Hard Work rule is fixed:
- completed_shifts >= 50

Do not modify this condition.

# Missing design stages

The design contains additional stages not yet represented as runtime IDs.
Add only the missing implementation stages required for the vertical slice and mark them as NEW IDs according to project naming rules.

Required new stage IDs:
- lumber.trusted-worker (NEW)
- lumber.veteran (NEW)
- lumber.forewoman-ready (NEW)
- lumber.forest-ready (NEW)
- lumber.outcome-ready (NEW)

Do not invent new story branches. These IDs only represent implementation of already approved design states.

# Required implementation route

Route:

1. lumber + newcomer

Existing:
- starting career assignment.

2. accepted-hand

Existing:
- reached through transition accept-hand.

3. trusted-worker (NEW)

Purpose:
- design stage L2.

Transition:
- use existing career progression conditions where available.
- if a missing threshold exists, report the exact missing design value.

4. veteran / forewoman-ready / forest-ready (NEW)

Purpose:
- expose the three approved design directions.

Do not invent rewards, thresholds, NPC choices or narrative facts.
Use existing event resolver patterns.

5. outcome-ready (NEW)

Purpose:
- allow existing endings eligibility flow.

Endings remain:
- ending.lumber.hard-work
- ending.lumber.forewoman
- ending.lumber.forest

# Event sources

Use existing event packs:
- mindy-successor/prior-work/astra/prototype-m3.2/content/packs/lumber-production.json
- mindy-successor/prior-work/astra/prototype-m3.2/content/packs/lumber-cross-production.json
- mindy-successor/prior-work/astra/prototype-m3.2/content/packs/lumber-night-production.json

# Allowed files

Modify only:
- career definition files;
- Lumber event pack files;
- existing ending integration files if required;
- existing UI route/presentation files needed to display career stage/outcome;
- focused Lumber tests.

Do not modify:
- Save schema;
- unrelated careers;
- generic ending framework;
- unrelated UI systems.

# Acceptance

PR must prove through UI:

- player can enter Lumber career;
- UI displays newcomer;
- accept-hand transition works;
- new stages can be reached through existing resolver conditions;
- RunState.progression.careers stores current Lumber stage;
- eligible ending appears through existing ending acceptance flow;
- completed_shifts >= 50 still independently enables Hard Work.

Required delivery:
- one PR;
- exact changed files;
- commit SHA;
- tests run.

If an approved branch requires a missing narrative threshold or reward decision not present in design, stop and ask that single concrete design question instead of inventing it.
