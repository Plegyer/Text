# Forest route altKey normalization QA v1

Status: COMPLETE / NORMALIZATION_REQUIRED

Current main:
`4270bbc0d4d1117e1474a5ab9d9380dc350b0d1c`.

Shipped presentation altKey schema from PR47:
`^[a-z0-9][a-z0-9._-]*$`.

Slash characters are not allowed inside `altKey`.

## Chat 3 source issue

Current Chat 3 route-media fixture uses keys:
- `presentation.activity/forest/route/logging-road.alt`;
- `presentation.activity/forest/route/logging-road.caption`;
- `presentation.activity/forest/route/old-boundary.alt`;
- `presentation.activity/forest/route/old-boundary.caption`.

These keys are locale-neutral, but they contain `/` and cannot be assigned to PR47's `altKey` field.

## Required normalized keys

Use:

- `presentation.activity.forest.route.logging-road.alt`
- `presentation.activity.forest.route.logging-road.caption`
- `presentation.activity.forest.route.old-boundary.alt`
- `presentation.activity.forest.route.old-boundary.caption`

These names:
- satisfy the shipped regex;
- remain locale-neutral;
- retain the same semantic meaning;
- do not collide with gameplay IDs.

## Presentation IDs must NOT be normalized this way

Keep proposed semantic presentation IDs with slash path form:

- `activity/forest/route/logging-road`
- `activity/forest/route/old-boundary`

The schema restriction applies to localization `altKey`, not to `presentationId`.

Do not rename:
- gameplay route ID;
- route state;
- presentation semantic ID.

## Text parity

Normalization is key-name-only.

RU and EN alt/caption values must be copied exactly from the reviewed Chat 3 route-media source unless a separate copy review changes both locales.

Meaning must remain:
- logging road: worked/logging-road visual context;
- old boundary: old stones/markers visual context;
- no result/reward claim;
- no Hunter/token mechanics.

## Collision rule

Before integration:
- normalized key must be absent, or exact-identical if already present;
- conflicting ownership is blocking;
- no slash-form key should be root-loaded as an altKey alias.

Do not keep both slash and normalized versions in production unless an explicit migration requires it; that would create duplicate localization ownership.

## Product firewall

Normalization must not add:
- route availability;
- route condition;
- token acquisition/consume semantics;
- Hunter route;
- challenge threshold/reward;
- new Forest result.

## Verdict

`NORMALIZATION_REQUIRED_BEFORE_ALTKEY_INTEGRATION`.

Only localization key names change. Gameplay and presentation semantic identities remain exact.
