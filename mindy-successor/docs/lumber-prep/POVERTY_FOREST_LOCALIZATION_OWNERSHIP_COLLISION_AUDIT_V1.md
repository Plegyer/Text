# Poverty / Forest Localization Ownership Collision Audit v1

Status: exact current-main ownership audit after PR #47.

Current main:
`7f27caca4e3e711799e9c1f235c4a27adbf31026`.

Purpose:
ensure Chat 3 proposed localization/presentation keys do not duplicate shipped School, Foreman, static-media, or other worker-owned namespaces.

## Audited Chat 3 key sets

### Ordinary-poverty text patch

Source:
`content/poverty-copyedit-post-pr47-v3.fixture.json`.

Count:
**33** keys.

Namespace:
`event.poverty-*`.

Current-main status:
all 33 keys already exist because this is an intentional text-only patch to the shipped ordinary-poverty localization surface.

Classification:
**EXISTING_SAME_DOMAIN_TEXT_PATCH**.

This is not ownership duplication with School, Foreman, or static-media namespaces.

### Shared Night/lodging UI

Source:
`content/poverty-shared-ui-localization-v3.fixture.json`.

Count:
**20** keys.

Namespaces:
- `ui.night.*`;
- `ui.result.chooseLodging`;
- `ui.town.lodgingToday`;
- `lodging.*`;
- `housing.*`;
- `nightChoice.night.sleep.label`.

Current-main exact collisions:
**0**.

Classification:
**ADDITIVE_SHARED_UI_SOURCE**.

These keys are distinct from School Night Study and Foreman Night ownership.

### Forest route localized text/media

Source:
`content/forest-route-localization-final-v3.fixture.json`.

Count:
**14** keys.

Namespaces:
- `forestRouteScene.forest.route.logging-road.*`;
- `forestRouteScene.forest.route.old-boundary.*`;
- `presentation.activity/forest/route/logging-road.*`;
- `presentation.activity/forest/route/old-boundary.*`.

Current-main exact collisions:
**0**.

Classification:
**ADDITIVE_FOREST_ROUTE_PRESENTATION_SOURCE**.

These keys are distinct from PR47 static Forest result-media keys.

## Shipped School namespace boundary

Current root localization includes School-owned keys such as:
- `ui.school.*`;
- `school.course.*`;
- `ui.school.nightStudyChoice`;
- `ui.school.lessonResult`;
- School Night Study presentation consumed through shared School helpers.

Chat 3 proposed exact collisions with these School keys:
**0**.

The generic shared Night keys do not replace:
- `ui.school.nightStudyContext`;
- `ui.school.nightStudyButton`;
- `ui.school.nightStudyChoice`.

No duplicate ownership with the shipped School slice.

## Shipped Foreman namespace boundary

Current root localization includes:
- `event.lumber.foreman-notice.*`;
- `nightChoice.lumber.foreman.night.label`;
- `event.lumber-night.foreman-professional.*`;
- `media.relationship.lumber.foreman.*`;
- `presentation.static.foreman.*`.

Chat 3 proposed exact collisions with these Foreman keys:
**0**.

The shared Night fixture does not define
`nightChoice.lumber.foreman.night.label`.

No duplicate ownership with the shipped Foreman slice.

## PR47 static-media namespace boundary

PR47 root localization now owns a broad:
`presentation.static.*`
namespace.

Relevant shipped groups include:
- `presentation.static.school.*`;
- `presentation.static.poverty.*`;
- `presentation.static.forest.result.*`;
- `presentation.static.foreman.*`;
- `presentation.static.career.*`.

Chat 3 route-media keys deliberately use:
- `presentation.activity/forest/route/logging-road.alt`;
- `presentation.activity/forest/route/logging-road.caption`;
- `presentation.activity/forest/route/old-boundary.alt`;
- `presentation.activity/forest/route/old-boundary.caption`.

Exact collisions with `presentation.static.*`:
**0**.

This keeps project-owned static-media localization separate from future route semantic media localization.

## Poverty static-media boundary

PR47 now owns static poverty presentation keys:
- `presentation.static.poverty.street.*`;
- `presentation.static.poverty.cheap-lodging.*`;
- `presentation.static.poverty.recovery-help.*`;
- `presentation.static.poverty.pressure.*`.

The final post-PR47 poverty copyedit contains no media-alt keys.

Earlier proposed shared `media.stage.outside.alt` / `media.stage.room.alt` copy changes were already held out of the final text patch.

Therefore Chat 3 does not overwrite PR47 static poverty media ownership.

## Existing Forest route labels

Current shipped keys:
- `activityOption.forest.route.logging-road.label`;
- `activityOption.forest.route.old-boundary.label`.

Item 217 recommends **KEEP_CURRENT** for both labels.

Chat 3 does not claim replacement ownership of those keys in the final route-localization fixture.

Optional help-copy proposals:
- `activityOption.forest.route.logging-road.help`;
- `activityOption.forest.route.old-boundary.help`.

These are documentation-only proposals and are not present in root localization or the final fixture.

## Cross-domain exact-key result

| Chat 3 set | Exact root overlap | Interpretation |
| --- | ---: | --- |
| poverty final text patch | 33 | intended same-domain update of existing ordinary-poverty keys |
| shared Night/lodging fixture | 0 | additive shared UI source |
| Forest route final fixture | 0 | additive route-presentation source |
| School-owned exact keys | 0 proposed collisions | isolated |
| Foreman-owned exact keys | 0 proposed collisions | isolated |
| PR47 `presentation.static.*` | 0 proposed collisions | isolated |

## Chat2 / Chat5 ownership rule

Shipped School, Foreman and static-media keys are treated as external/non-Chat3 ownership for integration purposes.

Chat 3 must not:
- duplicate those exact keys;
- fork their RU/EN values under near-identical keys merely to bypass ownership;
- overwrite School/Foreman/static-media copy as part of poverty/Forest route integration.

The audited final fixtures satisfy that rule.

## Conclusion

There is no unintended localization ownership collision in the post-PR47 Chat 3 payload.

The only exact-root overlaps are the **33 intentional ordinary-poverty text replacements** in their existing domain. All shared Night/lodging and Forest route presentation keys remain additive and distinct from School, Foreman and PR47 static-media namespaces.
