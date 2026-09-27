# Forest Route Choice-Label Polish v1

Status: presentation-only review of current player-facing Forest route option wording.

Current route gameplay IDs remain exactly:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

No availability, condition, route-state, progress, endurance, reward, token, Hunter or result change is proposed.

## Current UI behavior

The current Activity UI renders the localized option label through:
`activityOptionLabel(action.id, action.label)`.

No dedicated player-facing help/description line is currently rendered for Forest route options.

Therefore:
- label polish can be applied independently as localization text;
- help copy below is optional presentation source for a future shared UI seam;
- help copy must not be used as a gameplay condition.

## Logging road

Gameplay ID:
`forest.route.logging-road`.

Current localized label:
- RU: `Лесовозная дорога`;
- EN: `Logging road`.

### Final label recommendation

RU:
`Лесовозная дорога`.

EN:
`Logging road`.

Disposition:
**KEEP_CURRENT**. The current label is already concise, concrete and semantically exact.

Existing key:
`activityOption.forest.route.logging-road.label`.

### Optional help copy

Proposed presentation key:
`activityOption.forest.route.logging-road.help`.

RU:
`Широкая рабочая дорога со свежими следами лесозаготовок.`

EN:
`A broad work road with fresh signs of logging.`

The help text describes visible route character only. It does not promise safety, lower cost, easier progress or a specific outcome.

## Old boundary

Gameplay ID:
`forest.route.old-boundary`.

Current localized label:
- RU: `Старая межевая тропа`;
- EN: `Old boundary path`.

### Final label recommendation

RU:
`Старая межевая тропа`.

EN:
`Old boundary path`.

Disposition:
**KEEP_CURRENT**. The current label is concise and does not over-explain the unresolved boundary semantics.

Existing key:
`activityOption.forest.route.old-boundary.label`.

### Optional help copy

Proposed presentation key:
`activityOption.forest.route.old-boundary.help`.

RU:
`Старый путь по межевым камням и выветренным меткам.`

EN:
`An old route traced by boundary stones and weathered marks.`

The help text deliberately does not mention:
- token acquisition;
- token use/consumption;
- Hunter ownership;
- magic;
- law/territory;
- a reward;
- a deeper destination.

## Shared wording rules

Route labels should answer:
“Which route am I choosing?”

Optional help should answer:
“What does this route look/read like?”

Neither should answer:
“What mechanic will this route give me?”

Avoid in route-choice presentation:
- “safe route”;
- “hard route”;
- “cheap route”;
- “rewarding route”;
- “Hunter route”;
- “requires token” as prose if the UI already handles availability mechanically;
- exact progress/endurance language.

## Localization identity

Existing labels remain under:
- `activityOption.forest.route.logging-road.label`;
- `activityOption.forest.route.old-boundary.label`.

If help copy is later consumed, the proposed help keys are locale-neutral and map directly to the same exact route IDs.

## Acceptance boundary

Any future help-copy UI must preserve:
- existing option availability;
- existing old-boundary capability gate;
- exact route IDs;
- exact route states;
- exact Activity result continuation;
- Lumber Hard Work invariants.

This item recommends presentation wording only.
