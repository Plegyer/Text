# Static Fallback Production Inventory v2

Baseline: current `main` `23a8798f77c42e84a7540d71fdffd69d9db9fbfd`.

Scope:
- 10 target ordinary careers;
- current shipped Lumber career-event surfaces;
- reachable School surfaces;
- ordinary poverty;
- current Forest;
- shipped Lumber Foreman relationship/Night.

Only real repository static files are counted. Test-only files and planned GIF paths are excluded.

## Verified production static files

All referenced fallback files below exist under the prototype source asset tree:
- `assets/stage-lumber.svg`;
- `assets/stage-tavern.svg`;
- `assets/stage-forest.svg`;
- `assets/stage-town.svg`;
- `assets/stage-room.svg`;
- `assets/stage-outside.svg`;
- `assets/stage-school.svg`.

## 10 ordinary careers — base seasonal shifts/results

| Surface | Semantic presentation ID(s) | Real static fallback | Repo-relative path | Resolution |
| --- | --- | --- | --- | --- |
| `lumber` seasonal shifts | `job/lumber/shift/spring/default`<br>`job/lumber/shift/summer/default`<br>`job/lumber/shift/autumn/default`<br>`job/lumber/shift/winter/default` | YES | `assets/stage-lumber.svg` | direct/catalog image fallback |
| `lumber` result | `job/lumber/result/default` | YES | `assets/stage-lumber.svg` | result resolves through current base scene/static chain |
| `satyr-maid` seasonal shifts | `job/satyr-maid/shift/spring/default`<br>`job/satyr-maid/shift/summer/default`<br>`job/satyr-maid/shift/autumn/default`<br>`job/satyr-maid/shift/winter/default` | YES | `assets/stage-tavern.svg` | direct/catalog image fallback |
| `satyr-maid` result | `job/satyr-maid/result/default` | YES | `assets/stage-tavern.svg` | result resolves through current base scene/static chain |
| `undead-farm` seasonal shifts | `job/undead-farm/shift/spring/default`<br>`job/undead-farm/shift/summer/default`<br>`job/undead-farm/shift/autumn/default`<br>`job/undead-farm/shift/winter/default` | YES | `assets/stage-forest.svg` | direct/catalog image fallback |
| `undead-farm` result | `job/undead-farm/result/default` | YES | `assets/stage-forest.svg` | result resolves through current base scene/static chain |
| `tavern` seasonal shifts | `job/tavern/shift/spring/default`<br>`job/tavern/shift/summer/default`<br>`job/tavern/shift/autumn/default`<br>`job/tavern/shift/winter/default` | YES | `assets/stage-tavern.svg` | direct/catalog image fallback |
| `tavern` result | `job/tavern/result/default` | YES | `assets/stage-tavern.svg` | result resolves through current base scene/static chain |
| `hunter` seasonal shifts | `job/hunter/shift/spring/default`<br>`job/hunter/shift/summer/default`<br>`job/hunter/shift/autumn/default`<br>`job/hunter/shift/winter/default` | YES | `assets/stage-forest.svg` | direct/catalog image fallback |
| `hunter` result | `job/hunter/result/default` | YES | `assets/stage-forest.svg` | result resolves through current base scene/static chain |
| `guard` seasonal shifts | `job/guard/shift/spring/default`<br>`job/guard/shift/summer/default`<br>`job/guard/shift/autumn/default`<br>`job/guard/shift/winter/default` | YES | `assets/stage-town.svg` | direct/catalog image fallback |
| `guard` result | `job/guard/result/default` | YES | `assets/stage-town.svg` | result resolves through current base scene/static chain |
| `merchant` seasonal shifts | `job/merchant/shift/spring/default`<br>`job/merchant/shift/summer/default`<br>`job/merchant/shift/autumn/default`<br>`job/merchant/shift/winter/default` | YES | `assets/stage-town.svg` | direct/catalog image fallback |
| `merchant` result | `job/merchant/result/default` | YES | `assets/stage-town.svg` | result resolves through current base scene/static chain |
| `artist-geisha` seasonal shifts | `job/artist-geisha/shift/spring/default`<br>`job/artist-geisha/shift/summer/default`<br>`job/artist-geisha/shift/autumn/default`<br>`job/artist-geisha/shift/winter/default` | YES | `assets/stage-tavern.svg` | direct/catalog image fallback |
| `artist-geisha` result | `job/artist-geisha/result/default` | YES | `assets/stage-tavern.svg` | result resolves through current base scene/static chain |
| `assassin` seasonal shifts | `job/assassin/shift/spring/default`<br>`job/assassin/shift/summer/default`<br>`job/assassin/shift/autumn/default`<br>`job/assassin/shift/winter/default` | YES | `assets/stage-town.svg` | direct/catalog image fallback |
| `assassin` result | `job/assassin/result/default` | YES | `assets/stage-town.svg` | result resolves through current base scene/static chain |
| `prostitute` seasonal shifts | `job/prostitute/shift/spring/default`<br>`job/prostitute/shift/summer/default`<br>`job/prostitute/shift/autumn/default`<br>`job/prostitute/shift/winter/default` | YES | `assets/stage-room.svg` | direct/catalog image fallback |
| `prostitute` result | `job/prostitute/result/default` | YES | `assets/stage-room.svg` | result resolves through current base scene/static chain |


