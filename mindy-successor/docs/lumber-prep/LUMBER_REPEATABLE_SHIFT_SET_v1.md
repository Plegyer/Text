# Lumber Repeatable Shift Set v1

Status: ISOLATED CONTENT/DATA DRAFT. Not wired into the live catalog.

Authority:
- CAREER_LUMBER_DRAFT_v0.md
- SEASONAL_JOB_STAT_MODEL_v1.md
- SUCCESSOR_JOB_SEASON_MATRIX_v1.csv
- INITIAL_ITEM_CATALOG_v0.md
- GIF_CENTRAL_STAGE_CONTRACT_v1.md
- EXECUTABLE_TZ_v1.md

## 1. Mechanical baseline

Every ordinary Lumber shift:
- costs 1 daily Energy;
- awards the Lumber wage according to the later economy/rank definition;
- increments `career[lumber].shifts` exactly once;
- applies the current season package exactly once;
- emits `ActionCompleted(job.lumber)` and relevant career/stat reaction facts;
- then runs the Event Resolver.

A text/media variant never reapplies the seasonal package.

Current Lumber seasonal packages from `SUCCESSOR_JOB_SEASON_MATRIX_v1.csv`:

| Season | Effects |
|---|---|
| spring | +1 Strength; +1 Endurance; -1 Grooming |
| summer | +1 Strength; +1 Endurance; -1 Grooming; -1 Manners |
| autumn | +1 Strength; +1 Dexterity; -1 Endurance |
| winter | +2 Endurance; -1 Sociability |

All progression stats remain clamped by the target stat rules.

## 2. Variant selection rules

Selection inputs:
- current season;
- career stage;
- variant history/cooldown;
- relevant known NPCs;
- item capabilities;
- already-known forest facts.

Default repeat policy:
- avoid the exact same variant on consecutive Lumber shifts when another eligible variant exists;
- ordinary variants may repeat after a short history cooldown;
- clue/milestone-adjacent variants are latched or one-shot through their owning event/fact, not spammed as random shifts;
- presentation may be reused by multiple variants sharing one visual situation.

No unique GIF is required per text line.

## 3. Shift variants

### S01 `lumber.shift.spring.mud_access`
Season: spring.  
Stage: any Lumber stage with ordinary work available.  
Situation: heavy access through mud/water to the work area.  
Mechanical package: spring base package only.  
Cooldown intent: short repeat cooldown.  
Presentation: `job/lumber/shift/spring/mud-access`.

### S02 `lumber.shift.spring.road_damage`
Season: spring.  
Stage: L1+ preferred; L0 allowed if content needs breadth.  
Situation: damaged access road/logistics caused by spring conditions.  
Mechanical package: spring base package only.  
Cooldown intent: medium; avoid back-to-back infrastructure scenes.  
Presentation: `job/lumber/shift/spring/road-work`.

### S03 `lumber.shift.spring.paired_work`
Season: spring.  
Stage: after Foreman relationship becomes professional.  
Situation: work in a pair/crew under difficult spring access.  
Mechanical package: spring base package only.  
Relationship hook: may increment the relationship-owned/career-coordinated joint-shift counter through typed effects.  
Cooldown intent: short-to-medium.  
Presentation: `job/lumber/shift/shared/paired-work`.

### S04 `lumber.shift.summer.felling`
Season: summer.  
Stage: any.  
Situation: ordinary high-productivity felling.  
Mechanical package: summer base package only.  
Cooldown intent: short.  
Presentation: `job/lumber/shift/summer/felling`.

### S05 `lumber.shift.summer.distant_plot`
Season: summer.  
Stage: L1+.  
Situation: distant work area / long-haul access.  
Mechanical package: summer base package only.  
Cooldown intent: medium.  
Presentation: `job/lumber/shift/summer/distant-plot`.

### S06 `lumber.shift.summer.fire_risk`
Season: summer.  
Stage: L1+.  
Situation: ordinary work constrained by heat/fire risk.  
Mechanical package: summer base package only.  
Cooldown intent: medium-to-long; not consecutive.  
Presentation: `job/lumber/shift/summer/fire-risk`.

### S07 `lumber.shift.autumn.sorting`
Season: autumn.  
Stage: any.  
Situation: sorting/processing under high demand.  
Mechanical package: autumn base package only.  
Cooldown intent: short.  
Presentation: `job/lumber/shift/autumn/sorting`.

