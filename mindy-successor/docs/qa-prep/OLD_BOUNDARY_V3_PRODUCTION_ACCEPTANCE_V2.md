# Old Boundary v3 production acceptance v2

Status: COMPLETE / GREEN_SELECTIVE_SOURCE / NOT_ROOT_LOADED

Current production main:
`54131488c65302f81b3001abaaa345d21f0281e2`
(post-PR59).

Reviewed Chat 2 items:
`317–319`
on `chat2/presentation-replacement-next`.

Worker head when the three artifacts were available:
`229d01b3cb3ba703730a310122d3602fd0dbc79e`.

## Activation candidate

File:
`content/presentation-drafts/old-boundary-v3-current-main-activation-v1.json`.

Blob:
`432df4cd195252fe76f6bb48268b9ccd7eef32a7`.

Status declared by source:
`POST_PR59_PRESENTATION_ONLY_NOT_ROOT_LOADED`.

Exact semantic presentation ID:
`activity/forest/route/old-boundary`.

Static source:
`assets/presentation/forest-route-old-boundary-v3.svg`.

Fallback:
`activity/forest/route/default`.

Candidate invariants:
- presentation-only;
- no gameplay fields;
- no runtime change required;
- locale-neutral media identity;
- neutral fallback retained.

## Physical SVG

Worker asset:
`forest-route-old-boundary-v3.svg`.

Blob:
`97c38b2f08073b2e833289d2ca31fc29841ec4a3`.

Observed safe semantics:
- narrow old path;
- low/weathered boundary stones;
- weathered marks;
- moss/vegetation;
- no constructed gate/crossbar.

Technical checks:
- local SVG;
- viewBox `0 0 1200 675`;
- exact data presentation ID:
  `activity/forest/route/old-boundary`;
- no script;
- no external HTTP(S)/protocol-relative/data resource;
- no gameplay metadata.

## Product-open firewall

The asset and candidate do not depict or encode:
- Hunter ownership;
- token/key use;
- gate/arch/barrier;
- challenge;
- reward;
- result/success/failure;
- magic activation;
- hidden destination.

This is materially safer than the superseded gate-like old-boundary source.

## Accessibility delta

File:
`content/old-boundary-v3-accessibility-v1.fixture.json`.

Blob:
`c39c466b9a8d6999e1b144a2b7e4cf350e8e3809`.

Keys:
- `presentation.activity.forest.route.old-boundary.alt`;
- `presentation.activity.forest.route.old-boundary.caption`.

Both have complete:
- RU;
- EN.

Copy remains limited to:
- old boundary line;
- moss-covered stones;
- weathered marks;
- path distinct from the newer logging road.

No Product-open lore is added.

## Current-main collision state

PR59 already ships the exact same old-boundary alt/caption keys and values in root localization.

Therefore future old-boundary media activation should:
- reuse the shipped root keys;
- not create duplicate/alternate accessibility keys.

Current root presentation after PR59 still has:
- no explicit old-boundary static override.

That is the intended no-collision activation point.

## Activation regression source

File:
`tests/old-boundary-v3-current-main-activation-v1.test.ts`.

Blob:
`92724086a12174a7f1ce188191ab22fc54afdb9d`.

It validates:
- post-PR59 root has neutral default and no old-boundary root slot collision;
- exact current semantic ID;
- local project-owned SVG;
- recursive build-copy path;
- locale-neutral media identity;
- exact accessibility-key equality with current root;
- neutral fallback retained;
- forbidden Product-open semantics absent;
- gameplay fields absent.

## Build-copy acceptance

Current production build recursively copies:
`assets -> dist/assets`.

After selective integration, required exact-head check:
- source exists at the reviewed path;
- `dist/assets/presentation/forest-route-old-boundary-v3.svg` exists after build;
- source/dist bytes are identical.

Do not claim build distribution from the worker source alone; verify on the actual Lead integration head.

## Route-state/gameplay invariants

Activation must not change:
- persisted routeId `old-boundary`;
- gate `itemCapability(enter_old_boundary) present=true`;
- route option ID;
- progress/endurance;
- Forest results;
- activityResult reactions;
- Save;
- RNG;
- Lumber Hard Work.

Physical media availability is presentation-only.

## Required production activation

Fresh current-main Lead branch.

Selective copy only:
1. reviewed v3 SVG;
2. exact old-boundary root static slot override;
3. reuse existing PR59 alt/caption keys;
4. keep fallbackId to route/default;
5. add/port the activation regression.

Then require:
- typecheck/validate/build/tests;
- route RU↔EN media-identity/Save/RNG invariance;
- source/dist byte equality;
- exact-head CI;
- post-merge main CI.

## Verdict

`GREEN_SELECTIVE_SOURCE / NOT_ROOT_LOADED`.

Old Boundary v3 is safe for selective production activation.

It does not authorize Hunter/token/challenge/reward or any other Product-open Forest mechanics.
