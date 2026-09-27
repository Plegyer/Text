# Forest / Poverty Selective Integration Acceptance v1

Status: Lead acceptance packet for the post-PR48 Chat 3 integration slices.

Current-main baseline:
`4270bbc0d4d1117e1474a5ab9d9380dc350b0d1c`.

Worker branch:
`chat3/lumber-production-proof-next`.

Never merge the whole worker branch. Use selective copy/application on a fresh branch from current `main`.

# May ship independently

## A. 33-key ordinary-poverty text patch

Primary delta:
`prior-work/astra/prototype-m3.2/content/poverty-copyedit-post-pr48-v4.fixture.json`.

Acceptance requirements:
- apply exactly the 33 `strings` entries;
- every key already exists in root localization;
- no key addition, deletion or rename;
- no static-media key;
- no Secret Debt key;
- no gameplay pack edit.

Supporting files:
- `docs/poverty-prep/POST_PR48_POVERTY_TEXT_REBASE_AUDIT_V2.md`;
- `prior-work/astra/prototype-m3.2/content/poverty-copyedit-natural-path-v2.fixture.json`;
- prior regression `tests/poverty-copyedit-final-delta-v2.test.ts`.

PASS when:
- all 33 replacements are present exactly in RU+EN;
- six poverty pack IDs are unchanged;
- all 14 event IDs are unchanged;
- current event/variant/choice natural paths still expose the same content;
- event conditions/effects remain byte/structurally unchanged;
- no RNG/NightFlow/housing/Save change occurs.

This patch does **not** require the Forest route seam.

## B. 20-key shared Night/lodging localization source

Primary source:
`prior-work/astra/prototype-m3.2/content/poverty-shared-ui-localization-v3.fixture.json`.

Collision/readiness:
- 20 ADDITIVE;
- 0 CONFLICT;
- existing shared keys are reused rather than duplicated.

Supporting files:
- `docs/poverty-prep/SHARED_NIGHT_LODGING_POST_PR47_KEY_COLLISION_AUDIT_V1.md`;
- `docs/poverty-prep/SHARED_NIGHT_LODGING_UI_CONSUMER_MAP_V3.md`;
- `docs/poverty-prep/SHARED_NIGHT_LODGING_POST_PR48_CONSUMER_READINESS_V4.md`.

The localization entries may be added independently, but 19 of them are not user-visible until Lead wires their current hardcoded consumer seams.

`nightChoice.night.sleep.label` already has a generic lookup seam.

PASS when:
- all 20 keys exist with final RU+EN text;
- no School or Foreman key is overwritten;
- NightFlow IDs, lodging IDs and housing values are unchanged.

This slice does **not** require the Forest route seam.

# Requires shared UI consumption

## C. Night/lodging text visibility

Lead-owned `src/ui/app.ts` changes are required to consume:
- LodgingResolution shell;
- lodging labels;
- next-day Energy formatter;
- VoluntaryNightChoice shell;
- generic Night fallback title;
- Night panel;
- result-to-lodging bridge;
- town lodging summary;
- housing labels.

Acceptance firewall:
- presentation only;
- no command change;
- no cost change;
- no Energy delta change;
- no Night phase change;
- no Save change.

# Requires Forest route presentation seam

## D. Route presentationId mapping

Exact desired mapping after authoritative route selection:

`logging-road`
-> `activity/forest/route/logging-road`.

`old-boundary`
-> `activity/forest/route/old-boundary`.

Current gameplay IDs remain:
- `forest.route.logging-road`;
- `forest.route.old-boundary`.

Current old-boundary gate remains:
`itemCapability(enter_old_boundary) present=true`.

Primary final route source:
`prior-work/astra/prototype-m3.2/content/forest-route-presentation-final-v4.fixture.json`.

Supporting invariance source:
- `prior-work/astra/prototype-m3.2/content/forest-route-presentation-natural-path-v1.fixture.json`;
- `prior-work/astra/prototype-m3.2/content/forest-route-locale-invariance-v1.fixture.json`;
- `docs/lumber-prep/FOREST_ROUTE_RESULT_CONTINUATION_INVARIANT_MATRIX_V2.md`;
- `docs/lumber-prep/FOREST_ROUTE_PRESENTATION_ACCEPTANCE_CHECKLIST_V2.md`.

