# Seasonal static RU EN identity QA v2

Status: COMPLETE / GREEN

Current main:
`4270bbc0d4d1117e1474a5ab9d9380dc350b0d1c`.

Scope:
all 40 ordinary-career seasonal presentation identities shipped by PR48.

## Full-set identity model

Every seasonal row has exactly:
- one locale-neutral presentationId;
- one locale-neutral physical SVG path;
- one locale-neutral altKey;
- RU+EN alt/caption values under localization.

Pattern:
- presentationId: `job/<career>/shift/<season>/default`;
- src: `assets/presentation/career-<career>-shift-<season>.svg`;
- altKey: `presentation.static.career.<career>.shift.<season>.alt`.

No RU/EN suffix exists in:
- presentationId;
- asset path;
- semantic slot.

## Full-set resolver proof

The PR48 production regression loops over all 40 seasonal rows.

For each row it resolves presentation with:
- animations enabled;
- animations disabled.

Both modes must resolve:
- the same exact SVG path;
- the same exact altKey.

This proves seasonal asset selection is independent of the animation preference and does not require locale-specific media identity.

## Locale behavior

Locale affects only localized text resolved from the stable altKey.

The same slot and same physical SVG serve RU and EN.

The existing renderer locale regression verifies the shipped static-media architecture:
- captures gameplay Save;
- switches RU -> EN;
- requires Save equality;
- requires unchanged image src;
- requires localized alt text to change.

Because PR48 introduces no new renderer or resolver branch and uses the same shipped PR47 static/altKey path, the same identity rule applies to all 40 seasonal static slots.

## Representative seasonal identities

Examples:
- `job/lumber/shift/spring/default` -> `career-lumber-shift-spring.svg`;
- `job/hunter/shift/winter/default` -> `career-hunter-shift-winter.svg`;
- `job/merchant/shift/autumn/default` -> `career-merchant-shift-autumn.svg`;
- `job/prostitute/shift/summer/default` -> `career-prostitute-shift-summer.svg`.

The language changes only accessibility/presentation strings.

## Action/result invariance

PR48 does not edit the action definitions or action-result mapping.

Therefore locale/static presentation cannot change:
- actionId;
- selected seasonal scene ID;
- career completed-shift counter;
- Energy cost;
- resource/stat deltas;
- result presentation semantic ID;
- reaction/event flow.

Existing gameplay tests remain green in the same exact-head/post-merge suites.

## RNG and Save

Seasonal static overrides contain no RNG field.

Static source selection does not consume gameplay RNG.

The resolver's deterministic media infrastructure remains independent of gameplay RNG.

No seasonal media field enters Save.

## Accessibility parity

All 80 seasonal alt/caption keys have:
- non-empty RU;
- non-empty EN.

There are no locale-specific duplicate physical assets.

## Verdict

`GREEN`.

Across the full 40-row seasonal set, RU↔EN preserves presentationId, SVG source, selected media identity and gameplay state. Only localized alt/caption text may differ.
