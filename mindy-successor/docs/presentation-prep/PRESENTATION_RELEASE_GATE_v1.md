# Presentation Release Gate v1

Current main: `6d5eeee7df82409113327b942d47be5b36ab6866`.

PR22 Activity-option gameplay is shipped. PR23 adds QA evidence only and does not change production runtime/content/UI, so the presentation gate statuses below are unchanged. This checklist evaluates the presentation layer without turning remaining gameplay/content authoring gaps into presentation failures.

Status vocabulary:

- **PASS** — current shipped implementation/evidence is sufficient for this gate;
- **OPEN_ASSET** — optional/final media assets are not yet supplied, but safe fallback exists;
- **OPEN_AUTHORING** — product/content authoring must define the final semantic content before presentation can become more specific;
- **NEEDS_LIVE_EVIDENCE** — contracts/unit/UI fixtures exist, but a release candidate should still exercise the workflow end-to-end.

## Gate table

| Gate | Status | Current evidence / release condition |
| --- | --- | --- |
| Central stage | **PASS** | One logical central stage is shipped; gameplay flow state controls surrounding interaction. Presentation media does not apply mechanics. |
| Semantic IDs | **PASS** | Slash semantic `presentationId` is shipped for action/event/School/Activity/ending surfaces and is independent from media filenames. |
| Fallback safety | **PASS** | Current target Lumber, School, Night, Forest and ending surfaces all terminate in shipped static media or safe semantic fallback. No required slot is future-GIF-only. |
| Save/reload identity | **PASS** | Semantic pending/action presentation identity is compatible with save/reload; PR22 Activity saves persist gameplay option state rather than animation state. |
| Activity option-state compatibility | **PASS** | Legacy `optionModelVersion=0` keeps old behavior; v1 route state persists; current generic `activity/forest/route/default` remains a deterministic safe presentation identity. |
| Animation-off | **PASS** | Shipped resolver/stage/UI tests exercise GIF-primary -> static fallback behavior when animations are disabled. Semantic identity is unchanged. |
| Replacement import/export | **NEEDS_LIVE_EVIDENCE** | Override validation, deterministic ordering, portable payload and migration contracts exist; release candidate should still exercise a real operator import/export/rollback round trip before calling the productized workflow closed. |
| Accessibility metadata | **PASS** | Shipped media carries human-readable alt metadata; branch contract preserves text/static meaning without depending on animation timing. |
| Current asset coverage | **PASS** | Required current target surfaces resolve to existing town/Lumber/School/Forest static assets. |
| Future GIF backlog | **OPEN_ASSET** | Seven optional Lumber/Foreman GIF replacements remain backlog. Every affected slot already has a shipped static fallback. |
| Route/challenge-specific Forest presentation | **OPEN_AUTHORING** | Logging road/Old Boundary now have gameplay route identity, but route-specific exact presentation slots are not required by current runtime. Hunter trail and full challenge/season depth remain content authoring. |
| Release-candidate live visual pass | **NEEDS_LIVE_EVIDENCE** | Automated presentation/UI evidence is strong; final RC should still exercise the central stage, animations-off, missing-primary fallback, Activity option states, endings and rollback in the built app. |

## Central stage — PASS

The central media stage remains singular across:

- ordinary action/result;
- blocking pending scene;
- School result;
- Night context/choice;
- active Activity;
- ending eligibility/commit/completion.

Blocking behavior belongs to gameplay state (`pendingScene`, NightFlow, Activity, ending state), never GIF duration or playback state.

## Semantic IDs — PASS

Current semantic IDs are domain-oriented, including:

- `job/lumber/...`;
- `relationship/lumber-foreman/...`;
- `school/.../lesson/default`;
- `activity/forest/route/default`;
- `activity/forest/return/{success|escape|failure}`;
- `ending/lumber/...`.

A media filename or dotted media ID is not the presentation identity.

## Fallback safety — PASS

Current release does not depend on optional GIF files.

Representative terminals:

- Lumber -> `assets/stage-lumber.svg`;
- School -> `assets/stage-school.svg`;
- Forest -> `assets/stage-forest.svg`;
- town/endings -> `assets/stage-town.svg`.

Invalid fallback graphs/replacement entries must reject before persistence.

## Save/reload identity — PASS

Save/reload must preserve gameplay/domain identity and semantic presentation identity where persisted.

It must not persist:

- GIF frame index;
- elapsed animation time;
- playback timestamp;
- loop count;
- transient preview media state.

PR22 adds Activity `optionModelVersion`, `routeId`, and `resolvedOptionIds` as gameplay option state. Those fields do not make animation state part of the save contract.

## Activity option-state compatibility — PASS

PR22 behavior:

- Forest entry is general;
- logging road is a normal route;
- Old Boundary is capability-gated;
- legacy active Activity saves retain immediate legacy `advance`/`escape`;
- v1 option-aware saves persist route/option identity.

The current generic Forest route presentation remains safe for all active states.

Specific route/challenge presentation families may be layered later with fallback to `activity/forest/route/default`.

## Animation-off — PASS

Current shipped tests exercise:

- animated GIF candidate when enabled;
- static image candidate when disabled;
- same semantic slot identity;
- no GIF timing hooks required for interaction.

## Replacement import/export — NEEDS_LIVE_EVIDENCE

The branch provides:

- portable semantic-keyed payload contract;
- deterministic ordering;
- duplicate rejection;
- unknown/stale slot quarantine/rejection;
- media-path security;
- migration/orphan rules;
- operator workflow and rollback contract.

The shipped presentation runtime also validates override media kind/source pairing.

Before treating external replacement import/export as release-closed, execute a real RC operator round trip:

1. import/choose replacement;
2. preflight;
3. preview;
4. persist;
5. reload;
6. animations-off;
7. rollback;
8. verify gameplay identity unchanged.

## Accessibility metadata — PASS

Current target media has alt metadata. Required meaning must remain available via static/text presentation when animation is unavailable.

No essential state may be communicated only through frame timing, speed, or loop count.

## Current asset coverage — PASS

No current required target surface is missing a static presentation path.

This gate is independent from whether deeper gameplay authoring is complete.

## Future GIF backlog — OPEN_ASSET

Seven optional targets remain:

- four seasonal Lumber shifts;
- accepted-hand milestone;
- Foreman professional;
- Foreman professional Night.

These are polish assets, not release-blocking dependencies.

## Route/challenge-specific Forest presentation — OPEN_AUTHORING

Stable semantic families are prepared for:

- logging road;
- hunter trail;
- old boundary;
- navigation;
- physical obstacle;
- interpretation / ritual anomaly.

Do not invent final event IDs, variants, lore, or asset bindings before content authoring exists.

Current generic Forest route/result slots remain release-safe.

## Final RC live evidence — NEEDS_LIVE_EVIDENCE

Before final presentation sign-off in a built release candidate, manually or automatically exercise:

- central stage across Day/Night/Activity/ending modes;
- animation toggle;
- missing-primary/static fallback;
- legacy Activity save;
- option-aware logging-road and Old Boundary saves;
- ending commit/completion/new-run boundary;
- replacement rollback if the operator workflow is included in the release.

## Release conclusion

The **shipped static-backed presentation runtime is release-ready at the contract/integration level**.

Open items are limited to:

- optional future media assets (**OPEN_ASSET**);
- content-specific Forest presentation specialization that depends on unfinished authoring (**OPEN_AUTHORING**);
- end-to-end RC proof for replacement workflow and final visual behavior (**NEEDS_LIVE_EVIDENCE**).

No shared presentation runtime/schema/UI change is requested by this gate.