The legacy prototype `job/hunt/*` and old non-target action result variants are not counted as one of the 10 target ordinary careers. The target Hunter career uses `job/hunter/*`.

## Additional shipped Lumber career-event surfaces

| Surface | Semantic presentation ID | Real static fallback | Repo-relative path | Resolution |
| --- | --- | --- | --- | --- |
| first-shift milestone | `job/lumber/event/lumber-career-first-shift/default` | YES | `assets/stage-lumber.svg` | direct event media |
| School-management cross return | `job/lumber/event/lumber-cross-school-management-return/default` | YES | `assets/stage-town.svg` | event has no direct media; semantic slot falls back to `location/town/default` |
| Forest cross return | `job/lumber/event/lumber-cross-activity-forest-return/default` | YES | `assets/stage-forest.svg` | direct event media |
| PR43 Forest reaction success | `job/lumber/event/forest-result-content-v1-success/default` | YES | `assets/stage-forest.svg` | direct event media |
| PR43 Forest reaction escape | `job/lumber/event/forest-result-content-v1-escape/default` | YES | `assets/stage-forest.svg` | direct event media |
| PR43 Forest reaction failure | `job/lumber/event/forest-result-content-v1-failure/default` | YES | `assets/stage-forest.svg` | direct event media |

The three PR43 reaction slots also appear in the Forest section because they are Forest content using the shipped Lumber source domain. This is one semantic identity observed from two audit scopes, not duplicate gameplay content.

## Reachable School

### Paid lesson/result slots

| Surface | Semantic presentation ID | Real static fallback | Repo-relative path | Resolution |
| --- | --- | --- | --- | --- |
| paid lesson | `school/literacy-and-numbers/lesson/default` | YES | `assets/stage-school.svg` | direct course slot catalog fallback |
| paid lesson | `school/arcana/lesson/default` | YES | `assets/stage-school.svg` | direct course slot catalog fallback |
| paid lesson | `school/rhetoric-and-social/lesson/default` | YES | `assets/stage-school.svg` | direct course slot catalog fallback |
| paid lesson | `school/etiquette-and-presentation/lesson/default` | YES | `assets/stage-school.svg` | direct course slot catalog fallback |
| paid lesson | `school/field-craft/lesson/default` | YES | `assets/stage-school.svg` | direct course slot catalog fallback |
| paid lesson | `school/physical-training/lesson/default` | YES | `assets/stage-school.svg` | direct course slot catalog fallback |
| paid lesson | `school/arts-and-performance/lesson/default` | YES | `assets/stage-school.svg` | direct course slot catalog fallback |
| paid lesson | `school/body-confidence/lesson/default` | YES | `assets/stage-school.svg` | direct course slot catalog fallback |


### Generic reachable reaction slots

| Surface | Semantic presentation ID | Real static fallback | Repo-relative path | Resolution |
| --- | --- | --- | --- | --- |
| generic after School | `location/town/event/school-lesson-content-v1-after-school/default` | YES | `assets/stage-school.svg` | direct event media |
| generic after paid lesson | `location/town/event/school-life-content-v1-after-paid-lesson/default` | YES | `assets/stage-school.svg` | direct event media |
| generic after exact Night study | `location/town/event/school-life-content-v1-after-night-study/default` | YES | `assets/stage-school.svg` | direct event media |

