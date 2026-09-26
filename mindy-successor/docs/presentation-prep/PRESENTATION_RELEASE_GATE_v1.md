# Presentation Release Gate v1

Current main: `4931d2a1cdd1526a90ce50fbf0391e135f39b0af` (post-PR24 durable handoff).

Status vocabulary: **PASS / OPEN_ASSET / OPEN_AUTHORING / NEEDS_LIVE_EVIDENCE**.

| Gate | Status | Evidence |
| --- | --- | --- |
| Central stage | **PASS** | One logical stage; gameplay flow state owns blocking. |
| Semantic IDs | **PASS** | Merged PR24 RC set contains 27 deterministic semantic IDs, including `location/town/event/base-school/lesson`. |
| Fallback safety | **PASS** | Lumber, School lesson, School blocking scene, Night/town, Forest and endings all have shipped static-safe paths. |
| Save/reload identity | **PASS** | PR24 one-Save smoke crosses result/pending/School/Night/Activity/ending/New Run boundaries without animation-state persistence. |
| Activity option-state compatibility | **PASS** | Legacy v0 and PR22 v1 route state remain deterministic. |
| Animation-off | **PASS** | Shipped presentation/UI tests resolve static candidates without changing semantic identity. |
| Replacement import/export | **NEEDS_LIVE_EVIDENCE** | Contracts/preflight/rollback exist; a productized external round trip still needs release-candidate operator evidence if included. |
| Accessibility metadata | **PASS** | Current media has alt metadata; meaning does not depend on animation timing. |
| Current asset coverage | **PASS** | Includes `assets/workshop.svg` for the final PR24 School blocking scene. |
| Future GIF backlog | **OPEN_ASSET** | Seven optional GIFs; all have static fallback. |
| Route/challenge-specific Forest presentation | **OPEN_AUTHORING** | Exact variants/assets await final route/challenge content; generic Forest route remains safe. |
| Final live visual pass | **NEEDS_LIVE_EVIDENCE** | PR24 automated one-Save E2E is green, but built-app visual/rollback proof is still separate evidence. |

## PR24 update

Merged PR24 proves the one-Save gameplay path including the real `base.school -> listen` blocking scene and a real 49-not-eligible -> 50th-shift Hard Work boundary. Presentation treats the 49 setup as gameplay-only and adds the School pending-scene semantic boundary to RC evidence.

No shared presentation runtime/schema/UI change is requested by this gate.
