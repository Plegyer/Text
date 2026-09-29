# C2-01 — Current Lumber presentation inventory

Status: CHAT 2 WORKING INVENTORY
Owner: Chat 2 / Presentation & Media
Base: `main@921abfa79f4dba9c0acee4eca6724c3ed122d42f`
Scope: inventory only; no gameplay/runtime/media asset changes

## Authority and build truth

Current desktop build assembles:
- `content/definitions.json`;
- only root `content/packs/*.json` files;
- `content/presentation.json`.

Therefore nested `content/packs/lumber-target/*.pack.json` files are fixture/reference material and are **not** production pack inputs. Their `assets/lumber/*.gif` references are not active production media bindings.

Merged PR #64 / queue 352–363 is already part of project history and is not restarted here. Its current animation-source manifest contains Merchant/Hunter/Artist-Geisha source sequences only; it contributes no Lumber/Foreman/Forest animation source.

Classification used below:
- `PRESENT_AND_ACTIVE` — current runtime semantic slot resolves at its own slot through active catalog media and/or a production `presentation.json` override.
- `FALLBACK_ONLY` — current runtime semantic slot has no own usable media and reaches media only through its fallback chain.
- `MISSING` — current runtime semantic slot has neither own media nor a usable fallback.
- `STALE` — historical/fixture/draft mapping is not the current runtime identity or is not emitted by current production flow.
- `DUPLICATE` — more than one active producer maps to the same semantic presentation ID.
- `BLOCKED_BY_GAMEPLAY_ID` — presentation idea has no current production action/event/stage/route identity that can emit it.

## Active Lumber action IDs

### `lumber` — legacy active action

Current scene presentation IDs:
- `job/lumber/shift/spring/default` — `DUPLICATE`; also emitted by `lumber.shift`. Production override: `assets/presentation/career-lumber-shift-spring.svg`.
- `job/lumber/shift/summer/default` — `DUPLICATE`; also emitted by `lumber.shift`. Production override: `assets/presentation/career-lumber-shift-summer.svg`.
- `job/lumber/shift/autumn/default` — `DUPLICATE`; also emitted by `lumber.shift`. Production override: `assets/presentation/career-lumber-shift-autumn.svg`.
- `job/lumber/shift/winter/default` — `DUPLICATE`; also emitted by `lumber.shift`. Production override: `assets/presentation/career-lumber-shift-winter.svg`.
- `job/lumber/shift/default` — `PRESENT_AND_ACTIVE`; catalog media `stage.lumber -> assets/stage-lumber.svg`; fallback `location/town/default`.

Legacy result presentation IDs:
- `job/lumber/result/spring`, `job/lumber/result/summer`, `job/lumber/result/autumn`, `job/lumber/result/winter` — `PRESENT_AND_ACTIVE`; catalog stage media, then fallback to the matching shift slot.
- `job/lumber/result/default` — `DUPLICATE`; shared with every `lumber.shift` result and legacy default result. Production override: `assets/presentation/career-lumber-result.svg`.

### `lumber.shift` — current typed Lumber production action

Scene presentation IDs:
- `job/lumber/shift/spring/default`
- `job/lumber/shift/summer/default`
- `job/lumber/shift/autumn/default`
- `job/lumber/shift/winter/default`

All four are `DUPLICATE` because the legacy `lumber` action generates the same semantic IDs. The production override layer currently makes each one display a dedicated project-owned seasonal SVG.

All `lumber.shift` scenes resolve their result to:
- `job/lumber/result/default` — `DUPLICATE`, dedicated static `assets/presentation/career-lumber-result.svg`.

No active Lumber shift slot has a GIF/video primary or pool.

## Active Lumber-triggered / Lumber-domain event IDs