Teacher/course-specific media-library identities remain STAGED and are not counted as production slots here.

## Ordinary poverty

Secret Debt is excluded.

| Surface | Semantic presentation ID | Real static fallback | Repo-relative path | Resolution |
| --- | --- | --- | --- | --- |
| street helpful summer | `location/town/event/poverty-street-production-helpful-summer/default` | YES | `assets/stage-outside.svg` | direct event image fallback |
| street neutral autumn | `location/town/event/poverty-street-production-neutral-autumn/default` | YES | `assets/stage-outside.svg` | direct event image fallback |
| street pressure winter | `location/town/event/poverty-street-production-pressure-winter/default` | YES | `assets/stage-outside.svg` | direct event image fallback |
| cheap lodging quiet autumn | `location/town/event/poverty-cheap-production-shared-quiet-autumn/default` | YES | `assets/stage-room.svg` | direct event image fallback |
| recovery small coin help | `location/town/event/poverty-recovery-production-small-coin-help/default` | YES | `assets/stage-outside.svg` | direct event image fallback |
| recovery short cleanup | `location/town/event/poverty-recovery-production-short-cleanup/default` | YES | `assets/stage-outside.svg` | direct event image fallback |
| recovery herb bundle | `location/town/event/poverty-recovery-production-herb-bundle/default` | YES | `assets/stage-outside.svg` | direct event image fallback |
| pressure cold rain | `location/town/event/poverty-pressure-production-cold-rain/default` | YES | `assets/stage-outside.svg` | direct event image fallback |
| pressure noisy loading | `location/town/event/poverty-pressure-production-noisy-loading/default` | YES | `assets/stage-outside.svg` | direct event image fallback |
| pressure muddy splash | `location/town/event/poverty-pressure-production-muddy-splash/default` | YES | `assets/stage-outside.svg` | direct event image fallback |


## Current Forest

| Surface | Semantic presentation ID | Real static fallback | Repo-relative path | Resolution |
| --- | --- | --- | --- | --- |
| Activity route | `activity/forest/route/default` | YES | `assets/stage-forest.svg` | catalog `stage.hunt` image |
| Activity return success | `activity/forest/return/success` | YES | `assets/stage-forest.svg` | catalog `stage.hunt` image |
| Activity return escape | `activity/forest/return/escape` | YES | `assets/stage-forest.svg` | catalog `stage.hunt` image |
| Activity return failure | `activity/forest/return/failure` | YES | `assets/stage-forest.svg` | catalog `stage.hunt` image |
| PR43 reaction success | `job/lumber/event/forest-result-content-v1-success/default` | YES | `assets/stage-forest.svg` | direct PR43 image |
| PR43 reaction escape | `job/lumber/event/forest-result-content-v1-escape/default` | YES | `assets/stage-forest.svg` | direct PR43 image |
| PR43 reaction failure | `job/lumber/event/forest-result-content-v1-failure/default` | YES | `assets/stage-forest.svg` | direct PR43 image |

No Hunter/Old Boundary presentation semantic is invented.

## Shipped Foreman relationship/Night

| Surface | Semantic presentation ID | Real static fallback | Repo-relative path | Resolution |
| --- | --- | --- | --- | --- |
| Foreman notice/relationship scene | `relationship/lumber-foreman/lumber-foreman-notice/default` | YES | `assets/stage-lumber.svg` | direct relationship event media |
| Foreman professional Night reaction | `relationship/lumber-foreman/lumber-night-foreman-professional/default` | YES | `assets/stage-lumber.svg` | direct Night reaction media |

The gameplay Night choice `lumber.foreman.night` remains the interaction identity; the visible blocking reaction above owns the shipped semantic presentation slot.

## Production conclusion

For every production semantic surface in this audit, a real static fallback path exists either directly or through the existing fallback chain.

Notable indirect case:
- `job/lumber/event/lumber-cross-school-management-return/default` has no direct media, but safely terminates at `location/town/default` -> `assets/stage-town.svg`.

Therefore the current absence of real GIF files does not leave these surfaces media-dead. It leaves them **static-backed**, which is the correct animations-off and missing-GIF production behavior.
