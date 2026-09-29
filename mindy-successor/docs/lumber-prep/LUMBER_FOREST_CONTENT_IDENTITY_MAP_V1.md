# Lumber Forest Content Identity Map v1

Status: current-main content-side identity map for C3-03.
Owner: Chat 3 / Forest + Poverty Content Bundles Worker.
Baseline main: `921abfa79f4dba9c0acee4eca6724c3ed122d42f`.

This document maps existing production identities only. It does not add Activity architecture, route mechanics, combat, Save fields, RNG, career transitions, ending logic, or Product-open values.

## 1. Authoritative current Forest Activity identity

Production Activity:
- Activity ID: `lumber.forest`.
- Entry Energy cost: existing value `2`.
- Resume policy: `allowed`.
- Time policy: `same_day`.
- Failure policy: `exit_to_day`.
- Existing adapter: `counter.v1`.

Chat 3 must not change those mechanics while authoring content hooks.

Current route options:
- option ID `forest.route.logging-road`;
  - route state `logging-road`;
  - no extra condition.
- option ID `forest.route.old-boundary`;
  - route state `old-boundary`;
  - existing gate: item capability `enter_old_boundary`.

Current route presentation IDs:
- neutral fallback: `activity/forest/route/default`;
- Logging Road: `activity/forest/route/logging-road`;
- Old Boundary: `activity/forest/route/old-boundary`.

Current route localization:
- `activity.lumber.forest.label`;
- `activityOption.forest.route.logging-road.label`;
- `activityOption.forest.route.logging-road.help`;
- `activityOption.forest.route.old-boundary.label`;
- `activityOption.forest.route.old-boundary.help`;
- `presentation.static.forest.route.default.alt`;
- `presentation.static.forest.route.default.caption`;
- `presentation.activity.forest.route.logging-road.alt`;
- `presentation.activity.forest.route.logging-road.caption`;
- `presentation.activity.forest.route.old-boundary.alt`;
- `presentation.activity.forest.route.old-boundary.caption`.

Current project-owned static route assets are already bound in presentation:
- `assets/presentation/forest-route-default-v1.svg`;
- `assets/presentation/forest-route-logging-road.svg`;
- `assets/presentation/forest-route-old-boundary-v3.svg`.

These media paths remain Chat 2 / presentation-source territory. Chat 3 consumes the identities only.

## 2. Exact Activity terminal identities

Current Activity results are distinct and must remain distinct:

| Outcome | Activity result ID | Existing world fact effect |
| --- | --- | --- |
| success | `lumber.forest.success` | `lumber.forest.truth-known` |
| escape | `lumber.forest.escape` | `lumber.forest.escaped` |
| failure | `lumber.forest.failure` | `lumber.forest.failed` |

The result boundary emitted by shared runtime is:
`activityResult(activity, outcome, result)`.

Exact Forest boundaries therefore are:
- `activityResult(lumber.forest, success, lumber.forest.success)`;
- `activityResult(lumber.forest, escape, lumber.forest.escape)`;
- `activityResult(lumber.forest, failure, lumber.forest.failure)`.

Chat 3 result content must attach to these existing boundaries and must not rewrite one outcome into another.

## 3. Existing Forest result content pack

Pack:
- `forest-result-content-v1`
- source file: `content/packs/forest-result-content-bilingual-v2.json`
- reads Activity `lumber.forest`;
- writes no gameplay capability/state itself.

Existing content event identities:

| Outcome | Event ID | Variant | Choice | Reaction boundary |
| --- | --- | --- | --- | --- |
| success | `forest-result-content-v1.success` | `default` | `return` | exact success ActivityResult |
| escape | `forest-result-content-v1.escape` | `default` | `return` | exact escape ActivityResult |
| failure | `forest-result-content-v1.failure` | `default` | `return` | exact failure ActivityResult |

All three existing `return` choices have empty effects. They are presentation/content reactions and do not alter the Activity result.

Existing RU/EN localization roots:
- `event.forest-result-content-v1.success.*`;
- `event.forest-result-content-v1.escape.*`;
- `event.forest-result-content-v1.failure.*`;
- `media.forest-result-content-v1.success.alt`;
- `media.forest-result-content-v1.escape.alt`;
- `media.forest-result-content-v1.failure.alt`.

Each event currently has complete RU/EN title, default-variant text, return label, return text, and media alt localization.

## 4. Existing result / reaction presentation identities

Current presentation contains these Forest terminal/static identities:
- `activity/forest/return/success`;
- `activity/forest/return/escape`;
- `activity/forest/return/failure`.

Current corresponding return assets:
- `assets/presentation/forest-return-success-v2.svg`;
- `assets/presentation/forest-return-escape-v2.svg`;
- `assets/presentation/forest-return-failure-v2.svg`.

Because the existing Forest result content events use `sourceDomain: "lumber"`, their event presentation IDs resolve through the existing career-domain rule:
- `job/lumber/event/forest-result-content-v1-success/default`;
- `job/lumber/event/forest-result-content-v1-escape/default`;
- `job/lumber/event/forest-result-content-v1-failure/default`.

Current reaction assets:
- `assets/presentation/forest-reaction-success-v2.svg`;
- `assets/presentation/forest-reaction-escape-v2.svg`;
- `assets/presentation/forest-reaction-failure-v2.svg`.