| Event ID | Current semantic presentation ID(s) | Current media/fallback | Coverage |
| --- | --- | --- | --- |
| `lumber.career-first-shift` | `job/lumber/event/lumber-career-first-shift/default` | catalog media `job.lumber.event.accepted-hand -> assets/stage-lumber.svg`; fallback town | `PRESENT_AND_ACTIVE` |
| `lumber.foreman-notice` | `relationship/lumber-foreman/lumber-foreman-notice/default` | dedicated static `assets/presentation/foreman-professional-milestone-v2.svg` | `PRESENT_AND_ACTIVE` |
| `lumber-cross.school-management-return` | `job/lumber/event/lumber-cross-school-management-return/default` | no event media; fallback `location/town/default` | `FALLBACK_ONLY` |
| `lumber-cross.activity-forest-return` | `job/lumber/event/lumber-cross-activity-forest-return/default` | catalog media `job.lumber.event.forest-return -> assets/stage-forest.svg` | `PRESENT_AND_ACTIVE` |
| `lumber-night.foreman-professional` | `relationship/lumber-foreman/lumber-night-foreman-professional/default` | dedicated static `assets/presentation/foreman-night-voluntary-v2.svg` | `PRESENT_AND_ACTIVE` |
| `forest-result-content-v1.success` | `job/lumber/event/forest-result-content-v1-success/default` | dedicated static `assets/presentation/forest-reaction-success-v2.svg` | `PRESENT_AND_ACTIVE` |
| `forest-result-content-v1.escape` | `job/lumber/event/forest-result-content-v1-escape/default` | dedicated static `assets/presentation/forest-reaction-escape-v2.svg` | `PRESENT_AND_ACTIVE` |
| `forest-result-content-v1.failure` | `job/lumber/event/forest-result-content-v1-failure/default` | dedicated static `assets/presentation/forest-reaction-failure-v2.svg` | `PRESENT_AND_ACTIVE` |
| `gopher.woods-intro` | `location/town/event/gopher-woods-intro/default` | catalog media `gopher.woods-intro.default -> assets/stage-lumber.svg` | `PRESENT_AND_ACTIVE` |
| `stage.goblin` | `location/town/event/stage-goblin/curious`, `.../default` | catalog media `stage.goblin -> assets/stage-goblin.svg` | `PRESENT_AND_ACTIVE` |
| `ds-lumber.first` | `location/town/event/ds-lumber-first/{summer,winter,default}` | no variant media; fallback town | `FALLBACK_ONLY` |
| `ds-lumber.second` | `location/town/event/ds-lumber-second/{summer,winter,default}` | no variant media; fallback town | `FALLBACK_ONLY` |
| `ds-lumber.done` | `location/town/event/ds-lumber-done/{summer,winter,default}` | no variant media; fallback town | `FALLBACK_ONLY` |

The legacy `ds-lumber.*`, `gopher.woods-intro`, and `stage.goblin` events remain active because their trigger is the legacy action `lumber`. They are not typed Lumber career milestones and must not be treated as authority for new career progression.

## Foreman relationship/night identities

Active gameplay identities consumed by presentation:
- relationship: `lumber.foreman`;
- current stages: `unknown -> professional -> route-professional`;
- opening event: `lumber.foreman-notice`;
- night choice: `lumber.foreman.night`;
- night event: `lumber-night.foreman-professional`.

Current dedicated player-facing static presentation:
- `relationship/lumber-foreman/lumber-foreman-notice/default` -> `foreman-professional-milestone-v2.svg`;
- `relationship/lumber-foreman/lumber-night-foreman-professional/default` -> `foreman-night-voluntary-v2.svg`.

Project-owned files `foreman-professional.svg` and `foreman-night-professional.svg` still exist but are not bound by current production `presentation.json`.

## Forest/Lumber Activity presentation

Active Activity identity: `lumber.forest`.
Active result IDs: `lumber.forest.success`, `lumber.forest.escape`, `lumber.forest.failure`.

