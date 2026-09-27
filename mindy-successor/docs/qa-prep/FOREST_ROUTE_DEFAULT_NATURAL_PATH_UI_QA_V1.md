# Forest route/default natural-path UI QA v1

Status: COMPLETE / GREEN_NATURAL_PATH

Current main:
`f93878b954385a1c61d8a06a0673354207d11d70`.

## Natural UI path

Production regression exercises the real renderer path:

1. start a valid current life;
2. open Explore;
3. use `data-enter-activity="lumber.forest"`;
4. wait for current Forest route choices;
5. observe the active Activity scene before selecting a route.

At that point:
- Activity ID = `lumber.forest`;
- current route state = `null`;
- presentation request = `activity/forest/route/default`;
- selected media = `assets/presentation/forest-route-default-v1.svg`.

This is the correct neutral pre-route-choice surface.

## RU presentation

The image src ends in:
`assets/presentation/forest-route-default-v1.svg`.

RU alt resolves from:
`presentation.static.forest.route.default.alt`.

It describes a neutral forest trail without choosing a route or result.

## Locale switch

The regression snapshots serialized Save before changing locale.

Then:
- opens menu;
- switches RU -> EN;
- does not dispatch an Activity action;
- closes menu;
- re-renders the same Activity scene.

Required and observed:
- serialized Save byte string is unchanged;
- image src is unchanged;
- EN alt resolves to the paired translation;
- Activity envelope is deep-equal.

## Activity envelope invariance

The deep-equal Activity envelope protects:
- `activityId`;
- checkpoint;
- route state;
- progress;
- endurance;
- resolved option IDs;
- Activity-owned RNG state present in the envelope.

Additionally, full serialized Save equality protects the global run RNG and every other gameplay-owned field.

## Route state

Before route choice:
`routeId = null`.

Locale switching does not:
- choose logging-road;
- choose old-boundary;
- grant `enter_old_boundary`;
- change available route identity;
- consume an Activity action.

## Static selection

Animations enabled/disabled both resolve the same generic static source.

Locale is not a media-selection input.

No gameplay RNG is used to select this static fallback.

## Result/Hard Work isolation

This natural-path presentation occurs before route choice and result resolution.

It does not alter:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`;
- exact activityResult reactions;
- Lumber Hard Work eligibility;
- reward `hardWork:lumber`.

## Evidence

PR50 exact-head:
- run #81;
- 320/320 pass.

Post-merge current main:
- run #82;
- 320/320 pass.

Renderer subtest:
`renderer: neutral Forest route static fallback preserves save across RU EN`
PASS on both.

## Verdict

`GREEN_NATURAL_PATH`.

The natural Explore -> `lumber.forest` path displays the generic project-owned route/default fallback, and RU↔EN changes presentation text only.
