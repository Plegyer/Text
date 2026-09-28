# Ordinary Action Localization Debt Audit v1

Date: 2026-09-28
Owner: Chat 5
Exact current-main baseline: `4223be1f90f15a43938e072bc2171b0de5d2d1aa`

## Scope

Exact current non-career, non-School ordinary action identities audited:

- `work`
- `forage`
- `brew`
- `sell`
- `scales`
- `exam`
- `deliver`
- `visit`
- `oddjob`
- `repay`
- `rent-room`
- `rest`
- `arrival`
- `forest-search`
- `tavern-talk`
- `landlord`

Included because they still rely on raw catalog Russian for label/description and/or action-result scene text.

Explicit exclusions:
- current career actions `*.shift`;
- School course system and legacy `school` action;
- legacy job-route actions `tavern`, `lumber`, `hunt`, `guard` whose authored/seasonal content overlaps existing career/owner streams;
- Forest Activity route/result content;
- poverty/Secret Debt content.

## Root localization status

At the audited baseline, root `action.*` localization contains current career `*.shift` labels/descriptions only.

For all 16 in-scope ordinary actions:
- `action.<id>.label`: MISSING
- `action.<id>.description`: MISSING
- `action.<id>.scene.<sceneId>.text`: MISSING

## Current action-card consumer

`actionList()` already resolves:
- `action.<id>.label`
- `action.<id>.description`

with the catalog RU value as fallback.

Therefore labels/descriptions are source-ready for direct root localization merge without action-specific UI logic.

## Current result consumer

Engine currently writes ordinary action results into `lastAction` as:
- `id = action.id`
- `title = action.label`
- `text = selectedScene.text ?? action.description`
- current media/presentation identity
- gameplay deltas

The generic result screen renders `last.title` and `last.text` directly unless the result carries an event outcome reference or is the School-course special case.

Therefore ordinary action result localization is **not yet consumed** from stable action/scene localization keys.

## Current journal behavior

Ordinary action completion logs raw source strings with `journalRef=null`:
- action completion line: `<catalog action label>. Осталось энергии: <n>.`
- optional wage line;
- brew success/failure lines.

Unlike event-choice journal outcomes, ordinary action journal rows have no stable locale-neutral action-result reference today.

## Exact current mechanics snapshot

| Action | Mode | Cost | Scenes | Notes |
|---|---|---|---|---|
| `work` | `normal` | money 0, energy 1 | `default` | 0 condition(s), 3 base effect(s) |
| `forage` | `normal` | money 0, energy 1 | `default` | 0 condition(s), 2 base effect(s) |
| `brew` | `brew` | money 0, energy 1 | `default` | 1 condition(s), 0 base effect(s) |
| `sell` | `normal` | money 0, energy 1 | `default` | 1 condition(s), 2 base effect(s) |
| `scales` | `normal` | money 60, energy 1 | `default` | 1 condition(s), 1 base effect(s) |
| `exam` | `normal` | money 20, energy 1 | `default` | 4 condition(s), 2 base effect(s) |
| `deliver` | `normal` | money 0, energy 1 | `default` | 3 condition(s), 4 base effect(s) |
| `visit` | `normal` | money 5, energy 1 | `default` | 1 condition(s), 1 base effect(s) |
| `oddjob` | `normal` | money 0, energy 1 | `default` | 0 condition(s), 1 base effect(s) |
| `repay` | `normal` | money 10, energy 1 | `default` | 1 condition(s), 1 base effect(s) |
| `rent-room` | `normal` | money 18, energy 1 | `default` | 2 condition(s), 1 base effect(s) |
| `rest` | `normal` | money 0, energy 1 | `default` | 0 condition(s), 0 base effect(s) |
| `arrival` | `story` | money 0, energy 0 | `default` | 1 condition(s), 0 base effect(s) |
| `forest-search` | `normal` | money 0, energy 1 | `default` | 4 condition(s), 1 base effect(s) |
| `tavern-talk` | `normal` | money 0, energy 1 | `default` | 3 condition(s), 0 base effect(s) |
| `landlord` | `normal` | money 0, energy 1 | `default` | 2 condition(s), 0 base effect(s) |

## Content debt classification

### SAFE_TEXT_SOURCE
Items 122–125 can provide exact RU+EN:
- labels;
- descriptions;
- current scene text;
- brew recipe UI/result-source text.

### RESULT_CONSUMER_REQUIRED
Generic ordinary action results need a stable presentation lookup using action ID + selected scene identity, without rewriting gameplay Save according to locale.

### JOURNAL_LIMITATION
Raw ordinary action journal strings cannot be safely retro-localized by fuzzy text matching. A future consumer needs stable locale-neutral refs/codes for action logs.

## Invariants

Localization must not change:
- action IDs;
- scene IDs/selection;
- mode;
- costs/economics;
- conditions;
- effects;
- brew success rule/yields;
- action count/slot behavior;
- resolver behavior;
- RNG;
- Save identity.