Route slots:
- `activity/forest/route/default` — `DUPLICATE`; generated both by legacy `forest-search` action and `lumber.forest` Activity route fallback. Dedicated static `assets/presentation/forest-route-default-v1.svg`.
- `activity/forest/route/logging-road` — `PRESENT_AND_ACTIVE`; dedicated static `assets/presentation/forest-route-logging-road.svg`; fallback route/default.
- `activity/forest/route/old-boundary` — `PRESENT_AND_ACTIVE`; dedicated static `assets/presentation/forest-route-old-boundary-v3.svg`; fallback route/default.

Result/return resolver slots:
- `activity/forest/return/success` -> `forest-return-success-v2.svg` — `PRESENT_AND_ACTIVE`.
- `activity/forest/return/escape` -> `forest-return-escape-v2.svg` — `PRESENT_AND_ACTIVE`.
- `activity/forest/return/failure` -> `forest-return-failure-v2.svg` — `PRESENT_AND_ACTIVE`.

The return slots are current runtime-known resolver slots generated from active Activity results. The current UI directly renders the route slot while Activity is active and then renders pending reaction-event presentation; no separate direct `mediaHTML(activity/forest/return/*)` call was found in `src/ui/app.ts`. The distinct post-result player-facing reaction visuals are therefore the three `forest-result-content-v1.*` event slots listed above.

## Active Lumber ending IDs

| Gameplay ending ID | Semantic presentation ID | Current presentation | Coverage |
| --- | --- | --- | --- |
| `lumber-stay` | `ending/lumber-stay` | no own media; fallback town | `FALLBACK_ONLY` |
| `ending.lumber.hard-work` | `ending/lumber/hard-work` | no own media; fallback town | `FALLBACK_ONLY` |
| `ending.lumber.forewoman` | `ending/lumber/forewoman` | no own media; fallback town | `FALLBACK_ONLY` |
| `ending.lumber.forest` | `ending/lumber/forest` | no own media; fallback town | `FALLBACK_ONLY` |

No Lumber ending currently has a project-owned dedicated static override, GIF, video, or animation-source sequence.

## Current animation/video source

Current active Lumber/Foreman/Forest animation/video coverage: **none**.

Evidence:
- no Lumber/Foreman/Forest `.gif`, `.webm`, or `.mp4` exists under the production asset tree;
- `project-owned-animation-source-manifest-v4.json` contains only Merchant spring, Hunter autumn, and Artist/Geisha winter sequences;
- all current Lumber/Foreman/Forest production overrides in `presentation.json` are static images;
- nested target fixture references such as `assets/lumber/shift-spring.gif`, `accepted-hand.gif`, `foreman-professional.gif`, `forest-return.gif` and `foreman-night-professional.gif` are not built and no matching asset directory exists.

Those target fixture GIF bindings are `STALE` as production media mappings.

## Stale historical/fixture presentation mappings

These IDs/mappings are not current production identities:

- `job/lumber/event/accepted-hand` — `STALE` presentation-slot draft name; current canonical event semantic ID is `job/lumber/event/lumber-career-first-shift/default`.
- `job/lumber/event/forest-return` — `STALE` presentation-slot draft name; current canonical cross event semantic ID is `job/lumber/event/lumber-cross-activity-forest-return/default`.
- `relationship/lumber-foreman/professional/open` — `STALE`; current canonical opening event semantic ID is `relationship/lumber-foreman/lumber-foreman-notice/default`.
- `activity/forest/result/{success,escape,failure}` — `STALE`; current generated Activity result namespace is `activity/forest/return/{success,escape,failure}`.
- `ending/lumber/forest-compact` — `STALE`; current ending identity is `ending.lumber.forest -> ending/lumber/forest`.
- target-registry fixture IDs `job/lumber/event/foreman-trust/default` and `relationship/foreman/trust/default` — `STALE`; no current matching event/relationship semantic emitter.
- target-registry fixture asset refs (`fixture:lumber-*-gif`, `fixture:lumber-*-static`) are test fixture bindings, not production assets.

