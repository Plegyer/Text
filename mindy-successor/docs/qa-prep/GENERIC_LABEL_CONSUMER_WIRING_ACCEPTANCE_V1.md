# Generic-label consumer wiring acceptance v1

Status: COMPLETE / ACCEPTANCE_CONTRACT_READY

Current main:
`4223be1f90f15a43938e072bc2171b0de5d2d1aa`.

Current `labels.ts` still provides RU fallback dictionaries for:
- stats;
- resources;
- seasons;
- housing;
- items;
- hints.

Current `app.ts` already localizes several shell/season/condition templates, but direct `labels[id]` / `hints[id]` consumers remain.

## Core rule

Stable gameplay IDs remain authoritative.

Localization lookup must be:
`stable ID -> locale-specific display text`.

Never:
`localized display text -> gameplay ID`.

## Stat labels

Recommended resolver:
`tr('stat.' + statId + '.label', labels[statId] ?? statId)`.

Use for:
- creation;
- Stats panel;
- result deltas;
- condition presentation.

Must preserve exact stat ID/value.

No stat value or eligibility may change by locale.

## Stat hints

Resolver:
`tr('stat.' + statId + '.hint', hints[statId] ?? '')`.

Hints are descriptive only.

Changing locale must not change:
- allocation rules;
- free points;
- max/min;
- School effects;
- action eligibility.

## Resources

Use stable resource IDs:
- `money`;
- `energy`.

Preferred display lookup:
`resource.<id>.label`
or explicitly reviewed reuse of existing equivalent shell keys.

Do not rename persisted metrics or change costs.

## Items

Use:
`item.<itemId>.label`
with current raw/dictionary fallback.

Exact current item IDs remain:
- `herb`;
- `tonic`;
- `scales`;
- `reinforced_axe`;
- `rope_kit`;
- `field_preservation_kit`;
- `old_boundary_token`.

Localization cannot:
- grant/remove an item;
- change count;
- add capability;
- change Old Boundary gate semantics.

## Housing

Persisted/current machine values remain stable.

Display may use existing reviewed housing/lodging labels.

Do not migrate Save to localized housing strings.

Costs and NightFlow transitions remain exact.

## Seasons

Use:
`season.<id>.label`.

Stored calendar/day and season ID remain unchanged.

Locale does not select a season.

## Pending event / inactive-run shell

Direct shell keys may localize:
- `ui.event.eyebrow`;
- `ui.run.endingAccepted`;
- `ui.run.timeExpired`;
- `ui.run.fatesAndNextLife`.

They must not change:
- run status;
- ending ID;
- available commands;
- event identity.

## Requirement text

For typed `Condition` presentation:
- localize labels and grammar;
- preserve exact condition object and comparison values.

RU and EN must produce identical:
- `eligible(...)`;
- `meets(...)`;
- enabled/disabled state.

The visible explanation is not executable input.

## Locale-switch acceptance

For every representative consumer:
1. snapshot serialized gameplay Save;
2. snapshot stable IDs/values;
3. render RU;
4. switch to EN without gameplay command;
5. assert same Save;
6. assert same IDs/values/enabled states;
7. assert only labels/hints/explanation text change.

## Economics/mechanics firewall

Generic-label wiring must not change:
- action costs;
- wages;
- rent;
- debt;
- item effects;
- stat effects;
- Energy;
- Night consequences;
- route availability;
- ending conditions/rewards;
- RNG.

## Fallback

Missing translation must use:
- existing RU dictionary;
- catalog/raw stable ID as last resort.

Missing localization must never block gameplay.

## Required executable coverage

At minimum:
- creation stat labels/hints RU↔EN;
- Stats panel labels/hints RU↔EN;
- Bag item labels with unchanged inventory;
- one resource requirement with same enabled state;
- one item requirement with same enabled state;
- housing requirement;
- season requirement;
- inactive-run shell;
- pending-event eyebrow;
- byte-identical Save across locale-only switches.

## Verdict

`ACCEPTANCE_CONTRACT_READY`.

Accept only presentation-layer label/hint wiring that preserves all stable IDs, values, economics, condition objects and gameplay state.