PASS only if the presentation lookup:
- occurs after route gameplay selection;
- writes no gameplay Save field;
- advances neither global nor Activity RNG;
- changes no route availability;
- changes no progress/endurance;
- changes no result ID;
- survives reload without altering Activity state.

## E. Normalized route alt/caption localization

Primary normalized source:
`prior-work/astra/prototype-m3.2/content/forest-route-media-localization-normalized-v1.fixture.json`.

Collision guard:
`prior-work/astra/prototype-m3.2/tests/forest-route-media-localization-normalized-v1.test.ts`.

Normalized keys:
- `presentation.activity.forest.route.logging-road.alt`;
- `presentation.activity.forest.route.logging-road.caption`;
- `presentation.activity.forest.route.old-boundary.alt`;
- `presentation.activity.forest.route.old-boundary.caption`.

Key requirements:
- lowercase;
- only dots/underscores/hyphens;
- no slash characters;
- complete RU+EN;
- no root collision.

These localization keys may be added before the route seam, but they become useful only when the semantic route presentation IDs are consumed.

# Route asset source is not automatically accepted for activation

Audit:
`docs/lumber-prep/FOREST_ROUTE_STATIC_SOURCE_COMPATIBILITY_AUDIT_V1.md`.

Chat 2 source branch candidates:
- neutral default SVG: visually safe if seam/slot ships;
- logging-road SVG: visually safe if seam ships;
- old-boundary SVG: too specific; generic fallback recommended.

Acceptance packet does not activate or copy route assets automatically.

If Lead activates media:
- use project-owned static source only after separate review;
- do not let media selection affect gameplay;
- old-boundary candidate must not imply a gate/token/checkpoint/lore fact absent from Product authority.

# Exact result-continuation acceptance

For either shipped route:

success:
`activityResult(lumber.forest, success, lumber.forest.success)`.

escape:
`activityResult(lumber.forest, escape, lumber.forest.escape)`.

failure:
`activityResult(lumber.forest, failure, lumber.forest.failure)`.

Exact result IDs remain:
- `lumber.forest.success`;
- `lumber.forest.escape`;
- `lumber.forest.failure`.

No route-specific result namespace is accepted.

# Lumber Hard Work acceptance

Must remain exactly:
- condition: `completed_shifts >= 50` only;
- reward: `hardWork:lumber`.

Reject any integration that adds:
- Forest route prerequisite;
- token prerequisite;
- School prerequisite;
- relationship prerequisite;
- challenge prerequisite.

# Ownership acceptance

Audit:
`docs/lumber-prep/POVERTY_FOREST_LOCALIZATION_OWNERSHIP_COLLISION_AUDIT_V1.md`.

PASS only if integration does not overwrite:
- School-owned keys;
- Foreman-owned keys;
- PR47/48 `presentation.static.*` keys.

The only intended current-root text overwrites are the 33 ordinary-poverty same-domain replacements.

# Recommended Lead integration order

1. fresh branch from current `main`;
2. apply the 33-key poverty text patch;
3. add 20 shared Night/lodging localization keys;
4. run poverty/localization checks;
5. wire shared Night/lodging UI consumers;
6. add normalized Forest route presentation localization;
7. implement route-state -> presentationId seam;
8. run route Save/RNG/reload/result invariance tests;
9. review/activate any route static asset separately;
10. run full check and exact-head CI.

# Independent vs seam-dependent summary

May ship without Forest route seam:
- 33-key poverty copyedit;
- 20-key shared Night/lodging localization data;
- shared Night/lodging UI wiring.

Requires Forest route seam to become active route presentation:
- route scene text consumption;
- route help copy consumption;
- normalized route alt/caption consumption;
- route-specific static/GIF media.

Still Product-open:
- Hunter route;
- Old Boundary Token acquisition/use;
- challenge mechanics;
- School Arcana provider;
- seasonal mechanical topology;
- deeper lore outcomes.
