# Night / Forest Hardcoded Player-Language Debt Audit v1

Status: exact post-PR58 audit of player-visible hardcoded/mixed-language debt in Chat 3-owned Night/lodging/Forest scope.

Current main:
`52ddc76148e33836d3161b63bf4c25ffb5c39d02`.

Debug/internal-only strings are excluded. Product-open Forest content is excluded.

## Already localized and no longer debt

Current UI already consumes localization for:
- Night eyebrow;
- LodgingResolution prompt;
- lodging labels;
- next-day Energy formatter;
- VoluntaryNightChoice title/prompt/context/action;
- generic Night sequence title;
- town lodging summary;
- housing labels;
- result -> choose lodging;
- `night.sleep` label;
- Forest Activity title;
- Forest Activity option labels;
- Forest Activity progress/endurance/checkpoint/route field labels.

These surfaces do not need new Chat 3 localization keys.

## Remaining player-visible debt

### 1. Raw NightFlow phase enum in generic Night fallback

Current UI generic Night fallback renders:
`night.phase`
directly as body text.

Examples of possible runtime identities:
- `PreLodgingForcedCheck`;
- `PostLodgingForcedCheck`;
- `NightEventResolution`.

Classification:
**PLAYER_VISIBLE_INTERNAL_ID_DEBT**.

Recommended ownership:
Lead/shared UI.

Safe fix direction:
map current runtime phase to localized explanatory player text while preserving the exact phase identity in Save.

Do not rename runtime enum values.

### 2. Raw Forest Activity checkpoint value

Current Forest Activity screen localizes the field label:
`ui.activity.checkpointLabel`.

But the value:
`activity.checkpoint`
is rendered raw.

Classification:
**PLAYER_VISIBLE_RUNTIME_VALUE_DEBT**.

The field value is runtime identity/state and should eventually receive a presentation formatter if non-player-facing checkpoint IDs remain visible.

Do not rewrite checkpoint state itself.

### 3. Raw Forest route-state value

Current Forest Activity screen localizes:
`ui.activity.routeLabel`.

But when a route is selected it renders raw:
- `logging-road`;
- `old-boundary`.

Classification:
**PLAYER_VISIBLE_RUNTIME_VALUE_DEBT**.

Safe future presentation:
resolve the selected route state to the existing localized route label/title.

Do not localize or rewrite `internalState.routeId` in Save.

This debt is separate from the still-outstanding route-specific media/presentationId seam.

## Night/lodging hardcoded-copy result

No current player-visible LodgingResolution or VoluntaryNightChoice prose remains RU-only/mixed-language outside localized `tr(...)` calls in the audited scope.

The active sleep panel is localized through global-shell:
- `ui.sleep.title`;
- `ui.sleep.help`;
- `ui.sleep.startButton`.

Do not add competing Chat 3 panel keys.

## Explicit exclusions

### School Night Study

Current School Night Study fallback includes mixed-language `Energy` wording in a School-owned key path.

Excluded from this audit because School localization ownership is not Chat 3-owned.

### Generic presentation occurrence keys

Strings used only for deterministic presentation occurrence identity are internal and not rendered as player language.

Excluded.

### Product-open Forest content

No debt item may be “fixed” by inventing:
- Hunter route names;
- Old Boundary Token instructions;
- challenge labels/rewards;
- seasonal mechanics;
- deeper lore.

## Priority

1. raw generic Night phase enum;
2. raw Forest route-state value;
3. raw Forest checkpoint value.

All three are presentation-consumer debt only.

## Audit conclusion

Post-PR58 removes almost all Night/lodging hardcoded player-language debt in Chat 3 scope.

The remaining exact player-facing debt is limited to raw runtime state values, not missing gameplay/content identities.