## Duplicate current mappings

1. `job/lumber/shift/{spring,summer,autumn,winter}/default`
   - producer A: legacy action `lumber` seasonal scenes;
   - producer B: typed action `lumber.shift` seasonal scenes;
   - runtime intentionally merges base media IDs for duplicate slots.
   - classification: `DUPLICATE`.

2. `job/lumber/result/default`
   - producer A: legacy `lumber` default result;
   - producer B: every typed `lumber.shift` scene result;
   - current dedicated static override hides underlying catalog-media plurality.
   - classification: `DUPLICATE`.

3. `activity/forest/route/default`
   - producer A: legacy `forest-search` default scene;
   - producer B: `lumber.forest` Activity route fallback;
   - current dedicated static override is safe, but the semantic slot has two active producers.
   - classification: `DUPLICATE`.

No gameplay identity is changed by this inventory.

## Missing / blocked presentation slots from the historical Lumber slot catalog

### `BLOCKED_BY_GAMEPLAY_ID`

The following draft slot families have no current production emitter identity and must not be created as gameplay IDs by Chat 2:

- detailed repeatable shift scenes such as `mud-access`, `road-work`, `paired-work`, `felling`, `distant-plot`, `fire-risk`, `sorting`, `logistics`, `tracks`, `frozen-route`, `heavy-cut`, `tool-repair`, `heavy-tool`;
- career milestones `trusted-worker`, `route-veteran`, `route-forewoman`, `route-forest`, `outcome-ready`;
- Foreman `trusted/milestone`, `route/professional`, `route/close`, `route/rival`, `external-result/default`, `resolved`;
- Foreman night `problem-reveal` and historical `general`;
- Forest route `hunter-trail`;
- Forest encounter families `navigation`, `physical-obstacle`, `anomaly`;
- capability-specific Forest presentation hooks `rope-route`, `heavy-wood`, `preserve-specimen`, `old-boundary-token`.

Current Integration inventory PR #71 records approved missing career stage identities `trusted-worker`, `veteran`, `forewoman-ready`, `forest-ready`, and `outcome-ready`, but exact intermediate thresholds and production event/transition emitters are not yet current-main production. Chat 2 must wait for the Integration-owned gameplay/event IDs before creating distinct semantic slots that depend on them.

### `MISSING`

No current known Lumber semantic slot is fully broken: every current runtime-known slot inspected either has own media or reaches a safe fallback. The meaningful gaps are `FALLBACK_ONLY` or `BLOCKED_BY_GAMEPLAY_ID`, not broken-media `MISSING`.

## Player-visible state at C2-01 baseline

Currently the player can actually receive:
- dedicated project-owned seasonal Lumber shift statics;
- dedicated project-owned Lumber result static;
- dedicated Foreman professional milestone static;
- dedicated Foreman professional-night static;
- dedicated logging-road / old-boundary / neutral Forest route statics;
- dedicated Forest result reaction statics for success/escape/failure;
- generic stage images for the first typed career milestone, successful Lumber Forest continuation, gopher Woods intro, and goblin Lumber event;
- town fallback for the School-management Lumber reaction, legacy `ds-lumber.*` events, and all current Lumber endings.

No current Lumber/Foreman/Forest animation or video is displayed.

## C2-01 dependencies handed to Lead

1. Do not invent event/gameplay IDs for the missing milestone, Forewoman, Hunter Trail, encounter, or tool-specific presentation families.
2. Integration must provide current production emitters/IDs for later distinct milestone/Forewoman presentation where required.
3. Existing duplicate semantic producers (`lumber` vs `lumber.shift`, and `forest-search` vs `lumber.forest`) are gameplay/runtime ownership; Chat 2 records them but does not resolve them.
4. C2-02 can proceed independently using the four already-active seasonal Lumber shift IDs.
