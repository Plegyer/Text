# Post-PR58 Night / Forest Handoff v11

Status: selective-integration handoff for queue items 269–279.

Worker branch:
`chat3/lumber-production-proof-next`.

Current-main baseline:
`52ddc76148e33836d3161b63bf4c25ffb5c39d02`.

Never merge the full Chat 3 branch wholesale.

# SHARED_NIGHT_UI_READY

Files:
- `docs/poverty-prep/SHARED_NIGHT_LODGING_POST_PR58_REBASE_V8.md`;
- `prior-work/astra/prototype-m3.2/content/poverty-shared-ui-localization-v6.fixture.json`;
- `prior-work/astra/prototype-m3.2/content/shared-night-lodging-consumer-map-v3.fixture.json`;
- `prior-work/astra/prototype-m3.2/content/shared-night-lodging-ui-invariance-v2.fixture.json`.

Post-PR58 result:
- 17 prior Night/lodging keys are already shipped exact-identical;
- 3 prior `ui.night.panel.*` keys are superseded by active global-shell `ui.sleep.*`;
- additive delta now contains **0 keys**;
- active UI already consumes the shipped Night/lodging strings.

Representative natural paths preserve exact:
- normal lodging cost/housing/Energy;
- cheap lodging cost/housing/Energy;
- street cost/housing/Energy/Grooming;
- `night.sleep` identity/effects;
- result -> choose lodging bridge.

No shared Night localization patch remains to apply.

# ROUTE_PRESENTATION_READY

Files:
- `docs/lumber-prep/POST_PR58_NIGHT_FOREST_BASELINE_V11.md`;
- `prior-work/astra/prototype-m3.2/content/forest-route-presentation-post-pr58-v7.fixture.json`;
- `prior-work/astra/prototype-m3.2/tests/forest-route-presentation-seam-v5.test.ts`.

Post-PR58 rebase:
- current route choice labels: **2 IDENTICAL/reuse**;
- route-specific title/body/help/alt/caption: **10 ADDITIVE**;
- conflicts: **0**.

Exact semantic mapping remains:
- no selected route -> `activity/forest/route/default`;
- `logging-road` -> `activity/forest/route/logging-road`;
- `old-boundary` -> `activity/forest/route/old-boundary`.

The shared Lead-owned route-state -> presentationId seam is still required.

The regression source validates the expected transition and locked result/Hard Work invariants. It was authored, not executed by this handoff.

# JOURNAL_RENDER_VERIFIED

Files:
- `docs/poverty-prep/POVERTY_JOURNAL_LOCALIZED_RENDER_VERIFICATION_V2.md`;
- `docs/lumber-prep/FOREST_JOURNAL_LOCALIZED_RENDER_VERIFICATION_V2.md`.

Merged stable-ref behavior is now shipped:
- event-choice ref = `eventId + choiceId`;
- Journal localizes choice text at render time;
- lastAction localizes event title + choice text at render time;
- raw saved text remains fallback.

Verified coverage:
- all 24 current ordinary-poverty resolved choices;
- all 3 Forest result/reaction resolved choices.

Locale switching must not replay effects, mutate Save, advance RNG or change result identity.

# VISUAL_SOURCE_ONLY

File:
`docs/lumber-prep/OLD_BOUNDARY_SAFE_VISUAL_SOURCE_BRIEF_V3.md`.

Safe old-boundary visual semantics:
- old stones;
- weathered marks;
- path/boundary line;
- ordinary forest.

Reject:
- gate/arch/checkpoint;
- token operation;
- Hunter ownership;
- reward/challenge;
- magic/deeper-lore implication.

Until a route-specific source passes review:
use shipped neutral
`activity/forest/route/default`
visual fallback.

# PRODUCT_OPEN

Still unresolved and not authored here:
- Hunter production route;
- Old Boundary Token acquisition/use;
- Forest challenge mechanics/rewards;
- School Arcana authority;
- seasonal mechanical topology;
- deeper Forest lore.

# Remaining player-language debt

File:
`docs/lumber-prep/NIGHT_FOREST_HARDCODED_PLAYER_LANGUAGE_DEBT_AUDIT_V1.md`.

Remaining current visible runtime-value debt:
1. raw generic `night.phase` in fallback Night screen;
2. raw Forest `routeId` value;
3. raw Forest checkpoint value.

These are shared presentation-consumer issues, not missing content IDs.

# Exact Forest invariants

Routes:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

Old-boundary gate:
`itemCapability(enter_old_boundary) present=true`.

Results:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

Lumber Hard Work:
- ONLY `completed_shifts >= 50`;
- reward `hardWork:lumber`.

# Selective-copy guidance

## Group A — Night audit/invariance
Copy:
- `SHARED_NIGHT_LODGING_POST_PR58_REBASE_V8.md`;
- `poverty-shared-ui-localization-v6.fixture.json`;
- `shared-night-lodging-consumer-map-v3.fixture.json`;
- `shared-night-lodging-ui-invariance-v2.fixture.json`.

No localization values need applying because item 271 is a zero-key delta.

## Group B — Forest route seam
Copy:
- `POST_PR58_NIGHT_FOREST_BASELINE_V11.md`;
- `forest-route-presentation-post-pr58-v7.fixture.json`;
- `forest-route-presentation-seam-v5.test.ts`.

Apply only the 10 additive route presentation keys and implement the pure route-state seam.

## Group C — Journal verification
Copy:
- `POVERTY_JOURNAL_LOCALIZED_RENDER_VERIFICATION_V2.md`;
- `FOREST_JOURNAL_LOCALIZED_RENDER_VERIFICATION_V2.md`.

## Group D — visual semantics
Copy:
- `OLD_BOUNDARY_SAFE_VISUAL_SOURCE_BRIEF_V3.md`.

## Group E — remaining player-language debt
Copy:
- `NIGHT_FOREST_HARDCODED_PLAYER_LANGUAGE_DEBT_AUDIT_V1.md`.

# Handoff conclusion

Items 269–279 consolidate to:
- **SHARED_NIGHT_UI_READY** — localization already shipped, zero additive delta;
- **ROUTE_PRESENTATION_READY** — 10 additive route presentation keys plus seam regression source;
- **JOURNAL_RENDER_VERIFIED** — ordinary poverty + Forest stable-ref rendering covered;
- **VISUAL_SOURCE_ONLY** — old-boundary visual semantics bounded;
- **PRODUCT_OPEN** — unresolved mechanics/lore remain isolated.