### S08 `lumber.shift.autumn.logistics`
Season: autumn.  
Stage: L1+.  
Situation: loading/transport/logistics pressure.  
Mechanical package: autumn base package only.  
Cooldown intent: short-to-medium.  
Presentation: `job/lumber/shift/autumn/logistics`.

### S09 `lumber.shift.autumn.tracks_context`
Season: autumn.  
Stage: L1+ and only before the relevant forest clue is resolved.  
Situation: migration/tracks intersect ordinary work context.  
Mechanical package: autumn base package only.  
Progression rule: this repeatable shell must not itself invent the final forest fact. A separate resolver milestone/event owns `forest_anomaly_seen` or `forest_tracks_confirmed`.  
Cooldown intent: long / suppressed after the clue milestone.  
Presentation: `job/lumber/shift/autumn/tracks`.

### S10 `lumber.shift.winter.frozen_route`
Season: winter.  
Stage: any.  
Situation: work/haul over frozen access.  
Mechanical package: winter base package only.  
Cooldown intent: short.  
Presentation: `job/lumber/shift/winter/frozen-route`.

### S11 `lumber.shift.winter.high_value_cut`
Season: winter.  
Stage: L1+.  
Situation: difficult/high-value winter cutting context.  
Mechanical package: winter base package only.  
Item hook: if capability `cut_heavy_wood` or `lumber_high_risk_shift` is present, a capability-specific choice can be offered. Any additional risk/reward values remain OPEN and must not silently replace the base seasonal package.  
Cooldown intent: medium.  
Presentation: `job/lumber/shift/winter/heavy-cut`.

### S12 `lumber.shift.winter.tool_repair`
Season: winter.  
Stage: any.  
Situation: tool repair/maintenance around difficult winter work.  
Mechanical package: winter base package only.  
Relationship hook: can share the same professional context used by an optional Foreman beat without charging relationship Energy.  
Cooldown intent: medium.  
Presentation: `job/lumber/shift/shared/tool-repair`.

## 4. Cross-season optional overlays

These are content overlays, not extra Work commands and not extra seasonal stat applications.

### Foreman present overlay
Eligibility:
- relationship stage `professional` or later;
- relationship route not resolved away from the relevant context;
- cooldown permits.

Effect:
- alter text/choices;
- optionally increment `jointShifts` once for the completed work context;
- can emit a relationship reaction fact after Work resolves.

Visual:
- use the base shift presentation unless the Foreman presence materially changes the scene;
- when visually distinct, use `job/lumber/shift/shared/paired-work`.

### Reinforced axe overlay
Eligibility:
- inventory capability `cut_heavy_wood` and/or `lumber_high_risk_shift`.

Effect:
- expose a capability-specific work option;
- no generic percentage bonus;
- exact special risk/reward remains OPEN.

Visual:
- `job/lumber/shift/shared/heavy-tool` when a distinct asset exists;
- otherwise fall back to the season's ordinary Lumber work media.

### Forest clue overlay
Eligibility:
- correct career stage/season/context;
- clue fact not yet owned.

Rule:
- variant may visually foreshadow the source-supported forest problem;
- a dedicated milestone/event owns the fact write and resolver progression;
- after fact acquisition, ordinary shifts return to reusable work pools.

## 5. Reuse / cooldown matrix

| Variant family | Reuse intent | Presentation reuse |
|---|---|---|
| ordinary felling/sorting/haul | frequent, short cooldown | reusable seasonal GIF |
| road/logistics/distant access | medium | reusable situational GIF |
| paired Foreman work | medium, relationship-gated | one shared paired-work GIF |
| fire-risk / tracks context | medium-long | distinct contextual GIF if available |
| tool repair | medium | one shared maintenance GIF |
| reinforced-axe option | capability-gated | heavy-tool slot or season fallback |
| clue-adjacent shell | suppressed after owning milestone | does not need unique text-line GIF |

## 6. Resolver boundaries

A completed shift can trigger, at 0 extra Energy:
- first career milestone;
- Foreman entry/professional relationship scene;
- trust milestone after joint work;
- L2 progression;
- forest clue milestone;
- ending eligibility registration.

The Work command is the only owner of the 1-Energy cost. Any reactive career/relationship scene after it is free unless later content explicitly defines a separate paid action.

## 7. Open values intentionally not invented

- wage/base pay and rank modifiers;
- exact MILESTONE_A/B;
- exact cooldown numbers;
- exact additional risk/reward of reinforced-axe special work;
- final prose;
- exact media asset files.