Relevant localization roots:
- `presentation.static.forest-return-success-v2.*`;
- `presentation.static.forest-return-escape-v2.*`;
- `presentation.static.forest-return-failure-v2.*`;
- `presentation.static.forest-reaction-success-v2.*`;
- `presentation.static.forest-reaction-escape-v2.*`;
- `presentation.static.forest-reaction-failure-v2.*`;
- `presentation.static.forest.result.success.*`;
- `presentation.static.forest.result.escape.*`;
- `presentation.static.forest.result.failure.*`.

C3-04/C3-05 content should reuse these identities rather than inventing a second terminal-result namespace.

## 5. Forest -> Lumber continuation seam

Existing production pack:
- pack ID `lumber-cross`;
- event ID `lumber-cross.activity-forest-return`.

Exact trigger:
`activityResult(lumber.forest, success, lumber.forest.success)`.

Existing condition:
- world fact `lumber.forest.truth-known` present.

Existing continuation choice:
- choice ID `continue`.

Existing effects already owned by Lumber integration:
- add Lumber career fact `forest-truth-known`;
- add Lumber career fact `forest-problem-resolved`.

Important state-layer distinction:

`lumber.forest.truth-known`
is an Activity/world fact created by the successful Activity result.

`forest-truth-known`
and
`forest-problem-resolved`
are Lumber career facts created later by the existing Lumber return continuation.

Chat 3 content may describe this transition but must not duplicate or replace the effects.

Current `lumber-cross` reads:
- career `lumber`;
- relationship `lumber.foreman`;
- Activity `lumber.forest`;
- world facts `lumber.school.management-ready` and `lumber.forest.truth-known`.

It writes only to career `lumber`.

## 6. Lumber ending identities connected to Forest

Current production ending IDs relevant to Lumber:
- legacy/simple ending `lumber-stay`;
- `ending.lumber.hard-work`;
- `ending.lumber.forewoman`;
- `ending.lumber.forest`.

Forest-specific ending:
`ending.lumber.forest`.

Its existing conditions are Lumber career facts:
- `forest-truth-known`;
- `forest-problem-resolved`.

Therefore the current natural success chain is:

`lumber.forest`
-> `lumber.forest.success`
-> world fact `lumber.forest.truth-known`
-> `lumber-cross.activity-forest-return`
-> Lumber career facts `forest-truth-known` + `forest-problem-resolved`
-> existing eligibility checks for `ending.lumber.forest`.

Chat 3 must not add direct ending effects to the Activity or to Forest result presentation events.

Exact ending localization keys currently shipped:
- `ending.lumber-stay.title`;
- `ending.lumber-stay.description`;
- `ending.ending.lumber.hard-work.title`;
- `ending.ending.lumber.hard-work.description`;
- `ending.ending.lumber.forewoman.title`;
- `ending.ending.lumber.forewoman.description`;
- `ending.ending.lumber.forest.title`;
- `ending.ending.lumber.forest.description`.

The double `ending.ending.*` prefix is the current localization identity produced by the existing `ending.<endingId>.*` convention for IDs that already start with `ending.`. Do not silently rename it in content work.

## 7. Hard Work non-overlap

`ending.lumber.hard-work` is not a Forest-result ending.

Current exact eligibility is the existing Lumber career counter condition:
- career `lumber`;
- counter `completed_shifts`;
- `>= 50`.

Its exact meta reward identity is:
- `hardWork:lumber`.

Forest content must not add a Forest, School, relationship, or item prerequisite to Hard Work.

## 8. Relationship / School boundaries visible to Forest content

Current Foreman relationship identity:
- relationship `lumber.foreman`;
- stages `unknown`, `professional`, `route-professional`.

Current management-return path is separate from Forest:
- world fact `lumber.school.management-ready`;
- Lumber career facts `management-school-ready` and `forewoman-problem-resolved`;
- ending `ending.lumber.forewoman`.

Forest content must not reuse those facts as Forest result facts.

Current planning docs mention possible future School Arcana / Hunter route facts, but current production Activity options on this baseline are only:
- Logging Road;
- Old Boundary.

C3-04/C3-05 must not invent Hunter Trail, Arcana gate IDs, new challenge families, or new Activity result vocabulary without a current production identity or explicit Lead/Product decision.

## 9. Current content-authoring seams

Safe content-side seams already present:
- Activity label and existing route label/help localization;
- existing Forest result event title/variant/choice localization;
- existing result/reaction accessibility localization;
- content variants attached to existing event/result identities, if schema/runtime already supports them and no gameplay condition is changed;
- handoff text describing the existing Forest -> Lumber continuation.

Shared-runtime / integration-owned seams:
- Activity option/result mechanics;
- Activity state;
- result effect application;
- resolver dispatch;
- career fact writes;
- ending eligibility;
- Save/RNG;
- presentation routing helpers.

## 10. C3-03 conclusion

Current main already has a usable Forest/Lumber identity chain. Chat 3 does not need a new Activity architecture for upcoming content work.

The exact existing backbone is:
- Activity `lumber.forest`;
- routes `logging-road` and `old-boundary`;
- three terminal results `success / escape / failure`;
- bilingual Forest result reaction events;
- success-only Lumber continuation `lumber-cross.activity-forest-return`;
- world-to-career fact handoff;
- existing Forest ending `ending.lumber.forest`;
- separate Hard Work and Forewoman ending families.

C3-04 and C3-05 can therefore focus on RU/EN player-facing content attached to these existing identities without changing mechanics.
